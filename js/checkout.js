'use strict';

(function() {
    var I = window.WeBoatI18n;
    function t(key, fallback) { return I ? I.t(key) : fallback; }

    var API_BASE = 'https://api.weboatbrasil.com.br';
    var POLL_INTERVAL = 5000;
    var MAX_POLLS = 120; // 10 min max
    var pollCount = 0;
    var pollTimer = null;
    var currentToken = null;
    var checkoutData = null;
    var selectedMethod = null;
    var usdRate = null;
    var currentStep = 1;
    var completedSteps = {};
    var paymentStarted = false;
    var isEstrangeiro = false;

    // ── DOM Elements ──
    var steps, panels, loadingEl, errorEl;
    var formEl, foreignToggle, cpfGroup, passportGroup, cpfInput, phoneInput, phoneCountrySelect;
    var methodButtons, payBtn, pixSection, zelleSection;

    // ── Init ──
    function init() {
        // Grab DOM elements after DOM is ready
        steps = document.querySelectorAll('.checkout-step');
        panels = document.querySelectorAll('.checkout-panel');
        loadingEl = document.getElementById('checkout-loading');
        errorEl = document.getElementById('checkout-error');

        formEl = document.getElementById('checkout-form');
        foreignToggle = document.getElementById('is-estrangeiro');
        cpfGroup = document.getElementById('cpf-group');
        passportGroup = document.getElementById('passport-group');
        cpfInput = document.getElementById('customer-cpf');
        phoneInput = document.getElementById('customer-phone');
        phoneCountrySelect = document.getElementById('phone-country');

        methodButtons = document.querySelectorAll('.payment-method');
        payBtn = document.getElementById('pay-btn');
        pixSection = document.getElementById('pix-section');
        zelleSection = document.getElementById('zelle-section');

        currentToken = getTokenFromURL();
        if (!currentToken) {
            showError(t('checkoutInvalidLink', 'Link inválido'), t('checkoutInvalidLinkMsg', 'Este link de checkout não é válido.'));
            return;
        }

        // Preserve token in language selector links
        updateLangLinks();

        bindEvents();
        loadCheckout();
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

    // ── Fetch with timeout helper ──
    function fetchWithTimeout(url, options, timeoutMs) {
        var controller = new AbortController();
        var timer = setTimeout(function() { controller.abort(); }, timeoutMs || 8000);
        var opts = Object.assign({}, options, { signal: controller.signal });
        return fetch(url, opts).finally(function() { clearTimeout(timer); });
    }

    // ── Fetch USD/BRL rate ──
    function fetchUsdRate() {
        fetchWithTimeout('https://api.exchangerate-api.com/v4/latest/USD', { cache: 'force-cache' }, 5000)
            .then(function(res) { return res.json(); })
            .then(function(data) {
                if (data && data.rates && data.rates.BRL) {
                    usdRate = data.rates.BRL;
                }
            })
            .catch(function() { usdRate = null; });
    }

    // ── Load checkout data ──
    function loadCheckout() {
        showLoading(true);

        fetchWithTimeout(API_BASE + '/checkout/' + encodeURIComponent(currentToken), {}, 8000)
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
        if (data.customer && data.customer.phone) {
            var ph = data.customer.phone;
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
            if (phoneInput) phoneInput.value = ph;
        }
        if (data.customer && data.customer.nome) {
            var nomeEl = document.getElementById('customer-nome');
            if (nomeEl) nomeEl.value = data.customer.nome;
        }
        if (data.customer && data.customer.email) {
            var emailEl = document.getElementById('customer-email');
            if (emailEl) emailEl.value = data.customer.email;
        }
    }

    // ── Events ──
    function bindEvents() {
        // Foreign toggle
        if (foreignToggle) {
            foreignToggle.addEventListener('change', function() {
                isEstrangeiro = this.checked;
                if (cpfGroup) cpfGroup.style.display = isEstrangeiro ? 'none' : 'flex';
                if (passportGroup) passportGroup.style.display = isEstrangeiro ? 'flex' : 'none';
                if (isEstrangeiro && phoneCountrySelect && phoneCountrySelect.value === '+55') {
                    phoneCountrySelect.value = '+1';
                } else if (!isEstrangeiro && phoneCountrySelect) {
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

        // Form submit (Step 1 -> Step 2)
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

        // Back buttons — use event delegation on the container
        document.addEventListener('click', function(e) {
            var btn = e.target.closest('.checkout-back-btn');
            if (!btn) return;
            e.preventDefault();
            e.stopPropagation();
            if (paymentStarted) return;
            var target = parseInt(btn.getAttribute('data-back-to'), 10);
            if (target >= 1) {
                goToStep(target);
            }
        });

        // Stepper clicks — use event delegation
        document.addEventListener('click', function(e) {
            var stepEl = e.target.closest('.checkout-step');
            if (!stepEl) return;
            var targetStep = parseInt(stepEl.getAttribute('data-step'), 10);
            if (!targetStep || targetStep === currentStep) return;
            if (paymentStarted) return;

            // Going back: always allowed
            if (targetStep < currentStep) {
                goToStep(targetStep);
                return;
            }

            // Going forward: only if previous step completed
            if (completedSteps[targetStep - 1]) {
                goToStep(targetStep);
            }
        });
    }

    // ── Step 1: Submit customer data ──
    function handleCustomerSubmit(e) {
        e.preventDefault();
        clearAllFieldErrors();

        var nome = document.getElementById('customer-nome').value.trim();
        var email = document.getElementById('customer-email').value.trim();
        var rawPhone = phoneInput ? phoneInput.value.trim() : '';
        var countryCode = phoneCountrySelect ? phoneCountrySelect.value : '+55';
        var phoneDigits = rawPhone.replace(/\D/g, '');
        var phone = phoneDigits ? (countryCode + phoneDigits) : '';
        var termos = document.getElementById('termos-aceite').checked;
        isEstrangeiro = foreignToggle ? foreignToggle.checked : false;

        var hasError = false;

        if (!nome) {
            showFieldError('customer-nome', t('checkoutNameRequired', 'Nome obrigatório'));
            hasError = true;
        }

        if (!email) {
            showFieldError('customer-email', t('checkoutEmailRequired', 'Email obrigatório'));
            hasError = true;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showFieldError('customer-email', t('checkoutEmailInvalid', 'Email inválido'));
            hasError = true;
        }

        if (!phoneDigits) {
            showFieldError('customer-phone', t('checkoutPhoneRequired', 'Telefone obrigatório'));
            hasError = true;
        } else if (countryCode === '+55' && phoneDigits.length < 10) {
            showFieldError('customer-phone', t('checkoutPhoneInvalid', 'Telefone inválido'));
            hasError = true;
        } else if (phoneDigits.length < 6) {
            showFieldError('customer-phone', t('checkoutPhoneInvalid', 'Telefone inválido'));
            hasError = true;
        }

        var cpf = '', passaporte = '';
        if (!isEstrangeiro) {
            cpf = cpfInput ? cpfInput.value.trim() : '';
            if (!validarCPF(cpf)) {
                showFieldError('customer-cpf', t('checkoutCpfInvalid', 'CPF inválido'));
                hasError = true;
            }
        } else {
            passaporte = document.getElementById('customer-passaporte').value.trim();
            if (!passaporte) {
                showFieldError('customer-passaporte', t('checkoutPassportRequired', 'Passaporte obrigatório'));
                hasError = true;
            }
        }

        if (!termos) {
            alert(t('checkoutAcceptTerms', 'Você precisa aceitar os termos para continuar.'));
            hasError = true;
        }

        if (hasError) return;

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
            updatePaymentMethods();
        })
        .catch(function(err) {
            alert(err.message || t('checkoutSaveError', 'Erro ao salvar dados. Tente novamente.'));
        })
        .finally(function() {
            submitBtn.disabled = false;
            submitBtn.textContent = t('checkoutContinue', 'Continuar para Pagamento');
        });
    }

    function updatePaymentMethods() {
        var zelleMethod = document.querySelector('[data-method="zelle"]');
        var paypalMethod = document.querySelector('[data-method="paypal"]');
        var cardMethod = document.querySelector('[data-method="credit_card"]');

        if (zelleMethod) zelleMethod.style.display = isEstrangeiro ? 'flex' : 'none';
        if (paypalMethod) paypalMethod.style.display = isEstrangeiro ? 'flex' : 'none';
        if (cardMethod) cardMethod.style.display = isEstrangeiro ? 'none' : 'flex';
    }

    // ── Step 2: Payment ──
    function handlePayment() {
        if (!selectedMethod) return;

        paymentStarted = true;
        payBtn.disabled = true;
        payBtn.textContent = t('checkoutProcessing', 'Processando...');

        var payBody = { metodo: selectedMethod };

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
        pollCount = 0;
        pollTimer = setInterval(function() {
            pollCount++;
            if (pollCount >= MAX_POLLS) {
                clearInterval(pollTimer);
                pollTimer = null;
                var statusEl = document.querySelector('.pix-status span');
                if (statusEl) statusEl.textContent = t('checkoutPollTimeout', 'Tempo esgotado. Atualize a página para verificar o status.');
                return;
            }
            fetch(API_BASE + '/checkout/' + encodeURIComponent(currentToken) + '/status')
                .then(function(res) { return res.json(); })
                .then(function(data) {
                    var paidStatuses = ['entrada_paga', 'totalmente_paga', 'confirmada', 'concluida'];
                    if (paidStatuses.indexOf(data.reservaStatus) !== -1) {
                        clearInterval(pollTimer);
                        pollTimer = null;
                        completedSteps[2] = true;
                        paymentStarted = false;
                        goToStep(3);
                        renderConfirmation(checkoutData);
                    }
                })
                .catch(function() {
                    if (pollCount > 30) {
                        clearInterval(pollTimer);
                        pollTimer = null;
                    }
                });
        }, POLL_INTERVAL);

        // Cleanup on page unload
        window.addEventListener('beforeunload', function() {
            if (pollTimer) {
                clearInterval(pollTimer);
                pollTimer = null;
            }
        });
    }

    // ── Step 3: Confirmation ──
    var ROTEIRO_NOMES = {
        R1: 'Roteiro 1 — Mureta da Urca',
        R2: 'Roteiro 2 — Mureta da Urca + Praia Vermelha',
        R3: 'Roteiro 3 — Mureta + Praia Vermelha + Copacabana',
        R4: 'Roteiro 4 — Mureta + Praia Vermelha + Copa + Ilhas Cagarras',
        R5: 'Roteiro 5 — Camboinhas + Praia da Itaipu'
    };

    function renderConfirmation(data) {
        var emailEl = document.getElementById('confirmation-email');
        if (emailEl && data.customer && data.customer.email) {
            emailEl.textContent = data.customer.email;
        }

        if (!data.passeio || !data.preco) return;

        var p = data.passeio;
        var pr = data.preco;
        var turnoLabel = p.turno === 'manha' ? t('checkoutMorning', 'Manha') : t('checkoutAfternoon', 'Tarde');
        var dataLabel = p.dataPasseio ? formatDate(p.dataPasseio) : t('checkoutToConfirm', 'A confirmar');

        setText('conf-boat', data.lancha.nome);
        setText('conf-route', ROTEIRO_NOMES[p.roteiro] || p.roteiroNome || p.roteiro);
        setText('conf-date', dataLabel + (p.horario ? ' | ' + p.horario : ''));
        setText('conf-time', turnoLabel + ' (' + (p.duracaoHoras || 5) + 'h)');
        setText('conf-people', p.numPessoas);

        // Valores
        var breakdown = document.getElementById('conf-breakdown');
        if (breakdown) {
            while (breakdown.firstChild) breakdown.removeChild(breakdown.firstChild);

            addBreakdownItem(breakdown, t('checkoutTrip', 'Passeio') + ' (' + (p.duracaoHoras || 5) + 'h)', pr.precoBase);
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

            // Desconto
            var subtotalSemDesconto = pr.precoBase + (pr.totalServicos || 0) + (pr.adicionalTurno || 0) + (pr.valorHoraExtra || 0) + (pr.valorPessoaExtra || 0) + (pr.valorAC || 0) + (pr.valorChurrasqueira || 0) + (pr.valorGuardaVidas || 0);
            var desconto = subtotalSemDesconto - pr.valorTotal;
            if (desconto > 0) {
                var descontoDiv = document.createElement('div');
                descontoDiv.className = 'proposal-breakdown__item';
                descontoDiv.style.color = 'var(--success)';
                var dl = document.createElement('span'); dl.textContent = t('checkoutDiscount', 'Desconto');
                var dv = document.createElement('span'); dv.textContent = '- R$ ' + formatCurrency(desconto);
                descontoDiv.appendChild(dl); descontoDiv.appendChild(dv);
                breakdown.appendChild(descontoDiv);
            }

            addBreakdownItem(breakdown, t('checkoutTotal', 'Total'), pr.valorTotal, true);
            addBreakdownItem(breakdown, t('checkoutPaid', 'Valor pago'), pr.valorEntrada, false, true);
            if (pr.valorRestante > 0) {
                addBreakdownItem(breakdown, t('checkoutRemaining', 'Restante (no dia)'), pr.valorRestante);
            }
        }

        // Save PDF button
        var saveBtn = document.getElementById('conf-save-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function() {
                savePDF(data);
            });
        }

        // Calendar button
        var calBtn = document.getElementById('conf-calendar-btn');
        if (calBtn) {
            calBtn.addEventListener('click', function() {
                downloadICS(data);
            });
        }
    }

    // ── PDF generation (jsPDF loaded dynamically) ──
    function savePDF(data) {
        var p = data.passeio;
        var pr = data.preco;
        var turnoLabel = p.turno === 'manha' ? t('checkoutMorning', 'Manha') : t('checkoutAfternoon', 'Tarde');
        var dataLabel = p.dataPasseio ? formatDate(p.dataPasseio) : t('checkoutToConfirm', 'A confirmar');
        var roteiro = ROTEIRO_NOMES[p.roteiro] || p.roteiroNome || p.roteiro;

        // Load jsPDF dynamically
        if (window.jspdf) {
            generatePDF(data, p, pr, turnoLabel, dataLabel, roteiro);
        } else {
            var script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.2/jspdf.umd.min.js';
            script.onload = function() {
                generatePDF(data, p, pr, turnoLabel, dataLabel, roteiro);
            };
            script.onerror = function() {
                // Fallback: share or copy text
                fallbackSaveText(data, p, pr, turnoLabel, dataLabel, roteiro);
            };
            document.head.appendChild(script);
        }
    }

    function generatePDF(data, p, pr, turnoLabel, dataLabel, roteiro) {
        var jsPDF = window.jspdf.jsPDF;
        var doc = new jsPDF({ unit: 'mm', format: 'a4' });
        var w = doc.internal.pageSize.getWidth();
        var margin = 20;
        var y = 20;
        var col2 = w - margin;

        // Header bar
        doc.setFillColor(30, 58, 95); // ocean-deep
        doc.rect(0, 0, w, 35, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text('WeBoat Brasil', margin, 18);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(t('checkoutTrip', 'Passeio') + ' — ' + roteiro, margin, 28);

        // Reset colors
        y = 48;
        doc.setTextColor(55, 65, 81); // charcoal

        // Reservation details
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 58, 95);
        doc.text(t('checkoutTotal', 'Reserva').toUpperCase(), margin, y);
        y += 8;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(55, 65, 81);

        var details = [
            ['Lancha', data.lancha.nome],
            [t('checkoutTrip', 'Roteiro'), roteiro],
            ['Data', dataLabel],
            ['Turno', turnoLabel + ' (' + (p.duracaoHoras || 5) + 'h)'],
            [t('checkoutPeople', 'Pessoas'), String(p.numPessoas)]
        ];

        details.forEach(function(row) {
            doc.setFont('helvetica', 'bold');
            doc.text(row[0] + ':', margin, y);
            doc.setFont('helvetica', 'normal');
            doc.text(row[1], margin + 35, y);
            y += 6;
        });

        // Separator
        y += 4;
        doc.setDrawColor(212, 168, 83); // sunset-gold
        doc.setLineWidth(0.5);
        doc.line(margin, y, col2, y);
        y += 8;

        // Values
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 58, 95);
        doc.text('VALORES', margin, y);
        y += 8;

        doc.setFontSize(10);
        doc.setTextColor(55, 65, 81);

        function addLine(label, value, bold) {
            doc.setFont('helvetica', bold ? 'bold' : 'normal');
            doc.text(label, margin, y);
            doc.text('R$ ' + formatCurrency(value), col2, y, { align: 'right' });
            y += 6;
        }

        addLine(t('checkoutTrip', 'Passeio'), pr.precoBase);
        if (pr.adicionalTurno > 0) addLine(t('checkoutSurcharge', 'Adicional turno'), pr.adicionalTurno);
        if (pr.valorHoraExtra > 0) addLine(t('checkoutExtraHour', 'Hora extra') + ' (' + pr.horasExtras + 'h)', pr.valorHoraExtra);
        if (pr.valorPessoaExtra > 0) addLine(t('checkoutExtraPerson', 'Pessoa extra'), pr.valorPessoaExtra);
        if (pr.valorAC > 0) addLine(t('checkoutAC', 'Ar condicionado'), pr.valorAC);
        if (pr.valorChurrasqueira > 0) addLine(t('checkoutBBQ', 'Churrasqueira'), pr.valorChurrasqueira);
        if (pr.valorGuardaVidas > 0) addLine(t('checkoutLifeguard', 'Guarda-vidas'), pr.valorGuardaVidas);
        if (pr.servicos && pr.servicos.length > 0) {
            pr.servicos.forEach(function(s) { addLine(s.nome, s.subtotal); });
        }

        var subtotalSemDesconto = pr.precoBase + (pr.totalServicos || 0) + (pr.adicionalTurno || 0) + (pr.valorHoraExtra || 0) + (pr.valorPessoaExtra || 0) + (pr.valorAC || 0) + (pr.valorChurrasqueira || 0) + (pr.valorGuardaVidas || 0);
        var desconto = subtotalSemDesconto - pr.valorTotal;
        if (desconto > 0) {
            doc.setTextColor(5, 150, 105); // success
            addLine(t('checkoutDiscount', 'Desconto'), desconto);
            doc.setTextColor(55, 65, 81);
        }

        y += 2;
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, y, col2, y);
        y += 6;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text(t('checkoutTotal', 'Total'), margin, y);
        doc.text('R$ ' + formatCurrency(pr.valorTotal), col2, y, { align: 'right' });
        y += 7;

        doc.setFontSize(10);
        doc.setTextColor(30, 58, 95);
        addLine(t('checkoutPaid', 'Valor pago'), pr.valorEntrada, true);
        doc.setTextColor(55, 65, 81);
        if (pr.valorRestante > 0) {
            addLine(t('checkoutRemaining', 'Restante (no dia)'), pr.valorRestante);
        }

        // Separator
        y += 4;
        doc.setDrawColor(212, 168, 83);
        doc.line(margin, y, col2, y);
        y += 8;

        // Meeting point
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 58, 95);
        doc.text('LOCAL DE EMBARQUE', margin, y);
        y += 6;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(107, 114, 128); // driftwood
        doc.text('Marina da Gloria — Av. Infante Dom Henrique, S/N, Loja 06', margin, y);
        y += 5;
        doc.text('Gloria, Rio de Janeiro - RJ', margin, y);
        y += 8;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 58, 95);
        doc.text('PONTO DE ENCONTRO', margin, y);
        y += 6;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(55, 65, 81);
        var steps = [
            '1. Desca as escadas de acesso do estacionamento.',
            '2. Localize a cabine de seguranca a esquerda das escadas.',
            '3. Aguarde o comandante com uniforme da empresa.',
            '4. O comandante auxiliara no embarque.'
        ];
        steps.forEach(function(s) { doc.text(s, margin, y); y += 5; });
        y += 3;
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 58, 95);
        doc.text('Chegue 15 minutos antes do horario do passeio.', margin, y);

        // Footer
        y = doc.internal.pageSize.getHeight() - 15;
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, y - 5, col2, y - 5);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(107, 114, 128);
        doc.text('WeBoat Brasil — (21) 97772-4114 — weboatbrasil.com.br', w / 2, y, { align: 'center' });

        doc.save('reserva-weboat-' + (p.dataPasseio || 'confirmada') + '.pdf');
    }

    function fallbackSaveText(data, p, pr, turnoLabel, dataLabel, roteiro) {
        var text = 'RESERVA CONFIRMADA — WeBoat Brasil\n\n';
        text += 'Lancha: ' + data.lancha.nome + '\n';
        text += 'Roteiro: ' + roteiro + '\n';
        text += 'Data: ' + dataLabel + '\n';
        text += 'Turno: ' + turnoLabel + '\n';
        text += 'Pessoas: ' + p.numPessoas + '\n';
        text += 'Total: R$ ' + formatCurrency(pr.valorTotal) + '\n';
        text += 'Pago: R$ ' + formatCurrency(pr.valorEntrada) + '\n\n';
        text += 'Marina da Gloria — (21) 97772-4114\n';

        if (navigator.share) {
            navigator.share({ title: 'Reserva WeBoat', text: text }).catch(function() {});
        } else {
            navigator.clipboard.writeText(text).then(function() {
                alert(t('checkoutCopied', 'Copiado!'));
            });
        }
    }

    // ── Calendar (.ics) generation ──
    function downloadICS(data) {
        var p = data.passeio;
        if (!p.dataPasseio) return;

        var roteiro = ROTEIRO_NOMES[p.roteiro] || p.roteiroNome || p.roteiro;
        var turnoLabel = p.turno === 'manha' ? t('checkoutMorning', 'Manha') : t('checkoutAfternoon', 'Tarde');

        // Parse date + time
        var parts = p.dataPasseio.split('-');
        var year = parts[0], month = parts[1], day = parts[2];
        var startHour = '09', startMin = '00';
        if (p.horario) {
            var hm = p.horario.match(/(\d{1,2}):(\d{2})/);
            if (hm) { startHour = hm[1].padStart(2, '0'); startMin = hm[2]; }
        } else if (p.turno === 'tarde') {
            startHour = '14'; startMin = '30';
        }

        var dur = p.duracaoHoras || 5;
        var endHour = String(parseInt(startHour, 10) + dur).padStart(2, '0');

        var dtStart = year + month + day + 'T' + startHour + startMin + '00';
        var dtEnd = year + month + day + 'T' + endHour + startMin + '00';
        var now = new Date();
        var stamp = now.getFullYear() +
            String(now.getMonth() + 1).padStart(2, '0') +
            String(now.getDate()).padStart(2, '0') + 'T' +
            String(now.getHours()).padStart(2, '0') +
            String(now.getMinutes()).padStart(2, '0') +
            String(now.getSeconds()).padStart(2, '0');

        var desc = data.lancha.nome + ' | ' + roteiro + ' | ' + p.numPessoas + ' ' + t('checkoutPeople', 'pessoas') + '\\nR$ ' + formatCurrency(data.preco.valorTotal) + '\\n\\nChegue 15 min antes.\\nWeBoat Brasil (21) 97772-4114';

        var ics = 'BEGIN:VCALENDAR\r\n' +
            'VERSION:2.0\r\n' +
            'PRODID:-//WeBoat Brasil//Checkout//PT\r\n' +
            'BEGIN:VEVENT\r\n' +
            'UID:weboat-' + (currentToken || Date.now()) + '@weboatbrasil.com.br\r\n' +
            'DTSTAMP:' + stamp + '\r\n' +
            'DTSTART;TZID=America/Sao_Paulo:' + dtStart + '\r\n' +
            'DTEND;TZID=America/Sao_Paulo:' + dtEnd + '\r\n' +
            'SUMMARY:Passeio de Lancha — WeBoat Brasil\r\n' +
            'DESCRIPTION:' + desc + '\r\n' +
            'LOCATION:Marina da Gloria\\, Av. Infante Dom Henrique\\, S/N\\, Loja 06\\, Gloria\\, Rio de Janeiro - RJ\r\n' +
            'GEO:-22.9211;-43.1689\r\n' +
            'BEGIN:VALARM\r\n' +
            'TRIGGER:-PT1H\r\n' +
            'ACTION:DISPLAY\r\n' +
            'DESCRIPTION:Passeio de lancha em 1 hora!\r\n' +
            'END:VALARM\r\n' +
            'END:VEVENT\r\n' +
            'END:VCALENDAR\r\n';

        var blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'weboat-passeio-' + p.dataPasseio + '.ics';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // ── Navigation ──
    function goToStep(stepNum) {
        currentStep = stepNum;

        steps.forEach(function(step, i) {
            var sn = i + 1;
            step.classList.remove('checkout-step--active', 'checkout-step--done');
            if (sn < stepNum) step.classList.add('checkout-step--done');
            if (sn === stepNum) step.classList.add('checkout-step--active');
        });

        panels.forEach(function(panel) {
            panel.style.display = panel.getAttribute('data-step') == stepNum ? 'block' : 'none';
        });

        // When going back to step 2, restore method-selection if payment hasn't started
        if (stepNum === 2 && !paymentStarted) {
            var methodSelection = document.getElementById('method-selection');
            if (methodSelection) methodSelection.style.display = 'block';
            if (pixSection) pixSection.style.display = 'none';
            if (zelleSection) zelleSection.style.display = 'none';
            // Reset payment state
            selectedMethod = null;
            if (payBtn) {
                payBtn.disabled = true;
                payBtn.textContent = t('checkoutPayNow', 'Pagar Agora');
            }
            methodButtons.forEach(function(b) { b.classList.remove('payment-method--selected'); });
            updatePaymentMethods();
        }

        window.scrollTo(0, 0);
    }

    // ── Language selector: preserve token ──
    function updateLangLinks() {
        var langLinks = document.querySelectorAll('.checkout-lang__option');
        langLinks.forEach(function(link) {
            var href = link.getAttribute('href');
            if (href && currentToken) {
                // Remove existing query params and add token
                var base = href.split('?')[0];
                link.setAttribute('href', base + '?token=' + encodeURIComponent(currentToken));
            }
        });
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
        field.setAttribute('aria-invalid', 'true');
        var group = field.closest('.form-group');
        var errorSpan = group ? group.querySelector('.form-error') : null;
        if (errorSpan) {
            var errorId = 'error-' + fieldId;
            errorSpan.id = errorId;
            errorSpan.textContent = message;
            field.setAttribute('aria-describedby', errorId);
        }
        field.addEventListener('input', function handler() {
            field.classList.remove('form-input--error');
            field.removeAttribute('aria-invalid');
            field.removeAttribute('aria-describedby');
            if (errorSpan) errorSpan.textContent = '';
            field.removeEventListener('input', handler);
        });
    }

    function clearAllFieldErrors() {
        document.querySelectorAll('.form-input--error').forEach(function(el) {
            el.classList.remove('form-input--error');
            el.removeAttribute('aria-invalid');
            el.removeAttribute('aria-describedby');
        });
        document.querySelectorAll('.form-error').forEach(function(el) {
            el.textContent = '';
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
