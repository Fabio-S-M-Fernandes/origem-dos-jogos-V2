// layout.js
// Renderiza header e footer compartilhados entre as páginas

function renderSharedHeader() {
  const headerHTML = `
<nav class="navbar-topo">
  <div class="nav-container">
    <a href="index.html" class="logo-link link-externo">
      <img src="logo.png" alt="Logo" class="logo-img" />
    </a>
    <ul class="nav-links">
      <li><a href="index.html">Início</a></li>
      <li><a href="profile.html">Perfil</a></li>
      <li><a href="settings.html">Configurações</a></li>
      <li><a href="index.html#quiz">Quiz</a></li>
      <li><a href="index.html#consoles">Consoles</a></li>
      <li><a href="index.html#tipos">Gêneros</a></li>
    </ul>
  </div>
</nav>
`;
  const container = document.getElementById('shared-header');
  if (container) container.innerHTML = headerHTML;
}

function renderSharedFooter() {
  const year = new Date().getFullYear();

  const footerHTML = `
<footer>
  <div class="footer-content">
    <div class="footer-widget footer-brand">
      <img src="logo.png" alt="Logo" class="footer-logo" />
      <h4>Origem & Evolução dos Jogos</h4>
      <p>Conteúdo histórico, geek e interativo para gamers que curtem viagem no tempo e nostalgia.</p>
    </div>
    <div class="footer-widget footer-social">
      <h4>Redes</h4>
      <div class="social-links">
        <a href="https://www.instagram.com/algorithmover/" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
        <a href="https://www.linkedin.com/in/fabiosmfernandes-dev/" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
        <a href="https://github.com/Fabio-S-M-Fernandes" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a>
      </div>
    </div>
    <div class="footer-widget footer-contact">
      <h4>Contato</h4>
      <p><i class="fas fa-envelope"></i> <a href="mailto:contato@seusite.com">contato@seusite.com</a></p>
      <p><i class="fas fa-map-marker-alt"></i> Brasil</p>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© <span id="current-year">${year}</span> Fábio S. M. Fernandes | Desenvolvedor Web</p>
    <p class="footer-credits">Feito com <i class="fas fa-heart"></i> e código <span class="pulse">gamer</span></p>
  </div>
</footer>
`;

  const container = document.getElementById('shared-footer');
  if (container) container.innerHTML = footerHTML;
}

function initLayout() {
  renderSharedHeader();
  renderSharedFooter();
}

document.addEventListener('DOMContentLoaded', initLayout);