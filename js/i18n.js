/* ============================================
   WEBOAT BRASIL - I18N MODULE
   Versao: 1.0 | Fevereiro 2026
   Language detection + UI strings for JS
   ============================================ */

var WeBoatI18n = (function() {
  'use strict';

  // Detect language from URL path
  var path = window.location.pathname;
  var lang = 'pt';
  if (path.indexOf('/en/') === 0 || path === '/en') lang = 'en';
  else if (path.indexOf('/es/') === 0 || path === '/es') lang = 'es';

  // UI strings used by JS components
  var strings = {
    pt: {
      // Navigation
      navBoats: 'Lanchas',
      navRoutes: 'Roteiros',
      navServices: 'Servicos',
      navOccasions: 'Ocasioes',
      navHowItWorks: 'Como Funciona',
      navAbout: 'Sobre',
      navContact: 'Contato',
      navFAQ: 'FAQ',
      navBlog: 'Blog',
      // Occasions dropdown
      navBachelorette: 'Despedida de Solteira',
      navBirthday: 'Aniversario',
      navCorporate: 'Corporativo',
      navNewYears: 'Reveillon',
      navCarnival: 'Carnaval',
      // Buttons
      btnWhatsApp: 'Fale pelo WhatsApp',
      btnRentNow: 'Alugar Lancha Agora',
      btnViewBoats: 'Ver Lanchas',
      btnQuote: 'Solicitar Orcamento',
      // WhatsApp messages
      waGeneral: 'Ola! Gostaria de informacoes sobre aluguel de lancha no Rio de Janeiro.',
      waBoat: 'Ola! Tenho interesse na lancha {name}. Poderia me enviar mais informacoes?',
      waRoute: 'Ola! Gostaria de fazer o roteiro {name}. Qual a disponibilidade?',
      waBachelorette: 'Ola! Estou organizando uma despedida de solteira e gostaria de informacoes sobre o passeio de lancha.',
      waBirthday: 'Ola! Quero comemorar meu aniversario na lancha. Podem me ajudar a organizar?',
      waCorporate: 'Ola! Gostaria de informacoes sobre eventos corporativos em lancha.',
      waNewYears: 'Ola! Quero informacoes sobre o reveillon na lancha para assistir a queima de fogos.',
      // Social proof
      tripsCompleted: 'passeios realizados',
      ownBoats: 'lanchas proprias',
      fiveStarReviews: 'avaliacoes 5 estrelas',
      igFollowers: 'seguidores no Instagram',
      // Form validation
      fieldRequired: 'Este campo e obrigatorio',
      invalidEmail: 'Email invalido',
      invalidPhone: 'Telefone invalido',
      // Misc
      openMenu: 'Abrir menu',
      closeMenu: 'Fechar menu',
      scrollDown: 'Role para descobrir',
      skipToContent: 'Pular para o conteudo principal',
      // Pricing
      from: 'A partir de',
      perTrip: 'por passeio',
      weekday: 'Seg-Qui',
      weekend: 'Sex-Dom',
      people: 'pessoas',
      hours: 'horas',
      // Sections
      ourFleet: 'Nossa Frota',
      popularRoutes: 'Roteiros Populares',
      addOnServices: 'Servicos Adicionais',
      whyWeBoat: 'Por que a WeBoat?',
      faqTitle: 'Perguntas Frequentes',
      // Footer
      allRightsReserved: 'Todos os direitos reservados'
    },
    en: {
      navBoats: 'Boats',
      navRoutes: 'Routes',
      navServices: 'Services',
      navOccasions: 'Occasions',
      navHowItWorks: 'How It Works',
      navAbout: 'About',
      navContact: 'Contact',
      navFAQ: 'FAQ',
      navBlog: 'Blog',
      navBachelorette: 'Bachelorette Party',
      navBirthday: 'Birthday Party',
      navCorporate: 'Corporate Events',
      navNewYears: "New Year's Eve",
      navCarnival: 'Carnival',
      btnWhatsApp: 'Chat on WhatsApp',
      btnRentNow: 'Rent a Boat Now',
      btnViewBoats: 'View Boats',
      btnQuote: 'Request a Quote',
      waGeneral: 'Hello! I would like information about boat rental in Rio de Janeiro.',
      waBoat: 'Hello! I am interested in the {name} boat. Could you send me more information?',
      waRoute: 'Hello! I would like to take the {name} route. What is the availability?',
      waBachelorette: 'Hello! I am organizing a bachelorette party and would like information about the boat trip.',
      waBirthday: 'Hello! I want to celebrate my birthday on a boat. Can you help me organize?',
      waCorporate: 'Hello! I would like information about corporate events on a boat.',
      waNewYears: "Hello! I want information about New Year's Eve on a boat to watch the fireworks.",
      tripsCompleted: 'trips completed',
      ownBoats: 'own boats',
      fiveStarReviews: '5-star reviews',
      igFollowers: 'Instagram followers',
      fieldRequired: 'This field is required',
      invalidEmail: 'Invalid email',
      invalidPhone: 'Invalid phone number',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      scrollDown: 'Scroll to discover',
      skipToContent: 'Skip to main content',
      from: 'From',
      perTrip: 'per trip',
      weekday: 'Mon-Thu',
      weekend: 'Fri-Sun',
      people: 'people',
      hours: 'hours',
      ourFleet: 'Our Fleet',
      popularRoutes: 'Popular Routes',
      addOnServices: 'Add-on Services',
      whyWeBoat: 'Why WeBoat?',
      faqTitle: 'Frequently Asked Questions',
      allRightsReserved: 'All rights reserved'
    },
    es: {
      navBoats: 'Lanchas',
      navRoutes: 'Rutas',
      navServices: 'Servicios',
      navOccasions: 'Ocasiones',
      navHowItWorks: 'Como Funciona',
      navAbout: 'Nosotros',
      navContact: 'Contacto',
      navFAQ: 'Preguntas',
      navBlog: 'Blog',
      navBachelorette: 'Despedida de Soltera',
      navBirthday: 'Cumpleanos',
      navCorporate: 'Eventos Corporativos',
      navNewYears: 'Ano Nuevo',
      navCarnival: 'Carnaval',
      btnWhatsApp: 'Hablar por WhatsApp',
      btnRentNow: 'Alquilar Lancha Ahora',
      btnViewBoats: 'Ver Lanchas',
      btnQuote: 'Solicitar Cotizacion',
      waGeneral: 'Hola! Me gustaria informacion sobre alquiler de lancha en Rio de Janeiro.',
      waBoat: 'Hola! Estoy interesado/a en la lancha {name}. Podrian enviarme mas informacion?',
      waRoute: 'Hola! Me gustaria hacer la ruta {name}. Cual es la disponibilidad?',
      waBachelorette: 'Hola! Estoy organizando una despedida de soltera y me gustaria informacion sobre el paseo en lancha.',
      waBirthday: 'Hola! Quiero celebrar mi cumpleanos en lancha. Pueden ayudarme a organizar?',
      waCorporate: 'Hola! Me gustaria informacion sobre eventos corporativos en lancha.',
      waNewYears: 'Hola! Quiero informacion sobre el ano nuevo en lancha para ver los fuegos artificiales.',
      tripsCompleted: 'paseos realizados',
      ownBoats: 'lanchas propias',
      fiveStarReviews: 'resenas 5 estrellas',
      igFollowers: 'seguidores en Instagram',
      fieldRequired: 'Este campo es obligatorio',
      invalidEmail: 'Email invalido',
      invalidPhone: 'Telefono invalido',
      openMenu: 'Abrir menu',
      closeMenu: 'Cerrar menu',
      scrollDown: 'Desplaza para descubrir',
      skipToContent: 'Saltar al contenido principal',
      from: 'Desde',
      perTrip: 'por paseo',
      weekday: 'Lun-Jue',
      weekend: 'Vie-Dom',
      people: 'personas',
      hours: 'horas',
      ourFleet: 'Nuestra Flota',
      popularRoutes: 'Rutas Populares',
      addOnServices: 'Servicios Adicionales',
      whyWeBoat: 'Por que WeBoat?',
      faqTitle: 'Preguntas Frecuentes',
      allRightsReserved: 'Todos los derechos reservados'
    }
  };

  // Navigation URL prefixes per language
  var navUrls = {
    pt: {
      home: '/',
      boats: '/lanchas/',
      routes: '/roteiros/',
      services: '/servicos/',
      bachelorette: '/despedida-solteira/',
      birthday: '/aniversario/',
      corporate: '/corporativo/',
      newYears: '/reveillon/',
      carnival: '/carnaval/',
      howItWorks: '/como-funciona/',
      about: '/sobre/',
      contact: '/contato/',
      faq: '/faq/',
      blog: '/blog/'
    },
    en: {
      home: '/en/',
      boats: '/en/boats/',
      routes: '/en/routes/',
      services: '/en/services/',
      bachelorette: '/en/bachelorette-party/',
      birthday: '/en/birthday-party/',
      corporate: '/en/corporate-events/',
      newYears: '/en/new-years-eve/',
      carnival: '/en/carnival/',
      howItWorks: '/en/how-it-works/',
      about: '/en/about/',
      contact: '/en/contact/',
      faq: '/en/faq/',
      blog: '/en/blog/'
    },
    es: {
      home: '/es/',
      boats: '/es/lanchas/',
      routes: '/es/rutas/',
      services: '/es/servicios/',
      bachelorette: '/es/despedida-de-soltera/',
      birthday: '/es/cumpleanos/',
      corporate: '/es/eventos-corporativos/',
      newYears: '/es/ano-nuevo/',
      carnival: '/es/carnaval/',
      howItWorks: '/es/como-funciona/',
      about: '/es/sobre-nosotros/',
      contact: '/es/contacto/',
      faq: '/es/preguntas-frecuentes/',
      blog: '/es/blog/'
    }
  };

  /**
   * Get a translated string, optionally interpolating {key} placeholders
   */
  function t(key, params) {
    var str = (strings[lang] && strings[lang][key]) || (strings.pt && strings.pt[key]) || key;
    if (params) {
      Object.keys(params).forEach(function(k) {
        str = str.replace('{' + k + '}', params[k]);
      });
    }
    return str;
  }

  /**
   * Get navigation URL for current language
   */
  function url(page) {
    return (navUrls[lang] && navUrls[lang][page]) || (navUrls.pt && navUrls.pt[page]) || '/';
  }

  /**
   * Format number for current locale
   */
  function formatNumber(num) {
    var locale = lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es' : 'en-US';
    return num.toLocaleString(locale);
  }

  /**
   * Build WhatsApp URL with localized message
   */
  function waUrl(messageKey, params) {
    var msg = t(messageKey, params);
    var source = ' [via site - ' + lang + ']';
    return 'https://wa.me/5521977724114?text=' + encodeURIComponent(msg + source);
  }

  return {
    lang: lang,
    t: t,
    url: url,
    formatNumber: formatNumber,
    waUrl: waUrl,
    strings: strings,
    navUrls: navUrls
  };
})();
