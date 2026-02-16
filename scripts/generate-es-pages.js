#!/usr/bin/env node
/**
 * Generate Spanish pages from Portuguese source pages.
 * Run: node scripts/generate-es-pages.js
 *
 * Same strategy as generate-en-pages.js but for Spanish (Latin American).
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BASE_URL = 'https://www.weboatbrasil.com.br';
const registry = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/i18n-registry.json'), 'utf8'));

const urlMap = {};
registry.pages.forEach(p => { urlMap[p.pt] = p.es; });

// ═══════════════════════════════════════════════════════════
// PAGE DEFINITIONS
// ═══════════════════════════════════════════════════════════
const pages = [
  // Homepage
  {
    ptPath: 'index.html',
    esPath: 'es/index.html',
    title: 'Alquiler de Lanchas en Río de Janeiro | WeBoat Brasil',
    description: 'Alquiler de lanchas en Río de Janeiro con 5 embarcaciones propias. Paseos privativos para fiestas, cumpleaños y despedidas. +1.000 reseñas 5 estrellas.',
    keywords: 'alquiler lancha rio de janeiro, paseo en lancha rio, alquilar lancha rio, charter barco rio, fiesta en lancha rio',
    waMessage: '¡Hola! Me gustaría información sobre alquiler de lanchas en Río de Janeiro. [via site - es]',
    css: 'home',
    isHomepage: true,
  },
  // Fleet
  {
    ptPath: 'lanchas/index.html',
    esPath: 'es/lanchas/index.html',
    title: 'Lanchas para Alquilar en Río de Janeiro | Flota WeBoat Brasil',
    description: 'Alquiler de lanchas en Río de Janeiro. 5 lanchas propias + embarcaciones asociadas para grupos de 10 a 65 personas. Desde R$ 2.300.',
    keywords: 'lanchas alquiler rio de janeiro, flota lanchas, weboat lanchas, charter rio',
    waMessage: '¡Hola! Me gustaría información sobre su flota de lanchas. [via site - es]',
    css: 'frota',
  },
  {
    ptPath: 'lanchas/weboat-32/index.html',
    esPath: 'es/lanchas/weboat-32/index.html',
    title: 'WeBoat 32 - Lancha para 15 Personas | Alquiler en Río | WeBoat Brasil',
    description: 'Alquile la WeBoat 32, lancha para hasta 15 personas en Río de Janeiro. ¡Mejor costo-beneficio! Desde R$ 2.300. Combustible y marinero incluidos.',
    keywords: 'weboat 32, lancha 15 personas, alquiler lancha rio de janeiro',
    waMessage: '¡Hola! Me interesa la lancha WeBoat 32. ¿Podrían enviarme más información? [via site - es]',
    css: 'lancha-detalhe',
  },
  {
    ptPath: 'lanchas/weboat-390/index.html',
    esPath: 'es/lanchas/weboat-390/index.html',
    title: 'WeBoat 390 - Lancha para 16 Personas | Alquiler en Río | WeBoat Brasil',
    description: 'Alquile la WeBoat 390, lancha versátil para hasta 16 personas. ¡Perfecta para fiestas! Desde R$ 2.600.',
    keywords: 'weboat 390, lancha 16 personas, lancha fiesta rio',
    waMessage: '¡Hola! Me interesa la lancha WeBoat 390. ¿Podrían enviarme más información? [via site - es]',
    css: 'lancha-detalhe',
  },
  {
    ptPath: 'lanchas/weboat-oceanic-36/index.html',
    esPath: 'es/lanchas/weboat-oceanic-36/index.html',
    title: 'WeBoat Oceanic 36 - Lancha Premium para 14 Personas | WeBoat Brasil',
    description: 'Alquile la WeBoat Oceanic 36, confort premium para hasta 14 personas. Desde R$ 2.900. Combustible y marinero incluidos.',
    keywords: 'weboat oceanic 36, lancha premium rio, lancha 14 personas',
    waMessage: '¡Hola! Me interesa la lancha WeBoat Oceanic 36. ¿Podrían enviarme más información? [via site - es]',
    css: 'lancha-detalhe',
  },
  {
    ptPath: 'lanchas/weboat-ibiza-42/index.html',
    esPath: 'es/lanchas/weboat-ibiza-42/index.html',
    title: 'WeBoat Ibiza 42 - Lancha con Flybridge para 12 Personas | WeBoat Brasil',
    description: 'Alquile la WeBoat Ibiza 42 con flybridge exclusivo para hasta 12 personas. Desde R$ 2.700.',
    keywords: 'weboat ibiza 42, lancha flybridge rio, lancha 12 personas',
    waMessage: '¡Hola! Me interesa la lancha WeBoat Ibiza 42. ¿Podrían enviarme más información? [via site - es]',
    css: 'lancha-detalhe',
  },
  {
    ptPath: 'lanchas/weboat-rio-star-50/index.html',
    esPath: 'es/lanchas/weboat-rio-star-50/index.html',
    title: 'WeBoat Rio Star 50 - La Mayor Lancha para 22 Personas | WeBoat Brasil',
    description: 'Alquile la WeBoat Rio Star 50, nuestra mayor lancha para hasta 22 personas. Desde R$ 4.000.',
    keywords: 'weboat rio star 50, lancha grande rio, lancha 22 personas',
    waMessage: '¡Hola! Me interesa la lancha WeBoat Rio Star 50. ¿Podrían enviarme más información? [via site - es]',
    css: 'lancha-detalhe',
  },
  {
    ptPath: 'lanchas/comparativo/index.html',
    esPath: 'es/lanchas/comparar/index.html',
    title: 'Comparar Lanchas - Encuentre Su Lancha Ideal | WeBoat Brasil',
    description: 'Compare todas las lanchas WeBoat lado a lado. Capacidad, precio, características. Encuentre la lancha perfecta para su paseo.',
    keywords: 'comparar lanchas rio, comparación lanchas, cual lancha alquilar',
    waMessage: '¡Hola! Me gustaría ayuda para elegir la lancha correcta. [via site - es]',
    css: 'lancha-detalhe',
  },
  // Routes
  {
    ptPath: 'roteiros/index.html',
    esPath: 'es/rutas/index.html',
    title: 'Rutas de Paseo en Lancha en Río de Janeiro | WeBoat Brasil',
    description: 'Descubra nuestras 6 rutas de paseo en lancha en Río de Janeiro. Desde Mureta da Urca hasta Ilhas Cagarras. Paseos de 5 horas desde R$ 2.300.',
    keywords: 'rutas paseo lancha rio, itinerario paseo barco rio, tour bahía guanabara',
    waMessage: '¡Hola! Me gustaría información sobre sus rutas de paseo en lancha. [via site - es]',
    css: 'roteiros',
  },
  {
    ptPath: 'roteiros/mureta-da-urca/index.html',
    esPath: 'es/rutas/mureta-da-urca/index.html',
    title: 'Paseo en Lancha Mureta da Urca | Mejor Costo-Beneficio | WeBoat Brasil',
    description: 'Paseo en lancha hasta Mureta da Urca en Río de Janeiro. Tour de 5 horas con vista al Pan de Azúcar. Desde R$ 2.300.',
    keywords: 'mureta da urca paseo lancha, tour barco pan de azucar, urca lancha rio',
    waMessage: '¡Hola! Me gustaría hacer la ruta Mureta da Urca. ¿Cuál es la disponibilidad? [via site - es]',
    css: 'roteiros',
  },
  {
    ptPath: 'roteiros/praia-vermelha/index.html',
    esPath: 'es/rutas/praia-vermelha/index.html',
    title: 'Paseo en Lancha Praia Vermelha | Ruta Más Popular | WeBoat Brasil',
    description: 'Paseo en lancha hasta Praia Vermelha (Playa Roja) en Río. ¡Nuestra ruta más popular! 5 horas desde R$ 2.500.',
    keywords: 'praia vermelha paseo lancha, playa roja barco rio, tour más popular',
    waMessage: '¡Hola! Me gustaría hacer la ruta Praia Vermelha. ¿Cuál es la disponibilidad? [via site - es]',
    css: 'roteiros',
  },
  {
    ptPath: 'roteiros/copacabana/index.html',
    esPath: 'es/rutas/copacabana/index.html',
    title: 'Paseo en Lancha por Copacabana | Vista Icónica | WeBoat Brasil',
    description: 'Paseo en lancha por la playa de Copacabana. ¡Vistas icónicas! 5 horas desde R$ 3.000.',
    keywords: 'copacabana paseo lancha, tour barco copacabana, vista icónica lancha rio',
    waMessage: '¡Hola! Me gustaría hacer la ruta Copacabana. ¿Cuál es la disponibilidad? [via site - es]',
    css: 'roteiros',
  },
  {
    ptPath: 'roteiros/ilhas-cagarras/index.html',
    esPath: 'es/rutas/ilhas-cagarras/index.html',
    title: 'Paseo en Lancha Ilhas Cagarras | Aventura en Mar Abierto | WeBoat Brasil',
    description: 'Paseo en lancha hasta las Islas Cagarras cerca de Ipanema. ¡Aventura en mar abierto! 5 horas desde R$ 3.600.',
    keywords: 'ilhas cagarras paseo lancha, islas cagarras barco, mar abierto lancha rio',
    waMessage: '¡Hola! Me gustaría hacer la ruta Ilhas Cagarras. ¿Cuál es la disponibilidad? [via site - es]',
    css: 'roteiros',
  },
  {
    ptPath: 'roteiros/itaipu-camboinhas/index.html',
    esPath: 'es/rutas/itaipu-camboinhas/index.html',
    title: 'Paseo en Lancha Itaipu y Camboinhas | Playas Escondidas | WeBoat Brasil',
    description: 'Paseo en lancha hasta las playas de Itaipu y Camboinhas en Niterói. ¡Playas paradisíacas! 5 horas desde R$ 3.600.',
    keywords: 'itaipu camboinhas paseo lancha, playas escondidas niteroi, playa desierta barco',
    waMessage: '¡Hola! Me gustaría hacer la ruta Itaipu y Camboinhas. ¿Cuál es la disponibilidad? [via site - es]',
    css: 'roteiros',
  },
  {
    ptPath: 'roteiros/volta-completa/index.html',
    esPath: 'es/rutas/volta-completa/index.html',
    title: 'Tour Completo en Lancha | Experiencia Completa | WeBoat Brasil',
    description: 'Tour completo en lancha por Río de Janeiro. ¡La experiencia definitiva! 5 horas desde R$ 4.500.',
    keywords: 'tour completo lancha rio, paseo completo barco, volta completa lancha',
    waMessage: '¡Hola! Me gustaría hacer la ruta del Tour Completo. ¿Cuál es la disponibilidad? [via site - es]',
    css: 'roteiros',
  },
  // Occasions
  {
    ptPath: 'despedida-solteira/index.html',
    esPath: 'es/despedida-de-soltera/index.html',
    title: 'Despedida de Soltera en Lancha en Río de Janeiro | WeBoat Brasil',
    description: '¡Celebra tu despedida de soltera en una lancha privada en Río de Janeiro! DJ, open bar, decoración. Lanchas para 10-65 personas.',
    keywords: 'despedida soltera lancha rio, fiesta despedida barco, despedida de soltera rio de janeiro',
    waMessage: '¡Hola! Estoy organizando una despedida de soltera y me gustaría información sobre el paseo en lancha. [via site - es]',
    css: 'ocasioes',
  },
  {
    ptPath: 'aniversario/index.html',
    esPath: 'es/cumpleanos/index.html',
    title: 'Fiesta de Cumpleaños en Lancha en Río de Janeiro | WeBoat Brasil',
    description: '¡Celebra tu cumpleaños en una lancha privada en Río! Asado, DJ, open bar, decoración. Desde R$ 2.300.',
    keywords: 'cumpleaños lancha rio, fiesta cumpleaños barco, celebración cumpleaños rio de janeiro',
    waMessage: '¡Hola! Quiero celebrar mi cumpleaños en una lancha. ¿Pueden ayudarme a organizar? [via site - es]',
    css: 'ocasioes',
  },
  {
    ptPath: 'corporativo/index.html',
    esPath: 'es/eventos-corporativos/index.html',
    title: 'Eventos Corporativos en Lancha en Río de Janeiro | WeBoat Brasil',
    description: 'Organice su evento corporativo en una lancha privada en Río. Team building, entretenimiento de clientes. Lanchas para 10-65 personas.',
    keywords: 'evento corporativo lancha rio, team building barco, evento empresarial rio de janeiro',
    waMessage: '¡Hola! Me gustaría información sobre eventos corporativos en lancha. [via site - es]',
    css: 'ocasioes',
  },
  {
    ptPath: 'reveillon/index.html',
    esPath: 'es/ano-nuevo/index.html',
    title: 'Año Nuevo en Lancha en Río de Janeiro | WeBoat Brasil',
    description: '¡Vea los fuegos artificiales desde una lancha privada en Año Nuevo en Río! La mejor vista de Copacabana.',
    keywords: 'año nuevo lancha rio, reveillon barco rio de janeiro, fuegos artificiales lancha copacabana',
    waMessage: '¡Hola! Quiero información sobre Año Nuevo en lancha para ver los fuegos artificiales. [via site - es]',
    css: 'ocasioes',
  },
  {
    ptPath: 'carnaval/index.html',
    esPath: 'es/carnaval/index.html',
    title: 'Carnaval en Lancha en Río de Janeiro | WeBoat Brasil',
    description: '¡Celebra el Carnaval en una lancha privada en Río de Janeiro! DJ, open bar, confeti. ¡Tu propia fiesta flotante!',
    keywords: 'carnaval lancha rio, fiesta carnaval barco, carnaval flotante rio de janeiro',
    waMessage: '¡Hola! Quiero información sobre el Carnaval en lancha en Río de Janeiro. [via site - es]',
    css: 'ocasioes',
  },
  // Support
  {
    ptPath: 'servicos/index.html',
    esPath: 'es/servicios/index.html',
    title: 'Servicios Adicionales - Asado, Open Bar, DJ y Más | WeBoat Brasil',
    description: 'Personalice su paseo en lancha con asado, open bar, DJ, decoración y más.',
    keywords: 'servicios lancha rio, asado en lancha, open bar lancha, dj alquiler lancha',
    waMessage: '¡Hola! Me gustaría información sobre servicios adicionales para mi paseo en lancha. [via site - es]',
    css: 'ocasioes',
  },
  {
    ptPath: 'sobre/index.html',
    esPath: 'es/sobre-nosotros/index.html',
    title: 'Sobre WeBoat Brasil | Alquiler de Lanchas en Río de Janeiro',
    description: 'Conozca WeBoat Brasil, empresa líder en alquiler de lanchas en Río de Janeiro. +1.000 paseos, 5 lanchas propias, Marina da Glória.',
    keywords: 'sobre weboat, empresa alquiler lanchas rio, marina da gloria lanchas',
    waMessage: '¡Hola! Me gustaría saber más sobre WeBoat Brasil. [via site - es]',
    css: 'sobre',
  },
  {
    ptPath: 'faq/index.html',
    esPath: 'es/preguntas-frecuentes/index.html',
    title: 'Preguntas Frecuentes | WeBoat Brasil',
    description: 'Preguntas frecuentes sobre alquiler de lanchas en Río de Janeiro. Precios, política de cancelación, qué incluye y más.',
    keywords: 'preguntas frecuentes alquiler lancha, faq paseo barco rio',
    waMessage: '¡Hola! Tengo una pregunta sobre el alquiler de lanchas. [via site - es]',
    css: 'faq',
  },
  {
    ptPath: 'contato/index.html',
    esPath: 'es/contacto/index.html',
    title: 'Contáctenos | WeBoat Brasil - Alquiler de Lanchas Río',
    description: 'Contacte con WeBoat Brasil para alquiler de lanchas en Río de Janeiro. WhatsApp, teléfono, email.',
    keywords: 'contacto weboat, weboat teléfono, weboat whatsapp',
    waMessage: '¡Hola! Me gustaría ponerme en contacto con WeBoat Brasil. [via site - es]',
    css: 'contato',
  },
  {
    ptPath: 'como-funciona/index.html',
    esPath: 'es/como-funciona/index.html',
    title: 'Cómo Funciona - Reserve Su Paseo en Lancha | WeBoat Brasil',
    description: 'Aprenda cómo reservar un paseo en lancha con WeBoat Brasil. Proceso simple de 3 pasos.',
    keywords: 'como alquilar lancha rio, proceso alquiler lancha, reservar paseo lancha rio',
    waMessage: '¡Hola! Me gustaría entender cómo funciona el alquiler de lanchas. [via site - es]',
    css: 'ocasioes',
  },
  {
    ptPath: 'areas-atendidas/index.html',
    esPath: 'es/areas-de-servicio/index.html',
    title: 'Áreas de Servicio - Adónde Vamos | WeBoat Brasil',
    description: 'Descubra todas las áreas cubiertas por los paseos de lancha de WeBoat Brasil.',
    keywords: 'áreas paseo lancha rio, adonde va weboat, bahía guanabara áreas lancha',
    waMessage: '¡Hola! Me gustaría información sobre las áreas que cubren. [via site - es]',
    css: 'ocasioes',
  },
  // Blog
  {
    ptPath: 'blog/index.html',
    esPath: 'es/blog/index.html',
    title: 'Blog - Tips de Lanchas y Guías de Río de Janeiro | WeBoat Brasil',
    description: 'Tips para paseos en lancha, guías de playas en Río de Janeiro y todo lo que necesita saber para su experiencia marítima.',
    keywords: 'blog paseo lancha, guía río de janeiro lancha, tips lancha',
    waMessage: '¡Hola! Me gustaría información sobre alquiler de lanchas en Río de Janeiro. [via site - es]',
    css: null,
  },
  {
    ptPath: 'blog/melhores-praias-lancha-rj/index.html',
    esPath: 'es/blog/mejores-playas-en-lancha-rio/index.html',
    title: 'Mejores Playas para Visitar en Lancha en Río de Janeiro | WeBoat Blog',
    description: 'Descubra las mejores playas accesibles solo en lancha en Río de Janeiro. Aguas cristalinas, calas escondidas e islas paradisíacas.',
    keywords: 'mejores playas lancha rio, playas en barco rio de janeiro, playas escondidas rio',
    waMessage: '¡Hola! Me gustaría información sobre paseos en lancha a las playas. [via site - es]',
    css: null,
  },
  {
    ptPath: 'blog/o-que-vestir-passeio-lancha/index.html',
    esPath: 'es/blog/que-vestir-paseo-en-lancha/index.html',
    title: 'Qué Vestir en un Paseo en Lancha en Río de Janeiro | WeBoat Blog',
    description: 'Guía completa sobre qué vestir para un paseo en lancha en Río. Tips de ropa, protector solar, calzado y elementos esenciales.',
    keywords: 'que vestir paseo lancha, ropa paseo barco, vestimenta lancha rio',
    waMessage: '¡Hola! Me gustaría información sobre qué llevar al paseo en lancha. [via site - es]',
    css: null,
  },
  {
    ptPath: 'blog/guia-marina-da-gloria/index.html',
    esPath: 'es/blog/guia-marina-da-gloria/index.html',
    title: 'Guía Marina da Glória - Cómo Llegar | WeBoat Blog',
    description: 'Guía completa de la Marina da Glória en Río de Janeiro. Cómo llegar, estacionamiento, qué esperar al llegar.',
    keywords: 'guía marina da gloria, como llegar marina da gloria, marina gloria rio',
    waMessage: '¡Hola! Me gustaría indicaciones para llegar a la Marina da Glória. [via site - es]',
    css: null,
  },
  // Legal
  {
    ptPath: 'politica-de-privacidade/index.html',
    esPath: 'es/politica-de-privacidad/index.html',
    title: 'Política de Privacidad | WeBoat Brasil',
    description: 'Política de privacidad de WeBoat Brasil. Conozca cómo recopilamos, usamos y protegemos sus datos personales.',
    keywords: 'weboat política privacidad, protección datos alquiler lancha',
    waMessage: '¡Hola! Tengo una pregunta sobre la política de privacidad. [via site - es]',
    css: null,
  },
  {
    ptPath: 'termos-de-uso/index.html',
    esPath: 'es/terminos-de-uso/index.html',
    title: 'Términos de Uso | WeBoat Brasil',
    description: 'Términos de uso de WeBoat Brasil. Condiciones de reserva, política de cancelación, responsabilidades.',
    keywords: 'weboat términos de uso, condiciones alquiler lancha, política cancelación',
    waMessage: '¡Hola! Tengo una pregunta sobre los términos de uso. [via site - es]',
    css: null,
  },
  // Checkout
  {
    ptPath: 'checkout/index.html',
    esPath: 'es/checkout/index.html',
    title: 'Checkout | WeBoat Brasil',
    description: 'Complete su reserva de paseo en lancha con WeBoat Brasil. Pago seguro vía PIX o tarjeta.',
    keywords: '',
    waMessage: '¡Hola! Tuve un problema con el enlace de pago. [via site - es]',
    css: 'checkout',
    noindex: true,
    isCheckout: true,
  },
];

// ═══════════════════════════════════════════════════════════
// PT → ES DICTIONARY
// ═══════════════════════════════════════════════════════════
const translations = [
  // --- Navigation & UI ---
  ['Pular para o conteúdo', 'Ir al contenido principal'],
  ['Pular para conteúdo', 'Ir al contenido principal'],
  ['Abrir menu', 'Abrir menú'],
  ['Fechar menu', 'Cerrar menú'],
  ['Fale conosco pelo WhatsApp', 'Chatea con nosotros por WhatsApp'],
  ['Fale pelo WhatsApp', 'Chatear por WhatsApp'],
  ['Fale no WhatsApp', 'Chatear por WhatsApp'],
  ['Falar no WhatsApp', 'Chatear por WhatsApp'],
  ['Ver Todas as Lanchas', 'Ver Todas las Lanchas'],
  ['Conhecer as Lanchas', 'Conocer las Lanchas'],
  ['Ver todas as lanchas', 'Ver todas las lanchas'],
  ['Voltar ao Site', 'Volver al Sitio'],
  ['Voltar ao Topo', 'Volver arriba'],
  ['Voltar ao topo', 'Volver arriba'],
  ['Lanchas', 'Lanchas'],
  ['Roteiros', 'Rutas'],
  ['Serviços', 'Servicios'],
  ['Servicos', 'Servicios'],

  // --- Section headers ---
  ['Ocasiões Especiais', 'Ocasiones Especiales'],
  ['Nossos Serviços', 'Nuestros Servicios'],
  ['Perguntas Frequentes', 'Preguntas Frecuentes'],
  ['Contato', 'Contacto'],
  ['Sobre a Empresa', 'Sobre Nosotros'],
  ['Sobre', 'Sobre Nosotros'],
  ['Fale Conosco', 'Contáctenos'],
  ['Como Funciona', 'Cómo Funciona'],
  ['Como funciona', 'Cómo funciona'],
  ['Áreas Atendidas', 'Áreas de Servicio'],

  // --- CTA phrases ---
  ['Reservar Minha Lancha', 'Reservar Mi Lancha'],
  ['Reservar Agora', 'Reservar Ahora'],
  ['Reserve Agora', 'Reserve Ahora'],
  ['Reserve pelo WhatsApp', 'Reserve por WhatsApp'],
  ['Solicitar Orçamento', 'Solicitar Presupuesto'],
  ['Solicitar orçamento', 'Solicitar presupuesto'],
  ['Quero Reservar', 'Quiero Reservar'],
  ['Saiba Mais', 'Más Información'],
  ['Ver Lancha', 'Ver Lancha'],
  ['Ver Roteiro', 'Ver Ruta'],
  ['Ver Detalhes', 'Ver Detalles'],
  ['Agendar Passeio', 'Agendar Paseo'],
  ['Continuar para Pagamento', 'Continuar al Pago'],
  ['Pagar Agora', 'Pagar Ahora'],
  ['Copiar', 'Copiar'],

  // --- Boat/fleet terms ---
  ['Lanchas para Alugar', 'Lanchas para Alquilar'],
  ['Aluguel de Lanchas', 'Alquiler de Lanchas'],
  ['Aluguel de lancha', 'Alquiler de lancha'],
  ['Aluguel de Lancha', 'Alquiler de Lancha'],
  ['aluguel de lancha', 'alquiler de lancha'],
  ['Frota WeBoat', 'Flota WeBoat'],
  ['Nossa Frota', 'Nuestra Flota'],
  ['Lanchas Próprias', 'Lanchas Propias'],
  ['Lanchas Parceiras', 'Lanchas Asociadas'],
  ['Nossas Lanchas', 'Nuestras Lanchas'],

  // --- Boat features ---
  ['Melhor custo-benefício', 'Mejor costo-beneficio'],
  ['Melhor Custo-Benefício', 'Mejor Costo-Beneficio'],
  ['Versátil, ótima para festas', 'Versátil, ideal para fiestas'],
  ['Conforto premium', 'Confort premium'],
  ['Conforto Premium', 'Confort Premium'],
  ['Flybridge exclusivo', 'Flybridge exclusivo'],
  ['Flybridge Exclusivo', 'Flybridge Exclusivo'],
  ['Maior capacidade', 'Mayor capacidad'],
  ['Maior Capacidade', 'Mayor Capacidad'],
  ['Combustível incluso', 'Combustible incluido'],
  ['Combustível Incluso', 'Combustible Incluido'],
  ['combustível incluso', 'combustible incluido'],
  ['Marinheiro experiente', 'Marinero experimentado'],
  ['Marinheiro Experiente', 'Marinero Experimentado'],
  ['Sistema de som Bluetooth', 'Sistema de sonido Bluetooth'],
  ['Coletes salva-vidas', 'Chalecos salvavidas'],
  ['Tapete e macarrões flutuantes', 'Flotadores y tapete acuático'],
  ['Seguro obrigatório', 'Seguro obligatorio'],
  ['Coolers (gelo não incluso)', 'Coolers (hielo no incluido)'],
  ['Churrasqueira', 'Parrilla'],
  ['churrasqueira', 'parrilla'],
  ['Espaço amplo', 'Espacio amplio'],
  ['espaço amplo', 'espacio amplio'],

  // --- Image alt text ---
  ['Vista principal da lancha', 'Vista principal de la lancha'],
  ['Vista principal', 'Vista principal'],
  ['Vista lateral', 'Vista lateral'],
  ['Vista do interior', 'Vista del interior'],
  ['Interior da lancha', 'Interior de la lancha'],
  ['Área de proa', 'Área de proa'],
  ['Área de popa', 'Área de popa'],
  ['Painel de navegação', 'Panel de navegación'],
  ['Mapa do roteiro', 'Mapa de la ruta'],

  // --- Pricing ---
  ['A partir de', 'Desde'],
  ['a partir de', 'desde'],
  ['5h de passeio', '5 horas de paseo'],
  ['5 horas de passeio', '5 horas de paseo'],
  ['Seg a Qui', 'Lun-Jue'],
  ['Sex a Dom', 'Vie-Dom'],
  ['Feriados', 'Feriados'],
  ['por dia', 'por día'],
  ['por pessoa', 'por persona'],
  ['Consulte', 'Consulte'],

  // --- People ---
  ['pessoas', 'personas'],
  ['Até', 'Hasta'],
  ['até', 'hasta'],

  // --- Routes ---
  ['Roteiros de Passeio', 'Rutas de Paseo'],
  ['Nossos Roteiros', 'Nuestras Rutas'],
  ['Duração', 'Duración'],
  ['Preço Base', 'Precio Base'],
  ['Mais vendido', 'Más popular'],
  ['⭐ Mais vendido', 'Más Popular'],
  ['Vista icônica', 'Vista icónica'],
  ['Mar aberto', 'Mar abierto'],
  ['Praias desertas', 'Playas escondidas'],
  ['Experiência completa', 'Experiencia completa'],
  ['Saída', 'Salida'],
  ['Marina da Glória', 'Marina da Glória'],
  ['Pontos de parada', 'Puntos de parada'],
  ['Percurso', 'Recorrido'],

  // --- Occasions ---
  ['Despedida de Solteira na Lancha', 'Despedida de Soltera en Lancha'],
  ['Despedida de Solteira', 'Despedida de Soltera'],
  ['despedida de solteira', 'despedida de soltera'],
  ['Festa de Aniversário no Mar', 'Fiesta de Cumpleaños en el Mar'],
  ['Festa de Aniversário', 'Fiesta de Cumpleaños'],
  ['Aniversário na Lancha', 'Cumpleaños en la Lancha'],
  ['Aniversário', 'Cumpleaños'],
  ['aniversário', 'cumpleaños'],
  ['Eventos Corporativos', 'Eventos Corporativos'],
  ['Corporativo', 'Corporativo'],
  ['corporativo', 'corporativo'],
  ['Réveillon na Baía de Guanabara', 'Año Nuevo en Copacabana'],
  ['Réveillon em Copacabana', 'Año Nuevo en Copacabana'],
  ['Réveillon na Lancha', 'Año Nuevo en la Lancha'],
  ['Réveillon', 'Año Nuevo'],
  ['réveillon', 'año nuevo'],
  ['Carnaval na Lancha', 'Carnaval en la Lancha'],

  // --- Services ---
  ['Churrasco na Lancha', 'Asado a Bordo'],
  ['Churrasco a Bordo', 'Asado a Bordo'],
  ['Churrasco', 'Asado'],
  ['churrasco', 'asado'],
  ['Open Bar', 'Open Bar'],
  ['Decoração e Open Bar', 'Decoración y Open Bar'],
  ['Decoração', 'Decoración'],
  ['decoração', 'decoración'],
  ['DJ com Equipamento', 'DJ con Equipo'],
  ['DJ profissional', 'DJ profesional'],
  ['Garçom', 'Mesero'],
  ['garçom', 'mesero'],
  ['Fotógrafo', 'Fotógrafo'],
  ['Serviços Adicionais', 'Servicios Adicionales'],

  // --- What's included ---
  ['O que inclui', 'Qué incluye'],
  ['O Que Inclui', 'Qué Incluye'],
  ['Incluso', 'Incluido'],
  ['incluso', 'incluido'],
  ['Não incluso', 'No incluido'],
  ['não incluso', 'no incluido'],

  // --- Social proof ---
  ['+1.000 passeios realizados', '+1.000 paseos realizados'],
  ['+1000 avaliações 5 estrelas', '+1.000 reseñas 5 estrellas'],
  ['avaliações 5 estrelas', 'reseñas 5 estrellas'],
  ['passeios realizados', 'paseos realizados'],
  ['seguidores no Instagram', 'seguidores en Instagram'],
  ['lanchas próprias', 'lanchas propias'],
  ['5 lanchas próprias', '5 lanchas propias'],

  // --- Footer ---
  ['Todos os direitos reservados', 'Todos los derechos reservados'],
  ['Política de Privacidade', 'Política de Privacidad'],
  ['Termos de Uso', 'Términos de Uso'],
  ['Atendimento: 8h às 20h (todos os dias)', 'Atención: 8h a 20h (todos los días)'],
  ['Atendimento: 8h às 20h', 'Atención: 8h a 20h'],
  ['Áreas de passeio:', 'Áreas de paseo:'],
  ['Baía de Guanabara', 'Bahía de Guanabara'],

  // --- Section content ---
  ['Quem já curtiu', 'Clientes Felices'],
  ['Festas Inesquecíveis no Mar', 'Fiestas Inolvidables en el Mar'],
  ['Dúvidas', 'Dudas'],
  ['Diferenciais', 'Diferenciadores'],
  ['Lanchas Recomendadas', 'Lanchas Recomendadas'],
  ['Garanta Sua Lancha', 'Reserve Su Lancha'],
  ['Selecionamos as melhores opções', 'Seleccionamos las mejores opciones'],
  ['Depoimentos', 'Testimonios'],

  // --- Pricing sections (boat detail pages) ---
  ['Valores do Aluguel', 'Precios de Alquiler'],
  ['Valores por Roteiro (Sex-Dom)', 'Precios por Ruta (Vie-Dom)'],
  ['Valores por Roteiro', 'Precios por Ruta'],
  ['Seg-Qui from', 'Lun-Jue desde'],
  ['Seg-Qui desde', 'Lun-Jue desde'],
  ['Seg-Qui', 'Lun-Jue'],
  ['Sex-Dom', 'Vie-Dom'],
  ['seg a qui', 'lun a jue'],
  ['sex a dom', 'vie a dom'],
  ['Adicionais', 'Adicionales'],
  ['Hora Extra', 'Hora Extra'],
  ['Turno: Manhã 09h-14h ou Tarde 14h30-19h30', 'Turno: Mañana 09h-14h o Tarde 14h30-19h30'],
  ['*Turno:', '*Turno:'],
  ['Manhã', 'Mañana'],
  ['Tarde', 'Tarde'],
  ['Reservar pelo WhatsApp', 'Reservar por WhatsApp'],
  ['Montar Proposta', 'Armar Propuesta'],
  ['Escolher Lancha e Montar Proposta', 'Elegir Lancha y Armar Propuesta'],
  ['Preco Seg-Qui', 'Precio Lun-Jue'],
  ['Preco Sex-Dom', 'Precio Vie-Dom'],
  ['Propria', 'Propia'],
  ['Própria', 'Propia'],

  // --- BBQ/Grill pricing notes ---
  ['Tripulação, Gelo escama 2x20kg, Gelo filtrado 1x10kg, Carvão', 'Tripulación, Hielo escama 2x20kg, Hielo filtrado 1x10kg, Carbón'],
  ['Tripulação', 'Tripulación'],
  ['Gelo escama', 'Hielo escama'],
  ['Gelo filtrado', 'Hielo filtrado'],
  ['Carvão', 'Carbón'],

  // --- Boat description section ---
  ['Sobre a WeBoat', 'Sobre la WeBoat'],
  ['O que está incluído', 'Qué Está Incluido'],
  ['O que está incluido', 'Qué Está Incluido'],
  ['Combustível para o roteiro', 'Combustible para la ruta'],
  ['Combustível para o roteiro completo', 'Combustible para la ruta completa'],

  // --- Image alt text (boat galleries) ---
  ['Área de sol', 'Área de sol'],
  ['Em navegação', 'Navegando'],
  ['Proa', 'Proa'],
  ['Detalhe interior', 'Detalle interior'],
  ['Área de descanso', 'Área de descanso'],
  ['Passeio', 'Paseo'],
  ['Vista noturna da', 'Vista nocturna de la'],
  ['com Pão de Açúcar ao fundo', 'con el Pan de Azúcar al fondo'],
  ['Pão de Açúcar', 'Pan de Azúcar'],
  ['no mar com céu azul', 'en el mar con cielo azul'],
  ['ao pôr do sol', 'al atardecer'],
  ['navegando na', 'navegando en la'],
  ['com vista para o Cristo Redentor', 'con vista al Cristo Redentor'],
  ['Cristo Redentor', 'Cristo Redentor'],
  ['Foto da', 'Foto de la'],
  ['foto da', 'foto de la'],
  ['Iate de luxo para', 'Yate de lujo para'],

  // --- Schema.org ---
  ['Lancha para Aluguel', 'Lancha para Alquiler'],
  ['Lanchas para Aluguel', 'Lanchas para Alquiler'],
  ['Lancha de 32 pés para até 15 pessoas. Ideal para passeios privativos e festas no Rio de Janeiro. Melhor custo-benefício da frota.', 'Lancha de 32 pies para hasta 15 personas. Ideal para paseos privativos y fiestas en Río de Janeiro. Mejor costo-beneficio de la flota.'],
  ['Lancha de 39 pés para até 16 pessoas. Versátil e espaçosa, ideal para festas e celebrações.', 'Lancha de 39 pies para hasta 16 personas. Versátil y espaciosa, ideal para fiestas y celebraciones.'],
  ['Lancha premium de 36 pés para até 14 pessoas. Acabamento premium e conforto superior.', 'Lancha premium de 36 pies para hasta 14 personas. Acabados premium y confort superior.'],
  ['Lancha de 42 pés com flybridge exclusivo para até 12 pessoas. Experiência única no mar.', 'Lancha de 42 pies con flybridge exclusivo para hasta 12 personas. Experiencia única en el mar.'],
  ['Lancha de 50 pés para até 22 pessoas. Nossa maior embarcação com espaço para grandes grupos.', 'Lancha de 50 pies para hasta 22 personas. Nuestra mayor embarcación con espacio para grandes grupos.'],
  ['Quantas pessoas cabem na', 'Cuántas personas caben en la'],
  ['Qual o valor da hora extra na', 'Cuál es el precio de la hora extra en la'],
  ['tem banheiro', 'tiene baño'],
  ['O que está incluso no aluguel da', 'Qué está incluido en el alquiler de la'],
  ['Comparativo de Lanchas WeBoat Brasil', 'Comparativo de Lanchas WeBoat Brasil'],
  ['Tabela comparativa das 5 lanchas proprias da WeBoat Brasil para aluguel no Rio de Janeiro', 'Tabla comparativa de las 5 lanchas propias de WeBoat Brasil para alquiler en Río de Janeiro'],
  ['Lancha para ate', 'Lancha para hasta'],
  ['Otima para festas e celebracoes', 'Ideal para fiestas y celebraciones'],
  ['Lancha premium para ate', 'Lancha premium para hasta'],
  ['Lancha com flybridge exclusivo', 'Lancha con flybridge exclusivo'],
  ['para quem busca sofisticação', 'para quienes buscan sofisticación'],
  ['a única opção propria', 'la única opción propia'],
  ['Serviços WeBoat Brasil', 'Servicios WeBoat Brasil'],
  ['Serviços adicionais para seu passeio de lancha no Rio de Janeiro', 'Servicios adicionales para su paseo en lancha en Río de Janeiro'],
  ['Serviço completo de churrasco durante seu passeio de lancha', 'Servicio completo de asado durante su paseo en lancha'],

  // --- FAQ answer sentence fragments (boat detail pages) ---
  ['incluindo crianças', 'incluyendo niños'],
  ['Essa capacidade é definida pela Marinha do Brasil para garantir conforto e segurança de todos a bordo', 'Esta capacidad es definida por la Marina de Brasil para garantizar confort y seguridad de todos a bordo'],
  ['tem capacidade para', 'tiene capacidad para'],
  ['A solicitação deve ser feita durante o passeio diretamente com o marinheiro, sujeita à disponibilidade da embarcação', 'La solicitud debe hacerse durante el paseo directamente con el marinero, sujeta a disponibilidad de la embarcación'],
  ['para maior conforto dos passageiros durante todo o passeio', 'para mayor confort de los pasajeros durante todo el paseo'],
  ['tripulação habilitada (marinheiro)', 'tripulación habilitada (marinero)'],
  ['tripulação habilitada', 'tripulación habilitada'],
  ['macarrões flutuantes', 'flotadores tubulares'],
  ['A churrasqueira na', 'La parrilla en la'],
  ['A churrasqueira está disponível mediante adicional de', 'La parrilla está disponible por un adicional de'],
  ['A churrasqueira tem adicional de', 'La parrilla tiene un adicional de'],
  ['tem um adicional de', 'tiene un adicional de'],
  ['A taxa inclui comandante preparando o churrasco, 02 sacos de gelo escama e 01 saco de gelo filtrado', 'La tarifa incluye un parrillero, 2 bolsas de hielo escama y 1 bolsa de hielo filtrado'],
  ['A taxa inclui', 'La tarifa incluye'],
  ['comandante preparando o churrasco', 'parrillero'],
  ['sacos de gelo escama', 'bolsas de hielo escama'],
  ['saco de gelo filtrado', 'bolsa de hielo filtrado'],
  ['roteiro contratado', 'ruta contratada'],
  ['para o roteiro contratado', 'para la ruta contratada'],
  ['O aluguel da', 'El alquiler de la'],
  ['O aluguel inclui', 'El alquiler incluye'],
  ['som com Bluetooth', 'sonido con Bluetooth'],
  ['na WeBoat', 'en la WeBoat'],

  // --- FAQ Schema.org answers ---
  ['Sim!', '¡Sí!'],
  ['possui banheiro a bordo', 'tiene baño a bordo'],
  ['O valor da hora extra', 'El precio de la hora extra'],
  ['é de R$', 'es de R$'],
  ['Cabem até', 'Caben hasta'],
  ['O aluguel inclui', 'El alquiler incluye'],
  ['inclui:', 'incluye:'],
  ['combustível', 'combustible'],
  ['marinheiro', 'marinero'],
  ['som Bluetooth', 'sonido Bluetooth'],
  ['tapete flutuante', 'tapete flotante'],
  ['coletes salva-vidas', 'chalecos salvavidas'],
  ['coolers', 'coolers'],
  ['seguro obrigatório', 'seguro obligatorio'],

  // --- Event boat cards (homepage) ---
  ['Grandes Grupos', 'Grupos Grandes'],
  ['Lanchas para Eventos e Festas', 'Lanchas para Eventos y Fiestas'],
  ['Organizando um evento corporativo, festa ou confraternização grande?', '¿Organizando un evento corporativo, fiesta o gran confraternización?'],
  ['Temos embarcações para grupos de 30 a 65 pessoas com toda estrutura necessária', 'Tenemos embarcaciones para grupos de 30 a 65 personas con toda la infraestructura necesaria'],
  ['Eventos para 30-40 pessoas', 'Eventos para 30-40 personas'],
  ['Eventos para 35-50 pessoas', 'Eventos para 35-50 personas'],
  ['Maior embarcação para 50-65 pessoas', 'Mayor embarcación para 50-65 personas'],
  ['Ideal para eventos corporativos e festas', 'Ideal para eventos corporativos y fiestas'],
  ['4 caixas PZ ativas + gerador incluso', '4 parlantes PZ activos + generador incluido'],
  ['Nossa maior embarcação com gerador', 'Nuestra mayor embarcación con generador'],
  ['Solicitar Orçamento para Evento', 'Solicitar Presupuesto para Evento'],
  ['Eventos', 'Eventos'],
  ['Som Profissional', 'Sonido Profesional'],
  ['Maior Capacidade', 'Mayor Capacidad'],
  ['Experiência Premium', 'Experiencia Premium'],
  ['Iates de Luxo', 'Yates de Lujo'],
  ['Sofisticação e conforto para quem busca uma experiência exclusiva', 'Sofisticación y confort para quienes buscan una experiencia exclusiva'],
  ['Iates acima de 60 pés com ar-condicionado, gerador e acabamento premium', 'Yates de más de 60 pies con aire acondicionado, generador y acabados premium'],
  ['Luxo', 'Lujo'],
  ['corporativos e festas', 'corporativos y fiestas'],
  ['e festas', 'y fiestas'],

  // --- Occasion pages body content ---
  ['é um passeio privativo de aproximadamente', 'es un paseo privado de aproximadamente'],
  ['com saída da Marina da Glória', 'con salida de la Marina da Glória'],
  ['com saída da', 'con salida de la'],
  ['Você navega pela', 'Navegas por la'],
  ['e orla do Rio com', 'y la costa de Río con'],
  ['e orla do Rio', 'y la costa de Río'],
  ['decoração temática', 'decoración temática'],
  ['É a forma perfeita de curtir o', 'Es la forma perfecta de disfrutar el'],
  ['É a forma perfeita de curtir', 'Es la forma perfecta de disfrutar'],
  ['longe da multidão', 'lejos de la multitud'],
  ['com privacidade e conforto', 'con privacidad y confort'],
  ['para seu grupo', 'para su grupo'],
  ['passeio privativo', 'paseo privado'],

  // --- Common body content fragments ---
  ['é a escolha perfeita para quem busca o melhor custo-benefício em', 'es la elección perfecta para quienes buscan el mejor costo-beneficio en'],
  ['é a escolha perfeita para quem busca', 'es la elección perfecta para quienes buscan'],
  ['oferece conforto e espaço ideal para', 'ofrece confort y espacio ideal para'],
  ['passeios em família', 'paseos en familia'],
  ['confraternizações', 'confraternizaciones'],
  ['garante diversão completa durante todo o passeio', 'garantiza diversión completa durante todo el paseo'],
  ['Navegue pelas águas da', 'Navega por las aguas de la'],
  ['e as praias mais bonitas do Rio', 'y las playas más bonitas de Río'],
  ['Equipada com', 'Equipada con'],
  ['essa lancha oferece', 'esta lancha ofrece'],
  ['essa embarcação oferece', 'esta embarcación ofrece'],
  ['essa lancha', 'esta lancha'],
  ['com vista para o', 'con vista al'],
  ['com vista para a', 'con vista a la'],
  ['com vista para', 'con vista a'],
  ['aniversários e', 'cumpleaños y'],
  ['espaço ideal para', 'espacio ideal para'],
  ['Com capacidade para', 'Con capacidad para'],
  ['com capacidade para', 'con capacidad para'],
  ['no Rio de Janeiro', 'en Río de Janeiro'],
  ['no aluguel', 'en el alquiler'],
  ['do aluguel', 'del alquiler'],
  ['da embarcação', 'de la embarcación'],
  ['na embarcação', 'en la embarcación'],
  ['disponibilidade da embarcação', 'disponibilidad de la embarcación'],
  ['diretamente com o', 'directamente con el'],
  ['sujeita à', 'sujeta a'],
  ['durante o passeio', 'durante el paseo'],
  ['durante todo o', 'durante todo el'],
  ['passeio', 'paseo'],
  ['embarcação', 'embarcación'],
  ['Selecione um roteiro para começar', 'Seleccione una ruta para comenzar'],
  ['Selecione roteiro, serviços e veja o valor em tempo real', 'Seleccione ruta, servicios y vea el precio en tiempo real'],
  ['Selecione um roteiro', 'Seleccione una ruta'],
  ['Escolha o destino ideal para seu passeio na', 'Elija el destino ideal para su paseo en la'],
  ['Roteiros Disponíveis', 'Rutas Disponibles'],
  ['roteiros disponíveis', 'rutas disponibles'],
  ['Roteiros disponíveis', 'Rutas disponibles'],

  // --- Misc content ---
  ['Mais Pedido', 'Más Popular'],
  ['mais pedido', 'más popular'],
  ['Experiências Reais', 'Experiencias Reales'],
  ['horas', 'horas'],
  ['hora', 'hora'],
  ['parada', 'parada'],
  ['paradas', 'paradas'],
  ['Não sabe qual escolher? Compare as lanchas', '¿No sabe cuál elegir? Compare las lanchas'],
  ['Não sabe qual escolher?', '¿No sabe cuál elegir?'],
  ['Compare as lanchas', 'Compare las lanchas'],

  // --- Specs table (boat detail pages) ---
  ['Especificações Técnicas', 'Especificaciones Técnicas'],
  ['Especificações', 'Especificaciones'],
  ['Tamanho', 'Tamaño'],
  ['Tipo', 'Tipo'],
  ['Capacidade', 'Capacidad'],
  ['Som', 'Sonido'],
  ['Banheiro', 'Baño'],
  ['Toldo', 'Toldo'],
  ['Disponível', 'Disponible'],
  ['disponível', 'disponible'],
  ['Pés', 'Pies'],
  ['pés', 'pies'],

  // --- Sidebar (boat detail pages) ---
  ['Informações Rápidas', 'Información Rápida'],
  ['Consultar Disponibilidade', 'Consultar Disponibilidad'],
  ['Disponível todos os dias', 'Disponible todos los días'],
  ['PIX, cartão ou transferência', 'PIX, tarjeta o transferencia'],
  ['cartão', 'tarjeta'],
  ['transferência', 'transferencia'],
  ['Outras Lanchas', 'Otras Lanchas'],

  // --- FAQ sections ---
  ['Frequently Asked Questions sobre a', 'Preguntas Frecuentes sobre la'],
  ['Perguntas Frequentes sobre a', 'Preguntas Frecuentes sobre la'],
  ['Ver Todas as Dúvidas', 'Ver Todas las Dudas'],
  ['Ver Todas as Perguntas', 'Ver Todas las Preguntas'],
  ['Qual o valor da hora extra', 'Cuál es el valor de la hora extra'],
  ['sobre a WeBoat', 'sobre la WeBoat'],

  // --- FAQ answer fragments ---
  ['começa em', 'comienza en'],
  ['O preço varia conforme a capacidade da', 'El precio varía según la capacidad de la'],
  ['roteiro escolhido e duração do', 'ruta elegida y duración del'],
  ['captain habilitado pela Marinha', 'capitán habilitado por la Marina'],
  ['habilitado pela Marinha do Brasil', 'habilitado por la Marina de Brasil'],
  ['São opcionais', 'Son opcionales'],
  ['são opcionais', 'son opcionales'],
  ['Para grupos maiores, temos', 'Para grupos más grandes, tenemos'],
  ['A reserva é confirmada com 50% de sinal via PIX ou transferência', 'La reserva se confirma con 50% de seña vía PIX o transferencia'],
  ['O restante deve ser pago', 'El resto debe pagarse'],
  ['momento do embarque', 'momento del embarque'],
  ['Não há restrição de idade', 'No hay restricción de edad'],
  ['Pedimos que os responsáveis sigam as orientações', 'Pedimos que los responsables sigan las orientaciones'],
  ['Não há tempo mínimo ou máximo para reserva', 'No hay tiempo mínimo o máximo para reserva'],
  ['em períodos de alta procura', 'en períodos de alta demanda'],
  ['recomendamos reservar com pelo menos 30 dias de antecedência', 'recomendamos reservar con al menos 30 días de anticipación'],

  // --- Proposal builder ---
  ['Monte sua proposta', 'Arme su propuesta'],
  ['Personalize seu', 'Personalice su'],
  ['Escolha o Roteiro', 'Elija la Ruta'],
  ['Detalhes do', 'Detalles del'],
  ['Número de Pessoas', 'Número de Personas'],
  ['Horas Extras', 'Horas Extras'],
  ['Serviços Extras (opcional)', 'Servicios Extras (opcional)'],
  ['Resumo da Proposta', 'Resumen de la Propuesta'],
  ['Enviar Proposta pelo WhatsApp', 'Enviar Propuesta por WhatsApp'],

  // --- CTA sections ---
  ['Garanta sua data e viva uma experiência inesquecível no mar do Rio de Janeiro', 'Asegure su fecha y viva una experiencia inolvidable en el mar de Río de Janeiro'],
  ['Ver Outras Lanchas', 'Ver Otras Lanchas'],
  ['da frota', 'de la flota'],

  // --- Compare page ---
  ['Comparativo', 'Comparativo'],
  ['Diferencial', 'Diferencial'],
  ['Versátil para festas', 'Versátil para fiestas'],
  ['Indicada para:', 'Recomendada para:'],
  ['Tabela Comparativa', 'Tabla Comparativa'],
  ['Falar com Especialista', 'Hablar con un Especialista'],
  ['Atualizado em', 'Actualizado en'],
  ['fevereiro', 'febrero'],

  // --- Specs/features ---
  ['Equipamentos de segurança', 'Equipamiento de seguridad'],
  ['Vista aérea', 'Vista aérea'],
  ['Navegação', 'Navegación'],
  ['Em movimento', 'En movimiento'],
  ['Cabine', 'Cabina'],
  ['Espaço interno', 'Espacio interno'],
  ['Vista geral', 'Vista general'],
  ['Roteiro', 'Ruta'],

  // --- FAQ Common ---
  ['Como funciona', 'Cómo funciona'],
  ['Qual o preço', 'Cuál es el precio'],
  ['Quantas pessoas', 'Cuántas personas'],
  ['E se chover', 'Y si llueve'],
  ['Posso levar', 'Puedo llevar'],
  ['Posso cancelar', 'Puedo cancelar'],
  ['O que está incluso', 'Qué está incluido'],
  ['Preciso reservar com antecedência', 'Necesito reservar con anticipación'],

  // --- Forms ---
  ['Nome completo', 'Nombre completo'],
  ['Telefone', 'Teléfono'],
  ['Mensagem', 'Mensaje'],
  ['Enviar', 'Enviar'],
  ['Seus Dados', 'Sus Datos'],
  ['Sou estrangeiro', 'Soy extranjero'],
  ['Resumo do Passeio', 'Resumen del Paseo'],
  ['Pagamento', 'Pago'],
  ['Confirmação', 'Confirmación'],
  ['Dados', 'Datos'],
  ['Carregando sua proposta...', 'Cargando su propuesta...'],
  ['Aguardando pagamento...', 'Esperando pago...'],
  ['Reserva Confirmada!', '¡Reserva Confirmada!'],
  ['Pague com PIX', 'Pague con PIX'],
  ['Ou copie o código abaixo:', 'O copie el código abajo:'],
  ['Expira em', 'Expira en'],
  ['Selecione o método de pagamento:', 'Seleccione el método de pago:'],
  ['Pagamento instantâneo via QR code', 'Pago instantáneo vía código QR'],
  ['Cartão de Crédito', 'Tarjeta de Crédito'],
  ['Parcele em até 12x', 'Pague en hasta 12 cuotas'],
  ['Parcelas:', 'Cuotas:'],
  ['sem juros', 'sin intereses'],
  ['Algo deu errado.', 'Algo salió mal.'],
  ['Li e aceito os', 'He leído y acepto los'],
  ['Enviamos a confirmação para', 'Enviamos la confirmación a'],
  ['Tive um problema com o link de pagamento', 'Tuve un problema con el enlace de pago'],
  ['Minha reserva foi confirmada e gostaria de mais informações sobre o embarque', 'Mi reserva fue confirmada y me gustaría más información sobre el embarque'],

  // --- Checkout ---
  ['Continuar para Pagamento', 'Continuar al Pago'],

  // --- Breadcrumbs ---
  ['Início', 'Inicio'],
  ['início', 'inicio'],

  // --- Common ---
  ['Empresa de aluguel de lanchas no Rio de Janeiro', 'Empresa de alquiler de lanchas en Río de Janeiro'],
  ['Passeios privativos para festas, aniversários, despedidas de solteira e eventos corporativos', 'Paseos privativos para fiestas, cumpleaños, despedidas de soltera y eventos corporativos'],
  ['Lanchas de 10 a 65 pessoas saindo da Marina da Glória', 'Lanchas de 10 a 65 personas saliendo de la Marina da Glória'],
  ['Churrasco na Lancha', 'Asado a Bordo'],
  ['Decoração e Open Bar', 'Decoración y Open Bar'],
  ['Instagram WeBoat', 'Instagram WeBoat'],
  ['WhatsApp WeBoat', 'WhatsApp WeBoat'],

  // --- ARIA labels (stepper buttons) ---
  ['aria-label="Diminuir"', 'aria-label="Disminuir"'],
  ['aria-label="Aumentar"', 'aria-label="Aumentar"'],
  ['aria-label="Diminuir quantidade"', 'aria-label="Disminuir cantidad"'],
  ['aria-label="Aumentar quantidade"', 'aria-label="Aumentar cantidad"'],

  // --- Form labels ---
  ['Envie sua Mensagem', 'Envíe su Mensaje'],
  ['Nome</label>', 'Nombre</label>'],
  ['Data desejada', 'Fecha deseada'],
  ['Data Desejada', 'Fecha Deseada'],
  ['Número de pessoas', 'Número de personas'],
  ['Campo obrigatório', 'Campo obligatorio'],
  ['Preencha este campo', 'Complete este campo'],
  ['preencha este campo', 'complete este campo'],

  // --- FAQ page: question headings ---
  ['Perguntas mais buscadas', 'Preguntas más buscadas'],
  ['As lanchas têm banheiro', 'Las lanchas tienen baño'],
  ['O que devo levar para o passeio', 'Qué debo llevar para el paseo'],
  ['Gestantes podem fazer o passeio', 'Gestantes pueden hacer el paseo'],
  ['gestantes', 'gestantes'],
  ['Idosos e pessoas com necessidades especiais', 'Adultos mayores y personas con necesidades especiales'],
  ['idosos', 'adultos mayores'],
  ['necessidades especiais', 'necesidades especiales'],
  ['pessoas com mobilidade reduzida', 'personas con movilidad reducida'],
  ['mobilidade reduzida', 'movilidad reducida'],

  // --- FAQ answer fragments ---
  ['Nossa equipe monitora a previsão e avisa com antecedência', 'Nuestro equipo monitorea el pronóstico y avisa con anticipación'],
  ['Nossa equipe monitora a previsão', 'Nuestro equipo monitorea el pronóstico'],
  ['avisa com antecedência', 'avisa con anticipación'],
  ['Saiba mais em nossa', 'Más información en nuestra'],
  ['Saiba mais em', 'Más información en'],
  ['nossa equipe', 'nuestro equipo'],
  ['nossa página de', 'nuestra página de'],
  ['página de FAQ', 'página de FAQ'],
  ['Com chuva forte comprovada por fotos ou vídeos', 'Con lluvia fuerte comprobada por fotos o videos'],
  ['reagendamos gratuitamente', 'reprogramamos gratuitamente'],
  ['Drizzle ou chuva leve não justificam cancelamento', 'Llovizna o lluvia leve no justifican cancelación'],
  ['chuva leve', 'lluvia leve'],
  ['chuva forte', 'lluvia fuerte'],
  ['Sim, permitimos', 'Sí, permitimos'],
  ['Sim, aceitamos', 'Sí, aceptamos'],
  ['Sim, temos', 'Sí, tenemos'],
  ['Sim, é possível', 'Sí, es posible'],
  ['Sim, todas as nossas', 'Sí, todas nuestras'],
  ['Sim, todas as', 'Sí, todas las'],
  ['Não, não é necessário', 'No, no es necesario'],
  ['Não é necessário', 'No es necesario'],
  ['todos podem embarcar', 'todos pueden embarcar'],
  ['não há contraindicação', 'no hay contraindicación'],
  ['consulte seu médico', 'consulte a su médico'],
  ['em caso de enjoo', 'en caso de mareo'],
  ['enjoo', 'mareo'],
  ['A decisão será tomada pela equipe no dia', 'La decisión será tomada por el equipo en el día'],
  ['O marinheiro avalia as condições do mar', 'El marinero evalúa las condiciones del mar'],
  ['condições do mar', 'condiciones del mar'],
  ['O passeio acontece na maioria dos dias', 'El paseo se realiza la mayoría de los días'],
  ['Mesmo em dias nublados', 'Incluso en días nublados'],
  ['dias nublados', 'días nublados'],
  ['o passeio é muito agradável', 'el paseo es muy agradable'],
  ['muito agradável', 'muy agradable'],
  ['Entre em contato pelo WhatsApp', 'Contáctenos por WhatsApp'],
  ['entre em contato pelo WhatsApp', 'contáctenos por WhatsApp'],
  ['entre em contato', 'contáctenos'],
  ['Fale com a nossa equipe', 'Hable con nuestro equipo'],
  ['Fale com nossa equipe', 'Hable con nuestro equipo'],
  ['nosso time', 'nuestro equipo'],
  ['nosso WhatsApp', 'nuestro WhatsApp'],
  ['pelo WhatsApp', 'por WhatsApp'],
  ['no WhatsApp', 'en WhatsApp'],
  ['Cada roteiro tem características únicas', 'Cada ruta tiene características únicas'],
  ['características únicas', 'características únicas'],
  ['O que levar', 'Qué llevar'],
  ['o que levar', 'qué llevar'],
  ['protetor solar', 'protector solar'],
  ['roupas leves', 'ropa ligera'],
  ['chinelo', 'chancletas'],
  ['traje de banho', 'traje de baño'],
  ['chapéu ou boné', 'sombrero o gorra'],
  ['óculos de sol', 'gafas de sol'],
  ['toalha', 'toalla'],
  ['Recomendamos usar protetor solar e trazer', 'Recomendamos usar protector solar y traer'],
  ['Recomendamos', 'Recomendamos'],

  // --- Services page sections ---
  ['Escolha seu Kit', 'Elija su Kit'],
  ['Escolha seu Pacote', 'Elija su Paquete'],
  ['Escolha seu pacote', 'Elija su paquete'],
  ['Confira mais opções', 'Descubra más opciones'],
  ['Confira mais', 'Descubra más'],
  ['para deixar seu passeio ainda mais especial', 'para hacer su paseo aún más especial'],
  ['ainda mais especial', 'aún más especial'],
  ['Monte seu Pacote de Serviços', 'Arme su Paquete de Servicios'],
  ['Monte seu pacote', 'Arme su paquete'],
  ['Serviços para seu passeio de lancha', 'Servicios para su paseo en lancha'],
  ['Serviços para seu passeio', 'Servicios para su paseo'],
  ['BBQ, open bar, decoração e mais', 'Asado, open bar, decoración y más'],
  ['Transforme seu passeio', 'Transforme su paseo'],
  ['em uma experiência inesquecível', 'en una experiencia inolvidable'],
  ['experiência inesquecível', 'experiencia inolvidable'],

  // --- Route page stop/schedule descriptions ---
  ['Embarque', 'Embarque'],
  ['Desembarque', 'Desembarque'],
  ['desembarque', 'desembarque'],
  ['Retorno e desembarque', 'Retorno y desembarque'],
  ['Retorno e Desembarque', 'Retorno y Desembarque'],
  ['Retorno', 'Retorno'],
  ['Fim da tarde', 'Final de la tarde'],
  ['fim da tarde', 'final de la tarde'],
  ['Início da manhã', 'Inicio de la mañana'],
  ['início da manhã', 'inicio de la mañana'],
  ['Primeiro destino', 'Primer destino'],
  ['Segundo destino', 'Segundo destino'],
  ['Parada para banho', 'Parada para baño'],
  ['parada para banho', 'parada para baño'],
  ['Banho e flutuação', 'Baño y flotación'],
  ['Flutuação e banho', 'Flotación y baño'],
  ['Navegação panorâmica', 'Navegación panorámica'],
  ['navegação panorâmica', 'navegación panorámica'],
  ['Vista panorâmica', 'Vista panorámica'],
  ['vista panorâmica', 'vista panorámica'],
  ['Curtir o mar', 'Disfrutar del mar'],

  // --- Compare page FAQ fragments ---
  ['E se meu grupo tiver mais de 22 pessoas', 'Qué pasa si mi grupo tiene más de 22 personas'],
  ['Temos lanchas parceiras para grupos de até 65 pessoas', 'Tenemos lanchas asociadas para grupos de hasta 65 personas'],
  ['Qual a lancha mais econômica', 'Cuál es la lancha más económica'],
  ['mais econômica', 'más económica'],
  ['a mais indicada', 'la más indicada'],

  // --- CTA & button text ---
  ['Pronto para Reservar', 'Listo para Reservar'],
  ['Pronto para reservar', 'Listo para reservar'],
  ['Confira', 'Descubra'],
  ['Confira!', '¡Descubra!'],
  ['Veja mais', 'Ver más'],
  ['Ver mais', 'Ver más'],
  ['Garanta sua data', 'Asegure su fecha'],
  ['garanta sua data', 'asegure su fecha'],
  ['Garanta já', 'Reserve ya'],
  ['Comece agora', 'Comience ahora'],

  // --- Birthday/Occasion page mixed content ---
  ['Comemore seu aniversário', 'Celebre su cumpleaños'],
  ['Comemore', 'Celebre'],
  ['comemore', 'celebre'],
  ['Organize sua', 'Organice su'],
  ['Festeje', 'Festeje'],
  ['festa perfeita', 'fiesta perfecta'],
  ['a noiva mais feliz', 'la novia más feliz'],
  ['o melhor do Rio', 'lo mejor de Río'],
  ['convidados', 'invitados'],
  ['decorado', 'decorado'],
  ['personalizado', 'personalizado'],
  ['tudo incluso', 'todo incluido'],

  // --- WhatsApp messages in inline links ---
  ['Olá! Gostaria de informações sobre aluguel de lancha no Rio de Janeiro.', '¡Hola! Me gustaría información sobre alquiler de lanchas en Río de Janeiro.'],
  ['Olá! Gostaria de fazer o roteiro', '¡Hola! Me gustaría hacer la ruta'],
  ['Qual a disponibilidade?', '¿Cuál es la disponibilidad?'],
  ['Olá! Tenho interesse na lancha', '¡Hola! Me interesa la lancha'],
  ['Poderia me enviar mais informações?', '¿Podrían enviarme más información?'],
  ['Olá! Quero reservar um passeio', '¡Hola! Quiero reservar un paseo'],
  ['Olá! Estou organizando uma despedida de solteira', '¡Hola! Estoy organizando una despedida de soltera'],
  ['Olá! Quero comemorar meu aniversário na lancha', '¡Hola! Quiero celebrar mi cumpleaños en la lancha'],
  ['Podem me ajudar a organizar?', '¿Pueden ayudarme a organizar?'],
  ['Olá! Gostaria de informações sobre eventos corporativos em lancha.', '¡Hola! Me gustaría información sobre eventos corporativos en lancha.'],
  ['Olá! Quero informações sobre o réveillon na lancha para assistir a queima de fogos.', '¡Hola! Quiero información sobre Año Nuevo en lancha para ver los fuegos artificiales.'],
  ['Olá! Gostaria de informações sobre o Carnaval na lancha.', '¡Hola! Me gustaría información sobre el Carnaval en lancha.'],
  ['Olá! Gostaria de informações sobre', '¡Hola! Me gustaría información sobre'],
  ['Olá! Quero informações sobre', '¡Hola! Quiero información sobre'],
  ['Olá!', '¡Hola!'],
  ['Gostaria de', 'Me gustaría'],
  ['gostaria de', 'me gustaría'],
  ['informações sobre', 'información sobre'],
  ['mais informações', 'más información'],
  ['Podem me ajudar', 'Pueden ayudarme'],
  ['poderia me enviar', 'podrían enviarme'],

  // --- Misc prose fragments ---
  ['Dia da semana', 'Día de la semana'],
  ['dias úteis são mais econômicos', 'los días de semana son más económicos'],
  ['dias úteis', 'días de semana'],
  ['finais de semana', 'fines de semana'],
  ['feriados', 'feriados'],
  ['alta temporada', 'temporada alta'],
  ['baixa temporada', 'temporada baja'],
  ['com toda estrutura', 'con toda la infraestructura'],
  ['toda estrutura', 'toda la infraestructura'],
  ['toda a estrutura necessária', 'toda la infraestructura necesaria'],
  ['estrutura completa', 'infraestructura completa'],
  ['Pronto para viver', 'Listo para vivir'],
  ['pronto para viver', 'listo para vivir'],
  ['Viva essa experiência', 'Viva esta experiencia'],
  ['viva essa experiência', 'viva esta experiencia'],
  ['Agende seu passeio', 'Agende su paseo'],
  ['agende seu passeio', 'agende su paseo'],
  ['Escolha a melhor data', 'Elija la mejor fecha'],
  ['melhores opções para', 'mejores opciones para'],
  ['opções para', 'opciones para'],
  ['passeios privativos', 'paseos privativos'],
  ['privativos', 'privativos'],
  ['privativo', 'privativo'],
  ['para quem busca', 'para quienes buscan'],
  ['perfeita para', 'perfecta para'],
  ['ideal para', 'ideal para'],
  ['Praia Vermelha e Mureta da Urca', 'Praia Vermelha y Mureta da Urca'],
  ['Pão de Açúcar e Praia Vermelha', 'Pan de Azúcar y Praia Vermelha'],
  ['e orla do Rio de Janeiro', 'y la costa de Río de Janeiro'],
  ['orla do Rio', 'costa de Río'],
  ['do Rio de Janeiro', 'de Río de Janeiro'],
  ['em Rio de Janeiro', 'en Río de Janeiro'],
  ['e muito mais', 'y mucho más'],

  // --- Legal/Misc page content ---
  ['Esta política descreve', 'Esta política describe'],
  ['Estes termos regulam', 'Estos términos regulan'],
  ['Ao utilizar nossos serviços', 'Al utilizar nuestros servicios'],
  ['você concorda com', 'usted acepta'],
  ['dados pessoais', 'datos personales'],
  ['informações pessoais', 'información personal'],

  // --- Bachelorette/occasion mixed PT/ES ---
  ['minha própria bebida e comida', 'mi propia bebida y comida'],
  ['própria bebida', 'propia bebida'],
  ['própria comida', 'propia comida'],
  ['própria', 'propia'],
];

// ═══════════════════════════════════════════════════════════
// INTERNAL LINK REPLACEMENTS PT → ES
// ═══════════════════════════════════════════════════════════
const linkReplacements = [];
registry.pages.forEach(p => {
  if (p.es && p.pt !== p.es) {
    linkReplacements.push([`href="${p.pt}"`, `href="${p.es}"`]);
    linkReplacements.push([`href="${BASE_URL}${p.pt}"`, `href="${BASE_URL}${p.es}"`]);
  }
});

// ═══════════════════════════════════════════════════════════
// ES HEADER TEMPLATE (non-transparent for inner pages)
// ═══════════════════════════════════════════════════════════
function getEsHeader(ptPath, enPath, esPath, isTransparent) {
  const headerClass = isTransparent ? 'header header--transparent' : 'header';
  const logoHtml = isTransparent
    ? `<img src="/assets/images/logo/logo-white.svg" alt="WeBoat Brasil" width="150" height="40" class="header__logo-white">
          <img src="/assets/images/logo/logo.svg" alt="WeBoat Brasil" width="150" height="40" class="header__logo-dark">`
    : `<img src="/assets/images/logo/logo.svg" alt="WeBoat Brasil" width="150" height="40" class="header__logo-dark">`;
  return `  <!-- Header -->
  <header class="${headerClass}" id="header">
    <div class="container">
      <div class="header__inner">
        <a href="/es/" class="header__logo" aria-label="WeBoat Brasil - Inicio">
          ${logoHtml}
        </a>
        <nav class="header__nav" aria-label="Navegación principal">
          <ul class="header__menu">
            <li><a href="/es/lanchas/">Lanchas</a></li>
            <li><a href="/es/rutas/">Rutas</a></li>
            <li><a href="/es/servicios/">Servicios</a></li>
            <li class="header__dropdown">
              <button class="header__dropdown-toggle" aria-expanded="false" aria-haspopup="true">
                Ocasiones
                <i class="ph ph-caret-down" aria-hidden="true"></i>
              </button>
              <ul class="header__dropdown-menu">
                <li><a href="/es/despedida-de-soltera/">Despedida de Soltera</a></li>
                <li><a href="/es/cumpleanos/">Fiesta de Cumpleaños</a></li>
                <li><a href="/es/eventos-corporativos/">Eventos Corporativos</a></li>
                <li><a href="/es/ano-nuevo/">Año Nuevo</a></li>
                <li><a href="/es/carnaval/">Carnaval</a></li>
              </ul>
            </li>
            <li><a href="/es/como-funciona/">Cómo Funciona</a></li>
            <li><a href="/es/sobre-nosotros/">Sobre Nosotros</a></li>
            <li><a href="/es/contacto/">Contacto</a></li>
            <li><a href="/es/preguntas-frecuentes/">FAQ</a></li>
            <li><a href="/es/blog/">Blog</a></li>
          </ul>
        </nav>
        <a href="https://wa.me/5521977724114?text=%C2%A1Hola!%20Me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20alquiler%20de%20lanchas%20en%20R%C3%ADo%20de%20Janeiro.%20%5Bvia%20site%20-%20es%5D"
           class="btn btn-whatsapp header__cta" target="_blank" rel="noopener noreferrer">
          <i class="ph ph-whatsapp-logo" aria-hidden="true"></i>
          <span>WhatsApp</span>
        </a>
        <div class="lang-switcher" id="lang-switcher">
          <button class="lang-switcher__current" aria-expanded="false" aria-haspopup="true" aria-label="Idioma: Español">
            <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#c60b1e" d="M0 0h640v480H0z"/><path fill="#ffc400" d="M0 120h640v240H0z"/></svg>
            ES
            <i class="ph ph-caret-down lang-switcher__caret" aria-hidden="true"></i>
          </button>
          <div class="lang-switcher__menu" role="menu">
            <a href="${ptPath}" class="lang-switcher__option" role="menuitem">
              <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#229e45" d="M0 0h640v480H0z"/><path fill="#f8e509" d="m321.4 20 301.5 220.1L321.4 460 19.9 240.1z"/><circle fill="#2b49a3" cx="321.4" cy="240" r="110"/></svg>
              Portugues
            </a>
            <a href="${enPath}" class="lang-switcher__option" role="menuitem">
              <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#bd3d44" d="M0 0h640v480H0z"/><path stroke="#fff" stroke-width="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/><path fill="#192f5d" d="M0 0h364.8v258.5H0z"/></svg>
              English
            </a>
            <a href="${esPath}" class="lang-switcher__option lang-switcher__option--active" role="menuitem">
              <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#c60b1e" d="M0 0h640v480H0z"/><path fill="#ffc400" d="M0 120h640v240H0z"/></svg>
              Espanol
            </a>
          </div>
        </div>
        <button class="header__mobile-toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobile-menu">
          <span class="header__hamburger"></span>
        </button>
      </div>
    </div>
    <div class="header__mobile-menu" id="mobile-menu" aria-hidden="true">
      <nav aria-label="Navegación móvil">
        <ul class="header__mobile-list">
          <li><a href="/es/lanchas/">Lanchas</a></li>
          <li><a href="/es/rutas/">Rutas</a></li>
          <li><a href="/es/servicios/">Servicios</a></li>
          <li><a href="/es/despedida-de-soltera/">Despedida de Soltera</a></li>
          <li><a href="/es/cumpleanos/">Fiesta de Cumpleaños</a></li>
          <li><a href="/es/eventos-corporativos/">Eventos Corporativos</a></li>
          <li><a href="/es/ano-nuevo/">Año Nuevo</a></li>
          <li><a href="/es/carnaval/">Carnaval</a></li>
          <li><a href="/es/como-funciona/">Cómo Funciona</a></li>
          <li><a href="/es/sobre-nosotros/">Sobre Nosotros</a></li>
          <li><a href="/es/contacto/">Contacto</a></li>
          <li><a href="/es/preguntas-frecuentes/">FAQ</a></li>
          <li><a href="/es/blog/">Blog</a></li>
        </ul>
        <a href="https://wa.me/5521977724114?text=%C2%A1Hola!%20Me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20alquiler%20de%20lanchas%20en%20R%C3%ADo%20de%20Janeiro.%20%5Bvia%20site%20-%20es%5D"
           class="btn btn-whatsapp btn--full" target="_blank" rel="noopener noreferrer">
          <i class="ph ph-whatsapp-logo" aria-hidden="true"></i>
          Chatear por WhatsApp
        </a>
        <div class="lang-switcher--mobile">
          <a href="${ptPath}">
            <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#229e45" d="M0 0h640v480H0z"/><path fill="#f8e509" d="m321.4 20 301.5 220.1L321.4 460 19.9 240.1z"/><circle fill="#2b49a3" cx="321.4" cy="240" r="110"/></svg>
            PT
          </a>
          <a href="${enPath}">
            <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#bd3d44" d="M0 0h640v480H0z"/><path stroke="#fff" stroke-width="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/><path fill="#192f5d" d="M0 0h364.8v258.5H0z"/></svg>
            EN
          </a>
          <a href="${esPath}" class="active">
            <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#c60b1e" d="M0 0h640v480H0z"/><path fill="#ffc400" d="M0 120h640v240H0z"/></svg>
            ES
          </a>
        </div>
      </nav>
    </div>
  </header>`;
}

// ═══════════════════════════════════════════════════════════
// ES FOOTER TEMPLATE
// ═══════════════════════════════════════════════════════════
function getEsFooter() {
  return `  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__col footer__col--brand">
          <a href="/es/" class="footer__logo">
            <img src="/assets/images/logo/logo-white.svg" alt="WeBoat Brasil" width="150" height="40">
          </a>
          <p class="footer__description">
            <strong>WeBoat Brasil</strong> - Empresa de alquiler de lanchas en Río de Janeiro.
            Paseos privativos para fiestas, cumpleaños, despedidas de soltera y eventos corporativos.
            Lanchas de 10 a 65 personas saliendo de la Marina da Glória.
          </p>
          <div class="footer__social">
            <a href="https://www.instagram.com/weboatbrasil" target="_blank" rel="noopener noreferrer" aria-label="Instagram WeBoat">
              <i class="ph ph-instagram-logo" aria-hidden="true"></i>
            </a>
            <a href="https://wa.me/5521977724114" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp WeBoat">
              <i class="ph ph-whatsapp-logo" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <div class="footer__col">
          <h4 class="footer__title">Nuestros Servicios</h4>
          <ul class="footer__links">
            <li><a href="/es/lanchas/">Alquiler de Lanchas</a></li>
            <li><a href="/es/rutas/">Rutas de Paseo</a></li>
            <li><a href="/es/servicios/">Asado a Bordo</a></li>
            <li><a href="/es/servicios/">Decoración y Open Bar</a></li>
            <li><a href="/es/preguntas-frecuentes/">FAQ</a></li>
          </ul>
        </div>
        <div class="footer__col">
          <h4 class="footer__title">Ocasiones Especiales</h4>
          <ul class="footer__links">
            <li><a href="/es/despedida-de-soltera/">Despedida de Soltera en Lancha</a></li>
            <li><a href="/es/cumpleanos/">Fiesta de Cumpleaños en el Mar</a></li>
            <li><a href="/es/eventos-corporativos/">Eventos Corporativos</a></li>
            <li><a href="/es/ano-nuevo/">Año Nuevo en Copacabana</a></li>
            <li><a href="/es/carnaval/">Carnaval en la Lancha</a></li>
          </ul>
        </div>
        <div class="footer__col">
          <h4 class="footer__title">Contacto</h4>
          <ul class="footer__contact">
            <li>
              <i class="ph ph-whatsapp-logo" aria-hidden="true"></i>
              <a href="https://wa.me/5521977724114">+55 (21) 97772-4114</a>
            </li>
            <li>
              <i class="ph ph-map-pin" aria-hidden="true"></i>
              <address>
                Marina da Glória - Local 06<br>
                Av. Infante Dom Henrique, S/N<br>
                Glória, Río de Janeiro - RJ<br>
                CEP 20021-140
              </address>
            </li>
            <li>
              <i class="ph ph-clock" aria-hidden="true"></i>
              <span>Atención: 8h a 20h (todos los días)</span>
            </li>
            <li>
              <i class="ph ph-currency-circle-dollar" aria-hidden="true"></i>
              <span>Desde R$ 2.300 (5 horas de paseo)</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer__areas">
        <p><strong>Áreas de paseo:</strong> Mureta da Urca &bull; Praia Vermelha &bull; Copacabana &bull; Ilhas Cagarras &bull; Itaipu y Camboinhas &bull; Bahía de Guanabara</p>
      </div>
      <div class="footer__bottom">
        <p>&copy; 2026 WeBoat Brasil. Todos los derechos reservados. CNPJ: 60.567.333/0001-29</p>
        <div class="footer__legal">
          <a href="/es/sobre-nosotros/">Sobre Nosotros</a>
          <a href="/es/contacto/">Contáctenos</a>
          <a href="/es/politica-de-privacidad/">Política de Privacidad</a>
          <a href="/es/terminos-de-uso/">Términos de Uso</a>
        </div>
      </div>
    </div>
  </footer>`;
}

function getEsWhatsAppFloat(waMessage) {
  return `
  <!-- WhatsApp Float -->
  <a href="https://wa.me/5521977724114?text=${encodeURIComponent(waMessage)}"
     class="whatsapp-float"
     target="_blank"
     rel="noopener noreferrer"
     aria-label="Chatea con nosotros por WhatsApp">
    <i class="ph-fill ph-whatsapp-logo"></i>
  </a>`;
}

// ═══════════════════════════════════════════════════════════
// TRANSLATION FUNCTION (same protection pattern as EN script)
// ═══════════════════════════════════════════════════════════
function translateContent(html) {
  const protected_ = [];
  let idx = 0;
  function protect(match) {
    const placeholder = `__P${idx}__`;
    protected_.push({ placeholder, value: match });
    idx++;
    return placeholder;
  }

  // Protect non-JSON-LD scripts (GTM, inline JS) — JSON-LD has translatable text
  html = html.replace(/<script(?![^>]*type\s*=\s*["']application\/ld\+json["'])[\s\S]*?<\/script>/gi, protect);
  html = html.replace(/(\s(?:href|src|srcset|action|data-\w+|class|id|for|name|value|style|type|role|rel|integrity|crossorigin|media|onload|sizes|width|height|loading|decoding|autocomplete|inputmode|tabindex)=")([^"]*")/gi, (match, prefix, rest) => {
    return prefix + protect(rest);
  });
  html = html.replace(/(\scontent=")(https?:\/\/[^"]*"|[0-9]+"|[a-z]{2}_[A-Z]{2}")/gi, (match, prefix, rest) => {
    return prefix + protect(rest);
  });
  html = html.replace(/<!--[\s\S]*?-->/g, protect);

  const sorted = [...translations].sort((a, b) => b[0].length - a[0].length);
  for (const [pt, es] of sorted) {
    html = html.split(pt).join(es);
  }

  for (let i = protected_.length - 1; i >= 0; i--) {
    html = html.split(protected_[i].placeholder).join(protected_[i].value);
  }
  return html;
}

function replaceInternalLinks(html) {
  for (const [pt, es] of linkReplacements) {
    html = html.split(pt).join(es);
  }
  html = html.replace(/href="\/"/g, 'href="/es/"');
  return html;
}

// ═══════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════
let created = 0;
let errors = 0;

pages.forEach(page => {
  const ptFile = path.join(ROOT, page.ptPath);
  if (!fs.existsSync(ptFile)) {
    console.log(`SKIP (PT not found): ${page.ptPath}`);
    errors++;
    return;
  }

  const esFile = path.join(ROOT, page.esPath);
  fs.mkdirSync(path.dirname(esFile), { recursive: true });

  let html = fs.readFileSync(ptFile, 'utf8');

  const ptUrl = '/' + page.ptPath.replace(/index\.html$/, '');
  const registryEntry = registry.pages.find(p => p.pt === ptUrl);
  const enUrl = registryEntry ? registryEntry.en : '/en/';
  const esUrl = registryEntry ? registryEntry.es : '/es/';

  // Change lang
  html = html.replace('lang="pt-BR"', 'lang="es"');

  // Replace meta tags
  html = html.replace(/<title>[^<]+<\/title>/, `<title>${page.title}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${page.description}">`);
  if (page.keywords) {
    html = html.replace(/<meta name="keywords" content="[^"]*">/, `<meta name="keywords" content="${page.keywords}">`);
  }

  // Replace og:locale
  html = html.replace(/<meta property="og:locale" content="pt_BR">/, '<meta property="og:locale" content="es_ES">');
  html = html.replace(/<meta property="og:locale:alternate" content="es_ES">/, '<meta property="og:locale:alternate" content="pt_BR">');

  // Replace og:url
  html = html.replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${BASE_URL}${esUrl}">`);

  // Replace og:title/description
  const ogTitle = page.title.split(' | ')[0];
  html = html.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${ogTitle} | WeBoat Brasil">`);
  html = html.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${page.description.substring(0, 160)}">`);

  // Replace twitter meta
  html = html.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${ogTitle} | WeBoat Brasil">`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${page.description.substring(0, 160)}">`);

  if (page.noindex) {
    html = html.replace(/<meta name="robots" content="[^"]*">/, '<meta name="robots" content="noindex, nofollow">');
  }

  // Replace header
  if (!page.isCheckout) {
    const headerRegex = /\s*<!-- Header -->[\s\S]*?<\/header>/;
    const headerMatch = html.match(headerRegex);
    if (headerMatch) {
      html = html.replace(headerMatch[0], '\n\n' + getEsHeader(ptUrl, enUrl, esUrl, !!page.isHomepage));
    } else {
      const headerRegex2 = /\s*<header class="header[^"]*"[\s\S]*?<\/header>/;
      const headerMatch2 = html.match(headerRegex2);
      if (headerMatch2) {
        html = html.replace(headerMatch2[0], '\n\n' + getEsHeader(ptUrl, enUrl, esUrl, !!page.isHomepage));
      }
    }
  }

  // Replace footer
  if (!page.isCheckout) {
    const footerRegex = /\s*<!-- Footer[^>]*-->[\s\S]*?<\/footer>/;
    const footerMatch = html.match(footerRegex);
    if (footerMatch) {
      html = html.replace(footerMatch[0], '\n\n' + getEsFooter());
    } else {
      const footerRegex2 = /\s*<footer class="footer"[\s\S]*?<\/footer>/;
      const footerMatch2 = html.match(footerRegex2);
      if (footerMatch2) {
        html = html.replace(footerMatch2[0], '\n\n' + getEsFooter());
      }
    }
  }

  // Replace WhatsApp float
  const waFloatRegex = /\s*<!-- WhatsApp Float -->[\s\S]*?<\/a>\s*(?=\n\s*<!-- Scripts|\n\s*<script)/;
  const waFloatMatch = html.match(waFloatRegex);
  if (waFloatMatch) {
    html = html.replace(waFloatMatch[0], getEsWhatsAppFloat(page.waMessage));
  }

  // Replace skip link
  html = html.replace(/class="skip-link">[^<]+</, 'class="skip-link">Ir al contenido principal<');

  // Replace internal links
  html = replaceInternalLinks(html);

  // Replace canonical (AFTER link replacement)
  html = html.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${BASE_URL}${esUrl}">`);

  // Replace hreflang (AFTER link replacement)
  html = html.replace(
    /<!-- hreflang -->[\s\S]*?(?=\s*<link rel="icon")/,
    `<!-- hreflang -->\n  <link rel="alternate" hreflang="pt-BR" href="${BASE_URL}${ptUrl}">\n  <link rel="alternate" hreflang="en" href="${BASE_URL}${enUrl}">\n  <link rel="alternate" hreflang="es" href="${BASE_URL}${esUrl}">\n  <link rel="alternate" hreflang="x-default" href="${BASE_URL}${ptUrl}">\n  `
  );

  // Translate content
  html = translateContent(html);

  // Translate WhatsApp inline link text (inside protected href attributes)
  const waTextReplacements = [
    ['Olá! Tenho interesse na lancha', '¡Hola! Me interesa la lancha'],
    ['Poderia me enviar mais informações?', '¿Podrían enviarme más información?'],
    ['Olá! Gostaria de fazer o roteiro', '¡Hola! Me gustaría hacer la ruta'],
    ['Qual a disponibilidade?', '¿Cuál es la disponibilidad?'],
    ['Olá! Gostaria de informações sobre aluguel de lancha no Rio de Janeiro.', '¡Hola! Me gustaría información sobre alquiler de lanchas en Río de Janeiro.'],
    ['Olá! Gostaria de informações sobre', '¡Hola! Me gustaría información sobre'],
    ['Olá! Quero reservar a lancha', '¡Hola! Quiero reservar la lancha'],
    ['Olá! Quero reservar um passeio', '¡Hola! Quiero reservar un paseo'],
    ['Olá! Quero comemorar meu aniversário na lancha.', '¡Hola! Quiero celebrar mi cumpleaños en la lancha.'],
    ['Olá! Estou organizando uma despedida de solteira e gostaria de informações sobre o passeio de lancha.', '¡Hola! Estoy organizando una despedida de soltera y me gustaría información sobre el paseo en lancha.'],
    ['Olá! Gostaria de informações sobre eventos corporativos em lancha.', '¡Hola! Me gustaría información sobre eventos corporativos en lancha.'],
    ['Olá! Quero informações sobre o réveillon na lancha para assistir a queima de fogos.', '¡Hola! Quiero información sobre Año Nuevo en lancha para ver los fuegos artificiales.'],
    ['Olá! Quero informações sobre o Carnaval na lancha.', '¡Hola! Me gustaría información sobre el Carnaval en lancha.'],
    ['Olá! Quero informações sobre', '¡Hola! Quiero información sobre'],
    ['Podem me ajudar a organizar?', '¿Pueden ayudarme a organizar?'],
    ['Olá! Tenho uma dúvida sobre o aluguel de lancha.', '¡Hola! Tengo una duda sobre el alquiler de lanchas.'],
    ['Olá! Tive um problema com o link de pagamento.', '¡Hola! Tuve un problema con el enlace de pago.'],
    ['Olá! Minha reserva foi confirmada e gostaria de mais informações sobre o embarque.', '¡Hola! Mi reserva fue confirmada y me gustaría más información sobre el embarque.'],
    ['Olá! Vi o artigo sobre as melhores praias e gostaria de agendar um passeio de lancha.', '¡Hola! Vi el artículo sobre las mejores playas y me gustaría agendar un paseo en lancha.'],
    ['Olá! Gostaria de ajuda para escolher o melhor roteiro de passeio de lancha.', '¡Hola! Me gustaría ayuda para elegir la mejor ruta de paseo en lancha.'],
    ['Olá! Gostaria de agendar um passeio de lancha.', '¡Hola! Me gustaría agendar un paseo en lancha.'],
    ['Olá! Li o guia da Marina da Glória e gostaria de reservar um passeio de lancha.', '¡Hola! Leí la guía de la Marina da Glória y me gustaría reservar un paseo en lancha.'],
    ['Olá! Gostaria de reservar uma lancha.', '¡Hola! Me gustaría reservar una lancha.'],
    ['Olá! Preciso de ajuda para escolher a lancha ideal para meu grupo.', '¡Hola! Necesito ayuda para elegir la lancha ideal para mi grupo.'],
    ['Olá! Gostaria de informações sobre o passeio', '¡Hola! Me gustaría información sobre el paseo'],
    ['Olá! Vi o artigo sobre', '¡Hola! Vi el artículo sobre'],
    ['e gostaria de agendar um passeio de lancha.', 'y me gustaría agendar un paseo en lancha.'],
    ['e gostaria de reservar um passeio de lancha.', 'y me gustaría reservar un paseo en lancha.'],
    ['Olá! Li o artigo sobre', '¡Hola! Leí el artículo sobre'],
  ];
  for (const [pt, es] of waTextReplacements) {
    html = html.split(pt).join(es);
  }

  // Schema.org availableLanguage
  html = html.replace(/"availableLanguage":\s*\["Portuguese"\]/g, '"availableLanguage": ["Portuguese", "English", "Spanish"]');

  // Add i18n comment
  html = `<!-- i18n: translated from PT version 2026-02-15 -->\n` + html;

  // Add i18n.js
  if (!html.includes('i18n.js') && !page.isCheckout) {
    html = html.replace('<script src="/js/menu.js" defer></script>', '<script src="/js/i18n.js" defer></script>\n  <script src="/js/menu.js" defer></script>');
  }

  fs.writeFileSync(esFile, html, 'utf8');
  console.log(`OK: ${page.esPath}`);
  created++;
});

console.log(`\nDone! Created: ${created}, Errors: ${errors}`);
