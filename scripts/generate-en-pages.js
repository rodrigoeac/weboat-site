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
    description: "Watch the fireworks from a private boat on New Year's Eve in Rio! The best view of the Copacabana fireworks. Book early!",
    keywords: "new years eve boat rio, reveillon boat rio de janeiro, fireworks boat copacabana",
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
  ['Réveillon na Baía de Guanabara', "New Year's Eve in Copacabana"],
  ['Réveillon em Copacabana', "New Year's Eve in Copacabana"],
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

  // --- Pricing sections (boat detail pages) ---
  ['Valores do Aluguel', 'Rental Prices'],
  ['Valores por Roteiro (Sex-Dom)', 'Prices by Route (Fri-Sun)'],
  ['Valores por Roteiro', 'Prices by Route'],
  ['Seg-Qui from', 'Mon-Thu from'],
  ['Seg-Qui desde', 'Mon-Thu from'],
  ['Seg-Qui', 'Mon-Thu'],
  ['Sex-Dom', 'Fri-Sun'],
  ['seg a qui', 'Mon-Thu'],
  ['sex a dom', 'Fri-Sun'],
  ['Adicionais', 'Add-ons'],
  ['Hora Extra', 'Extra Hour'],
  ['Turno: Manhã 09h-14h ou Tarde 14h30-19h30', 'Shift: Morning 9am-2pm or Afternoon 2:30pm-7:30pm'],
  ['*Turno:', '*Shift:'],
  ['Manhã', 'Morning'],
  ['Tarde', 'Afternoon'],
  ['Reservar pelo WhatsApp', 'Book on WhatsApp'],
  ['Montar Proposta', 'Build Proposal'],
  ['Escolher Lancha e Montar Proposta', 'Choose Boat and Build Proposal'],
  ['Preco Seg-Qui', 'Price Mon-Thu'],
  ['Preco Sex-Dom', 'Price Fri-Sun'],
  ['Propria', 'Owned'],
  ['Própria', 'Owned'],

  // --- BBQ/Grill pricing notes ---
  ['Tripulação, Gelo escama 2x20kg, Gelo filtrado 1x10kg, Carvão', 'Crew, Flake ice 2x20kg, Filtered ice 1x10kg, Charcoal'],
  ['Tripulação', 'Crew'],
  ['Gelo escama', 'Flake ice'],
  ['Gelo filtrado', 'Filtered ice'],
  ['Carvão', 'Charcoal'],

  // --- Boat description section ---
  ['Sobre a WeBoat', 'About the WeBoat'],
  ['O que está incluído', 'What is Included'],
  ['O que está incluido', 'What is Included'],
  ['Combustível para o roteiro', 'Fuel for the route'],
  ['Combustível para o roteiro completo', 'Fuel for the complete route'],

  // --- Image alt text (boat galleries) ---
  ['Área de sol', 'Sunbathing area'],
  ['Em navegação', 'Sailing'],
  ['Proa', 'Bow'],
  ['Detalhe interior', 'Interior detail'],
  ['Área de descanso', 'Rest area'],
  ['Passeio', 'Boat trip'],
  ['Vista noturna da', 'Night view of'],
  ['com Pão de Açúcar ao fundo', 'with Sugarloaf Mountain in the background'],
  ['Pão de Açúcar', 'Sugarloaf Mountain'],
  ['no mar com céu azul', 'at sea with blue sky'],
  ['ao pôr do sol', 'at sunset'],
  ['navegando na', 'cruising in'],
  ['com vista para o Cristo Redentor', 'with view of Christ the Redeemer'],
  ['Cristo Redentor', 'Christ the Redeemer'],
  ['Iate de luxo para', 'Luxury yacht for'],

  // --- Schema.org ---
  ['Lancha para Aluguel', 'Boat for Rent'],
  ['Lanchas para Aluguel', 'Boats for Rent'],
  ['Lancha de 32 pés para até 15 pessoas. Ideal para passeios privativos e festas no Rio de Janeiro. Melhor custo-benefício da frota.', '32-foot boat for up to 15 people. Ideal for private trips and parties in Rio de Janeiro. Best value in the fleet.'],
  ['Lancha de 39 pés para até 16 pessoas. Versátil e espaçosa, ideal para festas e celebrações.', '39-foot boat for up to 16 people. Versatile and spacious, ideal for parties and celebrations.'],
  ['Lancha premium de 36 pés para até 14 pessoas. Acabamento premium e conforto superior.', 'Premium 36-foot boat for up to 14 people. Premium finishes and superior comfort.'],
  ['Lancha de 42 pés com flybridge exclusivo para até 12 pessoas. Experiência única no mar.', '42-foot boat with exclusive flybridge for up to 12 people. Unique experience at sea.'],
  ['Lancha de 50 pés para até 22 pessoas. Nossa maior embarcação com espaço para grandes grupos.', '50-foot boat for up to 22 people. Our largest vessel with space for large groups.'],
  ['Quantas pessoas cabem na', 'How many people fit in the'],
  ['Qual o valor da hora extra na', 'What is the extra hour fee on the'],
  ['tem banheiro', 'have a restroom'],
  ['O que está incluso no aluguel da', 'What is included in the rental of the'],
  ['Comparativo de Lanchas WeBoat Brasil', 'WeBoat Brasil Boat Comparison'],
  ['Tabela comparativa das 5 lanchas proprias da WeBoat Brasil para aluguel no Rio de Janeiro', 'Comparison table of the 5 WeBoat Brasil own boats for rent in Rio de Janeiro'],
  ['Lancha para ate', 'Boat for up to'],
  ['Otima para festas e celebracoes', 'Perfect for parties and celebrations'],
  ['Lancha premium para ate', 'Premium boat for up to'],
  ['Lancha com flybridge exclusivo', 'Boat with exclusive flybridge'],
  ['para quem busca sofisticação', 'for those seeking sophistication'],
  ['a única opção propria', 'the only own option'],
  ['Serviços WeBoat Brasil', 'WeBoat Brasil Services'],
  ['Serviços adicionais para seu passeio de lancha no Rio de Janeiro', 'Additional services for your boat trip in Rio de Janeiro'],
  ['Churrasco na Lancha', 'BBQ on Boat'],
  ['Serviço completo de churrasco durante seu passeio de lancha', 'Complete BBQ service during your boat trip'],

  // --- FAQ Schema.org answers ---
  ['Sim!', 'Yes!'],
  ['possui banheiro a bordo', 'has a restroom on board'],
  ['O valor da hora extra', 'The extra hour fee'],
  ['é de R$', 'is R$'],
  ['Cabem até', 'It fits up to'],
  ['O aluguel inclui', 'The rental includes'],
  ['inclui:', 'includes:'],
  ['combustível', 'fuel'],
  ['marinheiro', 'captain'],
  ['som Bluetooth', 'Bluetooth speakers'],
  ['tapete flutuante', 'floating mat'],
  ['coletes salva-vidas', 'life jackets'],
  ['coolers', 'coolers'],
  ['seguro obrigatório', 'mandatory insurance'],

  // --- FAQ answer sentence fragments (boat detail pages) ---
  ['incluindo crianças', 'including children'],
  ['Essa capacidade é definida pela Marinha do Brasil para garantir conforto e segurança de todos a bordo', 'This capacity is defined by the Brazilian Navy to ensure comfort and safety for all on board'],
  ['tem capacidade para', 'has capacity for'],
  ['A solicitação deve ser feita durante o passeio diretamente com o marinheiro, sujeita à disponibilidade da embarcação', 'The request must be made during the trip directly with the captain, subject to vessel availability'],
  ['A solicitação deve ser feita durante o passeio diretamente com o captain, sujeita à disponibilidade da embarcação', 'The request must be made during the trip directly with the captain, subject to vessel availability'],
  ['para maior conforto dos passageiros durante todo o passeio', 'for greater passenger comfort throughout the trip'],
  ['tripulação habilitada (marinheiro)', 'qualified crew (captain)'],
  ['tripulação habilitada', 'qualified crew'],
  ['macarrões flutuantes', 'pool noodles'],
  ['A churrasqueira na', 'The BBQ grill on the'],
  ['A churrasqueira está disponível mediante adicional de', 'The BBQ grill is available for an additional fee of'],
  ['A churrasqueira tem adicional de', 'The BBQ grill has an additional fee of'],
  ['tem um adicional de', 'has an additional fee of'],
  ['A taxa inclui comandante preparando o churrasco, 02 sacos de gelo escama e 01 saco de gelo filtrado', 'The fee includes a grill master, 2 bags of flake ice, and 1 bag of filtered ice'],
  ['A taxa inclui', 'The fee includes'],
  ['comandante preparando o churrasco', 'grill master'],
  ['sacos de gelo escama', 'bags of flake ice'],
  ['saco de gelo filtrado', 'bag of filtered ice'],
  ['roteiro contratado', 'booked route'],
  ['para o roteiro contratado', 'for the booked route'],
  ['O aluguel da', 'The rental of the'],
  ['O aluguel inclui', 'The rental includes'],
  ['som com Bluetooth', 'Bluetooth speakers'],
  ['na WeBoat', 'on the WeBoat'],
  ['coolers e coletes salva-vidas', 'coolers and life jackets'],
  ['coolers e life jackets', 'coolers and life jackets'],
  [', coolers e', ', coolers and'],

  // --- Breadcrumbs in Schema ---
  ['Início', 'Home'],

  // --- Event boat cards (homepage) ---
  ['Grandes Grupos', 'Large Groups'],
  ['Lanchas para Eventos e Festas', 'Boats for Events &amp; Parties'],
  ['Organizando um evento corporativo, festa ou confraternização grande?', 'Planning a corporate event, party, or large gathering?'],
  ['Temos embarcações para grupos de 30 a 65 pessoas com toda estrutura necessária', 'We have partner boats for groups of 30 to 65 people with all the infrastructure you need'],
  ['Eventos para 30-40 pessoas', 'Events for 30-40 people'],
  ['Eventos para 35-50 pessoas', 'Events for 35-50 people'],
  ['Maior embarcação para 50-65 pessoas', 'Largest vessel for 50-65 people'],
  ['Ideal para eventos corporativos e festas', 'Ideal for corporate events and parties'],
  ['4 caixas PZ ativas + gerador incluso', '4 active PZ speakers + generator included'],
  ['Nossa maior embarcação com gerador', 'Our largest vessel with generator'],
  ['Solicitar Orçamento para Evento', 'Request an Event Quote'],
  ['Eventos', 'Events'],
  ['Som Profissional', 'Pro Sound'],
  ['Maior Capacidade', 'Largest Capacity'],
  ['Experiência Premium', 'Premium Experience'],
  ['Iates de Luxo', 'Luxury Yachts'],
  ['Sofisticação e conforto para quem busca uma experiência exclusiva', 'Sophistication and comfort for those seeking an exclusive experience'],
  ['Iates acima de 60 pés com ar-condicionado, gerador e acabamento premium', 'Yachts over 60 feet with air conditioning, generator, and premium finishes'],
  ['Luxo', 'Luxury'],

  // --- Occasion pages body content ---
  ['é um passeio privativo de aproximadamente', 'is a private trip of approximately'],
  ['com saída da Marina da Glória', 'departing from Marina da Gloria'],
  ['com saída da', 'departing from'],
  ['Você navega pela', 'You sail through the'],
  ['e orla do Rio com', 'and the Rio coastline with'],
  ['e orla do Rio', 'and the Rio coastline'],
  ['decoração temática', 'themed decoration'],
  ['É a forma perfeita de curtir o', 'It is the perfect way to enjoy the'],
  ['É a forma perfeita de curtir', 'It is the perfect way to enjoy'],
  ['longe da multidão', 'away from the crowd'],
  ['com privacidade e conforto', 'with privacy and comfort'],
  ['para seu grupo', 'for your group'],
  ['passeio privativo', 'private trip'],

  // --- Common body content fragments ---
  ['é a escolha perfeita para quem busca o melhor custo-benefício em', 'is the perfect choice for those seeking the best value in'],
  ['é a escolha perfeita para quem busca', 'is the perfect choice for those seeking'],
  ['oferece conforto e espaço ideal para', 'offers comfort and ideal space for'],
  ['passeios em família', 'family trips'],
  ['confraternizações', 'get-togethers'],
  ['garante diversão completa durante todo o passeio', 'guarantees full fun throughout the trip'],
  ['Navegue pelas águas da', 'Sail through the waters of'],
  ['e as praias mais bonitas do Rio', 'and the most beautiful beaches in Rio'],
  ['Equipada com', 'Equipped with'],
  ['essa lancha oferece', 'this boat offers'],
  ['essa boat oferece', 'this boat offers'],
  ['essa embarcação oferece', 'this vessel offers'],
  ['essa boat', 'this boat'],
  ['essa lancha', 'this boat'],
  ['com vista para o', 'with a view of'],
  ['com vista para a', 'with a view of'],
  ['com vista para', 'with a view of'],
  ['aniversários e', 'birthdays and'],
  ['birthdays e', 'birthdays and'],
  ['floating mat e', 'floating mat and'],
  ['speakers, floating mat e coolers', 'speakers, floating mat and coolers'],
  ['espaço ideal para', 'ideal space for'],
  ['Com capacidade para', 'With capacity for'],
  ['com capacidade para', 'with capacity for'],
  ['no Rio de Janeiro', 'in Rio de Janeiro'],
  ['no aluguel', 'in the rental'],
  ['do aluguel', 'of the rental'],
  ['da embarcação', 'of the vessel'],
  ['na embarcação', 'on the vessel'],
  ['disponibilidade da embarcação', 'vessel availability'],
  ['diretamente com o', 'directly with the'],
  ['sujeita à', 'subject to'],
  ['durante o passeio', 'during the trip'],
  ['durante todo o', 'throughout the'],
  ['passeio', 'trip'],
  ['embarcação', 'vessel'],
  ['Selecione um roteiro para começar', 'Select a route to start'],
  ['Selecione roteiro, serviços e veja o valor em tempo real', 'Select a route, services and see the price in real time'],
  ['Selecione um roteiro', 'Select a route'],
  ['Escolha o destino ideal para seu passeio na', 'Choose the ideal destination for your trip on the'],
  ['Roteiros Disponíveis', 'Available Routes'],
  ['roteiros disponíveis', 'available routes'],
  ['Roteiros disponíveis', 'Available routes'],

  // --- Misc content ---
  ['Mais Pedido', 'Most Popular'],
  ['mais pedido', 'most popular'],
  ['Experiências Reais', 'Real Experiences'],
  ['horas', 'hours'],
  ['hora', 'hour'],
  ['parada', 'stop'],
  ['paradas', 'stops'],
  ['Não sabe qual escolher? Compare as lanchas', "Not sure which one? Compare our boats"],
  ['Não sabe qual escolher?', 'Not sure which one?'],
  ['Compare as lanchas', 'Compare our boats'],

  // --- Specs table (boat detail pages) ---
  ['Especificações Técnicas', 'Technical Specifications'],
  ['Especificações', 'Specifications'],
  ['Tamanho', 'Size'],
  ['Tipo', 'Type'],
  ['Capacidade', 'Capacity'],
  ['Som', 'Sound'],
  ['Banheiro', 'Restroom'],
  ['Toldo', 'Canopy'],
  ['Disponível', 'Available'],
  ['disponível', 'available'],
  ['Pés', 'Feet'],
  ['pés', 'feet'],

  // --- Sidebar (boat detail pages) ---
  ['Informações Rápidas', 'Quick Information'],
  ['Consultar Disponibilidade', 'Check Availability'],
  ['Disponível todos os dias', 'Available every day'],
  ['PIX, cartão ou transferência', 'PIX, card or wire transfer'],
  ['cartão', 'card'],
  ['transferência', 'wire transfer'],
  ['Outras Lanchas', 'Other Boats'],
  ['Outras Boats', 'Other Boats'],

  // --- FAQ sections (boat detail + compare + FAQ pages) ---
  ['Frequently Asked Questions sobre a', 'Frequently Asked Questions About the'],
  ['Frequently Asked Questions sobre', 'Frequently Asked Questions About'],
  ['Ver Todas as Questions', 'View All Questions'],
  ['Ver Todas as Perguntas', 'View All Questions'],
  ['Qual o valor da hora extra', 'What is the extra hour fee'],
  ['Quanto custa alugar uma', 'How much does it cost to rent a'],
  ['O que está incluso no aluguel de lancha', 'What is included in the boat rental'],
  ['What is included no boat rental', 'What is included in the boat rental'],
  ['What is included no aluguel', 'What is included in the rental'],
  ['What is included no', 'What is included in the'],
  ['Quantas pessoas cabem em uma lancha', 'How many people fit in a boat'],
  ['How many people cabem em uma boat', 'How many people fit in a boat'],
  ['How many people cabem em uma', 'How many people fit in a'],
  ['Como funciona a reserva e pagamento', 'How do reservations and payment work'],
  ['How it works a reserva e pagamento', 'How do reservations and payment work'],
  ['E se chover no dia do passeio', 'What if it rains on the day of the trip'],
  ['What if it rains no dia do trip', 'What if it rains on the day of the trip'],
  ['What if it rains no dia do', 'What if it rains on the day of the'],
  ['Posso levar bebida e comida', 'Can I bring drinks and food'],
  ['Can I bring bebida e comida', 'Can I bring drinks and food'],
  ['bebida e comida', 'drinks and food'],
  ['Posso levar crianças no passeio', 'Can I bring children on the trip'],
  ['Can I bring crianças no trip', 'Can I bring children on the trip'],
  ['Can I bring crianças no', 'Can I bring children on the'],
  ['crianças', 'children'],
  ['Posso levar cachorro na lancha', 'Can I bring dogs on the boat'],
  ['Can I bring cachorro na boat', 'Can I bring dogs on the boat'],
  ['Can I bring cachorro na', 'Can I bring dogs on the'],
  ['cachorro', 'dog'],
  ['Vocês fazem passeio de Réveillon', "Do you offer New Year's Eve trips"],
  ['Do you offer trip de New Year\'s Eve', "Do you offer New Year's Eve trips"],
  ['trip de New Year\'s Eve', "New Year's Eve trips"],
  ['Qual a diferença entre os roteiros', 'What is the difference between the routes'],
  ['Qual a política de cancelamento', 'What is the cancellation policy'],
  ['Com quanto tempo de antecedência devo reservar', 'How far in advance should I book'],
  ['Vocês fazem', 'Do you offer'],
  ['O que é proibido levar na', 'What is forbidden to bring on the'],
  ['Quanto tempo leva para reservar uma', 'How long does it take to reserve a'],
  ['Preciso de habilitação para pilotar a', 'Do I need a license to pilot the'],
  ['Can I cancel a reserva', 'Can I cancel my reservation'],
  ['O que levar no dia do', 'What should I bring on the day of the'],
  ['sobre a WeBoat', 'about the WeBoat'],
  ['sobre Comparativo', 'About Comparison'],

  // --- FAQ answer fragments ---
  ['começa em', 'starts at'],
  ['para trips de segunda a quinta', 'for trips Monday to Thursday'],
  ['de sexta a domingo', 'Friday to Sunday'],
  ['O preço varia conforme a capacidade da', 'The price varies according to the capacity of the'],
  ['roteiro escolhido e duração do', 'chosen route and duration of the'],
  ['captain habilitado pela Marinha', 'captain licensed by the Brazilian Navy'],
  ['captain habilitado', 'licensed captain'],
  ['habilitado pela Marinha do Brasil', 'licensed by the Brazilian Navy'],
  ['habilitado pela Marinha', 'licensed by the Brazilian Navy'],
  ['Services como BBQ, open bar e decoration são opcionais', 'Services such as BBQ, open bar and decoration are optional'],
  ['são opcionais', 'are optional'],
  ['Para grupos maiores, temos', 'For larger groups, we have'],
  ['boats parceiras de 10 a 65', 'partner boats from 10 to 65'],
  ['boats parceiras', 'partner boats'],
  ['A reserva é confirmada com 50% de sinal via PIX ou transferência', 'The reservation is confirmed with a 50% deposit via PIX or wire transfer'],
  ['O restante deve ser pago', 'The remainder must be paid'],
  ['momento do embarque', 'time of boarding'],
  ['A remarcação só é possível em caso de chuva forte que inviabilize o', 'Rescheduling is only possible in case of heavy rain that makes the trip impossible'],
  ['Tempo nublado ou chuva leve não geram remarcação', 'Cloudy weather or light rain does not qualify for rescheduling'],
  ['Em caso de más condições de navegabilidade', 'In case of poor sailing conditions'],
  ['o roteiro pode ser alterado', 'the route may be changed'],
  ['A diferença entre os roteiros está no tempo de navegação versus tempo de', 'The difference between routes is in sailing time versus'],
  ['Roteiros mais curtos', 'Shorter routes'],
  ['Routes mais curtos', 'Shorter routes'],
  ['têm menos tempo navegando', 'have less sailing time'],
  ['Permitimos garrafas PET e latas', 'We allow PET bottles and cans'],
  ['Recipientes de vidro são aceitos apenas para vinhos, champanhes, whiskies e destilados', 'Glass containers are only accepted for wines, champagnes, whiskies and spirits'],
  ['Recipientes de vidro só são permitidos para vinhos, champanhes, whiskies e destilados', 'Glass containers are only allowed for wines, champagnes, whiskies and spirits'],
  ['O sinal de 50% garante a reserva e não dá direito a arrependimento por motivos pessoais', 'The 50% deposit secures the reservation and is non-refundable for personal reasons'],
  ['Se precisar cancelar, entre em contato o quanto antes', 'If you need to cancel, please contact us as soon as possible'],
  ['Não há restrição de idade', 'There is no age restriction'],
  ['Pedimos que os responsáveis sigam as orientações', 'We ask that guardians follow the guidelines'],
  ['Permitimos cachorros de pequeno porte', 'We allow small dogs'],
  ['Para cães de médio e grande porte', 'For medium and large dogs'],
  ['é necessário consultar previamente nossa equipe pelo WhatsApp', 'you must consult our team in advance via WhatsApp'],
  ['Não há tempo mínimo ou máximo para reserva', 'There is no minimum or maximum booking time'],
  ['em períodos de alta procura', 'during high-demand periods'],
  ['recomendamos reservar com pelo menos 30 dias de antecedência', 'we recommend booking at least 30 days in advance'],
  ['tem 5 hours de duração', 'lasts 5 hours'],
  ['É proibido:', 'It is forbidden:'],
  ['bronzeadores (use protetor solar)', 'tanning oils (use sunscreen)'],
  ['vinho tinto', 'red wine'],
  ['narguilé', 'hookah'],
  ['fogos de artifício e confetes', 'fireworks and confetti'],
  ['Nossa equipe responde em minutos', 'Our team responds in minutes'],
  ['Todo boat rental on the WeBoat includes', 'Every WeBoat boat rental includes'],
  ['Todo aluguel de lancha na WeBoat inclui', 'Every WeBoat boat rental includes'],
  ['O boat rental in Rio de Janeiro on the WeBoat começa em', 'Boat rental in Rio de Janeiro at WeBoat starts at'],
  ['O aluguel de lancha no Rio de Janeiro na WeBoat começa em', 'Boat rental in Rio de Janeiro at WeBoat starts at'],
  ['para trips de segunda a quinta, e', 'for trips Monday to Thursday, and'],
  ['de segunda a quinta', 'Monday to Thursday'],
  ['de sexta a domingo', 'Friday to Sunday'],
  ['O preço varia conforme', 'The price varies according to'],
  ['capacidade da boat', 'capacity of the boat'],
  ['roteiro escolhido e duração do trip', 'chosen route and duration of the trip'],
  ['A WeBoat tem 5 own boats', 'WeBoat has 5 own boats'],
  ['A WeBoat tem 5 lanchas próprias', 'WeBoat has 5 own boats'],
  ['Para grupos maiores', 'For larger groups'],
  ['A reserva é confirmada com 50% de sinal', 'The reservation is confirmed with a 50% deposit'],
  ['via PIX ou transferência', 'via PIX or wire transfer'],
  ['O restante é pago', 'The remainder is paid'],
  ['up to o momento do embarque', 'by the time of boarding'],
  ['até o momento do embarque', 'by the time of boarding'],
  ['chuva forte que inviabilize o trip', 'heavy rain that makes the trip impossible'],
  ['chuva forte que inviabilize o passeio', 'heavy rain that makes the trip impossible'],
  ['Tempo nublado ou chuva leve', 'Cloudy weather or light rain'],
  ['não geram remarcação', 'does not qualify for rescheduling'],
  ['o roteiro pode ser alterado para a', 'the route may be changed to'],
  ['está no tempo de navegação versus tempo de boat stop', 'is in sailing time versus time anchored'],
  ['está no tempo de navegação versus tempo de parada', 'is in sailing time versus time anchored'],
  ['Todas as boats da WeBoat incluem', 'All WeBoat boats include'],
  ['Todas as lanchas da WeBoat incluem', 'All WeBoat boats include'],
  ['só precisa embarcar e aproveitar', 'just need to board and enjoy'],
  ['Cancelamentos feitos up to 48 hours antes do trip têm reembolso integral do sinal', 'Cancellations made up to 48 hours before the trip receive a full refund of the deposit'],
  ['reagendamos sem custo', 'we reschedule at no additional cost'],
  ['Leve protetor solar', 'Bring sunscreen'],
  ['roupa de banho', 'swimwear'],
  ['toalha e suas bebidas', 'a towel and your drinks'],
  ['coolers includeds na boat', 'coolers included in the boat'],
  ['coolers inclusos na lancha', 'coolers included in the boat'],
  ['Garanta sua data e faça a noiva mais feliz do Rio de Janeiro', 'Secure your date and make the bride the happiest in Rio de Janeiro'],

  // --- Proposal builder (boat detail pages) ---
  ['Monte sua proposta', 'Build Your Proposal'],
  ['Personalize seu', 'Customize your'],
  ['Escolha o Roteiro', 'Choose a Route'],
  ['Detalhes do', 'Details of the'],
  ['Número de Pessoas', 'Number of People'],
  ['Horas Extras', 'Extra Hours'],
  ['Services Extras (opcional)', 'Extra Services (optional)'],
  ['Serviços Extras (opcional)', 'Extra Services (optional)'],
  ['Resumo da Proposta', 'Proposal Summary'],
  ['Send Proposta pelo WhatsApp', 'Send Proposal via WhatsApp'],
  ['Enviar Proposta pelo WhatsApp', 'Send Proposal via WhatsApp'],

  // --- CTA sections (boat detail pages) ---
  ['Reserve a WeBoat', 'Reserve the WeBoat'],
  ['Agora', 'Now'],
  ['Garanta sua data e viva uma experiência inesquecível no mar do Rio de Janeiro', 'Secure your date and enjoy an unforgettable experience at sea in Rio de Janeiro'],
  ['Ver Outras Boats', 'View Other Boats'],
  ['Ver Outras Lanchas', 'View Other Boats'],
  ['da frota', 'in the fleet'],

  // --- Compare page ---
  ['Comparativo', 'Comparison'],
  ['Qual a Melhor', 'What Is the Best'],
  ['para Alugar no Rio', 'to Rent in Rio'],
  ['Compare as 5', 'Compare the 5'],
  ['boats proprias', 'own boats'],
  ['descubra a opção ideal', 'discover the ideal option'],
  ['for your group, ocasiao e orcamento', 'for your group, occasion and budget'],
  ['for your group e ocasiao', 'for your group and occasion'],
  ['ocasiao', 'occasion'],
  ['orcamento', 'budget'],
  ['Respostas Rapidas', 'Quick Answers'],
  ['Qual a Melhor Boat Para...', 'What Is the Best Boat For...'],
  ['Qual a melhor boat para grupos pequenos', 'What is the best boat for small groups'],
  ['A WeBoat 32 e a melhor opção', 'The WeBoat 32 is the best option'],
  ['oferece o melhor custo-benefício da frota', 'offers the best value in the fleet'],
  ['Perfeita para trips em familia ou com amigos', 'Perfect for family trips or with friends'],
  ['em familia ou com amigos', 'with family or friends'],
  ['Qual a melhor boat para festas e despedidas de solteira', 'What is the best boat for parties and bachelorette parties'],
  ['A WeBoat 390 e a mais indicada', 'The WeBoat 390 is the most recommended'],
  ['espaco versátil', 'versatile space'],
  ['e perfeita para celebracoes', 'and is perfect for celebrations'],
  ['Todas possuem BBQ grill', 'All have BBQ grills'],
  ['Qual a melhor boat para grupos grandes', 'What is the best boat for large groups'],
  ['mais de 20', 'more than 20'],
  ['Qual a melhor boat para um trip premium', 'What is the best boat for a premium trip'],
  ['oferece a experiência mais sofisticada', 'offers the most sophisticated experience'],
  ['Acabamento superior e maior conforto para', 'Superior finishes and greater comfort for'],
  ['Tabela Comparativa', 'Comparison Table'],
  ['Capacidade', 'Capacity'],
  ['Diferencial', 'Standout Feature'],
  ['Versátil para festas', 'Versatile for parties'],
  ['Consultar valores para outros roteiros', 'Contact us for other route pricing'],
  ['Precos promocionais de seg-qui nao sao validos para periodos festivos e feriados', 'Promotional Mon-Thu prices are not valid for holiday periods'],
  ['Todas as boats possuem BBQ grill', 'All boats have BBQ grills'],
  ['taxa adicional de R$ 250 a R$ 600', 'additional fee from R$ 250 to R$ 600'],
  ['Compare Todas as Partner Boats', 'Compare All Partner Boats'],
  ['22 boats parceiras de 10 a 65 people', '22 partner boats from 10 to 65 people'],
  ['Todas com fuel, captain e seguro includeds', 'All with fuel, captain and insurance included'],
  ['Compactas', 'Compact'],
  ['Médias', 'Medium'],
  ['Grandes e Eventos', 'Large &amp; Events'],
  ['Premium e Luxo', 'Premium &amp; Luxury'],
  ['Menor e mais moderna da frota, deslocamento rápido', 'Smallest and most modern in the fleet, fast displacement'],
  ['deslocamento rápido', 'fast displacement'],
  ['Para Quem E Indicada', 'Who It Is For'],
  ['Para Quem Cada Boat E Indicada', 'Who Each Boat Is For'],
  ['Descubra qual boat combina melhor com seu perfil e ocasiao', 'Discover which boat best matches your profile and occasion'],
  ['Indicada para:', 'Recommended for:'],
  ['Ainda tem duvidas sobre qual boat escolher', 'Still have questions about which boat to choose'],
  ['Nossa equipe conhece cada detalhe das embarcações e pode sugerir a opção perfeita', 'Our team knows every detail of the boats and can suggest the perfect option'],
  ['Fale conosco', 'Talk to us'],
  ['Falar com Especialista', 'Talk to a Specialist'],
  ['Atualizado em fevereiro de 2026', 'Updated in February 2026'],
  ['Atualizado em', 'Updated in'],
  ['fevereiro', 'February'],

  // --- How it Works page ---
  ['Como Alugar uma', 'How to Rent a'],
  ['Guia completo em 5 passos para alugar uma', 'Complete 5-step guide to renting a'],
  ['Do primeiro contato pelo WhatsApp', 'From the first WhatsApp contact'],
  ['até o dia do', 'until the day of the'],
  ['Envie uma mensagem pelo WhatsApp', 'Send a message via WhatsApp'],
  ['informando a data desejada', 'with the desired date'],
  ['número de people e ocasião', 'number of people and occasion'],
  ['Com base no seu grupo e preferências', 'Based on your group and preferences'],
  ['recomendamos a melhor', 'we recommend the best'],
  ['Temos 5 own boats e 21 parceiras para grupos de 10 a 65', 'We have 5 own boats and 21 partner boats for groups of 10 to 65'],
  ['Confirme a reserva pagando 50% de sinal', 'Confirm the reservation by paying a 50% deposit'],
  ['Cancelamento com reembolso', 'Cancellation with refund'],
  ['48h antes', '48 hours in advance'],
  ['No dia do', 'On the day of the'],
  ['chegue 15 minutos antes na', 'arrive 15 minutes early at'],
  ['Estacionamento disponível no local', 'Parking available on site'],
  ['Embarque na boat com seu grupo', 'Board the boat with your group'],
  ['conecte sua playlist no', 'connect your playlist to the'],
  ['aproveite o mar do Rio de Janeiro com total conforto e segurança', 'enjoy the sea of Rio de Janeiro with total comfort and safety'],
  ['Documento de identidade', 'ID document'],
  ['RG ou CNH', 'Brazilian ID or driver\'s license'],
  ['Bebidas e petiscos', 'Drinks and snacks'],
  ['opcional', 'optional'],
  ['Boat trips privativos com conforto e segurança', 'Private boat trips with comfort and safety'],
  ['trips de barco', 'boat trips'],
  ['eventos náuticos', 'nautical events'],
  ['turismo náutico', 'nautical tourism'],
  ['A reserva é feita em minutos pelo WhatsApp', 'The reservation is made in minutes via WhatsApp'],
  ['Após escolher a boat e roteiro', 'After choosing the boat and route'],
  ['você paga 50% de sinal', 'you pay a 50% deposit'],
  ['Todas as boats da WeBoat incluem um', 'All WeBoat boats include a'],
  ['Você só precisa embarcar e aproveitar o', 'You just need to board and enjoy the'],
  ['Cancelamentos feitos', 'Cancellations made'],
  ['48 hours antes do', '48 hours before the'],
  ['têm reembolso integral do sinal', 'receive a full refund of the deposit'],
  ['Em caso de mau tempo', 'In case of bad weather'],
  ['reagendamos sem custo adicional', 'we reschedule at no additional cost'],
  ['Leve protetor solar, roupa de banho, toalha e suas bebidas', 'Bring sunscreen, swimwear, a towel and your drinks'],
  ['petiscos', 'snacks'],
  ['A boat já tem', 'The boat already has'],

  // --- BBQ section badges ---
  ['BBQ Grill Disponível', 'BBQ Grill Available'],
  ['BBQ grill disponível', 'BBQ grill available'],
  ['BBQ Grill disponível', 'BBQ Grill Available'],
  ['Boat com BBQ grill para festas', 'Boat with BBQ Grill for Parties'],
  ['Quanto custa usar a BBQ grill on the', 'How much does the BBQ grill cost on the'],

  // --- Misc boat description ---
  ['Vista aérea', 'Aerial view'],
  ['Navegação', 'Navigation'],
  ['Em movimento', 'In motion'],
  ['Cabine', 'Cabin'],
  ['Espaço interno', 'Interior space'],
  ['Popa', 'Stern'],
  ['Vista geral', 'Overall view'],
  ['Faça seu BBQ no mar', 'Have your BBQ on the sea'],
  ['Best value da frota', 'Best value in the fleet'],
  ['Boat versátil para', 'Versatile boat for'],
  ['Maior conforto e acabamento', 'Greater comfort and finishes'],
  ['Nossa maior boat propria para', 'Our largest own boat for'],
  ['Solario, BBQ grill e vista panoramica', 'Solarium, BBQ grill and panoramic view'],
  ['Roteiro', 'Route'],

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
            <li><a href="/en/new-years-eve/">New Year's Eve in Copacabana</a></li>
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

  // 1. Protect non-JSON-LD <script> blocks (GTM, inline JS)
  //    JSON-LD blocks contain translatable text (names, descriptions, FAQ answers)
  html = html.replace(/<script(?![^>]*type\s*=\s*["']application\/ld\+json["'])[\s\S]*?<\/script>/gi, protect);

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
