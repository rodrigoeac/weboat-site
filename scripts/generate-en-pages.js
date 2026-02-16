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
  // Homepage
  {
    ptPath: 'index.html',
    enPath: 'en/index.html',
    title: 'Boat Rental in Rio de Janeiro | WeBoat Brasil',
    description: 'Boat rental in Rio de Janeiro with 5 own boats. Private boat trips for parties, birthdays, and bachelorette parties. 1,000+ 5-star reviews. Book now!',
    keywords: 'boat rental rio de janeiro, boat trip rio, rent a boat rio, marina da gloria boat, private boat charter rio, birthday party boat, bachelorette party boat rio',
    waMessage: 'Hello! I would like information about boat rental in Rio de Janeiro. [via site - en]',
    css: 'home',
    isHomepage: true,
    contentBlocks: [
      // ── LONG BLOCKS FIRST (must run before short fragments to avoid substring corruption) ──
      // FAQ section title (must come BEFORE ['Aluguel de Lancha no Rio de Janeiro', '...'] which corrupts it)
      ['Dúvidas sobre Aluguel de Lancha no Rio de Janeiro', 'Frequently Asked Questions about Boat Rental in Rio de Janeiro'],
      // Schema.org WebSite description (mixed PT/EN after dictionary)
      ['"description": "Aluguel de lanchas no Rio de Janeiro para passeios privativos"', '"description": "Boat rentals in Rio de Janeiro for private trips"'],
      // Schema.org Product names (mixed PT/EN after dictionary)
      ['"name": "Lancha para até 22 pessoas"', '"name": "Boat for up to 22 people"'],
      ['"name": "Lancha para até 65 pessoas"', '"name": "Boat for up to 65 people"'],
      // Alt text (NOT protected by translateContent - alt is not in protection regex)
      ['Marinheiro WeBoat com camisa da empresa e Cristo Redentor ao fundo', 'WeBoat captain in company shirt with Christ the Redeemer in the background'],
      ['Amigas brindando com drinks no open bar da lancha', 'Friends toasting with drinks at the open bar on the boat'],
      ['Decoração de aniversário na lancha com balões verdes e letreiro Happy Birthday', 'Birthday decoration on the boat with green balloons and Happy Birthday sign'],
      ['WeBoat 390 - Lancha para 16 pessoas com churrasqueira', 'WeBoat 390 - Boat for 16 people with BBQ grill'],
      ['Barco Gourmet 53 - Eventos para 30-40 pessoas', 'Barco Gourmet 53 - Event boat for 30-40 people'],
      ['WeBoat Malik - Eventos para 35-50 pessoas', 'WeBoat Malik - Event boat for 35-50 people'],
      ['Schaefer 62 Fly na Marina da Glória com Pão de Açúcar ao fundo', 'Schaefer 62 Fly at Marina da Gloria with Sugarloaf Mountain in the background'],
      ['Churrasco sendo preparado a bordo da lancha', 'BBQ being prepared on board the boat'],
      ['Combo churrasco e open bar na lancha', 'BBQ and open bar combo on the boat'],
      // Partner yacht features (not protected)
      ['60 pés, ar-condicionado, gerador, acabamento premium', '60 feet, air conditioning, generator, premium finish'],
      ['62 pés, flybridge, ar-condicionado, gerador', '62 feet, flybridge, air conditioning, generator'],
      ['60 pés, flybridge, ar-condicionado, gerador', '60 feet, flybridge, air conditioning, generator'],
      ['Nossa maior lancha para 22 pessoas', 'Our largest boat for 22 people'],
      // Visible FAQ continuation (non-bold text after <strong> block)
      ['Você só paga extra pelos opcionais como churrasco (R$ 250-600), decoração e open bar.', 'You only pay extra for optional add-ons like BBQ (R$ 250-600), decoration and open bar.'],
      // Schema.org FAQ full answers (JSON-LD is NOT protected by translateContent)
      ['O aluguel de lancha no Rio de Janeiro custa a partir de R$ 2.300 para 5 horas de passeio. O preço varia conforme o tamanho da lancha (de 10 a 65 pessoas), dia da semana (seg-qui é mais barato que sex-dom) e roteiro escolhido. Combustível, marinheiro e equipamentos estão inclusos.', 'Boat rental in Rio de Janeiro starts at R$ 2,300 for a 5-hour trip. Prices vary by boat size (10 to 65 people), day of the week (Mon-Thu is cheaper than Fri-Sun) and chosen route. Fuel, captain and equipment are included.'],
      ['Todos os passeios incluem combustível, marinheiro experiente, coolers, som Bluetooth, tapete flutuante, macarrões e coletes salva-vidas. Você só paga extra pelos opcionais como churrasco (R$ 250-600), decoração e open bar.', 'All trips include fuel, experienced captain, coolers, Bluetooth speakers, floating mat, pool noodles and life jackets. You only pay extra for optional add-ons like BBQ (R$ 250-600), decoration and open bar.'],
      ['É simples: você escolhe a lancha, define data e roteiro, paga 50% de sinal para reservar, e no dia combina com o marinheiro na Marina da Glória. O passeio dura de 3 a 7 horas dependendo do roteiro. Pode levar bebidas e comidas a bordo.', 'It\'s simple: choose your boat, set the date and route, pay a 50% deposit to reserve, and meet the captain at Marina da Gloria on the day. Trips last 3-7 hours depending on the route. You can bring your own food and drinks on board.'],
      ['A despedida de solteira na lancha é um dos passeios mais pedidos. Oferecemos pacotes com decoração temática, drinks e até brincadeiras. Ideal para grupos de 8 a 20 amigas. Roteiro mais popular: Mureta da Urca com parada para fotos no Pão de Açúcar.', 'A bachelorette party on a boat is one of our most popular trips. We offer packages with themed decoration, drinks and party games. Ideal for groups of 8-20 friends. Most popular route: Mureta da Urca with a photo stop at Sugarloaf Mountain.'],
      ['Se as condições climáticas impedirem o passeio, você pode remarcar para outra data sem custo ou solicitar reembolso integral. Chuva fraca não cancela. A decisão é tomada em conjunto com o marinheiro no dia, considerando segurança.', 'If weather conditions prevent the trip, you can reschedule for another date at no cost or request a full refund. Light rain does not cancel the trip. The decision is made together with the captain on the day, considering safety.'],
      ['A Marina da Glória fica na Av. Infante Dom Henrique, S/N, no Aterro do Flamengo, Rio de Janeiro. É o ponto de partida de todos os nossos passeios. Há estacionamento pago no local. Fácil acesso pelo metrô (estação Glória) ou Uber.', 'Marina da Gloria is located at Av. Infante Dom Henrique, S/N, in Aterro do Flamengo, Rio de Janeiro. It is the departure point for all our trips. There is paid parking on site. Easy access by metro (Gloria station) or Uber.'],
      // Schema.org LocalBusiness description
      ['Empresa de aluguel de lanchas no Rio de Janeiro especializada em passeios privativos. Oferece lanchas de 10 a 65 pessoas para festas, despedidas de solteira, aniversários e eventos corporativos, saindo da Marina da Glória.', 'Boat rental company in Rio de Janeiro specializing in private trips. Offering boats for 10-65 people for parties, bachelorette parties, birthdays and corporate events, departing from Marina da Gloria.'],
      // Schema.org slogan
      ['"slogan": "Seu momento no mar do Rio"', '"slogan": "Your moment at sea in Rio"'],
      // Schema.org knowsAbout
      ['"passeio de barco Rio de Janeiro"', '"boat trip Rio de Janeiro"'],
      ['"festa na lancha"', '"party on a boat"'],
      ['"despedida de solteira no mar"', '"bachelorette party at sea"'],
      ['"aniversário em lancha"', '"birthday on a boat"'],
      ['"evento corporativo náutico"', '"corporate nautical event"'],
      ['"réveillon em Copacabana"', '"New Year\'s Eve in Copacabana"'],
      ['"roteiro Ilhas Cagarras"', '"Cagarras Islands route"'],
      ['"roteiro Mureta da Urca"', '"Mureta da Urca route"'],
      ['"passeio Copacabana de lancha"', '"Copacabana boat trip"'],
      // Diferenciais multiline blocks (must come before 'lanchas próprias' short block)
      ['5 lanchas próprias para aluguel no Rio de Janeiro.\n                  Não dependemos de terceiros para seu passeio privativo.', '5 own boats for rent in Rio de Janeiro.\n                  We don\'t depend on third parties for your private trip.'],
      ['Nossa base fica na Marina da Glória.\n                  Estrutura completa para receber você e seu grupo.', 'Our base is at Marina da Gloria.\n                  Complete facilities to welcome you and your group.'],
      ['9 funcionários dedicados ao seu passeio de lancha.\n                  Marinheiros habilitados e suporte completo.', '9 dedicated staff for your boat trip.\n                  Licensed captains and full support.'],
      ['Manutenção preventiva para todas as lanchas.\n                  Seu passeio de barco privativo com segurança.', 'Preventive maintenance for all boats.\n                  Your private boat trip with safety.'],
      ['Maior número de avaliações positivas entre empresas de\n                  aluguel de lancha no Rio de Janeiro.', 'Highest number of positive reviews among boat\n                  rental companies in Rio de Janeiro.'],
      ['Conheça nossa frota de lanchas para aluguel no Rio de Janeiro.\n            Temos opções para grupos de 2 a 65 pessoas. Todas as embarcações\n            são vistoriadas e preparadas para seu passeio privativo.', 'Explore our fleet of boats available for rent in Rio de Janeiro.\n            We have options for groups of 2 to 65 people. All vessels are\n            inspected and prepared for your private trip.'],
      ['Organizando um evento corporativo, festa ou confraternização grande?\n            Temos embarcações para grupos de 30 a 65 pessoas com toda estrutura necessária.', 'Organizing a corporate event, party or large celebration?\n            We have vessels for groups of 30 to 65 people with all the necessary facilities.'],
      ['Sofisticação e conforto para quem busca uma experiência exclusiva.\n            Iates acima de 60 pés com ar-condicionado, gerador e acabamento premium.', 'Sophistication and comfort for those seeking an exclusive experience.\n            Yachts over 60 feet with air conditioning, generator and premium finish.'],
      ['Escolha o roteiro ideal para seu passeio de barco privativo no Rio de Janeiro.\n            Do passeio de lancha na Urca até as Ilhas Cagarras, temos opções para\n            todos os gostos e bolsos.', 'Choose the ideal route for your private boat trip in Rio de Janeiro.\n            From a boat trip in Urca to the Cagarras Islands, we have options for\n            all tastes and budgets.'],
      ['Somos mais que uma empresa de aluguel de lancha no RJ. Somos especialistas\n            em criar experiências inesquecíveis no mar.', 'We are more than a boat rental company in Rio. We are specialists\n            in creating unforgettable experiences at sea.'],
      ['Personalize seu aluguel de lancha no RJ com nossos serviços exclusivos.\n            Churrasco, open bar, decoração e muito mais.', 'Customize your boat rental in Rio with our exclusive services.\n            BBQ, open bar, decoration and much more.'],
      ['Solicite um orçamento para aluguel de lancha no RJ em minutos.\n            Nossa equipe vai sugerir a melhor lancha para seu grupo e ocasião.', 'Request a quote for boat rental in Rio in minutes.\n            Our team will suggest the best boat for your group and occasion.'],
      ['O preço varia conforme o tamanho da lancha (de 10 a 65 pessoas), dia da semana (seg-qui é mais barato que sex-dom) e roteiro escolhido. Combustível, marinheiro e equipamentos estão inclusos.', 'Prices vary by boat size (10 to 65 people), day of the week (Mon-Thu is cheaper than Fri-Sun) and chosen route. Fuel, captain and equipment are included.'],
      // FAQ accordion continuation text (non-bold portions)
      ['O passeio dura de 3 a 7 horas dependendo do roteiro. Pode levar bebidas e comidas a bordo.', 'Trips last 3-7 hours depending on the route. You can bring your own food and drinks on board.'],
      ['Ideal para grupos de 8 a 20 amigas. Roteiro mais popular: Mureta da Urca com parada para fotos no Pão de Açúcar.', 'Ideal for groups of 8-20 friends. Most popular route: Mureta da Urca with a photo stop at Sugarloaf Mountain.'],
      ['Chuva fraca não cancela. A decisão é tomada em conjunto com o marinheiro no dia, considerando segurança.', 'Light rain does not cancel the trip. The decision is made together with the captain on the day, considering safety.'],
      ['É o ponto de partida de todos os nossos passeios. Há estacionamento pago no local. Fácil acesso pelo metrô (estação Glória) ou Uber.', 'It is the departure point for all our trips. There is paid parking on site. Easy access by metro (Gloria station) or Uber.'],
      // FAQ accordion list items
      ['<li>Escolha a lancha ideal para o tamanho do seu grupo</li>', '<li>Choose the ideal boat for your group size</li>'],
      ['<li>Defina a data e o roteiro (Urca, Copacabana, Ilhas Cagarras...)</li>', '<li>Set the date and route (Urca, Copacabana, Cagarras Islands...)</li>'],
      ['<li>Pague 50% de sinal via PIX ou cartão</li>', '<li>Pay a 50% deposit via PIX or credit card</li>'],
      ['<li>No dia, encontre o marinheiro na Marina da Glória às 8h ou 14h</li>', '<li>On the day, meet the captain at Marina da Gloria at 8am or 2pm</li>'],
      ['<li>Aproveite o passeio e pague o restante no final</li>', '<li>Enjoy the trip and pay the remainder at the end</li>'],
      ['<li>Decoração rosa e branca (opcional)</li>', '<li>Pink and white decoration (optional)</li>'],
      ['<li>Drinks e espumante (open bar opcional)</li>', '<li>Drinks and sparkling wine (open bar optional)</li>'],
      ['<li>Som com playlist personalizada</li>', '<li>Sound system with custom playlist</li>'],
      ['<li>Parada para fotos com cenário icônico</li>', '<li>Photo stop with iconic scenery</li>'],
      ['Ver pacotes de despedida de solteira', 'View bachelorette party packages'],
      ['Ver mapa e como chegar', 'View map and directions'],
      ['Combustível para o roteiro completo', 'Fuel for the entire route'],
      ['Som Bluetooth conectado', 'Bluetooth speakers connected'],
      ['Tapete e macarrões flutuantes', 'Floating mat and pool noodles'],
      ['Seguro obrigatório', 'Mandatory insurance'],
      ['Coolers (gelo não incluso)', 'Coolers (ice not included)'],
      ['<li>Marinheiro habilitado pela Marinha</li>', '<li>Captain licensed by the Brazilian Navy</li>'],
      ['<strong>Lanchas pequenas (até 15 pessoas):</strong> R$ 2.300 a R$ 2.700', '<strong>Small boats (up to 15 people):</strong> R$ 2,300 to R$ 2,700'],
      ['<strong>Lanchas médias (16-22 pessoas):</strong> R$ 2.600 a R$ 4.500', '<strong>Medium boats (16-22 people):</strong> R$ 2,600 to R$ 4,500'],
      ['<strong>Lanchas grandes (até 65 pessoas):</strong> sob consulta', '<strong>Large boats (up to 65 people):</strong> upon request'],
      // ── SHORT BLOCKS (run after long ones) ──
      // FAQ answer (must precede '5 horas' → '5 hours' to avoid substring corruption)
      ['O aluguel de lancha no Rio de Janeiro custa a partir de R$ 2.300 para 5 horas de passeio.', 'Boat rental in Rio de Janeiro starts at R$ 2,300 for a 5-hour trip.'],
      // Hero
      ['Marina da Glória, Rio de Janeiro', 'Marina da Gloria, Rio de Janeiro'],
      ['Aluguel de Lancha no Rio de Janeiro', 'Boat Rental in Rio de Janeiro'],
      ['Passeio privativo de lancha com as melhores vistas do mundo.\n          Do Pão de Açúcar às Ilhas Cagarras, viva experiências inesquecíveis\n          no mar com conforto e segurança.', 'Private boat trips with the most stunning views in the world.\n          From Sugarloaf Mountain to Cagarras Islands, live unforgettable\n          experiences at sea with comfort and safety.'],
      ['Alugar Lancha Agora', 'Rent a Boat Now'],
      ['Ver Lanchas', 'View Boats'],
      ['Role para descobrir', 'Scroll to discover'],
      // Social proof
      ['passeios realizados', 'trips completed'],
      ['lanchas próprias', 'own boats'],
      ['avaliações 5 estrelas', '5-star reviews'],
      ['seguidores no Instagram', 'Instagram followers'],
      // Lanchas section
      ['Lanchas para Alugar no Rio de Janeiro', 'Boats for Rent in Rio de Janeiro'],
      ['Própria WeBoat', 'WeBoat Owned'],
      ['Até 15 pessoas', 'Up to 15 people'],
      ['Até 16 pessoas', 'Up to 16 people'],
      ['Até 14 pessoas', 'Up to 14 people'],
      ['Até 12 pessoas', 'Up to 12 people'],
      ['Até 22 pessoas', 'Up to 22 people'],
      ['Combustível incluso', 'Fuel included'],
      ['Som Bluetooth', 'Bluetooth speakers'],
      ['Tapete flutuante', 'Floating mat'],
      ['Churrasqueira', 'BBQ grill'],
      ['Conforto premium', 'Premium comfort'],
      ['Flybridge exclusivo', 'Exclusive flybridge'],
      ['Maior capacidade', 'Largest capacity'],
      // IMPORTANT: full-sentence blocks with seg-qui/sex-dom MUST come BEFORE the short replacements
      ['*Valores para o Roteiro 1 - Mureta da Urca. Consulte valores para outros roteiros.', '*Prices for Route 1 - Mureta da Urca. Contact us for other route prices.'],
      ['*Valores promocionais de seg-qui não são válidos para períodos festivos e feriados.', '*Promotional Mon-Thu prices are not valid during festive periods and holidays.'],
      ['seg-qui', 'Mon-Thu'],
      ['sex-dom', 'Fri-Sun'],
      ['Ver Detalhes', 'View Details'],
      ['Ver Todas as Lanchas', 'View All Boats'],
      // Eventos 30+ section
      ['Grandes Grupos', 'Large Groups'],
      ['Lanchas para Eventos e Festas (30+ pessoas)', 'Boats for Events and Parties (30+ people)'],
      ['30-40 pessoas', '30-40 people'],
      ['35-50 pessoas', '35-50 people'],
      ['50-65 pessoas', '50-65 people'],
      ['Ideal para eventos corporativos e festas', 'Ideal for corporate events and parties'],
      ['4 caixas PZ ativas + gerador incluso', '4 active PZ speakers + generator included'],
      ['Nossa maior embarcação com gerador', 'Our largest vessel with generator'],
      ['a partir de', 'from'],
      ['Solicitar Orçamento para Evento', 'Request Quote for Event'],
      // Iates de Luxo section
      ['Experiência Premium', 'Premium Experience'],
      ['Iates de Luxo', 'Luxury Yachts'],
      ['até 12 pessoas', 'up to 12 people'],
      ['até 16 pessoas', 'up to 16 people'],
      ['até 17 pessoas', 'up to 17 people'],
      ['Solicitar Orçamento para Iate', 'Request Quote for Yacht'],
      // Roteiros section
      ['Roteiros de Passeio de Lancha no Rio de Janeiro', 'Boat Trip Routes in Rio de Janeiro'],
      ['Melhor custo-benefício', 'Best value'],
      ['Roteiro 1 - Mureta da Urca', 'Route 1 - Mureta da Urca'],
      ['Marina da Glória, Flamengo, Botafogo e Urca. Parada para mergulho na Mureta da Urca.', 'Marina da Gloria, Flamengo, Botafogo and Urca. Stop for swimming at Mureta da Urca.'],
      ['5 horas', '5 hours'],
      ['1 parada', '1 stop'],
      ['Mais vendido', 'Best seller'],
      ['Roteiro 2 - Praia Vermelha', 'Route 2 - Praia Vermelha'],
      ['Tudo do Roteiro 1 + Praia Vermelha. Vista do Pão de Açúcar e mergulho em águas calmas.', 'Everything from Route 1 + Praia Vermelha. View of Sugarloaf Mountain and swimming in calm waters.'],
      ['2 paradas', '2 stops'],
      ['Vista icônica', 'Iconic view'],
      ['Roteiro 3 - Copacabana', 'Route 3 - Copacabana'],
      ['Tudo do Roteiro 2 + Orla de Copacabana. Fotos incríveis da praia mais famosa do Brasil.', 'Everything from Route 2 + Copacabana coastline. Amazing photos of Brazil\'s most famous beach.'],
      ['Mar aberto', 'Open sea'],
      ['Roteiro 4 - Ilhas Cagarras', 'Route 4 - Cagarras Islands'],
      ['Tudo do Roteiro 3 + Ilhas Cagarras. Navegação oceânica e mergulho em águas cristalinas.', 'Everything from Route 3 + Cagarras Islands. Ocean navigation and swimming in crystal clear waters.'],
      ['3 paradas', '3 stops'],
      ['Praias desertas', 'Secluded beaches'],
      ['Roteiro 5 - Itaipu e Camboinhas', 'Route 5 - Itaipu and Camboinhas'],
      ['Marina, Piratininga, Camboinhas e Itaipu. Praias semi-desertas em Niterói.', 'Marina, Piratininga, Camboinhas and Itaipu. Semi-secluded beaches in Niteroi.'],
      ['Experiência completa', 'Complete experience'],
      ['Roteiro 6 - Volta Completa', 'Route 6 - Full Tour'],
      ['O melhor do Rio de Janeiro em um único passeio. Todos os pontos turísticos do mar.', 'The best of Rio de Janeiro in a single trip. All the landmarks from the sea.'],
      ['4+ paradas', '4+ stops'],
      ['Ver Roteiro', 'View Route'],
      ['Ver Todos os Roteiros', 'View All Routes'],
      // Diferenciais section
      ['Por que WeBoat', 'Why WeBoat'],
      ['Por que escolher a WeBoat para alugar lancha no Rio de Janeiro?', 'Why choose WeBoat for boat rental in Rio de Janeiro?'],
      ['Frota Própria de Lanchas', 'Own Boat Fleet'],
      ['Loja na Marina da Glória', 'Store at Marina da Gloria'],
      ['Equipe Especializada', 'Specialized Team'],
      ['Mecânico Próprio', 'In-House Mechanic'],
      ['+1.000 Avaliações 5 Estrelas', '+1,000 5-Star Reviews'],
      // Serviços section
      ['Serviços para seu Passeio de Lancha', 'Services for your Boat Trip'],
      ['Churrasco a Bordo', 'BBQ on Board'],
      ['Carnes premium preparadas a bordo durante seu passeio. Churrasqueiro dedicado incluso.', 'Premium meats prepared on board during your trip. Dedicated BBQ chef included.'],
      ['Drinks clássicos e cerveja gelada durante todo o passeio. Barman incluso.', 'Classic cocktails and cold beer throughout the trip. Bartender included.'],
      ['Mais Pedido', 'Most Popular'],
      ['Combo Churrasco + Open Bar', 'BBQ + Open Bar Combo'],
      ['A combinação perfeita: churrasco completo com open bar durante todo o passeio.', 'The perfect combination: complete BBQ with open bar throughout the trip.'],
      ['Decoração e Festas', 'Decoration and Parties'],
      ['Decoração temática para aniversários, despedidas e pedidos de casamento.', 'Themed decoration for birthdays, bachelorette parties and wedding proposals.'],
      ['/ pessoa', '/ person'],
      ['/ pacote', '/ package'],
      ['*Valores variam de acordo com a quantidade de pessoas e tamanho da lancha.', '*Prices vary according to the number of people and boat size.'],
      ['Saiba Mais', 'Learn More'],
      ['Ver Todos os Serviços', 'View All Services'],
      // Avaliações section
      ['Experiências Reais', 'Real Experiences'],
      ['+1.000 Avaliações 5 Estrelas no Google', '+1,000 5-Star Reviews on Google'],
      ['Histórias de quem já viveu momentos inesquecíveis com a WeBoat Brasil.', 'Stories from those who have lived unforgettable moments with WeBoat Brasil.'],
      // FAQ section (title moved to top of contentBlocks — ordering fix)
      ['Quanto custa alugar uma lancha no Rio de Janeiro?', 'How much does it cost to rent a boat in Rio de Janeiro?'],
      ['O aluguel de lancha no Rio de Janeiro custa a partir de R$ 2.300 para 5 horas de passeio.', 'Boat rental in Rio de Janeiro starts at R$ 2,300 for a 5-hour trip.'],
      ['O que está incluso no aluguel de lancha no RJ?', 'What is included in the boat rental?'],
      ['Todos os passeios incluem combustível, marinheiro experiente, coolers, som Bluetooth, tapete flutuante, macarrões e coletes salva-vidas.', 'All trips include fuel, experienced captain, coolers, Bluetooth speakers, floating mat, pool noodles and life jackets.'],
      ['Como funciona o aluguel de lancha na WeBoat?', 'How does boat rental work at WeBoat?'],
      ['É simples: você escolhe a lancha, define data e roteiro, paga 50% de sinal para reservar, e no dia combina com o marinheiro na Marina da Glória.', 'It\'s simple: choose your boat, set the date and route, pay a 50% deposit to reserve, and meet the captain at Marina da Gloria on the day.'],
      ['Como funciona a despedida de solteira na lancha?', 'How does a bachelorette party on a boat work?'],
      ['A despedida de solteira na lancha é um dos passeios mais pedidos. Oferecemos pacotes com decoração temática, drinks e até brincadeiras.', 'A bachelorette party on a boat is one of our most popular trips. We offer packages with themed decoration, drinks and party games.'],
      ['E se chover no dia do passeio de lancha?', 'What happens if it rains on the day of the trip?'],
      ['Se as condições climáticas impedirem o passeio, você pode remarcar para outra data sem custo ou solicitar reembolso integral.', 'If weather conditions prevent the trip, you can reschedule for another date at no cost or request a full refund.'],
      ['Onde fica a Marina da Glória?', 'Where is Marina da Gloria located?'],
      ['A Marina da Glória fica na Av. Infante Dom Henrique, S/N, no Aterro do Flamengo, Rio de Janeiro.', 'Marina da Gloria is located at Av. Infante Dom Henrique, S/N, in Aterro do Flamengo, Rio de Janeiro.'],
      ['Ver Todas as Dúvidas', 'View All Questions'],
      // CTA Final
      ['Pronto para seu Passeio de Lancha no Rio de Janeiro?', 'Ready for your Boat Trip in Rio de Janeiro?'],
      ['Falar no WhatsApp', 'Chat on WhatsApp'],
      ['Ver Formulário', 'View Form'],
    ],
  },
  // Phase 3: Fleet
  {
    ptPath: 'lanchas/index.html',
    enPath: 'en/boats/index.html',
    title: 'Boats for Rent in Rio de Janeiro | WeBoat Brasil Fleet',
    description: 'Rent a boat in Rio de Janeiro. 5 own boats + partner vessels for groups of 10 to 65 people. From R$ 2,300. Fuel included. Book now!',
    keywords: 'boats for rent rio de janeiro, boat rental RJ, boat fleet, weboat boats, charter boat rio',
    waMessage: 'Hello! I would like information about your boat fleet. [via site - en]',
    css: 'frota',
    contentBlocks: [
      // Schema.org ItemList description (must come first — longest strings)
      ['"description": "26 lanchas para aluguel no RJ. 5 próprias e 21 parceiras para grupos de 10 a 65 pessoas."', '"description": "26 boats for rent in RJ. 5 own and 21 partner boats for groups of 10 to 65 people."'],
      // Visible HTML — page subtitle (contains short words that dictionary would garble)
      ['5 lanchas próprias e 21 parceiras para grupos de 10 a 65 pessoas.', '5 own boats and 21 partner boats for groups of 10 to 65 people.'],
      // Visible HTML — FAQ answer with <strong> (different from Schema version without <strong>)
      ['<strong>A escolha depende do tamanho do grupo: até 15 pessoas, WeBoat 32 ou Oceanic 36. Até 22 pessoas, Rio Star 50. Para grupos de 30 a 65 pessoas, temos catamarãs e barcos para eventos.</strong>', '<strong>The choice depends on the group size: up to 15 people, WeBoat 32 or Oceanic 36. Up to 22 people, Rio Star 50. For groups of 30 to 65 people, we have catamarans and boats for events.</strong>'],
      // Schema.org FAQ names (partially translated by dictionary — need exact match)
      ['"name": "Posso levar minhas próprias bebidas e comidas?"', '"name": "Can I bring my own drinks and food?"'],
      ['"name": "Qual a diferença entre lanchas próprias e parceiras?"', '"name": "What is the difference between own and partner boats?"'],
      ['"name": "Como faço para reservar uma lancha?"', '"name": "How do I book a boat?"'],
      // Schema.org FAQ answers (plain text — must come first to avoid word salad)
      ['"text": "A escolha depende do tamanho do grupo: até 15 pessoas, WeBoat 32 ou Oceanic 36. Até 22 pessoas, Rio Star 50. Para grupos de 30 a 65 pessoas, temos catamarãs e barcos para eventos. Se quiser churrasco a bordo, todas as lanchas possuem churrasqueira (taxa adicional de R$ 250 a R$ 600)."', '"text": "The choice depends on the group size: up to 15 people, WeBoat 32 or Oceanic 36. Up to 22 people, Rio Star 50. For groups of 30 to 65 people, we have catamarans and boats for events. If you want BBQ on board, all boats have a BBQ grill (additional fee from R$ 250 to R$ 600)."'],
      ['"text": "Todas as lanchas incluem combustível para o roteiro, marinheiro habilitado pela Marinha, coolers, som Bluetooth, tapete flutuante, macarrões e coletes salva-vidas. Você só paga extra por opcionais como churrasco, decoração e open bar."', '"text": "All boats include fuel for the route, captain licensed by the Brazilian Navy, coolers, Bluetooth speakers, floating mat, pool noodles and life jackets. You only pay extra for extras like BBQ, decoration and open bar."'],
      ['"text": "Os valores de segunda a quinta são promocionais porque a demanda é menor. Sexta, sábado e domingo têm alta procura. Por exemplo, a WeBoat 32 custa R$ 2.300 seg-qui e R$ 2.700 sex-dom - economia de R$ 400."', '"text": "Monday to Thursday prices are promotional because demand is lower. Friday, Saturday and Sunday have high demand. For example, the WeBoat 32 costs R$ 2,300 Mon-Thu and R$ 2,700 Fri-Sun - savings of R$ 400."'],
      ['"text": "Sim, você pode trazer bebidas e petiscos sem custo adicional. As lanchas possuem coolers para armazenamento (gelo não incluso). Todas as lanchas possuem churrasqueira, mas o uso requer contratação de serviço adicional (R$ 250 a R$ 600)."', '"text": "Yes, you can bring your own drinks and snacks at no extra cost. The boats have coolers for storage (ice not included). All boats have a BBQ grill, but using it requires an additional service fee (R$ 250 to R$ 600)."'],
      ['"text": "As 5 lanchas próprias WeBoat têm prioridade no agendamento e atendimento direto da nossa equipe. As 21 lanchas parceiras ampliam as opções para grupos maiores e ocasiões especiais. Todas passam pela mesma vistoria de segurança e oferecem o padrão WeBoat de qualidade."', '"text": "The 5 own WeBoat boats have priority in scheduling and direct service from our team. The 21 partner boats expand options for larger groups and special occasions. All undergo the same safety inspection and offer the WeBoat quality standard."'],
      ['"text": "Entre em contato pelo WhatsApp (21) 97772-4114, informe a data, número de pessoas e roteiro desejado. Reservamos com 50% de sinal via PIX ou cartão. O restante é pago no dia do passeio. Cancelamento com reembolso até 48h antes."', '"text": "Contact us via WhatsApp (21) 97772-4114, provide the date, number of people and desired route. We book with a 50% deposit via PIX or credit card. The remainder is paid on the day of the trip. Cancellation with refund up to 48 hours before."'],
      // Visible HTML — FAQ answers (long strings first to avoid word salad)
      ['"name": "Qual lancha é melhor para meu grupo?"', '"name": "Which boat is best for my group?"'],
      ['Qual lancha é melhor para meu grupo?', 'Which boat is best for my group?'],
      ['Se quiser churrasco a bordo, todas as lanchas possuem churrasqueira (taxa adicional de R$ 250 a R$ 600).', 'If you want BBQ on board, all boats have a BBQ grill (additional fee from R$ 250 to R$ 600).'],
      ['<strong>Todas as lanchas incluem combustível para o roteiro, marinheiro habilitado pela Marinha, coolers, som Bluetooth, tapete flutuante, macarrões e coletes salva-vidas.</strong>', '<strong>All boats include fuel for the route, captain licensed by the Brazilian Navy, coolers, Bluetooth speakers, floating mat, pool noodles and life jackets.</strong>'],
      ['Você só paga extra por opcionais como churrasco, decoração e open bar.', 'You only pay extra for optional add-ons like BBQ, decoration and open bar.'],
      ['Por que os preços são diferentes de segunda a quinta?', 'Why are prices different Monday to Thursday?'],
      ['<strong>Os valores de segunda a quinta são promocionais porque a demanda é menor. Sexta, sábado e domingo têm alta procura.</strong>', '<strong>Monday to Thursday prices are promotional because demand is lower. Friday, Saturday and Sunday have high demand.</strong>'],
      ['Por exemplo, a WeBoat 32 custa R$ 2.300 seg-qui e R$ 2.700 sex-dom - economia de R$ 400.', 'For example, the WeBoat 32 costs R$ 2,300 Mon-Thu and R$ 2,700 Fri-Sun - savings of R$ 400.'],
      ['<strong>Sim, você pode trazer bebidas e petiscos sem custo adicional. As lanchas possuem coolers para armazenamento (gelo não incluso).</strong>', '<strong>Yes, you can bring your own drinks and snacks at no extra cost. The boats have coolers for storage (ice not included).</strong>'],
      ['Todas as lanchas possuem churrasqueira, mas o uso requer contratação de serviço adicional (R$ 250 a R$ 600).', 'All boats have a BBQ grill, but using it requires an additional service fee (R$ 250 to R$ 600).'],
      // Visible HTML — intro/notes
      ['Todas as embarcações são vistoriadas e preparadas para seu passeio privativo.', 'All vessels are inspected and prepared for your private trip.'],
      ['Prioridade no aluguel e melhor atendimento', 'Priority rental and best service'],
      ['Prioridade no agendamento e melhor atendimento', 'Priority scheduling and best service'],
      ['*Valores para o Roteiro 1 - Mureta da Urca. Consulte valores para outros roteiros.', '*Prices for Route 1 - Mureta da Urca. Contact us for other route prices.'],
      ['*Valores promocionais de seg-qui não são válidos para períodos festivos e feriados.', '*Promotional Mon-Thu prices are not valid during festive periods and holidays.'],
      ['Veja a opinião de quem já alugou nossas lanchas e viveu essa experiência.', 'See what our clients who have rented our boats and lived this experience have to say.'],
      // Visible HTML — partner section
      ['Todas passam pela mesma vistoria de segurança e oferecem o padrão WeBoat de qualidade.', 'All undergo the same safety inspection and offer the WeBoat quality standard.'],
      // Visible FAQ answer — "Como reservar" (MUST come BEFORE ['pessoas','people'] to avoid corruption)
      ['<strong>Entre em contato pelo WhatsApp (21) 97772-4114, informe a data, número de pessoas e roteiro desejado. Reservamos com 50% de sinal via PIX ou cartão.</strong>', '<strong>Contact us via WhatsApp (21) 97772-4114, let us know the date, number of people and desired route. We book with a 50% deposit via PIX or credit card.</strong>'],
      ['O restante é pago no dia do passeio. Cancelamento com reembolso até 48h antes.', 'The remainder is paid on the day of the trip. Cancellation with refund up to 48 hours in advance.'],
      // alt text (boat cards — full strings BEFORE short entries like 'pessoas' -> 'people')
      ['Nossa maior lancha para 20-22 pessoas', 'Our largest boat for 20-22 people'],
      ['Lancha para 15 pessoas', 'Boat for 15 people'],
      ['Lancha com churrasqueira para 16 pessoas', 'Boat with BBQ grill for 16 people'],
      ['Lancha premium para 14 pessoas', 'Premium boat for 14 people'],
      ['Lancha com flybridge para 12 pessoas', 'Boat with flybridge for 12 people'],
      ['Lancha para 14 pessoas', 'Boat for 14 people'],
      ['Lancha para 12 pessoas', 'Boat for 12 people'],
      ['Lancha para 10 pessoas', 'Boat for 10 people'],
      ['Lancha para 11 pessoas', 'Boat for 11 people'],
      ['Lancha para 16 pessoas', 'Boat for 16 people'],
      ['Lancha para 16-22 pessoas', 'Boat for 16-22 people'],
      ['Lancha para 18 pessoas', 'Boat for 18 people'],
      ['Lancha para 18-20 pessoas', 'Boat for 18-20 people'],
      ['Lancha para 25 pessoas', 'Boat for 25 people'],
      ['Lancha com ar-condicionado para 20 pessoas', 'Boat with air conditioning for 20 people'],
      ['Lancha com ar-condicionado para 22 pessoas', 'Boat with air conditioning for 22 people'],
      ['Lancha com ar-condicionado para 18-22 pessoas', 'Boat with air conditioning for 18-22 people'],
      ['Catamarã para 50-65 pessoas', 'Catamaran for 50-65 people'],
      // Partner boat alt text with location
      ['Schaefer 62 Fly na Marina da Glória com Pão de Açúcar ao fundo', 'Schaefer 62 Fly at Marina da Gloria with Sugarloaf Mountain in the background'],
      // Header
      ['Nossa Frota', 'Our Fleet'],
      ['Lanchas para Aluguel no Rio de Janeiro', 'Boats for Rent in Rio de Janeiro'],
      ['Conheça nossas lanchas próprias e parceiras. De 10 a 65 pessoas, para todos os tipos de passeio e ocasião.', 'Discover our own and partner boats. From 10 to 65 people, for all types of trips and occasions.'],
      // Info bar
      ['Lanchas Próprias', 'Own Boats'],
      ['Lanchas Parceiras', 'Partner Boats'],
      ['pessoas', 'people'],
      ['Combustível Incluso', 'Fuel Included'],
      ['Lancha própria', 'Own boat'],
      ['Até 15 pessoas', 'Up to 15 people'],
      ['Até 16 pessoas', 'Up to 16 people'],
      ['Até 14 pessoas', 'Up to 14 people'],
      ['Até 12 pessoas', 'Up to 12 people'],
      ['20-22 pessoas', '20-22 people'],
      ['Combustível incluso', 'Fuel included'],
      ['Som Bluetooth', 'Bluetooth speakers'],
      ['Tapete flutuante', 'Floating mat'],
      ['Churrasqueira', 'BBQ grill'],
      ['Conforto premium', 'Premium comfort'],
      ['Maior capacidade', 'Largest capacity'],
      ['Flybridge exclusivo', 'Exclusive flybridge'],
      ['seg-qui', 'Mon-Thu'],
      ['sex-dom', 'Fri-Sun'],
      ['Ver Detalhes', 'View Details'],
      // Filter button text
      ['>Todas<', '>All<'],
      // Partner boat features (not in dictionary — need contentBlocks)
      ['Ideal para eventos', 'Ideal for events'],
      ['Gerador incluso', 'Generator included'],
      // Partner boats section
      ['Lanchas Parceiras — Para Grupos Maiores', 'Partner Boats — For Larger Groups'],
      ['Para grupos acima de 22 pessoas, oferecemos lanchas de parceiros selecionados, com o mesmo padrão de qualidade e serviço.', 'For groups over 22 people, we offer boats from selected partners, with the same quality and service standards.'],
      ['Todos com combustível, marinheiro e seguro inclusos', 'All with fuel, sailor and insurance included'],
      ['Lanchas de 10 a 65 pessoas', 'Boats for 10 to 65 people'],
      ['Reserve pelo WhatsApp', 'Book via WhatsApp'],
      // Compare section
      ['Não sabe qual lancha escolher?', 'Not sure which boat to choose?'],
      ['Compare as especificações, capacidade e preços de todas as nossas lanchas.', 'Compare the specifications, capacity and prices of all our boats.'],
      ['Comparar Lanchas', 'Compare Boats'],
      // FAQ
      ['Dúvidas Frequentes sobre Lanchas para Alugar', 'Frequently Asked Questions about Boats for Rent'],
      // Visible FAQ — "lanchas próprias" (plural) must match source; long answer BEFORE shorter substrings
      ['Qual a diferença entre lanchas próprias e parceiras?', 'What is the difference between own and partner boats?'],
      ['<strong>As 5 lanchas próprias WeBoat têm prioridade no agendamento e atendimento direto da nossa equipe. As 21 lanchas parceiras ampliam as opções para grupos maiores e ocasiões especiais.</strong>', '<strong>The 5 own WeBoat boats have priority in scheduling and direct service from our team. The 21 partner boats expand options for larger groups and special occasions.</strong>'],
      ['Todas as lanchas possuem churrasqueira?', 'Do all boats have a BBQ grill?'],
      ['Posso levar bebidas e comidas?', 'Can I bring drinks and food?'],
      ['O que está incluso no aluguel?', 'What is included in the rental?'],
      ['Como faço para reservar uma lancha?', 'How do I book a boat?'],
      // Info bar items
      ['Marinheiro habilitado', 'Licensed skipper'],
      // Includes section
      ['O que Está Incluso', 'What\'s Included'],
      ['Todas as lanchas incluem os seguintes itens no valor do aluguel', 'All boats include the following items in the rental price'],
      ['Combustível', 'Fuel'],
      ['Para todo o roteiro contratado', 'For the entire booked route'],
      ['Marinheiro', 'Skipper'],
      ['Habilitado e experiente', 'Licensed and experienced'],
      ['Para manter suas bebidas geladas', 'To keep your drinks cold'],
      ['Toque suas músicas favoritas', 'Play your favorite songs'],
      ['Coletes', 'Life Jackets'],
      ['Equipamento de segurança obrigatório', 'Mandatory safety equipment'],
      ['Tapete e Macarrões Flutuantes', 'Floating Mat and Noodles'],
      ['Para diversão extra no mar', 'For extra fun at sea'],
      // CTA
      ['Precisa de Ajuda para Escolher?', 'Need Help Choosing?'],
      ['Precisa de ajuda para escolher?', 'Need help choosing?'],
      ['Nossa equipe pode sugerir a lancha ideal para seu grupo e ocasião.', 'Our team can suggest the ideal boat for your group and occasion.'],
      ['Fale conosco pelo WhatsApp!', 'Chat with us on WhatsApp!'],
      ['Falar com Especialista', 'Talk to a Specialist'],
      ['Última atualização: Fevereiro 2026', 'Last updated: February 2026'],
    ],
  },
  {
    ptPath: 'lanchas/weboat-32/index.html',
    enPath: 'en/boats/weboat-32/index.html',
    title: 'WeBoat 32 - Boat for 15 People | Rental in Rio | WeBoat Brasil',
    description: 'Rent the WeBoat 32, a boat for up to 15 people in Rio de Janeiro. Best value! From R$ 2,300. Fuel and captain included. Book now!',
    keywords: 'weboat 32, boat 15 people, boat rental rio de janeiro, best value boat',
    waMessage: 'Hello! I am interested in the WeBoat 32 boat. Could you send me more information? [via site - en]',
    css: 'lancha-detalhe',
    contentBlocks: [
      // Schema.org (long strings — must be first before 'Melhor custo-benefício da frota' corrupts them)
      ['"description": "Lancha de 32 pés para até 15 pessoas. Ideal para passeios privativos e festas no Rio de Janeiro. Melhor custo-benefício da frota."', '"description": "32-foot boat for up to 15 people. Ideal for private trips and parties in Rio de Janeiro. Best value in the fleet."'],
      // Schema.org FAQ name (must come BEFORE short 'O que está incluso' entry)
      ['"name": "O que está incluso no aluguel da WeBoat 32?"', '"name": "What is included in the WeBoat 32 rental?"'],
      ['Lancha Própria WeBoat', 'WeBoat Own Boat'],
      ['Melhor custo-benefício da frota', 'Best value in the fleet'],
      ['Valores do Aluguel', 'Rental Prices'],
      ['Seg-Qui a partir de', 'Mon-Thu from'],
      ['Valores por Roteiro (Sex-Dom)', 'Prices by Route (Fri-Sun)'],
      ['Roteiro 1 - Mureta da Urca', 'Route 1 - Mureta da Urca'],
      ['Roteiro 2 - Praia Vermelha', 'Route 2 - Praia Vermelha'],
      ['Roteiro 3 - Copacabana', 'Route 3 - Copacabana'],
      ['Roteiro 4 - Ilhas Cagarras', 'Route 4 - Ilhas Cagarras'],
      ['Roteiro 5 - Itaipu/Camboinhas', 'Route 5 - Itaipu/Camboinhas'],
      ['Adicionais', 'Add-ons'],
      ['Hora Extra', 'Extra Hour'],
      ['*Turno: Manhã 09h-14h ou Tarde 14h30-19h30', '*Shift: Morning 9am-2pm or Afternoon 2:30pm-7:30pm'],
      ['*Churrasqueira inclui: Tripulação, Gelo escama 2x20kg, Gelo filtrado 1x10kg, Carvão', '*BBQ grill includes: Crew, Flake ice 2x20kg, Filtered ice 1x10kg, Charcoal'],
      ['Reservar pelo WhatsApp', 'Book via WhatsApp'],
      ['Montar Proposta', 'Build Proposal'],
      ['Sobre a WeBoat 32', 'About the WeBoat 32'],
      ['A WeBoat 32 é a escolha perfeita para quem busca o melhor custo-benefício em aluguel de lancha no Rio de Janeiro. Com capacidade para até 15 pessoas, essa lancha oferece conforto e espaço ideal para passeios em família, aniversários e confraternizações.', 'The WeBoat 32 is the perfect choice for those looking for the best value in boat rental in Rio de Janeiro. With capacity for up to 15 people, this boat offers comfort and ideal space for family trips, birthdays and celebrations.'],
      ['Equipada com som Bluetooth, tapete flutuante e coolers, a WeBoat 32 garante diversão completa durante todo o passeio. Navegue pelas águas da Baía de Guanabara com vista para o Pão de Açúcar, Cristo Redentor e as praias mais bonitas do Rio.', 'Equipped with Bluetooth speakers, floating mat and coolers, the WeBoat 32 guarantees complete fun throughout the trip. Sail through the waters of Guanabara Bay with views of Sugarloaf Mountain, Christ the Redeemer and the most beautiful beaches in Rio.'],
      ['O que está incluso', 'What is Included'],
      ['Combustível para o roteiro', 'Fuel for the route'],
      ['Marinheiro experiente', 'Experienced captain'],
      ['Tapete flutuante', 'Floating mat'],
      ['Coletes salva-vidas', 'Life jackets'],
      ['Macarrões flutuantes', 'Pool noodles'],
      ['Equipamentos de segurança', 'Safety equipment'],
      ['Especificações Técnicas', 'Technical Specifications'],
      ['Tamanho', 'Size'],
      ['Capacidade', 'Capacity'],
      ['Tipo', 'Type'],
      ['Lancha Própria', 'Own Boat'],
      ['Som', 'Sound'],
      ['Banheiro', 'Restroom'],
      ['Sim', 'Yes'],
      ['Toldo', 'Awning'],
      ['Informações Rápidas', 'Quick Info'],
      ['Passeio de 5 horas', '5-hour trip'],
      ['Saída: Marina da Glória', 'Departure: Marina da Gloria'],
      ['Disponível todos os dias', 'Available every day'],
      ['PIX, cartão ou transferência', 'PIX, card or bank transfer'],
      ['Consultar Disponibilidade', 'Check Availability'],
      ['Outras Lanchas', 'Other Boats'],
      ['A partir de', 'From'],
      ['Dúvidas', 'Questions'],
      ['Perguntas Frequentes sobre a WeBoat 32', 'Frequently Asked Questions about the WeBoat 32'],
      ['Quantas pessoas cabem na WeBoat 32?', 'How many people fit in the WeBoat 32?'],
      ['A WeBoat 32 tem capacidade para até <strong>15 pessoas</strong>, incluindo crianças. Essa capacidade é definida pela Marinha do Brasil para garantir conforto e segurança de todos a bordo.', 'The WeBoat 32 has capacity for up to <strong>15 people</strong>, including children. This capacity is defined by the Brazilian Navy to ensure comfort and safety for all on board.'],
      ['Qual o valor da hora extra?', 'What is the extra hour fee?'],
      ['O valor da hora extra na WeBoat 32 é de <strong>R$ 800</strong>. A solicitação deve ser feita durante o passeio diretamente com o marinheiro, sujeita à disponibilidade da embarcação.', 'The extra hour fee for the WeBoat 32 is <strong>R$ 800</strong>. The request must be made during the trip directly with the captain, subject to boat availability.'],
      ['A WeBoat 32 tem banheiro?', 'Does the WeBoat 32 have a restroom?'],
      ['<strong>Sim!</strong> A WeBoat 32 possui banheiro a bordo para maior conforto dos passageiros durante todo o passeio.', '<strong>Yes!</strong> The WeBoat 32 has an on-board restroom for greater passenger comfort throughout the trip.'],
      ['O que está incluso no aluguel?', 'What is included in the rental?'],
      ['O aluguel da WeBoat 32 inclui: combustível para o roteiro contratado, tripulação habilitada (marinheiro), tapete flutuante, macarrões flutuantes, som com Bluetooth, coolers e coletes salva-vidas.', 'The WeBoat 32 rental includes: fuel for the booked route, licensed crew (captain), floating mat, pool noodles, Bluetooth speakers, coolers and life jackets.'],
      ['Ver Todas as Dúvidas', 'View All Questions'],
      ['Monte sua proposta', 'Build your proposal'],
      ['Personalize seu Passeio na WeBoat 32', 'Customize your Trip on the WeBoat 32'],
      ['Selecione roteiro, serviços e veja o valor em tempo real', 'Select route, services and see the price in real time'],
      ['Escolha o Roteiro', 'Choose the Route'],
      ['Detalhes do Passeio', 'Trip Details'],
      ['Número de Pessoas', 'Number of People'],
      ['Horas Extras', 'Extra Hours'],
      ['Churrasqueira', 'BBQ Grill'],
      ['Serviços Extras', 'Extra Services'],
      ['Resumo da Proposta', 'Proposal Summary'],
      ['Selecione um roteiro para começar', 'Select a route to start'],
      ['Enviar Proposta pelo WhatsApp', 'Send Proposal via WhatsApp'],
      ['Até 15 pessoas', 'Up to 15 people'],
    ],
  },
  {
    ptPath: 'lanchas/weboat-390/index.html',
    enPath: 'en/boats/weboat-390/index.html',
    title: 'WeBoat 390 - Boat for 16 People | Rental in Rio | WeBoat Brasil',
    description: 'Rent the WeBoat 390, a versatile boat for up to 16 people. Perfect for parties! From R$ 2,600. Fuel and captain included.',
    keywords: 'weboat 390, boat 16 people, party boat rio, boat rental rio de janeiro',
    waMessage: 'Hello! I am interested in the WeBoat 390 boat. Could you send me more information? [via site - en]',
    css: 'lancha-detalhe',
    contentBlocks: [
      // Schema.org name and description (must be first, long strings)
      ['"name": "WeBoat 390 - Lancha com Churrasqueira"', '"name": "WeBoat 390 - Boat with BBQ Grill"'],
      ['"description": "Lancha de 39 pés com churrasqueira para até 16 pessoas. Ideal para festas, despedidas e confraternizações no Rio de Janeiro."', '"description": "39-foot boat with BBQ grill for up to 16 people. Ideal for parties, bachelorette and get-togethers in Rio de Janeiro."'],
      // Schema.org FAQ name (must come BEFORE short 'O que está incluso' entry)
      ['"name": "O que está incluso no aluguel da WeBoat 390?"', '"name": "What is included in the WeBoat 390 rental?"'],
      ['"text": "O aluguel da WeBoat 390 inclui: combustível para o roteiro contratado, tripulação habilitada (marinheiro), tapete flutuante, macarrões flutuantes, som com Bluetooth, coolers e coletes salva-vidas. A churrasqueira tem adicional de R$ 250."', '"text": "The WeBoat 390 rental includes: fuel for the booked route, licensed crew (captain), floating mat, pool noodles, Bluetooth speakers, coolers and life jackets. The BBQ grill has an additional fee of R$ 250."'],
      ['Churrasqueira Disponível', 'BBQ Grill Available'],
      ['Lancha com churrasqueira para festas', 'Boat with BBQ grill for parties'],
      ['Valores do Aluguel', 'Rental Prices'],
      ['Seg-Qui a partir de', 'Mon-Thu from'],
      ['Valores por Roteiro (Sex-Dom)', 'Prices by Route (Fri-Sun)'],
      ['Roteiro 1 - Mureta da Urca', 'Route 1 - Mureta da Urca'],
      ['Roteiro 2 - Praia Vermelha', 'Route 2 - Praia Vermelha'],
      ['Roteiro 3 - Copacabana', 'Route 3 - Copacabana'],
      ['Roteiro 4 - Ilhas Cagarras', 'Route 4 - Ilhas Cagarras'],
      ['Roteiro 5 - Itaipu/Camboinhas', 'Route 5 - Itaipu/Camboinhas'],
      ['Adicionais', 'Add-ons'],
      ['Hora Extra', 'Extra Hour'],
      ['*Turno: Manhã 09h-14h ou Tarde 14h30-19h30', '*Shift: Morning 9am-2pm or Afternoon 2:30pm-7:30pm'],
      ['*Churrasqueira inclui: Tripulação, Gelo escama 2x20kg, Gelo filtrado 1x10kg, Carvão', '*BBQ grill includes: Crew, Flake ice 2x20kg, Filtered ice 1x10kg, Charcoal'],
      ['Reservar pelo WhatsApp', 'Book via WhatsApp'],
      ['Montar Proposta', 'Build Proposal'],
      ['Sobre a WeBoat 390', 'About the WeBoat 390'],
      ['A WeBoat 390 é a escolha ideal para quem quer fazer churrasco a bordo durante o passeio. Com capacidade para até 16 pessoas e equipada com churrasqueira, é perfeita para despedidas de solteira, aniversários e confraternizações.', 'The WeBoat 390 is the ideal choice for those who want to have a BBQ on board during the trip. With capacity for up to 16 people and equipped with a BBQ grill, it is perfect for bachelorette parties, birthdays and celebrations.'],
      ['Além da churrasqueira, conta com som Bluetooth de alta qualidade, tapete flutuante e amplo espaço para o grupo aproveitar. A embarcação oferece conforto e estrutura completa para um dia inesquecível no mar.', 'In addition to the BBQ grill, it features high-quality Bluetooth speakers, floating mat and ample space for the group to enjoy. The boat offers comfort and complete facilities for an unforgettable day at sea.'],
      ['O que está incluso', 'What is Included'],
      ['Combustível para o roteiro', 'Fuel for the route'],
      ['Marinheiro experiente', 'Experienced captain'],
      ['Churrasqueira disponível', 'BBQ grill available'],
      ['Tapete flutuante', 'Floating mat'],
      ['Coletes salva-vidas', 'Life jackets'],
      ['Equipamentos de segurança', 'Safety equipment'],
      ['Especificações Técnicas', 'Technical Specifications'],
      ['Tamanho', 'Size'],
      ['Capacidade', 'Capacity'],
      ['Tipo', 'Type'],
      ['Lancha Própria', 'Own Boat'],
      ['Churrasqueira', 'BBQ Grill'],
      ['Disponível', 'Available'],
      ['Som', 'Sound'],
      ['Banheiro', 'Restroom'],
      ['Sim', 'Yes'],
      ['Informações Rápidas', 'Quick Info'],
      ['Passeio de 5 horas', '5-hour trip'],
      ['Saída: Marina da Glória', 'Departure: Marina da Gloria'],
      ['PIX, cartão ou transferência', 'PIX, card or bank transfer'],
      ['Consultar Disponibilidade', 'Check Availability'],
      ['Outras Lanchas', 'Other Boats'],
      ['A partir de', 'From'],
      ['Dúvidas', 'Questions'],
      ['Perguntas Frequentes sobre a WeBoat 390', 'Frequently Asked Questions about the WeBoat 390'],
      ['Quantas pessoas cabem na WeBoat 390?', 'How many people fit in the WeBoat 390?'],
      ['A WeBoat 390 tem capacidade para até <strong>16 pessoas</strong>, incluindo crianças. Essa capacidade é definida pela Marinha do Brasil para garantir conforto e segurança de todos a bordo.', 'The WeBoat 390 has capacity for up to <strong>16 people</strong>, including children. This capacity is defined by the Brazilian Navy to ensure comfort and safety for all on board.'],
      ['Quanto custa usar a churrasqueira na WeBoat 390?', 'How much does it cost to use the BBQ grill on the WeBoat 390?'],
      ['A churrasqueira na WeBoat 390 tem um adicional de <strong>R$ 250</strong>. A taxa inclui comandante preparando o churrasco, 02 sacos de gelo escama e 01 saco de gelo filtrado.', 'The BBQ grill on the WeBoat 390 has an additional fee of <strong>R$ 250</strong>. The fee includes the captain preparing the BBQ, 02 bags of flake ice and 01 bag of filtered ice.'],
      ['Qual o valor da hora extra?', 'What is the extra hour fee?'],
      ['O valor da hora extra na WeBoat 390 é de <strong>R$ 800</strong>. A solicitação deve ser feita durante o passeio diretamente com o marinheiro, sujeita à disponibilidade da embarcação.', 'The extra hour fee for the WeBoat 390 is <strong>R$ 800</strong>. The request must be made during the trip directly with the captain, subject to boat availability.'],
      ['O que está incluso no aluguel?', 'What is included in the rental?'],
      ['O aluguel da WeBoat 390 inclui: combustível para o roteiro contratado, tripulação habilitada, tapete flutuante, macarrões flutuantes, som com Bluetooth, coolers e coletes salva-vidas. <em>Obs: A churrasqueira tem adicional de R$ 250.</em>', 'The WeBoat 390 rental includes: fuel for the booked route, licensed crew, floating mat, pool noodles, Bluetooth speakers, coolers and life jackets. <em>Note: The BBQ grill has an additional fee of R$ 250.</em>'],
      ['Ver Todas as Dúvidas', 'View All Questions'],
      ['Monte sua proposta', 'Build your proposal'],
      ['Personalize seu Passeio na WeBoat 390', 'Customize your Trip on the WeBoat 390'],
      ['Selecione roteiro, serviços e veja o valor em tempo real', 'Select route, services and see the price in real time'],
      ['Escolha o Roteiro', 'Choose the Route'],
      ['Detalhes do Passeio', 'Trip Details'],
      ['Número de Pessoas', 'Number of People'],
      ['Horas Extras', 'Extra Hours'],
      ['Serviços Extras', 'Extra Services'],
      ['Resumo da Proposta', 'Proposal Summary'],
      ['Selecione um roteiro para começar', 'Select a route to start'],
      ['Enviar Proposta pelo WhatsApp', 'Send Proposal via WhatsApp'],
      ['Até 16 pessoas', 'Up to 16 people'],
      // CTA section
      ['Faça seu churrasco no mar com vista para o Rio de Janeiro.', 'Have your BBQ at sea with a view of Rio de Janeiro.'],
    ],
  },
  {
    ptPath: 'lanchas/weboat-oceanic-36/index.html',
    enPath: 'en/boats/weboat-oceanic-36/index.html',
    title: 'WeBoat Oceanic 36 - Premium Boat for 14 People | WeBoat Brasil',
    description: 'Rent the WeBoat Oceanic 36, premium comfort for up to 14 people. From R$ 2,900. Fuel and captain included. Book now!',
    keywords: 'weboat oceanic 36, premium boat rio, boat 14 people, luxury boat rental',
    waMessage: 'Hello! I am interested in the WeBoat Oceanic 36 boat. Could you send me more information? [via site - en]',
    css: 'lancha-detalhe',
    contentBlocks: [
      // Schema.org (long string — must be first)
      ['"name": "WeBoat Oceanic 36 - Lancha Premium"', '"name": "WeBoat Oceanic 36 - Premium Boat"'],
      ['"description": "Lancha de 36 pés com conforto premium para até 14 pessoas. Acabamento superior e espaço diferenciado."', '"description": "36-foot premium boat for up to 14 people. Superior finish and distinctive space."'],
      // Schema.org FAQ name (must come BEFORE short 'O que está incluso' entry)
      ['"name": "O que está incluso no aluguel da WeBoat Oceanic 36?"', '"name": "What is included in the WeBoat Oceanic 36 rental?"'],
      ['"text": "O aluguel da WeBoat Oceanic 36 inclui: combustível para o roteiro contratado, tripulação habilitada (marinheiro), tapete flutuante, macarrões flutuantes, som com Bluetooth, coolers e coletes salva-vidas."', '"text": "The WeBoat Oceanic 36 rental includes: fuel for the booked route, licensed crew (captain), floating mat, pool noodles, Bluetooth speakers, coolers and life jackets."'],
      ['Conforto Premium', 'Premium Comfort'],
      ['Lancha premium com acabamento superior', 'Premium boat with superior finish'],
      ['Valores do Aluguel', 'Rental Prices'],
      ['Seg-Qui a partir de', 'Mon-Thu from'],
      ['Valores por Roteiro (Sex-Dom)', 'Prices by Route (Fri-Sun)'],
      ['Roteiro 1 - Mureta da Urca', 'Route 1 - Mureta da Urca'],
      ['Roteiro 2 - Praia Vermelha', 'Route 2 - Praia Vermelha'],
      ['Roteiro 3 - Copacabana', 'Route 3 - Copacabana'],
      ['Roteiro 4 - Ilhas Cagarras', 'Route 4 - Ilhas Cagarras'],
      ['Roteiro 5 - Itaipu/Camboinhas', 'Route 5 - Itaipu/Camboinhas'],
      ['Adicionais', 'Add-ons'],
      ['Hora Extra', 'Extra Hour'],
      ['*Turno: Manhã 09h-14h ou Tarde 14h30-19h30', '*Shift: Morning 9am-2pm or Afternoon 2:30pm-7:30pm'],
      ['*Churrasqueira inclui: Tripulação, Gelo escama 2x20kg, Gelo filtrado 1x10kg, Carvão', '*BBQ grill includes: Crew, Flake ice 2x20kg, Filtered ice 1x10kg, Charcoal'],
      ['Reservar pelo WhatsApp', 'Book via WhatsApp'],
      ['Montar Proposta', 'Build Proposal'],
      ['Sobre a WeBoat Oceanic 36', 'About the WeBoat Oceanic 36'],
      ['A WeBoat Oceanic 36 oferece uma experiência premium em alto-mar. Com acabamento diferenciado e design moderno, é a escolha perfeita para quem busca conforto e sofisticação em seu passeio de lancha no Rio de Janeiro.', 'The WeBoat Oceanic 36 offers a premium experience on the open sea. With distinctive finish and modern design, it is the perfect choice for those seeking comfort and sophistication on their boat trip in Rio de Janeiro.'],
      ['Ideal para casais, pequenos grupos e ocasiões especiais que merecem um toque de exclusividade. O espaço é otimizado para proporcionar conforto máximo durante toda a navegação.', 'Ideal for couples, small groups and special occasions that deserve a touch of exclusivity. The space is optimized to provide maximum comfort throughout the entire sail.'],
      ['O que está incluso', 'What is Included'],
      ['Combustível para o roteiro', 'Fuel for the route'],
      ['Marinheiro experiente', 'Experienced captain'],
      ['Som Bluetooth premium', 'Premium Bluetooth speakers'],
      ['Tapete flutuante', 'Floating mat'],
      ['Coletes salva-vidas', 'Life jackets'],
      ['Acabamento premium', 'Premium finish'],
      ['Equipamentos de segurança', 'Safety equipment'],
      ['Especificações Técnicas', 'Technical Specifications'],
      ['Tamanho', 'Size'],
      ['Capacidade', 'Capacity'],
      ['Tipo', 'Type'],
      ['Lancha Própria', 'Own Boat'],
      ['Categoria', 'Category'],
      ['Som', 'Sound'],
      ['Banheiro', 'Restroom'],
      ['Sim', 'Yes'],
      ['Churrasqueira', 'BBQ Grill'],
      ['Disponível', 'Available'],
      ['Informações Rápidas', 'Quick Info'],
      ['Passeio de 5 horas', '5-hour trip'],
      ['Saída: Marina da Glória', 'Departure: Marina da Gloria'],
      ['PIX, cartão ou transferência', 'PIX, card or bank transfer'],
      ['Consultar Disponibilidade', 'Check Availability'],
      ['Outras Lanchas', 'Other Boats'],
      ['A partir de', 'From'],
      ['Dúvidas', 'Questions'],
      ['Perguntas Frequentes sobre a WeBoat Oceanic 36', 'Frequently Asked Questions about the WeBoat Oceanic 36'],
      ['Quantas pessoas cabem na WeBoat Oceanic 36?', 'How many people fit in the WeBoat Oceanic 36?'],
      ['A WeBoat Oceanic 36 tem capacidade para até <strong>14 pessoas</strong>, incluindo crianças. Essa capacidade é definida pela Marinha do Brasil para garantir conforto e segurança de todos a bordo.', 'The WeBoat Oceanic 36 has capacity for up to <strong>14 people</strong>, including children. This capacity is defined by the Brazilian Navy to ensure comfort and safety for all on board.'],
      ['A WeBoat Oceanic 36 tem churrasqueira?', 'Does the WeBoat Oceanic 36 have a BBQ grill?'],
      ['<strong>Sim!</strong> A churrasqueira está disponível mediante adicional de <strong>R$ 250</strong>. A taxa inclui comandante preparando o churrasco, 02 sacos de gelo escama e 01 saco de gelo filtrado.', '<strong>Yes!</strong> The BBQ grill is available for an additional fee of <strong>R$ 250</strong>. The fee includes the captain preparing the BBQ, 02 bags of flake ice and 01 bag of filtered ice.'],
      ['Qual o valor da hora extra?', 'What is the extra hour fee?'],
      ['O valor da hora extra na WeBoat Oceanic 36 é de <strong>R$ 800</strong>. A solicitação deve ser feita durante o passeio diretamente com o marinheiro, sujeita à disponibilidade da embarcação.', 'The extra hour fee for the WeBoat Oceanic 36 is <strong>R$ 800</strong>. The request must be made during the trip directly with the captain, subject to boat availability.'],
      ['O que está incluso no aluguel?', 'What is included in the rental?'],
      ['O aluguel da WeBoat Oceanic 36 inclui: combustível para o roteiro contratado, tripulação habilitada, tapete flutuante, macarrões flutuantes, som com Bluetooth, coolers e coletes salva-vidas.', 'The WeBoat Oceanic 36 rental includes: fuel for the booked route, licensed crew, floating mat, pool noodles, Bluetooth speakers, coolers and life jackets.'],
      ['Ver Todas as Dúvidas', 'View All Questions'],
      ['Monte sua proposta', 'Build your proposal'],
      ['Personalize seu Passeio na WeBoat Oceanic 36', 'Customize your Trip on the WeBoat Oceanic 36'],
      ['Selecione roteiro, serviços e veja o valor em tempo real', 'Select route, services and see the price in real time'],
      ['Escolha o Roteiro', 'Choose the Route'],
      ['Detalhes do Passeio', 'Trip Details'],
      ['Número de Pessoas', 'Number of People'],
      ['Horas Extras', 'Extra Hours'],
      ['Serviços Extras', 'Extra Services'],
      ['Resumo da Proposta', 'Proposal Summary'],
      ['Selecione um roteiro para começar', 'Select a route to start'],
      ['Enviar Proposta pelo WhatsApp', 'Send Proposal via WhatsApp'],
      ['Até 14 pessoas', 'Up to 14 people'],
      // CTA section
      ['Reserve a WeBoat Oceanic 36 Agora', 'Reserve the WeBoat Oceanic 36 Now'],
      ['Viva uma experiência premium no mar do Rio de Janeiro.', 'Experience premium comfort on the seas of Rio de Janeiro.'],
    ],
  },
  {
    ptPath: 'lanchas/weboat-ibiza-42/index.html',
    enPath: 'en/boats/weboat-ibiza-42/index.html',
    title: 'WeBoat Ibiza 42 - Boat with Flybridge for 12 People | WeBoat Brasil',
    description: 'Rent the WeBoat Ibiza 42 with exclusive flybridge for up to 12 people. From R$ 2,700. Fuel and captain included.',
    keywords: 'weboat ibiza 42, flybridge boat rio, boat 12 people, exclusive boat rental',
    waMessage: 'Hello! I am interested in the WeBoat Ibiza 42 boat. Could you send me more information? [via site - en]',
    css: 'lancha-detalhe',
    contentBlocks: [
      // Alt text (full PT source strings — prevent mixed PT/EN)
      ['WeBoat Ibiza 42 - Vista principal com Pao de Acucar', 'WeBoat Ibiza 42 - Main view with Sugarloaf Mountain'],
      ['WeBoat Ibiza 42 - Cockpit com cozinha', 'WeBoat Ibiza 42 - Cockpit with kitchen'],
      ['WeBoat Ibiza 42 - Mesa de jantar', 'WeBoat Ibiza 42 - Dining table'],
      // Schema.org entries (must be first, long strings)
      ['"name": "WeBoat Ibiza 42 - Lancha com Flybridge"', '"name": "WeBoat Ibiza 42 - Boat with Flybridge"'],
      ['"description": "Lancha de 42 pes com flybridge exclusivo para ate 12 pessoas. Solario, churrasqueira e vista panoramica."', '"description": "42-foot boat with exclusive flybridge for up to 12 people. Solarium, BBQ grill and panoramic views."'],
      // Schema.org FAQ names + answers
      ['"name": "O que esta incluso no aluguel da WeBoat Ibiza 42?"', '"name": "What is included in the WeBoat Ibiza 42 rental?"'],
      ['"text": "O aluguel da WeBoat Ibiza 42 inclui: combustivel para o roteiro contratado, tripulacao habilitada (marinheiro), tapete flutuante, macarroes flutuantes, som com Bluetooth, coolers e coletes salva-vidas."', '"text": "The WeBoat Ibiza 42 rental includes: fuel for the booked route, licensed crew (captain), floating mat, pool noodles, Bluetooth speakers, coolers and life jackets."'],
      ['"name": "O que e o flybridge da WeBoat Ibiza 42?"', '"name": "What is the flybridge on the WeBoat Ibiza 42?"'],
      ['"text": "O flybridge e um segundo andar ao ar livre na parte superior da lancha, com solario, churrasqueira e vista panoramica 360 graus. E o diferencial exclusivo da Ibiza 42 entre as lanchas proprias WeBoat."', '"text": "The flybridge is an outdoor second deck on top of the boat, with a solarium, BBQ grill and 360-degree panoramic view. It is the exclusive feature of the Ibiza 42 among WeBoat own boats."'],
      ['"text": "A WeBoat Ibiza 42 tem capacidade para ate 12 pessoas, incluindo criancas. Essa capacidade e definida pela Marinha do Brasil para garantir conforto e seguranca de todos a bordo."', '"text": "The WeBoat Ibiza 42 has capacity for up to 12 people, including children. This capacity is defined by the Brazilian Navy to ensure comfort and safety for everyone on board."'],
      ['Aluguel de lanchas no Rio de Janeiro. Passeios privativos com conforto e seguranca.', 'Boat rentals in Rio de Janeiro. Private trips with comfort and safety.'],
      ['Flybridge Exclusivo', 'Exclusive Flybridge'],
      ['Lancha com flybridge, solario e churrasqueira', 'Boat with flybridge, sun deck and BBQ grill'],
      ['Valores do Aluguel', 'Rental Prices'],
      ['Seg-Qui a partir de', 'Mon-Thu from'],
      ['Valores por Roteiro (Sex-Dom)', 'Prices by Route (Fri-Sun)'],
      ['Roteiro 1 - Mureta da Urca', 'Route 1 - Mureta da Urca'],
      ['Roteiro 2 - Praia Vermelha', 'Route 2 - Praia Vermelha'],
      ['Roteiro 3 - Copacabana', 'Route 3 - Copacabana'],
      ['Roteiro 4 - Ilhas Cagarras', 'Route 4 - Ilhas Cagarras'],
      ['Roteiro 5 - Itaipu/Camboinhas', 'Route 5 - Itaipu/Camboinhas'],
      ['Adicionais', 'Add-ons'],
      ['Hora Extra', 'Extra Hour'],
      ['*Turno: Manha 09h-14h ou Tarde 14h30-19h30', '*Shift: Morning 9am-2pm or Afternoon 2:30pm-7:30pm'],
      ['*Churrasqueira inclui: Tripulacao, Gelo escama 2x20kg, Gelo filtrado 1x10kg, Carvao', '*BBQ grill includes: Crew, Flake ice 2x20kg, Filtered ice 1x10kg, Charcoal'],
      ['Reservar pelo WhatsApp', 'Book via WhatsApp'],
      ['Montar Proposta', 'Build Proposal'],
      ['Sobre a WeBoat Ibiza 42', 'About the WeBoat Ibiza 42'],
      ['A WeBoat Ibiza 42 e a unica lancha propria da frota com flybridge — um segundo andar ao ar livre com solario, churrasqueira e vista panoramica 360 graus. Com 42 pes e capacidade para 12 pessoas, oferece uma experiencia diferenciada para quem busca espaco ao ar livre e conforto.', 'The WeBoat Ibiza 42 is the only own boat in the fleet with a flybridge — an open-air second deck with sun deck, BBQ grill and 360-degree panoramic views. At 42 feet with capacity for 12 people, it offers a unique experience for those seeking outdoor space and comfort.'],
      ['Ideal para casais, grupos pequenos exclusivos, churrascos intimos e quem valoriza a experiencia de navegar com vista panoramica do Rio de Janeiro.', 'Ideal for couples, exclusive small groups, intimate BBQs and those who value the experience of sailing with panoramic views of Rio de Janeiro.'],
      ['O que esta incluso', 'What is Included'],
      ['Combustivel para o roteiro', 'Fuel for the route'],
      ['Marinheiro experiente', 'Experienced captain'],
      ['Tapete flutuante', 'Floating mat'],
      ['Coletes salva-vidas', 'Life jackets'],
      ['Flybridge com solario', 'Flybridge with sun deck'],
      ['Equipamentos de seguranca', 'Safety equipment'],
      ['Especificacoes Tecnicas', 'Technical Specifications'],
      ['Tamanho', 'Size'],
      ['Capacidade', 'Capacity'],
      ['Tipo', 'Type'],
      ['Lancha Propria', 'Own Boat'],
      ['Diferencial', 'Highlight'],
      ['Flybridge exclusivo', 'Exclusive flybridge'],
      ['Som', 'Sound'],
      ['Banheiro', 'Restroom'],
      ['Sim', 'Yes'],
      ['Churrasqueira', 'BBQ Grill'],
      ['Disponivel', 'Available'],
      ['Informacoes Rapidas', 'Quick Info'],
      ['Passeio de 5 horas', '5-hour trip'],
      ['Saida: Marina da Gloria', 'Departure: Marina da Gloria'],
      ['Flybridge com vista 360', 'Flybridge with 360 view'],
      ['PIX, cartao ou transferencia', 'PIX, card or bank transfer'],
      ['Consultar Disponibilidade', 'Check Availability'],
      ['Outras Lanchas', 'Other Boats'],
      ['A partir de', 'From'],
      ['Duvidas', 'Questions'],
      ['Perguntas Frequentes sobre a WeBoat Ibiza 42', 'Frequently Asked Questions about the WeBoat Ibiza 42'],
      ['Quantas pessoas cabem na WeBoat Ibiza 42?', 'How many people fit in the WeBoat Ibiza 42?'],
      ['A WeBoat Ibiza 42 tem capacidade para ate <strong>12 pessoas</strong>, incluindo criancas. Essa capacidade e definida pela Marinha do Brasil para garantir conforto e seguranca de todos a bordo.', 'The WeBoat Ibiza 42 has capacity for up to <strong>12 people</strong>, including children. This capacity is defined by the Brazilian Navy to ensure comfort and safety for all on board.'],
      ['A WeBoat Ibiza 42 tem churrasqueira?', 'Does the WeBoat Ibiza 42 have a BBQ grill?'],
      ['<strong>Sim!</strong> A churrasqueira esta disponivel mediante adicional de <strong>R$ 250</strong>. A taxa inclui comandante preparando o churrasco, 02 sacos de gelo escama e 01 saco de gelo filtrado.', '<strong>Yes!</strong> The BBQ grill is available for an additional fee of <strong>R$ 250</strong>. The fee includes the captain preparing the BBQ, 02 bags of flake ice and 01 bag of filtered ice.'],
      ['O que e o flybridge?', 'What is the flybridge?'],
      ['O flybridge e um <strong>segundo andar ao ar livre</strong> na parte superior da lancha. Na Ibiza 42, ele conta com solario, churrasqueira e vista panoramica 360 graus. E o diferencial exclusivo desta lancha entre as proprias WeBoat.', 'The flybridge is an <strong>open-air second deck</strong> on top of the boat. On the Ibiza 42, it features a sun deck, BBQ grill and 360-degree panoramic views. It is the exclusive highlight of this boat among WeBoat own boats.'],
      ['O que esta incluso no aluguel?', 'What is included in the rental?'],
      ['O aluguel da WeBoat Ibiza 42 inclui: combustivel para o roteiro contratado, tripulacao habilitada, tapete flutuante, macarroes flutuantes, som com Bluetooth, coolers e coletes salva-vidas.', 'The WeBoat Ibiza 42 rental includes: fuel for the booked route, licensed crew, floating mat, pool noodles, Bluetooth speakers, coolers and life jackets.'],
      ['Ver Todas as Duvidas', 'View All Questions'],
      ['Monte sua proposta', 'Build your proposal'],
      ['Personalize seu Passeio na WeBoat Ibiza 42', 'Customize your Trip on the WeBoat Ibiza 42'],
      ['Selecione roteiro, servicos e veja o valor em tempo real', 'Select route, services and see the price in real time'],
      ['Escolha o Roteiro', 'Choose the Route'],
      ['Detalhes do Passeio', 'Trip Details'],
      ['Numero de Pessoas', 'Number of People'],
      // aria-label (lowercase 'pessoas' — dictionary only translates individually, creating 'Numero de people')
      ['Numero de pessoas', 'Number of people'],
      ['Horas Extras', 'Extra Hours'],
      ['Servicos Extras', 'Extra Services'],
      ['Resumo da Proposta', 'Proposal Summary'],
      ['Selecione um roteiro para começar', 'Select a route to start'],
      ['Enviar Proposta pelo WhatsApp', 'Send Proposal via WhatsApp'],
      ['Ate 12 pessoas', 'Up to 12 people'],
      // CTA
      ['Reserve a WeBoat Ibiza 42 Agora', 'Reserve the WeBoat Ibiza 42 Now'],
      ['Navegue com flybridge exclusivo e vista panoramica no Rio de Janeiro.', 'Sail with an exclusive flybridge and panoramic views in Rio de Janeiro.'],
      ['Ver Outras Lanchas', 'View Other Boats'],
    ],
  },
  {
    ptPath: 'lanchas/weboat-rio-star-50/index.html',
    enPath: 'en/boats/weboat-rio-star-50/index.html',
    title: 'WeBoat Rio Star 50 - Largest Boat for 22 People | WeBoat Brasil',
    description: 'Rent the WeBoat Rio Star 50, our largest boat for up to 22 people. From R$ 4,000. Fuel and captain included.',
    keywords: 'weboat rio star 50, large boat rio, boat 22 people, biggest boat rental',
    waMessage: 'Hello! I am interested in the WeBoat Rio Star 50 boat. Could you send me more information? [via site - en]',
    css: 'lancha-detalhe',
    contentBlocks: [
      // Schema.org name, description and FAQ answers (must come first)
      ['"name": "WeBoat Rio Star 50 - Maior Lancha"', '"name": "WeBoat Rio Star 50 - Largest Boat"'],
      ['"description": "Nossa maior lancha própria com 50 pés para até 22 pessoas. Ideal para eventos corporativos, festas grandes e confraternizações."', '"description": "Our largest own boat with 50 feet for up to 22 people. Ideal for corporate events, large parties and get-togethers."'],
      // Schema.org FAQ name
      ['"name": "Quanto custa levar mais de 20 pessoas na WeBoat Rio Star 50?"', '"name": "How much does it cost to bring more than 20 people on the WeBoat Rio Star 50?"'],
      ['"text": "A partir de 21 pessoas, há um adicional de R$ 250 por pessoa. Por exemplo, para 22 pessoas, o adicional é de R$ 500 (2 pessoas extras x R$ 250)."', '"text": "From 21 people, there is an additional fee of R$ 250 per person. For example, for 22 people, the additional fee is R$ 500 (2 extra people x R$ 250)."'],
      // Visible HTML FAQ answer (with <strong> tags — different from Schema version above)
      ['A partir de 21 pessoas, há um adicional de <strong>R$ 250 por pessoa</strong>. Por exemplo, para 22 pessoas, o adicional é de R$ 500 (2 pessoas extras x R$ 250).', 'From 21 people, there is an additional fee of <strong>R$ 250 per person</strong>. For example, for 22 people, the additional fee is R$ 500 (2 extra people x R$ 250).'],
      // CTA text
      ['Perfeita para grupos grandes e eventos corporativos.', 'Perfect for large groups and corporate events.'],
      ['Maior Capacidade', 'Largest Capacity'],
      ['Nossa maior lancha própria', 'Our largest own boat'],
      ['Valores do Aluguel', 'Rental Prices'],
      ['Seg-Qui a partir de', 'Mon-Thu from'],
      ['Valores por Roteiro (Sex-Dom)', 'Prices by Route (Fri-Sun)'],
      ['Roteiro 1 - Mureta da Urca', 'Route 1 - Mureta da Urca'],
      ['Roteiro 2 - Praia Vermelha', 'Route 2 - Praia Vermelha'],
      ['Roteiro 3 - Copacabana', 'Route 3 - Copacabana'],
      ['Roteiro 4 - Ilhas Cagarras', 'Route 4 - Ilhas Cagarras'],
      ['Roteiro 5 - Itaipu/Camboinhas', 'Route 5 - Itaipu/Camboinhas'],
      ['Adicionais', 'Add-ons'],
      ['Pessoa extra (21-22)', 'Extra person (21-22)'],
      ['Hora Extra', 'Extra Hour'],
      ['*Valores para até 20 pessoas. Turno: Manhã 09h-14h ou Tarde 14h30-19h30', '*Prices for up to 20 people. Shift: Morning 9am-2pm or Afternoon 2:30pm-7:30pm'],
      ['*Churrasqueira inclui: Tripulação, Gelo escama 4x20kg, Gelo filtrado 2x10kg, Carvão', '*BBQ grill includes: Crew, Flake ice 4x20kg, Filtered ice 2x10kg, Charcoal'],
      ['Reservar pelo WhatsApp', 'Book via WhatsApp'],
      ['Montar Proposta', 'Build Proposal'],
      ['Sobre a WeBoat Rio Star 50', 'About the WeBoat Rio Star 50'],
      ['A WeBoat Rio Star 50 é nossa maior lancha própria, perfeita para grupos grandes e eventos especiais. Com capacidade para até 22 pessoas, oferece espaço amplo e confortável para todos aproveitarem.', 'The WeBoat Rio Star 50 is our largest own boat, perfect for large groups and special events. With capacity for up to 22 people, it offers ample and comfortable space for everyone to enjoy.'],
      ['Ideal para eventos corporativos, confraternizações de empresa, festas de aniversário grandes e celebrações que reúnem muitos convidados. A embarcação conta com estrutura completa para proporcionar uma experiência inesquecível.', 'Ideal for corporate events, company gatherings, large birthday parties and celebrations with many guests. The boat has complete facilities to provide an unforgettable experience.'],
      ['O que está incluso', 'What is Included'],
      ['Combustível para o roteiro', 'Fuel for the route'],
      ['Marinheiro experiente', 'Experienced captain'],
      ['Tapete flutuante', 'Floating mat'],
      ['Coletes salva-vidas', 'Life jackets'],
      ['Maior espaço de deck', 'Largest deck space'],
      ['Equipamentos de segurança', 'Safety equipment'],
      ['Especificações Técnicas', 'Technical Specifications'],
      ['Tamanho', 'Size'],
      ['Capacidade', 'Capacity'],
      ['Tipo', 'Type'],
      ['Lancha Própria', 'Own Boat'],
      ['Categoria', 'Category'],
      ['Maior capacidade', 'Largest capacity'],
      ['Som', 'Sound'],
      ['Banheiro', 'Restroom'],
      ['Sim', 'Yes'],
      ['Churrasqueira', 'BBQ Grill'],
      ['Disponível', 'Available'],
      ['Informações Rápidas', 'Quick Info'],
      ['Passeio de 5 horas', '5-hour trip'],
      ['Saída: Marina da Glória', 'Departure: Marina da Gloria'],
      ['Até 22 pessoas', 'Up to 22 people'],
      ['PIX, cartão ou transferência', 'PIX, card or bank transfer'],
      ['Consultar Disponibilidade', 'Check Availability'],
      ['Outras Lanchas', 'Other Boats'],
      ['A partir de', 'From'],
      ['Dúvidas', 'Questions'],
      ['Perguntas Frequentes sobre a WeBoat Rio Star 50', 'Frequently Asked Questions about the WeBoat Rio Star 50'],
      ['Quantas pessoas cabem na WeBoat Rio Star 50?', 'How many people fit in the WeBoat Rio Star 50?'],
      ['A WeBoat Rio Star 50 tem capacidade para até <strong>22 pessoas</strong>, incluindo crianças. Essa capacidade é definida pela Marinha do Brasil para garantir conforto e segurança de todos a bordo.', 'The WeBoat Rio Star 50 has capacity for up to <strong>22 people</strong>, including children. This capacity is defined by the Brazilian Navy to ensure comfort and safety for all on board.'],
      ['Quanto custa levar mais de 20 pessoas?', 'How much does it cost to bring more than 20 people?'],
      ['A partir de 21 pessoas, há um adicional de <strong>R$ 250 por pessoa</strong>. Por exemplo, para 22 pessoas, o adicional é de R$ 500 (2 pessoas extras x R$ 250).', 'From 21 people, there is an additional fee of <strong>R$ 250 per person</strong>. For example, for 22 people, the additional fee is R$ 500 (2 extra people x R$ 250).'],
      ['Qual o valor da hora extra?', 'What is the extra hour fee?'],
      ['O valor da hora extra na WeBoat Rio Star 50 é de <strong>R$ 1.200</strong>. A solicitação deve ser feita durante o passeio diretamente com o marinheiro, sujeita à disponibilidade.', 'The extra hour fee for the WeBoat Rio Star 50 is <strong>R$ 1,200</strong>. The request must be made during the trip directly with the captain, subject to availability.'],
      ['A WeBoat Rio Star 50 tem churrasqueira?', 'Does the WeBoat Rio Star 50 have a BBQ grill?'],
      ['<strong>Sim!</strong> A churrasqueira está disponível mediante adicional de <strong>R$ 250</strong>. A taxa inclui comandante preparando o churrasco, 02 sacos de gelo escama e 01 saco de gelo filtrado.', '<strong>Yes!</strong> The BBQ grill is available for an additional fee of <strong>R$ 250</strong>. The fee includes the captain preparing the BBQ, 02 bags of flake ice and 01 bag of filtered ice.'],
      ['Ver Todas as Dúvidas', 'View All Questions'],
      ['Monte sua proposta', 'Build your proposal'],
      ['Personalize seu Passeio na WeBoat Rio Star 50', 'Customize your Trip on the WeBoat Rio Star 50'],
      ['Selecione roteiro, serviços e veja o valor em tempo real', 'Select route, services and see the price in real time'],
      ['Escolha o Roteiro', 'Choose the Route'],
      ['Detalhes do Passeio', 'Trip Details'],
      ['Número de Pessoas', 'Number of People'],
      ['Horas Extras', 'Extra Hours'],
      ['Serviços Extras', 'Extra Services'],
      ['Resumo da Proposta', 'Proposal Summary'],
      ['Selecione um roteiro para começar', 'Select a route to start'],
      ['Enviar Proposta pelo WhatsApp', 'Send Proposal via WhatsApp'],
    ],
  },
  {
    ptPath: 'lanchas/comparativo/index.html',
    enPath: 'en/boats/compare/index.html',
    title: 'Compare Boats - Find Your Ideal Boat | WeBoat Brasil',
    description: 'Compare all WeBoat boats side by side. Capacity, price, features. Find the perfect boat for your trip in Rio de Janeiro.',
    keywords: 'compare boats rio, boat comparison, which boat to rent, weboat comparison',
    waMessage: 'Hello! I would like help choosing the right boat. [via site - en]',
    css: 'lancha-detalhe',
    contentBlocks: [
      // *** Partner table descriptions + notes (must come BEFORE ['Lancha','Boat'] which corrupts 'Lanchas') ***
      ['Maior embarcação: 70 pés, rooftop ampliado, salão para eventos', 'Largest vessel: 70 feet, expanded rooftop, event hall'],
      ['*Valores variam conforme roteiro e dia da semana. Consulte via WhatsApp para orçamento personalizado.', '*Prices vary according to route and day of the week. Contact us via WhatsApp for a customized quote.'],
      ['*Lanchas premium (Prestige, Schaefer, Intermarine) operam apenas roteiros R1 e R2 com turno flexível de 6h.', '*Premium boats (Prestige, Schaefer, Intermarine) operate only routes R1 and R2 with flexible 6-hour shifts.'],
      // *** FAQ TITLE must come before short ['Comparativo', 'Comparison'] ***
      ['Perguntas Frequentes sobre Comparativo', 'Frequently Asked Questions about Comparison'],
      // Schema.org FAQ answer for small groups (was missing — hybrid PT/EN)
      ['"text": "A WeBoat 32 e a melhor opção para grupos de ate 15 pessoas. Com preco a partir de R$ 2.300, oferece o melhor custo-benefício da frota. Inclui combustível, marinheiro, som Bluetooth e tapete flutuante. Ideal para passeios em familia ou com amigos."', '"text": "The WeBoat 32 is the best option for groups of up to 15 people. Priced from R$ 2,300, it offers the best value in the fleet. Includes fuel, captain, Bluetooth speakers and floating mat. Ideal for trips with family or friends."'],
      // Schema.org FAQ answer for large groups (not in contentBlocks before)
      ['"text": "A WeBoat Rio Star 50 e a única lancha propria para grupos grandes, com capacidade para 22 pessoas. Preco a partir de R$ 4.000. Para grupos ainda maiores (30 a 65 pessoas), temos lanchas parceiras como o Catamara Oceano."', '"text": "The WeBoat Rio Star 50 is the only own boat for large groups, with capacity for 22 people. Price from R$ 4,000. For even larger groups (30 to 65 people), we have partner boats like the Catamara Oceano."'],
      // Schema.org FAQ answers (plain text — must come first before shorter substrings)
      ['"text": "A WeBoat 390 e a mais indicada para festas e despedidas de solteira. Com capacidade para 16 pessoas e preco a partir de R$ 2.600, oferece espaco versátil e excelente sistema de som. Todas as lanchas possuem churrasqueira (taxa adicional R$ 250 a R$ 600)."', '"text": "The WeBoat 390 is the most recommended for parties and bachelorette parties. With capacity for 16 people and prices from R$ 2,600, it offers versatile space and an excellent sound system. All boats have a BBQ grill (additional fee R$ 250 to R$ 600)."'],
      ['"text": "A WeBoat Oceanic 36 oferece a experiência mais premium entre as lanchas proprias. Com acabamento superior e conforto diferenciado, e ideal para quem busca sofisticação. Capacidade para 14 pessoas, a partir de R$ 2.400."', '"text": "The WeBoat Oceanic 36 offers the most premium experience among our own boats. With superior finish and differentiated comfort, it is ideal for those seeking sophistication. Capacity for 14 people, from R$ 2,400."'],
      ['"text": "Todas as 5 lanchas proprias incluem: combustível para o roteiro, marinheiro habilitado pela Marinha, coolers, som Bluetooth, tapete flutuante, macarroes e coletes salva-vidas. Churrasqueira disponível em todas (taxa adicional)."', '"text": "All 5 own boats include: fuel for the route, captain licensed by the Brazilian Navy, coolers, Bluetooth speakers, floating mat, pool noodles and life jackets. BBQ grill available on all (additional fee)."'],
      ['"text": "Os precos de segunda a quinta sao promocionais: WeBoat 32 (R$ 2.300 vs R$ 2.700), WeBoat 390 (R$ 2.600 vs R$ 3.100), Oceanic 36 (R$ 2.400 vs R$ 2.800), Rio Star 50 (R$ 4.000 vs R$ 4.500). Economia de ate R$ 500 durante a semana."', '"text": "Weekday prices (Mon-Thu) are promotional: WeBoat 32 (R$ 2,300 vs R$ 2,700), WeBoat 390 (R$ 2,600 vs R$ 3,100), Oceanic 36 (R$ 2,400 vs R$ 2,800), Rio Star 50 (R$ 4,000 vs R$ 4,500). Save up to R$ 500 on weekdays."'],
      ['"name": "Qual a diferenca de preco entre dias de semana e fim de semana?"', '"name": "What is the price difference between weekdays and weekends?"'],
      ['"name": "Qual a melhor lancha para um passeio premium e confortavel?"', '"name": "What is the best boat for a premium and comfortable trip?"'],
      ['"name": "O que esta incluso em todas as lanchas WeBoat?"', '"name": "What is included in all WeBoat boats?"'],
      // Partner boats paragraph (long, must come before short entries corrupt it)
      // NOTE: PT side uses /en/boats/ because step 16 (link replacement) runs BEFORE contentBlocks
      ['<strong>Temos lanchas parceiras para grupos de ate 65 pessoas.</strong>\n                    O Catamarã Oceano comporta até 65 pessoas e o Barco Gourmet 53 até 40 pessoas. Todas as embarcações passam pela mesma\n                    vistoria de segurança e oferecem o padrao WeBoat de qualidade.\n                    <a href="/en/boats/">Veja todas as lanchas</a>.', '<strong>We have partner boats for groups of up to 65 people.</strong>\n                    The Catamarã Oceano fits up to 65 people and the Barco Gourmet 53 up to 40 people. All vessels undergo the same\n                    safety inspection and offer the WeBoat quality standard.\n                    <a href="/en/boats/">See all boats</a>.'],
      // Schema.org descriptions (long, must be first)
      ['"description": "Lancha para ate 15 pessoas. Melhor custo-benefício da frota WeBoat."', '"description": "Boat for up to 15 people. Best value in the WeBoat fleet."'],
      ['"description": "Lancha versátil para ate 16 pessoas. Otima para festas e celebracoes."', '"description": "Versatile boat for up to 16 people. Great for parties and celebrations."'],
      ['"description": "Lancha premium para ate 14 pessoas. Maior conforto e acabamento."', '"description": "Premium boat for up to 14 people. Greater comfort and finishes."'],
      ['"description": "Lancha com flybridge exclusivo para ate 12 pessoas. Solario, churrasqueira e vista panoramica."', '"description": "Boat with exclusive flybridge for up to 12 people. Solarium, BBQ grill and panoramic view."'],
      ['"description": "Nossa maior lancha propria para ate 22 pessoas. Ideal para grupos grandes."', '"description": "Our largest own boat for up to 22 people. Ideal for large groups."'],
      // Alt text (boat recommendation cards — must run before short 'pessoas' entries)
      ['Lancha para ate 15 pessoas', 'Boat for up to 15 people'],
      ['Lancha com flybridge', 'Boat with flybridge'],
      ['Lancha versátil para festas', 'Versatile boat for parties'],
      // WhatsApp link (with PT text in URL)
      ['Ola! Estou em duvida sobre qual lancha escolher. Podem me ajudar?', 'Hello! I need help choosing a boat. Can you help me?'],
      // Page header
      ['Comparativo', 'Comparison'],
      ['Qual a Melhor Lancha para Alugar no Rio?', 'What is the Best Boat to Rent in Rio?'],
      ['Compare as 5 lanchas proprias WeBoat e descubra a opção ideal para seu grupo, ocasiao e orcamento.', 'Compare all 5 WeBoat own boats and find the ideal option for your group, occasion and budget.'],
      // Answer capsules
      ['Respostas Rapidas', 'Quick Answers'],
      ['Qual a Melhor Lancha Para...', 'What is the Best Boat For...'],
      ['Qual a melhor lancha para grupos pequenos (ate 15 pessoas)?', 'What is the best boat for small groups (up to 15 people)?'],
      ['<strong>A WeBoat 32 e a melhor opção.</strong> Com preco a partir de R$ 2.300, oferece o melhor custo-benefício da frota. Perfeita para passeios em familia ou com amigos.', '<strong>The WeBoat 32 is the best option.</strong> Priced from R$ 2,300, it offers the best value in the fleet. Perfect for family trips or with friends.'],
      ['Ver WeBoat 32', 'View WeBoat 32'],
      ['Qual a melhor lancha para festas e despedidas de solteira?', 'What is the best boat for parties and bachelorette parties?'],
      ['<strong>A WeBoat 390 e a mais indicada.</strong> Com capacidade para 16 pessoas e espaco versátil, e perfeita para celebracoes. Todas possuem churrasqueira.', '<strong>The WeBoat 390 is the most recommended.</strong> With capacity for 16 people and versatile space, it is perfect for celebrations. All have a BBQ grill.'],
      ['Ver WeBoat 390', 'View WeBoat 390'],
      ['Qual a melhor lancha para grupos grandes (mais de 20 pessoas)?', 'What is the best boat for large groups (more than 20 people)?'],
      ['<strong>A WeBoat Rio Star 50 e a única opção propria.</strong> Capacidade para 22 pessoas, a partir de R$ 4.000. Para grupos maiores, temos lanchas parceiras.', '<strong>The WeBoat Rio Star 50 is the only own option.</strong> Capacity for 22 people, from R$ 4,000. For larger groups, we have partner boats.'],
      ['Ver Rio Star 50', 'View Rio Star 50'],
      ['Qual a melhor lancha para um passeio premium?', 'What is the best boat for a premium trip?'],
      ['<strong>A WeBoat Oceanic 36 oferece a experiência mais sofisticada.</strong> Acabamento superior e maior conforto para ate 14 pessoas, a partir de R$ 2.400.', '<strong>The WeBoat Oceanic 36 offers the most sophisticated experience.</strong> Superior finish and greater comfort for up to 14 people, from R$ 2,400.'],
      ['Ver Oceanic 36', 'View Oceanic 36'],
      // Comparison table
      ['Tabela Comparativa', 'Comparison Table'],
      ['Lanchas Próprias WeBoat', 'WeBoat Own Boats'],
      ['Todas incluem combustível, marinheiro, coolers, som Bluetooth, tapete flutuante e coletes salva-vidas.', 'All include fuel, captain, coolers, Bluetooth speakers, floating mat and life jackets.'],
      // *** Partner section MUST come BEFORE ['Lancha', 'Boat'] which corrupts "Lanchas" -> "Boats" ***
      ['Compare Todas as Lanchas Parceiras', 'Compare All Partner Boats'],
      ['22 lanchas parceiras de 10 a 65 pessoas. Todas com combustível, marinheiro e seguro inclusos.', '22 partner boats for 10 to 65 people. All with fuel, captain and insurance included.'],
      ['Lanchas Parceiras', 'Partner Boats'],
      // Short table headers (AFTER partner section to prevent corruption)
      ['Lancha', 'Boat'],
      ['Capacidade', 'Capacity'],
      ['Preco Seg-Qui', 'Price Mon-Thu'],
      ['Preco Sex-Dom', 'Price Fri-Sun'],
      ['Diferencial', 'Highlight'],
      ['Propria', 'Own'],
      ['15 pessoas', '15 people'],
      ['16 pessoas', '16 people'],
      ['14 pessoas', '14 people'],
      ['22 pessoas', '22 people'],
      ['12 pessoas', '12 people'],
      ['seg a qui', 'Mon to Thu'],
      ['sex a dom', 'Fri to Sun'],
      ['Melhor custo-benefício', 'Best value'],
      ['Versátil para festas', 'Versatile for parties'],
      ['Conforto premium', 'Premium comfort'],
      ['Maior capacidade', 'Largest capacity'],
      ['Flybridge exclusivo', 'Exclusive flybridge'],
      ['Ver Detalhes', 'View Details'],
      // Notes
      ['*Valores para o Roteiro 1 - Mureta da Urca (5 horas). Consulte valores para outros roteiros.', '*Prices for Route 1 - Mureta da Urca (5 hours). Check prices for other routes.'],
      ['*Precos promocionais de seg-qui nao sao validos para periodos festivos e feriados.', '*Promotional Mon-Thu prices are not valid for holiday periods and public holidays.'],
      ['*Todas as lanchas possuem churrasqueira (taxa adicional de R$ 250 a R$ 600).', '*All boats have a BBQ grill (additional fee from R$ 250 to R$ 600).'],
      // (Partner section entries moved above — before ['Lancha', 'Boat'])
      // Recommendation section
      ['Perfil Ideal', 'Ideal Profile'],
      ['Para Quem Cada Lancha E Indicada', 'Who Each Boat is Recommended For'],
      ['Descubra qual lancha combina melhor com seu perfil e ocasiao.', 'Find out which boat best matches your profile and occasion.'],
      ['Indicada para:', 'Recommended for:'],
      ['Grupos de amigos em primeiro passeio de lancha', 'Groups of friends on their first boat trip'],
      ['Familias com crianças buscando economia', 'Families with children looking for savings'],
      ['Casais e grupos pequenos ate 10 pessoas', 'Couples and small groups up to 10 people'],
      ['Quem quer conhecer a Baia de Guanabara sem gastar muito', 'Those who want to explore Guanabara Bay without spending too much'],
      ['Despedidas de solteira e solteiro', 'Bachelorette and bachelor parties'],
      ['Aniversarios e celebracoes informais', 'Birthdays and informal celebrations'],
      ['Grupos animados que querem música e churrasco', 'Lively groups who want music and BBQ'],
      ['Day use com amigos no fim de semana', 'Day trip with friends on the weekend'],
      ['Casais em busca de experiência romantica', 'Couples looking for a romantic experience'],
      ['Eventos corporativos com clientes VIP', 'Corporate events with VIP clients'],
      ['Pedidos de casamento e ocasiões especiais', 'Marriage proposals and special occasions'],
      ['Quem valoriza conforto e acabamento superior', 'Those who value comfort and superior finish'],
      ['Grupos grandes de 18 a 22 pessoas', 'Large groups of 18 to 22 people'],
      ['Confraternizacoes de empresa', 'Company gatherings'],
      ['Reunioes de familia e amigos de várias cidades', 'Family reunions and friends from various cities'],
      ['Formaturas e celebracoes de turma', 'Graduations and class celebrations'],
      ['Casais e grupos pequenos exclusivos', 'Couples and exclusive small groups'],
      ['Quem busca espaco ao ar livre com flybridge', 'Those seeking outdoor space with flybridge'],
      ['Churrascos intimos com vista panoramica', 'Intimate BBQs with panoramic views'],
      ['Experiencia diferenciada com dois andares', 'Unique experience with two decks'],
      ['A partir de', 'From'],
      // FAQ section
      ['Duvidas', 'Questions'],
      ['Por que os precos sao diferentes entre os dias da semana?', 'Why are prices different between weekdays?'],
      ['O que esta incluso em todas as lanchas?', 'What is included in all boats?'],
      ['Todas as lanchas tem churrasqueira?', 'Do all boats have a BBQ grill?'],
      ['E se meu grupo tiver mais de 22 pessoas?', 'What if my group has more than 22 people?'],
      ['Como reservar a lancha escolhida?', 'How to book the chosen boat?'],
      ['Reservar pelo WhatsApp', 'Book via WhatsApp'],
      ['Ver Todas as Duvidas', 'View All Questions'],
      // FAQ answers (long paragraphs)
      ['<strong>Os precos de segunda a quinta sao promocionais porque a demanda e menor.</strong>\n                    Sexta, sabado e domingo tem alta procura, o que justifica valores diferenciados.\n                    Reservando durante a semana, você pode economizar ate R$ 500 em uma única viagem.', '<strong>Prices from Monday to Thursday are promotional because demand is lower.</strong>\n                    Friday, Saturday and Sunday have high demand, which justifies different prices.\n                    By booking during the week, you can save up to R$ 500 on a single trip.'],
      ['<strong>Todas as 5 lanchas proprias incluem:</strong> combustível para o roteiro contratado,\n                    marinheiro habilitado pela Marinha do Brasil, coolers para bebidas (gelo nao incluso),\n                    sistema de som Bluetooth, tapete flutuante, macarroes flutuantes, coletes salva-vidas\n                    e equipamentos de segurança homologados.', '<strong>All 5 own boats include:</strong> fuel for the booked route,\n                    captain licensed by the Brazilian Navy, drink coolers (ice not included),\n                    Bluetooth sound system, floating mat, pool noodles, life jackets\n                    and certified safety equipment.'],
      ['<strong>Sim, todas as 5 lanchas proprias possuem churrasqueira.</strong>\n                    O uso requer contratacao de serviço adicional, com taxa que varia de R$ 250 a R$ 600\n                    dependendo da embarcação. O serviço inclui carnes, acompanhamentos e preparacao.\n                    Consulte nosso time para mais detalhes.', '<strong>Yes, all 5 own boats have a BBQ grill.</strong>\n                    Use requires an additional service, with a fee ranging from R$ 250 to R$ 600\n                    depending on the boat. The service includes meats, sides and preparation.\n                    Contact our team for more details.'],
      // CTA
      ['Ainda tem duvidas sobre qual lancha escolher?', 'Still not sure which boat to choose?'],
      ['Nossa equipe conhece cada detalhe das embarcações e pode sugerir a opção perfeita para seu grupo e ocasiao. Fale conosco!', 'Our team knows every detail of the boats and can suggest the perfect option for your group and occasion. Contact us!'],
      ['Falar com Especialista', 'Talk to a Specialist'],
      ['Atualizado em fevereiro de 2026', 'Updated in February 2026'],
      // Schema.org - LocalBusiness
      ['Aluguel de lanchas no Rio de Janeiro. Passeios privativos com conforto e segurança.', 'Boat rentals in Rio de Janeiro. Private trips with comfort and safety.'],
      // FAQ answer with EN link (after step 16 link replacement)
      ['Veja todas as lanchas', 'View all boats'],
      // Partner boat table descriptions (long strings first)
      ['Mesmo modelo da WeBoat 32, muito parecida', 'Same model as WeBoat 32, very similar'],
      ['Mesmo modelo da Oceanic 36, mais bem equipada', 'Same model as Oceanic 36, better equipped'],
      ['Mesmo modelo da Oceanic 36, fly bridge estendido', 'Same model as Oceanic 36, extended fly bridge'],
      ['Ar condicionado disponível, mais larga que as demais de 50 pés', 'Air conditioning available, wider than other 50-foot boats'],
      ['Saveiro gourmet com rooftop, desenhado para eventos', 'Gourmet saveiro with rooftop, designed for events'],
      ['Iate 55 pés com ar condicionado e gerador', 'Yacht 55 feet with air conditioning and generator'],
      ['Iate de luxo Prestige, ar condicionado, SUP incluso, turno 6h', 'Luxury Prestige yacht, air conditioning, SUP included, 6-hour shift'],
      ['Iate Schaefer com flybridge, 2 andares, ar condicionado, turno 6h', 'Schaefer yacht with flybridge, 2 decks, air conditioning, 6-hour shift'],
      ['Iate Intermarine com flybridge, ar condicionado, maior capacidade luxo', 'Intermarine yacht with flybridge, air conditioning, largest luxury capacity'],
      // FAQ answer (booking info)
      ['Reservamos com 50% de sinal via PIX ou cartao, e o restante e pago no dia do passeio.', 'We book with a 50% deposit via PIX or card, and the remainder is paid on the day of the trip.'],
      ['Similar à Magna 28, um pouco maior e mais confortável', 'Similar to Magna 28, slightly larger and more comfortable'],
      ['Excelente espaço para 36 pés, preço acessível', 'Excellent space for 36 feet, affordable price'],
      ['Bem larga com integração interna/externa', 'Very wide with indoor/outdoor integration'],
      ['Design diferente (trawler), espaço com bancos em volta para eventos', 'Different design (trawler), seating area around for events'],
      ['Similar à Rio Star 50, praticamente mesmo espaço', 'Similar to Rio Star 50, practically the same space'],
      ['Modelo exclusivo da época do Ayrton Senna, pouquíssimas unidades', 'Exclusive model from the Ayrton Senna era, very few units'],
      ['Integração interna/externa, maior capacidade na faixa de 50 pés', 'Indoor/outdoor integration, largest capacity in the 50-foot range'],
      ['Premium custo-benefício: conforto de luxo, totalmente reformada', 'Premium value: luxury comfort, fully refurbished'],
      ['60 pés redesenhada para eventos, melhor custo-benefício nesse porte', '60 feet redesigned for events, best value at this size'],
      // REMOVED: these entries were wrong (PT side didn't match source) — fixed versions moved before ['Lancha','Boat']
    ],
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
    contentBlocks: [
      // Schema.org ItemList name (full string to prevent mixed PT/EN from dictionary)
      ['"name": "Roteiros de Passeio de Lancha no Rio de Janeiro"', '"name": "Boat Trip Routes in Rio de Janeiro"'],
      // Schema.org main description and route descriptions (must come first — longest strings)
      ['"description": "Os melhores roteiros para seu passeio de lancha no Rio de Janeiro"', '"description": "The best routes for your boat trip in Rio de Janeiro"'],
      ['"description": "Passeio de lancha pela Mureta da Urca com vista para o Pão de Açúcar. Melhor custo-benefício."', '"description": "Boat trip along Mureta da Urca with a view of Sugarloaf Mountain. Best value."'],
      ['"description": "Nosso roteiro mais vendido! Inclui Urca + Praia Vermelha com parada para banho."', '"description": "Our best-selling route! Includes Urca + Praia Vermelha with a swimming stop."'],
      ['"description": "Vista icônica da orla de Copacabana do mar. Perfeito para fotos."', '"description": "Iconic view of the Copacabana coastline from the sea. Perfect for photos."'],
      ['"description": "Aventura em mar aberto até as Ilhas Cagarras. Águas cristalinas e vida marinha."', '"description": "Open sea adventure to Ilhas Cagarras. Crystal-clear waters and marine life."'],
      ['"description": "Praias semi-desertas de Itaipu e Camboinhas em Niterói. O mais exclusivo."', '"description": "Secluded beaches of Itaipu and Camboinhas in Niteroi. The most exclusive."'],
      ['"description": "Experiência completa com todos os roteiros em um único passeio."', '"description": "Complete experience with all routes in a single trip."'],
      // Schema.org FAQ answers (plain text — must come first before shorter substrings)
      ['"text": "Para primeira vez, recomendamos o Roteiro Mureta da Urca (5h) ou Praia Vermelha (5h). Ambos são em águas calmas dentro da Baía de Guanabara. A Urca oferece vista para o Pão de Açúcar e é ideal para famílias."', '"text": "For a first time, we recommend the Mureta da Urca Route (5h) or Praia Vermelha (5h). Both are in calm waters within Guanabara Bay. Urca offers views of Sugarloaf Mountain and is ideal for families."'],
      ['"text": "Os passeios de lancha no Rio custam a partir de R$ 2.300 para grupos de até 15 pessoas (5 horas). O valor é por lancha, não por pessoa. Roteiros mais longos como Ilhas Cagarras custam a partir de R$ 3.600."', '"text": "Boat trips in Rio start from R$ 2,300 for groups of up to 15 people (5 hours). The price is per boat, not per person. Longer routes like Ilhas Cagarras start from R$ 3,600."'],
      ['"text": "Todos os passeios incluem combustível, marinheiro habilitado pela Marinha, tapete flutuante, macarrões, som Bluetooth e coolers. Você pode levar bebidas e petiscos sem custo adicional. Opcionais como churrasco, decoração e open bar têm taxa extra."', '"text": "All trips include fuel, a Navy-licensed captain, floating mat, pool noodles, Bluetooth speakers and coolers. You can bring your own drinks and snacks at no extra charge. Extras like BBQ, decoration and open bar have an additional fee."'],
      ['"text": "Sim, todos os roteiros podem ser personalizados. Trabalhamos com sugestões mas adaptamos conforme sua preferência. Quer combinar Urca + Copacabana? Ou estender o tempo? Fale com nossa equipe pelo WhatsApp."', '"text": "Yes, all routes can be customized. We work with suggestions but adapt according to your preferences. Want to combine Urca + Copacabana? Or extend the time? Talk to our team via WhatsApp."'],
      ['"text": "O Rio de Janeiro tem clima favorável o ano todo. Verão (dezembro a março) é alta temporada com mar mais calmo. Inverno tem preços menores. Para roteiros em mar aberto como Ilhas Cagarras, preferimos dias com pouco vento."', '"text": "Rio de Janeiro has favorable weather year-round. Summer (December to March) is peak season with calmer seas. Winter has lower prices. For open sea routes like Ilhas Cagarras, we prefer days with little wind."'],
      // Alt text (routes/index page-specific — full PT source strings)
      ['Vista panorâmica da orla de Copacabana com Pão de Açúcar ao fundo', 'Panoramic view of the Copacabana coastline with Sugarloaf Mountain in the background'],
      ['MAC Niterói visto do mar com Cristo Redentor - Roteiro Volta Completa', 'MAC Niteroi seen from the sea with Christ the Redeemer - Full Tour Route'],
      // Long strings containing 'Roteiro' — must run BEFORE short 'Roteiro N' entries
      ['Recomendamos o <strong>Roteiro 2 (Praia Vermelha)</strong>! É o favorito de 60% dos nossos\n            clientes. Oferece duas paradas para mergulho, vistas incríveis e o melhor custo-benefício.', 'We recommend <strong>Route 2 (Praia Vermelha)</strong>! It is the favorite of 60% of our\n            clients. It offers two swimming stops, incredible views and the best value for money.'],
      ['Ver Roteiro Praia Vermelha', 'View Praia Vermelha Route'],
      ['Para primeira vez, recomendamos o Roteiro Mureta da Urca (5h) ou Praia Vermelha (5h). Ambos são em águas calmas dentro da Baía de Guanabara.', 'For a first time, we recommend the Mureta da Urca Route (5h) or Praia Vermelha (5h). Both are in calm waters within Baía de Guanabara.'],
      ['Roteiros mais longos como Ilhas Cagarras (5h) custam a partir de R$ 3.600. Consulte nossa <a href="/en/boats/">página de lanchas</a> para ver preços detalhados por embarcação.', 'Longer routes like Ilhas Cagarras (5h) start from R$ 3,600. Check our <a href="/en/boats/">boats page</a> for detailed pricing per vessel.'],
      ['Roteiro mais próximo, ideal para eventos e festas. Mais tempo de paradas para mergulho\n                e menos navegação. Águas calmas da Baía de Guanabara.', 'Closest route, ideal for events and parties. More time for swimming stops\n                and less sailing. Calm waters of Baía de Guanabara.'],
      ['Roteiro Especial', 'Special Route'],
      // Longer strings first (must precede 'Nossos Roteiros' to avoid substring corruption)
      ['Conheça Nossos Roteiros', 'Discover Our Routes'],
      // Page header
      ['Nossos Roteiros', 'Our Routes'],
      ['Passeio de Lancha no Rio de Janeiro', 'Boat Trips in Rio de Janeiro'],
      ['Escolha o roteiro ideal para seu passeio de lancha. Do clássico passeio na Urca\n          até a aventura nas Ilhas Cagarras, temos opções para todos os gostos e orçamentos.', 'Choose the ideal route for your boat trip. From the classic Urca trip\n          to the Ilhas Cagarras adventure, we have options for all tastes and budgets.'],
      ['Roteiro 1 - Mureta da Urca', 'Route 1 - Mureta da Urca'],
      ['Roteiro 2 - Praia Vermelha', 'Route 2 - Praia Vermelha'],
      ['Roteiro 3 - Copacabana', 'Route 3 - Copacabana'],
      ['Roteiro 4 - Ilhas Cagarras', 'Route 4 - Ilhas Cagarras'],
      ['Roteiro 5 - Itaipu/Niterói', 'Route 5 - Itaipu/Niteroi'],
      // Grid section
      ['Escolha seu passeio', 'Choose your trip'],
      ['Roteiros Disponíveis', 'Available Routes'],
      ['Melhor custo-benefício', 'Best value'],
      ['Roteiro 1', 'Route 1'],
      ['Roteiro mais próximo, ideal para eventos e festas. Mais tempo de paradas para mergulho\n                e menos navegação. Águas calmas da Baía de Guanabara.', 'Closest route, ideal for events and parties. More time for swimming stops\n                and less sailing. Calm waters of Baía de Guanabara.'],
      ['Mais Vendido', 'Best Seller'],
      ['Roteiro 2', 'Route 2'],
      ['Nosso passeio mais vendido! Bom equilíbrio entre navegação e paradas. Duas paradas\n                para mergulho com vista única do bondinho do Pão de Açúcar.', 'Our best-selling trip! Great balance between sailing and stops. Two swimming\n                stops with a unique view of the Pão de Açúcar cable car.'],
      ['Vista icônica', 'Iconic view'],
      ['Roteiro 3', 'Route 3'],
      ['Vista panorâmica da orla mais famosa do Brasil! Equilíbrio entre navegação e\n                paradas - perfeito para fotos inesquecíveis.', 'Panoramic view of the most famous coastline in Brazil! Balance between sailing and\n                stops - perfect for unforgettable photos.'],
      ['Mar aberto', 'Open sea'],
      ['Roteiro 4', 'Route 4'],
      ['Aventura em mar aberto até as Ilhas Cagarras! Navegação oceânica e mergulho em\n                águas cristalinas. Para os mais aventureiros.', 'Open sea adventure to Ilhas Cagarras! Ocean sailing and swimming in\n                crystal-clear waters. For the most adventurous.'],
      ['Praias desertas', 'Secluded beaches'],
      ['Roteiro 5', 'Route 5'],
      ['Nosso roteiro mais exclusivo! Atravesse a Baía de Guanabara e descubra as praias\n                semi-desertas de Camboinhas e Itaipu em Niterói.', 'Our most exclusive route! Cross Baía de Guanabara and discover the\n                secluded beaches of Camboinhas and Itaipu in Niteroi.'],
      ['Experiência completa', 'Complete experience'],
      ['Roteiro Especial', 'Special Route'],
      ['A experiência definitiva! Combine os melhores pontos de todos os roteiros em um\n                único passeio de lancha inesquecível pelo Rio de Janeiro.', 'The ultimate experience! Combine the best spots from all routes in one\n                unforgettable boat trip through Rio de Janeiro.'],
      ['Travessia', 'Crossing'],
      // CTA after cards
      ['Ficou com dúvida? Nossa equipe pode ajudar você a escolher o roteiro ideal!', 'Have questions? Our team can help you choose the ideal route!'],
      ['Falar com Especialista', 'Talk to a Specialist'],
      // Compare table
      ['Qual Roteiro Escolher?', 'Which Route to Choose?'],
      ['Roteiro', 'Route'],
      ['Turno', 'Duration'],
      ['Para quem busca', 'For those who want'],
      ['Ideal para', 'Ideal for'],
      ['Mais tempo de mergulho, menos navegação', 'More swimming time, less sailing'],
      ['Eventos, festas', 'Events, parties'],
      ['Todos os perfis', 'Everyone'],
      ['Mais tempo de navegação, menos mergulho', 'More sailing time, less swimming'],
      ['Fotos, turistas', 'Photos, tourists'],
      ['Mergulho, aventura', 'Snorkeling, adventure'],
      ['Exclusividade', 'Exclusivity'],
      ['Passeio completo com todos os pontos', 'Full tour with all highlights'],
      // Recommendation
      ['Não sabe qual escolher?', 'Not sure which one to choose?'],
      ['Recomendamos o <strong>Roteiro 2 (Praia Vermelha)</strong>! É o favorito de 60% dos nossos\n            clientes. Oferece duas paradas para mergulho, vistas incríveis e o melhor custo-benefício.', 'We recommend <strong>Route 2 (Praia Vermelha)</strong>! It is the favorite of 60% of our\n            clients. It offers two swimming stops, incredible views and the best value for money.'],
      ['Ver Roteiro Praia Vermelha', 'View Praia Vermelha Route'],
      // FAQ
      ['Dúvidas Frequentes sobre Passeios de Lancha', 'Frequently Asked Questions about Boat Trips'],
      ['Qual o melhor roteiro para primeira vez em passeio de lancha?', 'What is the best route for a first-time boat trip?'],
      ['Para primeira vez, recomendamos o Roteiro Mureta da Urca (5h) ou Praia Vermelha (5h). Ambos são em águas calmas dentro da Baía de Guanabara.', 'For a first time, we recommend the Mureta da Urca Route (5h) or Praia Vermelha (5h). Both are in calm waters within Baía de Guanabara.'],
      ['A Urca oferece vista para o Pão de Açúcar e é ideal para famílias. Veja nossas <a href="/en/boats/">lanchas disponíveis</a> para escolher a melhor opção para seu grupo.', 'Urca offers views of Pão de Açúcar and is ideal for families. See our <a href="/en/boats/">available boats</a> to choose the best option for your group.'],
      ['Quanto custa um passeio de lancha no Rio de Janeiro?', 'How much does a boat trip in Rio de Janeiro cost?'],
      ['Os passeios de lancha no Rio custam a partir de R$ 2.300 para grupos de até 15 pessoas (5 horas). O valor é por lancha, não por pessoa.', 'Boat trips in Rio start from R$ 2,300 for groups of up to 15 people (5 hours). The price is per boat, not per person.'],
      ['Roteiros mais longos como Ilhas Cagarras (5h) custam a partir de R$ 3.600. Consulte nossa <a href="/en/boats/">página de lanchas</a> para ver preços detalhados por embarcação.', 'Longer routes like Ilhas Cagarras (5h) start from R$ 3,600. Check our <a href="/en/boats/">boats page</a> for detailed pricing per vessel.'],
      ['O que está incluso no passeio de lancha?', 'What is included in the boat trip?'],
      ['Todos os passeios incluem combustível, marinheiro habilitado pela Marinha, tapete flutuante, macarrões, som Bluetooth e coolers.', 'All trips include fuel, a Navy-licensed captain, floating mat, pool noodles, Bluetooth speakers and coolers.'],
      ['Você pode levar bebidas e petiscos sem custo adicional. Opcionais como <a href="/en/services/">churrasco na lancha</a>, decoração e open bar têm taxa extra.', 'You can bring your own drinks and snacks at no extra charge. Extras like <a href="/en/services/">BBQ on the boat</a>, decoration and open bar have an additional fee.'],
      ['Posso personalizar o roteiro do passeio?', 'Can I customize the trip route?'],
      ['Sim, todos os roteiros podem ser personalizados. Trabalhamos com sugestões mas adaptamos conforme sua preferência.', 'Yes, all routes can be customized. We work with suggestions but adapt according to your preferences.'],
      ['Quer combinar Urca + Copacabana? Ou estender o tempo? Fale com nossa equipe pelo WhatsApp para criar o passeio ideal.', 'Want to combine Urca + Copacabana? Or extend the time? Talk to our team via WhatsApp to create the ideal trip.'],
      ['Qual a melhor época para fazer passeio de lancha no Rio?', 'When is the best time for a boat trip in Rio?'],
      ['O Rio de Janeiro tem clima favorável o ano todo. Verão (dezembro a março) é alta temporada com mar mais calmo. Inverno tem preços menores.', 'Rio de Janeiro has favorable weather year-round. Summer (December to March) is peak season with calmer seas. Winter has lower prices.'],
      ['Para roteiros em mar aberto como <a href="/en/routes/ilhas-cagarras/">Ilhas Cagarras</a>, preferimos dias com pouco vento. A equipe confirma condições antes do passeio.', 'For open sea routes like <a href="/en/routes/ilhas-cagarras/">Ilhas Cagarras</a>, we prefer days with little wind. The team confirms conditions before the trip.'],
      ['E se o tempo estiver ruim no dia do passeio?', 'What if the weather is bad on the day of the trip?'],
      ['Se houver condições climáticas adversas, reagendamos sem custo adicional ou devolvemos 100% do valor.', 'If there are adverse weather conditions, we reschedule at no extra charge or refund 100% of the amount.'],
      ['Nossa equipe monitora a previsão e avisa com antecedência. Saiba mais em nossa <a href="/en/faq/">página de perguntas frequentes</a>.', 'Our team monitors the forecast and notifies you in advance. Learn more on our <a href="/en/faq/">frequently asked questions page</a>.'],
      // CTA Final
      ['Reserve Agora e Garanta sua Data', 'Book Now and Secure Your Date'],
      ['Datas concorridas esgotam rápido, especialmente nos finais de semana.\n            Garanta seu passeio com antecedência!', 'Popular dates sell out fast, especially on weekends.\n            Book your trip in advance!'],
      ['Reservar pelo WhatsApp', 'Book via WhatsApp'],
      ['Atualizado em fevereiro de 2026', 'Updated February 2026'],
    ],
  },
  {
    ptPath: 'roteiros/mureta-da-urca/index.html',
    enPath: 'en/routes/mureta-da-urca/index.html',
    title: 'Mureta da Urca Boat Trip | Best Value Route | WeBoat Brasil',
    description: 'Boat trip to Mureta da Urca in Rio de Janeiro. 5-hour tour with views of Sugarloaf Mountain. From R$ 2,300. Book now!',
    keywords: 'mureta da urca boat trip, boat tour sugarloaf, urca boat rio',
    waMessage: 'Hello! I would like to do the Mureta da Urca route. What is the availability? [via site - en]',
    css: 'roteiros',
    contentBlocks: [
      // Schema.org FAQ answers (plain text — must come first before shorter substrings)
      // Schema.org main description
      ['"description": "Passeio de lancha na Urca com vista para o Pão de Açúcar. Melhor custo-benefício para passeio de barco no Rio de Janeiro. Duração de 5 horas com saída da Marina da Glória."', '"description": "Boat trip in Urca with a view of Sugarloaf Mountain. Best value for a boat trip in Rio de Janeiro. 5-hour trip departing from Marina da Gloria."'],
      // Schema.org FAQ answers (plain text — must come first before shorter substrings)
      ['"text": "O turno total e de 5 horas (manha: 09h-14h ou tarde: 14h30-19h30). O tempo de navegacao e de aproximadamente 1h30, e o restante (cerca de 3h30) e dedicado a paradas para mergulho, banho e relaxamento na Mureta da Urca."', '"text": "The total shift is 5 hours (morning: 09h-14h or afternoon: 14h30-19h30). The sailing time is approximately 1h30, and the rest (about 3h30) is dedicated to swimming stops, bathing and relaxation at Mureta da Urca."'],
      ['"text": "O valor varia conforme a lancha escolhida e o dia da semana. Entre em contato pelo WhatsApp para receber um orcamento personalizado. Todas as lanchas incluem combustivel, marinheiro, som Bluetooth e coolers."', '"text": "The price varies depending on the boat chosen and the day of the week. Contact us via WhatsApp for a personalized quote. All boats include fuel, captain, Bluetooth speakers and coolers."'],
      ['"text": "Sim! O roteiro da Mureta da Urca é todo realizado dentro da Baía de Guanabara, com águas calmas e protegidas. É o roteiro ideal para famílias com crianças ou pessoas que estão fazendo seu primeiro passeio de lancha."', '"text": "Yes! The Mureta da Urca route is entirely within Guanabara Bay, with calm and protected waters. It is the ideal route for families with children or people taking their first boat trip."'],
      ['"text": "Sim! Você pode levar suas próprias bebidas e petiscos sem custo adicional. A lancha conta com coolers inclusos. Também oferecemos serviços de churrasco e open bar mediante contratação."', '"text": "Yes! You can bring your own drinks and snacks at no extra cost. The boat has coolers included. We also offer BBQ and open bar services upon request."'],
      // Hero
      ['Melhor custo-benefício', 'Best value'],
      ['Roteiro 1 - Mureta da Urca', 'Route 1 - Mureta da Urca'],
      ['Turno de 5h', '5-hour trip'],
      ['Mar calmo', 'Calm sea'],
      // Description
      ['Sobre o Passeio', 'About the Trip'],
      ['O passeio de lancha na Urca é perfeito para quem quer conhecer as paisagens mais\n                  icônicas do Rio de Janeiro gastando menos. Este tour de lancha oferece a experiência\n                  completa em águas calmas da Baía de Guanabara, ideal para famílias e primeira vez\n                  em passeio de barco.', 'The boat trip in Urca is perfect for those who want to see the most iconic\n                  landscapes of Rio de Janeiro while spending less. This boat tour offers a complete\n                  experience in the calm waters of Baía de Guanabara, ideal for families and first-time\n                  boat trips.'],
      ['Durante o trajeto, você vai apreciar vistas deslumbrantes do centro do Rio, passar\n                  pelo Aterro do Flamengo, contornar a Enseada de Botafogo com o Pão de Açúcar ao\n                  fundo, e fazer uma parada para mergulho na famosa Mureta da Urca.', 'Along the way, you will enjoy stunning views of downtown Rio, pass\n                  by the Aterro do Flamengo, sail around Enseada de Botafogo with Pão de Açúcar in the\n                  background, and make a swimming stop at the famous Mureta da Urca.'],
      ['É o roteiro ideal para quem está fazendo seu primeiro passeio de lancha no Rio\n                  de Janeiro ou para grupos que buscam a melhor relação custo-benefício.', 'This is the ideal route for those taking their first boat trip in Rio\n                  de Janeiro or for groups looking for the best value for money.'],
      // Route stops
      ['Trajeto do Passeio', 'Trip Route'],
      ['Ponto de embarque - Recepção e briefing de segurança', 'Boarding point - Reception and safety briefing'],
      ['Enseada do Flamengo', 'Flamengo Cove'],
      ['Vista panorâmica do centro do Rio e Aterro do Flamengo', 'Panoramic view of downtown Rio and Aterro do Flamengo'],
      ['Enseada de Botafogo', 'Botafogo Cove'],
      ['Vista privilegiada do Pão de Açúcar e Cristo Redentor', 'Privileged view of Pão de Açúcar and Cristo Redentor'],
      ['Parada para mergulho em águas calmas - tempo livre para banho', 'Swimming stop in calm waters - free time for bathing'],
      ['Parada para mergulho', 'Swimming stop'],
      ['Retorno e desembarque', 'Return and disembarkation'],
      // Highlights
      ['Por que escolher este roteiro?', 'Why choose this route?'],
      ['Melhor custo-beneficio para passeio de lancha', 'Best value for a boat trip'],
      ['Águas calmas - ideal para crianças', 'Calm waters - ideal for children'],
      ['Vista do Pão de Açúcar e Cristo Redentor', 'Views of Pão de Açúcar and Cristo Redentor'],
      ['Parada para mergulho na Mureta da Urca', 'Swimming stop at Mureta da Urca'],
      // Available boats
      ['Lanchas Disponíveis para este Roteiro', 'Boats Available for this Route'],
      ['Ver Todas as Lanchas', 'View All Boats'],
      // Sidebar
      ['Duracao', 'Duration'],
      ['Mais tempo de mergulho, menos navegação', 'More swimming time, less sailing'],
      ['Ver Lanchas Disponíveis', 'View Available Boats'],
      ['Combustível incluso', 'Fuel included'],
      ['Marinheiro habilitado', 'Licensed captain'],
      // FAQ
      ['Perguntas Frequentes sobre o Passeio na Urca', 'Frequently Asked Questions about the Urca Trip'],
      ['Quanto tempo dura o passeio na Mureta da Urca?', 'How long is the Mureta da Urca trip?'],
      ['O turno total e de <strong>5 horas</strong> (manha: 09h-14h ou tarde: 14h30-19h30). O tempo de navegacao e de aproximadamente <strong>1h30</strong>, e o restante (cerca de 3h30) e dedicado a paradas para mergulho, banho e relaxamento na Mureta da Urca.', 'The total shift is <strong>5 hours</strong> (morning: 9am-2pm or afternoon: 2:30pm-7:30pm). Sailing time is approximately <strong>1h30</strong>, and the rest (about 3h30) is dedicated to swimming stops, bathing and relaxation at Mureta da Urca.'],
      ['Como saber o valor do passeio de lancha na Urca?', 'How do I find out the price of the boat trip in Urca?'],
      ['O valor varia conforme a lancha escolhida e o dia da semana. Entre em contato pelo <strong>WhatsApp</strong> para receber um orcamento personalizado. Todas as lanchas incluem combustivel, marinheiro, som Bluetooth e coolers.', 'The price varies depending on the boat chosen and the day of the week. Contact us via <strong>WhatsApp</strong> for a personalized quote. All boats include fuel, captain, Bluetooth speakers and coolers.'],
      ['O mar é calmo no roteiro da Mureta da Urca?', 'Is the sea calm on the Mureta da Urca route?'],
      ['<strong>Sim!</strong> O roteiro da Mureta da Urca é todo realizado dentro da Baía de Guanabara, com águas calmas e protegidas. É o roteiro ideal para famílias com crianças ou pessoas fazendo seu primeiro passeio de lancha.', '<strong>Yes!</strong> The Mureta da Urca route is entirely within Baía de Guanabara, with calm and protected waters. It is the ideal route for families with children or people taking their first boat trip.'],
      ['Posso levar bebidas e comidas para o passeio?', 'Can I bring drinks and food on the trip?'],
      ['<strong>Sim!</strong> Você pode levar suas próprias bebidas e petiscos sem custo adicional. A lancha conta com coolers inclusos. Também oferecemos serviços de churrasco e open bar mediante contratação.', '<strong>Yes!</strong> You can bring your own drinks and snacks at no extra cost. The boat has coolers included. We also offer BBQ and open bar services upon request.'],
      // Other routes section
      ['Explore Outros Roteiros', 'Explore Other Routes'],
      ['Conheça outras opções de passeio de lancha no Rio de Janeiro', 'Discover other boat trip options in Rio de Janeiro'],
      ['5h de passeio', '5-hour trip'],
      ['A partir de R$ 2.500', 'From R$ 2,500'],
      ['A partir de R$ 3.000', 'From R$ 3,000'],
      ['A partir de R$ 3.600', 'From R$ 3,600'],
      ['Ver Roteiro', 'View Route'],
      ['Mais vendido', 'Best seller'],
      ['Vista icônica', 'Iconic view'],
      ['Mar aberto', 'Open sea'],
      // CTA
      ['Pronto para conhecer a Urca?', 'Ready to discover Urca?'],
      ['Reserve agora seu passeio de lancha na Mureta da Urca e viva uma experiência\n            inesquecível com vista para o Pão de Açúcar!', 'Book your boat trip to Mureta da Urca now and live an unforgettable\n            experience with views of Pão de Açúcar!'],
      ['Reservar Agora', 'Book Now'],
    ],
  },
  {
    ptPath: 'roteiros/praia-vermelha/index.html',
    enPath: 'en/routes/praia-vermelha/index.html',
    title: 'Praia Vermelha Boat Trip | Most Popular Route | WeBoat Brasil',
    description: 'Boat trip to Praia Vermelha (Red Beach) in Rio. Our most popular route! 5 hours from R$ 2,500. Stunning views of Sugarloaf.',
    keywords: 'praia vermelha boat trip, red beach boat rio, most popular boat tour',
    waMessage: 'Hello! I would like to do the Praia Vermelha route. What is the availability? [via site - en]',
    css: 'roteiros',
    contentBlocks: [
      // *** Schema.org main description (MUST be first — very long string) ***
      ['"description": "Nosso passeio de lancha mais vendido! Inclui Urca + Praia Vermelha com parada para banho e vista do bondinho. Duração de 5 horas com saída da Marina da Glória."', '"description": "Our best-selling boat trip! Includes Urca + Praia Vermelha with a swimming stop and views of the cable car. 5 hours departing from Marina da Gloria."'],
      // Schema.org FAQ names
      ['"name": "Por que o roteiro Praia Vermelha é o mais vendido?"', '"name": "Why is the Praia Vermelha route the best seller?"'],
      ['"name": "Qual a duração do passeio até a Praia Vermelha?"', '"name": "How long is the trip to Praia Vermelha?"'],
      ['"name": "Como saber o valor do passeio de lancha ate a Praia Vermelha?"', '"name": "How do I find out the price of the boat trip to Praia Vermelha?"'],
      // Schema.org TouristAttraction names
      ['"name": "Teleférico do Pão de Açúcar"', '"name": "Sugarloaf Mountain Cable Car"'],
      // Praia Vermelha TouristAttraction description
      ['"description": "Praia ao pé do Pão de Açúcar com águas calmas, ideal para parada e banho"', '"description": "Beach at the foot of Sugarloaf Mountain with calm waters, ideal for a swimming stop"'],
      // Schema.org FAQ answers (plain text — must come first before shorter substrings)
      ['"text": "O roteiro Praia Vermelha é escolhido por 60% dos nossos clientes porque oferece o equilíbrio perfeito entre custo, tempo e experiência. Inclui 2 paradas para mergulho (Mureta da Urca e Praia Vermelha) e a vista única do bondinho do Pão de Açúcar passando sobre sua cabeça."', '"text": "The Praia Vermelha route is chosen by 60% of our clients because it offers the perfect balance between cost, time and experience. It includes 2 swimming stops (Mureta da Urca and Praia Vermelha) and the unique view of the Sugarloaf Mountain cable car passing over your head."'],
      ['"text": "O turno total e de 5 horas (manha: 09h-14h ou tarde: 14h30-19h30). O tempo de navegacao e de aproximadamente 2 horas, e o restante (cerca de 3h) e dedicado as duas paradas para mergulho e banho na Mureta da Urca e Praia Vermelha."', '"text": "The total shift is 5 hours (morning: 09h-14h or afternoon: 14h30-19h30). The sailing time is approximately 2 hours, and the rest (about 3h) is dedicated to two swimming stops at Mureta da Urca and Praia Vermelha."'],
      ['"text": "O valor varia conforme a lancha escolhida e o dia da semana. Entre em contato pelo WhatsApp para receber um orcamento personalizado. Todas as lanchas incluem combustivel, marinheiro, som Bluetooth e coolers."', '"text": "The price varies depending on the boat chosen and the day of the week. Contact us via WhatsApp for a personalized quote. All boats include fuel, captain, Bluetooth speakers and coolers."'],
      ['"text": "Todos os nossos passeios incluem: combustível, marinheiro habilitado, tapete flutuante, macarrões flutuantes, sistema de som Bluetooth, coolers. Você pode levar suas próprias bebidas e petiscos sem custo adicional."', '"text": "All our trips include: fuel, licensed captain, floating mat, pool noodles, Bluetooth sound system, coolers. You can bring your own drinks and snacks at no extra cost."'],
      // Visible HTML FAQ answer (different from Schema — has <strong>)
      ['O roteiro Praia Vermelha é escolhido por <strong>60% dos nossos clientes</strong> porque oferece o equilíbrio perfeito entre custo, tempo e experiência. Inclui 2 paradas para mergulho e a vista única do bondinho do Pão de Açúcar.', 'The Praia Vermelha route is chosen by <strong>60% of our clients</strong> because it offers the perfect balance between cost, time and experience. It includes 2 swimming stops and the unique view of the Sugarloaf Mountain cable car.'],
      // Hero
      ['Mais Vendido', 'Best Seller'],
      ['Roteiro 2 - Praia Vermelha', 'Route 2 - Praia Vermelha'],
      ['Turno de 5h', '5-hour trip'],
      ['Mar calmo a moderado', 'Calm to moderate sea'],
      // Description
      ['Sobre o Passeio', 'About the Trip'],
      ['O passeio de lancha até a Praia Vermelha é nosso tour mais popular! Escolhido por\n                  60% dos nossos clientes, esse roteiro oferece o equilíbrio perfeito entre custo,\n                  tempo e experiência.', 'The boat trip to Praia Vermelha is our most popular tour! Chosen by\n                  60% of our clients, this route offers the perfect balance between cost,\n                  time and experience.'],
      ['Inclui tudo do Roteiro 1 (Urca) mais uma parada adicional na paradisíaca Praia\n                  Vermelha, onde você terá uma vista única do bondinho do Pão de Açúcar passando\n                  sobre sua cabeça enquanto relaxa nas águas cristalinas.', 'It includes everything from Route 1 (Urca) plus an additional stop at the paradisiacal Praia\n                  Vermelha, where you will have a unique view of the Pão de Açúcar cable car passing\n                  over your head while you relax in the crystal-clear waters.'],
      ['Com duas paradas para mergulho - Mureta da Urca e Praia Vermelha - este passeio\n                  oferece o melhor custo-benefício em aluguel de lancha no Rio de Janeiro. Perfeito\n                  para aniversários, passeios em família e qualquer celebração.', 'With two swimming stops - Mureta da Urca and Praia Vermelha - this trip\n                  offers the best value in boat rental in Rio de Janeiro. Perfect\n                  for birthdays, family outings and any celebration.'],
      // Route stops
      ['Trajeto do Passeio', 'Trip Route'],
      ['Ponto de embarque - Recepção e briefing de segurança', 'Boarding point - Reception and safety briefing'],
      ['Enseada do Flamengo', 'Flamengo Cove'],
      ['Vista panorâmica do centro do Rio', 'Panoramic view of downtown Rio'],
      ['Enseada de Botafogo', 'Botafogo Cove'],
      ['Vista do Pão de Açúcar e Cristo Redentor', 'Views of Pão de Açúcar and Cristo Redentor'],
      ['Primeira parada para mergulho em águas calmas', 'First swimming stop in calm waters'],
      ['1ª Parada para mergulho', '1st swimming stop'],
      ['Segunda parada - vista única do bondinho do Pão de Açúcar', 'Second stop - unique view of the Pão de Açúcar cable car'],
      ['2ª Parada para mergulho', '2nd swimming stop'],
      ['Retorno e desembarque', 'Return and disembarkation'],
      // Highlights
      ['Por que é o mais vendido?', 'Why is it the best seller?'],
      ['Escolha de 60% dos clientes', 'Chosen by 60% of clients'],
      ['2 paradas para mergulho', '2 swimming stops'],
      ['Vista única do bondinho', 'Unique cable car view'],
      ['Melhor custo-benefício', 'Best value'],
      // Available boats
      ['Lanchas Disponíveis para este Roteiro', 'Boats Available for this Route'],
      ['Ver Todas as Lanchas', 'View All Boats'],
      // Sidebar
      ['Duracao', 'Duration'],
      ['Mais tempo de mergulho, menos navegação', 'More swimming time, less sailing'],
      ['Ver Lanchas Disponíveis', 'View Available Boats'],
      ['Combustível incluso', 'Fuel included'],
      ['Marinheiro habilitado', 'Licensed captain'],
      // FAQ
      ['Perguntas Frequentes sobre o Passeio na Praia Vermelha', 'Frequently Asked Questions about the Praia Vermelha Trip'],
      ['Por que é o roteiro mais vendido?', 'Why is it the best-selling route?'],
      ['O roteiro Praia Vermelha é escolhido por <strong>60% dos nossos clientes</strong> porque oferece o equilíbrio perfeito entre custo, tempo e experiência. Inclui 2 paradas para mergulho e a vista única do bondinho do Pão de Açúcar.', 'The Praia Vermelha route is chosen by <strong>60% of our clients</strong> because it offers the perfect balance between cost, time and experience. It includes 2 swimming stops and the unique view of the Pão de Açúcar cable car.'],
      ['Qual a duração do passeio?', 'How long is the trip?'],
      ['O turno total e de <strong>5 horas</strong> (manha: 09h-14h ou tarde: 14h30-19h30). O tempo de navegacao e de aproximadamente <strong>2 horas</strong>, e o restante (cerca de 3h) e dedicado as duas paradas para mergulho e banho na Mureta da Urca e Praia Vermelha.', 'The total shift is <strong>5 hours</strong> (morning: 9am-2pm or afternoon: 2:30pm-7:30pm). Sailing time is approximately <strong>2 hours</strong>, and the rest (about 3h) is dedicated to the two swimming and bathing stops at Mureta da Urca and Praia Vermelha.'],
      ['Como saber o valor do passeio?', 'How do I find out the price?'],
      ['O valor varia conforme a lancha escolhida e o dia da semana. Entre em contato pelo <strong>WhatsApp</strong> para receber um orcamento personalizado. Todas as lanchas incluem combustivel, marinheiro, som Bluetooth e coolers.', 'The price varies depending on the boat chosen and the day of the week. Contact us via <strong>WhatsApp</strong> for a personalized quote. All boats include fuel, captain, Bluetooth speakers and coolers.'],
      ['O que está incluso no passeio?', 'What is included in the trip?'],
      ['Todos os passeios incluem: combustível para o roteiro contratado, marinheiro habilitado, tapete e macarrões flutuantes, som com Bluetooth, coolers.', 'All trips include: fuel for the booked route, licensed captain, floating mat and pool noodles, Bluetooth sound system, coolers.'],
      // Other routes section
      ['Explore Outros Roteiros', 'Explore Other Routes'],
      ['Conheça outras opções de passeio de lancha no Rio de Janeiro', 'Discover other boat trip options in Rio de Janeiro'],
      ['5h de passeio', '5-hour trip'],
      ['A partir de R$ 2.300', 'From R$ 2,300'],
      ['A partir de R$ 3.000', 'From R$ 3,000'],
      ['A partir de R$ 4.500', 'From R$ 4,500'],
      ['Ver Roteiro', 'View Route'],
      ['Melhor custo-benefício', 'Best value'],
      ['Vista icônica', 'Iconic view'],
      ['Experiência completa', 'Complete experience'],
      // CTA
      ['Escolha o favorito dos clientes!', 'Choose the clients\' favorite!'],
      ['Reserve agora o passeio de lancha mais vendido do Rio de Janeiro.\n            Duas praias paradisíacas e a melhor experiência no mar!', 'Book now the best-selling boat trip in Rio de Janeiro.\n            Two paradisiacal beaches and the best experience at sea!'],
      ['Reservar Agora', 'Book Now'],
    ],
  },
  {
    ptPath: 'roteiros/copacabana/index.html',
    enPath: 'en/routes/copacabana/index.html',
    title: 'Copacabana Boat Trip | Iconic View Route | WeBoat Brasil',
    description: 'Boat trip along Copacabana Beach in Rio de Janeiro. Iconic views! 5 hours from R$ 3,000. Book your private charter.',
    keywords: 'copacabana boat trip, boat tour copacabana, iconic view boat rio',
    waMessage: 'Hello! I would like to do the Copacabana route. What is the availability? [via site - en]',
    css: 'roteiros',
    contentBlocks: [
      // Schema.org main description
      ['"description": "Vista icônica da orla de Copacabana do mar. Perfeito para fotos inesquecíveis. Duração de 5 horas com saída da Marina da Glória, passando por Urca e Praia Vermelha."', '"description": "Iconic view of the Copacabana coastline from the sea. Perfect for unforgettable photos. 5-hour trip departing from Marina da Gloria, passing through Urca and Praia Vermelha."'],
      // Schema.org point descriptions
      ['"description": "Fortaleza histórica vista pelo mar com café e museu"', '"description": "Historic fortress seen from the sea with cafe and museum"'],
      ['"description": "Vista panorâmica da orla mais famosa do mundo a partir do mar"', '"description": "Panoramic view of the most famous coastline in the world from the sea"'],
      ['"description": "Parada para banho ao pé do Pão de Açúcar"', '"description": "Swimming stop at the foot of Sugarloaf Mountain"'],
      // Alt text (full strings)
      ['Vista panorâmica da orla de Copacabana com Pão de Açúcar ao fundo', 'Panoramic view of the Copacabana coastline with Sugarloaf Mountain in the background'],
      // Schema.org FAQ answers (plain text — must come before shorter substrings)
      ['"text": "O turno total e de 5 horas (manha: 09h-14h ou tarde: 14h30-19h30). E tempo suficiente para passar pela Urca, Praia Vermelha (com paradas para mergulho) e fazer a passagem panoramica pela orla de Copacabana."', '"text": "The total shift is 5 hours (morning: 09h-14h or afternoon: 14h30-19h30). It is enough time to pass through Urca, Praia Vermelha (with swimming stops) and make the panoramic passage along the Copacabana coastline."'],
      ['"text": "A passagem por Copacabana é panorâmica, perfeita para fotos. As paradas para mergulho são feitas na Mureta da Urca e Praia Vermelha, onde as águas são mais calmas e ideais para banho."', '"text": "The pass through Copacabana is panoramic, perfect for photos. Swimming stops are made at Mureta da Urca and Praia Vermelha, where the waters are calmer and ideal for bathing."'],
      ['"text": "O valor varia conforme a lancha escolhida e o dia da semana. Entre em contato pelo WhatsApp para receber um orcamento personalizado. Todas as lanchas incluem combustivel, marinheiro, som Bluetooth e coolers."', '"text": "The price varies depending on the boat chosen and the day of the week. Contact us via WhatsApp for a personalized quote. All boats include fuel, captain, Bluetooth speakers and coolers."'],
      ['"text": "O roteiro até Copacabana é perfeito para despedida de solteira! A passagem panorâmica pela orla mais famosa do Brasil rende fotos incríveis. Oferecemos também decoração temática e serviços de open bar."', '"text": "The Copacabana route is perfect for bachelorette parties! The panoramic passage along Brazil\'s most famous coastline makes for incredible photos. We also offer themed decoration and open bar services."'],
      // Visible HTML FAQ answer for duration
      ['O turno total e de <strong>5 horas</strong> (manha: 09h-14h ou tarde: 14h30-19h30). E tempo suficiente para passar pela Urca, Praia Vermelha (com paradas para mergulho) e fazer a passagem panoramica pela orla de Copacabana.', 'The total shift is <strong>5 hours</strong> (morning: 09h-14h or afternoon: 14h30-19h30). It is enough time to pass through Urca, Praia Vermelha (with swimming stops) and make the panoramic passage along the Copacabana coastline.'],
      // Hero
      ['Vista Icônica', 'Iconic View'],
      ['Roteiro 3 - Copacabana', 'Route 3 - Copacabana'],
      ['5 horas', '5 hours'],
      ['Mar calmo a moderado', 'Calm to moderate sea'],
      // Description
      ['Sobre o Passeio', 'About the Trip'],
      ['O passeio de lancha até Copacabana leva você à praia mais famosa do Brasil!\n                  Este tour de lancha inclui passagem panorâmica pela orla de Copacabana,\n                  perfeito para fotos inesquecíveis que vão impressionar qualquer um.', 'The boat trip to Copacabana takes you to the most famous beach in Brazil!\n                  This boat tour includes a panoramic pass along the Copacabana coastline,\n                  perfect for unforgettable photos that will impress anyone.'],
      ['O roteiro inclui tudo dos roteiros anteriores (Urca e Praia Vermelha) mais\n                  a icônica passagem pela orla de Copacabana, onde você terá a vista que só\n                  se vê em cartões postais - mas dessa vez ao vivo.', 'The route includes everything from the previous routes (Urca and Praia Vermelha) plus\n                  the iconic pass along the Copacabana coastline, where you will have the view that you\n                  only see on postcards - but this time live.'],
      ['Ideal para turistas que querem levar a melhor lembrança do Rio de Janeiro,\n                  despedidas de solteira que querem fotos incríveis, e qualquer pessoa que\n                  quer a experiência "instagramável" definitiva.', 'Ideal for tourists who want to take the best memory of Rio de Janeiro home,\n                  bachelorette parties looking for incredible photos, and anyone who\n                  wants the ultimate "instagrammable" experience.'],
      // Route stops
      ['Trajeto do Passeio', 'Trip Route'],
      ['Ponto de embarque', 'Boarding point'],
      ['Flamengo e Botafogo', 'Flamengo and Botafogo'],
      ['Vista panorâmica da zona sul', 'Panoramic view of the south zone'],
      ['Mureta da Urca + Praia Vermelha', 'Mureta da Urca + Praia Vermelha'],
      ['Paradas para mergulho', 'Swimming stops'],
      ['Parada para mergulho', 'Swimming stop'],
      ['Orla de Copacabana', 'Copacabana Coastline'],
      ['Passagem panorâmica pela praia mais famosa do mundo', 'Panoramic pass by the most famous beach in the world'],
      ['Melhor momento para fotos', 'Best moment for photos'],
      ['Retorno e desembarque', 'Return and disembarkation'],
      // Highlights
      ['Por que escolher este roteiro?', 'Why choose this route?'],
      ['O passeio mais fotogênico do RJ', 'The most photogenic trip in Rio'],
      ['Vista da praia mais famosa do Brasil', 'View of the most famous beach in Brazil'],
      ['Perfeito para despedida de solteira', 'Perfect for bachelorette parties'],
      ['Ideal para turistas', 'Ideal for tourists'],
      // Available boats
      ['Lanchas Disponíveis para este Roteiro', 'Boats Available for this Route'],
      ['Ver Todas as Lanchas', 'View All Boats'],
      // Sidebar
      ['Duracao', 'Duration'],
      ['Mais tempo de navegacao, menos mergulho', 'More sailing time, less swimming'],
      ['Ver Lanchas Disponíveis', 'View Available Boats'],
      ['Combustível incluso', 'Fuel included'],
      ['Marinheiro habilitado', 'Licensed captain'],
      // FAQ
      ['Perguntas Frequentes sobre o Passeio em Copacabana', 'Frequently Asked Questions about the Copacabana Trip'],
      ['Qual a duração do passeio até Copacabana?', 'How long is the trip to Copacabana?'],
      ['O turno total e de <strong>5 horas</strong> (manha: 09h-14h ou tarde: 14h30-19h30). E tempo suficiente para passar pela Urca, Praia Vermelha (com paradas para mergulho) e fazer a passagem panoramica pela orla de Copacabana.', 'The total shift is <strong>5 hours</strong> (morning: 9am-2pm or afternoon: 2:30pm-7:30pm). It is enough time to pass through Urca, Praia Vermelha (with swimming stops) and take the panoramic pass along the Copacabana coastline.'],
      ['Paramos para mergulho em Copacabana?', 'Do we stop for swimming in Copacabana?'],
      ['A passagem por Copacabana é <strong>panorâmica</strong>, perfeita para fotos. As paradas para mergulho são feitas na Mureta da Urca e Praia Vermelha, onde as águas são mais calmas e ideais para banho.', 'The pass through Copacabana is <strong>panoramic</strong>, perfect for photos. Swimming stops are made at Mureta da Urca and Praia Vermelha, where the waters are calmer and ideal for bathing.'],
      ['Como saber o valor do passeio ate Copacabana?', 'How do I find out the price to Copacabana?'],
      ['O valor varia conforme a lancha escolhida e o dia da semana. Entre em contato pelo <strong>WhatsApp</strong> para receber um orcamento personalizado. Todas as lanchas incluem combustivel, marinheiro, som Bluetooth e coolers.', 'The price varies depending on the boat chosen and the day of the week. Contact us via <strong>WhatsApp</strong> for a personalized quote. All boats include fuel, captain, Bluetooth speakers and coolers.'],
      ['Este roteiro é bom para despedida de solteira?', 'Is this route good for a bachelorette party?'],
      ['<strong>Perfeito!</strong> A passagem panorâmica pela orla mais famosa do Brasil rende fotos incríveis. Oferecemos também decoração temática e serviços de open bar.', '<strong>Perfect!</strong> The panoramic pass along the most famous coastline in Brazil yields incredible photos. We also offer themed decoration and open bar services.'],
      // Other routes section
      ['Explore Outros Roteiros', 'Explore Other Routes'],
      ['Conheça outras opções de passeio de lancha no Rio de Janeiro', 'Discover other boat trip options in Rio de Janeiro'],
      ['5h de passeio', '5-hour trip'],
      ['A partir de R$ 2.500', 'From R$ 2,500'],
      ['A partir de R$ 3.600', 'From R$ 3,600'],
      ['A partir de R$ 4.500', 'From R$ 4,500'],
      ['Ver Roteiro', 'View Route'],
      ['Mais vendido', 'Best seller'],
      ['Mar aberto', 'Open sea'],
      ['Experiência completa', 'Complete experience'],
      // Schema.org FAQ answer (plain text version — different from the HTML version with <strong> above)
      ['O roteiro até Copacabana é perfeito para despedida de solteira! A passagem panorâmica pela orla mais famosa do Brasil rende fotos incríveis. Oferecemos também decoração temática e serviços de open bar.', 'The Copacabana route is perfect for bachelorette parties! The panoramic pass along the most famous coastline in Brazil yields incredible photos. We also offer themed decoration and open bar services.'],
      // CTA
      ['A foto perfeita te espera!', 'The perfect photo awaits you!'],
      ['Reserve agora seu passeio de lancha até Copacabana e leve a melhor\n            lembrança do Rio de Janeiro para casa.', 'Book your boat trip to Copacabana now and take the best\n            memory of Rio de Janeiro home with you.'],
      ['Reservar Agora', 'Book Now'],
    ],
  },
  {
    ptPath: 'roteiros/ilhas-cagarras/index.html',
    enPath: 'en/routes/ilhas-cagarras/index.html',
    title: 'Ilhas Cagarras Boat Trip | Open Sea Adventure | WeBoat Brasil',
    description: 'Boat trip to Ilhas Cagarras (Cagarras Islands) near Ipanema. Open sea adventure! 5 hours from R$ 3,600.',
    keywords: 'ilhas cagarras boat trip, cagarras islands boat, open sea boat rio',
    waMessage: 'Hello! I would like to do the Ilhas Cagarras route. What is the availability? [via site - en]',
    css: 'roteiros',
    contentBlocks: [
      // *** Schema.org main name + description (MUST be first) ***
      ['"name": "Passeio de Lancha Ilhas Cagarras"', '"name": "Boat Trip to Ilhas Cagarras"'],
      ['"description": "Aventura em mar aberto até as Ilhas Cagarras. Águas cristalinas, vida marinha única e oportunidade de mergulho e snorkeling. Duração de 5 horas com saída da Marina da Glória."', '"description": "Open sea adventure to Ilhas Cagarras. Crystal-clear waters, unique marine life and swimming and snorkeling opportunities. 5 hours departing from Marina da Gloria."'],
      // Schema.org Offer description
      ['"description": "A partir de R$ 3.600 (seg-qui, WeBoat 32). Inclui combustível, marinheiro e seguro."', '"description": "From R$ 3,600 (Mon-Thu, WeBoat 32). Includes fuel, captain and insurance."'],
      // Schema.org TouristAttraction descriptions (JSON-LD)
      ['"description": "Monumento natural com águas cristalinas, tartarugas e vida marinha abundante"', '"description": "Natural monument with crystal-clear waters, turtles and abundant marine life"'],
      ['"description": "Ponto de mergulho e snorkeling com visibilidade excepcional"', '"description": "Swimming and snorkeling spot with exceptional visibility"'],
      // Schema.org FAQ names
      ['"name": "O mar é agitado no roteiro das Ilhas Cagarras?"', '"name": "Is the sea rough on the Ilhas Cagarras route?"'],
      ['"name": "Qual a duração do passeio às Ilhas Cagarras?"', '"name": "How long is the trip to Ilhas Cagarras?"'],
      ['"name": "Como saber o valor do passeio as Ilhas Cagarras?"', '"name": "How do I find out the price of the trip to Ilhas Cagarras?"'],
      // Schema.org FAQ name
      ['Dá para ver animais marinhos nas Ilhas Cagarras?', 'Can you see marine animals at Ilhas Cagarras?'],
      // Schema.org FAQ answers (plain text — must come first before shorter substrings)
      ['"text": "O roteiro das Ilhas Cagarras inclui navegação em mar aberto. Em dias de mar muito agitado, o trajeto pode ser alterado para águas mais calmas por segurança. Recomendamos para pessoas que não enjoam facilmente."', '"text": "The Ilhas Cagarras route includes open sea sailing. On very rough sea days, the route may be changed to calmer waters for safety. We recommend it for people who do not get seasick easily."'],
      ['"text": "Sim! As águas ao redor das Ilhas Cagarras são extremamente claras, permitindo visualizar peixes, tartarugas e outros animais marinhos. É um santuário ecológico a cerca de 5 km da costa de Ipanema."', '"text": "Yes! The waters around Ilhas Cagarras are extremely clear, allowing you to see fish, turtles and other marine animals. It is an ecological sanctuary about 5 km off the coast of Ipanema."'],
      ['"text": "O passeio de lancha até as Ilhas Cagarras tem duração de 5 horas, dependendo das condições do mar e do tempo de permanência nas ilhas para mergulho."', '"text": "The boat trip to Ilhas Cagarras lasts 5 hours, depending on sea conditions and time spent at the islands for swimming."'],
      ['"text": "O valor varia conforme a lancha escolhida e o dia da semana. Entre em contato pelo WhatsApp para receber um orcamento personalizado. Todas as lanchas incluem combustivel, marinheiro experiente, som Bluetooth e equipamentos de seguranca."', '"text": "The price varies depending on the boat chosen and the day of the week. Contact us via WhatsApp for a personalized quote. All boats include fuel, experienced captain, Bluetooth speakers and safety equipment."'],
      // Visible HTML FAQ for duration
      ['O passeio de lancha até as Ilhas Cagarras tem duração de <strong>5 horas</strong>, dependendo das condições do mar e do tempo de permanência nas ilhas para mergulho.', 'The boat trip to Ilhas Cagarras lasts <strong>5 hours</strong>, depending on sea conditions and time spent at the islands for swimming.'],
      // Hero
      ['Mar Aberto', 'Open Sea'],
      ['Roteiro 4 - Ilhas Cagarras', 'Route 4 - Ilhas Cagarras'],
      ['5 horas', '5 hours'],
      ['Mar aberto', 'Open sea'],
      // Description
      ['Sobre o Passeio', 'About the Trip'],
      ['O passeio de lancha até as Ilhas Cagarras é para os aventureiros! Navegação\n                  em mar aberto e mergulho em águas cristalinas onde você pode observar uma\n                  vida marinha incrível.', 'The boat trip to Ilhas Cagarras is for the adventurous! Open\n                  sea sailing and swimming in crystal-clear waters where you can observe\n                  incredible marine life.'],
      ['Este passeio inclui tudo dos roteiros anteriores mais a navegação oceânica\n                  até o arquipélago das Ilhas Cagarras, um santuário ecológico a cerca de 5 km\n                  da costa de Ipanema.', 'This trip includes everything from the previous routes plus ocean sailing\n                  to the Ilhas Cagarras archipelago, an ecological sanctuary about 5 km\n                  off the coast of Ipanema.'],
      ['As águas ao redor das ilhas são extremamente claras, permitindo visualizar\n                  peixes, tartarugas e outros animais marinhos. É a experiência perfeita para\n                  quem quer fugir do óbvio e viver uma aventura única no Rio de Janeiro.', 'The waters around the islands are extremely clear, allowing you to see\n                  fish, turtles and other marine animals. It is the perfect experience for\n                  those who want to go beyond the ordinary and live a unique adventure in Rio de Janeiro.'],
      // Warning
      ['Aviso Importante', 'Important Notice'],
      ['Este roteiro inclui navegação em mar aberto. Em dias de mar muito agitado,\n                    o trajeto pode ser alterado para águas mais calmas por segurança.\n                    Recomendamos para pessoas que não enjoam facilmente.', 'This route includes open sea sailing. On very rough sea days,\n                    the route may be changed to calmer waters for safety.\n                    We recommend it for people who do not get seasick easily.'],
      // Route stops
      ['Trajeto do Passeio', 'Trip Route'],
      ['Ponto de embarque', 'Boarding point'],
      ['Urca e Praia Vermelha', 'Urca and Praia Vermelha'],
      ['Parada opcional para mergulho', 'Optional swimming stop'],
      ['Passagem panorâmica', 'Panoramic pass'],
      ['Navegação em Mar Aberto', 'Open Sea Sailing'],
      ['Experiência oceânica rumo às ilhas', 'Ocean experience heading to the islands'],
      ['Navegação oceânica', 'Ocean sailing'],
      ['Parada para mergulho em águas cristalinas', 'Swimming stop in crystal-clear waters'],
      ['Mergulho com vida marinha', 'Snorkeling with marine life'],
      ['Retorno e desembarque', 'Return and disembarkation'],
      // Highlights
      ['Por que escolher este roteiro?', 'Why choose this route?'],
      ['Experiência única em mar aberto', 'Unique open sea experience'],
      ['Mergulho com vida marinha', 'Snorkeling with marine life'],
      ['Águas cristalinas', 'Crystal-clear waters'],
      ['Navegação oceânica', 'Ocean sailing'],
      // Available boats
      ['Lanchas Disponíveis para este Roteiro', 'Boats Available for this Route'],
      ['Ver Todas as Lanchas', 'View All Boats'],
      // Sidebar
      ['Duracao', 'Duration'],
      ['Mais tempo de navegacao, menos mergulho', 'More sailing time, less swimming'],
      ['Ver Lanchas Disponíveis', 'View Available Boats'],
      ['Combustível incluso', 'Fuel included'],
      ['Marinheiro experiente', 'Experienced captain'],
      ['Equipamentos de segurança', 'Safety equipment'],
      // FAQ
      ['Perguntas Frequentes sobre o Passeio nas Ilhas Cagarras', 'Frequently Asked Questions about the Ilhas Cagarras Trip'],
      ['O mar é agitado neste roteiro?', 'Is the sea rough on this route?'],
      ['O roteiro inclui navegação em <strong>mar aberto</strong>. Em dias de mar muito agitado, o trajeto pode ser alterado para águas mais calmas por segurança. Recomendamos para pessoas que não enjoam facilmente.', 'The route includes <strong>open sea</strong> sailing. On very rough sea days, the route may be changed to calmer waters for safety. We recommend it for people who do not get seasick easily.'],
      ['Dá para ver animais marinhos?', 'Can you see marine animals?'],
      ['<strong>Sim!</strong> As águas ao redor das Ilhas Cagarras são extremamente claras, permitindo visualizar peixes, tartarugas e outros animais marinhos. É um santuário ecológico a 5 km da costa de Ipanema.', '<strong>Yes!</strong> The waters around Ilhas Cagarras are extremely clear, allowing you to see fish, turtles and other marine animals. It is an ecological sanctuary 5 km off the coast of Ipanema.'],
      ['Qual a duração do passeio?', 'How long is the trip?'],
      ['O passeio de lancha até as Ilhas Cagarras tem duração de <strong>5 horas</strong>, dependendo das condições do mar e do tempo de permanência nas ilhas para mergulho.', 'The boat trip to Ilhas Cagarras lasts <strong>5 hours</strong>, depending on sea conditions and the time spent at the islands for snorkeling.'],
      ['Como saber o valor do passeio?', 'How do I find out the price?'],
      ['O valor varia conforme a lancha escolhida e o dia da semana. Entre em contato pelo <strong>WhatsApp</strong> para receber um orcamento personalizado. Todas as lanchas incluem combustivel, marinheiro experiente e equipamentos de seguranca.', 'The price varies depending on the boat chosen and the day of the week. Contact us via <strong>WhatsApp</strong> for a personalized quote. All boats include fuel, experienced captain and safety equipment.'],
      // Other routes section
      ['Explore Outros Roteiros', 'Explore Other Routes'],
      ['Conheça outras opções de passeio de lancha no Rio de Janeiro', 'Discover other boat trip options in Rio de Janeiro'],
      ['5h de passeio', '5-hour trip'],
      ['A partir de R$ 3.000', 'From R$ 3,000'],
      ['A partir de R$ 3.600', 'From R$ 3,600'],
      ['A partir de R$ 4.500', 'From R$ 4,500'],
      ['Ver Roteiro', 'View Route'],
      ['Vista icônica', 'Iconic view'],
      ['Praias desertas', 'Secluded beaches'],
      ['Experiência completa', 'Complete experience'],
      // CTA
      ['Pronto para a aventura?', 'Ready for the adventure?'],
      ['Reserve agora seu passeio de lancha até as Ilhas Cagarras e viva\n            uma experiência única em mar aberto!', 'Book your boat trip to Ilhas Cagarras now and live\n            a unique open sea experience!'],
      ['Reservar Agora', 'Book Now'],
    ],
  },
  {
    ptPath: 'roteiros/itaipu-camboinhas/index.html',
    enPath: 'en/routes/itaipu-camboinhas/index.html',
    title: 'Itaipu & Camboinhas Boat Trip | Hidden Beaches | WeBoat Brasil',
    description: 'Boat trip to Itaipu and Camboinhas beaches in Niteroi. Hidden paradise beaches! 5 hours from R$ 3,600.',
    keywords: 'itaipu camboinhas boat trip, hidden beaches niteroi, deserted beach boat',
    waMessage: 'Hello! I would like to do the Itaipu & Camboinhas route. What is the availability? [via site - en]',
    css: 'roteiros',
    contentBlocks: [
      // *** Schema.org main name + description (MUST be first) ***
      ['"name": "Passeio de Lancha Itaipu e Camboinhas"', '"name": "Boat Trip to Itaipu and Camboinhas"'],
      ['"description": "Praias semi-desertas de Itaipu e Camboinhas em Niterói. O roteiro mais exclusivo e tranquilo. Duração de 5 horas com saída da Marina da Glória."', '"description": "Secluded beaches of Itaipu and Camboinhas in Niteroi. The most exclusive and peaceful route. 5 hours departing from Marina da Gloria."'],
      // Schema.org TouristAttraction descriptions
      ['"description": "Praia de pescadores com águas calmas e areia clara em Niterói"', '"description": "Fishing beach with calm waters and light sand in Niteroi"'],
      ['"description": "Praia semi-deserta com natureza preservada e águas cristalinas"', '"description": "Semi-secluded beach with preserved nature and crystal-clear waters"'],
      // Schema.org Offer description
      ['"description": "A partir de R$ 3.600 (seg-qui, WeBoat 32). Inclui combustível, marinheiro e seguro."', '"description": "From R$ 3,600 (Mon-Thu, WeBoat 32). Includes fuel, captain and insurance."'],
      // Schema.org FAQ names
      ['"name": "O que torna o roteiro de Itaipu e Camboinhas especial?"', '"name": "What makes the Itaipu and Camboinhas route special?"'],
      ['"name": "Qual a duração do passeio até Itaipu e Camboinhas?"', '"name": "How long is the trip to Itaipu and Camboinhas?"'],
      ['"name": "Como saber o valor do passeio ate Niteroi?"', '"name": "How do I find out the price of the trip to Niteroi?"'],
      // Schema.org FAQ answers (plain text — must come first before shorter substrings)
      ['"text": "É nosso roteiro mais exclusivo! Diferente dos outros que ficam na zona sul do Rio, este passeio atravessa a Baía de Guanabara e leva você para praias semi-desertas em Niterói, longe das multidões."', '"text": "It is our most exclusive route! Unlike the others that stay in Rio\'s south zone, this trip crosses Guanabara Bay and takes you to secluded beaches in Niteroi, far from the crowds."'],
      ['"text": "São praias semi-desertas, muito mais tranquilas que as praias da zona sul do Rio. Como o acesso por terra é mais difícil, você encontra muito menos pessoas, especialmente em dias de semana."', '"text": "They are semi-secluded beaches, much quieter than the south zone beaches. Since land access is more difficult, you find far fewer people, especially on weekdays."'],
      ['"text": "O passeio tem duração de 5 horas, que corresponde a um turno completo. A travessia da Baía de Guanabara e a navegação até as praias de Niterói levam mais tempo que os roteiros na zona sul."', '"text": "The trip lasts 5 hours, which corresponds to a full shift. Crossing Guanabara Bay and sailing to the beaches of Niteroi take more time than the south zone routes."'],
      ['"text": "O valor varia conforme a lancha escolhida e o dia da semana. Entre em contato pelo WhatsApp para receber um orcamento personalizado. Todas as lanchas incluem combustivel, marinheiro experiente, som Bluetooth e coolers."', '"text": "The price varies depending on the boat chosen and the day of the week. Contact us via WhatsApp for a personalized quote. All boats include fuel, experienced captain, Bluetooth speakers and coolers."'],
      ['"name": "As praias de Itaipu e Camboinhas são realmente desertas?"', '"name": "Are the beaches of Itaipu and Camboinhas really deserted?"'],
      // *** Visible FAQ answer MUST come before ['5 horas', '5 hours'] to avoid partial corruption ***
      ['O passeio tem duração de <strong>5 horas</strong>, que corresponde a um turno completo. A travessia da Baía de Guanabara e a navegação até as praias de Niterói levam mais tempo.', 'The trip lasts <strong>5 hours</strong>, which corresponds to a full shift. The Guanabara Bay crossing and sailing to the Niteroi beaches takes more time.'],
      // Hero
      ['Praias Desertas', 'Secluded Beaches'],
      ['Roteiro 5 - Itaipu e Camboinhas', 'Route 5 - Itaipu and Camboinhas'],
      ['5 horas', '5 hours'],
      ['Travessia + Mar aberto', 'Bay crossing + Open sea'],
      // Description
      ['Sobre o Passeio', 'About the Trip'],
      ['O passeio de lancha até Niterói é nosso roteiro mais exclusivo! Atravesse\n                  a Baía de Guanabara e descubra as praias semi-desertas de Camboinhas e\n                  Itaipu, longe das multidões e com tranquilidade total.', 'The boat trip to Niteroi is our most exclusive route! Cross\n                  Baía de Guanabara and discover the secluded beaches of Camboinhas and\n                  Itaipu, far from the crowds with total tranquility.'],
      ['Diferente dos outros roteiros que ficam na zona sul do Rio, este passeio\n                  leva você para o outro lado da baía, revelando paisagens pouco exploradas\n                  e praias com águas calmas e cristalinas.', 'Unlike the other routes that stay in Rio\'s south zone, this trip\n                  takes you to the other side of the bay, revealing unexplored landscapes\n                  and beaches with calm, crystal-clear waters.'],
      ['É o roteiro perfeito para quem busca exclusividade, sossego e quer fugir\n                  dos points tradicionais. As praias de Camboinhas e Itaipu são verdadeiros\n                  refúgios de paz a poucos quilômetros do centro do Rio.', 'It is the perfect route for those seeking exclusivity, peace and wanting to escape\n                  the usual spots. The beaches of Camboinhas and Itaipu are true\n                  havens of tranquility just a few kilometers from downtown Rio.'],
      // Route stops
      ['Trajeto do Passeio', 'Trip Route'],
      ['Ponto de embarque', 'Boarding point'],
      ['Travessia da Baía de Guanabara', 'Baía de Guanabara Crossing'],
      ['Vista panorâmica do Rio e Niterói', 'Panoramic view of Rio and Niteroi'],
      ['Travessia da baía', 'Bay crossing'],
      ['Passagem pela orla de Niterói', 'Pass along the Niteroi coastline'],
      ['Parada para mergulho - praia semi-deserta', 'Swimming stop - secluded beach'],
      ['1ª Parada para mergulho', '1st swimming stop'],
      ['Parada para mergulho - tranquilidade total', 'Swimming stop - total tranquility'],
      ['2ª Parada para mergulho', '2nd swimming stop'],
      ['Retorno e desembarque', 'Return and disembarkation'],
      // Highlights
      ['Por que escolher este roteiro?', 'Why choose this route?'],
      ['Praias semi-desertas', 'Secluded beaches'],
      ['Tranquilidade total', 'Total tranquility'],
      ['O mais exclusivo', 'The most exclusive'],
      ['Fora do circuito tradicional', 'Off the beaten path'],
      // Available boats
      ['Lanchas Disponíveis para este Roteiro', 'Boats Available for this Route'],
      ['Ver Todas as Lanchas', 'View All Boats'],
      // Sidebar
      ['Duracao', 'Duration'],
      ['Mais tempo de navegacao, menos mergulho', 'More sailing time, less swimming'],
      ['Ver Lanchas Disponíveis', 'View Available Boats'],
      ['Combustível incluso', 'Fuel included'],
      ['Marinheiro experiente', 'Experienced captain'],
      // FAQ
      ['Perguntas Frequentes sobre o Passeio em Itaipu e Camboinhas', 'Frequently Asked Questions about the Itaipu and Camboinhas Trip'],
      ['O que torna este roteiro especial?', 'What makes this route special?'],
      ['É nosso <strong>roteiro mais exclusivo!</strong> Diferente dos outros que ficam na zona sul do Rio, este passeio atravessa a Baía de Guanabara e leva você para praias semi-desertas em Niterói.', 'It is our <strong>most exclusive route!</strong> Unlike the others that stay in Rio\'s south zone, this trip crosses Baía de Guanabara and takes you to secluded beaches in Niteroi.'],
      ['As praias são realmente desertas?', 'Are the beaches really deserted?'],
      ['São praias <strong>semi-desertas</strong>, muito mais tranquilas que as praias da zona sul. Como o acesso por terra é mais difícil, você encontra muito menos pessoas, especialmente em dias de semana.', 'They are <strong>semi-secluded</strong> beaches, much quieter than the south zone beaches. Since land access is more difficult, you find far fewer people, especially on weekdays.'],
      ['Qual a duração do passeio?', 'How long is the trip?'],
      ['Como saber o valor do passeio ate Niteroi?', 'How do I find out the price to Niteroi?'],
      ['O valor varia conforme a lancha escolhida e o dia da semana. Entre em contato pelo <strong>WhatsApp</strong> para receber um orcamento personalizado. Todas as lanchas incluem combustivel, marinheiro, som Bluetooth e coolers.', 'The price varies depending on the boat chosen and the day of the week. Contact us via <strong>WhatsApp</strong> for a personalized quote. All boats include fuel, captain, Bluetooth speakers and coolers.'],
      // Other routes section
      ['Explore Outros Roteiros', 'Explore Other Routes'],
      ['Conheça outras opções de passeio de lancha no Rio de Janeiro', 'Discover other boat trip options in Rio de Janeiro'],
      ['5h de passeio', '5-hour trip'],
      ['A partir de R$ 3.600', 'From R$ 3,600'],
      ['A partir de R$ 3.000', 'From R$ 3,000'],
      ['A partir de R$ 2.500', 'From R$ 2,500'],
      ['Ver Roteiro', 'View Route'],
      ['Mar aberto', 'Open sea'],
      ['Vista icônica', 'Iconic view'],
      ['Mais vendido', 'Best seller'],
      // CTA
      ['Fuja das multidões!', 'Escape the crowds!'],
      ['Reserve agora seu passeio de lancha até Itaipu e Camboinhas e descubra\n            as praias mais exclusivas do Rio de Janeiro.', 'Book your boat trip to Itaipu and Camboinhas now and discover\n            the most exclusive beaches in Rio de Janeiro.'],
      ['Reservar Agora', 'Book Now'],
    ],
  },
  {
    ptPath: 'roteiros/volta-completa/index.html',
    enPath: 'en/routes/volta-completa/index.html',
    title: 'Full Tour Boat Trip | Complete Experience | WeBoat Brasil',
    description: 'Complete boat tour around Rio de Janeiro. The ultimate experience! 5 hours from R$ 4,500. See all the highlights.',
    keywords: 'full boat tour rio, complete boat trip, volta completa boat, best boat tour',
    waMessage: 'Hello! I would like to do the Full Tour route. What is the availability? [via site - en]',
    css: 'roteiros',
    contentBlocks: [
      // Schema.org main name + description (must come first — longest strings)
      ['"name": "Volta Completa de Lancha pela Baía de Guanabara"', '"name": "Full Tour Boat Trip through Guanabara Bay"'],
      ['"description": "A experiência definitiva de passeio de lancha no Rio de Janeiro. Todos os pontos turísticos em um único passeio de 5 horas pela Baía de Guanabara com saída da Marina da Glória."', '"description": "The ultimate boat trip experience in Rio de Janeiro. All the landmarks in a single 5-hour trip through Guanabara Bay departing from Marina da Gloria."'],
      // Schema.org point-of-interest descriptions
      ['"description": "Navegação completa pela baía com vista para Niterói e centro do Rio"', '"description": "Full navigation through the bay with views of Niteroi and downtown Rio"'],
      ['"description": "Passagem sob a ponte com vista panorâmica"', '"description": "Sailing under the bridge with panoramic views"'],
      ['"description": "Castelo neogótico na baía, palco do último baile do Império"', '"description": "Neo-Gothic castle in the bay, venue of the last ball of the Empire"'],
      ['"description": "Vista do cartão-postal do Rio de Janeiro a partir do mar"', '"description": "View of Rio de Janeiro\'s postcard from the sea"'],
      // Schema.org FAQ question names (must come BEFORE ['Volta Completa','Full Tour'] short entry)
      ['"name": "Quantas paradas para mergulho tem a Volta Completa?"', '"name": "How many swimming stops are there on the Full Tour?"'],
      ['"name": "Qual o trajeto da Volta Completa?"', '"name": "What is the Full Tour route?"'],
      ['"name": "Qual a duração da Volta Completa?"', '"name": "How long is the Full Tour?"'],
      ['"name": "Como saber o valor da Volta Completa?"', '"name": "How do I find out the price of the Full Tour?"'],
      // Schema.org FAQ answers (plain text — must come first before shorter substrings)
      ['"text": "O roteiro sai da Marina da Glória, passa pelo Museu do Amanhã, navega sob a Ponte Rio-Niterói, contorna o MAC em Niterói, passa por Icaraí, faz paradas para mergulho no Morcego, Adão e Eva e Mureta da Urca, e retorna passando pelos Fortes históricos de Santa Cruz, Laje e São João."', '"text": "The route departs from Marina da Gloria, passes by the Museum of Tomorrow, sails under the Rio-Niteroi Bridge, goes around the MAC in Niteroi, passes Icarai, makes swimming stops at Morcego, Adão e Eva and Mureta da Urca, and returns passing by the historic Forts of Santa Cruz, Laje and São João."'],
      ['"text": "A Volta Completa tem duração de 5 horas, sendo nosso passeio mais longo. É ideal para quem quer aproveitar um dia inteiro no mar conhecendo os principais pontos do Rio e Niterói."', '"text": "The Full Tour lasts 5 hours, being our longest trip. It is ideal for those who want to spend a whole day at sea exploring the main landmarks of Rio and Niteroi."'],
      ['"text": "São 3 paradas para mergulho: Praia do Morcego, Praias de Adão e Eva, e Mureta da Urca. Todas em locais com águas calmas e cristalinas, perfeitas para banho."', '"text": "There are 3 swimming stops: Morcego Beach, Adão e Eva Beaches, and Mureta da Urca. All in locations with calm, crystal-clear waters, perfect for swimming."'],
      ['"text": "O valor varia conforme a lancha escolhida e o dia da semana. Entre em contato pelo WhatsApp para receber um orcamento personalizado. Recomendamos combinar com servico de churrasco e open bar para a experiencia completa."', '"text": "The price varies depending on the boat chosen and the day of the week. Contact us via WhatsApp for a personalized quote. We recommend combining it with BBQ and open bar for the complete experience."'],
      // Visible HTML FAQ answers (these have HTML tags, different from Schema.org plain text)
      // PT side must match source BEFORE the short ['Volta Completa','Full Tour'] entry runs
      ['O roteiro sai da <strong>Marina da Glória</strong>, passa pelo Museu do Amanhã, navega sob a <strong>Ponte Rio-Niterói</strong>, contorna o MAC em Niterói, passa por Icaraí, faz paradas para mergulho no Morcego, Adão e Eva e Mureta da Urca, e retorna passando pelos <strong>Fortes históricos</strong>.', 'The route departs from <strong>Marina da Gloria</strong>, passes by the Museum of Tomorrow, sails under the <strong>Rio-Niteroi Bridge</strong>, goes around the MAC in Niteroi, passes Icarai, makes swimming stops at Morcego, Adão e Eva and Mureta da Urca, and returns passing by the <strong>historic Forts</strong>.'],
      ['A Volta Completa tem duração de <strong>5 horas</strong>, sendo nosso passeio mais longo. É ideal para quem quer aproveitar um dia inteiro no mar conhecendo os principais pontos do Rio e Niterói.', 'The Full Tour lasts <strong>5 hours</strong>, being our longest trip. It is ideal for those who want to spend a whole day at sea exploring the main landmarks of Rio and Niteroi.'],
      // *** MULTILINE PARAGRAPHS MUST come BEFORE single-sentence entries to prevent substring corruption ***
      ['A Volta Completa é o nosso roteiro mais completo de passeio de lancha no Rio de Janeiro!\n                  São 5 horas de navegação combinando os melhores pontos da Baía de Guanabara\n                  com as praias de Niterói em um único passeio inesquecível.', 'The Full Tour is our most complete boat trip route in Rio de Janeiro!\n                  It is 5 hours of sailing combining the best spots of Baía de Guanabara\n                  with the beaches of Niteroi in one unforgettable trip.'],
      ['Saindo da Marina da Glória, o passeio segue pela Baía de Guanabara passando pelo\n                  Museu do Amanhã, navegando sob a Ponte Rio-Niterói e contornando o MAC de Niterói.\n                  Na sequência, você faz paradas para mergulho nas praias do Morcego, Adão e Eva, e\n                  retorna passando pelos Fortes históricos de Santa Cruz, Laje e São João até a\n                  Mureta da Urca, com vista privilegiada do Pão de Açúcar.', 'Departing from Marina da Glória, the trip goes through Baía de Guanabara passing by the\n                  Museum of Tomorrow, sailing under the Rio-Niteroi Bridge and around the MAC in Niteroi.\n                  Then, you make swimming stops at Morcego, Adão e Eva beaches, and\n                  return passing by the historic Forts of Santa Cruz, Laje and São João to\n                  Mureta da Urca, with a privileged view of Pão de Açúcar.'],
      ['Perfeito para aniversários especiais, comemorações importantes ou simplesmente\n                  para quem quer viver um dia inteiro de pura diversão e beleza no mar do Rio.\n                  Recomendamos combinar com churrasco e open bar para a experiência completa!', 'Perfect for special birthdays, important celebrations or simply\n                  for those who want to spend an entire day of pure fun and beauty on the Rio sea.\n                  We recommend combining it with BBQ and open bar for the complete experience!'],
      // *** Single-sentence entries (shorter substrings of the multiline paragraphs) ***
      ['A Volta Completa é o nosso roteiro mais completo de passeio de lancha no Rio de Janeiro!', 'The Full Tour is our most complete boat trip route in Rio de Janeiro!'],
      ['São 3 paradas para mergulho: Praia do Morcego, Praias de Adão e Eva, e Mureta da Urca. Todas em locais com águas calmas e cristalinas, perfeitas para banho.', 'There are 3 swimming stops: Morcego Beach, Adão e Eva Beaches, and Mureta da Urca. All in locations with calm, crystal-clear waters, perfect for swimming.'],
      // Long strings containing "Volta Completa" — must run BEFORE short entry
      ['Reserve agora a Volta Completa e tenha um dia inteiro de pura\n            diversão no mar mais bonito do Brasil.', 'Book the Full Tour now and have an entire day of pure\n            fun on the most beautiful sea in Brazil.'],
      ['Por que escolher a Volta Completa?', 'Why choose the Full Tour?'],
      ['Perguntas Frequentes sobre a Volta Completa', 'Frequently Asked Questions about the Full Tour'],
      ['Qual o trajeto da Volta Completa?', 'What is the Full Tour route?'],
      ['Qual a duração da Volta Completa?', 'How long is the Full Tour?'],
      ['Como saber o valor da Volta Completa?', 'How do I find out the price of the Full Tour?'],
      // Hero alt text (must come BEFORE ['Volta Completa','Full Tour'] which corrupts 'Roteiro Volta Completa')
      ['MAC Niterói visto do mar com Cristo Redentor ao fundo - Roteiro Volta Completa', 'MAC Niteroi seen from the sea with Christ the Redeemer in the background - Full Tour Route'],
      ['MAC Niterói visto do mar com Cristo Redentor', 'MAC Niteroi seen from the sea with Christ the Redeemer'],
      // Hero
      ['Experiência Completa', 'Complete Experience'],
      ['Volta Completa', 'Full Tour'],
      ['5 horas', '5 hours'],
      ['Mar variado', 'Varied sea conditions'],
      // Special badge
      ['Roteiro Especial', 'Special Route'],
      // Description (multiline paragraphs moved before single-sentence entries above)
      ['A Experiência Definitiva', 'The Ultimate Experience'],
      // FAQ visible answer (moved here — MUST run BEFORE 'Praia do Morcego' and 'Praias de Adão e Eva' route stop entries corrupt the substring)
      ['São <strong>3 paradas para mergulho</strong>: Praia do Morcego, Praias de Adão e Eva, e Mureta da Urca. Todas em locais com águas calmas e cristalinas.', 'There are <strong>3 swimming stops</strong>: Morcego Beach, Adão e Eva Beaches, and Mureta da Urca. All in locations with calm, crystal-clear waters.'],
      // Route stops
      ['Trajeto do Passeio', 'Trip Route'],
      ['Ponto de embarque - Manhã', 'Boarding point - Morning'],
      ['Museu do Amanhã', 'Museum of Tomorrow'],
      ['Vista panorâmica do centro e Praça Mauá', 'Panoramic view of downtown and Praça Mauá'],
      ['Cartão postal', 'Postcard view'],
      ['Ponte Rio-Niterói', 'Rio-Niteroi Bridge'],
      ['Navegação sob a maior ponte do Brasil', 'Sailing under the largest bridge in Brazil'],
      ['Vista impressionante', 'Impressive view'],
      ['MAC - Museu de Arte Contemporânea', 'MAC - Museum of Contemporary Art'],
      ['O icônico disco voador de Oscar Niemeyer', 'The iconic flying saucer by Oscar Niemeyer'],
      ['Foto obrigatória', 'Must-take photo'],
      ['Orla de Niterói com vista do Rio', 'Niteroi coastline with views of Rio'],
      ['Praia do Morcego', 'Morcego Beach'],
      ['1ª parada para mergulho - águas calmas', '1st swimming stop - calm waters'],
      ['Mergulho', 'Swimming'],
      ['Praias de Adão e Eva', 'Adão e Eva Beaches'],
      ['2ª parada para mergulho - praias paradisíacas', '2nd swimming stop - paradisiacal beaches'],
      ['Fortes Históricos', 'Historic Forts'],
      ['Santa Cruz, Laje e São João - história naval', 'Santa Cruz, Laje and São João - naval history'],
      ['Patrimônio histórico', 'Historic heritage'],
      ['3ª parada para mergulho - vista do Pão de Açúcar', '3rd swimming stop - view of Pão de Açúcar'],
      ['Retorno e desembarque - Fim da tarde', 'Return and disembarkation - Late afternoon'],
      // (FAQ visible answer moved before route stops — ordering fix)
      // Highlights
      ['5 horas de navegação', '5 hours of sailing'],
      ['3 paradas para mergulho', '3 swimming stops'],
      ['Ponte Rio-Niterói por baixo', 'Rio-Niteroi Bridge from below'],
      ['Fortes históricos', 'Historic forts'],
      // Tip
      ['Dica: Combine com Churrasco!', 'Tip: Combine with BBQ!'],
      ['Para a experiência completa, recomendamos adicionar nosso serviço de churrasco\n                e open bar. Assim você aproveita o dia inteiro sem se preocupar com nada!', 'For the complete experience, we recommend adding our BBQ\n                and open bar service. This way you enjoy the whole day without worrying about anything!'],
      ['Ver Serviços Disponíveis', 'View Available Services'],
      // Available boats
      ['Lanchas Recomendadas', 'Recommended Boats'],
      ['Ver Todas as Lanchas', 'View All Boats'],
      // Sidebar
      ['Duracao', 'Duration'],
      ['Nosso passeio mais completo e longo', 'Our most complete and longest trip'],
      ['Ver Lanchas Disponíveis', 'View Available Boats'],
      ['Combustível incluso', 'Fuel included'],
      ['Marinheiro experiente', 'Experienced captain'],
      ['Equipamentos de segurança', 'Safety equipment'],
      // FAQ (question text moved to top; answers remain here since they don't contain "Volta Completa")
      ['O roteiro sai da <strong>Marina da Glória</strong>, passa pelo Museu do Amanhã, navega sob a <strong>Ponte Rio-Niterói</strong>, contorna o MAC em Niterói, passa por Icaraí, faz paradas para mergulho no Morcego, Adão e Eva e Mureta da Urca, e retorna passando pelos <strong>Fortes históricos</strong>.', 'The route departs from <strong>Marina da Glória</strong>, passes by the Museum of Tomorrow, sails under the <strong>Rio-Niteroi Bridge</strong>, goes around the MAC in Niteroi, passes through Icaraí, makes swimming stops at Morcego, Adão e Eva and Mureta da Urca, and returns passing by the <strong>historic Forts</strong>.'],
      ['A Volta Completa tem duração de <strong>5 horas</strong>, sendo nosso passeio mais longo. É ideal para quem quer aproveitar um dia inteiro no mar conhecendo os principais pontos do Rio e Niterói.', 'The Full Tour lasts <strong>5 hours</strong>, being our longest trip. It is ideal for those who want to spend an entire day at sea seeing the main sights of Rio and Niteroi.'],
      ['Quantas paradas para mergulho?', 'How many swimming stops?'],
      // (FAQ visible answer duplicate removed — already at top of route stops section)
      ['O valor varia conforme a lancha escolhida e o dia da semana. Entre em contato pelo <strong>WhatsApp</strong> para receber um orcamento personalizado. Recomendamos combinar com churrasco e open bar para a experiencia completa!', 'The price varies depending on the boat chosen and the day of the week. Contact us via <strong>WhatsApp</strong> for a personalized quote. We recommend combining it with BBQ and open bar for the complete experience!'],
      // Other routes section
      ['Explore Outros Roteiros', 'Explore Other Routes'],
      ['Conheça outras opções de passeio de lancha no Rio de Janeiro', 'Discover other boat trip options in Rio de Janeiro'],
      ['5h de passeio', '5-hour trip'],
      ['A partir de R$ 2.300', 'From R$ 2,300'],
      ['A partir de R$ 2.500', 'From R$ 2,500'],
      ['A partir de R$ 3.600', 'From R$ 3,600'],
      ['Ver Roteiro', 'View Route'],
      ['Melhor custo-benefício', 'Best value'],
      ['Mais vendido', 'Best seller'],
      ['Mar aberto', 'Open sea'],
      // CTA
      ['Viva a experiência completa!', 'Live the complete experience!'],
      ['Reserve agora a Volta Completa e tenha um dia inteiro de pura\n            diversão no mar mais bonito do Brasil.', 'Book the Full Tour now and have an entire day of pure\n            fun on the most beautiful sea in Brazil.'],
      ['Reservar Agora', 'Book Now'],
      // Schema.org - TouristDestination (long strings first)
      ['A experiência definitiva de passeio de lancha no Rio de Janeiro. Todos os pontos turísticos em um único passeio de 5 horas pela Baía de Guanabara com saída da Marina da Glória.', 'The ultimate boat trip experience in Rio de Janeiro. All the tourist landmarks in a single 5-hour trip through Guanabara Bay departing from Marina da Gloria.'],
      ['Passeio de Lancha', 'Boat Trip'],
      ['Turismo Náutico', 'Nautical Tourism'],
      ['Tour Panorâmico', 'Panoramic Tour'],
      ['Navegação completa pela baía com vista para Niterói e centro do Rio', 'Full navigation through the bay with views of Niteroi and downtown Rio'],
      ['Passagem sob a ponte com vista panorâmica', 'Passage under the bridge with panoramic view'],
      ['Castelo neogótico na baía, palco do último baile do Império', 'Neo-Gothic castle in the bay, venue of the last Imperial Ball'],
      ['Vista do cartão-postal do Rio de Janeiro a partir do mar', 'View of Rio de Janeiro\'s postcard landmark from the sea'],
      ['A partir de R$ 4.500 (seg-qui, WeBoat 32). Inclui combustível, marinheiro e seguro.', 'From R$ 4,500 (Mon-Thu, WeBoat 32). Includes fuel, captain and insurance.'],
      // Schema.org - LocalBusiness
      ['Aluguel de lanchas no Rio de Janeiro. Passeios privativos com conforto e segurança.', 'Boat rentals in Rio de Janeiro. Private trips with comfort and safety.'],
      // Schema.org - FAQ answers
      ['O roteiro sai da Marina da Glória, passa pelo Museu do Amanhã, navega sob a Ponte Rio-Niterói, contorna o MAC em Niterói, passa por Icaraí, faz paradas para mergulho no Morcego, Adão e Eva e Mureta da Urca, e retorna passando pelos Fortes históricos de Santa Cruz, Laje e São João.', 'The route departs from Marina da Gloria, passes by the Museum of Tomorrow, sails under the Rio-Niteroi Bridge, goes around the MAC in Niteroi, passes through Icarai, makes swimming stops at Morcego, Adão e Eva and Mureta da Urca, and returns passing by the historic Forts of Santa Cruz, Laje and São João.'],
      ['A Volta Completa tem duração de 5 horas, sendo nosso passeio mais longo. É ideal para quem quer aproveitar um dia inteiro no mar conhecendo os principais pontos do Rio e Niterói.', 'The Full Tour lasts 5 hours, being our longest trip. It is ideal for those who want to spend an entire day at sea seeing the main sights of Rio and Niteroi.'],
      // Visible page text - FAQ section title
      ['Qual a duração da Volta Completa?', 'How long is the Full Tour?'],
      // Visible page text - intro paragraph
      ['A Volta Completa é o nosso roteiro mais completo de passeio de lancha no Rio de Janeiro!', 'The Full Tour is our most complete boat trip route in Rio de Janeiro!'],
      ['São 5 horas de navegação combinando os melhores pontos da Baía de Guanabara', 'It is 5 hours of sailing combining the best spots of Guanabara Bay'],
      ['com as praias de Niterói em um único passeio inesquecível.', 'with the beaches of Niteroi in one unforgettable trip.'],
      // Route highlights
      ['5 horas de navegação', '5 hours of sailing'],
      ['Vista panorâmica do centro e Praça Mauá', 'Panoramic view of downtown and Praça Mauá'],
      ['Orla de Niterói com vista do Rio', 'Niteroi coastline with views of Rio'],
      // (Alt text entries moved before ['Volta Completa','Full Tour'] — ordering fix)
    ],
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
    contentBlocks: [
      // Schema.org Event description + Offer (must come first — longest strings)
      ['"description": "A despedida de solteira perfeita no Rio de Janeiro! Celebre com suas amigas a bordo de uma lancha privativa com decoração temática, drinks e muita diversão no mar."', '"description": "The perfect bachelorette party in Rio de Janeiro! Celebrate with your friends aboard a private boat with themed decoration, drinks and tons of fun at sea."'],
      ['"name": "Pacote Despedida de Solteira"', '"name": "Bachelorette Party Package"'],
      ['"description": "Lancha privativa para despedida de solteira"', '"description": "Private boat for bachelorette party"'],
      // Schema.org FAQ answers
      ['"text": "Temos opções de lanchas para grupos de 10 a 65 pessoas. Nossas lanchas próprias comportam de 12 a 22 pessoas, e com parceiros temos opções maiores para grupos grandes. Entre em contato para encontrar a lancha ideal para seu grupo."', '"text": "We have boat options for groups of 10 to 65 people. Our own boats accommodate 12 to 22 people, and with partners we have larger options for big groups. Contact us to find the ideal boat for your group."'],
      ['"text": "A decoração temática de despedida de solteira é um adicional a partir de R$ 135/pessoa, incluindo faixa de noiva, balões, adereços temáticos e props para fotos. Você também pode trazer sua própria decoração."', '"text": "Bachelorette party themed decoration is an add-on starting at R$ 135/person, including bride-to-be sash, balloons, themed props and photo accessories. You can also bring your own decoration."'],
      ['"text": "Sim! Você pode levar suas próprias bebidas sem custo extra. Também oferecemos serviço de open bar (a partir de R$ 135/pessoa) com drinks especiais para despedida de solteira."', '"text": "Yes! You can bring your own drinks at no extra cost. We also offer an open bar service (starting at R$ 135/person) with special bachelorette party drinks."'],
      ['"text": "Totalmente seguro! Todas as lanchas possuem coletes salva-vidas, equipamentos de segurança e marinheiro experiente. O mar da Baía de Guanabara é calmo e navegamos em águas protegidas."', '"text": "Completely safe! All boats have life jackets, safety equipment and an experienced skipper. The Guanabara Bay waters are calm and we navigate in protected waters."'],
      // Hero alt text (full string — mixed PT/EN after dictionary)
      ['Grupo de amigas em despedida de solteira na lancha com Pão de Açúcar ao fundo', 'Group of friends at a bachelorette party on the boat with Sugarloaf Mountain in the background'],
      // Gallery alt text (full strings — MUST precede short substrings)
      ['Grupo de amigas na despedida de solteira na lancha', 'Group of friends at the bachelorette party on the boat'],
      ['Buffet e drinks servidos a bordo na despedida de solteira na lancha', 'Buffet and drinks served on board at the bachelorette party on the boat'],
      ['Amiga com óculos Team Bride e drink rosa na despedida de solteira na lancha', 'Friend with Team Bride glasses and pink drink at the bachelorette party on the boat'],
      ['Noiva com véu e óculos Team Bride na despedida de solteira na lancha', 'Bride with veil and Team Bride glasses at the bachelorette party on the boat'],
      ['Amigas com faixas Team Bride e drinks rosa na despedida de solteira na lancha', 'Friends with Team Bride sashes and pink drinks at the bachelorette party on the boat'],
      ['Silhueta com drink ao pôr do sol na lancha durante despedida de solteira', 'Silhouette with drink at sunset on the boat during a bachelorette party'],
      ['Personalize sua festa', 'Customize your party'],
      // Hero
      ['Bride to Be', 'Bride to Be'],
      ['Despedida de Solteira na Lancha', 'Bachelorette Party on a Boat'],
      ['Celebre a última farra de solteira no cenário mais incrível do Rio de Janeiro.\n          Lancha privativa, drinks, sol e muita diversão com as melhores amigas!', 'Celebrate the ultimate bachelorette party with the most incredible scenery in Rio de Janeiro.\n          Private boat, drinks, sunshine and tons of fun with your best friends!'],
      ['Reservar pelo WhatsApp', 'Book via WhatsApp'],
      ['Ver Pacotes', 'View Packages'],
      // Social Proof
      ['Despedidas realizadas', 'Bachelorette parties hosted'],
      ['Avaliação no Google', 'Google rating'],
      ['Pessoas por lancha', 'People per boat'],
      ['De festa no mar', 'Of party at sea'],
      // Benefits
      ['Por que escolher', 'Why choose us'],
      ['A Despedida dos Sonhos', 'The Dream Bachelorette Party'],
      ['Tudo que você precisa para uma despedida de solteira inesquecível', 'Everything you need for an unforgettable bachelorette party'],
      ['Cenário Perfeito', 'Perfect Scenery'],
      ['Vista do Pão de Açúcar, Cristo Redentor e as praias mais bonitas do Rio', 'Views of Sugarloaf Mountain, Christ the Redeemer and Rio\'s most beautiful beaches'],
      ['Privacidade Total', 'Total Privacy'],
      ['Lancha exclusiva para o grupo, sem estranhos e com liberdade total', 'Private boat for your group only, no strangers and total freedom'],
      ['Som Bluetooth', 'Bluetooth Sound'],
      ['Playlist personalizada da noiva tocando no som de alta qualidade', 'Bride\'s custom playlist playing on high-quality speakers'],
      ['Fotos Incríveis', 'Amazing Photos'],
      ['Cenário perfeito para fotos que vão bombar nas redes sociais', 'Perfect backdrop for photos that will blow up on social media'],
      // How it works
      ['Passo a passo', 'Step by step'],
      ['Como Organizar', 'How to Organize'],
      ['Escolha a Data', 'Choose the Date'],
      ['Entre em contato pelo WhatsApp e informe a data desejada', 'Contact us via WhatsApp and let us know your preferred date'],
      ['Monte o Grupo', 'Gather Your Group'],
      ['Confirme as amigas e escolha a lancha ideal para o tamanho do grupo', 'Confirm your friends and choose the ideal boat for your group size'],
      ['Personalize', 'Customize'],
      ['Adicione decoração, drinks e serviços extras se desejar', 'Add decoration, drinks and extra services if desired'],
      ['Curta!', 'Enjoy!'],
      ['Chegue na Marina, embarque e aproveite a melhor despedida', 'Arrive at the Marina, board and enjoy the best bachelorette party ever'],
      // Gallery
      ['Galeria', 'Gallery'],
      ['Despedidas que Fizemos', 'Bachelorette Parties We\'ve Hosted'],
      // Boats
      ['Nossas Lanchas', 'Our Boats'],
      ['Escolha Sua Lancha', 'Choose Your Boat'],
      ['Todas incluem combustível, marinheiro e equipamentos de segurança', 'All include fuel, skipper and safety equipment'],
      ['Melhor custo-benefício', 'Best value'],
      ['Até 15 pessoas', 'Up to 15 people'],
      ['Combustível incluso', 'Fuel included'],
      ['Tapete flutuante', 'Floating mat'],
      ['Ver Detalhes', 'View Details'],
      ['Até 16 pessoas', 'Up to 16 people'],
      ['Churrasqueira', 'BBQ Grill'],
      ['Até 14 pessoas', 'Up to 14 people'],
      ['Conforto premium', 'Premium comfort'],
      ['Até 12 pessoas', 'Up to 12 people'],
      ['Flybridge exclusivo', 'Exclusive flybridge'],
      ['Até 22 pessoas', 'Up to 22 people'],
      ['Maior capacidade', 'Largest capacity'],
      ['Lanchas Parceiras', 'Partner Boats'],
      ['Precisa de mais espaço?', 'Need more space?'],
      ['Temos lanchas parceiras de 10 a 65 pessoas para grupos maiores.', 'We have partner boats for 10 to 65 people for larger groups.'],
      ['Consultar Lanchas Maiores', 'Inquire About Larger Boats'],
      // Extras
      ['Serviços Extras', 'Extra Services'],
      ['Monte seu Pacote', 'Build Your Package'],
      ['Personalize sua despedida com serviços exclusivos', 'Customize your bachelorette party with exclusive services'],
      ['Open Bar', 'Open Bar'],
      ['Drinks, cerveja, caipirinha e muito mais', 'Drinks, beer, caipirinha and much more'],
      ['A partir de', 'Starting from'],
      ['por pessoa', 'per person'],
      ['Churrasco', 'BBQ'],
      ['Churrasco completo com churrasqueiro a bordo', 'Full BBQ with grill master on board'],
      ['Decoração', 'Decoration'],
      ['Faixa de noiva, balões, adereços e props para fotos', 'Bride-to-be sash, balloons, props and photo accessories'],
      ['Fotógrafo', 'Photographer'],
      ['Fotógrafo profissional para registrar todos os momentos', 'Professional photographer to capture every moment'],
      ['Consulte', 'Inquire'],
      // Reviews
      ['Noivas Felizes', 'Happy Brides'],
      ['Despedidas Inesquecíveis', 'Unforgettable Bachelorette Parties'],
      // FAQ
      ['Perguntas Frequentes', 'Frequently Asked Questions'],
      ['Dúvidas sobre Despedida de Solteira', 'Bachelorette Party FAQ'],
      ['Quantas pessoas cabem na lancha para despedida de solteira?', 'How many people fit on the boat for a bachelorette party?'],
      ['Temos opções de lanchas para grupos de 10 a 65 pessoas. Nossas lanchas próprias comportam de 12 a 22 pessoas, e com parceiros temos opções maiores para grupos grandes. Entre em contato para encontrar a lancha ideal para seu grupo.', 'We have boat options for groups of 10 to 65 people. Our own boats accommodate 12 to 22 people, and with partners we have larger options for big groups. Contact us to find the ideal boat for your group.'],
      ['A decoração está inclusa no pacote?', 'Is decoration included in the package?'],
      ['A decoração temática de despedida de solteira é um adicional a partir de R$ 135/pessoa, incluindo faixa de noiva, balões, adereços temáticos e props para fotos. Você também pode trazer sua própria decoração.', 'Bachelorette party themed decoration is an add-on starting at R$ 135/person, including bride-to-be sash, balloons, themed props and photo accessories. You can also bring your own decoration.'],
      ['Posso levar bebida para a despedida?', 'Can I bring my own drinks to the party?'],
      ['Sim! Você pode levar suas próprias bebidas sem custo extra. Também oferecemos serviço de open bar (a partir de R$ 135/pessoa) com drinks especiais para despedida de solteira.', 'Yes! You can bring your own drinks at no extra cost. We also offer an open bar service (starting at R$ 135/person) with special bachelorette party drinks.'],
      ['É seguro fazer despedida de solteira na lancha?', 'Is it safe to have a bachelorette party on a boat?'],
      ['Totalmente seguro! Todas as lanchas possuem coletes salva-vidas, equipamentos de segurança e marinheiro experiente. O mar da Baía de Guanabara é calmo e navegamos em águas protegidas.', 'Completely safe! All boats have life jackets, safety equipment and an experienced skipper. The Guanabara Bay waters are calm and we navigate in protected waters.'],
      ['Quanto tempo dura o passeio?', 'How long does the trip last?'],
      ['O passeio dura aproximadamente 5 horas, saindo da Marina da Glória. É tempo suficiente para curtir o mar, tirar fotos, mergulhar e aproveitar todos os serviços contratados.', 'The trip lasts approximately 5 hours, departing from Marina da Glória. It\'s enough time to enjoy the sea, take photos, swim and enjoy all the services booked.'],
      // Partner boats section
      ['Grupos maiores? Temos opções de 30 a 65 pessoas!', 'Larger groups? We have options for 30 to 65 people!'],
      ['30-40 pessoas', '30-40 people'],
      ['Ideal para eventos', 'Ideal for events'],
      ['Gerador incluso', 'Generator included'],
      ['Ver Detalhes', 'View Details'],
      ['40-65 pessoas', '40-65 people'],
      ['Catamarã espaçoso', 'Spacious catamaran'],
      ['Pista de dança', 'Dance floor'],
      ['Solicitar Orçamento', 'Request a Quote'],
      ['Despedidas Inesquecíveis', 'Unforgettable Bachelorette Parties'],
      ['Veja os relatos de quem já celebrou a despedida de solteira a bordo com a WeBoat.', 'See testimonials from those who celebrated their bachelorette party on board with WeBoat.'],
      // Reviews intro
      ['Veja o que as noivas e madrinhas estão dizendo sobre nossas despedidas de solteira.', 'See what brides and bridesmaids are saying about our bachelorette parties.'],
      ['Avaliações Google', 'Google Reviews'],
      // Schema.org - LocalBusiness
      ['Aluguel de lanchas no Rio de Janeiro. Passeios privativos com conforto e segurança.', 'Boat rentals in Rio de Janeiro. Private trips with comfort and safety.'],
      // Rio Star 50 alt text
      ['Nossa maior lancha para 20-22 pessoas', 'Our largest boat for 20-22 people'],
      // Extras section (long string first)
      ['Deixe a despedida ainda mais especial com nossos serviços adicionais', 'Make the bachelorette party even more special with our additional services'],
      ['Kit Bride to Be com faixa, balões, props para fotos. A partir de R$ 135/pessoa', 'Bride to Be kit with sash, balloons, photo props. Starting from R$ 135/person'],
      // Recommended
      ['Lanchas Recomendadas para Despedida de Solteira', 'Recommended Boats for Bachelorette Party'],
      ['Lanchas Recomendadas', 'Recommended Boats'],
      ['Para Despedida de Solteira', 'For Bachelorette Parties'],
      ['Selecionamos as melhores opções para a despedida perfeita', 'We selected the best options for the perfect bachelorette party'],
      // Visible HTML FAQ answers (differ from Schema.org versions above)
      ['Temos opções de lanchas para grupos de 10 a 65 pessoas! Nossas lanchas próprias comportam de 12 a 22 pessoas, e com parceiros temos opções maiores para grupos grandes. Entre em contato para encontrar a lancha ideal para seu grupo.', 'We have boat options for groups of 10 to 65 people! Our own boats accommodate 12 to 22 people, and with partners we have larger options for big groups. Contact us to find the ideal boat for your group.'],
      ['A decoração temática de despedida de solteira é um adicional a partir de R$ 135/pessoa, incluindo faixa de noiva, balões, adereços temáticos e props para fotos. Você também pode trazer sua própria decoração sem custo adicional.', 'Bachelorette party themed decoration is an add-on starting at R$ 135/person, including bride-to-be sash, balloons, themed props and photo accessories. You can also bring your own decoration at no extra cost.'],
      ['Posso levar minha própria bebida e comida?', 'Can I bring my own drinks and food?'],
      ['Sim! Você pode levar suas próprias bebidas e comida sem custo extra. Fornecemos coolers. Também oferecemos serviço de open bar (a partir de R$ 135/pessoa) e churrasco completo para quem preferir não se preocupar.', 'Yes! You can bring your own drinks and food at no extra cost. We provide coolers. We also offer an open bar service (from R$ 135/person) and full BBQ for those who prefer not to worry.'],
      ['Totalmente seguro! Todas as lanchas possuem coletes salva-vidas para todos os passageiros, equipamentos de segurança e marinheiro habilitado pela Marinha do Brasil. Navegamos em águas calmas da Baía de Guanabara.', 'Completely safe! All boats have life jackets for all passengers, safety equipment and a captain licensed by the Brazilian Navy. We navigate in the calm waters of Guanabara Bay.'],
      ['E se chover no dia?', 'What if it rains on the day?'],
      ['Se as condições climáticas não permitirem navegação segura, remarcamos seu passeio para outra data sem custo adicional. Nossa equipe monitora a previsão do tempo e entra em contato com antecedência.', 'If weather conditions do not allow safe navigation, we reschedule your trip to another date at no extra cost. Our team monitors the weather forecast and contacts you in advance.'],
      ['Selecionamos as melhores opções para sua despedida de solteira', 'We selected the best options for your bachelorette party'],
      // CTA
      ['Reserve Agora a Despedida Perfeita', 'Book the Perfect Bachelorette Party Now'],
      ['Entre em contato e garanta a data para uma despedida de solteira inesquecível!', 'Contact us and secure your date for an unforgettable bachelorette party!'],
      ['Falar com Especialista', 'Talk to a Specialist'],
    ],
  },
  {
    ptPath: 'aniversario/index.html',
    enPath: 'en/birthday-party/index.html',
    title: 'Birthday Party on a Boat in Rio de Janeiro | WeBoat Brasil',
    description: 'Celebrate your birthday on a private boat in Rio! BBQ, DJ, open bar, decoration. From R$ 2,300. Unforgettable experience!',
    keywords: 'birthday party boat rio, birthday celebration boat, party boat rio de janeiro',
    waMessage: 'Hello! I want to celebrate my birthday on a boat. Can you help me organize? [via site - en]',
    css: 'ocasioes',
    contentBlocks: [
      // Schema.org Event name + description + Offer (must come first — longest strings)
      ['"name": "Festa de Aniversário na Lancha - Rio de Janeiro"', '"name": "Birthday Party on a Boat - Rio de Janeiro"'],
      ['"description": "Comemore seu aniversário de forma inesquecível a bordo de uma lancha privativa no Rio de Janeiro. Churrasco, open bar, decoração e vista incrível."', '"description": "Celebrate your birthday in an unforgettable way aboard a private boat in Rio de Janeiro. BBQ, open bar, decoration and incredible views."'],
      ['"name": "Pacote Aniversário na Lancha"', '"name": "Birthday Party on a Boat Package"'],
      // Schema.org FAQ answers
      ['"text": "Sim! Temos lanchas com churrasqueira disponível, como a WeBoat 390. O serviço completo de churrasco com churrasqueiro e carnes começa a partir de R$ 100 por pessoa."', '"text": "Yes! We have boats with BBQ grills available, such as the WeBoat 390. The full BBQ service with grill master and meats starts from R$ 100 per person."'],
      ['"text": "Oferecemos o Kit Festa Premium a partir de R$ 1.850, incluindo balões, faixa personalizada, mesa decorada, iluminação e velas. Você também pode trazer sua própria decoração."', '"text": "We offer the Premium Party Kit starting at R$ 1,850, including balloons, custom banner, decorated table, lighting and candles. You can also bring your own decoration."'],
      ['"text": "Claro! Você pode trazer seu próprio bolo. Temos espaço refrigerado para armazená-lo durante o passeio e a tripulação pode ajudar na hora de cantar parabéns."', '"text": "Of course! You can bring your own cake. We have refrigerated space to store it during the trip and the crew can help when it\'s time to sing happy birthday."'],
      // Hero alt text (full string — mixed PT/EN after dictionary)
      ['Festa de aniversário na lancha no Rio de Janeiro', 'Birthday party on a boat in Rio de Janeiro'],
      // Gallery alt text (full strings — MUST precede short substrings)
      ['Buffet de frutas tropicais com arranjo de flores na lancha na Marina da Glória', 'Tropical fruit buffet with flower arrangement on the boat at Marina da Gloria'],
      ['Aniversariante com bolo personalizado na lancha', 'Birthday person with custom cake on the boat'],
      ['Mesa de buffet com mini hambúrgueres, quiche e salgados decorada com balões rosa em festa de aniversário na lancha', 'Buffet table with mini hamburgers, quiche and appetizers decorated with pink balloons at a birthday party on the boat'],
      ['Decoração de aniversário na lancha com balões verdes e letreiro Happy Birthday neon', 'Birthday decoration on the boat with green balloons and neon Happy Birthday sign'],
      ['Churrasqueiro preparando espetinhos e carnes na churrasqueira a bordo da lancha', 'Grill chef preparing skewers and meats on the BBQ grill on board the boat'],
      ['Equipe preparando churrasco e petiscos na churrasqueira da marina com vista para o mar', 'Team preparing BBQ and snacks on the grill at the marina with a sea view'],
      // Longer strings first (must precede 'Aniversário na Lancha' to avoid substring corruption)
      ['Dúvidas sobre Aniversário na Lancha', 'Birthday Party FAQ'],
      // Hero
      ['Happy Birthday', 'Happy Birthday'],
      ['Aniversário na Lancha', 'Birthday Party on a Boat'],
      ['Comemore seu aniversário com o cenário mais bonito do Rio de Janeiro.\n          Festa privativa, churrasco, drinks e muita diversão no mar!', 'Celebrate your birthday with the most beautiful scenery in Rio de Janeiro.\n          Private party, BBQ, drinks and tons of fun at sea!'],
      ['Reservar pelo WhatsApp', 'Book via WhatsApp'],
      ['Ver Pacotes', 'View Packages'],
      // Social Proof
      ['Aniversários celebrados', 'Birthdays celebrated'],
      ['Avaliação no Google', 'Google rating'],
      ['Convidados por lancha', 'Guests per boat'],
      ['De festa disponíveis', 'Of party available'],
      // Benefits
      ['Por que escolher', 'Why choose us'],
      ['O Aniversário dos Sonhos', 'The Dream Birthday Party'],
      ['Tudo que você precisa para uma festa de aniversário inesquecível', 'Everything you need for an unforgettable birthday party'],
      ['Churrasco no Mar', 'BBQ at Sea'],
      ['Churrasqueira disponível em lanchas selecionadas com serviço completo', 'BBQ grill available on select boats with full service'],
      ['Momento do Bolo', 'Cake Time'],
      ['Cantamos parabéns com a tripulação e cenário perfeito para fotos', 'We sing happy birthday with the crew and perfect backdrop for photos'],
      ['Open Bar', 'Open Bar'],
      ['Drinks, cerveja, caipirinha e tudo para sua festa ser completa', 'Drinks, beer, caipirinha and everything for the perfect party'],
      ['Decoração', 'Decoration'],
      ['Balões, faixas personalizadas e toda decoração que você quiser', 'Balloons, custom banners and all the decoration you want'],
      // How it works
      ['Passo a passo', 'Step by step'],
      ['Como Organizar', 'How to Organize'],
      ['Escolha a Data', 'Choose the Date'],
      ['Entre em contato e reserve o dia especial', 'Contact us and book your special day'],
      ['Defina os Serviços', 'Choose Your Services'],
      ['Churrasco, open bar, decoração - monte seu pacote', 'BBQ, open bar, decoration - build your package'],
      ['Convide os Amigos', 'Invite Your Friends'],
      ['Confirme os convidados e escolha a lancha ideal', 'Confirm your guests and choose the ideal boat'],
      ['Celebre!', 'Celebrate!'],
      ['Chegue, embarque e curta seu dia especial', 'Arrive, board and enjoy your special day'],
      // Gallery
      ['Galeria', 'Gallery'],
      ['Aniversários que Celebramos', 'Birthdays We\'ve Celebrated'],
      // Boats
      ['Nossas Lanchas', 'Our Boats'],
      ['Escolha Sua Lancha', 'Choose Your Boat'],
      ['Todas incluem combustível, marinheiro e equipamentos de segurança', 'All include fuel, skipper and safety equipment'],
      // Extras
      ['Serviços Extras', 'Extra Services'],
      ['Monte seu Pacote', 'Build Your Package'],
      ['Personalize sua festa com serviços exclusivos', 'Customize your party with exclusive services'],
      ['Churrasco Completo', 'Full BBQ'],
      ['Churrasqueiro, carnes, acompanhamentos e tudo pronto', 'Grill master, meats, sides and everything ready'],
      ['Decoração / Kit Festa', 'Decoration / Party Kit'],
      ['Balões, faixa personalizada, mesa decorada e iluminação', 'Balloons, custom banner, decorated table and lighting'],
      ['Bolo Personalizado', 'Custom Cake'],
      ['Bolo de aniversário personalizado entregue a bordo', 'Custom birthday cake delivered on board'],
      // Extras differentials (text overline + descriptions)
      ['Personalize sua festa', 'Customize your party'],
      ['Deixe seu aniversário ainda mais especial com nossos serviços adicionais', 'Make your birthday even more special with our additional services'],
      ['Churrasqueiro + carnes premium + acompanhamentos. A partir de R$ 100/pessoa', 'Grill master + premium meats + sides. From R$ 100/person'],
      ['Cerveja, drinks, caipirinha e mais. A partir de R$ 135/pessoa', 'Beer, drinks, caipirinha and more. From R$ 135/person'],
      ['Kit Festa Premium com balões, faixa, mesa decorada e iluminação. A partir de R$ 1.850', 'Premium Party Kit with balloons, banner, decorated table and lighting. From R$ 1,850'],
      ['Bolo decorado com tema à sua escolha. Consulte valores', 'Themed decorated cake of your choice. Inquire about pricing'],
      // Reviews
      ['Aniversariantes Felizes', 'Happy Birthday People'],
      ['Festas Inesquecíveis', 'Unforgettable Parties'],
      // FAQ
      ['Perguntas Frequentes', 'Frequently Asked Questions'],
      ['Posso fazer churrasco na lancha?', 'Can I have a BBQ on the boat?'],
      ['Sim! Temos lanchas com churrasqueira disponível, como a WeBoat 390. O serviço completo de churrasco com churrasqueiro e carnes começa a partir de R$ 100 por pessoa.', 'Yes! We have boats with BBQ grills available, such as the WeBoat 390. The full BBQ service with grill master and meats starts from R$ 100 per person.'],
      ['Como funciona a decoração de aniversário?', 'How does birthday decoration work?'],
      ['Oferecemos o Kit Festa Premium a partir de R$ 1.850, incluindo balões, faixa personalizada, mesa decorada, iluminação e velas. Você também pode trazer sua própria decoração.', 'We offer the Premium Party Kit starting at R$ 1,850, including balloons, custom banner, decorated table, lighting and candles. You can also bring your own decoration.'],
      ['Posso levar bolo de aniversário?', 'Can I bring a birthday cake?'],
      ['Claro! Você pode trazer seu próprio bolo. Temos espaço refrigerado para armazená-lo durante o passeio e a tripulação pode ajudar na hora de cantar parabéns.', 'Of course! You can bring your own cake. We have refrigerated space to store it during the trip and the crew can help when it\'s time to sing happy birthday.'],
      ['Quanto custa uma festa de aniversário na lancha?', 'How much does a birthday party on a boat cost?'],
      ['O valor da lancha começa a partir de R$ 2.300 (seg-qui). Serviços extras como churrasco, open bar e decoração são contratados à parte. Entre em contato para montar seu pacote personalizado.', 'The boat rental starts from R$ 2,300 (Mon-Thu). Extra services like BBQ, open bar and decoration are booked separately. Contact us to build your custom package.'],
      ['Quantas pessoas cabem na lancha?', 'How many people fit on the boat?'],
      ['Nossas lanchas próprias comportam de 12 a 22 pessoas. Para grupos maiores, temos lanchas parceiras para até 65 pessoas. A média para festas de aniversário é de 15 a 20 convidados.', 'Our own boats accommodate 12 to 22 people. For larger groups, we have partner boats for up to 65 people. The average for birthday parties is 15 to 20 guests.'],
      // Partner boats section
      ['Grupos maiores? Temos opções de 30 a 65 pessoas!', 'Larger groups? We have options for 30 to 65 people!'],
      ['30-40 pessoas', '30-40 people'],
      ['Ideal para eventos', 'Ideal for events'],
      ['Gerador incluso', 'Generator included'],
      ['Ver Detalhes', 'View Details'],
      ['40-65 pessoas', '40-65 people'],
      ['Catamarã espaçoso', 'Spacious catamaran'],
      ['Pista de dança', 'Dance floor'],
      ['Solicitar Orçamento', 'Request a Quote'],
      // Schema.org - LocalBusiness
      ['Aluguel de lanchas no Rio de Janeiro. Passeios privativos com conforto e segurança.', 'Boat rentals in Rio de Janeiro. Private trips with comfort and safety.'],
      // Rio Star 50 alt text
      ['Nossa maior lancha para 20-22 pessoas', 'Our largest boat for 20-22 people'],
      // Reviews section
      ['Comemorações Especiais no Mar', 'Special Celebrations at Sea'],
      ['Descubra por que tantas pessoas escolhem a WeBoat para celebrar seus aniversários.', 'Discover why so many people choose WeBoat to celebrate their birthdays.'],
      ['Avaliações Google', 'Google Reviews'],
      // FAQ answers - remaining PT sentences (long strings first)
      ['Você também pode contratar apenas a taxa da churrasqueira e levar seus próprios itens.', 'You can also book just the BBQ grill fee and bring your own items.'],
      ['Oferecemos o Kit Festa Premium a partir de R$ 1.850, incluindo balões, faixa personalizada, mesa decorada, iluminação e velas. Você também pode trazer sua própria decoração sem custo adicional.', 'We offer the Premium Party Kit starting at R$ 1,850, including balloons, custom banner, decorated table, lighting and candles. You can also bring your own decoration at no extra cost.'],
      ['Claro! Você pode trazer seu próprio bolo. Temos espaço para armazená-lo durante o passeio e a tripulação pode ajudar na hora de cantar parabéns em um momento especial.', 'Of course! You can bring your own cake. We have space to store it during the trip and the crew can help when it\'s time to sing happy birthday in a special moment.'],
      ['Qual o horário ideal para aniversário na lancha?', 'What is the ideal time for a birthday on a boat?'],
      ['O horário do final da tarde (a partir das 15h) é muito popular para ver o pôr do sol. Mas também fazemos passeios de manhã e à tarde. Finais de semana e feriados costumam ter mais procura, então reserve com antecedência.', 'The late afternoon time (from 3 PM onwards) is very popular for watching the sunset. We also do morning and afternoon trips. Weekends and holidays tend to be in higher demand, so book in advance.'],
      ['Posso estender o tempo do passeio?', 'Can I extend the trip duration?'],
      ['Sim! Você pode contratar horas adicionais. Muitos aniversariantes optam por passeios de 4h, 5h ou até 6h para aproveitar mais com churrasco e drinks. Consulte os valores das horas extras.', 'Yes! You can book additional hours. Many birthday celebrants opt for 4h, 5h or up to 6h trips to enjoy more with BBQ and drinks. Check the prices for extra hours.'],
      // CTA
      ['Celebre mais um ano de vida com o cenário mais bonito do Rio de Janeiro!', 'Celebrate another year of life with the most beautiful scenery in Rio de Janeiro!'],
      // Recommended
      ['Lanchas Recomendadas para Aniversário', 'Recommended Boats for Birthday Party'],
      ['Lanchas Recomendadas', 'Recommended Boats'],
      ['Para Aniversário', 'For Birthday Parties'],
      ['Selecionamos as melhores opções para sua festa de aniversário', 'We selected the best options for your birthday party'],
      // CTA
      ['Reserve Seu Aniversário no Mar', 'Book Your Birthday at Sea'],
      ['Entre em contato e garanta a data para uma festa inesquecível!', 'Contact us and secure your date for an unforgettable party!'],
      ['Falar com Especialista', 'Talk to a Specialist'],
    ],
  },
  {
    ptPath: 'corporativo/index.html',
    enPath: 'en/corporate-events/index.html',
    title: 'Corporate Events on a Boat in Rio de Janeiro | WeBoat Brasil',
    description: 'Host your corporate event on a private boat in Rio. Team building, client entertainment, product launches. Boats for 10-65 people.',
    keywords: 'corporate event boat rio, team building boat, business event boat rio de janeiro',
    waMessage: 'Hello! I would like information about corporate events on a boat. [via site - en]',
    css: 'ocasioes',
    contentBlocks: [
      // Schema.org Event name + description + Offer (must come first — longest strings)
      ['"name": "Eventos Corporativos na Lancha"', '"name": "Corporate Events on a Boat"'],
      ['"description": "Serviço de eventos corporativos exclusivos a bordo de lanchas no Rio de Janeiro. Confraternizações, team building, reuniões executivas e premiações."', '"description": "Exclusive corporate event services aboard boats in Rio de Janeiro. Company celebrations, team building, executive meetings and awards."'],
      ['"name": "Pacotes Corporativos"', '"name": "Corporate Packages"'],
      ['"name": "Confraternização Empresa"', '"name": "Company Celebration"'],
      ['"description": "Lancha privativa para até 65 pessoas"', '"description": "Private boat for up to 65 people"'],
      // Schema.org FAQ answers
      ['"text": "Sim, emitimos nota fiscal de serviços para todas as reservas corporativas. Basta informar os dados da empresa no momento da contratação."', '"text": "Yes, we issue service invoices for all corporate bookings. Just provide the company details at the time of booking."'],
      ['"text": "Com nossa frota própria atendemos até 22 pessoas por lancha. Para grupos maiores de até 65 pessoas, temos lanchas parceiras disponíveis. Também podemos organizar eventos com múltiplas lanchas."', '"text": "With our own fleet we accommodate up to 22 people per boat. For larger groups of up to 65 people, we have partner boats available. We can also organize events with multiple boats."'],
      ['"text": "Sim! Nossas lanchas maiores oferecem ambiente confortável para reuniões executivas em ambiente diferenciado. Navegamos em águas calmas que permitem conversas e apresentações."', '"text": "Yes! Our larger boats offer a comfortable setting for executive meetings in a distinctive environment. We navigate in calm waters that allow for conversations and presentations."'],
      // Other Schema.org
      ['Lancha privativa para até 65 pessoas', 'Private boat for up to 65 people'],
      // Hero alt text (full string — mixed PT/EN after dictionary)
      ['Evento corporativo na lancha no Rio de Janeiro', 'Corporate event on a boat in Rio de Janeiro'],
      // Differentials alt text
      ['Equipe em evento corporativo na lancha', 'Team at a corporate event on the boat'],
      // Gallery alt text (full strings — MUST precede short substrings)
      ['Convidados com drinks em confraternização corporativa na lancha', 'Guests with drinks at a corporate celebration on the boat'],
      ['Grupo brindando em evento corporativo no mar', 'Group toasting at a corporate event at sea'],
      ['Happy hour corporativo no mar com vista do Rio', 'Corporate happy hour at sea with a view of Rio'],
      ['Colaboradores relaxando no deck da lancha', 'Colleagues relaxing on the deck of the boat'],
      ['Relaxamento no solário da lancha em evento corporativo', 'Relaxation on the sun deck of the boat at a corporate event'],
      // Visible text (long first)
      ['Decoração personalizada com a identidade visual da sua empresa', 'Custom decoration with your company branding'],
      ['Confira a avaliação de empresas que realizaram confraternizações e eventos conosco.', 'Check out reviews from companies that have hosted celebrations and events with us.'],
      ['Selecionamos as melhores opções para sua confraternização corporativa', 'We selected the best options for your corporate celebration'],
      // Longer strings first (must precede 'Eventos Corporativos' to avoid substring corruption)
      ['Lanchas Recomendadas para Eventos Corporativos', 'Recommended Boats for Corporate Events'],
      ['Eventos Corporativos de Sucesso', 'Successful Corporate Events'],
      ['Dúvidas sobre Eventos Corporativos', 'Corporate Events FAQ'],
      ['Para Eventos Corporativos', 'For Corporate Events'],
      // Hero
      ['Corporate', 'Corporate'],
      ['Eventos Corporativos', 'Corporate Events'],
      ['Surpreenda sua equipe com uma experiência única no mar.\n          Confraternizações, team building, reuniões e celebrações em ambiente exclusivo.', 'Surprise your team with a unique experience at sea.\n          Company parties, team building, meetings and celebrations in an exclusive setting.'],
      ['Solicitar Orçamento', 'Request a Quote'],
      ['Ver Opções', 'View Options'],
      // Social Proof
      ['Eventos corporativos', 'Corporate events'],
      ['Pessoas por evento', 'People per event'],
      ['Nota fiscal emitida', 'Invoice issued'],
      ['Avaliação Google', 'Google rating'],
      // Event Types
      ['Tipos de eventos', 'Event types'],
      ['Eventos que Realizamos', 'Events We Host'],
      ['Soluções personalizadas para cada necessidade da sua empresa', 'Customized solutions for every company need'],
      ['Confraternizações', 'Company Celebrations'],
      ['Fim de ano, metas batidas, celebração de resultados em ambiente único', 'Year-end parties, goals achieved, celebrating results in a unique setting'],
      ['Team Building', 'Team Building'],
      ['Integração de equipes, onboarding e atividades de grupo no mar', 'Team integration, onboarding and group activities at sea'],
      ['Premiações', 'Award Ceremonies'],
      ['Reconhecimento de colaboradores e parceiros em experiência exclusiva', 'Employee and partner recognition in an exclusive experience'],
      ['Reuniões Executivas', 'Executive Meetings'],
      ['Ambiente diferenciado para reuniões estratégicas e negociações', 'Distinctive setting for strategic meetings and negotiations'],
      // Differentials
      ['Por que escolher a WeBoat', 'Why choose WeBoat'],
      ['Diferenciais para Empresas', 'Advantages for Companies'],
      ['Experiência e estrutura para atender às necessidades corporativas', 'Experience and infrastructure to meet corporate needs'],
      ['Nota Fiscal', 'Invoice'],
      ['Emissão de NF de serviços para facilitar o pagamento via CNPJ', 'Service invoice issued for easy corporate payment'],
      ['Seguro Completo', 'Full Insurance'],
      ['Seguro obrigatório e responsabilidade civil para todos os passageiros', 'Mandatory insurance and liability coverage for all passengers'],
      ['Atendimento Dedicado', 'Dedicated Support'],
      ['Consultor exclusivo para organização do seu evento', 'Exclusive consultant for your event planning'],
      ['Personalização Total', 'Full Customization'],
      ['Adaptamos roteiro, serviços e decoração às suas necessidades', 'We adapt the route, services and decoration to your needs'],
      // Gallery
      ['Galeria', 'Gallery'],
      ['Eventos que Realizamos', 'Events We\'ve Hosted'],
      // Boats
      ['Nossas Lanchas', 'Our Boats'],
      ['Escolha Sua Lancha', 'Choose Your Boat'],
      ['Todas incluem combustível, marinheiro e equipamentos de segurança', 'All include fuel, skipper and safety equipment'],
      // Extras
      ['Serviços Extras', 'Extra Services'],
      ['Monte seu Evento', 'Build Your Event'],
      ['Personalize seu evento com serviços profissionais', 'Customize your event with professional services'],
      ['Churrasco', 'BBQ'],
      ['Churrasco completo com churrasqueiro profissional', 'Full BBQ with professional grill master'],
      ['Open Bar', 'Open Bar'],
      ['Drinks, cerveja, espumante e bebidas premium', 'Drinks, beer, sparkling wine and premium beverages'],
      ['Finger Food', 'Finger Food'],
      ['Canapés, mini porções e petiscos sofisticados', 'Canapes, mini portions and sophisticated appetizers'],
      ['Branding', 'Branding'],
      ['Personalização com logo, banners e materiais da empresa', 'Customization with logo, banners and company materials'],
      // Reviews
      ['Empresas Satisfeitas', 'Satisfied Companies'],
      // FAQ
      ['Perguntas Frequentes', 'Frequently Asked Questions'],
      ['Vocês emitem nota fiscal para empresas?', 'Do you issue invoices for companies?'],
      ['Sim, emitimos nota fiscal de serviços para todas as reservas corporativas. Basta informar os dados da empresa no momento da contratação.', 'Yes, we issue service invoices for all corporate bookings. Just provide the company details at the time of booking.'],
      ['Qual a capacidade máxima para eventos corporativos?', 'What is the maximum capacity for corporate events?'],
      ['Com nossa frota própria atendemos até 22 pessoas por lancha. Para grupos maiores de até 65 pessoas, temos lanchas parceiras disponíveis. Também podemos organizar eventos com múltiplas lanchas.', 'With our own fleet we accommodate up to 22 people per boat. For larger groups of up to 65 people, we have partner boats available. We can also organize events with multiple boats.'],
      ['É possível fazer reuniões na lancha?', 'Is it possible to hold meetings on the boat?'],
      ['Sim! Nossas lanchas maiores oferecem ambiente confortável para reuniões executivas em ambiente diferenciado. Navegamos em águas calmas que permitem conversas e apresentações.', 'Yes! Our larger boats offer a comfortable setting for executive meetings in a distinctive environment. We navigate in calm waters that allow for conversations and presentations.'],
      ['Como funciona o pagamento corporativo?', 'How does corporate payment work?'],
      ['Aceitamos transferência bancária, PIX e cartão de crédito. Emitimos nota fiscal e podemos faturar para a empresa. Também trabalhamos com orçamentos personalizados para eventos recorrentes.', 'We accept bank transfer, PIX and credit card. We issue invoices and can bill the company directly. We also work with custom quotes for recurring events.'],
      ['Vocês oferecem opções de catering?', 'Do you offer catering options?'],
      ['Sim! Oferecemos churrasco completo, finger food, canapés e opções de open bar. Todos os serviços de alimentação são preparados por profissionais a bordo.', 'Yes! We offer full BBQ, finger food, canapes and open bar options. All food services are prepared by professionals on board.'],
      // Partner boats section
      ['Grupos maiores? Temos opções de 30 a 65 pessoas!', 'Larger groups? We have options for 30 to 65 people!'],
      ['30-40 pessoas', '30-40 people'],
      ['Ideal para eventos', 'Ideal for events'],
      ['Gerador incluso', 'Generator included'],
      ['Ver Detalhes', 'View Details'],
      ['40-65 pessoas', '40-65 people'],
      ['Catamarã espaçoso', 'Spacious catamaran'],
      ['Pista de dança', 'Dance floor'],
      ['Solicitar Orçamento', 'Request a Quote'],
      ['Complete Seu Evento', 'Complete Your Event'],
      ['Eventos Corporativos de Sucesso', 'Successful Corporate Events'],
      ['Veja depoimentos de empresas que já realizaram eventos a bordo com a WeBoat.', 'See testimonials from companies that have hosted events on board with WeBoat.'],
      // Recommended
      ['Lanchas Recomendadas para Eventos Corporativos', 'Recommended Boats for Corporate Events'],
      ['Lanchas Recomendadas', 'Recommended Boats'],
      ['Selecionamos as melhores opções para seu evento corporativo', 'We selected the best options for your corporate event'],
      // Visible HTML FAQ answers (differ from Schema.org versions — long strings first)
      ['Sim, emitimos nota fiscal de serviços para todas as reservas corporativas. Basta informar os dados da empresa (CNPJ, razão social, endereço) no momento da contratação.', 'Yes, we issue service invoices for all corporate bookings. Just provide the company details (tax ID, company name, address) at the time of booking.'],
      ['Com nossa frota própria atendemos até 22 pessoas por lancha (Rio Star 50). Para grupos maiores de até 65 pessoas, temos lanchas parceiras disponíveis. Também podemos organizar eventos com múltiplas lanchas navegando juntas.', 'With our own fleet we accommodate up to 22 people per boat (Rio Star 50). For larger groups of up to 65 people, we have partner boats available. We can also organize events with multiple boats sailing together.'],
      ['Sim! Nossas lanchas maiores oferecem ambiente confortável para reuniões executivas em ambiente diferenciado. Navegamos em águas calmas da Baía de Guanabara que permitem conversas tranquilas. Ideal para brainstorming, planejamento estratégico ou reuniões de diretoria.', 'Yes! Our larger boats offer a comfortable setting for executive meetings in a distinctive environment. We navigate in the calm waters of Guanabara Bay that allow for quiet conversations. Ideal for brainstorming, strategic planning or board meetings.'],
      ['Como funciona o pagamento para empresas?', 'How does payment work for companies?'],
      ['Aceitamos transferência bancária, PIX, boleto e cartão de crédito corporativo. Para reservas com antecedência, solicitamos um sinal de 50% e o restante pode ser pago até o dia do evento. Faturamento parcelado disponível para contratos corporativos.', 'We accept bank transfer, PIX, invoice and corporate credit card. For advance bookings, we request a 50% deposit and the remainder can be paid by the day of the event. Installment billing available for corporate contracts.'],
      ['Posso personalizar o evento com a marca da empresa?', 'Can I customize the event with my company branding?'],
      ['Sim! Oferecemos personalização com a identidade visual da sua empresa, incluindo banners, bandeiras, itens decorativos e até copos e guardanapos personalizados. Consulte nosso time para montar um pacote sob medida.', 'Yes! We offer customization with your company branding, including banners, flags, decorative items and even custom cups and napkins. Contact our team to build a tailored package.'],
      // Missing visible text
      ['Opções de petiscos e finger food para eventos executivos. Consulte', 'Snack and finger food options for executive events. Contact us'],
      // CTA
      ['Vamos Planejar Seu Evento?', 'Shall We Plan Your Event?'],
      ['Entre em contato e receba um orçamento personalizado para sua empresa.', 'Contact us and receive a custom quote for your company.'],
      ['Entre em contato para um orçamento personalizado para sua empresa.', 'Contact us for a custom quote for your company.'],
      ['Falar com Especialista', 'Talk to a Specialist'],
    ],
  },
  {
    ptPath: 'reveillon/index.html',
    enPath: 'en/new-years-eve/index.html',
    title: "New Year's Eve on a Boat in Rio de Janeiro | WeBoat Brasil",
    description: "Watch the fireworks from a private boat on New Year's Eve in Rio! The best view of the Copacabana fireworks. Book early!",
    keywords: "new years eve boat rio, reveillon boat rio de janeiro, fireworks boat copacabana",
    waMessage: "Hello! I want information about New Year's Eve on a boat to watch the fireworks. [via site - en]",
    css: 'ocasioes',
    contentBlocks: [
      // Schema.org Event description (full PT → EN, must come first — longest string)
      ['"description": "Celebre a virada do ano no mar! Assista à queima de fogos de Copacabana de um ângulo exclusivo, a bordo de uma lancha privativa. Pacote completo com open bar, ceia e aproximadamente 5 horas no mar."', '"description": "Celebrate New Year\'s Eve at sea! Watch the Copacabana fireworks from an exclusive angle, aboard a private boat. Complete package with open bar, dinner and approximately 5 hours at sea."'],
      // Hero alt text (mixed PT/EN after dictionary)
      ['Queima de fogos do réveillon vista do mar no Rio de Janeiro', "Fireworks on New Year's Eve seen from the sea in Rio de Janeiro"],
      // Schema.org FAQ answers (plain text — must come first)
      ['"text": "Navegamos até a orla de Copacabana e posicionamos a lancha em local estratégico para vista privilegiada da queima de fogos. Você verá os fogos explodindo a poucos metros, uma experiência incomparável."', '"text": "We sail to the Copacabana coast and position the boat at a strategic location for a privileged view of the fireworks. You will see the fireworks exploding just meters away, an incomparable experience."'],
      ['"text": "Sim! O réveillon na lancha é muito procurado e as vagas costumam esgotar com meses de antecedência. Recomendamos reservar o quanto antes para garantir sua lancha."', '"text": "Yes! New Year\'s Eve on a boat is very popular and spots tend to sell out months in advance. We recommend booking as soon as possible to secure your boat."'],
      // Visible HTML FAQ answers (longer versions than Schema.org — must also come before shorter substrings)
      ['Navegamos até a orla de Copacabana e posicionamos a lancha em local estratégico para vista privilegiada da queima de fogos. Você verá os fogos explodindo a poucos metros, uma perspectiva incomparável que só quem está no mar consegue ter.', 'We sail to the Copacabana coast and position the boat at a strategic location for a privileged view of the fireworks. You will see the fireworks exploding just meters away, an incomparable perspective that only those at sea can experience.'],
      ['Sim! O réveillon na lancha é muito procurado e as vagas costumam esgotar com meses de antecedência. Temos mais de 20 lanchas disponíveis para a data, mas recomendamos reservar o quanto antes para garantir sua lancha preferida.', 'Yes! New Year\'s Eve on a boat is very popular and spots tend to sell out months in advance. We have more than 20 boats available for the date, but we recommend booking as soon as possible to secure your preferred boat.'],
      ['O réveillon acontece mesmo com chuva leve, pois nossas lanchas têm cobertura. Em caso de condições climáticas severas que impeçam a navegação segura (muito raras nessa época), oferecemos remarcação para passeio em outra data ou reembolso parcial, conforme nosso termo de contratação.', 'New Year\'s Eve happens even with light rain, as our boats have awnings. In case of severe weather conditions that prevent safe navigation (very rare at this time), we offer rescheduling for a trip on another date or partial refund, according to our service agreement.'],
      // Missing visible HTML FAQ answers
      ['O réveillon na lancha inclui aproximadamente 5 horas no mar (das 21h às 2h), posicionamento privilegiado em frente a Copacabana para ver a queima de fogos, open bar completo com espumante para o brinde e ceia de réveillon. É uma experiência exclusiva e privativa para seu grupo.', 'The New Year\'s Eve boat trip includes approximately 5 hours at sea (from 9pm to 2am), prime positioning in front of Copacabana to watch the fireworks, full open bar with champagne for the toast and New Year\'s Eve dinner. It is an exclusive and private experience for your group.'],
      ['Para garantir sua reserva, solicitamos um sinal de 50% via PIX ou transferência. O restante pode ser pago até 15 dias antes do evento. Parcelamento no cartão disponível. Entre em contato pelo WhatsApp para mais detalhes.', 'To secure your reservation, we require a 50% deposit via PIX or bank transfer. The remainder can be paid up to 15 days before the event. Credit card installments available. Contact us via WhatsApp for more details.'],
      ['Não deixe para última hora! As lanchas para o réveillon esgotam rápido.', 'Don\'t leave it to the last minute! Boats for New Year\'s Eve sell out fast.'],
      // alt text
      ['Nossa maior lancha para 20-22 pessoas', 'Our largest boat for 20-22 people'],
      // Longer strings first (must precede 'Réveillon na Lancha' to avoid substring corruption)
      ['Por Que Réveillon na Lancha?', "Why New Year\\'s Eve on a Boat?"],
      ['Dúvidas sobre Réveillon na Lancha', "New Year\\'s Eve FAQ"],
      ['Réveillon 2026/2027 - Reserve com Antecedência!', "New Year\\'s Eve 2026/2027 - Book in Advance!"],
      ['Lanchas Réveillon 2026/2027', "New Year\\'s Eve Boats 2026/2027"],
      ['Personalize seu réveillon com serviços exclusivos', "Customize your New Year\\'s Eve with exclusive services"],
      ['Réveillons Anteriores', "Previous New Year\\'s Eves"],
      ['Réveillons Inesquecíveis', "Unforgettable New Year\\'s Eves"],
      ['Ceia de Réveillon', "New Year\\'s Eve Dinner"],
      // Hero
      ['Vagas Limitadas', 'Limited Spots'],
      ['Réveillon na Lancha', "New Year's Eve on a Boat"],
      ['A virada de ano mais incrível da sua vida! Assista à queima de fogos de Copacabana\n          de um ângulo exclusivo, a bordo de uma lancha privativa no mar do Rio.', "The most incredible New Year\'s Eve of your life! Watch the Copacabana fireworks\n          from an exclusive angle, aboard a private boat on the Rio sea."],
      ['Garantir Minha Vaga', 'Secure My Spot'],
      ['Ver Pacotes', 'View Packages'],
      // Countdown
      ['Lanchas disponíveis', 'Boats available'],
      ['De festa no mar', 'Of party at sea'],
      ['Vista dos fogos', 'Fireworks view'],
      ['Inesquecível', 'Unforgettable'],
      // Benefits
      ['A experiência', 'The experience'],
      ['Uma experiência única que você vai lembrar para sempre', 'A unique experience you will remember forever'],
      ['Vista Exclusiva', 'Exclusive View'],
      ['Fogos de Copacabana vistos do mar, sem multidão, com vista 360°', 'Copacabana fireworks seen from the sea, no crowds, with 360° view'],
      ['Open Bar Completo', 'Full Open Bar'],
      ['Espumante, drinks, cerveja, caipirinha e tudo para brindar o ano novo', 'Sparkling wine, drinks, beer, caipirinha and everything to toast the new year'],
      ['Ceia completa com pratos típicos para celebrar a virada em grande estilo', 'Full dinner with traditional dishes to celebrate in grand style'],
      ['Privacidade Total', 'Total Privacy'],
      ['Apenas você e seus convidados, sem estranhos, sem filas, sem empurra-empurra', 'Just you and your guests, no strangers, no lines, no crowds'],
      // Timeline
      ['Roteiro da noite', 'Evening itinerary'],
      ['Como Funciona', 'How It Works'],
      ['Embarque', 'Boarding'],
      ['Check-in na Marina da Glória com recepção', 'Check-in at Marina da Glória with reception'],
      ['Mureta da Urca', 'Mureta da Urca'],
      ['Parada na tradicional Mureta para curtir o clima carioca', 'Stop at the traditional Mureta to enjoy the Rio vibe'],
      ['Copacabana', 'Copacabana'],
      ['Posicionamento em frente à orla para a virada', 'Positioning in front of the coast for the countdown'],
      ['Retorno', 'Return'],
      ['Voltamos à Marina após celebração inesquecível', 'We return to the Marina after an unforgettable celebration'],
      // Gallery
      ['Galeria', 'Gallery'],
      // Boats
      ['Escolha Sua Lancha', 'Choose Your Boat'],
      ['Todas incluem combustível, marinheiro e equipamentos de segurança. Open bar e ceia disponíveis.', 'All include fuel, skipper and safety equipment. Open bar and dinner available.'],
      ['Consulte', 'Inquire'],
      ['valores réveillon', "New Year\'s Eve prices"],
      ['Solicitar Orçamento', 'Request a Quote'],
      // Extras
      ['Serviços Extras', 'Extra Services'],
      ['Complete sua Virada', 'Complete Your Celebration'],
      ['Open Bar', 'Open Bar'],
      ['Espumante, drinks, cerveja e muito mais para brindar', 'Sparkling wine, drinks, beer and more to toast'],
      ['Ceia', 'Dinner'],
      ['Ceia completa com pratos típicos de ano novo', "Full dinner with traditional New Year\'s dishes"],
      ['Decoração Temática', 'Themed Decoration'],
      ['Decoração especial de réveillon com detalhes em dourado', "Special New Year\'s Eve decoration with gold details"],
      ['Tripulação Experiente', 'Experienced Crew'],
      ['Marinheiros experientes em navegação noturna e réveillon', "Experienced skippers in night navigation and New Year\'s Eve"],
      // Extras differentials (text descriptions)
      ['Serviços Adicionais', 'Additional Services'],
      ['Contrate os serviços extras para uma experiência completa', 'Book extra services for a complete experience'],
      ['Cerveja, caipirinha, drinks, refrigerante, água e espumante para o brinde. A partir de R$ 135/pessoa', 'Beer, caipirinha, drinks, soda, water and sparkling wine for the toast. From R$ 135/person'],
      ['Pratos típicos da ceia: lentilha, tender, arroz, farofa, saladas e sobremesa', 'Traditional dinner dishes: lentils, ham, rice, farofa, salads and dessert'],
      ['Decoração de réveillon com balões, luzes e itens para celebração', "New Year\\'s Eve decoration with balloons, lights and celebration items"],
      ['Marinheiro e equipe de apoio para cuidar de tudo durante a festa', 'Skipper and support crew to take care of everything during the party'],
      ['Veja os relatos de quem assistiu à queima de fogos do mar com a WeBoat.', 'See testimonials from those who watched the fireworks from the sea with WeBoat.'],
      // Reviews
      ['Viradas Memoráveis', 'Memorable Celebrations'],
      // FAQ
      ['Perguntas Frequentes', 'Frequently Asked Questions'],
      ['Como é o réveillon na lancha?', "What is New Year\'s Eve on a boat like?"],
      ['O réveillon na lancha inclui 5 horas de navegação (das 21h às 2h), posicionamento privilegiado para ver a queima de fogos de Copacabana. Open bar, ceia e decoração são serviços adicionais disponíveis. É uma experiência exclusiva para grupos de até 22 pessoas.', "New Year\'s Eve on a boat includes 5 hours of sailing (9 PM to 2 AM), privileged positioning to watch the Copacabana fireworks. Open bar, dinner and decoration are additional services available. It\'s an exclusive experience for groups of up to 22 people."],
      ['De onde a lancha assiste aos fogos?', 'Where does the boat watch the fireworks from?'],
      ['Navegamos até a orla de Copacabana e posicionamos a lancha em local estratégico para vista privilegiada da queima de fogos. Você verá os fogos explodindo a poucos metros, uma experiência incomparável.', 'We sail to the Copacabana coast and position the boat at a strategic location for a privileged view of the fireworks. You will see the fireworks exploding just meters away, an incomparable experience.'],
      ['As vagas esgotam rápido?', 'Do spots sell out quickly?'],
      ['Sim! O réveillon na lancha é muito procurado e as vagas costumam esgotar com meses de antecedência. Recomendamos reservar o quanto antes para garantir sua lancha.', "Yes! New Year\'s Eve on a boat is very popular and spots tend to sell out months in advance. We recommend booking as soon as possible to secure your boat."],
      ['O que está incluso no pacote de réveillon?', "What is included in the New Year\'s Eve package?"],
      ['O pacote base inclui a lancha por 5 horas, combustível, marinheiro e equipamentos de segurança. Open bar, ceia e decoração são serviços adicionais. Consulte nosso time para montar o pacote ideal.', 'The base package includes the boat for 5 hours, fuel, skipper and safety equipment. Open bar, dinner and decoration are additional services. Contact our team to build the ideal package.'],
      ['É seguro navegar à noite no réveillon?', "Is it safe to sail at night on New Year\'s Eve?"],
      ['Totalmente seguro! Nossos marinheiros são experientes em navegação noturna e a Marinha monitora toda a movimentação. Todas as lanchas possuem iluminação, equipamentos de segurança e comunicação via rádio.', 'Completely safe! Our skippers are experienced in night navigation and the Navy monitors all movement. All boats have lighting, safety equipment and radio communication.'],
      // Partner boats section
      ['Grupos maiores? Temos opções de 30 a 65 pessoas!', 'Larger groups? We have options for 30 to 65 people!'],
      ['30-40 pessoas', '30-40 people'],
      ['Ideal para eventos', 'Ideal for events'],
      ['Gerador incluso', 'Generator included'],
      ['Ver Detalhes', 'View Details'],
      ['40-65 pessoas', '40-65 people'],
      ['Catamarã espaçoso', 'Spacious catamaran'],
      ['Pista de dança', 'Dance floor'],
      ['Complete Sua Virada', "Complete Your New Year\'s Eve"],
      ['Quem Passou o Réveillon Conosco', "Those Who Spent New Year\'s Eve With Us"],
      // Recommended
      ['Lanchas Recomendadas para Réveillon', "Recommended Boats for New Year\'s Eve"],
      ['Lanchas Recomendadas', 'Recommended Boats'],
      ['Para o Réveillon', "For New Year\'s Eve"],
      ['Selecionamos as melhores opções para sua virada de ano no mar', 'We selected the best options for your New Year at sea'],
      // Gallery alt text (full strings)
      ['Brinde com taças de champanhe e luzes coloridas na festa de réveillon na lancha', "Toast with champagne glasses and colorful lights at the New Year's Eve party on the boat"],
      ['Convidada celebrando o réveillon na lancha com luzes da cidade ao fundo', "Guest celebrating New Year's Eve on the boat with city lights in the background"],
      ['Vista noturna da Baía de Guanabara com Pão de Açúcar e Botafogo iluminados', 'Night view of Guanabara Bay with Sugarloaf Mountain and Botafogo lit up'],
      // CTA
      ['Garanta Sua Vaga no Réveillon', "Secure Your Spot for New Year\'s Eve"],
      ['Reserve com antecedência — as vagas são limitadas!', 'Book in advance — spots are limited!'],
      ['Falar com Especialista', 'Talk to a Specialist'],
    ],
  },
  {
    ptPath: 'carnaval/index.html',
    enPath: 'en/carnival/index.html',
    title: 'Carnival on a Boat in Rio de Janeiro | WeBoat Brasil',
    description: 'Celebrate Carnival on a private boat in Rio de Janeiro! DJ, open bar, confetti. Your own floating party! Book now!',
    keywords: 'carnival boat rio, carnaval boat party, floating carnival rio de janeiro',
    waMessage: 'Hello! I want information about Carnival on a boat in Rio de Janeiro. [via site - en]',
    css: 'ocasioes',
    contentBlocks: [
      // Schema.org Event description (full PT → EN, must come first — longest string)
      ['"description": "Curta o Carnaval do Rio de Janeiro no mar! Festa privativa em lancha com DJ, open bar, decoração temática e vista privilegiada da orla carioca. Lanchas de 10 a 65 pessoas saindo da Marina da Glória."', '"description": "Enjoy the Carnival of Rio de Janeiro at sea! Private party on a boat with DJ, open bar, themed decoration and a privileged view of the Rio coastline. Boats for 10 to 65 people departing from Marina da Gloria."'],
      // Schema.org FAQ answer
      ['"text": "A WeBoat oferece lanchas de 10 a 65 pessoas para o Carnaval. Lanchas próprias comportam de 12 a 22 pessoas. Para grupos maiores, temos catamarãs e embarcações parceiras para até 65 pessoas."', '"text": "WeBoat offers boats for 10 to 65 people for Carnival. Our own boats accommodate 12 to 22 people. For larger groups, we have catamarans and partner vessels for up to 65 people."'],
      // Visible HTML FAQ answer (longer version)
      ['A WeBoat oferece lanchas de 10 a 65 pessoas para o Carnaval. Lanchas próprias comportam de 12 a 22 pessoas. Para grupos maiores, temos catamarãs e embarcações parceiras para até 65 pessoas. Consulte-nos pelo WhatsApp para encontrar a melhor opção para seu grupo.', 'WeBoat offers boats for 10 to 65 people for Carnival. Our own boats accommodate 12 to 22 people. For larger groups, we have catamarans and partner vessels for up to 65 people. Contact us via WhatsApp to find the best option for your group.'],
      // Longer strings first (must precede 'Carnaval na Lancha' to avoid substring corruption)
      ['Por Que Carnaval na Lancha?', 'Why Carnival on a Boat?'],
      ['Dúvidas sobre Carnaval na Lancha', 'Carnival on a Boat FAQ'],
      ['Carnaval 2026 — 14 a 17 de Fevereiro', 'Carnival 2026 — February 14 to 17'],
      ['Lanchas Carnaval 2026', 'Carnival 2026 Boats'],
      ['Personalize seu Carnaval com serviços profissionais', 'Customize your Carnival with professional services'],
      ['Carnaval no Mar', 'Carnival at Sea'],
      // Hero
      ['Carnaval 2026', 'Carnival 2026'],
      ['Carnaval na Lancha', 'Carnival on a Boat'],
      ['Fuja da multidão e curta o melhor Carnaval da sua vida no mar!\n          Festa privativa com DJ, open bar e decoração temática na Baía de Guanabara.', 'Escape the crowds and enjoy the best Carnival of your life at sea!\n          Private party with DJ, open bar and themed decoration on Guanabara Bay.'],
      ['Reservar Minha Lancha', 'Book My Boat'],
      ['Ver Pacotes', 'View Packages'],
      // Countdown
      ['Lanchas disponíveis', 'Boats available'],
      ['De festa no mar', 'Of party at sea'],
      ['Dias de folia', 'Days of celebration'],
      ['Pessoas (até)', 'People (up to)'],
      // Benefits
      ['A experiência', 'The experience'],
      ['O Carnaval mais exclusivo do Rio de Janeiro acontece no mar', 'The most exclusive Carnival in Rio de Janeiro happens at sea'],
      ['Seu Bloco Privativo', 'Your Private Party'],
      ['Crie seu próprio bloco no mar — sem empurra-empurra, sem filas, só diversão', 'Create your own party at sea — no pushing, no lines, just fun'],
      ['DJ a Bordo', 'DJ on Board'],
      ['Som profissional com DJ tocando os hits do Carnaval e os clássicos de sempre', 'Professional sound with DJ playing Carnival hits and all-time classics'],
      ['Open Bar Completo', 'Full Open Bar'],
      ['Caipirinha, cerveja, drinks e tudo que você precisa para brindar o Carnaval', 'Caipirinha, beer, drinks and everything you need to toast Carnival'],
      ['Vista Incrível', 'Incredible View'],
      ['Curta o Carnaval com a orla do Rio como cenário — Pão de Açúcar, Cristo, praias', 'Enjoy Carnival with the Rio coastline as your backdrop — Sugarloaf, Christ, beaches'],
      // How it works
      ['Roteiro da festa', 'Party itinerary'],
      ['Como Funciona', 'How It Works'],
      ['Embarque', 'Boarding'],
      ['Check-in na Marina da Glória já no clima de Carnaval', 'Check-in at Marina da Glória already in the Carnival spirit'],
      ['Mureta da Urca', 'Mureta da Urca'],
      ['Parada na tradicional Mureta para mergulho e drinks', 'Stop at the traditional Mureta for swimming and drinks'],
      ['Orla do Rio', 'Rio Coastline'],
      ['Navegação pela orla com som, dança e muita animação', 'Sailing along the coast with music, dancing and lots of fun'],
      ['Retorno', 'Return'],
      ['Voltamos à Marina após 5 horas de folia no mar', 'We return to the Marina after 5 hours of celebration at sea'],
      // Gallery
      ['Galeria', 'Gallery'],
      // Gallery alt text
      ['Duas amigas brindando com cerveja na lancha com Pão de Açúcar ao fundo', 'Two friends toasting with beer on the boat with Sugarloaf Mountain in the background'],
      // Boats
      ['Escolha Sua Lancha', 'Choose Your Boat'],
      ['Todas incluem combustível, marinheiro e equipamentos de segurança. DJ, open bar e decoração disponíveis.', 'All include fuel, skipper and safety equipment. DJ, open bar and decoration available.'],
      ['A partir de R$ 2.300', 'Starting from R$ 2,300'],
      ['A partir de R$ 2.600', 'Starting from R$ 2,600'],
      ['5h de passeio', '5h boat trip'],
      ['valores Carnaval', 'Carnival prices'],
      ['Solicitar Orçamento', 'Request a Quote'],
      // Gallery alt text (full strings — MUST precede short substrings)
      ['Grupo de amigas com camisas do Brasil curtindo Carnaval na lancha com Pão de Açúcar ao fundo', 'Group of friends with Brazil shirts enjoying Carnival on the boat with Sugarloaf Mountain in the background'],
      ['Três amigas tomando sol na proa da lancha durante Carnaval no Rio', 'Three friends sunbathing on the bow of the boat during Carnival in Rio'],
      ['Amigas pulando da lancha no mar durante o Carnaval no Rio', 'Friends jumping from the boat into the sea during Carnival in Rio'],
      ['Grupo de amigas se divertindo na água com tapete flutuante durante passeio de Carnaval', 'Group of friends having fun in the water with a floating mat during a Carnival trip'],
      ['Grande grupo curtindo Carnaval na lancha com vista panorâmica do Rio', 'Large group enjoying Carnival on the boat with a panoramic view of Rio'],
      ['DJ profissional com headphones e controladora na lancha', 'Professional DJ with headphones and controller on the boat'],
      // Extras descriptions (LONG paragraphs MUST come before short substrings)
      ['DJ profissional com caixas de som de alta potência. Repertório personalizado com marchinhas, axé, funk e hits. A partir de R$ 1.500', 'Professional DJ with high-power speakers. Customized repertoire with marchinhas, axé, funk and hits. From R$ 1,500'],
      ['Personalize sua festa de Carnaval com nossos serviços extras', 'Customize your Carnival party with our extra services'],
      // Extras
      ['Serviços Extras', 'Extra Services'],
      ['Monte sua Folia', 'Build Your Party'],
      ['DJ com Equipamento', 'DJ with Equipment'],
      ['DJ profissional com caixas de som de alta potência', 'Professional DJ with high-power speakers'],
      ['Open Bar', 'Open Bar'],
      ['Caipirinha, cerveja, drinks e tudo para a folia', 'Caipirinha, beer, drinks and everything for the party'],
      ['Decoração de Carnaval', 'Carnival Decoration'],
      ['Confete, serpentina, adereços e decoração temática', 'Confetti, streamers, props and themed decoration'],
      ['Churrasco a Bordo', 'BBQ on Board'],
      ['Churrasco completo para manter a energia da festa', 'Full BBQ to keep the party energy going'],
      ['Cerveja, caipirinha, drinks, refrigerante e água. Pacotes a partir de R$ 135/pessoa', 'Beer, caipirinha, drinks, soda and water. Packages from R$ 135/person'],
      ['Confete, serpentina, balões coloridos, máscaras e adereços temáticos para toda a turma', 'Confetti, streamers, colorful balloons, masks and themed accessories for the whole group'],
      ['Churrasco completo com picanha, linguiça e acompanhamentos. Kits a partir de R$ 100/pessoa', 'Full BBQ with picanha, sausage and side dishes. Kits from R$ 100/person'],
      // Reviews
      ['Quem já curtiu', 'Past Revelers'],
      ['Festas Inesquecíveis no Mar', 'Unforgettable Parties at Sea'],
      ['Veja os relatos de quem já curtiu festas a bordo com a WeBoat.', 'See testimonials from those who have partied on board with WeBoat.'],
      // FAQ
      ['Perguntas Frequentes', 'Frequently Asked Questions'],
      ['Como funciona o Carnaval na lancha?', 'How does Carnival on a boat work?'],
      ['O Carnaval na lancha é um passeio privativo de aproximadamente 5 horas com saída da Marina da Glória. Você navega pela Baía de Guanabara e orla do Rio com DJ, open bar e decoração temática. É a forma perfeita de curtir o Carnaval longe da multidão, com privacidade e conforto.', 'Carnival on a boat is a private trip of approximately 5 hours departing from Marina da Glória. You sail through Guanabara Bay and along the Rio coast with DJ, open bar and themed decoration. It is the perfect way to enjoy Carnival away from the crowds, with privacy and comfort.'],
      ['Quantas pessoas cabem na lancha de Carnaval?', 'How many people fit on a Carnival boat?'],
      ['A WeBoat oferece lanchas de 10 a 65 pessoas para o Carnaval. Lanchas próprias comportam de 12 a 22 pessoas. Para grupos maiores, temos catamarãs e embarcações parceiras para até 65 pessoas.', 'WeBoat offers boats for 10 to 65 people for Carnival. Our own boats accommodate 12 to 22 people. For larger groups, we have catamarans and partner vessels for up to 65 people.'],
      ['Posso levar fantasia e adereços de Carnaval?', 'Can I bring costumes and Carnival accessories?'],
      ['Com certeza! Fantasias, adereços, confete e serpentina são bem-vindos. Recomendamos cuidado com itens que possam cair no mar. A decoração temática de Carnaval pode ser contratada como serviço extra.', 'Absolutely! Costumes, accessories, confetti and streamers are welcome. We recommend being careful with items that could fall into the sea. Carnival themed decoration can be booked as an extra service.'],
      ['Qual o horário dos passeios no Carnaval?', 'What are the trip times during Carnival?'],
      ['Oferecemos passeios diurnos (geralmente das 13h às 18h) e noturnos durante o Carnaval. Os horários podem variar conforme a disponibilidade. Recomendamos reservar com antecedência pois a demanda é alta.', 'We offer daytime trips (usually 1 PM to 6 PM) and nighttime trips during Carnival. Times may vary depending on availability. We recommend booking in advance as demand is high.'],
      ['Tem DJ na lancha de Carnaval?', 'Is there a DJ on the Carnival boat?'],
      ['O DJ é um serviço extra a partir de R$ 1.500, incluindo equipamento de som profissional. Todas as lanchas já possuem sistema de som Bluetooth caso prefira usar sua própria playlist.', 'The DJ is an extra service starting at R$ 1,500, including professional sound equipment. All boats already have a Bluetooth sound system if you prefer to use your own playlist.'],
      // Visible HTML FAQ answers (differ from Schema.org versions above — long strings first)
      ['O Carnaval na lancha é um passeio privativo de aproximadamente 5 horas com saída da Marina da Glória. Você navega pela Baía de Guanabara e orla do Rio com DJ, open bar e decoração temática. É a forma perfeita de curtir o Carnaval longe da multidão, com privacidade e conforto para seu grupo.', 'Carnival on a boat is a private trip of approximately 5 hours departing from Marina da Glória. You sail through Guanabara Bay and along the Rio coast with DJ, open bar and themed decoration. It is the perfect way to enjoy Carnival away from the crowds, with privacy and comfort for your group.'],
      ['A WeBoat oferece lanchas de 10 a 65 pessoas para o Carnaval. Lanchas próprias comportam de 12 a 22 pessoas. Para grupos maiores, temos catamarãs e embarcações parceiras para até 65 pessoas. Consulte-nos pelo WhatsApp para encontrar a melhor opção para seu grupo.', 'WeBoat offers boats for 10 to 65 people for Carnival. Our own boats accommodate 12 to 22 people. For larger groups, we have catamarans and partner vessels for up to 65 people. Contact us via WhatsApp to find the best option for your group.'],
      ['Posso levar fantasia e adereços?', 'Can I bring costumes and accessories?'],
      ['Com certeza! Fantasias, adereços, confete e serpentina são mais que bem-vindos — é Carnaval! Recomendamos apenas cuidado com itens que possam cair no mar. Se preferir, contrate nosso kit de decoração de Carnaval que já inclui adereços para toda a turma.', 'Absolutely! Costumes, accessories, confetti and streamers are more than welcome — it\'s Carnival! We just recommend being careful with items that could fall into the sea. If you prefer, book our Carnival decoration kit which already includes accessories for the whole group.'],
      ['Posso reservar para mais de um dia de Carnaval?', 'Can I book for more than one day of Carnival?'],
      ['Sim! Muitos clientes reservam para mais de um dia do Carnaval. Oferecemos condições especiais para pacotes de múltiplos dias. Entre em contato pelo WhatsApp para montar seu pacote personalizado de Carnaval.', 'Yes! Many clients book for more than one day of Carnival. We offer special conditions for multi-day packages. Contact us via WhatsApp to build your customized Carnival package.'],
      ['E se chover durante o Carnaval?', 'What if it rains during Carnival?'],
      ['Nossas lanchas têm cobertura, então chuva leve não impede o passeio. Em caso de condições climáticas severas que impeçam a navegação segura, oferecemos remarcação para outra data do Carnaval (sujeito a disponibilidade) ou para data posterior, conforme nosso termo de contratação.', 'Our boats have awnings, so light rain does not prevent the trip. In case of severe weather conditions that prevent safe navigation, we offer rescheduling to another Carnival date (subject to availability) or a later date, according to our terms of service.'],
      // Partner boats section
      ['Grupos maiores? Temos opções de 30 a 65 pessoas!', 'Larger groups? We have options for 30 to 65 people!'],
      ['30-40 pessoas', '30-40 people'],
      ['Ideal para eventos', 'Ideal for events'],
      ['Gerador incluso', 'Generator included'],
      ['Ver Detalhes', 'View Details'],
      ['40-65 pessoas', '40-65 people'],
      ['Catamarã espaçoso', 'Spacious catamaran'],
      ['Pista de dança', 'Dance floor'],
      ['Monte Seu Bloco no Mar', 'Build Your Party at Sea'],
      // Recommended
      ['Lanchas Recomendadas para Carnaval', 'Recommended Boats for Carnival'],
      ['Lanchas Recomendadas', 'Recommended Boats'],
      ['Para o Carnaval', 'For Carnival'],
      ['Selecionamos as melhores opções para sua folia no mar', 'We selected the best options for your celebration at sea'],
      // CTA (long paragraph MUST come before short entries to avoid partial corruption)
      ['As lanchas para o Carnaval esgotam rápido! Reserve agora e monte seu bloco no mar.', 'Boats for Carnival sell out fast! Book now and build your party at sea.'],
      ['Garanta Sua Lancha no Carnaval', 'Secure Your Boat for Carnival'],
      ['Reserve com antecedência — as lanchas são disputadas no Carnaval!', 'Book in advance — boats are in high demand during Carnival!'],
      ['Falar com Especialista', 'Talk to a Specialist'],
    ],
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
    contentBlocks: [
      // Schema.org service descriptions (must come first — longest strings)
      ['"description": "Serviço completo de churrasco durante seu passeio de lancha no Rio de Janeiro. Kit Simples (R$ 100-150/pessoa) ou Kit com Acompanhamentos (R$ 145-160/pessoa)."', '"description": "Complete BBQ service during your boat trip in Rio de Janeiro. Simple Kit (R$ 100-150/person) or Kit with Sides (R$ 145-160/person)."'],
      ['"description": "Serviço de open bar com barman profissional. Básico (R$ 135-150/pessoa) ou Premium (R$ 160-180/pessoa)."', '"description": "Professional open bar service with bartender. Basic (R$ 135-150/person) or Premium (R$ 160-180/person)."'],
      ['"description": "Decoração personalizada para aniversários e despedidas. Kit Despedida (R$ 135-150/pessoa) ou Kit Festa Premium (R$ 1.850-2.500)."', '"description": "Custom decoration for birthdays and bachelorette parties. Bachelorette Kit (R$ 135-150/person) or Premium Party Kit (R$ 1,850-2,500)."'],
      ['"description": "Pacote completo com churrasco e open bar. Básico (R$ 205-230/pessoa) ou Premium (R$ 220-250/pessoa)."', '"description": "Complete package with BBQ and open bar. Basic (R$ 205-230/person) or Premium (R$ 220-250/person)."'],
      ['"description": "DJ profissional com equipamento completo para animar sua festa na lancha."', '"description": "Professional DJ with full equipment to liven up your party on the boat."'],
      ['"description": "Fotógrafo profissional para registrar todos os momentos do seu passeio."', '"description": "Professional photographer to capture every moment of your trip."'],
      // *** LONG entries MUST come BEFORE shorter substrings to avoid partial corruption ***
      ['Churrasco, open bar, decoração e mais. Transforme seu passeio em uma experiência completa e inesquecível.', 'BBQ, open bar, decoration and more. Transform your trip into a complete and unforgettable experience.'],
      ['Kit churrasco completo + open bar com cerveja, caipirinha, refrigerante e água. Preço varia conforme quantidade de pessoas.', 'Full BBQ kit + open bar with beer, caipirinha, soda and water. Price varies by number of people.'],
      ['Cerveja, caipirinha, refrigerante, água e gelo. Preço varia conforme quantidade de pessoas.', 'Beer, caipirinha, soda, water and ice. Price varies by number of people.'],
      ['Música ao vivo com DJ profissional e equipamento completo para animar sua festa.', 'Live music with a professional DJ and full equipment to liven up your party.'],
      ['Selecione serviços ao lado para ver o resumo aqui.', 'Select services to see the summary here.'],
      // Hero
      ['Serviços para seu Passeio de Lancha', 'Services for Your Boat Trip'],
      ['Churrasco, open bar, decoração e mais', 'BBQ, open bar, decoration and more'],
      ['Transforme seu passeio em uma experiência completa com nossos serviços adicionais.', 'Transform your trip into a complete experience with our additional services.'],
      ['Valores variam de acordo com a quantidade de pessoas e embarcação.', 'Prices vary according to the number of people and vessel.'],
      // Combos
      ['Combos com Desconto', 'Discounted Combos'],
      ['Combine churrasco e open bar e economize!', 'Combine BBQ and open bar and save!'],
      ['Preço varia conforme quantidade de pessoas', 'Price varies by number of people'],
      ['Contratar Combo', 'Book Combo'],
      ['Montar meu pacote com todos os serviços', 'Build my package with all services'],
      ['Montar meu pacote', 'Build My Package'],
      // BBQ Kits
      ['Escolha seu Kit', 'Choose Your Kit'],
      ['Kit Simples', 'Simple Kit'],
      ['Kit com Acompanhamentos', 'Kit with Sides'],
      ['O que inclui', 'What is included'],
      ['Churrasqueiro profissional', 'Professional grill master'],
      ['Carnes selecionadas', 'Selected meats'],
      ['Acompanhamentos', 'Side dishes'],
      ['Pratos e talheres', 'Plates and cutlery'],
      ['Carvão e churrasqueira', 'Charcoal and BBQ grill'],
      ['Taxa de churrasqueira inclusa', 'BBQ grill fee included'],
      ['Contratar Churrasco', 'Book BBQ'],
      // Open Bar
      ['Festa Completa', 'Complete Party'],
      ['Open Bar na Lancha', 'Open Bar on the Boat'],
      ['Open Bar Básico', 'Basic Open Bar'],
      ['Open Bar Premium', 'Premium Open Bar'],
      ['Barman profissional', 'Professional bartender'],
      ['Bebidas selecionadas', 'Selected drinks'],
      ['Gelo e copos', 'Ice and glasses'],
      ['Frutas para decoração', 'Fruits for garnish'],
      ['Montagem e desmontagem', 'Setup and cleanup'],
      ['Contratar Open Bar', 'Book Open Bar'],
      // Special Tables
      ['Mesas Especiais', 'Special Tables'],
      ['Complementar o passeio', 'Complement your trip'],
      ['Seleção de queijos finos, embutidos, pães artesanais, geleias e mel', 'Selection of fine cheeses, cured meats, artisan breads, jams and honey'],
      ['Finger foods, canapés, mini sanduíches e petiscos gourmet', 'Finger foods, canapés, mini sandwiches and gourmet snacks'],
      ['Queijos & Vinhos', 'Cheese & Wine'],
      ['Snacks Premium', 'Premium Snacks'],
      ['Contratar Mesa Especial', 'Book Special Table'],
      // Decoration (long strings MUST come before shorter substrings to avoid partial corruption)
      ['Oferecemos decoração personalizada para aniversários, despedidas de solteira, pedidos de casamento e muito mais.', 'We offer custom decoration for birthdays, bachelorette parties, marriage proposals and much more.'],
      ['Personalizado', 'Customizable'],
      ['Decoração para Festas', 'Party Decoration'],
      ['Transforme a lancha no cenário perfeito para sua comemoração!', 'Transform the boat into the perfect setting for your celebration!'],
      ['cumpleaños, despedidas de solteira, pedidos de casamento', 'birthdays, bachelorette parties, marriage proposals'],
      ['aniversários, despedidas de solteira, pedidos de casamento', 'birthdays, bachelorette parties, marriage proposals'],
      ['Kit Despedida', 'Bachelorette Kit'],
      ['Kit Festa Premium', 'Premium Party Kit'],
      ['Faixa de noiva, balões temáticos', 'Bridal sash, themed balloons'],
      ['Contratar Decoração', 'Book Decoration'],
      // Other Services
      ['Outros Serviços', 'Other Services'],
      ['DJ profissional com equipamento completo', 'Professional DJ with full equipment'],
      ['Música ao vivo', 'Live music'],
      ['Fotógrafo Profissional', 'Professional Photographer'],
      ['Registre cada momento com fotos profissionais a bordo', 'Capture every moment with professional photos on board'],
      // How to Book
      ['Como Contratar', 'How to Book'],
      ['Escolha os Serviços', 'Choose Services'],
      ['Selecione os serviços que deseja para seu passeio', 'Select the services you want for your trip'],
      ['Entre em Contato', 'Get in Touch'],
      ['Contate-nos pelo WhatsApp e informe os serviços escolhidos', 'Contact us via WhatsApp and tell us which services you chose'],
      ['Confirme a Reserva', 'Confirm Reservation'],
      ['Faça o pagamento do sinal e garanta seus serviços', 'Make the deposit payment and secure your services'],
      ['Aproveite!', 'Enjoy!'],
      ['No dia do passeio, tudo estará pronto para você aproveitar', 'On the day of the trip, everything will be ready for you to enjoy'],
      // Configurator
      ['Selecione os serviços desejados', 'Select desired services'],
      ['Resumo do Pacote', 'Package Summary'],
      ['Selecione serviços ao lado para ver o resumo', 'Select services to see the summary'],
      ['Total estimado', 'Estimated total'],
      ['Enviar via WhatsApp', 'Send via WhatsApp'],
      // FAQ
      ['Perguntas sobre Serviços', 'Questions about Services'],
      ['Respostas rápidas para as perguntas mais comuns sobre nossos serviços.', 'Quick answers to the most common questions about our services.'],
      ['Posso contratar serviços no dia do passeio?', 'Can I book services on the day of the trip?'],
      ['Os preços variam conforme a quantidade de pessoas?', 'Do prices vary by the number of people?'],
      ['Posso levar minhas próprias bebidas e comidas?', 'Can I bring my own drinks and food?'],
      ['Como funciona a taxa de churrasqueira?', 'How does the BBQ grill fee work?'],
      // Schema.org descriptions (long strings first)
      ['DJ profissional com equipamento completo para animar sua festa na lancha.', 'Professional DJ with full equipment to liven up your party on the boat.'],
      ['Fotógrafo profissional para registrar todos os momentos do seu passeio.', 'Professional photographer to capture every moment of your trip.'],
      ['Serviço de open bar com barman profissional. Básico (R$ 135-150/pessoa) ou Premium (R$ 160-180/pessoa).', 'Professional open bar service with bartender. Basic (R$ 135-150/person) or Premium (R$ 160-180/person).'],
      ['Pacote completo com churrasco e open bar. Básico (R$ 205-230/pessoa) ou Premium (R$ 220-250/pessoa).', 'Complete package with BBQ and open bar. Basic (R$ 205-230/person) or Premium (R$ 220-250/person).'],
      ['Aluguel de lanchas no Rio de Janeiro. Passeios privativos com conforto e segurança.', 'Boat rentals in Rio de Janeiro. Private trips with comfort and safety.'],
      // FAQ Schema answers (long strings first)
      ['Recomendamos contratar os serviços com pelo menos 48h de antecedência para garantir disponibilidade e preparação adequada. Em casos urgentes, entre em contato pelo WhatsApp para verificar possibilidades.', 'We recommend booking services at least 48 hours in advance to ensure availability and proper preparation. In urgent cases, contact us via WhatsApp to check options.'],
      ['Sim! Quanto maior o grupo, melhor o preço por pessoa. As faixas de preço mostradas consideram grupos de diferentes tamanhos. Fale conosco para um orçamento personalizado.', 'Yes! The larger the group, the better the price per person. The price ranges shown consider groups of different sizes. Talk to us for a customized quote.'],
      ['Posso levar minhas próprias bebidas ou comidas?', 'Can I bring my own drinks or food?'],
      ['Sim, você pode levar suas próprias bebidas e petiscos! Apenas não oferecemos o serviço de churrasco se você levar comida própria. Contamos com coolers à disposição.', 'Yes, you can bring your own drinks and snacks! We just don\'t offer the BBQ service if you bring your own food. We have coolers available.'],
      ['A taxa de churrasqueira (R$ 250) é cobrada apenas quando você contrata nosso serviço de churrasco completo. Ela cobre o equipamento, carvão e utensílios necessários.', 'The BBQ grill fee (R$ 250) is only charged when you book our full BBQ service. It covers the equipment, charcoal and necessary utensils.'],
      // Hero & intro (long strings first)
      ['Serviços para seu Passeio', 'Services for Your Boat Trip'],
      ['*Valores variam de acordo com a quantidade de pessoas e tamanho da lancha. Entre em contato para um orçamento personalizado.', '*Prices vary according to the number of people and boat size. Contact us for a customized quote.'],
      // Combos section (long strings first)
      ['Pacotes completos para você não se preocupar com nada.', 'Complete packages so you don\'t have to worry about a thing.'],
      ['Kit churrasco completo + open bar premium com drinks especiais, espumante e frutas frescas.', 'Full BBQ kit + premium open bar with special drinks, sparkling wine and fresh fruits.'],
      // BBQ section (long strings first)
      ['Nada combina mais com um dia no mar do que um churrasco! Nosso serviço inclui churrasqueiro profissional, carnes selecionadas, acompanhamentos e todo o equipamento necessário. Você só precisa relaxar e aproveitar.', 'Nothing goes better with a day at sea than a BBQ! Our service includes a professional grill master, selected meats, side dishes and all the necessary equipment. You just need to relax and enjoy.'],
      ['Picanha, linguiça, frango e pão de alho. Preço varia conforme quantidade de pessoas.', 'Picanha, sausage, chicken and garlic bread. Price varies by number of people.'],
      ['Picanha premium, costela, coração, queijo coalho, saladas completas e sobremesa.', 'Premium picanha, ribs, chicken hearts, grilled cheese, full salads and dessert.'],
      ['Mais Pedido', 'Most Popular'],
      ['Churrasco na Lancha', 'BBQ on Board'],
      // Open bar section (long strings first)
      ['Drinks autorais, caipirinhas, cervejas geladas e muito mais! Nosso barman profissional prepara tudo a bordo para que você e seus convidados só se preocupem em brindar.', 'Signature drinks, caipirinhas, cold beers and much more! Our professional bartender prepares everything on board so you and your guests only have to worry about toasting.'],
      ['Cerveja, caipirinha, refrigerante, água e gelo. Preço varia conforme quantidade de pessoas.', 'Beer, caipirinha, soda, water and ice. Price varies by number of people.'],
      ['Todas as bebidas + drinks especiais + espumante + frutas frescas.', 'All drinks + special cocktails + sparkling wine + fresh fruits.'],
      ['Todas as bebidas', 'All drinks'],
      ['Gelo à vontade', 'Unlimited ice'],
      ['Copos e taças', 'Cups and glasses'],
      ['Frutas frescas', 'Fresh fruits'],
      ['Montagem de bar', 'Bar setup'],
      ['Escolha seu Pacote', 'Choose Your Package'],
      // Special tables section (long strings first)
      ['Opções sofisticadas para quem prefere algo mais leve ou quer complementar o passeio.', 'Sophisticated options for those who prefer something lighter or want to complement the trip.'],
      ['Seleção de queijos finos, embutidos, frutas secas e vinhos selecionados.', 'Selection of fine cheeses, cured meats, dried fruits and selected wines.'],
      // Decoration section (moved long string to line ~1866 to run before shorter substrings)
      ['Faixa de noiva, balões temáticos, adereços e props para fotos. Preço varia conforme quantidade de pessoas.', 'Bridal sash, themed balloons, props and photo accessories. Price varies by number of people.'],
      ['Decoração completa para aniversário ou evento especial: balões, faixa personalizada, mesa decorada, iluminação e velas.', 'Full decoration for birthday or special event: balloons, custom banner, decorated table, lighting and candles.'],
      ['Balões e arranjos', 'Balloons and arrangements'],
      ['Faixas personalizadas', 'Custom banners'],
      ['Adereços temáticos', 'Themed props'],
      ['Montagem antes do passeio', 'Setup before the trip'],
      ['Desmontagem inclusa', 'Teardown included'],
      // Other services (long strings first)
      ['Confira mais opções para deixar seu passeio ainda mais especial.', 'Check out more options to make your trip even more special.'],
      // How to Book steps
      ['Entre em contato pelo WhatsApp e informe a data e quantidade de pessoas.', 'Contact us via WhatsApp and let us know the date and number of people.'],
      ['Faça o pagamento do sinal e confirme sua reserva.', 'Make the deposit payment and confirm your reservation.'],
      ['No dia do passeio, tudo estará pronto para você curtir.', 'On the day of the trip, everything will be ready for you to enjoy.'],
      ['Fale Conosco', 'Contact Us'],
      // Configurator (long strings first)
      ['e veja o orçamento estimado em tempo real.', 'and see the estimated budget in real time.'],
      ['Diminuir número de pessoas', 'Decrease number of people'],
      ['Aumentar número de pessoas', 'Increase number of people'],
      ['Número de pessoas', 'Number of people'],
      ['Enviar pelo WhatsApp', 'Send via WhatsApp'],
      ['Escolher Lancha e Montar Proposta', 'Choose Boat and Build Proposal'],
      // FAQ section (long strings first)
      ['Dúvidas sobre Serviços', 'Questions about Services'],
      ['Respostas rápidas para as perguntas mais comuns', 'Quick answers to the most common questions'],
      ['Posso contratar serviços no dia do passeio?', 'Can I book services on the day of the trip?'],
      ['Os preços variam conforme a quantidade de pessoas?', 'Do prices vary by the number of people?'],
      // Alt text
      ['Buffet completo com churrasco e bar a bordo da lancha WeBoat', 'Full buffet with BBQ and bar on board the WeBoat boat'],
      ['Churrasco sendo preparado na lancha com vista para o mar', 'BBQ being prepared on the boat with a sea view'],
      ['Amigas brindando com drinks no open bar da lancha', 'Friends toasting with drinks at the open bar on the boat'],
      ['Mesa de queijos e vinhos na lancha', 'Cheese and wine table on the boat'],
      ['Mesa de snacks premium na lancha com mini sanduíches, canapés e finger foods', 'Premium snacks table on the boat with mini sandwiches, canapés and finger foods'],
      ['Decoração de aniversário na lancha com balões verdes e letreiro Happy Birthday neon', 'Birthday decoration on the boat with green balloons and neon Happy Birthday sign'],
      ['DJ profissional tocando na lancha com headphones e controladora', 'Professional DJ playing on the boat with headphones and controller'],
      ['Casal em silhueta ao pôr do sol com Cristo Redentor ao fundo na lancha', 'Couple silhouette at sunset with Christ the Redeemer in the background on the boat'],
      // Price notes
      ['/pessoa', '/person'],
      // Freshness
      ['Atualizado em fevereiro de 2026', 'Updated in February 2026'],
    ],
  },
  {
    ptPath: 'sobre/index.html',
    enPath: 'en/about/index.html',
    title: 'About WeBoat Brasil | Boat Rental in Rio de Janeiro',
    description: 'Learn about WeBoat Brasil, the leading boat rental company in Rio de Janeiro. 1,000+ trips, 5 own boats, based at Marina da Gloria.',
    keywords: 'about weboat, boat rental company rio, marina da gloria boats',
    waMessage: 'Hello! I would like to know more about WeBoat Brasil. [via site - en]',
    css: 'sobre',
    contentBlocks: [
      // Schema.org main description (must come first — longest strings)
      ['"description": "A WeBoat Brasil é uma empresa de aluguel de lanchas no Rio de Janeiro, com sede na Marina da Glória. Oferece passeios privativos para festas, despedidas de solteira, aniversários e eventos corporativos. Fundada em 2021, realizou mais de 1.000 passeios."', '"description": "WeBoat Brasil is a boat rental company in Rio de Janeiro, based at Marina da Gloria. We offer private trips for parties, bachelorette parties, birthdays and corporate events. Founded in 2021, we have completed over 1,000 trips."'],
      // Schema.org service descriptions (shared across about, faq, contact, how-it-works)
      ['"description": "Lanchas de 10 a 65 pessoas, próprias e parceiras, com combustível, marinheiro e seguro inclusos"', '"description": "Boats for 10 to 65 people, own and partner, with fuel, captain and insurance included"'],
      ['"description": "Churrasco, open bar, decoração, DJ e fotógrafo para passeios de lancha"', '"description": "BBQ, open bar, decoration, DJ and photographer for boat trips"'],
      // Schema.org FAQ answers (plain text — must come first before shorter substrings)
      ['"text": "A WeBoat possui 5 lanchas próprias (WeBoat 32, WeBoat 390, WeBoat Oceanic 36, WeBoat Rio Star 50 e WeBoat Ibiza 42), com capacidade de 12 a 22 pessoas. Também trabalhamos com lanchas parceiras para grupos de 10 a 65 pessoas."', '"text": "WeBoat has 5 own boats (WeBoat 32, WeBoat 390, WeBoat Oceanic 36, WeBoat Rio Star 50 and WeBoat Ibiza 42), with capacity from 12 to 22 people. We also work with partner boats for groups of 10 to 65 people."'],
      ['"text": "Estamos na Marina da Glória - Loja 06, no Rio de Janeiro. A localização é privilegiada: ao lado do Aeroporto Santos Dumont, com fácil acesso e estacionamento disponível no local."', '"text": "We are located at Marina da Gloria - Store 06, in Rio de Janeiro. The location is privileged: next to Santos Dumont Airport, with easy access and parking available on site."'],
      ['"text": "Sim! Todos os nossos marinheiros são habilitados pela Marinha do Brasil e passam por treinamentos regulares. A segurança dos passageiros é nossa prioridade."', '"text": "Yes! All our captains are licensed by the Brazilian Navy and undergo regular training. Passenger safety is our priority."'],
      // Schema.org slogan
      ['"slogan": "Dia inesquecível e sorriso no rosto de todos os nossos clientes"', '"slogan": "An unforgettable day and a smile on every client\'s face"'],
      // Schema.org knowsAbout (individual keywords — partially translated by dictionary)
      ['"aluguel de lanchas"', '"boat rental"'],
      ['"passeios de barco"', '"boat trips"'],
      ['"eventos náuticos"', '"nautical events"'],
      ['"turismo náutico Rio de Janeiro"', '"nautical tourism Rio de Janeiro"'],
      ['"festa na lancha"', '"party on a boat"'],
      ['"despedida de solteira no mar"', '"bachelorette party at sea"'],
      ['"aniversário em lancha"', '"birthday on a boat"'],
      ['"evento corporativo náutico"', '"corporate nautical event"'],
      ['"roteiros na Baía de Guanabara"', '"routes in Guanabara Bay"'],
      // Alt text — hero image (must come before shorter substrings)
      ['Vista aérea da Marina da Glória com Pão de Açúcar ao fundo - sede da WeBoat Brasil', 'Aerial view of Marina da Gloria with Sugarloaf Mountain in the background - WeBoat Brasil headquarters'],
      // Alt text — structure section
      ['Vista aérea da Marina da Glória com embarcações atracadas e Baía de Guanabara ao fundo', 'Aerial view of Marina da Gloria with boats docked and Guanabara Bay in the background'],
      // Visible HTML — Safety card (must come before shorter substrings)
      ['Todas as embarcações possuem equipamentos de segurança e seguros obrigatórios. Marinheiros habilitados pela Marinha do Brasil.', 'All vessels have safety equipment and mandatory insurance. Captains licensed by the Brazilian Navy.'],
      // Hero
      ['Sobre a WeBoat Brasil', 'About WeBoat Brasil'],
      ['Empresa de aluguel de lanchas no Rio de Janeiro desde 2021.', 'Boat rental company in Rio de Janeiro since 2021.'],
      // Entity Declaration
      ['<strong>A WeBoat Brasil é uma empresa de aluguel de lanchas no Rio de Janeiro, com sede na Marina da Glória.</strong>', '<strong>WeBoat Brasil is a boat rental company in Rio de Janeiro, based at Marina da Gloria.</strong>'],
      ['Oferece passeios privativos para festas, despedidas de solteira, aniversários e eventos corporativos.', 'We offer private trips for parties, bachelorette parties, birthdays and corporate events.'],
      ['Opera <a href="/en/boats/">5 lanchas próprias</a> e trabalha com parceiros para atender grupos de 10 a 65 pessoas.', 'We operate <a href="/en/boats/">5 own boats</a> and work with partners to serve groups of 10 to 65 people.'],
      ['Fundada em 2021, realizou mais de 1.000 passeios com <a href="/en/routes/">6 roteiros diferentes</a> e acumula mais de 1000 avaliações 5 estrelas no Google.', 'Founded in 2021, we have completed over 1,000 trips across <a href="/en/routes/">6 different routes</a> with over 1,000 five-star Google reviews.'],
      ['<strong>Localização:</strong> Marina da Glória, Loja 06 - Rio de Janeiro, RJ', '<strong>Location:</strong> Marina da Gloria, Store 06 - Rio de Janeiro, RJ'],
      ['<strong>Capacidade:</strong> Lanchas de 10 a 65 pessoas', '<strong>Capacity:</strong> Boats for 10 to 65 people'],
      ['<strong>Preços:</strong> A partir de R$ 2.300 (5 horas)', '<strong>Prices:</strong> From R$ 2,300 (5 hours)'],
      ['<strong>Contato:</strong> WhatsApp (21) 97772-4114', '<strong>Contact:</strong> WhatsApp (21) 97772-4114'],
      // History
      ['Como a WeBoat Brasil começou?', 'How Did WeBoat Brasil Start?'],
      ['A WeBoat nasceu depois do carnaval de 2021, quando três amigos fizeram um passeio de lancha no Rio e viram uma oportunidade de melhorar a experiência. A paisagem era incrível - Cristo, Pão de Açúcar, Baía de Guanabara - mas o atendimento deixou a desejar: preços confusos e instruções desencontradas.', 'WeBoat was born after Carnival 2021, when three friends took a boat trip in Rio and saw an opportunity to improve the experience. The scenery was incredible — Christ the Redeemer, Sugarloaf Mountain, Guanabara Bay — but the service fell short: confusing prices and mixed instructions.'],
      ['Começamos com uma lancha pequena e muitos desafios. Hoje, menos de 4 anos depois, somos referência no Rio com 5 lanchas próprias, loja na Marina da Glória e mais de 1000 avaliações 5 estrelas.', 'We started with one small boat and many challenges. Today, less than 4 years later, we are a reference in Rio with 5 own boats, a store at Marina da Gloria, and over 1,000 five-star reviews.'],
      ['"Dia inesquecível e sorriso no rosto de todos os nossos clientes" - essa é a nossa missão e buscamos entregar isso para todos que escolhem nossos serviços. Toda nossa equipe compartilha desse mesmo objetivo.', '"An unforgettable day and a smile on every client\'s face" — that is our mission, and we strive to deliver it for everyone who chooses our services. Our entire team shares this goal.'],
      // Mission, Vision, Values
      ['Propósito', 'Purpose'],
      ['Levar um dia inesquecível a bordo, com as melhores vistas que somente o Rio pode oferecer. A combinação de lancha e paisagem carioca é impagável.', 'To deliver an unforgettable day on board, with the best views only Rio can offer. The combination of a boat and Rio\'s landscape is priceless.'],
      ['Visão', 'Vision'],
      ['Ser a maior empresa de aluguel de lanchas do Brasil, mesmo atuando somente no Rio de Janeiro. Quando alguém pensar em lancha no Rio, pensar WeBoat.', 'To be the largest boat rental company in Brazil, even operating only in Rio de Janeiro. When someone thinks of a boat in Rio, they think WeBoat.'],
      ['Valores', 'Values'],
      ['Segurança sempre em primeiro lugar. Experiência em cada detalhe. Inclusão - WeBoat é para todos, respeitamos todas as pessoas e opiniões.', 'Safety always comes first. Experience in every detail. Inclusion — WeBoat is for everyone, we respect all people and opinions.'],
      // Numbers
      ['Passeios Realizados', 'Trips Completed'],
      ['Lanchas Próprias', 'Own Boats'],
      ['Avaliações 5 Estrelas', '5-Star Reviews'],
      ['Seguidores no Instagram', 'Instagram Followers'],
      // Team
      ['Nossa Equipe', 'Our Team'],
      ['Profissionais apaixonados pelo mar e dedicados a proporcionar a melhor experiência para você e seus convidados.', 'Professionals passionate about the sea and dedicated to providing the best experience for you and your guests.'],
      ['Equipe de Atendimento', 'Customer Service Team'],
      ['Consultores de Passeio', 'Trip Consultants'],
      ['Marinheiros', 'Captains'],
      ['Habilitados pela Marinha', 'Licensed by the Brazilian Navy'],
      ['Manutenção', 'Maintenance'],
      ['Técnicos Especializados', 'Specialized Technicians'],
      ['Operações', 'Operations'],
      ['Coordenação de Passeios', 'Trip Coordination'],
      // Structure
      ['Nossa Estrutura', 'Our Facilities'],
      ['Operamos a partir da Marina da Glória, uma das mais tradicionais e bem localizadas marinas do Rio de Janeiro. Com vista para o Pão de Açúcar e fácil acesso, oferecemos toda a estrutura necessária para seu passeio.', 'We operate from Marina da Gloria, one of the most traditional and well-located marinas in Rio de Janeiro. With a view of Sugarloaf Mountain and easy access, we provide all the infrastructure needed for your trip.'],
      ['Saiba <a href="/en/how-it-works/">como funciona o processo de reserva</a>.', 'Learn <a href="/en/how-it-works/">how the booking process works</a>.'],
      ['Localização Privilegiada', 'Prime Location'],
      ['Marina da Glória, ao lado do Aeroporto Santos Dumont e dos principais cartões postais do Rio.', 'Marina da Gloria, next to Santos Dumont Airport and Rio\'s main landmarks.'],
      ['Fácil Acesso', 'Easy Access'],
      ['Localização central com fácil acesso por carro, táxi ou transporte por aplicativo.', 'Central location with easy access by car, taxi, or ride-share.'],
      ['Loja WeBoat', 'WeBoat Store'],
      ['Loja 06 da Marina para atendimento e retirada de materiais.', 'Store 06 at the Marina for service and material pickup.'],
      ['Estrutura Completa', 'Full Amenities'],
      ['Mini mercado, farmácia e restaurantes na Marina.', 'Mini market, pharmacy and restaurants at the Marina.'],
      // Commitment
      ['Nosso Compromisso', 'Our Commitment'],
      ['Trabalhamos diariamente para garantir sua segurança e satisfação.', 'We work daily to ensure your safety and satisfaction.'],
      ['Segurança', 'Safety'],
      ['Todas as embarcações possuem equipamentos de segurança e seguros obrigatórios. Marinheiros habilitados pela Marinha do Brasil.', 'All vessels have safety equipment and mandatory insurance. Captains licensed by the Brazilian Navy.'],
      ['Qualidade', 'Quality'],
      ['Lanchas modernas, bem mantidas e limpas. Realizamos manutenção preventiva regular em todas as embarcações.', 'Modern, well-maintained, and clean boats. We perform regular preventive maintenance on all vessels.'],
      ['Transparência', 'Transparency'],
      ['Preços claros, sem surpresas. Tudo que está incluso é informado antes da reserva. Política de cancelamento justa.', 'Clear prices, no surprises. Everything included is disclosed before booking. Fair cancellation policy.'],
      // Answer Capsules
      ['O que é a WeBoat Brasil?', 'What is WeBoat Brasil?'],
      ['A WeBoat Brasil é uma empresa de aluguel de lanchas no Rio de Janeiro, com sede na Marina da Glória. Fundada em 2021, opera 5 lanchas próprias e trabalha com parceiros para atender grupos de 10 a 65 pessoas. Já realizou mais de 1.000 passeios e acumula mais de 1000 avaliações 5 estrelas no Google.', 'WeBoat Brasil is a boat rental company in Rio de Janeiro, based at Marina da Gloria. Founded in 2021, it operates 5 own boats and works with partners to serve groups of 10 to 65 people. It has completed over 1,000 trips and has over 1,000 five-star Google reviews.'],
      ['Quais serviços a WeBoat oferece?', 'What services does WeBoat offer?'],
      ['A WeBoat oferece passeios de lancha privativos com 6 roteiros diferentes pela Baía de Guanabara, Copacabana, Ilhas Cagarras e Niterói. Todos os passeios incluem combustível, marinheiro habilitado, som Bluetooth, coletes e seguro. Serviços extras incluem churrasco, open bar, decoração, DJ e fotógrafo profissional.', 'WeBoat offers private boat trips with 6 different routes through Guanabara Bay, Copacabana, Cagarras Islands and Niteroi. All trips include fuel, licensed captain, Bluetooth speakers, life jackets and insurance. Extra services include BBQ, open bar, decoration, DJ and professional photographer.'],
      ['Quanto custa alugar uma lancha na WeBoat?', 'How much does it cost to rent a boat at WeBoat?'],
      ['O aluguel de lancha na WeBoat começa a partir de R$ 2.300 para o roteiro Mureta da Urca (seg-qui, WeBoat 32 para até 15 pessoas). Preços variam conforme a embarcação, roteiro e dia da semana. Lanchas maiores e catamarãs para até 65 pessoas custam a partir de R$ 14.000.', 'Boat rental at WeBoat starts at R$ 2,300 for the Mureta da Urca route (Mon-Thu, WeBoat 32 for up to 15 people). Prices vary by vessel, route and day of the week. Larger boats and catamarans for up to 65 people start at R$ 14,000.'],
      // Reviews
      ['Nossa Reputação', 'Our Reputation'],
      ['A Confiança de Mais de 1.000 Clientes', 'Trusted by Over 1,000 Clients'],
      ['Construímos nossa história com base na satisfação de cada passageiro.', 'We built our story based on each passenger\'s satisfaction.'],
      // FAQ
      ['Perguntas sobre a WeBoat', 'Questions about WeBoat'],
      ['Quantas lanchas a WeBoat tem?', 'How many boats does WeBoat have?'],
      ['A WeBoat possui <strong>5 lanchas próprias</strong> (WeBoat 32, WeBoat 390, WeBoat Oceanic 36, WeBoat Rio Star 50 e WeBoat Ibiza 42), com capacidade de 12 a 22 pessoas. Também trabalhamos com <strong>lanchas parceiras</strong> para grupos de 10 a 65 pessoas.', 'WeBoat has <strong>5 own boats</strong> (WeBoat 32, WeBoat 390, WeBoat Oceanic 36, WeBoat Rio Star 50, and WeBoat Ibiza 42), with capacity from 12 to 22 people. We also work with <strong>partner boats</strong> for groups of 10 to 65 people.'],
      ['Onde fica a WeBoat Brasil?', 'Where is WeBoat Brasil located?'],
      ['Estamos na <strong>Marina da Glória - Loja 06</strong>, no Rio de Janeiro. A localização é privilegiada: ao lado do Aeroporto Santos Dumont, com fácil acesso e estacionamento disponível no local.', 'We are at <strong>Marina da Gloria - Store 06</strong> in Rio de Janeiro. The location is prime: next to Santos Dumont Airport, with easy access and parking available on site.'],
      ['Os marinheiros são habilitados?', 'Are the captains licensed?'],
      ['<strong>Sim!</strong> Todos os nossos marinheiros são habilitados pela Marinha do Brasil e passam por treinamentos regulares. A segurança dos passageiros é nossa prioridade.', '<strong>Yes!</strong> All our captains are licensed by the Brazilian Navy and undergo regular training. Passenger safety is our top priority.'],
      ['Qual o horário de atendimento?', 'What are your service hours?'],
      ['<strong>Atendimento comercial:</strong> 8h às 20h (reservas e informações). <strong>Suporte para clientes em passeio:</strong> 24 horas. Estamos sempre disponíveis para ajudar!', '<strong>Business hours:</strong> 8am to 8pm (reservations and information). <strong>Support for customers on trips:</strong> 24 hours. We are always available to help!'],
      // Schema.org FAQ answer (plain text — no <strong> tags)
      ['"text": "Atendimento comercial: 8h às 20h (reservas e informações). Suporte para clientes em passeio: 24 horas."', '"text": "Business hours: 8am to 8pm (reservations and information). Support for customers on trips: 24 hours."'],
      // Alt text
      ['alt="Marinheiro da WeBoat com camisa da empresa"', 'alt="WeBoat captain wearing company shirt"'],
      ['Técnico WeBoat realizando manutenção nos motores MAN na sala de máquinas', 'WeBoat technician performing maintenance on MAN engines in the engine room'],
      // CTA
      ['Venha Conhecer a WeBoat Brasil', 'Come Meet WeBoat Brasil'],
      ['Agende seu passeio e descubra por que somos a escolha de mais de 1.000 clientes satisfeitos.', 'Schedule your trip and discover why we are the choice of over 1,000 satisfied clients.'],
      ['Falar com a Equipe', 'Talk to Our Team'],
      ['Última atualização: Fevereiro 2026', 'Last updated: February 2026'],
    ],
  },
  {
    ptPath: 'faq/index.html',
    enPath: 'en/faq/index.html',
    title: 'FAQ - Frequently Asked Questions | WeBoat Brasil',
    description: 'Frequently asked questions about boat rental in Rio de Janeiro. Prices, cancellation policy, what is included, and more.',
    keywords: 'boat rental faq, questions boat trip rio, weboat help',
    waMessage: 'Hello! I have a question about boat rental. [via site - en]',
    css: 'faq',
    contentBlocks: [
      // Schema.org service descriptions (shared with about/contact/how-it-works)
      ['"description": "Lanchas de 10 a 65 pessoas, próprias e parceiras, com combustível, marinheiro e seguro inclusos"', '"description": "Boats for 10 to 65 people, own and partner, with fuel, captain and insurance included"'],
      ['"description": "Churrasco, open bar, decoração, DJ e fotógrafo para passeios de lancha"', '"description": "BBQ, open bar, decoration, DJ and photographer for boat trips"'],
      // Schema.org FAQ answers (plain text — must come first before shorter substrings)
      ['"text": "O aluguel de lancha no Rio de Janeiro na WeBoat começa em R$ 2.300 para passeios de segunda a quinta, e R$ 2.700 de sexta a domingo. O preço varia conforme a capacidade da lancha, roteiro escolhido e duração do passeio. Todas as lanchas incluem combustível, marinheiro, som Bluetooth e coolers."', '"text": "Boat rental in Rio de Janeiro at WeBoat starts at R$ 2,300 for trips Monday to Thursday, and R$ 2,700 Friday to Sunday. The price varies according to the capacity of the boat, chosen route and trip duration. All boats include fuel, captain, Bluetooth speakers and coolers."'],
      ['"text": "Todo aluguel de lancha na WeBoat inclui: combustível para o roteiro escolhido, marinheiro habilitado pela Marinha, tapete flutuante, macarrões flutuantes, som Bluetooth, coolers e seguro obrigatório. Serviços como churrasco, open bar e decoração são opcionais."', '"text": "Every WeBoat boat rental includes: fuel for the chosen route, captain licensed by the Brazilian Navy, floating mat, pool noodles, Bluetooth speakers, coolers and mandatory insurance. Services such as BBQ, open bar and decoration are optional."'],
      ['"text": "A WeBoat tem 5 lanchas próprias: WeBoat 32 (15 pessoas), WeBoat 390 (16 pessoas), WeBoat Oceanic 36 (14 pessoas), WeBoat Rio Star 50 (22 pessoas) e WeBoat Ibiza 42 (12 pessoas). Para grupos maiores, temos lanchas parceiras de 10 a 65 pessoas."', '"text": "WeBoat has 5 own boats: WeBoat 32 (15 people), WeBoat 390 (16 people), WeBoat Oceanic 36 (14 people), WeBoat Rio Star 50 (22 people) and WeBoat Ibiza 42 (12 people). For larger groups, we have partner boats from 10 to 65 people."'],
      ['"text": "A reserva é confirmada com 50% de sinal via PIX ou transferência. O restante deve ser pago até o momento do embarque. Para cartões de crédito/débito, as taxas são repassadas, com parcelamento em até 12x com juros da operadora."', '"text": "The reservation is confirmed with a 50% deposit via PIX or bank transfer. The remainder must be paid by the time of boarding. For credit/debit cards, card processing fees apply, with installments up to 12x with card operator interest."'],
      ['"text": "A remarcação só é possível em caso de chuva forte que inviabilize o passeio. Tempo nublado ou chuva leve não geram remarcação. Em caso de más condições de navegabilidade, o roteiro pode ser alterado para a Baía de Guanabara."', '"text": "Rescheduling is only possible in case of heavy rain that makes the trip impossible. Cloudy weather or light rain does not qualify for rescheduling. In case of poor sailing conditions, the route may be changed to Guanabara Bay."'],
      ['"text": "A diferença entre os roteiros está no tempo de navegação versus tempo de lancha parada. A duração total do passeio é sempre a mesma (5 horas). Roteiros mais curtos (R1-R2) têm menos tempo navegando e mais tempo de lancha parada para banho. Roteiros mais longos (R4-R5) têm mais tempo navegando e conhecendo mais lugares. Turnos disponíveis: Manhã 09:00-14:00 e Tarde 14:30-19:30."', '"text": "The difference between routes is in sailing time versus time anchored. The total trip duration is always the same (5 hours). Shorter routes (R1-R2) have less sailing time and more time anchored for swimming. Longer routes (R4-R5) have more sailing time, visiting more places. Available shifts: Morning 09:00-14:00 and Afternoon 14:30-19:30."'],
      ['"text": "Sim! Permitimos garrafas PET e latas. Recipientes de vidro são aceitos apenas para vinhos, champanhes, whiskies e destilados. Para usar a churrasqueira, há taxa adicional. Também oferecemos serviços de churrasco (a partir de R$ 100/pessoa) e open bar (a partir de R$ 135/pessoa)."', '"text": "Yes! We allow PET bottles and cans. Glass containers are only accepted for wines, champagnes, whiskies and spirits. There is an additional fee to use the BBQ grill. We also offer BBQ services (from R$ 100/person) and open bar (from R$ 135/person)."'],
      ['"text": "O sinal de 50% garante a reserva e não dá direito a arrependimento por motivos pessoais. Se precisar cancelar, entre em contato o quanto antes. Caso consigamos outro cliente para sua data, liberamos o valor para estorno ou remarcação."', '"text": "The 50% deposit secures the reservation and is non-refundable for personal reasons. If you need to cancel, please contact us as soon as possible. If we find another client for your date, we release the amount for refund or rescheduling."'],
      ['"text": "Sim! Não há restrição de idade. Pedimos que os responsáveis sigam as orientações do briefing inicial e do comandante. Sugerimos coletes recreativos infantis para entrar no mar. Todas as crianças contam no limite de passageiros."', '"text": "Yes! There is no age restriction. We ask that guardians follow the guidelines of the initial briefing and the captain. We suggest recreational life vests for children entering the water. All children count toward the passenger limit."'],
      ['"text": "Não há tempo mínimo ou máximo para reserva. Porém, em períodos de alta procura (verão, feriados, réveillon), recomendamos reservar com pelo menos 30 dias de antecedência para garantir as melhores opções."', '"text": "There is no minimum or maximum booking time. However, during high-demand periods (summer, holidays, New Year\'s Eve), we recommend booking at least 30 days in advance to secure the best options."'],
      ['"text": "É proibido: bronzeadores (use protetor solar), vinho tinto, narguilé, fogos de artifício e confetes. Recipientes de vidro só são permitidos para vinhos, champanhes, whiskies e destilados."', '"text": "It is forbidden: tanning oils (use sunscreen), red wine, hookah, fireworks and confetti. Glass containers are only allowed for wines, champagnes, whiskies and spirits."'],
      ['"text": "Permitimos cachorros de pequeno porte. Para cães de médio e grande porte, é necessário consultar previamente nossa equipe pelo WhatsApp."', '"text": "We allow small dogs. For medium and large dogs, you must consult our team in advance via WhatsApp."'],
      ['"text": "Sim! O Réveillon na lancha tem 5 horas de duração, com horário sugerido de 21h às 2h (flexível). Horas adicionais são cobradas à parte. As vagas são limitadas e costumam esgotar com meses de antecedência."', '"text": "Yes! The New Year\'s Eve boat trip is 5 hours long, with suggested hours of 9pm to 2am (flexible). Extra hours are charged separately. Spots are limited and tend to sell out months in advance."'],
      // Hero
      ['Encontre respostas para as dúvidas mais comuns sobre aluguel de lancha no Rio de Janeiro.', 'Find answers to the most common questions about boat rental in Rio de Janeiro.'],
      // Popular questions
      ['Quanto custa alugar uma lancha?', 'How much does it cost to rent a boat?'],
      ['O que está incluso no aluguel?', 'What is included in the rental?'],
      ['Como funciona a reserva?', 'How does the booking work?'],
      // Categories nav
      ['Categorias', 'Categories'],
      ['Preços e Reservas', 'Prices & Reservations'],
      ['Durante o Passeio', 'During the Trip'],
      ['Sobre as Lanchas', 'About the Boats'],
      ['Logística', 'Logistics'],
      ['Crianças, Pets e Acessibilidade', 'Children, Pets & Accessibility'],
      ['Políticas e Regras', 'Policies & Rules'],
      // Prices & Reservations
      ['Quanto custa alugar uma lancha no Rio de Janeiro?', 'How much does it cost to rent a boat in Rio de Janeiro?'],
      ['O aluguel de lancha no Rio de Janeiro na WeBoat começa em <strong>R$ 2.300</strong> para passeios de segunda a quinta, e <strong>R$ 2.700</strong> de sexta a domingo.', 'Boat rental in Rio de Janeiro at WeBoat starts at <strong>R$ 2,300</strong> for trips Monday to Thursday, and <strong>R$ 2,700</strong> Friday to Sunday.'],
      ['O preço varia conforme:', 'The price varies according to:'],
      ['Capacidade da lancha (de 10 a 65 pessoas)', 'Boat capacity (10 to 65 people)'],
      ['Dia da semana (dias úteis são mais econômicos)', 'Day of the week (weekdays are more affordable)'],
      ['Roteiro e duração do passeio', 'Route and trip duration'],
      ['Todas as lanchas incluem combustível, marinheiro, som Bluetooth e coolers. Veja a <a href="/en/boats/">lista completa de lanchas disponíveis</a>.', 'All boats include fuel, captain, Bluetooth speakers and coolers. See the <a href="/en/boats/">full list of available boats</a>.'],
      ['O que está incluso no aluguel de lancha?', 'What is included in the boat rental?'],
      ['Todo aluguel de lancha na WeBoat inclui:', 'Every WeBoat boat rental includes:'],
      ['Combustível para o roteiro escolhido', 'Fuel for the chosen route'],
      ['Marinheiro habilitado pela Marinha', 'Captain licensed by the Brazilian Navy'],
      ['Tapete flutuante', 'Floating mat'],
      ['Macarrões flutuantes', 'Pool noodles'],
      ['Som Bluetooth', 'Bluetooth speakers'],
      ['Seguro obrigatório', 'Mandatory insurance'],
      ['Serviços como churrasco, open bar e decoração são opcionais. Confira todos os <a href="/en/services/">serviços extras disponíveis</a>.', 'Services such as BBQ, open bar and decoration are optional. Check out all <a href="/en/services/">available extra services</a>.'],
      // Reservation
      ['A reserva é simples e rápida:', 'The booking is simple and quick:'],
      ['Entre em contato pelo WhatsApp <a href="https://wa.me/5521977724114">(21) 97772-4114</a>', 'Contact us via WhatsApp at <a href="https://wa.me/5521977724114">(21) 97772-4114</a>'],
      ['Escolha a lancha e data desejada', 'Choose the boat and desired date'],
      ['Pague um sinal de <strong>50%</strong> para confirmar', 'Pay a <strong>50%</strong> deposit to confirm'],
      ['O restante deve ser pago até o momento do embarque', 'The remainder must be paid by the time of boarding'],
      ['A reserva é feita em nome de um único contratante. Veja o <a href="/en/how-it-works/">passo a passo completo de como funciona</a>.', 'The reservation is made under a single name. See the <a href="/en/how-it-works/">complete step-by-step guide</a>.'],
      // Payment
      ['Quais formas de pagamento são aceitas?', 'What payment methods are accepted?'],
      ['Aceitamos as seguintes formas de pagamento:', 'We accept the following payment methods:'],
      ['<strong>PIX</strong> - Forma preferencial, sem taxas adicionais', '<strong>PIX</strong> - Preferred method, no additional fees'],
      ['<strong>Transferência bancária</strong> - Sem taxas adicionais', '<strong>Bank transfer</strong> - No additional fees'],
      ['<strong>Cartão de crédito</strong> - Taxas da operadora repassadas, parcelamento em até 12x com juros', '<strong>Credit card</strong> - Card processing fees apply, up to 12 installments with interest'],
      ['<strong>Cartão de débito</strong> - Taxas da operadora repassadas', '<strong>Debit card</strong> - Card processing fees apply'],
      ['O sinal de 50% confirma a reserva. O restante deve ser pago até o embarque.', 'The 50% deposit confirms the reservation. The remainder must be paid by boarding.'],
      // Cancellation
      ['Qual a política de cancelamento?', 'What is the cancellation policy?'],
      ['O sinal de 50% garante sua reserva e <strong>não dá direito a arrependimento</strong>, seja por motivos pessoais, familiares ou de saúde. Ao reservar, deixamos de ofertar a lancha para outros interessados.', 'The 50% deposit secures your reservation and <strong>is non-refundable</strong> for personal, family, or health reasons. By booking, we stop offering the boat to other interested parties.'],
      ['<strong>Precisa cancelar ou remarcar?</strong> Entre em contato o quanto antes! Nosso objetivo não é ficar com seu sinal. Se conseguirmos outro cliente para sua data, liberamos o valor para estorno ou remarcação.', '<strong>Need to cancel or reschedule?</strong> Contact us as soon as possible! Our goal is not to keep your deposit. If we find another client for your date, we release the amount for refund or rescheduling.'],
      ['<strong>Não comparecimento (no-show):</strong> Resulta na perda do sinal, sem direito a reagendamento ou reembolso.', '<strong>No-show:</strong> Results in the loss of the deposit, with no right to rescheduling or refund.'],
      // Advance booking
      ['Com quanto tempo de antecedência devo reservar?', 'How far in advance should I book?'],
      ['Não há tempo mínimo ou máximo para fazer sua reserva. Porém, em <strong>períodos de alta procura</strong> (verão, feriados prolongados, réveillon), recomendamos reservar com pelo menos <strong>30 dias de antecedência</strong> para garantir as melhores opções de lanchas e datas.', 'There is no minimum or maximum time to make your reservation. However, during <strong>high-demand periods</strong> (summer, extended holidays, New Year\'s Eve), we recommend booking at least <strong>30 days in advance</strong> to secure the best boat and date options.'],
      // During the Trip
      ['Posso levar bebida e comida?', 'Can I bring drinks and food?'],
      ['Sim! Você pode levar sua própria bebida e comida <strong>sem custo extra</strong>. Fornecemos coolers para armazenamento.', 'Yes! You can bring your own drinks and food <strong>at no extra cost</strong>. We provide coolers for storage.'],
      ['<strong>Obs:</strong> Para utilizar a churrasqueira, há uma taxa adicional.', '<strong>Note:</strong> There is an additional fee to use the BBQ grill.'],
      ['<strong>Sobre embalagens:</strong>', '<strong>Regarding packaging:</strong>'],
      ['Garrafas PET e latas são liberadas', 'PET bottles and cans are allowed'],
      ['Recipientes de vidro são aceitos <strong>apenas</strong> para vinhos, champanhes, whiskies e destilados', 'Glass containers are accepted <strong>only</strong> for wines, champagnes, whiskies and spirits'],
      ['Também oferecemos serviços opcionais de <strong>churrasco</strong> (a partir de R$ 100/pessoa) e <strong>open bar</strong> (a partir de R$ 135/pessoa).', 'We also offer optional <strong>BBQ</strong> services (from R$ 100/person) and <strong>open bar</strong> (from R$ 135/person).'],
      // Forbidden items
      ['O que é proibido levar na lancha?', 'What is forbidden to bring on the boat?'],
      ['Para garantir a segurança e conservação da embarcação, <strong>não é permitido</strong>:', 'To ensure the safety and conservation of the vessel, the following is <strong>not allowed</strong>:'],
      ['Bronzeadores (use protetor solar)', 'Tanning oils (use sunscreen)'],
      ['Vinho tinto', 'Red wine'],
      ['Narguilé', 'Hookah'],
      ['Fogos de artifício', 'Fireworks'],
      ['Confetes', 'Confetti'],
      ['Vidros (exceto vinhos, champanhes, whiskies e destilados)', 'Glass (except wines, champagnes, whiskies and spirits)'],
      // Rain
      ['E se chover no dia do passeio?', 'What if it rains on the day of the trip?'],
      ['A <strong>remarcação só é possível em caso de chuva forte</strong> que inviabilize o passeio. Tempo nublado ou chuva leve não geram remarcação, pois as lanchas possuem toldo.', '<strong>Rescheduling is only possible in case of heavy rain</strong> that makes the trip impossible. Cloudy weather or light rain does not qualify for rescheduling, as the boats have awnings.'],
      ['Em caso de más condições de navegabilidade, o roteiro pode ser automaticamente alterado para a <strong>Baía de Guanabara</strong>, garantindo sua experiência com segurança.', 'In case of poor sailing conditions, the route may be automatically changed to <strong>Guanabara Bay</strong>, ensuring your experience safely.'],
      // Route difference
      ['Qual a diferença entre os roteiros?', 'What is the difference between the routes?'],
      ['A diferença entre os roteiros está no <strong>tempo de navegação</strong> versus <strong>tempo de lancha parada</strong>. A duração total do passeio é sempre a mesma para o turno escolhido (5 horas).', 'The difference between routes is in <strong>sailing time</strong> versus <strong>time anchored</strong>. The total trip duration is always the same for the chosen shift (5 hours).'],
      ['<strong>Roteiros mais curtos (R1-R2):</strong> Menos tempo navegando, mais tempo de lancha parada para banho e curtição', '<strong>Shorter routes (R1-R2):</strong> Less sailing time, more time anchored for swimming and fun'],
      ['<strong>Roteiros mais longos (R4-R5):</strong> Mais tempo navegando, conhecendo mais lugares, menos tempo parado', '<strong>Longer routes (R4-R5):</strong> More sailing time, visiting more places, less time anchored'],
      ['<strong>Turnos disponíveis:</strong>', '<strong>Available shifts:</strong>'],
      ['Escolha o roteiro conforme o que você prefere: mais tempo relaxando na água ou conhecer mais destinos!', 'Choose the route according to what you prefer: more time relaxing in the water or visiting more destinations!'],
      // Advance arrival
      ['Preciso chegar com antecedência?', 'Do I need to arrive early?'],
      ['Sim! Chegue com pelo menos <strong>30 minutos de antecedência</strong> do horário marcado.', 'Yes! Arrive at least <strong>30 minutes before</strong> the scheduled time.'],
      ['<strong>Importante:</strong> O tempo de atraso será descontado do tempo total do passeio. Pontualidade garante que você aproveite cada minuto!', '<strong>Important:</strong> Late arrival time will be deducted from the total trip time. Being on time ensures you enjoy every minute!'],
      // Swimming
      ['Preciso saber nadar para fazer o passeio?', 'Do I need to know how to swim for the trip?'],
      ['<strong>Não é necessário saber nadar.</strong> Durante o passeio, fornecemos <strong>macarrões flutuantes e tapete</strong> para diversão na água. Coletes salva-vidas estão disponíveis para emergências.', '<strong>You do not need to know how to swim.</strong> During the trip, we provide <strong>pool noodles and floating mat</strong> for water fun. Life jackets are available for emergencies.'],
      ['Fornecemos todas as orientações de segurança sobre mergulho, mas a decisão final de entrar na água é de responsabilidade dos passageiros.', 'We provide all safety guidelines about swimming, but the final decision to enter the water is the passengers\' responsibility.'],
      // Music
      ['Posso escolher a música durante o passeio?', 'Can I choose the music during the trip?'],
      ['Sim! Todas as lanchas possuem <strong>som Bluetooth</strong>. Você pode conectar seu celular e tocar suas próprias playlists durante todo o passeio.', 'Yes! All boats have <strong>Bluetooth speakers</strong>. You can connect your phone and play your own playlists throughout the trip.'],
      ['Para festas e eventos especiais, oferecemos o serviço de <strong>DJ a bordo</strong>. A presença de DJ e equipamentos de som devem ser confirmados previamente, incluindo a potência permitida para a embarcação contratada.', 'For parties and special events, we offer an <strong>onboard DJ</strong> service. The presence of DJ and sound equipment must be confirmed in advance, including the power allowed for the hired vessel.'],
      // Smoking
      ['Posso fumar a bordo?', 'Can I smoke on board?'],
      ['É permitido fumar <strong>apenas nas áreas externas</strong> da lancha, respeitando as regras da embarcação e com cuidado para não danificar o piso e assentos. Pedimos que as bitucas sejam descartadas adequadamente.', 'Smoking is allowed <strong>only in outdoor areas</strong> of the boat, following the vessel rules and being careful not to damage the floor and seats. We ask that cigarette butts be disposed of properly.'],
      ['<strong>Atenção:</strong> Narguilé é proibido a bordo.', '<strong>Warning:</strong> Hookah is prohibited on board.'],
      // Restroom
      ['Como funciona o uso do banheiro?', 'How does the restroom work?'],
      ['Todas as nossas lanchas próprias possuem <strong>banheiro a bordo</strong> para maior conforto.', 'All our own boats have <strong>a restroom on board</strong> for greater comfort.'],
      ['<strong>Importante:</strong> Não jogue papel ou qualquer material no vaso sanitário. Caso o sistema seja danificado, será cobrada uma taxa de manutenção.', '<strong>Important:</strong> Do not flush paper or any material down the toilet. If the system is damaged, a maintenance fee will be charged.'],
      // About boats
      ['Sobre as Lanchas', 'About the Boats'],
      ['Quantas pessoas cabem em uma lancha?', 'How many people fit in a boat?'],
      ['A WeBoat tem <strong>5 lanchas próprias</strong> para diferentes tamanhos de grupo:', 'WeBoat has <strong>5 own boats</strong> for different group sizes:'],
      ['<strong>WeBoat Ibiza 42:</strong> Até 12 pessoas (flybridge exclusivo)', '<strong>WeBoat Ibiza 42:</strong> Up to 12 people (exclusive flybridge)'],
      ['Para grupos maiores, temos <strong>lanchas parceiras de 10 a 65 pessoas</strong>. Entre em contato para conhecer as opções!', 'For larger groups, we have <strong>partner boats from 10 to 65 people</strong>. Contact us to learn about the options!'],
      ['<strong>Importante:</strong> Todos contam como passageiros no limite da embarcação, independentemente de idade, peso ou tamanho.', '<strong>Important:</strong> Everyone counts as a passenger toward the vessel limit, regardless of age, weight or size.'],
      // Bathroom
      ['As lanchas têm banheiro?', 'Do the boats have a restroom?'],
      ['<strong>Sim!</strong> Todas as lanchas (próprias e de parceiros) possuem banheiro a bordo para maior conforto dos passageiros.', '<strong>Yes!</strong> All boats (own and partner) have a restroom on board for greater passenger comfort.'],
      // BBQ
      ['As lanchas têm churrasqueira?', 'Do the boats have a BBQ grill?'],
      ['<strong>Sim!</strong> Todas as nossas lanchas possuem churrasqueira. Porém, o uso requer a <strong>contratação de um serviço adicional</strong>.', '<strong>Yes!</strong> All our boats have a BBQ grill. However, use requires <strong>booking an additional service</strong>.'],
      ['Os valores variam entre <strong>R$ 250 a R$ 600</strong>, dependendo da embarcação e do que está incluído no pacote. Entre em contato para mais informações.', 'Prices range from <strong>R$ 250 to R$ 600</strong>, depending on the vessel and what is included in the package. Contact us for more information.'],
      // Difference between boats
      ['Qual a diferença entre as lanchas?', 'What is the difference between the boats?'],
      ['Cada lancha tem suas características:', 'Each boat has its own features:'],
      ['<strong>WeBoat 32:</strong> Melhor custo-benefício, ideal para grupos de até 15 pessoas', '<strong>WeBoat 32:</strong> Best value, ideal for groups of up to 15 people'],
      ['<strong>WeBoat 390:</strong> Mais versátil, até 16 pessoas, ótima para despedidas e festas', '<strong>WeBoat 390:</strong> Most versatile, up to 16 people, great for parties and celebrations'],
      ['<strong>WeBoat Oceanic 36:</strong> Conforto premium, acabamento superior, até 14 pessoas', '<strong>WeBoat Oceanic 36:</strong> Premium comfort, superior finishes, up to 14 people'],
      ['<strong>WeBoat Rio Star 50:</strong> Maior capacidade (22 pessoas), perfeita para grupos grandes', '<strong>WeBoat Rio Star 50:</strong> Largest capacity (22 people), perfect for large groups'],
      ['<strong>WeBoat Ibiza 42:</strong> Flybridge exclusivo, até 12 pessoas, ideal para casais e grupos pequenos', '<strong>WeBoat Ibiza 42:</strong> Exclusive flybridge, up to 12 people, ideal for couples and small groups'],
      ['Converse com nossa equipe para escolher a melhor opção para seu grupo!', 'Talk to our team to choose the best option for your group!'],
      // Problem with boat
      ['E se houver problema com a lancha no dia?', 'What if there is a problem with the boat on the day?'],
      ['Em caso de problemas com a embarcação contratada, disponibilizamos <strong>opções similares ou superiores</strong> para garantir seu passeio.', 'In case of problems with the hired vessel, we provide <strong>similar or superior options</strong> to ensure your trip.'],
      ['Caso não aprove nenhuma das opções oferecidas, realizaremos a <strong>devolução integral do valor pago</strong>.', 'If you do not approve any of the options offered, we will provide a <strong>full refund of the amount paid</strong>.'],
      // Occasions
      ['Posso fazer despedida de solteira na lancha?', 'Can I have a bachelorette party on a boat?'],
      ['<strong>Sim!</strong> A despedida de solteira na lancha é uma das nossas experiências mais populares.', '<strong>Yes!</strong> A bachelorette party on a boat is one of our most popular experiences.'],
      ['Oferecemos kit completo com:', 'We offer a complete kit with:'],
      ['Decoração temática (faixa de noiva, balões, adereços)', 'Themed decoration (bridal sash, balloons, accessories)'],
      ['Open bar com drinks especiais', 'Open bar with special drinks'],
      ['Playlist personalizada', 'Custom playlist'],
      ['Props para fotos', 'Photo props'],
      ['A <strong>WeBoat 390</strong> (até 16 pessoas) é a mais escolhida para despedidas.', 'The <strong>WeBoat 390</strong> (up to 16 people) is the most popular for bachelorette parties.'],
      // New Year's
      ['Vocês fazem passeio de Réveillon?', 'Do you offer New Year\'s Eve trips?'],
      ['<strong>Sim!</strong> O Réveillon na lancha é uma experiência única para ver a queima de fogos de Copacabana do mar.', '<strong>Yes!</strong> New Year\'s Eve on a boat is a unique experience to watch the Copacabana fireworks from the sea.'],
      ['O passeio tem <strong>5 horas de duração</strong>, com horário sugerido de <strong>21h às 2h</strong> (flexível conforme sua preferência). Horas adicionais são cobradas à parte.', 'The trip is <strong>5 hours long</strong>, with suggested hours of <strong>9pm to 2am</strong> (flexible based on your preference). Extra hours are charged separately.'],
      ['<strong>Atenção:</strong> As vagas são limitadas e costumam esgotar com meses de antecedência. Reserve o quanto antes!', '<strong>Attention:</strong> Spots are limited and tend to sell out months in advance. Book as soon as possible!'],
      // Birthday
      ['Posso fazer festa de aniversário na lancha?', 'Can I have a birthday party on a boat?'],
      ['<strong>Sim!</strong> Aniversário na lancha é uma forma única de comemorar.', '<strong>Yes!</strong> A birthday party on a boat is a unique way to celebrate.'],
      ['Oferecemos:', 'We offer:'],
      ['Decoração personalizada com balões e faixa', 'Custom decoration with balloons and banner'],
      ['Bolo decorado (opcional)', 'Decorated cake (optional)'],
      ['Mesa para bolo e doces', 'Table for cake and sweets'],
      ['O aniversariante pode trazer o próprio bolo sem custo adicional.', 'The birthday person can bring their own cake at no extra cost.'],
      // Corporate
      ['Vocês atendem eventos corporativos?', 'Do you cater to corporate events?'],
      ['<strong>Sim!</strong> Atendemos empresas para confraternizações, team building, premiações e reuniões executivas.', '<strong>Yes!</strong> We serve companies for gatherings, team building, awards and executive meetings.'],
      ['Diferenciais para empresas:', 'Benefits for companies:'],
      ['Emissão de nota fiscal', 'Invoice issuance'],
      ['Seguro para todos os participantes', 'Insurance for all participants'],
      ['Atendimento dedicado', 'Dedicated service'],
      ['Personalização completa', 'Full customization'],
      ['Lanchas para até 65 pessoas (com parceiros)', 'Boats for up to 65 people (with partners)'],
      // DJ/Photographer
      ['Posso contratar DJ, fotógrafo ou barman?', 'Can I hire a DJ, photographer or bartender?'],
      ['<strong>Sim!</strong> Oferecemos serviços de DJ (R$ 1.500) e fotógrafo (R$ 800). Também temos opções de open bar com barman incluso.', '<strong>Yes!</strong> We offer DJ services (R$ 1,500) and photographer (R$ 800). We also have open bar options with bartender included.'],
      ['<strong>Importante:</strong> Profissionais contratados (DJ, barman, fotógrafo, etc.) são considerados passageiros e contam no limite da embarcação.', '<strong>Important:</strong> Hired professionals (DJ, bartender, photographer, etc.) count as passengers toward the vessel limit.'],
      // === Logistics ===
      ['Logística', 'Logistics'],
      ['Onde fica a Marina da Glória?', 'Where is Marina da Gloria?'],
      ['A Marina da Glória fica na <strong>Av. Infante Dom Henrique, S/N</strong>, no bairro Glória, Rio de Janeiro.', 'Marina da Gloria is located at <strong>Av. Infante Dom Henrique, S/N</strong>, in the Gloria neighborhood, Rio de Janeiro.'],
      ['Localização privilegiada:', 'Privileged location:'],
      ['Ao lado do Aeroporto Santos Dumont', 'Next to Santos Dumont Airport'],
      ['Fácil acesso de carro, táxi ou Uber', 'Easy access by car, taxi or Uber'],
      ['Perto do Aterro do Flamengo', 'Close to Aterro do Flamengo'],
      ['<strong>Importante:</strong> Todos os passageiros devem embarcar e desembarcar no mesmo local.', '<strong>Important:</strong> All passengers must board and disembark at the same location.'],
      ['Tem estacionamento na marina?', 'Is there parking at the marina?'],
      ['<strong>Sim!</strong> A Marina da Glória possui estacionamento rotativo controlado pela ESTAPAR. Para um passeio de aproximadamente 5h, o valor fica em torno de <strong>R$ 70</strong>.', '<strong>Yes!</strong> Marina da Gloria has a paid parking lot managed by ESTAPAR. For a trip of approximately 5 hours, the cost is around <strong>R$ 70</strong>.'],
      ['<em>Os valores podem ser atualizados pela ESTAPAR sem aviso prévio.</em>', '<em>Prices may be updated by ESTAPAR without prior notice.</em>'],
      ['Também é possível chegar de táxi, Uber ou transporte público (metrô estação Glória + caminhada).', 'You can also get there by taxi, Uber or public transport (Gloria metro station + walking).'],
      ['O que devo levar para o passeio?', 'What should I bring for the trip?'],
      ['Sugerimos levar:', 'We suggest bringing:'],
      ['Roupa de banho e troca de roupa', 'Swimwear and change of clothes'],
      ['<strong>Protetor solar</strong> (bronzeador não é permitido) e óculos de sol', '<strong>Sunscreen</strong> (tanning oil is not allowed) and sunglasses'],
      ['Toalha', 'Towel'],
      ['Bebidas e petiscos (se não contratar serviço)', 'Drinks and snacks (if not hiring a service)'],
      ['Câmera ou celular para fotos', 'Camera or phone for photos'],
      ['<strong>Atenção:</strong> Não nos responsabilizamos por objetos pessoais deixados a bordo.', '<strong>Attention:</strong> We are not responsible for personal items left on board.'],
      // === Children, Pets and Accessibility ===
      ['Crianças, Pets e Acessibilidade', 'Children, Pets and Accessibility'],
      ['Posso levar crianças no passeio?', 'Can I bring children on the trip?'],
      ['<strong>Sim!</strong> Não há restrição de idade para crianças.', '<strong>Yes!</strong> There is no age restriction for children.'],
      ['Pedimos apenas que os responsáveis:', 'We only ask that guardians:'],
      ['Atentem-se às regras do briefing inicial', 'Pay attention to the rules of the initial briefing'],
      ['Obedeçam as orientações do comandante da embarcação', 'Follow the captain\'s instructions'],
      ['Sugerimos o uso de <strong>coletes recreativos infantis</strong> para entrar no mar. Todas as crianças contam no limite de passageiros da embarcação.', 'We suggest using <strong>children\'s recreational life vests</strong> when swimming. All children count toward the vessel\'s passenger limit.'],
      ['Posso levar cachorro na lancha?', 'Can I bring a dog on the boat?'],
      ['Permitimos <strong>cachorros de pequeno porte</strong> sem necessidade de consulta prévia.', 'We allow <strong>small dogs</strong> without prior consultation.'],
      ['Para cães de <strong>médio e grande porte</strong>, é necessário consultar nossa equipe pelo WhatsApp antes de reservar.', 'For <strong>medium and large dogs</strong>, please contact our team via WhatsApp before booking.'],
      ['Gestantes podem fazer o passeio?', 'Can pregnant women take the trip?'],
      ['<strong>Sim!</strong> Não há restrição para gestantes.', '<strong>Yes!</strong> There is no restriction for pregnant women.'],
      ['Recomendamos, porém, optar por <strong>roteiros mais abrigados</strong>, como:', 'However, we recommend choosing <strong>more sheltered routes</strong>, such as:'],
      ['<strong>Mureta da Urca</strong> - Navegação tranquila na Baía de Guanabara', '<strong>Mureta da Urca</strong> - Calm sailing in Guanabara Bay'],
      ['<strong>Praia Vermelha</strong> - Águas calmas e paradas relaxantes', '<strong>Praia Vermelha</strong> - Calm waters and relaxing stops'],
      ['As lanchas são acessíveis para cadeirantes?', 'Are the boats wheelchair accessible?'],
      ['Nossas embarcações <strong>não possuem acessibilidade específica</strong> para cadeirantes e pessoas com mobilidade reduzida.', 'Our vessels <strong>do not have specific accessibility</strong> for wheelchair users and people with reduced mobility.'],
      ['Apesar disso, já recebemos diversos clientes com essas condições. Nossos colaboradores, junto com familiares e amigos, podem ajudar no embarque e durante o passeio.', 'However, we have welcomed many clients with these conditions. Our crew, along with family and friends, can help with boarding and during the trip.'],
      ['<strong>Importante:</strong> O acesso ao banheiro a bordo é bem limitado, especialmente para cadeirantes.', '<strong>Important:</strong> Access to the onboard bathroom is quite limited, especially for wheelchair users.'],
      // === Policies and Rules ===
      ['Políticas e Regras', 'Policies and Rules'],
      ['Quais são as regras de uso da embarcação?', 'What are the vessel usage rules?'],
      ['Nossas embarcações são destinadas a <strong>atividades de turismo náutico e lazer familiar</strong>.', 'Our vessels are intended for <strong>nautical tourism and family leisure activities</strong>.'],
      ['Qualquer uso indevido, como práticas ilícitas, consumo de drogas ou atos indecorosos, resultará na <strong>interrupção imediata do passeio</strong> e possíveis ações legais.', 'Any misuse, such as illicit activities, drug use or indecent acts, will result in the <strong>immediate interruption of the trip</strong> and possible legal action.'],
      ['Vocês usam fotos do passeio para divulgação?', 'Do you use photos from the trip for promotion?'],
      ['Ao contratar nossos serviços, o cliente <strong>autoriza o uso de imagens</strong> do passeio para fins de divulgação em nossas redes sociais e materiais promocionais.', 'By hiring our services, the client <strong>authorizes the use of images</strong> from the trip for promotion on our social media and marketing materials.'],
      ['Se preferir que suas fotos não sejam utilizadas, basta informar nossa equipe.', 'If you prefer that your photos not be used, just inform our team.'],
      ['A lancha pode atracar em outros barcos?', 'Can the boat dock alongside other boats?'],
      ['<strong>Não.</strong> A embarcação contratada não pode atracar ao lado de outros barcos por questões de segurança e regulamentação.', '<strong>No.</strong> The chartered vessel cannot dock alongside other boats due to safety and regulatory reasons.'],
      ['Qual o horário de atendimento?', 'What are the business hours?'],
      ['<strong>Atendimento comercial:</strong> 8h às 20h (para reservas e informações)', '<strong>Sales hours:</strong> 8am to 8pm (for reservations and information)'],
      ['<strong>Suporte para clientes em passeio:</strong> 24 horas', '<strong>Support for clients on trips:</strong> 24 hours'],
      // CTA
      ['Ainda tem dúvidas?', 'Still have questions?'],
      ['Nossa equipe está pronta para esclarecer qualquer questão e ajudar você a planejar o passeio perfeito.', 'Our team is ready to answer any questions and help you plan the perfect trip.'],
      ['Nossa equipe está pronta para ajudar! Entre em contato pelo WhatsApp.', 'Our team is ready to help! Contact us via WhatsApp.'],
      ['Falar pelo WhatsApp', 'Chat on WhatsApp'],
      ['Falar via WhatsApp', 'Chat on WhatsApp'],
      ['Ir para Contato', 'Go to Contact'],
      ['Atendimento: 8h às 20h', 'Service hours: 8am to 8pm'],
      ['Última atualização: Fevereiro 2026', 'Last updated: February 2026'],
    ],
  },
  {
    ptPath: 'contato/index.html',
    enPath: 'en/contact/index.html',
    title: 'Contact Us | WeBoat Brasil - Boat Rental Rio',
    description: 'Contact WeBoat Brasil for boat rental in Rio de Janeiro. WhatsApp, phone, email. Marina da Gloria, Rio de Janeiro.',
    keywords: 'contact weboat, weboat phone, weboat whatsapp, marina da gloria contact',
    waMessage: 'Hello! I would like to get in touch with WeBoat Brasil. [via site - en]',
    css: 'contato',
    contentBlocks: [
      // Schema.org shared service descriptions
      ['"description": "Lanchas de 10 a 65 pessoas, próprias e parceiras, com combustível, marinheiro e seguro inclusos"', '"description": "Boats for 10 to 65 people, own and partner, with fuel, captain and insurance included"'],
      ['"description": "Churrasco, open bar, decoração, DJ e fotógrafo para passeios de lancha"', '"description": "BBQ, open bar, decoration, DJ and photographer for boat trips"'],
      // Schema.org - ContactPage (MUST come before shorter substrings like 'Suporte para clientes')
      ['"name": "Contato - WeBoat Brasil"', '"name": "Contact - WeBoat Brasil"'],
      ['"description": "Entre em contato com a WeBoat Brasil para alugar uma lancha no Rio de Janeiro."', '"description": "Contact WeBoat Brasil for boat rental in Rio de Janeiro."'],
      // Schema.org FAQ answers (plain text — long strings before shorter substrings)
      ['"text": "Atendimento comercial: 8h às 20h (reservas e informações). Suporte para clientes em passeio: 24 horas. Mensagens fora do horário serão respondidas no próximo dia útil."', '"text": "Sales hours: 8am to 8pm (reservations and information). Support for clients on trips: 24 hours. Messages outside business hours will be answered on the next business day."'],
      ['"text": "A reserva é simples! Entre em contato pelo WhatsApp (21) 97772-4114, escolha a lancha e data desejada, e pague um sinal de 50% para confirmar. O restante deve ser pago até o momento do embarque."', '"text": "Booking is simple! Contact us via WhatsApp (21) 97772-4114, choose the boat and desired date, and pay a 50% deposit to confirm. The remainder must be paid by the time of boarding."'],
      ['"text": "PIX e transferência bancária são as formas preferenciais, sem taxas adicionais. Também aceitamos cartão de crédito (até 12x com juros) e débito, com taxas da operadora repassadas."', '"text": "PIX and bank transfer are the preferred methods, with no additional fees. We also accept credit card (up to 12 installments with interest) and debit, with operator fees passed on."'],
      ['"text": "Não há tempo mínimo ou máximo. Porém, em períodos de alta procura (verão, feriados, réveillon), recomendamos reservar com pelo menos 30 dias de antecedência para garantir as melhores opções."', '"text": "There is no minimum or maximum time. However, during high demand periods (summer, holidays, New Year\'s Eve), we recommend booking at least 30 days in advance to ensure the best options."'],
      ['Churrasco, open bar, decoração, DJ e fotógrafo para passeios de lancha', 'BBQ, open bar, decoration, DJ and photographer for boat trips'],
      // HTML FAQ answer with <strong> (must also run before 'Suporte para clientes' short match)
      ['<strong>Atendimento comercial:</strong> 8h às 20h (reservas e informações). <strong>Suporte para clientes em passeio:</strong> 24 horas. Mensagens fora do horário serão respondidas no próximo dia útil.', '<strong>Sales hours:</strong> 8am to 8pm (reservations and information). <strong>Support for clients on trips:</strong> 24 hours. Messages outside business hours will be answered on the next business day.'],
      // Hero
      ['Fale Conosco', 'Contact Us'],
      ['Estamos prontos para ajudar você a planejar o passeio de lancha perfeito no Rio de Janeiro. Confira <a href="/en/how-it-works/">como funciona o processo de reserva</a>.', 'We are ready to help you plan the perfect boat trip in Rio de Janeiro. Check <a href="/en/how-it-works/">how the booking process works</a>.'],
      // Contact info
      ['Entre em Contato', 'Get in Touch'],
      ['O jeito mais rápido de falar conosco é pelo WhatsApp. Respondemos em poucos minutos durante o horário de atendimento. Dúvidas frequentes? Consulte nosso <a href="/en/faq/">FAQ completo</a>.', 'The fastest way to reach us is via WhatsApp. We respond within minutes during business hours. Have common questions? Check our <a href="/en/faq/">complete FAQ</a>.'],
      ['WhatsApp (Preferencial)', 'WhatsApp (Preferred)'],
      ['Resposta em minutos', 'Response in minutes'],
      ['Telefone', 'Phone'],
      ['Ligações e chamadas de voz', 'Calls and voice calls'],
      ['Endereço', 'Address'],
      ['Horários de Atendimento', 'Business Hours'],
      ['Todos os dias', 'Every day'],
      // *** FULL answer capsule paragraph MUST come BEFORE short ['Suporte para clientes'] and ['24 horas'] ***
      ['A forma mais rápida de contato com a WeBoat Brasil é pelo <strong>WhatsApp (21) 97772-4114</strong>. O atendimento funciona todos os dias das 8h às 20h, com suporte 24 horas para clientes com reserva. Também é possível ligar ou enviar mensagem pelo formulário do site.', 'The fastest way to contact WeBoat Brasil is via <strong>WhatsApp (21) 97772-4114</strong>. Service is available every day from 8am to 8pm, with 24-hour support for clients with reservations. You can also call or send a message through the website form.'],
      ['Suporte para clientes', 'Client support'],
      ['24 horas', '24 hours'],
      // Form
      ['Envie sua Mensagem', 'Send Your Message'],
      ['Preencha o formulário abaixo e entraremos em contato o mais rápido possível.', 'Fill in the form below and we will get back to you as soon as possible.'],
      ['Seu nome completo', 'Your full name'],
      ['Assunto', 'Subject'],
      ['Selecione', 'Select'],
      ['Solicitar Orçamento', 'Request a Quote'],
      ['Fazer Reserva', 'Make a Reservation'],
      ['Tirar Dúvida', 'Ask a Question'],
      ['Despedida de Solteira', 'Bachelorette Party'],
      ['Evento Corporativo', 'Corporate Event'],
      ['Outro', 'Other'],
      ['Data Desejada', 'Preferred Date'],
      ['Número de Pessoas', 'Number of People'],
      ['2 a 5 pessoas', '2 to 5 people'],
      ['6 a 10 pessoas', '6 to 10 people'],
      ['11 a 15 pessoas', '11 to 15 people'],
      ['16 a 22 pessoas', '16 to 22 people'],
      ['23 a 40 pessoas', '23 to 40 people'],
      ['41 a 65 pessoas', '41 to 65 people'],
      ['Mensagem', 'Message'],
      ['Conte-nos mais sobre o que você está buscando...', 'Tell us more about what you are looking for...'],
      ['Enviar Mensagem', 'Send Message'],
      ['Ao enviar, você concorda com nossa <a href="#">Política de Privacidade</a>.', 'By submitting, you agree to our <a href="/en/privacy-policy/">Privacy Policy</a>.'],
      // Map
      ['Nossa Localização', 'Our Location'],
      // Note: PT text uses /en/ link because URL replacement happens before contentBlocks
      ['Estamos na Marina da Glória, uma das marinas mais tradicionais do Rio de Janeiro, com vista privilegiada para o Pão de Açúcar. Conheça todas as <a href="/en/service-areas/">áreas atendidas pelos nossos passeios</a>.', 'We are at Marina da Gloria, one of the most traditional marinas in Rio de Janeiro, with a privileged view of Sugarloaf Mountain. Learn about all <a href="/en/service-areas/">areas covered by our trips</a>.'],
      ['Como Chegar', 'How to Get Here'],
      // Transport
      ['De Carro', 'By Car'],
      ['Acesso fácil pela Av. Infante Dom Henrique. Estacionamento disponível na marina.', 'Easy access via Av. Infante Dom Henrique. Parking available at the marina.'],
      ['Táxi / Uber', 'Taxi / Uber'],
      ['Peça para descer na entrada da Marina da Glória. Fica ao lado do Aeroporto Santos Dumont.', 'Ask to be dropped off at the entrance of Marina da Gloria. It is next to Santos Dumont Airport.'],
      ['Metrô', 'Subway'],
      ['Estação Glória (Linha 1). De lá, são aproximadamente 15 minutos de caminhada pelo Aterro.', 'Gloria Station (Line 1). From there, it is approximately a 15-minute walk through Aterro do Flamengo.'],
      // Answer capsules
      ['Como entrar em contato com a WeBoat Brasil?', 'How to contact WeBoat Brasil?'],
      // (full paragraph moved above — before ['Suporte para clientes'] and ['24 horas'])
      ['Onde fica a WeBoat Brasil?', 'Where is WeBoat Brasil located?'],
      ['A WeBoat Brasil fica na <strong>Marina da Glória, Loja 06</strong>, no bairro da Glória, Rio de Janeiro (Av. Infante Dom Henrique, S/N, CEP 20021-140). A marina fica ao lado do Aeroporto Santos Dumont, com acesso por carro, táxi/Uber ou metrô (estação Glória, Linha 1).', 'WeBoat Brasil is located at <strong>Marina da Gloria, Shop 06</strong>, in the Gloria neighborhood, Rio de Janeiro (Av. Infante Dom Henrique, S/N, ZIP 20021-140). The marina is next to Santos Dumont Airport, accessible by car, taxi/Uber or subway (Gloria station, Line 1).'],
      ['Como reservar um passeio de lancha na WeBoat?', 'How to book a boat trip at WeBoat?'],
      ['Para reservar, envie uma mensagem pelo WhatsApp informando data, número de pessoas e ocasião. A equipe recomenda a melhor lancha e roteiro. A reserva é confirmada com 50% de sinal via PIX, cartão ou transferência. Cancelamentos até 48h antes têm reembolso integral.', 'To book, send a WhatsApp message with the date, number of people and occasion. The team recommends the best boat and route. The reservation is confirmed with a 50% deposit via PIX, credit card or bank transfer. Cancellations up to 48 hours before receive a full refund.'],
      // Reviews section
      ['Pode Confiar', 'Trust Us'],
      ['Atendimento Nota 5 Estrelas', '5-Star Service'],
      ['Nosso compromisso é oferecer a melhor experiência desde o primeiro contato.', 'Our commitment is to offer the best experience from the first contact.'],
      // Mini FAQ
      ['Dúvidas sobre Reservas', 'Booking Questions'],
      ['Como faço para reservar uma lancha?', 'How do I book a boat?'],
      ['A reserva é simples! Entre em contato pelo <strong>WhatsApp (21) 97772-4114</strong>, escolha a lancha e data desejada, e pague um sinal de <strong>50%</strong> para confirmar. O restante deve ser pago até o momento do embarque.', 'Booking is simple! Contact us via <strong>WhatsApp (21) 97772-4114</strong>, choose the boat and desired date, and pay a <strong>50%</strong> deposit to confirm. The remainder must be paid by the time of boarding.'],
      ['Quais formas de pagamento são aceitas?', 'What payment methods are accepted?'],
      ['<strong>PIX e transferência bancária</strong> são as formas preferenciais, sem taxas adicionais. Também aceitamos <strong>cartão de crédito</strong> (até 12x com juros) e <strong>débito</strong>, com taxas da operadora repassadas.', '<strong>PIX and bank transfer</strong> are the preferred methods, with no additional fees. We also accept <strong>credit card</strong> (up to 12 installments with interest) and <strong>debit</strong>, with operator fees passed on.'],
      ['Com quanto tempo de antecedência devo reservar?', 'How far in advance should I book?'],
      ['Não há tempo mínimo ou máximo. Porém, em <strong>períodos de alta procura</strong> (verão, feriados, réveillon), recomendamos reservar com pelo menos <strong>30 dias de antecedência</strong> para garantir as melhores opções.', 'There is no minimum or maximum time. However, during <strong>high demand periods</strong> (summer, holidays, New Year\'s Eve), we recommend booking at least <strong>30 days in advance</strong> to ensure the best options.'],
      ['Vocês respondem fora do horário de atendimento?', 'Do you respond outside business hours?'],
      // Social
      ['Siga a WeBoat Brasil', 'Follow WeBoat Brasil'],
      ['Última atualização: Fevereiro 2026', 'Last updated: February 2026'],
    ],
  },
  {
    ptPath: 'como-funciona/index.html',
    enPath: 'en/how-it-works/index.html',
    title: 'How It Works - Book Your Boat Trip | WeBoat Brasil',
    description: 'Learn how to book a boat trip with WeBoat Brasil. Simple 3-step process: choose, customize, and enjoy!',
    keywords: 'how to rent boat rio, boat rental process, book boat trip rio',
    waMessage: 'Hello! I would like to understand how the boat rental works. [via site - en]',
    css: 'ocasioes',
    contentBlocks: [
      // Schema.org HowTo description (full PT → EN, must come first — longest string)
      ['"description": "Guia completo em 5 passos para alugar uma lancha na WeBoat Brasil, com saída da Marina da Glória no Rio de Janeiro. Do primeiro contato pelo WhatsApp até o dia do passeio. Lanchas de 10 a 65 pessoas, a partir de R$ 2.300."', '"description": "Complete 5-step guide to renting a boat at WeBoat Brasil, departing from Marina da Gloria in Rio de Janeiro. From the first WhatsApp contact to the day of the trip. Boats for 10 to 65 people, from R$ 2,300."'],
      // Schema.org OfferCatalog name (mixed PT/EN from dictionary)
      ['"name": "Roteiros de Passeio"', '"name": "Boat Trip Routes"'],
      // Schema.org shared service descriptions
      ['"description": "Lanchas de 10 a 65 pessoas, próprias e parceiras, com combustível, marinheiro e seguro inclusos"', '"description": "Boats for 10 to 65 people, own and partner, with fuel, captain and insurance included"'],
      ['"description": "Churrasco, open bar, decoração, DJ e fotógrafo para passeios de lancha"', '"description": "BBQ, open bar, decoration, DJ and photographer for boat trips"'],
      // Schema.org FAQ answers (plain text — must come before shorter substrings)
      ['"text": "A reserva é feita em minutos pelo WhatsApp. Após escolher a lancha e roteiro, você paga 50% de sinal e a reserva está confirmada. Recomendamos reservar com pelo menos 3 dias de antecedência, especialmente para finais de semana."', '"text": "Booking is done in minutes via WhatsApp. After choosing the boat and route, you pay a 50% deposit and the reservation is confirmed. We recommend booking at least 3 days in advance, especially for weekends."'],
      ['"text": "Não. Todas as lanchas da WeBoat incluem um marinheiro habilitado pela Marinha do Brasil. Você só precisa embarcar e aproveitar o passeio."', '"text": "No. All WeBoat boats include a captain licensed by the Brazilian Navy. You just need to board and enjoy the trip."'],
      ['"text": "Sim. Cancelamentos feitos até 48 horas antes do passeio têm reembolso integral do sinal. Em caso de mau tempo, reagendamos sem custo adicional."', '"text": "Yes. Cancellations made up to 48 hours before the trip receive a full deposit refund. In case of bad weather, we reschedule at no additional cost."'],
      ['"text": "Leve protetor solar, roupa de banho, toalha e suas bebidas/petiscos (coolers inclusos na lancha). A lancha já tem tapete flutuante, macarrões e som Bluetooth."', '"text": "Bring sunscreen, swimwear, a towel and your drinks/snacks (coolers included on the boat). The boat already has a floating mat, pool noodles and Bluetooth speakers."'],
      // Schema.org HowToStep entries (plain text — must come before shorter substrings)
      ['"name": "WhatsApp para contato"', '"name": "WhatsApp for contact"'],
      ['"text": "Envie uma mensagem pelo WhatsApp (21) 97772-4114 informando a data desejada, número de pessoas e ocasião. Nossa equipe responde em minutos."', '"text": "Send a WhatsApp message to (21) 97772-4114 with the desired date, number of people and occasion. Our team responds in minutes."'],
      ['"name": "Escolha a lancha e roteiro"', '"name": "Choose the boat and route"'],
      ['"text": "Com base no seu grupo e preferências, recomendamos a melhor lancha e roteiro. Temos 5 lanchas próprias e 21 parceiras para grupos de 10 a 65 pessoas."', '"text": "Based on your group and preferences, we recommend the best boat and route. We have 5 own boats and 21 partner boats for groups of 10 to 65 people."'],
      ['"name": "Reserve com 50% de sinal"', '"name": "Book with a 50% deposit"'],
      ['"text": "Confirme a reserva pagando 50% de sinal via PIX, cartão ou transferência. O restante é pago no dia do passeio. Cancelamento com reembolso até 48h antes."', '"text": "Confirm the reservation by paying a 50% deposit via PIX, credit card or bank transfer. The remainder is paid on the day of the trip. Cancellation with full refund up to 48 hours before."'],
      ['"name": "Chegue na Marina da Glória"', '"name": "Arrive at Marina da Gloria"'],
      ['"text": "No dia do passeio, chegue 15 minutos antes na Marina da Glória (Av. Infante Dom Henrique, S/N, Loja 06). Estacionamento disponível no local."', '"text": "On the day of the trip, arrive 15 minutes before at Marina da Gloria (Av. Infante Dom Henrique, S/N, Shop 06). Parking available on site."'],
      ['#passo-4-embarque', '#passo-4-boarding'],
      // Breadcrumb Schema
      ['"name": "Como Funciona"', '"name": "How It Works"'],
      // Header
      ['Como Funciona o Aluguel de Lancha', 'How Boat Rental Works'],
      ['Processo simples e transparente em 5 passos. Do primeiro contato até o dia do seu passeio,\n          nossa equipe cuida de tudo para você só se preocupar em aproveitar.', 'Simple and transparent process in 5 steps. From the first contact to the day of your trip,\n          our team takes care of everything so you only have to worry about enjoying it.'],
      // Quick summary
      ['Como alugar uma lancha no Rio de Janeiro?', 'How to rent a boat in Rio de Janeiro?'],
      ['<strong>O aluguel de lancha na WeBoat funciona em 5 passos simples: 1) Contato pelo WhatsApp, 2) Escolha da lancha e roteiro, 3) Reserva com 50% de sinal, 4) Chegada na Marina da Glória, 5) Embarque e passeio.</strong>\n            Todo o processo leva menos de 30 minutos e você pode reservar com antecedência ou até no mesmo dia (sujeito a disponibilidade).', '<strong>Renting a boat at WeBoat works in 5 simple steps: 1) Contact via WhatsApp, 2) Choose your boat and route, 3) Book with 50% deposit, 4) Arrive at Marina da Gloria, 5) Board and enjoy.</strong>\n            The entire process takes less than 30 minutes and you can book in advance or even on the same day (subject to availability).'],
      // Step 1
      ['Entre em contato pelo WhatsApp', 'Contact us via WhatsApp'],
      ['<strong>Envie uma mensagem para (21) 97772-4114 informando a data desejada, número de pessoas e ocasião (aniversário, despedida, passeio em família, etc.).</strong>\n              Nossa equipe responde em minutos e já envia sugestões de lanchas e roteiros para seu grupo.', '<strong>Send a message to (21) 97772-4114 with the desired date, number of people and occasion (birthday, bachelorette, family trip, etc.).</strong>\n              Our team responds in minutes and sends boat and route suggestions for your group.'],
      ['Atendimento todos os dias das 8h às 20h', 'Service every day from 8am to 8pm'],
      ['Resposta em até 5 minutos', 'Response within 5 minutes'],
      ['Sem compromisso - tire suas dúvidas primeiro', 'No commitment - ask your questions first'],
      ['Iniciar Conversa', 'Start a Conversation'],
      // Step 2
      ['Escolha a lancha e roteiro ideais', 'Choose the ideal boat and route'],
      ['<strong>Com base no tamanho do seu grupo e preferências, recomendamos a melhor combinação de lancha e roteiro. Temos 5 lanchas próprias (10-22 pessoas) e 21 parceiras (até 65 pessoas).</strong>\n              Você recebe fotos, vídeos e todas as informações para decidir com segurança.', '<strong>Based on your group size and preferences, we recommend the best boat and route combination. We have 5 own boats (10-22 people) and 21 partner boats (up to 65 people).</strong>\n              You receive photos, videos and all the information to decide with confidence.'],
      ['Lanchas Próprias', 'Own Boats'],
      ['5 lanchas de 10 a 22 pessoas. Prioridade no agendamento e atendimento direto da equipe WeBoat.', '5 boats for 10 to 22 people. Priority scheduling and direct service from the WeBoat team.'],
      ['Ver lanchas', 'View boats'],
      ['Roteiros', 'Routes'],
      ['6 roteiros de 5 horas. Da Urca às Ilhas Cagarras, passando por Copacabana e Niterói.', '6 routes of 5 hours. From Urca to Ilhas Cagarras, passing through Copacabana and Niteroi.'],
      ['Ver roteiros', 'View routes'],
      // Step 3
      ['Reserve com 50% de sinal', 'Book with a 50% deposit'],
      ['<strong>Confirme sua reserva pagando 50% do valor via PIX, cartão de crédito ou transferência bancária. O restante é pago no dia do passeio.</strong>\n              Você recebe confirmação por WhatsApp com todos os detalhes: data, horário, lancha e ponto de encontro.', '<strong>Confirm your reservation by paying 50% via PIX, credit card or bank transfer. The remainder is paid on the day of the trip.</strong>\n              You receive confirmation via WhatsApp with all details: date, time, boat and meeting point.'],
      ['<strong>PIX:</strong> Pagamento instantâneo', '<strong>PIX:</strong> Instant payment'],
      ['<strong>Cartão:</strong> Até 12x (taxas do cartão)', '<strong>Credit Card:</strong> Up to 12 installments (card fees apply)'],
      ['<strong>Transferência:</strong> TED ou DOC', '<strong>Bank Transfer:</strong> Wire transfer'],
      ['<strong>Política de cancelamento:</strong> Cancelamentos até 48h antes têm reembolso integral. Em caso de mau tempo, reagendamos sem custo.', '<strong>Cancellation policy:</strong> Cancellations up to 48 hours before receive a full refund. In case of bad weather, we reschedule at no cost.'],
      // Step 4
      ['Chegue na Marina da Glória', 'Arrive at Marina da Gloria'],
      ['<strong>No dia do passeio, chegue 15 minutos antes do horário marcado na Marina da Glória (Av. Infante Dom Henrique, S/N, Loja 06 - Glória, Rio de Janeiro).</strong>\n              Estacionamento pago disponível no local. Acesso fácil pelo Aterro do Flamengo.', '<strong>On the day of the trip, arrive 15 minutes before the scheduled time at Marina da Gloria (Av. Infante Dom Henrique, S/N, Shop 06 - Gloria, Rio de Janeiro).</strong>\n              Paid parking available on site. Easy access via Aterro do Flamengo.'],
      ['Estacionamento pago no local', 'Paid parking on site'],
      ['Chegue 15 minutos antes', 'Arrive 15 minutes early'],
      // Step 5 — Schema.org HowToStep (plain text, no !, different text)
      ['"name": "Aproveite seu passeio"', '"name": "Enjoy your trip"'],
      ['"text": "Embarque na lancha com seu grupo, conecte sua playlist no som Bluetooth e aproveite o mar do Rio de Janeiro com total conforto e segurança."', '"text": "Board the boat with your group, connect your playlist to the Bluetooth speakers and enjoy the sea of Rio de Janeiro with total comfort and safety."'],
      ['#passo-5-passeio', '#passo-5-trip'],
      // Step 5 — visible HTML
      ['Aproveite seu passeio!', 'Enjoy your trip!'],
      ['<strong>Embarque na lancha com seu grupo, conecte sua playlist no som Bluetooth e aproveite o mar do Rio de Janeiro. O marinheiro cuida da navegação enquanto você relaxa.</strong>\n              Todas as lanchas têm tapete flutuante, macarrões, coolers e equipamentos de segurança homologados.', '<strong>Board the boat with your group, connect your playlist to the Bluetooth speakers and enjoy the sea of Rio de Janeiro. The sailor handles the navigation while you relax.</strong>\n              All boats have floating mats, pool noodles, coolers and certified safety equipment.'],
      ['O que está incluso em todo passeio:', 'What is included in every trip:'],
      ['Combustível para o roteiro', 'Fuel for the route'],
      ['Marinheiro habilitado', 'Licensed sailor'],
      ['Som Bluetooth', 'Bluetooth speakers'],
      ['Coolers', 'Coolers'],
      ['Tapete flutuante', 'Floating mat'],
      ['Coletes salva-vidas', 'Life jackets'],
      // FAQ
      ['Perguntas Frequentes sobre o Processo', 'Frequently Asked Questions about the Process'],
      ['Quanto tempo leva para reservar uma lancha?', 'How long does it take to book a boat?'],
      ['<strong>A reserva é feita em minutos pelo WhatsApp. Após escolher a lancha e roteiro, você paga 50% de sinal e a reserva está confirmada.</strong>\n                    Recomendamos reservar com pelo menos 3 dias de antecedência, especialmente para finais de semana.', '<strong>Booking is done in minutes via WhatsApp. After choosing the boat and route, you pay 50% deposit and the reservation is confirmed.</strong>\n                    We recommend booking at least 3 days in advance, especially for weekends.'],
      ['Preciso de habilitação para pilotar a lancha?', 'Do I need a license to drive the boat?'],
      ['<strong>Não. Todas as lanchas da WeBoat incluem um marinheiro habilitado pela Marinha do Brasil.</strong>\n                    Você só precisa embarcar e aproveitar o passeio. O marinheiro cuida de toda a navegação com segurança.', '<strong>No. All WeBoat boats include a sailor licensed by the Brazilian Navy.</strong>\n                    You just need to board and enjoy the trip. The sailor handles all navigation safely.'],
      ['Posso cancelar a reserva?', 'Can I cancel the reservation?'],
      ['<strong>Sim. Cancelamentos feitos até 48 horas antes do passeio têm reembolso integral do sinal.</strong>\n                    Em caso de mau tempo no dia marcado, reagendamos sem custo adicional. Nossa equipe monitora a previsão e avisa com antecedência.', '<strong>Yes. Cancellations made up to 48 hours before the trip receive a full deposit refund.</strong>\n                    In case of bad weather on the scheduled day, we reschedule at no additional cost. Our team monitors the forecast and notifies you in advance.'],
      ['O que levar no dia do passeio?', 'What to bring on the day of the trip?'],
      ['<strong>Leve protetor solar, roupa de banho, toalha e suas bebidas/petiscos (coolers inclusos na lancha).</strong>\n                    A lancha já tem tapete flutuante, macarrões e som Bluetooth. Gelo não está incluso - você pode comprar na marina.', '<strong>Bring sunscreen, swimwear, towel and your drinks/snacks (coolers included on the boat).</strong>\n                    The boat already has a floating mat, pool noodles and Bluetooth speakers. Ice is not included - you can buy it at the marina.'],
      ['Ver Todas as Dúvidas', 'View All Questions'],
      // CTA
      ['Pronto para Reservar?', 'Ready to Book?'],
      ['Fale com nossa equipe pelo WhatsApp e reserve seu passeio de lancha no Rio de Janeiro.', 'Talk to our team via WhatsApp and book your boat trip in Rio de Janeiro.'],
      ['Reservar pelo WhatsApp', 'Book via WhatsApp'],
      ['Ver Lanchas Disponíveis', 'View Available Boats'],
      ['Última atualização: Fevereiro 2026', 'Last updated: February 2026'],
    ],
  },
  {
    ptPath: 'areas-atendidas/index.html',
    enPath: 'en/service-areas/index.html',
    title: 'Service Areas - Where We Go | WeBoat Brasil',
    description: 'Discover all areas covered by WeBoat Brasil boat trips. From Mureta da Urca to Ilhas Cagarras and beyond.',
    keywords: 'boat trip areas rio, where does weboat go, guanabara bay boat areas',
    waMessage: 'Hello! I would like information about the areas you cover. [via site - en]',
    css: 'ocasioes',
    contentBlocks: [
      // Schema.org area descriptions (must come first — longest strings)
      ['"description": "Todas as áreas de passeio de lancha atendidas pela WeBoat Brasil"', '"description": "All boat trip areas served by WeBoat Brasil"'],
      ['"description": "Ponto de encontro tradicional carioca com águas calmas e vista privilegiada do Pão de Açúcar. Melhor horário: manhã ou fim de tarde. Roteiro a partir de R$ 2.300."', '"description": "Traditional carioca meeting point with calm waters and a privileged view of Sugarloaf Mountain. Best time: morning or late afternoon. Route from R$ 2,300."'],
      ['"description": "Praia secreta aos pés do Pão de Açúcar, acessível principalmente por barco, ideal para parada de banho. Melhor horário: manhã (águas mais calmas). Roteiro a partir de R$ 2.500."', '"description": "Secret beach at the foot of Sugarloaf Mountain, accessible mainly by boat, ideal for a swimming stop. Best time: morning (calmer waters). Route from R$ 2,500."'],
      ['"description": "Vista icônica da orla mais famosa do Brasil, passando pelo Arpoador e Ipanema. Melhor horário: fim de tarde (pôr do sol). Roteiro a partir de R$ 3.000."', '"description": "Iconic view of the most famous coastline in Brazil, passing by Arpoador and Ipanema. Best time: late afternoon (sunset). Route from R$ 3,000."'],
      ['"description": "Arquipélago em mar aberto com águas cristalinas, ideal para mergulho e natureza preservada. Melhor horário: manhã (mar mais calmo). Roteiro a partir de R$ 3.600."', '"description": "Open sea archipelago with crystal clear waters, ideal for diving and preserved nature. Best time: morning (calmer sea). Route from R$ 3,600."'],
      ['"description": "Praias de Niterói com águas cristalinas e menos movimento, perfeitas para quem busca exclusividade. Melhor horário: manhã. Roteiro a partir de R$ 3.600."', '"description": "Niteroi beaches with crystal clear waters and less crowds, perfect for those seeking exclusivity. Best time: morning. Route from R$ 3,600."'],
      ['"description": "Navegação completa pela baía com vista para o Cristo Redentor, Ponte Rio-Niterói e Ilha Fiscal. Melhor horário: qualquer período. Roteiro a partir de R$ 4.500."', '"description": "Full bay navigation with views of Christ the Redeemer, Rio-Niteroi Bridge and Ilha Fiscal. Best time: any period. Route from R$ 4,500."'],
      // LONG PARAGRAPHS FIRST — must run before any short fragments to avoid partial matches
      // Area descriptions (contain words like "Aguas cristalinas" that short entries would corrupt)
      ['A Mureta da Urca e um dos pontos mais tradicionais do Rio de Janeiro para encontros e passeios de lancha.\n              Com aguas calmas e protegidas pela Baia de Guanabara, e o local perfeito para quem busca tranquilidade\n              e uma vista privilegiada do Pao de Acucar.', 'Mureta da Urca is one of the most traditional spots in Rio de Janeiro for gatherings and boat trips.\n              With calm waters sheltered by Guanabara Bay, it is the perfect location for those seeking tranquility\n              and a privileged view of Sugarloaf Mountain.'],
      ['Conhecida como a praia secreta do Rio, a Praia Vermelha e acessivel principalmente por barco.\n              Aos pes do Pao de Acucar, oferece aguas cristalinas e uma experiência única de banho com vista\n              para o bondinho passando acima.', 'Known as the secret beach of Rio, Praia Vermelha is accessible mainly by boat.\n              At the foot of Sugarloaf Mountain, it offers crystal clear waters and a unique swimming experience with views\n              of the cable car passing above.'],
      ['Navegue pela orla mais famosa do Brasil! O passeio por Copacabana oferece uma vista panoramica\n              única da iconica praia, passando também pelo Arpoador e Ipanema. Perfeito para fotos inesquecíveis\n              e turistas que querem conhecer o Rio do mar.', 'Sail along the most famous coastline in Brazil! The Copacabana trip offers a unique panoramic\n              view of the iconic beach, also passing by Arpoador and Ipanema. Perfect for unforgettable photos\n              and tourists who want to see Rio from the sea.'],
      ['Para os mais aventureiros! O arquipelago das Ilhas Cagarras oferece uma experiência única em mar aberto.\n              Com aguas cristalinas e natureza preservada, e o destino ideal para mergulho, snorkeling e contato\n              direto com a vida marinha.', 'For the more adventurous! The Ilhas Cagarras archipelago offers a unique open sea experience.\n              With crystal clear waters and preserved nature, it is the ideal destination for diving, snorkeling and direct\n              contact with marine life.'],
      ['Nosso roteiro mais exclusivo! Atravesse a Baia de Guanabara e descubra as praias semi-desertas\n              de Itaipu e Camboinhas em Niteroi. Aguas cristalinas, menos movimento e cenários paradisiacos\n              para quem busca paz e exclusividade.', 'Our most exclusive route! Cross Guanabara Bay and discover the semi-deserted beaches\n              of Itaipu and Camboinhas in Niteroi. Crystal clear waters, less crowds and paradise-like scenery\n              for those seeking peace and exclusivity.'],
      ['A navegação pela Baia de Guanabara e uma das experiencias mais completas do Rio de Janeiro.\n              Com vista para o Cristo Redentor, Ponte Rio-Niteroi, Ilha Fiscal e os principais pontos turisticos,\n              e o passeio ideal para quem quer conhecer a cidade de um angulo único.', 'Sailing through Guanabara Bay is one of the most complete experiences in Rio de Janeiro.\n              With views of Christ the Redeemer, Rio-Niteroi Bridge, Ilha Fiscal and the main tourist landmarks,\n              it is the ideal trip for those who want to see the city from a unique angle.'],
      ['Descubra todos os destinos incriveis que você pode explorar em nossos passeios de lancha.\n          Da Urca as Ilhas Cagarras, o Rio de Janeiro e ainda mais bonito visto do mar.', 'Discover all the incredible destinations you can explore on our boat trips.\n          From Urca to Ilhas Cagarras, Rio de Janeiro is even more beautiful seen from the sea.'],
      // Header
      ['Onde Navegamos', 'Where We Sail'],
      ['Areas de Passeio de Lancha no Rio de Janeiro', 'Boat Trip Areas in Rio de Janeiro'],
      ['Areas Atendidas', 'Service Areas'],
      // Area 1 - Mureta da Urca
      ['Mais Popular', 'Most Popular'],
      ['Aguas calmas', 'Calm waters'],
      ['Vista Pao de Acucar', 'Sugarloaf view'],
      ['Ideal para familias', 'Ideal for families'],
      ['Ponto de encontro', 'Meeting point'],
      ['Melhor horário', 'Best time'],
      ['Manha ou fim de tarde', 'Morning or late afternoon'],
      ['A partir de', 'Starting from'],
      ['Lanchas disponíveis', 'Available boats'],
      ['Todas (10 a 65 pessoas)', 'All (10 to 65 people)'],
      ['Ver Roteiro Completo', 'View Full Route'],
      ['Reservar', 'Book Now'],
      // Area 2 - Praia Vermelha
      ['Mais Vendido', 'Best Seller'],
      ['Parada para banho', 'Swimming stop'],
      ['Vista do bondinho', 'Cable car view'],
      ['Aguas cristalinas', 'Crystal clear waters'],
      ['Fotos incriveis', 'Amazing photos'],
      ['Manha (aguas mais calmas)', 'Morning (calmest waters)'],
      // Area 3 - Copacabana
      ['Vista Iconica', 'Iconic View'],
      ['Vista panoramica', 'Panoramic view'],
      ['Por do sol incrivel', 'Incredible sunset'],
      ['Ideal para turistas', 'Ideal for tourists'],
      ['Fim de tarde (por do sol)', 'Late afternoon (sunset)'],
      // Area 4 - Ilhas Cagarras
      ['Mar Aberto', 'Open Sea'],
      ['Vida marinha', 'Marine life'],
      ['Mergulho e snorkeling', 'Diving and snorkeling'],
      ['Natureza preservada', 'Preserved nature'],
      ['Aventura em mar aberto', 'Open sea adventure'],
      ['Manha (mar mais calmo)', 'Morning (calmest sea)'],
      ['Lanchas 32 pes+ (14 a 50 pessoas)', 'Boats 32ft+ (14 to 50 people)'],
      // Area 5 - Itaipu e Camboinhas
      ['Praias Desertas', 'Deserted Beaches'],
      ['Menos movimento', 'Less crowded'],
      ['Exclusividade', 'Exclusivity'],
      ['Travessia da baia', 'Bay crossing'],
      ['Manha (mar mais tranquilo)', 'Morning (calmest sea)'],
      // Area 6 - Baia de Guanabara
      ['Experiência Completa', 'Complete Experience'],
      ['Vista Cristo Redentor', 'Christ the Redeemer view'],
      ['Qualquer periodo', 'Any time'],
      ['Ver Volta Completa', 'View Full Tour'],
      // FAQ
      ['Duvidas', 'Questions'],
      ['Perguntas sobre Areas de Passeio', 'Questions about Trip Areas'],
      ['Quais áreas sao atendidas para passeio de lancha no Rio de Janeiro?', 'What areas are covered for boat trips in Rio de Janeiro?'],
      ['<strong>A WeBoat Brasil realiza passeios de lancha em diversas áreas do Rio de Janeiro: Mureta da Urca, Praia Vermelha, Copacabana (incluindo Arpoador e Ipanema), Ilhas Cagarras, Itaipu e Camboinhas (Niteroi), e toda a Baia de Guanabara.</strong>\n                    Todos os passeios partem da Marina da Glória e podem ser personalizados conforme sua preferencia.', '<strong>WeBoat Brasil offers boat trips in several areas of Rio de Janeiro: Mureta da Urca, Praia Vermelha, Copacabana (including Arpoador and Ipanema), Ilhas Cagarras, Itaipu and Camboinhas (Niteroi), and all of Guanabara Bay.</strong>\n                    All trips depart from Marina da Gloria and can be customized to your preference.'],
      ['Qual a area mais indicada para primeira vez em passeio de lancha?', 'Which area is best for a first-time boat trip?'],
      ['<strong>Para primeira vez, recomendamos a Mureta da Urca ou Praia Vermelha. Sao áreas com aguas calmas dentro da Baia de Guanabara, ideais para familias e iniciantes.</strong>\n                    Veja nossos <a href="/roteiros/">roteiros disponíveis</a> para escolher o melhor para você.', '<strong>For a first time, we recommend Mureta da Urca or Praia Vermelha. These are areas with calm waters inside Guanabara Bay, ideal for families and beginners.</strong>\n                    Check our <a href="/en/routes/">available routes</a> to choose the best one for you.'],
      ['E possível combinar diferentes áreas em um único passeio?', 'Is it possible to combine different areas in a single trip?'],
      ['<strong>Sim! Nossos roteiros podem ser personalizados. A Volta Completa, por exemplo, combina Urca, Copacabana e Ilhas Cagarras em um único passeio de 5 horas.</strong>\n                    Converse com nossa equipe pelo <a href="https://wa.me/5521977724114">WhatsApp</a> para montar o roteiro ideal.', '<strong>Yes! Our routes can be customized. The Full Tour, for example, combines Urca, Copacabana and Ilhas Cagarras in a single 5-hour trip.</strong>\n                    Talk to our team via <a href="https://wa.me/5521977724114">WhatsApp</a> to create the ideal route.'],
      ['Qual area e melhor para mergulho e snorkeling?', 'Which area is best for diving and snorkeling?'],
      ['<strong>Para mergulho e snorkeling, as Ilhas Cagarras sao a melhor opção. O arquipelago tem aguas cristalinas e vida marinha abundante.</strong>\n                    Itaipu e Camboinhas também oferecem excelente visibilidade para atividades aquaticas.', '<strong>For diving and snorkeling, Ilhas Cagarras is the best option. The archipelago has crystal clear waters and abundant marine life.</strong>\n                    Itaipu and Camboinhas also offer excellent visibility for water activities.'],
      ['Qual a melhor area para ver o por do sol?', 'Which area is best for watching the sunset?'],
      ['<strong>Para ver o por do sol, recomendamos o roteiro de Copacabana ou a Mureta da Urca. A vista do sol se pondo atras das montanhas e espetacular.</strong>\n                    Agende passeios no final da tarde para aproveitar essa experiência única.', '<strong>For watching the sunset, we recommend the Copacabana route or Mureta da Urca. The view of the sun setting behind the mountains is spectacular.</strong>\n                    Schedule trips in the late afternoon to enjoy this unique experience.'],
      ['Ver Todas as Duvidas', 'View All Questions'],
      // Schema.org - LocalBusiness description
      ['Aluguel de lanchas no Rio de Janeiro. Passeios privativos com conforto e segurança.', 'Boat rentals in Rio de Janeiro. Private trips with comfort and safety.'],
      // Schema.org - OfferCatalog descriptions
      ['Lanchas de 10 a 65 pessoas, próprias e parceiras, com combustível, marinheiro e seguro inclusos', 'Boats for 10 to 65 people, own and partner, with fuel, captain and insurance included'],
      ['6 roteiros de 5h pela Baía de Guanabara, Copacabana, Ilhas Cagarras e Niterói', '6 routes of 5 hours through Guanabara Bay, Copacabana, Ilhas Cagarras and Niteroi'],
      ['Churrasco, open bar, decoração, DJ e fotógrafo para passeios de lancha', 'BBQ, open bar, decoration, DJ and photographer for boat trips'],
      // Schema.org - ItemList description
      ['Todas as áreas de passeio de lancha atendidas pela WeBoat Brasil', 'All boat trip areas served by WeBoat Brasil'],
      // Schema.org - TouristAttraction descriptions (long strings first)
      ['Ponto de encontro tradicional carioca com águas calmas e vista privilegiada do Pão de Açúcar. Melhor horário: manhã ou fim de tarde. Roteiro a partir de R$ 2.300.', 'Traditional Rio meeting point with calm waters and a privileged view of Sugarloaf Mountain. Best time: morning or late afternoon. Route from R$ 2,300.'],
      ['Praia secreta aos pés do Pão de Açúcar, acessível principalmente por barco, ideal para parada de banho. Melhor horário: manhã (águas mais calmas). Roteiro a partir de R$ 2.500.', 'Secret beach at the foot of Sugarloaf Mountain, accessible mainly by boat, ideal for a swimming stop. Best time: morning (calmest waters). Route from R$ 2,500.'],
      ['Vista icônica da orla mais famosa do Brasil, passando pelo Arpoador e Ipanema. Melhor horário: fim de tarde (pôr do sol). Roteiro a partir de R$ 3.000.', 'Iconic view of the most famous coastline in Brazil, passing by Arpoador and Ipanema. Best time: late afternoon (sunset). Route from R$ 3,000.'],
      ['Arquipélago em mar aberto com águas cristalinas, ideal para mergulho e natureza preservada. Melhor horário: manhã (mar mais calmo). Roteiro a partir de R$ 3.600.', 'Archipelago in open sea with crystal clear waters, ideal for diving and preserved nature. Best time: morning (calmest sea). Route from R$ 3,600.'],
      ['Praias de Niterói com águas cristalinas e menos movimento, perfeitas para quem busca exclusividade. Melhor horário: manhã. Roteiro a partir de R$ 3.600.', 'Niteroi beaches with crystal clear waters and less crowds, perfect for those seeking exclusivity. Best time: morning. Route from R$ 3,600.'],
      ['Navegação completa pela baía com vista para o Cristo Redentor, Ponte Rio-Niterói e Ilha Fiscal. Melhor horário: qualquer período. Roteiro a partir de R$ 4.500.', 'Full navigation through the bay with views of Christ the Redeemer, Rio-Niteroi Bridge and Ilha Fiscal. Best time: any period. Route from R$ 4,500.'],
      // Schema.org FAQ answers
      ['A WeBoat Brasil realiza passeios de lancha em diversas áreas do Rio de Janeiro: Mureta da Urca, Praia Vermelha, Copacabana (incluindo Arpoador e Ipanema), Ilhas Cagarras, Itaipu e Camboinhas (Niteroi), e toda a Baia de Guanabara.', 'WeBoat Brasil offers boat trips in several areas of Rio de Janeiro: Mureta da Urca, Praia Vermelha, Copacabana (including Arpoador and Ipanema), Ilhas Cagarras, Itaipu and Camboinhas (Niteroi), and all of Guanabara Bay.'],
      ['Para primeira vez, recomendamos a Mureta da Urca ou Praia Vermelha. Sao áreas com aguas calmas dentro da Baia de Guanabara, ideais para familias e iniciantes.', 'For a first time, we recommend Mureta da Urca or Praia Vermelha. These are areas with calm waters inside Guanabara Bay, ideal for families and beginners.'],
      ['Sim! Nossos roteiros podem ser personalizados. A Volta Completa, por exemplo, combina Urca, Copacabana e Ilhas Cagarras em um único passeio de 5 horas.', 'Yes! Our routes can be customized. The Full Tour, for example, combines Urca, Copacabana and Ilhas Cagarras in a single 5-hour trip.'],
      // FAQ visible text fixes (with EN URLs from step 16)
      ['Veja nossos <a href="/en/routes/">roteiros disponíveis</a> para escolher o melhor para você.', 'Check our <a href="/en/routes/">available routes</a> to choose the best one for you.'],
      // CTA
      ['Pronto para Explorar o Rio de Janeiro do Mar?', 'Ready to Explore Rio de Janeiro from the Sea?'],
      ['Entre em contato e nossa equipe vai ajudar você a escolher a melhor area\n            e roteiro para seu passeio de lancha.', 'Get in touch and our team will help you choose the best area\n            and route for your boat trip.'],
      ['Falar com Especialista', 'Talk to a Specialist'],
      ['Ver Todos os Roteiros', 'View All Routes'],
      ['Última atualização: Fevereiro 2026', 'Last updated: February 2026'],
      // Alt text - Volta Completa image (partially translated by dictionary)
      ['Navegação pela Baia de Guanabara com vista para o Cristo Redentor', 'Sailing through Guanabara Bay with a view of Christ the Redeemer'],
    ],
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
    contentBlocks: [
      // Blog cross-reference alt texts (full PT source strings — prevent mixed PT/EN)
      ['Lanchas ancoradas na Praia Vermelha com Morro da Urca ao fundo', 'Boats anchored at Praia Vermelha with Morro da Urca in the background'],
      ['Amigas de biquíni relaxando no solário da lancha', 'Friends in bikinis relaxing on the sun deck of the boat'],
      // Page header
      ['Blog WeBoat', 'WeBoat Blog'],
      ['Dicas, guias e tudo sobre passeios de lancha no Rio de Janeiro', 'Tips, guides, and everything about boat trips in Rio de Janeiro'],
      // Article 1 card
      ['Roteiros', 'Routes'],
      ['Fevereiro 2026', 'February 2026'],
      ['Melhores Praias para Visitar de Lancha no RJ', 'Best Beaches to Visit by Boat in Rio'],
      ['Descubra as praias mais bonitas do Rio de Janeiro que só são acessíveis (ou muito melhores) de lancha. Da Praia Vermelha às Ilhas Cagarras.', 'Discover the most beautiful beaches in Rio de Janeiro that are only accessible (or much better) by boat. From Praia Vermelha to Ilhas Cagarras.'],
      ['Ler artigo', 'Read article'],
      // Article 2 card
      ['Dicas', 'Tips'],
      ['O Que Vestir num Passeio de Lancha: Guia Completo', 'What to Wear on a Boat Trip: Complete Guide'],
      ['Guia prático de como se vestir para um passeio de lancha no Rio. O que levar, o que evitar e dicas de proteção solar.', 'Practical guide on how to dress for a boat trip in Rio. What to bring, what to avoid, and sun protection tips.'],
      // Article 3 card (*** full title MUST come before short ['Guia', 'Guide'] ***)
      ['Guia da Marina da Glória: Tudo que Você Precisa Saber', 'Marina da Gloria Guide: Everything You Need to Know'],
      ['Guia', 'Guide'],
      ['Tudo sobre a Marina da Glória: como chegar, estacionamento, o que esperar no dia do passeio e dicas para aproveitar ao máximo.', 'Everything about Marina da Gloria: how to get there, parking, what to expect on trip day, and tips to make the most of it.'],
      // CTA
      ['Pronto para Seu Passeio de Lancha?', 'Ready for Your Boat Trip?'],
      ['Escolha sua lancha, roteiro e serviços extras. Passeios a partir de R$ 2.300 com tudo incluso.', 'Choose your boat, route, and extras. Trips starting at R$ 2,300 all-inclusive.'],
      ['Atualizado em fevereiro de 2026', 'Updated in February 2026'],
    ],
  },
  {
    ptPath: 'blog/melhores-praias-lancha-rj/index.html',
    enPath: 'en/blog/best-beaches-by-boat-rio/index.html',
    title: 'Best Beaches to Visit by Boat in Rio de Janeiro | WeBoat Blog',
    description: 'Discover the best beaches you can only reach by boat in Rio de Janeiro. Crystal clear waters, hidden coves, and paradise islands.',
    keywords: 'best beaches boat rio, beaches by boat rio de janeiro, hidden beaches rio',
    waMessage: 'Hello! I would like information about boat trips to beaches. [via site - en]',
    css: null,
    contentBlocks: [
      // Blog cross-reference alt texts (full PT source strings — prevent mixed PT/EN)
      ['Lanchas ancoradas na Praia Vermelha com vista do Morro da Urca e Cristo Redentor ao fundo, Rio de Janeiro', 'Boats anchored at Praia Vermelha with a view of Morro da Urca and Christ the Redeemer in the background, Rio de Janeiro'],
      ['Amigas de biquíni relaxando no solário da lancha', 'Friends in bikinis relaxing on the sun deck of the boat'],
      // *** CROSS-REFERENCE EXCERPTS FIRST (contain "O que levar" which gets corrupted by short entry below) ***
      ['Guia prático de como se vestir para um passeio de lancha no Rio. O que levar, o que evitar e dicas de proteção solar.', 'Practical guide on how to dress for a boat trip in Rio. What to bring, what to avoid, and sun protection tips.'],
      // Schema.org headline
      ['"headline": "Melhores Praias para Visitar de Lancha no RJ"', '"headline": "Best Beaches to Visit by Boat in RJ"'],
      // Schema.org description (must match PT text that's in JSON-LD)
      ['Conheça as melhores praias do Rio de Janeiro para visitar de lancha: Praia Vermelha, Ilhas Cagarras, Itaipu e mais. Guia completo com dicas práticas.', 'Discover the best beaches in Rio de Janeiro to visit by boat: Praia Vermelha, Ilhas Cagarras, Itaipu and more. Complete guide with practical tips.'],
      // *** FULL TITLE must come BEFORE short breadcrumb ***
      ['Melhores Praias para Visitar de Lancha no RJ', 'Best Beaches to Visit by Boat in Rio'],
      // Breadcrumb (short — will match remaining instances after title is translated)
      ['Melhores Praias', 'Best Beaches'],
      // Meta
      ['Roteiros', 'Routes'],
      ['Fevereiro 2026', 'February 2026'],
      ['6 min de leitura', '6 min read'],
      // Article body paragraphs
      ['O Rio de Janeiro tem algumas das praias mais bonitas do mundo -- e a melhor forma de conhecê-las é de lancha. Enquanto milhares de pessoas disputam um lugar na areia, quem chega pelo mar tem acesso a ângulos exclusivos, praias praticamente desertas e uma experiência que nenhum carro ou ônibus consegue oferecer.', 'Rio de Janeiro has some of the most beautiful beaches in the world -- and the best way to experience them is by boat. While thousands of people fight for a spot on the sand, those who arrive by sea have access to exclusive angles, virtually deserted beaches, and an experience that no car or bus can offer.'],
      ['Saindo da <strong>Marina da Glória</strong>, a costa carioca se revela de um jeito completamente diferente: sem trânsito, sem lotação e com a brisa do mar como companhia. Neste guia, reunimos as melhores praias para visitar de lancha no Rio de Janeiro, com dicas práticas para você planejar o passeio perfeito.', 'Departing from <strong>Marina da Gloria</strong>, the Rio coastline reveals itself in a completely different way: no traffic, no crowds, and with the sea breeze as your companion. In this guide, we have gathered the best beaches to visit by boat in Rio de Janeiro, with practical tips to plan the perfect trip.'],
      // Beach 1
      ['1. Praia Vermelha -- O Roteiro Mais Vendido', '1. Praia Vermelha -- The Best-Selling Route'],
      ['Ancorar em frente à <strong>Praia Vermelha</strong> é, sem dúvida, uma das experiências mais marcantes que o Rio oferece. Com o Pão de Açúcar como cenário, a paisagem vista da lancha é de tirar o fôlego -- e rende fotos que parecem cartão-postal.', 'Anchoring in front of <strong>Praia Vermelha</strong> is, without a doubt, one of the most remarkable experiences Rio has to offer. With Sugarloaf Mountain as the backdrop, the view from the boat is breathtaking -- and the photos look like postcards.'],
      ['A praia tem águas calmas e transparentes, ideais para um mergulho rápido. Do mar, é possível observar os bondinhos do teleférico subindo o morro, enquanto a Mureta da Urca aparece logo ao lado. Não é à toa que esse é o <strong>roteiro mais vendido</strong> da WeBoat: combina beleza, tranquilidade e proximidade da Marina da Glória.', 'The beach has calm and clear waters, ideal for a quick swim. From the sea, you can watch the cable car gondolas climbing the mountain, while Mureta da Urca appears right next door. It is no wonder this is WeBoat\'s <strong>best-selling route</strong>: it combines beauty, tranquility, and proximity to Marina da Gloria.'],
      ['<strong>Distância da Marina:</strong> aproximadamente 15 minutos de navegação', '<strong>Distance from the Marina:</strong> approximately 15 minutes sailing'],
      ['<strong>Destaques:</strong> vista do Pão de Açúcar, águas calmas, parada para mergulho', '<strong>Highlights:</strong> Sugarloaf Mountain view, calm waters, swimming stop'],
      ['<strong>Ideal para:</strong> famílias, casais, festas de aniversário', '<strong>Ideal for:</strong> families, couples, birthday parties'],
      // Beach 2
      ['2. Ilhas Cagarras -- Águas Cristalinas e Snorkeling', '2. Ilhas Cagarras -- Crystal Clear Waters and Snorkeling'],
      ['As <strong>Ilhas Cagarras</strong> formam um arquipélago protegido em frente a Ipanema, e são acessíveis <strong>exclusivamente por embarcação</strong>. Isso significa que não há infraestrutura na areia, nem multidões: apenas o mar, a vida marinha e a natureza preservada.', 'The <strong>Ilhas Cagarras</strong> form a protected archipelago off the coast of Ipanema, accessible <strong>exclusively by boat</strong>. This means there is no infrastructure on the sand, no crowds: just the sea, marine life, and preserved nature.'],
      ['A água ao redor das ilhas é impressionantemente cristalina, com visibilidade que pode ultrapassar 10 metros em dias de sol. Tartarugas marinhas, cardumes coloridos e até golfinhos são avistamentos comuns na região. Para quem gosta de snorkeling, este é o melhor destino do Rio de Janeiro.', 'The water around the islands is impressively crystal clear, with visibility that can exceed 10 meters on sunny days. Sea turtles, colorful schools of fish, and even dolphins are common sightings in the area. For snorkeling enthusiasts, this is the best destination in Rio de Janeiro.'],
      ['O percurso até as Cagarras é em mar aberto, o que torna a navegação um pouco mais aventureira. No entanto, as lanchas da WeBoat são preparadas para esse tipo de travessia, e o marinheiro experiente conhece cada detalhe do trajeto.', 'The route to Cagarras is in open sea, which makes the sailing a bit more adventurous. However, WeBoat\'s boats are prepared for this type of crossing, and the experienced skipper knows every detail of the route.'],
      ['<strong>Distância da Marina:</strong> aproximadamente 40 minutos de navegação', '<strong>Distance from the Marina:</strong> approximately 40 minutes sailing'],
      ['<strong>Destaques:</strong> águas cristalinas, snorkeling, fauna marinha, natureza intocada', '<strong>Highlights:</strong> crystal clear waters, snorkeling, marine wildlife, untouched nature'],
      ['<strong>Ideal para:</strong> aventureiros, amantes da natureza, grupos de amigos', '<strong>Ideal for:</strong> adventurers, nature lovers, groups of friends'],
      // Beach 3
      ['3. Itaipu e Camboinhas -- Praias Quase Desertas em Niterói', '3. Itaipu and Camboinhas -- Nearly Deserted Beaches in Niteroi'],
      ['Cruzar a Baía de Guanabara e ancorar nas praias de <strong>Itaipu e Camboinhas</strong>, em Niterói, é como descobrir um paraíso escondido. Essas praias são menos conhecidas pelo público em geral, mas quem as visita de lancha entende imediatamente por que são tão especiais.', 'Crossing Guanabara Bay and anchoring at the beaches of <strong>Itaipu and Camboinhas</strong> in Niteroi is like discovering a hidden paradise. These beaches are less known to the general public, but anyone who visits them by boat immediately understands why they are so special.'],
      ['As águas são calmas e rasas, perfeitas para crianças e para quem prefere nadar com tranquilidade. A faixa de areia é ampla e, durante a semana, praticamente deserta. A vista de volta para o Rio de Janeiro -- com o Cristo Redentor, o Pão de Açúcar e toda a linha da costa -- é espetacular.', 'The waters are calm and shallow, perfect for children and those who prefer to swim in peace. The sand strip is wide and, during the week, virtually deserted. The view back to Rio de Janeiro -- with Christ the Redeemer, Sugarloaf Mountain, and the entire coastline -- is spectacular.'],
      ['<strong>Distância da Marina:</strong> aproximadamente 50 minutos de navegação', '<strong>Distance from the Marina:</strong> approximately 50 minutes sailing'],
      ['<strong>Destaques:</strong> águas calmas e rasas, praias amplas, vista panorâmica do Rio', '<strong>Highlights:</strong> calm and shallow waters, wide beaches, panoramic view of Rio'],
      ['<strong>Ideal para:</strong> famílias com crianças, casais, passeios mais longos', '<strong>Ideal for:</strong> families with children, couples, longer trips'],
      // Beach 4
      ['4. Copacabana -- A Vista Icônica pelo Mar', '4. Copacabana -- The Iconic View from the Sea'],
      ['Todo mundo conhece Copacabana pela areia. Mas pouquíssimas pessoas já viram a <strong>Princesinha do Mar</strong> a partir de uma lancha -- e a diferença é surpreendente. Do mar, a praia se revela inteira, com o Forte de Copacabana de um lado e o Arpoador do outro, emoldurada pelas montanhas da Tijuca.', 'Everyone knows Copacabana from the sand. But very few people have seen the <strong>Princess of the Sea</strong> from a boat -- and the difference is surprising. From the sea, the beach reveals itself entirely, with Copacabana Fort on one side and Arpoador on the other, framed by the Tijuca mountains.'],
      ['Navegar ao longo da orla de Copacabana oferece uma perspectiva totalmente diferente da cidade. É possível ver os prédios da Avenida Atlântica, a movimentação na areia e o formato da baía de um ângulo que só existe pelo mar. Para fotos e vídeos, é um dos pontos mais instagramáveis de todo o passeio.', 'Sailing along the Copacabana waterfront offers a completely different perspective of the city. You can see the buildings on Avenida Atlantica, the movement on the sand, and the shape of the bay from an angle that only exists from the sea. For photos and videos, it is one of the most Instagrammable spots on the entire trip.'],
      ['<strong>Distância da Marina:</strong> aproximadamente 25 minutos de navegação', '<strong>Distance from the Marina:</strong> approximately 25 minutes sailing'],
      ['<strong>Destaques:</strong> vista panorâmica da orla inteira, ótimas fotos, passagem pelo Forte', '<strong>Highlights:</strong> panoramic view of the entire waterfront, great photos, passing by the Fort'],
      ['<strong>Ideal para:</strong> turistas, despedidas de solteira, eventos corporativos', '<strong>Ideal for:</strong> tourists, bachelorette parties, corporate events'],
      // Beach 5
      ['5. Praias da Baía de Guanabara -- Joias Escondidas', '5. Guanabara Bay Beaches -- Hidden Gems'],
      ['A <strong>Baía de Guanabara</strong> guarda praias que a maioria dos cariocas nem sabe que existem. Pequenas enseadas protegidas, com águas calmas e vegetação nativa, formam recantos perfeitos para ancorar e aproveitar o dia com privacidade.', '<strong>Guanabara Bay</strong> holds beaches that most locals do not even know exist. Small sheltered coves with calm waters and native vegetation form perfect spots to anchor and enjoy the day with privacy.'],
      ['Entre os destaques estão as praias próximas à Fortaleza de São João, a Praia de Adão e Eva em Niterói, e as pequenas faixas de areia ao longo da Ilha de Paquetá. A navegação pela baía é extremamente tranquila, sem ondas, o que torna o passeio confortável até para quem não tem experiência no mar.', 'Among the highlights are the beaches near Fortaleza de Sao Joao, Praia de Adao e Eva in Niteroi, and the small sand strips along Ilha de Paqueta. Sailing through the bay is extremely calm, without waves, making the trip comfortable even for those with no sea experience.'],
      ['<strong>Distância da Marina:</strong> varia de 10 a 30 minutos', '<strong>Distance from the Marina:</strong> varies from 10 to 30 minutes'],
      ['<strong>Destaques:</strong> águas calmas, praias reservadas, cenário histórico', '<strong>Highlights:</strong> calm waters, secluded beaches, historic scenery'],
      ['<strong>Ideal para:</strong> passeios em casal, quem prefere mar calmo, iniciantes no mar', '<strong>Ideal for:</strong> couples, those who prefer calm seas, first-time sailors'],
      // Tips section
      ['Dicas Práticas para Seu Passeio de Lancha', 'Practical Tips for Your Boat Trip'],
      ['Melhor época e horário', 'Best season and time'],
      ['Os meses de <strong>outubro a abril</strong> oferecem as melhores condições de mar e clima no Rio de Janeiro. Prefira sair pela manhã cedo (entre 8h e 9h) para aproveitar o mar mais calmo e a luz ideal para fotos. Passeios no fim da tarde também são incríveis para ver o pôr do sol a bordo.', 'The months from <strong>October to April</strong> offer the best sea and weather conditions in Rio de Janeiro. We recommend departing early in the morning (between 8am and 9am) to enjoy the calmest seas and ideal light for photos. Late afternoon trips are also amazing for watching the sunset on board.'],
      ['O que levar', 'What to bring'],
      ['<strong>Protetor solar</strong> resistente à água (fator 50 ou mais)', '<strong>Sunscreen</strong> water-resistant (SPF 50 or higher)'],
      ['<strong>Roupa de banho</strong> e uma muda de roupa seca', '<strong>Swimwear</strong> and a change of dry clothes'],
      ['<strong>Toalha</strong> e óculos de sol com cordinha', '<strong>Towel</strong> and sunglasses with a strap'],
      ['<strong>Bebidas e petiscos</strong> -- a lancha tem cooler (gelo não incluso)', '<strong>Drinks and snacks</strong> -- the boat has a cooler (ice not included)'],
      ['<strong>Caixa de som?</strong> Não precisa -- todas as lanchas têm som Bluetooth', '<strong>Speaker?</strong> No need -- all boats have Bluetooth sound system'],
      ['<strong>Equipamento de snorkeling</strong> (para as Ilhas Cagarras)', '<strong>Snorkeling gear</strong> (for Ilhas Cagarras)'],
      ['Qual lancha escolher', 'Which boat to choose'],
      ['A escolha da lancha depende do tamanho do grupo e do roteiro desejado. Para grupos de até 15 pessoas, a <strong>WeBoat 32</strong> oferece o melhor custo-benefício, a partir de R$ 2.300. Para grupos maiores (até 22 pessoas), a <strong>Rio Star 50</strong> é a opção ideal. Todas as lanchas da WeBoat incluem combustível, marinheiro, coolers, sistema de som e equipamentos de segurança.', 'The choice of boat depends on the group size and desired route. For groups of up to 15 people, the <strong>WeBoat 32</strong> offers the best value, starting at R$ 2,300. For larger groups (up to 22 people), the <strong>Rio Star 50</strong> is the ideal option. All WeBoat boats include fuel, skipper, coolers, sound system, and safety equipment.'],
      ['Dica: se quiser churrasco a bordo, todas as nossas lanchas possuem churrasqueira. Basta contratar o serviço adicional e a gente organiza tudo para você.', 'Tip: if you want a barbecue on board, all our boats have a grill. Just book the additional service and we will organize everything for you.'],
      // CTA box
      ['Pronto para Conhecer Essas Praias?', 'Ready to Discover These Beaches?'],
      ['Escolha seu roteiro e reserve sua lancha. Passeios de 5 horas saindo da Marina da Glória, com tudo incluso.', 'Choose your route and book your boat. 5-hour trips departing from Marina da Gloria, all-inclusive.'],
      ['Agendar pelo WhatsApp', 'Book via WhatsApp'],
      ['Ver Roteiros', 'View Routes'],
      // Related articles
      ['Leia Também', 'Read Also'],
      ['O Que Vestir num Passeio de Lancha: Guia Completo', 'What to Wear on a Boat Trip: Complete Guide'],
      ['Guia prático de como se vestir para um passeio de lancha no Rio. O que levar, o que evitar e dicas de proteção solar.', 'Practical guide on how to dress for a boat trip in Rio. What to bring, what to avoid, and sun protection tips.'],
      ['Ler artigo', 'Read article'],
      ['Guia da Marina da Glória: Tudo que Você Precisa Saber', 'Marina da Gloria Guide: Everything You Need to Know'],
      ['Tudo sobre a Marina da Glória: como chegar, estacionamento, o que esperar no dia do passeio e dicas para aproveitar ao máximo.', 'Everything about Marina da Gloria: how to get there, parking, what to expect on trip day, and tips to make the most of it.'],
      // Bottom CTA
      ['Pronto para Seu Passeio de Lancha?', 'Ready for Your Boat Trip?'],
      ['Escolha sua lancha, roteiro e serviços extras. Passeios a partir de R$ 2.300 com tudo incluso.', 'Choose your boat, route, and extras. Trips starting at R$ 2,300 all-inclusive.'],
    ],
  },
  {
    ptPath: 'blog/o-que-vestir-passeio-lancha/index.html',
    enPath: 'en/blog/what-to-wear-boat-trip/index.html',
    title: 'What to Wear on a Boat Trip in Rio de Janeiro | WeBoat Blog',
    description: 'Complete guide on what to wear for a boat trip in Rio. Clothing tips, sunscreen, shoes, and essential items.',
    keywords: 'what to wear boat trip, boat trip outfit, clothing boat rio',
    waMessage: 'Hello! I would like information about what to bring on the boat trip. [via site - en]',
    css: null,
    contentBlocks: [
      // Hero alt text (full string to prevent mixed PT/EN)
      ['Grupo de amigas de biquíni e acessórios relaxando no solário da lancha durante passeio no Rio de Janeiro', 'Group of friends in bikinis and accessories relaxing on the sun deck of the boat during a trip in Rio de Janeiro'],
      // Cross-reference alt texts (shared across blog pages)
      ['Lanchas ancoradas na Praia Vermelha com Morro da Urca ao fundo', 'Boats anchored at Praia Vermelha with Morro da Urca in the background'],
      ['Amigas de biquíni relaxando no solário da lancha', 'Friends in bikinis relaxing on the sun deck of the boat'],
      // Schema.org (long strings FIRST to prevent shorter substrings from corrupting them)
      ['"headline": "O Que Vestir num Passeio de Lancha: Guia Completo"', '"headline": "What to Wear on a Boat Trip: Complete Guide"'],
      ['"description": "Descubra o que vestir num passeio de lancha no Rio de Janeiro. Roupas, calçados, proteção solar e o que evitar."', '"description": "Complete guide on what to wear for a boat trip in Rio de Janeiro. Clothing tips, sunscreen, shoes, and essential items."'],
      ['"name": "O Que Vestir num Passeio de Lancha"', '"name": "What to Wear on a Boat Trip"'],
      // Title (must come BEFORE shorter 'O Que Vestir' breadcrumb)
      ['O Que Vestir num Passeio de Lancha: Guia Completo', 'What to Wear on a Boat Trip: Complete Guide'],
      // Breadcrumb
      ['O Que Vestir', 'What to Wear'],
      // Meta
      ['Dicas', 'Tips'],
      ['Fevereiro 2026', 'February 2026'],
      ['4 min de leitura', '4 min read'],
      // Article body
      ['Se essa vai ser a sua primeira vez num passeio de lancha, uma dúvida muito comum é: <strong>"o que eu visto?"</strong>. A resposta é mais simples do que parece, mas alguns detalhes fazem toda a diferença entre curtir o passeio com conforto ou passar o dia todo se ajeitando. Preparamos este guia completo para você não errar na escolha e aproveitar cada minuto no mar do Rio de Janeiro.', 'If this is going to be your first time on a boat trip, a very common question is: <strong>"what do I wear?"</strong>. The answer is simpler than it seems, but a few details make all the difference between enjoying the trip in comfort or spending the whole day adjusting your clothes. We have prepared this complete guide so you can make the right choice and enjoy every minute on the Rio de Janeiro sea.'],
      // Section 1
      ['Roupas de Banho: o Básico que Não Pode Faltar', 'Swimwear: The Essentials You Cannot Miss'],
      ['A regra número um é: <strong>vista-se como se fosse à praia</strong>. O passeio de lancha envolve sol, vento, mar e, claro, muita diversão na água. Por isso, a base do look deve ser a roupa de banho.', 'Rule number one: <strong>dress as if you were going to the beach</strong>. A boat trip involves sun, wind, sea, and of course, lots of fun in the water. That is why swimwear should be the base of your outfit.'],
      ['<strong>Mulheres:</strong> biquíni ou maiô. Leve uma saída de praia ou canga para usar como cobertura quando quiser.', '<strong>Women:</strong> bikini or one-piece swimsuit. Bring a cover-up or sarong to use when you want.'],
      ['<strong>Homens:</strong> sunga ou bermuda de banho (dê preferência às de tecido de secagem rápida).', '<strong>Men:</strong> swim trunks or board shorts (quick-dry fabric is preferred).'],
      ['A canga é a peça coringa do passeio. Funciona como toalha, saída de praia, proteção contra o vento e até como assento. Se levar apenas um acessório extra, que seja a canga.', 'The sarong is the ultimate versatile item for the trip. It works as a towel, cover-up, wind protection, and even as a seat. If you bring only one extra accessory, make it the sarong.'],
      // Section 2
      ['Calçados: Conforto e Segurança a Bordo', 'Footwear: Comfort and Safety on Board'],
      ['O piso da lancha pode ficar molhado e escorregadio, então a escolha do calçado é importante para sua segurança.', 'The boat deck can get wet and slippery, so your choice of footwear is important for your safety.'],
      ['<strong>Use:</strong> chinelo de dedo, papete ou sandália de borracha com solado antiderrapante.', '<strong>Wear:</strong> flip-flops, sport sandals, or rubber sandals with non-slip soles.'],
      ['<strong>Evite:</strong> sapatos fechados, tênis, sapatilhas e qualquer calçado que escorregue quando molhado.', '<strong>Avoid:</strong> closed shoes, sneakers, flats, and any footwear that slips when wet.'],
      ['A maioria dos nossos passageiros opta por chinelo simples, e funciona perfeitamente. O importante é que o solado grude no piso mesmo com água.', 'Most of our passengers opt for simple flip-flops, and they work perfectly. The important thing is that the sole grips the deck even when wet.'],
      // Section 3
      ['Proteção Solar: Indispensável no Mar', 'Sun Protection: Essential at Sea'],
      ['No mar, a exposição ao sol é ainda mais intensa por causa da reflexão da água. Não subestime: mesmo em dias nublados, o sol no Rio queima. Monte seu kit de proteção:', 'At sea, sun exposure is even more intense due to water reflection. Do not underestimate it: even on cloudy days, the Rio sun burns. Put together your protection kit:'],
      ['<strong>Protetor solar FPS 50+</strong> (de preferência resistente à água). Reaplique a cada 2 horas.', '<strong>SPF 50+ sunscreen</strong> (preferably water-resistant). Reapply every 2 hours.'],
      ['<strong>Chapéu, viseira ou boné</strong> para proteger o rosto e a cabeça do sol direto.', '<strong>Hat, visor, or cap</strong> to protect your face and head from direct sun.'],
      ['<strong>Óculos de sol</strong> com proteção UV. Dica: use um cordão preso aos óculos para não perder no mar.', '<strong>Sunglasses</strong> with UV protection. Tip: use a strap attached to your glasses so you do not lose them in the sea.'],
      ['<strong>Camisa UV</strong> (opcional, mas recomendada para quem tem pele sensível ou vai ficar muitas horas embarcado).', '<strong>UV shirt</strong> (optional, but recommended for those with sensitive skin or who will be on board for many hours).'],
      // Section 4
      ['O Que Evitar: Erros Comuns de Primeira Viagem', 'What to Avoid: Common First-Timer Mistakes'],
      ['Alguns itens que parecem boa ideia em terra acabam sendo um problema a bordo. Fique atento:', 'Some items that seem like a good idea on land end up being a problem on board. Pay attention:'],
      ['<strong>Salto alto:</strong> totalmente impraticável e perigoso no piso da lancha.', '<strong>High heels:</strong> totally impractical and dangerous on the boat deck.'],
      ['<strong>Roupa de festa:</strong> vestidos longos, ternos, roupas de tecido delicado. Vão molhar, amassar e estragar.', '<strong>Party clothes:</strong> long dresses, suits, delicate fabrics. They will get wet, wrinkled, and ruined.'],
      ['<strong>Excesso de joias:</strong> correntes, anéis e brincos delicados podem cair na água e se perder para sempre. Deixe em casa.', '<strong>Too much jewelry:</strong> chains, rings, and delicate earrings can fall in the water and be lost forever. Leave them at home.'],
      ['<strong>Roupas escuras e pesadas:</strong> absorvem mais calor e demoram para secar. Prefira cores claras e tecidos leves.', '<strong>Dark and heavy clothing:</strong> absorbs more heat and takes longer to dry. Prefer light colors and lightweight fabrics.'],
      // Section 5
      ['Para Festas e Eventos: Dress Code Temático', 'For Parties and Events: Themed Dress Code'],
      // NOTE: PT side uses EN URLs because step 16 (link replacement) runs BEFORE contentBlocks
      ['Se o seu passeio é uma <a href="/en/bachelorette-party/">despedida de solteira</a>, <a href="/en/birthday-party/">aniversário</a> ou evento especial, o dress code pode ser diferente, mas a regra de ouro permanece: <strong>conforto no mar vem primeiro</strong>.', 'If your trip is a <a href="/en/bachelorette-party/">bachelorette party</a>, <a href="/en/birthday-party/">birthday</a>, or special event, the dress code may be different, but the golden rule remains: <strong>comfort at sea comes first</strong>.'],
      ['<strong>Despedida de solteira:</strong> combinar cor do biquíni, tiara, camisetas personalizadas. Funciona e fica lindo nas fotos.', '<strong>Bachelorette party:</strong> matching bikini colors, tiaras, custom t-shirts. It works and looks great in photos.'],
      ['<strong>Aniversários:</strong> looks combinando, acessórios temáticos, chapéus estilizados. Tudo leve e prático.', '<strong>Birthdays:</strong> matching outfits, themed accessories, stylish hats. Everything lightweight and practical.'],
      ['<strong>Eventos corporativos:</strong> bermuda/short e camisa polo ou camiseta da empresa. Nada formal demais.', '<strong>Corporate events:</strong> shorts and polo shirt or company t-shirt. Nothing too formal.'],
      ['O segredo é combinar o tema com roupas leves e que possam molhar sem problema. Deixe o look mais produzido para a foto no pier antes de embarcar.', 'The secret is to combine the theme with lightweight clothes that can get wet without a problem. Save the more polished look for the photo on the pier before boarding.'],
      // Section 6
      ['O Que Levar na Bolsa', 'What to Pack in Your Bag'],
      ['Uma bolsa pequena e impermeável resolve tudo. Aqui vai a lista do que não pode faltar:', 'A small waterproof bag solves everything. Here is the list of must-haves:'],
      ['<strong>Toalha:</strong> uma de rosto basta se o espaço for curto.', '<strong>Towel:</strong> a face towel is enough if space is limited.'],
      ['<strong>Roupa extra:</strong> um conjunto seco para vestir no desembarque.', '<strong>Extra clothes:</strong> a dry outfit to change into when disembarking.'],
      ['<strong>Necessaire:</strong> protetor solar extra, protetor labial, remédio para enjoo (se necessário).', '<strong>Toiletry bag:</strong> extra sunscreen, lip balm, motion sickness medication (if needed).'],
      ['<strong>Bolsa ou case impermeável</strong> para celular e documentos.', '<strong>Waterproof bag or case</strong> for your phone and documents.'],
      // Section 7
      ['Fique Tranquilo: a Lancha Já Tem Tudo', 'Relax: The Boat Already Has Everything'],
      ['Na WeBoat, nossas lanchas já contam com tudo que você precisa para um passeio completo:', 'At WeBoat, our boats already come with everything you need for a complete trip:'],
      ['<strong>Sistema de som Bluetooth</strong> para sua playlist favorita.', '<strong>Bluetooth sound system</strong> for your favorite playlist.'],
      ['<strong>Coolers</strong> para manter suas bebidas geladas.', '<strong>Coolers</strong> to keep your drinks cold.'],
      ['<strong>Tapete e macarrões flutuantes</strong> para curtir a parada no mar.', '<strong>Floating mat and pool noodles</strong> to enjoy the stop at sea.'],
      ['<strong>Churrasqueira</strong> disponível em todas as lanchas (taxa adicional).', '<strong>Grill</strong> available on all boats (additional fee).'],
      ['<strong>Marinheiro experiente</strong> que cuida de tudo para você só aproveitar.', '<strong>Experienced skipper</strong> who takes care of everything so you just enjoy.'],
      ['Ou seja, você não precisa se preocupar com equipamentos, música ou estrutura. A única coisa que você precisa trazer é <strong>disposição para se divertir</strong> (e o protetor solar).', 'In other words, you do not need to worry about equipment, music, or infrastructure. The only thing you need to bring is <strong>a willingness to have fun</strong> (and sunscreen).'],
      // CTA box
      ['Pronto para Seu Passeio de Lancha?', 'Ready for Your Boat Trip?'],
      ['Agora que você já sabe o que vestir, é só escolher a lancha e o roteiro. Passeios a partir de R$ 2.300 com tudo incluso, saindo da Marina da Glória.', 'Now that you know what to wear, just choose the boat and the route. Trips starting at R$ 2,300 all-inclusive, departing from Marina da Gloria.'],
      ['Reservar pelo WhatsApp', 'Book via WhatsApp'],
      // Related articles
      ['Leia Também', 'Read Also'],
      ['Melhores Praias para Visitar de Lancha no RJ', 'Best Beaches to Visit by Boat in Rio'],
      ['Descubra as praias mais bonitas do Rio de Janeiro que só são acessíveis (ou muito melhores) de lancha.', 'Discover the most beautiful beaches in Rio de Janeiro that are only accessible (or much better) by boat.'],
      ['Ler artigo', 'Read article'],
      ['Guia da Marina da Glória: Tudo que Você Precisa Saber', 'Marina da Gloria Guide: Everything You Need to Know'],
      ['Tudo sobre a Marina da Glória: como chegar, estacionamento, o que esperar no dia do passeio e dicas.', 'Everything about Marina da Gloria: how to get there, parking, what to expect on trip day, and tips.'],
      // Bottom CTA
      ['Escolha sua lancha, roteiro e serviços extras. Passeios a partir de R$ 2.300 com tudo incluso.', 'Choose your boat, route, and extras. Trips starting at R$ 2,300 all-inclusive.'],
    ],
  },
  {
    ptPath: 'blog/guia-marina-da-gloria/index.html',
    enPath: 'en/blog/marina-da-gloria-guide/index.html',
    title: 'Marina da Gloria Guide - How to Get There | WeBoat Blog',
    description: 'Complete guide to Marina da Gloria in Rio de Janeiro. How to get there, parking, what to expect on arrival.',
    keywords: 'marina da gloria guide, how to get to marina da gloria, marina gloria rio',
    waMessage: 'Hello! I would like directions to Marina da Gloria. [via site - en]',
    css: null,
    contentBlocks: [
      // Cross-reference alt texts (shared across blog pages)
      ['Lanchas ancoradas na Praia Vermelha com Morro da Urca ao fundo', 'Boats anchored at Praia Vermelha with Morro da Urca in the background'],
      ['Amigas de biquíni relaxando no solário da lancha', 'Friends in bikinis relaxing on the sun deck of the boat'],
      // *** LONG STRINGS FIRST — Schema.org description + cross-reference excerpt ***
      // (must come before ['Guia', 'Guide'] which would corrupt them)
      ['Guia completo da Marina da Glória no Rio de Janeiro: como chegar, estacionamento, infraestrutura e dicas para o dia do seu passeio de lancha com a WeBoat.', 'Complete guide to Marina da Gloria in Rio de Janeiro: how to get there, parking, infrastructure and tips for the day of your boat trip with WeBoat.'],
      ['Guia prático de como se vestir para um passeio de lancha no Rio. O que levar, o que evitar e dicas de proteção solar.', 'Practical guide on how to dress for a boat trip in Rio. What to bring, what to avoid, and sun protection tips.'],
      // *** Title and breadcrumb MUST come BEFORE short ['Guia', 'Guide'] ***
      ['Guia da Marina da Glória: Tudo que Você Precisa Saber', 'Marina da Gloria Guide: Everything You Need to Know'],
      // Breadcrumb visible + Schema
      ['Guia da Marina da Glória', 'Marina da Gloria Guide'],
      ['Guia Marina da Glória', 'Marina da Gloria Guide'],
      // Meta (short — will match remaining instances after title + breadcrumb are translated)
      ['Guia', 'Guide'],
      ['Fevereiro 2026', 'February 2026'],
      ['5 min de leitura', '5 min read'],
      // Article body
      ['Se você está planejando um passeio de lancha no Rio de Janeiro com a <strong>WeBoat Brasil</strong>, vai precisar conhecer a <strong>Marina da Glória</strong>. Esse é o ponto de partida de todos os nossos passeios, e entender como funciona o local vai tornar sua experiência muito mais tranquila e agradável. Neste guia, reunimos tudo que você precisa saber: como chegar, onde estacionar, o que esperar no dia e dicas práticas para aproveitar ao máximo.', 'If you are planning a boat trip in Rio de Janeiro with <strong>WeBoat Brasil</strong>, you will need to know <strong>Marina da Gloria</strong>. This is the departure point for all our trips, and understanding how the place works will make your experience much smoother and more enjoyable. In this guide, we have gathered everything you need to know: how to get there, where to park, what to expect on the day, and practical tips to make the most of it.'],
      // Location
      ['Localização: Onde Fica a Marina da Glória', 'Location: Where is Marina da Gloria'],
      ['A Marina da Glória está localizada no bairro da Glória, na Zona Sul do Rio de Janeiro, às margens da <strong>Baía de Guanabara</strong>. O endereço exato é <strong>Av. Infante Dom Henrique, S/N - Glória, Rio de Janeiro - RJ, CEP 20021-140</strong>. A marina fica dentro do complexo do Aterro do Flamengo, um dos cartões-postais da cidade, com vista privilegiada para o Pão de Açúcar e o Morro da Urca.', 'Marina da Gloria is located in the Gloria neighborhood, in the South Zone of Rio de Janeiro, on the shores of <strong>Guanabara Bay</strong>. The exact address is <strong>Av. Infante Dom Henrique, S/N - Gloria, Rio de Janeiro - RJ, CEP 20021-140</strong>. The marina is inside the Aterro do Flamengo complex, one of the city\'s landmarks, with a privileged view of Sugarloaf Mountain and Morro da Urca.'],
      ['A localização é estratégica: de lá, as lanchas têm acesso rápido aos principais pontos turísticos do litoral carioca, como a Mureta da Urca, a Praia Vermelha, Copacabana e as Ilhas Cagarras.', 'The location is strategic: from there, boats have quick access to the main tourist spots along the Rio coastline, such as Mureta da Urca, Praia Vermelha, Copacabana, and Ilhas Cagarras.'],
      // How to get there
      ['Como Chegar à Marina da Glória', 'How to Get to Marina da Gloria'],
      ['Existem várias formas de chegar à Marina da Glória, e todas são relativamente simples. Veja as opções:', 'There are several ways to get to Marina da Gloria, and all are relatively simple. Here are the options:'],
      ['De carro', 'By car'],
      ['Se você vem da Zona Sul, siga pelo <strong>Aterro do Flamengo em direção ao Centro</strong>. A entrada da Marina fica à direita, bem sinalizada. Quem vem do Centro ou da Zona Norte pode acessar pelo mesmo Aterro, sentido Zona Sul. Coloque "Marina da Glória" no GPS ou aplicativo de navegação e siga as indicações.', 'If you are coming from the South Zone, follow <strong>Aterro do Flamengo towards Downtown</strong>. The Marina entrance is on the right, well signposted. If coming from Downtown or the North Zone, access via the same Aterro towards the South Zone. Enter "Marina da Gloria" in your GPS or navigation app and follow the directions.'],
      ['De metrô', 'By metro'],
      ['A estação mais próxima é a <strong>Estação Glória</strong>, na Linha 1 (laranja). De lá, são aproximadamente <strong>10 minutos de caminhada</strong> até a marina. O trajeto é plano e agradável, passando por uma das áreas mais bonitas do Aterro do Flamengo.', 'The nearest station is <strong>Gloria Station</strong>, on Line 1 (orange). From there, it is approximately a <strong>10-minute walk</strong> to the marina. The route is flat and pleasant, passing through one of the most beautiful areas of Aterro do Flamengo.'],
      ['De Uber ou 99', 'By Uber or 99'],
      ['A forma mais prática para a maioria das pessoas. Basta colocar <strong>"Marina da Glória"</strong> como destino no aplicativo. Os motoristas conhecem bem o local, e o desembarque é feito na entrada da marina. Dica: combinem um ponto de encontro com o grupo para facilitar a chegada de todos.', 'The most practical way for most people. Simply enter <strong>"Marina da Gloria"</strong> as your destination in the app. Drivers know the location well, and drop-off is at the marina entrance. Tip: agree on a meeting point with your group to make everyone\'s arrival easier.'],
      // Parking
      ['Estacionamento na Marina da Glória', 'Parking at Marina da Gloria'],
      ['A Marina da Glória conta com <strong>estacionamento próprio</strong>, o que é uma grande vantagem para quem vai de carro. O preço médio gira em torno de <strong>R$ 30 a R$ 50 para o dia inteiro</strong>, dependendo do horário e do período. Nos fins de semana e feriados, o movimento pode ser maior, então recomendamos chegar com antecedência para garantir uma vaga.', 'Marina da Gloria has its own <strong>parking lot</strong>, which is a great advantage for those driving. The average price is around <strong>R$ 30 to R$ 50 for the full day</strong>, depending on the time and period. On weekends and holidays, it can be busier, so we recommend arriving early to secure a spot.'],
      ['Para quem prefere não dirigir, os aplicativos de transporte são a melhor alternativa, especialmente se o grupo pretende consumir bebidas durante o passeio.', 'For those who prefer not to drive, ride-hailing apps are the best alternative, especially if the group plans to have drinks during the trip.'],
      // WeBoat location
      ['Onde Fica a WeBoat na Marina', 'Where is WeBoat at the Marina'],
      ['A <strong>WeBoat Brasil</strong> está localizada na <strong>Loja 06</strong> da Marina da Glória. Ao entrar na marina, siga pelas lojas do complexo comercial. Nossa equipe estará de camiseta da WeBoat, pronta para receber você. Se tiver qualquer dificuldade para nos encontrar, basta ligar para o nosso WhatsApp <strong>(21) 97772-4114</strong> que orientamos na hora.', '<strong>WeBoat Brasil</strong> is located at <strong>Shop 06</strong> at Marina da Gloria. When entering the marina, follow the shops in the commercial complex. Our team will be wearing WeBoat t-shirts, ready to welcome you. If you have any difficulty finding us, just call our WhatsApp <strong>(21) 97772-4114</strong> and we will guide you right away.'],
      // What to expect
      ['O Que Esperar no Dia do Passeio', 'What to Expect on Trip Day'],
      ['Para que tudo corra perfeitamente, veja o passo a passo do que acontece quando você chega para o seu passeio:', 'For everything to go perfectly, here is the step-by-step of what happens when you arrive for your trip:'],
      ['<strong>Chegue 15 minutos antes</strong> do horário agendado. Isso garante tempo para o check-in sem correria.', '<strong>Arrive 15 minutes before</strong> the scheduled time. This ensures time for check-in without rushing.'],
      ['<strong>Check-in com a equipe WeBoat:</strong> nossa equipe confere a reserva, tira dúvidas de última hora e organiza os pertences do grupo.', '<strong>Check-in with the WeBoat team:</strong> our team verifies the reservation, answers last-minute questions, and organizes the group\'s belongings.'],
      ['<strong>Coletes e instruções de segurança:</strong> todos recebem colete salva-vidas e orientações básicas de segurança a bordo. A segurança é prioridade em todos os nossos passeios.', '<strong>Life jackets and safety instructions:</strong> everyone receives a life jacket and basic on-board safety guidelines. Safety is a priority on all our trips.'],
      ['<strong>Embarque no pier:</strong> a equipe acompanha o grupo até a lancha, auxilia no embarque e apresenta o marinheiro que conduzirá o passeio.', '<strong>Boarding at the pier:</strong> the team accompanies the group to the boat, assists with boarding, and introduces the skipper who will lead the trip.'],
      ['A partir daí, é só curtir. O marinheiro conhece todos os melhores pontos do litoral carioca e vai garantir que o passeio seja inesquecível.', 'From there, just enjoy. The skipper knows all the best spots along the Rio coastline and will ensure the trip is unforgettable.'],
      // Infrastructure
      ['Infraestrutura da Marina da Glória', 'Marina da Gloria Infrastructure'],
      ['A Marina da Glória é muito mais do que um ponto de embarque. O complexo oferece uma infraestrutura completa para antes e depois do seu passeio:', 'Marina da Gloria is much more than a boarding point. The complex offers full infrastructure for before and after your trip:'],
      ['<strong>Restaurantes e bares:</strong> há diversas opções gastronômicas no entorno da marina, ideais para um almoço antes do embarque ou um jantar após o passeio.', '<strong>Restaurants and bars:</strong> there are several dining options around the marina, ideal for lunch before boarding or dinner after the trip.'],
      ['<strong>Banheiros:</strong> a marina conta com banheiros disponíveis para uso dos visitantes.', '<strong>Restrooms:</strong> the marina has restrooms available for visitors.'],
      ['<strong>Parque do Flamengo:</strong> o maior parque urbano à beira-mar do mundo está literalmente ao lado. Vale chegar mais cedo para uma caminhada ou aproveitar o espaço com as crianças.', '<strong>Flamengo Park:</strong> the largest urban waterfront park in the world is literally next door. It is worth arriving early for a walk or to enjoy the space with children.'],
      ['<strong>Vista panorâmica:</strong> mesmo antes de embarcar, a vista da Baía de Guanabara, do Pão de Açúcar e do Cristo Redentor já vale o passeio.', '<strong>Panoramic view:</strong> even before boarding, the view of Guanabara Bay, Sugarloaf Mountain, and Christ the Redeemer is already worth the trip.'],
      // Tips
      ['Dicas Práticas para o Dia do Passeio', 'Practical Tips for Trip Day'],
      ['Para aproveitar ao máximo sua experiência na lancha, separamos algumas dicas essenciais:', 'To make the most of your boat experience, here are some essential tips:'],
      ['<strong>Protetor solar:</strong> indispensável. O sol no mar é muito mais intenso do que na cidade. Leve protetor de alto fator (FPS 50+) e reaplique ao longo do passeio.', '<strong>Sunscreen:</strong> essential. The sun at sea is much more intense than in the city. Bring high-factor sunscreen (SPF 50+) and reapply throughout the trip.'],
      ['<strong>Roupas leves:</strong> vista roupas confortáveis e leves. Biquíni, sunga ou roupa de banho por baixo, com uma saída de praia ou camiseta por cima.', '<strong>Light clothing:</strong> wear comfortable, lightweight clothes. Bikini, swim trunks, or swimwear underneath, with a cover-up or t-shirt on top.'],
      ['<strong>Bebidas e comida:</strong> você pode levar suas próprias bebidas e petiscos para o cooler da lancha (gelo não incluso). Se preferir praticidade, consulte nosso <a href="/en/services/">serviço de open bar, churrasco e decoração</a>.', '<strong>Drinks and food:</strong> you can bring your own drinks and snacks for the boat\'s cooler (ice not included). For convenience, check our <a href="/en/services/">open bar, barbecue, and decoration service</a>.'],
      ['<strong>Toalha e troca de roupa:</strong> leve uma toalha e uma muda de roupa seca para o retorno.', '<strong>Towel and change of clothes:</strong> bring a towel and a dry change of clothes for the return.'],
      ['<strong>Calçado adequado:</strong> chinelo ou sapatilha de neoprene são ideais. Evite sapatos com salto ou sola escura que possam marcar o deck.', '<strong>Proper footwear:</strong> flip-flops or neoprene shoes are ideal. Avoid heeled shoes or dark-soled shoes that may mark the deck.'],
      ['<strong>Pertences eletrônicos:</strong> leve o celular em uma capinha à prova d\'água. Câmeras e drones são bem-vindos, mas sempre com cuidado redobrado perto da água.', '<strong>Electronics:</strong> bring your phone in a waterproof case. Cameras and drones are welcome, but always with extra care near the water.'],
      ['Dica da equipe WeBoat: se for a primeira vez do grupo em um passeio de lancha, relaxe. Nossa equipe cuida de tudo para que vocês só precisem se preocupar em curtir.', 'WeBoat team tip: if it is the group\'s first time on a boat trip, relax. Our team takes care of everything so you only need to worry about having fun.'],
      // Reserve section
      ['Reserve Seu Passeio na Marina da Glória', 'Book Your Trip at Marina da Gloria'],
      ['Agora que você já sabe tudo sobre a Marina da Glória, está na hora de reservar seu passeio. A <strong>WeBoat Brasil</strong> oferece lanchas para grupos de 10 a 65 pessoas, com roteiros a partir de R$ 2.300 por 5 horas de passeio. Todos os passeios incluem combustível, marinheiro experiente, coolers, sistema de som Bluetooth, coletes salva-vidas e seguro obrigatório.', 'Now that you know everything about Marina da Gloria, it is time to book your trip. <strong>WeBoat Brasil</strong> offers boats for groups of 10 to 65 people, with routes starting at R$ 2,300 for 5 hours. All trips include fuel, experienced skipper, coolers, Bluetooth sound system, life jackets, and mandatory insurance.'],
      ['Fale com a gente pelo WhatsApp e monte o passeio perfeito para o seu grupo:', 'Contact us via WhatsApp and put together the perfect trip for your group:'],
      // CTA box
      ['Pronto para Conhecer o Rio de Lancha?', 'Ready to Explore Rio by Boat?'],
      ['Fale com nossa equipe e reserve seu passeio saindo da Marina da Glória. Atendimento todos os dias, das 8h às 20h.', 'Talk to our team and book your trip departing from Marina da Gloria. Open every day, 8am to 8pm.'],
      ['Reservar pelo WhatsApp', 'Book via WhatsApp'],
      // Related articles
      ['Leia Também', 'Read Also'],
      ['Melhores Praias para Visitar de Lancha no RJ', 'Best Beaches to Visit by Boat in Rio'],
      ['Descubra as praias mais bonitas do Rio de Janeiro que só são acessíveis (ou muito melhores) de lancha. Da Praia Vermelha às Ilhas Cagarras.', 'Discover the most beautiful beaches in Rio de Janeiro that are only accessible (or much better) by boat. From Praia Vermelha to Ilhas Cagarras.'],
      ['Ler artigo', 'Read article'],
      ['O Que Vestir num Passeio de Lancha: Guia Completo', 'What to Wear on a Boat Trip: Complete Guide'],
      ['Guia prático de como se vestir para um passeio de lancha no Rio. O que levar, o que evitar e dicas de proteção solar.', 'Practical guide on how to dress for a boat trip in Rio. What to bring, what to avoid, and sun protection tips.'],
      // Bottom CTA
      ['Pronto para Seu Passeio de Lancha?', 'Ready for Your Boat Trip?'],
      ['Escolha sua lancha, roteiro e serviços extras. Passeios a partir de R$ 2.300 com tudo incluso.', 'Choose your boat, route, and extras. Trips starting at R$ 2,300 all-inclusive.'],
    ],
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
    contentBlocks: [
      // LONG PARAGRAPHS FIRST — contain "Política de Privacidade" which the short entry below would corrupt
      ['A WeBoat Brasil reserva-se o direito de alterar esta Política de Privacidade a qualquer momento. As alterações entram em vigor imediatamente após publicação no site. Recomendamos a leitura periódica desta página.', 'WeBoat Brasil reserves the right to change this Privacy Policy at any time. Changes take effect immediately upon publication on the website. We recommend periodically reviewing this page.'],
      ['9. Alterações nesta Política', '9. Changes to this Policy'],
      // Breadcrumb
      ['Política de Privacidade', 'Privacy Policy'],
      // Header
      ['Última atualização: Fevereiro de 2026', 'Last updated: February 2026'],
      // Intro
      ['A WeBoat Brasil está comprometida com a proteção dos seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).', 'WeBoat Brasil is committed to protecting your personal data, in compliance with the Brazilian General Data Protection Law (LGPD - Law No. 13,709/2018).'],
      // Section 1
      ['1. Informações que Coletamos', '1. Information We Collect'],
      ['Coletamos dados pessoais que você nos fornece diretamente ao entrar em contato conosco:', 'We collect personal data that you provide directly when contacting us:'],
      ['<strong>Dados de identificação:</strong> nome, telefone e e-mail', '<strong>Identification data:</strong> name, phone number, and email'],
      ['<strong>Dados da reserva:</strong> data desejada, lancha de interesse, número de convidados, serviços adicionais e preferências de passeio', '<strong>Reservation data:</strong> desired date, boat of interest, number of guests, additional services, and trip preferences'],
      ['<strong>Dados de pagamento:</strong> comprovantes de PIX ou transferência (não armazenamos dados de cartão de crédito)', '<strong>Payment data:</strong> PIX or transfer receipts (we do not store credit card data)'],
      ['<strong>Comunicações:</strong> mensagens trocadas via WhatsApp e formulário do site', '<strong>Communications:</strong> messages exchanged via WhatsApp and the website form'],
      ['1.1. Dados Coletados Automaticamente', '1.1. Data Collected Automatically'],
      ['Ao navegar em nosso site, coletamos automaticamente:', 'When browsing our website, we automatically collect:'],
      ['<strong>Cookies e tecnologias similares:</strong> utilizamos o Google Tag Manager (GTM) para gerenciar ferramentas de análise e marketing', '<strong>Cookies and similar technologies:</strong> we use Google Tag Manager (GTM) to manage analytics and marketing tools'],
      ['<strong>Dados de navegação:</strong> páginas visitadas, tempo de permanência, dispositivo e navegador utilizados', '<strong>Browsing data:</strong> pages visited, time spent, device and browser used'],
      ['<strong>Dados de localização aproximada:</strong> com base no endereço IP', '<strong>Approximate location data:</strong> based on IP address'],
      // Section 2
      ['2. Como Usamos suas Informações', '2. How We Use Your Information'],
      ['Utilizamos suas informações para as seguintes finalidades:', 'We use your information for the following purposes:'],
      ['Processar suas reservas e solicitações de passeio', 'Process your reservations and trip requests'],
      ['Entrar em contato para confirmar detalhes do passeio', 'Contact you to confirm trip details'],
      ['Enviar follow-ups e informações relevantes sobre sua reserva', 'Send follow-ups and relevant information about your reservation'],
      ['Melhorar nossos serviços e a experiência do cliente', 'Improve our services and customer experience'],
      ['Analisar o desempenho do site e campanhas de marketing', 'Analyze website performance and marketing campaigns'],
      ['Cumprir obrigações legais e regulatórias', 'Comply with legal and regulatory obligations'],
      // Section 3
      ['3. Base Legal para o Tratamento', '3. Legal Basis for Processing'],
      ['Tratamos seus dados pessoais com base nas seguintes hipóteses legais da LGPD:', 'We process your personal data based on the following legal grounds under the LGPD:'],
      ['<strong>Execução de contrato:</strong> para processar reservas e prestar os serviços contratados', '<strong>Contract performance:</strong> to process reservations and provide contracted services'],
      ['<strong>Consentimento:</strong> para envio de comunicações de marketing e uso de cookies não essenciais', '<strong>Consent:</strong> for sending marketing communications and use of non-essential cookies'],
      ['<strong>Legítimo interesse:</strong> para melhorar nossos serviços e prevenir fraudes', '<strong>Legitimate interest:</strong> to improve our services and prevent fraud'],
      // Section 4
      ['4. Compartilhamento de Informações', '4. Information Sharing'],
      ['Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins de marketing. Podemos compartilhar dados com:', 'We do not sell, rent, or share your personal information with third parties for marketing purposes. We may share data with:'],
      ['<strong>Prestadores de serviço:</strong> empresas que nos auxiliam na operação (processamento de pagamentos, hospedagem do site, ferramentas de comunicação)', '<strong>Service providers:</strong> companies that assist us in operations (payment processing, website hosting, communication tools)'],
      ['<strong>Parceiros de embarcação:</strong> quando a reserva envolve uma lancha parceira, compartilhamos apenas os dados necessários para a realização do passeio', '<strong>Boat partners:</strong> when the reservation involves a partner boat, we share only the data necessary for the trip'],
      ['<strong>Autoridades competentes:</strong> quando exigido por lei ou determinação judicial', '<strong>Competent authorities:</strong> when required by law or court order'],
      // Section 5
      ['5. Cookies e Tecnologias de Rastreamento', '5. Cookies and Tracking Technologies'],
      ['Nosso site utiliza cookies e tecnologias similares gerenciados pelo Google Tag Manager. Isso pode incluir:', 'Our website uses cookies and similar technologies managed by Google Tag Manager. This may include:'],
      ['<strong>Google Analytics 4:</strong> análise de tráfego e comportamento no site', '<strong>Google Analytics 4:</strong> traffic and behavior analysis on the website'],
      ['<strong>Meta Pixel:</strong> mensuração de campanhas no Facebook e Instagram', '<strong>Meta Pixel:</strong> campaign measurement on Facebook and Instagram'],
      ['<strong>Google Ads:</strong> mensuração de campanhas de pesquisa', '<strong>Google Ads:</strong> search campaign measurement'],
      ['Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.', 'You can manage your cookie preferences through your browser settings.'],
      // Section 6
      ['6. Retenção de Dados', '6. Data Retention'],
      ['Seus dados pessoais são armazenados pelo tempo necessário para cumprir as finalidades descritas nesta política. Dados de reservas são mantidos por até 5 anos para fins fiscais e legais. Dados de marketing são mantidos até a revogação do consentimento.', 'Your personal data is stored for as long as necessary to fulfill the purposes described in this policy. Reservation data is kept for up to 5 years for tax and legal purposes. Marketing data is kept until consent is revoked.'],
      // Section 7
      ['7. Segurança', '7. Security'],
      ['Implementamos medidas técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, perda, alteração ou destruição, incluindo criptografia de dados em trânsito (HTTPS) e controle de acesso restrito.', 'We implement technical and organizational measures to protect your personal information against unauthorized access, loss, alteration, or destruction, including data encryption in transit (HTTPS) and restricted access control.'],
      // Section 8
      ['8. Seus Direitos (LGPD)', '8. Your Rights (LGPD)'],
      ['Conforme a LGPD, você tem direito a:', 'Under the LGPD, you have the right to:'],
      ['Confirmar a existência de tratamento dos seus dados', 'Confirm the existence of processing of your data'],
      ['Acessar seus dados pessoais', 'Access your personal data'],
      ['Corrigir dados incompletos, inexatos ou desatualizados', 'Correct incomplete, inaccurate, or outdated data'],
      ['Solicitar a eliminação dos dados tratados com consentimento', 'Request deletion of data processed with consent'],
      ['Revogar o consentimento a qualquer momento', 'Revoke consent at any time'],
      ['Solicitar a portabilidade dos dados', 'Request data portability'],
      ['Para exercer qualquer desses direitos, entre em contato pelo WhatsApp <a href="https://wa.me/5521977724114">(21) 97772-4114</a>. Responderemos em até 15 dias úteis.', 'To exercise any of these rights, contact us via WhatsApp <a href="https://wa.me/5521977724114">(21) 97772-4114</a>. We will respond within 15 business days.'],
      // Section 9 (moved to top of contentBlocks to avoid ordering issue)
      // Section 10
      ['10. Contato', '10. Contact'],
      ['Para dúvidas sobre esta política ou sobre o tratamento dos seus dados pessoais, entre em contato:', 'For questions about this policy or the processing of your personal data, please contact:'],
      ['Horário de atendimento: 8h às 20h', 'Business hours: 8am to 8pm'],
    ],
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
    contentBlocks: [
      // LONG PARAGRAPHS FIRST — contain "Termos de Uso" which the short entry below would corrupt
      ['Ao utilizar os serviços da WeBoat Brasil, você concorda com estes Termos de Uso. Se não concordar, por favor não utilize nossos serviços. A reserva de qualquer passeio implica aceitação integral destes termos.', 'By using WeBoat Brasil services, you agree to these Terms of Use. If you do not agree, please do not use our services. Booking any trip implies full acceptance of these terms.'],
      // Breadcrumb
      ['Termos de Uso', 'Terms of Use'],
      // Header
      ['Última atualização: Fevereiro de 2026', 'Last updated: February 2026'],
      // Section 1
      ['1. Aceitação dos Termos', '1. Acceptance of Terms'],
      // Section 2
      ['2. Serviços Oferecidos', '2. Services Offered'],
      ['A WeBoat Brasil oferece serviços de aluguel de lanchas para passeios privativos no Rio de Janeiro, com saída da Marina da Glória. Todos os passeios incluem marinheiro habilitado pela Marinha, combustível para o roteiro escolhido, coolers, som Bluetooth, tapete e macarrões flutuantes, coletes salva-vidas e seguro obrigatório.', 'WeBoat Brasil offers private boat rental services for trips in Rio de Janeiro, departing from Marina da Gloria. All trips include a Navy-licensed skipper, fuel for the chosen route, coolers, Bluetooth sound system, floating mat and pool noodles, life jackets, and mandatory insurance.'],
      ['Serviços opcionais como churrasco, open bar, decoração, DJ e fotógrafo podem ser contratados à parte.', 'Optional services such as barbecue, open bar, decoration, DJ, and photographer can be booked separately.'],
      // Section 3
      ['3. Reservas e Pagamento', '3. Reservations and Payment'],
      ['As reservas são feitas mediante confirmação via WhatsApp <a href="https://wa.me/5521977724114">(21) 97772-4114</a>', 'Reservations are made upon confirmation via WhatsApp <a href="https://wa.me/5521977724114">(21) 97772-4114</a>'],
      ['A reserva é confirmada com o pagamento de um <strong>sinal de 50% do valor total</strong>', 'The reservation is confirmed with a <strong>50% deposit of the total amount</strong>'],
      ['O pagamento restante (50%) deve ser efetuado até o momento do embarque', 'The remaining payment (50%) must be made by the time of boarding'],
      ['Formas de pagamento aceitas: PIX (preferencial, sem taxas), transferência bancária, cartão de crédito (até 12x com juros, taxas da operadora repassadas) e cartão de débito', 'Accepted payment methods: PIX (preferred, no fees), bank transfer, credit card (up to 12 installments with interest, processor fees applied), and debit card'],
      ['A reserva é feita em nome de um único contratante, responsável por todos os convidados a bordo', 'The reservation is made in the name of a single contractor, responsible for all guests on board'],
      // Section 4
      ['4. Cancelamento e Reagendamento', '4. Cancellation and Rescheduling'],
      ['O sinal de 50% garante a reserva da embarcação na data e horário escolhidos. Ao efetuar o pagamento do sinal, o cliente reconhece que:', 'The 50% deposit secures the boat reservation for the chosen date and time. By making the deposit payment, the customer acknowledges that:'],
      ['<strong>O sinal não dá direito a arrependimento</strong>, seja por motivos pessoais, familiares, de saúde ou qualquer outra razão', '<strong>The deposit is non-refundable</strong>, whether for personal, family, health, or any other reason'],
      ['A partir da confirmação da reserva, a lancha deixa de ser ofertada a outros interessados, gerando um custo operacional para a WeBoat Brasil', 'Once the reservation is confirmed, the boat is no longer offered to other interested parties, generating an operational cost for WeBoat Brasil'],
      ['<strong>Precisa cancelar ou reagendar?</strong> Entre em contato o quanto antes pelo WhatsApp. Nosso objetivo não é ficar com seu sinal. Se conseguirmos outro cliente para preencher sua data, liberamos o valor integral para estorno ou remarcação', '<strong>Need to cancel or reschedule?</strong> Contact us as soon as possible via WhatsApp. Our goal is not to keep your deposit. If we can find another client to fill your date, we will release the full amount for refund or rescheduling'],
      ['<strong>Não comparecimento (no-show):</strong> resulta na perda total do sinal, sem direito a reagendamento ou reembolso', '<strong>No-show:</strong> results in total loss of the deposit, with no right to rescheduling or refund'],
      // Section 4.1
      ['4.1. Condições Climáticas', '4.1. Weather Conditions'],
      ['A remarcação por motivo climático só é possível em caso de <strong>chuva forte</strong> que inviabilize a navegação no dia e horário do passeio', 'Rescheduling due to weather is only possible in case of <strong>heavy rain</strong> that makes navigation impossible on the trip day and time'],
      ['Tempo nublado ou chuva leve não geram direito a remarcação, pois as lanchas possuem toldo', 'Cloudy weather or light rain do not entitle rescheduling, as boats have a canopy'],
      ['Em caso de más condições de navegabilidade, o roteiro pode ser alterado automaticamente para a Baía de Guanabara', 'In case of poor navigability conditions, the route may be automatically changed to Guanabara Bay'],
      ['Previsão de chuva não é critério para cancelamento — a avaliação é feita com base nas condições reais no dia e horário do passeio', 'Rain forecast is not a criterion for cancellation -- the assessment is based on actual conditions on the trip day and time'],
      // Section 4.2
      ['4.2. Problemas com a Embarcação', '4.2. Boat Issues'],
      ['Em caso de problemas mecânicos ou técnicos com a embarcação contratada, a WeBoat Brasil disponibilizará opções similares ou superiores. Caso o cliente não aprove nenhuma das alternativas oferecidas, será realizada a devolução integral do valor pago.', 'In case of mechanical or technical issues with the booked vessel, WeBoat Brasil will provide similar or superior options. If the customer does not approve any of the alternatives offered, a full refund of the amount paid will be made.'],
      // Section 5
      ['5. Regras de Segurança', '5. Safety Rules'],
      ['Obedeça sempre às instruções do marinheiro — ele tem autoridade máxima a bordo', 'Always follow the skipper\'s instructions -- they have maximum authority on board'],
      ['O uso de coletes salva-vidas é obrigatório durante navegação em mar aberto', 'Life jacket use is mandatory during open sea navigation'],
      ['É proibido o uso de substâncias ilícitas a bordo', 'The use of illegal substances on board is prohibited'],
      ['O consumo de álcool deve ser moderado', 'Alcohol consumption must be moderate'],
      ['Crianças devem estar sempre acompanhadas de responsável', 'Children must always be accompanied by a guardian'],
      ['É proibido levar narguilé, fogos de artifício e confetes', 'Hookahs, fireworks, and confetti are prohibited'],
      ['Bronzeadores não são permitidos — use protetor solar', 'Tanning oils are not allowed -- use sunscreen'],
      ['A embarcação não pode atracar ao lado de outros barcos', 'The vessel cannot dock alongside other boats'],
      // Section 6
      ['6. Capacidade das Embarcações', '6. Vessel Capacity'],
      ['A capacidade máxima de cada lancha deve ser rigorosamente respeitada por questões de segurança e regulamentação marítima. <strong>Todos contam como passageiros</strong>, independentemente de idade, peso ou tamanho — incluindo profissionais contratados (DJ, barman, fotógrafo). O marinheiro tem autoridade para recusar embarque caso a capacidade seja excedida.', 'The maximum capacity of each boat must be strictly respected for safety and maritime regulations. <strong>Everyone counts as a passenger</strong>, regardless of age, weight, or size -- including hired professionals (DJ, bartender, photographer). The skipper has the authority to refuse boarding if capacity is exceeded.'],
      // Section 7
      ['7. Pontualidade', '7. Punctuality'],
      ['O cliente deve chegar com pelo menos <strong>30 minutos de antecedência</strong> do horário marcado', 'The customer must arrive at least <strong>30 minutes before</strong> the scheduled time'],
      ['O tempo de atraso será descontado do tempo total do passeio', 'Delay time will be deducted from the total trip time'],
      ['Todos os passageiros devem embarcar e desembarcar no mesmo local (Marina da Glória)', 'All passengers must board and disembark at the same location (Marina da Gloria)'],
      // Section 8
      ['8. Responsabilidades do Cliente', '8. Customer Responsibilities'],
      ['Zelar pela embarcação e equipamentos durante todo o passeio', 'Take care of the vessel and equipment throughout the entire trip'],
      ['Informar restrições médicas ou necessidades especiais antes do embarque', 'Report medical restrictions or special needs before boarding'],
      ['Danos causados à embarcação ou equipamentos por negligência, mau uso ou descumprimento das regras serão cobrados integralmente do contratante', 'Damage caused to the vessel or equipment through negligence, misuse, or rule violations will be charged in full to the contractor'],
      ['Não jogar papel ou qualquer material no vaso sanitário — danos ao sistema serão cobrados', 'Do not flush paper or any material in the toilet -- system damage will be charged'],
      // Section 9
      ['9. Uso de Imagem', '9. Image Usage'],
      ['Ao contratar nossos serviços, o cliente autoriza o uso de imagens do passeio para fins de divulgação em redes sociais e materiais promocionais da WeBoat Brasil. Se preferir que suas fotos não sejam utilizadas, basta informar nossa equipe antes ou durante o passeio.', 'By hiring our services, the customer authorizes the use of trip images for promotional purposes on social media and WeBoat Brasil marketing materials. If you prefer your photos not to be used, simply inform our team before or during the trip.'],
      // Section 10
      ['10. Limitação de Responsabilidade', '10. Limitation of Liability'],
      ['A WeBoat Brasil não se responsabiliza por objetos pessoais perdidos ou danificados durante o passeio', 'WeBoat Brasil is not responsible for personal items lost or damaged during the trip'],
      ['A decisão de entrar na água é de responsabilidade exclusiva dos passageiros', 'The decision to enter the water is the sole responsibility of the passengers'],
      ['Nossas embarcações não possuem acessibilidade específica para cadeirantes e pessoas com mobilidade reduzida', 'Our vessels do not have specific accessibility for wheelchair users and people with reduced mobility'],
      ['O uso da embarcação é destinado exclusivamente a atividades de turismo náutico e lazer. Qualquer uso indevido resultará na interrupção imediata do passeio e possíveis ações legais', 'The use of the vessel is exclusively for nautical tourism and leisure activities. Any misuse will result in immediate trip interruption and possible legal action'],
      // Section 11
      ['11. Alterações nos Termos', '11. Changes to Terms'],
      ['A WeBoat Brasil reserva-se o direito de alterar estes termos a qualquer momento. As alterações entram em vigor imediatamente após publicação no site. Recomendamos a leitura periódica desta página.', 'WeBoat Brasil reserves the right to change these terms at any time. Changes take effect immediately upon publication on the website. We recommend periodically reviewing this page.'],
      // Section 12
      ['12. Contato', '12. Contact'],
      ['Para dúvidas sobre estes termos, entre em contato:', 'For questions about these terms, please contact:'],
      ['Horário de atendimento comercial: 8h às 20h', 'Business hours: 8am to 8pm'],
    ],
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
    contentBlocks: [
      // *** LONG entries MUST come BEFORE short entries like ['Pagamento', 'Payment'] ***
      ['Pagamento instantâneo via QR code', 'Instant payment via QR code'],
      ['Continuar para Pagamento', 'Continue to Payment'],
      // Card title
      ['Seus Dados', 'Your Details'],
      // Stepper
      ['Dados', 'Details'],
      ['Pagamento', 'Payment'],
      ['Confirmação', 'Confirmation'],
      // Loading
      ['Carregando sua proposta...', 'Loading your proposal...'],
      // Error
      ['Erro', 'Error'],
      ['Algo deu errado.', 'Something went wrong.'],
      // Step 1 - Summary
      ['Resumo do Passeio', 'Trip Summary'],
      // Step 1 - Form
      ['Seus Dados', 'Your Details'],
      ['Nome completo', 'Full name'],
      ['Sou estrangeiro (I\'m a foreigner)', 'I\'m a foreigner'],
      // (Moved to top of contentBlocks: 'Continuar para Pagamento')
      // Step 1 - Terms
      ['Li e aceito os <a href="/termos-de-uso/" target="_blank">Termos de Uso</a> e a <a href="/politica-de-privacidade/" target="_blank">Política de Privacidade</a> da WeBoat Brasil.', 'I have read and accept the <a href="/en/terms-of-use/" target="_blank">Terms of Use</a> and <a href="/en/privacy-policy/" target="_blank">Privacy Policy</a> of WeBoat Brasil.'],
      // Step 2 - Payment methods
      ['Selecione o método de pagamento:', 'Select payment method:'],
      // (Moved to top of contentBlocks: 'Pagamento instantâneo via QR code')
      ['Cartão de Crédito', 'Credit Card'],
      ['Parcele em até 12x', 'Up to 12 installments'],
      ['Pagar Agora', 'Pay Now'],
      // PIX section
      ['Pague com PIX', 'Pay with PIX'],
      ['Ou copie o código abaixo:', 'Or copy the code below:'],
      ['Copiar', 'Copy'],
      ['Aguardando pagamento...', 'Waiting for payment...'],
      // Parcelas
      ['Parcelas:', 'Installments:'],
      ['1x sem juros', '1x no interest'],
      ['2x sem juros', '2x no interest'],
      ['3x sem juros', '3x no interest'],
      // Step 3 - Confirmation
      ['Reserva Confirmada!', 'Reservation Confirmed!'],
      ['Enviamos a confirmação para', 'We sent the confirmation to'],
      ['Voltar ao Site', 'Back to Website'],
      // aria-labels for payment methods (not protected by dictionary — aria-label is exposed)
      ['Selecionar PIX como método de pagamento', 'Select PIX as payment method'],
      ['Selecionar cartão de crédito como método de pagamento', 'Select credit card as payment method'],
      ['Selecionar PayPal como método de pagamento', 'Select PayPal as payment method'],
      ['Selecionar Zelle como método de pagamento', 'Select Zelle as payment method'],
    ],
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
  ['Melhor custo-beneficio', 'Best value'],
  ['Melhor Custo-Benefício', 'Best Value'],
  ['Melhor Custo-Beneficio', 'Best Value'],
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

  // --- Image alt text (boat cards — full strings to avoid partial translation) ---
  // Own boats
  ['Lancha para 15 pessoas', 'Boat for 15 people'],
  ['Lancha com churrasqueira para 16 pessoas', 'Boat with BBQ grill for 16 people'],
  ['Lancha premium para 14 pessoas', 'Premium boat for 14 people'],
  ['Nossa maior lancha para 20-22 pessoas', 'Our largest boat for 20-22 people'],
  ['Lancha com flybridge para 12 pessoas', 'Boat with flybridge for 12 people'],
  // Partner boats
  ['Lancha para 14 pessoas', 'Boat for 14 people'],
  ['Lancha para 12 pessoas', 'Boat for 12 people'],
  ['Lancha para 10 pessoas', 'Boat for 10 people'],
  ['Lancha para 11 pessoas', 'Boat for 11 people'],
  ['Lancha para 16 pessoas', 'Boat for 16 people'],
  ['Lancha para 15 pessoas', 'Boat for 15 people'],
  ['Lancha para 16-22 pessoas', 'Boat for 16-22 people'],
  ['Lancha para 18 pessoas', 'Boat for 18 people'],
  ['Lancha para 18-20 pessoas', 'Boat for 18-20 people'],
  ['Lancha para 25 pessoas', 'Boat for 25 people'],
  ['Lancha com ar-condicionado para 20 pessoas', 'Boat with air conditioning for 20 people'],
  ['Lancha com ar-condicionado para 22 pessoas', 'Boat with air conditioning for 22 people'],
  ['Lancha com ar-condicionado para 18-22 pessoas', 'Boat with air conditioning for 18-22 people'],
  ['Catamarã para 50-65 pessoas', 'Catamaran for 50-65 people'],
  // Compare page alt text
  ['Lancha para até 15 pessoas', 'Boat for up to 15 people'],
  ['Lancha com flybridge', 'Boat with flybridge'],
  // About page alt text
  ['Lancha WeBoat com logo ao pôr do sol na Baía de Guanabara', 'WeBoat boat with logo at sunset in Guanabara Bay'],
  ['Membro da equipe WeBoat servindo churrasco a bordo da lancha', 'WeBoat team member serving BBQ on board the boat'],
  ['Membro da equipe WeBoat com camisa azul no comando da lancha', 'WeBoat team member in blue shirt at the helm'],
  // New Year's Eve alt text
  ['Mesa decorada com pratos, flores e taças para ceia de réveillon na lancha', 'Decorated table with plates, flowers and glasses for New Year\'s Eve dinner on the boat'],
  ['Bar Oceano a bordo com bartenders preparando drinks durante passeio de lancha', 'Bar Oceano on board with bartenders preparing drinks during boat trip'],

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
  ['Barco para eventos com', 'Event boat for'],
  ['Maior embarcação para', 'Largest vessel for'],
  ['Maior embarcação', 'Largest vessel'],
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
  ['Vista exterior', 'Exterior view'],
  ['Vista mar', 'Sea view'],
  ['Detalhes', 'Details'],
  ['Flybridge solario', 'Flybridge sundeck'],
  ['Proa solario', 'Bow sundeck'],
  ['Deck popa', 'Stern deck'],
  ['Interior', 'Interior'],
  ['Lateral', 'Side'],
  ['popa', 'stern'],

  // --- Schema.org (shared description across multiple pages) ---
  ['Aluguel de lanchas no Rio de Janeiro. Passeios privativos com conforto e segurança.', 'Boat rentals in Rio de Janeiro. Private trips with comfort and safety.'],
  ['Aluguel de lanchas no Rio de Janeiro. Passeios privativos com conforto e seguranca.', 'Boat rentals in Rio de Janeiro. Private trips with comfort and safety.'],
  ['6 roteiros de 5h pela Baía de Guanabara, Copacabana, Ilhas Cagarras e Niterói', '6 five-hour routes through Guanabara Bay, Copacabana, Ilhas Cagarras and Niteroi'],
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

  // --- Event/occasion shared phrases ---
  ['Ideal para grandes eventos', 'Ideal for large events'],
  ['Salva-vidas para todos', 'Life jackets for everyone'],
  ['Personalize sua festa', 'Customize your party'],
  ['Questions sobre Boat Rental in Rio de Janeiro', 'Questions About Boat Rental in Rio de Janeiro'],
  ['6 hours de trip', '6-hour trip'],

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
  ['Selecione um roteiro para comecar', 'Select a route to start'],
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
  ['Ver Todas as Dúvidas', 'View All Questions'],
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

  // --- ARIA labels (stepper buttons on boat/services pages) ---
  ['aria-label="Diminuir"', 'aria-label="Decrease"'],
  ['aria-label="Aumentar"', 'aria-label="Increase"'],
  ['aria-label="Diminuir quantidade"', 'aria-label="Decrease quantity"'],
  ['aria-label="Aumentar quantidade"', 'aria-label="Increase quantity"'],

  // --- Form labels (contact page) ---
  ['Envie sua Mensagem', 'Send Your Message'],
  ['Envie sua Message', 'Send Your Message'],
  ['Envie su Mensaje', 'Send Your Message'],
  ['<label for="nome">', '<label for="nome">'],
  ['Nome</label>', 'Name</label>'],
  ['Data desejada', 'Preferred date'],
  ['Data Desejada', 'Preferred Date'],
  ['Número de pessoas', 'Number of people'],
  ['Campo obrigatório', 'Required field'],
  ['Preencha este campo', 'Please fill in this field'],
  ['preencha este campo', 'please fill in this field'],

  // --- FAQ page: question headings still in PT ---
  ['Perguntas mais buscadas', 'Most Searched Questions'],
  ['How it works o uso do banheiro', 'How does the restroom work'],
  ['As boats têm banheiro', 'Do boats have restrooms'],
  ['As lanchas têm banheiro', 'Do boats have restrooms'],
  ['O que devo levar para o trip', 'What should I bring for the trip'],
  ['O que devo levar para o passeio', 'What should I bring for the trip'],
  ['Gestantes podem fazer o trip', 'Can pregnant women take the trip'],
  ['Gestantes podem fazer o passeio', 'Can pregnant women take the trip'],
  ['gestantes', 'pregnant women'],
  ['Idosos e pessoas com necessidades especiais', 'Elderly and people with special needs'],
  ['idosos', 'elderly'],
  ['necessidades especiais', 'special needs'],
  ['pessoas com mobilidade reduzida', 'people with reduced mobility'],
  ['mobilidade reduzida', 'reduced mobility'],

  // --- FAQ answer fragments still in PT ---
  ['Nossa equipe monitora a previsão e avisa com antecedência', 'Our team monitors the forecast and notifies you in advance'],
  ['Nossa equipe monitora a previsão', 'Our team monitors the forecast'],
  ['avisa com antecedência', 'notifies you in advance'],
  ['Saiba mais em nossa', 'Learn more on our'],
  ['Saiba mais em', 'Learn more on'],
  ['nossa equipe', 'our team'],
  ['nossa página de', 'our page about'],
  ['página de FAQ', 'FAQ page'],
  ['Com chuva forte comprovada por fotos ou vídeos', 'With heavy rain proven by photos or videos'],
  ['reagendamos gratuitamente', 'we reschedule for free'],
  ['Drizzle ou chuva leve não justificam cancelamento', 'Drizzle or light rain does not justify cancellation'],
  ['chuva leve', 'light rain'],
  ['chuva forte', 'heavy rain'],
  ['Sim, permitimos', 'Yes, we allow'],
  ['Sim, aceitamos', 'Yes, we accept'],
  ['Sim, temos', 'Yes, we have'],
  ['Sim, é possível', 'Yes, it is possible'],
  ['Sim, todas as nossas', 'Yes, all our'],
  ['Sim, todas as', 'Yes, all'],
  ['Não, não é necessário', 'No, it is not necessary'],
  ['Não é necessário', 'It is not necessary'],
  ['A embarcar conosco', 'boarding with us'],
  ['todos podem embarcar', 'everyone can board'],
  ['não há contraindicação', 'there is no contraindication'],
  ['consulte seu médico', 'consult your doctor'],
  ['em caso de enjoo', 'in case of seasickness'],
  ['enjoo', 'seasickness'],
  ['A decisão será tomada pela equipe no dia', 'The decision will be made by the team on the day'],
  ['O marinheiro avalia as condições do mar', 'The captain evaluates sea conditions'],
  ['condições do mar', 'sea conditions'],
  ['O passeio acontece na maioria dos dias', 'The trip takes place on most days'],
  ['Mesmo em dias nublados', 'Even on cloudy days'],
  ['dias nublados', 'cloudy days'],
  ['o passeio é muito agradável', 'the trip is very pleasant'],
  ['muito agradável', 'very pleasant'],
  ['Entre em contato pelo WhatsApp', 'Contact us via WhatsApp'],
  ['entre em contato pelo WhatsApp', 'contact us via WhatsApp'],
  ['entre em contato', 'contact us'],
  ['Fale com a nossa equipe', 'Talk to our team'],
  ['Fale com nossa equipe', 'Talk to our team'],
  ['nosso time', 'our team'],
  ['nosso WhatsApp', 'our WhatsApp'],
  ['pelo WhatsApp', 'via WhatsApp'],
  ['no WhatsApp', 'on WhatsApp'],
  ['Cada roteiro tem características únicas', 'Each route has unique characteristics'],
  ['características únicas', 'unique characteristics'],
  ['O que levar', 'What to bring'],
  ['o que levar', 'what to bring'],
  ['protetor solar', 'sunscreen'],
  ['roupas leves', 'light clothing'],
  ['chinelo', 'flip flops'],
  ['traje de banho', 'swimwear'],
  ['chapéu ou boné', 'hat or cap'],
  ['óculos de sol', 'sunglasses'],
  ['toalha', 'towel'],
  ['câmera ou celular à prova d\'água', 'waterproof camera or phone case'],
  ['Recomendamos usar protetor solar e trazer', 'We recommend using sunscreen and bringing'],
  ['Recomendamos', 'We recommend'],

  // --- Services page sections ---
  ['Escolha seu Kit', 'Choose Your Kit'],
  ['Escolha seu Pacote', 'Choose Your Package'],
  ['Escolha seu pacote', 'Choose your package'],
  ['Confira mais opções', 'Check out more options'],
  ['Confira mais', 'Check out more'],
  ['para deixar seu passeio ainda mais especial', 'to make your trip even more special'],
  ['para deixar seu trip ainda mais especial', 'to make your trip even more special'],
  ['ainda mais especial', 'even more special'],
  ['Monte seu Pacote de Services', 'Build Your Service Package'],
  ['Monte seu Pacote de Serviços', 'Build Your Service Package'],
  ['Monte seu pacote', 'Build your package'],
  ['Services para seu Boat trip', 'Services for Your Boat Trip'],
  ['Serviços para seu passeio de lancha', 'Services for Your Boat Trip'],
  ['Serviços para seu passeio', 'Services for your trip'],
  ['BBQ, open bar, decoration e mais', 'BBQ, open bar, decoration and more'],
  ['BBQ, open bar, decoração e mais', 'BBQ, open bar, decoration and more'],
  ['Transforme seu trip', 'Transform your trip'],
  ['Transforme seu passeio', 'Transform your trip'],
  ['em uma experiência inesquecível', 'into an unforgettable experience'],
  ['experiência inesquecível', 'unforgettable experience'],

  // --- Route page stop/schedule descriptions ---
  ['Embarque', 'Boarding'],
  ['embarque', 'boarding'],
  ['Desembarque', 'Disembarkation'],
  ['desembarque', 'disembarkation'],
  ['Retorno e desembarque', 'Return and disembarkation'],
  ['Retorno e Desembarque', 'Return and Disembarkation'],
  ['Retorno', 'Return'],
  ['retorno', 'return'],
  ['Fim da tarde', 'Late afternoon'],
  ['fim da tarde', 'late afternoon'],
  ['Início da manhã', 'Early morning'],
  ['início da manhã', 'early morning'],
  ['Primeiro destino', 'First destination'],
  ['Segundo destino', 'Second destination'],
  ['Parada para banho', 'Swimming stop'],
  ['parada para banho', 'swimming stop'],
  ['Banho e flutuação', 'Swimming and floating'],
  ['Flutuação e banho', 'Floating and swimming'],
  ['Navegação panorâmica', 'Panoramic cruise'],
  ['navegação panorâmica', 'panoramic cruise'],
  ['Vista panorâmica', 'Panoramic view'],
  ['vista panorâmica', 'panoramic view'],
  ['Curtir o mar', 'Enjoy the sea'],

  // --- Compare page FAQ fragments ---
  ['E se meu grupo tiver mais de 22 people', 'What if my group has more than 22 people'],
  ['E se meu grupo tiver mais de 22 pessoas', 'What if my group has more than 22 people'],
  ['Temos boats parceiras para grupos de ate 65 people', 'We have partner boats for groups of up to 65 people'],
  ['Temos lanchas parceiras para grupos de até 65 pessoas', 'We have partner boats for groups of up to 65 people'],
  ['Qual a boat mais econômica', 'What is the most affordable boat'],
  ['Qual a lancha mais econômica', 'What is the most affordable boat'],
  ['mais econômica', 'most affordable'],
  ['a mais indicada', 'the most recommended'],

  // --- CTA & button text ---
  ['Pronto para Reservar', 'Ready to Book'],
  ['Pronto para reservar', 'Ready to book'],
  ['Reservar', 'Book'],
  ['Consultar', 'Inquire'],
  ['Confira', 'Check out'],
  ['Confira!', 'Check it out!'],
  ['Veja mais', 'See more'],
  ['Ver mais', 'See more'],
  ['Garanta sua data', 'Secure your date'],
  ['garanta sua data', 'secure your date'],
  ['Garanta já', 'Book now'],
  ['Comece agora', 'Start now'],

  // --- Birthday/Occasion page mixed content ---
  ['Comemore seu birthday', 'Celebrate your birthday'],
  ['Comemore seu aniversário', 'Celebrate your birthday'],
  ['Comemore', 'Celebrate'],
  ['comemore', 'celebrate'],
  ['Organize sua', 'Organize your'],
  ['Festeje', 'Celebrate'],
  ['festeje', 'celebrate'],
  ['festa perfeita', 'perfect party'],
  ['a noiva mais feliz', 'the happiest bride'],
  ['o melhor do Rio', 'the best of Rio'],
  ['convidados', 'guests'],
  ['decorado', 'decorated'],
  ['personalizado', 'customized'],
  ['tudo incluso', 'all included'],

  // --- WhatsApp messages in inline links ---
  ['Olá! Gostaria de informações sobre aluguel de lancha no Rio de Janeiro.', 'Hello! I would like information about boat rental in Rio de Janeiro.'],
  ['Olá! Gostaria de fazer o roteiro', 'Hello! I would like to do the route'],
  ['Qual a disponibilidade?', 'What is the availability?'],
  ['Olá! Tenho interesse na lancha', 'Hello! I am interested in the boat'],
  ['Poderia me enviar mais informações?', 'Could you send me more information?'],
  ['Olá! Quero reservar um passeio', 'Hello! I want to book a trip'],
  ['Olá! Estou organizando uma despedida de solteira', 'Hello! I am planning a bachelorette party'],
  ['Olá! Quero comemorar meu aniversário na lancha', 'Hello! I want to celebrate my birthday on a boat'],
  ['Podem me ajudar a organizar?', 'Can you help me organize?'],
  ['Olá! Gostaria de informações sobre eventos corporativos em lancha.', 'Hello! I would like information about corporate events on a boat.'],
  ['Olá! Quero informações sobre o réveillon na lancha para assistir a queima de fogos.', "Hello! I want information about New Year's Eve on a boat to watch the fireworks."],
  ['Olá! Gostaria de informações sobre o Carnaval na lancha.', 'Hello! I would like information about Carnival on a boat.'],
  ['Olá! Gostaria de informações sobre', 'Hello! I would like information about'],
  ['Olá! Quero informações sobre', 'Hello! I want information about'],
  ['Olá!', 'Hello!'],
  ['Gostaria de', 'I would like'],
  ['gostaria de', 'I would like'],
  ['informações sobre', 'information about'],
  ['mais informações', 'more information'],
  ['Podem me ajudar', 'Can you help me'],
  ['poderia me enviar', 'could you send me'],

  // --- Misc prose fragments ---
  ['Dia da semana', 'Day of the week'],
  ['dias úteis são mais econômicos', 'weekdays are more affordable'],
  ['dias úteis', 'weekdays'],
  ['finais de semana', 'weekends'],
  ['feriados', 'holidays'],
  ['alta temporada', 'peak season'],
  ['baixa temporada', 'off-season'],
  ['com toda estrutura', 'with all the infrastructure'],
  ['toda estrutura', 'all the infrastructure'],
  ['toda a estrutura necessária', 'all the necessary infrastructure'],
  ['estrutura completa', 'complete infrastructure'],
  ['Pronto para viver', 'Ready to experience'],
  ['pronto para viver', 'ready to experience'],
  ['Viva essa experiência', 'Live this experience'],
  ['viva essa experiência', 'live this experience'],
  ['Agende seu passeio', 'Schedule your trip'],
  ['agende seu passeio', 'schedule your trip'],
  ['Escolha a melhor data', 'Choose the best date'],
  ['melhores opções para', 'best options for'],
  ['opções para', 'options for'],
  ['passeios privativos', 'private trips'],
  ['passeio privativo', 'private trip'],
  ['privativos', 'private'],
  ['privativo', 'private'],
  ['para quem busca', 'for those seeking'],
  ['perfeita para', 'perfect for'],
  ['ideal para', 'ideal for'],
  ['Praia Vermelha e Mureta da Urca', 'Praia Vermelha and Mureta da Urca'],
  ['Pão de Açúcar e Praia Vermelha', 'Sugarloaf Mountain and Praia Vermelha'],
  ['e orla do Rio de Janeiro', 'and the Rio de Janeiro coastline'],
  ['orla do Rio', 'Rio coastline'],
  ['do Rio de Janeiro', 'of Rio de Janeiro'],
  ['em Rio de Janeiro', 'in Rio de Janeiro'],
  ['e muito mais', 'and much more'],

  // --- Legal/Misc page content ---
  ['Esta política descreve', 'This policy describes'],
  ['Estes termos regulam', 'These terms govern'],
  ['Ao utilizar nossos serviços', 'By using our services'],
  ['você concorda com', 'you agree to'],
  ['dados pessoais', 'personal data'],
  ['informações pessoais', 'personal information'],

  // --- Schema.org descriptions (shared across pages — dictionary sorts by length) ---
  // Service descriptions (about, faq, contact, how-it-works pages)
  ['Lanchas de 10 a 65 pessoas, próprias e parceiras, com combustível, marinheiro e seguro inclusos', 'Boats for 10 to 65 people, own and partner, with fuel, captain and insurance included'],
  ['Churrasco, open bar, decoração, DJ e fotógrafo para passeios de lancha', 'BBQ, open bar, decoration, DJ and photographer for boat trips'],

  // Route page main descriptions
  ['Passeio de lancha na Urca com vista para o Pão de Açúcar. Melhor custo-benefício para passeio de barco no Rio de Janeiro. Duração de 5 horas com saída da Marina da Glória.', 'Boat trip in Urca with a view of Sugarloaf Mountain. Best value for a boat trip in Rio de Janeiro. 5-hour trip departing from Marina da Gloria.'],
  ['Vista icônica da orla de Copacabana do mar. Perfeito para fotos inesquecíveis. Duração de 5 horas com saída da Marina da Glória, passando por Urca e Praia Vermelha.', 'Iconic view of the Copacabana coastline from the sea. Perfect for unforgettable photos. 5-hour trip departing from Marina da Gloria, passing through Urca and Praia Vermelha.'],
  // Route point-of-interest descriptions
  ['Bar e mirante à beira-mar com vista para o Pão de Açúcar e Baía de Guanabara', 'Seaside bar and viewpoint with views of Sugarloaf Mountain and Guanabara Bay'],
  ['Vista privilegiada do cartão-postal do Rio de Janeiro a partir do mar', 'Privileged view of Rio de Janeiro\'s postcard from the sea'],
  ['Fortaleza histórica vista pelo mar com café e museu', 'Historic fortress seen from the sea with cafe and museum'],
  ['A partir de R$ 2.300 (seg-qui, WeBoat 32). Inclui combustível, marinheiro e seguro.', 'From R$ 2,300 (Mon-Thu, WeBoat 32). Includes fuel, captain and insurance.'],
  ['A partir de R$ 2.500 (seg-qui, WeBoat 32). Inclui combustível, marinheiro e seguro.', 'From R$ 2,500 (Mon-Thu, WeBoat 32). Includes fuel, captain and insurance.'],
  ['A partir de R$ 3.000 (seg-qui, WeBoat 32). Inclui combustível, marinheiro e seguro.', 'From R$ 3,000 (Mon-Thu, WeBoat 32). Includes fuel, captain and insurance.'],
  ['A partir de R$ 3.600 (seg-qui, WeBoat 32). Inclui combustível, marinheiro e seguro.', 'From R$ 3,600 (Mon-Thu, WeBoat 32). Includes fuel, captain and insurance.'],
  ['A partir de R$ 4.500 (seg-qui, WeBoat 32). Inclui combustível, marinheiro e seguro.', 'From R$ 4,500 (Mon-Thu, WeBoat 32). Includes fuel, captain and insurance.'],

  // Route page FAQ Schema.org "text" entries (long strings for dictionary matching)
  // Mureta da Urca
  ['O turno total e de 5 horas (manha: 09h-14h ou tarde: 14h30-19h30). O tempo de navegacao e de aproximadamente 1h30, e o restante (cerca de 3h30) e dedicado a paradas para mergulho, banho e relaxamento na Mureta da Urca.', 'The total shift is 5 hours (morning: 09h-14h or afternoon: 14h30-19h30). The sailing time is approximately 1h30, and the rest (about 3h30) is dedicated to swimming stops, bathing and relaxation at Mureta da Urca.'],
  // Praia Vermelha
  ['O turno total e de 5 horas (manha: 09h-14h ou tarde: 14h30-19h30). O tempo de navegacao e de aproximadamente 2 horas, e o restante (cerca de 3h) e dedicado as duas paradas para mergulho e banho na Mureta da Urca e Praia Vermelha.', 'The total shift is 5 hours (morning: 09h-14h or afternoon: 14h30-19h30). The sailing time is approximately 2 hours, and the rest (about 3h) is dedicated to two swimming stops at Mureta da Urca and Praia Vermelha.'],
  // Copacabana
  ['O turno total e de 5 horas (manha: 09h-14h ou tarde: 14h30-19h30). E tempo suficiente para passar pela Urca, Praia Vermelha (com paradas para mergulho) e fazer a passagem panoramica pela orla de Copacabana.', 'The total shift is 5 hours (morning: 09h-14h or afternoon: 14h30-19h30). It is enough time to pass through Urca, Praia Vermelha (with swimming stops) and make the panoramic passage along the Copacabana coastline.'],
  ['A passagem por Copacabana é panorâmica, perfeita para fotos. As paradas para mergulho são feitas na Mureta da Urca e Praia Vermelha, onde as águas são mais calmas e ideais para banho.', 'The passage by Copacabana is panoramic, perfect for photos. Swimming stops are at Mureta da Urca and Praia Vermelha, where the waters are calmer and ideal for swimming.'],
  ['O roteiro até Copacabana é perfeito para despedida de solteira! A passagem panorâmica pela orla mais famosa do Brasil rende fotos incríveis. Oferecemos também decoração temática e serviços de open bar.', 'The Copacabana route is perfect for bachelorette parties! The panoramic passage along Brazil\'s most famous coastline makes for incredible photos. We also offer themed decoration and open bar services.'],
  // Ilhas Cagarras
  ['O roteiro das Ilhas Cagarras inclui navegação em mar aberto. Em dias de mar muito agitado, o trajeto pode ser alterado para águas mais calmas por segurança. Recomendamos para pessoas que não enjoam facilmente.', 'The Ilhas Cagarras route includes open sea navigation. On very rough sea days, the course may be changed to calmer waters for safety. We recommend it for people who do not get seasick easily.'],
  ['Sim! As águas ao redor das Ilhas Cagarras são extremamente claras, permitindo visualizar peixes, tartarugas e outros animais marinhos. É um santuário ecológico a cerca de 5 km da costa de Ipanema.', 'Yes! The waters around Ilhas Cagarras are extremely clear, allowing you to see fish, turtles and other marine life. It is an ecological sanctuary about 5 km off the coast of Ipanema.'],
  ['O passeio de lancha até as Ilhas Cagarras tem duração de 5 horas, dependendo das condições do mar e do tempo de permanência nas ilhas para mergulho.', 'The boat trip to Ilhas Cagarras lasts 5 hours, depending on sea conditions and time spent at the islands for swimming.'],
  // Praia Vermelha FAQ
  ['O roteiro Praia Vermelha é escolhido por 60% dos nossos clientes porque oferece o equilíbrio perfeito entre custo, tempo e experiência. Inclui 2 paradas para mergulho (Mureta da Urca e Praia Vermelha) e a vista única do bondinho do Pão de Açúcar passando sobre sua cabeça.', 'The Praia Vermelha route is chosen by 60% of our clients because it offers the perfect balance between cost, time and experience. It includes 2 swimming stops (Mureta da Urca and Praia Vermelha) and the unique view of the Sugarloaf Mountain cable car passing overhead.'],
  ['Todos os nossos passeios incluem: combustível, marinheiro habilitado, tapete flutuante, macarrões flutuantes, sistema de som Bluetooth, coolers. Você pode levar suas próprias bebidas e petiscos sem custo adicional.', 'All our trips include: fuel, licensed captain, floating mat, pool noodles, Bluetooth speakers, coolers. You can bring your own drinks and snacks at no extra cost.'],
  // Shared FAQ answer across route pages
  ['O valor varia conforme a lancha escolhida e o dia da semana. Entre em contato pelo WhatsApp para receber um orcamento personalizado. Todas as lanchas incluem combustivel, marinheiro, som Bluetooth e coolers.', 'The price varies depending on the boat chosen and the day of the week. Contact us via WhatsApp for a personalized quote. All boats include fuel, captain, Bluetooth speakers and coolers.'],
  ['O valor varia conforme a lancha escolhida e o dia da semana. Entre em contato pelo WhatsApp para receber um orcamento personalizado. Todas as lanchas incluem combustivel, marinheiro experiente, som Bluetooth e equipamentos de seguranca.', 'The price varies depending on the boat chosen and the day of the week. Contact us via WhatsApp for a personalized quote. All boats include fuel, experienced captain, Bluetooth speakers and safety equipment.'],

  // Services page Schema.org descriptions
  ['Decoration personalizada para birthdays and despedidas. Bachelorette Kit (R$ 135-150/person) ou Premium Party Kit (R$ 1.850-2.500).', 'Custom decoration for birthdays and bachelorette parties. Bachelorette Kit (R$ 135-150/person) or Premium Party Kit (R$ 1,850-2,500).'],
  ['Decoração personalizada para aniversários e despedidas. Kit Despedida (R$ 135-150/pessoa) ou Kit Festa Premium (R$ 1.850-2.500).', 'Custom decoration for birthdays and bachelorette parties. Bachelorette Kit (R$ 135-150/person) or Premium Party Kit (R$ 1,850-2,500).'],
  ['DJ profissional com equipamento completo para animar sua festa na lancha.', 'Professional DJ with full equipment to liven up your party on the boat.'],

  // Blog Schema.org
  ['Melhores Praias para Visitar de Lancha no RJ', 'Best Beaches to Visit by Boat in RJ'],
  ['Guia prático de como se vestir para um passeio de lancha no Rio. O que levar, o que evitar e dicas de proteção solar.', 'Practical guide on what to wear for a boat trip in Rio. What to bring, what to avoid and sun protection tips.'],

  // New Year's Eve FAQ visible HTML (long strings)
  ['O New Year\'s Eve na boat inclui aproximadamente 5 hours no mar', 'The New Year\'s Eve boat trip includes approximately 5 hours at sea'],

  // Checkout visible text
  ['Continuar para Payment', 'Continue to Payment'],

  // Ilhas Cagarras FAQ Schema.org name
  ['Dá para ver animais marinhos nas Ilhas Cagarras?', 'Can you see marine animals at Ilhas Cagarras?'],

  // ─── COMPOUND PHRASES (must be in dictionary, not just waTextReplacements) ───
  // "passeio de lancha" → "boat trip" as unit (prevents "trip de boat")
  ['passeio de lancha', 'boat trip'],
  ['Passeio de lancha', 'Boat trip'],
  ['Passeio de Lancha', 'Boat Trip'],
  ['passeios de lancha', 'boat trips'],
  ['Passeios de Lancha', 'Boat Trips'],

  // ─── ALT TEXT FRAGMENTS ───
  // service-areas alt texts
  ['Passeio de lancha na Mureta da Urca com vista para o Pao de Acucar', 'Boat trip along Mureta da Urca with a view of Sugarloaf Mountain'],
  ['Passeio de lancha na Praia Vermelha com bondinho do Pao de Acucar', 'Boat trip to Praia Vermelha with Sugarloaf cable car'],
  ['Passeio de lancha com vista panoramica de Copacabana', 'Boat trip with panoramic view of Copacabana'],
  ['Passeio de lancha nas Ilhas Cagarras - mergulho em aguas cristalinas', 'Boat trip to Ilhas Cagarras - swimming in crystal-clear waters'],
  ['Passeio de lancha em Itaipu e Camboinhas - praias desertas em Niteroi', 'Boat trip to Itaipu and Camboinhas - secluded beaches in Niteroi'],
  // routes/index alt texts
  ['Mapa dos roteiros de passeio de lancha no Rio de Janeiro - Marina da Glória, Urca, Praia Vermelha, Copacabana, Ilhas Cagarras e Niterói', 'Map of boat trip routes in Rio de Janeiro - Marina da Gloria, Urca, Praia Vermelha, Copacabana, Ilhas Cagarras and Niteroi'],
  ['Passeio de lancha na Mureta da Urca com vista para o Pão de Açúcar', 'Boat trip along Mureta da Urca with a view of Sugarloaf Mountain'],
  ['Passeio de lancha na Praia Vermelha com bondinho do Pão de Açúcar', 'Boat trip to Praia Vermelha with Sugarloaf cable car'],
  // routes/mureta-da-urca alt text
  ['Passeio de lancha na Mureta da Urca com vista panorâmica do Pão de Açúcar', 'Boat trip along Mureta da Urca with panoramic view of Sugarloaf Mountain'],
  // routes/praia-vermelha alt text
  ['Passeio de lancha na Praia Vermelha com vista do Pão de Açúcar e Cristo Redentor', 'Boat trip to Praia Vermelha with views of Sugarloaf Mountain and Christ the Redeemer'],

  // ─── SCHEMA FAQ NAMES (route pages) ───
  ['Por que o roteiro Praia Vermelha é o mais vendido?', 'Why is the Praia Vermelha route the best seller?'],
  ['Qual a duração do passeio até a Praia Vermelha?', 'How long is the trip to Praia Vermelha?'],
  ['Como saber o valor do passeio de lancha ate a Praia Vermelha?', 'How do I find out the price of the boat trip to Praia Vermelha?'],
  ['Qual a duração do passeio de lancha até Copacabana?', 'How long is the boat trip to Copacabana?'],
  ['Qual a duração do passeio às Ilhas Cagarras?', 'How long is the trip to Ilhas Cagarras?'],
  ['Como saber o valor do passeio as Ilhas Cagarras?', 'How do I find out the price of the trip to Ilhas Cagarras?'],
  ['O mar é agitado no roteiro das Ilhas Cagarras?', 'Is the sea rough on the Ilhas Cagarras route?'],
  ['O que torna o roteiro de Itaipu e Camboinhas especial?', 'What makes the Itaipu and Camboinhas route special?'],
  ['Qual a duração do passeio até Itaipu e Camboinhas?', 'How long is the trip to Itaipu and Camboinhas?'],
  ['Como saber o valor do passeio ate Niteroi?', 'How do I find out the price of the trip to Niteroi?'],

  // ─── SCHEMA FAQ NAMES (boat pages) ───
  ['Quanto custa levar mais de 20 pessoas na WeBoat Rio Star 50?', 'How much does it cost to bring more than 20 people on the WeBoat Rio Star 50?'],
  ['O que e o flybridge da WeBoat Ibiza 42?', 'What is the flybridge on the WeBoat Ibiza 42?'],
  ['Qual a diferenca de preco entre dias de semana e fim de semana?', 'What is the price difference between weekdays and weekends?'],

  // ─── SCHEMA FAQ ANSWERS (boat pages) ───
  ['O flybridge e um segundo andar ao ar livre na parte superior da lancha, com solario, churrasqueira e vista panoramica 360 graus. E o diferencial exclusivo da Ibiza 42 entre as lanchas proprias WeBoat.', 'The flybridge is an outdoor second deck on top of the boat, with a solarium, BBQ grill and 360-degree panoramic view. It is the exclusive feature of the Ibiza 42 among WeBoat own boats.'],
  ['Os precos de segunda a quinta sao promocionais: WeBoat 32 (R$ 2.300 vs R$ 2.700), WeBoat 390 (R$ 2.600 vs R$ 3.100), Oceanic 36 (R$ 2.400 vs R$ 2.800), Rio Star 50 (R$ 4.000 vs R$ 4.500). Economia de ate R$ 500 durante a semana.', 'Weekday prices (Mon-Thu) are promotional: WeBoat 32 (R$ 2,300 vs R$ 2,700), WeBoat 390 (R$ 2,600 vs R$ 3,100), Oceanic 36 (R$ 2,400 vs R$ 2,800), Rio Star 50 (R$ 4,000 vs R$ 4,500). Save up to R$ 500 on weekdays.'],

  // ─── SCHEMA DESCRIPTIONS (route pages) ───
  ['Nosso passeio de lancha mais vendido! Inclui Urca + Praia Vermelha com parada para banho e vista do bondinho. Duração de 5 horas com saída da Marina da Glória.', 'Our best-selling boat trip! Includes Urca + Praia Vermelha with a swimming stop and views of the cable car. 5 hours departing from Marina da Gloria.'],
  ['Praias semi-desertas de Itaipu e Camboinhas em Niterói. O roteiro mais exclusivo e tranquilo. Duração de 5 horas com saída da Marina da Glória.', 'Secluded beaches of Itaipu and Camboinhas in Niteroi. The most exclusive and peaceful route. 5 hours departing from Marina da Gloria.'],
  ['Inclui fuel, captain e seguro.', 'Includes fuel, captain and insurance.'],
  ['A partir de R$ 3.600 (seg-qui, WeBoat 32). Inclui combustível, marinheiro e seguro.', 'From R$ 3,600 (Mon-Thu, WeBoat 32). Includes fuel, captain and insurance.'],
  ['Vista do bondinho e do morro da Urca a partir do mar', 'View of the cable car and Morro da Urca from the sea'],

  // ─── SCHEMA ITAIPU FAQ ANSWERS ───
  ['É nosso roteiro mais exclusivo! Diferente dos outros que ficam na zona sul do Rio, este passeio atravessa a Baía de Guanabara e leva você para praias semi-desertas em Niterói, longe das multidões.', 'It is our most exclusive route! Unlike the others that stay in the south zone of Rio, this trip crosses Guanabara Bay and takes you to secluded beaches in Niteroi, away from the crowds.'],
  ['São praias semi-desertas, muito mais tranquilas que as praias da zona sul do Rio. Como o acesso por terra é mais difícil, você encontra muito menos pessoas, especialmente em dias de semana.', 'They are secluded beaches, much calmer than the south zone beaches of Rio. Since land access is more difficult, you will find far fewer people, especially on weekdays.'],
  ['O passeio tem duração de 5 horas, que corresponde a um turno completo. A travessia da Baía de Guanabara e a navegação até as praias de Niterói levam mais tempo que os roteiros na zona sul.', 'The trip lasts 5 hours, which corresponds to a full shift. The crossing of Guanabara Bay and the sailing to the beaches of Niteroi take more time than the south zone routes.'],
  ['O valor varia conforme a lancha escolhida e o dia da semana. Entre em contato pelo WhatsApp para receber um orcamento personalizado. Todas as lanchas incluem combustivel, marinheiro experiente, som Bluetooth e coolers.', 'The price varies depending on the boat chosen and the day of the week. Contact us via WhatsApp for a personalized quote. All boats include fuel, experienced captain, Bluetooth speakers and coolers.'],
  ['As praias de Itaipu e Camboinhas são realmente desertas?', 'Are the beaches of Itaipu and Camboinhas really deserted?'],

  // ─── BLOG SCHEMA DESCRIPTIONS ───
  ['Guia completo da Marina da Glória no Rio de Janeiro: como chegar, estacionamento, infraestrutura e dicas para o dia do seu passeio de lancha com a WeBoat.', 'Complete guide to Marina da Gloria in Rio de Janeiro: how to get there, parking, infrastructure and tips for the day of your boat trip with WeBoat.'],
  ['Guia da Marina da Glória: Tudo que Você Precisa Saber', 'Marina da Gloria Guide: Everything You Need to Know'],

  // ─── VISIBLE TEXT FIXES ───
  ['Perfeita para grupos grandes e eventos corporativos.', 'Perfect for large groups and corporate events.'],

  // ─── "VISTA AÉREA" ALT TEXT (shared across routes, blog, about) ───
  ['Vista aérea das Ilhas Cagarras com lancha ancorada em águas cristalinas', 'Aerial view of Ilhas Cagarras with a boat anchored in crystal-clear waters'],
  ['Vista aérea da Praia de Itaipu em Niterói com mar cristalino e montanhas', 'Aerial view of Praia de Itaipu in Niteroi with crystal-clear sea and mountains'],
  ['Vista aérea da Praia de Itaipu em Niterói com mar cristalino', 'Aerial view of Praia de Itaipu in Niteroi with crystal-clear sea'],
  ['Vista aérea da Marina da Glória com lanchas e veleiros atracados e o Pão de Açúcar ao fundo', 'Aerial view of Marina da Gloria with boats and sailboats docked and Sugarloaf Mountain in the background'],
  ['Vista aérea da Marina da Glória no Rio de Janeiro', 'Aerial view of Marina da Gloria in Rio de Janeiro'],

  // ─── MISSING TRANSLATIONS (added 2026-02-16) ───
  // Longer strings MUST come before shorter substrings

  // Service description fragments — include PT form (runs before short word replacements)
  ['Fotógrafo profissional para registrar todos os momentos', 'Professional photographer to capture every moment'],
  ['Photographer profissional para registrar todos os momentos', 'Professional photographer to capture every moment'],
  ['Churrasqueiro + carnes selecionadas + acompanhamentos', 'Grill master + selected meats + side dishes'],
  ['Churrasqueiro + carnes premium + acompanhamentos', 'Grill master + premium meats + side dishes'],
  ['Kit Bride to Be com faixa, balões, props para fotos', 'Bride to Be kit with sash, balloons, photo props'],
  ['Kit Bride to Be com faixa, baloes, props para fotos', 'Bride to Be kit with sash, balloons, photo props'],
  ['Drinks especiais, cerveja, caipirinha', 'Special drinks, beer, caipirinha'],
  ['adereços e props para fotos', 'accessories and photo props'],
  ['Serviços adicionais', 'Additional services'],
  ['Services adicionais', 'Additional Services'],
  ['Props para fotos', 'Photo props'],

  // Boat detail pages — form labels and aria-labels
  ['Selecione o turno', 'Select the time slot'],
  ['Horas extras', 'Extra hours'],
  ['Turno', 'Time Slot'],

  // Sound system (appears 22+ times across pages)
  // PT source has "Som Bluetooth"; contentBlocks may change "Som"->"Sound" before dictionary
  ['Som Bluetooth', 'Bluetooth Speakers'],
  ['Sound Bluetooth', 'Bluetooth Speakers'],

  // Pricing fragments
  ['/pessoa', '/person'],

  // Route name connector
  ['Itaipu e Camboinhas', 'Itaipu & Camboinhas'],

  // Badge text
  ['Economia', 'Savings'],
  ['Parceira', 'Partner'],

  // Mixed-language CTA fix (partial translation left "Ver" in PT)
  ['Ver Other Boats', 'View Other Boats'],

  // Boat card price notes (occasion pages — HTML context to avoid false matches)
  ['>seg-qui<', '>Mon-Thu<'],
  ['>sex-dom<', '>Fri-Sun<'],

  // Compare page button text (HTML tag context to avoid false matches)
  ['>Ver<', '>View<'],

  // Schema.org touristType translations (route pages)
  ['Turismo Náutico', 'Nautical Tourism'],
  ['Lazer ao Ar Livre', 'Outdoor Recreation'],
  ['Mergulho e Snorkeling', 'Swimming and Snorkeling'],
  ['Praias Exclusivas', 'Exclusive Beaches'],
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
function getEnHeader(ptPath, enPath, esPath, isTransparent) {
  const headerClass = isTransparent ? 'header header--transparent' : 'header';
  const logoHtml = isTransparent
    ? `<img src="/assets/images/logo/logo-white.svg" alt="WeBoat Brasil" width="150" height="40" class="header__logo-white">
          <img src="/assets/images/logo/logo.svg" alt="WeBoat Brasil" width="150" height="40" class="header__logo-dark">`
    : `<img src="/assets/images/logo/logo.svg" alt="WeBoat Brasil" width="150" height="40" class="header__logo-dark">`;
  return `  <!-- Header -->
  <header class="${headerClass}" id="header">
    <div class="container">
      <div class="header__inner">
        <!-- Logo -->
        <a href="/en/" class="header__logo" aria-label="WeBoat Brasil - Home">
          ${logoHtml}
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
            <a href="__LANGSW_PT_HREF__" class="lang-switcher__option" role="menuitem">
              <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#229e45" d="M0 0h640v480H0z"/><path fill="#f8e509" d="m321.4 20 301.5 220.1L321.4 460 19.9 240.1z"/><circle fill="#2b49a3" cx="321.4" cy="240" r="110"/></svg>
              Portugues
            </a>
            <a href="__LANGSW_EN_HREF__" class="lang-switcher__option lang-switcher__option--active" role="menuitem">
              <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#bd3d44" d="M0 0h640v480H0z"/><path stroke="#fff" stroke-width="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/><path fill="#192f5d" d="M0 0h364.8v258.5H0z"/></svg>
              English
            </a>
            <a href="__LANGSW_ES_HREF__" class="lang-switcher__option" role="menuitem">
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
          <a href="__LANGSW_PT_HREF__">
            <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#229e45" d="M0 0h640v480H0z"/><path fill="#f8e509" d="m321.4 20 301.5 220.1L321.4 460 19.9 240.1z"/><circle fill="#2b49a3" cx="321.4" cy="240" r="110"/></svg>
            PT
          </a>
          <a href="__LANGSW_EN_HREF__" class="active">
            <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#bd3d44" d="M0 0h640v480H0z"/><path stroke="#fff" stroke-width="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/><path fill="#192f5d" d="M0 0h364.8v258.5H0z"/></svg>
            EN
          </a>
          <a href="__LANGSW_ES_HREF__">
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
      html = html.replace(headerMatch[0], '\n\n' + getEnHeader(ptUrl, enUrl, esUrl, !!page.isHomepage));
    } else {
      // Try alternate header pattern (no comment)
      const headerRegex2 = /\s*<header class="header[^"]*"[\s\S]*?<\/header>/;
      const headerMatch2 = html.match(headerRegex2);
      if (headerMatch2) {
        html = html.replace(headerMatch2[0], '\n\n' + getEnHeader(ptUrl, enUrl, esUrl, !!page.isHomepage));
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

  // === STEP 16a: Restore language switcher placeholders ===
  // The placeholders protect lang-switcher hrefs from being overwritten by replaceInternalLinks
  html = html.split('__LANGSW_PT_HREF__').join(ptUrl);
  html = html.split('__LANGSW_EN_HREF__').join(enUrl);
  html = html.split('__LANGSW_ES_HREF__').join(esUrl || ptUrl);

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

  // === STEP 16b: Replace content blocks (BEFORE dictionary) ===
  if (page.contentBlocks && page.contentBlocks.length > 0) {
    for (const [ptText, enText] of page.contentBlocks) {
      html = html.split(ptText).join(enText);
    }
  }

  // === STEP 17: Translate remaining content ===
  html = translateContent(html);

  // === STEP 17b: Translate WhatsApp inline link text (inside protected href attributes) ===
  const waTextReplacements = [
    // *** Full-message entries MUST come before shorter substrings ***
    ['Olá! Gostaria de informações sobre lanchas para eventos e grupos grandes. [via site - home]', 'Hello! I would like information about boats for events and large groups. [via site - home]'],
    ['Olá! Gostaria de informações sobre iates de luxo para passeio no Rio de Janeiro. [via site - home]', 'Hello! I would like information about luxury yachts for trips in Rio de Janeiro. [via site - home]'],
    ['Olá! Quero reservar um passeio de lancha. Qual a disponibilidade? [via site - roteiros]', 'Hello! I want to book a boat trip. What is the availability? [via site - roteiros]'],
    ['Olá! Quero reservar um passeio de lancha. [via site - como-funciona]', 'Hello! I want to book a boat trip. [via site - como-funciona]'],
    ['Olá! Gostaria de informações sobre os combos de churrasco + open bar. [via site - servicos]', 'Hello! I would like information about the BBQ + open bar combos. [via site - servicos]'],
    ['Olá! Gostaria de informações sobre as mesas especiais (queijos e vinhos / snacks). [via site - servicos]', 'Hello! I would like information about the special tables (cheese & wine / snacks). [via site - servicos]'],
    ['Olá! Tenho interesse na lancha', 'Hello! I am interested in the boat'],
    ['Poderia me enviar mais informações?', 'Could you send me more information?'],
    ['Olá! Gostaria de fazer o roteiro', 'Hello! I would like to do the route'],
    ['Qual a disponibilidade?', 'What is the availability?'],
    ['Olá! Gostaria de informações sobre aluguel de lancha no Rio de Janeiro.', 'Hello! I would like information about boat rental in Rio de Janeiro.'],
    ['Olá! Gostaria de informações sobre', 'Hello! I would like information about'],
    ['Olá! Quero reservar a lancha', 'Hello! I want to book the boat'],
    ['Olá! Quero reservar um passeio', 'Hello! I want to book a trip'],
    ['Olá! Quero comemorar meu aniversário na lancha.', 'Hello! I want to celebrate my birthday on a boat.'],
    ['Olá! Estou organizando uma despedida de solteira e gostaria de informações sobre o passeio de lancha.', 'Hello! I am planning a bachelorette party and would like information about the boat trip.'],
    ['Olá! Gostaria de informações sobre eventos corporativos em lancha.', 'Hello! I would like information about corporate events on a boat.'],
    ['Olá! Quero informações sobre o réveillon na lancha para assistir a queima de fogos.', "Hello! I want information about New Year's Eve on a boat to watch the fireworks."],
    ['Olá! Quero informações sobre o Carnaval na lancha.', 'Hello! I would like information about Carnival on a boat.'],
    ['Olá! Quero informações sobre', 'Hello! I want information about'],
    ['Podem me ajudar a organizar?', 'Can you help me organize?'],
    ['Olá! Tenho uma dúvida sobre o aluguel de lancha.', 'Hello! I have a question about boat rental.'],
    ['Olá! Tive um problema com o link de pagamento.', 'Hello! I had a problem with the payment link.'],
    ['Olá! Minha reserva foi confirmada e gostaria de mais informações sobre o embarque.', 'Hello! My reservation was confirmed and I would like more information about boarding.'],
    ['Olá! Vi o artigo sobre as melhores praias e gostaria de agendar um passeio de lancha.', 'Hello! I saw the article about the best beaches and would like to schedule a boat trip.'],
    ['Olá! Gostaria de ajuda para escolher o melhor roteiro de passeio de lancha.', 'Hello! I would like help choosing the best boat trip route.'],
    ['Olá! Gostaria de agendar um passeio de lancha.', 'Hello! I would like to schedule a boat trip.'],
    ['Olá! Li o guia da Marina da Glória e gostaria de reservar um passeio de lancha.', 'Hello! I read the Marina da Gloria guide and would like to book a boat trip.'],
    ['Olá! Gostaria de reservar uma lancha.', 'Hello! I would like to book a boat.'],
    ['Ola! Gostaria de reservar uma lancha. Podem me ajudar a escolher a melhor opção?', 'Hello! I would like to book a boat. Can you help me choose the best option?'],
    ['Ola! Gostaria de ajuda para escolher a melhor area para meu passeio de lancha.', 'Hello! I would like help choosing the best area for my boat trip.'],
    ['Olá! Preciso de ajuda para escolher a lancha ideal para meu grupo.', 'Hello! I need help choosing the ideal boat for my group.'],
    ['Olá! Gostaria de informações sobre o passeio', 'Hello! I would like information about the trip'],
    ['Olá! Vi o artigo sobre', 'Hello! I saw the article about'],
    ['e gostaria de agendar um passeio de lancha.', 'and would like to schedule a boat trip.'],
    ['e gostaria de reservar um passeio de lancha.', 'and would like to book a boat trip.'],
    ['Olá! Li o artigo sobre', 'Hello! I read the article about'],
    // Service-areas page WhatsApp links
    ['Ola! Quero fazer um passeio de lancha na Mureta da Urca.', 'Hello! I want to book a boat trip to Mureta da Urca.'],
    ['Ola! Quero fazer um passeio de lancha na Praia Vermelha.', 'Hello! I want to book a boat trip to Praia Vermelha.'],
    ['Ola! Quero fazer um passeio de lancha por Copacabana.', 'Hello! I want to book a boat trip along Copacabana.'],
    ['Ola! Quero fazer um passeio de lancha nas Ilhas Cagarras.', 'Hello! I want to book a boat trip to Ilhas Cagarras.'],
    ['Ola! Quero fazer um passeio de lancha em Itaipu e Camboinhas.', 'Hello! I want to book a boat trip to Itaipu and Camboinhas.'],
    ['Ola! Quero fazer um passeio de lancha pela Baia de Guanabara.', 'Hello! I want to book a boat trip around Guanabara Bay.'],
    ['Ola! Gostaria de informações sobre as áreas de passeio de lancha.', 'Hello! I would like information about the boat trip areas.'],
    ['Ola! Gostaria de informações sobre as áreas de passeio.', 'Hello! I would like information about the trip areas.'],
    // Contact + how-it-works fragments inside href (after partial translation)
    ['aluguel de lancha', 'boat rental'],
    ['Olá! Gostaria de saber como funciona o aluguel de lancha.', 'Hello! I would like to know how boat rental works.'],
    // Ibiza 42 WhatsApp links
    ['Ola! Tenho interesse na lancha WeBoat Ibiza 42.', 'Hello! I am interested in the WeBoat Ibiza 42 boat.'],
    ['Ola! Quero reservar a lancha WeBoat Ibiza 42.', 'Hello! I want to book the WeBoat Ibiza 42 boat.'],
    // Rio Star 50 WhatsApp fragment
    ['para grupo grande', 'for a large group'],
    // Carnival page WhatsApp fragments (after dictionary changes Carnaval->Carnival)
    ['para o Carnival 2026', 'for Carnival 2026'],
    ['o Carnaval na lancha no Rio de Janeiro', 'Carnival on a boat in Rio de Janeiro'],
    ['o Carnaval na lancha', 'Carnival on a boat'],
    ['o Catamarã Oceano para', 'the Catamarã Oceano for'],
    ['o Barco Gourmet 53 para', 'the Barco Gourmet 53 for'],
    // Services page WhatsApp link fragments (inside href, after "Olá! Gostaria de informações sobre")
    ['o serviço de churrasco na lancha. [via site - servicos]', 'the BBQ service on the boat. [via site - servicos]'],
    ['o serviço de open bar na lancha. [via site - servicos]', 'the open bar service on the boat. [via site - servicos]'],
    ['decoração para festa na lancha. [via site - servicos]', 'decoration for a party on the boat. [via site - servicos]'],
    ['eventos corporativos em lancha. [via site - corporativo]', 'corporate events on a boat. [via site - corporativo]'],
    // WeBoat 390 WhatsApp link fragment (inside href, after "Olá! Tenho interesse na lancha")
    ['com churrasqueira. [via site - weboat-390]', 'with BBQ grill. [via site - weboat-390]'],
    // Generic fragments
    ['Ola!', 'Hello!'],
    ['passeio de lancha', 'boat trip'],
    ['para o', 'for the'],
  ];
  for (const [pt, en] of waTextReplacements) {
    html = html.split(pt).join(en);
  }

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
