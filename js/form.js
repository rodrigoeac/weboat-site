/**
 * WeBoat Brasil - Form Validation
 * Validação de formulários de contato
 */

(function() {
  'use strict';

  // Aguarda o DOM carregar
  document.addEventListener('DOMContentLoaded', function() {
    initFormValidation();
    initPhoneMask();
  });

  /**
   * Inicializa validação do formulário
   */
  function initFormValidation() {
    const form = document.getElementById('formContato');

    if (!form) return;

    form.addEventListener('submit', handleFormSubmit);

    // Validação em tempo real
    const inputs = form.querySelectorAll('.contato-form__input, .contato-form__select, .contato-form__textarea');
    inputs.forEach(function(input) {
      input.addEventListener('blur', function() {
        validateField(input);
      });

      input.addEventListener('input', function() {
        // Remove erro ao digitar
        if (input.classList.contains('form-input--error')) {
          removeError(input);
        }
      });
    });
  }

  /**
   * Trata o envio do formulário
   */
  function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    let isValid = true;

    // Valida todos os campos obrigatórios
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(function(field) {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    // Valida e-mail se preenchido
    const emailField = form.querySelector('#email');
    if (emailField && emailField.value.trim() !== '') {
      if (!validateEmail(emailField.value)) {
        showError(emailField, 'Por favor, insira um e-mail válido.');
        isValid = false;
      }
    }

    // Valida telefone
    const phoneField = form.querySelector('#telefone');
    if (phoneField && !validatePhone(phoneField.value)) {
      showError(phoneField, 'Por favor, insira um telefone válido com DDD.');
      isValid = false;
    }

    if (isValid) {
      // Monta mensagem para WhatsApp
      var nomeEl = form.querySelector('#nome');
      var telefoneEl = form.querySelector('#telefone');
      var emailEl = form.querySelector('#email');
      var assuntoEl = form.querySelector('#assunto');
      var dataEl = form.querySelector('#data');
      var pessoasEl = form.querySelector('#pessoas');
      var mensagemEl = form.querySelector('#mensagem');

      if (!nomeEl || !telefoneEl || !mensagemEl) return;

      const nome = nomeEl.value;
      const telefone = telefoneEl.value;
      const email = emailEl ? emailEl.value || 'Não informado' : 'Não informado';
      const assunto = assuntoEl ? assuntoEl.options[assuntoEl.selectedIndex].text : 'Geral';
      const data = dataEl ? dataEl.value || 'Não informada' : 'Não informada';
      const pessoas = pessoasEl ? pessoasEl.value || 'Não informado' : 'Não informado';
      const mensagem = mensagemEl.value;

      // Formata data para exibição
      let dataFormatada = data;
      if (data && data !== 'Não informada') {
        const partes = data.split('-');
        dataFormatada = partes[2] + '/' + partes[1] + '/' + partes[0];
      }

      // Monta texto da mensagem
      const textoWhatsApp = encodeURIComponent(
        '*Nova mensagem do site WeBoat Brasil*\n\n' +
        '*Nome:* ' + nome + '\n' +
        '*Telefone:* ' + telefone + '\n' +
        '*E-mail:* ' + email + '\n' +
        '*Assunto:* ' + assunto + '\n' +
        '*Data desejada:* ' + dataFormatada + '\n' +
        '*Pessoas:* ' + pessoas + '\n\n' +
        '*Mensagem:*\n' + mensagem
      );

      // Redireciona para WhatsApp
      var whatsappNum = (window.WeBoatServicos && window.WeBoatServicos.WHATSAPP_NUMERO) || '5521977724114';
      const whatsappUrl = 'https://wa.me/' + whatsappNum + '?text=' + textoWhatsApp;
      window.open(whatsappUrl, '_blank');

      // Feedback visual
      showSuccessMessage(form);
    } else {
      // Scroll para o primeiro erro
      const firstError = form.querySelector('.form-input--error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
    }
  }

  /**
   * Valida um campo individual
   */
  function validateField(field) {
    const value = field.value.trim();

    // Remove erro anterior
    removeError(field);

    // Verifica se é obrigatório e está vazio
    if (field.hasAttribute('required') && value === '') {
      showError(field, 'Este campo é obrigatório.');
      return false;
    }

    // Validações específicas por tipo
    if (field.type === 'email' && value !== '') {
      if (!validateEmail(value)) {
        showError(field, 'Por favor, insira um e-mail válido.');
        return false;
      }
    }

    if (field.type === 'tel' && value !== '') {
      if (!validatePhone(value)) {
        showError(field, 'Por favor, insira um telefone válido.');
        return false;
      }
    }

    return true;
  }

  /**
   * Valida formato de e-mail
   */
  function validateEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  /**
   * Valida formato de telefone brasileiro
   */
  function validatePhone(phone) {
    // Remove caracteres não numéricos
    var numbers = phone.replace(/\D/g, '');
    // Aceita 10 ou 11 dígitos (com ou sem 9 na frente)
    return numbers.length >= 10 && numbers.length <= 11;
  }

  /**
   * Mostra mensagem de erro
   */
  function showError(field, message) {
    field.classList.add('form-input--error');

    // Cria elemento de erro se não existir
    var errorEl = field.parentNode.querySelector('.form-error');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'form-error';
      field.parentNode.appendChild(errorEl);
    }
    errorEl.textContent = message;
  }

  /**
   * Remove mensagem de erro
   */
  function removeError(field) {
    field.classList.remove('form-input--error');
    var errorEl = field.parentNode.querySelector('.form-error');
    if (errorEl) {
      errorEl.remove();
    }
  }

  /**
   * Mostra mensagem de sucesso
   */
  function showSuccessMessage(form) {
    var successEl = document.createElement('div');
    successEl.className = 'form-success';
    successEl.innerHTML = '<i class="ph ph-check-circle"></i> Mensagem enviada! Você será redirecionado para o WhatsApp.';

    var actionsEl = form.querySelector('.contato-form__actions');
    if (actionsEl) {
      actionsEl.insertBefore(successEl, actionsEl.firstChild);
    }

    // Remove após 5 segundos
    setTimeout(function() {
      successEl.remove();
    }, 5000);
  }

  /**
   * Máscara para telefone
   */
  function initPhoneMask() {
    var phoneField = document.getElementById('telefone');
    if (!phoneField) return;

    phoneField.addEventListener('input', function(e) {
      var value = e.target.value.replace(/\D/g, '');
      var formattedValue = '';

      if (value.length > 0) {
        formattedValue = '(' + value.substring(0, 2);
      }
      if (value.length > 2) {
        formattedValue += ') ' + value.substring(2, 7);
      }
      if (value.length > 7) {
        formattedValue += '-' + value.substring(7, 11);
      }

      e.target.value = formattedValue;
    });
  }

})();
