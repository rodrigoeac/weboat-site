/* ============================================
   WEBOAT BRASIL - MENU JS
   Versão: 1.0 | Janeiro 2026
   Toggle menu mobile e comportamentos do header
   ============================================ */

(function() {
  'use strict';

  // Elementos do DOM
  const header = document.getElementById('header');
  const mobileToggle = document.querySelector('.header__mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const dropdownToggles = document.querySelectorAll('.header__dropdown-toggle');

  // ============================================
  // MENU MOBILE TOGGLE
  // ============================================
  function toggleMobileMenu() {
    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';

    // Toggle aria-expanded
    mobileToggle.setAttribute('aria-expanded', !isExpanded);

    // Toggle aria-hidden no menu
    mobileMenu.setAttribute('aria-hidden', isExpanded);

    // Toggle classe no body para bloquear scroll
    document.body.classList.toggle('menu-open', !isExpanded);

    // Atualizar label de acessibilidade
    mobileToggle.setAttribute('aria-label', isExpanded ? 'Abrir menu' : 'Fechar menu');
  }

  // Adicionar evento de clique no toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }

  // Fechar menu ao clicar em um link
  if (mobileMenu) {
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        // Pequeno delay para a navegação acontecer
        setTimeout(function() {
          if (mobileToggle.getAttribute('aria-expanded') === 'true') {
            toggleMobileMenu();
          }
        }, 100);
      });
    });
  }

  // Fechar menu com tecla Escape
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileToggle && mobileToggle.getAttribute('aria-expanded') === 'true') {
      toggleMobileMenu();
      mobileToggle.focus();
    }
  });

  // ============================================
  // DROPDOWN DESKTOP
  // ============================================
  dropdownToggles.forEach(function(toggle) {
    const dropdown = toggle.parentElement;

    // Toggle ao clicar
    toggle.addEventListener('click', function(event) {
      event.preventDefault();
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

      // Fechar outros dropdowns
      dropdownToggles.forEach(function(otherToggle) {
        if (otherToggle !== toggle) {
          otherToggle.setAttribute('aria-expanded', 'false');
          otherToggle.parentElement.classList.remove('active');
        }
      });

      // Toggle estado atual
      toggle.setAttribute('aria-expanded', !isExpanded);
      dropdown.classList.toggle('active', !isExpanded);
    });

    // Fechar ao clicar fora
    document.addEventListener('click', function(event) {
      if (!dropdown.contains(event.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        dropdown.classList.remove('active');
      }
    });

    // Suporte a teclado
    toggle.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle.click();
      }
    });
  });

  // ============================================
  // HEADER SCROLL BEHAVIOR
  // ============================================
  let lastScroll = 0;
  const scrollThreshold = 10;

  function handleScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Adicionar classe quando rolar
    if (currentScroll > scrollThreshold) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }

    lastScroll = currentScroll;
  }

  // Adicionar listener de scroll com debounce
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(handleScroll);
  }, { passive: true });

  // Verificar posição inicial
  handleScroll();

  // ============================================
  // RESIZE HANDLER
  // ============================================
  function handleResize() {
    // Fechar menu mobile se tela ficar grande
    if (window.innerWidth >= 1024) {
      if (mobileToggle && mobileToggle.getAttribute('aria-expanded') === 'true') {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('menu-open');
      }
    }
  }

  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 100);
  });

  // ============================================
  // ACTIVE LINK HIGHLIGHTING
  // ============================================
  function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.header__menu a, .header__mobile-list a');

    navLinks.forEach(function(link) {
      const linkPath = link.getAttribute('href');

      // Verificar se o link corresponde à página atual
      if (linkPath && currentPath.includes(linkPath) && linkPath !== '/') {
        link.classList.add('active');
      } else if (linkPath === '/' && currentPath === '/') {
        link.classList.add('active');
      }
    });
  }

  highlightActiveLink();

  // ============================================
  // LANGUAGE SWITCHER
  // ============================================
  var langSwitcher = document.getElementById('lang-switcher');
  if (langSwitcher) {
    var langBtn = langSwitcher.querySelector('.lang-switcher__current');

    langBtn.addEventListener('click', function(event) {
      event.stopPropagation();
      var isOpen = langSwitcher.classList.contains('active');
      langSwitcher.classList.toggle('active', !isOpen);
      langBtn.setAttribute('aria-expanded', !isOpen);
    });

    document.addEventListener('click', function(event) {
      if (!langSwitcher.contains(event.target)) {
        langSwitcher.classList.remove('active');
        langBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

})();
