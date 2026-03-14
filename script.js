window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => loader.style.display = "none", 500);
  }, 1000);
});

// Seleciona apenas os links que NÃO têm a classe 'link-externo'
document.querySelectorAll("nav a:not(.link-externo)").forEach(link => {
  link.addEventListener("click", e => {
    const targetId = link.getAttribute("href");
    
    // Só faz o scroll suave se o link começar com #
    if (targetId.startsWith("#")) {
      e.preventDefault();
      document
        .querySelector(targetId)
        .scrollIntoView({ behavior: "smooth" });
    }
  });
});

const progress = document.getElementById("progress");

window.addEventListener("scroll", () => {
  const progress = document.getElementById("progress");
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progress.style.width = (scrollTop / docHeight) * 100 + "%";
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
});

document
  .querySelectorAll(".reveal")
  .forEach(el => observer.observe(el));

// Dados do Quiz
// Dados do Quiz Expandido
// 1. Dados do Quiz com Níveis (em ordem de dificuldade)
const perguntas = [
  {
    pergunta: "Qual é o nome do reino onde se passam a maioria dos jogos do Mario?",
    opcoes: ["Hyrule", "Mushroom Kingdom", "Azeroth", "Dream Land"],
    correta: 1,
    nivel: "Fácil"
  },
  {
    pergunta: "Qual destas empresas criou o Sonic the Hedgehog?",
    opcoes: ["Sony", "Sega", "Capcom", "Nintendo"],
    correta: 1,
    nivel: "Fácil"
  },
  {
    pergunta: "Qual é o jogo mais vendido de todos os tempos?",
    opcoes: ["Tetris", "GTA V", "Minecraft", "Super Mario Bros."],
    correta: 2,
    nivel: "Médio"
  },
  {
    pergunta: "Em que ano foi lançado o primeiro console Magnavox Odyssey?",
    opcoes: ["1970", "1972", "1975", "1980"],
    correta: 1,
    nivel: "Médio"
  },
  {
    pergunta: "Qual foi o primeiro jogo a ser jogado no espaço por astronautas?",
    opcoes: ["Space Invaders", "Asteroids", "Tetris", "Pac-Man"],
    correta: 2,
    nivel: "Difícil"
  },
  {
    pergunta: "Qual empresa desenvolveu o jogo The Legend of Zelda?",
    opcoes: ["Nintendo", "Capcom", "Square Enix", "Sega"],
    correta: 0,
    nivel: "Fácil"
  },
  {
    pergunta: "Qual é o nome do personagem principal da série Halo?",
    opcoes: ["Marcus Fenix", "Master Chief", "Gordon Freeman", "Samus Aran"],
    correta: 1,
    nivel: "Difícil"
  },
  {
    pergunta: "Qual empresa é responsável pela franquia Assassin's Creed?",
    opcoes: ["Ubisoft", "EA", "Rockstar", "Activision"],
    correta: 0,
    nivel: "Médio"
  },
  {
    pergunta: "Qual console foi lançado pela Nintendo em 2017?",
    opcoes: ["Nintendo Switch", "Nintendo Wii", "Nintendo 3DS", "GameCube"],
    correta: 0,
    nivel: "Fácil"
  },
  {
    pergunta: "Qual empresa desenvolveu o jogo Fortnite?",
    opcoes: ["Epic Games", "Valve", "Rockstar", "Blizzard"],
    correta: 0,
    nivel: "Difícil"
  },
  {
    pergunta: "Qual personagem é o mascote da Sega?",
    opcoes: ["Crash", "Kirby", "Sonic", "Donkey Kong"],
    correta: 2,
    nivel: "Fácil"
  },
  {
    pergunta: "Qual empresa criou o jogo Half-Life?",
    opcoes: ["Valve", "Bethesda", "EA", "Capcom"],
    correta: 0,
    nivel: "Médio"
  },
  {
    pergunta: "Qual jogo popularizou o modo Battle Royale moderno?",
    opcoes: ["PUBG", "Minecraft", "League of Legends", "Overwatch"],
    correta: 0,
    nivel: "Médio"
  },
  {
    pergunta: "Qual empresa desenvolveu o jogo God of War?",
    opcoes: ["Sony Santa Monica", "Naughty Dog", "Insomniac", "Rockstar"],
    correta: 0,
    nivel: "Difícil"
  },
  {
    pergunta: "Qual console foi o sucessor direto do PlayStation 3?",
    opcoes: ["PlayStation 4", "PlayStation 2", "PlayStation Vita", "PSP"],
    correta: 0,
    nivel: "Fácil"
  }
];

let perguntaAtual = 0;
let pontos = 0;

// Referências do HTML
const perguntaEl = document.getElementById("pergunta");
const nivelEl = document.getElementById("info-nivel"); // <--- Adicione esta linha!
const opcoesEl = document.querySelectorAll(".opcao");
const resultadoEl = document.getElementById("resultado");
const btnProxima = document.getElementById("btn-proxima");

function carregarPergunta() {
  if (!perguntaEl) return;
  resultadoEl.textContent = "";
  btnProxima.style.display = "none";
  
  const q = perguntas[perguntaAtual];
  perguntaEl.textContent = q.pergunta;
  
  // Lógica para mostrar o nível e mudar a cor
  if (nivelEl) {
    nivelEl.textContent = `Dificuldade: ${q.nivel}`;
    
    // Muda a cor dependendo da dificuldade
    if (q.nivel === "Fácil") nivelEl.style.color = "#10b981"; // Verde
    else if (q.nivel === "Médio") nivelEl.style.color = "#f59e0b"; // Amarelo
    else nivelEl.style.color = "#ef4444"; // Vermelho
  }

  opcoesEl.forEach((btn, index) => {
    btn.textContent = q.opcoes[index];
    btn.className = "opcao";
    btn.disabled = false;
    btn.onclick = () => verificarResposta(index);
  });
}

// Inicia o quiz
carregarPergunta();

function verificarResposta(index) {
  const correta = perguntas[perguntaAtual].correta;
  opcoesEl.forEach(btn => btn.disabled = true);

  if (index === correta) {
    opcoesEl[index].classList.add("correta");
    resultadoEl.textContent = "✅ Resposta correta!";
    pontos++;
  } else {
    opcoesEl[index].classList.add("errada");
    opcoesEl[correta].classList.add("correta");
    resultadoEl.textContent = "❌ Resposta errada!";
  }
  btnProxima.style.display = "inline-block";
}

btnProxima.onclick = () => {
  perguntaAtual++;
  if (perguntaAtual < perguntas.length) {
    carregarPergunta();
  } else {
    perguntaEl.textContent = "🏆 Quiz finalizado!";
    document.querySelector(".opcoes").style.display = "none";
    resultadoEl.textContent = `Você acertou ${pontos} de ${perguntas.length}!`;
    btnProxima.textContent = "Jogar Novamente 🔄";
    btnProxima.onclick = () => location.reload();
  }
};

const form = document.getElementById("form-contato");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Impede de abrir aquela tela do Formspree
    
    const status = document.getElementById("form-status");
    const data = new FormData(event.target);
    const btn = form.querySelector(".btn-enviar");

    // Feedback visual de carregando
    btn.innerText = "Enviando...";
    btn.disabled = true;

    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        // Se deu certo:
        form.innerHTML = "<h3 style='color: #10b981; text-align: center; padding: 20px;'>✅ Mensagem enviada com sucesso!</h3>";
      } else {
        // Se deu erro:
        btn.innerText = "Erro ao enviar ❌";
        btn.disabled = false;
      }
    }).catch(error => {
      btn.innerText = "Erro na rede ❌";
      btn.disabled = false;
    });
  });
}

const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  // Se rolar mais de 100px para baixo, mostra o botão
  if (window.scrollY > 100) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth" // Sobe de um jeito suave, não de uma vez
  });
});