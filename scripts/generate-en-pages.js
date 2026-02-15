#!/usr/bin/env node
/**
 * Generate English pages from Portuguese source pages.
 * Run: node scripts/generate-en-pages.js
 *
 * Strategy:
 * 1. Read each PT page
 * 2. Change lang, translate head (meta, title, hreflang, schema)
 * 3. Replace header/footer with EN templates
 * 4. Translate main content via dictionary replacements
 * 5. Update internal links PT → EN
 * 6. Write to /en/ directory
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BASE_URL = 'https://www.weboatbrasil.com.br';
const registry = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/i18n-registry.json'), 'utf8'));

// ═══════════════════════════════════════════════════════════
// URL MAPPINGS PT → EN
// ═══════════════════════════════════════════════════════════
const urlMap = {};
registry.pages.forEach(p => { urlMap[p.pt] = p.en; });

// ═══════════════════════════════════════════════════════════
// PAGE DEFINITIONS — each page we need to generate
// ═══════════════════════════════════════════════════════════
const pages = [
  // Phase 3: Fleet
  {
    ptPath: 'lanchas/index.html',
    enPath: 'en/boats/index.html',
    title: 'Boats for Rent in Rio de Janeiro | WeBoat Brasil Fleet',
    description: 'Rent a boat in Rio de Janeiro. 5 own boats + partner vessels for groups of 10 to 65 people. From R$ 2,300. Fuel included. Book now!',
    keywords: 'boats for rent rio de janeiro, boat rental RJ, boat fleet, weboat boats, charter boat rio',
    waMessage: 'Hello! I would like information about your boat fleet. [via site - en]',
    css: 'frota',
  },
  {
    ptPath: 'lanchas/weboat-32/index.html',
    enPath: 'en/boats/weboat-32/index.html',
    title: 'WeBoat 32 - Boat for 15 People | Rental in Rio | WeBoat Brasil',
    description: 'Rent the WeBoat 32, a boat for up to 15 people in Rio de Janeiro. Best value! From R$ 2,300. Fuel and captain included. Book now!',
    keywords: 'weboat 32, boat 15 people, boat rental rio de janeiro, best value boat',
    waMessage: 'Hello! I am interested in the WeBoat 32 boat. Could you send me more information? [via site - en]',
    css: 'lancha-detalhe',
  },
  {
    ptPath: 'lanchas/weboat-390/index.html',
    enPath: 'en/boats/weboat-390/index.html',
    title: 'WeBoat 390 - Boat for 16 People | Rental in Rio | WeBoat Brasil',
    description: 'Rent the WeBoat 390, a versatile boat for up to 16 people. Perfect for parties! From R$ 2,600. Fuel and captain included.',
    keywords: 'weboat 390, boat 16 people, party boat rio, boat rental rio de janeiro',
    waMessage: 'Hello! I am interested in the WeBoat 390 boat. Could you send me more information? [via site - en]',
    css: 'lancha-detalhe',
  },
  {
    ptPath: 'lanchas/weboat-oceanic-36/index.html',
    enPath: 'en/boats/weboat-oceanic-36/index.html',
    title: 'WeBoat Oceanic 36 - Premium Boat for 14 People | WeBoat Brasil',
    description: 'Rent the WeBoat Oceanic 36, premium comfort for up to 14 people. From R$ 2,900. Fuel and captain included. Book now!',
    keywords: 'weboat oceanic 36, premium boat rio, boat 14 people, luxury boat rental',
    waMessage: 'Hello! I am interested in the WeBoat Oceanic 36 boat. Could you send me more information? [via site - en]',
    css: 'lancha-detalhe',
  },
  {
    ptPath: 'lanchas/weboat-ibiza-42/index.html',
    enPath: 'en/boats/weboat-ibiza-42/index.html',
    title: 'WeBoat Ibiza 42 - Boat with Flybridge for 12 People | WeBoat Brasil',
    description: 'Rent the WeBoat Ibiza 42 with exclusive flybridge for up to 12 people. From R$ 2,700. Fuel and captain included.',
    keywords: 'weboat ibiza 42, flybridge boat rio, boat 12 people, exclusive boat rental',
    waMessage: 'Hello! I am interested in the WeBoat Ibiza 42 boat. Could you send me more information? [via site - en]',
    css: 'lancha-detalhe',
  },
  {
    ptPath: 'lanchas/weboat-rio-star-50/index.html',
    enPath: 'en/boats/weboat-rio-star-50/index.html',
    title: 'WeBoat Rio Star 50 - Largest Boat for 22 People | WeBoat Brasil',
    description: 'Rent the WeBoat Rio Star 50, our largest boat for up to 22 people. From R$ 4,000. Fuel and captain included.',
    keywords: 'weboat rio star 50, large boat rio, boat 22 people, biggest boat rental',
    waMessage: 'Hello! I am interested in the WeBoat Rio Star 50 boat. Could you send me more information? [via site - en]',
    css: 'lancha-detalhe',
  },
  {
    ptPath: 'lanchas/comparativo/index.html',
    enPath: 'en/boats/compare/index.html',
    title: 'Compare Boats - Find Your Ideal Boat | WeBoat Brasil',
    description: 'Compare all WeBoat boats side by side. Capacity, price, features. Find the perfect boat for your trip in Rio de Janeiro.',
    keywords: 'compare boats rio, boat comparison, which boat to rent, weboat comparison',
    waMessage: 'Hello! I would like help choosing the right boat. [via site - en]',
    css: 'lancha-detalhe',
  },

  // Phase 4: Routes
  {
    ptPath: 'roteiros/index.html',
    enPath: 'en/routes/index.html',
    title: 'Boat Trip Routes in Rio de Janeiro | WeBoat Brasil',
    description: 'Discover our 6 boat trip routes in Rio de Janeiro. From Mureta da Urca to Ilhas Cagarras. 5-hour trips from R$ 2,300.',
    keywords: 'boat routes rio, boat trip itinerary rio, boat tour guanabara bay',
    waMessage: 'Hello! I would like information about your boat trip routes. [via site - en]',
    css: 'roteiros',
  },
  {
    ptPath: 'roteiros/mureta-da-urca/index.html',
    enPath: 'en/routes/mureta-da-urca/index.html',
    title: 'Mureta da Urca Boat Trip | Best Value Route | WeBoat Brasil',
    description: 'Boat trip to Mureta da Urca in Rio de Janeiro. 5-hour tour with views of Sugarloaf Mountain. From R$ 2,300. Book now!',
    keywords: 'mureta da urca boat trip, boat tour sugarloaf, urca boat rio',
    waMessage: 'Hello! I would like to do the Mureta da Urca route. What is the availability? [via site - en]',
    css: 'roteiros',
  },
  {
    ptPath: 'roteiros/praia-vermelha/index.html',
    enPath: 'en/routes/praia-vermelha/index.html',
    title: 'Praia Vermelha Boat Trip | Most Popular Route | WeBoat Brasil',
    description: 'Boat trip to Praia Vermelha (Red Beach) in Rio. Our most popular route! 5 hours from R$ 2,500. Stunning views of Sugarloaf.',
    keywords: 'praia vermelha boat trip, red beach boat rio, most popular boat tour',
    waMessage: 'Hello! I would like to do the Praia Vermelha route. What is the availability? [via site - en]',
    css: 'roteiros',
  },
  {
    ptPath: 'roteiros/copacabana/index.html',
    enPath: 'en/routes/copacabana/index.html',
    title: 'Copacabana Boat Trip | Iconic View Route | WeBoat Brasil',
    description: 'Boat trip along Copacabana Beach in Rio de Janeiro. Iconic views! 5 hours from R$ 3,000. Book your private charter.',
    keywords: 'copacabana boat trip, boat tour copacabana, iconic view boat rio',
    waMessage: 'Hello! I would like to do the Copacabana route. What is the availability? [via site - en]',
    css: 'roteiros',
  },
  {
    ptPath: 'roteiros/ilhas-cagarras/index.html',
    enPath: 'en/routes/ilhas-cagarras/index.html',
    title: 'Ilhas Cagarras Boat Trip | Open Sea Adventure | WeBoat Brasil',
    description: 'Boat trip to Ilhas Cagarras (Cagarras Islands) near Ipanema. Open sea adventure! 5 hours from R$ 3,600.',
    keywords: 'ilhas cagarras boat trip, cagarras islands boat, open sea boat rio',
    waMessage: 'Hello! I would like to do the Ilhas Cagarras route. What is the availability? [via site - en]',
    css: 'roteiros',
  },
  {
    ptPath: 'roteiros/itaipu-camboinhas/index.html',
    enPath: 'en/routes/itaipu-camboinhas/index.html',
    title: 'Itaipu & Camboinhas Boat Trip | Hidden Beaches | WeBoat Brasil',
    description: 'Boat trip to Itaipu and Camboinhas beaches in Niteroi. Hidden paradise beaches! 5 hours from R$ 3,600.',
    keywords: 'itaipu camboinhas boat trip, hidden beaches niteroi, deserted beach boat',
    waMessage: 'Hello! I would like to do the Itaipu & Camboinhas route. What is the availability? [via site - en]',
    css: 'roteiros',
  },
  {
    ptPath: 'roteiros/volta-completa/index.html',
    enPath: 'en/routes/volta-completa/index.html',
    title: 'Full Tour Boat Trip | Complete Experience | WeBoat Brasil',
    description: 'Complete boat tour around Rio de Janeiro. The ultimate experience! 5 hours from R$ 4,500. See all the highlights.',
    keywords: 'full boat tour rio, complete boat trip, volta completa boat, best boat tour',
    waMessage: 'Hello! I would like to do the Full Tour route. What is the availability? [via site - en]',
    css: 'roteiros',
  },

  // Phase 4: Occasions
  {
    ptPath: 'despedida-solteira/index.html',
    enPath: 'en/bachelorette-party/index.html',
    title: 'Bachelorette Party on a Boat in Rio de Janeiro | WeBoat Brasil',
    description: 'Celebrate your bachelorette party on a private boat in Rio de Janeiro! DJ, open bar, decoration. Boats for 10-65 people. Book now!',
    keywords: 'bachelorette party boat rio, hen party boat rio de janeiro, boat party bachelorette',
    waMessage: 'Hello! I am planning a bachelorette party and would like information about the boat trip. [via site - en]',
    css: 'ocasioes',
  },
  {
    ptPath: 'aniversario/index.html',
    enPath: 'en/birthday-party/index.html',
    title: 'Birthday Party on a Boat in Rio de Janeiro | WeBoat Brasil',
    description: 'Celebrate your birthday on a private boat in Rio! BBQ, DJ, open bar, decoration. From R$ 2,300. Unforgettable experience!',
    keywords: 'birthday party boat rio, birthday celebration boat, party boat rio de janeiro',
    waMessage: 'Hello! I want to celebrate my birthday on a boat. Can you help me organize? [via site - en]',
    css: 'ocasioes',
  },
  {
    ptPath: 'corporativo/index.html',
    enPath: 'en/corporate-events/index.html',
    title: 'Corporate Events on a Boat in Rio de Janeiro | WeBoat Brasil',
    description: 'Host your corporate event on a private boat in Rio. Team building, client entertainment, product launches. Boats for 10-65 people.',
    keywords: 'corporate event boat rio, team building boat, business event boat rio de janeiro',
    waMessage: 'Hello! I would like information about corporate events on a boat. [via site - en]',
    css: 'ocasioes',
  },
  {
    ptPath: 'reveillon/index.html',
    enPath: 'en/new-years-eve/index.html',
    title: "New Year's Eve on a Boat in Rio de Janeiro | WeBoat Brasil",
    description: "Watch the fireworks from a private boat on New Year's Eve in Rio! The best view of the Guanabara Bay fireworks. Book early!",
    keywords: "new years eve boat rio, reveillon boat rio de janeiro, fireworks boat guanabara",
    waMessage: "Hello! I want information about New Year's Eve on a boat to watch the fireworks. [via site - en]",
    css: 'ocasioes',
  },
  {
    ptPath: 'carnaval/index.html',
    enPath: 'en/carnival/index.html',
    title: 'Carnival on a Boat in Rio de Janeiro | WeBoat Brasil',
    description: 'Celebrate Carnival on a private boat in Rio de Janeiro! DJ, open bar, confetti. Your own floating party! Book now!',
    keywords: 'carnival boat rio, carnaval boat party, floating carnival rio de janeiro',
    waMessage: 'Hello! I want information about Carnival on a boat in Rio de Janeiro. [via site - en]',
    css: 'ocasioes',
  },

  // Phase 5: Support pages
  {
    ptPath: 'servicos/index.html',
    enPath: 'en/services/index.html',
    title: 'Additional Services - BBQ, Open Bar, DJ & More | WeBoat Brasil',
    description: 'Customize your boat trip with BBQ, open bar, DJ, decoration, and more. Make your experience unforgettable!',
    keywords: 'boat services rio, bbq on boat, open bar boat, dj boat rental',
    waMessage: 'Hello! I would like information about additional services for my boat trip. [via site - en]',
    css: 'ocasioes',
  },
  {
    ptPath: 'sobre/index.html',
    enPath: 'en/about/index.html',
    title: 'About WeBoat Brasil | Boat Rental in Rio de Janeiro',
    description: 'Learn about WeBoat Brasil, the leading boat rental company in Rio de Janeiro. 1,000+ trips, 5 own boats, based at Marina da Gloria.',
    keywords: 'about weboat, boat rental company rio, marina da gloria boats',
    waMessage: 'Hello! I would like to know more about WeBoat Brasil. [via site - en]',
    css: 'sobre',
  },
  {
    ptPath: 'faq/index.html',
    enPath: 'en/faq/index.html',
    title: 'FAQ - Frequently Asked Questions | WeBoat Brasil',
    description: 'Frequently asked questions about boat rental in Rio de Janeiro. Prices, cancellation policy, what is included, and more.',
    keywords: 'boat rental faq, questions boat trip rio, weboat help',
    waMessage: 'Hello! I have a question about boat rental. [via site - en]',
    css: 'faq',
  },
  {
    ptPath: 'contato/index.html',
    enPath: 'en/contact/index.html',
    title: 'Contact Us | WeBoat Brasil - Boat Rental Rio',
    description: 'Contact WeBoat Brasil for boat rental in Rio de Janeiro. WhatsApp, phone, email. Marina da Gloria, Rio de Janeiro.',
    keywords: 'contact weboat, weboat phone, weboat whatsapp, marina da gloria contact',
    waMessage: 'Hello! I would like to get in touch with WeBoat Brasil. [via site - en]',
    css: 'contato',
  },
  {
    ptPath: 'como-funciona/index.html',
    enPath: 'en/how-it-works/index.html',
    title: 'How It Works - Book Your Boat Trip | WeBoat Brasil',
    description: 'Learn how to book a boat trip with WeBoat Brasil. Simple 3-step process: choose, customize, and enjoy!',
    keywords: 'how to rent boat rio, boat rental process, book boat trip rio',
    waMessage: 'Hello! I would like to understand how the boat rental works. [via site - en]',
    css: 'ocasioes',
  },
  {
    ptPath: 'areas-atendidas/index.html',
    enPath: 'en/service-areas/index.html',
    title: 'Service Areas - Where We Go | WeBoat Brasil',
    description: 'Discover all areas covered by WeBoat Brasil boat trips. From Mureta da Urca to Ilhas Cagarras and beyond.',
    keywords: 'boat trip areas rio, where does weboat go, guanabara bay boat areas',
    waMessage: 'Hello! I would like information about the areas you cover. [via site - en]',
    css: 'ocasioes',
  },

  // Blog
  {
    ptPath: 'blog/index.html',
    enPath: 'en/blog/index.html',
    title: 'Blog - Boat Tips & Rio de Janeiro Guides | WeBoat Brasil',
    description: 'Tips for boat trips, guides to Rio de Janeiro beaches, and everything you need to know for your maritime experience.',
    keywords: 'boat trip blog, rio de janeiro boat guide, boat tips',
    waMessage: 'Hello! I would like information about boat rental in Rio de Janeiro. [via site - en]',
    css: null,
  },
  {
    ptPath: 'blog/melhores-praias-lancha-rj/index.html',
    enPath: 'en/blog/best-beaches-by-boat-rio/index.html',
    title: 'Best Beaches to Visit by Boat in Rio de Janeiro | WeBoat Blog',
    description: 'Discover the best beaches you can only reach by boat in Rio de Janeiro. Crystal clear waters, hidden coves, and paradise islands.',
    keywords: 'best beaches boat rio, beaches by boat rio de janeiro, hidden beaches rio',
    waMessage: 'Hello! I would like information about boat trips to beaches. [via site - en]',
    css: null,
  },
  {
    ptPath: 'blog/o-que-vestir-passeio-lancha/index.html',
    enPath: 'en/blog/what-to-wear-boat-trip/index.html',
    title: 'What to Wear on a Boat Trip in Rio de Janeiro | WeBoat Blog',
    description: 'Complete guide on what to wear for a boat trip in Rio. Clothing tips, sunscreen, shoes, and essential items.',
    keywords: 'what to wear boat trip, boat trip outfit, clothing boat rio',
    waMessage: 'Hello! I would like information about what to bring on the boat trip. [via site - en]',
    css: null,
  },
  {
    ptPath: 'blog/guia-marina-da-gloria/index.html',
    enPath: 'en/blog/marina-da-gloria-guide/index.html',
    title: 'Marina da Gloria Guide - How to Get There | WeBoat Blog',
    description: 'Complete guide to Marina da Gloria in Rio de Janeiro. How to get there, parking, what to expect on arrival.',
    keywords: 'marina da gloria guide, how to get to marina da gloria, marina gloria rio',
    waMessage: 'Hello! I would like directions to Marina da Gloria. [via site - en]',
    css: null,
  },

  // Legal
  {
    ptPath: 'politica-de-privacidade/index.html',
    enPath: 'en/privacy-policy/index.html',
    title: 'Privacy Policy | WeBoat Brasil',
    description: 'WeBoat Brasil privacy policy. Learn how we collect, use, and protect your personal data.',
    keywords: 'weboat privacy policy, data protection boat rental',
    waMessage: 'Hello! I have a question about privacy policy. [via site - en]',
    css: null,
    noindex: false,
  },
  {
    ptPath: 'termos-de-uso/index.html',
    enPath: 'en/terms-of-use/index.html',
    title: 'Terms of Use | WeBoat Brasil',
    description: 'WeBoat Brasil terms of use. Booking conditions, cancellation policy, passenger responsibilities.',
    keywords: 'weboat terms of use, boat rental terms, cancellation policy',
    waMessage: 'Hello! I have a question about terms of use. [via site - en]',
    css: null,
    noindex: false,
  },

  // Checkout
  {
    ptPath: 'checkout/index.html',
    enPath: 'en/checkout/index.html',
    title: 'Checkout | WeBoat Brasil',
    description: 'Complete your boat trip reservation with WeBoat Brasil. Secure payment via PIX or credit card.',
    keywords: '',
    waMessage: 'Hello! I had a problem with the payment link. [via site - en]',
    css: 'checkout',
    noindex: true,
    isCheckout: true,
  },
];


// ═══════════════════════════════════════════════════════════
// COMPREHENSIVE PT → EN DICTIONARY
// ═══════════════════════════════════════════════════════════
const translations = [
  // --- Navigation & UI ---
  ['Pular para o conteúdo', 'Skip to main content'],
  ['Pular para conteúdo', 'Skip to main content'],
  ['Abrir menu', 'Open menu'],
  ['Fechar menu', 'Close menu'],
  ['Fale conosco pelo WhatsApp', 'Chat with us on WhatsApp'],
  ['Fale pelo WhatsApp', 'Chat on WhatsApp'],
  ['Fale no WhatsApp', 'Chat on WhatsApp'],
  ['Falar no WhatsApp', 'Chat on WhatsApp'],
  ['Ver Todas as Lanchas', 'View All Boats'],
  ['Conhecer as Lanchas', 'Explore Our Boats'],
  ['Ver todas as lanchas', 'View all boats'],
  ['Voltar ao Site', 'Back to Website'],
  ['Voltar ao Topo', 'Back to top'],
  ['Voltar ao topo', 'Back to top'],
  ['Lanchas', 'Boats'],
  ['Roteiros', 'Routes'],
  ['Serviços', 'Services'],
  ['Servicos', 'Services'],

  // --- Section headers ---
  ['Ocasiões Especiais', 'Special Occasions'],
  ['Nossos Serviços', 'Our Services'],
  ['Perguntas Frequentes', 'Frequently Asked Questions'],
  ['FAQ', 'FAQ'],
  ['Contato', 'Contact'],
  ['Sobre a Empresa', 'About Us'],
  ['Sobre', 'About'],
  ['Fale Conosco', 'Contact Us'],
  ['Como Funciona', 'How It Works'],
  ['Áreas Atendidas', 'Service Areas'],
  ['Blog', 'Blog'],

  // --- CTA phrases ---
  ['Reservar Minha Lancha', 'Book My Boat'],
  ['Reservar Agora', 'Book Now'],
  ['Reserve Agora', 'Book Now'],
  ['Reserve pelo WhatsApp', 'Book via WhatsApp'],
  ['Solicitar Orçamento', 'Request a Quote'],
  ['Solicitar orçamento', 'Request a quote'],
  ['Quero Reservar', 'Book Now'],
  ['Saiba Mais', 'Learn More'],
  ['Ver Lancha', 'View Boat'],
  ['Ver Roteiro', 'View Route'],
  ['Ver Detalhes', 'View Details'],
  ['Agendar Passeio', 'Schedule Trip'],
  ['Continuar para Pagamento', 'Continue to Payment'],
  ['Pagar Agora', 'Pay Now'],
  ['Copiar', 'Copy'],

  // --- Boat/fleet terms ---
  ['Lanchas para Alugar', 'Boats for Rent'],
  ['Aluguel de Lanchas', 'Boat Rental'],
  ['Aluguel de lancha', 'Boat rental'],
  ['Aluguel de Lancha', 'Boat Rental'],
  ['aluguel de lancha', 'boat rental'],
  ['Frota WeBoat', 'WeBoat Fleet'],
  ['Nossa Frota', 'Our Fleet'],
  ['Lanchas Próprias', 'Own Boats'],
  ['Lanchas Parceiras', 'Partner Boats'],
  ['Nossas Lanchas', 'Our Boats'],
  ['lancha', 'boat'],
  ['Lancha', 'Boat'],
  ['lanchas', 'boats'],

  // --- Boat features ---
  ['Melhor custo-benefício', 'Best value'],
  ['Melhor Custo-Benefício', 'Best Value'],
  ['Versátil, ótima para festas', 'Versatile, great for parties'],
  ['Conforto premium', 'Premium comfort'],
  ['Conforto Premium', 'Premium Comfort'],
  ['Flybridge exclusivo', 'Exclusive flybridge'],
  ['Flybridge Exclusivo', 'Exclusive Flybridge'],
  ['Maior capacidade', 'Largest capacity'],
  ['Maior Capacidade', 'Largest Capacity'],
  ['Combustível incluso', 'Fuel included'],
  ['Combustível Incluso', 'Fuel Included'],
  ['combustível incluso', 'fuel included'],
  ['Marinheiro experiente', 'Experienced captain'],
  ['Marinheiro Experiente', 'Experienced Captain'],
  ['Sistema de som Bluetooth', 'Bluetooth sound system'],
  ['Coletes salva-vidas', 'Life jackets'],
  ['Tapete e macarrões flutuantes', 'Pool noodles and floating mat'],
  ['Seguro obrigatório', 'Mandatory insurance'],
  ['Coolers (gelo não incluso)', 'Coolers (ice not included)'],
  ['Churrasqueira', 'BBQ Grill'],
  ['churrasqueira', 'BBQ grill'],
  ['Espaço amplo', 'Spacious deck'],
  ['espaço amplo', 'spacious deck'],

  // --- Image alt text ---
  ['Vista principal da lancha', 'Main view of the boat'],
  ['Vista principal', 'Main view'],
  ['Vista lateral', 'Side view'],
  ['Vista do interior', 'Interior view'],
  ['Interior da lancha', 'Boat interior'],
  ['Área de proa', 'Bow area'],
  ['Área de popa', 'Stern area'],
  ['Flybridge', 'Flybridge'],
  ['Painel de navegação', 'Navigation panel'],
  ['Mapa do roteiro', 'Route map'],
  ['Foto da', 'Photo of the'],
  ['foto da', 'photo of the'],

  // --- Pricing ---
  ['A partir de', 'From'],
  ['a partir de', 'from'],
  ['5h de passeio', '5-hour trip'],
  ['5 horas de passeio', '5-hour trip'],
  ['Seg a Qui', 'Mon-Thu'],
  ['Sex a Dom', 'Fri-Sun'],
  ['Feriados', 'Holidays'],
  ['por dia', 'per day'],
  ['por pessoa', 'per person'],
  ['Consulte', 'Contact us'],

  // --- People ---
  ['pessoas', 'people'],
  ['Até', 'Up to'],
  ['até', 'up to'],

  // --- Routes ---
  ['Roteiros de Passeio', 'Trip Routes'],
  ['Nossos Roteiros', 'Our Routes'],
  ['Duração', 'Duration'],
  ['Preço Base', 'Base Price'],
  ['Mais vendido', 'Most popular'],
  ['⭐ Mais vendido', 'Most Popular'],
  ['Vista icônica', 'Iconic view'],
  ['Mar aberto', 'Open sea'],
  ['Praias desertas', 'Hidden beaches'],
  ['Experiência completa', 'Complete experience'],
  ['Saída', 'Departure'],
  ['Marina da Glória', 'Marina da Gloria'],
  ['Pontos de parada', 'Stop points'],
  ['Percurso', 'Route'],

  // --- Occasions ---
  ['Despedida de Solteira na Lancha', 'Bachelorette Party on a Boat'],
  ['Despedida de Solteira', 'Bachelorette Party'],
  ['despedida de solteira', 'bachelorette party'],
  ['Festa de Aniversário no Mar', 'Birthday Party at Sea'],
  ['Festa de Aniversário', 'Birthday Party'],
  ['Aniversário na Lancha', 'Birthday on a Boat'],
  ['Aniversário', 'Birthday'],
  ['aniversário', 'birthday'],
  ['Eventos Corporativos', 'Corporate Events'],
  ['Corporativo', 'Corporate'],
  ['corporativo', 'corporate'],
  ['Réveillon na Baía de Guanabara', "New Year's Eve in Guanabara Bay"],
  ['Réveillon na Lancha', "New Year's Eve on a Boat"],
  ['Réveillon', "New Year's Eve"],
  ['réveillon', "New Year's Eve"],
  ['Carnaval na Lancha', 'Carnival on a Boat'],
  ['Carnaval', 'Carnival'],

  // --- Services ---
  ['Churrasco na Lancha', 'BBQ on Board'],
  ['Churrasco a Bordo', 'BBQ on Board'],
  ['Churrasco', 'BBQ'],
  ['churrasco', 'BBQ'],
  ['Open Bar', 'Open Bar'],
  ['Decoração', 'Decoration'],
  ['decoração', 'decoration'],
  ['DJ com Equipamento', 'DJ with Equipment'],
  ['DJ profissional', 'Professional DJ'],
  ['Garçom', 'Waiter'],
  ['garçom', 'waiter'],
  ['Fotógrafo', 'Photographer'],
  ['fotógrafo', 'photographer'],
  ['Serviços Adicionais', 'Additional Services'],

  // --- What's included ---
  ['O que inclui', 'What is included'],
  ['O Que Inclui', 'What Is Included'],
  ['Incluso', 'Included'],
  ['incluso', 'included'],
  ['Não incluso', 'Not included'],
  ['não incluso', 'not included'],

  // --- Social proof ---
  ['+1.000 passeios realizados', '1,000+ trips completed'],
  ['+1000 avaliações 5 estrelas', '1,000+ 5-star reviews'],
  ['avaliações 5 estrelas', '5-star reviews'],
  ['passeios realizados', 'trips completed'],
  ['seguidores no Instagram', 'Instagram followers'],
  ['lanchas próprias', 'own boats'],
  ['5 lanchas próprias', '5 own boats'],
  ['Quem já curtiu', 'Happy customers'],

  // --- Footer ---
  ['Todos os direitos reservados', 'All rights reserved'],
  ['Política de Privacidade', 'Privacy Policy'],
  ['Termos de Uso', 'Terms of Use'],
  ['Atendimento: 8h às 20h (todos os dias)', 'Service hours: 8am to 8pm (every day)'],
  ['Atendimento: 8h às 20h', 'Service hours: 8am to 8pm'],
  ['Áreas de passeio:', 'Trip areas:'],
  ['Baía de Guanabara', 'Guanabara Bay'],

  // --- Common section content ---
  ['Quem já curtiu', 'Happy Customers'],
  ['Festas Inesquecíveis no Mar', 'Unforgettable Parties at Sea'],
  ['Dúvidas', 'Questions'],
  ['Diferenciais', 'Why Choose Us'],
  ['Lanchas Recomendadas', 'Recommended Boats'],
  ['Garanta Sua Lancha', 'Book Your Boat'],
  ['Selecionamos as melhores opções', 'We selected the best options'],
  ['Depoimentos', 'Testimonials'],

  // --- Forms ---
  ['Nome completo', 'Full name'],
  ['Telefone', 'Phone'],
  ['Email', 'Email'],
  ['Mensagem', 'Message'],
  ['Enviar', 'Send'],
  ['Seus Dados', 'Your Details'],
  ['Sou estrangeiro', "I'm a foreigner"],
  ['Resumo do Passeio', 'Trip Summary'],
  ['Pagamento', 'Payment'],
  ['Confirmação', 'Confirmation'],
  ['Dados', 'Details'],
  ['Carregando sua proposta...', 'Loading your proposal...'],
  ['Aguardando pagamento...', 'Waiting for payment...'],
  ['Reserva Confirmada!', 'Reservation Confirmed!'],
  ['Pague com PIX', 'Pay with PIX'],
  ['Ou copie o código abaixo:', 'Or copy the code below:'],
  ['Expira em', 'Expires in'],
  ['Selecione o método de pagamento:', 'Select payment method:'],
  ['Pagamento instantâneo via QR code', 'Instant payment via QR code'],
  ['Cartão de Crédito', 'Credit Card'],
  ['Parcele em até 12x', 'Pay in up to 12 installments'],
  ['Parcelas:', 'Installments:'],
  ['sem juros', 'interest-free'],
  ['Algo deu errado.', 'Something went wrong.'],
  ['Li e aceito os', 'I have read and accept the'],

  // --- Checkout ---
  ['Enviamos a confirmação para', 'We sent the confirmation to'],
  ['Tive um problema com o link de pagamento', 'I had a problem with the payment link'],
  ['Minha reserva foi confirmada e gostaria de mais informações sobre o embarque', 'My reservation was confirmed and I would like more information about boarding'],

  // --- Breadcrumbs ---
  ['Início', 'Home'],
  ['início', 'home'],

  // --- FAQ Common ---
  ['Como funciona', 'How it works'],
  ['Qual o preço', 'What is the price'],
  ['Quantas pessoas', 'How many people'],
  ['E se chover', 'What if it rains'],
  ['Posso levar', 'Can I bring'],
  ['Posso cancelar', 'Can I cancel'],
  ['O que está incluso', 'What is included'],
  ['Preciso reservar com antecedência', 'Do I need to book in advance'],

  // --- Common PT phrases ---
  ['Empresa de aluguel de lanchas no Rio de Janeiro', 'Boat rental company in Rio de Janeiro'],
  ['Passeios privativos para festas, aniversários, despedidas de solteira e eventos corporativos', 'Private trips for parties, birthdays, bachelorette parties, and corporate events'],
  ['Lanchas de 10 a 65 pessoas saindo da Marina da Glória', 'Boats for 10 to 65 people departing from Marina da Gloria'],
  ['Churrasco na Lancha', 'BBQ on Board'],
  ['Decoração e Open Bar', 'Decoration & Open Bar'],
];

// ═══════════════════════════════════════════════════════════
// INTERNAL LINK REPLACEMENTS PT → EN
// ═══════════════════════════════════════════════════════════
const linkReplacements = [];
registry.pages.forEach(p => {
  if (p.en && p.pt !== p.en) {
    // href="/lanchas/" → href="/en/boats/"
    linkReplacements.push([`href="${p.pt}"`, `href="${p.en}"`]);
    // Also handle full URLs in canonical/hreflang
    linkReplacements.push([`href="${BASE_URL}${p.pt}"`, `href="${BASE_URL}${p.en}"`]);
  }
});

// ═══════════════════════════════════════════════════════════
// HEADER TEMPLATE (non-transparent, for inner pages)
// ═══════════════════════════════════════════════════════════
function getEnHeader(ptPath, enPath, esPath) {
  return `  <!-- Header -->
  <header class="header" id="header">
    <div class="container">
      <div class="header__inner">
        <!-- Logo -->
        <a href="/en/" class="header__logo" aria-label="WeBoat Brasil - Home">
          <img src="/assets/images/logo/logo.svg" alt="WeBoat Brasil" width="150" height="40" class="header__logo-dark">
        </a>

        <!-- Desktop Navigation -->
        <nav class="header__nav" aria-label="Main navigation">
          <ul class="header__menu">
            <li><a href="/en/boats/">Boats</a></li>
            <li><a href="/en/routes/">Routes</a></li>
            <li><a href="/en/services/">Services</a></li>
            <li class="header__dropdown">
              <button class="header__dropdown-toggle" aria-expanded="false" aria-haspopup="true">
                Occasions
                <i class="ph ph-caret-down" aria-hidden="true"></i>
              </button>
              <ul class="header__dropdown-menu">
                <li><a href="/en/bachelorette-party/">Bachelorette Party</a></li>
                <li><a href="/en/birthday-party/">Birthday Party</a></li>
                <li><a href="/en/corporate-events/">Corporate Events</a></li>
                <li><a href="/en/new-years-eve/">New Year's Eve</a></li>
                <li><a href="/en/carnival/">Carnival</a></li>
              </ul>
            </li>
            <li><a href="/en/how-it-works/">How It Works</a></li>
            <li><a href="/en/about/">About</a></li>
            <li><a href="/en/contact/">Contact</a></li>
            <li><a href="/en/faq/">FAQ</a></li>
            <li><a href="/en/blog/">Blog</a></li>
          </ul>
        </nav>

        <!-- CTA WhatsApp -->
        <a href="https://wa.me/5521977724114?text=Hello! I would like information about boat rental in Rio de Janeiro. [via site - en]"
           class="btn btn-whatsapp header__cta"
           target="_blank"
           rel="noopener noreferrer">
          <i class="ph ph-whatsapp-logo" aria-hidden="true"></i>
          <span>WhatsApp</span>
        </a>
        <!-- Language Switcher -->
        <div class="lang-switcher" id="lang-switcher">
          <button class="lang-switcher__current" aria-expanded="false" aria-haspopup="true" aria-label="Language: English">
            <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#bd3d44" d="M0 0h640v480H0z"/><path stroke="#fff" stroke-width="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/><path fill="#192f5d" d="M0 0h364.8v258.5H0z"/></svg>
            EN
            <i class="ph ph-caret-down lang-switcher__caret" aria-hidden="true"></i>
          </button>
          <div class="lang-switcher__menu" role="menu">
            <a href="${ptPath}" class="lang-switcher__option" role="menuitem">
              <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#229e45" d="M0 0h640v480H0z"/><path fill="#f8e509" d="m321.4 20 301.5 220.1L321.4 460 19.9 240.1z"/><circle fill="#2b49a3" cx="321.4" cy="240" r="110"/></svg>
              Portugues
            </a>
            <a href="${enPath}" class="lang-switcher__option lang-switcher__option--active" role="menuitem">
              <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#bd3d44" d="M0 0h640v480H0z"/><path stroke="#fff" stroke-width="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/><path fill="#192f5d" d="M0 0h364.8v258.5H0z"/></svg>
              English
            </a>
            <a href="${esPath || ptPath}" class="lang-switcher__option" role="menuitem">
              <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#c60b1e" d="M0 0h640v480H0z"/><path fill="#ffc400" d="M0 120h640v240H0z"/></svg>
              Espanol
            </a>
          </div>
        </div>

        <!-- Menu Mobile Toggle -->
        <button class="header__mobile-toggle"
                aria-label="Open menu"
                aria-expanded="false"
                aria-controls="mobile-menu">
          <span class="header__hamburger"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div class="header__mobile-menu" id="mobile-menu" aria-hidden="true">
      <nav aria-label="Mobile navigation">
        <ul class="header__mobile-list">
          <li><a href="/en/boats/">Boats</a></li>
          <li><a href="/en/routes/">Routes</a></li>
          <li><a href="/en/services/">Services</a></li>
          <li><a href="/en/bachelorette-party/">Bachelorette Party</a></li>
          <li><a href="/en/birthday-party/">Birthday Party</a></li>
          <li><a href="/en/corporate-events/">Corporate Events</a></li>
          <li><a href="/en/new-years-eve/">New Year's Eve</a></li>
          <li><a href="/en/carnival/">Carnival</a></li>
          <li><a href="/en/how-it-works/">How It Works</a></li>
          <li><a href="/en/about/">About</a></li>
          <li><a href="/en/contact/">Contact</a></li>
          <li><a href="/en/faq/">FAQ</a></li>
          <li><a href="/en/blog/">Blog</a></li>
        </ul>
        <a href="https://wa.me/5521977724114?text=Hello! I would like information about boat rental in Rio de Janeiro. [via site - en]"
           class="btn btn-whatsapp btn--full"
           target="_blank"
           rel="noopener noreferrer">
          <i class="ph ph-whatsapp-logo" aria-hidden="true"></i>
          Chat on WhatsApp
        </a>
        <div class="lang-switcher--mobile">
          <a href="${ptPath}">
            <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#229e45" d="M0 0h640v480H0z"/><path fill="#f8e509" d="m321.4 20 301.5 220.1L321.4 460 19.9 240.1z"/><circle fill="#2b49a3" cx="321.4" cy="240" r="110"/></svg>
            PT
          </a>
          <a href="${enPath}" class="active">
            <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#bd3d44" d="M0 0h640v480H0z"/><path stroke="#fff" stroke-width="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/><path fill="#192f5d" d="M0 0h364.8v258.5H0z"/></svg>
            EN
          </a>
          <a href="${esPath || ptPath}">
            <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#c60b1e" d="M0 0h640v480H0z"/><path fill="#ffc400" d="M0 120h640v240H0z"/></svg>
            ES
          </a>
        </div>
      </nav>
    </div>
  </header>`;
}

// ═══════════════════════════════════════════════════════════
// FOOTER TEMPLATE
// ═══════════════════════════════════════════════════════════
function getEnFooter() {
  return `  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <!-- Column 1: Brand -->
        <div class="footer__col footer__col--brand">
          <a href="/en/" class="footer__logo">
            <img src="/assets/images/logo/logo-white.svg" alt="WeBoat Brasil" width="150" height="40">
          </a>
          <p class="footer__description">
            <strong>WeBoat Brasil</strong> - Boat rental company in Rio de Janeiro.
            Private trips for parties, birthdays, bachelorette parties, and corporate events.
            Boats for 10 to 65 people departing from Marina da Gloria.
          </p>
          <div class="footer__social">
            <a href="https://www.instagram.com/weboatbrasil" target="_blank" rel="noopener noreferrer" aria-label="WeBoat Instagram">
              <i class="ph ph-instagram-logo" aria-hidden="true"></i>
            </a>
            <a href="https://wa.me/5521977724114" target="_blank" rel="noopener noreferrer" aria-label="WeBoat WhatsApp">
              <i class="ph ph-whatsapp-logo" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        <!-- Column 2: Services -->
        <div class="footer__col">
          <h4 class="footer__title">Our Services</h4>
          <ul class="footer__links">
            <li><a href="/en/boats/">Boat Rental</a></li>
            <li><a href="/en/routes/">Trip Routes</a></li>
            <li><a href="/en/services/">BBQ on Board</a></li>
            <li><a href="/en/services/">Decoration &amp; Open Bar</a></li>
            <li><a href="/en/faq/">FAQ</a></li>
          </ul>
        </div>

        <!-- Column 3: Occasions -->
        <div class="footer__col">
          <h4 class="footer__title">Special Occasions</h4>
          <ul class="footer__links">
            <li><a href="/en/bachelorette-party/">Bachelorette Party on a Boat</a></li>
            <li><a href="/en/birthday-party/">Birthday Party at Sea</a></li>
            <li><a href="/en/corporate-events/">Corporate Events</a></li>
            <li><a href="/en/new-years-eve/">New Year's Eve in Guanabara Bay</a></li>
            <li><a href="/en/carnival/">Carnival on a Boat</a></li>
          </ul>
        </div>

        <!-- Column 4: Contact -->
        <div class="footer__col">
          <h4 class="footer__title">Contact</h4>
          <ul class="footer__contact">
            <li>
              <i class="ph ph-whatsapp-logo" aria-hidden="true"></i>
              <a href="https://wa.me/5521977724114">+55 (21) 97772-4114</a>
            </li>
            <li>
              <i class="ph ph-map-pin" aria-hidden="true"></i>
              <address>
                Marina da Gloria - Store 06<br>
                Av. Infante Dom Henrique, S/N<br>
                Gloria, Rio de Janeiro - RJ<br>
                ZIP 20021-140
              </address>
            </li>
            <li>
              <i class="ph ph-clock" aria-hidden="true"></i>
              <span>Service hours: 8am to 8pm (every day)</span>
            </li>
            <li>
              <i class="ph ph-currency-circle-dollar" aria-hidden="true"></i>
              <span>From R$ 2,300 (5-hour trip)</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Service Areas -->
      <div class="footer__areas">
        <p><strong>Trip areas:</strong> Mureta da Urca &bull; Praia Vermelha &bull; Copacabana &bull; Ilhas Cagarras &bull; Itaipu &amp; Camboinhas &bull; Guanabara Bay</p>
      </div>

      <!-- Bottom -->
      <div class="footer__bottom">
        <p>&copy; 2026 WeBoat Brasil. All rights reserved. CNPJ: 60.567.333/0001-29</p>
        <div class="footer__legal">
          <a href="/en/about/">About Us</a>
          <a href="/en/contact/">Contact Us</a>
          <a href="/en/privacy-policy/">Privacy Policy</a>
          <a href="/en/terms-of-use/">Terms of Use</a>
        </div>
      </div>
    </div>
  </footer>`;
}

// ═══════════════════════════════════════════════════════════
// WHATSAPP FLOAT TEMPLATE
// ═══════════════════════════════════════════════════════════
function getEnWhatsAppFloat(waMessage) {
  return `
  <!-- WhatsApp Float -->
  <a href="https://wa.me/5521977724114?text=${encodeURIComponent(waMessage)}"
     class="whatsapp-float"
     target="_blank"
     rel="noopener noreferrer"
     aria-label="Chat with us on WhatsApp">
    <i class="ph-fill ph-whatsapp-logo"></i>
  </a>`;
}

// ═══════════════════════════════════════════════════════════
// TRANSLATION FUNCTION
// ═══════════════════════════════════════════════════════════
function translateContent(html) {
  // Protect attribute values and script blocks from translation using placeholders
  const protected_ = [];
  let idx = 0;

  function protect(match) {
    const placeholder = `__P${idx}__`;
    protected_.push({ placeholder, value: match });
    idx++;
    return placeholder;
  }

  // 1. Protect all <script>...</script> blocks (JSON-LD, GTM, etc.)
  html = html.replace(/<script[\s\S]*?<\/script>/gi, protect);

  // 2. Protect URL/path/technical attributes (NOT alt, aria-label, placeholder, content)
  html = html.replace(/(\s(?:href|src|srcset|action|data-\w+|class|id|for|name|value|style|type|role|rel|integrity|crossorigin|media|onload|sizes|width|height|loading|decoding|autocomplete|inputmode|tabindex)=")([^"]*")/gi, (match, prefix, rest) => {
    return prefix + protect(rest);
  });

  // 3b. Protect content="..." only when it contains URLs or technical values
  html = html.replace(/(\scontent=")(https?:\/\/[^"]*"|[0-9]+"|[a-z]{2}_[A-Z]{2}")/gi, (match, prefix, rest) => {
    return prefix + protect(rest);
  });

  // 3. Protect HTML comments
  html = html.replace(/<!--[\s\S]*?-->/g, protect);

  // Apply translations (longer phrases first to avoid partial matches)
  const sorted = [...translations].sort((a, b) => b[0].length - a[0].length);
  for (const [pt, en] of sorted) {
    html = html.split(pt).join(en);
  }

  // Restore protected values (reverse order to handle nested placeholders)
  for (let i = protected_.length - 1; i >= 0; i--) {
    html = html.split(protected_[i].placeholder).join(protected_[i].value);
  }

  return html;
}

function replaceInternalLinks(html) {
  // Replace internal links from PT paths to EN paths
  for (const [pt, en] of linkReplacements) {
    html = html.split(pt).join(en);
  }
  // Also replace bare "/" href for homepage
  html = html.replace(/href="\/"/g, 'href="/en/"');
  return html;
}

// ═══════════════════════════════════════════════════════════
// MAIN: Generate each EN page
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

  const enFile = path.join(ROOT, page.enPath);
  const enDir = path.dirname(enFile);

  // Create directory if needed
  fs.mkdirSync(enDir, { recursive: true });

  let html = fs.readFileSync(ptFile, 'utf8');

  // Find the registry entry for URL mapping
  const ptUrl = '/' + page.ptPath.replace(/index\.html$/, '');
  const registryEntry = registry.pages.find(p => p.pt === ptUrl);
  const enUrl = registryEntry ? registryEntry.en : '/en/';
  const esUrl = registryEntry ? registryEntry.es : '/es/';

  // === STEP 1: Change lang ===
  html = html.replace('lang="pt-BR"', 'lang="en"');

  // === STEP 2: Replace title ===
  html = html.replace(/<title>[^<]+<\/title>/, `<title>${page.title}</title>`);

  // === STEP 3: Replace meta description ===
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${page.description}">`
  );

  // === STEP 4: Replace keywords ===
  if (page.keywords) {
    html = html.replace(
      /<meta name="keywords" content="[^"]*">/,
      `<meta name="keywords" content="${page.keywords}">`
    );
  }

  // === STEP 5-6: MOVED to after step 16 (link replacement must happen first) ===

  // === STEP 7: Replace og:locale ===
  html = html.replace(
    /<meta property="og:locale" content="pt_BR">/,
    '<meta property="og:locale" content="en_US">'
  );
  html = html.replace(
    /<meta property="og:locale:alternate" content="en_US">/,
    '<meta property="og:locale:alternate" content="pt_BR">'
  );

  // === STEP 8: Replace og:url ===
  html = html.replace(
    /<meta property="og:url" content="[^"]*">/,
    `<meta property="og:url" content="${BASE_URL}${enUrl}">`
  );

  // === STEP 9: Replace og:title and og:description ===
  const ogTitle = page.title.split(' | ')[0];
  html = html.replace(
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${ogTitle} | WeBoat Brasil">`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${page.description.substring(0, 160)}">`
  );

  // === STEP 10: Replace twitter meta ===
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*">/,
    `<meta name="twitter:title" content="${ogTitle} | WeBoat Brasil">`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*">/,
    `<meta name="twitter:description" content="${page.description.substring(0, 160)}">`
  );

  // === STEP 11: Replace noindex if needed ===
  if (page.noindex) {
    html = html.replace(
      /<meta name="robots" content="[^"]*">/,
      '<meta name="robots" content="noindex, nofollow">'
    );
  }

  // === STEP 12: Replace header ===
  if (!page.isCheckout) {
    // Find and replace the entire header block
    const headerRegex = /\s*<!-- Header -->[\s\S]*?<\/header>/;
    const headerMatch = html.match(headerRegex);
    if (headerMatch) {
      html = html.replace(headerMatch[0], '\n\n' + getEnHeader(ptUrl, enUrl, esUrl));
    } else {
      // Try alternate header pattern (no comment)
      const headerRegex2 = /\s*<header class="header[^"]*"[\s\S]*?<\/header>/;
      const headerMatch2 = html.match(headerRegex2);
      if (headerMatch2) {
        html = html.replace(headerMatch2[0], '\n\n' + getEnHeader(ptUrl, enUrl, esUrl));
      }
    }
  }

  // === STEP 13: Replace footer ===
  if (!page.isCheckout) {
    const footerRegex = /\s*<!-- Footer[^>]*-->[\s\S]*?<\/footer>/;
    const footerMatch = html.match(footerRegex);
    if (footerMatch) {
      html = html.replace(footerMatch[0], '\n\n' + getEnFooter());
    } else {
      const footerRegex2 = /\s*<footer class="footer"[\s\S]*?<\/footer>/;
      const footerMatch2 = html.match(footerRegex2);
      if (footerMatch2) {
        html = html.replace(footerMatch2[0], '\n\n' + getEnFooter());
      }
    }
  }

  // === STEP 14: Replace WhatsApp float ===
  const waFloatRegex = /\s*<!-- WhatsApp Float -->[\s\S]*?<\/a>\s*(?=\n\s*<!-- Scripts|\n\s*<script)/;
  const waFloatMatch = html.match(waFloatRegex);
  if (waFloatMatch) {
    html = html.replace(waFloatMatch[0], getEnWhatsAppFloat(page.waMessage));
  }

  // === STEP 15: Replace skip link ===
  html = html.replace(
    /class="skip-link">[^<]+</,
    'class="skip-link">Skip to main content<'
  );

  // === STEP 16: Replace internal links (PT → EN) ===
  html = replaceInternalLinks(html);

  // === STEP 5 (deferred): Replace canonical URL ===
  // Must run AFTER replaceInternalLinks to avoid double-replacement
  html = html.replace(
    /<link rel="canonical" href="[^"]*">/,
    `<link rel="canonical" href="${BASE_URL}${enUrl}">`
  );

  // === STEP 6 (deferred): Replace hreflang tags ===
  // Must run AFTER replaceInternalLinks so PT hreflang keeps PT URL
  html = html.replace(
    /<!-- hreflang -->[\s\S]*?(?=\s*<link rel="icon")/,
    `<!-- hreflang -->\n  <link rel="alternate" hreflang="pt-BR" href="${BASE_URL}${ptUrl}">\n  <link rel="alternate" hreflang="en" href="${BASE_URL}${enUrl}">\n  <link rel="alternate" hreflang="es" href="${BASE_URL}${esUrl}">\n  <link rel="alternate" hreflang="x-default" href="${BASE_URL}${ptUrl}">\n  `
  );

  // === STEP 17: Translate remaining content ===
  html = translateContent(html);

  // === STEP 18: Add Schema.org availableLanguage ===
  html = html.replace(
    /"availableLanguage":\s*\["Portuguese"\]/g,
    '"availableLanguage": ["Portuguese", "English", "Spanish"]'
  );

  // === STEP 19: Add i18n comment at top ===
  html = `<!-- i18n: translated from PT version 2026-02-15 -->\n` + html;

  // === STEP 20: Add i18n.js if not present ===
  if (!html.includes('i18n.js') && !page.isCheckout) {
    html = html.replace(
      '<script src="/js/menu.js" defer></script>',
      '<script src="/js/i18n.js" defer></script>\n  <script src="/js/menu.js" defer></script>'
    );
  }

  // Write the file
  fs.writeFileSync(enFile, html, 'utf8');
  console.log(`OK: ${page.enPath}`);
  created++;
});

console.log(`\nDone! Created: ${created}, Errors: ${errors}`);
