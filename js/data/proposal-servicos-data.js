/**
 * Serviços disponíveis para o montador de proposta.
 * Fonte: weboat-servicos/src/data/servicos.ts + weboat-proposal/src/constants.ts
 */
(function () {
  'use strict';

  // Constantes de cálculo
  var PRECO_GUARDA_VIDAS = 400;
  var TAXA_HORA_EXTRA_SERVICO = 0.2;
  var LIMIAR_TAMANHO_EMBARCACAO = 36;

  var CATEGORIAS = {
    churrasco: { nome: 'Churrasco', icone: 'ph-fire' },
    openbar: { nome: 'Open Bar', icone: 'ph-beer-bottle' },
    combo: { nome: 'All Inclusive', icone: 'ph-package' },
    mesa: { nome: 'Mesas & Petiscos', icone: 'ph-wine' },
    decoracao: { nome: 'Decoração', icone: 'ph-balloon' },
    entretenimento: { nome: 'Entretenimento', icone: 'ph-music-notes' },
  };

  var servicos = [
    // ==================== CHURRASCO ====================
    {
      id: 'kit-churrasco-simples',
      nome: 'Kit Churrasco Simples',
      categoria: 'churrasco',
      tipo: 'por_pessoa',
      cobraHoraExtra: true,
      excluiTaxaChurrasqueira: true,
      temStaff: null,
      faixasPreco: [
        { min: 5, max: 5, valorPorPessoa: 150 },
        { min: 6, max: 7, valorPorPessoa: 140 },
        { min: 8, max: 10, valorPorPessoa: 125 },
        { min: 11, max: 15, valorPorPessoa: 115 },
        { min: 16, max: 20, valorPorPessoa: 105 },
        { min: 21, max: 25, valorPorPessoa: 100 },
      ],
      inclui: [
        'Picanha', 'Contra filé', 'Linguiça', 'Drumete',
        'Pão de alho', 'Farofa', 'Refrigerantes', 'Água',
      ],
    },
    {
      id: 'churrasco-com-acompanhamentos',
      nome: 'Churrasco com Acompanhamentos',
      categoria: 'churrasco',
      tipo: 'por_pessoa',
      cobraHoraExtra: true,
      excluiTaxaChurrasqueira: true,
      temStaff: {
        tipo: 'churrasqueiro',
        quantidade: 1,
        substituivelPorTripulacao: true,
      },
      faixasPreco: [
        { min: 7, max: 10, valorPorPessoa: 160 },
        { min: 11, max: 15, valorPorPessoa: 155 },
        { min: 16, max: 20, valorPorPessoa: 150 },
        { min: 21, max: 25, valorPorPessoa: 145 },
      ],
      inclui: [
        'Picanha', 'Chorizo', 'Linguiça Toscana', 'Drumete',
        'Arroz', 'Farofa', 'Vinagrete', 'Salada batata',
        'Refrigerantes', 'Sucos',
      ],
    },

    // ==================== OPEN BAR ====================
    {
      id: 'open-bar-basico',
      nome: 'Open Bar Básico',
      categoria: 'openbar',
      tipo: 'por_pessoa',
      cobraHoraExtra: true,
      temStaff: {
        tipo: 'barman',
        quantidade: 1,
        substituivelPorTripulacao: false,
      },
      faixasPreco: [
        { min: 7, max: 10, valorPorPessoa: 150 },
        { min: 11, max: 15, valorPorPessoa: 145 },
        { min: 16, max: 20, valorPorPessoa: 140 },
        { min: 21, max: 25, valorPorPessoa: 135 },
      ],
      inclui: [
        'Caipirinha', 'Caipvodka', 'Gin tônica',
        'Brahma/Original 2,5L/pessoa', 'Refrigerantes', 'Sucos',
      ],
    },
    {
      id: 'open-bar-premium',
      nome: 'Open Bar Premium',
      categoria: 'openbar',
      tipo: 'por_pessoa',
      cobraHoraExtra: true,
      temStaff: {
        tipo: 'barman',
        quantidade: 1,
        substituivelPorTripulacao: false,
      },
      faixasPreco: [
        { min: 7, max: 10, valorPorPessoa: 180 },
        { min: 11, max: 15, valorPorPessoa: 175 },
        { min: 16, max: 20, valorPorPessoa: 170 },
        { min: 21, max: 25, valorPorPessoa: 160 },
      ],
      inclui: [
        'Caipirinha', 'Caipvodka', 'Gin tônica', 'Moscow Mule',
        'Heineken/Stella 2,5L/pessoa', 'Refrigerantes', 'Sucos',
      ],
    },

    // ==================== ALL INCLUSIVE ====================
    {
      id: 'combo-churrasco-openbar-basico',
      nome: 'All Inclusive Básico',
      categoria: 'combo',
      tipo: 'por_pessoa',
      cobraHoraExtra: true,
      excluiTaxaChurrasqueira: true,
      temStaff: {
        tipo: 'churrasqueiro_barman',
        quantidade: 2,
        substituivelPorTripulacao: true,
      },
      faixasPreco: [
        { min: 7, max: 10, valorPorPessoa: 230 },
        { min: 11, max: 15, valorPorPessoa: 220 },
        { min: 16, max: 20, valorPorPessoa: 215 },
        { min: 21, max: 25, valorPorPessoa: 205 },
      ],
      inclui: [
        'Carnes premium', 'Acompanhamentos', 'Drinks',
        'Brahma/Original', 'Refrigerantes',
      ],
    },
    {
      id: 'combo-churrasco-openbar-premium',
      nome: 'All Inclusive Premium',
      categoria: 'combo',
      tipo: 'por_pessoa',
      cobraHoraExtra: true,
      excluiTaxaChurrasqueira: true,
      temStaff: {
        tipo: 'churrasqueiro_barman',
        quantidade: 2,
        substituivelPorTripulacao: true,
      },
      faixasPreco: [
        { min: 7, max: 10, valorPorPessoa: 250 },
        { min: 11, max: 15, valorPorPessoa: 240 },
        { min: 16, max: 20, valorPorPessoa: 235 },
        { min: 21, max: 25, valorPorPessoa: 220 },
      ],
      inclui: [
        'Carnes premium', 'Acompanhamentos', 'Drinks especiais',
        'Heineken/Stella', 'Refrigerantes',
      ],
    },

    // ==================== MESAS ====================
    {
      id: 'mesa-queijos-vinhos',
      nome: 'Mesa de Queijos & Vinhos',
      categoria: 'mesa',
      tipo: 'por_pessoa',
      cobraHoraExtra: true,
      temStaff: null,
      faixasPreco: [
        { min: 7, max: 10, valorPorPessoa: 140 },
        { min: 11, max: 15, valorPorPessoa: 130 },
        { min: 16, max: 20, valorPorPessoa: 125 },
        { min: 21, max: 25, valorPorPessoa: 115 },
      ],
      inclui: ['Queijos finos', 'Vinhos', 'Frutas', 'Pães', 'Acompanhamentos'],
    },
    {
      id: 'mesa-snacks-premium',
      nome: 'Mesa de Snacks Premium',
      categoria: 'mesa',
      tipo: 'por_pessoa',
      cobraHoraExtra: true,
      temStaff: null,
      faixasPreco: [
        { min: 7, max: 10, valorPorPessoa: 150 },
        { min: 11, max: 15, valorPorPessoa: 140 },
        { min: 16, max: 20, valorPorPessoa: 130 },
        { min: 21, max: 25, valorPorPessoa: 120 },
      ],
      inclui: ['Finger foods', 'Quiches', 'Tábua de frios', 'Frutas'],
    },

    // ==================== DECORAÇÃO ====================
    {
      id: 'kit-festa-decoracao-premium',
      nome: 'Kit Festa e Decoração Premium',
      categoria: 'decoracao',
      tipo: 'por_embarcacao',
      cobraHoraExtra: false,
      temStaff: null,
      precoPorEmbarcacao: {
        ate36pes: 1850,
        ate50pes: 2500,
      },
      inclui: ['Bolo', 'Doces gourmet', 'Cupcakes', 'Arco de bolas', 'Ornamentação'],
    },
    {
      id: 'kit-despedida-solteira',
      nome: 'Kit Despedida de Solteira',
      categoria: 'decoracao',
      tipo: 'por_pessoa',
      cobraHoraExtra: false,
      temStaff: null,
      faixasPreco: [
        { min: 7, max: 10, valorPorPessoa: 150 },
        { min: 11, max: 15, valorPorPessoa: 145 },
        { min: 16, max: 20, valorPorPessoa: 140 },
        { min: 21, max: 25, valorPorPessoa: 135 },
      ],
      inclui: ['Cupcakes', 'Docinhos', 'Faixas', 'Bexigas', 'Shot', 'Bolo temático'],
    },

    // ==================== ENTRETENIMENTO ====================
    {
      id: 'dj-com-equipamento',
      nome: 'DJ com Equipamento',
      categoria: 'entretenimento',
      tipo: 'fixo',
      cobraHoraExtra: true,
      precoFixo: 1500,
      temStaff: {
        tipo: 'dj',
        quantidade: 1,
        substituivelPorTripulacao: false,
      },
      inclui: ['DJ profissional', 'Equipamento de som'],
    },
    {
      id: 'fotografo',
      nome: 'Fotógrafo',
      categoria: 'entretenimento',
      tipo: 'fixo',
      cobraHoraExtra: true,
      precoFixo: 800,
      temStaff: {
        tipo: 'fotografo',
        quantidade: 1,
        substituivelPorTripulacao: false,
      },
      inclui: ['Fotógrafo profissional', 'Fotos editadas'],
    },
  ];

  // ==================== FUNÇÕES HELPER ====================

  function getServicoPorId(id) {
    for (var i = 0; i < servicos.length; i++) {
      if (servicos[i].id === id) return servicos[i];
    }
    return null;
  }

  function getServicosPorCategoria(categoria) {
    var resultado = [];
    for (var i = 0; i < servicos.length; i++) {
      if (servicos[i].categoria === categoria) resultado.push(servicos[i]);
    }
    return resultado;
  }

  function determinarTamanhoEmbarcacao(lanchaId) {
    var lancha = window.WeBoatData && window.WeBoatData.getLanchaById(lanchaId);
    if (!lancha) return 'ate36pes';
    return lancha.capacidade.maxima <= LIMIAR_TAMANHO_EMBARCACAO ? 'ate36pes' : 'ate50pes';
  }

  function calcularPrecoServico(servico, numPessoas, tamanhoEmbarcacao) {
    switch (servico.tipo) {
      case 'fixo':
        return servico.precoFixo || null;

      case 'por_embarcacao':
        if (!servico.precoPorEmbarcacao || !tamanhoEmbarcacao) return null;
        return servico.precoPorEmbarcacao[tamanhoEmbarcacao] || null;

      case 'por_pessoa':
        if (!servico.faixasPreco) return null;
        var faixa = null;
        for (var i = 0; i < servico.faixasPreco.length; i++) {
          var f = servico.faixasPreco[i];
          if (numPessoas >= f.min && numPessoas <= f.max) {
            faixa = f;
            break;
          }
        }
        if (!faixa) {
          var ultima = servico.faixasPreco[servico.faixasPreco.length - 1];
          if (numPessoas > ultima.max) {
            return ultima.valorPorPessoa * numPessoas;
          }
          return null;
        }
        return faixa.valorPorPessoa * numPessoas;

      default:
        return null;
    }
  }

  function calcularHoraExtraServico(servico, valorBase, horasExtras) {
    if (!servico.cobraHoraExtra) return 0;
    return valorBase * TAXA_HORA_EXTRA_SERVICO * horasExtras;
  }

  function contarStaffServicos(servicosSelecionados) {
    var total = 0;
    for (var i = 0; i < servicosSelecionados.length; i++) {
      var servico = servicosSelecionados[i];
      if (servico.temStaff && !servico.temStaff.substituivelPorTripulacao) {
        total += servico.temStaff.quantidade;
      }
    }
    return total;
  }

  // Expose globally
  window.WeBoatServicos = {
    servicos: servicos,
    CATEGORIAS: CATEGORIAS,
    PRECO_GUARDA_VIDAS: PRECO_GUARDA_VIDAS,
    TAXA_HORA_EXTRA_SERVICO: TAXA_HORA_EXTRA_SERVICO,
    LIMIAR_TAMANHO_EMBARCACAO: LIMIAR_TAMANHO_EMBARCACAO,
    getServicoPorId: getServicoPorId,
    getServicosPorCategoria: getServicosPorCategoria,
    determinarTamanhoEmbarcacao: determinarTamanhoEmbarcacao,
    calcularPrecoServico: calcularPrecoServico,
    calcularHoraExtraServico: calcularHoraExtraServico,
    contarStaffServicos: contarStaffServicos,
  };
})();
