/* ============================================
   WEBOAT BRASIL - GALLERY LIGHTBOX
   Extracted from main.js for code splitting.
   Only loaded on boat detail pages with .lancha-gallery__main
   ============================================ */

(function() {
  'use strict';

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
        if (prevBtn) prevBtn.setAttribute('aria-label', 'Anterior (' + ((currentIndex - 1 + galleryImages.length) % galleryImages.length + 1) + ' de ' + galleryImages.length + ')');
        if (nextBtn) nextBtn.setAttribute('aria-label', 'Próxima (' + ((currentIndex + 1) % galleryImages.length + 1) + ' de ' + galleryImages.length + ')');
        overlay.setAttribute('aria-label', 'Imagem ' + (currentIndex + 1) + ' de ' + galleryImages.length);
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

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
  } else {
    initGallery();
  }

})();
