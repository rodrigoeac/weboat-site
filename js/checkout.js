'use strict';

(function() {
    var I = window.WeBoatI18n;
    function t(key, fallback) { return I ? I.t(key) : fallback; }

    var API_BASE = 'https://api.weboatbrasil.com.br';
    var POLL_INTERVAL = 5000;
    var pollTimer = null;
    var currentToken = null;
    var checkoutData = null;
    var selectedMethod = null;
    var usdRate = null;
    var currentStep = 1;
    var completedSteps = {}; // tracks which steps have been completed
    var paymentStarted = false; // true after clicking "Pagar Agora"

    // ── DOM Elements ──
    var steps = document.querySelectorAll('.checkout-step');
    var panels = document.querySelectorAll('.checkout-panel');
    var loadingEl = document.getElementById('checkout-loading');
    var errorEl = document.getElementById('checkout-error');

    // Step 1
    var formEl = document.getElementById('checkout-form');
    var foreignToggle = document.getElementById('is-estrangeiro');
    var cpfGroup = document.getElementById('cpf-group');
    var passportGroup = document.getElementById('passport-group');
    var cpfInput = document.getElementById('customer-cpf');
    var phoneInput = document.getElementById('customer-phone');
    var phoneCountrySelect = document.getElementById('phone-country');

    // Step 2
    var methodButtons = document.querySelectorAll('.payment-method');
    var payBtn = document.getElementById('pay-btn');
    var pixSection = document.getElementById('pix-section');
    var zelleSection = document.getElementById('zelle-section');
    var parcelasSection = document.getElementById('parcelas-section');
    var parcelasSelect = document.getElementById('parcelas-select');

    // ── Init ──
    function init() {
        currentToken = getTokenFromURL();
        if (!currentToken) {
            showError(t('checkoutInvalidLink', 'Link inválido'), t('checkoutInvalidLinkMsg', 'Este link de checkout não é válido.'));
            return;
        }

        loadCheckout();
        bindEvents();
        fetchUsdRate();
    }

    function getTokenFromURL() {
        var params = new URLSearchParams(window.location.search);
        return params.get('token');
    }

    function getStatusFromURL() {
        var params = new URLSearchParams(window.location.search);
        return params.get('status');
    }

    // ── Fetch USD/BRL rate ──
    function fetchUsdRate() {
        fetch('https://api.exchangerate-api.com/v4/latest/USD')
            .then(function(res) { return res.json(); })
            .then(function(data) {
                if (data && data.rates && data.rates.BRL) {
                    usdRate = data.rates.BRL;
                }
            })
            .catch(function() {
                usdRate = null;
            });
    }

    // ── Load checkout data ──
    function loadCheckout() {
        showLoading(true);

        fetch(API_BASE + '/checkout/' + encodeURIComponent(currentToken))
            .then(function(res) {
                if (res.status === 410) {
                    return res.json().then(function(data) {
                        if (data.expired) {
                            showError(t('checkoutExpired', 'Link Expirado'), t('checkoutExpiredMsg', 'Este link de pagamento expirou. Entre em contato pelo WhatsApp para solicitar um novo.'));
                        } else if (data.cancelled) {
                            showError(t('checkoutCancelled', 'Reserva Cancelada'), t('checkoutCancelledMsg', 'Esta reserva foi cancelada. Entre em contato pelo WhatsApp para mais informações.'));
                        }
                        throw new Error('gone');
                    });
                }
                if (!res.ok) throw new Error('not_found');
                return res.json();
            })
            .then(function(data) {
                checkoutData = data;
                showLoading(false);

                var urlStatus = getStatusFromURL();

                if (data.alreadyPaid) {
                    completedSteps[1] = true;
                    completedSteps[2] = true;
                    goToStep(3);
                    renderConfirmation(data);
                } else if (urlStatus === 'success') {
                    completedSteps[1] = true;
                    renderProposalSummary(data);
                    goToStep(2);
                    showCardProcessing();
                } else if (data.status === 'aguardando_pagamento') {
                    completedSteps[1] = true;
                    renderProposalSummary(data);
                    goToStep(2);
                } else {
                    renderProposalSummary(data);
                    prefillCustomerData(data);
                    goToStep(1);
                }
            })
            .catch(function(err) {
                if (err.message === 'gone') return;
                showLoading(false);
                showError(t('checkoutNotFound', 'Checkout não encontrado'), t('checkoutNotFoundMsg', 'Verifique se o link está correto ou entre em contato pelo WhatsApp.'));
            });
    }

    // ── Render proposal summary ──
    function renderProposalSummary(data) {
        var el = document.getElementById('proposal-summary');
        if (!el) return;

        var p = data.passeio;
        var pr = data.preco;

        var turnoLabel = p.turno === 'manha' ? t('checkoutMorning', 'Manhã') : t('checkoutAfternoon', 'Tarde');
        var dataLabel = p.dataPasseio ? formatDate(p.dataPasseio) : t('checkoutToConfirm', 'A confirmar');

        setText('ps-boat', data.lancha.nome);
        setText('ps-route', (p.roteiroNome || p.roteiro));
        setText('ps-date', dataLabel);
        setText('ps-time', turnoLabel + (p.horario ? ' (' + p.horario + ')' : ''));
        setText('ps-duration', p.duracaoHoras + 'h');
        setText('ps-people', p.numPessoas + ' ' + t('checkoutPeople', 'pessoas'));

        // Price breakdown
        var breakdown = document.getElementById('ps-breakdown');
        while (breakdown.firstChild) breakdown.removeChild(breakdown.firstChild);

        addBreakdownItem(breakdown, t('checkoutTrip', 'Passeio'), pr.precoBase);
        if (pr.adicionalTurno > 0) addBreakdownItem(breakdown, t('checkoutSurcharge', 'Adicional turno'), pr.adicionalTurno);
        if (pr.valorHoraExtra > 0) addBreakdownItem(breakdown, t('checkoutExtraHour', 'Hora extra') + ' (' + pr.horasExtras + 'h)', pr.valorHoraExtra);
        if (pr.valorPessoaExtra > 0) addBreakdownItem(breakdown, t('checkoutExtraPerson', 'Pessoa extra'), pr.valorPessoaExtra);
        if (pr.valorAC > 0) addBreakdownItem(breakdown, t('checkoutAC', 'Ar condicionado'), pr.valorAC);
        if (pr.valorChurrasqueira > 0) addBreakdownItem(breakdown, t('checkoutBBQ', 'Churrasqueira'), pr.valorChurrasqueira);
        if (pr.valorGuardaVidas > 0) addBreakdownItem(breakdown, t('checkoutLifeguard', 'Guarda-vidas'), pr.valorGuardaVidas);

        if (pr.servicos && pr.servicos.length > 0) {
            pr.servicos.forEach(function(s) {
                addBreakdownItem(breakdown, s.nome, s.subtotal);
            });
        }

        addBreakdownItem(breakdown, t('checkoutTotal', 'Total'), pr.valorTotal, true);
        addBreakdownItem(breakdown, t('checkoutDeposit', 'Entrada') + ' (' + pr.percentualEntrada + '%)', pr.valorEntrada, false, true);

        if (pr.valorRestante > 0) {
            addBreakdownItem(breakdown, t('checkoutRemaining', 'Restante (no dia)'), pr.valorRestante);
        }
    }

    function addBreakdownItem(container, label, value, isTotal, isDeposit) {
        var div = document.createElement('div');
        div.className = 'proposal-breakdown__item';
        if (isTotal) div.className += ' proposal-breakdown__item--total';
        if (isDeposit) div.className += ' proposal-breakdown__item--deposit';

        var labelSpan = document.createElement('span');
        labelSpan.textContent = label;
        var valueSpan = document.createElement('span');
        valueSpan.textContent = 'R$ ' + formatCurrency(value);

        div.appendChild(labelSpan);
        div.appendChild(valueSpan);
        container.appendChild(div);
    }

    function prefillCustomerData(data) {
        if (data.customer.phone) {
            var ph = data.customer.phone;
            // Detect country code and set selector
            if (ph.startsWith('+')) {
                var codes = ['+598', '+595', '+351', '+55', '+54', '+56', '+57', '+52', '+49', '+44', '+39', '+34', '+33', '+1'];
                for (var i = 0; i < codes.length; i++) {
                    if (ph.startsWith(codes[i])) {
                        if (phoneCountrySelect) phoneCountrySelect.value = codes[i];
                        ph = ph.substring(codes[i].length);
                        break;
                    }
                }
            } else if (/^55\d{10,11}$/.test(ph)) {
                if (phoneCountrySelect) phoneCountrySelect.value = '+55';
                ph = ph.substring(2);
            }
            phoneInput.value = ph;
        }
        if (data.customer.nome) {
            document.getElementById('customer-nome').value = data.customer.nome;
        }
        if (data.customer.email) {
            document.getElementById('customer-email').value = data.customer.email;
        }
    }

    // ── Events ──
    function bindEvents() {
        // Foreign toggle
        if (foreignToggle) {
            foreignToggle.addEventListener('change', function() {
                var isForeign = this.checked;
                cpfGroup.style.display = isForeign ? 'none' : 'flex';
                passportGroup.style.display = isForeign ? 'flex' : 'none';
                if (isForeign && phoneCountrySelect && phoneCountrySelect.value === '+55') {
                    phoneCountrySelect.value = '+1';
                } else if (!isForeign && phoneCountrySelect) {
                    phoneCountrySelect.value = '+55';
                }
            });
        }

        // CPF mask
        if (cpfInput) {
            cpfInput.addEventListener('input', function() { mascaraCPF(this); });
        }

        // Phone mask (only for +55)
        if (phoneInput) {
            phoneInput.addEventListener('input', function() {
                if (phoneCountrySelect && phoneCountrySelect.value === '+55') {
                    mascaraTelefone(this);
                }
            });
        }

        // Form submit (Step 1 → Step 2)
        if (formEl) {
            formEl.addEventListener('submit', handleCustomerSubmit);
        }

        // Payment method selection
        methodButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                methodButtons.forEach(function(b) { b.classList.remove('payment-method--selected'); });
                this.classList.add('payment-method--selected');
                selectedMethod = this.dataset.method;
                if (payBtn) payBtn.disabled = false;
                if (parcelasSection) {
                    parcelasSection.style.display = selectedMethod === 'credit_card' ? 'block' : 'none';
                }
            });
        });

        // Pay button
        if (payBtn) {
            payBtn.addEventListener('click', handlePayment);
        }

        // Back buttons (all of them)
        var backButtons = document.querySelectorAll('.checkout-back-btn');
        backButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var targetStep = parseInt(this.dataset.backTo, 10);
                if (targetStep && targetStep >= 1) {
                    goToStep(targetStep);
                }
            });
        });

        // Stepper clicks — navigate between steps
        steps.forEach(function(stepEl) {
            stepEl.style.cursor = 'pointer';
            stepEl.addEventListener('click', function() {
                var targetStep = parseInt(this.dataset.step, 10);
                if (!targetStep || targetStep === currentStep) return;

                // Don't allow navigation during payment processing
                if (paymentStarted) return;

                // Going back: always allowed (to any previous step)
                if (targetStep < currentStep) {
                    goToStep(targetStep);
                    return;
                }

                // Going forward: only if the target step was completed before
                // (or the step before it was completed, meaning you can advance to the next)
                if (completedSteps[targetStep] || completedSteps[targetStep - 1]) {
                    goToStep(targetStep);
                }
            });
        });
    }

    // ── Step 1: Submit customer data ──
    function handleCustomerSubmit(e) {
        e.preventDefault();

        var nome = document.getElementById('customer-nome').value.trim();
        var email = document.getElementById('customer-email').value.trim();
        var rawPhone = phoneInput.value.trim();
        var countryCode = phoneCountrySelect ? phoneCountrySelect.value : '+55';
        var phone = countryCode + rawPhone.replace(/\D/g, '');
        var termos = document.getElementById('termos-aceite').checked;
        var isEstrangeiro = foreignToggle.checked;

        var cpf = '', passaporte = '';
        if (!isEstrangeiro) {
            cpf = cpfInput.value.trim();
            if (!validarCPF(cpf)) {
                showFieldError('customer-cpf', t('checkoutCpfInvalid', 'CPF inválido'));
                return;
            }
        } else {
            passaporte = document.getElementById('customer-passaporte').value.trim();
            if (!passaporte) {
                showFieldError('customer-passaporte', t('checkoutPassportRequired', 'Passaporte obrigatório'));
                return;
            }
        }

        if (!nome || !email) {
            if (!nome) showFieldError('customer-nome', t('checkoutNameRequired', 'Nome obrigatório'));
            if (!email) showFieldError('customer-email', t('checkoutEmailRequired', 'Email obrigatório'));
            return;
        }

        if (!termos) {
            alert(t('checkoutAcceptTerms', 'Você precisa aceitar os termos para continuar.'));
            return;
        }

        var submitBtn = formEl.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = t('checkoutSaving', 'Salvando...');

        fetch(API_BASE + '/checkout/' + encodeURIComponent(currentToken) + '/customer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome: nome,
                cpf: cpf || undefined,
                passaporte: passaporte || undefined,
                isEstrangeiro: isEstrangeiro,
                phone: phone,
                email: email
            })
        })
        .then(function(res) {
            if (!res.ok) return res.json().then(function(d) { throw new Error(d.error); });
            return res.json();
        })
        .then(function() {
            completedSteps[1] = true;
            goToStep(2);
            updatePaymentMethods(isEstrangeiro);
        })
        .catch(function(err) {
            alert(err.message || t('checkoutSaveError', 'Erro ao salvar dados. Tente novamente.'));
        })
        .finally(function() {
            submitBtn.disabled = false;
            submitBtn.textContent = t('checkoutContinue', 'Continuar para Pagamento');
        });
    }

    function updatePaymentMethods(isEstrangeiro) {
        var zelleMethod = document.querySelector('[data-method="zelle"]');
        var paypalMethod = document.querySelector('[data-method="paypal"]');
        if (zelleMethod) zelleMethod.style.display = isEstrangeiro ? 'flex' : 'none';
        if (paypalMethod) paypalMethod.style.display = isEstrangeiro ? 'flex' : 'none';
    }

    // ── Step 2: Payment ──
    function handlePayment() {
        if (!selectedMethod) return;

        paymentStarted = true;
        payBtn.disabled = true;
        payBtn.textContent = t('checkoutProcessing', 'Processando...');

        var payBody = { metodo: selectedMethod };
        if (selectedMethod === 'credit_card' && parcelasSelect) {
            payBody.parcelas = parseInt(parcelasSelect.value, 10);
        }

        fetch(API_BASE + '/checkout/' + encodeURIComponent(currentToken) + '/pay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payBody)
        })
        .then(function(res) {
            if (!res.ok) return res.json().then(function(d) { throw new Error(d.error); });
            return res.json();
        })
        .then(function(data) {
            if (selectedMethod === 'pix') {
                showPixPayment(data.pix);
            } else if (selectedMethod === 'zelle') {
                showZelleInstructions();
            } else if (data.redirectUrl) {
                window.location.href = data.redirectUrl;
            }
        })
        .catch(function(err) {
            paymentStarted = false;
            alert(err.message || t('checkoutPayError', 'Erro ao iniciar pagamento.'));
            payBtn.disabled = false;
            payBtn.textContent = t('checkoutPayNow', 'Pagar Agora');
        });
    }

    function showPixPayment(pix) {
        if (!pixSection) return;

        document.getElementById('method-selection').style.display = 'none';
        pixSection.style.display = 'block';

        var qrImg = document.getElementById('pix-qrcode-img');
        if (pix.qrCodeBase64) {
            qrImg.src = 'data:image/png;base64,' + pix.qrCodeBase64;
            qrImg.alt = 'QR Code PIX';
        }

        var codeEl = document.getElementById('pix-code');
        codeEl.textContent = pix.copiaCola;

        var copyBtn = document.getElementById('pix-copy-btn');
        copyBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(pix.copiaCola).then(function() {
                copyBtn.textContent = t('checkoutCopied', 'Copiado!');
                setTimeout(function() { copyBtn.textContent = t('checkoutCopy', 'Copiar'); }, 2000);
            });
        });

        if (pix.expiraEm) {
            startPixCountdown(new Date(pix.expiraEm));
        }

        startPolling();
    }

    function showZelleInstructions() {
        document.getElementById('method-selection').style.display = 'none';
        if (zelleSection) {
            zelleSection.style.display = 'block';

            var zelleAmountEl = document.getElementById('zelle-amount');
            if (zelleAmountEl && checkoutData && checkoutData.preco) {
                var brlAmount = checkoutData.preco.valorEntrada;
                var html = '<p style="margin-top:var(--space-3);"><strong>Amount due: R$ ' + formatCurrency(brlAmount) + '</strong></p>';
                if (usdRate && usdRate > 0) {
                    var usdAmount = Math.ceil((brlAmount / usdRate) * 100) / 100;
                    html += '<p style="font-size:var(--text-body-sm); color:var(--driftwood);">Approximately <strong>US$ ' + usdAmount.toFixed(2) + '</strong> at today\'s rate (1 USD = R$ ' + usdRate.toFixed(2) + ')</p>';
                }
                zelleAmountEl.innerHTML = html;
            }
        }

        startPolling();
    }

    function showCardProcessing() {
        paymentStarted = true;
        document.getElementById('method-selection').style.display = 'none';

        var card = document.querySelector('[data-step="2"] .checkout-card');
        if (!card) return;

        var processingDiv = document.createElement('div');
        processingDiv.className = 'pix-status';
        processingDiv.style.padding = 'var(--space-8) 0';

        var spinner = document.createElement('div');
        spinner.className = 'pix-status__spinner';
        processingDiv.appendChild(spinner);

        var text = document.createElement('span');
        text.textContent = t('checkoutVerifying', 'Verificando pagamento...');
        processingDiv.appendChild(text);

        card.appendChild(processingDiv);

        startPolling();
    }

    function startPixCountdown(expiry) {
        var countdownEl = document.getElementById('pix-countdown-time');
        if (!countdownEl) return;

        function updateCountdown() {
            var remaining = expiry - new Date();
            if (remaining <= 0) {
                countdownEl.textContent = t('checkoutExpiredCountdown', 'Expirado');
                return;
            }
            var minutes = Math.floor(remaining / 60000);
            var seconds = Math.floor((remaining % 60000) / 1000);
            countdownEl.textContent = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    function startPolling() {
        pollTimer = setInterval(function() {
            fetch(API_BASE + '/checkout/' + encodeURIComponent(currentToken) + '/status')
                .then(function(res) { return res.json(); })
                .then(function(data) {
                    var paidStatuses = ['entrada_paga', 'totalmente_paga', 'confirmada', 'concluida'];
                    if (paidStatuses.indexOf(data.reservaStatus) !== -1) {
                        clearInterval(pollTimer);
                        completedSteps[2] = true;
                        paymentStarted = false;
                        goToStep(3);
                        renderConfirmation(checkoutData);
                    }
                });
        }, POLL_INTERVAL);
    }

    // ── Step 3: Confirmation ──
    function renderConfirmation(data) {
        var emailEl = document.getElementById('confirmation-email');
        if (emailEl && data.customer && data.customer.email) {
            emailEl.textContent = data.customer.email;
        }
    }

    // ── Navigation ──
    function goToStep(stepNum) {
        currentStep = stepNum;

        steps.forEach(function(step, i) {
            step.classList.remove('checkout-step--active', 'checkout-step--done');
            if (i + 1 < stepNum) step.classList.add('checkout-step--done');
            if (i + 1 === stepNum) step.classList.add('checkout-step--active');
        });

        panels.forEach(function(panel) {
            panel.style.display = panel.dataset.step == stepNum ? 'block' : 'none';
        });

        // When going back to step 2, restore method-selection if payment hasn't started
        if (stepNum === 2 && !paymentStarted) {
            var methodSelection = document.getElementById('method-selection');
            if (methodSelection) methodSelection.style.display = 'block';
            if (pixSection) pixSection.style.display = 'none';
            if (zelleSection) zelleSection.style.display = 'none';
        }

        window.scrollTo(0, 0);
    }

    // ── Helpers ──
    function setText(id, text) {
        var el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    function showLoading(show) {
        if (loadingEl) loadingEl.style.display = show ? 'block' : 'none';
    }

    function showError(title, message) {
        if (loadingEl) loadingEl.style.display = 'none';
        panels.forEach(function(panel) { panel.style.display = 'none'; });
        if (errorEl) {
            errorEl.style.display = 'block';
            var titleEl = errorEl.querySelector('.checkout-error__title');
            var msgEl = errorEl.querySelector('.checkout-error__message');
            if (titleEl) titleEl.textContent = title;
            if (msgEl) msgEl.textContent = message;
        }
    }

    function showFieldError(fieldId, message) {
        var field = document.getElementById(fieldId);
        if (!field) return;
        field.classList.add('form-input--error');
        var errorSpan = field.parentElement.querySelector('.form-error');
        if (!errorSpan) errorSpan = field.parentElement.parentElement.querySelector('.form-error');
        if (errorSpan) errorSpan.textContent = message;
        field.addEventListener('input', function handler() {
            field.classList.remove('form-input--error');
            if (errorSpan) errorSpan.textContent = '';
            field.removeEventListener('input', handler);
        });
    }

    function formatCurrency(value) {
        return Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 0 });
    }

    function formatDate(dateStr) {
        var parts = dateStr.split('-');
        return parts[2] + '/' + parts[1] + '/' + parts[0];
    }

    // ── Masks ──
    function mascaraCPF(el) {
        var v = el.value.replace(/\D/g, '').substring(0, 11);
        if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
        else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
        else if (v.length > 3) v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2');
        el.value = v;
    }

    function mascaraTelefone(el) {
        var v = el.value.replace(/\D/g, '').substring(0, 11);
        if (v.length > 6) v = v.replace(/(\d{2})(\d{5})(\d{1,4})/, '($1) $2-$3');
        else if (v.length > 2) v = v.replace(/(\d{2})(\d{1,5})/, '($1) $2');
        el.value = v;
    }

    // ── Start ──
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
