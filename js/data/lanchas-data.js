/**
 * Dados das lanchas WeBoat para o montador de proposta.
 * Fonte: weboat-proposal/src/data/lanchas.ts
 */
(function () {
  'use strict';

  var INCLUIDO_PADRAO = [
    'Combustível',
    'Tripulação habilitada',
    'Tapete flutuante',
    'Macarrões',
    'Som com Bluetooth',
    'Coolers',
  ];

  var TURNO_PADRAO = {
    tipo: 'padrao',
    manha: { horario: '09:00-14:00', duracao: 5 },
    tarde: { horario: '14:30-19:30', duracao: 5 },
  };

  var ROTEIROS = {
    R1: { nome: 'Mureta da Urca', duracao: 5 },
    R2: { nome: 'Praia Vermelha', duracao: 5 },
    R3: { nome: 'Copacabana', duracao: 5 },
    R4: { nome: 'Ilhas Cagarras', duracao: 5 },
    R5: { nome: 'Itaipu e Camboinhas', duracao: 5 },
  };

  var INFO_CHURRASQUEIRA = {
    padrao: {
      categoria: 'padrao',
      inclui: [
        'Comandante/tripulação na churrasqueira',
        'Gelo escama: 02 sacos (20kg cada)',
        'Gelo filtrado: 01 saco (10kg)',
        'Carvão',
      ],
    },
    maior: {
      categoria: 'maior',
      inclui: [
        'Tripulação na churrasqueira',
        'Gelo escama: 04 sacos (20kg cada)',
        'Gelo filtrado: 02 sacos (10kg cada)',
        'Carvão',
      ],
    },
    oceano: {
      categoria: 'oceano',
      inclui: [
        'Churrasqueira a gás',
        'Churrasqueiro',
        'Ajudante',
      ],
      observacao: 'GELO NÃO INCLUSO - contratar separadamente',
    },
  };

  var LANCHAS_CHURRASQUEIRA_MAIOR = ['bota', 'weboat-malik'];

  function getCategoriaChurrasqueira(lanchaId) {
    if (lanchaId === 'oceano') return 'oceano';
    if (LANCHAS_CHURRASQUEIRA_MAIOR.indexOf(lanchaId) !== -1) return 'maior';
    return 'padrao';
  }

  var lanchas = [
    // ==================== PRÓPRIAS ====================
    {
      id: 'weboat-32',
      nome: 'WeBoat 32',
      isPropria: true,
      capacidade: { base: 15, maxima: 15 },
      churrasqueira: 250,
      horaExtra: 800,
      pessoaExtra: null,
      arCondicionado: false,
      gerador: null,
      turnos: TURNO_PADRAO,
      roteiros: {
        R1: { normal: 2700, promocional: 2300 },
        R2: { normal: 2900, promocional: 2500 },
        R3: { normal: 3400, promocional: 3000 },
        R4: { normal: 4000, promocional: 3600 },
        R5: { normal: 4000, promocional: 3600 },
      },
      incluido: INCLUIDO_PADRAO,
    },
    {
      id: 'weboat-oceanic-36',
      nome: 'WeBoat Oceanic 36',
      isPropria: true,
      capacidade: { base: 14, maxima: 14 },
      churrasqueira: 250,
      horaExtra: 800,
      pessoaExtra: null,
      arCondicionado: false,
      gerador: null,
      turnos: TURNO_PADRAO,
      roteiros: {
        R1: { normal: 2800, promocional: 2400 },
        R2: { normal: 3000, promocional: 2600 },
        R3: { normal: 3600, promocional: 3100 },
        R4: { normal: 4300, promocional: 3700 },
        R5: { normal: 4300, promocional: 3700 },
      },
      incluido: INCLUIDO_PADRAO,
    },
    {
      id: 'weboat-390',
      nome: 'WeBoat 390',
      isPropria: true,
      capacidade: { base: 16, maxima: 16, comStaff: 18 },
      churrasqueira: 250,
      horaExtra: 800,
      pessoaExtra: null,
      arCondicionado: false,
      gerador: null,
      turnos: TURNO_PADRAO,
      roteiros: {
        R1: { normal: 3100, promocional: 2600 },
        R2: { normal: 3300, promocional: 2800 },
        R3: { normal: 3900, promocional: 3300 },
        R4: { normal: 4500, promocional: 3900 },
        R5: { normal: 4500, promocional: 3900 },
      },
      incluido: INCLUIDO_PADRAO,
    },
    {
      id: 'weboat-rio-star-50',
      nome: 'WeBoat Rio Star 50',
      isPropria: true,
      capacidade: { base: 20, maxima: 22, comStaff: 24 },
      churrasqueira: 250,
      horaExtra: 1200,
      pessoaExtra: { valor: 250, aPartirDe: 21, tipo: 'por_pessoa' },
      arCondicionado: false,
      gerador: null,
      turnos: TURNO_PADRAO,
      roteiros: {
        R1: { normal: 4500, promocional: 4000 },
        R2: { normal: 4800, promocional: 4300 },
        R3: { normal: 5500, promocional: 4900 },
        R4: { normal: 6500, promocional: 5900 },
        R5: { normal: 6500, promocional: 5900 },
      },
      incluido: INCLUIDO_PADRAO,
    },

    {
      id: 'weboat-ibiza-42',
      nome: 'WeBoat Ibiza 42',
      isPropria: true,
      capacidade: { base: 12, maxima: 12 },
      churrasqueira: 250,
      horaExtra: 800,
      pessoaExtra: null,
      arCondicionado: false,
      gerador: null,
      turnos: TURNO_PADRAO,
      roteiros: {
        R1: { normal: 3200, promocional: 2700 },
        R2: { normal: 3400, promocional: 2900 },
        R3: { normal: 4000, promocional: 3500 },
        R4: { normal: 4600, promocional: 4100 },
        R5: { normal: 4600, promocional: 4100 },
      },
      incluido: INCLUIDO_PADRAO,
    },

    // ==================== PARCEIRAS ====================
    {
      id: 'malaga-32',
      nome: 'Malaga 32',
      isPropria: false,
      capacidade: { base: 14, maxima: 14 },
      churrasqueira: 250,
      horaExtra: 800,
      pessoaExtra: null,
      arCondicionado: false,
      gerador: null,
      turnos: TURNO_PADRAO,
      roteiros: {
        R1: { preco: 2800 },
        R2: { preco: 2900 },
        R3: { preco: 3250 },
        R4: { preco: 3500 },
        R5: { preco: 3400 },
      },
      incluido: INCLUIDO_PADRAO,
    },
    {
      id: 'magna-28',
      nome: 'Magna 28',
      isPropria: false,
      capacidade: { base: 10, maxima: 10 },
      churrasqueira: 250,
      horaExtra: 600,
      pessoaExtra: null,
      arCondicionado: false,
      gerador: null,
      turnos: TURNO_PADRAO,
      roteiros: {
        R1: { preco: 3000 },
        R2: { preco: 3400 },
        R3: { preco: 3800 },
        R4: { preco: 4300 },
        R5: { preco: 4300 },
      },
      incluido: INCLUIDO_PADRAO,
    },
    {
      id: 'real-32',
      nome: 'WeBoat Real 32',
      isPropria: false,
      capacidade: { base: 12, maxima: 12 },
      churrasqueira: 250,
      horaExtra: 650,
      pessoaExtra: null,
      arCondicionado: false,
      gerador: null,
      turnos: TURNO_PADRAO,
      roteiros: {
        R1: { preco: 3300 },
        R2: { preco: 3800 },
        R3: { preco: 4300 },
        R4: { preco: 4800 },
        R5: { preco: 4800 },
      },
      incluido: INCLUIDO_PADRAO,
    },
    {
      id: 'favo',
      nome: 'WeBoat Rival 36',
      isPropria: false,
      capacidade: { base: 12, maxima: 12 },
      churrasqueira: 250,
      horaExtra: 1000,
      pessoaExtra: null,
      arCondicionado: false,
      gerador: null,
      turnos: TURNO_PADRAO,
      roteiros: {
        R1: { preco: 2900 },
        R2: { preco: 2900 },
        R3: { preco: 3350 },
        R4: { preco: 3800 },
        R5: { preco: 3800 },
      },
      incluido: INCLUIDO_PADRAO,
    },
    {
      id: 'ibiza',
      nome: 'WeBoat Ibiza 45',
      isPropria: false,
      capacidade: { base: 18, maxima: 18 },
      churrasqueira: 250,
      horaExtra: 1200,
      pessoaExtra: null,
      arCondicionado: false,
      gerador: null,
      turnos: TURNO_PADRAO,
      roteiros: {
        R1: { preco: 4200 },
        R2: { preco: 4200 },
        R3: { preco: 4700 },
        R4: { preco: 5200 },
        R5: { preco: 5200 },
      },
      incluido: INCLUIDO_PADRAO,
    },
    {
      id: 'oceanic-fantasma',
      nome: 'WeBoat Ghost 36',
      isPropria: false,
      capacidade: { base: 15, maxima: 15 },
      churrasqueira: 250,
      horaExtra: 800,
      pessoaExtra: null,
      arCondicionado: false,
      gerador: null,
      turnos: TURNO_PADRAO,
      roteiros: {
        R1: { preco: 3800 },
        R2: { preco: 4300 },
        R3: { preco: 4800 },
        R4: { preco: 5300 },
        R5: { preco: 5300 },
      },
      incluido: INCLUIDO_PADRAO,
    },
    {
      id: 'carbrasmar-37',
      nome: 'WeBoat Carbrasmar 41',
      isPropria: false,
      capacidade: { base: 16, maxima: 16 },
      churrasqueira: 250,
      horaExtra: 1000,
      pessoaExtra: null,
      arCondicionado: false,
      gerador: null,
      turnos: TURNO_PADRAO,
      roteiros: {
        R1: { preco: 3700 },
        R2: { preco: 4000 },
        R3: { preco: 4800 },
        R4: { preco: 5500 },
        R5: { preco: 5500 },
      },
      incluido: INCLUIDO_PADRAO,
    },
    {
      id: 'senna',
      nome: 'WeBoat Senna 50',
      isPropria: false,
      capacidade: { base: 18, maxima: 20 },
      churrasqueira: 250,
      horaExtra: 1300,
      pessoaExtra: { valor: 300, aPartirDe: 19, tipo: 'por_pessoa' },
      arCondicionado: false,
      gerador: null,
      turnos: TURNO_PADRAO,
      roteiros: {
        R1: { preco: 5500 },
        R2: { preco: 6500 },
        R3: { preco: 7500 },
        R4: { preco: 8500 },
        R5: { preco: 8500 },
      },
      incluido: INCLUIDO_PADRAO,
    },
    {
      id: 'tecnomarine',
      nome: 'Tecnomarine 50',
      isPropria: false,
      capacidade: { base: 20, maxima: 20 },
      churrasqueira: 250,
      horaExtra: 1500,
      pessoaExtra: null,
      arCondicionado: true,
      gerador: { temGerador: true, adicionalArCondicionado: 1000 },
      turnos: TURNO_PADRAO,
      roteiros: {
        R1: { preco: 6500 },
        R2: { preco: 7500 },
        R3: { preco: 8500 },
        R4: { preco: 9500 },
        R5: { preco: 9500 },
      },
      incluido: INCLUIDO_PADRAO,
    },
    {
      id: 'boat-rio',
      nome: 'Boat Rio 36',
      isPropria: false,
      capacidade: { base: 11, maxima: 11 },
      churrasqueira: 250,
      horaExtra: 1000,
      pessoaExtra: null,
      arCondicionado: false,
      gerador: null,
      turnos: TURNO_PADRAO,
      roteiros: {
        R1: { preco: 3500 },
        R2: { preco: 3500 },
        R3: { preco: 3950 },
        R4: { preco: 4400 },
        R5: { preco: 4400 },
      },
      incluido: INCLUIDO_PADRAO,
    },
    {
      id: 'atol',
      nome: 'Intermares 50',
      isPropria: false,
      capacidade: { base: 18, maxima: 18 },
      churrasqueira: 250,
      horaExtra: 1000,
      pessoaExtra: null,
      arCondicionado: false,
      gerador: null,
      turnos: TURNO_PADRAO,
      roteiros: {
        R1: { preco: 4500 },
        R2: { preco: 4500 },
        R3: { preco: 4950 },
        R4: { preco: 5400 },
        R5: { preco: 5400 },
      },
      incluido: INCLUIDO_PADRAO,
    },
    {
      id: 'lobster',
      nome: 'WeBoat 400',
      isPropria: false,
      capacidade: { base: 16, maxima: 22 },
      churrasqueira: 250,
      horaExtra: 1800,
      pessoaExtra: { valor: 150, aPartirDe: 17, tipo: 'por_pessoa' },
      arCondicionado: false,
      gerador: null,
      turnos: TURNO_PADRAO,
      roteiros: {
        R1: { preco: 4000 },
        R2: { preco: 4000 },
        R3: { preco: 4450 },
        R4: { preco: 4900 },
        R5: { preco: 4900 },
      },
      incluido: INCLUIDO_PADRAO,
    },
    {
      id: 'aquarius',
      nome: 'WeBoat 600',
      isPropria: false,
      capacidade: { base: 18, maxima: 22 },
      churrasqueira: 250,
      horaExtra: 1000,
      pessoaExtra: { valor: 300, aPartirDe: 19, tipo: 'por_pessoa' },
      arCondicionado: true,
      gerador: { temGerador: true, adicionalArCondicionado: 600 },
      turnos: TURNO_PADRAO,
      roteiros: {
        R1: { preco: 7500 },
        R2: { preco: 7500 },
        R3: { preco: 8500 },
        R4: { preco: 9500 },
        R5: { preco: 9500 },
      },
      incluido: INCLUIDO_PADRAO,
    },
    {
      id: 'essence',
      nome: 'WeBoat Essence',
      isPropria: false,
      capacidade: { base: 22, maxima: 22 },
      churrasqueira: 250,
      horaExtra: 1000,
      pessoaExtra: null,
      arCondicionado: true,
      gerador: { temGerador: true },
      turnos: TURNO_PADRAO,
      roteiros: {
        R1: { preco: 7000 },
        R2: { preco: 7500 },
        R3: null,
        R4: null,
        R5: null,
      },
      incluido: INCLUIDO_PADRAO,
    },
    {
      id: 'bota',
      nome: 'Barco Gourmet 53',
      isPropria: false,
      capacidade: { base: 30, maxima: 40 },
      churrasqueira: 400,
      horaExtra: 1500,
      pessoaExtra: { valor: 1200, aPartirDe: 31, tipo: 'valor_unico' },
      arCondicionado: false,
      gerador: { temGerador: true },
      turnos: {
        tipo: 'especial',
        manha: { horario: '09:00-14:00', duracao: 5 },
        tarde: { horario: '14:30-19:30', duracao: 5, adicional: 500 },
      },
      roteiros: {
        R1: { preco: 7000 },
        R2: { preco: 7000 },
        R3: null,
        R4: null,
        R5: null,
      },
      incluido: INCLUIDO_PADRAO,
    },
    {
      id: 'weboat-malik',
      nome: 'WeBoat Malik',
      isPropria: false,
      capacidade: { base: 35, maxima: 50 },
      churrasqueira: 400,
      horaExtra: 2000,
      pessoaExtra: { valor: 200, aPartirDe: 36, tipo: 'por_pessoa' },
      arCondicionado: false,
      gerador: { temGerador: true },
      turnos: {
        tipo: 'especial',
        manha: { horario: '08:30-13:30', duracao: 5 },
        tarde: { horario: '14:30-19:30', duracao: 5, adicional: 1000 },
      },
      roteiros: {
        R1: { preco: 8500 },
        R2: { preco: 9000 },
        R3: { preco: 11000 },
        R4: { preco: 13500 },
        R5: { preco: 13500 },
      },
      incluido: INCLUIDO_PADRAO.concat([
        '4 caixas de som PZ ativas',
        'Gerador',
      ]),
    },
    {
      id: 'oceano',
      nome: 'Catamarã Oceano',
      isPropria: false,
      capacidade: { base: 50, maxima: 65, comStaff: 75 },
      churrasqueira: 600,
      horaExtra: 3000,
      pessoaExtra: { valor: 2000, aPartirDe: 51, tipo: 'valor_unico' },
      arCondicionado: false,
      gerador: { temGerador: true },
      turnos: {
        tipo: 'especial',
        manha: { horario: '10:00-15:00', duracao: 5 },
        tarde: { horario: '17:00-22:00', duracao: 5 },
      },
      roteiros: {
        R1: { preco: 14000 },
        R2: { preco: 14000 },
        R3: null,
        R4: null,
        R5: null,
      },
      incluido: INCLUIDO_PADRAO,
    },
    {
      id: 'weboat-mares-50',
      nome: 'WeBoat Mares 50',
      isPropria: false,
      capacidade: { base: 25, maxima: 25, comStaff: 27 },
      churrasqueira: 250,
      horaExtra: 1300,
      pessoaExtra: null,
      arCondicionado: false,
      gerador: null,
      turnos: TURNO_PADRAO,
      roteiros: {
        R1: { preco: 5500 },
        R2: { preco: 6000 },
        R3: { preco: 6500 },
        R4: { preco: 7500 },
        R5: { preco: 7500 },
      },
      incluido: INCLUIDO_PADRAO,
    },

    // ==================== FLEXÍVEIS ====================
    {
      id: 'vib',
      nome: 'Prestige 60',
      isPropria: false,
      capacidade: { base: 12, maxima: 12 },
      churrasqueira: 250,
      horaExtra: 2500,
      pessoaExtra: null,
      arCondicionado: true,
      gerador: { temGerador: true },
      turnos: {
        tipo: 'flexivel',
        duracao: 6,
      },
      roteiros: {
        R1: { preco: 15000 },
        R2: { preco: 15000 },
        R3: null,
        R4: null,
        R5: null,
      },
      incluido: INCLUIDO_PADRAO,
    },
    {
      id: 'rebecca',
      nome: 'Schaefer 62 Fly',
      isPropria: false,
      capacidade: { base: 16, maxima: 16 },
      churrasqueira: 250,
      horaExtra: 2500,
      pessoaExtra: null,
      arCondicionado: true,
      gerador: { temGerador: true },
      turnos: {
        tipo: 'flexivel',
        duracao: 6,
      },
      roteiros: {
        R1: { preco: 15000 },
        R2: { preco: 15000 },
        R3: null,
        R4: null,
        R5: null,
      },
      incluido: INCLUIDO_PADRAO,
    },
    {
      id: 'intermarine-60-fly',
      nome: 'Intermarine 60 Fly',
      isPropria: false,
      capacidade: { base: 17, maxima: 17 },
      churrasqueira: 250,
      horaExtra: 2500,
      pessoaExtra: null,
      arCondicionado: true,
      gerador: { temGerador: true },
      turnos: {
        tipo: 'flexivel',
        duracao: 6,
      },
      roteiros: {
        R1: { preco: 15000 },
        R2: { preco: 15000 },
        R3: null,
        R4: null,
        R5: null,
      },
      incluido: INCLUIDO_PADRAO,
    },
  ];

  // ==================== FUNÇÕES HELPER ====================

  function getLanchaById(id) {
    for (var i = 0; i < lanchas.length; i++) {
      if (lanchas[i].id === id) return lanchas[i];
    }
    return null;
  }

  function getPrecoRoteiro(lancha, roteiroId, isPromocional) {
    var precoRoteiro = lancha.roteiros[roteiroId];
    if (!precoRoteiro) return null;

    if (precoRoteiro.preco !== undefined) {
      return precoRoteiro.preco;
    }
    if (precoRoteiro.normal !== undefined) {
      return isPromocional ? precoRoteiro.promocional : precoRoteiro.normal;
    }
    return null;
  }

  function getInfoChurrasqueira(lanchaId) {
    var categoria = getCategoriaChurrasqueira(lanchaId);
    return INFO_CHURRASQUEIRA[categoria];
  }

  // Expose globally
  window.WeBoatData = {
    lanchas: lanchas,
    ROTEIROS: ROTEIROS,
    INFO_CHURRASQUEIRA: INFO_CHURRASQUEIRA,
    getLanchaById: getLanchaById,
    getPrecoRoteiro: getPrecoRoteiro,
    getCategoriaChurrasqueira: getCategoriaChurrasqueira,
    getInfoChurrasqueira: getInfoChurrasqueira,
  };
})();
