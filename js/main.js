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
    const prefix = element.dataset.prefix || '';
    const increment = target / (duration / 16);
    let current = 0;
    var fmt = window.WeBoatI18n ? window.WeBoatI18n.formatNumber : function(n) { return n.toLocaleString('pt-BR'); };

    const timer = setInterval(function() {
      current += increment;
      if (current >= target) {
        element.textContent = prefix + fmt(target);
        clearInterval(timer);
      } else {
        element.textContent = prefix + fmt(Math.floor(current));
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
  // WHATSAPP SOURCE TRACKING
  // Captura fbclid/gclid da URL e injeta nos links wa.me ao clicar
  // ============================================
  function initWhatsAppTracking() {
    var params = new URLSearchParams(window.location.search);

    // Capturar parâmetros de tracking da URL
    var fbclid     = params.get('fbclid');
    var gclid      = params.get('gclid');
    var utmSource  = params.get('utm_source');
    var utmMedium  = params.get('utm_medium');
    var utmCampaign = params.get('utm_campaign');

    // Persistir na sessão (sobrescreve se chegou novo clique)
    if (fbclid)      sessionStorage.setItem('wb_fbclid', fbclid);
    if (gclid)       sessionStorage.setItem('wb_gclid',  gclid);
    if (utmSource)   sessionStorage.setItem('wb_utm_source',  utmSource);
    if (utmMedium)   sessionStorage.setItem('wb_utm_medium',  utmMedium);
    if (utmCampaign) sessionStorage.setItem('wb_utm_campaign', utmCampaign);

    // Determinar fonte pela combinação UTM + clids + referrer
    function detectarFonte() {
      var stored = sessionStorage.getItem('wb_fonte');
      if (stored) return stored;

      var src = sessionStorage.getItem('wb_utm_source');
      var med = sessionStorage.getItem('wb_utm_medium');
      var isPaid = med && /cpc|paid|ppc/i.test(med);

      var fonte = null;

      // 1. UTM explícito (mais confiável)
      if (src) {
        if (/google/i.test(src))   fonte = isPaid ? 'google_ads' : 'google_organic';
        else if (/meta|facebook|instagram|ig|fb/i.test(src)) fonte = isPaid ? 'meta_ads' : 'meta_organic';
        else fonte = isPaid ? (src + '_ads') : src;
      }
      // 2. Click IDs (gclid = sempre ads, fbclid = pode ser orgânico)
      else if (sessionStorage.getItem('wb_gclid')) {
        fonte = 'google_ads';
      }
      else if (sessionStorage.getItem('wb_fbclid')) {
        fonte = 'meta';  // fbclid sem UTM = indeterminado (pode ser ad ou orgânico)
      }
      // 3. Referrer (último recurso)
      else {
        var ref = document.referrer || '';
        if (/google\./i.test(ref))     fonte = 'google_organic';
        else if (/instagram\.|facebook\.|fb\.com/i.test(ref)) fonte = 'meta_organic';
      }

      if (fonte) sessionStorage.setItem('wb_fonte', fonte);
      return fonte;
    }

    var fonte = detectarFonte();

    // Interceptar cliques em links WhatsApp
    document.addEventListener('click', function(e) {
      var link = e.target.closest('a[href*="wa.me"]');
      if (!link) return;

      var href = link.getAttribute('href');
      if (!href || !href.includes('wa.me')) return;

      var f   = sessionStorage.getItem('wb_fonte')  || fonte;
      var fbc = sessionStorage.getItem('wb_fbclid');
      var gc  = sessionStorage.getItem('wb_gclid');

      // dataLayer push para GTM (GA4 + Meta Pixel)
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'whatsapp_click',
        whatsapp_fonte: f || 'direto',
        whatsapp_page: window.location.pathname
      });

      // Beacon para backend (click_tracking table)
      var phoneMatch = href.match(/wa\.me\/(\d+)/);
      var phoneHint = phoneMatch ? phoneMatch[1].slice(-4) : '';
      var gaMatch = document.cookie.match(/_ga=GA\d+\.\d+\.(\d+\.\d+)/);
      var gaClientId = gaMatch ? gaMatch[1] : null;

      if (phoneHint) {
        navigator.sendBeacon('https://api.weboatbrasil.com.br/public/track-click',
          new Blob([JSON.stringify({
            phone_hint: phoneHint,
            fonte: f || null,
            fbclid: fbc || null,
            gclid: gc || null,
            ga_client_id: gaClientId,
            utm_source: sessionStorage.getItem('wb_utm_source') || null,
            utm_medium: sessionStorage.getItem('wb_utm_medium') || null,
            utm_campaign: sessionStorage.getItem('wb_utm_campaign') || null
          })], { type: 'text/plain' })
        );
      }
    }, true);
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
    initWhatsAppTracking();

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
