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

    if (p.breakdown.horaExtra.total > 0) {
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

    return linhas.join('\n');
  }

  /**
   * Gera link WhatsApp com mensagem codificada.
   */
  function gerarLinkWhatsApp(proposta) {
    var msg = gerarMensagemWhatsApp(proposta);
    return 'https://wa.me/5521977724114?text=' + encodeURIComponent(msg);
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
