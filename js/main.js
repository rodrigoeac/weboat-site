/* ============================================
   WEBOAT BRASIL - MAIN JS
   Versão: 1.0 | Janeiro 2026
   Scripts gerais do site
   ============================================ */

(function() {
  'use strict';

  // ============================================
  // LAZY LOADING IMAGES
  // ============================================
  function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
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
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      lazyImages.forEach(function(img) {
        imageObserver.observe(img);
      });
    } else {
      // Fallback para navegadores sem suporte
      lazyImages.forEach(function(img) {
        img.src = img.dataset.src;
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
      });
    }
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

          // Atualizar URL sem recarregar
          history.pushState(null, null, targetId);
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
        header.addEventListener('click', function() {
          const isOpen = item.classList.contains('active');

          // Fechar todos os outros (opcional - remover se quiser múltiplos abertos)
          accordionItems.forEach(function(otherItem) {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
              const otherContent = otherItem.querySelector('.accordion__content');
              if (otherContent) {
                otherContent.style.maxHeight = null;
              }
            }
          });

          // Toggle atual
          item.classList.toggle('active');
          if (isOpen) {
            content.style.maxHeight = null;
          } else {
            content.style.maxHeight = content.scrollHeight + 'px';
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

  // ============================================
  // FORMATAÇÃO DE TELEFONE
  // ============================================
  function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');

    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    if (value.length > 0) {
      value = '(' + value;
    }
    if (value.length > 3) {
      value = value.slice(0, 3) + ') ' + value.slice(3);
    }
    if (value.length > 10) {
      value = value.slice(0, 10) + '-' + value.slice(10);
    }

    input.value = value;
  }

  function initPhoneFormatting() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');

    phoneInputs.forEach(function(input) {
      input.addEventListener('input', function() {
        formatPhoneNumber(this);
      });
    });
  }

  // ============================================
  // CONTADOR ANIMADO (Social Proof)
  // ============================================
  function animateCounter(element) {
    const target = parseInt(element.dataset.target, 10);
    const duration = parseInt(element.dataset.duration, 10) || 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(function() {
      current += increment;
      if (current >= target) {
        element.textContent = target.toLocaleString('pt-BR');
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toLocaleString('pt-BR');
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
    } else {
      counters.forEach(function(counter) {
        animateCounter(counter);
      });
    }
  }

  // ============================================
  // GALERIA LIGHTBOX (básico)
  // ============================================
  function initGallery() {
    const galleryImages = document.querySelectorAll('[data-lightbox]');

    if (galleryImages.length === 0) return;

    galleryImages.forEach(function(img) {
      img.addEventListener('click', function() {
        const src = this.dataset.lightbox || this.src;
        const alt = this.alt || '';

        // Criar overlay
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = '<div class="lightbox-content"><img src="' + src + '" alt="' + alt + '"><button class="lightbox-close" aria-label="Fechar">&times;</button></div>';

        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        // Fechar ao clicar
        overlay.addEventListener('click', function(event) {
          if (event.target === overlay || event.target.classList.contains('lightbox-close')) {
            overlay.remove();
            document.body.style.overflow = '';
          }
        });

        // Fechar com Escape
        function handleEscape(event) {
          if (event.key === 'Escape') {
            overlay.remove();
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleEscape);
          }
        }
        document.addEventListener('keydown', handleEscape);
      });
    });
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

      tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
          const targetId = this.dataset.tab;

          // Atualizar tabs
          tabs.forEach(function(t) {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
          });
          this.classList.add('active');
          this.setAttribute('aria-selected', 'true');

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
    }

    // Fallback: carregar após idle ou 5s
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadTrustIndex, { timeout: 5000 });
    } else {
      setTimeout(loadTrustIndex, 3000);
    }
  }

  // ============================================
  // INICIALIZAÇÃO
  // ============================================
  function init() {
    initLazyLoading();
    initScrollAnimations();
    initAccordion();
    initPhoneFormatting();
    initCounterAnimation();
    initGallery();
    initTabs();
    initBoatFilter();
    initTrustIndexLazy();
  }

  // Executar quando DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
