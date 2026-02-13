'use strict';

(function() {
    var API_BASE = 'https://api.weboatbrasil.com.br';
    var POLL_INTERVAL = 5000; // 5 seconds
    var pollTimer = null;
    var currentToken = null;
    var checkoutData = null;
    var selectedMethod = null;

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

    // Step 2
    var methodButtons = document.querySelectorAll('.payment-method');
    var payBtn = document.getElementById('pay-btn');
    var pixSection = document.getElementById('pix-section');
    var zelleSection = document.getElementById('zelle-section');

    // ── Init ──
    function init() {
        currentToken = getTokenFromURL();
        if (!currentToken) {
            showError('Link inválido', 'Este link de checkout não é válido.');
            return;
        }

        loadCheckout();
        bindEvents();
    }

    function getTokenFromURL() {
        var params = new URLSearchParams(window.location.search);
        return params.get('token');
    }

    // ── Load checkout data ──
    function loadCheckout() {
        showLoading(true);

        fetch(API_BASE + '/checkout/' + encodeURIComponent(currentToken))
            .then(function(res) {
                if (res.status === 410) {
                    return res.json().then(function(data) {
                        if (data.expired) {
                            showError('Link Expirado', 'Este link de pagamento expirou. Entre em contato pelo WhatsApp para solicitar um novo.');
                        } else if (data.cancelled) {
                            showError('Reserva Cancelada', 'Esta reserva foi cancelada. Entre em contato pelo WhatsApp para mais informações.');
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

                if (data.alreadyPaid) {
                    goToStep(3);
                    renderConfirmation(data);
                } else if (data.status === 'aguardando_pagamento') {
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
                showError('Checkout não encontrado', 'Verifique se o link está correto ou entre em contato pelo WhatsApp.');
            });
    }

    // ── Render proposal summary ──
    function renderProposalSummary(data) {
        var el = document.getElementById('proposal-summary');
        if (!el) return;

        var p = data.passeio;
        var pr = data.preco;

        var turnoLabel = p.turno === 'manha' ? 'Manhã' : 'Tarde';
        var dataLabel = p.dataPasseio ? formatDate(p.dataPasseio) : 'A confirmar';

        setText('ps-boat', data.lancha.nome);
        setText('ps-route', (p.roteiroNome || p.roteiro));
        setText('ps-date', dataLabel);
        setText('ps-time', turnoLabel + (p.horario ? ' (' + p.horario + ')' : ''));
        setText('ps-duration', p.duracaoHoras + 'h');
        setText('ps-people', p.numPessoas + ' pessoas');

        // Price breakdown
        var breakdown = document.getElementById('ps-breakdown');
        while (breakdown.firstChild) breakdown.removeChild(breakdown.firstChild);

        addBreakdownItem(breakdown, 'Passeio', pr.precoBase);
        if (pr.adicionalTurno > 0) addBreakdownItem(breakdown, 'Adicional turno', pr.adicionalTurno);
        if (pr.valorHoraExtra > 0) addBreakdownItem(breakdown, 'Hora extra (' + pr.horasExtras + 'h)', pr.valorHoraExtra);
        if (pr.valorPessoaExtra > 0) addBreakdownItem(breakdown, 'Pessoa extra', pr.valorPessoaExtra);
        if (pr.valorAC > 0) addBreakdownItem(breakdown, 'Ar condicionado', pr.valorAC);
        if (pr.valorChurrasqueira > 0) addBreakdownItem(breakdown, 'Churrasqueira', pr.valorChurrasqueira);
        if (pr.valorGuardaVidas > 0) addBreakdownItem(breakdown, 'Guarda-vidas', pr.valorGuardaVidas);

        // Services
        if (pr.servicos && pr.servicos.length > 0) {
            pr.servicos.forEach(function(s) {
                addBreakdownItem(breakdown, s.nome, s.subtotal);
            });
        }

        addBreakdownItem(breakdown, 'Total', pr.valorTotal, true);
        addBreakdownItem(breakdown, 'Entrada (' + pr.percentualEntrada + '%)', pr.valorEntrada, false, true);

        if (pr.valorRestante > 0) {
            addBreakdownItem(breakdown, 'Restante (no dia)', pr.valorRestante);
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
            phoneInput.value = data.customer.phone;
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
            });
        }

        // CPF mask
        if (cpfInput) {
            cpfInput.addEventListener('input', function() { mascaraCPF(this); });
        }

        // Phone mask
        if (phoneInput) {
            phoneInput.addEventListener('input', function() { mascaraTelefone(this); });
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
            });
        });

        // Pay button
        if (payBtn) {
            payBtn.addEventListener('click', handlePayment);
        }
    }

    // ── Step 1: Submit customer data ──
    function handleCustomerSubmit(e) {
        e.preventDefault();

        var nome = document.getElementById('customer-nome').value.trim();
        var email = document.getElementById('customer-email').value.trim();
        var phone = phoneInput.value.trim();
        var termos = document.getElementById('termos-aceite').checked;
        var isEstrangeiro = foreignToggle.checked;

        var cpf = '', passaporte = '';
        if (!isEstrangeiro) {
            cpf = cpfInput.value.trim();
            if (!validarCPF(cpf)) {
                showFieldError('customer-cpf', 'CPF inválido');
                return;
            }
        } else {
            passaporte = document.getElementById('customer-passaporte').value.trim();
            if (!passaporte) {
                showFieldError('customer-passaporte', 'Passaporte obrigatório');
                return;
            }
        }

        if (!nome || !email) {
            if (!nome) showFieldError('customer-nome', 'Nome obrigatório');
            if (!email) showFieldError('customer-email', 'Email obrigatório');
            return;
        }

        if (!termos) {
            alert('Você precisa aceitar os termos para continuar.');
            return;
        }

        var submitBtn = formEl.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Salvando...';

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
            goToStep(2);
            updatePaymentMethods(isEstrangeiro);
        })
        .catch(function(err) {
            alert(err.message || 'Erro ao salvar dados. Tente novamente.');
        })
        .finally(function() {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Continuar para Pagamento';
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

        payBtn.disabled = true;
        payBtn.textContent = 'Processando...';

        fetch(API_BASE + '/checkout/' + encodeURIComponent(currentToken) + '/pay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ metodo: selectedMethod })
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
            alert(err.message || 'Erro ao iniciar pagamento.');
            payBtn.disabled = false;
            payBtn.textContent = 'Pagar Agora';
        });
    }

    function showPixPayment(pix) {
        if (!pixSection) return;

        document.getElementById('method-selection').style.display = 'none';
        pixSection.style.display = 'block';

        // QR code
        var qrImg = document.getElementById('pix-qrcode-img');
        if (pix.qrCodeBase64) {
            qrImg.src = 'data:image/png;base64,' + pix.qrCodeBase64;
            qrImg.alt = 'QR Code PIX';
        }

        // Copia e cola
        var codeEl = document.getElementById('pix-code');
        codeEl.textContent = pix.copiaCola;

        var copyBtn = document.getElementById('pix-copy-btn');
        copyBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(pix.copiaCola).then(function() {
                copyBtn.textContent = 'Copiado!';
                setTimeout(function() { copyBtn.textContent = 'Copiar'; }, 2000);
            });
        });

        // Countdown
        if (pix.expiraEm) {
            startPixCountdown(new Date(pix.expiraEm));
        }

        // Start polling
        startPolling();
    }

    function showZelleInstructions() {
        document.getElementById('method-selection').style.display = 'none';
        if (zelleSection) zelleSection.style.display = 'block';
    }

    function startPixCountdown(expiry) {
        var countdownEl = document.getElementById('pix-countdown-time');
        if (!countdownEl) return;

        function updateCountdown() {
            var remaining = expiry - new Date();
            if (remaining <= 0) {
                countdownEl.textContent = 'Expirado';
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
        steps.forEach(function(step, i) {
            step.classList.remove('checkout-step--active', 'checkout-step--done');
            if (i + 1 < stepNum) step.classList.add('checkout-step--done');
            if (i + 1 === stepNum) step.classList.add('checkout-step--active');
        });

        panels.forEach(function(panel) {
            panel.style.display = panel.dataset.step == stepNum ? 'block' : 'none';
        });

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

    // ── Start ──
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
