(function () {
  const DESKTOP_QUERY = "(min-width: 961px)";

  function createToggleButton(targetId) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "nav-toggle";
    button.setAttribute("data-nav-toggle", "");
    button.setAttribute("aria-controls", targetId);
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Abrir menu");
    button.innerHTML = [
      '<span class="nav-toggle-line"></span>',
      '<span class="nav-toggle-line"></span>',
      '<span class="nav-toggle-line"></span>'
    ].join("");
    return button;
  }

  function initResponsiveNav(nav, index) {
    if (!nav || nav.dataset.responsiveNavReady === "true") {
      return;
    }

    const container = nav.querySelector(".nav-container");
    const links = container?.querySelector(".nav-links, .nav-actions");

    if (!container || !links) {
      return;
    }

    nav.dataset.responsiveNavReady = "true";

    if (!links.id) {
      links.id = "site-nav-links-" + index;
    }

    let toggle = container.querySelector("[data-nav-toggle]");
    if (!toggle) {
      toggle = createToggleButton(links.id);
      container.insertBefore(toggle, links);
    }

    const setOpenState = isOpen => {
      nav.classList.toggle("is-open", isOpen);
      document.body.classList.toggle("nav-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    };

    const closeMenu = () => setOpenState(false);

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.contains("is-open");
      setOpenState(!isOpen);
    });

    links.querySelectorAll("a, button").forEach(item => {
      item.addEventListener("click", () => {
        if (window.matchMedia(DESKTOP_QUERY).matches) {
          return;
        }

        closeMenu();
      });
    });

    document.addEventListener("click", event => {
      if (!nav.classList.contains("is-open")) {
        return;
      }

      if (!nav.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    const desktopMedia = window.matchMedia(DESKTOP_QUERY);
    const handleDesktopChange = mediaQuery => {
      if (mediaQuery.matches) {
        closeMenu();
      }
    };

    if (typeof desktopMedia.addEventListener === "function") {
      desktopMedia.addEventListener("change", handleDesktopChange);
    } else if (typeof desktopMedia.addListener === "function") {
      desktopMedia.addListener(handleDesktopChange);
    }
  }

  function run() {
    document.querySelectorAll(".navbar-topo").forEach((nav, index) => {
      initResponsiveNav(nav, index + 1);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
