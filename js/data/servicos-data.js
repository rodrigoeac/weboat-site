/**
 * servicos-data.js — Dados dos 13 serviços e utilitários de cálculo
 * Convertido do TypeScript (weboat-servicos) para vanilla JS
 */
(function () {
  'use strict';

  var TAXA_CHURRASQUEIRA = 250;
  var WHATSAPP_NUMERO = '5521966734346';

  var CATEGORIAS = [
    { id: 'churrasco', nome: 'Churrasco', icone: 'ph-fire' },
    { id: 'combo', nome: 'All Inclusive', icone: 'ph-package' },
    { id: 'openbar', nome: 'Open Bar', icone: 'ph-wine' },
    { id: 'mesa', nome: 'Mesas', icone: 'ph-fork-knife' },
    { id: 'decoracao', nome: 'Decoração', icone: 'ph-confetti' },
    { id: 'entretenimento', nome: 'Entretenimento', icone: 'ph-music-notes' },
  ];

  var SERVICOS = [
    // 1. Utilização da Churrasqueira
    {
      id: 'utilizacao-churrasqueira',
      nome: 'Utilização da Churrasqueira',
      categoria: 'churrasco',
      tipo: 'fixo',
      premium: false,
      precoFixo: 250,
      descricao: 'Tripulação na churrasqueira, gelo e carvão inclusos',
    },

    // 2. Kit Churrasco Simples
    {
      id: 'kit-churrasco-simples',
      nome: 'Kit Churrasco Simples',
      categoria: 'churrasco',
      tipo: 'por_pessoa',
      premium: false,
      excluiTaxaChurrasqueira: true,
      descricao: 'Picanha, chorizo, linguiça, drumete, pão de alho e bebidas',
      faixasPreco: [
        { min: 5, max: 5, valorPorPessoa: 150 },
        { min: 6, max: 7, valorPorPessoa: 140 },
        { min: 8, max: 10, valorPorPessoa: 125 },
        { min: 11, max: 15, valorPorPessoa: 115 },
        { min: 16, max: 20, valorPorPessoa: 105 },
        { min: 21, max: 25, valorPorPessoa: 100 },
      ],
    },

    // 3. Churrasco com Acompanhamentos
    {
      id: 'churrasco-com-acompanhamentos',
      nome: 'Churrasco com Acompanhamentos',
      categoria: 'churrasco',
      tipo: 'por_pessoa',
      premium: false,
      excluiTaxaChurrasqueira: true,
      descricao: 'Picanha premium, chorizo, coração, queijo coalho, saladas e bebidas',
      faixasPreco: [
        { min: 7, max: 10, valorPorPessoa: 160 },
        { min: 11, max: 15, valorPorPessoa: 155 },
        { min: 16, max: 20, valorPorPessoa: 150 },
        { min: 21, max: 25, valorPorPessoa: 145 },
      ],
    },

    // 4. All Inclusive Básico
    {
      id: 'combo-churrasco-openbar-basico',
      nome: 'All Inclusive Básico',
      categoria: 'combo',
      tipo: 'por_pessoa',
      premium: false,
      excluiTaxaChurrasqueira: true,
      descricao: 'Churrasco completo + open bar com cerveja, caipirinha, refrigerante e água',
      faixasPreco: [
        { min: 7, max: 10, valorPorPessoa: 230 },
        { min: 11, max: 15, valorPorPessoa: 220 },
        { min: 16, max: 20, valorPorPessoa: 215 },
        { min: 21, max: 25, valorPorPessoa: 205 },
      ],
    },

    // 5. All Inclusive Premium
    {
      id: 'combo-churrasco-openbar-premium',
      nome: 'All Inclusive Premium',
      categoria: 'combo',
      tipo: 'por_pessoa',
      premium: true,
      excluiTaxaChurrasqueira: true,
      descricao: 'Churrasco completo + open bar premium com drinks especiais, espumante e frutas frescas',
      faixasPreco: [
        { min: 7, max: 10, valorPorPessoa: 250 },
        { min: 11, max: 15, valorPorPessoa: 240 },
        { min: 16, max: 20, valorPorPessoa: 235 },
        { min: 21, max: 25, valorPorPessoa: 220 },
      ],
    },

    // 6. Open Bar Básico
    {
      id: 'open-bar-basico',
      nome: 'Open Bar Básico',
      categoria: 'openbar',
      tipo: 'por_pessoa',
      premium: false,
      descricao: 'Drinks clássicos, cervejas nacionais e bebidas não alcoólicas',
      faixasPreco: [
        { min: 7, max: 10, valorPorPessoa: 150 },
        { min: 11, max: 15, valorPorPessoa: 145 },
        { min: 16, max: 20, valorPorPessoa: 140 },
        { min: 21, max: 25, valorPorPessoa: 135 },
      ],
    },

    // 7. Open Bar Premium
    {
      id: 'open-bar-premium',
      nome: 'Open Bar Premium',
      categoria: 'openbar',
      tipo: 'por_pessoa',
      premium: true,
      descricao: 'Drinks especiais, cervejas importadas e bebidas premium',
      faixasPreco: [
        { min: 7, max: 10, valorPorPessoa: 180 },
        { min: 11, max: 15, valorPorPessoa: 175 },
        { min: 16, max: 20, valorPorPessoa: 170 },
        { min: 21, max: 25, valorPorPessoa: 160 },
      ],
    },

    // 8. Mesa de Queijos & Vinhos
    {
      id: 'mesa-queijos-vinhos',
      nome: 'Mesa de Queijos & Vinhos',
      categoria: 'mesa',
      tipo: 'por_pessoa',
      premium: false,
      descricao: 'Queijos finos, acompanhamentos, vinhos e espumante',
      faixasPreco: [
        { min: 7, max: 10, valorPorPessoa: 140 },
        { min: 11, max: 15, valorPorPessoa: 130 },
        { min: 16, max: 20, valorPorPessoa: 125 },
        { min: 21, max: 25, valorPorPessoa: 115 },
      ],
    },

    // 9. Mesa de Snacks Premium
    {
      id: 'mesa-snacks-premium',
      nome: 'Mesa de Snacks Premium',
      categoria: 'mesa',
      tipo: 'por_pessoa',
      premium: true,
      descricao: 'Finger foods, tábuas de frios, quiches e acompanhamentos gourmet',
      faixasPreco: [
        { min: 7, max: 10, valorPorPessoa: 150 },
        { min: 11, max: 15, valorPorPessoa: 140 },
        { min: 16, max: 20, valorPorPessoa: 130 },
        { min: 21, max: 25, valorPorPessoa: 120 },
      ],
    },

    // 10. Kit Festa e Decoração Premium
    {
      id: 'kit-festa-decoracao-premium',
      nome: 'Kit Festa e Decoração Premium',
      categoria: 'decoracao',
      tipo: 'por_embarcacao',
      premium: true,
      descricao: 'Decoração completa, bolo, doces gourmet e cupcakes',
      precoPorEmbarcacao: {
        ate36pes: 1850,
        ate50pes: 2500,
      },
    },

    // 11. Kit Despedida de Solteira
    {
      id: 'kit-despedida-solteira',
      nome: 'Kit Despedida de Solteira',
      categoria: 'decoracao',
      tipo: 'por_pessoa',
      premium: false,
      descricao: 'Cupcakes, docinhos, decoração temática e acessórios personalizados',
      faixasPreco: [
        { min: 7, max: 10, valorPorPessoa: 150 },
        { min: 11, max: 15, valorPorPessoa: 145 },
        { min: 16, max: 20, valorPorPessoa: 140 },
        { min: 21, max: 25, valorPorPessoa: 135 },
      ],
    },

    // 12. DJ com Equipamento de Som
    {
      id: 'dj-com-equipamento',
      nome: 'DJ com Equipamento de Som',
      categoria: 'entretenimento',
      tipo: 'fixo',
      premium: false,
      precoFixo: 1500,
      descricao: 'DJ profissional com equipamento de som e playlist personalizada',
    },

    // 13. Fotógrafo
    {
      id: 'fotografo',
      nome: 'Fotógrafo',
      categoria: 'entretenimento',
      tipo: 'fixo',
      premium: false,
      precoFixo: 800,
      descricao: 'Fotógrafo profissional com fotos editadas em alta resolução',
    },
  ];

  // ─── Funções de cálculo ──────────────────────────────────

  function calcularPrecoServico(servico, numPessoas, tamanhoEmbarcacao) {
    switch (servico.tipo) {
      case 'fixo':
        return { preco: servico.precoFixo, consultar: false, cobrancaMinima: null };

      case 'por_embarcacao':
        if (!tamanhoEmbarcacao || !servico.precoPorEmbarcacao) {
          return { preco: null, consultar: false, cobrancaMinima: null };
        }
        var precoEmb = servico.precoPorEmbarcacao[tamanhoEmbarcacao];
        if (precoEmb == null) {
          return { preco: null, consultar: true, cobrancaMinima: null };
        }
        return { preco: precoEmb, consultar: false, cobrancaMinima: null };

      case 'por_pessoa':
        if (!servico.faixasPreco || !servico.faixasPreco.length) {
          return { preco: null, consultar: false, cobrancaMinima: null };
        }

        // Busca faixa exata
        var faixa = null;
        for (var i = 0; i < servico.faixasPreco.length; i++) {
          var f = servico.faixasPreco[i];
          if (numPessoas >= f.min && numPessoas <= f.max) {
            faixa = f;
            break;
          }
        }

        if (faixa) {
          return { preco: faixa.valorPorPessoa * numPessoas, consultar: false, cobrancaMinima: null };
        }

        // Acima do máximo: usa último bracket
        var ultimaFaixa = servico.faixasPreco[servico.faixasPreco.length - 1];
        if (numPessoas > ultimaFaixa.max) {
          return { preco: ultimaFaixa.valorPorPessoa * numPessoas, consultar: false, cobrancaMinima: null };
        }

        // Abaixo do mínimo: cobra pelo mínimo
        var primeiraFaixa = servico.faixasPreco[0];
        if (numPessoas < primeiraFaixa.min) {
          return {
            preco: primeiraFaixa.valorPorPessoa * primeiraFaixa.min,
            consultar: false,
            cobrancaMinima: primeiraFaixa.min,
          };
        }

        return { preco: null, consultar: false, cobrancaMinima: null };

      default:
        return { preco: null, consultar: false, cobrancaMinima: null };
    }
  }

  function getValorPorPessoa(servico, numPessoas) {
    if (servico.tipo !== 'por_pessoa' || !servico.faixasPreco) return null;

    for (var i = 0; i < servico.faixasPreco.length; i++) {
      var f = servico.faixasPreco[i];
      if (numPessoas >= f.min && numPessoas <= f.max) {
        return f.valorPorPessoa;
      }
    }

    var ultimaFaixa = servico.faixasPreco[servico.faixasPreco.length - 1];
    if (numPessoas > ultimaFaixa.max) return ultimaFaixa.valorPorPessoa;

    var primeiraFaixa = servico.faixasPreco[0];
    if (numPessoas < primeiraFaixa.min) return primeiraFaixa.valorPorPessoa;

    return null;
  }

  function verificarConflitos(servicosSelecionados) {
    var avisos = [];
    var I = window.WeBoatI18n;
    function t(key, fallback) { return I ? I.t(key) : fallback; }

    var temCombo = servicosSelecionados.some(function (s) { return s.categoria === 'combo'; });
    var temChurrascoIndividual = servicosSelecionados.some(function (s) {
      return s.categoria === 'churrasco' && s.id !== 'utilizacao-churrasqueira';
    });
    var temOpenBarIndividual = servicosSelecionados.some(function (s) { return s.categoria === 'openbar'; });

    if (temCombo && temChurrascoIndividual) {
      avisos.push(t('configConflictComboChurrasco', 'Você selecionou um All Inclusive que já inclui churrasco junto com um serviço de churrasco avulso. Considere remover um deles para economizar.'));
    }
    if (temCombo && temOpenBarIndividual) {
      avisos.push(t('configConflictComboOpenBar', 'Você selecionou um All Inclusive que já inclui open bar junto com um open bar avulso. Considere remover um deles para economizar.'));
    }

    return avisos;
  }

  function calcularTaxaChurrasqueira(servicosSelecionados) {
    var algumExcluiTaxa = servicosSelecionados.some(function (s) { return s.excluiTaxaChurrasqueira; });
    return algumExcluiTaxa ? 0 : TAXA_CHURRASQUEIRA;
  }

  function precisaChurrasqueira(servicosSelecionados) {
    return servicosSelecionados.some(function (s) {
      return s.categoria === 'churrasco' || s.categoria === 'combo';
    });
  }

  function gerarMensagemWhatsApp(servicosSelecionados, numPessoas, total, tamanhoEmbarcacao) {
    var I = window.WeBoatI18n;
    function t(key, fallback) { return I ? I.t(key) : fallback; }
    var langTag = I ? ' [' + I.lang + ']' : '';

    var linhas = [
      t('configWaIntro', 'Olá! Gostaria de montar um pacote de serviços:') + langTag,
      '',
      '👥 ' + t('configWaPeople', 'Número de pessoas') + ': ' + numPessoas,
    ];

    if (tamanhoEmbarcacao) {
      var tamanhoLabel = tamanhoEmbarcacao === 'ate36pes' ? t('configUpTo36', 'Até 36 pés') : t('configUpTo50', 'Até 50 pés');
      linhas.push('🚤 ' + t('configWaBoat', 'Embarcação') + ': ' + tamanhoLabel);
    }

    linhas.push('');
    linhas.push('📋 ' + t('configWaServices', 'Serviços selecionados') + ':');

    servicosSelecionados.forEach(function (servico) {
      var resultado = calcularPrecoServico(servico, numPessoas, tamanhoEmbarcacao);
      var precoStr = resultado.preco != null ? 'R$ ' + resultado.preco.toLocaleString('pt-BR') : t('configWaConsult', 'A consultar');
      linhas.push('• ' + servico.nome + ' — ' + precoStr);
    });

    var temChurrasqueira = precisaChurrasqueira(servicosSelecionados);
    if (temChurrasqueira) {
      var taxa = calcularTaxaChurrasqueira(servicosSelecionados);
      if (taxa === 0) {
        linhas.push('• ' + t('configWaBBQIncluded', 'Taxa churrasqueira: INCLUSA no pacote'));
      } else {
        linhas.push('• ' + t('configWaBBQFee', 'Taxa churrasqueira') + ': R$ ' + taxa);
      }
    }

    linhas.push('');
    linhas.push('💰 ' + t('configWaTotal', 'Total estimado') + ': R$ ' + total.toLocaleString('pt-BR'));
    linhas.push('');
    linhas.push(t('configWaMore', 'Podem me enviar mais detalhes?'));

    return linhas.join('\n');
  }

  function getWhatsAppURL(mensagem) {
    return 'https://wa.me/' + WHATSAPP_NUMERO + '?text=' + encodeURIComponent(mensagem);
  }

  function getServicoPorId(id) {
    for (var i = 0; i < SERVICOS.length; i++) {
      if (SERVICOS[i].id === id) return SERVICOS[i];
    }
    return null;
  }

  function getServicosPorCategoria(categoria) {
    return SERVICOS.filter(function (s) {
      if (s.categoria === categoria) return true;
      // Combos also appear in churrasco and openbar tabs
      if (s.categoria === 'combo' && (categoria === 'churrasco' || categoria === 'openbar')) return true;
      return false;
    });
  }

  // ─── Exportar como global ────────────────────────────────

  window.WeBoatServicos = {
    SERVICOS: SERVICOS,
    CATEGORIAS: CATEGORIAS,
    TAXA_CHURRASQUEIRA: TAXA_CHURRASQUEIRA,
    WHATSAPP_NUMERO: WHATSAPP_NUMERO,
    calcularPrecoServico: calcularPrecoServico,
    getValorPorPessoa: getValorPorPessoa,
    verificarConflitos: verificarConflitos,
    calcularTaxaChurrasqueira: calcularTaxaChurrasqueira,
    precisaChurrasqueira: precisaChurrasqueira,
    gerarMensagemWhatsApp: gerarMensagemWhatsApp,
    getWhatsAppURL: getWhatsAppURL,
    getServicoPorId: getServicoPorId,
    getServicosPorCategoria: getServicosPorCategoria,
  };
})();
