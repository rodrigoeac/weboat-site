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
    description: '¡Vea los fuegos artificiales desde una lancha privada en Año Nuevo en Río! La mejor vista de la Bahía de Guanabara.',
    keywords: 'año nuevo lancha rio, reveillon barco rio de janeiro, fuegos artificiales lancha guanabara',
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
  ['Réveillon na Baía de Guanabara', 'Año Nuevo en la Bahía de Guanabara'],
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

  // --- Breadcrumbs ---
  ['Início', 'Inicio'],
  ['início', 'inicio'],

  // --- Common ---
  ['Empresa de aluguel de lanchas no Rio de Janeiro', 'Empresa de alquiler de lanchas en Río de Janeiro'],
  ['Passeios privativos para festas, aniversários, despedidas de solteira e eventos corporativos', 'Paseos privativos para fiestas, cumpleaños, despedidas de soltera y eventos corporativos'],
  ['Lanchas de 10 a 65 pessoas saindo da Marina da Glória', 'Lanchas de 10 a 65 personas saliendo de la Marina da Glória'],
  ['Instagram WeBoat', 'Instagram WeBoat'],
  ['WhatsApp WeBoat', 'WhatsApp WeBoat'],
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
            <li><a href="/es/ano-nuevo/">Año Nuevo en la Bahía de Guanabara</a></li>
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

  html = html.replace(/<script[\s\S]*?<\/script>/gi, protect);
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
