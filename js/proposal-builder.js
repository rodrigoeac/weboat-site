/**
 * Motor de cálculo e UI do montador de proposta.
 * Depende de: js/data/lanchas-data.js (window.WeBoatData)
 *             js/data/proposal-servicos-data.js (window.WeBoatServicos)
 */
(function () {
  'use strict';

  var Data = window.WeBoatData;
  var Servicos = window.WeBoatServicos;

  // ==================== CÁLCULOS ====================

  /**
   * Retorna o preço do roteiro para uma lancha.
   * Próprias: normal ou promocional. Parceiras: preço único.
   */
  function calcularPrecoRoteiro(lancha, roteiroId, isPromocional) {
    return Data.getPrecoRoteiro(lancha, roteiroId, isPromocional);
  }

  /**
   * Calcula custo de pessoas extras além da capacidade base.
   * por_pessoa: (n - aPartirDe + 1) × valor
   * valor_unico: flat fee
   */
  function calcularPessoasExtras(lancha, numPessoas) {
    if (!lancha.pessoaExtra) return 0;
    if (numPessoas < lancha.pessoaExtra.aPartirDe) return 0;

    if (lancha.pessoaExtra.tipo === 'por_pessoa') {
      var extras = numPessoas - lancha.pessoaExtra.aPartirDe + 1;
      return extras * lancha.pessoaExtra.valor;
    }

    if (lancha.pessoaExtra.tipo === 'valor_unico') {
      return lancha.pessoaExtra.valor;
    }

    return 0;
  }

  /**
   * Adicional por turno da tarde em barcos especiais.
   * Bota: +R$500, Malik: +R$1000
   */
  function calcularTurnoAdicional(lancha, turno) {
    if (turno !== 'tarde') return 0;
    if (!lancha.turnos || !lancha.turnos.tarde) return 0;
    return lancha.turnos.tarde.adicional || 0;
  }

  /**
   * Calcula hora extra total: barco + serviços (20% sobre base dos que cobram).
   */
  function calcularHoraExtraTotal(lancha, servicosSelecionados, horasExtras) {
    if (horasExtras <= 0) return { barco: 0, servicos: 0, total: 0 };

    var barcoHoraExtra = lancha.horaExtra * horasExtras;
    var servicosHoraExtra = 0;

    for (var i = 0; i < servicosSelecionados.length; i++) {
      var svc = servicosSelecionados[i];
      if (svc.servico.cobraHoraExtra && svc.precoBase > 0) {
        servicosHoraExtra += Servicos.calcularHoraExtraServico(
          svc.servico, svc.precoBase, horasExtras
        );
      }
    }

    return {
      barco: barcoHoraExtra,
      servicos: servicosHoraExtra,
      total: barcoHoraExtra + servicosHoraExtra,
    };
  }

  /**
   * Verifica se a capacidade comporta pessoas + staff não-substituível.
   * Retorna: { ok, mensagem, pessoasComStaff, limiteReal }
   */
  function verificarCapacidade(lancha, numPessoas, servicosSelecionados) {
    var staffNaoSubstituivel = 0;
    for (var i = 0; i < servicosSelecionados.length; i++) {
      var svc = servicosSelecionados[i];
      if (svc.temStaff && !svc.temStaff.substituivelPorTripulacao) {
        staffNaoSubstituivel += svc.temStaff.quantidade;
      }
    }

    var pessoasComStaff = numPessoas + staffNaoSubstituivel;
    var limiteComStaff = lancha.capacidade.comStaff || lancha.capacidade.maxima;
    var limiteMaximo = lancha.capacidade.maxima;

    if (numPessoas > limiteMaximo) {
      return {
        ok: false,
        tipo: 'erro',
        mensagem: 'Capacidade máxima excedida! Máximo: ' + limiteMaximo + ' pessoas.',
        pessoasComStaff: pessoasComStaff,
        limiteReal: limiteMaximo,
      };
    }

    if (pessoasComStaff > limiteComStaff) {
      return {
        ok: false,
        tipo: 'aviso',
        mensagem: 'Com staff dos serviços (' + staffNaoSubstituivel +
          ' pessoas), total de ' + pessoasComStaff +
          ' excede o limite de ' + limiteComStaff + '.',
        pessoasComStaff: pessoasComStaff,
        limiteReal: limiteComStaff,
      };
    }

    if (pessoasComStaff > limiteMaximo && pessoasComStaff <= limiteComStaff) {
      return {
        ok: true,
        tipo: 'info',
        mensagem: 'Staff dos serviços usa ' + staffNaoSubstituivel +
          ' vagas extras (total: ' + pessoasComStaff + '/' + limiteComStaff + ').',
        pessoasComStaff: pessoasComStaff,
        limiteReal: limiteComStaff,
      };
    }

    return {
      ok: true,
      tipo: null,
      mensagem: null,
      pessoasComStaff: pessoasComStaff,
      limiteReal: limiteMaximo,
    };
  }

  /**
   * Determina tamanho da embarcação para preço de serviços por_embarcacao.
   */
  function determinarTamanhoEmbarcacao(lanchaId) {
    return Servicos.determinarTamanhoEmbarcacao(lanchaId);
  }

  /**
   * Verifica se o Oceano precisa de guarda-vidas obrigatório.
   */
  function precisaGuardaVidas(lanchaId) {
    return lanchaId === 'oceano';
  }

  /**
   * Calcula a taxa de churrasqueira, considerando serviços que a excluem.
   */
  function calcularTaxaChurrasqueira(lancha, servicosSelecionados, churrasqueiraAtiva) {
    if (!churrasqueiraAtiva) return 0;

    for (var i = 0; i < servicosSelecionados.length; i++) {
      if (servicosSelecionados[i].servico.excluiTaxaChurrasqueira) {
        return 0;
      }
    }

    return lancha.churrasqueira;
  }

  /**
   * Calcula adicional de ar-condicionado (gerador).
   */
  function calcularAdicionalAC(lancha, acLigado) {
    if (!acLigado) return 0;
    if (!lancha.gerador || !lancha.gerador.adicionalArCondicionado) return 0;
    return lancha.gerador.adicionalArCondicionado;
  }

  /**
   * Função master: calcula o total da proposta.
   */
  function calcularTotalProposta(params) {
    var lancha = params.lancha;
    var roteiroId = params.roteiroId;
    var isPromocional = params.isPromocional || false;
    var numPessoas = params.numPessoas || lancha.capacidade.base;
    var turno = params.turno || 'manha';
    var horasExtras = params.horasExtras || 0;
    var servicosIds = params.servicosIds || [];
    var churrasqueiraAtiva = params.churrasqueiraAtiva || false;
    var acLigado = params.acLigado || false;

    var tamanhoEmb = determinarTamanhoEmbarcacao(lancha.id);

    // 1. Preço base do roteiro
    var precoRoteiro = calcularPrecoRoteiro(lancha, roteiroId, isPromocional);
    if (precoRoteiro === null) {
      return { erro: 'Roteiro indisponível para esta lancha.' };
    }

    // 2. Adicional turno tarde
    var adicionalTurno = calcularTurnoAdicional(lancha, turno);

    // 3. Pessoas extras
    var custoExtras = calcularPessoasExtras(lancha, numPessoas);

    // 4. Serviços selecionados
    var servicosCalculados = [];
    var totalServicos = 0;
    for (var i = 0; i < servicosIds.length; i++) {
      var servico = Servicos.getServicoPorId(servicosIds[i]);
      if (!servico) continue;

      var precoBase = Servicos.calcularPrecoServico(servico, numPessoas, tamanhoEmb);
      if (precoBase === null) precoBase = 0;

      servicosCalculados.push({
        servico: servico,
        precoBase: precoBase,
      });
      totalServicos += precoBase;
    }

    // 5. Churrasqueira
    var taxaChurrasqueira = calcularTaxaChurrasqueira(
      lancha, servicosCalculados, churrasqueiraAtiva
    );

    // 6. Hora extra (barco + serviços)
    var horaExtra = calcularHoraExtraTotal(lancha, servicosCalculados, horasExtras);

    // 7. Guarda-vidas (Oceano)
    var guardaVidas = precisaGuardaVidas(lancha.id) ? Servicos.PRECO_GUARDA_VIDAS : 0;

    // 8. AC
    var adicionalAC = calcularAdicionalAC(lancha, acLigado);

    // 9. Verificar capacidade
    var servicosParaCapacidade = [];
    for (var j = 0; j < servicosCalculados.length; j++) {
      servicosParaCapacidade.push(servicosCalculados[j].servico);
    }
    var capacidade = verificarCapacidade(lancha, numPessoas, servicosParaCapacidade);

    // Total
    var total = precoRoteiro + adicionalTurno + custoExtras +
      totalServicos + taxaChurrasqueira + horaExtra.total +
      guardaVidas + adicionalAC;

    return {
      lancha: lancha,
      roteiroId: roteiroId,
      roteiro: Data.ROTEIROS[roteiroId],
      turno: turno,
      numPessoas: numPessoas,
      isPromocional: isPromocional,
      breakdown: {
        precoRoteiro: precoRoteiro,
        adicionalTurno: adicionalTurno,
        custoExtras: custoExtras,
        servicos: servicosCalculados,
        totalServicos: totalServicos,
        taxaChurrasqueira: taxaChurrasqueira,
        horaExtra: horaExtra,
        guardaVidas: guardaVidas,
        adicionalAC: adicionalAC,
      },
      capacidade: capacidade,
      total: total,
      porPessoa: numPessoas > 0 ? Math.round(total / numPessoas) : 0,
    };
  }

  /**
   * Formata valor em R$.
   */
  function formatarMoeda(valor) {
    return 'R$ ' + valor.toLocaleString('pt-BR');
  }

  /**
   * Gera horário do turno baseado na configuração da lancha.
   */
  function getHorarioTurno(lancha, turno) {
    if (lancha.turnos.tipo === 'flexivel') {
      return 'Horário flexível (' + lancha.turnos.duracao + 'h)';
    }
    var turnoConfig = lancha.turnos[turno];
    if (!turnoConfig) return '';
    return turnoConfig.horario;
  }

  /**
   * Gera mensagem WhatsApp completa.
   */
  function gerarMensagemWhatsApp(proposta) {
    var p = proposta;
    var b = p.breakdown;
    var linhas = [];

    linhas.push('Olá! Montei uma proposta pelo site e gostaria de confirmar:');
    linhas.push('');
    linhas.push('*Lancha:* ' + p.lancha.nome);
    linhas.push('*Roteiro:* ' + p.roteiro.nome);
    linhas.push('*Turno:* ' + (p.turno === 'manha' ? 'Manhã' : 'Tarde') +
      ' (' + getHorarioTurno(p.lancha, p.turno) + ')');
    linhas.push('*Pessoas:* ' + p.numPessoas);

    if (b.horaExtra.total > 0 && p.lancha.horaExtra > 0) {
      var horas = Math.round(b.horaExtra.barco / p.lancha.horaExtra);
      linhas.push('*Horas extras:* ' + horas);
    }

    linhas.push('');
    linhas.push('--- Valores ---');
    linhas.push('Roteiro' + (p.isPromocional ? ' (promocional)' : '') +
      ': ' + formatarMoeda(b.precoRoteiro));

    if (b.adicionalTurno > 0) {
      linhas.push('Adicional turno tarde: ' + formatarMoeda(b.adicionalTurno));
    }

    if (b.custoExtras > 0) {
      linhas.push('Pessoas extras: ' + formatarMoeda(b.custoExtras));
    }

    if (b.taxaChurrasqueira > 0) {
      linhas.push('Churrasqueira: ' + formatarMoeda(b.taxaChurrasqueira));
    }

    if (b.adicionalAC > 0) {
      linhas.push('Ar-condicionado: ' + formatarMoeda(b.adicionalAC));
    }

    if (b.servicos.length > 0) {
      linhas.push('');
      linhas.push('*Serviços:*');
      for (var i = 0; i < b.servicos.length; i++) {
        var svc = b.servicos[i];
        linhas.push('• ' + svc.servico.nome + ': ' + formatarMoeda(svc.precoBase));
      }
    }

    if (b.horaExtra.total > 0) {
      linhas.push('');
      linhas.push('*Hora extra:*');
      linhas.push('• Embarcação: ' + formatarMoeda(b.horaExtra.barco));
      if (b.horaExtra.servicos > 0) {
        linhas.push('• Serviços (+20%): ' + formatarMoeda(b.horaExtra.servicos));
      }
    }

    if (b.guardaVidas > 0) {
      linhas.push('Guarda-vidas: ' + formatarMoeda(b.guardaVidas));
    }

    linhas.push('');
    linhas.push('*TOTAL: ' + formatarMoeda(p.total) + '*');
    linhas.push('(' + formatarMoeda(p.porPessoa) + ' por pessoa)');
    linhas.push('');
    linhas.push('Aguardo confirmação de disponibilidade. Obrigado!');

    return linhas.join('\n');
  }

  /**
   * Gera link WhatsApp com mensagem codificada.
   */
  function gerarLinkWhatsApp(proposta) {
    var msg = gerarMensagemWhatsApp(proposta);
    return 'https://wa.me/5521977724114?text=' + encodeURIComponent(msg);
  }

  // ==================== UI / DOM ====================
  // Note: All innerHTML assignments below use data from our own hardcoded
  // data modules (lanchas-data.js, proposal-servicos-data.js). No user input
  // is ever interpolated into HTML strings, so XSS is not a concern.

  var state = {
    lancha: null,
    roteiroId: null,
    isPromocional: false,
    numPessoas: 10,
    turno: 'manha',
    horasExtras: 0,
    servicosIds: [],
    churrasqueiraAtiva: false,
    acLigado: false,
  };

  var els = {};

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return (ctx || document).querySelectorAll(sel); }

  function renderRoteiros() {
    var container = els.roteiros;
    if (!container) return;
    container.textContent = '';
    var rotKeys = ['R1', 'R2', 'R3', 'R4', 'R5'];

    for (var i = 0; i < rotKeys.length; i++) {
      var key = rotKeys[i];
      var rot = Data.ROTEIROS[key];
      var precoData = state.lancha.roteiros[key];
      var disabled = precoData === null;

      var card = document.createElement('label');
      card.className = 'proposta__roteiro-card' + (disabled ? ' proposta__roteiro-card--disabled' : '');

      var input = document.createElement('input');
      input.type = 'radio';
      input.name = 'proposta-roteiro';
      input.value = key;
      input.className = 'proposta__roteiro-radio';
      input.disabled = disabled;

      var content = document.createElement('div');
      content.className = 'proposta__roteiro-content';

      var nome = document.createElement('span');
      nome.className = 'proposta__roteiro-nome';
      nome.textContent = rot.nome;

      var duracao = document.createElement('span');
      duracao.className = 'proposta__roteiro-duracao';
      duracao.textContent = rot.duracao + 'h';

      var precoEl = document.createElement('div');
      precoEl.className = 'proposta__roteiro-preco';

      if (disabled) {
        var indispSpan = document.createElement('span');
        indispSpan.className = 'proposta__roteiro-indisponivel';
        indispSpan.textContent = 'Indisponível';
        precoEl.appendChild(indispSpan);
      } else if (precoData.normal !== undefined) {
        var normalSpan = document.createElement('span');
        normalSpan.className = 'proposta__preco-normal';
        normalSpan.textContent = formatarMoeda(precoData.normal);
        var promoSpan = document.createElement('span');
        promoSpan.className = 'proposta__preco-promo';
        promoSpan.textContent = formatarMoeda(precoData.promocional);
        precoEl.appendChild(normalSpan);
        precoEl.appendChild(promoSpan);
      } else {
        var unicoSpan = document.createElement('span');
        unicoSpan.className = 'proposta__preco-unico';
        unicoSpan.textContent = formatarMoeda(precoData.preco);
        precoEl.appendChild(unicoSpan);
      }

      content.appendChild(nome);
      content.appendChild(duracao);
      content.appendChild(precoEl);
      card.appendChild(input);
      card.appendChild(content);
      container.appendChild(card);
    }

    var radios = $$('input[name="proposta-roteiro"]', container);
    for (var j = 0; j < radios.length; j++) {
      radios[j].addEventListener('change', function () {
        state.roteiroId = this.value;
        var pd = state.lancha.roteiros[this.value];
        state.isPromocional = !!(pd && pd.promocional !== undefined);
        updateActiveCard(container, this);
        recalcular();
      });
    }
  }

  function updateActiveCard(container, activeInput) {
    var cards = $$('.proposta__roteiro-card', container);
    for (var i = 0; i < cards.length; i++) {
      cards[i].classList.remove('proposta__roteiro-card--active');
    }
    if (activeInput && activeInput.parentElement) {
      activeInput.parentElement.classList.add('proposta__roteiro-card--active');
    }
  }

  function renderTurnos() {
    var container = els.turnos;
    if (!container) return;
    container.textContent = '';
    var lancha = state.lancha;

    if (lancha.turnos.tipo === 'flexivel') {
      var lbl = document.createElement('label');
      lbl.className = 'proposta__turno-option proposta__turno-option--active';
      var radio = document.createElement('input');
      radio.type = 'radio'; radio.name = 'proposta-turno'; radio.value = 'manha';
      radio.className = 'proposta__turno-radio'; radio.checked = true;
      var span = document.createElement('span');
      span.className = 'proposta__turno-label';
      var icon = document.createElement('i');
      icon.className = 'ph ph-sun';
      span.appendChild(icon);
      span.appendChild(document.createTextNode(' Horário Flexível'));
      var small = document.createElement('small');
      small.textContent = lancha.turnos.duracao + 'h de duração';
      span.appendChild(small);
      lbl.appendChild(radio);
      lbl.appendChild(span);
      container.appendChild(lbl);
      state.turno = 'manha';
      return;
    }

    var turnos = [
      { key: 'manha', icon: 'ph-sun', label: 'Manhã', config: lancha.turnos.manha },
      { key: 'tarde', icon: 'ph-moon', label: 'Tarde', config: lancha.turnos.tarde },
    ];

    for (var i = 0; i < turnos.length; i++) {
      var t = turnos[i];
      if (!t.config) continue;
      var adicionalText = t.config.adicional ? ' (+' + formatarMoeda(t.config.adicional) + ')' : '';

      var lbl2 = document.createElement('label');
      lbl2.className = 'proposta__turno-option' + (i === 0 ? ' proposta__turno-option--active' : '');
      var radio2 = document.createElement('input');
      radio2.type = 'radio'; radio2.name = 'proposta-turno'; radio2.value = t.key;
      radio2.className = 'proposta__turno-radio';
      if (i === 0) radio2.checked = true;
      var span2 = document.createElement('span');
      span2.className = 'proposta__turno-label';
      var icon2 = document.createElement('i');
      icon2.className = 'ph ' + t.icon;
      span2.appendChild(icon2);
      span2.appendChild(document.createTextNode(' ' + t.label));
      var small2 = document.createElement('small');
      small2.textContent = t.config.horario + adicionalText;
      span2.appendChild(small2);
      lbl2.appendChild(radio2);
      lbl2.appendChild(span2);
      container.appendChild(lbl2);
    }

    var radios = $$('input[name="proposta-turno"]', container);
    for (var j = 0; j < radios.length; j++) {
      radios[j].addEventListener('change', function () {
        state.turno = this.value;
        var opts = $$('.proposta__turno-option', container);
        for (var k = 0; k < opts.length; k++) opts[k].classList.remove('proposta__turno-option--active');
        this.closest('.proposta__turno-option').classList.add('proposta__turno-option--active');
        recalcular();
      });
    }
  }

  function findFaixa(svc, numPessoas) {
    if (!svc.faixasPreco) return null;
    for (var k = 0; k < svc.faixasPreco.length; k++) {
      if (numPessoas >= svc.faixasPreco[k].min && numPessoas <= svc.faixasPreco[k].max) {
        return svc.faixasPreco[k];
      }
    }
    if (numPessoas > svc.faixasPreco[svc.faixasPreco.length - 1].max) {
      return svc.faixasPreco[svc.faixasPreco.length - 1];
    }
    return null;
  }

  function renderServicos() {
    var container = els.servicos;
    if (!container) return;
    container.textContent = '';
    var cats = Servicos.CATEGORIAS;

    var catKeys = Object.keys(cats);
    for (var i = 0; i < catKeys.length; i++) {
      var catKey = catKeys[i];
      var cat = cats[catKey];
      var services = Servicos.getServicosPorCategoria(catKey);
      if (services.length === 0) continue;

      var group = document.createElement('div');
      group.className = 'proposta__servico-group';

      var header = document.createElement('button');
      header.type = 'button';
      header.className = 'proposta__servico-group-header';
      var headerSpan = document.createElement('span');
      var headerIcon = document.createElement('i');
      headerIcon.className = 'ph ' + cat.icone;
      headerSpan.appendChild(headerIcon);
      headerSpan.appendChild(document.createTextNode(' ' + cat.nome));
      var caretIcon = document.createElement('i');
      caretIcon.className = 'ph ph-caret-down proposta__servico-caret';
      header.appendChild(headerSpan);
      header.appendChild(caretIcon);

      var body = document.createElement('div');
      body.className = 'proposta__servico-group-body';

      for (var j = 0; j < services.length; j++) {
        var svc = services[j];
        var item = document.createElement('label');
        item.className = 'proposta__servico-item';

        var check = document.createElement('input');
        check.type = 'checkbox'; check.value = svc.id;
        check.className = 'proposta__servico-check';

        var customCheck = document.createElement('span');
        customCheck.className = 'proposta__checkbox-custom';

        var infoSpan = document.createElement('span');
        infoSpan.className = 'proposta__servico-info';
        var nomeSpan = document.createElement('span');
        nomeSpan.className = 'proposta__servico-nome';
        nomeSpan.textContent = svc.nome;
        infoSpan.appendChild(nomeSpan);

        if (svc.tipo === 'por_pessoa') {
          var faixa = findFaixa(svc, state.numPessoas);
          if (faixa) {
            var ppSmall = document.createElement('small');
            ppSmall.className = 'proposta__servico-pp';
            ppSmall.textContent = formatarMoeda(faixa.valorPorPessoa) + '/pessoa';
            infoSpan.appendChild(ppSmall);
          }
        }

        var preco = Servicos.calcularPrecoServico(
          svc, state.numPessoas,
          Servicos.determinarTamanhoEmbarcacao(state.lancha.id)
        );
        var precoSpan = document.createElement('span');
        precoSpan.className = 'proposta__servico-preco';
        precoSpan.textContent = preco !== null ? formatarMoeda(preco) : '—';

        item.appendChild(check);
        item.appendChild(customCheck);
        item.appendChild(infoSpan);
        item.appendChild(precoSpan);
        body.appendChild(item);
      }

      header.addEventListener('click', (function (bodyEl) {
        return function () {
          bodyEl.classList.toggle('proposta__servico-group-body--open');
          this.classList.toggle('proposta__servico-group-header--open');
        };
      })(body));

      group.appendChild(header);
      group.appendChild(body);
      container.appendChild(group);
    }

    var checks = $$('.proposta__servico-check', container);
    for (var c = 0; c < checks.length; c++) {
      checks[c].addEventListener('change', function () {
        var idx = state.servicosIds.indexOf(this.value);
        if (this.checked && idx === -1) {
          state.servicosIds.push(this.value);
        } else if (!this.checked && idx !== -1) {
          state.servicosIds.splice(idx, 1);
        }
        recalcular();
      });
    }
  }

  function renderResumo(proposta) {
    var body = els.resumoBody;
    var totalEl = els.resumoTotal;
    var btn = els.whatsappBtn;
    if (!body) return;

    if (!proposta || proposta.erro) {
      body.textContent = '';
      var emptyP = document.createElement('p');
      emptyP.className = 'proposta__resumo-empty';
      emptyP.textContent = proposta && proposta.erro ? proposta.erro : 'Selecione um roteiro para começar';
      body.appendChild(emptyP);
      totalEl.textContent = '';
      btn.style.display = 'none';
      return;
    }

    var b = proposta.breakdown;
    var dl = document.createElement('dl');
    dl.className = 'proposta__resumo-list';

    function addLine(label, value, extraClass) {
      var dt = document.createElement('dt');
      if (extraClass) dt.className = extraClass;
      dt.textContent = label;
      var dd = document.createElement('dd');
      dd.textContent = formatarMoeda(value);
      dl.appendChild(dt);
      dl.appendChild(dd);
    }

    var roteiroLabel = proposta.roteiro.nome;
    if (proposta.isPromocional) roteiroLabel += ' (promo)';
    addLine(roteiroLabel, b.precoRoteiro);

    if (b.adicionalTurno > 0) addLine('Adicional turno tarde', b.adicionalTurno);
    if (b.custoExtras > 0) addLine('Pessoas extras', b.custoExtras);
    if (b.taxaChurrasqueira > 0) addLine('Churrasqueira', b.taxaChurrasqueira);
    if (b.adicionalAC > 0) addLine('Ar-condicionado', b.adicionalAC);

    for (var i = 0; i < b.servicos.length; i++) {
      addLine(b.servicos[i].servico.nome, b.servicos[i].precoBase);
    }

    if (b.horaExtra.total > 0) {
      addLine('Hora extra (embarcação)', b.horaExtra.barco);
      if (b.horaExtra.servicos > 0) {
        addLine('Hora extra (serviços +20%)', b.horaExtra.servicos);
      }
    }

    if (b.guardaVidas > 0) addLine('Guarda-vidas', b.guardaVidas);

    body.textContent = '';
    body.appendChild(dl);

    // Total
    totalEl.textContent = '';
    var totalLine = document.createElement('div');
    totalLine.className = 'proposta__total-line';
    var totalLabel = document.createElement('span');
    totalLabel.className = 'proposta__total-label';
    totalLabel.textContent = 'Total';
    var totalValor = document.createElement('span');
    totalValor.className = 'proposta__total-valor';
    totalValor.textContent = formatarMoeda(proposta.total);
    totalLine.appendChild(totalLabel);
    totalLine.appendChild(totalValor);
    totalEl.appendChild(totalLine);

    var ppDiv = document.createElement('div');
    ppDiv.className = 'proposta__total-pp';
    ppDiv.textContent = formatarMoeda(proposta.porPessoa) + ' por pessoa (' + proposta.numPessoas + ' pessoas)';
    totalEl.appendChild(ppDiv);

    btn.href = gerarLinkWhatsApp(proposta);
    btn.style.display = '';
  }

  function renderAvisos(proposta) {
    var container = els.avisos;
    if (!container) return;
    container.textContent = '';

    if (!proposta) return;

    // Capacity warning
    if (proposta.capacidade && proposta.capacidade.tipo) {
      var div = document.createElement('div');
      div.className = 'proposta__aviso proposta__aviso--' + proposta.capacidade.tipo;
      var icon = document.createElement('i');
      icon.className = 'ph ph-warning-circle';
      div.appendChild(icon);
      div.appendChild(document.createTextNode(' ' + proposta.capacidade.mensagem));
      container.appendChild(div);
    }

    // Guarda-vidas notice for Oceano
    if (proposta.breakdown && proposta.breakdown.guardaVidas > 0) {
      var gvDiv = document.createElement('div');
      gvDiv.className = 'proposta__aviso proposta__aviso--info';
      var gvIcon = document.createElement('i');
      gvIcon.className = 'ph ph-lifebuoy';
      gvDiv.appendChild(gvIcon);
      gvDiv.appendChild(document.createTextNode(
        ' Guarda-vidas obrigatório incluso automaticamente (' +
        formatarMoeda(Servicos.PRECO_GUARDA_VIDAS) + ')'
      ));
      container.appendChild(gvDiv);
    }

    // Disable WhatsApp button when capacity exceeded
    var btn = els.whatsappBtn;
    if (btn && proposta.capacidade && proposta.capacidade.tipo === 'erro') {
      btn.classList.add('proposta__resumo-cta--disabled');
      btn.removeAttribute('href');
    } else if (btn) {
      btn.classList.remove('proposta__resumo-cta--disabled');
    }
  }

  function updateMobileBar(proposta) {
    if (!els.mobileBar) return;
    if (!proposta || proposta.erro) {
      els.mobileBar.style.display = 'none';
      return;
    }
    // Mobile bar visibility handled by CSS media query;
    // we just ensure it has content
    if (els.mobileValor) els.mobileValor.textContent = formatarMoeda(proposta.total);
    if (els.mobileCta) els.mobileCta.href = gerarLinkWhatsApp(proposta);
  }

  function recalcular() {
    if (!state.roteiroId) {
      renderResumo(null);
      updateMobileBar(null);
      return;
    }

    var proposta = calcularTotalProposta(state);
    renderResumo(proposta);
    renderAvisos(proposta);
    updateMobileBar(proposta);

    var churrHint = els.churrPreco;
    if (churrHint) {
      var excluida = false;
      for (var i = 0; i < state.servicosIds.length; i++) {
        var svc = Servicos.getServicoPorId(state.servicosIds[i]);
        if (svc && svc.excluiTaxaChurrasqueira) { excluida = true; break; }
      }
      churrHint.textContent = excluida
        ? '(inclusa no serviço)'
        : formatarMoeda(state.lancha.churrasqueira);
    }

    var heHint = els.horaExtraHint;
    if (heHint) {
      heHint.textContent = state.lancha.horaExtra > 0
        ? formatarMoeda(state.lancha.horaExtra) + '/hora'
        : 'Não disponível';
    }
  }

  function setupSteppers() {
    var btns = $$('.proposta__stepper-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        var targetId = this.getAttribute('data-target');
        var input = document.getElementById(targetId);
        if (!input) return;

        var val = parseInt(input.value, 10) || 0;
        var min = parseInt(input.min, 10) || 0;
        var max = parseInt(input.max, 10) || 999;
        var action = this.getAttribute('data-action');

        if (action === 'increment' && val < max) val++;
        if (action === 'decrement' && val > min) val--;
        input.value = val;

        if (targetId === 'proposta-pessoas') {
          state.numPessoas = val;
          updateServicosPrecos();
        }
        if (targetId === 'proposta-horas-extras') {
          state.horasExtras = val;
        }
        recalcular();
      });
    }

    var pessoasInput = document.getElementById('proposta-pessoas');
    if (pessoasInput) {
      pessoasInput.addEventListener('input', function () {
        state.numPessoas = parseInt(this.value, 10) || 1;
        updateServicosPrecos();
        recalcular();
      });
    }
    var heInput = document.getElementById('proposta-horas-extras');
    if (heInput) {
      heInput.addEventListener('input', function () {
        state.horasExtras = parseInt(this.value, 10) || 0;
        recalcular();
      });
    }
  }

  function updateServicosPrecos() {
    var items = $$('.proposta__servico-item');
    var tamanho = Servicos.determinarTamanhoEmbarcacao(state.lancha.id);

    for (var i = 0; i < items.length; i++) {
      var check = $('.proposta__servico-check', items[i]);
      if (!check) continue;
      var svc = Servicos.getServicoPorId(check.value);
      if (!svc) continue;

      var preco = Servicos.calcularPrecoServico(svc, state.numPessoas, tamanho);
      var precoEl = $('.proposta__servico-preco', items[i]);
      if (precoEl) precoEl.textContent = preco !== null ? formatarMoeda(preco) : '—';

      var ppEl = $('.proposta__servico-pp', items[i]);
      if (ppEl && svc.tipo === 'por_pessoa') {
        var faixa = findFaixa(svc, state.numPessoas);
        ppEl.textContent = faixa ? formatarMoeda(faixa.valorPorPessoa) + '/pessoa' : '';
      }
    }
  }

  function setupChurrasqueira() {
    var chk = document.getElementById('proposta-churrasqueira');
    if (!chk) return;
    chk.addEventListener('change', function () {
      state.churrasqueiraAtiva = this.checked;
      recalcular();
    });
  }

  function setupACToggle() {
    if (!state.lancha.gerador || !state.lancha.gerador.adicionalArCondicionado) return;

    var detalhesGrid = $('.proposta__detalhes-grid');
    if (!detalhesGrid) return;

    var field = document.createElement('div');
    field.className = 'proposta__field';
    var lbl = document.createElement('label');
    lbl.className = 'proposta__label proposta__checkbox-label';
    var chk = document.createElement('input');
    chk.type = 'checkbox'; chk.id = 'proposta-ac'; chk.className = 'proposta__checkbox';
    var customChk = document.createElement('span');
    customChk.className = 'proposta__checkbox-custom';
    var icon = document.createElement('i');
    icon.className = 'ph ph-snowflake';
    var priceSpan = document.createElement('span');
    priceSpan.className = 'proposta__field-price';
    priceSpan.textContent = formatarMoeda(state.lancha.gerador.adicionalArCondicionado);
    lbl.appendChild(chk);
    lbl.appendChild(customChk);
    lbl.appendChild(icon);
    lbl.appendChild(document.createTextNode(' Ar-Condicionado'));
    lbl.appendChild(priceSpan);
    field.appendChild(lbl);
    detalhesGrid.appendChild(field);

    chk.addEventListener('change', function () {
      state.acLigado = this.checked;
      recalcular();
    });
  }

  function initPropostaBuilder() {
    var section = document.querySelector('[data-lancha-id]');
    if (!section) return;

    var lanchaId = section.getAttribute('data-lancha-id');
    var lancha = Data.getLanchaById(lanchaId);
    if (!lancha) return;

    state.lancha = lancha;
    state.numPessoas = Math.min(10, lancha.capacidade.base);

    els.roteiros = document.querySelector('.proposta__roteiros');
    els.turnos = document.querySelector('.proposta__turno-options');
    els.servicos = document.getElementById('proposta-servicos');
    els.resumoBody = document.getElementById('proposta-resumo-body');
    els.resumoTotal = document.getElementById('proposta-resumo-total');
    els.whatsappBtn = document.getElementById('proposta-whatsapp-btn');
    els.avisos = document.getElementById('proposta-avisos');
    els.churrPreco = document.getElementById('proposta-churr-preco');
    els.horaExtraHint = document.getElementById('proposta-hora-extra-hint');
    els.capacidadeHint = document.getElementById('proposta-capacidade-hint');

    var pessoasInput = document.getElementById('proposta-pessoas');
    if (pessoasInput) {
      pessoasInput.max = lancha.capacidade.maxima;
      pessoasInput.value = state.numPessoas;
    }

    if (els.capacidadeHint) {
      els.capacidadeHint.textContent = 'Capacidade: ' + lancha.capacidade.base +
        (lancha.capacidade.maxima > lancha.capacidade.base ? '–' + lancha.capacidade.maxima : '') + ' pessoas';
    }

    if (els.churrPreco) {
      els.churrPreco.textContent = formatarMoeda(lancha.churrasqueira);
    }

    if (els.horaExtraHint) {
      els.horaExtraHint.textContent = lancha.horaExtra > 0
        ? formatarMoeda(lancha.horaExtra) + '/hora'
        : 'Não disponível';
    }

    if (lancha.horaExtra === 0) {
      var heField = els.horaExtraHint && els.horaExtraHint.closest('.proposta__field');
      if (heField) heField.style.display = 'none';
    }

    setupMobileBar();
    renderRoteiros();
    renderTurnos();
    renderServicos();
    setupSteppers();
    setupChurrasqueira();
    setupACToggle();
    recalcular();
  }

  function setupMobileBar() {
    var bar = document.createElement('div');
    bar.className = 'proposta__mobile-bar';
    bar.id = 'proposta-mobile-bar';

    var totalDiv = document.createElement('div');
    totalDiv.className = 'proposta__mobile-total';
    var label = document.createElement('span');
    label.className = 'proposta__mobile-total-label';
    label.textContent = 'Total da proposta';
    var valor = document.createElement('span');
    valor.className = 'proposta__mobile-total-valor';
    valor.id = 'proposta-mobile-valor';
    valor.textContent = '—';
    totalDiv.appendChild(label);
    totalDiv.appendChild(valor);

    var cta = document.createElement('a');
    cta.className = 'btn btn-whatsapp proposta__mobile-cta';
    cta.id = 'proposta-mobile-whatsapp';
    cta.target = '_blank';
    cta.rel = 'noopener noreferrer';
    cta.href = '#';
    var ctaIcon = document.createElement('i');
    ctaIcon.className = 'ph ph-whatsapp-logo';
    cta.appendChild(ctaIcon);
    cta.appendChild(document.createTextNode(' Enviar'));

    bar.appendChild(totalDiv);
    bar.appendChild(cta);
    document.body.appendChild(bar);

    els.mobileBar = bar;
    els.mobileValor = valor;
    els.mobileCta = cta;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPropostaBuilder);
  } else {
    initPropostaBuilder();
  }

  // Expose globally
  window.WeBoatProposta = {
    calcularPrecoRoteiro: calcularPrecoRoteiro,
    calcularPessoasExtras: calcularPessoasExtras,
    calcularTurnoAdicional: calcularTurnoAdicional,
    calcularHoraExtraTotal: calcularHoraExtraTotal,
    verificarCapacidade: verificarCapacidade,
    determinarTamanhoEmbarcacao: determinarTamanhoEmbarcacao,
    precisaGuardaVidas: precisaGuardaVidas,
    calcularTaxaChurrasqueira: calcularTaxaChurrasqueira,
    calcularAdicionalAC: calcularAdicionalAC,
    calcularTotalProposta: calcularTotalProposta,
    formatarMoeda: formatarMoeda,
    getHorarioTurno: getHorarioTurno,
    gerarMensagemWhatsApp: gerarMensagemWhatsApp,
    gerarLinkWhatsApp: gerarLinkWhatsApp,
  };
})();
