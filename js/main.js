/* ============================================
   WEBOAT BRASIL - MAIN JS
   Versão: 1.0 | Janeiro 2026
   Scripts gerais do site
   ============================================ */

(function() {
  'use strict';

  // Global error handlers
  window.addEventListener('error', function(e) {
    console.error('[WeBoat]', e.message, e.filename, e.lineno);
  });
  window.addEventListener('unhandledrejection', function(e) {
    console.error('[WeBoat] Unhandled promise:', e.reason);
  });

  // Track observers for cleanup
  var _observers = [];

  // ============================================
  // LAZY LOADING IMAGES
  // ============================================
  function initLazyLoading() {
    // Handle data-src lazy images (JS-managed)
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
      var lazyMargin = window.innerWidth <= 768 ? '50px 0px' : '200px 0px';
      const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset;
            }
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: lazyMargin,
        threshold: 0.01
      });

      lazyImages.forEach(function(img) {
        imageObserver.observe(img);
      });
      _observers.push(imageObserver);
    } else {
      // Fallback para navegadores sem suporte
      lazyImages.forEach(function(img) {
        img.src = img.dataset.src;
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
      });
    }

    // Handle native loading="lazy" images (skeleton fade-in)
    var nativeLazy = document.querySelectorAll('img[loading="lazy"]');
    nativeLazy.forEach(function(img) {
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', function() {
          img.classList.add('loaded');
        });
      }
    });
  }

  // ============================================
  // SMOOTH SCROLL PARA ÂNCORAS
  // ============================================
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    anchorLinks.forEach(function(link) {
      link.addEventListener('click', function(event) {
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          event.preventDefault();
          const headerHeight = document.getElementById('header').offsetHeight || 72;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Atualizar URL sem recarregar (replaceState para não poluir histórico)
          history.replaceState(null, null, targetId);
        }
      });
    });
  }

  // ============================================
  // ANIMAÇÃO DE ELEMENTOS AO SCROLL
  // ============================================
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');

    if (animatedElements.length === 0) return;

    if ('IntersectionObserver' in window) {
      const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            animationObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      animatedElements.forEach(function(el) {
        animationObserver.observe(el);
      });
      _observers.push(animationObserver);
    } else {
      // Fallback
      animatedElements.forEach(function(el) {
        el.classList.add('animated');
      });
    }
  }

  // ============================================
  // ACCORDION / FAQ
  // ============================================
  function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion__item');

    accordionItems.forEach(function(item) {
      const header = item.querySelector('.accordion__header');
      const content = item.querySelector('.accordion__content');

      if (header && content) {
        // Inicializar estados ARIA
        header.setAttribute('aria-expanded', 'false');
        content.setAttribute('aria-hidden', 'true');

        header.addEventListener('click', function() {
          const isOpen = item.classList.contains('active');

          // Fechar todos os outros (opcional - remover se quiser múltiplos abertos)
          accordionItems.forEach(function(otherItem) {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
              var otherHeader = otherItem.querySelector('.accordion__header');
              var otherContent = otherItem.querySelector('.accordion__content');
              if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
              if (otherContent) {
                otherContent.style.maxHeight = null;
                otherContent.setAttribute('aria-hidden', 'true');
              }
            }
          });

          // Toggle atual
          item.classList.toggle('active');
          if (isOpen) {
            content.style.maxHeight = null;
            header.setAttribute('aria-expanded', 'false');
            content.setAttribute('aria-hidden', 'true');
          } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            header.setAttribute('aria-expanded', 'true');
            content.setAttribute('aria-hidden', 'false');
          }
        });

        // Suporte a teclado
        header.addEventListener('keydown', function(event) {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            header.click();
          }
        });
      }
    });
  }

  // Phone formatting removed — handled by form.js initPhoneMask() to avoid duplicate handlers

  // ============================================
  // CONTADOR ANIMADO (Social Proof)
  // ============================================
  function animateCounter(element) {
    const target = parseInt(element.dataset.target, 10);
    const duration = parseInt(element.dataset.duration, 10) || 2000;
    const increment = target / (duration / 16);
    let current = 0;
    var fmt = window.WeBoatI18n ? window.WeBoatI18n.formatNumber : function(n) { return n.toLocaleString('pt-BR'); };

    const timer = setInterval(function() {
      current += increment;
      if (current >= target) {
        element.textContent = fmt(target);
        clearInterval(timer);
      } else {
        element.textContent = fmt(Math.floor(current));
      }
    }, 16);
  }

  function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-counter]');

    if (counters.length === 0) return;

    if ('IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      counters.forEach(function(counter) {
        counterObserver.observe(counter);
      });
      _observers.push(counterObserver);
    } else {
      counters.forEach(function(counter) {
        animateCounter(counter);
      });
    }
  }

  // ============================================
  // GALERIA LIGHTBOX — dynamically loaded from gallery.js
  // Only loads on pages with .lancha-gallery__main
  // ============================================
  function initGallery() {
    if (document.querySelector('.lancha-gallery__main')) {
      var s = document.createElement('script');
      s.src = '/js/gallery.js';
      s.defer = true;
      document.head.appendChild(s);
    }
  }

  // ============================================
  // FILTRO DE LANCHAS PARCEIRAS
  // ============================================
  function initBoatFilter() {
    const filters = document.querySelectorAll('.frota__filter');
    const boats = document.querySelectorAll('.card-boat--parceira');

    if (filters.length === 0 || boats.length === 0) return;

    filters.forEach(function(filter) {
      filter.addEventListener('click', function() {
        const categoria = this.dataset.filter;

        // Atualizar estado dos filtros
        filters.forEach(function(f) {
          f.classList.remove('frota__filter--active');
        });
        this.classList.add('frota__filter--active');

        // Filtrar cards
        boats.forEach(function(boat) {
          if (categoria === 'all' || boat.dataset.categoria === categoria) {
            boat.classList.remove('card-boat--hidden');
          } else {
            boat.classList.add('card-boat--hidden');
          }
        });
      });
    });
  }

  // ============================================
  // TABS
  // ============================================
  function initTabs() {
    const tabContainers = document.querySelectorAll('[data-tabs]');

    tabContainers.forEach(function(container) {
      const tabs = container.querySelectorAll('[data-tab]');
      const panels = container.querySelectorAll('[data-tab-panel]');

      // Set ARIA roles on init
      container.setAttribute('role', 'tablist');
      tabs.forEach(function(tab, i) {
        tab.setAttribute('role', 'tab');
        tab.setAttribute('tabindex', tab.classList.contains('active') ? '0' : '-1');
        if (!tab.getAttribute('aria-selected')) {
          tab.setAttribute('aria-selected', tab.classList.contains('active') ? 'true' : 'false');
        }
      });
      panels.forEach(function(panel) {
        panel.setAttribute('role', 'tabpanel');
      });

      tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
          const targetId = this.dataset.tab;

          // Atualizar tabs
          tabs.forEach(function(t) {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
            t.setAttribute('tabindex', '-1');
          });
          this.classList.add('active');
          this.setAttribute('aria-selected', 'true');
          this.setAttribute('tabindex', '0');

          // Atualizar painéis
          panels.forEach(function(panel) {
            if (panel.dataset.tabPanel === targetId) {
              panel.classList.add('active');
              panel.setAttribute('aria-hidden', 'false');
            } else {
              panel.classList.remove('active');
              panel.setAttribute('aria-hidden', 'true');
            }
          });
        });
      });
    });
  }

  // ============================================
  // TRUSTINDEX LAZY LOAD
  // Carrega widget apenas quando visível ou após idle
  // ============================================
  function initTrustIndexLazy() {
    const trustContainer = document.querySelector('.trustindex-widget');
    if (!trustContainer) return;

    // Extrair o ID do widget do script existente ou usar data attribute
    const existingScript = trustContainer.querySelector('script[src*="trustindex"]');
    if (existingScript) {
      // Se já tem script, não fazer nada (fallback)
      return;
    }

    const widgetId = trustContainer.dataset.widgetId;
    if (!widgetId) return;

    function loadTrustIndex() {
      if (trustContainer.dataset.loaded === 'true') return;
      trustContainer.dataset.loaded = 'true';

      const script = document.createElement('script');
      script.src = 'https://cdn.trustindex.io/loader.js?' + widgetId;
      script.defer = true;
      script.async = true;
      trustContainer.appendChild(script);
    }

    // Carregar quando visível ou após 3s de idle
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          loadTrustIndex();
          observer.disconnect();
        }
      }, { rootMargin: '200px' });
      observer.observe(trustContainer);
      _observers.push(observer);
    }

    // Fallback: carregar após idle ou 5s
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadTrustIndex, { timeout: 5000 });
    } else {
      setTimeout(loadTrustIndex, 3000);
    }
  }

  // ============================================
  // BACK TO TOP BUTTON
  // ============================================
  function initBackToTop() {
    var btn = document.querySelector('.back-to-top');
    if (!btn) return;

    btn.removeAttribute('hidden');

    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================
  // INICIALIZAÇÃO
  // ============================================
  function init() {
    initLazyLoading();
    initScrollAnimations();
    initAccordion();
    initSmoothScroll();
    initCounterAnimation();
    initGallery();
    initTabs();
    initBoatFilter();
    initTrustIndexLazy();
    initBackToTop();

    // Cleanup observers on page unload
    window.addEventListener('beforeunload', function() {
      for (var i = 0; i < _observers.length; i++) {
        _observers[i].disconnect();
      }
    });
  }

  // Executar quando DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
