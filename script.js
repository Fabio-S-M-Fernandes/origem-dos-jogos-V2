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

const galleryItems = document.querySelectorAll(".galeria-item");
const galleryPreviewImg = document.getElementById("galeria-preview-img");
const galleryPreviewBadge = document.getElementById("galeria-preview-badge");
const galleryPreviewTitle = document.getElementById("galeria-preview-title");
const galleryPreviewText = document.getElementById("galeria-preview-text");

if (galleryItems.length && galleryPreviewImg && galleryPreviewBadge && galleryPreviewTitle && galleryPreviewText) {
  const updateGalleryPreview = item => {
    galleryItems.forEach(card => {
      const isActive = card === item;
      card.classList.toggle("active", isActive);
      card.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    galleryPreviewImg.style.opacity = "0.45";

    window.setTimeout(() => {
      galleryPreviewImg.src = item.dataset.image;
      galleryPreviewImg.alt = item.dataset.alt;
      galleryPreviewBadge.textContent = item.dataset.badge;
      galleryPreviewTitle.textContent = item.dataset.title;
      galleryPreviewText.textContent = item.dataset.text;
      galleryPreviewImg.style.opacity = "1";
    }, 120);
  };

  galleryItems.forEach(item => {
    ["mouseenter", "focus", "click"].forEach(eventName => {
      item.addEventListener(eventName, () => updateGalleryPreview(item));
    });
  });
}

const consoleCards = document.querySelectorAll(".console-card");
const consolesPreviewEl = document.getElementById("consoles-preview");
const consolePreviewSymbol = document.getElementById("console-preview-symbol");
const consolePreviewTag = document.getElementById("console-preview-tag");
const consolePreviewBadge = document.getElementById("console-preview-badge");
const consolePreviewTitle = document.getElementById("console-preview-title");
const consolePreviewText = document.getElementById("console-preview-text");
const consolePreviewBest = document.getElementById("console-preview-best");
const consolePreviewStyle = document.getElementById("console-preview-style");
const consolePreviewPoints = document.getElementById("console-preview-points");

if (
  consoleCards.length &&
  consolesPreviewEl &&
  consolePreviewSymbol &&
  consolePreviewTag &&
  consolePreviewBadge &&
  consolePreviewTitle &&
  consolePreviewText &&
  consolePreviewBest &&
  consolePreviewStyle &&
  consolePreviewPoints
) {
  const updateConsolePreview = card => {
    consoleCards.forEach(item => {
      const isActive = item === card;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    consolesPreviewEl.dataset.consoleMode = card.dataset.mode || "mesa";
    consolesPreviewEl.classList.remove("preview-enter");
    void consolesPreviewEl.offsetWidth;
    consolesPreviewEl.classList.add("preview-enter");

    consolePreviewSymbol.textContent = card.dataset.symbol || "▭";
    consolePreviewTag.textContent = card.dataset.tag || "";
    consolePreviewBadge.textContent = card.dataset.badge || "";
    consolePreviewTitle.textContent = card.dataset.title || "";
    consolePreviewText.textContent = card.dataset.text || "";
    consolePreviewBest.textContent = card.dataset.best || "";
    consolePreviewStyle.textContent = card.dataset.style || "";

    consolePreviewPoints.innerHTML = "";
    (card.dataset.points || "")
      .split("|")
      .filter(Boolean)
      .forEach(point => {
        const item = document.createElement("li");
        item.textContent = point.trim();
        consolePreviewPoints.appendChild(item);
      });
  };

  consoleCards.forEach(card => {
    ["mouseenter", "focus", "click"].forEach(eventName => {
      card.addEventListener(eventName, () => updateConsolePreview(card));
    });
  });
}

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
let quizIniciado = false;

// Leaderboard (top 3) utilizando localStorage
const totalPerguntas = perguntas.length;
const topScores = JSON.parse(localStorage.getItem("quizTopScores") || "[]");

// Referências do HTML
const quizStartEl = document.getElementById("quiz-start");
const quizStageEl = document.getElementById("quiz-stage");
const btnComecarQuiz = document.getElementById("btn-comecar-quiz");
const perguntaEl = document.getElementById("pergunta");
const nivelEl = document.getElementById("info-nivel");
const opcoesEl = document.querySelectorAll(".opcao");
const opcoesGridEl = document.querySelector(".opcoes");
const resultadoEl = document.getElementById("resultado");
const btnProxima = document.getElementById("btn-proxima");
const quizContainer = document.getElementById("quiz-container");
const quizQuestionCardEl = document.getElementById("quiz-question-card");
const quizQuestionCountEl = document.getElementById("quiz-question-count");
const quizScoreLiveEl = document.getElementById("quiz-score-live");
const quizProgressFillEl = document.getElementById("quiz-progress-fill");
const quizSummary = document.getElementById("quiz-summary");
const finalMessageEl = document.getElementById("final-message");
const scoreMessageEl = document.getElementById("score-message");
const topScoresEl = document.getElementById("top-scores");
const quizPreviewScoresEl = document.getElementById("quiz-preview-scores");
const btnReset = document.getElementById("btn-reset");

function atualizarCabecalhoQuiz(finalizado = false) {
  if (quizQuestionCountEl) {
    if (finalizado) {
      quizQuestionCountEl.textContent = `Perguntas concluídas: ${totalPerguntas}`;
    } else {
      quizQuestionCountEl.textContent = `Pergunta ${perguntaAtual + 1} de ${totalPerguntas}`;
    }
  }

  if (quizScoreLiveEl) {
    const label = pontos === 1 ? "acerto" : "acertos";
    quizScoreLiveEl.textContent = `${pontos} ${label}`;
  }

  if (quizProgressFillEl) {
    const progressoBase = finalizado ? totalPerguntas : perguntaAtual + 1;
    quizProgressFillEl.style.width = `${(progressoBase / totalPerguntas) * 100}%`;
  }
}

function animarPergunta() {
  if (!quizQuestionCardEl) return;
  quizQuestionCardEl.classList.remove("question-enter");
  void quizQuestionCardEl.offsetWidth;
  quizQuestionCardEl.classList.add("question-enter");
}

function carregarPergunta() {
  if (!perguntaEl || !opcoesGridEl) return;
  resultadoEl.textContent = "";
  btnProxima.style.display = "none";
  
  const q = perguntas[perguntaAtual];
  perguntaEl.textContent = q.pergunta;
  atualizarCabecalhoQuiz();
  animarPergunta();
  
  // Lógica para mostrar o nível e mudar a cor
  if (nivelEl) {
    nivelEl.textContent = `Dificuldade: ${q.nivel}`;
    
    // Muda a cor dependendo da dificuldade
    if (q.nivel === "Fácil") nivelEl.style.color = "#64b910"; // Verde
    else if (q.nivel === "Médio") nivelEl.style.color = "#f59e0b"; // Amarelo
    else nivelEl.style.color = "#ef2626"; // Vermelho
  }

  opcoesEl.forEach((btn, index) => {
    btn.textContent = q.opcoes[index];
    btn.className = "opcao";
    btn.disabled = false;
    btn.onclick = () => verificarResposta(index);
  });

  if (quizQuestionCardEl) {
    quizQuestionCardEl.classList.remove("quiz-complete");
  }

  opcoesGridEl.style.display = "grid";
}

function renderizarRanking(listaEl, mensagemVazia) {
  if (!listaEl) return;

  listaEl.innerHTML = "";

  if (topScores.length === 0) {
    const item = document.createElement("li");
    item.textContent = mensagemVazia;
    listaEl.appendChild(item);
    return;
  }

  topScores.forEach((registro, idx) => {
    const item = document.createElement("li");
    if (listaEl === quizPreviewScoresEl) {
      item.innerHTML = `<strong>#${idx + 1}</strong><span>${registro.nome} — ${registro.pontos}/${totalPerguntas}</span>`;
    } else {
      item.textContent = `${idx + 1}. ${registro.nome} — ${registro.pontos}/${totalPerguntas}`;
    }
    listaEl.appendChild(item);
  });
}

function atualizarLeaderboard() {
  renderizarRanking(topScoresEl, "Nenhum recorde ainda. Seja o primeiro!");
  renderizarRanking(quizPreviewScoresEl, "Ainda não há nomes no ranking.");
}

function salvarRecorde(nome, pontos) {
  const existente = topScores.findIndex(entry => entry.nome.toLowerCase() === nome.toLowerCase());

  if (existente !== -1) {
    if (pontos <= topScores[existente].pontos) {
      // Não substitui se a pontuação atual for igual ou pior
      atualizarLeaderboard();
      return;
    }
    topScores[existente].pontos = pontos;
  } else {
    topScores.push({ nome, pontos });
  }

  // Garante apenas top 3 e regras de ordenação sem duplicata
  topScores.sort((a, b) => b.pontos - a.pontos || a.nome.localeCompare(b.nome));
  const filtrado = [];
  topScores.forEach(item => {
    if (!filtrado.some(x => x.nome.toLowerCase() === item.nome.toLowerCase())) {
      filtrado.push(item);
    }
  });

  topScores.length = 0;
  filtrado.slice(0, 3).forEach(item => topScores.push(item));

  localStorage.setItem("quizTopScores", JSON.stringify(topScores));
  atualizarLeaderboard();
}

function mostrarTelaInicial() {
  quizIniciado = false;
  perguntaAtual = 0;
  pontos = 0;

  if (quizStartEl) quizStartEl.classList.remove("hidden");
  if (quizStageEl) quizStageEl.classList.add("hidden");
  if (quizSummary) {
    quizSummary.classList.add("hidden");
    quizSummary.classList.remove("quiz-celebrate");
  }

  if (quizQuestionCardEl) {
    quizQuestionCardEl.classList.remove("quiz-complete");
  }

  if (resultadoEl) resultadoEl.textContent = "";
  if (perguntaEl) perguntaEl.textContent = "";
  if (nivelEl) {
    nivelEl.textContent = "Pronto para começar";
    nivelEl.style.color = "#c4b5fd";
  }

  if (opcoesGridEl) {
    opcoesGridEl.style.display = "grid";
  }

  if (btnProxima) {
    btnProxima.style.display = "none";
    btnProxima.textContent = "Próxima Pergunta ➡️";
  }

  if (quizProgressFillEl) {
    quizProgressFillEl.style.width = "0%";
  }

  if (quizQuestionCountEl) {
    quizQuestionCountEl.textContent = `Pergunta 0 de ${totalPerguntas}`;
  }

  if (quizScoreLiveEl) {
    quizScoreLiveEl.textContent = "0 acertos";
  }

  atualizarLeaderboard();
}

function iniciarQuiz() {
  quizIniciado = true;
  perguntaAtual = 0;
  pontos = 0;

  if (quizStartEl) quizStartEl.classList.add("hidden");
  if (quizStageEl) quizStageEl.classList.remove("hidden");
  if (quizSummary) {
    quizSummary.classList.add("hidden");
    quizSummary.classList.remove("quiz-celebrate");
  }

  carregarPergunta();
}

function mostrarResumoFinal() {
  atualizarCabecalhoQuiz(true);
  quizSummary.classList.remove("hidden");
  quizSummary.classList.add("quiz-celebrate");

  const acertosPercent = Math.round((pontos / totalPerguntas) * 100);
  let mensagem = "Mandou bem!";
  let emoji = "🎮";

  if (acertosPercent === 100) {
    mensagem = "Perfeito! Campeão(a) do quiz!";
    emoji = "🏆";
  } else if (acertosPercent >= 80) {
    mensagem = "Excelente desempenho!";
    emoji = "💥";
  } else if (acertosPercent >= 50) {
    mensagem = "Ótimo, continue treinando!";
    emoji = "🔥";
  } else {
    mensagem = "Bora tentar outra vez e melhorar!";
    emoji = "🎯";
  }

  finalMessageEl.innerHTML = `<strong>${emoji} ${mensagem}</strong><br>Você acertou ${pontos} de ${totalPerguntas}.`;
  scoreMessageEl.textContent = `Pontuação final: ${acertosPercent}%`;

  mostrarConfetti(16);

  const nome = prompt("Digite seu nome para entrar no top 3:", "Player")?.trim() || "Player";
  salvarRecorde(nome, pontos);
  btnReset.focus();
}

function mostrarConfetti(qtd = 20) {
  const container = document.createElement('div');
  container.className = 'confetti-container';

  for (let i = 0; i < qtd; i++) {
    const piece = document.createElement('div');
    const size = Math.random() * 10 + 6;
    piece.className = 'confetti-piece';
    piece.style.background = `hsl(${Math.random() * 60 + 220}, 100%, 65%)`;
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.width = `${size}px`;
    piece.style.height = `${size * 0.28}px`;
    piece.style.animationDuration = `${1.2 + Math.random() * 1.1}s`;
    piece.style.opacity = `${0.7 + Math.random() * 0.3}`;
    container.appendChild(piece);
  }

  quizContainer.appendChild(container);
  setTimeout(() => container.remove(), 1600);
}

function verificarResposta(index) {
  if (!quizIniciado) return;
  if (quizContainer.dataset.isAnswering === "true") return;
  quizContainer.dataset.isAnswering = "true";
  setTimeout(() => { quizContainer.dataset.isAnswering = "false"; }, 420);

  const correta = perguntas[perguntaAtual].correta;
  opcoesEl.forEach(btn => {
    btn.disabled = true;
    btn.classList.remove("opcao-animada");
  });

  quizContainer.classList.remove("explode");
  void quizContainer.offsetWidth;
  quizContainer.classList.add("explode");
  setTimeout(() => quizContainer.classList.remove("explode"), 560);

  // animação única e suave para o botão escolhido
  opcoesEl[index].classList.add("opcao-animada");

  if (index === correta) {
    opcoesEl[index].classList.add("correta");
    resultadoEl.textContent = "✅ Resposta correta!";
    resultadoEl.style.color = "#a5f3fc";
    pontos++;
    atualizarCabecalhoQuiz();
  } else {
    opcoesEl[index].classList.add("errada");
    opcoesEl[correta].classList.add("correta");
    resultadoEl.textContent = "❌ Resposta errada!";
    resultadoEl.style.color = "#fca5a5";
  }

  btnProxima.textContent = perguntaAtual === perguntas.length - 1 ? "Ver Resultado 🏆" : "Próxima Pergunta ➡️";
  btnProxima.style.display = "inline-block";
}

btnProxima.onclick = () => {
  perguntaAtual++;
  if (perguntaAtual < perguntas.length) {
    carregarPergunta();
  } else {
    quizIniciado = false;
    perguntaEl.textContent = "🏆 Quiz finalizado!";
    if (quizQuestionCardEl) {
      quizQuestionCardEl.classList.add("quiz-complete");
    }
    opcoesGridEl.style.display = "none";
    resultadoEl.textContent = `Você acertou ${pontos} de ${perguntas.length}!`;
    resultadoEl.style.color = "#a5f3fc";
    btnProxima.style.display = "none";
    mostrarResumoFinal();
  }
};

btnReset.onclick = () => {
  mostrarTelaInicial();
  if (btnComecarQuiz) btnComecarQuiz.focus();
};

if (btnComecarQuiz) {
  btnComecarQuiz.onclick = () => {
    iniciarQuiz();
  };
}

mostrarTelaInicial();

const form = document.getElementById("form-contato");
const mensagemInput = document.getElementById("mensagem");
const mensagemCount = document.getElementById("mensagem-count");
const formStatus = document.getElementById("form-status");
const contactFormCard = document.getElementById("contact-form-card");

const atualizarContadorMensagem = () => {
  if (!mensagemInput || !mensagemCount) return;

  const limite = Number(mensagemInput.getAttribute("maxlength")) || 300;
  const total = mensagemInput.value.length;

  mensagemCount.textContent = `${total}/${limite}`;
  mensagemCount.classList.toggle("is-limit", total >= limite);
};

const definirStatusFormulario = (mensagem, tipo = "") => {
  if (!formStatus) return;

  formStatus.textContent = mensagem;
  formStatus.className = "form-status";

  if (tipo) {
    formStatus.classList.add(tipo);
  }
};

if (mensagemInput) {
  atualizarContadorMensagem();
  mensagemInput.addEventListener("input", atualizarContadorMensagem);
}

if (form) {
  const btn = form.querySelector(".btn-enviar");
  const btnLabel = btn?.querySelector(".btn-enviar-label");

  form.addEventListener("submit", async event => {
    event.preventDefault();

    if (!btn) return;

    const data = new FormData(event.target);

    btn.disabled = true;
    btn.classList.add("is-loading");
    if (btnLabel) btnLabel.textContent = "Enviando...";

    if (contactFormCard) {
      contactFormCard.classList.remove("is-success", "is-error");
    }

    definirStatusFormulario("Enviando sua mensagem...", "is-pending");

    try {
      const response = await fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Falha no envio do formulário.");
      }

      form.reset();
      atualizarContadorMensagem();
      definirStatusFormulario("Mensagem enviada com sucesso! Valeu pelo contato.", "is-success");

      if (contactFormCard) {
        contactFormCard.classList.add("is-success");
      }

      if (btnLabel) btnLabel.textContent = "Mensagem enviada";

      window.setTimeout(() => {
        if (btnLabel) btnLabel.textContent = "Enviar Mensagem";
        if (contactFormCard) {
          contactFormCard.classList.remove("is-success");
        }
      }, 2400);
    } catch (error) {
      definirStatusFormulario("Não foi possível enviar agora. Tente novamente em instantes.", "is-error");

      if (contactFormCard) {
        contactFormCard.classList.add("is-error");
      }

      if (btnLabel) btnLabel.textContent = "Tentar novamente";
    } finally {
      btn.disabled = false;
      btn.classList.remove("is-loading");
    }
  });
}

const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  // Se rolar mais de 400px para baixo, mostra o botão
  if (window.scrollY > 400) {
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

// Atualiza ano do footer automaticamente
const yearEl = document.getElementById("current-year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Texto dinâmico no rodapé (jogos circulando)
const pulseText = document.querySelector(".footer-credits .pulse");
if (pulseText) {
  const frases = ["gamer", "retro", "next-gen", "indie", "arcade"];
  let i = 0;
  setInterval(() => {
    i = (i + 1) % frases.length;
    pulseText.textContent = frases[i];
  }, 3400); 
};

// Modal handling
const userAvatarWrapper = document.getElementById('user-avatar-wrapper');
const userAvatar = document.getElementById('user-avatar');
const userDropdown = document.getElementById('user-dropdown');
const userMenu = document.getElementById('user-menu');
const loginLink = document.getElementById('login-link');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const profileModal = document.getElementById('profile-modal');
const profileAvatarFile = document.getElementById('profile-avatar-file');
const profileAvatarUrlInput = document.getElementById('profile-avatar-url');
const removeAvatarBtn = document.getElementById('remove-avatar');
const uploadStatus = document.getElementById('upload-status');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');
const googleSigninBtn = document.getElementById('google-signin-btn');
let googleAuthInitialized = false;

const hasUserMenu = Boolean(userAvatarWrapper && userDropdown && userMenu);
const hasAuthModals = Boolean(loginModal && registerModal && profileModal);

const GOOGLE_CLIENT_ID = 'COLOQUE_SEU_CLIENT_ID_AQUI.apps.googleusercontent.com';
const API_BASE_URL = window.API_BASE_URL || '/api';
const AUTH_GOOGLE_URL = `${API_BASE_URL}/auth-google.php`;

const MAX_AVATAR_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const setUploadStatus = (message, isError = false) => {
  if (!uploadStatus) return;
  uploadStatus.textContent = message;
  uploadStatus.style.color = isError ? '#ff9b9b' : '#b9dcff';
};

const getFallbackAvatarUrl = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  return user.avatar || user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username || 'Guest')}&background=6648ff&color=fff&size=128`;
};

function resizeImageFile(file, maxDimension = 256) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const ratio = Math.min(maxDimension / img.width, maxDimension / img.height, 1);
        const canvas = document.createElement('canvas');
        canvas.width = Math.floor(img.width * ratio);
        canvas.height = Math.floor(img.height * ratio);

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };

      img.onerror = () => reject(new Error('Erro ao carregar a imagem.'));
      img.src = e.target.result;
    };

    reader.onerror = () => reject(new Error('Erro ao ler arquivo de imagem.'));
    reader.onprogress = ev => {
      if (!uploadStatus || !ev.lengthComputable) return;
      setUploadStatus(`Carregando ${Math.round((ev.loaded / ev.total) * 100)}%...`);
    };

    reader.readAsDataURL(file);
  });
};

function handleImagePreview(dataURL) {
  if (profileAvatarUrlInput) profileAvatarUrlInput.value = dataURL;
  const profileInfo = document.getElementById('profile-info');
  if (profileInfo) {
    const preview = profileInfo.querySelector('.profile-avatar-preview img');
    if (preview) preview.src = dataURL;
  }
}

function clearAvatarInputs() {
  if (profileAvatarFile) profileAvatarFile.value = '';
  if (profileAvatarUrlInput) profileAvatarUrlInput.value = '';
  setUploadStatus('Avatar removido. Clique em Atualizar para salvar.', false);
  const profileInfo = document.getElementById('profile-info');
  if (profileInfo) {
    const preview = profileInfo.querySelector('.profile-avatar-preview img');
    if (preview) preview.src = getFallbackAvatarUrl();
  }
}

function handleGoogleCredentialResponse(response) {
  const idToken = response.credential;
  if (!idToken) {
    return setErrorFeedback(loginModal, 'Google não retornou token');
  }

  fetch(AUTH_GOOGLE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ idToken })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        setErrorFeedback(loginModal, data.error);
      } else {
        const user = data.user;
        localStorage.setItem('user', JSON.stringify(user));
        updateAuthUI();
        closeAllModals();
        showToast('Login com Google realizado!');
      }
    })
    .catch(err => setErrorFeedback(loginModal, 'Falha na autenticação Google'));
}

function renderGoogleButton() {
  if (googleSigninBtn && window.google && window.google.accounts && window.google.accounts.id) {
    if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID.includes('COLOQUE_SEU_CLIENT_ID_AQUI')) {
      googleSigninBtn.innerHTML = '<button type="button" class="btn-google-placeholder" disabled>Google indisponível: configure o Client ID</button>';
      return;
    }

    const buttonWidth = Math.max(220, Math.min((googleSigninBtn.clientWidth || 320) - 8, 340));
    googleSigninBtn.innerHTML = '';

    if (!googleAuthInitialized) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredentialResponse,
        ux_mode: 'popup'
      });
      googleAuthInitialized = true;
    }

    window.google.accounts.id.renderButton(
      googleSigninBtn,
      { theme: 'filled_blue', size: 'large', width: buttonWidth }
    );
  }
}

window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 500);
  }, 1000);
  renderGoogleButton();
});
const toast = document.createElement('div');
toast.className = 'alert-toast';
document.body.appendChild(toast);

const showToast = (message, duration = 2200) => {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
};

const resetAuthForm = form => {
  if (!form) return;

  form.reset();

  form.querySelectorAll('input').forEach(input => {
    input.classList.remove('input-valid', 'input-invalid');

    if (input.type === 'password' || input.dataset.originalType === 'password') {
      input.type = 'password';
      input.dataset.originalType = 'password';
    }
  });

  form.querySelectorAll('.error-text').forEach(node => {
    node.textContent = '';
  });

  form.querySelectorAll('.toggle-password').forEach(icon => {
    icon.classList.add('fa-eye');
    icon.classList.remove('fa-eye-slash');
  });
};

const closeAllModals = () => {
  [loginModal, registerModal, profileModal].forEach(m => m && m.classList.remove('active', 'slide-in'));
  document.body.classList.remove('modal-open');
};

const openModal = modal => {
  closeAllModals();

  if (modal === loginModal) {
    resetAuthForm(document.getElementById('login-form'));
  }

  if (modal === registerModal) {
    resetAuthForm(document.getElementById('register-form'));
  }

  document.body.classList.add('modal-open');
  modal.classList.add('active');
  // Trigger reflow for animation
  modal.offsetHeight;
  modal.classList.add('slide-in');

  const firstFocusable = modal.querySelector('input, button, a');
  if (firstFocusable) {
    requestAnimationFrame(() => firstFocusable.focus());
  }

  if (modal === loginModal) {
    requestAnimationFrame(() => renderGoogleButton());
  }
};

const toggleModal = (modal, open) => {
  if (open) openModal(modal);
  else {
    modal.classList.remove('active', 'slide-in');
    document.body.classList.remove('modal-open');
  }
};

if (hasUserMenu) {
  userAvatarWrapper.addEventListener('click', e => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      userDropdown.classList.toggle('hidden');
      return;
    }
    if (loginModal) openModal(loginModal);
  });
}

if (loginLink) {
  loginLink.addEventListener('click', e => {
    e.preventDefault();
    if (loginModal) openModal(loginModal);
  });
}

if (showRegister) {
  showRegister.addEventListener('click', e => {
    e.preventDefault();
    if (registerModal) openModal(registerModal);
  });
}

if (showLogin) {
  showLogin.addEventListener('click', e => {
    e.preventDefault();
    if (loginModal) openModal(loginModal);
  });
}


document.querySelectorAll('.close').forEach(close => {
  close.addEventListener('click', closeAllModals);
});

window.addEventListener('click', e => {
  if (e.target.classList.contains('modal')) {
    toggleModal(e.target, false);
  }

  if (e.target.classList.contains('modal-overlay')) {
    const modal = e.target.closest('.modal');
    if (modal) toggleModal(modal, false);
  }

  // Fecha dropdown se clicar fora
  if (hasUserMenu && userDropdown && userMenu && !userMenu.contains(e.target)) {
    userDropdown.classList.add('hidden');
  }
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAllModals();
});

const setErrorFeedback = (modal, message) => {
  modal.classList.add('modal-shake');
  setTimeout(() => modal.classList.remove('modal-shake'), 380);
  showToast(message);
};

// validation helpers
const isValidEmail = email => /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
const isValidPassword = pwd => /^(?=.*[A-Za-z])(?=.*\d)(?=.{8,})/.test(pwd);

const setFieldState = (input, isValid, message) => {
  const parent = input.closest('.field-group');
  const errorNode = parent?.querySelector('.error-text');
  input.classList.toggle('input-valid', isValid);
  input.classList.toggle('input-invalid', !isValid);
  if (errorNode) {
    errorNode.textContent = isValid ? '' : message;
  }
};

const validateField = input => {
  const value = input.value.trim();
  if (!value) {
    setFieldState(input, false, 'Preencha este campo');
    return false;
  }

  if (input.id.includes('email')) {
    const valid = isValidEmail(value);
    setFieldState(input, valid, valid ? '' : 'Formato de email inválido');
    return valid;
  }

  if (input.id.includes('password')) {
    const valid = isValidPassword(value);
    setFieldState(input, valid, valid ? '' : 'Senha deve ter 8+ chars e números');
    return valid;
  }

  if (input.id.includes('username')) {
    const valid = /^[\w\d\-_.]{3,20}$/.test(value);
    setFieldState(input, valid, valid ? '' : 'Nome 3-20 chars, sem espaços');
    return valid;
  }

  setFieldState(input, true, '');
  return true;
};

const watchFields = form => {
  form.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => validateField(input));
    input.addEventListener('blur', () => validateField(input));
  });
};

watchFields(document.getElementById('login-form'));
watchFields(document.getElementById('register-form'));

// Permitir clique em qualquer parte do field-group para focar no input
document.querySelectorAll('.field-group').forEach(group => {
  group.addEventListener('click', e => {
    if (e.target.classList.contains('toggle-password')) return;
    const input = group.querySelector('input, textarea');
    if (input) input.focus();
  });
});

// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(icon => {
  icon.addEventListener('click', () => {
    const targetId = icon.getAttribute('data-target');
    const input = document.getElementById(targetId);
    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
  });
});

// Forms
const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const button = registerForm.querySelector('.submit-btn');
  const spinner = button.querySelector('.spinner');
  const btnText = button.querySelector('.btn-text');

  button.classList.add('loading');
  spinner.style.display = 'block';
  btnText.style.opacity = '0';

  const usernameInput = document.getElementById('register-username');
  const emailInput = document.getElementById('register-email');
  const passwordInput = document.getElementById('register-password');

  const okUser = validateField(usernameInput);
  const okEmail = validateField(emailInput);
  const okPwd = validateField(passwordInput);

  if (!okUser || !okEmail || !okPwd) {
    button.classList.remove('loading');
    spinner.style.display = 'none';
    btnText.style.opacity = '1';
    return setErrorFeedback(registerModal, 'Corrija os erros antes de enviar.');
  }

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  try {
    const response = await fetch(`${API_BASE_URL}/register.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    const result = await response.json();
    if (response.ok) {
      showToast('Cadastro realizado com sucesso! Faça login.');
      openModal(loginModal);
    } else {
      setErrorFeedback(registerModal, result.error || 'Erro no cadastro.');
    }
  } catch (error) {
    setErrorFeedback(registerModal, 'Servidor offline. Verifique sua API PHP ou defina API_BASE_URL.');
  } finally {
    button.classList.remove('loading');
    spinner.style.display = 'none';
    btnText.style.opacity = '1';
  }
});

const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const button = loginForm.querySelector('.submit-btn');
  const spinner = button.querySelector('.spinner');
  const btnText = button.querySelector('.btn-text');

  button.classList.add('loading');
  spinner.style.display = 'block';
  btnText.style.opacity = '0';

  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');

  const okEmail = validateField(emailInput);
  const okPwd = validateField(passwordInput);

  if (!okEmail || !okPwd) {
    button.classList.remove('loading');
    spinner.style.display = 'none';
    btnText.style.opacity = '1';
    return setErrorFeedback(loginModal, 'Corrija os erros antes de enviar.');
  }

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  try {
    const response = await fetch(`${API_BASE_URL}/login.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const result = await response.json();
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(result.user));
      showToast('Logado com sucesso!');
      closeAllModals();
      updateAuthUI();
      // perfil será exibido apenas quando o usuário clicar no menu Perfil
    } else {
      setErrorFeedback(loginModal, result.error || 'Credenciais inválidas.');
    }
  } catch (error) {
    setErrorFeedback(loginModal, 'Servidor offline. Verifique sua API PHP ou defina API_BASE_URL.');
  } finally {
    button.classList.remove('loading');
    spinner.style.display = 'none';
    btnText.style.opacity = '1';
  }
});

function showProfile() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    const avatarUrl = user.avatar || user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username || 'User')}&background=6648ff&color=fff&size=128`;
    document.getElementById('profile-info').innerHTML = `
      <div class="profile-avatar-preview">
        <img src="${avatarUrl}" alt="Avatar" />
      </div>
      <p><strong>Usuário:</strong> ${user.username}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Perfil:</strong> ${user.profile || 'Nenhum'}</p>
      <p><strong>Avatar atual:</strong> ${avatarUrl}</p>
    `;
    document.getElementById('profile-text').value = user.profile || '';
    if (profileAvatarUrlInput) profileAvatarUrlInput.value = user.avatar || user.photoURL || '';
    if (profileAvatarFile) profileAvatarFile.value = '';
    setUploadStatus('');
    openModal(profileModal);
  }
}

if (profileAvatarFile) {
  profileAvatarFile.addEventListener('change', async event => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadStatus('Selecione somente imagens JPG/PNG/GIF.', true);
      profileAvatarFile.value = '';
      return;
    }

    if (file.size > MAX_AVATAR_FILE_SIZE) {
      setUploadStatus('Arquivo muito grande. Limite 2MB.', true);
      profileAvatarFile.value = '';
      return;
    }

    setUploadStatus('Redimensionando imagem para avatar...');

    try {
      const resizedDataUrl = await resizeImageFile(file, 256);
      handleImagePreview(resizedDataUrl);
      setUploadStatus('Imagem pronta! Clique em Atualizar para salvar.', false);
    } catch (error) {
      console.error(error);
      setUploadStatus('Erro ao processar imagem. Tente outro arquivo.', true);
      profileAvatarFile.value = '';
    }
  });
}

if (profileAvatarUrlInput) {
  profileAvatarUrlInput.addEventListener('input', () => {
    const value = profileAvatarUrlInput.value.trim();
    const info = document.getElementById('profile-info');
    if (!info) return;
    const preview = info.querySelector('.profile-avatar-preview img');
    if (!preview) return;

    if (value) {
      preview.src = value;
      setUploadStatus('URL setada. Clique em Atualizar para salvar.');
    }
  });
}

if (removeAvatarBtn) {
  removeAvatarBtn.addEventListener('click', () => {
    clearAvatarInputs();
  });
}

const submitButton = document.getElementById('update-profile');
if (submitButton) {
  submitButton.addEventListener('click', async () => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const profile = document.getElementById('profile-text').value.trim();
    const avatarUrl = document.getElementById('profile-avatar-url').value.trim();

    // Atualiza local imediato e mostra toast
    user.profile = profile;
    if (avatarUrl) {
      user.avatar = avatarUrl;
    } else {
      delete user.avatar;
    }

    localStorage.setItem('user', JSON.stringify(user));
    updateAuthUI();
    showToast('Perfil atualizado com sucesso!');

    // Tenta enviar para API caso exista back-end
    if (user.id) {
      try {
        const response = await fetch(`${API_BASE_URL}/profile.php?id=${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profile, avatar: avatarUrl })
        });
        const result = await response.json();
        if (!response.ok) {
          console.warn('Perfil remoto não atualizado', result);
        }
      } catch (error) {
        console.warn('API de perfil não disponível', error);
      }
    }

    profileModal.classList.remove('active');
  });
}


const updateAuthUI = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const avatarEl = document.getElementById('user-avatar');

  if (!avatarEl || !userAvatarWrapper || !userDropdown || !userMenu || !loginLink) {
    return;
  }

  if (user) {
    const avatarUrl = user.avatar || user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username || 'Player')}&background=6648ff&color=fff&size=128`;
    avatarEl.src = avatarUrl;
    avatarEl.classList.remove('hidden');
    loginLink.classList.add('auth-hidden');
    userAvatarWrapper.classList.remove('auth-hidden');
    userMenu.classList.add('is-authenticated');
    userAvatarWrapper.title = `Abrir menu de ${user.username || 'usuário'}`;
    userDropdown.classList.add('hidden');
  } else {
    avatarEl.src = '';
    avatarEl.classList.add('hidden');
    loginLink.classList.remove('auth-hidden');
    userAvatarWrapper.classList.add('auth-hidden');
    userMenu.classList.remove('is-authenticated');
    userAvatarWrapper.title = 'Abrir login';
    userDropdown.classList.add('hidden');
  }
};

// Dropdown actions
const dropdownProfile = document.getElementById('dropdown-profile');
const dropdownSettings = document.getElementById('dropdown-settings');
const dropdownLogout = document.getElementById('dropdown-logout');

dropdownProfile.addEventListener('click', e => {
  e.preventDefault();
  userDropdown.classList.add('hidden');
  // Abre página de Perfil
  window.location.href = 'profile.html';
});

dropdownSettings.addEventListener('click', e => {
  e.preventDefault();
  userDropdown.classList.add('hidden');
  // Abre página de Configurações
  window.location.href = 'settings.html';
});

dropdownLogout.addEventListener('click', e => {
  e.preventDefault();
  localStorage.removeItem('user');
  userDropdown.classList.add('hidden');
  updateAuthUI();
  showToast('Deslogado com sucesso');
});

// Check if logged in
updateAuthUI();
