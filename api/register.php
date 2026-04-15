<?php
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJson(405, ['error' => 'Método não permitido. Use POST.']);
}

$body = json_decode(file_get_contents('php://input'), true) ?: [];
$username = trim($body['username'] ?? '');
$email = trim($body['email'] ?? '');
$password = $body['password'] ?? '';

if ($username === '' || $email === '' || $password === '') {
    sendJson(400, ['error' => 'Todos os campos são obrigatórios.']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendJson(400, ['error' => 'Email inválido.']);
}

if (!preg_match('/^(?=.*[A-Za-z])(?=.*\d).{8,}$/', $password)) {
    sendJson(400, ['error' => 'Senha deve ter 8+ caracteres e conter letras e números.']);
}

if (!preg_match('/^[\w\d\-_.]{3,20}$/', $username)) {
    sendJson(400, ['error' => 'Nome de usuário deve ter 3-20 caracteres sem espaços.']);
}

$stmt = $db->prepare('SELECT id FROM users WHERE username = :username OR email = :email');
$stmt->bindValue(':username', $username, SQLITE3_TEXT);
$stmt->bindValue(':email', $email, SQLITE3_TEXT);
$result = $stmt->execute();
if ($result->fetchArray(SQLITE3_ASSOC)) {
    sendJson(409, ['error' => 'Usuário ou email já existe.']);
}

$hash = password_hash($password, PASSWORD_DEFAULT);
$stmt = $db->prepare('INSERT INTO users (username, email, password) VALUES (:username, :email, :password)');
$stmt->bindValue(':username', $username, SQLITE3_TEXT);
$stmt->bindValue(':email', $email, SQLITE3_TEXT);
$stmt->bindValue(':password', $hash, SQLITE3_TEXT);
$insert = $stmt->execute();

if (!$insert) {
    sendJson(500, ['error' => 'Erro ao criar usuário.']);
}

sendJson(201, ['message' => 'Usuário cadastrado com sucesso!']);
