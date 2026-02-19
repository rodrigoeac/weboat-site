/**
 * WeBoat Brasil - Form Validation
 * Validação de formulários de contato
 */

(function() {
  'use strict';

  var I = window.WeBoatI18n;
  function t(key, fallback) { return I ? I.t(key) : fallback; }

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

    // Validação em tempo real (debounced)
    var validationTimeouts = {};
    const inputs = form.querySelectorAll('.contato-form__input, .contato-form__select, .contato-form__textarea');
    inputs.forEach(function(input) {
      input.addEventListener('blur', function() {
        validateField(input);
      });

      input.addEventListener('input', function() {
        // Remove erro ao digitar (debounced to avoid jank on fast typing)
        var fieldId = input.id || input.name;
        if (validationTimeouts[fieldId]) clearTimeout(validationTimeouts[fieldId]);
        validationTimeouts[fieldId] = setTimeout(function() {
          if (input.classList.contains('form-input--error')) {
            removeError(input);
          }
        }, 300);
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
        showError(emailField, t('formInvalidEmail', 'Por favor, insira um e-mail válido.'));
        isValid = false;
      }
    }

    // Valida telefone
    const phoneField = form.querySelector('#telefone');
    if (phoneField && !validatePhone(phoneField.value)) {
      showError(phoneField, t('formInvalidPhone', 'Por favor, insira um telefone válido com DDD.'));
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
      const email = emailEl ? emailEl.value || t('formNotProvided', 'Não informado') : t('formNotProvided', 'Não informado');
      const assunto = assuntoEl ? assuntoEl.options[assuntoEl.selectedIndex].text : t('formGeneral', 'Geral');
      const data = dataEl ? dataEl.value || t('formDateNotProvided', 'Não informada') : t('formDateNotProvided', 'Não informada');
      const pessoas = pessoasEl ? pessoasEl.value || t('formNotProvided', 'Não informado') : t('formNotProvided', 'Não informado');
      const mensagem = mensagemEl.value;

      // Formata data para exibição
      let dataFormatada = data;
      if (data && data !== t('formDateNotProvided', 'Não informada')) {
        const partes = data.split('-');
        dataFormatada = partes[2] + '/' + partes[1] + '/' + partes[0];
      }

      // Monta texto da mensagem
      var langTag = I ? ' [' + I.lang + ']' : '';
      const textoWhatsApp = encodeURIComponent(
        '*' + t('formNewMessage', 'Nova mensagem do site WeBoat Brasil') + '*' + langTag + '\n\n' +
        '*' + t('formName', 'Nome') + ':* ' + nome + '\n' +
        '*' + t('formPhone', 'Telefone') + ':* ' + telefone + '\n' +
        '*' + t('formEmail', 'E-mail') + ':* ' + email + '\n' +
        '*' + t('formSubject', 'Assunto') + ':* ' + assunto + '\n' +
        '*' + t('formDateDesired', 'Data desejada') + ':* ' + dataFormatada + '\n' +
        '*' + t('formPeople', 'Pessoas') + ':* ' + pessoas + '\n\n' +
        '*' + t('formMessage', 'Mensagem') + ':*\n' + mensagem
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
      showError(field, t('formRequired', 'Este campo é obrigatório.'));
      return false;
    }

    // Validações específicas por tipo
    if (field.type === 'email' && value !== '') {
      if (!validateEmail(value)) {
        showError(field, t('formInvalidEmail', 'Por favor, insira um e-mail válido.'));
        return false;
      }
    }

    if (field.type === 'tel' && value !== '') {
      if (!validatePhone(value)) {
        showError(field, t('formInvalidPhoneShort', 'Por favor, insira um telefone válido.'));
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
    field.setAttribute('aria-invalid', 'true');

    // Cria elemento de erro se não existir
    var errorId = 'error-' + (field.id || field.name);
    var errorEl = field.parentNode.querySelector('.form-error');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'form-error';
      errorEl.id = errorId;
      field.parentNode.appendChild(errorEl);
    } else {
      errorEl.id = errorId;
    }
    errorEl.textContent = message;
    field.setAttribute('aria-describedby', errorId);
  }

  /**
   * Remove mensagem de erro
   */
  function removeError(field) {
    field.classList.remove('form-input--error');
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
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
    var icon = document.createElement('i');
    icon.className = 'ph ph-check-circle';
    successEl.appendChild(icon);
    successEl.appendChild(document.createTextNode(' ' + t('formSuccessMessage', 'Mensagem enviada! Você será redirecionado para o WhatsApp.')));

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

    function formatPhone() {
      var value = phoneField.value.replace(/\D/g, '');
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

      phoneField.value = formattedValue;
    }

    phoneField.addEventListener('input', formatPhone);
    phoneField.addEventListener('paste', function() {
      setTimeout(formatPhone, 10);
    });
  }

})();
