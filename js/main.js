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
    // Handle data-src lazy images (JS-managed)
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
        rootMargin: '200px 0px',
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
  // GALERIA LIGHTBOX COM NAVEGAÇÃO
  // ============================================
  function initGallery() {
    const mainImage = document.querySelector('.lancha-gallery__main img');
    const thumbs = document.querySelectorAll('.lancha-gallery__thumb');

    // Array de todas as imagens da galeria
    let galleryImages = [];
    let currentIndex = 0;

    // Se há thumbnails, configurar galeria de lancha
    if (mainImage && thumbs.length > 0) {
      // Coletar todas as imagens
      thumbs.forEach(function(thumb, index) {
        const img = thumb.querySelector('img');
        if (img) {
          galleryImages.push({
            src: img.src,
            alt: img.alt
          });
        }

        // Clique na thumbnail troca a imagem principal
        thumb.addEventListener('click', function() {
          const img = this.querySelector('img');
          if (img && mainImage) {
            mainImage.src = img.src;
            mainImage.alt = img.alt;
            currentIndex = index;

            // Atualizar classe active
            thumbs.forEach(function(t) {
              t.classList.remove('active');
            });
            this.classList.add('active');
          }
        });
      });

      // Clique na imagem principal abre lightbox
      mainImage.addEventListener('click', function() {
        openLightbox(currentIndex);
      });
    }

    // Função para abrir lightbox com navegação
    function openLightbox(index) {
      if (galleryImages.length === 0) return;

      currentIndex = index;
      const image = galleryImages[currentIndex];

      // Criar overlay via DOM (evita XSS por innerHTML)
      var overlay = document.createElement('div');
      overlay.className = 'lightbox-overlay';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-label', 'Galeria de imagens');

      var contentDiv = document.createElement('div');
      contentDiv.className = 'lightbox-content';

      var lightboxImg = document.createElement('img');
      lightboxImg.src = image.src;
      lightboxImg.alt = image.alt;
      contentDiv.appendChild(lightboxImg);

      var closeBtnEl = document.createElement('button');
      closeBtnEl.className = 'lightbox-close';
      closeBtnEl.setAttribute('aria-label', 'Fechar');
      closeBtnEl.textContent = '\u00D7';
      contentDiv.appendChild(closeBtnEl);

      var prevBtn = null;
      var nextBtn = null;
      var counter = null;

      if (galleryImages.length > 1) {
        prevBtn = document.createElement('button');
        prevBtn.className = 'lightbox-prev';
        prevBtn.setAttribute('aria-label', 'Anterior');
        var prevIcon = document.createElement('i');
        prevIcon.className = 'ph ph-caret-left';
        prevBtn.appendChild(prevIcon);
        contentDiv.appendChild(prevBtn);

        nextBtn = document.createElement('button');
        nextBtn.className = 'lightbox-next';
        nextBtn.setAttribute('aria-label', 'Próxima');
        var nextIcon = document.createElement('i');
        nextIcon.className = 'ph ph-caret-right';
        nextBtn.appendChild(nextIcon);
        contentDiv.appendChild(nextBtn);

        counter = document.createElement('div');
        counter.className = 'lightbox-counter';
        counter.textContent = (currentIndex + 1) + ' / ' + galleryImages.length;
        contentDiv.appendChild(counter);
      }

      overlay.appendChild(contentDiv);
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';
      closeBtnEl.focus();

      // Navegar para anterior
      function showPrev() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage();
      }

      // Navegar para próxima
      function showNext() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        updateLightboxImage();
      }

      // Atualizar imagem do lightbox
      function updateLightboxImage() {
        const img = galleryImages[currentIndex];
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        if (counter) {
          counter.textContent = (currentIndex + 1) + ' / ' + galleryImages.length;
        }
      }

      // Event listeners para navegação
      if (prevBtn) prevBtn.addEventListener('click', showPrev);
      if (nextBtn) nextBtn.addEventListener('click', showNext);

      // Função centralizada para fechar lightbox
      function closeLightbox() {
        overlay.remove();
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeydown);
        if (mainImage) mainImage.focus();
      }

      // Fechar ao clicar no overlay ou botão fechar
      overlay.addEventListener('click', function(event) {
        if (event.target === overlay || event.target.classList.contains('lightbox-close')) {
          closeLightbox();
        }
      });

      // Focus trap — keep Tab within lightbox
      var focusableEls = overlay.querySelectorAll('button');
      var firstFocusable = focusableEls[0];
      var lastFocusable = focusableEls[focusableEls.length - 1];

      // Navegação por teclado
      function handleKeydown(event) {
        if (event.key === 'Escape') {
          closeLightbox();
        } else if (event.key === 'ArrowLeft') {
          showPrev();
        } else if (event.key === 'ArrowRight') {
          showNext();
        } else if (event.key === 'Tab') {
          if (event.shiftKey) {
            if (document.activeElement === firstFocusable) {
              event.preventDefault();
              lastFocusable.focus();
            }
          } else {
            if (document.activeElement === lastFocusable) {
              event.preventDefault();
              firstFocusable.focus();
            }
          }
        }
      }
      document.addEventListener('keydown', handleKeydown);
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
  }

  // Executar quando DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
