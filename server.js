const fs = require('fs');
const path = require('path');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');

function loadEnvFile() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) {
    return;
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) {
      return;
    }

    const separatorIndex = trimmedLine.indexOf('=');
    if (separatorIndex === -1) {
      return;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const rawValue = trimmedLine.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^["']|["']$/g, '');

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  });
}

loadEnvFile();

const app = express();
const port = 3000;

// Substitua pela sua Client ID do Google na nuvem
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'COLOQUE_SEU_CLIENT_ID_AQUI.apps.googleusercontent.com';
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files from current directory

// SQLite database
const db = new sqlite3.Database('./jogo_db.sqlite', (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create tables if not exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      profile TEXT,
      avatar TEXT
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Database and table ready');
    }
  });

  db.run(`ALTER TABLE users ADD COLUMN avatar TEXT`, (err) => {
    if (err && !err.message.includes('duplicate column name')) {
      console.error('Error ensuring avatar column:', err.message);
    }
  });
});

const isValidEmail = email => /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);

// Routes
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Todos os campos sao obrigatorios.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Email inválido.' });
  }

  if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.{8,})/.test(password)) {
    return res.status(400).json({ error: 'Senha deve ter 8+ caracteres e conter letras e números.' });
  }

  db.get('SELECT id FROM users WHERE username = ? OR email = ?', [username, email], async (err, existing) => {
    if (err) {
      console.error('DB lookup error:', err);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }

    if (existing) {
      return res.status(409).json({ error: 'Usuário ou email já existe.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], function(err) {
      if (err) {
        console.error('DB insert error:', err);
        return res.status(500).json({ error: 'Erro ao criar usuário.' });
      }
      res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err || !user) return res.status(400).json({ error: 'Invalid credentials' });
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ error: 'Invalid credentials' });
    res.json({ message: 'Logged in', user: { id: user.id, username: user.username, email: user.email, profile: user.profile, avatar: user.avatar } });
  });
});

app.post('/auth/google', async (req, res) => {
  if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID.includes('COLOQUE_SEU_CLIENT_ID_AQUI')) {
    return res.status(503).json({ error: 'Login com Google ainda não configurado no servidor.' });
  }

  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ error: 'Token ausente' });

  try {
    const ticket = await googleClient.verifyIdToken({ idToken, audience: GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    const email = payload.email;
    const username = payload.name || payload.email.split('@')[0];
    const avatar = payload.picture;

    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) return res.status(500).json({ error: 'Erro no DB' });

      if (user) {
        db.run('UPDATE users SET avatar = ? WHERE id = ?', [avatar, user.id]);
        return res.json({ user: { id: user.id, username: user.username, email: user.email, profile: user.profile, avatar: avatar || user.avatar } });
      }

      const randomPass = Math.random().toString(36).slice(-10);
      const hashedPassword = await bcrypt.hash(randomPass, 10);
      db.run('INSERT INTO users (username, email, password, profile, avatar) VALUES (?, ?, ?, ?, ?)', [username, email, hashedPassword, '', avatar], function(insertErr) {
        if (insertErr) return res.status(500).json({ error: 'Erro ao criar usuário' });
        res.json({ user: { id: this.lastID, username, email, profile: '', avatar } });
      });
    });
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT id, username, email, profile FROM users WHERE id = ?', [id], (err, user) => {
    if (err || !user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  });
});

app.put('/profile/:id', (req, res) => {
  const { id } = req.params;
  const { profile, avatar } = req.body;
  db.run('UPDATE users SET profile = ?, avatar = ? WHERE id = ?', [profile, avatar, id], function(err) {
    if (err) return res.status(400).json({ error: 'Update failed' });
    res.json({ message: 'Profile updated' });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
