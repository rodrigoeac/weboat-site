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
    contentBlocks: [
      // ── LONG BLOCKS FIRST (must run before short fragments to avoid substring corruption) ──
      // Hero highlights
      ['A partir de R$ 2.300 · 10 a 65 pessoas · Combustível e marinheiro inclusos', 'Desde R$ 2.300 · 10 a 65 personas · Combustible y marinero incluidos'],
      // Visible FAQ <strong> block (contains "a partir de" — MUST come before ['a partir de', 'desde'] short block)
      ['O aluguel de lancha no Rio de Janeiro custa a partir de R$ 2.300 para 5 horas de passeio.', 'El alquiler de lancha en Río de Janeiro cuesta desde R$ 2.300 por 5 horas de paseo.'],
      // Yacht section custom WhatsApp text (href not protected from contentBlocks)
      ['iates de luxo para passeio no Rio de Janeiro', 'yates de lujo para paseo en Río de Janeiro'],
      // Alt text (NOT protected by translateContent - alt is not in protection regex)
      ['Nossa maior lancha para 22 pessoas', 'Nuestra mayor lancha para 22 personas'],
      ['WeBoat 390 - Lancha para 16 pessoas com churrasqueira', 'WeBoat 390 - Lancha para 16 personas con parrilla'],
      ['Schaefer 62 Fly na Marina da Glória com Pão de Açúcar ao fundo', 'Schaefer 62 Fly en la Marina da Glória con el Pan de Azúcar al fondo'],
      ['Iate Intermarine 60 Fly no mar com céu azul', 'Yate Intermarine 60 Fly en el mar con cielo azul'],
      ['Marinheiro WeBoat com camisa da empresa e Cristo Redentor ao fundo', 'Marinero WeBoat con camisa de la empresa y Cristo Redentor al fondo'],
      ['Churrasco sendo preparado a bordo da lancha', 'Asado siendo preparado a bordo de la lancha'],
      ['Amigas brindando com drinks no open bar da lancha', 'Amigas brindando con drinks en el open bar de la lancha'],
      ['All inclusive na lancha', 'All inclusive en la lancha'],
      ['Decoração de aniversário na lancha com balões verdes e letreiro Happy Birthday', 'Decoración de cumpleaños en la lancha con globos verdes y letrero Happy Birthday'],
      ['Catamarã Oceano - Maior embarcação para 50-65 pessoas', 'Catamarán Oceano - Mayor embarcación para 50-65 personas'],
      // Visible FAQ continuation (non-bold text after <strong> block)
      ['Você só paga extra pelos opcionais como churrasco (R$ 250-600), decoração e open bar.', 'Solo paga extra por los opcionales como asado (R$ 250-600), decoración y open bar.'],
      // Schema.org FAQ full answers (JSON-LD is NOT protected by translateContent)
      ['O aluguel de lancha no Rio de Janeiro custa a partir de R$ 2.300 para 5 horas de passeio. O preço varia conforme o tamanho da lancha (de 10 a 65 pessoas), dia da semana (seg-qui é mais barato que sex-dom) e roteiro escolhido. Combustível, marinheiro e equipamentos estão inclusos.', 'El alquiler de lancha en Río de Janeiro cuesta desde R$ 2.300 por 5 horas de paseo. El precio varía según el tamaño de la lancha (de 10 a 65 personas), día de la semana (lun-jue es más barato que vie-dom) y ruta elegida. Combustible, marinero y equipos están incluidos.'],
      ['Todos os passeios incluem combustível, marinheiro experiente, coolers, som Bluetooth, tapete flutuante, macarrões e coletes salva-vidas. Você só paga extra pelos opcionais como churrasco (R$ 250-600), decoração e open bar.', 'Todos los paseos incluyen combustible, marinero experimentado, hieleras, sonido Bluetooth, alfombra flotante, fideos flotantes y chalecos salvavidas. Solo paga extra por los opcionales como asado (R$ 250-600), decoración y open bar.'],
      ['É simples: você escolhe a lancha, define data e roteiro, paga 50% de sinal para reservar, e no dia combina com o marinheiro na Marina da Glória. O passeio dura de 3 a 7 horas dependendo do roteiro. Pode levar bebidas e comidas a bordo.', 'Es simple: usted elige la lancha, define fecha y ruta, paga 50% de seña para reservar, y el día se encuentra con el marinero en la Marina da Glória. El paseo dura de 3 a 7 horas dependiendo de la ruta. Puede llevar bebidas y comida a bordo.'],
      ['A despedida de solteira na lancha é um dos passeios mais pedidos. Oferecemos pacotes com decoração temática, drinks e até brincadeiras. Ideal para grupos de 8 a 20 amigas. Roteiro mais popular: Mureta da Urca com parada para fotos no Pão de Açúcar.', 'La despedida de soltera en la lancha es uno de los paseos más solicitados. Ofrecemos paquetes con decoración temática, tragos y hasta juegos. Ideal para grupos de 8 a 20 amigas. Ruta más popular: Mureta da Urca con parada para fotos en el Pan de Azúcar.'],
      ['Se as condições climáticas impedirem o passeio, você pode remarcar para outra data sem custo ou solicitar reembolso integral. Chuva fraca não cancela. A decisão é tomada em conjunto com o marinheiro no dia, considerando segurança.', 'Si las condiciones climáticas impiden el paseo, puede reprogramar para otra fecha sin costo o solicitar reembolso total. Lluvia leve no cancela. La decisión se toma en conjunto con el marinero el día, considerando seguridad.'],
      ['A Marina da Glória fica na Av. Infante Dom Henrique, S/N, no Aterro do Flamengo, Rio de Janeiro. É o ponto de partida de todos os nossos passeios. Há estacionamento pago no local. Fácil acesso pelo metrô (estação Glória) ou Uber.', 'La Marina da Glória está en la Av. Infante Dom Henrique, S/N, en el Aterro do Flamengo, Río de Janeiro. Es el punto de partida de todos nuestros paseos. Hay estacionamiento pago en el lugar. Fácil acceso por metro (estación Glória) o Uber.'],
      // Schema.org LocalBusiness description
      ['Empresa de aluguel de lanchas no Rio de Janeiro especializada em passeios privativos. Oferece lanchas de 10 a 65 pessoas para festas, despedidas de solteira, aniversários e eventos corporativos, saindo da Marina da Glória.', 'Empresa de alquiler de lanchas en Río de Janeiro especializada en paseos privativos. Ofrece lanchas de 10 a 65 personas para fiestas, despedidas de soltera, cumpleaños y eventos corporativos, saliendo de la Marina da Glória.'],
      // Schema.org slogan
      ['"slogan": "Seu momento no mar do Rio"', '"slogan": "Tu momento en el mar de Río"'],
      // Schema.org knowsAbout
      ['"passeio de barco Rio de Janeiro"', '"paseo de barco Río de Janeiro"'],
      ['"festa na lancha"', '"fiesta en lancha"'],
      ['"despedida de solteira no mar"', '"despedida de soltera en el mar"'],
      ['"aniversário em lancha"', '"cumpleaños en lancha"'],
      ['"evento corporativo náutico"', '"evento corporativo náutico"'],
      ['"réveillon em Copacabana"', '"año nuevo en Copacabana"'],
      ['"roteiro Ilhas Cagarras"', '"ruta Ilhas Cagarras"'],
      ['"roteiro Mureta da Urca"', '"ruta Mureta da Urca"'],
      ['"passeio Copacabana de lancha"', '"paseo Copacabana en lancha"'],
      // Diferenciais multiline blocks (must come before 'lanchas próprias' short block)
      ['5 lanchas próprias para aluguel no Rio de Janeiro.\n                  Não dependemos de terceiros para seu passeio privativo.', '5 lanchas propias para alquiler en Río de Janeiro.\n                  No dependemos de terceros para su paseo privado.'],
      ['Nossa base fica na Marina da Glória.\n                  Estrutura completa para receber você e seu grupo.', 'Nuestra base está en la Marina da Glória.\n                  Estructura completa para recibirlo a usted y su grupo.'],
      ['9 funcionários dedicados ao seu passeio de lancha.\n                  Marinheiros habilitados e suporte completo.', '9 empleados dedicados a su paseo en lancha.\n                  Marineros habilitados y soporte completo.'],
      ['Manutenção preventiva para todas as lanchas.\n                  Seu passeio de barco privativo com segurança.', 'Mantenimiento preventivo para todas las lanchas.\n                  Su paseo privado con seguridad.'],
      ['Maior número de avaliações positivas entre empresas de\n                  aluguel de lancha no Rio de Janeiro.', 'Mayor número de reseñas positivas entre empresas de\n                  alquiler de lanchas en Río de Janeiro.'],
      ['Conheça nossa frota de lanchas para aluguel no Rio de Janeiro.\n            Temos opções para grupos de 2 a 65 pessoas. Todas as embarcações\n            são vistoriadas e preparadas para seu passeio privativo.', 'Conozca nuestra flota de lanchas para alquiler en Río de Janeiro.\n            Tenemos opciones para grupos de 2 a 65 personas. Todas las embarcaciones\n            están inspeccionadas y preparadas para su paseo privado.'],
      ['Organizando um evento corporativo, festa ou confraternização grande?\n            Temos embarcações para grupos de 30 a 65 pessoas com toda estrutura necessária.', '¿Organizando un evento corporativo, fiesta o celebración grande?\n            Tenemos embarcaciones para grupos de 30 a 65 personas con toda la estructura necesaria.'],
      ['Sofisticação e conforto para quem busca uma experiência exclusiva.\n            Iates acima de 60 pés com ar-condicionado, gerador e acabamento premium.', 'Sofisticación y confort para quienes buscan una experiencia exclusiva.\n            Yates de más de 60 pies con aire acondicionado, generador y acabado premium.'],
      ['Escolha o roteiro ideal para seu passeio de barco privativo no Rio de Janeiro.\n            Do passeio de lancha na Urca até as Ilhas Cagarras, temos opções para\n            todos os gostos e bolsos.', 'Elija la ruta ideal para su paseo privado en lancha en Río de Janeiro.\n            Desde el paseo en lancha en Urca hasta las Ilhas Cagarras, tenemos opciones para\n            todos los gustos y presupuestos.'],
      ['Somos mais que uma empresa de aluguel de lancha no RJ. Somos especialistas\n            em criar experiências inesquecíveis no mar.', 'Somos más que una empresa de alquiler de lanchas en RJ. Somos especialistas\n            en crear experiencias inolvidables en el mar.'],
      ['Personalize seu aluguel de lancha no RJ com nossos serviços exclusivos.\n            Churrasco, open bar, decoração e muito mais.', 'Personalice su alquiler de lancha en RJ con nuestros servicios exclusivos.\n            Asado, open bar, decoración y mucho más.'],
      ['Solicite um orçamento para aluguel de lancha no RJ em minutos.\n            Nossa equipe vai sugerir a melhor lancha para seu grupo e ocasião.', 'Solicite un presupuesto para alquiler de lancha en RJ en minutos.\n            Nuestro equipo le sugerirá la mejor lancha para su grupo y ocasión.'],
      ['O preço varia conforme o tamanho da lancha (de 10 a 65 pessoas), dia da semana (seg-qui é mais barato que sex-dom) e roteiro escolhido. Combustível, marinheiro e equipamentos estão inclusos.', 'El precio varía según el tamaño de la lancha (de 10 a 65 personas), día de la semana (lun-jue es más barato que vie-dom) y ruta elegida. Combustible, marinero y equipos están incluidos.'],
      // FAQ accordion continuation text (non-bold portions)
      ['O passeio dura de 3 a 7 horas dependendo do roteiro. Pode levar bebidas e comidas a bordo.', 'El paseo dura de 3 a 7 horas dependiendo de la ruta. Puede llevar bebidas y comida a bordo.'],
      ['Ideal para grupos de 8 a 20 amigas. Roteiro mais popular: Mureta da Urca com parada para fotos no Pão de Açúcar.', 'Ideal para grupos de 8 a 20 amigas. Ruta más popular: Mureta da Urca con parada para fotos en el Pan de Azúcar.'],
      ['Chuva fraca não cancela. A decisão é tomada em conjunto com o marinheiro no dia, considerando segurança.', 'Lluvia leve no cancela. La decisión se toma en conjunto con el marinero el día, considerando seguridad.'],
      ['É o ponto de partida de todos os nossos passeios. Há estacionamento pago no local. Fácil acesso pelo metrô (estação Glória) ou Uber.', 'Es el punto de partida de todos nuestros paseos. Hay estacionamiento pago en el lugar. Fácil acceso por metro (estación Glória) o Uber.'],
      // FAQ accordion list items
      ['<li>Escolha a lancha ideal para o tamanho do seu grupo</li>', '<li>Elija la lancha ideal para el tamaño de su grupo</li>'],
      ['<li>Defina a data e o roteiro (Urca, Copacabana, Ilhas Cagarras...)</li>', '<li>Defina la fecha y la ruta (Urca, Copacabana, Ilhas Cagarras...)</li>'],
      ['<li>Pague 50% de sinal via PIX ou cartão</li>', '<li>Pague 50% de seña vía PIX o tarjeta</li>'],
      ['<li>No dia, encontre o marinheiro na Marina da Glória às 8h ou 14h</li>', '<li>El día, encuéntrese con el marinero en la Marina da Glória a las 8h o 14h</li>'],
      ['<li>Aproveite o passeio e pague o restante no final</li>', '<li>Disfrute el paseo y pague el resto al final</li>'],
      ['<li>Decoração rosa e branca (opcional)</li>', '<li>Decoración rosa y blanca (opcional)</li>'],
      ['<li>Drinks e espumante (open bar opcional)</li>', '<li>Tragos y espumante (open bar opcional)</li>'],
      ['<li>Som com playlist personalizada</li>', '<li>Sonido con playlist personalizada</li>'],
      ['<li>Parada para fotos com cenário icônico</li>', '<li>Parada para fotos con escenario icónico</li>'],
      ['Ver pacotes de despedida de solteira', 'Ver paquetes de despedida de soltera'],
      ['Ver mapa e como chegar', 'Ver mapa y cómo llegar'],
      ['Combustível para o roteiro completo', 'Combustible para la ruta completa'],
      ['Som Bluetooth conectado', 'Sonido Bluetooth conectado'],
      ['Tapete e macarrões flutuantes', 'Alfombra y fideos flotantes'],
      ['Seguro obrigatório', 'Seguro obligatorio'],
      ['Coolers (gelo não incluso)', 'Hieleras (hielo no incluido)'],
      // ── SHORT BLOCKS (run after long ones) ──
      // Hero
      ['Marina da Glória, Rio de Janeiro', 'Marina da Glória, Río de Janeiro'],
      ['Aluguel de Lancha no Rio de Janeiro', 'Alquiler de Lancha en Río de Janeiro'],
      ['Passeio privativo de lancha com as melhores vistas do mundo.\n          Do Pão de Açúcar às Ilhas Cagarras, viva experiências inesquecíveis\n          no mar com conforto e segurança.', 'Paseo privado en lancha con las mejores vistas del mundo.\n          Del Pan de Azúcar a las Ilhas Cagarras, viva experiencias inolvidables\n          en el mar con confort y seguridad.'],
      ['Alugar Lancha Agora', 'Alquilar Lancha Ahora'],
      ['Ver Lanchas', 'Ver Lanchas'],
      ['Role para descobrir', 'Desplácese para descubrir'],
      // Social proof
      ['passeios realizados', 'paseos realizados'],
      ['lanchas próprias', 'lanchas propias'],
      ['avaliações 5 estrelas', 'reseñas 5 estrellas'],
      ['seguidores no Instagram', 'seguidores en Instagram'],
      // Lanchas section
      ['Lanchas para Alugar no Rio de Janeiro', 'Lanchas para Alquilar en Río de Janeiro'],
      ['Própria WeBoat', 'Propia WeBoat'],
      ['Até 15 pessoas', 'Hasta 15 personas'],
      ['Até 16 pessoas', 'Hasta 16 personas'],
      ['Até 14 pessoas', 'Hasta 14 personas'],
      ['Até 12 pessoas', 'Hasta 12 personas'],
      ['Até 22 pessoas', 'Hasta 22 personas'],
      ['Combustível incluso', 'Combustible incluido'],
      ['Som Bluetooth', 'Sonido Bluetooth'],
      ['Tapete flutuante', 'Alfombra flotante'],
      ['Churrasqueira', 'Parrilla'],
      ['Conforto premium', 'Confort premium'],
      ['Flybridge exclusivo', 'Flybridge exclusivo'],
      ['Maior capacidade', 'Mayor capacidad'],
      // IMPORTANT: full-sentence blocks with seg-qui/sex-dom MUST come BEFORE the short replacements
      ['*Valores para o Roteiro 1 - Mureta da Urca. Consulte valores para outros roteiros.', '*Precios para la Ruta 1 - Mureta da Urca. Consulte precios para otras rutas.'],
      ['*Valores promocionais de seg-qui não são válidos para períodos festivos e feriados.', '*Precios promocionales de lun-jue no son válidos para períodos festivos y feriados.'],
      ['seg-qui', 'lun-jue'],
      ['sex-dom', 'vie-dom'],
      ['Ver Detalhes', 'Ver Detalles'],
      ['Ver Todas as Lanchas', 'Ver Todas las Lanchas'],
      // Eventos 30+ section
      ['Grandes Grupos', 'Grupos Grandes'],
      ['Lanchas para Eventos e Festas (30+ pessoas)', 'Lanchas para Eventos y Fiestas (30+ personas)'],
      ['30-40 pessoas', '30-40 personas'],
      ['35-50 pessoas', '35-50 personas'],
      ['50-65 pessoas', '50-65 personas'],
      ['Ideal para eventos corporativos e festas', 'Ideal para eventos corporativos y fiestas'],
      ['4 caixas PZ ativas + gerador incluso', '4 parlantes PZ activos + generador incluido'],
      ['Nossa maior embarcação com gerador', 'Nuestra mayor embarcación con generador'],
      ['a partir de', 'desde'],
      ['Solicitar Orçamento para Evento', 'Solicitar Presupuesto para Evento'],
      // Iates de Luxo section
      ['Experiência Premium', 'Experiencia Premium'],
      ['Iates de Luxo', 'Yates de Lujo'],
      ['até 12 pessoas', 'hasta 12 personas'],
      ['até 16 pessoas', 'hasta 16 personas'],
      ['até 17 pessoas', 'hasta 17 personas'],
      ['Solicitar Orçamento para Iate', 'Solicitar Presupuesto para Yate'],
      // Roteiros section
      ['Roteiros de Passeio de Lancha no Rio de Janeiro', 'Rutas de Paseo en Lancha en Río de Janeiro'],
      ['Melhor custo-benefício', 'Mejor costo-beneficio'],
      ['Roteiro 1 - Mureta da Urca', 'Ruta 1 - Mureta da Urca'],
      ['Marina da Glória, Flamengo, Botafogo e Urca. Parada para mergulho na Mureta da Urca.', 'Marina da Glória, Flamengo, Botafogo y Urca. Parada para buceo en la Mureta da Urca.'],
      ['5 horas', '5 horas'],
      ['1 parada', '1 parada'],
      ['Mais vendido', 'Más vendido'],
      ['Roteiro 2 - Praia Vermelha', 'Ruta 2 - Praia Vermelha'],
      ['Tudo do Roteiro 1 + Praia Vermelha. Vista do Pão de Açúcar e mergulho em águas calmas.', 'Todo de la Ruta 1 + Praia Vermelha. Vista del Pan de Azúcar y buceo en aguas tranquilas.'],
      ['2 paradas', '2 paradas'],
      ['Vista icônica', 'Vista icónica'],
      ['Roteiro 3 - Copacabana', 'Ruta 3 - Copacabana'],
      ['Tudo do Roteiro 2 + Orla de Copacabana. Fotos incríveis da praia mais famosa do Brasil.', 'Todo de la Ruta 2 + Costa de Copacabana. Fotos increíbles de la playa más famosa de Brasil.'],
      ['Mar aberto', 'Mar abierto'],
      ['Roteiro 4 - Ilhas Cagarras', 'Ruta 4 - Ilhas Cagarras'],
      ['Tudo do Roteiro 3 + Ilhas Cagarras. Navegação oceânica e mergulho em águas cristalinas.', 'Todo de la Ruta 3 + Ilhas Cagarras. Navegación oceánica y buceo en aguas cristalinas.'],
      ['3 paradas', '3 paradas'],
      ['Praias desertas', 'Playas desiertas'],
      ['Roteiro 5 - Itaipu e Camboinhas', 'Ruta 5 - Itaipu y Camboinhas'],
      ['Marina, Piratininga, Camboinhas e Itaipu. Praias semi-desertas em Niterói.', 'Marina, Piratininga, Camboinhas e Itaipu. Playas semidesertas en Niterói.'],
      ['Experiência completa', 'Experiencia completa'],
      ['Roteiro 6 - Volta Completa', 'Ruta 6 - Vuelta Completa'],
      ['O melhor do Rio de Janeiro em um único passeio. Todos os pontos turísticos do mar.', 'Lo mejor de Río de Janeiro en un solo paseo. Todos los puntos turísticos del mar.'],
      ['4+ paradas', '4+ paradas'],
      ['Ver Roteiro', 'Ver Ruta'],
      ['Ver Todos os Roteiros', 'Ver Todas las Rutas'],
      // Diferenciais section
      ['Por que WeBoat', 'Por qué WeBoat'],
      ['Por que escolher a WeBoat para alugar lancha no Rio de Janeiro?', '¿Por qué elegir WeBoat para alquilar lancha en Río de Janeiro?'],
      ['Frota Própria de Lanchas', 'Flota Propia de Lanchas'],
      ['Loja na Marina da Glória', 'Tienda en la Marina da Glória'],
      ['Equipe Especializada', 'Equipo Especializado'],
      ['Mecânico Próprio', 'Mecánico Propio'],
      ['+1.000 Avaliações 5 Estrelas', '+1.000 Reseñas 5 Estrellas'],
      // Serviços section
      ['Serviços para seu Passeio de Lancha', 'Servicios para su Paseo en Lancha'],
      ['Churrasco a Bordo', 'Asado a Bordo'],
      ['Carnes premium preparadas a bordo durante seu passeio. Churrasqueiro dedicado incluso.', 'Carnes premium preparadas a bordo durante su paseo. Asador dedicado incluido.'],
      ['Drinks clássicos e cerveja gelada durante todo o passeio. Barman incluso.', 'Tragos clásicos y cerveza helada durante todo el paseo. Barman incluido.'],
      ['Mais Pedido', 'Más Solicitado'],
      ['All Inclusive', 'All Inclusive'],
      ['A combinação perfeita: churrasco completo com open bar durante todo o passeio.', 'La combinación perfecta: asado completo con open bar durante todo el paseo.'],
      ['Decoração e Festas', 'Decoración y Fiestas'],
      ['Decoração temática para aniversários, despedidas e pedidos de casamento.', 'Decoración temática para cumpleaños, despedidas y propuestas de matrimonio.'],
      ['/ pessoa', '/ persona'],
      ['/ pacote', '/ paquete'],
      ['*Valores variam de acordo com a quantidade de pessoas e tamanho da lancha.', '*Los precios varían según la cantidad de personas y el tamaño de la lancha.'],
      ['Saiba Mais', 'Más Información'],
      ['Ver Todos os Serviços', 'Ver Todos los Servicios'],
      // Service card links (hash fragments not caught by replaceInternalLinks)
      ['href="/servicos/#churrasco"', 'href="/es/servicios/#churrasco"'],
      ['href="/servicos/#open-bar"', 'href="/es/servicios/#open-bar"'],
      ['href="/servicos/#combo"', 'href="/es/servicios/#combo"'],
      ['href="/servicos/#decoracao"', 'href="/es/servicios/#decoracao"'],
      // Avaliações section
      ['Experiências Reais', 'Experiencias Reales'],
      ['+1.000 Avaliações 5 Estrelas no Google', '+1.000 Reseñas 5 Estrellas en Google'],
      ['Histórias de quem já viveu momentos inesquecíveis com a WeBoat Brasil.', 'Historias de quienes ya vivieron momentos inolvidables con WeBoat Brasil.'],
      // FAQ section
      ['Dúvidas sobre Aluguel de Lancha no Rio de Janeiro', 'Dudas sobre Alquiler de Lancha en Río de Janeiro'],
      ['Quanto custa alugar uma lancha no Rio de Janeiro?', '¿Cuánto cuesta alquilar una lancha en Río de Janeiro?'],
      // (moved to top of contentBlocks — before 'a partir de' short block)
      ['O que está incluso no aluguel de lancha no RJ?', '¿Qué está incluido en el alquiler de lancha en RJ?'],
      ['Todos os passeios incluem combustível, marinheiro experiente, coolers, som Bluetooth, tapete flutuante, macarrões e coletes salva-vidas.', 'Todos los paseos incluyen combustible, marinero experimentado, hieleras, sonido Bluetooth, alfombra flotante, fideos flotantes y chalecos salvavidas.'],
      ['Como funciona o aluguel de lancha na WeBoat?', '¿Cómo funciona el alquiler de lancha en WeBoat?'],
      ['É simples: você escolhe a lancha, define data e roteiro, paga 50% de sinal para reservar, e no dia combina com o marinheiro na Marina da Glória.', 'Es simple: usted elige la lancha, define fecha y ruta, paga 50% de seña para reservar, y el día se encuentra con el marinero en la Marina da Glória.'],
      ['Como funciona a despedida de solteira na lancha?', '¿Cómo funciona la despedida de soltera en la lancha?'],
      ['A despedida de solteira na lancha é um dos passeios mais pedidos. Oferecemos pacotes com decoração temática, drinks e até brincadeiras.', 'La despedida de soltera en la lancha es uno de los paseos más solicitados. Ofrecemos paquetes con decoración temática, tragos y hasta juegos.'],
      ['E se chover no dia do passeio de lancha?', '¿Y si llueve el día del paseo en lancha?'],
      ['Se as condições climáticas impedirem o passeio, você pode remarcar para outra data sem custo ou solicitar reembolso integral.', 'Si las condiciones climáticas impiden el paseo, puede reprogramar para otra fecha sin costo o solicitar reembolso total.'],
      ['Onde fica a Marina da Glória?', '¿Dónde queda la Marina da Glória?'],
      ['A Marina da Glória fica na Av. Infante Dom Henrique, S/N, no Aterro do Flamengo, Rio de Janeiro.', 'La Marina da Glória está en la Av. Infante Dom Henrique, S/N, en el Aterro do Flamengo, Río de Janeiro.'],
      ['Ver Todas as Dúvidas', 'Ver Todas las Dudas'],
      // CTA Final
      ['Pronto para seu Passeio de Lancha no Rio de Janeiro?', '¿Listo para su Paseo en Lancha en Río de Janeiro?'],
      ['Falar no WhatsApp', 'Chatear por WhatsApp'],
      ['Ver Formulário', 'Ver Formulario'],
      ['<li>Marinheiro habilitado pela Marinha</li>', '<li>Marinero habilitado por la Marina</li>'],
      ['<strong>Lanchas pequenas (até 15 pessoas):</strong> R$ 2.300 a R$ 2.700', '<strong>Lanchas pequeñas (hasta 15 personas):</strong> R$ 2.300 a R$ 2.700'],
      ['<strong>Lanchas médias (16-22 pessoas):</strong> R$ 2.600 a R$ 4.500', '<strong>Lanchas medianas (16-22 personas):</strong> R$ 2.600 a R$ 4.500'],
      ['<strong>Lanchas grandes (até 65 pessoas):</strong> sob consulta', '<strong>Lanchas grandes (hasta 65 personas):</strong> bajo consulta'],
    ],
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
    contentBlocks: [
      // ── LONG BLOCKS FIRST (must run before short fragments to avoid substring corruption) ──
      // Schema FAQ "diferença" answer (JSON-LD not protected)
      ['As 5 lanchas próprias WeBoat têm prioridade no agendamento e atendimento direto da nossa equipe. As 21 lanchas parceiras ampliam as opções para grupos maiores e ocasiões especiais. Todas passam pela mesma vistoria de segurança e oferecem o padrão WeBoat de qualidade.', 'Las 5 lanchas propias WeBoat tienen prioridad en la programación y atención directa de nuestro equipo. Las 21 lanchas asociadas amplían las opciones para grupos más grandes y ocasiones especiales. Todas pasan por la misma inspección de seguridad y ofrecen el estándar WeBoat de calidad.'],
      // Visible <strong> block + continuation (multiline with newline + 20-space indent)
      ['<strong>As 5 lanchas próprias WeBoat têm prioridade no agendamento e atendimento direto da nossa equipe. As 21 lanchas parceiras ampliam as opções para grupos maiores e ocasiões especiais.</strong>\n                    Todas passam pela mesma vistoria de segurança e oferecem o padrão WeBoat de qualidade.', '<strong>Las 5 lanchas propias WeBoat tienen prioridad en la programación y atención directa de nuestro equipo. Las 21 lanchas asociadas amplían las opciones para grupos más grandes y ocasiones especiales.</strong>\n                    Todas pasan por la misma inspección de seguridad y ofrecen el estándar WeBoat de calidad.'],
      // Schema FAQ answers (JSON-LD not protected) — MUST come before ['pessoas', 'personas'] etc.
      ['A escolha depende do tamanho do grupo: até 15 pessoas, WeBoat 32 ou Oceanic 36. Até 22 pessoas, Rio Star 50. Para grupos de 30 a 65 pessoas, temos catamarãs e barcos para eventos. Se quiser churrasco a bordo, todas as lanchas possuem churrasqueira (taxa adicional de R$ 250 a R$ 600).', 'La elección depende del tamaño del grupo: hasta 15 personas, WeBoat 32 u Oceanic 36. Hasta 22 personas, Rio Star 50. Para grupos de 30 a 65 personas, tenemos catamaranes y barcos para eventos. Si quiere asado a bordo, todas las lanchas tienen parrilla (tarifa adicional de R$ 250 a R$ 600).'],
      ['Todas as lanchas incluem combustível para o roteiro, marinheiro habilitado pela Marinha, coolers, som Bluetooth, tapete flutuante, macarrões e coletes salva-vidas. Você só paga extra por opcionais como churrasco, decoração e open bar.', 'Todas las lanchas incluyen combustible para la ruta, marinero habilitado por la Marina, hieleras, sonido Bluetooth, alfombra flotante, fideos flotantes y chalecos salvavidas. Solo paga extra por opcionales como asado, decoración y open bar.'],
      ['Sim, você pode trazer bebidas e petiscos sem custo adicional. As lanchas possuem coolers para armazenamento (gelo não incluso). Todas as lanchas possuem churrasqueira, mas o uso requer contratação de serviço adicional (R$ 250 a R$ 600).', 'Sí, puede traer bebidas y bocadillos sin costo adicional. Las lanchas tienen hieleras para almacenamiento (hielo no incluido). Todas las lanchas tienen parrilla, pero su uso requiere contratación de servicio adicional (R$ 250 a R$ 600).'],
      ['Entre em contato pelo WhatsApp (21) 97772-4114, informe a data, número de pessoas e roteiro desejado. Reservamos com 50% de sinal via PIX ou cartão. O restante é pago no dia do passeio. Cancelamento com reembolso até 48h antes.', 'Contáctenos por WhatsApp (21) 97772-4114, informe la fecha, número de personas y ruta deseada. Reservamos con 50% de seña vía PIX o tarjeta. El resto se paga el día del paseo. Cancelación con reembolso hasta 48h antes.'],
      // FAQ accordion full visible answers (contain "pessoas", "churrasqueira", etc.)
      ['A escolha depende do tamanho do grupo: até 15 pessoas, WeBoat 32 ou Oceanic 36. Até 22 pessoas, Rio Star 50. Para grupos de 30 a 65 pessoas, temos catamarãs e barcos para eventos.', 'La elección depende del tamaño del grupo: hasta 15 personas, WeBoat 32 u Oceanic 36. Hasta 22 personas, Rio Star 50. Para grupos de 30 a 65 personas, tenemos catamaranes y barcos para eventos.'],
      ['Se quiser churrasco a bordo, todas as lanchas possuem churrasqueira (taxa adicional de R$ 250 a R$ 600).', 'Si quiere asado a bordo, todas las lanchas tienen parrilla (tarifa adicional de R$ 250 a R$ 600).'],
      ['Todas as lanchas incluem combustível para o roteiro, marinheiro habilitado pela Marinha, coolers, som Bluetooth, tapete flutuante, macarrões e coletes salva-vidas.', 'Todas las lanchas incluyen combustible para la ruta, marinero habilitado por la Marina, hieleras, sonido Bluetooth, alfombra flotante, fideos flotantes y chalecos salvavidas.'],
      ['Sim, você pode trazer bebidas e petiscos sem custo adicional. As lanchas possuem coolers para armazenamento (gelo não incluso).', 'Sí, puede traer bebidas y bocadillos sin costo adicional. Las lanchas tienen hieleras para almacenamiento (hielo no incluido).'],
      ['Todas as lanchas possuem churrasqueira, mas o uso requer contratação de serviço adicional (R$ 250 a R$ 600).', 'Todas las lanchas tienen parrilla, pero su uso requiere contratación de servicio adicional (R$ 250 a R$ 600).'],
      ['Entre em contato pelo WhatsApp (21) 97772-4114, informe a data, número de pessoas e roteiro desejado. Reservamos com 50% de sinal via PIX ou cartão.', 'Contáctenos por WhatsApp (21) 97772-4114, informe la fecha, número de personas y ruta deseada. Reservamos con 50% de seña vía PIX o tarjeta.'],
      ['O restante é pago no dia do passeio. Cancelamento com reembolso até 48h antes.', 'El resto se paga el día del paseo. Cancelación con reembolso hasta 48h antes.'],
      // FAQ "preços diferentes" — Schema FAQ full answer (JSON-LD not protected)
      ['Os valores de segunda a quinta são promocionais porque a demanda é menor. Sexta, sábado e domingo têm alta procura. Por exemplo, a WeBoat 32 custa R$ 2.300 seg-qui e R$ 2.700 sex-dom - economia de R$ 400.', 'Los valores de lunes a jueves son promocionales porque la demanda es menor. Viernes, sábado y domingo tienen alta demanda. Por ejemplo, la WeBoat 32 cuesta R$ 2.300 lun-jue y R$ 2.700 vie-dom - ahorro de R$ 400.'],
      // FAQ "preços diferentes" — Schema FAQ question name (JSON-LD not protected)
      ['Por que os preços são diferentes de segunda a quinta?', '¿Por qué los precios son diferentes de lunes a jueves?'],
      // FAQ "preços diferentes" — visible <strong> + continuation (multiline, newline + 20-space indent)
      ['<strong>Os valores de segunda a quinta são promocionais porque a demanda é menor. Sexta, sábado e domingo têm alta procura.</strong>\n                    Por exemplo, a WeBoat 32 custa R$ 2.300 seg-qui e R$ 2.700 sex-dom - economia de R$ 400.', '<strong>Los valores de lunes a jueves son promocionales porque la demanda es menor. Viernes, sábado y domingo tienen alta demanda.</strong>\n                    Por ejemplo, la WeBoat 32 cuesta R$ 2.300 lun-jue y R$ 2.700 vie-dom - ahorro de R$ 400.'],
      // CollectionPage description (Schema JSON-LD)
      ['26 lanchas para aluguel no RJ. 5 próprias e 21 parceiras para grupos de 10 a 65 pessoas.', '26 lanchas para alquiler en RJ. 5 propias y 21 asociadas para grupos de 10 a 65 personas.'],
      // Page header description (visible)
      ['5 lanchas próprias e 21 parceiras para grupos de 10 a 65 pessoas.\n            Todas as embarcações são vistoriadas e preparadas para seu passeio privativo.', '5 lanchas propias y 21 asociadas para grupos de 10 a 65 personas.\n            Todas las embarcaciones están inspeccionadas y preparadas para su paseo privado.'],
      // FAQ accordion list items
      ['<strong>Até 15 pessoas:</strong> WeBoat 32 (R$ 2.300) ou Oceanic 36 (R$ 2.400)', '<strong>Hasta 15 personas:</strong> WeBoat 32 (R$ 2.300) u Oceanic 36 (R$ 2.400)'],
      ['<strong>Até 22 pessoas:</strong> Rio Star 50 (R$ 4.000) ou WeBoat 390 (R$ 2.600)', '<strong>Hasta 22 personas:</strong> Rio Star 50 (R$ 4.000) o WeBoat 390 (R$ 2.600)'],
      ['<strong>30-65 pessoas:</strong> Catamarã Oceano ou Barco Gourmet', '<strong>30-65 personas:</strong> Catamarán Oceano o Barco Gourmet'],
      // Partner section (contains "pessoas")
      ['Para grupos acima de 22 pessoas, oferecemos lanchas de parceiros selecionados, com o mesmo padrão de qualidade e serviço.', 'Para grupos de más de 22 personas, ofrecemos lanchas de socios seleccionados, con el mismo estándar de calidad y servicio.'],
      ['Conheça nossas lanchas próprias e parceiras. De 10 a 65 pessoas, para todos os tipos de passeio e ocasião.', 'Conozca nuestras lanchas propias y asociadas. De 10 a 65 personas, para todo tipo de paseo y ocasión.'],
      ['Compare as especificações, capacidade e preços de todas as nossas lanchas.', 'Compare las especificaciones, capacidad y precios de todas nuestras lanchas.'],
      ['Nossa equipe pode sugerir a lancha ideal para seu grupo e ocasião.', 'Nuestro equipo puede sugerir la lancha ideal para su grupo y ocasión.'],
      ['Veja a opinião de quem já alugou nossas lanchas e viveu essa experiência.', 'Vea la opinión de quienes ya alquilaron nuestras lanchas y vivieron esa experiencia.'],
      // Alt text
      ['Nossa maior lancha para 20-22 pessoas', 'Nuestra mayor lancha para 20-22 personas'],
      ['Lancha com churrasqueira para 16 pessoas', 'Lancha con parrilla para 16 personas'],
      ['Lancha com ar-condicionado para 20 pessoas', 'Lancha con aire acondicionado para 20 personas'],
      ['Lancha com ar-condicionado para 22 pessoas', 'Lancha con aire acondicionado para 22 personas'],
      ['Lancha com ar-condicionado para 18-22 pessoas', 'Lancha con aire acondicionado para 18-22 personas'],
      ['Schaefer 62 Fly na Marina da Glória com Pão de Açúcar ao fundo', 'Schaefer 62 Fly en la Marina da Glória con el Pan de Azúcar al fondo'],
      ['Iate Intermarine 60 Fly no mar com céu azul', 'Yate Intermarine 60 Fly en el mar con cielo azul'],
      // Visible FAQ continuation
      ['Você só paga extra por opcionais como churrasco, decoração e open bar.', 'Solo paga extra por opcionales como asado, decoración y open bar.'],
      // Header
      ['Nossa Frota', 'Nuestra Flota'],
      ['Lanchas para Aluguel no Rio de Janeiro', 'Lanchas para Alquiler en Río de Janeiro'],
      // ── SHORT BLOCKS (run after long ones) ──
      ['Lanchas Próprias', 'Lanchas Propias'],
      ['Lanchas Parceiras', 'Lanchas Asociadas'],
      ['pessoas', 'personas'],
      ['Combustível Incluso', 'Combustible Incluido'],
      ['Lancha própria', 'Lancha propia'],
      ['Até 15 pessoas', 'Hasta 15 personas'],
      ['Até 16 pessoas', 'Hasta 16 personas'],
      ['Até 14 pessoas', 'Hasta 14 personas'],
      ['Até 12 pessoas', 'Hasta 12 personas'],
      ['20-22 pessoas', '20-22 personas'],
      ['Prioridade no aluguel e melhor atendimento', 'Prioridad en el alquiler y mejor atención'],
      ['Combustível incluso', 'Combustible incluido'],
      ['Som Bluetooth', 'Sonido Bluetooth'],
      ['Tapete flutuante', 'Alfombra flotante'],
      ['Churrasqueira', 'Parrilla'],
      ['Conforto premium', 'Confort premium'],
      ['Maior capacidade', 'Mayor capacidad'],
      ['Flybridge exclusivo', 'Flybridge exclusivo'],
      // IMPORTANT: full-sentence blocks with seg-qui MUST come BEFORE the short replacements
      ['*Valores para o Roteiro 1 - Mureta da Urca. Consulte valores para outros roteiros.', '*Precios para la Ruta 1 - Mureta da Urca. Consulte precios para otras rutas.'],
      ['*Valores promocionais de seg-qui não são válidos para períodos festivos e feriados.', '*Precios promocionales de lun-jue no son válidos para períodos festivos y feriados.'],
      ['seg-qui', 'lun-jue'],
      ['sex-dom', 'vie-dom'],
      ['Ver Detalhes', 'Ver Detalles'],
      // Partner boats section
      ['Lanchas Parceiras — Para Grupos Maiores', 'Lanchas Asociadas — Para Grupos Más Grandes'],
      ['Para grupos acima de 22 pessoas, oferecemos lanchas de parceiros selecionados, com o mesmo padrão de qualidade e serviço.', 'Para grupos de más de 22 personas, ofrecemos lanchas de socios seleccionados, con el mismo estándar de calidad y servicio.'],
      ['Todos com combustível, marinheiro e seguro inclusos', 'Todos con combustible, marinero y seguro incluidos'],
      ['Lanchas de 10 a 65 pessoas', 'Lanchas de 10 a 65 personas'],
      ['Reserve pelo WhatsApp', 'Reserve por WhatsApp'],
      // Compare section
      ['Não sabe qual lancha escolher?', '¿No sabe cuál lancha elegir?'],
      ['Compare as especificações, capacidade e preços de todas as nossas lanchas.', 'Compare las especificaciones, capacidad y precios de todas nuestras lanchas.'],
      ['Comparar Lanchas', 'Comparar Lanchas'],
      // FAQ
      ['Perguntas Frequentes sobre a Frota', 'Preguntas Frecuentes sobre la Flota'],
      ['Qual a diferença entre lancha própria e parceira?', '¿Cuál es la diferencia entre lancha propia y asociada?'],
      ['Todas as lanchas possuem churrasqueira?', '¿Todas las lanchas tienen parrilla?'],
      ['Posso levar bebidas e comidas?', '¿Puedo llevar bebidas y comida?'],
      ['O que está incluso no aluguel?', '¿Qué está incluido en el alquiler?'],
      // CTA
      ['Precisa de Ajuda para Escolher?', '¿Necesita Ayuda para Elegir?'],
      ['Última atualização: Fevereiro 2026', 'Última actualización: Febrero 2026'],
      // Includes section
      ['>Combustível</h3>', '>Combustible</h3>'],
      ['Para todo o roteiro contratado', 'Para toda la ruta contratada'],
      ['>Marinheiro</h3>', '>Marinero</h3>'],
      ['Habilitado e experiente', 'Habilitado y experimentado'],
      ['Para manter suas bebidas geladas', 'Para mantener sus bebidas frías'],
      ['Marinheiro habilitado', 'Marinero habilitado'],
      // CTA
      ['Precisa de ajuda para escolher?', '¿Necesita ayuda para elegir?'],
      ['Fale conosco pelo WhatsApp!', '¡Hable con nosotros por WhatsApp!'],
      ['Como reservar uma lancha?', '¿Cómo reservar una lancha?'],
    ],
  },
  {
    ptPath: 'lanchas/weboat-32/index.html',
    esPath: 'es/lanchas/weboat-32/index.html',
    title: 'WeBoat 32 - Lancha para 15 Personas | Alquiler en Río | WeBoat Brasil',
    description: 'Alquile la WeBoat 32, lancha para hasta 15 personas en Río de Janeiro. ¡Mejor costo-beneficio! Desde R$ 2.300. Combustible y marinero incluidos.',
    keywords: 'weboat 32, lancha 15 personas, alquiler lancha rio de janeiro',
    waMessage: '¡Hola! Me interesa la lancha WeBoat 32. ¿Podrían enviarme más información? [via site - es]',
    css: 'lancha-detalhe',
    contentBlocks: [
      // Schema FAQ question+answer (JSON-LD "da" → "de la")
      ['O que está incluso no aluguel da WeBoat 32?', '¿Qué está incluido en el alquiler de la WeBoat 32?'],
      ['O aluguel da WeBoat 32 inclui: combustível para o roteiro contratado, tripulação habilitada (marinheiro), tapete flutuante, macarrões flutuantes, som com Bluetooth, coolers e coletes salva-vidas.', 'El alquiler de la WeBoat 32 incluye: combustible para la ruta contratada, tripulación habilitada (marinero), alfombra flotante, fideos flotantes, sonido Bluetooth, hieleras y chalecos salvavidas.'],
      ['Lancha Própria WeBoat', 'Lancha Propia WeBoat'],
      ['Melhor custo-benefício da frota', 'Mejor costo-beneficio de la flota'],
      ['Valores do Aluguel', 'Precios del Alquiler'],
      ['Seg-Qui a partir de', 'Lun-Jue desde'],
      ['Valores por Roteiro (Sex-Dom)', 'Precios por Ruta (Vie-Dom)'],
      ['Roteiro 1 - Mureta da Urca', 'Ruta 1 - Mureta da Urca'],
      ['Roteiro 2 - Praia Vermelha', 'Ruta 2 - Praia Vermelha'],
      ['Roteiro 3 - Copacabana', 'Ruta 3 - Copacabana'],
      ['Roteiro 4 - Ilhas Cagarras', 'Ruta 4 - Ilhas Cagarras'],
      ['Roteiro 5 - Itaipu/Camboinhas', 'Ruta 5 - Itaipu/Camboinhas'],
      ['Adicionais', 'Adicionales'],
      ['Hora Extra', 'Hora Extra'],
      ['*Turno: Manhã 09h-14h ou Tarde 14h30-19h30', '*Turno: Mañana 09h-14h o Tarde 14h30-19h30'],
      ['*Churrasqueira inclui: Tripulação, Gelo escama 2x20kg, Gelo filtrado 1x10kg, Carvão', '*Parrilla incluye: Tripulación, Hielo escama 2x20kg, Hielo filtrado 1x10kg, Carbón'],
      ['Reservar pelo WhatsApp', 'Reservar por WhatsApp'],
      ['Montar Proposta', 'Armar Propuesta'],
      ['Sobre a WeBoat 32', 'Sobre la WeBoat 32'],
      ['A WeBoat 32 é a escolha perfeita para quem busca o melhor custo-benefício em aluguel de lancha no Rio de Janeiro. Com capacidade para até 15 pessoas, essa lancha oferece conforto e espaço ideal para passeios em família, aniversários e confraternizações.', 'La WeBoat 32 es la elección perfecta para quienes buscan el mejor costo-beneficio en alquiler de lancha en Río de Janeiro. Con capacidad para hasta 15 personas, esta lancha ofrece confort y espacio ideal para paseos en familia, cumpleaños y celebraciones.'],
      ['Equipada com som Bluetooth, tapete flutuante e coolers, a WeBoat 32 garante diversão completa durante todo o passeio. Navegue pelas águas da Baía de Guanabara com vista para o Pão de Açúcar, Cristo Redentor e as praias mais bonitas do Rio.', 'Equipada con sonido Bluetooth, alfombra flotante y hieleras, la WeBoat 32 garantiza diversión completa durante todo el paseo. Navegue por las aguas de la Baía de Guanabara con vista al Pan de Azúcar, Cristo Redentor y las playas más hermosas de Río.'],
      ['O que está incluso', 'Qué está incluido'],
      ['Combustível para o roteiro', 'Combustible para la ruta'],
      ['Marinheiro experiente', 'Marinero experimentado'],
      ['Tapete flutuante', 'Alfombra flotante'],
      ['Coletes salva-vidas', 'Chalecos salvavidas'],
      ['Macarrões flutuantes', 'Fideos flotantes'],
      ['Equipamentos de segurança', 'Equipos de seguridad'],
      ['Especificações Técnicas', 'Especificaciones Técnicas'],
      ['Tamanho', 'Tamaño'],
      ['Capacidade', 'Capacidad'],
      ['Tipo', 'Tipo'],
      ['Lancha Própria', 'Lancha Propia'],
      ['Som', 'Sonido'],
      ['Banheiro', 'Baño'],
      ['Sim', 'Sí'],
      ['Toldo', 'Toldo'],
      ['Informações Rápidas', 'Información Rápida'],
      ['Passeio de 5 horas', 'Paseo de 5 horas'],
      ['Saída: Marina da Glória', 'Salida: Marina da Glória'],
      ['Disponível todos os dias', 'Disponible todos los días'],
      ['PIX, cartão ou transferência', 'PIX, tarjeta o transferencia'],
      ['Consultar Disponibilidade', 'Consultar Disponibilidad'],
      ['Outras Lanchas', 'Otras Lanchas'],
      ['A partir de', 'Desde'],
      ['Dúvidas', 'Dudas'],
      ['Perguntas Frequentes sobre a WeBoat 32', 'Preguntas Frecuentes sobre la WeBoat 32'],
      ['Quantas pessoas cabem na WeBoat 32?', '¿Cuántas personas caben en la WeBoat 32?'],
      ['A WeBoat 32 tem capacidade para até <strong>15 pessoas</strong>, incluindo crianças. Essa capacidade é definida pela Marinha do Brasil para garantir conforto e segurança de todos a bordo.', 'La WeBoat 32 tiene capacidad para hasta <strong>15 personas</strong>, incluyendo niños. Esta capacidad es definida por la Marina de Brasil para garantizar confort y seguridad de todos a bordo.'],
      ['Qual o valor da hora extra?', '¿Cuál es el valor de la hora extra?'],
      ['O valor da hora extra na WeBoat 32 é de <strong>R$ 800</strong>. A solicitação deve ser feita durante o passeio diretamente com o marinheiro, sujeita à disponibilidade da embarcação.', 'El valor de la hora extra en la WeBoat 32 es de <strong>R$ 800</strong>. La solicitud debe hacerse durante el paseo directamente con el marinero, sujeta a la disponibilidad de la embarcación.'],
      ['A WeBoat 32 tem banheiro?', '¿La WeBoat 32 tiene baño?'],
      ['<strong>Sim!</strong> A WeBoat 32 possui banheiro a bordo para maior conforto dos passageiros durante todo o passeio.', '<strong>¡Sí!</strong> La WeBoat 32 tiene baño a bordo para mayor confort de los pasajeros durante todo el paseo.'],
      ['O que está incluso no aluguel?', '¿Qué está incluido en el alquiler?'],
      ['O aluguel da WeBoat 32 inclui: combustível para o roteiro contratado, tripulação habilitada (marinheiro), tapete flutuante, macarrões flutuantes, som com Bluetooth, coolers e coletes salva-vidas.', 'El alquiler de la WeBoat 32 incluye: combustible para la ruta contratada, tripulación habilitada (marinero), alfombra flotante, fideos flotantes, sonido Bluetooth, hieleras y chalecos salvavidas.'],
      ['Ver Todas as Dúvidas', 'Ver Todas las Dudas'],
      ['Monte sua proposta', 'Arme su propuesta'],
      ['Personalize seu Passeio na WeBoat 32', 'Personalice su Paseo en la WeBoat 32'],
      ['Selecione roteiro, serviços e veja o valor em tempo real', 'Seleccione ruta, servicios y vea el precio en tiempo real'],
      ['Escolha o Roteiro', 'Elija la Ruta'],
      ['Detalhes do Passeio', 'Detalles del Paseo'],
      ['Número de Pessoas', 'Número de Personas'],
      ['Horas Extras', 'Horas Extra'],
      ['Churrasqueira', 'Parrilla'],
      ['Serviços Extras', 'Servicios Extra'],
      ['Resumo da Proposta', 'Resumen de la Propuesta'],
      ['Selecione um roteiro para começar', 'Seleccione una ruta para comenzar'],
      ['Enviar Proposta pelo WhatsApp', 'Enviar Propuesta por WhatsApp'],
      ['Até 15 pessoas', 'Hasta 15 personas'],
    ],
  },
  {
    ptPath: 'lanchas/weboat-390/index.html',
    esPath: 'es/lanchas/weboat-390/index.html',
    title: 'WeBoat 390 - Lancha para 16 Personas | Alquiler en Río | WeBoat Brasil',
    description: 'Alquile la WeBoat 390, lancha versátil para hasta 16 personas. ¡Perfecta para fiestas! Desde R$ 2.600.',
    keywords: 'weboat 390, lancha 16 personas, lancha fiesta rio',
    waMessage: '¡Hola! Me interesa la lancha WeBoat 390. ¿Podrían enviarme más información? [via site - es]',
    css: 'lancha-detalhe',
    contentBlocks: [
      // Schema.org Product description (JSON-LD, not protected)
      ['Lancha de 39 pés com churrasqueira para até 16 pessoas. Ideal para festas, despedidas e confraternizações no Rio de Janeiro.', 'Lancha de 39 pies con parrilla para hasta 16 personas. Ideal para fiestas, despedidas y celebraciones en Río de Janeiro.'],
      // Schema FAQ question+answer (JSON-LD "da" → "de la")
      ['O que está incluso no aluguel da WeBoat 390?', '¿Qué está incluido en el alquiler de la WeBoat 390?'],
      ['O aluguel da WeBoat 390 inclui: combustível para o roteiro contratado, tripulação habilitada (marinheiro), tapete flutuante, macarrões flutuantes, som com Bluetooth, coolers e coletes salva-vidas. A churrasqueira tem adicional de R$ 250.', 'El alquiler de la WeBoat 390 incluye: combustible para la ruta contratada, tripulación habilitada (marinero), alfombra flotante, fideos flotantes, sonido Bluetooth, hieleras y chalecos salvavidas. La parrilla tiene un adicional de R$ 250.'],
      ['Churrasqueira Disponível', 'Parrilla Disponible'],
      ['Lancha com churrasqueira para festas', 'Lancha con parrilla para fiestas'],
      ['Valores do Aluguel', 'Precios de Alquiler'],
      ['Seg-Qui a partir de', 'Lun-Jue desde'],
      ['Valores por Roteiro (Sex-Dom)', 'Precios por Ruta (Vie-Dom)'],
      ['Roteiro 1 - Mureta da Urca', 'Ruta 1 - Mureta da Urca'],
      ['Roteiro 2 - Praia Vermelha', 'Ruta 2 - Praia Vermelha'],
      ['Roteiro 3 - Copacabana', 'Ruta 3 - Copacabana'],
      ['Roteiro 4 - Ilhas Cagarras', 'Ruta 4 - Ilhas Cagarras'],
      ['Roteiro 5 - Itaipu/Camboinhas', 'Ruta 5 - Itaipu/Camboinhas'],
      ['Adicionais', 'Adicionales'],
      ['Hora Extra', 'Hora Extra'],
      ['*Turno: Manhã 09h-14h ou Tarde 14h30-19h30', '*Turno: Mañana 09h-14h o Tarde 14h30-19h30'],
      ['*Churrasqueira inclui: Tripulação, Gelo escama 2x20kg, Gelo filtrado 1x10kg, Carvão', '*Parrilla incluye: Tripulación, Hielo escama 2x20kg, Hielo filtrado 1x10kg, Carbón'],
      ['Reservar pelo WhatsApp', 'Reservar por WhatsApp'],
      ['Montar Proposta', 'Armar Propuesta'],
      ['Sobre a WeBoat 390', 'Sobre la WeBoat 390'],
      ['A WeBoat 390 é a escolha ideal para quem quer fazer churrasco a bordo durante o passeio. Com capacidade para até 16 pessoas e equipada com churrasqueira, é perfeita para despedidas de solteira, aniversários e confraternizações.', 'La WeBoat 390 es la opción ideal para quienes quieren hacer un asado a bordo durante el paseo. Con capacidad para hasta 16 personas y equipada con parrilla, es perfecta para despedidas de soltera, cumpleaños y celebraciones.'],
      ['Além da churrasqueira, conta com som Bluetooth de alta qualidade, tapete flutuante e amplo espaço para o grupo aproveitar. A embarcação oferece conforto e estrutura completa para um dia inesquecível no mar.', 'Además de la parrilla, cuenta con sonido Bluetooth de alta calidad, alfombra flotante y amplio espacio para que el grupo disfrute. La embarcación ofrece confort y estructura completa para un día inolvidable en el mar.'],
      ['O que está incluso', 'Qué está incluido'],
      ['Combustível para o roteiro', 'Combustible para la ruta'],
      ['Marinheiro experiente', 'Marinero experimentado'],
      ['Churrasqueira disponível', 'Parrilla disponible'],
      ['Tapete flutuante', 'Alfombra flotante'],
      ['Coletes salva-vidas', 'Chalecos salvavidas'],
      ['Equipamentos de segurança', 'Equipos de seguridad'],
      ['Especificações Técnicas', 'Especificaciones Técnicas'],
      ['Tamanho', 'Tamaño'],
      ['Capacidade', 'Capacidad'],
      ['Tipo', 'Tipo'],
      ['Lancha Própria', 'Lancha Propia'],
      ['Churrasqueira', 'Parrilla'],
      ['Disponível', 'Disponible'],
      ['Som', 'Sonido'],
      ['Banheiro', 'Baño'],
      ['Sim', 'Sí'],
      ['Informações Rápidas', 'Información Rápida'],
      ['Passeio de 5 horas', 'Paseo de 5 horas'],
      ['Saída: Marina da Glória', 'Salida: Marina da Glória'],
      ['PIX, cartão ou transferência', 'PIX, tarjeta o transferencia'],
      ['Consultar Disponibilidade', 'Consultar Disponibilidad'],
      ['Outras Lanchas', 'Otras Lanchas'],
      ['A partir de', 'Desde'],
      ['Dúvidas', 'Preguntas'],
      ['Perguntas Frequentes sobre a WeBoat 390', 'Preguntas Frecuentes sobre la WeBoat 390'],
      ['Quantas pessoas cabem na WeBoat 390?', '¿Cuántas personas caben en la WeBoat 390?'],
      ['A WeBoat 390 tem capacidade para até <strong>16 pessoas</strong>, incluindo crianças. Essa capacidade é definida pela Marinha do Brasil para garantir conforto e segurança de todos a bordo.', 'La WeBoat 390 tiene capacidad para hasta <strong>16 personas</strong>, incluyendo niños. Esta capacidad es definida por la Marina de Brasil para garantizar el confort y la seguridad de todos a bordo.'],
      ['Quanto custa usar a churrasqueira na WeBoat 390?', '¿Cuánto cuesta usar la parrilla en la WeBoat 390?'],
      ['A churrasqueira na WeBoat 390 tem um adicional de <strong>R$ 250</strong>. A taxa inclui comandante preparando o churrasco, 02 sacos de gelo escama e 01 saco de gelo filtrado.', 'La parrilla en la WeBoat 390 tiene un adicional de <strong>R$ 250</strong>. La tarifa incluye al capitán preparando el asado, 02 bolsas de hielo escama y 01 bolsa de hielo filtrado.'],
      ['Qual o valor da hora extra?', '¿Cuál es el valor de la hora extra?'],
      ['O valor da hora extra na WeBoat 390 é de <strong>R$ 800</strong>. A solicitação deve ser feita durante o passeio diretamente com o marinheiro, sujeita à disponibilidade da embarcação.', 'El valor de la hora extra en la WeBoat 390 es de <strong>R$ 800</strong>. La solicitud debe hacerse durante el paseo directamente con el marinero, sujeta a la disponibilidad de la embarcación.'],
      ['O que está incluso no aluguel?', '¿Qué está incluido en el alquiler?'],
      ['O aluguel da WeBoat 390 inclui: combustível para o roteiro contratado, tripulação habilitada, tapete flutuante, macarrões flutuantes, som com Bluetooth, coolers e coletes salva-vidas. <em>Obs: A churrasqueira tem adicional de R$ 250.</em>', 'El alquiler de la WeBoat 390 incluye: combustible para la ruta contratada, tripulación habilitada, alfombra flotante, fideos flotantes, sonido con Bluetooth, coolers y chalecos salvavidas. <em>Nota: La parrilla tiene un adicional de R$ 250.</em>'],
      ['Ver Todas as Dúvidas', 'Ver Todas las Preguntas'],
      ['Monte sua proposta', 'Arme su propuesta'],
      ['Personalize seu Passeio na WeBoat 390', 'Personalice su Paseo en la WeBoat 390'],
      ['Selecione roteiro, serviços e veja o valor em tempo real', 'Seleccione ruta, servicios y vea el precio en tiempo real'],
      ['Escolha o Roteiro', 'Elija la Ruta'],
      ['Detalhes do Passeio', 'Detalles del Paseo'],
      ['Número de Pessoas', 'Número de Personas'],
      ['Horas Extras', 'Horas Extras'],
      ['Serviços Extras', 'Servicios Extras'],
      ['Resumo da Proposta', 'Resumen de la Propuesta'],
      ['Selecione um roteiro para começar', 'Seleccione una ruta para comenzar'],
      ['Enviar Proposta pelo WhatsApp', 'Enviar Propuesta por WhatsApp'],
      ['Até 16 pessoas', 'Hasta 16 personas'],
    ],
  },
  {
    ptPath: 'lanchas/weboat-oceanic-36/index.html',
    esPath: 'es/lanchas/weboat-oceanic-36/index.html',
    title: 'WeBoat Oceanic 36 - Lancha Premium para 14 Personas | WeBoat Brasil',
    description: 'Alquile la WeBoat Oceanic 36, confort premium para hasta 14 personas. Desde R$ 2.900. Combustible y marinero incluidos.',
    keywords: 'weboat oceanic 36, lancha premium rio, lancha 14 personas',
    waMessage: '¡Hola! Me interesa la lancha WeBoat Oceanic 36. ¿Podrían enviarme más información? [via site - es]',
    css: 'lancha-detalhe',
    contentBlocks: [
      // Schema Product description (JSON-LD not protected)
      ['Lancha de 36 pés com conforto premium para até 14 pessoas. Acabamento superior e espaço diferenciado.', 'Lancha de 36 pies con confort premium para hasta 14 personas. Acabado superior y espacio diferenciado.'],
      // Schema FAQ question+answer (JSON-LD "da" → "de la")
      ['O que está incluso no aluguel da WeBoat Oceanic 36?', '¿Qué está incluido en el alquiler de la WeBoat Oceanic 36?'],
      ['O aluguel da WeBoat Oceanic 36 inclui: combustível para o roteiro contratado, tripulação habilitada (marinheiro), tapete flutuante, macarrões flutuantes, som com Bluetooth, coolers e coletes salva-vidas.', 'El alquiler de la WeBoat Oceanic 36 incluye: combustible para la ruta contratada, tripulación habilitada (marinero), alfombra flotante, fideos flotantes, sonido Bluetooth, hieleras y chalecos salvavidas.'],
      ['Conforto Premium', 'Confort Premium'],
      ['Lancha premium com acabamento superior', 'Lancha premium con acabado superior'],
      ['Valores do Aluguel', 'Precios de Alquiler'],
      ['Seg-Qui a partir de', 'Lun-Jue desde'],
      ['Valores por Roteiro (Sex-Dom)', 'Precios por Ruta (Vie-Dom)'],
      ['Roteiro 1 - Mureta da Urca', 'Ruta 1 - Mureta da Urca'],
      ['Roteiro 2 - Praia Vermelha', 'Ruta 2 - Praia Vermelha'],
      ['Roteiro 3 - Copacabana', 'Ruta 3 - Copacabana'],
      ['Roteiro 4 - Ilhas Cagarras', 'Ruta 4 - Ilhas Cagarras'],
      ['Roteiro 5 - Itaipu/Camboinhas', 'Ruta 5 - Itaipu/Camboinhas'],
      ['Adicionais', 'Adicionales'],
      ['Hora Extra', 'Hora Extra'],
      ['*Turno: Manhã 09h-14h ou Tarde 14h30-19h30', '*Turno: Mañana 09h-14h o Tarde 14h30-19h30'],
      ['*Churrasqueira inclui: Tripulação, Gelo escama 2x20kg, Gelo filtrado 1x10kg, Carvão', '*Parrilla incluye: Tripulación, Hielo escama 2x20kg, Hielo filtrado 1x10kg, Carbón'],
      ['Reservar pelo WhatsApp', 'Reservar por WhatsApp'],
      ['Montar Proposta', 'Armar Propuesta'],
      ['Sobre a WeBoat Oceanic 36', 'Sobre la WeBoat Oceanic 36'],
      ['A WeBoat Oceanic 36 oferece uma experiência premium em alto-mar. Com acabamento diferenciado e design moderno, é a escolha perfeita para quem busca conforto e sofisticação em seu passeio de lancha no Rio de Janeiro.', 'La WeBoat Oceanic 36 ofrece una experiencia premium en alta mar. Con acabado diferenciado y diseño moderno, es la opción perfecta para quienes buscan confort y sofisticación en su paseo en lancha en Río de Janeiro.'],
      ['Ideal para casais, pequenos grupos e ocasiões especiais que merecem um toque de exclusividade. O espaço é otimizado para proporcionar conforto máximo durante toda a navegação.', 'Ideal para parejas, grupos pequeños y ocasiones especiales que merecen un toque de exclusividad. El espacio está optimizado para proporcionar el máximo confort durante toda la navegación.'],
      ['O que está incluso', 'Qué está incluido'],
      ['Combustível para o roteiro', 'Combustible para la ruta'],
      ['Marinheiro experiente', 'Marinero experimentado'],
      ['Som Bluetooth premium', 'Sonido Bluetooth premium'],
      ['Tapete flutuante', 'Alfombra flotante'],
      ['Coletes salva-vidas', 'Chalecos salvavidas'],
      ['Acabamento premium', 'Acabado premium'],
      ['Equipamentos de segurança', 'Equipos de seguridad'],
      ['Especificações Técnicas', 'Especificaciones Técnicas'],
      ['Tamanho', 'Tamaño'],
      ['Capacidade', 'Capacidad'],
      ['Tipo', 'Tipo'],
      ['Lancha Própria', 'Lancha Propia'],
      ['Categoria', 'Categoría'],
      ['Som', 'Sonido'],
      ['Banheiro', 'Baño'],
      ['Sim', 'Sí'],
      ['Churrasqueira', 'Parrilla'],
      ['Disponível', 'Disponible'],
      ['Informações Rápidas', 'Información Rápida'],
      ['Passeio de 5 horas', 'Paseo de 5 horas'],
      ['Saída: Marina da Glória', 'Salida: Marina da Glória'],
      ['PIX, cartão ou transferência', 'PIX, tarjeta o transferencia'],
      ['Consultar Disponibilidade', 'Consultar Disponibilidad'],
      ['Outras Lanchas', 'Otras Lanchas'],
      ['A partir de', 'Desde'],
      ['Dúvidas', 'Preguntas'],
      ['Perguntas Frequentes sobre a WeBoat Oceanic 36', 'Preguntas Frecuentes sobre la WeBoat Oceanic 36'],
      ['Quantas pessoas cabem na WeBoat Oceanic 36?', '¿Cuántas personas caben en la WeBoat Oceanic 36?'],
      ['A WeBoat Oceanic 36 tem capacidade para até <strong>14 pessoas</strong>, incluindo crianças. Essa capacidade é definida pela Marinha do Brasil para garantir conforto e segurança de todos a bordo.', 'La WeBoat Oceanic 36 tiene capacidad para hasta <strong>14 personas</strong>, incluyendo niños. Esta capacidad es definida por la Marina de Brasil para garantizar el confort y la seguridad de todos a bordo.'],
      ['A WeBoat Oceanic 36 tem churrasqueira?', '¿La WeBoat Oceanic 36 tiene parrilla?'],
      ['<strong>Sim!</strong> A churrasqueira está disponível mediante adicional de <strong>R$ 250</strong>. A taxa inclui comandante preparando o churrasco, 02 sacos de gelo escama e 01 saco de gelo filtrado.', '<strong>¡Sí!</strong> La parrilla está disponible mediante un adicional de <strong>R$ 250</strong>. La tarifa incluye al capitán preparando el asado, 02 bolsas de hielo escama y 01 bolsa de hielo filtrado.'],
      ['Qual o valor da hora extra?', '¿Cuál es el valor de la hora extra?'],
      ['O valor da hora extra na WeBoat Oceanic 36 é de <strong>R$ 800</strong>. A solicitação deve ser feita durante o passeio diretamente com o marinheiro, sujeita à disponibilidade da embarcação.', 'El valor de la hora extra en la WeBoat Oceanic 36 es de <strong>R$ 800</strong>. La solicitud debe hacerse durante el paseo directamente con el marinero, sujeta a la disponibilidad de la embarcación.'],
      ['O que está incluso no aluguel?', '¿Qué está incluido en el alquiler?'],
      ['O aluguel da WeBoat Oceanic 36 inclui: combustível para o roteiro contratado, tripulação habilitada, tapete flutuante, macarrões flutuantes, som com Bluetooth, coolers e coletes salva-vidas.', 'El alquiler de la WeBoat Oceanic 36 incluye: combustible para la ruta contratada, tripulación habilitada, alfombra flotante, fideos flotantes, sonido con Bluetooth, coolers y chalecos salvavidas.'],
      ['Ver Todas as Dúvidas', 'Ver Todas las Preguntas'],
      ['Monte sua proposta', 'Arme su propuesta'],
      ['Personalize seu Passeio na WeBoat Oceanic 36', 'Personalice su Paseo en la WeBoat Oceanic 36'],
      ['Selecione roteiro, serviços e veja o valor em tempo real', 'Seleccione ruta, servicios y vea el precio en tiempo real'],
      ['Escolha o Roteiro', 'Elija la Ruta'],
      ['Detalhes do Passeio', 'Detalles del Paseo'],
      ['Número de Pessoas', 'Número de Personas'],
      ['Horas Extras', 'Horas Extras'],
      ['Serviços Extras', 'Servicios Extras'],
      ['Resumo da Proposta', 'Resumen de la Propuesta'],
      ['Selecione um roteiro para começar', 'Seleccione una ruta para comenzar'],
      ['Enviar Proposta pelo WhatsApp', 'Enviar Propuesta por WhatsApp'],
      ['Até 14 pessoas', 'Hasta 14 personas'],
    ],
  },
  {
    ptPath: 'lanchas/weboat-ibiza-42/index.html',
    esPath: 'es/lanchas/weboat-ibiza-42/index.html',
    title: 'WeBoat Ibiza 42 - Lancha con Flybridge para 12 Personas | WeBoat Brasil',
    description: 'Alquile la WeBoat Ibiza 42 con flybridge exclusivo para hasta 12 personas. Desde R$ 2.700.',
    keywords: 'weboat ibiza 42, lancha flybridge rio, lancha 12 personas',
    waMessage: '¡Hola! Me interesa la lancha WeBoat Ibiza 42. ¿Podrían enviarme más información? [via site - es]',
    css: 'lancha-detalhe',
    contentBlocks: [
      // Organization description (Schema JSON-LD not protected)
      ['Aluguel de lanchas no Rio de Janeiro. Passeios privativos com conforto e seguranca.', 'Alquiler de lanchas en Río de Janeiro. Paseos privados con confort y seguridad.'],
      // Visible FAQ answer (has <strong> around "12 pessoas")
      ['A WeBoat Ibiza 42 tem capacidade para ate <strong>12 pessoas</strong>, incluindo criancas. Essa capacidade e definida pela Marinha do Brasil para garantir conforto e seguranca de todos a bordo.', 'La WeBoat Ibiza 42 tiene capacidad para hasta <strong>12 personas</strong>, incluyendo niños. Esta capacidad está definida por la Marina de Brasil para garantizar confort y seguridad de todos a bordo.'],
      // Schema FAQ answer (JSON-LD not protected)
      ['A WeBoat Ibiza 42 tem capacidade para ate 12 pessoas, incluindo criancas. Essa capacidade e definida pela Marinha do Brasil para garantir conforto e seguranca de todos a bordo.', 'La WeBoat Ibiza 42 tiene capacidad para hasta 12 personas, incluyendo niños. Esta capacidad está definida por la Marina de Brasil para garantizar confort y seguridad de todos a bordo.'],
      ['O que esta incluso no aluguel da WeBoat Ibiza 42?', '¿Qué está incluido en el alquiler de la WeBoat Ibiza 42?'],
      ['O aluguel da WeBoat Ibiza 42 inclui: combustivel para o roteiro contratado, tripulacao habilitada (marinheiro), tapete flutuante, macarroes flutuantes, som com Bluetooth, coolers e coletes salva-vidas.', 'El alquiler de la WeBoat Ibiza 42 incluye: combustible para la ruta contratada, tripulación habilitada (marinero), alfombra flotante, fideos flotantes, sonido Bluetooth, hieleras y chalecos salvavidas.'],
      ['O que e o flybridge da WeBoat Ibiza 42?', '¿Qué es el flybridge de la WeBoat Ibiza 42?'],
      ['O flybridge e um segundo andar ao ar livre na parte superior da lancha, com solario, churrasqueira e vista panoramica 360 graus. E o diferencial exclusivo da Ibiza 42 entre as lanchas proprias WeBoat.', 'El flybridge es un segundo piso al aire libre en la parte superior de la lancha, con solárium, parrilla y vista panorámica 360 grados. Es el diferencial exclusivo de la Ibiza 42 entre las lanchas propias WeBoat.'],
      ['O valor da hora extra na WeBoat Ibiza 42 e de R$ 800. A solicitacao deve ser feita durante o passeio diretamente com o marinheiro, sujeita a disponibilidade da embarcacao.', 'El valor de la hora extra en la WeBoat Ibiza 42 es de R$ 800. La solicitud debe hacerse durante el paseo directamente con el marinero, sujeta a la disponibilidad de la embarcación.'],
      ['Flybridge Exclusivo', 'Flybridge Exclusivo'],
      ['Lancha com flybridge, solario e churrasqueira', 'Lancha con flybridge, solárium y parrilla'],
      ['Valores do Aluguel', 'Precios de Alquiler'],
      ['Seg-Qui a partir de', 'Lun-Jue desde'],
      ['Valores por Roteiro (Sex-Dom)', 'Precios por Ruta (Vie-Dom)'],
      ['Roteiro 1 - Mureta da Urca', 'Ruta 1 - Mureta da Urca'],
      ['Roteiro 2 - Praia Vermelha', 'Ruta 2 - Praia Vermelha'],
      ['Roteiro 3 - Copacabana', 'Ruta 3 - Copacabana'],
      ['Roteiro 4 - Ilhas Cagarras', 'Ruta 4 - Ilhas Cagarras'],
      ['Roteiro 5 - Itaipu/Camboinhas', 'Ruta 5 - Itaipu/Camboinhas'],
      ['Adicionais', 'Adicionales'],
      ['Hora Extra', 'Hora Extra'],
      ['*Turno: Manha 09h-14h ou Tarde 14h30-19h30', '*Turno: Mañana 09h-14h o Tarde 14h30-19h30'],
      ['*Churrasqueira inclui: Tripulacao, Gelo escama 2x20kg, Gelo filtrado 1x10kg, Carvao', '*Parrilla incluye: Tripulación, Hielo escama 2x20kg, Hielo filtrado 1x10kg, Carbón'],
      ['Reservar pelo WhatsApp', 'Reservar por WhatsApp'],
      ['Montar Proposta', 'Armar Propuesta'],
      ['Sobre a WeBoat Ibiza 42', 'Sobre la WeBoat Ibiza 42'],
      ['A WeBoat Ibiza 42 e a unica lancha propria da frota com flybridge — um segundo andar ao ar livre com solario, churrasqueira e vista panoramica 360 graus. Com 42 pes e capacidade para 12 pessoas, oferece uma experiencia diferenciada para quem busca espaco ao ar livre e conforto.', 'La WeBoat Ibiza 42 es la única lancha propia de la flota con flybridge — un segundo piso al aire libre con solárium, parrilla y vista panorámica de 360 grados. Con 42 pies y capacidad para 12 personas, ofrece una experiencia diferenciada para quienes buscan espacio al aire libre y confort.'],
      ['Ideal para casais, grupos pequenos exclusivos, churrascos intimos e quem valoriza a experiencia de navegar com vista panoramica do Rio de Janeiro.', 'Ideal para parejas, grupos pequeños exclusivos, asados íntimos y quienes valoran la experiencia de navegar con vista panorámica de Río de Janeiro.'],
      ['O que esta incluso', 'Qué está incluido'],
      ['Combustivel para o roteiro', 'Combustible para la ruta'],
      ['Marinheiro experiente', 'Marinero experimentado'],
      ['Tapete flutuante', 'Alfombra flotante'],
      ['Coletes salva-vidas', 'Chalecos salvavidas'],
      ['Flybridge com solario', 'Flybridge con solárium'],
      ['Equipamentos de seguranca', 'Equipos de seguridad'],
      ['Especificacoes Tecnicas', 'Especificaciones Técnicas'],
      ['Tamanho', 'Tamaño'],
      ['Capacidade', 'Capacidad'],
      ['Tipo', 'Tipo'],
      ['Lancha Propria', 'Lancha Propia'],
      ['Diferencial', 'Diferencial'],
      ['Flybridge exclusivo', 'Flybridge exclusivo'],
      ['Som', 'Sonido'],
      ['Banheiro', 'Baño'],
      ['Sim', 'Sí'],
      ['Churrasqueira', 'Parrilla'],
      ['Disponivel', 'Disponible'],
      ['Informacoes Rapidas', 'Información Rápida'],
      ['Passeio de 5 horas', 'Paseo de 5 horas'],
      ['Saida: Marina da Gloria', 'Salida: Marina da Glória'],
      ['Flybridge com vista 360', 'Flybridge con vista 360'],
      ['PIX, cartao ou transferencia', 'PIX, tarjeta o transferencia'],
      ['Consultar Disponibilidade', 'Consultar Disponibilidad'],
      ['Outras Lanchas', 'Otras Lanchas'],
      ['A partir de', 'Desde'],
      ['Duvidas', 'Preguntas'],
      ['Perguntas Frequentes sobre a WeBoat Ibiza 42', 'Preguntas Frecuentes sobre la WeBoat Ibiza 42'],
      ['Quantas pessoas cabem na WeBoat Ibiza 42?', '¿Cuántas personas caben en la WeBoat Ibiza 42?'],
      ['A WeBoat Ibiza 42 tem capacidade para ate <strong>12 pessoas</strong>, incluindo criancas. Essa capacidade e definida pela Marinha do Brasil para garantir conforto e seguranca de todos a bordo.', 'La WeBoat Ibiza 42 tiene capacidad para hasta <strong>12 personas</strong>, incluyendo niños. Esta capacidad es definida por la Marina de Brasil para garantizar el confort y la seguridad de todos a bordo.'],
      ['A WeBoat Ibiza 42 tem churrasqueira?', '¿La WeBoat Ibiza 42 tiene parrilla?'],
      ['<strong>Sim!</strong> A churrasqueira esta disponivel mediante adicional de <strong>R$ 250</strong>. A taxa inclui comandante preparando o churrasco, 02 sacos de gelo escama e 01 saco de gelo filtrado.', '<strong>¡Sí!</strong> La parrilla está disponible mediante un adicional de <strong>R$ 250</strong>. La tarifa incluye al capitán preparando el asado, 02 bolsas de hielo escama y 01 bolsa de hielo filtrado.'],
      ['O que e o flybridge?', '¿Qué es el flybridge?'],
      ['O flybridge e um <strong>segundo andar ao ar livre</strong> na parte superior da lancha. Na Ibiza 42, ele conta com solario, churrasqueira e vista panoramica 360 graus. E o diferencial exclusivo desta lancha entre as proprias WeBoat.', 'El flybridge es un <strong>segundo piso al aire libre</strong> en la parte superior de la lancha. En la Ibiza 42, cuenta con solárium, parrilla y vista panorámica de 360 grados. Es el diferencial exclusivo de esta lancha entre las propias WeBoat.'],
      ['O que esta incluso no aluguel?', '¿Qué está incluido en el alquiler?'],
      ['O aluguel da WeBoat Ibiza 42 inclui: combustivel para o roteiro contratado, tripulacao habilitada, tapete flutuante, macarroes flutuantes, som com Bluetooth, coolers e coletes salva-vidas.', 'El alquiler de la WeBoat Ibiza 42 incluye: combustible para la ruta contratada, tripulación habilitada, alfombra flotante, fideos flotantes, sonido con Bluetooth, coolers y chalecos salvavidas.'],
      ['Ver Todas as Duvidas', 'Ver Todas las Preguntas'],
      ['Monte sua proposta', 'Arme su propuesta'],
      ['Personalize seu Passeio na WeBoat Ibiza 42', 'Personalice su Paseo en la WeBoat Ibiza 42'],
      ['Selecione roteiro, servicos e veja o valor em tempo real', 'Seleccione ruta, servicios y vea el precio en tiempo real'],
      ['Escolha o Roteiro', 'Elija la Ruta'],
      ['Detalhes do Passeio', 'Detalles del Paseo'],
      ['Numero de Pessoas', 'Número de Personas'],
      ['Horas Extras', 'Horas Extras'],
      ['Servicos Extras', 'Servicios Extras'],
      ['Resumo da Proposta', 'Resumen de la Propuesta'],
      ['Selecione um roteiro para começar', 'Seleccione una ruta para comenzar'],
      ['Enviar Proposta pelo WhatsApp', 'Enviar Propuesta por WhatsApp'],
      ['Ate 12 pessoas', 'Hasta 12 personas'],
      // Alt text
      ['Vista principal com Pao de Acucar', 'Vista principal con Pan de Azúcar'],
      ['Cockpit com cozinha', 'Cockpit con cocina'],
      ['Cabine interior', 'Cabina interior'],
      ['Mesa de jantar', 'Mesa de comedor'],
      ['Vista exterior', 'Vista exterior'],
      ['Proa solario', 'Proa solárium'],
      ['Flybridge solario', 'Flybridge solárium'],
      // CTA
      ['Reserve a WeBoat Ibiza 42 Agora', 'Reserve la WeBoat Ibiza 42 Ahora'],
      ['Navegue com flybridge exclusivo e vista panoramica no Rio de Janeiro.', 'Navegue con flybridge exclusivo y vista panorámica en Río de Janeiro.'],
      ['Ver Outras Lanchas', 'Ver Otras Lanchas'],
    ],
  },
  {
    ptPath: 'lanchas/weboat-rio-star-50/index.html',
    esPath: 'es/lanchas/weboat-rio-star-50/index.html',
    title: 'WeBoat Rio Star 50 - La Mayor Lancha para 22 Personas | WeBoat Brasil',
    description: 'Alquile la WeBoat Rio Star 50, nuestra mayor lancha para hasta 22 personas. Desde R$ 4.000.',
    keywords: 'weboat rio star 50, lancha grande rio, lancha 22 personas',
    waMessage: '¡Hola! Me interesa la lancha WeBoat Rio Star 50. ¿Podrían enviarme más información? [via site - es]',
    css: 'lancha-detalhe',
    contentBlocks: [
      // Alt text
      ['WeBoat Rio Star 50 - Detalhes', 'WeBoat Rio Star 50 - Detalles'],
      ['Maior Capacidade', 'Mayor Capacidad'],
      ['Nossa maior lancha própria', 'Nuestra mayor lancha propia'],
      ['Valores do Aluguel', 'Precios de Alquiler'],
      ['Seg-Qui a partir de', 'Lun-Jue desde'],
      ['Valores por Roteiro (Sex-Dom)', 'Precios por Ruta (Vie-Dom)'],
      ['Roteiro 1 - Mureta da Urca', 'Ruta 1 - Mureta da Urca'],
      ['Roteiro 2 - Praia Vermelha', 'Ruta 2 - Praia Vermelha'],
      ['Roteiro 3 - Copacabana', 'Ruta 3 - Copacabana'],
      ['Roteiro 4 - Ilhas Cagarras', 'Ruta 4 - Ilhas Cagarras'],
      ['Roteiro 5 - Itaipu/Camboinhas', 'Ruta 5 - Itaipu/Camboinhas'],
      ['Adicionais', 'Adicionales'],
      ['Pessoa extra (21-22)', 'Persona extra (21-22)'],
      ['Hora Extra', 'Hora Extra'],
      ['*Valores para até 20 pessoas. Turno: Manhã 09h-14h ou Tarde 14h30-19h30', '*Precios para hasta 20 personas. Turno: Mañana 09h-14h o Tarde 14h30-19h30'],
      ['*Churrasqueira inclui: Tripulação, Gelo escama 4x20kg, Gelo filtrado 2x10kg, Carvão', '*Parrilla incluye: Tripulación, Hielo escama 4x20kg, Hielo filtrado 2x10kg, Carbón'],
      ['Reservar pelo WhatsApp', 'Reservar por WhatsApp'],
      ['Montar Proposta', 'Armar Propuesta'],
      ['Sobre a WeBoat Rio Star 50', 'Sobre la WeBoat Rio Star 50'],
      ['A WeBoat Rio Star 50 é nossa maior lancha própria, perfeita para grupos grandes e eventos especiais. Com capacidade para até 22 pessoas, oferece espaço amplo e confortável para todos aproveitarem.', 'La WeBoat Rio Star 50 es nuestra mayor lancha propia, perfecta para grupos grandes y eventos especiales. Con capacidad para hasta 22 personas, ofrece espacio amplio y cómodo para que todos disfruten.'],
      ['Ideal para eventos corporativos, confraternizações de empresa, festas de aniversário grandes e celebrações que reúnem muitos convidados. A embarcação conta com estrutura completa para proporcionar uma experiência inesquecível.', 'Ideal para eventos corporativos, celebraciones de empresa, fiestas de cumpleaños grandes y celebraciones que reúnen muchos invitados. La embarcación cuenta con estructura completa para proporcionar una experiencia inolvidable.'],
      ['O que está incluso', 'Qué está incluido'],
      ['Combustível para o roteiro', 'Combustible para la ruta'],
      ['Marinheiro experiente', 'Marinero experimentado'],
      ['Tapete flutuante', 'Alfombra flotante'],
      ['Coletes salva-vidas', 'Chalecos salvavidas'],
      ['Maior espaço de deck', 'Mayor espacio de cubierta'],
      ['Equipamentos de segurança', 'Equipos de seguridad'],
      ['Especificações Técnicas', 'Especificaciones Técnicas'],
      ['Tamanho', 'Tamaño'],
      ['Capacidade', 'Capacidad'],
      ['Tipo', 'Tipo'],
      ['Lancha Própria', 'Lancha Propia'],
      ['Categoria', 'Categoría'],
      ['Maior capacidade', 'Mayor capacidad'],
      ['Som', 'Sonido'],
      ['Banheiro', 'Baño'],
      ['Sim', 'Sí'],
      ['Churrasqueira', 'Parrilla'],
      ['Disponível', 'Disponible'],
      ['Informações Rápidas', 'Información Rápida'],
      ['Passeio de 5 horas', 'Paseo de 5 horas'],
      ['Saída: Marina da Glória', 'Salida: Marina da Glória'],
      ['Até 22 pessoas', 'Hasta 22 personas'],
      ['PIX, cartão ou transferência', 'PIX, tarjeta o transferencia'],
      ['Consultar Disponibilidade', 'Consultar Disponibilidad'],
      ['Outras Lanchas', 'Otras Lanchas'],
      ['A partir de', 'Desde'],
      ['Dúvidas', 'Preguntas'],
      ['Perguntas Frequentes sobre a WeBoat Rio Star 50', 'Preguntas Frecuentes sobre la WeBoat Rio Star 50'],
      ['Quantas pessoas cabem na WeBoat Rio Star 50?', '¿Cuántas personas caben en la WeBoat Rio Star 50?'],
      ['A WeBoat Rio Star 50 tem capacidade para até <strong>22 pessoas</strong>, incluindo crianças. Essa capacidade é definida pela Marinha do Brasil para garantir conforto e segurança de todos a bordo.', 'La WeBoat Rio Star 50 tiene capacidad para hasta <strong>22 personas</strong>, incluyendo niños. Esta capacidad es definida por la Marina de Brasil para garantizar el confort y la seguridad de todos a bordo.'],
      // Schema FAQ name — full text with "na WeBoat Rio Star 50" (MUST come before short visible FAQ title)
      ['Quanto custa levar mais de 20 pessoas na WeBoat Rio Star 50?', '¿Cuánto cuesta llevar más de 20 personas en la WeBoat Rio Star 50?'],
      ['Quanto custa levar mais de 20 pessoas?', '¿Cuánto cuesta llevar más de 20 personas?'],
      ['A partir de 21 pessoas, há um adicional de <strong>R$ 250 por pessoa</strong>. Por exemplo, para 22 pessoas, o adicional é de R$ 500 (2 pessoas extras x R$ 250).', 'A partir de 21 personas, hay un adicional de <strong>R$ 250 por persona</strong>. Por ejemplo, para 22 personas, el adicional es de R$ 500 (2 personas extras x R$ 250).'],
      ['Qual o valor da hora extra?', '¿Cuál es el valor de la hora extra?'],
      ['O valor da hora extra na WeBoat Rio Star 50 é de <strong>R$ 1.200</strong>. A solicitação deve ser feita durante o passeio diretamente com o marinheiro, sujeita à disponibilidade.', 'El valor de la hora extra en la WeBoat Rio Star 50 es de <strong>R$ 1.200</strong>. La solicitud debe hacerse durante el paseo directamente con el marinero, sujeta a la disponibilidad.'],
      ['A WeBoat Rio Star 50 tem churrasqueira?', '¿La WeBoat Rio Star 50 tiene parrilla?'],
      ['<strong>Sim!</strong> A churrasqueira está disponível mediante adicional de <strong>R$ 250</strong>. A taxa inclui comandante preparando o churrasco, 02 sacos de gelo escama e 01 saco de gelo filtrado.', '<strong>¡Sí!</strong> La parrilla está disponible mediante un adicional de <strong>R$ 250</strong>. La tarifa incluye al capitán preparando el asado, 02 bolsas de hielo escama y 01 bolsa de hielo filtrado.'],
      ['Ver Todas as Dúvidas', 'Ver Todas las Preguntas'],
      ['Monte sua proposta', 'Arme su propuesta'],
      ['Personalize seu Passeio na WeBoat Rio Star 50', 'Personalice su Paseo en la WeBoat Rio Star 50'],
      ['Selecione roteiro, serviços e veja o valor em tempo real', 'Seleccione ruta, servicios y vea el precio en tiempo real'],
      ['Escolha o Roteiro', 'Elija la Ruta'],
      ['Detalhes do Passeio', 'Detalles del Paseo'],
      ['Número de Pessoas', 'Número de Personas'],
      ['Horas Extras', 'Horas Extras'],
      ['Serviços Extras', 'Servicios Extras'],
      ['Resumo da Proposta', 'Resumen de la Propuesta'],
      ['Selecione um roteiro para começar', 'Seleccione una ruta para comenzar'],
      ['Enviar Proposta pelo WhatsApp', 'Enviar Propuesta por WhatsApp'],
    ],
  },
  {
    ptPath: 'lanchas/comparativo/index.html',
    esPath: 'es/lanchas/comparar/index.html',
    title: 'Comparar Lanchas - Encuentre Su Lancha Ideal | WeBoat Brasil',
    description: 'Compare todas las lanchas WeBoat lado a lado. Capacidad, precio, características. Encuentre la lancha perfecta para su paseo.',
    keywords: 'comparar lanchas rio, comparación lanchas, cual lancha alquilar',
    waMessage: '¡Hola! Me gustaría ayuda para elegir la lancha correcta. [via site - es]',
    css: 'lancha-detalhe',
    contentBlocks: [
      // Schema Organization description (JSON-LD not protected)
      ['Aluguel de lanchas no Rio de Janeiro. Passeios privativos com conforto e segurança.', 'Alquiler de lanchas en Río de Janeiro. Paseos privados con confort y seguridad.'],
      // Schema FAQ question names (JSON-LD not protected)
      ['Qual a melhor lancha para um passeio premium e confortavel?', '¿Cuál es la mejor lancha para un paseo premium y confortable?'],
      ['Qual a diferenca de preco entre dias de semana e fim de semana?', '¿Cuál es la diferencia de precio entre días de semana y fin de semana?'],
      ['O que esta incluido em todas as lanchas WeBoat?', '¿Qué está incluido en todas las lanchas WeBoat?'],
      // Schema CollectionPage description (JSON-LD)
      ['Tabela comparativa das 5 lanchas proprias da WeBoat Brasil para aluguel no Rio de Janeiro', 'Tabla comparativa de las 5 lanchas propias de WeBoat Brasil para alquiler en Río de Janeiro'],
      // Schema Product descriptions (JSON-LD)
      ['Lancha para ate 15 pessoas. Melhor custo-benefício da frota WeBoat.', 'Lancha para hasta 15 personas. Mejor relación calidad-precio de la flota WeBoat.'],
      ['Lancha versátil para ate 16 pessoas. Otima para festas e celebracoes.', 'Lancha versátil para hasta 16 personas. Excelente para fiestas y celebraciones.'],
      ['Lancha premium para ate 14 pessoas. Maior conforto e acabamento.', 'Lancha premium para hasta 14 personas. Mayor confort y acabado.'],
      ['Nossa maior lancha propria para ate 22 pessoas. Ideal para grupos grandes.', 'Nuestra mayor lancha propia para hasta 22 personas. Ideal para grupos grandes.'],
      ['Lancha com flybridge exclusivo para ate 12 pessoas. Solario, churrasqueira e vista panoramica.', 'Lancha con flybridge exclusivo para hasta 12 personas. Solárium, parrilla y vista panorámica.'],
      // Comparison table cell
      ['Mesmo modelo da WeBoat 32, muito parecida', 'Mismo modelo de la WeBoat 32, muy parecida'],
      // Schema.org FAQ answers (JSON-LD plain text - must come FIRST)
      ['A WeBoat 32 e a melhor opção para grupos de ate 15 pessoas. Com preco a partir de R$ 2.300, oferece o melhor custo-benefício da frota. Inclui combustível, marinheiro, som Bluetooth e tapete flutuante. Ideal para passeios em familia ou com amigos.', 'La WeBoat 32 es la mejor opción para grupos de hasta 15 personas. Con precio desde R$ 2.300, ofrece la mejor relación calidad-precio de la flota. Incluye combustible, marinero, sonido Bluetooth y alfombra flotante. Ideal para paseos en familia o con amigos.'],
      ['A WeBoat 390 e a mais indicada para festas e despedidas de solteira. Com capacidade para 16 pessoas e preco a partir de R$ 2.600, oferece espaco versátil e excelente sistema de som. Todas as lanchas possuem churrasqueira (taxa adicional R$ 250 a R$ 600).', 'La WeBoat 390 es la más indicada para fiestas y despedidas de soltera. Con capacidad para 16 personas y precio desde R$ 2.600, ofrece espacio versátil y excelente sistema de sonido. Todas las lanchas tienen parrilla (tarifa adicional R$ 250 a R$ 600).'],
      ['A WeBoat Rio Star 50 e a única lancha propria para grupos grandes, com capacidade para 22 pessoas. Preco a partir de R$ 4.000. Para grupos ainda maiores (30 a 65 pessoas), temos lanchas parceiras como o Catamara Oceano.', 'La WeBoat Rio Star 50 es la única lancha propia para grupos grandes, con capacidad para 22 personas. Precio desde R$ 4.000. Para grupos aún más grandes (30 a 65 personas), tenemos lanchas asociadas como el Catamarán Oceano.'],
      ['A WeBoat Oceanic 36 oferece a experiência mais premium entre as lanchas proprias. Com acabamento superior e conforto diferenciado, e ideal para quem busca sofisticação. Capacidade para 14 pessoas, a partir de R$ 2.400.', 'La WeBoat Oceanic 36 ofrece la experiencia más premium entre las lanchas propias. Con acabado superior y confort diferenciado, es ideal para quienes buscan sofisticación. Capacidad para 14 personas, desde R$ 2.400.'],
      ['Os precos de segunda a quinta sao promocionais: WeBoat 32 (R$ 2.300 vs R$ 2.700), WeBoat 390 (R$ 2.600 vs R$ 3.100), Oceanic 36 (R$ 2.400 vs R$ 2.800), Rio Star 50 (R$ 4.000 vs R$ 4.500). Economia de ate R$ 500 durante a semana.', 'Los precios de lunes a jueves son promocionales: WeBoat 32 (R$ 2.300 vs R$ 2.700), WeBoat 390 (R$ 2.600 vs R$ 3.100), Oceanic 36 (R$ 2.400 vs R$ 2.800), Rio Star 50 (R$ 4.000 vs R$ 4.500). Ahorro de hasta R$ 500 durante la semana.'],
      ['Todas as 5 lanchas proprias incluem: combustível para o roteiro, marinheiro habilitado pela Marinha, coolers, som Bluetooth, tapete flutuante, macarroes e coletes salva-vidas. Churrasqueira disponível em todas (taxa adicional).', 'Las 5 lanchas propias incluyen: combustible para la ruta, marinero habilitado por la Marina, coolers, sonido Bluetooth, alfombra flotante, fideos flotantes y chalecos salvavidas. Parrilla disponible en todas (tarifa adicional).'],
      // Visible FAQ answers (multiline continuation text after <strong>)
      ['<strong>Temos lanchas parceiras para grupos de ate 65 pessoas.</strong>\n                    O Catamarã Oceano comporta até 65 pessoas e o Barco Gourmet 53 até 40 pessoas. Todas as embarcações passam pela mesma\n                    vistoria de segurança e oferecem o padrao WeBoat de qualidade.\n                    <a href="/es/lanchas/">Veja todas as lanchas</a>.', '<strong>Tenemos lanchas asociadas para grupos de hasta 65 personas.</strong>\n                    El Catamarán Oceano tiene capacidad para 65 personas y el Barco Gourmet 53 hasta 40 personas. Todas las embarcaciones pasan por la misma\n                    inspección de seguridad y ofrecen el estándar WeBoat de calidad.\n                    <a href="/es/lanchas/">Ver todas las lanchas</a>.'],
      ['Comparativo', 'Comparativo'],
      ['Qual a Melhor Lancha para Alugar no Rio?', '¿Cuál es la Mejor Lancha para Alquilar en Río?'],
      ['Compare as 5 lanchas proprias WeBoat e descubra a opção ideal para seu grupo, ocasiao e orcamento.', 'Compare las 5 lanchas propias WeBoat y descubra la opción ideal para su grupo, ocasión y presupuesto.'],
      ['Respostas Rapidas', 'Respuestas Rápidas'],
      ['Qual a Melhor Lancha Para...', '¿Cuál es la Mejor Lancha Para...'],
      ['Qual a melhor lancha para grupos pequenos (ate 15 pessoas)?', '¿Cuál es la mejor lancha para grupos pequeños (hasta 15 personas)?'],
      ['<strong>A WeBoat 32 e a melhor opção.</strong> Com preco a partir de R$ 2.300, oferece o melhor custo-benefício da frota. Perfeita para passeios em familia ou com amigos.', '<strong>La WeBoat 32 es la mejor opción.</strong> Con precio desde R$ 2.300, ofrece la mejor relación calidad-precio de la flota. Perfecta para paseos en familia o con amigos.'],
      ['Ver WeBoat 32', 'Ver WeBoat 32'],
      ['Qual a melhor lancha para festas e despedidas de solteira?', '¿Cuál es la mejor lancha para fiestas y despedidas de soltera?'],
      ['<strong>A WeBoat 390 e a mais indicada.</strong> Com capacidade para 16 pessoas e espaco versátil, e perfeita para celebracoes. Todas possuem churrasqueira.', '<strong>La WeBoat 390 es la más indicada.</strong> Con capacidad para 16 personas y espacio versátil, es perfecta para celebraciones. Todas tienen parrilla.'],
      ['Ver WeBoat 390', 'Ver WeBoat 390'],
      ['Qual a melhor lancha para grupos grandes (mais de 20 pessoas)?', '¿Cuál es la mejor lancha para grupos grandes (más de 20 personas)?'],
      ['<strong>A WeBoat Rio Star 50 e a única opção propria.</strong> Capacidade para 22 pessoas, a partir de R$ 4.000. Para grupos maiores, temos lanchas parceiras.', '<strong>La WeBoat Rio Star 50 es la única opción propia.</strong> Capacidad para 22 personas, desde R$ 4.000. Para grupos mayores, tenemos lanchas asociadas.'],
      ['Ver Rio Star 50', 'Ver Rio Star 50'],
      ['Qual a melhor lancha para um passeio premium?', '¿Cuál es la mejor lancha para un paseo premium?'],
      ['<strong>A WeBoat Oceanic 36 oferece a experiência mais sofisticada.</strong> Acabamento superior e maior conforto para ate 14 pessoas, a partir de R$ 2.400.', '<strong>La WeBoat Oceanic 36 ofrece la experiencia más sofisticada.</strong> Acabado superior y mayor confort para hasta 14 personas, desde R$ 2.400.'],
      ['Ver Oceanic 36', 'Ver Oceanic 36'],
      ['Tabela Comparativa', 'Tabla Comparativa'],
      ['Lanchas Próprias WeBoat', 'Lanchas Propias WeBoat'],
      ['Todas incluem combustível, marinheiro, coolers, som Bluetooth, tapete flutuante e coletes salva-vidas.', 'Todas incluyen combustible, marinero, coolers, sonido Bluetooth, alfombra flotante y chalecos salvavidas.'],
      ['Lancha', 'Lancha'],
      ['Capacidade', 'Capacidad'],
      ['Preco Seg-Qui', 'Precio Lun-Jue'],
      ['Preco Sex-Dom', 'Precio Vie-Dom'],
      ['Diferencial', 'Diferencial'],
      ['Propria', 'Propia'],
      ['15 pessoas', '15 personas'],
      ['16 pessoas', '16 personas'],
      ['14 pessoas', '14 personas'],
      ['22 pessoas', '22 personas'],
      ['12 pessoas', '12 personas'],
      ['seg a qui', 'lun a jue'],
      ['sex a dom', 'vie a dom'],
      ['Melhor custo-benefício', 'Mejor relación calidad-precio'],
      ['Versátil para festas', 'Versátil para fiestas'],
      ['Conforto premium', 'Confort premium'],
      ['Maior capacidade', 'Mayor capacidad'],
      ['Flybridge exclusivo', 'Flybridge exclusivo'],
      ['Ver Detalhes', 'Ver Detalles'],
      ['*Valores para o Roteiro 1 - Mureta da Urca (5 horas). Consulte valores para outros roteiros.', '*Precios para la Ruta 1 - Mureta da Urca (5 horas). Consulte precios para otras rutas.'],
      ['*Precos promocionais de seg-qui nao sao validos para periodos festivos e feriados.', '*Los precios promocionales de lun-jue no son válidos para períodos festivos y feriados.'],
      ['*Todas as lanchas possuem churrasqueira (taxa adicional de R$ 250 a R$ 600).', '*Todas las lanchas tienen parrilla (tarifa adicional de R$ 250 a R$ 600).'],
      ['Lanchas Parceiras', 'Lanchas Asociadas'],
      ['Compare Todas as Lanchas Parceiras', 'Compare Todas las Lanchas Asociadas'],
      ['22 lanchas parceiras de 10 a 65 pessoas. Todas com combustível, marinheiro e seguro inclusos.', '22 lanchas asociadas de 10 a 65 personas. Todas con combustible, marinero y seguro incluidos.'],
      ['Perfil Ideal', 'Perfil Ideal'],
      ['Para Quem Cada Lancha E Indicada', 'Para Quién es Indicada Cada Lancha'],
      ['Descubra qual lancha combina melhor com seu perfil e ocasiao.', 'Descubra qué lancha combina mejor con su perfil y ocasión.'],
      ['Indicada para:', 'Indicada para:'],
      ['Grupos de amigos em primeiro passeio de lancha', 'Grupos de amigos en su primer paseo en lancha'],
      ['Familias com crianças buscando economia', 'Familias con niños buscando economía'],
      ['Casais e grupos pequenos ate 10 pessoas', 'Parejas y grupos pequeños hasta 10 personas'],
      ['Quem quer conhecer a Baia de Guanabara sem gastar muito', 'Quienes quieren conocer la Bahía de Guanabara sin gastar mucho'],
      ['Despedidas de solteira e solteiro', 'Despedidas de soltera y soltero'],
      ['Aniversarios e celebracoes informais', 'Cumpleaños y celebraciones informales'],
      ['Grupos animados que querem música e churrasco', 'Grupos animados que quieren música y asado'],
      ['Day use com amigos no fim de semana', 'Día de uso con amigos el fin de semana'],
      ['Casais em busca de experiência romantica', 'Parejas en busca de una experiencia romántica'],
      ['Eventos corporativos com clientes VIP', 'Eventos corporativos con clientes VIP'],
      ['Pedidos de casamento e ocasiões especiais', 'Propuestas de matrimonio y ocasiones especiales'],
      ['Quem valoriza conforto e acabamento superior', 'Quienes valoran confort y acabado superior'],
      ['Grupos grandes de 18 a 22 pessoas', 'Grupos grandes de 18 a 22 personas'],
      ['Confraternizacoes de empresa', 'Celebraciones de empresa'],
      ['Reunioes de familia e amigos de várias cidades', 'Reuniones de familia y amigos de varias ciudades'],
      ['Formaturas e celebracoes de turma', 'Graduaciones y celebraciones de clase'],
      ['Casais e grupos pequenos exclusivos', 'Parejas y grupos pequeños exclusivos'],
      ['Iate 55 pés com ar condicionado e gerador', 'Yate 55 pies con aire acondicionado y generador'],
      ['Quem busca espaco ao ar livre com flybridge', 'Quienes buscan espacio al aire libre con flybridge'],
      ['Churrascos intimos com vista panoramica', 'Asados íntimos con vista panorámica'],
      ['Experiencia diferenciada com dois andares', 'Experiencia diferenciada con dos pisos'],
      ['A partir de', 'Desde'],
      ['Duvidas', 'Preguntas'],
      ['Perguntas Frequentes sobre Comparativo', 'Preguntas Frecuentes sobre Comparativo'],
      ['Por que os precos sao diferentes entre os dias da semana?', '¿Por qué los precios son diferentes entre los días de la semana?'],
      ['O que esta incluso em todas as lanchas?', '¿Qué está incluido en todas las lanchas?'],
      ['Todas as lanchas tem churrasqueira?', '¿Todas las lanchas tienen parrilla?'],
      ['E se meu grupo tiver mais de 22 pessoas?', '¿Y si mi grupo tiene más de 22 personas?'],
      ['Como reservar a lancha escolhida?', '¿Cómo reservar la lancha elegida?'],
      // Full FAQ answer for "Como reservar" (continuation text after <strong>)
      ['<strong>Entre em contato pelo WhatsApp (21) 97772-4114.</strong>\n                    Informe a data desejada, número de pessoas e roteiro de preferencia.\n                    Reservamos com 50% de sinal via PIX ou cartao, e o restante e pago no dia do passeio.\n                    Cancelamento com reembolso integral ate 48 horas antes.', '<strong>Contáctenos por WhatsApp (21) 97772-4114.</strong>\n                    Informe la fecha deseada, número de personas y ruta de preferencia.\n                    Reservamos con 50% de seña vía PIX o tarjeta, y el resto se paga el día del paseo.\n                    Cancelación con reembolso integral hasta 48 horas antes.'],
      // Schema JSON-LD version (plain text)
      ['Entre em contato pelo WhatsApp (21) 97772-4114. Informe a data desejada, número de pessoas e roteiro de preferencia. Reservamos com 50% de sinal via PIX ou cartao, e o restante e pago no dia do passeio. Cancelamento com reembolso integral ate 48 horas antes.', 'Contáctenos por WhatsApp (21) 97772-4114. Informe la fecha deseada, número de personas y ruta de preferencia. Reservamos con 50% de seña vía PIX o tarjeta, y el resto se paga el día del paseo. Cancelación con reembolso integral hasta 48 horas antes.'],
      ['Reservar pelo WhatsApp', 'Reservar por WhatsApp'],
      ['Ver Todas as Duvidas', 'Ver Todas las Preguntas'],
      ['<strong>Os precos de segunda a quinta sao promocionais porque a demanda e menor.</strong>\n                    Sexta, sabado e domingo tem alta procura, o que justifica valores diferenciados.\n                    Reservando durante a semana, você pode economizar ate R$ 500 em uma única viagem.', '<strong>Los precios de lunes a jueves son promocionales porque la demanda es menor.</strong>\n                    Viernes, sábado y domingo tienen alta demanda, lo que justifica precios diferenciados.\n                    Reservando durante la semana, puede ahorrar hasta R$ 500 en un solo viaje.'],
      ['<strong>Todas as 5 lanchas proprias incluem:</strong> combustível para o roteiro contratado,\n                    marinheiro habilitado pela Marinha do Brasil, coolers para bebidas (gelo nao incluso),\n                    sistema de som Bluetooth, tapete flutuante, macarroes flutuantes, coletes salva-vidas\n                    e equipamentos de segurança homologados.', '<strong>Las 5 lanchas propias incluyen:</strong> combustible para la ruta contratada,\n                    marinero habilitado por la Marina de Brasil, coolers para bebidas (hielo no incluido),\n                    sistema de sonido Bluetooth, alfombra flotante, fideos flotantes, chalecos salvavidas\n                    y equipos de seguridad homologados.'],
      ['<strong>Sim, todas as 5 lanchas proprias possuem churrasqueira.</strong>\n                    O uso requer contratacao de serviço adicional, com taxa que varia de R$ 250 a R$ 600\n                    dependendo da embarcação. O serviço inclui carnes, acompanhamentos e preparacao.\n                    Consulte nosso time para mais detalhes.', '<strong>Sí, las 5 lanchas propias tienen parrilla.</strong>\n                    El uso requiere contratación de servicio adicional, con tarifa que varía de R$ 250 a R$ 600\n                    dependiendo de la embarcación. El servicio incluye carnes, acompañamientos y preparación.\n                    Consulte a nuestro equipo para más detalles.'],
      ['Ainda tem duvidas sobre qual lancha escolher?', '¿Aún tiene dudas sobre qué lancha elegir?'],
      ['Nossa equipe conhece cada detalhe das embarcações e pode sugerir a opção perfeita para seu grupo e ocasiao. Fale conosco!', 'Nuestro equipo conoce cada detalle de las embarcaciones y puede sugerir la opción perfecta para su grupo y ocasión. ¡Contáctenos!'],
      ['Falar com Especialista', 'Hablar con un Especialista'],
      ['Atualizado em fevereiro de 2026', 'Actualizado en febrero de 2026'],
      ['Aluguel de lanchas no Rio de Janeiro. Passeios privativos com conforto e segurança.', 'Alquiler de lanchas en Río de Janeiro. Paseos privados con confort y seguridad.'],
      ['Veja todas as lanchas', 'Ver todas las lanchas'],
      // Table cells — "Diferencial" column (own boats)
      ['Menor e mais moderna da frota, deslocamento rápido', 'Menor y más moderna de la flota, desplazamiento rápido'],
      ['Mesmo modelo da Oceanic 36, mais bem equipada', 'Mismo modelo que la Oceanic 36, mejor equipada'],
      ['Mesmo modelo da Oceanic 36, fly bridge estendido', 'Mismo modelo que la Oceanic 36, fly bridge extendido'],
      ['Ar condicionado disponível, mais larga que as demais de 50 pés', 'Aire acondicionado disponible, más ancha que las demás de 50 pies'],
      // Table cells — "Diferencial" column (partner boats)
      ['Similar à Magna 28, um pouco maior e mais confortável', 'Similar a la Magna 28, un poco más grande y más cómoda'],
      ['Excelente espaço para 36 pés, preço acessível', 'Excelente espacio para 36 pies, precio accesible'],
      ['Bem larga com integração interna/externa', 'Muy amplia con integración interior/exterior'],
      ['Design diferente (trawler), espaço com bancos em volta para eventos', 'Diseño diferente (trawler), espacio con asientos alrededor para eventos'],
      ['Similar à Rio Star 50, praticamente mesmo espaço', 'Similar a la Rio Star 50, prácticamente el mismo espacio'],
      ['Modelo exclusivo da época do Ayrton Senna, pouquíssimas unidades', 'Modelo exclusivo de la época de Ayrton Senna, poquísimas unidades'],
      ['Integração interna/externa, maior capacidade na faixa de 50 pés', 'Integración interior/exterior, mayor capacidad en el rango de 50 pies'],
      ['Premium custo-benefício: conforto de luxo, totalmente reformada', 'Premium relación calidad-precio: confort de lujo, totalmente reformada'],
      ['60 pés redesenhada para eventos, melhor custo-benefício nesse porte', '60 pies rediseñada para eventos, mejor relación calidad-precio en ese tamaño'],
      ['Largest vessel: 70 pés, rooftop ampliado, salão para eventos', 'Mayor embarcación: 70 pies, rooftop ampliado, salón para eventos'],
      ['*Valores variam conforme roteiro e dia da semana. Consulte via WhatsApp para orçamento personalizado.', '*Los precios varían según la ruta y el día de la semana. Consulte por WhatsApp para un presupuesto personalizado.'],
      ['*Lanchas premium (Prestige, Schaefer, Intermarine) operam apenas roteiros R1 e R2 com turno flexível de 6h.', '*Las lanchas premium (Prestige, Schaefer, Intermarine) operan solo rutas R1 y R2 con turno flexible de 6h.'],
    ],
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
    contentBlocks: [
      // ── LONG BLOCKS FIRST (must run before short fragments) ──
      // Schema TouristAttraction descriptions (JSON-LD not protected)
      ['Passeio de lancha pela Mureta da Urca com vista para o Pão de Açúcar. Melhor custo-benefício.', 'Paseo en lancha por Mureta da Urca con vista al Pan de Azúcar. Mejor costo-beneficio.'],
      ['Nosso roteiro mais vendido! Inclui Urca + Praia Vermelha com parada para banho.', '¡Nuestra ruta más vendida! Incluye Urca + Praia Vermelha con parada para baño.'],
      ['Vista icônica da orla de Copacabana do mar. Perfeito para fotos.', 'Vista icónica del litoral de Copacabana desde el mar. Perfecto para fotos.'],
      ['Aventura em mar aberto até as Ilhas Cagarras. Águas cristalinas e vida marinha.', 'Aventura en mar abierto hasta Ilhas Cagarras. Aguas cristalinas y vida marina.'],
      ['Praias semi-desertas de Itaipu e Camboinhas em Niterói. O mais exclusivo.', 'Playas semidesertas de Itaipu y Camboinhas en Niterói. El más exclusivo.'],
      // Schema FAQ "best route" answer (JSON-LD not protected)
      ['Para primeira vez, recomendamos o Roteiro Mureta da Urca (5h) ou Praia Vermelha (5h). Ambos são em águas calmas dentro da Baía de Guanabara. A Urca oferece vista para o Pão de Açúcar e é ideal para famílias.', 'Para la primera vez, recomendamos la Ruta Mureta da Urca (5h) o Praia Vermelha (5h). Ambas son en aguas calmas dentro de la Bahía de Guanabara. Urca ofrece vista al Pan de Azúcar y es ideal para familias.'],
      // Visible FAQ "best route" — <strong> + continuation (multiline, newline + 20-space indent)
      ['<strong>Para primeira vez, recomendamos o Roteiro Mureta da Urca (5h) ou Praia Vermelha (5h). Ambos são em águas calmas dentro da Baía de Guanabara.</strong>\n                    A Urca oferece vista para o Pão de Açúcar e é ideal para famílias. Veja nossas <a href="/es/lanchas/">lanchas disponíveis</a> para escolher a melhor opção para seu grupo.', '<strong>Para la primera vez, recomendamos la Ruta Mureta da Urca (5h) o Praia Vermelha (5h). Ambas son en aguas calmas dentro de la Bahía de Guanabara.</strong>\n                    Urca ofrece vista al Pan de Azúcar y es ideal para familias. Vea nuestras <a href="/es/lanchas/">lanchas disponibles</a> para elegir la mejor opción para su grupo.'],
      // Schema FAQ "personalize" answer (JSON-LD not protected)
      ['Sim, todos os roteiros podem ser personalizados. Trabalhamos com sugestões mas adaptamos conforme sua preferência. Quer combinar Urca + Copacabana? Ou estender o tempo? Fale com nossa equipe pelo WhatsApp.', 'Sí, todas las rutas se pueden personalizar. Trabajamos con sugerencias pero nos adaptamos según su preferencia. ¿Quiere combinar Urca + Copacabana? ¿O extender el tiempo? Hable con nuestro equipo por WhatsApp.'],
      // Visible FAQ "personalize" — <strong> + continuation (multiline)
      ['<strong>Sim, todos os roteiros podem ser personalizados. Trabalhamos com sugestões mas adaptamos conforme sua preferência.</strong>\n                    Quer combinar Urca + Copacabana? Ou estender o tempo? Fale com nossa equipe pelo WhatsApp para criar o passeio ideal.', '<strong>Sí, todas las rutas se pueden personalizar. Trabajamos con sugerencias pero nos adaptamos según su preferencia.</strong>\n                    ¿Quiere combinar Urca + Copacabana? ¿O extender el tiempo? Hable con nuestro equipo por WhatsApp para crear el paseo ideal.'],
      // Schema FAQ answer - cost (full single-line text in JSON-LD, not protected)
      ['Os passeios de lancha no Rio custam a partir de R$ 2.300 para grupos de até 15 pessoas (5 horas). O valor é por lancha, não por pessoa. Roteiros mais longos como Ilhas Cagarras custam a partir de R$ 3.600.', 'Los paseos en lancha en Río cuestan desde R$ 2.300 para grupos de hasta 15 personas (5 horas). El precio es por lancha, no por persona. Rutas más largas como Ilhas Cagarras cuestan desde R$ 3.600.'],
      // Visible FAQ cost answer — multiline <strong> + continuation (newline + 20-space indent between them)
      ['<strong>Os passeios de lancha no Rio custam a partir de R$ 2.300 para grupos de até 15 pessoas (5 horas). O valor é por lancha, não por pessoa.</strong>\n                    Roteiros mais longos como Ilhas Cagarras (5h) custam a partir de R$ 3.600. Consulte nossa <a href="/es/lanchas/">página de lanchas</a> para ver preços detalhados por embarcação.', '<strong>Los paseos en lancha en Río cuestan desde R$ 2.300 para grupos de hasta 15 personas (5 horas). El precio es por lancha, no por persona.</strong>\n                    Rutas más largas como Ilhas Cagarras (5h) cuestan desde R$ 3.600. Consulte nuestra <a href="/es/lanchas/">página de lanchas</a> para ver precios detallados por embarcación.'],
      // Schema FAQ answer - what's included (full text, JSON-LD not protected)
      ['Todos os passeios incluem combustível, marinheiro habilitado pela Marinha, tapete flutuante, macarrões, som Bluetooth e coolers. Você pode levar bebidas e petiscos sem custo adicional. Opcionais como churrasco, decoração e open bar têm taxa extra.', 'Todos los paseos incluyen combustible, marinero habilitado por la Marina, alfombra flotante, fideos de piscina, sonido Bluetooth y coolers. Puede llevar bebidas y bocadillos sin costo adicional. Opcionales como asado, decoración y open bar tienen un cargo extra.'],
      // Recommendation (contains 'Roteiro 2' — MUST come before ['Roteiro 2', 'Ruta 2'] short block)
      ['Recomendamos o <strong>Roteiro 2 (Praia Vermelha)</strong>! É o favorito de 60% dos nossos\n            clientes. Oferece duas paradas para mergulho, vistas incríveis e o melhor custo-benefício.', '¡Recomendamos la <strong>Ruta 2 (Praia Vermelha)</strong>! Es la favorita del 60% de nuestros\n            clientes. Ofrece dos paradas para nadar, vistas increíbles y el mejor costo-beneficio.'],
      // Schema ItemList - Volta Completa description (contains 'roteiros')
      ['Experiência completa com todos os roteiros em um único passeio.', 'Experiencia completa con todas las rutas en un único paseo.'],
      // Alt texts (not protected by translateContent)
      ['Mapa dos roteiros de passeio de lancha no Rio de Janeiro - Marina da Glória, Urca, Praia Vermelha, Copacabana, Ilhas Cagarras e Niterói', 'Mapa de las rutas de paseo en lancha en Río de Janeiro - Marina da Glória, Urca, Praia Vermelha, Copacabana, Ilhas Cagarras y Niterói'],
      ['Passeio de lancha na Mureta da Urca com vista para o Pão de Açúcar', 'Paseo en lancha en Mureta da Urca con vista al Pan de Azúcar'],
      ['Passeio de lancha na Praia Vermelha com bondinho do Pão de Açúcar', 'Paseo en lancha en Praia Vermelha con teleférico del Pan de Azúcar'],
      ['Vista panorâmica da orla de Copacabana com Pão de Açúcar ao fundo', 'Vista panorámica del litoral de Copacabana con el Pan de Azúcar al fondo'],
      ['Vista aérea das Ilhas Cagarras com lancha ancorada em águas cristalinas', 'Vista aérea de las Ilhas Cagarras con lancha anclada en aguas cristalinas'],
      ['Vista aérea da Praia de Itaipu em Niterói com mar cristalino', 'Vista aérea de la Praia de Itaipu en Niterói con mar cristalino'],
      ['MAC Niterói visto do mar com Cristo Redentor - Roteiro Volta Completa', 'MAC Niterói visto desde el mar con Cristo Redentor - Ruta Vuelta Completa'],
      // Map section (longer string must come before 'Nossos Roteiros' to avoid substring corruption)
      ['Conheça Nossos Roteiros', 'Conozca Nuestras Rutas'],
      // Page header
      ['Nossos Roteiros', 'Nuestras Rutas'],
      ['Passeio de Lancha no Rio de Janeiro', 'Paseo en Lancha en Río de Janeiro'],
      ['Escolha o roteiro ideal para seu passeio de lancha. Do clássico passeio na Urca\n          até a aventura nas Ilhas Cagarras, temos opções para todos os gostos e orçamentos.', 'Elija la ruta ideal para su paseo en lancha. Desde el clásico paseo en Urca\n          hasta la aventura en Ilhas Cagarras, tenemos opciones para todos los gustos y presupuestos.'],
      ['Roteiro 1 - Mureta da Urca', 'Ruta 1 - Mureta da Urca'],
      ['Roteiro 2 - Praia Vermelha', 'Ruta 2 - Praia Vermelha'],
      ['Roteiro 3 - Copacabana', 'Ruta 3 - Copacabana'],
      ['Roteiro 4 - Ilhas Cagarras', 'Ruta 4 - Ilhas Cagarras'],
      ['Roteiro 5 - Itaipu/Niterói', 'Ruta 5 - Itaipu/Niterói'],
      // Grid section
      ['Escolha seu passeio', 'Elija su paseo'],
      ['Roteiros Disponíveis', 'Rutas Disponibles'],
      ['Melhor custo-benefício', 'Mejor costo-beneficio'],
      ['Roteiro 1', 'Ruta 1'],
      ['Roteiro mais próximo, ideal para eventos e festas. Mais tempo de paradas para mergulho\n                e menos navegação. Águas calmas da Baía de Guanabara.', 'Ruta más cercana, ideal para eventos y fiestas. Más tiempo de paradas para nadar\n                y menos navegación. Aguas tranquilas de la Bahía de Guanabara.'],
      ['Mais Vendido', 'Más Vendido'],
      ['Roteiro 2', 'Ruta 2'],
      ['Nosso passeio mais vendido! Bom equilíbrio entre navegação e paradas. Duas paradas\n                para mergulho com vista única do bondinho do Pão de Açúcar.', '¡Nuestro paseo más vendido! Buen equilibrio entre navegación y paradas. Dos paradas\n                para nadar con vista única del teleférico del Pão de Açúcar.'],
      ['Vista icônica', 'Vista icónica'],
      ['Roteiro 3', 'Ruta 3'],
      ['Vista panorâmica da orla mais famosa do Brasil! Equilíbrio entre navegação e\n                paradas - perfeito para fotos inesquecíveis.', '¡Vista panorámica del litoral más famoso de Brasil! Equilibrio entre navegación y\n                paradas - perfecto para fotos inolvidables.'],
      ['Mar aberto', 'Mar abierto'],
      ['Roteiro 4', 'Ruta 4'],
      ['Aventura em mar aberto até as Ilhas Cagarras! Navegação oceânica e mergulho em\n                águas cristalinas. Para os mais aventureiros.', '¡Aventura en mar abierto hasta las Ilhas Cagarras! Navegación oceánica y baño en\n                aguas cristalinas. Para los más aventureros.'],
      ['Praias desertas', 'Playas desiertas'],
      ['Roteiro 5', 'Ruta 5'],
      ['Nosso roteiro mais exclusivo! Atravesse a Baía de Guanabara e descubra as praias\n                semi-desertas de Camboinhas e Itaipu em Niterói.', '¡Nuestra ruta más exclusiva! Cruce la Bahía de Guanabara y descubra las playas\n                semidesertas de Camboinhas e Itaipu en Niterói.'],
      ['Experiência completa', 'Experiencia completa'],
      ['Roteiro Especial', 'Ruta Especial'],
      ['A experiência definitiva! Combine os melhores pontos de todos os roteiros em um\n                único passeio de lancha inesquecível pelo Rio de Janeiro.', '¡La experiencia definitiva! Combine los mejores puntos de todas las rutas en un\n                único paseo en lancha inolvidable por Río de Janeiro.'],
      ['Travessia', 'Travesía'],
      // CTA after cards
      ['Ficou com dúvida? Nossa equipe pode ajudar você a escolher o roteiro ideal!', '¿Tiene dudas? ¡Nuestro equipo puede ayudarlo a elegir la ruta ideal!'],
      ['Falar com Especialista', 'Hablar con un Especialista'],
      // Compare table
      ['Qual Roteiro Escolher?', '¿Qué Ruta Elegir?'],
      ['Roteiro', 'Ruta'],
      ['Turno', 'Turno'],
      ['Para quem busca', 'Para quienes buscan'],
      ['Ideal para', 'Ideal para'],
      ['Mais tempo de mergulho, menos navegação', 'Más tiempo de baño, menos navegación'],
      ['Eventos, festas', 'Eventos, fiestas'],
      ['Todos os perfis', 'Todos los perfiles'],
      ['Mais tempo de navegação, menos mergulho', 'Más tiempo de navegación, menos baño'],
      ['Fotos, turistas', 'Fotos, turistas'],
      ['Mergulho, aventura', 'Buceo, aventura'],
      ['Exclusividade', 'Exclusividad'],
      ['Passeio completo com todos os pontos', 'Paseo completo con todos los puntos'],
      // Recommendation (long block moved to top of contentBlocks)
      ['Não sabe qual escolher?', '¿No sabe cuál elegir?'],
      ['Ver Roteiro Praia Vermelha', 'Ver Ruta Praia Vermelha'],
      // FAQ
      ['Dúvidas Frequentes sobre Passeios de Lancha', 'Preguntas Frecuentes sobre Paseos en Lancha'],
      ['Qual o melhor roteiro para primeira vez em passeio de lancha?', '¿Cuál es la mejor ruta para un primer paseo en lancha?'],
      ['Para primeira vez, recomendamos o Roteiro Mureta da Urca (5h) ou Praia Vermelha (5h). Ambos são em águas calmas dentro da Baía de Guanabara.', 'Para la primera vez, recomendamos la Ruta Mureta da Urca (5h) o Praia Vermelha (5h). Ambas son en aguas tranquilas dentro de la Bahía de Guanabara.'],
      ['A Urca oferece vista para o Pão de Açúcar e é ideal para famílias. Veja nossas <a href="/es/lanchas/">lanchas disponíveis</a> para escolher a melhor opção para seu grupo.', 'Urca ofrece vista al Pão de Açúcar y es ideal para familias. Vea nuestras <a href="/es/lanchas/">lanchas disponibles</a> para elegir la mejor opción para su grupo.'],
      ['Quanto custa um passeio de lancha no Rio de Janeiro?', '¿Cuánto cuesta un paseo en lancha en Río de Janeiro?'],
      ['Os passeios de lancha no Rio custam a partir de R$ 2.300 para grupos de até 15 pessoas (5 horas). O valor é por lancha, não por pessoa.', 'Los paseos en lancha en Río cuestan desde R$ 2.300 para grupos de hasta 15 personas (5 horas). El precio es por lancha, no por persona.'],
      ['Roteiros mais longos como Ilhas Cagarras (5h) custam a partir de R$ 3.600. Consulte nossa <a href="/es/lanchas/">página de lanchas</a> para ver preços detalhados por embarcação.', 'Rutas más largas como Ilhas Cagarras (5h) cuestan desde R$ 3.600. Consulte nuestra <a href="/es/lanchas/">página de lanchas</a> para ver precios detallados por embarcación.'],
      ['O que está incluso no passeio de lancha?', '¿Qué está incluido en el paseo en lancha?'],
      ['Todos os passeios incluem combustível, marinheiro habilitado pela Marinha, tapete flutuante, macarrões, som Bluetooth e coolers.', 'Todos los paseos incluyen combustible, marinero habilitado por la Marina, alfombra flotante, fideos de piscina, sonido Bluetooth y coolers.'],
      ['Você pode levar bebidas e petiscos sem custo adicional. Opcionais como <a href="/es/servicios/">churrasco na lancha</a>, decoração e open bar têm taxa extra.', 'Puede llevar bebidas y bocadillos sin costo adicional. Opcionales como <a href="/es/servicios/">asado en la lancha</a>, decoración y open bar tienen un cargo extra.'],
      ['Posso personalizar o roteiro do passeio?', '¿Puedo personalizar la ruta del paseo?'],
      ['Sim, todos os roteiros podem ser personalizados. Trabalhamos com sugestões mas adaptamos conforme sua preferência.', 'Sí, todas las rutas se pueden personalizar. Trabajamos con sugerencias pero nos adaptamos según su preferencia.'],
      ['Quer combinar Urca + Copacabana? Ou estender o tempo? Fale com nossa equipe pelo WhatsApp para criar o passeio ideal.', '¿Quiere combinar Urca + Copacabana? ¿O extender el tiempo? Hable con nuestro equipo por WhatsApp para crear el paseo ideal.'],
      ['Qual a melhor época para fazer passeio de lancha no Rio?', '¿Cuál es la mejor época para hacer un paseo en lancha en Río?'],
      ['O Rio de Janeiro tem clima favorável o ano todo. Verão (dezembro a março) é alta temporada com mar mais calmo. Inverno tem preços menores.', 'Río de Janeiro tiene clima favorable todo el año. El verano (diciembre a marzo) es temporada alta con mar más calmo. El invierno tiene precios más bajos.'],
      ['Para roteiros em mar aberto como <a href="/roteiros/ilhas-cagarras/">Ilhas Cagarras</a>, preferimos dias com pouco vento. A equipe confirma condições antes do passeio.', 'Para rutas en mar abierto como <a href="/es/rutas/ilhas-cagarras/">Ilhas Cagarras</a>, preferimos días con poco viento. El equipo confirma las condiciones antes del paseo.'],
      ['E se o tempo estiver ruim no dia do passeio?', '¿Y si el clima está malo el día del paseo?'],
      ['Se houver condições climáticas adversas, reagendamos sem custo adicional ou devolvemos 100% do valor.', 'Si hay condiciones climáticas adversas, reprogramamos sin costo adicional o devolvemos el 100% del valor.'],
      ['Nossa equipe monitora a previsão e avisa com antecedência. Saiba mais em nossa <a href="/es/preguntas-frecuentes/">página de perguntas frequentes</a>.', 'Nuestro equipo monitorea el pronóstico y avisa con anticipación. Conozca más en nuestra <a href="/es/preguntas-frecuentes/">página de preguntas frecuentes</a>.'],
      // CTA Final
      ['Reserve Agora e Garanta sua Data', 'Reserve Ahora y Asegure su Fecha'],
      ['Datas concorridas esgotam rápido, especialmente nos finais de semana.\n            Garanta seu passeio com antecedência!', 'Las fechas populares se agotan rápido, especialmente los fines de semana.\n            ¡Reserve su paseo con anticipación!'],
      ['Reservar pelo WhatsApp', 'Reservar por WhatsApp'],
      ['Atualizado em fevereiro de 2026', 'Actualizado en febrero de 2026'],
      // Schema.org ItemList descriptions
      ['Os melhores roteiros para seu passeio de lancha no Rio de Janeiro', 'Las mejores rutas para su paseo en lancha en Río de Janeiro'],
      ['Passeio de lancha pela Mureta da Urca com vista para o Pão de Açúcar. Melhor custo-benefício.', 'Paseo en lancha por Mureta da Urca con vista al Pão de Açúcar. Mejor costo-beneficio.'],
      ['Nosso roteiro mais vendido! Inclui Urca + Praia Vermelha com parada para banho.', '¡Nuestra ruta más vendida! Incluye Urca + Praia Vermelha con parada para baño.'],
      ['Vista icônica da orla de Copacabana do mar. Perfeito para fotos.', 'Vista icónica del litoral de Copacabana desde el mar. Perfecto para fotos.'],
      ['Aventura em mar aberto até as Ilhas Cagarras. Águas cristalinas e vida marinha.', 'Aventura en mar abierto hasta las Ilhas Cagarras. Aguas cristalinas y vida marina.'],
      ['Praias semi-desertas de Itaipu e Camboinhas em Niterói. O mais exclusivo.', 'Playas semidesertas de Itaipu y Camboinhas en Niterói. La más exclusiva.'],
      ['Experiência completa com todos os roteiros em um único passeio.', 'Experiencia completa con todas las rutas en un solo paseo.'],
    ],
  },
  {
    ptPath: 'roteiros/mureta-da-urca/index.html',
    esPath: 'es/rutas/mureta-da-urca/index.html',
    title: 'Paseo en Lancha Mureta da Urca | Mejor Costo-Beneficio | WeBoat Brasil',
    description: 'Paseo en lancha hasta Mureta da Urca en Río de Janeiro. Tour de 5 horas con vista al Pan de Azúcar. Desde R$ 2.300.',
    keywords: 'mureta da urca paseo lancha, tour barco pan de azucar, urca lancha rio',
    waMessage: '¡Hola! Me gustaría hacer la ruta Mureta da Urca. ¿Cuál es la disponibilidad? [via site - es]',
    css: 'roteiros',
    contentBlocks: [
      // Alt text (NOT protected by translateContent)
      ['Passeio de lancha na Mureta da Urca com vista panorâmica do Pão de Açúcar', 'Paseo en lancha en Mureta da Urca con vista panorámica del Pan de Azúcar'],
      // Schema.org Offer description (JSON-LD — not protected by translateContent)
      ['A partir de R$ 2.300 (seg-qui, WeBoat 32). Inclui combustível, marinheiro e seguro.', 'Desde R$ 2.300 (lun-jue, WeBoat 32). Incluye combustible, marinero y seguro.'],
      // Hero
      ['Melhor custo-benefício', 'Mejor costo-beneficio'],
      ['Roteiro 1 - Mureta da Urca', 'Ruta 1 - Mureta da Urca'],
      ['Turno de 5h', 'Turno de 5h'],
      ['Mar calmo', 'Mar calmo'],
      // Description
      ['Sobre o Passeio', 'Sobre el Paseo'],
      ['O passeio de lancha na Urca é perfeito para quem quer conhecer as paisagens mais\n                  icônicas do Rio de Janeiro gastando menos. Este tour de lancha oferece a experiência\n                  completa em águas calmas da Baía de Guanabara, ideal para famílias e primeira vez\n                  em passeio de barco.', 'El paseo en lancha en Urca es perfecto para quienes quieren conocer los paisajes más\n                  icónicos de Río de Janeiro gastando menos. Este tour en lancha ofrece la experiencia\n                  completa en aguas tranquilas de la Bahía de Guanabara, ideal para familias y para la primera vez\n                  en un paseo en barco.'],
      ['Durante o trajeto, você vai apreciar vistas deslumbrantes do centro do Rio, passar\n                  pelo Aterro do Flamengo, contornar a Enseada de Botafogo com o Pão de Açúcar ao\n                  fundo, e fazer uma parada para mergulho na famosa Mureta da Urca.', 'Durante el trayecto, disfrutará de vistas deslumbrantes del centro de Río, pasará\n                  por el Aterro do Flamengo, bordeará la Enseada de Botafogo con el Pão de Açúcar al\n                  fondo, y hará una parada para nadar en la famosa Mureta da Urca.'],
      ['É o roteiro ideal para quem está fazendo seu primeiro passeio de lancha no Rio\n                  de Janeiro ou para grupos que buscam a melhor relação custo-benefício.', 'Es la ruta ideal para quienes realizan su primer paseo en lancha en Río\n                  de Janeiro o para grupos que buscan la mejor relación costo-beneficio.'],
      // Route stops
      ['Trajeto do Passeio', 'Trayecto del Paseo'],
      ['Ponto de embarque - Recepção e briefing de segurança', 'Punto de embarque - Recepción y briefing de seguridad'],
      ['Enseada do Flamengo', 'Enseada do Flamengo'],
      ['Vista panorâmica do centro do Rio e Aterro do Flamengo', 'Vista panorámica del centro de Río y Aterro do Flamengo'],
      ['Enseada de Botafogo', 'Enseada de Botafogo'],
      ['Vista privilegiada do Pão de Açúcar e Cristo Redentor', 'Vista privilegiada del Pão de Açúcar y Cristo Redentor'],
      ['Parada para mergulho em águas calmas - tempo livre para banho', 'Parada para nadar en aguas tranquilas - tiempo libre para baño'],
      ['Parada para mergulho', 'Parada para nadar'],
      ['Retorno e desembarque', 'Regreso y desembarque'],
      // Highlights
      ['Por que escolher este roteiro?', '¿Por qué elegir esta ruta?'],
      ['Melhor custo-beneficio para passeio de lancha', 'Mejor costo-beneficio para paseo en lancha'],
      ['Águas calmas - ideal para crianças', 'Aguas tranquilas - ideal para niños'],
      ['Vista do Pão de Açúcar e Cristo Redentor', 'Vista del Pão de Açúcar y Cristo Redentor'],
      ['Parada para mergulho na Mureta da Urca', 'Parada para nadar en Mureta da Urca'],
      // Available boats
      ['Lanchas Disponíveis para este Roteiro', 'Lanchas Disponibles para esta Ruta'],
      ['Ver Todas as Lanchas', 'Ver Todas las Lanchas'],
      // Sidebar
      ['Duracao', 'Duración'],
      ['Mais tempo de mergulho, menos navegação', 'Más tiempo de baño, menos navegación'],
      ['Ver Lanchas Disponíveis', 'Ver Lanchas Disponibles'],
      ['Combustível incluso', 'Combustible incluido'],
      ['Marinheiro habilitado', 'Marinero habilitado'],
      // FAQ
      ['Perguntas Frequentes sobre o Passeio na Urca', 'Preguntas Frecuentes sobre el Paseo en Urca'],
      ['Quanto tempo dura o passeio na Mureta da Urca?', '¿Cuánto dura el paseo en Mureta da Urca?'],
      ['O turno total e de <strong>5 horas</strong> (manha: 09h-14h ou tarde: 14h30-19h30). O tempo de navegacao e de aproximadamente <strong>1h30</strong>, e o restante (cerca de 3h30) e dedicado a paradas para mergulho, banho e relaxamento na Mureta da Urca.', 'El turno total es de <strong>5 horas</strong> (mañana: 09h-14h o tarde: 14h30-19h30). El tiempo de navegación es de aproximadamente <strong>1h30</strong>, y el resto (cerca de 3h30) se dedica a paradas para nadar, baño y relajación en Mureta da Urca.'],
      ['Como saber o valor do passeio de lancha na Urca?', '¿Cómo saber el precio del paseo en lancha en Urca?'],
      ['O valor varia conforme a lancha escolhida e o dia da semana. Entre em contato pelo <strong>WhatsApp</strong> para receber um orcamento personalizado. Todas as lanchas incluem combustivel, marinheiro, som Bluetooth e coolers.', 'El precio varía según la lancha elegida y el día de la semana. Contáctenos por <strong>WhatsApp</strong> para recibir un presupuesto personalizado. Todas las lanchas incluyen combustible, marinero, sonido Bluetooth y coolers.'],
      ['O mar é calmo no roteiro da Mureta da Urca?', '¿El mar es calmo en la ruta de Mureta da Urca?'],
      ['<strong>Sim!</strong> O roteiro da Mureta da Urca é todo realizado dentro da Baía de Guanabara, com águas calmas e protegidas. É o roteiro ideal para famílias com crianças ou pessoas fazendo seu primeiro passeio de lancha.', '<strong>¡Sí!</strong> La ruta de Mureta da Urca se realiza completamente dentro de la Bahía de Guanabara, con aguas tranquilas y protegidas. Es la ruta ideal para familias con niños o personas que realizan su primer paseo en lancha.'],
      ['Posso levar bebidas e comidas para o passeio?', '¿Puedo llevar bebidas y comidas al paseo?'],
      ['<strong>Sim!</strong> Você pode levar suas próprias bebidas e petiscos sem custo adicional. A lancha conta com coolers inclusos. Também oferecemos serviços de churrasco e open bar mediante contratação.', '<strong>¡Sí!</strong> Puede llevar sus propias bebidas y bocadillos sin costo adicional. La lancha cuenta con coolers incluidos. También ofrecemos servicios de asado y open bar bajo contratación.'],
      // Other routes section
      ['Explore Outros Roteiros', 'Explore Otras Rutas'],
      ['Conheça outras opções de passeio de lancha no Rio de Janeiro', 'Conozca otras opciones de paseo en lancha en Río de Janeiro'],
      ['5h de passeio', '5h de paseo'],
      ['A partir de R$ 2.500', 'Desde R$ 2.500'],
      ['A partir de R$ 3.000', 'Desde R$ 3.000'],
      ['A partir de R$ 3.600', 'Desde R$ 3.600'],
      ['Ver Roteiro', 'Ver Ruta'],
      ['Mais vendido', 'Más vendido'],
      ['Vista icônica', 'Vista icónica'],
      ['Mar aberto', 'Mar abierto'],
      // CTA
      ['Pronto para conhecer a Urca?', '¿Listo para conocer Urca?'],
      ['Reserve agora seu passeio de lancha na Mureta da Urca e viva uma experiência\n            inesquecível com vista para o Pão de Açúcar!', '¡Reserve ahora su paseo en lancha en Mureta da Urca y viva una experiencia\n            inolvidable con vista al Pão de Açúcar!'],
      ['Reservar Agora', 'Reservar Ahora'],
      // Schema.org FAQ answers (plain text, no HTML tags)
      ['O turno total e de 5 horas (manha: 09h-14h ou tarde: 14h30-19h30). O tempo de navegacao e de aproximadamente 1h30, e o restante (cerca de 3h30) e dedicado a paradas para mergulho, banho e relaxamento na Mureta da Urca.', 'El turno total es de 5 horas (mañana: 09h-14h o tarde: 14h30-19h30). El tiempo de navegación es de aproximadamente 1h30, y el resto (cerca de 3h30) se dedica a paradas para nadar, baño y relajación en Mureta da Urca.'],
      ['O valor varia conforme a lancha escolhida e o dia da semana. Entre em contato pelo WhatsApp para receber um orcamento personalizado. Todas as lanchas incluem combustivel, marinheiro, som Bluetooth e coolers.', 'El precio varía según la lancha elegida y el día de la semana. Contáctenos por WhatsApp para recibir un presupuesto personalizado. Todas las lanchas incluyen combustible, marinero, sonido Bluetooth y coolers.'],
      ['Sim! O roteiro da Mureta da Urca é todo realizado dentro da Baía de Guanabara, com águas calmas e protegidas. É o roteiro ideal para famílias com crianças ou pessoas que estão fazendo seu primeiro passeio de lancha.', '¡Sí! La ruta de Mureta da Urca se realiza completamente dentro de la Bahía de Guanabara, con aguas tranquilas y protegidas. Es la ruta ideal para familias con niños o personas que realizan su primer paseo en lancha.'],
      ['Sim! Você pode levar suas próprias bebidas e petiscos sem custo adicional. A lancha conta com coolers inclusos. Também oferecemos serviços de churrasco e open bar mediante contratação.', '¡Sí! Puede llevar sus propias bebidas y bocadillos sin costo adicional. La lancha cuenta con coolers incluidos. También ofrecemos servicios de asado y open bar bajo contratación.'],
    ],
  },
  {
    ptPath: 'roteiros/praia-vermelha/index.html',
    esPath: 'es/rutas/praia-vermelha/index.html',
    title: 'Paseo en Lancha Praia Vermelha | Ruta Más Popular | WeBoat Brasil',
    description: 'Paseo en lancha hasta Praia Vermelha (Playa Roja) en Río. ¡Nuestra ruta más popular! 5 horas desde R$ 2.500.',
    keywords: 'praia vermelha paseo lancha, playa roja barco rio, tour más popular',
    waMessage: '¡Hola! Me gustaría hacer la ruta Praia Vermelha. ¿Cuál es la disponibilidad? [via site - es]',
    css: 'roteiros',
    contentBlocks: [
      // Alt text (NOT protected by translateContent)
      ['Passeio de lancha na Praia Vermelha com vista do Pão de Açúcar e Cristo Redentor', 'Paseo en lancha en Praia Vermelha con vista del Pan de Azúcar y Cristo Redentor'],
      // Schema.org Offer description (JSON-LD — not protected by translateContent)
      ['A partir de R$ 2.500 (seg-qui, WeBoat 32). Inclui combustível, marinheiro e seguro.', 'Desde R$ 2.500 (lun-jue, WeBoat 32). Incluye combustible, marinero y seguro.'],
      // Schema.org FAQ answers (plain text, no HTML tags) - MUST come FIRST before short fragments like 'bondinho'
      ['O roteiro Praia Vermelha é escolhido por 60% dos nossos clientes porque oferece o equilíbrio perfeito entre custo, tempo e experiência. Inclui 2 paradas para mergulho (Mureta da Urca e Praia Vermelha) e a vista única do bondinho do Pão de Açúcar passando sobre sua cabeça.', 'La ruta Praia Vermelha es elegida por el 60% de nuestros clientes porque ofrece el equilibrio perfecto entre costo, tiempo y experiencia. Incluye 2 paradas para nadar (Mureta da Urca y Praia Vermelha) y la vista única del teleférico del Pão de Açúcar pasando sobre su cabeza.'],
      ['O turno total e de 5 horas (manha: 09h-14h ou tarde: 14h30-19h30). O tempo de navegacao e de aproximadamente 2 horas, e o restante (cerca de 3h) e dedicado as duas paradas para mergulho e banho na Mureta da Urca e Praia Vermelha.', 'El turno total es de 5 horas (mañana: 09h-14h o tarde: 14h30-19h30). El tiempo de navegación es de aproximadamente 2 horas, y el resto (cerca de 3h) se dedica a las dos paradas para nadar y baño en Mureta da Urca y Praia Vermelha.'],
      ['O valor varia conforme a lancha escolhida e o dia da semana. Entre em contato pelo WhatsApp para receber um orcamento personalizado. Todas as lanchas incluem combustivel, marinheiro, som Bluetooth e coolers.', 'El precio varía según la lancha elegida y el día de la semana. Contáctenos por WhatsApp para recibir un presupuesto personalizado. Todas las lanchas incluyen combustible, marinero, sonido Bluetooth y coolers.'],
      ['Todos os nossos passeios incluem: combustível, marinheiro habilitado, tapete flutuante, macarrões flutuantes, sistema de som Bluetooth, coolers. Você pode levar suas próprias bebidas e petiscos sem custo adicional.', 'Todos nuestros paseos incluyen: combustible, marinero habilitado, alfombra flotante, fideos flotantes, sistema de sonido Bluetooth, coolers. Puede llevar sus propias bebidas y bocadillos sin costo adicional.'],
      // Schema.org page description
      ['Nosso passeio de lancha mais vendido! Inclui Urca + Praia Vermelha com parada para banho e vista do bondinho. Duração de 5 horas com saída da Marina da Glória.', '¡Nuestro paseo en lancha más vendido! Incluye Urca + Praia Vermelha con parada para baño y vista del teleférico. Duración de 5 horas con salida de la Marina da Glória.'],
      // Schema.org TouristAttraction description
      ['Vista do bondinho e do morro da Urca a partir do mar', 'Vista del teleférico y del morro da Urca desde el mar'],
      // Long multiline descriptions (must come before short fragments they contain)
      ['Inclui tudo do Roteiro 1 (Urca) mais uma parada adicional na paradisíaca Praia\n                  Vermelha, onde você terá uma vista única do bondinho do Pão de Açúcar passando\n                  sobre sua cabeça enquanto relaxa nas águas cristalinas.', 'Incluye todo de la Ruta 1 (Urca) más una parada adicional en la paradisíaca Praia\n                  Vermelha, donde tendrá una vista única del teleférico del Pão de Açúcar pasando\n                  sobre su cabeza mientras se relaja en las aguas cristalinas.'],
      ['O roteiro Praia Vermelha é escolhido por <strong>60% dos nossos clientes</strong> porque oferece o equilíbrio perfeito entre custo, tempo e experiência. Inclui 2 paradas para mergulho e a vista única do bondinho do Pão de Açúcar.', 'La ruta Praia Vermelha es elegida por el <strong>60% de nuestros clientes</strong> porque ofrece el equilibrio perfecto entre costo, tiempo y experiencia. Incluye 2 paradas para nadar y la vista única del teleférico del Pão de Açúcar.'],
      ['Segunda parada - vista única do bondinho do Pão de Açúcar', 'Segunda parada - vista única del teleférico del Pão de Açúcar'],
      // Hero
      ['Mais Vendido', 'Más Vendido'],
      ['Roteiro 2 - Praia Vermelha', 'Ruta 2 - Praia Vermelha'],
      ['Turno de 5h', 'Turno de 5h'],
      ['Mar calmo a moderado', 'Mar calmo a moderado'],
      // Description
      ['Sobre o Passeio', 'Sobre el Paseo'],
      ['O passeio de lancha até a Praia Vermelha é nosso tour mais popular! Escolhido por\n                  60% dos nossos clientes, esse roteiro oferece o equilíbrio perfeito entre custo,\n                  tempo e experiência.', '¡El paseo en lancha hasta Praia Vermelha es nuestro tour más popular! Elegido por\n                  el 60% de nuestros clientes, esta ruta ofrece el equilibrio perfecto entre costo,\n                  tiempo y experiencia.'],
      ['Com duas paradas para mergulho - Mureta da Urca e Praia Vermelha - este passeio\n                  oferece o melhor custo-benefício em aluguel de lancha no Rio de Janeiro. Perfeito\n                  para aniversários, passeios em família e qualquer celebração.', 'Con dos paradas para nadar - Mureta da Urca y Praia Vermelha - este paseo\n                  ofrece el mejor costo-beneficio en alquiler de lancha en Río de Janeiro. Perfecto\n                  para cumpleaños, paseos en familia y cualquier celebración.'],
      // Route stops
      ['Trajeto do Passeio', 'Trayecto del Paseo'],
      ['Ponto de embarque - Recepção e briefing de segurança', 'Punto de embarque - Recepción y briefing de seguridad'],
      ['Enseada do Flamengo', 'Enseada do Flamengo'],
      ['Vista panorâmica do centro do Rio', 'Vista panorámica del centro de Río'],
      ['Enseada de Botafogo', 'Enseada de Botafogo'],
      ['Vista do Pão de Açúcar e Cristo Redentor', 'Vista del Pão de Açúcar y Cristo Redentor'],
      ['Primeira parada para mergulho em águas calmas', 'Primera parada para nadar en aguas tranquilas'],
      ['1ª Parada para mergulho', '1.a Parada para nadar'],
      ['2ª Parada para mergulho', '2.a Parada para nadar'],
      ['Retorno e desembarque', 'Regreso y desembarque'],
      // Highlights
      ['Por que é o mais vendido?', '¿Por qué es el más vendido?'],
      ['Escolha de 60% dos clientes', 'Elegido por el 60% de los clientes'],
      ['2 paradas para mergulho', '2 paradas para nadar'],
      ['Vista única do bondinho', 'Vista única del teleférico'],
      ['Melhor custo-benefício', 'Mejor costo-beneficio'],
      // Available boats
      ['Lanchas Disponíveis para este Roteiro', 'Lanchas Disponibles para esta Ruta'],
      ['Ver Todas as Lanchas', 'Ver Todas las Lanchas'],
      // Sidebar
      ['Duracao', 'Duración'],
      ['Mais tempo de mergulho, menos navegação', 'Más tiempo de baño, menos navegación'],
      ['Ver Lanchas Disponíveis', 'Ver Lanchas Disponibles'],
      ['Combustível incluso', 'Combustible incluido'],
      ['Marinheiro habilitado', 'Marinero habilitado'],
      // FAQ
      ['Perguntas Frequentes sobre o Passeio na Praia Vermelha', 'Preguntas Frecuentes sobre el Paseo en Praia Vermelha'],
      ['Por que é o roteiro mais vendido?', '¿Por qué es la ruta más vendida?'],
      ['Qual a duração do passeio?', '¿Cuál es la duración del paseo?'],
      ['O turno total e de <strong>5 horas</strong> (manha: 09h-14h ou tarde: 14h30-19h30). O tempo de navegacao e de aproximadamente <strong>2 horas</strong>, e o restante (cerca de 3h) e dedicado as duas paradas para mergulho e banho na Mureta da Urca e Praia Vermelha.', 'El turno total es de <strong>5 horas</strong> (mañana: 09h-14h o tarde: 14h30-19h30). El tiempo de navegación es de aproximadamente <strong>2 horas</strong>, y el resto (cerca de 3h) se dedica a las dos paradas para nadar y baño en Mureta da Urca y Praia Vermelha.'],
      ['Como saber o valor do passeio?', '¿Cómo saber el precio del paseo?'],
      ['O valor varia conforme a lancha escolhida e o dia da semana. Entre em contato pelo <strong>WhatsApp</strong> para receber um orcamento personalizado. Todas as lanchas incluem combustivel, marinheiro, som Bluetooth e coolers.', 'El precio varía según la lancha elegida y el día de la semana. Contáctenos por <strong>WhatsApp</strong> para recibir un presupuesto personalizado. Todas las lanchas incluyen combustible, marinero, sonido Bluetooth y coolers.'],
      ['O que está incluso no passeio?', '¿Qué está incluido en el paseo?'],
      ['Todos os passeios incluem: combustível para o roteiro contratado, marinheiro habilitado, tapete e macarrões flutuantes, som com Bluetooth, coolers.', 'Todos los paseos incluyen: combustible para la ruta contratada, marinero habilitado, alfombra y fideos flotantes, sonido Bluetooth, coolers.'],
      // Other routes section
      ['Explore Outros Roteiros', 'Explore Otras Rutas'],
      ['Conheça outras opções de passeio de lancha no Rio de Janeiro', 'Conozca otras opciones de paseo en lancha en Río de Janeiro'],
      ['5h de passeio', '5h de paseo'],
      ['A partir de R$ 2.300', 'Desde R$ 2.300'],
      ['A partir de R$ 3.000', 'Desde R$ 3.000'],
      ['A partir de R$ 4.500', 'Desde R$ 4.500'],
      ['Ver Roteiro', 'Ver Ruta'],
      ['Melhor custo-benefício', 'Mejor costo-beneficio'],
      ['Vista icônica', 'Vista icónica'],
      ['Experiência completa', 'Experiencia completa'],
      // CTA
      ['Escolha o favorito dos clientes!', '¡Elija el favorito de los clientes!'],
      ['Reserve agora o passeio de lancha mais vendido do Rio de Janeiro.\n            Duas praias paradisíacas e a melhor experiência no mar!', '¡Reserve ahora el paseo en lancha más vendido de Río de Janeiro.\n            Dos playas paradisíacas y la mejor experiencia en el mar!'],
      ['Reservar Agora', 'Reservar Ahora'],
    ],
  },
  {
    ptPath: 'roteiros/copacabana/index.html',
    esPath: 'es/rutas/copacabana/index.html',
    title: 'Paseo en Lancha por Copacabana | Vista Icónica | WeBoat Brasil',
    description: 'Paseo en lancha por la playa de Copacabana. ¡Vistas icónicas! 5 horas desde R$ 3.000.',
    keywords: 'copacabana paseo lancha, tour barco copacabana, vista icónica lancha rio',
    waMessage: '¡Hola! Me gustaría hacer la ruta Copacabana. ¿Cuál es la disponibilidad? [via site - es]',
    css: 'roteiros',
    contentBlocks: [
      // Alt text (NOT protected by translateContent)
      ['Vista panorâmica da orla de Copacabana com Pão de Açúcar ao fundo', 'Vista panorámica del litoral de Copacabana con el Pan de Azúcar al fondo'],
      // Schema TouristAttraction descriptions (JSON-LD not protected)
      ['Fortaleza histórica vista pelo mar com café e museu', 'Fortaleza histórica vista desde el mar con café y museo'],
      ['Parada para banho ao pé do Pão de Açúcar', 'Parada para baño al pie del Pan de Azúcar'],
      // Schema.org Offer description (JSON-LD — not protected by translateContent)
      ['A partir de R$ 3.000 (seg-qui, WeBoat 32). Inclui combustível, marinheiro e seguro.', 'Desde R$ 3.000 (lun-jue, WeBoat 32). Incluye combustible, marinero y seguro.'],
      // Hero
      ['Vista Icônica', 'Vista Icónica'],
      ['Roteiro 3 - Copacabana', 'Ruta 3 - Copacabana'],
      ['5 horas', '5 horas'],
      ['Mar calmo a moderado', 'Mar calmo a moderado'],
      // Description
      ['Sobre o Passeio', 'Sobre el Paseo'],
      ['O passeio de lancha até Copacabana leva você à praia mais famosa do Brasil!\n                  Este tour de lancha inclui passagem panorâmica pela orla de Copacabana,\n                  perfeito para fotos inesquecíveis que vão impressionar qualquer um.', '¡El paseo en lancha hasta Copacabana lo lleva a la playa más famosa de Brasil!\n                  Este tour en lancha incluye un paso panorámico por el litoral de Copacabana,\n                  perfecto para fotos inolvidables que van a impresionar a cualquiera.'],
      ['O roteiro inclui tudo dos roteiros anteriores (Urca e Praia Vermelha) mais\n                  a icônica passagem pela orla de Copacabana, onde você terá a vista que só\n                  se vê em cartões postais - mas dessa vez ao vivo.', 'La ruta incluye todo de las rutas anteriores (Urca y Praia Vermelha) más\n                  el icónico paso por el litoral de Copacabana, donde tendrá la vista que solo\n                  se ve en postales - pero esta vez en vivo.'],
      ['Ideal para turistas que querem levar a melhor lembrança do Rio de Janeiro,\n                  despedidas de solteira que querem fotos incríveis, e qualquer pessoa que\n                  quer a experiência "instagramável" definitiva.', 'Ideal para turistas que quieren llevarse el mejor recuerdo de Río de Janeiro,\n                  despedidas de soltera que quieren fotos increíbles, y cualquier persona que\n                  quiere la experiencia "instagrameable" definitiva.'],
      // Route stops
      ['Trajeto do Passeio', 'Trayecto del Paseo'],
      ['Ponto de embarque', 'Punto de embarque'],
      ['Flamengo e Botafogo', 'Flamengo y Botafogo'],
      ['Vista panorâmica da zona sul', 'Vista panorámica de la zona sur'],
      ['Mureta da Urca + Praia Vermelha', 'Mureta da Urca + Praia Vermelha'],
      ['Paradas para mergulho', 'Paradas para nadar'],
      ['Parada para mergulho', 'Parada para nadar'],
      ['Orla de Copacabana', 'Litoral de Copacabana'],
      ['Passagem panorâmica pela praia mais famosa do mundo', 'Paso panorámico por la playa más famosa del mundo'],
      ['Melhor momento para fotos', 'Mejor momento para fotos'],
      ['Retorno e desembarque', 'Regreso y desembarque'],
      // Highlights
      ['Por que escolher este roteiro?', '¿Por qué elegir esta ruta?'],
      ['O passeio mais fotogênico do RJ', 'El paseo más fotogénico de Río'],
      ['Vista da praia mais famosa do Brasil', 'Vista de la playa más famosa de Brasil'],
      ['Perfeito para despedida de solteira', 'Perfecto para despedida de soltera'],
      ['Ideal para turistas', 'Ideal para turistas'],
      // Available boats
      ['Lanchas Disponíveis para este Roteiro', 'Lanchas Disponibles para esta Ruta'],
      ['Ver Todas as Lanchas', 'Ver Todas las Lanchas'],
      // Sidebar
      ['Duracao', 'Duración'],
      ['Mais tempo de navegacao, menos mergulho', 'Más tiempo de navegación, menos baño'],
      ['Ver Lanchas Disponíveis', 'Ver Lanchas Disponibles'],
      ['Combustível incluso', 'Combustible incluido'],
      ['Marinheiro habilitado', 'Marinero habilitado'],
      // FAQ
      ['Perguntas Frequentes sobre o Passeio em Copacabana', 'Preguntas Frecuentes sobre el Paseo en Copacabana'],
      ['Qual a duração do passeio até Copacabana?', '¿Cuál es la duración del paseo hasta Copacabana?'],
      ['O turno total e de <strong>5 horas</strong> (manha: 09h-14h ou tarde: 14h30-19h30). E tempo suficiente para passar pela Urca, Praia Vermelha (com paradas para mergulho) e fazer a passagem panoramica pela orla de Copacabana.', 'El turno total es de <strong>5 horas</strong> (mañana: 09h-14h o tarde: 14h30-19h30). Es tiempo suficiente para pasar por Urca, Praia Vermelha (con paradas para nadar) y hacer el paso panorámico por el litoral de Copacabana.'],
      ['Paramos para mergulho em Copacabana?', '¿Paramos para nadar en Copacabana?'],
      ['A passagem por Copacabana é <strong>panorâmica</strong>, perfeita para fotos. As paradas para mergulho são feitas na Mureta da Urca e Praia Vermelha, onde as águas são mais calmas e ideais para banho.', 'El paso por Copacabana es <strong>panorámico</strong>, perfecto para fotos. Las paradas para nadar se hacen en Mureta da Urca y Praia Vermelha, donde las aguas son más tranquilas e ideales para el baño.'],
      ['Como saber o valor do passeio ate Copacabana?', '¿Cómo saber el precio del paseo hasta Copacabana?'],
      ['O valor varia conforme a lancha escolhida e o dia da semana. Entre em contato pelo <strong>WhatsApp</strong> para receber um orcamento personalizado. Todas as lanchas incluem combustivel, marinheiro, som Bluetooth e coolers.', 'El precio varía según la lancha elegida y el día de la semana. Contáctenos por <strong>WhatsApp</strong> para recibir un presupuesto personalizado. Todas las lanchas incluyen combustible, marinero, sonido Bluetooth y coolers.'],
      ['Este roteiro é bom para despedida de solteira?', '¿Esta ruta es buena para despedida de soltera?'],
      ['<strong>Perfeito!</strong> A passagem panorâmica pela orla mais famosa do Brasil rende fotos incríveis. Oferecemos também decoração temática e serviços de open bar.', '<strong>¡Perfecto!</strong> El paso panorámico por el litoral más famoso de Brasil produce fotos increíbles. También ofrecemos decoración temática y servicios de open bar.'],
      // Other routes section
      ['Explore Outros Roteiros', 'Explore Otras Rutas'],
      ['Conheça outras opções de passeio de lancha no Rio de Janeiro', 'Conozca otras opciones de paseo en lancha en Río de Janeiro'],
      ['5h de passeio', '5h de paseo'],
      ['A partir de R$ 2.500', 'Desde R$ 2.500'],
      ['A partir de R$ 3.600', 'Desde R$ 3.600'],
      ['A partir de R$ 4.500', 'Desde R$ 4.500'],
      ['Ver Roteiro', 'Ver Ruta'],
      ['Mais vendido', 'Más vendido'],
      ['Mar aberto', 'Mar abierto'],
      ['Experiência completa', 'Experiencia completa'],
      // CTA
      ['A foto perfeita te espera!', '¡La foto perfecta te espera!'],
      ['Reserve agora seu passeio de lancha até Copacabana e leve a melhor\n            lembrança do Rio de Janeiro para casa.', '¡Reserve ahora su paseo en lancha hasta Copacabana y llévese el mejor\n            recuerdo de Río de Janeiro a casa!'],
      ['Reservar Agora', 'Reservar Ahora'],
      // Schema.org FAQ answers (plain text)
      ['O turno total e de 5 horas (manha: 09h-14h ou tarde: 14h30-19h30). E tempo suficiente para passar pela Urca, Praia Vermelha (com paradas para mergulho) e fazer a passagem panoramica pela orla de Copacabana.', 'El turno total es de 5 horas (mañana: 09h-14h o tarde: 14h30-19h30). Es tiempo suficiente para pasar por Urca, Praia Vermelha (con paradas para nadar) y hacer el recorrido panorámico por el litoral de Copacabana.'],
      ['A passagem por Copacabana é panorâmica, perfeita para fotos. As paradas para mergulho são feitas na Mureta da Urca e Praia Vermelha, onde as águas são mais calmas e ideais para banho.', 'El recorrido por Copacabana es panorámico, perfecto para fotos. Las paradas para nadar se hacen en Mureta da Urca y Praia Vermelha, donde las aguas son más tranquilas e ideales para baño.'],
      ['O valor varia conforme a lancha escolhida e o dia da semana. Entre em contato pelo WhatsApp para receber um orcamento personalizado. Todas as lanchas incluem combustivel, marinheiro, som Bluetooth e coolers.', 'El precio varía según la lancha elegida y el día de la semana. Contáctenos por WhatsApp para recibir un presupuesto personalizado. Todas las lanchas incluyen combustible, marinero, sonido Bluetooth y coolers.'],
      ['O roteiro até Copacabana é perfeito para despedida de solteira! A passagem panorâmica pela orla mais famosa do Brasil rende fotos incríveis. Oferecemos também decoração temática e serviços de open bar.', '¡La ruta hasta Copacabana es perfecta para despedida de soltera! El recorrido panorámico por el litoral más famoso de Brasil genera fotos increíbles. También ofrecemos decoración temática y servicios de open bar.'],
    ],
  },
  {
    ptPath: 'roteiros/ilhas-cagarras/index.html',
    esPath: 'es/rutas/ilhas-cagarras/index.html',
    title: 'Paseo en Lancha Ilhas Cagarras | Aventura en Mar Abierto | WeBoat Brasil',
    description: 'Paseo en lancha hasta las Islas Cagarras cerca de Ipanema. ¡Aventura en mar abierto! 5 horas desde R$ 3.600.',
    keywords: 'ilhas cagarras paseo lancha, islas cagarras barco, mar abierto lancha rio',
    waMessage: '¡Hola! Me gustaría hacer la ruta Ilhas Cagarras. ¿Cuál es la disponibilidad? [via site - es]',
    css: 'roteiros',
    contentBlocks: [
      // Alt text (NOT protected by translateContent)
      ['Vista aérea das Ilhas Cagarras com lancha ancorada em águas cristalinas', 'Vista aérea de las Ilhas Cagarras con lancha anclada en aguas cristalinas'],
      // Schema.org Offer description (JSON-LD — not protected by translateContent)
      ['A partir de R$ 3.600 (seg-qui, WeBoat 32). Inclui combustível, marinheiro e seguro.', 'Desde R$ 3.600 (lun-jue, WeBoat 32). Incluye combustible, marinero y seguro.'],
      // Hero
      ['Mar Aberto', 'Mar Abierto'],
      ['Roteiro 4 - Ilhas Cagarras', 'Ruta 4 - Ilhas Cagarras'],
      ['5 horas', '5 horas'],
      ['Mar aberto', 'Mar abierto'],
      // Description
      ['Sobre o Passeio', 'Sobre el Paseo'],
      ['O passeio de lancha até as Ilhas Cagarras é para os aventureiros! Navegação\n                  em mar aberto e mergulho em águas cristalinas onde você pode observar uma\n                  vida marinha incrível.', '¡El paseo en lancha hasta las Ilhas Cagarras es para los aventureros! Navegación\n                  en mar abierto y baño en aguas cristalinas donde puede observar una\n                  vida marina increíble.'],
      ['Este passeio inclui tudo dos roteiros anteriores mais a navegação oceânica\n                  até o arquipélago das Ilhas Cagarras, um santuário ecológico a cerca de 5 km\n                  da costa de Ipanema.', 'Este paseo incluye todo de las rutas anteriores más la navegación oceánica\n                  hasta el archipiélago de las Ilhas Cagarras, un santuario ecológico a unos 5 km\n                  de la costa de Ipanema.'],
      ['As águas ao redor das ilhas são extremamente claras, permitindo visualizar\n                  peixes, tartarugas e outros animais marinhos. É a experiência perfeita para\n                  quem quer fugir do óbvio e viver uma aventura única no Rio de Janeiro.', 'Las aguas alrededor de las islas son extremadamente claras, permitiendo ver\n                  peces, tortugas y otros animales marinos. Es la experiencia perfecta para\n                  quienes quieren salir de lo común y vivir una aventura única en Río de Janeiro.'],
      // Warning
      ['Aviso Importante', 'Aviso Importante'],
      ['Este roteiro inclui navegação em mar aberto. Em dias de mar muito agitado,\n                    o trajeto pode ser alterado para águas mais calmas por segurança.\n                    Recomendamos para pessoas que não enjoam facilmente.', 'Esta ruta incluye navegación en mar abierto. En días de mar muy agitado,\n                    el trayecto puede ser modificado hacia aguas más tranquilas por seguridad.\n                    Recomendamos para personas que no se marean fácilmente.'],
      // Route stops
      ['Trajeto do Passeio', 'Trayecto del Paseo'],
      ['Ponto de embarque', 'Punto de embarque'],
      ['Urca e Praia Vermelha', 'Urca y Praia Vermelha'],
      ['Parada opcional para mergulho', 'Parada opcional para nadar'],
      ['Passagem panorâmica', 'Paso panorámico'],
      ['Navegação em Mar Aberto', 'Navegación en Mar Abierto'],
      ['Experiência oceânica rumo às ilhas', 'Experiencia oceánica rumbo a las islas'],
      ['Navegação oceânica', 'Navegación oceánica'],
      ['Parada para mergulho em águas cristalinas', 'Parada para nadar en aguas cristalinas'],
      ['Mergulho com vida marinha', 'Buceo con vida marina'],
      ['Retorno e desembarque', 'Regreso y desembarque'],
      // Highlights
      ['Por que escolher este roteiro?', '¿Por qué elegir esta ruta?'],
      ['Experiência única em mar aberto', 'Experiencia única en mar abierto'],
      ['Mergulho com vida marinha', 'Buceo con vida marina'],
      ['Águas cristalinas', 'Aguas cristalinas'],
      ['Navegação oceânica', 'Navegación oceánica'],
      // Available boats
      ['Lanchas Disponíveis para este Roteiro', 'Lanchas Disponibles para esta Ruta'],
      ['Ver Todas as Lanchas', 'Ver Todas las Lanchas'],
      // Sidebar
      ['Duracao', 'Duración'],
      ['Mais tempo de navegacao, menos mergulho', 'Más tiempo de navegación, menos baño'],
      ['Ver Lanchas Disponíveis', 'Ver Lanchas Disponibles'],
      ['Combustível incluso', 'Combustible incluido'],
      ['Marinheiro experiente', 'Marinero experimentado'],
      ['Equipamentos de segurança', 'Equipos de seguridad'],
      // FAQ
      ['Perguntas Frequentes sobre o Passeio nas Ilhas Cagarras', 'Preguntas Frecuentes sobre el Paseo en Ilhas Cagarras'],
      ['O mar é agitado neste roteiro?', '¿El mar es agitado en esta ruta?'],
      ['O roteiro inclui navegação em <strong>mar aberto</strong>. Em dias de mar muito agitado, o trajeto pode ser alterado para águas mais calmas por segurança. Recomendamos para pessoas que não enjoam facilmente.', 'La ruta incluye navegación en <strong>mar abierto</strong>. En días de mar muy agitado, el trayecto puede ser modificado hacia aguas más tranquilas por seguridad. Recomendamos para personas que no se marean fácilmente.'],
      ['Dá para ver animais marinhos?', '¿Se pueden ver animales marinos?'],
      ['<strong>Sim!</strong> As águas ao redor das Ilhas Cagarras são extremamente claras, permitindo visualizar peixes, tartarugas e outros animais marinhos. É um santuário ecológico a 5 km da costa de Ipanema.', '<strong>¡Sí!</strong> Las aguas alrededor de las Ilhas Cagarras son extremadamente claras, permitiendo ver peces, tortugas y otros animales marinos. Es un santuario ecológico a 5 km de la costa de Ipanema.'],
      ['Qual a duração do passeio?', '¿Cuál es la duración del paseo?'],
      ['O passeio de lancha até as Ilhas Cagarras tem duração de <strong>5 horas</strong>, dependendo das condições do mar e do tempo de permanência nas ilhas para mergulho.', 'El paseo en lancha hasta las Ilhas Cagarras tiene una duración de <strong>5 horas</strong>, dependiendo de las condiciones del mar y del tiempo de permanencia en las islas para buceo.'],
      ['Como saber o valor do passeio?', '¿Cómo saber el precio del paseo?'],
      ['O valor varia conforme a lancha escolhida e o dia da semana. Entre em contato pelo <strong>WhatsApp</strong> para receber um orcamento personalizado. Todas as lanchas incluem combustivel, marinheiro experiente e equipamentos de seguranca.', 'El precio varía según la lancha elegida y el día de la semana. Contáctenos por <strong>WhatsApp</strong> para recibir un presupuesto personalizado. Todas las lanchas incluyen combustible, marinero experimentado y equipos de seguridad.'],
      // Other routes section
      ['Explore Outros Roteiros', 'Explore Otras Rutas'],
      ['Conheça outras opções de passeio de lancha no Rio de Janeiro', 'Conozca otras opciones de paseo en lancha en Río de Janeiro'],
      ['5h de passeio', '5h de paseo'],
      ['A partir de R$ 3.000', 'Desde R$ 3.000'],
      ['A partir de R$ 3.600', 'Desde R$ 3.600'],
      ['A partir de R$ 4.500', 'Desde R$ 4.500'],
      ['Ver Roteiro', 'Ver Ruta'],
      ['Vista icônica', 'Vista icónica'],
      ['Praias desertas', 'Playas desiertas'],
      ['Experiência completa', 'Experiencia completa'],
      // CTA
      ['Pronto para a aventura?', '¿Listo para la aventura?'],
      ['Reserve agora seu passeio de lancha até as Ilhas Cagarras e viva\n            uma experiência única em mar aberto!', '¡Reserve ahora su paseo en lancha hasta las Ilhas Cagarras y viva\n            una experiencia única en mar abierto!'],
      ['Reservar Agora', 'Reservar Ahora'],
      // Schema.org FAQ answers (plain text)
      ['O roteiro das Ilhas Cagarras inclui navegação em mar aberto. Em dias de mar muito agitado, o trajeto pode ser alterado para águas mais calmas por segurança. Recomendamos para pessoas que não enjoam facilmente.', 'La ruta de las Ilhas Cagarras incluye navegación en mar abierto. En días de mar muy agitado, el trayecto puede ser alterado hacia aguas más calmas por seguridad. Recomendamos para personas que no se marean fácilmente.'],
      ['Sim! As águas ao redor das Ilhas Cagarras são extremamente claras, permitindo visualizar peixes, tartarugas e outros animais marinhos. É um santuário ecológico a cerca de 5 km da costa de Ipanema.', '¡Sí! Las aguas alrededor de las Ilhas Cagarras son extremadamente claras, permitiendo ver peces, tortugas y otros animales marinos. Es un santuario ecológico a unos 5 km de la costa de Ipanema.'],
      ['O passeio de lancha até as Ilhas Cagarras tem duração de 5 horas, dependendo das condições do mar e do tempo de permanência nas ilhas para mergulho.', 'El paseo en lancha hasta las Ilhas Cagarras tiene una duración de 5 horas, dependiendo de las condiciones del mar y del tiempo de permanencia en las islas para nadar.'],
      ['O valor varia conforme a lancha escolhida e o dia da semana. Entre em contato pelo WhatsApp para receber um orcamento personalizado. Todas as lanchas incluem combustivel, marinheiro experiente, som Bluetooth e equipamentos de seguranca.', 'El precio varía según la lancha elegida y el día de la semana. Contáctenos por WhatsApp para recibir un presupuesto personalizado. Todas las lanchas incluyen combustible, marinero experimentado, sonido Bluetooth y equipos de seguridad.'],
    ],
  },
  {
    ptPath: 'roteiros/itaipu-camboinhas/index.html',
    esPath: 'es/rutas/itaipu-camboinhas/index.html',
    title: 'Paseo en Lancha Itaipu y Camboinhas | Playas Escondidas | WeBoat Brasil',
    description: 'Paseo en lancha hasta las playas de Itaipu y Camboinhas en Niterói. ¡Playas paradisíacas! 5 horas desde R$ 3.600.',
    keywords: 'itaipu camboinhas paseo lancha, playas escondidas niteroi, playa desierta barco',
    waMessage: '¡Hola! Me gustaría hacer la ruta Itaipu y Camboinhas. ¿Cuál es la disponibilidad? [via site - es]',
    css: 'roteiros',
    contentBlocks: [
      // Alt text (NOT protected by translateContent)
      ['Vista aérea da Praia de Itaipu em Niterói com mar cristalino e montanhas', 'Vista aérea de la Praia de Itaipu en Niterói con mar cristalino y montañas'],
      // Schema.org Offer description (JSON-LD — not protected by translateContent)
      ['A partir de R$ 3.600 (seg-qui, WeBoat 32). Inclui combustível, marinheiro e seguro.', 'Desde R$ 3.600 (lun-jue, WeBoat 32). Incluye combustible, marinero y seguro.'],
      // Hero
      ['Praias Desertas', 'Playas Desiertas'],
      ['Roteiro 5 - Itaipu e Camboinhas', 'Ruta 5 - Itaipu y Camboinhas'],
      ['5 horas', '5 horas'],
      ['Travessia + Mar aberto', 'Travesía + Mar abierto'],
      // Description
      ['Sobre o Passeio', 'Sobre el Paseo'],
      ['O passeio de lancha até Niterói é nosso roteiro mais exclusivo! Atravesse\n                  a Baía de Guanabara e descubra as praias semi-desertas de Camboinhas e\n                  Itaipu, longe das multidões e com tranquilidade total.', '¡El paseo en lancha hasta Niterói es nuestra ruta más exclusiva! Cruce\n                  la Bahía de Guanabara y descubra las playas semidesertas de Camboinhas e\n                  Itaipu, lejos de las multitudes y con total tranquilidad.'],
      ['Diferente dos outros roteiros que ficam na zona sul do Rio, este passeio\n                  leva você para o outro lado da baía, revelando paisagens pouco exploradas\n                  e praias com águas calmas e cristalinas.', 'A diferencia de las otras rutas que se quedan en la zona sur de Río, este paseo\n                  lo lleva al otro lado de la bahía, revelando paisajes poco explorados\n                  y playas con aguas tranquilas y cristalinas.'],
      ['É o roteiro perfeito para quem busca exclusividade, sossego e quer fugir\n                  dos points tradicionais. As praias de Camboinhas e Itaipu são verdadeiros\n                  refúgios de paz a poucos quilômetros do centro do Rio.', 'Es la ruta perfecta para quienes buscan exclusividad, tranquilidad y quieren escapar\n                  de los puntos tradicionales. Las playas de Camboinhas e Itaipu son verdaderos\n                  refugios de paz a pocos kilómetros del centro de Río.'],
      // Route stops
      ['Trajeto do Passeio', 'Trayecto del Paseo'],
      ['Ponto de embarque', 'Punto de embarque'],
      ['Travessia da Baía de Guanabara', 'Travesía de la Bahía de Guanabara'],
      ['Vista panorâmica do Rio e Niterói', 'Vista panorámica de Río y Niterói'],
      ['Travessia da baía', 'Travesía de la bahía'],
      ['Passagem pela orla de Niterói', 'Paso por el litoral de Niterói'],
      ['Parada para mergulho - praia semi-deserta', 'Parada para nadar - playa semidesierta'],
      ['1ª Parada para mergulho', '1.a Parada para nadar'],
      ['Parada para mergulho - tranquilidade total', 'Parada para nadar - total tranquilidad'],
      ['2ª Parada para mergulho', '2.a Parada para nadar'],
      ['Retorno e desembarque', 'Regreso y desembarque'],
      // Highlights
      ['Por que escolher este roteiro?', '¿Por qué elegir esta ruta?'],
      ['Praias semi-desertas', 'Playas semidesertas'],
      ['Tranquilidade total', 'Total tranquilidad'],
      ['O mais exclusivo', 'El más exclusivo'],
      ['Fora do circuito tradicional', 'Fuera del circuito tradicional'],
      // Available boats
      ['Lanchas Disponíveis para este Roteiro', 'Lanchas Disponibles para esta Ruta'],
      ['Ver Todas as Lanchas', 'Ver Todas las Lanchas'],
      // Sidebar
      ['Duracao', 'Duración'],
      ['Mais tempo de navegacao, menos mergulho', 'Más tiempo de navegación, menos baño'],
      ['Ver Lanchas Disponíveis', 'Ver Lanchas Disponibles'],
      ['Combustível incluso', 'Combustible incluido'],
      ['Marinheiro experiente', 'Marinero experimentado'],
      // FAQ
      ['Perguntas Frequentes sobre o Passeio em Itaipu e Camboinhas', 'Preguntas Frecuentes sobre el Paseo en Itaipu y Camboinhas'],
      ['O que torna este roteiro especial?', '¿Qué hace especial esta ruta?'],
      ['É nosso <strong>roteiro mais exclusivo!</strong> Diferente dos outros que ficam na zona sul do Rio, este passeio atravessa a Baía de Guanabara e leva você para praias semi-desertas em Niterói.', '¡Es nuestra <strong>ruta más exclusiva!</strong> A diferencia de las otras que se quedan en la zona sur de Río, este paseo cruza la Bahía de Guanabara y lo lleva a playas semidesertas en Niterói.'],
      ['As praias são realmente desertas?', '¿Las playas son realmente desiertas?'],
      ['São praias <strong>semi-desertas</strong>, muito mais tranquilas que as praias da zona sul. Como o acesso por terra é mais difícil, você encontra muito menos pessoas, especialmente em dias de semana.', 'Son playas <strong>semidesertas</strong>, mucho más tranquilas que las playas de la zona sur. Como el acceso por tierra es más difícil, se encuentra mucha menos gente, especialmente entre semana.'],
      ['Qual a duração do passeio?', '¿Cuál es la duración del paseo?'],
      ['O passeio tem duração de <strong>5 horas</strong>, que corresponde a um turno completo. A travessia da Baía de Guanabara e a navegação até as praias de Niterói levam mais tempo.', 'El paseo tiene una duración de <strong>5 horas</strong>, que corresponde a un turno completo. La travesía de la Bahía de Guanabara y la navegación hasta las playas de Niterói toman más tiempo.'],
      ['Como saber o valor do passeio ate Niteroi?', '¿Cómo saber el precio del paseo hasta Niterói?'],
      ['O valor varia conforme a lancha escolhida e o dia da semana. Entre em contato pelo <strong>WhatsApp</strong> para receber um orcamento personalizado. Todas as lanchas incluem combustivel, marinheiro, som Bluetooth e coolers.', 'El precio varía según la lancha elegida y el día de la semana. Contáctenos por <strong>WhatsApp</strong> para recibir un presupuesto personalizado. Todas las lanchas incluyen combustible, marinero, sonido Bluetooth y coolers.'],
      // Other routes section
      ['Explore Outros Roteiros', 'Explore Otras Rutas'],
      ['Conheça outras opções de passeio de lancha no Rio de Janeiro', 'Conozca otras opciones de paseo en lancha en Río de Janeiro'],
      ['5h de passeio', '5h de paseo'],
      ['A partir de R$ 3.600', 'Desde R$ 3.600'],
      ['A partir de R$ 3.000', 'Desde R$ 3.000'],
      ['A partir de R$ 2.500', 'Desde R$ 2.500'],
      ['Ver Roteiro', 'Ver Ruta'],
      ['Mar aberto', 'Mar abierto'],
      ['Vista icônica', 'Vista icónica'],
      ['Mais vendido', 'Más vendido'],
      // CTA
      ['Fuja das multidões!', '¡Escape de las multitudes!'],
      ['Reserve agora seu passeio de lancha até Itaipu e Camboinhas e descubra\n            as praias mais exclusivas do Rio de Janeiro.', '¡Reserve ahora su paseo en lancha hasta Itaipu y Camboinhas y descubra\n            las playas más exclusivas de Río de Janeiro!'],
      ['Reservar Agora', 'Reservar Ahora'],
      // Schema.org FAQ answers (plain text) + page description
      ['Praias semi-desertas de Itaipu e Camboinhas em Niterói. O roteiro mais exclusivo e tranquilo. Duração de 5 horas com saída da Marina da Glória.', 'Playas semidesertas de Itaipu y Camboinhas en Niterói. La ruta más exclusiva y tranquila. Duración de 5 horas con salida de la Marina da Glória.'],
      ['É nosso roteiro mais exclusivo! Diferente dos outros que ficam na zona sul do Rio, este passeio atravessa a Baía de Guanabara e leva você para praias semi-desertas em Niterói, longe das multidões.', '¡Es nuestra ruta más exclusiva! A diferencia de las otras que permanecen en la zona sur de Río, este paseo cruza la Bahía de Guanabara y lo lleva a playas semidesertas en Niterói, lejos de las multitudes.'],
      ['São praias semi-desertas, muito mais tranquilas que as praias da zona sul do Rio. Como o acesso por terra é mais difícil, você encontra muito menos pessoas, especialmente em dias de semana.', 'Son playas semidesertas, mucho más tranquilas que las playas de la zona sur de Río. Como el acceso por tierra es más difícil, encontrará muchas menos personas, especialmente en días de semana.'],
      ['O passeio tem duração de 5 horas, que corresponde a um turno completo. A travessia da Baía de Guanabara e a navegação até as praias de Niterói levam mais tempo que os roteiros na zona sul.', 'El paseo tiene una duración de 5 horas, que corresponde a un turno completo. La travesía de la Bahía de Guanabara y la navegación hasta las playas de Niterói toman más tiempo que las rutas en la zona sur.'],
      ['O valor varia conforme a lancha escolhida e o dia da semana. Entre em contato pelo WhatsApp para receber um orcamento personalizado. Todas as lanchas incluem combustivel, marinheiro experiente, som Bluetooth e coolers.', 'El precio varía según la lancha elegida y el día de la semana. Contáctenos por WhatsApp para recibir un presupuesto personalizado. Todas las lanchas incluyen combustible, marinero experimentado, sonido Bluetooth y coolers.'],
    ],
  },
  {
    ptPath: 'roteiros/volta-completa/index.html',
    esPath: 'es/rutas/volta-completa/index.html',
    title: 'Tour Completo en Lancha | Experiencia Completa | WeBoat Brasil',
    description: 'Tour completo en lancha por Río de Janeiro. ¡La experiencia definitiva! 5 horas desde R$ 4.500.',
    keywords: 'tour completo lancha rio, paseo completo barco, volta completa lancha',
    waMessage: '¡Hola! Me gustaría hacer la ruta del Tour Completo. ¿Cuál es la disponibilidad? [via site - es]',
    css: 'roteiros',
    contentBlocks: [
      // Schema.org FAQ questions (JSON-LD — "Qual" → "¿Cuál")
      ['Qual o trajeto da Volta Completa?', '¿Cuál es el trayecto del Tour Completo?'],
      ['Qual a duração da Volta Completa?', '¿Cuál es la duración del Tour Completo?'],
      // Alt text (NOT protected by translateContent)
      ['MAC Niterói visto do mar com Cristo Redentor ao fundo - Roteiro Volta Completa', 'MAC Niterói visto desde el mar con Cristo Redentor al fondo - Ruta Vuelta Completa'],
      // Schema.org Offer description (JSON-LD — not protected by translateContent)
      ['A partir de R$ 4.500 (seg-qui, WeBoat 32). Inclui combustível, marinheiro e seguro.', 'Desde R$ 4.500 (lun-jue, WeBoat 32). Incluye combustible, marinero y seguro.'],
      // Schema.org FAQ answers (plain text, no HTML) - MUST come FIRST before 'Praias de Adão e Eva' short block
      ['São 3 paradas para mergulho: Praia do Morcego, Praias de Adão e Eva, e Mureta da Urca. Todas em locais com águas calmas e cristalinas, perfeitas para banho.', 'Son 3 paradas para nadar: Praia do Morcego, Playas de Adão e Eva y Mureta da Urca. Todas en lugares con aguas tranquilas y cristalinas, perfectas para baño.'],
      ['O roteiro sai da Marina da Glória, passa pelo Museu do Amanhã, navega sob a Ponte Rio-Niterói, contorna o MAC em Niterói, passa por Icaraí, faz paradas para mergulho no Morcego, Adão e Eva e Mureta da Urca, e retorna passando pelos Fortes históricos de Santa Cruz, Laje e São João.', 'La ruta sale de la Marina da Glória, pasa por el Museu do Amanhã, navega bajo el Puente Rio-Niterói, bordea el MAC en Niterói, pasa por Icaraí, hace paradas para nadar en Morcego, Adão e Eva y Mureta da Urca, y regresa pasando por los Fuertes históricos de Santa Cruz, Laje y São João.'],
      ['A Volta Completa tem duração de 5 horas, sendo nosso passeio mais longo. É ideal para quem quer aproveitar um dia inteiro no mar conhecendo os principais pontos do Rio e Niterói.', 'El Tour Completo tiene una duración de 5 horas, siendo nuestro paseo más largo. Es ideal para quienes quieren aprovechar un día entero en el mar conociendo los principales puntos de Río y Niterói.'],
      ['O valor varia conforme a lancha escolhida e o dia da semana. Entre em contato pelo WhatsApp para receber um orcamento personalizado. Recomendamos combinar com servico de churrasco e open bar para a experiencia completa.', 'El precio varía según la lancha elegida y el día de la semana. Contáctenos por WhatsApp para recibir un presupuesto personalizado. Recomendamos combinarlo con servicio de asado y open bar para la experiencia completa.'],
      // Visible FAQ answers with HTML tags (also before short fragments)
      ['São <strong>3 paradas para mergulho</strong>: Praia do Morcego, Praias de Adão e Eva, e Mureta da Urca. Todas em locais com águas calmas e cristalinas.', 'Son <strong>3 paradas para nadar</strong>: Praia do Morcego, Playas de Adão e Eva y Mureta da Urca. Todas en lugares con aguas tranquilas y cristalinas.'],
      ['O roteiro sai da <strong>Marina da Glória</strong>, passa pelo Museu do Amanhã, navega sob a <strong>Ponte Rio-Niterói</strong>, contorna o MAC em Niterói, passa por Icaraí, faz paradas para mergulho no Morcego, Adão e Eva e Mureta da Urca, e retorna passando pelos <strong>Fortes históricos</strong>.', 'La ruta sale de la <strong>Marina da Glória</strong>, pasa por el Museu do Amanhã, navega bajo el <strong>Puente Rio-Niterói</strong>, bordea el MAC en Niterói, pasa por Icaraí, hace paradas para nadar en Morcego, Adão e Eva y Mureta da Urca, y regresa pasando por los <strong>Fuertes históricos</strong>.'],
      // Long multiline descriptions (MUST come BEFORE 'Volta Completa' short block to avoid substring corruption)
      ['A Volta Completa é o nosso roteiro mais completo de passeio de lancha no Rio de Janeiro!\n                  São 5 horas de navegação combinando os melhores pontos da Baía de Guanabara\n                  com as praias de Niterói em um único passeio inesquecível.', '¡El Tour Completo es nuestra ruta más completa de paseo en lancha en Río de Janeiro!\n                  Son 5 horas de navegación combinando los mejores puntos de la Bahía de Guanabara\n                  con las playas de Niterói en un único paseo inolvidable.'],
      ['Perfeito para aniversários especiais, comemorações importantes ou simplesmente\n                  para quem quer viver um dia inteiro de pura diversão e beleza no mar do Rio.\n                  Recomendamos combinar com churrasco e open bar para a experiência completa!', 'Perfecto para cumpleaños especiales, celebraciones importantes o simplemente\n                  para quienes quieren vivir un día entero de pura diversión y belleza en el mar de Río.\n                  ¡Recomendamos combinarlo con asado y open bar para la experiencia completa!'],
      ['Saindo da Marina da Glória, o passeio segue pela Baía de Guanabara passando pelo\n                  Museu do Amanhã, navegando sob a Ponte Rio-Niterói e contornando o MAC de Niterói.\n                  Na sequência, você faz paradas para mergulho nas praias do Morcego, Adão e Eva, e\n                  retorna passando pelos Fortes históricos de Santa Cruz, Laje e São João até a\n                  Mureta da Urca, com vista privilegiada do Pão de Açúcar.', 'Saliendo de la Marina da Glória, el paseo sigue por la Bahía de Guanabara pasando por el\n                  Museu do Amanhã, navegando bajo el Puente Rio-Niterói y bordeando el MAC de Niterói.\n                  A continuación, se hacen paradas para nadar en las playas de Morcego, Adão e Eva, y\n                  se regresa pasando por los Fuertes históricos de Santa Cruz, Laje y São João hasta\n                  Mureta da Urca, con vista privilegiada del Pão de Açúcar.'],
      // Visible FAQ answer with <strong> (MUST come BEFORE 'Volta Completa' short block)
      ['A Volta Completa tem duração de <strong>5 horas</strong>, sendo nosso passeio mais longo. É ideal para quem quer aproveitar um dia inteiro no mar conhecendo os principais pontos do Rio e Niterói.', 'El Tour Completo tiene una duración de <strong>5 horas</strong>, siendo nuestro paseo más largo. Es ideal para quienes quieren aprovechar un día entero en el mar conociendo los principales puntos de Río y Niterói.'],
      // Schema.org name and description (JSON-LD not protected)
      ['Volta Completa de Lancha pela Baía de Guanabara', 'Tour Completo en Lancha por la Bahía de Guanabara'],
      ['A experiência definitiva de passeio de lancha no Rio de Janeiro. Todos os pontos turísticos em um único passeio de 5 horas pela Baía de Guanabara com saída da Marina da Glória.', 'La experiencia definitiva de paseo en lancha en Río de Janeiro. Todos los puntos turísticos en un único paseo de 5 horas por la Bahía de Guanabara con salida de la Marina da Glória.'],
      ['Navegação completa pela baía com vista para Niterói e centro do Rio', 'Navegación completa por la bahía con vista a Niterói y centro de Río'],
      // "Por que escolher" MUST come BEFORE 'Volta Completa' short block
      ['Por que escolher a Volta Completa?', '¿Por qué elegir el Tour Completo?'],
      // Hero (short blocks after long multiline descriptions)
      ['Experiência Completa', 'Experiencia Completa'],
      ['Volta Completa', 'Tour Completo'],
      ['5 horas', '5 horas'],
      ['Mar variado', 'Mar variado'],
      // Special badge
      ['Roteiro Especial', 'Ruta Especial'],
      // Description
      ['A Experiência Definitiva', 'La Experiencia Definitiva'],
      // Route stops
      ['Trajeto do Passeio', 'Trayecto del Paseo'],
      ['Ponto de embarque - Manhã', 'Punto de embarque - Mañana'],
      ['Museu do Amanhã', 'Museu do Amanhã'],
      ['Vista panorâmica do centro e Praça Mauá', 'Vista panorámica del centro y Praça Mauá'],
      ['Cartão postal', 'Postal'],
      ['Ponte Rio-Niterói', 'Puente Rio-Niterói'],
      ['Navegação sob a maior ponte do Brasil', 'Navegación bajo el puente más grande de Brasil'],
      ['Vista impressionante', 'Vista impresionante'],
      ['MAC - Museu de Arte Contemporânea', 'MAC - Museo de Arte Contemporáneo'],
      ['O icônico disco voador de Oscar Niemeyer', 'El icónico platillo volador de Oscar Niemeyer'],
      ['Foto obrigatória', 'Foto obligatoria'],
      ['Orla de Niterói com vista do Rio', 'Litoral de Niterói con vista de Río'],
      ['Praia do Morcego', 'Praia do Morcego'],
      ['1ª parada para mergulho - águas calmas', '1.a parada para nadar - aguas tranquilas'],
      ['Mergulho', 'Baño'],
      ['Praias de Adão e Eva', 'Playas de Adão e Eva'],
      ['2ª parada para mergulho - praias paradisíacas', '2.a parada para nadar - playas paradisíacas'],
      ['Fortes Históricos', 'Fuertes Históricos'],
      ['Santa Cruz, Laje e São João - história naval', 'Santa Cruz, Laje y São João - historia naval'],
      ['Patrimônio histórico', 'Patrimonio histórico'],
      ['3ª parada para mergulho - vista do Pão de Açúcar', '3.a parada para nadar - vista del Pão de Açúcar'],
      ['Retorno e desembarque - Fim da tarde', 'Regreso y desembarque - Final de la tarde'],
      // Highlights (the "Por que escolher" block was moved BEFORE 'Volta Completa' short block above)
      ['5 horas de navegação', '5 horas de navegación'],
      ['3 paradas para mergulho', '3 paradas para nadar'],
      ['Ponte Rio-Niterói por baixo', 'Puente Rio-Niterói desde abajo'],
      ['Fortes históricos', 'Fuertes históricos'],
      // Tip
      ['Dica: Combine com Churrasco!', '¡Consejo: Combine con Asado!'],
      ['Para a experiência completa, recomendamos adicionar nosso serviço de churrasco\n                e open bar. Assim você aproveita o dia inteiro sem se preocupar com nada!', 'Para la experiencia completa, recomendamos agregar nuestro servicio de asado\n                y open bar. ¡Así disfruta todo el día sin preocuparse por nada!'],
      ['Ver Serviços Disponíveis', 'Ver Servicios Disponibles'],
      // Available boats
      ['Lanchas Recomendadas', 'Lanchas Recomendadas'],
      ['Ver Todas as Lanchas', 'Ver Todas las Lanchas'],
      // Sidebar
      ['Duracao', 'Duración'],
      ['Nosso passeio mais completo e longo', 'Nuestro paseo más completo y largo'],
      ['Ver Lanchas Disponíveis', 'Ver Lanchas Disponibles'],
      ['Combustível incluso', 'Combustible incluido'],
      ['Marinheiro experiente', 'Marinero experimentado'],
      ['Equipamentos de segurança', 'Equipos de seguridad'],
      // FAQ
      ['Perguntas Frequentes sobre a Volta Completa', 'Preguntas Frecuentes sobre el Tour Completo'],
      ['Qual o trajeto da Volta Completa?', '¿Cuál es el trayecto del Tour Completo?'],
      ['Qual a duração da Volta Completa?', '¿Cuál es la duración del Tour Completo?'],
      ['Quantas paradas para mergulho?', '¿Cuántas paradas para nadar?'],
      // NOTE: FAQ answer moved to top of volta-completa contentBlocks
      ['Como saber o valor da Volta Completa?', '¿Cómo saber el precio del Tour Completo?'],
      ['O valor varia conforme a lancha escolhida e o dia da semana. Entre em contato pelo <strong>WhatsApp</strong> para receber um orcamento personalizado. Recomendamos combinar com churrasco e open bar para a experiencia completa!', 'El precio varía según la lancha elegida y el día de la semana. Contáctenos por <strong>WhatsApp</strong> para recibir un presupuesto personalizado. ¡Recomendamos combinarlo con asado y open bar para la experiencia completa!'],
      // Other routes section
      ['Explore Outros Roteiros', 'Explore Otras Rutas'],
      ['Conheça outras opções de passeio de lancha no Rio de Janeiro', 'Conozca otras opciones de paseo en lancha en Río de Janeiro'],
      ['5h de passeio', '5h de paseo'],
      ['A partir de R$ 2.300', 'Desde R$ 2.300'],
      ['A partir de R$ 2.500', 'Desde R$ 2.500'],
      ['A partir de R$ 3.600', 'Desde R$ 3.600'],
      ['Ver Roteiro', 'Ver Ruta'],
      ['Melhor custo-benefício', 'Mejor costo-beneficio'],
      ['Mais vendido', 'Más vendido'],
      ['Mar aberto', 'Mar abierto'],
      // CTA
      ['Viva a experiência completa!', '¡Viva la experiencia completa!'],
      ['Reserve agora a Volta Completa e tenha um dia inteiro de pura\n            diversão no mar mais bonito do Brasil.', '¡Reserve ahora el Tour Completo y tenga un día entero de pura\n            diversión en el mar más hermoso de Brasil!'],
      ['Reservar Agora', 'Reservar Ahora'],
      // NOTE: Schema.org FAQ answers moved to top of volta-completa contentBlocks
    ],
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
    contentBlocks: [
      // Alt text (NOT protected by translateContent)
      ['Nossa maior lancha para 20-22 pessoas', 'Nuestra mayor lancha para 20-22 personas'],
      ['Grupo de amigas em despedida de solteira na lancha com Pão de Açúcar ao fundo', 'Grupo de amigas en despedida de soltera en la lancha con el Pan de Azúcar al fondo'],
      ['Grupo de amigas na despedida de solteira na lancha', 'Grupo de amigas en la despedida de soltera en la lancha'],
      ['Buffet e drinks servidos a bordo na despedida de solteira na lancha', 'Buffet y drinks servidos a bordo en la despedida de soltera en la lancha'],
      ['Amiga com óculos Team Bride e drink rosa na despedida de solteira na lancha', 'Amiga con lentes Team Bride y drink rosa en la despedida de soltera en la lancha'],
      ['Noiva com véu e óculos Team Bride na despedida de solteira na lancha', 'Novia con velo y lentes Team Bride en la despedida de soltera en la lancha'],
      ['Amigas com faixas Team Bride e drinks rosa na despedida de solteira na lancha', 'Amigas con bandas Team Bride y drinks rosa en la despedida de soltera en la lancha'],
      ['Silhueta com drink ao pôr do sol na lancha durante despedida de solteira', 'Silueta con drink al atardecer en la lancha durante despedida de soltera'],
      ['Catamarã Oceano - Maior embarcação para 50-65 pessoas', 'Catamarán Oceano - Mayor embarcación para 50-65 personas'],
      // Schema.org FAQ answers (JSON-LD plain text - MUST come first)
      ['Temos opções de lanchas para grupos de 10 a 65 pessoas. Nossas lanchas próprias comportam de 12 a 22 pessoas, e com parceiros temos opções maiores para grupos grandes. Entre em contato para encontrar a lancha ideal para seu grupo.', 'Tenemos opciones de lanchas para grupos de 10 a 65 personas. Nuestras lanchas propias tienen capacidad de 12 a 22 personas, y con socios tenemos opciones mayores para grupos grandes. Contáctenos para encontrar la lancha ideal para su grupo.'],
      ['A decoração temática de despedida de solteira é um adicional a partir de R$ 135/pessoa, incluindo faixa de noiva, balões, adereços temáticos e props para fotos. Você também pode trazer sua própria decoração.', 'La decoración temática de despedida de soltera es un adicional desde R$ 135/persona, incluyendo banda de novia, globos, accesorios temáticos y props para fotos. También puede traer su propia decoración.'],
      ['Sim! Você pode levar suas próprias bebidas sem custo extra. Também oferecemos serviço de open bar (a partir de R$ 135/pessoa) com drinks especiais para despedida de solteira.', '¡Sí! Puede llevar sus propias bebidas sin costo extra. También ofrecemos servicio de open bar (desde R$ 135/persona) con drinks especiales para despedida de soltera.'],
      ['Totalmente seguro! Todas as lanchas possuem coletes salva-vidas, equipamentos de segurança e marinheiro experiente. O mar da Baía de Guanabara é calmo e navegamos em águas protegidas.', '¡Totalmente seguro! Todas las lanchas tienen chalecos salvavidas, equipos de seguridad y marinero experimentado. El mar de la Bahía de Guanabara es calmo y navegamos en aguas protegidas.'],
      // Schema.org descriptions
      ['A despedida de solteira perfeita no Rio de Janeiro! Celebre com suas amigas a bordo de uma lancha privativa com decoração temática, drinks e muita diversão no mar.', '¡La despedida de soltera perfecta en Río de Janeiro! Celebra con tus amigas a bordo de una lancha privada con decoración temática, drinks y mucha diversión en el mar.'],
      ['Aluguel de lanchas no Rio de Janeiro. Passeios privativos com conforto e segurança.', 'Alquiler de lanchas en Río de Janeiro. Paseos privativos con confort y seguridad.'],
      // Hero
      ['Bride to Be', 'Bride to Be'],
      ['Despedida de Solteira na Lancha', 'Despedida de Soltera en Lancha'],
      ['Celebre a última farra de solteira no cenário mais incrível do Rio de Janeiro.\n          Lancha privativa, drinks, sol e muita diversão com as melhores amigas!', '¡Celebra la última fiesta de soltera en el escenario más increíble de Río de Janeiro!\n          Lancha privada, drinks, sol y mucha diversión con tus mejores amigas.'],
      ['Reservar pelo WhatsApp', 'Reservar por WhatsApp'],
      ['Ver Pacotes', 'Ver Paquetes'],
      // Social Proof
      ['Despedidas realizadas', 'Despedidas realizadas'],
      ['Avaliação no Google', 'Calificación en Google'],
      ['Pessoas por lancha', 'Personas por lancha'],
      ['De festa no mar', 'De fiesta en el mar'],
      // Benefits
      ['Por que escolher', 'Por qué elegirnos'],
      ['A Despedida dos Sonhos', 'La Despedida de Tus Sueños'],
      ['Tudo que você precisa para uma despedida de solteira inesquecível', 'Todo lo que necesitas para una despedida de soltera inolvidable'],
      ['Cenário Perfeito', 'Escenario Perfecto'],
      ['Vista do Pão de Açúcar, Cristo Redentor e as praias mais bonitas do Rio', 'Vista del Pan de Azúcar, Cristo Redentor y las playas más hermosas de Río'],
      ['Privacidade Total', 'Privacidad Total'],
      ['Lancha exclusiva para o grupo, sem estranhos e com liberdade total', 'Lancha exclusiva para el grupo, sin extraños y con total libertad'],
      ['Som Bluetooth', 'Sonido Bluetooth'],
      ['Playlist personalizada da noiva tocando no som de alta qualidade', 'Playlist personalizada de la novia en altavoces de alta calidad'],
      ['Fotos Incríveis', 'Fotos Increíbles'],
      ['Cenário perfeito para fotos que vão bombar nas redes sociais', 'Escenario perfecto para fotos que van a arrasar en las redes sociales'],
      // How it works
      ['Passo a passo', 'Paso a paso'],
      ['Como Organizar', 'Cómo Organizar'],
      ['Escolha a Data', 'Elige la Fecha'],
      ['Entre em contato pelo WhatsApp e informe a data desejada', 'Contáctanos por WhatsApp e indícanos la fecha deseada'],
      ['Monte o Grupo', 'Arma el Grupo'],
      ['Confirme as amigas e escolha a lancha ideal para o tamanho do grupo', 'Confirma a las amigas y elige la lancha ideal para el tamaño del grupo'],
      // LONG 'Personalize...' blocks MUST come before short 'Personalize' to avoid substring corruption
      ['Personalize sua festa', 'Personaliza tu fiesta'],
      ['Personalize sua despedida com serviços exclusivos', 'Personaliza tu despedida con servicios exclusivos'],
      ['Personalize', 'Personaliza'],
      ['Adicione decoração, drinks e serviços extras se desejar', 'Agrega decoración, drinks y servicios extras si lo deseas'],
      ['Curta!', '¡Disfruta!'],
      ['Chegue na Marina, embarque e aproveite a melhor despedida', 'Llega a la Marina, embarca y disfruta de la mejor despedida'],
      // Gallery
      ['Galeria', 'Galería'],
      ['Despedidas que Fizemos', 'Despedidas que Realizamos'],
      // Boats
      ['Nossas Lanchas', 'Nuestras Lanchas'],
      ['Escolha Sua Lancha', 'Elige Tu Lancha'],
      ['Todas incluem combustível, marinheiro e equipamentos de segurança', 'Todas incluyen combustible, marinero y equipos de seguridad'],
      ['Melhor custo-benefício', 'Mejor costo-beneficio'],
      ['Até 15 pessoas', 'Hasta 15 personas'],
      ['Combustível incluso', 'Combustible incluido'],
      ['Tapete flutuante', 'Tapete flotante'],
      ['Ver Detalhes', 'Ver Detalles'],
      ['Até 16 pessoas', 'Hasta 16 personas'],
      ['Churrasqueira', 'Parrilla'],
      ['Até 14 pessoas', 'Hasta 14 personas'],
      ['Conforto premium', 'Confort premium'],
      ['Até 12 pessoas', 'Hasta 12 personas'],
      ['Flybridge exclusivo', 'Flybridge exclusivo'],
      ['Até 22 pessoas', 'Hasta 22 personas'],
      ['Maior capacidade', 'Mayor capacidad'],
      ['Lanchas Parceiras', 'Lanchas Asociadas'],
      ['Precisa de mais espaço?', '¿Necesitas más espacio?'],
      ['Temos lanchas parceiras de 10 a 65 pessoas para grupos maiores.', 'Tenemos lanchas asociadas de 10 a 65 personas para grupos más grandes.'],
      ['Consultar Lanchas Maiores', 'Consultar Lanchas Más Grandes'],
      // Extras section
      ['Deixe a despedida ainda mais especial com nossos serviços adicionais', 'Haz tu despedida aún más especial con nuestros servicios adicionales'],
      ['Drinks especiais, cerveja, caipirinha e muito mais. A partir de R$ 135/pessoa', 'Drinks especiales, cerveza, caipirinha y mucho más. Desde R$ 135/persona'],
      ['Churrasqueiro + carnes selecionadas + acompanhamentos. A partir de R$ 100/pessoa', 'Parrillero + carnes seleccionadas + acompañamientos. Desde R$ 100/persona'],
      ['Kit Bride to Be com faixa, balões, props para fotos. A partir de R$ 135/pessoa', 'Kit Bride to Be con banda, globos, props para fotos. Desde R$ 135/persona'],
      ['Fotógrafo profissional para registrar todos os momentos. A partir de R$ 800', 'Fotógrafo profesional para capturar todos los momentos. Desde R$ 800'],
      ['Serviços Extras', 'Servicios Extras'],
      ['Monte seu Pacote', 'Arma Tu Paquete'],
      ['Open Bar', 'Open Bar'],
      ['Drinks, cerveja, caipirinha e muito mais', 'Drinks, cerveza, caipirinha y mucho más'],
      ['A partir de', 'Desde'],
      ['por pessoa', 'por persona'],
      ['Churrasco', 'Asado'],
      ['Churrasco completo com churrasqueiro a bordo', 'Asado completo con parrillero a bordo'],
      ['Decoração', 'Decoración'],
      ['Faixa de noiva, balões, adereços e props para fotos', 'Banda de novia, globos, accesorios y props para fotos'],
      ['Fotógrafo', 'Fotógrafo'],
      ['Fotógrafo profissional para registrar todos os momentos', 'Fotógrafo profesional para capturar todos los momentos'],
      ['Consulte', 'Consultar'],
      // Reviews
      ['Noivas Felizes', 'Novias Felices'],
      ['Despedidas Inesquecíveis', 'Despedidas Inolvidables'],
      // FAQ
      ['Perguntas Frequentes', 'Preguntas Frecuentes'],
      ['Dúvidas sobre Despedida de Solteira', 'Preguntas sobre Despedida de Soltera'],
      ['Quantas pessoas cabem na lancha para despedida de solteira?', '¿Cuántas personas caben en la lancha para una despedida de soltera?'],
      // FAQ answers — visible text (must match PT source EXACTLY, incl. punctuation)
      ['Temos opções de lanchas para grupos de 10 a 65 pessoas! Nossas lanchas próprias comportam de 12 a 22 pessoas, e com parceiros temos opções maiores para grupos grandes. Entre em contato para encontrar a lancha ideal para seu grupo.', '¡Tenemos opciones de lanchas para grupos de 10 a 65 personas! Nuestras lanchas propias tienen capacidad de 12 a 22 personas, y con asociados tenemos opciones más grandes para grupos grandes. Contáctanos para encontrar la lancha ideal para tu grupo.'],
      ['A decoração está inclusa no pacote?', '¿La decoración está incluida en el paquete?'],
      ['A decoração temática de despedida de solteira é um adicional a partir de R$ 135/pessoa, incluindo faixa de noiva, balões, adereços temáticos e props para fotos. Você também pode trazer sua própria decoração sem custo adicional.', 'La decoración temática de despedida de soltera es un adicional desde R$ 135/persona, incluyendo banda de novia, globos, accesorios temáticos y props para fotos. También puedes traer tu propia decoración sin costo adicional.'],
      ['Posso levar minha própria bebida e comida?', '¿Puedo llevar mi propia bebida y comida?'],
      ['Sim! Você pode levar suas próprias bebidas e comida sem custo extra. Fornecemos coolers. Também oferecemos serviço de open bar (a partir de R$ 135/pessoa) e churrasco completo para quem preferir não se preocupar.', '¡Sí! Puedes llevar tus propias bebidas y comida sin costo extra. Proporcionamos coolers. También ofrecemos servicio de open bar (desde R$ 135/persona) y asado completo para quienes prefieran no preocuparse.'],
      ['É seguro fazer despedida de solteira na lancha?', '¿Es seguro hacer una despedida de soltera en la lancha?'],
      ['Totalmente seguro! Todas as lanchas possuem coletes salva-vidas para todos os passageiros, equipamentos de segurança e marinheiro habilitado pela Marinha do Brasil. Navegamos em águas calmas da Baía de Guanabara.', '¡Totalmente seguro! Todas las lanchas tienen chalecos salvavidas para todos los pasajeros, equipos de seguridad y marinero habilitado por la Marina de Brasil. Navegamos en aguas tranquilas de la Bahía de Guanabara.'],
      ['E se chover no dia?', '¿Y si llueve el día?'],
      ['Se as condições climáticas não permitirem navegação segura, remarcamos seu passeio para outra data sem custo adicional. Nossa equipe monitora a previsão do tempo e entra em contato com antecedência.', 'Si las condiciones climáticas no permiten navegación segura, reprogramamos su paseo para otra fecha sin costo adicional. Nuestro equipo monitorea el pronóstico del tiempo y se comunica con anticipación.'],
      ['Quanto tempo dura o passeio?', '¿Cuánto tiempo dura el paseo?'],
      ['O passeio dura aproximadamente 5 horas, saindo da Marina da Glória. É tempo suficiente para curtir o mar, tirar fotos, mergulhar e aproveitar todos os serviços contratados.', 'El paseo dura aproximadamente 5 horas, saliendo de la Marina da Glória. Es tiempo suficiente para disfrutar del mar, tomar fotos, nadar y aprovechar todos los servicios contratados.'],
      // Partner boats section
      ['Grupos maiores? Temos opções de 30 a 65 pessoas!', '¡Grupos más grandes? ¡Tenemos opciones de 30 a 65 personas!'],
      ['30-40 pessoas', '30-40 personas'],
      ['Ideal para eventos', 'Ideal para eventos'],
      ['Gerador incluso', 'Generador incluido'],
      ['Ver Detalhes', 'Ver Detalles'],
      ['40-65 pessoas', '40-65 personas'],
      ['Catamarã espaçoso', 'Catamarán espacioso'],
      ['Pista de dança', 'Pista de baile'],
      ['Solicitar Orçamento', 'Solicitar Presupuesto'],
      ['Despedidas Inesquecíveis', 'Despedidas Inolvidables'],
      ['Veja o que as noivas e madrinhas estão dizendo sobre nossas despedidas de solteira.', 'Mira lo que las novias y madrinas están diciendo sobre nuestras despedidas de soltera.'],
      ['Veja os relatos de quem já celebrou a despedida de solteira a bordo com a WeBoat.', 'Mira los testimonios de quienes ya celebraron su despedida de soltera a bordo con WeBoat.'],
      // Recommended
      ['Lanchas Recomendadas para Despedida de Solteira', 'Lanchas Recomendadas para Despedida de Soltera'],
      ['Lanchas Recomendadas', 'Lanchas Recomendadas'],
      ['Para Despedida de Solteira', 'Para Despedida de Soltera'],
      ['Selecionamos as melhores opções para sua despedida de solteira', 'Seleccionamos las mejores opciones para tu despedida de soltera'],
      ['Selecionamos as melhores opções para a despedida perfeita', 'Seleccionamos las mejores opciones para la despedida perfecta'],
      // CTA
      ['Reserve Agora a Despedida Perfeita', 'Reserva Ahora la Despedida Perfecta'],
      ['Entre em contato e garanta a data para uma despedida de solteira inesquecível!', '¡Contáctanos y asegura la fecha para una despedida de soltera inolvidable!'],
      ['Falar com Especialista', 'Hablar con un Especialista'],
    ],
  },
  {
    ptPath: 'aniversario/index.html',
    esPath: 'es/cumpleanos/index.html',
    title: 'Fiesta de Cumpleaños en Lancha en Río de Janeiro | WeBoat Brasil',
    description: '¡Celebra tu cumpleaños en una lancha privada en Río! Asado, DJ, open bar, decoración. Desde R$ 2.300.',
    keywords: 'cumpleaños lancha rio, fiesta cumpleaños barco, celebración cumpleaños rio de janeiro',
    waMessage: '¡Hola! Quiero celebrar mi cumpleaños en una lancha. ¿Pueden ayudarme a organizar? [via site - es]',
    css: 'ocasioes',
    contentBlocks: [
      // Schema Event description (JSON-LD not protected)
      ['Comemore seu aniversário de forma inesquecível a bordo de uma lancha privativa no Rio de Janeiro. Churrasco, open bar, decoração e vista incrível.', 'Celebre su cumpleaños de forma inolvidable a bordo de una lancha privada en Río de Janeiro. Asado, open bar, decoración y vista increíble.'],
      // Schema FAQ answers (JSON-LD plain text - different from visible FAQ)
      // Visible FAQ answer (FULL version with continuation - MUST come before shorter Schema version)
      ['Sim! Temos lanchas com churrasqueira disponível, como a WeBoat 390. O serviço completo de churrasco com churrasqueiro e carnes começa a partir de R$ 100 por pessoa. Você também pode contratar apenas a taxa da churrasqueira e levar seus próprios itens.', '¡Sí! Tenemos lanchas con parrilla disponible, como la WeBoat 390. El servicio completo de asado con parrillero y carnes comienza desde R$ 100 por persona. También puedes contratar solo la tarifa de la parrilla y llevar tus propios ingredientes.'],
      ['Claro! Você pode trazer seu próprio bolo. Temos espaço para armazená-lo durante o passeio e a tripulação pode ajudar na hora de cantar parabéns em um momento especial.', '¡Claro! Puedes traer tu propio pastel. Tenemos espacio para almacenarlo durante el paseo y la tripulación puede ayudar a la hora de cantar cumpleaños feliz en un momento especial.'],
      // Schema FAQ answers (shorter versions - come AFTER visible FAQ)
      ['Sim! Temos lanchas com churrasqueira disponível, como a WeBoat 390. O serviço completo de churrasco com churrasqueiro e carnes começa a partir de R$ 100 por pessoa.', '¡Sí! Tenemos lanchas con parrilla disponible, como la WeBoat 390. El servicio completo de asado con parrillero y carnes comienza desde R$ 100 por persona.'],
      ['Claro! Você pode trazer seu próprio bolo. Temos espaço refrigerado para armazená-lo durante o passeio e a tripulação pode ajudar na hora de cantar parabéns.', '¡Claro! Puedes traer tu propio pastel. Tenemos espacio refrigerado para almacenarlo durante el paseo y la tripulación puede ayudar a la hora de cantar cumpleaños feliz.'],
      // Alt text (NOT protected by translateContent)
      ['Equipe preparando churrasco e petiscos na churrasqueira da marina com vista para o mar', 'Equipo preparando asado y bocadillos en la parrilla de la marina con vista al mar'],
      ['Nossa maior lancha para 20-22 pessoas', 'Nuestra mayor lancha para 20-22 personas'],
      ['Festa de aniversário na lancha no Rio de Janeiro', 'Fiesta de cumpleaños en la lancha en Río de Janeiro'],
      ['Buffet de frutas tropicais com arranjo de flores na lancha na Marina da Glória', 'Buffet de frutas tropicales con arreglo de flores en la lancha en la Marina da Glória'],
      ['Aniversariante com bolo personalizado na lancha', 'Cumpleañero/a con pastel personalizado en la lancha'],
      ['Mesa de buffet com mini hambúrgueres, quiche e salgados decorada com balões rosa em festa de aniversário na lancha', 'Mesa de buffet con mini hamburguesas, quiche y bocadillos decorada con globos rosa en fiesta de cumpleaños en la lancha'],
      ['Decoração de aniversário na lancha com balões verdes e letreiro Happy Birthday neon', 'Decoración de cumpleaños en la lancha con globos verdes y letrero Happy Birthday neon'],
      ['Churrasqueiro preparando espetinhos e carnes na churrasqueira a bordo da lancha', 'Parrillero preparando brochetas y carnes en la parrilla a bordo de la lancha'],
      ['Catamarã Oceano - Catamarã para 50-65 pessoas', 'Catamarán Oceano - Catamarán para 50-65 personas'],
      // Longer strings first (must precede 'Aniversário na Lancha' to avoid substring corruption)
      ['Dúvidas sobre Aniversário na Lancha', 'Preguntas sobre Cumpleaños en Lancha'],
      // Hero
      ['Happy Birthday', 'Happy Birthday'],
      ['Aniversário na Lancha', 'Cumpleaños en Lancha'],
      ['Comemore seu aniversário com o cenário mais bonito do Rio de Janeiro.\n          Festa privativa, churrasco, drinks e muita diversão no mar!', '¡Celebra tu cumpleaños con el escenario más hermoso de Río de Janeiro!\n          Fiesta privada, asado, drinks y mucha diversión en el mar.'],
      ['Reservar pelo WhatsApp', 'Reservar por WhatsApp'],
      ['Ver Pacotes', 'Ver Paquetes'],
      // Social Proof
      ['Aniversários celebrados', 'Cumpleaños celebrados'],
      ['Avaliação no Google', 'Calificación en Google'],
      ['Convidados por lancha', 'Invitados por lancha'],
      ['De festa disponíveis', 'De fiesta disponibles'],
      // Benefits
      ['Por que escolher', 'Por qué elegirnos'],
      ['O Aniversário dos Sonhos', 'El Cumpleaños de Tus Sueños'],
      ['Tudo que você precisa para uma festa de aniversário inesquecível', 'Todo lo que necesitas para una fiesta de cumpleaños inolvidable'],
      ['Churrasco no Mar', 'Asado en el Mar'],
      ['Churrasqueira disponível em lanchas selecionadas com serviço completo', 'Parrilla disponible en lanchas seleccionadas con servicio completo'],
      ['Momento do Bolo', 'Momento del Pastel'],
      ['Cantamos parabéns com a tripulação e cenário perfeito para fotos', 'Cantamos cumpleaños feliz con la tripulación y escenario perfecto para fotos'],
      ['Open Bar', 'Open Bar'],
      ['Drinks, cerveja, caipirinha e tudo para sua festa ser completa', 'Drinks, cerveza, caipirinha y todo para que tu fiesta sea completa'],
      ['Decoração', 'Decoración'],
      ['Balões, faixas personalizadas e toda decoração que você quiser', 'Globos, banderas personalizadas y toda la decoración que desees'],
      // How it works
      ['Passo a passo', 'Paso a paso'],
      ['Como Organizar', 'Cómo Organizar'],
      ['Escolha a Data', 'Elige la Fecha'],
      ['Entre em contato e reserve o dia especial', 'Contáctanos y reserva el día especial'],
      ['Defina os Serviços', 'Define los Servicios'],
      ['Churrasco, open bar, decoração - monte seu pacote', 'Asado, open bar, decoración - arma tu paquete'],
      ['Convide os Amigos', 'Invita a Tus Amigos'],
      ['Confirme os convidados e escolha a lancha ideal', 'Confirma los invitados y elige la lancha ideal'],
      ['Celebre!', '¡Celebra!'],
      ['Chegue, embarque e curta seu dia especial', 'Llega, embarca y disfruta de tu día especial'],
      // Gallery
      ['Galeria', 'Galería'],
      ['Aniversários que Celebramos', 'Cumpleaños que Celebramos'],
      // Boats
      ['Nossas Lanchas', 'Nuestras Lanchas'],
      ['Escolha Sua Lancha', 'Elige Tu Lancha'],
      ['Todas incluem combustível, marinheiro e equipamentos de segurança', 'Todas incluyen combustible, marinero y equipos de seguridad'],
      // Extras section (match PT source exactly)
      ['Personalize sua festa', 'Personaliza tu fiesta'],
      ['Deixe seu aniversário ainda mais especial com nossos serviços adicionais', 'Haz tu cumpleaños aún más especial con nuestros servicios adicionales'],
      ['Serviços Extras', 'Servicios Extras'],
      ['Monte seu Pacote', 'Arma Tu Paquete'],
      ['Personalize sua festa com serviços exclusivos', 'Personaliza tu fiesta con servicios exclusivos'],
      ['Churrasco Completo', 'Asado Completo'],
      ['Churrasqueiro + carnes premium + acompanhamentos. A partir de R$ 100/pessoa', 'Parrillero + carnes premium + acompañamientos. Desde R$ 100/persona'],
      ['Cerveja, drinks, caipirinha e mais. A partir de R$ 135/pessoa', 'Cerveza, drinks, caipirinha y más. Desde R$ 135/persona'],
      ['Kit Festa Premium com balões, faixa, mesa decorada e iluminação. A partir de R$ 1.850', 'Kit Fiesta Premium con globos, banda, mesa decorada e iluminación. Desde R$ 1.850'],
      ['Bolo Personalizado', 'Pastel Personalizado'],
      ['Bolo decorado com tema à sua escolha. Consulte valores', 'Pastel decorado con tema a tu elección. Consulte precios'],
      // Reviews
      ['Aniversariantes Felizes', 'Cumpleañeros Felices'],
      ['Comemorações Especiais no Mar', 'Celebraciones Especiales en el Mar'],
      ['Descubra por que tantas pessoas escolhem a WeBoat para celebrar seus aniversários.', 'Descubra por qué tantas personas eligen WeBoat para celebrar sus cumpleaños.'],
      ['Festas Inesquecíveis', 'Fiestas Inolvidables'],
      // FAQ — visible text (must match PT source EXACTLY)
      ['Perguntas Frequentes', 'Preguntas Frecuentes'],
      ['Posso fazer churrasco na lancha?', '¿Puedo hacer asado en la lancha?'],
      ['Sim! Temos lanchas com churrasqueira disponível, como a WeBoat 390. O serviço completo de churrasco com churrasqueiro e carnes começa a partir de R$ 100 por pessoa. Você também pode contratar apenas a taxa da churrasqueira e levar seus próprios itens.', '¡Sí! Tenemos lanchas con parrilla disponible, como la WeBoat 390. El servicio completo de asado con parrillero y carnes comienza desde R$ 100 por persona. También puedes contratar solo la tarifa de la parrilla y llevar tus propios ingredientes.'],
      ['Como funciona a decoração de aniversário?', '¿Cómo funciona la decoración de cumpleaños?'],
      ['Oferecemos o Kit Festa Premium a partir de R$ 1.850, incluindo balões, faixa personalizada, mesa decorada, iluminação e velas. Você também pode trazer sua própria decoração sem custo adicional.', 'Ofrecemos el Kit Fiesta Premium desde R$ 1.850, incluyendo globos, banda personalizada, mesa decorada, iluminación y velas. También puedes traer tu propia decoración sin costo adicional.'],
      // Schema.org version (shorter ending)
      ['Oferecemos o Kit Festa Premium a partir de R$ 1.850, incluindo balões, faixa personalizada, mesa decorada, iluminação e velas. Você também pode trazer sua própria decoração.', 'Ofrecemos el Kit Fiesta Premium desde R$ 1.850, incluyendo globos, banda personalizada, mesa decorada, iluminación y velas. También puedes traer tu propia decoración.'],
      ['Posso levar meu bolo de aniversário?', '¿Puedo llevar mi pastel de cumpleaños?'],
      ['Claro! Você pode trazer seu próprio bolo. Temos espaço para armazená-lo durante o passeio e a tripulação pode ajudar na hora de cantar parabéns em um momento especial.', '¡Claro! Puedes traer tu propio pastel. Tenemos espacio para almacenarlo durante el paseo y la tripulación puede ayudar a la hora de cantar cumpleaños feliz en un momento especial.'],
      ['Qual o horário ideal para aniversário na lancha?', '¿Cuál es el horario ideal para cumpleaños en la lancha?'],
      ['O horário do final da tarde (a partir das 15h) é muito popular para ver o pôr do sol. Mas também fazemos passeios de manhã e à tarde. Finais de semana e feriados costumam ter mais procura, então reserve com antecedência.', 'El horario de la tarde (a partir de las 15h) es muy popular para ver la puesta de sol. También hacemos paseos por la mañana y por la tarde. Fines de semana y feriados suelen tener más demanda, así que reserve con anticipación.'],
      ['Posso estender o tempo do passeio?', '¿Puedo extender el tiempo del paseo?'],
      ['Sim! Você pode contratar horas adicionais. Muitos aniversariantes optam por passeios de 4h, 5h ou até 6h para aproveitar mais com churrasco e drinks. Consulte os valores das horas extras.', '¡Sí! Puedes contratar horas adicionales. Muchos cumpleañeros optan por paseos de 4h, 5h o hasta 6h para aprovechar más con asado y drinks. Consulte los precios de las horas extras.'],
      ['Quanto custa uma festa de aniversário na lancha?', '¿Cuánto cuesta una fiesta de cumpleaños en la lancha?'],
      ['O valor da lancha começa a partir de R$ 2.300 (seg-qui). Serviços extras como churrasco, open bar e decoração são contratados à parte. Entre em contato para montar seu pacote personalizado.', 'El valor de la lancha comienza desde R$ 2.300 (lun-jue). Servicios extras como asado, open bar y decoración se contratan aparte. Contáctanos para armar tu paquete personalizado.'],
      ['Quantas pessoas cabem na lancha?', '¿Cuántas personas caben en la lancha?'],
      ['Nossas lanchas próprias comportam de 12 a 22 pessoas. Para grupos maiores, temos lanchas parceiras para até 65 pessoas. A média para festas de aniversário é de 15 a 20 convidados.', 'Nuestras lanchas propias tienen capacidad de 12 a 22 personas. Para grupos más grandes, tenemos lanchas asociadas para hasta 65 personas. El promedio para fiestas de cumpleaños es de 15 a 20 invitados.'],
      // Partner boats section
      ['Grupos maiores? Temos opções de 30 a 65 pessoas!', '¡Grupos más grandes? ¡Tenemos opciones de 30 a 65 personas!'],
      ['30-40 pessoas', '30-40 personas'],
      ['Ideal para eventos', 'Ideal para eventos'],
      ['Gerador incluso', 'Generador incluido'],
      ['Ver Detalhes', 'Ver Detalles'],
      ['40-65 pessoas', '40-65 personas'],
      ['Catamarã espaçoso', 'Catamarán espacioso'],
      ['Pista de dança', 'Pista de baile'],
      ['Solicitar Orçamento', 'Solicitar Presupuesto'],
      // Recommended
      ['Lanchas Recomendadas para Aniversário', 'Lanchas Recomendadas para Cumpleaños'],
      ['Lanchas Recomendadas', 'Lanchas Recomendadas'],
      ['Para Aniversário', 'Para Cumpleaños'],
      ['Selecionamos as melhores opções para sua festa de aniversário', 'Seleccionamos las mejores opciones para tu fiesta de cumpleaños'],
      // CTA
      ['Reserve Seu Aniversário no Mar', 'Reserva Tu Cumpleaños en el Mar'],
      ['Entre em contato e garanta a data para uma festa inesquecível!', '¡Contáctanos y asegura la fecha para una fiesta inolvidable!'],
      ['Falar com Especialista', 'Hablar con un Especialista'],
    ],
  },
  {
    ptPath: 'corporativo/index.html',
    esPath: 'es/eventos-corporativos/index.html',
    title: 'Eventos Corporativos en Lancha en Río de Janeiro | WeBoat Brasil',
    description: 'Organice su evento corporativo en una lancha privada en Río. Team building, entretenimiento de clientes. Lanchas para 10-65 personas.',
    keywords: 'evento corporativo lancha rio, team building barco, evento empresarial rio de janeiro',
    waMessage: '¡Hola! Me gustaría información sobre eventos corporativos en lancha. [via site - es]',
    css: 'ocasioes',
    contentBlocks: [
      // Schema FAQ answers (JSON-LD plain text - shorter than visible FAQ versions)
      ['Sim, emitimos nota fiscal de serviços para todas as reservas corporativas. Basta informar os dados da empresa no momento da contratação.', 'Sí, emitimos factura de servicios para todas las reservas corporativas. Solo debe informar los datos de la empresa al momento de la contratación.'],
      ['Com nossa frota própria atendemos até 22 pessoas por lancha. Para grupos maiores de até 65 pessoas, temos lanchas parceiras disponíveis. Também podemos organizar eventos com múltiplas lanchas.', 'Con nuestra flota propia atendemos hasta 22 personas por lancha. Para grupos más grandes de hasta 65 personas, tenemos lanchas asociadas disponibles. También podemos organizar eventos con múltiples lanchas.'],
      ['Sim! Nossas lanchas maiores oferecem ambiente confortável para reuniões executivas em ambiente diferenciado. Navegamos em águas calmas que permitem conversas e apresentações.', '¡Sí! Nuestras lanchas más grandes ofrecen un ambiente confortable para reuniones ejecutivas en un entorno diferenciado. Navegamos en aguas tranquilas que permiten conversaciones y presentaciones.'],
      // Alt text (NOT protected by translateContent)
      ['Nossa maior lancha para 20-22 pessoas', 'Nuestra mayor lancha para 20-22 personas'],
      ['Evento corporativo na lancha no Rio de Janeiro', 'Evento corporativo en la lancha en Río de Janeiro'],
      ['Equipe em evento corporativo na lancha', 'Equipo en evento corporativo en la lancha'],
      ['Convidados com drinks em confraternização corporativa na lancha', 'Invitados con drinks en confraternización corporativa en la lancha'],
      ['Grupo brindando em evento corporativo no mar', 'Grupo brindando en evento corporativo en el mar'],
      ['Colaboradores relaxando no deck da lancha', 'Colaboradores relajándose en el deck de la lancha'],
      ['Relaxamento no solário da lancha em evento corporativo', 'Relax en el solárium de la lancha en evento corporativo'],
      ['Happy hour corporativo no mar com vista do Rio', 'Happy hour corporativo en el mar con vista de Río'],
      ['Catamarã Oceano - Catamarã para 50-65 pessoas', 'Catamarán Oceano - Catamarán para 50-65 personas'],
      // Schema.org descriptions
      ['Serviço de eventos corporativos exclusivos a bordo de lanchas no Rio de Janeiro. Confraternizações, team building, reuniões executivas e premiações.', 'Servicio de eventos corporativos exclusivos a bordo de lanchas en Río de Janeiro. Confraternizaciones, team building, reuniones ejecutivas y premiaciones.'],
      ['Aluguel de lanchas no Rio de Janeiro. Passeios privativos com conforto e segurança.', 'Alquiler de lanchas en Río de Janeiro. Paseos privativos con confort y seguridad.'],
      // Longer strings first (must precede 'Eventos Corporativos' to avoid substring corruption)
      ['Lanchas Recomendadas para Eventos Corporativos', 'Lanchas Recomendadas para Eventos Corporativos'],
      ['Eventos Corporativos de Sucesso', 'Eventos Corporativos Exitosos'],
      ['Dúvidas sobre Eventos Corporativos', 'Preguntas sobre Eventos Corporativos'],
      ['Para Eventos Corporativos', 'Para Eventos Corporativos'],
      // Hero
      ['Corporate', 'Corporate'],
      ['Eventos Corporativos', 'Eventos Corporativos'],
      ['Surpreenda sua equipe com uma experiência única no mar.\n          Confraternizações, team building, reuniões e celebrações em ambiente exclusivo.', 'Sorprenda a su equipo con una experiencia única en el mar.\n          Confraternizaciones, team building, reuniones y celebraciones en un ambiente exclusivo.'],
      ['Solicitar Orçamento', 'Solicitar Presupuesto'],
      ['Ver Opções', 'Ver Opciones'],
      // Social Proof
      ['Eventos corporativos', 'Eventos corporativos'],
      ['Pessoas por evento', 'Personas por evento'],
      ['Nota fiscal emitida', 'Factura emitida'],
      ['Avaliação Google', 'Calificación Google'],
      // Event Types
      ['Tipos de eventos', 'Tipos de eventos'],
      ['Eventos que Realizamos', 'Eventos que Realizamos'],
      ['Soluções personalizadas para cada necessidade da sua empresa', 'Soluciones personalizadas para cada necesidad de su empresa'],
      ['Confraternizações', 'Confraternizaciones'],
      ['Fim de ano, metas batidas, celebração de resultados em ambiente único', 'Fin de año, metas cumplidas, celebración de resultados en un ambiente único'],
      ['Team Building', 'Team Building'],
      ['Integração de equipes, onboarding e atividades de grupo no mar', 'Integración de equipos, onboarding y actividades de grupo en el mar'],
      ['Premiações', 'Premiaciones'],
      ['Reconhecimento de colaboradores e parceiros em experiência exclusiva', 'Reconocimiento de colaboradores y socios en una experiencia exclusiva'],
      ['Reuniões Executivas', 'Reuniones Ejecutivas'],
      ['Ambiente diferenciado para reuniões estratégicas e negociações', 'Ambiente diferenciado para reuniones estratégicas y negociaciones'],
      // Differentials
      ['Por que escolher a WeBoat', 'Por qué elegir WeBoat'],
      ['Diferenciais para Empresas', 'Ventajas para Empresas'],
      ['Experiência e estrutura para atender às necessidades corporativas', 'Experiencia e infraestructura para atender las necesidades corporativas'],
      ['Nota Fiscal', 'Factura'],
      ['Emissão de NF de serviços para facilitar o pagamento via CNPJ', 'Emisión de factura de servicios para facilitar el pago corporativo'],
      ['Seguro Completo', 'Seguro Completo'],
      ['Seguro obrigatório e responsabilidade civil para todos os passageiros', 'Seguro obligatorio y responsabilidad civil para todos los pasajeros'],
      ['Atendimento Dedicado', 'Atención Dedicada'],
      ['Consultor exclusivo para organização do seu evento', 'Consultor exclusivo para la organización de su evento'],
      ['Personalização Total', 'Personalización Total'],
      ['Adaptamos roteiro, serviços e decoração às suas necessidades', 'Adaptamos la ruta, servicios y decoración a sus necesidades'],
      // Gallery
      ['Galeria', 'Galería'],
      ['Eventos que Realizamos', 'Eventos que Realizamos'],
      // Boats
      ['Nossas Lanchas', 'Nuestras Lanchas'],
      ['Escolha Sua Lancha', 'Elija Su Lancha'],
      ['Todas incluem combustível, marinheiro e equipamentos de segurança', 'Todas incluyen combustible, marinero y equipos de seguridad'],
      // Extras section (match PT source exactly)
      ['Serviços adicionais', 'Servicios adicionales'],
      ['Churrasqueiro + carnes premium + acompanhamentos. A partir de R$ 100/pessoa', 'Parrillero + carnes premium + acompañamientos. Desde R$ 100/persona'],
      ['Cerveja, drinks, caipirinha e mais. A partir de R$ 135/pessoa', 'Cerveza, drinks, caipirinha y más. Desde R$ 135/persona'],
      ['Opções de petiscos e finger food para eventos executivos. Consulte', 'Opciones de bocadillos y finger food para eventos ejecutivos. Consulte'],
      ['Decoração personalizada com a identidade visual da sua empresa', 'Decoración personalizada con la identidad visual de su empresa'],
      ['Serviços Extras', 'Servicios Extras'],
      ['Monte seu Evento', 'Arme Su Evento'],
      ['Personalize seu evento com serviços profissionais', 'Personalice su evento con servicios profesionales'],
      ['Churrasco', 'Asado'],
      ['Churrasco completo com churrasqueiro profissional', 'Asado completo con parrillero profesional'],
      ['Open Bar', 'Open Bar'],
      ['Drinks, cerveja, espumante e bebidas premium', 'Drinks, cerveza, espumante y bebidas premium'],
      ['Finger Food', 'Finger Food'],
      ['Canapés, mini porções e petiscos sofisticados', 'Canapés, mini porciones y bocadillos sofisticados'],
      ['Branding', 'Branding'],
      ['Personalização com logo, banners e materiais da empresa', 'Personalización con logo, banners y materiales de la empresa'],
      // Reviews
      ['Empresas Satisfeitas', 'Empresas Satisfechas'],
      ['Confira a avaliação de empresas que realizaram confraternizações e eventos conosco.', 'Vea la evaluación de empresas que realizaron confraternizaciones y eventos con nosotros.'],
      ['Selecionamos as melhores opções para sua confraternização corporativa', 'Seleccionamos las mejores opciones para su confraternización corporativa'],
      // FAQ
      ['Perguntas Frequentes', 'Preguntas Frecuentes'],
      ['Vocês emitem nota fiscal para empresas?', '¿Emiten factura para empresas?'],
      // FAQ — visible text (must match PT source EXACTLY)
      ['Sim, emitimos nota fiscal de serviços para todas as reservas corporativas. Basta informar os dados da empresa (CNPJ, razão social, endereço) no momento da contratação.', 'Sí, emitimos factura de servicios para todas las reservas corporativas. Solo debe informar los datos de la empresa (CNPJ, razón social, dirección) al momento de la contratación.'],
      ['Qual a capacidade máxima para eventos corporativos?', '¿Cuál es la capacidad máxima para eventos corporativos?'],
      ['Com nossa frota própria atendemos até 22 pessoas por lancha (Rio Star 50). Para grupos maiores de até 65 pessoas, temos lanchas parceiras disponíveis. Também podemos organizar eventos com múltiplas lanchas navegando juntas.', 'Con nuestra flota propia atendemos hasta 22 personas por lancha (Rio Star 50). Para grupos más grandes de hasta 65 personas, tenemos lanchas asociadas disponibles. También podemos organizar eventos con múltiples lanchas navegando juntas.'],
      ['É possível fazer reuniões na lancha?', '¿Es posible hacer reuniones en la lancha?'],
      ['Sim! Nossas lanchas maiores oferecem ambiente confortável para reuniões executivas em ambiente diferenciado. Navegamos em águas calmas da Baía de Guanabara que permitem conversas tranquilas. Ideal para brainstorming, planejamento estratégico ou reuniões de diretoria.', '¡Sí! Nuestras lanchas más grandes ofrecen un ambiente confortable para reuniones ejecutivas en un entorno diferenciado. Navegamos en aguas tranquilas de la Bahía de Guanabara que permiten conversaciones tranquilas. Ideal para brainstorming, planificación estratégica o reuniones de directorio.'],
      ['Como funciona o pagamento para empresas?', '¿Cómo funciona el pago para empresas?'],
      ['Aceitamos transferência bancária, PIX, boleto e cartão de crédito corporativo. Para reservas com antecedência, solicitamos um sinal de 50% e o restante pode ser pago até o dia do evento. Faturamento parcelado disponível para contratos corporativos.', 'Aceptamos transferencia bancaria, PIX, boleto y tarjeta de crédito corporativa. Para reservas con anticipación, solicitamos una seña del 50% y el resto puede pagarse hasta el día del evento. Facturación en cuotas disponible para contratos corporativos.'],
      ['Posso personalizar o evento com a marca da empresa?', '¿Puedo personalizar el evento con la marca de la empresa?'],
      ['Sim! Oferecemos personalização com a identidade visual da sua empresa, incluindo banners, bandeiras, itens decorativos e até copos e guardanapos personalizados. Consulte nosso time para montar um pacote sob medida.', '¡Sí! Ofrecemos personalización con la identidad visual de su empresa, incluyendo banners, banderas, artículos decorativos e incluso vasos y servilletas personalizados. Consulte con nuestro equipo para armar un paquete a medida.'],
      // Partner boats section
      ['Grupos maiores? Temos opções de 30 a 65 pessoas!', '¡Grupos más grandes? ¡Tenemos opciones de 30 a 65 personas!'],
      ['30-40 pessoas', '30-40 personas'],
      ['Ideal para eventos', 'Ideal para eventos'],
      ['Gerador incluso', 'Generador incluido'],
      ['Ver Detalhes', 'Ver Detalles'],
      ['40-65 pessoas', '40-65 personas'],
      ['Catamarã espaçoso', 'Catamarán espacioso'],
      ['Pista de dança', 'Pista de baile'],
      ['Solicitar Orçamento', 'Solicitar Presupuesto'],
      ['Complete Seu Evento', 'Complete Su Evento'],
      ['Eventos Corporativos de Sucesso', 'Eventos Corporativos Exitosos'],
      ['Veja depoimentos de empresas que já realizaram eventos a bordo com a WeBoat.', 'Vea los testimonios de empresas que ya realizaron eventos a bordo con WeBoat.'],
      // Recommended
      ['Lanchas Recomendadas para Eventos Corporativos', 'Lanchas Recomendadas para Eventos Corporativos'],
      ['Lanchas Recomendadas', 'Lanchas Recomendadas'],
      ['Selecionamos as melhores opções para seu evento corporativo', 'Seleccionamos las mejores opciones para su evento corporativo'],
      // CTA
      ['Vamos Planejar Seu Evento?', '¿Planificamos Su Evento?'],
      ['Entre em contato e receba um orçamento personalizado para sua empresa.', 'Contáctenos y reciba un presupuesto personalizado para su empresa.'],
      ['Entre em contato para um orçamento personalizado para sua empresa.', 'Contáctenos para un presupuesto personalizado para su empresa.'],
      ['Falar com Especialista', 'Hablar con un Especialista'],
    ],
  },
  {
    ptPath: 'reveillon/index.html',
    esPath: 'es/ano-nuevo/index.html',
    title: 'Año Nuevo en Lancha en Río de Janeiro | WeBoat Brasil',
    description: '¡Vea los fuegos artificiales desde una lancha privada en Año Nuevo en Río! La mejor vista de Copacabana.',
    keywords: 'año nuevo lancha rio, reveillon barco rio de janeiro, fuegos artificiales lancha copacabana',
    waMessage: '¡Hola! Quiero información sobre Año Nuevo en lancha para ver los fuegos artificiales. [via site - es]',
    css: 'ocasioes',
    contentBlocks: [
      // Schema Event description (JSON-LD not protected)
      ['Celebre a virada do ano no mar! Assista à queima de fogos de Copacabana de um ângulo exclusivo, a bordo de uma lancha privativa. Pacote completo com open bar, ceia e aproximadamente 5 horas no mar.', '¡Celebre el cambio de año en el mar! Vea los fuegos artificiales de Copacabana desde un ángulo exclusivo, a bordo de una lancha privada. Paquete completo con open bar, cena y aproximadamente 5 horas en el mar.'],
      // Schema FAQ answers (JSON-LD plain text - shorter than visible FAQ versions)
      ['O réveillon na lancha inclui 5 horas de navegação (das 21h às 2h), posicionamento privilegiado para ver a queima de fogos de Copacabana. Open bar, ceia e decoração são serviços adicionais disponíveis. É uma experiência exclusiva para grupos de até 22 pessoas.', 'El Año Nuevo en la lancha incluye 5 horas de navegación (de las 21h a las 2h), posicionamiento privilegiado para ver los fuegos artificiales de Copacabana. Open bar, cena y decoración son servicios adicionales disponibles. Es una experiencia exclusiva para grupos de hasta 22 personas.'],
      ['Navegamos até a orla de Copacabana e posicionamos a lancha em local estratégico para vista privilegiada da queima de fogos. Você verá os fogos explodindo a poucos metros, uma experiência incomparável.', 'Navegamos hasta la costa de Copacabana y posicionamos la lancha en un lugar estratégico para una vista privilegiada de los fuegos artificiales. Verás los fuegos explotando a pocos metros, una experiencia incomparable.'],
      ['Sim! O réveillon na lancha é muito procurado e as vagas costumam esgotar com meses de antecedência. Recomendamos reservar o quanto antes para garantir sua lancha.', '¡Sí! El Año Nuevo en la lancha es muy solicitado y los cupos suelen agotarse con meses de anticipación. Recomendamos reservar lo antes posible para asegurar su lancha.'],
      // Alt text (NOT protected by translateContent)
      ['Nossa maior lancha para 20-22 pessoas', 'Nuestra mayor lancha para 20-22 personas'],
      ['Queima de fogos do réveillon vista do mar no Rio de Janeiro', 'Fuegos artificiales de Año Nuevo vistos desde el mar en Río de Janeiro'],
      ['Brinde com taças de champanhe e luzes coloridas na festa de réveillon na lancha', 'Brindis con copas de champán y luces coloridas en la fiesta de Año Nuevo en la lancha'],
      ['Convidada celebrando o réveillon na lancha com luzes da cidade ao fundo', 'Invitada celebrando el Año Nuevo en la lancha con luces de la ciudad al fondo'],
      ['Mesa decorada com pratos, flores e taças para ceia de réveillon na lancha', 'Mesa decorada con platos, flores y copas para cena de Año Nuevo en la lancha'],
      ['Bar Oceano a bordo com bartenders preparando drinks durante passeio de lancha', 'Bar Oceano a bordo con bartenders preparando drinks durante paseo en lancha'],
      ['Catamarã Oceano - Catamarã para 50-65 pessoas', 'Catamarán Oceano - Catamarán para 50-65 personas'],
      // Longer strings first (must precede 'Réveillon na Lancha' to avoid substring corruption)
      ['Por Que Réveillon na Lancha?', '¿Por Qué Año Nuevo en Lancha?'],
      ['Dúvidas sobre Réveillon na Lancha', 'Preguntas sobre Año Nuevo en Lancha'],
      ['Réveillon 2026/2027 - Reserve com Antecedência!', '¡Año Nuevo 2026/2027 - Reserve con Anticipación!'],
      ['Lanchas Réveillon 2026/2027', 'Lanchas Año Nuevo 2026/2027'],
      ['Personalize seu réveillon com serviços exclusivos', 'Personalice su Año Nuevo con servicios exclusivos'],
      ['Réveillons Anteriores', 'Años Nuevos Anteriores'],
      ['Réveillons Inesquecíveis', 'Años Nuevos Inolvidables'],
      ['Ceia de Réveillon', 'Cena de Año Nuevo'],
      // Hero
      ['Vagas Limitadas', 'Cupos Limitados'],
      ['Réveillon na Lancha', 'Año Nuevo en Lancha'],
      ['A virada de ano mais incrível da sua vida! Assista à queima de fogos de Copacabana\n          de um ângulo exclusivo, a bordo de uma lancha privativa no mar do Rio.', '¡La mejor Nochevieja de tu vida! Mira los fuegos artificiales de Copacabana\n          desde un ángulo exclusivo, a bordo de una lancha privada en el mar de Río.'],
      ['Garantir Minha Vaga', 'Asegurar Mi Cupo'],
      ['Ver Pacotes', 'Ver Paquetes'],
      // Countdown
      ['Lanchas disponíveis', 'Lanchas disponibles'],
      ['De festa no mar', 'De fiesta en el mar'],
      ['Vista dos fogos', 'Vista de los fuegos'],
      ['Inesquecível', 'Inolvidable'],
      // Benefits
      ['A experiência', 'La experiencia'],
      ['Uma experiência única que você vai lembrar para sempre', 'Una experiencia única que recordarás para siempre'],
      ['Vista Exclusiva', 'Vista Exclusiva'],
      ['Fogos de Copacabana vistos do mar, sem multidão, com vista 360°', 'Fuegos de Copacabana vistos desde el mar, sin multitud, con vista 360°'],
      ['Open Bar Completo', 'Open Bar Completo'],
      ['Espumante, drinks, cerveja, caipirinha e tudo para brindar o ano novo', 'Espumante, drinks, cerveza, caipirinha y todo para brindar por el año nuevo'],
      ['Ceia completa com pratos típicos para celebrar a virada em grande estilo', 'Cena completa con platos típicos para celebrar el cambio de año con gran estilo'],
      ['Privacidade Total', 'Privacidad Total'],
      ['Apenas você e seus convidados, sem estranhos, sem filas, sem empurra-empurra', 'Solo tú y tus invitados, sin extraños, sin filas, sin empujones'],
      // Timeline
      ['Roteiro da noite', 'Itinerario de la noche'],
      ['Como Funciona', 'Cómo Funciona'],
      ['Embarque', 'Embarque'],
      ['Check-in na Marina da Glória com recepção', 'Check-in en la Marina da Glória con recepción'],
      ['Mureta da Urca', 'Mureta da Urca'],
      ['Parada na tradicional Mureta para curtir o clima carioca', 'Parada en la tradicional Mureta para disfrutar el ambiente carioca'],
      ['Copacabana', 'Copacabana'],
      ['Posicionamento em frente à orla para a virada', 'Posicionamiento frente a la costa para la cuenta regresiva'],
      ['Retorno', 'Regreso'],
      ['Voltamos à Marina após celebração inesquecível', 'Regresamos a la Marina después de una celebración inolvidable'],
      // Gallery
      ['Galeria', 'Galería'],
      // Boats
      ['Escolha Sua Lancha', 'Elija Su Lancha'],
      ['Todas incluem combustível, marinheiro e equipamentos de segurança. Open bar e ceia disponíveis.', 'Todas incluyen combustible, marinero y equipos de seguridad. Open bar y cena disponibles.'],
      ['Consulte', 'Consultar'],
      ['valores réveillon', 'precios Año Nuevo'],
      ['Solicitar Orçamento', 'Solicitar Presupuesto'],
      // Extras section (match PT source exactly)
      ['Contrate os serviços extras para uma experiência completa', 'Contrate los servicios extras para una experiencia completa'],
      ['Cerveja, caipirinha, drinks, refrigerante, água e espumante para o brinde. A partir de R$ 135/pessoa', 'Cerveza, caipirinha, drinks, refresco, agua y espumante para el brindis. Desde R$ 135/persona'],
      ['Pratos típicos da ceia: lentilha, tender, arroz, farofa, saladas e sobremesa', 'Platos típicos de la cena: lentejas, jamón, arroz, farofa, ensaladas y postre'],
      ['Decoração de réveillon com balões, luzes e itens para celebração', 'Decoración de Año Nuevo con globos, luces y artículos para celebración'],
      ['Marinheiro e equipe de apoio para cuidar de tudo durante a festa', 'Marinero y equipo de apoyo para encargarse de todo durante la fiesta'],
      ['Serviços Extras', 'Servicios Extras'],
      ['Complete sua Virada', 'Complete Su Celebración'],
      ['Open Bar', 'Open Bar'],
      ['Espumante, drinks, cerveja e muito mais para brindar', 'Espumante, drinks, cerveza y mucho más para brindar'],
      ['Ceia', 'Cena'],
      ['Ceia completa com pratos típicos de ano novo', 'Cena completa con platos típicos de Año Nuevo'],
      ['Decoração Temática', 'Decoración Temática'],
      ['Decoração especial de réveillon com detalhes em dourado', 'Decoración especial de Año Nuevo con detalles en dorado'],
      ['Tripulação Experiente', 'Tripulación Experimentada'],
      ['Marinheiros experientes em navegação noturna e réveillon', 'Marineros experimentados en navegación nocturna y Año Nuevo'],
      // Reviews
      ['Veja os relatos de quem assistiu à queima de fogos do mar com a WeBoat.', 'Mira los testimonios de quienes vieron los fuegos artificiales desde el mar con WeBoat.'],
      ['Viradas Memoráveis', 'Celebraciones Memorables'],
      ['Selecionamos as melhores opções para sua virada de ano no mar', 'Seleccionamos las mejores opciones para su Año Nuevo en el mar'],
      // FAQ — visible text (must match PT source EXACTLY)
      ['Perguntas Frequentes', 'Preguntas Frecuentes'],
      ['Como é o réveillon na lancha?', '¿Cómo es el Año Nuevo en la lancha?'],
      ['O réveillon na lancha inclui aproximadamente 5 horas no mar (das 21h às 2h), posicionamento privilegiado em frente a Copacabana para ver a queima de fogos, open bar completo com espumante para o brinde e ceia de réveillon. É uma experiência exclusiva e privativa para seu grupo.', 'El Año Nuevo en lancha incluye aproximadamente 5 horas en el mar (de las 21h a las 2h), posicionamiento privilegiado frente a Copacabana para ver los fuegos artificiales, open bar completo con espumante para el brindis y cena de Año Nuevo. Es una experiencia exclusiva y privada para su grupo.'],
      ['De onde a lancha assiste aos fogos?', '¿Desde dónde la lancha ve los fuegos artificiales?'],
      ['Navegamos até a orla de Copacabana e posicionamos a lancha em local estratégico para vista privilegiada da queima de fogos. Você verá os fogos explodindo a poucos metros, uma perspectiva incomparável que só quem está no mar consegue ter.', 'Navegamos hasta la costa de Copacabana y posicionamos la lancha en un lugar estratégico para una vista privilegiada de los fuegos artificiales. Verás los fuegos explotando a pocos metros, una perspectiva incomparable que solo quienes están en el mar pueden tener.'],
      ['As vagas esgotam rápido?', '¿Los cupos se agotan rápido?'],
      ['Sim! O réveillon na lancha é muito procurado e as vagas costumam esgotar com meses de antecedência. Temos mais de 20 lanchas disponíveis para a data, mas recomendamos reservar o quanto antes para garantir sua lancha preferida.', '¡Sí! El Año Nuevo en lancha es muy solicitado y los cupos suelen agotarse con meses de anticipación. Tenemos más de 20 lanchas disponibles para la fecha, pero recomendamos reservar lo antes posible para asegurar su lancha preferida.'],
      ['Como funciona a reserva e pagamento?', '¿Cómo funciona la reserva y el pago?'],
      ['Para garantir sua reserva, solicitamos um sinal de 50% via PIX ou transferência. O restante pode ser pago até 15 dias antes do evento. Parcelamento no cartão disponível. Entre em contato pelo WhatsApp para mais detalhes.', 'Para asegurar su reserva, solicitamos una seña del 50% vía PIX o transferencia. El resto puede pagarse hasta 15 días antes del evento. Pago en cuotas con tarjeta disponible. Contáctenos por WhatsApp para más detalles.'],
      ['E se chover no réveillon?', '¿Y si llueve en Año Nuevo?'],
      ['O réveillon acontece mesmo com chuva leve, pois nossas lanchas têm cobertura. Em caso de condições climáticas severas que impeçam a navegação segura (muito raras nessa época), oferecemos remarcação para passeio em outra data ou reembolso parcial, conforme nosso termo de contratação.', 'El Año Nuevo se realiza incluso con lluvia leve, ya que nuestras lanchas tienen cobertura. En caso de condiciones climáticas severas que impidan la navegación segura (muy raras en esta época), ofrecemos reprogramación para paseo en otra fecha o reembolso parcial, conforme nuestros términos de contratación.'],
      // Partner boats section
      ['Grupos maiores? Temos opções de 30 a 65 pessoas!', '¡Grupos más grandes? ¡Tenemos opciones de 30 a 65 personas!'],
      ['30-40 pessoas', '30-40 personas'],
      ['Ideal para eventos', 'Ideal para eventos'],
      ['Gerador incluso', 'Generador incluido'],
      ['Ver Detalhes', 'Ver Detalles'],
      ['40-65 pessoas', '40-65 personas'],
      ['Catamarã espaçoso', 'Catamarán espacioso'],
      ['Pista de dança', 'Pista de baile'],
      ['Complete Sua Virada', 'Complete Su Año Nuevo'],
      ['Quem Passou o Réveillon Conosco', 'Quienes Pasaron el Año Nuevo con Nosotros'],
      // Recommended
      ['Lanchas Recomendadas para Réveillon', 'Lanchas Recomendadas para Año Nuevo'],
      ['Lanchas Recomendadas', 'Lanchas Recomendadas'],
      ['Para o Réveillon', 'Para Año Nuevo'],
      ['Selecionamos as melhores opções para sua virada no mar', 'Seleccionamos las mejores opciones para su Año Nuevo en el mar'],
      // CTA
      ['Garanta Sua Vaga no Réveillon', 'Asegure Su Cupo en Año Nuevo'],
      ['Reserve com antecedência — as vagas são limitadas!', '¡Reserve con anticipación — los cupos son limitados!'],
      ['Falar com Especialista', 'Hablar con un Especialista'],
    ],
  },
  {
    ptPath: 'carnaval/index.html',
    esPath: 'es/carnaval/index.html',
    title: 'Carnaval en Lancha en Río de Janeiro | WeBoat Brasil',
    description: '¡Celebra el Carnaval en una lancha privada en Río de Janeiro! DJ, open bar, confeti. ¡Tu propia fiesta flotante!',
    keywords: 'carnaval lancha rio, fiesta carnaval barco, carnaval flotante rio de janeiro',
    waMessage: '¡Hola! Quiero información sobre el Carnaval en lancha en Río de Janeiro. [via site - es]',
    css: 'ocasioes',
    contentBlocks: [
      // ── LONG VISIBLE FAQ ANSWERS FIRST (must come before shorter Schema FAQ versions) ──
      // Visible FAQ: "Quantas pessoas" (full text with Consulte-nos — MUST come before Schema FAQ short version)
      ['A WeBoat oferece lanchas de 10 a 65 pessoas para o Carnaval. Lanchas próprias comportam de 12 a 22 pessoas. Para grupos maiores, temos catamarãs e embarcações parceiras para até 65 pessoas. Consulte-nos pelo WhatsApp para encontrar a melhor opção para seu grupo.', 'WeBoat ofrece lanchas de 10 a 65 personas para el Carnaval. Las lanchas propias tienen capacidad de 12 a 22 personas. Para grupos más grandes, tenemos catamaranes y embarcaciones asociadas para hasta 65 personas. Consúltenos por WhatsApp para encontrar la mejor opción para su grupo.'],
      // Schema FAQ answers (JSON-LD plain text - shorter versions, must come AFTER visible FAQ versions)
      ['O Carnaval na lancha é um passeio privativo de aproximadamente 5 horas com saída da Marina da Glória. Você navega pela Baía de Guanabara e orla do Rio com DJ, open bar e decoração temática. É a forma perfeita de curtir o Carnaval longe da multidão, com privacidade e conforto.', 'El Carnaval en la lancha es un paseo privado de aproximadamente 5 horas con salida de la Marina da Glória. Navegas por la Bahía de Guanabara y la costa de Río con DJ, open bar y decoración temática. Es la forma perfecta de disfrutar el Carnaval lejos de la multitud, con privacidad y confort.'],
      ['A WeBoat oferece lanchas de 10 a 65 pessoas para o Carnaval. Lanchas próprias comportam de 12 a 22 pessoas. Para grupos maiores, temos catamarãs e embarcações parceiras para até 65 pessoas.', 'WeBoat ofrece lanchas de 10 a 65 personas para el Carnaval. Las lanchas propias tienen capacidad de 12 a 22 personas. Para grupos más grandes, tenemos catamaranes y embarcaciones asociadas para hasta 65 personas.'],
      ['Com certeza! Fantasias, adereços, confete e serpentina são bem-vindos. Recomendamos cuidado com itens que possam cair no mar. A decoração temática de Carnaval pode ser contratada como serviço extra.', '¡Por supuesto! Disfraces, accesorios, confeti y serpentinas son bienvenidos. Recomendamos cuidado con artículos que puedan caer al mar. La decoración temática de Carnaval puede contratarse como servicio extra.'],
      // Alt text (NOT protected by translateContent)
      ['Nossa maior lancha para 20-22 pessoas', 'Nuestra mayor lancha para 20-22 personas'],
      ['Grupo de amigas com camisas do Brasil curtindo Carnaval na lancha com Pão de Açúcar ao fundo', 'Grupo de amigas con camisas de Brasil disfrutando Carnaval en la lancha con el Pan de Azúcar al fondo'],
      ['Três amigas tomando sol na proa da lancha durante Carnaval no Rio', 'Tres amigas tomando sol en la proa de la lancha durante Carnaval en Río'],
      ['Duas amigas brindando com cerveja na lancha com Pão de Açúcar ao fundo', 'Dos amigas brindando con cerveza en la lancha con el Pan de Azúcar al fondo'],
      ['Amigas pulando da lancha no mar durante o Carnaval no Rio', 'Amigas saltando de la lancha al mar durante el Carnaval en Río'],
      ['Grupo de amigas se divertindo na água com tapete flutuante durante passeio de Carnaval', 'Grupo de amigas divirtiéndose en el agua con alfombra flotante durante paseo de Carnaval'],
      ['Grande grupo curtindo Carnaval na lancha com vista panorâmica do Rio', 'Gran grupo disfrutando Carnaval en la lancha con vista panorámica de Río'],
      ['DJ profissional com headphones e controladora na lancha', 'DJ profesional con auriculares y controladora en la lancha'],
      ['Catamarã Oceano - Catamarã para 50-65 pessoas', 'Catamarán Oceano - Catamarán para 50-65 personas'],
      // Longer strings first (must precede 'Carnaval na Lancha' to avoid substring corruption)
      ['Por Que Carnaval na Lancha?', '¿Por Qué Carnaval en Lancha?'],
      ['Dúvidas sobre Carnaval na Lancha', 'Preguntas sobre Carnaval en Lancha'],
      ['Carnaval 2026 — 14 a 17 de Fevereiro', 'Carnaval 2026 — 14 al 17 de Febrero'],
      ['Lanchas Carnaval 2026', 'Lanchas Carnaval 2026'],
      ['Personalize seu Carnaval com serviços profissionais', 'Personaliza tu Carnaval con servicios profesionales'],
      ['Carnaval no Mar', 'Carnaval en el Mar'],
      // Hero
      ['Carnaval 2026', 'Carnaval 2026'],
      ['Carnaval na Lancha', 'Carnaval en Lancha'],
      ['Fuja da multidão e curta o melhor Carnaval da sua vida no mar!\n          Festa privativa com DJ, open bar e decoração temática na Baía de Guanabara.', '¡Escapa de la multitud y disfruta el mejor Carnaval de tu vida en el mar!\n          Fiesta privada con DJ, open bar y decoración temática en la Bahía de Guanabara.'],
      ['Reservar Minha Lancha', 'Reservar Mi Lancha'],
      ['Ver Pacotes', 'Ver Paquetes'],
      // Countdown
      ['Lanchas disponíveis', 'Lanchas disponibles'],
      ['De festa no mar', 'De fiesta en el mar'],
      ['Dias de folia', 'Días de fiesta'],
      ['Pessoas (até)', 'Personas (hasta)'],
      // Benefits
      ['A experiência', 'La experiencia'],
      ['O Carnaval mais exclusivo do Rio de Janeiro acontece no mar', 'El Carnaval más exclusivo de Río de Janeiro sucede en el mar'],
      ['Seu Bloco Privativo', 'Tu Bloco Privado'],
      ['Crie seu próprio bloco no mar — sem empurra-empurra, sem filas, só diversão', 'Crea tu propio bloco en el mar — sin empujones, sin filas, solo diversión'],
      ['DJ a Bordo', 'DJ a Bordo'],
      ['Som profissional com DJ tocando os hits do Carnaval e os clássicos de sempre', 'Sonido profesional con DJ tocando los hits de Carnaval y los clásicos de siempre'],
      ['Open Bar Completo', 'Open Bar Completo'],
      ['Caipirinha, cerveja, drinks e tudo que você precisa para brindar o Carnaval', 'Caipirinha, cerveza, drinks y todo lo que necesitas para brindar por el Carnaval'],
      ['Vista Incrível', 'Vista Increíble'],
      ['Curta o Carnaval com a orla do Rio como cenário — Pão de Açúcar, Cristo, praias', 'Disfruta el Carnaval con la costa de Río como escenario — Pan de Azúcar, Cristo, playas'],
      // How it works
      ['Roteiro da festa', 'Itinerario de la fiesta'],
      ['Como Funciona', 'Cómo Funciona'],
      ['Embarque', 'Embarque'],
      ['Check-in na Marina da Glória já no clima de Carnaval', 'Check-in en la Marina da Glória ya con el clima de Carnaval'],
      ['Mureta da Urca', 'Mureta da Urca'],
      ['Parada na tradicional Mureta para mergulho e drinks', 'Parada en la tradicional Mureta para nadar y tomar drinks'],
      ['Orla do Rio', 'Costa de Río'],
      ['Navegação pela orla com som, dança e muita animação', 'Navegación por la costa con música, baile y mucha animación'],
      ['Retorno', 'Regreso'],
      ['Voltamos à Marina após 5 horas de folia no mar', 'Regresamos a la Marina después de 5 horas de fiesta en el mar'],
      // Gallery
      ['Galeria', 'Galería'],
      // Boats
      ['Escolha Sua Lancha', 'Elige Tu Lancha'],
      ['Todas incluem combustível, marinheiro e equipamentos de segurança. DJ, open bar e decoração disponíveis.', 'Todas incluyen combustible, marinero y equipos de seguridad. DJ, open bar y decoración disponibles.'],
      ['A partir de R$ 2.300', 'Desde R$ 2.300'],
      ['A partir de R$ 2.600', 'Desde R$ 2.600'],
      ['5h de passeio', '5h de paseo'],
      ['Solicitar Orçamento', 'Solicitar Presupuesto'],
      // Extras section (match PT source exactly)
      ['Personalize sua festa de Carnaval com nossos serviços extras', 'Personaliza tu fiesta de Carnaval con nuestros servicios extras'],
      ['DJ profissional com caixas de som de alta potência. Repertório personalizado com marchinhas, axé, funk e hits. A partir de R$ 1.500', 'DJ profesional con parlantes de alta potencia. Repertorio personalizado con marchinhas, axé, funk y hits. Desde R$ 1.500'],
      ['Cerveja, caipirinha, drinks, refrigerante e água. Pacotes a partir de R$ 135/pessoa', 'Cerveza, caipirinha, drinks, refresco y agua. Paquetes desde R$ 135/persona'],
      ['Confete, serpentina, balões coloridos, máscaras e adereços temáticos para toda a turma', 'Confeti, serpentinas, globos coloridos, máscaras y accesorios temáticos para todo el grupo'],
      ['Churrasco completo com picanha, linguiça e acompanhamentos. Kits a partir de R$ 100/pessoa', 'Asado completo con picaña, longaniza y acompañamientos. Kits desde R$ 100/persona'],
      ['Serviços Extras', 'Servicios Extras'],
      ['Monte sua Folia', 'Arma Tu Fiesta'],
      ['DJ com Equipamento', 'DJ con Equipamiento'],
      ['DJ profissional com caixas de som de alta potência', 'DJ profesional con parlantes de alta potencia'],
      ['Open Bar', 'Open Bar'],
      ['Caipirinha, cerveja, drinks e tudo para a folia', 'Caipirinha, cerveza, drinks y todo para la fiesta'],
      ['Decoração de Carnaval', 'Decoración de Carnaval'],
      ['Confete, serpentina, adereços e decoração temática', 'Confeti, serpentinas, accesorios y decoración temática'],
      ['Churrasco a Bordo', 'Asado a Bordo'],
      ['Churrasco completo para manter a energia da festa', 'Asado completo para mantener la energía de la fiesta'],
      // Reviews
      ['Quem já curtiu', 'Quienes ya disfrutaron'],
      ['Veja os relatos de quem já curtiu festas a bordo com a WeBoat.', 'Mira los testimonios de quienes ya disfrutaron de fiestas a bordo con WeBoat.'],
      ['Festas Inesquecíveis no Mar', 'Fiestas Inolvidables en el Mar'],
      ['As lanchas para o Carnaval esgotam rápido! Reserve agora e monte seu bloco no mar.', '¡Las lanchas para el Carnaval se agotan rápido! Reserve ahora y arme su bloco en el mar.'],
      // FAQ — visible text (must match PT source EXACTLY)
      ['Perguntas Frequentes', 'Preguntas Frecuentes'],
      ['Como funciona o Carnaval na lancha?', '¿Cómo funciona el Carnaval en la lancha?'],
      ['O Carnaval na lancha é um passeio privativo de aproximadamente 5 horas com saída da Marina da Glória. Você navega pela Baía de Guanabara e orla do Rio com DJ, open bar e decoração temática. É a forma perfeita de curtir o Carnaval longe da multidão, com privacidade e conforto para seu grupo.', 'El Carnaval en la lancha es un paseo privado de aproximadamente 5 horas con salida desde la Marina da Glória. Navegas por la Bahía de Guanabara y la costa de Río con DJ, open bar y decoración temática. Es la forma perfecta de disfrutar el Carnaval lejos de la multitud, con privacidad y confort para tu grupo.'],
      ['Quantas pessoas cabem na lancha de Carnaval?', '¿Cuántas personas caben en la lancha de Carnaval?'],
      ['A WeBoat oferece lanchas de 10 a 65 pessoas para o Carnaval. Lanchas próprias comportam de 12 a 22 pessoas. Para grupos maiores, temos catamarãs e embarcações parceiras para até 65 pessoas. Consulte-nos pelo WhatsApp para encontrar a melhor opção para seu grupo.', 'WeBoat ofrece lanchas de 10 a 65 personas para el Carnaval. Las lanchas propias tienen capacidad de 12 a 22 personas. Para grupos más grandes, tenemos catamaranes y embarcaciones asociadas para hasta 65 personas. Consúltenos por WhatsApp para encontrar la mejor opción para su grupo.'],
      ['Posso levar fantasia e adereços?', '¿Puedo llevar disfraz y accesorios?'],
      ['Com certeza! Fantasias, adereços, confete e serpentina são mais que bem-vindos — é Carnaval! Recomendamos apenas cuidado com itens que possam cair no mar. Se preferir, contrate nosso kit de decoração de Carnaval que já inclui adereços para toda a turma.', '¡Por supuesto! Disfraces, accesorios, confeti y serpentinas son más que bienvenidos — ¡es Carnaval! Recomendamos solo cuidado con artículos que puedan caer al mar. Si lo prefieres, contrata nuestro kit de decoración de Carnaval que ya incluye accesorios para todo el grupo.'],
      ['Posso reservar para mais de um dia de Carnaval?', '¿Puedo reservar para más de un día de Carnaval?'],
      ['Sim! Muitos clientes reservam para mais de um dia do Carnaval. Oferecemos condições especiais para pacotes de múltiplos dias. Entre em contato pelo WhatsApp para montar seu pacote personalizado de Carnaval.', '¡Sí! Muchos clientes reservan para más de un día del Carnaval. Ofrecemos condiciones especiales para paquetes de múltiples días. Contáctenos por WhatsApp para armar su paquete personalizado de Carnaval.'],
      ['E se chover durante o Carnaval?', '¿Y si llueve durante el Carnaval?'],
      ['Nossas lanchas têm cobertura, então chuva leve não impede o passeio. Em caso de condições climáticas severas que impeçam a navegação segura, oferecemos remarcação para outra data do Carnaval (sujeito a disponibilidade) ou para data posterior, conforme nosso termo de contratação.', 'Nuestras lanchas tienen cobertura, por lo que la lluvia leve no impide el paseo. En caso de condiciones climáticas severas que impidan la navegación segura, ofrecemos reprogramación para otra fecha del Carnaval (sujeto a disponibilidad) o para fecha posterior, conforme nuestros términos de contratación.'],
      // Partner boats section
      ['Grupos maiores? Temos opções de 30 a 65 pessoas!', '¡Grupos más grandes? ¡Tenemos opciones de 30 a 65 personas!'],
      ['30-40 pessoas', '30-40 personas'],
      ['Ideal para eventos', 'Ideal para eventos'],
      ['Gerador incluso', 'Generador incluido'],
      ['Ver Detalhes', 'Ver Detalles'],
      ['40-65 pessoas', '40-65 personas'],
      ['Catamarã espaçoso', 'Catamarán espacioso'],
      ['Pista de dança', 'Pista de baile'],
      ['Monte Seu Bloco no Mar', 'Arma Tu Bloco en el Mar'],
      // Recommended
      ['Lanchas Recomendadas para Carnaval', 'Lanchas Recomendadas para Carnaval'],
      ['Lanchas Recomendadas', 'Lanchas Recomendadas'],
      ['Para o Carnaval', 'Para el Carnaval'],
      ['Selecionamos as melhores opções para sua folia no mar', 'Seleccionamos las mejores opciones para tu fiesta en el mar'],
      // CTA
      ['Garanta Sua Lancha no Carnaval', 'Asegura Tu Lancha en Carnaval'],
      ['Reserve com antecedência — as lanchas são disputadas no Carnaval!', '¡Reserva con anticipación — las lanchas son muy solicitadas en Carnaval!'],
      ['Falar com Especialista', 'Hablar con un Especialista'],
    ],
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
    contentBlocks: [
      // Schema.org Service descriptions (JSON-LD, not protected — must come BEFORE short fragments)
      ['Serviço completo de churrasco durante seu passeio de lancha no Rio de Janeiro. Kit Simples (R$ 100-150/pessoa) ou Kit com Acompanhamentos (R$ 145-160/pessoa).', 'Servicio completo de asado durante su paseo en lancha en Río de Janeiro. Kit Sencillo (R$ 100-150/persona) o Kit con Acompañamientos (R$ 145-160/persona).'],
      ['Serviço de open bar com barman profissional. Básico (R$ 135-150/pessoa) ou Premium (R$ 160-180/pessoa).', 'Servicio de open bar con barman profesional. Básico (R$ 135-150/persona) o Premium (R$ 160-180/persona).'],
      ['Decoração personalizada para aniversários e despedidas. Kit Despedida (R$ 135-150/pessoa) ou Kit Festa Premium (R$ 1.850-2.500).', 'Decoración personalizada para cumpleaños y despedidas. Kit Despedida (R$ 135-150/persona) o Kit Fiesta Premium (R$ 1.850-2.500).'],
      ['Pacote completo com churrasco e open bar. Básico (R$ 205-230/pessoa) ou Premium (R$ 220-250/pessoa).', 'Paquete All Inclusive con asado y open bar. All Inclusive Básico (R$ 205-230/persona) o All Inclusive Premium (R$ 220-250/persona).'],
      ['DJ profissional com equipamento completo para animar sua festa na lancha.', 'DJ profesional con equipo completo para animar su fiesta en la lancha.'],
      ['Fotógrafo profissional para registrar todos os momentos do seu passeio.', 'Fotógrafo profesional para capturar todos los momentos de su paseo.'],
      // Schema.org FAQ question (must match EXACT PT source with "ou" not "e")
      ['Posso levar minhas próprias bebidas ou comidas?', '¿Puedo llevar mis propias bebidas o comidas?'],
      // Visible decoration Kit Festa Premium description (must come BEFORE short "faixa personalizada" blocks)
      ['Decoração completa para aniversário ou evento especial: balões, faixa personalizada, mesa decorada, iluminação e velas.', 'Decoración completa para cumpleaños o evento especial: globos, banda personalizada, mesa decorada, iluminación y velas.'],
      // Schema.org FAQ answers (plain text versions - must come before short fragments)
      ['Recomendamos contratar os serviços com pelo menos 48h de antecedência para garantir disponibilidade e preparação adequada. Em casos urgentes, entre em contato pelo WhatsApp para verificar possibilidades.', 'Recomendamos contratar los servicios con al menos 48h de anticipación para garantizar disponibilidad y preparación adecuada. En casos urgentes, contáctenos por WhatsApp para verificar posibilidades.'],
      ['Sim! Quanto maior o grupo, melhor o preço por pessoa. As faixas de preço mostradas consideram grupos de diferentes tamanhos. Fale conosco para um orçamento personalizado.', '¡Sí! Cuanto mayor sea el grupo, mejor el precio por persona. Los rangos de precios mostrados consideran grupos de diferentes tamaños. Contáctenos para un presupuesto personalizado.'],
      ['Sim, você pode levar suas próprias bebidas e petiscos! Apenas não oferecemos o serviço de churrasco se você levar comida própria. Contamos com coolers à disposição.', '¡Sí, puede llevar sus propias bebidas y bocadillos! Solo no ofrecemos el servicio de asado si lleva comida propia. Contamos con coolers a su disposición.'],
      ['A taxa de churrasqueira (R$ 250) é cobrada apenas quando você contrata nosso serviço de churrasco completo. Ela cobre o equipamento, carvão e utensílios necessários.', 'La tarifa de parrilla (R$ 250) se cobra solo cuando contrata nuestro servicio de asado completo. Cubre el equipamiento, carbón y utensilios necesarios.'],
      // Alt text (NOT protected by translateContent)
      ['Buffet completo com churrasco e bar a bordo da lancha WeBoat', 'Buffet completo con asado y bar a bordo de la lancha WeBoat'],
      ['Churrasco sendo preparado na lancha com vista para o mar', 'Asado siendo preparado en la lancha con vista al mar'],
      ['Amigas brindando com drinks no open bar da lancha', 'Amigas brindando con drinks en el open bar de la lancha'],
      ['Mesa de queijos e vinhos na lancha', 'Mesa de quesos y vinos en la lancha'],
      ['Mesa de snacks premium na lancha com mini sanduíches, canapés e finger foods', 'Mesa de snacks premium en la lancha con mini sándwiches, canapés y finger foods'],
      ['Decoração de aniversário na lancha com balões verdes e letreiro Happy Birthday neon', 'Decoración de cumpleaños en la lancha con globos verdes y letrero Happy Birthday neon'],
      ['DJ profissional tocando na lancha com headphones e controladora', 'DJ profesional tocando en la lancha con auriculares y controladora'],
      ['Casal em silhueta ao pôr do sol com Cristo Redentor ao fundo na lancha', 'Pareja en silueta al atardecer con Cristo Redentor al fondo en la lancha'],
      // Combo option descriptions (visible text)
      ['Kit churrasco completo + open bar com cerveja, caipirinha, refrigerante e água. Preço varia conforme quantidade de pessoas.', 'Asado completo + open bar con cerveza, caipirinha, refresco y agua. El precio varía según la cantidad de personas.'],
      ['Kit churrasco completo + open bar premium com drinks especiais, espumante e frutas frescas.', 'Asado completo + open bar premium con drinks especiales, espumante y frutas frescas.'],
      // BBQ description (long string must come before shorter substrings)
      ['Nada combina mais com um dia no mar do que um churrasco! Nosso serviço inclui churrasqueiro profissional, carnes selecionadas, acompanhamentos e todo o equipamento necessário. Você só precisa relaxar e aproveitar.', '¡Nada combina más con un día en el mar que un asado! Nuestro servicio incluye asador profesional, carnes seleccionadas, acompañamientos y todo el equipamiento necesario. Solo necesita relajarse y disfrutar.'],
      ['Churrasco na Lancha', 'Asado en la Lancha'],
      ['Mais Pedido', 'Más Pedido'],
      // Hero subtitle (full text with "e inesquecível" ending - must come BEFORE shorter versions)
      ['Churrasco, open bar, decoração e mais. Transforme seu passeio em uma experiência completa e inesquecível.', 'Asado, open bar, decoración y más. Transforme su paseo en una experiencia completa e inolvidable.'],
      // Hero (PT source says "Serviços para seu Passeio" without "de Lancha")
      ['Serviços para seu Passeio', 'Servicios para su Paseo'],
      ['Serviços para seu Passeio de Lancha', 'Servicios para su Paseo en Lancha'],
      ['Churrasco, open bar, decoração e mais', 'Asado, open bar, decoración y más'],
      ['Transforme seu passeio em uma experiência completa com nossos serviços adicionais.', 'Transforme su paseo en una experiencia completa con nuestros servicios adicionales.'],
      ['Valores variam de acordo com a quantidade de pessoas e embarcação.', 'Los precios varían según la cantidad de personas y la embarcación.'],
      ['*Valores variam de acordo com a quantidade de pessoas e tamanho da lancha. Entre em contato para um orçamento personalizado.', '*Los precios varían según la cantidad de personas y tamaño de la lancha. Contáctenos para un presupuesto personalizado.'],
      // All Inclusive (renamed from Combos)
      ['Combos com Desconto', 'All Inclusive'],
      ['Combine churrasco e open bar e economize! Pacotes completos para você não se preocupar com nada.', 'La combinación perfecta: asado completo con open bar durante todo el paseo.'],
      ['Combine churrasco e open bar e economize!', 'La combinación perfecta: asado completo con open bar.'],
      ['Preço varia conforme quantidade de pessoas', 'El precio varía según la cantidad de personas'],
      ['Contratar Combo', 'Contratar All Inclusive'],
      ['Montar meu pacote com todos os serviços', 'Armar mi paquete con todos los servicios'],
      ['Montar meu pacote', 'Armar mi paquete'],
      // v5.0: H2s as questions (must come BEFORE shorter substrings like 'O que inclui')
      ['O que inclui o open bar?', '¿Qué incluye el open bar?'],
      // BBQ Kits
      ['Escolha seu Kit', 'Elija su tipo de asado'],
      ['Kit Simples', 'Kit Asado Simple'],
      ['Kit com Acompanhamentos', 'Asado con Acompañamientos'],
      ['O que inclui', 'Qué incluye'],
      ['Churrasqueiro profissional', 'Asador profesional'],
      ['Carnes selecionadas', 'Carnes seleccionadas'],
      ['Acompanhamentos', 'Acompañamientos'],
      ['Pratos e talheres', 'Platos y cubiertos'],
      ['Carvão e churrasqueira', 'Carbón y parrilla'],
      ['Taxa de churrasqueira inclusa', 'Tarifa de parrilla incluida'],
      ['Contratar Churrasco', 'Contratar Asado'],
      // Open Bar (long body text first)
      ['Drinks autorais, caipirinhas, cervejas geladas e muito mais! Nosso barman profissional prepara tudo a bordo para que você e seus convidados só se preocupem em brindar.', '¡Drinks de autor, caipirinhas, cervezas heladas y mucho más! Nuestro barman profesional prepara todo a bordo para que usted y sus invitados solo se preocupen por brindar.'],
      ['Música ao vivo com DJ profissional e equipamento completo para animar sua festa.', 'Música en vivo con DJ profesional y equipo completo para animar su fiesta.'],
      ['Faça o pagamento do sinal e confirme sua reserva.', 'Realice el pago de la seña y confirme su reserva.'],
      ['No dia do passeio, tudo estará pronto para você curtir.', 'El día del paseo, todo estará listo para que disfrute.'],
      ['Selecione serviços para ver o resumo aqui.', 'Seleccione servicios para ver el resumen aquí.'],
      ['Festa Completa', 'Fiesta Completa'],
      ['Open Bar na Lancha', 'Open Bar en la Lancha'],
      ['Open Bar Básico', 'Open Bar Básico'],
      ['Open Bar Premium', 'Open Bar Premium'],
      ['Barman profissional', 'Barman profesional'],
      ['Bebidas selecionadas', 'Bebidas seleccionadas'],
      ['Gelo e copos', 'Hielo y vasos'],
      ['Frutas para decoração', 'Frutas para decoración'],
      ['Montagem e desmontagem', 'Montaje y desmontaje'],
      ['Contratar Open Bar', 'Contratar Open Bar'],
      // Special Tables
      ['Mesas Especiais', 'Mesas Especiales'],
      ['Complementar o passeio', 'Complementar el paseo'],
      ['Seleção de queijos finos, embutidos, pães artesanais, geleias e mel', 'Selección de quesos finos, embutidos, panes artesanales, mermeladas y miel'],
      ['Finger foods, canapés, mini sanduíches e petiscos gourmet', 'Finger foods, canapés, mini sándwiches y bocadillos gourmet'],
      ['Queijos & Vinhos', 'Quesos & Vinos'],
      ['Snacks Premium', 'Snacks Premium'],
      ['Contratar Mesa Especial', 'Contratar Mesa Especial'],
      // Decoration
      ['Personalizado', 'Personalizable'],
      ['Decoração para Festas', 'Decoración para Fiestas'],
      ['Transforme a lancha no cenário perfeito para sua comemoração!', '¡Transforme la lancha en el escenario perfecto para su celebración!'],
      ['cumpleaños, despedidas de solteira, pedidos de casamento', 'cumpleaños, despedidas de soltera, propuestas de matrimonio'],
      ['aniversários, despedidas de solteira, pedidos de casamento', 'cumpleaños, despedidas de soltera, propuestas de matrimonio'],
      ['Kit Despedida', 'Kit Despedida'],
      ['Kit Festa Premium', 'Kit Fiesta Premium'],
      ['Faixa de noiva, balões temáticos', 'Banda de novia, globos temáticos'],
      ['Contratar Decoração', 'Contratar Decoración'],
      // Other Services
      ['Outros Serviços', 'Otros Servicios'],
      ['DJ profissional com equipamento completo', 'DJ profesional con equipo completo'],
      ['Música ao vivo', 'Música en vivo'],
      ['Fotógrafo Profissional', 'Fotógrafo Profesional'],
      ['Registre cada momento com fotos profissionais a bordo', 'Capture cada momento con fotos profesionales a bordo'],
      // How to Book
      ['Como Contratar', 'Cómo Contratar'],
      ['Escolha os Serviços', 'Elija los Servicios'],
      ['Selecione os serviços que deseja para seu passeio', 'Seleccione los servicios que desea para su paseo'],
      ['Entre em Contato', 'Contáctenos'],
      ['Contate-nos pelo WhatsApp e informe os serviços escolhidos', 'Contáctenos por WhatsApp e informe los servicios elegidos'],
      ['Confirme a Reserva', 'Confirme la Reserva'],
      ['Faça o pagamento do sinal e garanta seus serviços', 'Realice el pago de la seña y asegure sus servicios'],
      ['Aproveite!', '¡Disfrute!'],
      ['No dia do passeio, tudo estará pronto para você aproveitar', 'El día del paseo, todo estará listo para que usted disfrute'],
      // Configurator
      ['Selecione os serviços desejados e veja o orçamento estimado em tempo real.', 'Seleccione los servicios deseados y vea el presupuesto estimado en tiempo real.'],
      ['Selecione os serviços desejados', 'Seleccione los servicios deseados'],
      ['Resumo do Pacote', 'Resumen del Paquete'],
      ['Selecione serviços ao lado para ver o resumo', 'Seleccione servicios para ver el resumen'],
      ['Total estimado', 'Total estimado'],
      ['Enviar via WhatsApp', 'Enviar por WhatsApp'],
      // FAQ
      ['Perguntas sobre Serviços', 'Preguntas sobre Servicios'],
      ['Respostas rápidas para as perguntas mais comuns sobre nossos serviços.', 'Respuestas rápidas a las preguntas más frecuentes sobre nuestros servicios.'],
      ['Posso contratar serviços no dia do passeio?', '¿Puedo contratar servicios el día del paseo?'],
      ['Os preços variam conforme a quantidade de pessoas?', '¿Los precios varían según la cantidad de personas?'],
      ['Posso levar minhas próprias bebidas ou comidas?', '¿Puedo llevar mis propias bebidas o comidas?'],
      ['Como funciona a taxa de churrasqueira?', '¿Cómo funciona la tarifa de la parrilla?'],
      // Freshness
      ['Última atualização: Fevereiro 2026', 'Última actualización: Febrero 2026'],
    ],
  },
  {
    ptPath: 'sobre/index.html',
    esPath: 'es/sobre-nosotros/index.html',
    title: 'Sobre WeBoat Brasil | Alquiler de Lanchas en Río de Janeiro',
    description: 'Conozca WeBoat Brasil, empresa líder en alquiler de lanchas en Río de Janeiro. +2.500 paseos, 5 lanchas propias, Marina da Glória.',
    keywords: 'sobre weboat, empresa alquiler lanchas rio, marina da gloria lanchas',
    waMessage: '¡Hola! Me gustaría saber más sobre WeBoat Brasil. [via site - es]',
    css: 'sobre',
      contentBlocks: [
      // ── LONG BLOCKS FIRST (must run before short fragments) ──
      // Schema.org AboutPage description (JSON-LD, not protected — FULL text)
      ['A WeBoat Brasil é uma empresa de aluguel de lanchas no Rio de Janeiro, com sede na Marina da Glória. Oferece passeios privativos para festas, despedidas de solteira, aniversários e eventos corporativos. Fundada em 2021, realizou mais de 2.500 passeios.', 'WeBoat Brasil es una empresa de alquiler de lanchas en Río de Janeiro, con sede en la Marina da Glória. Ofrece paseos privados para fiestas, despedidas de soltera, cumpleaños y eventos corporativos. Fundada en 2021, ha realizado más de 2.500 paseos.'],
      // Visible answer-capsule paragraph (line 728 of PT source)
      ['A WeBoat Brasil é uma empresa de aluguel de lanchas no Rio de Janeiro, com sede na Marina da Glória. Fundada em 2021, opera 5 lanchas próprias e trabalha com parceiros para atender grupos de 10 a 65 pessoas. Já realizou mais de 2.500 passeios e acumula mais de 1000 avaliações 5 estrelas no Google.', 'WeBoat Brasil es una empresa de alquiler de lanchas en Río de Janeiro, con sede en la Marina da Glória. Fundada en 2021, opera 5 lanchas propias y trabaja con socios para atender grupos de 10 a 65 personas. Ha realizado más de 2.500 paseos y acumula más de 1.000 reseñas de 5 estrellas en Google.'],
      // Vision card (MVV section)
      ['Ser a maior empresa de aluguel de lanchas do Brasil, mesmo atuando somente no Rio de Janeiro. Quando alguém pensar em lancha no Rio, pensar WeBoat.', 'Ser la mayor empresa de alquiler de lanchas de Brasil, aun operando solo en Río de Janeiro. Cuando alguien piense en lancha en Río, piense WeBoat.'],
      // Full quoted slogan block (MUST come before the short slogan block to avoid substring corruption)
      ["\"Dia inesquecível e sorriso no rosto de todos os nossos clientes\" - essa é a nossa missão e buscamos entregar isso para todos que escolhem nossos serviços. Toda nossa equipe compartilha desse mesmo objetivo.", "\"Un día inolvidable y una sonrisa en el rostro de todos nuestros clientes\" — esa es nuestra misión y buscamos cumplirla para todos los que eligen nuestros servicios. Todo nuestro equipo comparte ese mismo objetivo."],
      // Schema.org slogan (plain text in JSON-LD)
      ['Dia inesquecível e sorriso no rosto de todos os nossos clientes', 'Un día inolvidable y una sonrisa en el rostro de todos nuestros clientes'],
      // Schema.org knowsAbout items
      ['aluguel de lanchas', 'alquiler de lanchas'],
      ['passeios de barco', 'paseos en barco'],
      ['eventos náuticos', 'eventos náuticos'],
      ['turismo náutico Rio de Janeiro', 'turismo náutico Río de Janeiro'],
      ['festa na lancha', 'fiesta en lancha'],
      ['despedida de solteira no mar', 'despedida de soltera en el mar'],
      ['aniversário em lancha', 'cumpleaños en lancha'],
      ['evento corporativo náutico', 'evento corporativo náutico'],
      ['roteiros na Baía de Guanabara', 'rutas en la Bahía de Guanabara'],
      [
            "Sobre a WeBoat Brasil",
            "Sobre WeBoat Brasil"
      ],
      [
            "Empresa de aluguel de lanchas no Rio de Janeiro desde 2021.",
            "Empresa de alquiler de lanchas en Río de Janeiro desde 2021."
      ],
      [
            "<strong>A WeBoat Brasil é uma empresa de aluguel de lanchas no Rio de Janeiro, com sede na Marina da Glória.</strong>",
            "<strong>WeBoat Brasil es una empresa de alquiler de lanchas en Río de Janeiro, con sede en la Marina da Glória.</strong>"
      ],
      [
            "Oferece passeios privativos para festas, despedidas de solteira, aniversários e eventos corporativos.",
            "Ofrece paseos privados para fiestas, despedidas de soltera, cumpleaños y eventos corporativos."
      ],
      [
            "Opera <a href=\"/es/lanchas/\">5 lanchas próprias</a> e trabalha com parceiros para atender grupos de 10 a 65 pessoas.",
            "Opera <a href=\"/es/lanchas/\">5 lanchas propias</a> y trabaja con socios para atender grupos de 10 a 65 personas."
      ],
      [
            "Fundada em 2021, realizou mais de 2.500 passeios com <a href=\"/es/rutas/\">6 roteiros diferentes</a> e acumula mais de 1000 avaliações 5 estrelas no Google.",
            "Fundada en 2021, ha realizado más de 2.500 paseos con <a href=\"/es/rutas/\">6 rutas diferentes</a> y acumula más de 1.000 reseñas de 5 estrellas en Google."
      ],
      [
            "<strong>Localização:</strong> Marina da Glória, Loja 06 - Rio de Janeiro, RJ",
            "<strong>Ubicación:</strong> Marina da Glória, Tienda 06 - Río de Janeiro, RJ"
      ],
      [
            "<strong>Capacidade:</strong> Lanchas de 10 a 65 pessoas",
            "<strong>Capacidad:</strong> Lanchas de 10 a 65 personas"
      ],
      [
            "<strong>Preços:</strong> A partir de R$ 2.300 (5 horas)",
            "<strong>Precios:</strong> Desde R$ 2.300 (5 horas)"
      ],
      [
            "<strong>Contato:</strong> WhatsApp (21) 97772-4114",
            "<strong>Contacto:</strong> WhatsApp (21) 97772-4114"
      ],
      [
            "Como a WeBoat Brasil começou?",
            "¿Cómo comenzó WeBoat Brasil?"
      ],
      [
            "A WeBoat nasceu depois do carnaval de 2021, quando três amigos fizeram um passeio de lancha no Rio e viram uma oportunidade de melhorar a experiência. A paisagem era incrível - Cristo, Pão de Açúcar, Baía de Guanabara - mas o atendimento deixou a desejar: preços confusos e instruções desencontradas.",
            "WeBoat nació después del carnaval de 2021, cuando tres amigos hicieron un paseo en lancha en Río y vieron una oportunidad de mejorar la experiencia. El paisaje era increíble — Cristo, Pan de Azúcar, Bahía de Guanabara — pero el servicio dejó mucho que desear: precios confusos e instrucciones contradictorias."
      ],
      [
            "Começamos com uma lancha pequena e muitos desafios. Hoje, menos de 4 anos depois, somos referência no Rio com 5 lanchas próprias, loja na Marina da Glória e mais de 1000 avaliações 5 estrelas.",
            "Comenzamos con una lancha pequeña y muchos desafíos. Hoy, menos de 4 años después, somos referencia en Río con 5 lanchas propias, tienda en la Marina da Glória y más de 1.000 reseñas de 5 estrellas."
      ],
      // NOTE: Full quoted slogan block moved to top of sobre-nosotros contentBlocks
      [
            "Propósito",
            "Propósito"
      ],
      [
            "Levar um dia inesquecível a bordo, com as melhores vistas que somente o Rio pode oferecer. A combinação de lancha e paisagem carioca é impagável.",
            "Brindar un día inolvidable a bordo, con las mejores vistas que solo Río puede ofrecer. La combinación de lancha y paisaje carioca no tiene precio."
      ],
      [
            "Visão",
            "Visión"
      ],
      [
            "Ser a maior empresa de aluguel de lanchas do Brasil, mesmo atuando somente no Rio de Janeiro. Quando alguém pensar em lancha no Rio, pensar WeBoat.",
            "Ser la mayor empresa de alquiler de lanchas de Brasil, aun operando solo en Río de Janeiro. Cuando alguien piense en lancha en Río, que piense WeBoat."
      ],
      [
            "Valores",
            "Valores"
      ],
      [
            "Segurança sempre em primeiro lugar. Experiência em cada detalhe. Inclusão - WeBoat é para todos, respeitamos todas as pessoas e opiniões.",
            "Seguridad siempre en primer lugar. Experiencia en cada detalle. Inclusión — WeBoat es para todos, respetamos a todas las personas y opiniones."
      ],
      [
            "Passeios Realizados",
            "Paseos Realizados"
      ],
      [
            "Lanchas Próprias",
            "Lanchas Propias"
      ],
      [
            "Avaliações 5 Estrelas",
            "Reseñas 5 Estrellas"
      ],
      [
            "Seguidores no Instagram",
            "Seguidores en Instagram"
      ],
      // Alt texts (NOT protected by translateContent - must come before short fragments)
      ['Vista aérea da Marina da Glória com Pão de Açúcar ao fundo - sede da WeBoat Brasil', 'Vista aérea de la Marina da Glória con el Pan de Azúcar al fondo - sede de WeBoat Brasil'],
      ['Lancha WeBoat com logo ao pôr do sol na Baía de Guanabara', 'Lancha WeBoat con logo al atardecer en la Bahía de Guanabara'],
      ['Membro da equipe WeBoat servindo churrasco a bordo da lancha', 'Miembro del equipo WeBoat sirviendo asado a bordo de la lancha'],
      ['Marinheiro da WeBoat com camisa da empresa', 'Marinero de WeBoat con camisa de la empresa'],
      ['Técnico WeBoat realizando manutenção nos motores MAN na sala de máquinas', 'Técnico WeBoat realizando mantenimiento en los motores MAN en la sala de máquinas'],
      ['Membro da equipe WeBoat com camisa azul no comando da lancha', 'Miembro del equipo WeBoat con camisa azul al mando de la lancha'],
      ['Vista aérea da Marina da Glória com embarcações atracadas e Baía de Guanabara ao fundo', 'Vista aérea de la Marina da Glória con embarcaciones atracadas y Bahía de Guanabara al fondo'],
      // Safety text (MUST come before 'Marinheiros' short block to avoid substring corruption)
      [
            "Todas as embarcações possuem equipamentos de segurança e seguros obrigatórios. Marinheiros habilitados pela Marinha do Brasil.",
            "Todas las embarcaciones poseen equipos de seguridad y seguros obligatorios. Marineros habilitados por la Marina de Brasil."
      ],
      [
            "Nossa Equipe",
            "Nuestro Equipo"
      ],
      [
            "Profissionais apaixonados pelo mar e dedicados a proporcionar a melhor experiência para você e seus convidados.",
            "Profesionales apasionados por el mar y dedicados a brindar la mejor experiencia para usted y sus invitados."
      ],
      [
            "Equipe de Atendimento",
            "Equipo de Atención"
      ],
      [
            "Consultores de Passeio",
            "Consultores de Paseo"
      ],
      [
            "Marinheiros",
            "Marineros"
      ],
      [
            "Habilitados pela Marinha",
            "Habilitados por la Marina"
      ],
      [
            "Manutenção",
            "Mantenimiento"
      ],
      [
            "Técnicos Especializados",
            "Técnicos Especializados"
      ],
      [
            "Operações",
            "Operaciones"
      ],
      [
            "Coordenação de Passeios",
            "Coordinación de Paseos"
      ],
      [
            "Nossa Estrutura",
            "Nuestra Estructura"
      ],
      [
            "Operamos a partir da Marina da Glória, uma das mais tradicionais e bem localizadas marinas do Rio de Janeiro. Com vista para o Pão de Açúcar e fácil acesso, oferecemos toda a estrutura necessária para seu passeio.",
            "Operamos desde la Marina da Glória, una de las marinas más tradicionales y mejor ubicadas de Río de Janeiro. Con vista al Pan de Azúcar y fácil acceso, ofrecemos toda la infraestructura necesaria para su paseo."
      ],
      [
            "Saiba <a href=\"/es/como-funciona/\">como funciona o processo de reserva</a>.",
            "Conozca <a href=\"/es/como-funciona/\">cómo funciona el proceso de reserva</a>."
      ],
      [
            "Localização Privilegiada",
            "Ubicación Privilegiada"
      ],
      [
            "Marina da Glória, ao lado do Aeroporto Santos Dumont e dos principais cartões postais do Rio.",
            "Marina da Glória, al lado del Aeropuerto Santos Dumont y de las principales postales de Río."
      ],
      [
            "Fácil Acesso",
            "Fácil Acceso"
      ],
      [
            "Localização central com fácil acesso por carro, táxi ou transporte por aplicativo.",
            "Ubicación central con fácil acceso en auto, taxi o transporte por aplicación."
      ],
      [
            "Loja WeBoat",
            "Tienda WeBoat"
      ],
      [
            "Loja 06 da Marina para atendimento e retirada de materiais.",
            "Tienda 06 de la Marina para atención y retiro de materiales."
      ],
      [
            "Estrutura Completa",
            "Infraestructura Completa"
      ],
      [
            "Mini mercado, farmácia e restaurantes na Marina.",
            "Mini mercado, farmacia y restaurantes en la Marina."
      ],
      [
            "Nosso Compromisso",
            "Nuestro Compromiso"
      ],
      [
            "Trabalhamos diariamente para garantir sua segurança e satisfação.",
            "Trabajamos diariamente para garantizar su seguridad y satisfacción."
      ],
      [
            "Segurança",
            "Seguridad"
      ],
      // NOTE: Safety text moved earlier in contentBlocks (before 'Marinheiros' short block)
      [
            "Qualidade",
            "Calidad"
      ],
      [
            "Lanchas modernas, bem mantidas e limpas. Realizamos manutenção preventiva regular em todas as embarcações.",
            "Lanchas modernas, bien mantenidas y limpias. Realizamos mantenimiento preventivo regular en todas las embarcaciones."
      ],
      [
            "Transparência",
            "Transparencia"
      ],
      [
            "Preços claros, sem surpresas. Tudo que está incluso é informado antes da reserva. Política de cancelamento justa.",
            "Precios claros, sin sorpresas. Todo lo que está incluido se informa antes de la reserva. Política de cancelación justa."
      ],
      [
            "O que é a WeBoat Brasil?",
            "¿Qué es WeBoat Brasil?"
      ],
      [
            "A WeBoat Brasil é uma empresa de aluguel de lanchas no Rio de Janeiro, com sede na Marina da Glória. Fundada em 2021, opera 5 lanchas próprias e trabalha com parceiros para atender grupos de 10 a 65 pessoas. Já realizou mais de 2.500 passeios e acumula mais de 1000 avaliações 5 estrelas no Google.",
            "WeBoat Brasil es una empresa de alquiler de lanchas en Río de Janeiro, con sede en la Marina da Glória. Fundada en 2021, opera 5 lanchas propias y trabaja con socios para atender grupos de 10 a 65 personas. Ha realizado más de 2.500 paseos y acumula más de 1.000 reseñas de 5 estrellas en Google."
      ],
      [
            "Quais serviços a WeBoat oferece?",
            "¿Qué servicios ofrece WeBoat?"
      ],
      [
            "A WeBoat oferece passeios de lancha privativos com 6 roteiros diferentes pela Baía de Guanabara, Copacabana, Ilhas Cagarras e Niterói. Todos os passeios incluem combustível, marinheiro habilitado, som Bluetooth, coletes e seguro. Serviços extras incluem churrasco, open bar, decoração, DJ e fotógrafo profissional.",
            "WeBoat ofrece paseos en lancha privados con 6 rutas diferentes por la Bahía de Guanabara, Copacabana, Ilhas Cagarras y Niterói. Todos los paseos incluyen combustible, marinero habilitado, sonido Bluetooth, chalecos y seguro. Servicios extras incluyen asado, open bar, decoración, DJ y fotógrafo profesional."
      ],
      [
            "Quanto custa alugar uma lancha na WeBoat?",
            "¿Cuánto cuesta alquilar una lancha en WeBoat?"
      ],
      [
            "O aluguel de lancha na WeBoat começa a partir de R$ 2.300 para o roteiro Mureta da Urca (seg-qui, WeBoat 32 para até 15 pessoas). Preços variam conforme a embarcação, roteiro e dia da semana. Lanchas maiores e catamarãs para até 65 pessoas custam a partir de R$ 14.000.",
            "El alquiler de lancha en WeBoat comienza desde R$ 2.300 para la ruta Mureta da Urca (lun-jue, WeBoat 32 para hasta 15 personas). Los precios varían según la embarcación, ruta y día de la semana. Lanchas más grandes y catamaranes para hasta 65 personas comienzan desde R$ 14.000."
      ],
      [
            "Nossa Reputação",
            "Nuestra Reputación"
      ],
      [
            "A Confiança de Mais de 1.000 Clientes",
            "La Confianza de Más de 1.000 Clientes"
      ],
      [
            "Construímos nossa história com base na satisfação de cada passageiro.",
            "Construimos nuestra historia basándonos en la satisfacción de cada pasajero."
      ],
      [
            "Perguntas sobre a WeBoat",
            "Preguntas sobre WeBoat"
      ],
      [
            "Quantas lanchas a WeBoat tem?",
            "¿Cuántas lanchas tiene WeBoat?"
      ],
      [
            "A WeBoat possui <strong>5 lanchas próprias</strong> (WeBoat 32, WeBoat 390, WeBoat Oceanic 36, WeBoat Rio Star 50 e WeBoat Ibiza 42), com capacidade de 12 a 22 pessoas. Também trabalhamos com <strong>lanchas parceiras</strong> para grupos de 10 a 65 pessoas.",
            "WeBoat cuenta con <strong>5 lanchas propias</strong> (WeBoat 32, WeBoat 390, WeBoat Oceanic 36, WeBoat Rio Star 50 y WeBoat Ibiza 42), con capacidad de 12 a 22 personas. También trabajamos con <strong>lanchas asociadas</strong> para grupos de 10 a 65 personas."
      ],
      [
            "Onde fica a WeBoat Brasil?",
            "¿Dónde queda WeBoat Brasil?"
      ],
      [
            "Estamos na <strong>Marina da Glória - Loja 06</strong>, no Rio de Janeiro. A localização é privilegiada: ao lado do Aeroporto Santos Dumont, com fácil acesso e estacionamento disponível no local.",
            "Estamos en la <strong>Marina da Glória - Tienda 06</strong>, en Río de Janeiro. La ubicación es privilegiada: al lado del Aeropuerto Santos Dumont, con fácil acceso y estacionamiento disponible en el lugar."
      ],
      [
            "Os marinheiros são habilitados?",
            "¿Los marineros están habilitados?"
      ],
      [
            "<strong>Sim!</strong> Todos os nossos marinheiros são habilitados pela Marinha do Brasil e passam por treinamentos regulares. A segurança dos passageiros é nossa prioridade.",
            "<strong>¡Sí!</strong> Todos nuestros marineros están habilitados por la Marina de Brasil y pasan por entrenamientos regulares. La seguridad de los pasajeros es nuestra prioridad."
      ],
      [
            "Qual o horário de atendimento?",
            "¿Cuál es el horario de atención?"
      ],
      [
            "<strong>Atendimento comercial:</strong> 8h às 20h (reservas e informações). <strong>Suporte para clientes em passeio:</strong> 24 horas. Estamos sempre disponíveis para ajudar!",
            "<strong>Horario comercial:</strong> 8h a 20h (reservas e información). <strong>Soporte para clientes en paseo:</strong> 24 horas. ¡Estamos siempre disponibles para ayudar!"
      ],
      [
            "Venha Conhecer a WeBoat Brasil",
            "Venga a Conocer WeBoat Brasil"
      ],
      [
            "Agende seu passeio e descubra por que somos a escolha de mais de 1.000 clientes satisfeitos.",
            "Agende su paseo y descubra por qué somos la elección de más de 1.000 clientes satisfechos."
      ],
      [
            "Falar com a Equipe",
            "Hablar con el Equipo"
      ],
      [
            "Última atualização: Fevereiro 2026",
            "Última actualización: Febrero 2026"
      ],
      // Schema.org FAQ answers (JSON-LD versions without <strong> tags)
      ['A WeBoat possui 5 lanchas próprias (WeBoat 32, WeBoat 390, WeBoat Oceanic 36, WeBoat Rio Star 50 e WeBoat Ibiza 42), com capacidade de 12 a 22 pessoas. Também trabalhamos com lanchas parceiras para grupos de 10 a 65 pessoas.', 'WeBoat cuenta con 5 lanchas propias (WeBoat 32, WeBoat 390, WeBoat Oceanic 36, WeBoat Rio Star 50 y WeBoat Ibiza 42), con capacidad de 12 a 22 personas. También trabajamos con lanchas asociadas para grupos de 10 a 65 personas.'],
      ['Estamos na Marina da Glória - Loja 06, no Rio de Janeiro. A localização é privilegiada: ao lado do Aeroporto Santos Dumont, com fácil acesso e estacionamento disponível no local.', 'Estamos en la Marina da Glória - Tienda 06, en Río de Janeiro. La ubicación es privilegiada: al lado del Aeropuerto Santos Dumont, con fácil acceso y estacionamiento disponible en el lugar.'],
      ['Sim! Todos os nossos marinheiros são habilitados pela Marinha do Brasil e passam por treinamentos regulares. A segurança dos passageiros é nossa prioridade.', '¡Sí! Todos nuestros marineros están habilitados por la Marina de Brasil y pasan por entrenamientos regulares. La seguridad de los pasajeros es nuestra prioridad.'],
      ['Atendimento comercial: 8h às 20h (reservas e informações). Suporte para clientes em passeio: 24 horas.', 'Horario comercial: 8h a 20h (reservas e información). Soporte para clientes en paseo: 24 horas.'],
],
  },
  {
    ptPath: 'faq/index.html',
    esPath: 'es/preguntas-frecuentes/index.html',
    title: 'Preguntas Frecuentes | WeBoat Brasil',
    description: 'Preguntas frecuentes sobre alquiler de lanchas en Río de Janeiro. Precios, política de cancelación, qué incluye y más.',
    keywords: 'preguntas frecuentes alquiler lancha, faq paseo barco rio',
    waMessage: '¡Hola! Tengo una pregunta sobre el alquiler de lanchas. [via site - es]',
    css: 'faq',
      contentBlocks: [
      // Schema.org FAQ answers (JSON-LD plain text - MUST come before all short fragments)
      ['O aluguel de lancha no Rio de Janeiro na WeBoat começa em R$ 2.300 para passeios de segunda a quinta, e R$ 2.700 de sexta a domingo. O preço varia conforme a capacidade da lancha, roteiro escolhido e duração do passeio. Todas as lanchas incluem combustível, marinheiro, som Bluetooth e coolers.', 'El alquiler de lancha en Río de Janeiro en WeBoat comienza en R$ 2.300 para paseos de lunes a jueves, y R$ 2.700 de viernes a domingo. El precio varía según la capacidad de la lancha, ruta elegida y duración del paseo. Todas las lanchas incluyen combustible, marinero, sonido Bluetooth y coolers.'],
      ['Todo aluguel de lancha na WeBoat inclui: combustível para o roteiro escolhido, marinheiro habilitado pela Marinha, tapete flutuante, macarrões flutuantes, som Bluetooth, coolers e seguro obrigatório. Serviços como churrasco, open bar e decoração são opcionais.', 'Todo alquiler de lancha en WeBoat incluye: combustible para la ruta elegida, marinero habilitado por la Marina, alfombra flotante, fideos flotantes, sonido Bluetooth, coolers y seguro obligatorio. Servicios como asado, open bar y decoración son opcionales.'],
      ['A WeBoat tem 5 lanchas próprias: WeBoat 32 (15 pessoas), WeBoat 390 (16 pessoas), WeBoat Oceanic 36 (14 pessoas), WeBoat Rio Star 50 (22 pessoas) e WeBoat Ibiza 42 (12 pessoas). Para grupos maiores, temos lanchas parceiras de 10 a 65 pessoas.', 'WeBoat tiene 5 lanchas propias: WeBoat 32 (15 personas), WeBoat 390 (16 personas), WeBoat Oceanic 36 (14 personas), WeBoat Rio Star 50 (22 personas) y WeBoat Ibiza 42 (12 personas). Para grupos más grandes, tenemos lanchas asociadas de 10 a 65 personas.'],
      ['A reserva é confirmada com 50% de sinal via PIX ou transferência. O restante deve ser pago até o momento do embarque. Para cartões de crédito/débito, as taxas são repassadas, com parcelamento em até 12x com juros da operadora.', 'La reserva se confirma con 50% de seña vía PIX o transferencia. El resto debe pagarse hasta el momento del embarque. Para tarjetas de crédito/débito, las tasas son trasladadas, con hasta 12 cuotas con intereses de la operadora.'],
      ['A remarcação só é possível em caso de chuva forte que inviabilize o passeio. Tempo nublado ou chuva leve não geram remarcação. Em caso de más condições de navegabilidade, o roteiro pode ser alterado para a Baía de Guanabara.', 'La reprogramación solo es posible en caso de lluvia fuerte que imposibilite el paseo. Tiempo nublado o lluvia leve no generan reprogramación. En caso de malas condiciones de navegación, la ruta puede ser cambiada a la Bahía de Guanabara.'],
      ['A diferença entre os roteiros está no tempo de navegação versus tempo de lancha parada. A duração total do passeio é sempre a mesma (5 horas). Roteiros mais curtos (R1-R2) têm menos tempo navegando e mais tempo de lancha parada para banho. Roteiros mais longos (R4-R5) têm mais tempo navegando e conhecendo mais lugares. Turnos disponíveis: Manhã 09:00-14:00 e Tarde 14:30-19:30.', 'La diferencia entre las rutas está en el tiempo de navegación versus tiempo de lancha detenida. La duración total del paseo es siempre la misma (5 horas). Rutas más cortas (R1-R2) tienen menos tiempo navegando y más tiempo de lancha detenida para baño. Rutas más largas (R4-R5) tienen más tiempo navegando y conociendo más lugares. Turnos disponibles: Mañana 09:00-14:00 y Tarde 14:30-19:30.'],
      ['Sim! Permitimos garrafas PET e latas. Recipientes de vidro são aceitos apenas para vinhos, champanhes, whiskies e destilados. Para usar a churrasqueira, há taxa adicional. Também oferecemos serviços de churrasco (a partir de R$ 100/pessoa) e open bar (a partir de R$ 135/pessoa).', '¡Sí! Permitimos botellas PET y latas. Recipientes de vidrio se aceptan solo para vinos, champagnes, whiskies y destilados. Para usar la parrilla, hay tarifa adicional. También ofrecemos servicios de asado (desde R$ 100/persona) y open bar (desde R$ 135/persona).'],
      ['O sinal de 50% garante a reserva e não dá direito a arrependimento por motivos pessoais. Se precisar cancelar, entre em contato o quanto antes. Caso consigamos outro cliente para sua data, liberamos o valor para estorno ou remarcação.', 'La seña del 50% garantiza la reserva y no da derecho a arrepentimiento por motivos personales. Si necesita cancelar, contáctenos lo antes posible. Si conseguimos otro cliente para su fecha, liberamos el monto para reembolso o reprogramación.'],
      ['Sim! Não há restrição de idade. Pedimos que os responsáveis sigam as orientações do briefing inicial e do comandante. Sugerimos coletes recreativos infantis para entrar no mar. Todas as crianças contam no limite de passageiros.', '¡Sí! No hay restricción de edad. Pedimos que los responsables sigan las orientaciones del briefing inicial y del capitán. Sugerimos chalecos recreativos infantiles para entrar al mar. Todos los niños cuentan en el límite de pasajeros.'],
      ['Permitimos cachorros de pequeno porte. Para cães de médio e grande porte, é necessário consultar previamente nossa equipe pelo WhatsApp.', 'Permitimos perros de pequeño porte. Para perros de mediano y gran porte, es necesario consultar previamente con nuestro equipo por WhatsApp.'],
      ['Não há tempo mínimo ou máximo para reserva. Porém, em períodos de alta procura (verão, feriados, réveillon), recomendamos reservar com pelo menos 30 dias de antecedência para garantir as melhores opções.', 'No hay tiempo mínimo o máximo para reserva. Sin embargo, en períodos de alta demanda (verano, feriados, Año Nuevo), recomendamos reservar con al menos 30 días de anticipación para asegurar las mejores opciones.'],
      ['Sim! O Réveillon na lancha tem 5 horas de duração, com horário sugerido de 21h às 2h (flexível). Horas adicionais são cobradas à parte. As vagas são limitadas e costumam esgotar com meses de antecedência.', '¡Sí! El Año Nuevo en lancha tiene 5 horas de duración, con horario sugerido de 21h a 2h (flexible). Horas adicionales se cobran aparte. Los cupos son limitados y suelen agotarse con meses de anticipación.'],
      ['É proibido: bronzeadores (use protetor solar), vinho tinto, narguilé, fogos de artifício e confetes. Recipientes de vidro só são permitidos para vinhos, champanhes, whiskies e destilados.', 'Está prohibido: bronceadores (use protector solar), vino tinto, narguile, fuegos artificiales y confeti. Recipientes de vidrio solo están permitidos para vinos, champagnes, whiskies y destilados.'],
      ['Encontre respostas para as dúvidas mais comuns sobre aluguel de lancha no Rio de Janeiro.', 'Encuentre respuestas a las preguntas más frecuentes sobre alquiler de lanchas en Río de Janeiro.'],
      ['Quanto custa alugar uma lancha?', '¿Cuánto cuesta alquilar una lancha?'],
      ['O que está incluso no aluguel?', '¿Qué está incluido en el alquiler?'],
      ['Como funciona a reserva?', '¿Cómo funciona la reserva?'],
      ['Categorias', 'Categorías'],
      ['Preços e Reservas', 'Precios y Reservas'],
      ['Durante o Passeio', 'Durante el Paseo'],
      ['Sobre as Lanchas', 'Sobre las Lanchas'],
      ['Logística', 'Logística'],
      ['Crianças, Pets e Acessibilidade', 'Niños, Mascotas y Accesibilidad'],
      ['Políticas e Regras', 'Políticas y Reglas'],
      ['Quanto custa alugar uma lancha no Rio de Janeiro?', '¿Cuánto cuesta alquilar una lancha en Río de Janeiro?'],
      ['O aluguel de lancha no Rio de Janeiro na WeBoat começa em <strong>R$ 2.300</strong> para passeios de segunda a quinta, e <strong>R$ 2.700</strong> de sexta a domingo.', 'El alquiler de lancha en Río de Janeiro en WeBoat comienza en <strong>R$ 2.300</strong> para paseos de lunes a jueves, y <strong>R$ 2.700</strong> de viernes a domingo.'],
      ['O preço varia conforme:', 'El precio varía según:'],
      ['Capacidade da lancha (de 10 a 65 pessoas)', 'Capacidad de la lancha (de 10 a 65 personas)'],
      ['Dia da semana (dias úteis são mais econômicos)', 'Día de la semana (días hábiles son más económicos)'],
      ['Roteiro e duração do passeio', 'Ruta y duración del paseo'],
      ['Todas as lanchas incluem combustível, marinheiro, som Bluetooth e coolers. Veja a <a href="/es/lanchas/">lista completa de lanchas disponíveis</a>.', 'Todas las lanchas incluyen combustible, marinero, sonido Bluetooth y coolers. Vea la <a href="/es/lanchas/">lista completa de lanchas disponibles</a>.'],
      ['O que está incluso no aluguel de lancha?', '¿Qué está incluido en el alquiler de lancha?'],
      ['Todo aluguel de lancha na WeBoat inclui:', 'Todo alquiler de lancha en WeBoat incluye:'],
      ['Combustível para o roteiro escolhido', 'Combustible para la ruta elegida'],
      ['Marinheiro habilitado pela Marinha', 'Marinero habilitado por la Marina'],
      ['Tapete flutuante', 'Tapete flotante'],
      ['Macarrões flutuantes', 'Fideos flotantes'],
      ['Som Bluetooth', 'Sonido Bluetooth'],
      ['Seguro obrigatório', 'Seguro obligatorio'],
      ['Serviços como churrasco, open bar e decoração são opcionais. Confira todos os <a href="/es/servicios/">serviços extras disponíveis</a>.', 'Servicios como asado, open bar y decoración son opcionales. Consulte todos los <a href="/es/servicios/">servicios extras disponibles</a>.'],
      ['A reserva é simples e rápida:', 'La reserva es simple y rápida:'],
      ['Entre em contato pelo WhatsApp <a href="https://wa.me/5521977724114">(21) 97772-4114</a>', 'Contáctenos por WhatsApp <a href="https://wa.me/5521977724114">(21) 97772-4114</a>'],
      ['Escolha a lancha e data desejada', 'Elija la lancha y fecha deseada'],
      ['Pague um sinal de <strong>50%</strong> para confirmar', 'Pague una seña del <strong>50%</strong> para confirmar'],
      ['O restante deve ser pago até o momento do embarque', 'El resto debe pagarse hasta el momento del embarque'],
      ['A reserva é feita em nome de um único contratante. Veja o <a href="/es/como-funciona/">passo a passo completo de como funciona</a>.', 'La reserva se hace a nombre de un único contratante. Vea el <a href="/es/como-funciona/">paso a paso completo de cómo funciona</a>.'],
      ['Quais formas de pagamento são aceitas?', '¿Qué formas de pago se aceptan?'],
      ['Aceitamos as seguintes formas de pagamento:', 'Aceptamos las siguientes formas de pago:'],
      ['<strong>PIX</strong> - Forma preferencial, sem taxas adicionais', '<strong>PIX</strong> - Forma preferencial, sin tasas adicionales'],
      ['<strong>Transferência bancária</strong> - Sem taxas adicionais', '<strong>Transferencia bancaria</strong> - Sin tasas adicionales'],
      ['<strong>Cartão de crédito</strong> - Taxas da operadora repassadas, parcelamento em até 12x com juros', '<strong>Tarjeta de crédito</strong> - Tasas de la operadora trasladadas, hasta 12 cuotas con intereses'],
      ['<strong>Cartão de débito</strong> - Taxas da operadora repassadas', '<strong>Tarjeta de débito</strong> - Tasas de la operadora trasladadas'],
      ['O sinal de 50% confirma a reserva. O restante deve ser pago até o embarque.', 'La seña del 50% confirma la reserva. El resto debe pagarse antes del embarque.'],
      ['Qual a política de cancelamento?', '¿Cuál es la política de cancelación?'],
      ['O sinal de 50% garante sua reserva e <strong>não dá direito a arrependimento</strong>, seja por motivos pessoais, familiares ou de saúde. Ao reservar, deixamos de ofertar a lancha para outros interessados.', 'La seña del 50% garantiza su reserva y <strong>no da derecho a arrepentimiento</strong>, sea por motivos personales, familiares o de salud. Al reservar, dejamos de ofrecer la lancha a otros interesados.'],
      ['<strong>Precisa cancelar ou remarcar?</strong> Entre em contato o quanto antes! Nosso objetivo não é ficar com seu sinal. Se conseguirmos outro cliente para sua data, liberamos o valor para estorno ou remarcação.', '<strong>¿Necesita cancelar o reprogramar?</strong> ¡Contáctenos lo antes posible! Nuestro objetivo no es quedarnos con su seña. Si conseguimos otro cliente para su fecha, liberamos el monto para reembolso o reprogramación.'],
      ['<strong>Não comparecimento (no-show):</strong> Resulta na perda do sinal, sem direito a reagendamento ou reembolso.', '<strong>No comparecencia (no-show):</strong> Resulta en la pérdida de la seña, sin derecho a reprogramación o reembolso.'],
      ['Com quanto tempo de antecedência devo reservar?', '¿Con cuánta anticipación debo reservar?'],
      ['Não há tempo mínimo ou máximo para fazer sua reserva. Porém, em <strong>períodos de alta procura</strong> (verão, feriados prolongados, réveillon), recomendamos reservar com pelo menos <strong>30 dias de antecedência</strong> para garantir as melhores opções de lanchas e datas.', 'No hay tiempo mínimo o máximo para hacer su reserva. Sin embargo, en <strong>períodos de alta demanda</strong> (verano, feriados largos, Año Nuevo), recomendamos reservar con al menos <strong>30 días de anticipación</strong> para asegurar las mejores opciones de lanchas y fechas.'],
      ['Posso levar bebida e comida?', '¿Puedo llevar bebida y comida?'],
      ['Sim! Você pode levar sua própria bebida e comida <strong>sem custo extra</strong>. Fornecemos coolers para armazenamento.', '¡Sí! Puede llevar su propia bebida y comida <strong>sin costo extra</strong>. Proporcionamos coolers para almacenamiento.'],
      ['<strong>Obs:</strong> Para utilizar a churrasqueira, há uma taxa adicional.', '<strong>Nota:</strong> Para utilizar la parrilla, hay una tarifa adicional.'],
      ['<strong>Sobre embalagens:</strong>', '<strong>Sobre envases:</strong>'],
      ['Garrafas PET e latas são liberadas', 'Botellas PET y latas están permitidas'],
      ['Recipientes de vidro são aceitos <strong>apenas</strong> para vinhos, champanhes, whiskies e destilados', 'Recipientes de vidrio se aceptan <strong>solo</strong> para vinos, champagnes, whiskies y destilados'],
      ['Também oferecemos serviços opcionais de <strong>churrasco</strong> (a partir de R$ 100/pessoa) e <strong>open bar</strong> (a partir de R$ 135/pessoa).', 'También ofrecemos servicios opcionales de <strong>asado</strong> (desde R$ 100/persona) y <strong>open bar</strong> (desde R$ 135/persona).'],
      ['O que é proibido levar na lancha?', '¿Qué está prohibido llevar en la lancha?'],
      ['Para garantir a segurança e conservação da embarcação, <strong>não é permitido</strong>:', 'Para garantizar la seguridad y conservación de la embarcación, <strong>no está permitido</strong>:'],
      ['Bronzeadores (use protetor solar)', 'Bronceadores (use protector solar)'],
      ['Vinho tinto', 'Vino tinto'],
      ['Narguilé', 'Narguile'],
      ['Fogos de artifício', 'Fuegos artificiales'],
      ['Confetes', 'Confeti'],
      ['Vidros (exceto vinhos, champanhes, whiskies e destilados)', 'Vidrios (excepto vinos, champagnes, whiskies y destilados)'],
      ['E se chover no dia do passeio?', '¿Y si llueve el día del paseo?'],
      ['A <strong>remarcação só é possível em caso de chuva forte</strong> que inviabilize o passeio. Tempo nublado ou chuva leve não geram remarcação, pois as lanchas possuem toldo.', 'La <strong>reprogramación solo es posible en caso de lluvia fuerte</strong> que imposibilite el paseo. Tiempo nublado o lluvia leve no generan reprogramación, ya que las lanchas tienen toldo.'],
      ['Em caso de más condições de navegabilidade, o roteiro pode ser automaticamente alterado para a <strong>Baía de Guanabara</strong>, garantindo sua experiência com segurança.', 'En caso de malas condiciones de navegación, la ruta puede ser automáticamente cambiada a la <strong>Bahía de Guanabara</strong>, garantizando su experiencia con seguridad.'],
      ['Qual a diferença entre os roteiros?', '¿Cuál es la diferencia entre las rutas?'],
      ['A diferença entre os roteiros está no <strong>tempo de navegação</strong> versus <strong>tempo de lancha parada</strong>. A duração total do passeio é sempre a mesma para o turno escolhido (5 horas).', 'La diferencia entre las rutas está en el <strong>tiempo de navegación</strong> versus <strong>tiempo de lancha detenida</strong>. La duración total del paseo es siempre la misma para el turno elegido (5 horas).'],
      ['<strong>Roteiros mais curtos (R1-R2):</strong> Menos tempo navegando, mais tempo de lancha parada para banho e curtição', '<strong>Rutas más cortas (R1-R2):</strong> Menos tiempo navegando, más tiempo de lancha detenida para baño y diversión'],
      ['<strong>Roteiros mais longos (R4-R5):</strong> Mais tempo navegando, conhecendo mais lugares, menos tempo parado', '<strong>Rutas más largas (R4-R5):</strong> Más tiempo navegando, conociendo más lugares, menos tiempo detenido'],
      ['<strong>Turnos disponíveis:</strong>', '<strong>Turnos disponibles:</strong>'],
      ['Escolha o roteiro conforme o que você prefere: mais tempo relaxando na água ou conhecer mais destinos!', '¡Elija la ruta según lo que prefiera: más tiempo relajándose en el agua o conocer más destinos!'],
      ['Preciso chegar com antecedência?', '¿Necesito llegar con anticipación?'],
      ['Sim! Chegue com pelo menos <strong>30 minutos de antecedência</strong> do horário marcado.', '¡Sí! Llegue con al menos <strong>30 minutos de anticipación</strong> a la hora programada.'],
      ['<strong>Importante:</strong> O tempo de atraso será descontado do tempo total do passeio. Pontualidade garante que você aproveite cada minuto!', '<strong>Importante:</strong> El tiempo de retraso se descontará del tiempo total del paseo. ¡La puntualidad garantiza que aproveche cada minuto!'],
      ['Preciso saber nadar para fazer o passeio?', '¿Necesito saber nadar para hacer el paseo?'],
      ['<strong>Não é necessário saber nadar.</strong> Durante o passeio, fornecemos <strong>macarrões flutuantes e tapete</strong> para diversão na água. Coletes salva-vidas estão disponíveis para emergências.', '<strong>No es necesario saber nadar.</strong> Durante el paseo, proporcionamos <strong>fideos flotantes y tapete</strong> para diversión en el agua. Chalecos salvavidas están disponibles para emergencias.'],
      ['Fornecemos todas as orientações de segurança sobre mergulho, mas a decisão final de entrar na água é de responsabilidade dos passageiros.', 'Proporcionamos todas las orientaciones de seguridad sobre el baño, pero la decisión final de entrar al agua es responsabilidad de los pasajeros.'],
      ['Posso escolher a música durante o passeio?', '¿Puedo elegir la música durante el paseo?'],
      ['Sim! Todas as lanchas possuem <strong>som Bluetooth</strong>. Você pode conectar seu celular e tocar suas próprias playlists durante todo o passeio.', '¡Sí! Todas las lanchas tienen <strong>sonido Bluetooth</strong>. Puede conectar su celular y reproducir sus propias playlists durante todo el paseo.'],
      ['Para festas e eventos especiais, oferecemos o serviço de <strong>DJ a bordo</strong>. A presença de DJ e equipamentos de som devem ser confirmados previamente, incluindo a potência permitida para a embarcação contratada.', 'Para fiestas y eventos especiales, ofrecemos el servicio de <strong>DJ a bordo</strong>. La presencia de DJ y equipos de sonido deben confirmarse previamente, incluyendo la potencia permitida para la embarcación contratada.'],
      ['Posso fumar a bordo?', '¿Puedo fumar a bordo?'],
      ['É permitido fumar <strong>apenas nas áreas externas</strong> da lancha, respeitando as regras da embarcação e com cuidado para não danificar o piso e assentos. Pedimos que as bitucas sejam descartadas adequadamente.', 'Se permite fumar <strong>solo en las áreas externas</strong> de la lancha, respetando las reglas de la embarcación y con cuidado de no dañar el piso y los asientos. Pedimos que las colillas se descarten adecuadamente.'],
      ['<strong>Atenção:</strong> Narguilé é proibido a bordo.', '<strong>Atención:</strong> El narguile está prohibido a bordo.'],
      ['Como funciona o uso do banheiro?', '¿Cómo funciona el uso del baño?'],
      ['Todas as nossas lanchas próprias possuem <strong>banheiro a bordo</strong> para maior conforto.', 'Todas nuestras lanchas propias tienen <strong>baño a bordo</strong> para mayor confort.'],
      ['<strong>Importante:</strong> Não jogue papel ou qualquer material no vaso sanitário. Caso o sistema seja danificado, será cobrada uma taxa de manutenção.', '<strong>Importante:</strong> No tire papel ni ningún material en el inodoro. Si el sistema resulta dañado, se cobrará una tarifa de mantenimiento.'],
      ['Sobre as Lanchas', 'Sobre las Lanchas'],
      ['Quantas pessoas cabem em uma lancha?', '¿Cuántas personas caben en una lancha?'],
      ['A WeBoat tem <strong>5 lanchas próprias</strong> para diferentes tamanhos de grupo:', 'WeBoat tiene <strong>5 lanchas propias</strong> para diferentes tamaños de grupo:'],
      ['<strong>WeBoat Ibiza 42:</strong> Até 12 pessoas (flybridge exclusivo)', '<strong>WeBoat Ibiza 42:</strong> Hasta 12 personas (flybridge exclusivo)'],
      ['Para grupos maiores, temos <strong>lanchas parceiras de 10 a 65 pessoas</strong>. Entre em contato para conhecer as opções!', 'Para grupos más grandes, tenemos <strong>lanchas asociadas de 10 a 65 personas</strong>. ¡Contáctenos para conocer las opciones!'],
      ['<strong>Importante:</strong> Todos contam como passageiros no limite da embarcação, independentemente de idade, peso ou tamanho.', '<strong>Importante:</strong> Todos cuentan como pasajeros en el límite de la embarcación, independientemente de la edad, peso o tamaño.'],
      ['As lanchas têm banheiro?', '¿Las lanchas tienen baño?'],
      ['<strong>Sim!</strong> Todas as lanchas (próprias e de parceiros) possuem banheiro a bordo para maior conforto dos passageiros.', '<strong>¡Sí!</strong> Todas las lanchas (propias y de socios) tienen baño a bordo para mayor confort de los pasajeros.'],
      ['As lanchas têm churrasqueira?', '¿Las lanchas tienen parrilla?'],
      ['<strong>Sim!</strong> Todas as nossas lanchas possuem churrasqueira. Porém, o uso requer a <strong>contratação de um serviço adicional</strong>.', '<strong>¡Sí!</strong> Todas nuestras lanchas tienen parrilla. Sin embargo, el uso requiere la <strong>contratación de un servicio adicional</strong>.'],
      ['Os valores variam entre <strong>R$ 250 a R$ 600</strong>, dependendo da embarcação e do que está incluído no pacote. Entre em contato para mais informações.', 'Los valores varían entre <strong>R$ 250 a R$ 600</strong>, dependiendo de la embarcación y lo que está incluido en el paquete. Contáctenos para más información.'],
      ['Qual a diferença entre as lanchas?', '¿Cuál es la diferencia entre las lanchas?'],
      ['Cada lancha tem suas características:', 'Cada lancha tiene sus características:'],
      ['<strong>WeBoat 32:</strong> Melhor custo-benefício, ideal para grupos de até 15 pessoas', '<strong>WeBoat 32:</strong> Mejor costo-beneficio, ideal para grupos de hasta 15 personas'],
      ['<strong>WeBoat 390:</strong> Mais versátil, até 16 pessoas, ótima para despedidas e festas', '<strong>WeBoat 390:</strong> Más versátil, hasta 16 personas, excelente para despedidas y fiestas'],
      ['<strong>WeBoat Oceanic 36:</strong> Conforto premium, acabamento superior, até 14 pessoas', '<strong>WeBoat Oceanic 36:</strong> Confort premium, acabado superior, hasta 14 personas'],
      ['<strong>WeBoat Rio Star 50:</strong> Maior capacidade (22 pessoas), perfeita para grupos grandes', '<strong>WeBoat Rio Star 50:</strong> Mayor capacidad (22 personas), perfecta para grupos grandes'],
      ['<strong>WeBoat Ibiza 42:</strong> Flybridge exclusivo, até 12 pessoas, ideal para casais e grupos pequenos', '<strong>WeBoat Ibiza 42:</strong> Flybridge exclusivo, hasta 12 personas, ideal para parejas y grupos pequeños'],
      ['Converse com nossa equipe para escolher a melhor opção para seu grupo!', '¡Converse con nuestro equipo para elegir la mejor opción para su grupo!'],
      ['E se houver problema com a lancha no dia?', '¿Y si hay un problema con la lancha el día?'],
      ['Em caso de problemas com a embarcação contratada, disponibilizamos <strong>opções similares ou superiores</strong> para garantir seu passeio.', 'En caso de problemas con la embarcación contratada, ponemos a disposición <strong>opciones similares o superiores</strong> para garantizar su paseo.'],
      ['Caso não aprove nenhuma das opções oferecidas, realizaremos a <strong>devolução integral do valor pago</strong>.', 'Si no aprueba ninguna de las opciones ofrecidas, realizaremos la <strong>devolución integral del valor pagado</strong>.'],
      ['Posso fazer despedida de solteira na lancha?', '¿Puedo hacer despedida de soltera en la lancha?'],
      ['<strong>Sim!</strong> A despedida de solteira na lancha é uma das nossas experiências mais populares.', '<strong>¡Sí!</strong> La despedida de soltera en la lancha es una de nuestras experiencias más populares.'],
      ['Oferecemos kit completo com:', 'Ofrecemos kit completo con:'],
      ['Decoração temática (faixa de noiva, balões, adereços)', 'Decoración temática (banda de novia, globos, accesorios)'],
      ['Open bar com drinks especiais', 'Open bar con drinks especiales'],
      ['Playlist personalizada', 'Playlist personalizada'],
      ['Props para fotos', 'Props para fotos'],
      ['A <strong>WeBoat 390</strong> (até 16 pessoas) é a mais escolhida para despedidas.', 'La <strong>WeBoat 390</strong> (hasta 16 personas) es la más elegida para despedidas.'],
      ['Vocês fazem passeio de Réveillon?', '¿Hacen paseo de Año Nuevo?'],
      ['<strong>Sim!</strong> O Réveillon na lancha é uma experiência única para ver a queima de fogos de Copacabana do mar.', '<strong>¡Sí!</strong> El Año Nuevo en lancha es una experiencia única para ver los fuegos artificiales de Copacabana desde el mar.'],
      ['O passeio tem <strong>5 horas de duração</strong>, com horário sugerido de <strong>21h às 2h</strong> (flexível conforme sua preferência). Horas adicionais são cobradas à parte.', 'El paseo tiene <strong>5 horas de duración</strong>, con horario sugerido de <strong>21h a 2h</strong> (flexible según su preferencia). Horas adicionales se cobran aparte.'],
      ['<strong>Atenção:</strong> As vagas são limitadas e costumam esgotar com meses de antecedência. Reserve o quanto antes!', '<strong>Atención:</strong> Los cupos son limitados y suelen agotarse con meses de anticipación. ¡Reserve lo antes posible!'],
      ['Posso fazer festa de aniversário na lancha?', '¿Puedo hacer fiesta de cumpleaños en la lancha?'],
      ['<strong>Sim!</strong> Aniversário na lancha é uma forma única de comemorar.', '<strong>¡Sí!</strong> Cumpleaños en la lancha es una forma única de celebrar.'],
      ['Oferecemos:', 'Ofrecemos:'],
      ['Decoração personalizada com balões e faixa', 'Decoración personalizada con globos y banda'],
      ['Bolo decorado (opcional)', 'Pastel decorado (opcional)'],
      ['Mesa para bolo e doces', 'Mesa para pastel y dulces'],
      ['O aniversariante pode trazer o próprio bolo sem custo adicional.', 'El cumpleañero puede traer su propio pastel sin costo adicional.'],
      ['Vocês atendem eventos corporativos?', '¿Atienden eventos corporativos?'],
      ['<strong>Sim!</strong> Atendemos empresas para confraternizações, team building, premiações e reuniões executivas.', '<strong>¡Sí!</strong> Atendemos empresas para confraternizaciones, team building, premiaciones y reuniones ejecutivas.'],
      ['Diferenciais para empresas:', 'Ventajas para empresas:'],
      ['Emissão de nota fiscal', 'Emisión de factura'],
      ['Seguro para todos os participantes', 'Seguro para todos los participantes'],
      ['Atendimento dedicado', 'Atención dedicada'],
      ['Personalização completa', 'Personalización completa'],
      ['Lanchas para até 65 pessoas (com parceiros)', 'Lanchas para hasta 65 personas (con socios)'],
      ['Posso contratar DJ, fotógrafo ou barman?', '¿Puedo contratar DJ, fotógrafo o barman?'],
      ['<strong>Sim!</strong> Oferecemos serviços de DJ (R$ 1.500) e fotógrafo (R$ 800). Também temos opções de open bar com barman incluso.', '<strong>¡Sí!</strong> Ofrecemos servicios de DJ (R$ 1.500) y fotógrafo (R$ 800). También tenemos opciones de open bar con barman incluido.'],
      ['<strong>Importante:</strong> Profissionais contratados (DJ, barman, fotógrafo, etc.) são considerados passageiros e contam no limite da embarcação.', '<strong>Importante:</strong> Los profesionales contratados (DJ, barman, fotógrafo, etc.) se consideran pasajeros y cuentan en el límite de la embarcación.'],
      ['Logística', 'Logística'],
      ['Onde fica a Marina da Glória?', '¿Dónde queda la Marina da Glória?'],
      ['A Marina da Glória fica na <strong>Av. Infante Dom Henrique, S/N</strong>, no bairro Glória, Rio de Janeiro.', 'La Marina da Glória queda en <strong>Av. Infante Dom Henrique, S/N</strong>, en el barrio Glória, Río de Janeiro.'],
      ['Localização privilegiada:', 'Ubicación privilegiada:'],
      ['Ao lado do Aeroporto Santos Dumont', 'Al lado del Aeropuerto Santos Dumont'],
      ['Fácil acesso de carro, táxi ou Uber', 'Fácil acceso en auto, taxi o Uber'],
      ['Perto do Aterro do Flamengo', 'Cerca del Aterro do Flamengo'],
      ['<strong>Importante:</strong> Todos os passageiros devem embarcar e desembarcar no mesmo local.', '<strong>Importante:</strong> Todos los pasajeros deben embarcar y desembarcar en el mismo lugar.'],
      ['Tem estacionamento na marina?', '¿Hay estacionamiento en la marina?'],
      ['<strong>Sim!</strong> A Marina da Glória possui estacionamento rotativo controlado pela ESTAPAR. Para um passeio de aproximadamente 5h, o valor fica em torno de <strong>R$ 70</strong>.', '<strong>¡Sí!</strong> La Marina da Glória tiene estacionamiento rotativo controlado por ESTAPAR. Para un paseo de aproximadamente 5h, el valor es de alrededor de <strong>R$ 70</strong>.'],
      ['<em>Os valores podem ser atualizados pela ESTAPAR sem aviso prévio.</em>', '<em>Los valores pueden ser actualizados por ESTAPAR sin aviso previo.</em>'],
      ['Também é possível chegar de táxi, Uber ou transporte público (metrô estação Glória + caminhada).', 'También es posible llegar en taxi, Uber o transporte público (metro estación Glória + caminata).'],
      ['O que devo levar para o passeio?', '¿Qué debo llevar al paseo?'],
      ['Sugerimos levar:', 'Sugerimos llevar:'],
      ['Roupa de banho e troca de roupa', 'Ropa de baño y cambio de ropa'],
      ['<strong>Protetor solar</strong> (bronzeador não é permitido) e óculos de sol', '<strong>Protector solar</strong> (bronceador no está permitido) y lentes de sol'],
      ['Toalha', 'Toalla'],
      ['Bebidas e petiscos (se não contratar serviço)', 'Bebidas y bocadillos (si no contrata servicio)'],
      ['Câmera ou celular para fotos', 'Cámara o celular para fotos'],
      ['<strong>Atenção:</strong> Não nos responsabilizamos por objetos pessoais deixados a bordo.', '<strong>Atención:</strong> No nos responsabilizamos por objetos personales dejados a bordo.'],
      ['Crianças, Pets e Acessibilidade', 'Niños, Mascotas y Accesibilidad'],
      ['Posso levar crianças no passeio?', '¿Puedo llevar niños al paseo?'],
      ['<strong>Sim!</strong> Não há restrição de idade para crianças.', '<strong>¡Sí!</strong> No hay restricción de edad para niños.'],
      ['Pedimos apenas que os responsáveis:', 'Solo pedimos que los responsables:'],
      ['Atentem-se às regras do briefing inicial', 'Presten atención a las reglas del briefing inicial'],
      ['Obedeçam as orientações do comandante da embarcação', 'Sigan las orientaciones del capitán de la embarcación'],
      ['Sugerimos o uso de <strong>coletes recreativos infantis</strong> para entrar no mar. Todas as crianças contam no limite de passageiros da embarcação.', 'Sugerimos el uso de <strong>chalecos recreativos infantiles</strong> para entrar al mar. Todos los niños cuentan en el límite de pasajeros de la embarcación.'],
      ['Posso levar cachorro na lancha?', '¿Puedo llevar perro a la lancha?'],
      ['Permitimos <strong>cachorros de pequeno porte</strong> sem necessidade de consulta prévia.', 'Permitimos <strong>perros de pequeño porte</strong> sin necesidad de consulta previa.'],
      ['Para cães de <strong>médio e grande porte</strong>, é necessário consultar nossa equipe pelo WhatsApp antes de reservar.', 'Para perros de <strong>mediano y gran porte</strong>, es necesario consultar con nuestro equipo por WhatsApp antes de reservar.'],
      ['Gestantes podem fazer o passeio?', '¿Las embarazadas pueden hacer el paseo?'],
      ['<strong>Sim!</strong> Não há restrição para gestantes.', '<strong>¡Sí!</strong> No hay restricción para embarazadas.'],
      ['Recomendamos, porém, optar por <strong>roteiros mais abrigados</strong>, como:', 'Recomendamos, sin embargo, optar por <strong>rutas más protegidas</strong>, como:'],
      ['<strong>Mureta da Urca</strong> - Navegação tranquila na Baía de Guanabara', '<strong>Mureta da Urca</strong> - Navegación tranquila en la Bahía de Guanabara'],
      ['<strong>Praia Vermelha</strong> - Águas calmas e paradas relaxantes', '<strong>Praia Vermelha</strong> - Aguas calmas y paradas relajantes'],
      ['As lanchas são acessíveis para cadeirantes?', '¿Las lanchas son accesibles para sillas de ruedas?'],
      ['Nossas embarcações <strong>não possuem acessibilidade específica</strong> para cadeirantes e pessoas com mobilidade reduzida.', 'Nuestras embarcaciones <strong>no poseen accesibilidad específica</strong> para sillas de ruedas y personas con movilidad reducida.'],
      ['Apesar disso, já recebemos diversos clientes com essas condições. Nossos colaboradores, junto com familiares e amigos, podem ajudar no embarque e durante o passeio.', 'A pesar de eso, ya hemos recibido diversos clientes con estas condiciones. Nuestros colaboradores, junto con familiares y amigos, pueden ayudar en el embarque y durante el paseo.'],
      ['<strong>Importante:</strong> O acesso ao banheiro a bordo é bem limitado, especialmente para cadeirantes.', '<strong>Importante:</strong> El acceso al baño a bordo es bastante limitado, especialmente para sillas de ruedas.'],
      ['Políticas e Regras', 'Políticas y Reglas'],
      ['Quais são as regras de uso da embarcação?', '¿Cuáles son las reglas de uso de la embarcación?'],
      ['Nossas embarcações são destinadas a <strong>atividades de turismo náutico e lazer familiar</strong>.', 'Nuestras embarcaciones están destinadas a <strong>actividades de turismo náutico y ocio familiar</strong>.'],
      ['Qualquer uso indevido, como práticas ilícitas, consumo de drogas ou atos indecorosos, resultará na <strong>interrupção imediata do passeio</strong> e possíveis ações legais.', 'Cualquier uso indebido, como prácticas ilícitas, consumo de drogas o actos indecorosos, resultará en la <strong>interrupción inmediata del paseo</strong> y posibles acciones legales.'],
      ['Vocês usam fotos do passeio para divulgação?', '¿Usan fotos del paseo para difusión?'],
      ['Ao contratar nossos serviços, o cliente <strong>autoriza o uso de imagens</strong> do passeio para fins de divulgação em nossas redes sociais e materiais promocionais.', 'Al contratar nuestros servicios, el cliente <strong>autoriza el uso de imágenes</strong> del paseo con fines de difusión en nuestras redes sociales y materiales promocionales.'],
      ['Se preferir que suas fotos não sejam utilizadas, basta informar nossa equipe.', 'Si prefiere que sus fotos no sean utilizadas, basta informar a nuestro equipo.'],
      ['A lancha pode atracar em outros barcos?', '¿La lancha puede atracar junto a otros barcos?'],
      ['<strong>Não.</strong> A embarcação contratada não pode atracar ao lado de outros barcos por questões de segurança e regulamentação.', '<strong>No.</strong> La embarcación contratada no puede atracar junto a otros barcos por cuestiones de seguridad y regulación.'],
      ['Qual o horário de atendimento?', '¿Cuál es el horario de atención?'],
      ['<strong>Atendimento comercial:</strong> 8h às 20h (para reservas e informações)', '<strong>Horario comercial:</strong> 8h a 20h (para reservas e información)'],
      ['<strong>Suporte para clientes em passeio:</strong> 24 horas', '<strong>Soporte para clientes en paseo:</strong> 24 horas'],
      ['Ainda tem dúvidas?', '¿Aún tiene preguntas?'],
      ['Nossa equipe está pronta para ajudar! Entre em contato pelo WhatsApp.', '¡Nuestro equipo está listo para ayudar! Contáctenos por WhatsApp.'],
      ['Falar via WhatsApp', 'Chatear por WhatsApp'],
      ['Ir para Contato', 'Ir a Contacto'],
      // CTA section
      ['Nossa equipe está pronta para esclarecer qualquer questão e ajudar você a planejar o passeio perfeito.', 'Nuestro equipo está listo para aclarar cualquier pregunta y ayudarle a planificar el paseo perfecto.'],
      ['Última atualização: Fevereiro 2026', 'Última actualización: Febrero 2026'],
    ],
  },
  {
    ptPath: 'contato/index.html',
    esPath: 'es/contacto/index.html',
    title: 'Contáctenos | WeBoat Brasil - Alquiler de Lanchas Río',
    description: 'Contacte con WeBoat Brasil para alquiler de lanchas en Río de Janeiro. WhatsApp, teléfono, email.',
    keywords: 'contacto weboat, weboat teléfono, weboat whatsapp',
    waMessage: '¡Hola! Me gustaría ponerme en contacto con WeBoat Brasil. [via site - es]',
    css: 'contato',
      contentBlocks: [
      // Schema.org ContactPage description (JSON-LD, not protected)
      ['Entre em contato com a WeBoat Brasil para alugar uma lancha no Rio de Janeiro.', 'Contacte con WeBoat Brasil para alquilar una lancha en Río de Janeiro.'],
      // Schema.org OfferCatalog description (JSON-LD)
      ['Lanchas de 10 a 65 pessoas, próprias e parceiras, com combustível, marinheiro e seguro inclusos', 'Lanchas de 10 a 65 personas, propias y asociadas, con combustible, marinero y seguro incluidos'],
      // title attribute (NOT protected by translateContent)
      ['Localização da WeBoat Brasil na Marina da Glória', 'Ubicación de WeBoat Brasil en la Marina da Glória'],
      ['Fale Conosco', 'Contáctenos'],
      // Post-link-replacement versions (ES URLs already in place when contentBlocks run)
      ['Estamos prontos para ajudar você a planejar o passeio de lancha perfeito no Rio de Janeiro. Confira <a href="/es/como-funciona/">como funciona o processo de reserva</a>.', 'Estamos listos para ayudarle a planificar el paseo en lancha perfecto en Río de Janeiro. Consulte <a href="/es/como-funciona/">cómo funciona el proceso de reserva</a>.'],
      ['Entre em Contato', 'Póngase en Contacto'],
      ['O jeito mais rápido de falar conosco é pelo WhatsApp. Respondemos em poucos minutos durante o horário de atendimento. Dúvidas frequentes? Consulte nosso <a href="/es/preguntas-frecuentes/">FAQ completo</a>.', 'La forma más rápida de comunicarse con nosotros es por WhatsApp. Respondemos en pocos minutos durante el horario de atención. ¿Preguntas frecuentes? Consulte nuestro <a href="/es/preguntas-frecuentes/">FAQ completo</a>.'],
      ['WhatsApp (Preferencial)', 'WhatsApp (Preferencial)'],
      ['Resposta em minutos', 'Respuesta en minutos'],
      ['Telefone', 'Teléfono'],
      ['Ligações e chamadas de voz', 'Llamadas y llamadas de voz'],
      ['Endereço', 'Dirección'],
      ['Horários de Atendimento', 'Horarios de Atención'],
      ['Todos os dias', 'Todos los días'],
      // IMPORTANT: Full FAQ answer must come BEFORE short 'Suporte para clientes' to avoid substring corruption
      ['<strong>Atendimento comercial:</strong> 8h às 20h (reservas e informações). <strong>Suporte para clientes em passeio:</strong> 24 horas. Mensagens fora do horário serão respondidas no próximo dia útil.', '<strong>Horario comercial:</strong> 8h a 20h (reservas e información). <strong>Soporte para clientes en paseo:</strong> 24 horas. Mensajes fuera del horario serán respondidos el próximo día hábil.'],
      ['Atendimento comercial: 8h às 20h (reservas e informações). Suporte para clientes em passeio: 24 horas. Mensagens fora do horário serão respondidas no próximo dia útil.', 'Horario comercial: 8h a 20h (reservas e información). Soporte para clientes en paseo: 24 horas. Mensajes fuera del horario serán respondidos el próximo día hábil.'],
      ['Suporte para clientes', 'Soporte para clientes'],
      ['24 horas', '24 horas'],
      ['Envie sua Mensagem', 'Envíe su Mensaje'],
      ['Preencha o formulário abaixo e entraremos em contato o mais rápido possível.', 'Complete el formulario a continuación y nos pondremos en contacto lo antes posible.'],
      ['Seu nome completo', 'Su nombre completo'],
      ['Assunto', 'Asunto'],
      ['Selecione', 'Seleccione'],
      ['Solicitar Orçamento', 'Solicitar Presupuesto'],
      ['Fazer Reserva', 'Hacer Reserva'],
      ['Tirar Dúvida', 'Hacer una Pregunta'],
      ['Despedida de Solteira', 'Despedida de Soltera'],
      ['Evento Corporativo', 'Evento Corporativo'],
      ['Outro', 'Otro'],
      ['Data Desejada', 'Fecha Deseada'],
      ['Número de Pessoas', 'Número de Personas'],
      ['2 a 5 pessoas', '2 a 5 personas'],
      ['6 a 10 pessoas', '6 a 10 personas'],
      ['11 a 15 pessoas', '11 a 15 personas'],
      ['16 a 22 pessoas', '16 a 22 personas'],
      ['23 a 40 pessoas', '23 a 40 personas'],
      ['41 a 65 pessoas', '41 a 65 personas'],
      ['Mensagem', 'Mensaje'],
      ['Conte-nos mais sobre o que você está buscando...', 'Cuéntenos más sobre lo que está buscando...'],
      ['Enviar Mensagem', 'Enviar Mensaje'],
      ['Ao enviar, você concorda com nossa <a href="#">Política de Privacidade</a>.', 'Al enviar, usted acepta nuestra <a href="/es/politica-de-privacidad/">Política de Privacidad</a>.'],
      ['Nossa Localização', 'Nuestra Ubicación'],
      ['Estamos na Marina da Glória, uma das marinas mais tradicionais do Rio de Janeiro, com vista privilegiada para o Pão de Açúcar. Conheça todas as <a href="/es/areas-de-servicio/">áreas atendidas pelos nossos passeios</a>.', 'Estamos en la Marina da Glória, una de las marinas más tradicionales de Río de Janeiro, con vista privilegiada al Pan de Azúcar. Conozca todas las <a href="/es/areas-de-servicio/">áreas atendidas por nuestros paseos</a>.'],
      ['Como Chegar', 'Cómo Llegar'],
      ['De Carro', 'En Auto'],
      ['Acesso fácil pela Av. Infante Dom Henrique. Estacionamento disponível na marina.', 'Fácil acceso por la Av. Infante Dom Henrique. Estacionamiento disponible en la marina.'],
      ['Táxi / Uber', 'Taxi / Uber'],
      ['Peça para descer na entrada da Marina da Glória. Fica ao lado do Aeroporto Santos Dumont.', 'Pida que lo dejen en la entrada de la Marina da Glória. Queda al lado del Aeropuerto Santos Dumont.'],
      ['Metrô', 'Metro'],
      ['Estação Glória (Linha 1). De lá, são aproximadamente 15 minutos de caminhada pelo Aterro.', 'Estación Glória (Línea 1). Desde allí, son aproximadamente 15 minutos caminando por el Aterro.'],
      ['Como entrar em contato com a WeBoat Brasil?', '¿Cómo contactar a WeBoat Brasil?'],
      ['A forma mais rápida de contato com a WeBoat Brasil é pelo <strong>WhatsApp (21) 97772-4114</strong>. O atendimento funciona todos os dias das 8h às 20h, com suporte 24 horas para clientes com reserva. Também é possível ligar ou enviar mensagem pelo formulário do site.', 'La forma más rápida de contacto con WeBoat Brasil es por <strong>WhatsApp (21) 97772-4114</strong>. La atención funciona todos los días de 8h a 20h, con soporte 24 horas para clientes con reserva. También es posible llamar o enviar mensaje por el formulario del sitio.'],
      ['Onde fica a WeBoat Brasil?', '¿Dónde queda WeBoat Brasil?'],
      ['A WeBoat Brasil fica na <strong>Marina da Glória, Loja 06</strong>, no bairro da Glória, Rio de Janeiro (Av. Infante Dom Henrique, S/N, CEP 20021-140). A marina fica ao lado do Aeroporto Santos Dumont, com acesso por carro, táxi/Uber ou metrô (estação Glória, Linha 1).', 'WeBoat Brasil queda en la <strong>Marina da Glória, Tienda 06</strong>, en el barrio Glória, Río de Janeiro (Av. Infante Dom Henrique, S/N, CEP 20021-140). La marina queda al lado del Aeropuerto Santos Dumont, con acceso en auto, taxi/Uber o metro (estación Glória, Línea 1).'],
      ['Como reservar um passeio de lancha na WeBoat?', '¿Cómo reservar un paseo en lancha en WeBoat?'],
      ['Para reservar, envie uma mensagem pelo WhatsApp informando data, número de pessoas e ocasião. A equipe recomenda a melhor lancha e roteiro. A reserva é confirmada com 50% de sinal via PIX, cartão ou transferência. Cancelamentos até 48h antes têm reembolso integral.', 'Para reservar, envíe un mensaje por WhatsApp informando fecha, número de personas y ocasión. El equipo recomienda la mejor lancha y ruta. La reserva se confirma con 50% de seña vía PIX, tarjeta o transferencia. Cancelaciones hasta 48h antes tienen reembolso integral.'],
      ['Pode Confiar', 'Puede Confiar'],
      ['Atendimento Nota 5 Estrelas', 'Atención 5 Estrellas'],
      ['Nosso compromisso é oferecer a melhor experiência desde o primeiro contato.', 'Nuestro compromiso es ofrecer la mejor experiencia desde el primer contacto.'],
      ['Dúvidas sobre Reservas', 'Preguntas sobre Reservas'],
      ['Como faço para reservar uma lancha?', '¿Cómo reservo una lancha?'],
      ['A reserva é simples! Entre em contato pelo <strong>WhatsApp (21) 97772-4114</strong>, escolha a lancha e data desejada, e pague um sinal de <strong>50%</strong> para confirmar. O restante deve ser pago até o momento do embarque.', '¡La reserva es simple! Contáctenos por <strong>WhatsApp (21) 97772-4114</strong>, elija la lancha y fecha deseada, y pague una seña del <strong>50%</strong> para confirmar. El resto debe pagarse hasta el momento del embarque.'],
      ['Quais formas de pagamento são aceitas?', '¿Qué formas de pago se aceptan?'],
      ['<strong>PIX e transferência bancária</strong> são as formas preferenciais, sem taxas adicionais. Também aceitamos <strong>cartão de crédito</strong> (até 12x com juros) e <strong>débito</strong>, com taxas da operadora repassadas.', '<strong>PIX y transferencia bancaria</strong> son las formas preferenciales, sin tasas adicionales. También aceptamos <strong>tarjeta de crédito</strong> (hasta 12 cuotas con intereses) y <strong>débito</strong>, con tasas de la operadora trasladadas.'],
      ['Com quanto tempo de antecedência devo reservar?', '¿Con cuánta anticipación debo reservar?'],
      ['Não há tempo mínimo ou máximo. Porém, em <strong>períodos de alta procura</strong> (verão, feriados, réveillon), recomendamos reservar com pelo menos <strong>30 dias de antecedência</strong> para garantir as melhores opções.', 'No hay tiempo mínimo o máximo. Sin embargo, en <strong>períodos de alta demanda</strong> (verano, feriados, Año Nuevo), recomendamos reservar con al menos <strong>30 días de anticipación</strong> para asegurar las mejores opciones.'],
      ['Vocês respondem fora do horário de atendimento?', '¿Responden fuera del horario de atención?'],
      // NOTE: Full FAQ answer moved to top of contacto contentBlocks (before 'Suporte para clientes' short block)
      ['Siga a WeBoat Brasil', 'Siga a WeBoat Brasil'],
      // Schema.org FAQ answers (JSON-LD versions without <strong> tags)
      ['A reserva é simples! Entre em contato pelo WhatsApp (21) 97772-4114, escolha a lancha e data desejada, e pague um sinal de 50% para confirmar. O restante deve ser pago até o momento do embarque.', '¡La reserva es simple! Contáctenos por WhatsApp (21) 97772-4114, elija la lancha y fecha deseada, y pague una seña del 50% para confirmar. El resto debe pagarse hasta el momento del embarque.'],
      ['PIX e transferência bancária são as formas preferenciais, sem taxas adicionais. Também aceitamos cartão de crédito (até 12x com juros) e débito, com taxas da operadora repassadas.', 'PIX y transferencia bancaria son las formas preferenciales, sin tasas adicionales. También aceptamos tarjeta de crédito (hasta 12 cuotas con intereses) y débito, con tasas de la operadora trasladadas.'],
      ['Não há tempo mínimo ou máximo. Porém, em períodos de alta procura (verão, feriados, réveillon), recomendamos reservar com pelo menos 30 dias de antecedência para garantir as melhores opções.', 'No hay tiempo mínimo o máximo. Sin embargo, en períodos de alta demanda (verano, feriados, Año Nuevo), recomendamos reservar con al menos 30 días de anticipación para asegurar las mejores opciones.'],
      // NOTE: Schema JSON-LD version also moved to top of contacto contentBlocks
      // Visible "8h às 20h" standalone
      ['8h às 20h', '8h a 20h'],
      // Churrasco, open bar, decoração e mais description in Schema.org
      ['Churrasco, open bar, decoração, DJ e fotógrafo para passeios de lancha', 'Asado, open bar, decoración, DJ y fotógrafo para paseos en lancha'],
      ['Última atualização: Fevereiro 2026', 'Última actualización: Febrero 2026'],
    ],
  },
  {
    ptPath: 'como-funciona/index.html',
    esPath: 'es/como-funciona/index.html',
    title: 'Cómo Funciona - Reserve Su Paseo en Lancha | WeBoat Brasil',
    description: 'Aprenda cómo reservar un paseo en lancha con WeBoat Brasil. Proceso simple de 3 pasos.',
    keywords: 'como alquilar lancha rio, proceso alquiler lancha, reservar paseo lancha rio',
    waMessage: '¡Hola! Me gustaría entender cómo funciona el alquiler de lanchas. [via site - es]',
    css: 'ocasioes',
    contentBlocks: [
      ['Como Funciona o Aluguel de Lancha', 'Cómo Funciona el Alquiler de Lancha'],
      ['Processo simples e transparente em 5 passos. Do primeiro contato até o dia do seu passeio, nossa equipe cuida de tudo para você só se preocupar em aproveitar.', 'Proceso simple y transparente en 5 pasos. Desde el primer contacto hasta el día de su paseo, nuestro equipo se encarga de todo para que usted solo se preocupe por disfrutar.'],
      ['Processo simples e transparente em 5 passos. Do primeiro contato até o dia do seu passeio,\n          nossa equipe cuida de tudo para você só se preocupar em aproveitar.', 'Proceso simple y transparente en 5 pasos. Desde el primer contacto hasta el día de su paseo,\n          nuestro equipo se encarga de todo para que usted solo se preocupe por disfrutar.'],
      // Schema.org HowTo name and description (JSON-LD, not protected — FULL text)
      ['Como Alugar uma Lancha no Rio de Janeiro', 'Cómo Alquilar una Lancha en Río de Janeiro'],
      ['Guia completo em 5 passos para alugar uma lancha na WeBoat Brasil, com saída da Marina da Glória no Rio de Janeiro. Do primeiro contato pelo WhatsApp até o dia do passeio. Lanchas de 10 a 65 pessoas, a partir de R$ 2.300.', 'Guía completa en 5 pasos para alquilar una lancha en WeBoat Brasil, con salida de la Marina da Glória en Río de Janeiro. Desde el primer contacto por WhatsApp hasta el día del paseo. Lanchas de 10 a 65 personas, desde R$ 2.300.'],
      // Schema.org HowTo supply/tool entries (JSON-LD, not protected)
      ['Documento de identidade (RG ou CNH)', 'Documento de identidad (RG o DNI)'],
      ['Bebidas e petiscos (opcional)', 'Bebidas y bocadillos (opcional)'],
      ['WhatsApp para contato', 'WhatsApp para contacto'],
      ['Escolha a lancha e roteiro', 'Elija la lancha y ruta'],
      // Schema.org HowTo steps (JSON-LD versions without <strong> tags)
      ['Envie uma mensagem pelo WhatsApp (21) 97772-4114 informando a data desejada, número de pessoas e ocasião. Nossa equipe responde em minutos.', 'Envíe un mensaje por WhatsApp al (21) 97772-4114 informando la fecha deseada, número de personas y ocasión. Nuestro equipo responde en minutos.'],
      ['Com base no seu grupo e preferências, recomendamos a melhor lancha e roteiro. Temos 5 lanchas próprias e 21 parceiras para grupos de 10 a 65 pessoas.', 'Con base en su grupo y preferencias, recomendamos la mejor lancha y ruta. Tenemos 5 lanchas propias y 21 asociadas para grupos de 10 a 65 personas.'],
      ['Confirme a reserva pagando 50% de sinal via PIX, cartão ou transferência. O restante é pago no dia do passeio. Cancelamento com reembolso até 48h antes.', 'Confirme la reserva pagando 50% de seña vía PIX, tarjeta o transferencia. El resto se paga el día del paseo. Cancelación con reembolso hasta 48h antes.'],
      ['No dia do passeio, chegue 15 minutos antes na Marina da Glória (Av. Infante Dom Henrique, S/N, Loja 06). Estacionamento disponível no local.', 'El día del paseo, llegue 15 minutos antes a la Marina da Glória (Av. Infante Dom Henrique, S/N, Tienda 06). Estacionamiento disponible en el lugar.'],
      ['Embarque na lancha com seu grupo, conecte sua playlist no som Bluetooth e aproveite o mar do Rio de Janeiro com total conforto e segurança.', 'Embarque en la lancha con su grupo, conecte su playlist al sonido Bluetooth y disfrute del mar de Río de Janeiro con total confort y seguridad.'],
      // Schema.org FAQ answers (JSON-LD versions without <strong> tags)
      ['A reserva é feita em minutos pelo WhatsApp. Após escolher a lancha e roteiro, você paga 50% de sinal e a reserva está confirmada. Recomendamos reservar com pelo menos 3 dias de antecedência, especialmente para finais de semana.', 'La reserva se hace en minutos por WhatsApp. Después de elegir la lancha y ruta, paga 50% de seña y la reserva queda confirmada. Recomendamos reservar con al menos 3 días de anticipación, especialmente para fines de semana.'],
      ['Não. Todas as lanchas da WeBoat incluem um marinheiro habilitado pela Marinha do Brasil. Você só precisa embarcar e aproveitar o passeio.', 'No. Todas las lanchas de WeBoat incluyen un marinero habilitado por la Marina de Brasil. Solo necesita embarcar y disfrutar del paseo.'],
      ['Sim. Cancelamentos feitos até 48 horas antes do passeio têm reembolso integral do sinal. Em caso de mau tempo, reagendamos sem custo adicional.', 'Sí. Cancelaciones hechas hasta 48 horas antes del paseo tienen reembolso integral de la seña. En caso de mal tiempo, reprogramamos sin costo adicional.'],
      ['Leve protetor solar, roupa de banho, toalha e suas bebidas/petiscos (coolers inclusos na lancha). A lancha já tem tapete flutuante, macarrões e som Bluetooth.', 'Lleve protector solar, ropa de baño, toalla y sus bebidas/bocadillos (coolers incluidos en la lancha). La lancha ya tiene tapete flotante, fideos y sonido Bluetooth.'],
      // Schema.org LocalBusiness description
      ['Aluguel de lanchas no Rio de Janeiro. Passeios privativos com conforto e segurança.', 'Alquiler de lanchas en Río de Janeiro. Paseos privados con confort y seguridad.'],
      ['Como alugar uma lancha no Rio de Janeiro?', '¿Cómo alquilar una lancha en Río de Janeiro?'],
      ['<strong>O aluguel de lancha na WeBoat funciona em 5 passos simples: 1) Contato pelo WhatsApp, 2) Escolha da lancha e roteiro, 3) Reserva com 50% de sinal, 4) Chegada na Marina da Glória, 5) Embarque e passeio.</strong>\n            Todo o processo leva menos de 30 minutos e você pode reservar com antecedência ou até no mesmo dia (sujeito a disponibilidade).', '<strong>El alquiler de lancha en WeBoat funciona en 5 pasos simples: 1) Contacto por WhatsApp, 2) Elección de lancha y ruta, 3) Reserva con 50% de seña, 4) Llegada a la Marina da Glória, 5) Embarque y paseo.</strong>\n            Todo el proceso toma menos de 30 minutos y puede reservar con anticipación o incluso el mismo día (sujeto a disponibilidad).'],
      ['<strong>O aluguel de lancha na WeBoat funciona em 5 passos simples: 1) Contato pelo WhatsApp, 2) Escolha da lancha e roteiro, 3) Reserva com 50% de sinal, 4) Chegada na Marina da Glória, 5) Embarque e passeio.</strong> Todo o processo leva menos de 30 minutos e você pode reservar com antecedência ou até no mesmo dia (sujeito a disponibilidade).', '<strong>El alquiler de lancha en WeBoat funciona en 5 pasos simples: 1) Contacto por WhatsApp, 2) Elección de lancha y ruta, 3) Reserva con 50% de seña, 4) Llegada a la Marina da Glória, 5) Embarque y paseo.</strong> Todo el proceso toma menos de 30 minutos y puede reservar con anticipación o incluso el mismo día (sujeto a disponibilidad).'],
      ['Entre em contato pelo WhatsApp', 'Contáctenos por WhatsApp'],
      // Multiline version (matches PT source whitespace: newline + 14 spaces)
      ['<strong>Envie uma mensagem para (21) 97772-4114 informando a data desejada, número de pessoas e ocasião (aniversário, despedida, passeio em família, etc.).</strong>\n              Nossa equipe responde em minutos e já envia sugestões de lanchas e roteiros para seu grupo.', '<strong>Envíe un mensaje al (21) 97772-4114 informando la fecha deseada, número de personas y ocasión (cumpleaños, despedida, paseo en familia, etc.).</strong>\n              Nuestro equipo responde en minutos y ya envía sugerencias de lanchas y rutas para su grupo.'],
      ['<strong>Envie uma mensagem para (21) 97772-4114 informando a data desejada, número de pessoas e ocasião (aniversário, despedida, passeio em família, etc.).</strong> Nossa equipe responde em minutos e já envia sugestões de lanchas e roteiros para seu grupo.', '<strong>Envíe un mensaje al (21) 97772-4114 informando la fecha deseada, número de personas y ocasión (cumpleaños, despedida, paseo en familia, etc.).</strong> Nuestro equipo responde en minutos y ya envía sugerencias de lanchas y rutas para su grupo.'],
      ['Atendimento todos os dias das 8h às 20h', 'Atención todos los días de 8h a 20h'],
      ['Resposta em até 5 minutos', 'Respuesta en hasta 5 minutos'],
      ['Sem compromisso - tire suas dúvidas primeiro', 'Sin compromiso - haga sus preguntas primero'],
      ['Iniciar Conversa', 'Iniciar Conversación'],
      ['Escolha a lancha e roteiro ideais', 'Elija la lancha y ruta ideales'],
      ['<strong>Com base no tamanho do seu grupo e preferências, recomendamos a melhor combinação de lancha e roteiro. Temos 5 lanchas próprias (10-22 pessoas) e 21 parceiras (até 65 pessoas).</strong>\n              Você recebe fotos, vídeos e todas as informações para decidir com segurança.', '<strong>Con base en el tamaño de su grupo y preferencias, recomendamos la mejor combinación de lancha y ruta. Tenemos 5 lanchas propias (10-22 personas) y 21 asociadas (hasta 65 personas).</strong>\n              Recibe fotos, videos y toda la información para decidir con seguridad.'],
      ['<strong>Com base no tamanho do seu grupo e preferências, recomendamos a melhor combinação de lancha e roteiro. Temos 5 lanchas próprias (10-22 pessoas) e 21 parceiras (até 65 pessoas).</strong> Você recebe fotos, vídeos e todas as informações para decidir com segurança.', '<strong>Con base en el tamaño de su grupo y preferencias, recomendamos la mejor combinación de lancha y ruta. Tenemos 5 lanchas propias (10-22 personas) y 21 asociadas (hasta 65 personas).</strong> Recibe fotos, videos y toda la información para decidir con seguridad.'],
      ['Lanchas Próprias', 'Lanchas Propias'],
      ['5 lanchas de 10 a 22 pessoas. Prioridade no agendamento e atendimento direto da equipe WeBoat.', '5 lanchas de 10 a 22 personas. Prioridad en la programación y atención directa del equipo WeBoat.'],
      ['Ver lanchas', 'Ver lanchas'],
      ['Roteiros', 'Rutas'],
      ['6 roteiros de 5 horas. Da Urca às Ilhas Cagarras, passando por Copacabana e Niterói.', '6 rutas de 5 horas. Desde Urca hasta Ilhas Cagarras, pasando por Copacabana y Niterói.'],
      ['Ver roteiros', 'Ver rutas'],
      ['Reserve com 50% de sinal', 'Reserve con 50% de seña'],
      ['<strong>Confirme sua reserva pagando 50% do valor via PIX, cartão de crédito ou transferência bancária. O restante é pago no dia do passeio.</strong>\n              Você recebe confirmação por WhatsApp com todos os detalhes: data, horário, lancha e ponto de encontro.', '<strong>Confirme su reserva pagando 50% del valor vía PIX, tarjeta de crédito o transferencia bancaria. El resto se paga el día del paseo.</strong>\n              Recibe confirmación por WhatsApp con todos los detalles: fecha, horario, lancha y punto de encuentro.'],
      ['<strong>Confirme sua reserva pagando 50% do valor via PIX, cartão de crédito ou transferência bancária. O restante é pago no dia do passeio.</strong> Você recebe confirmação por WhatsApp com todos os detalhes: data, horário, lancha e ponto de encontro.', '<strong>Confirme su reserva pagando 50% del valor vía PIX, tarjeta de crédito o transferencia bancaria. El resto se paga el día del paseo.</strong> Recibe confirmación por WhatsApp con todos los detalles: fecha, horario, lancha y punto de encuentro.'],
      ['<strong>PIX:</strong> Pagamento instantâneo', '<strong>PIX:</strong> Pago instantáneo'],
      ['<strong>Cartão:</strong> Até 12x (taxas do cartão)', '<strong>Tarjeta:</strong> Hasta 12 cuotas (tasas de la tarjeta)'],
      ['<strong>Transferência:</strong> TED ou DOC', '<strong>Transferencia:</strong> TED o DOC'],
      ['<strong>Política de cancelamento:</strong> Cancelamentos até 48h antes têm reembolso integral. Em caso de mau tempo, reagendamos sem custo.', '<strong>Política de cancelación:</strong> Cancelaciones hasta 48h antes tienen reembolso integral. En caso de mal tiempo, reprogramamos sin costo.'],
      ['Chegue na Marina da Glória', 'Llegue a la Marina da Glória'],
      ['<strong>No dia do passeio, chegue 15 minutos antes do horário marcado na Marina da Glória (Av. Infante Dom Henrique, S/N, Loja 06 - Glória, Rio de Janeiro).</strong>\n              Estacionamento pago disponível no local. Acesso fácil pelo Aterro do Flamengo.', '<strong>El día del paseo, llegue 15 minutos antes del horario programado a la Marina da Glória (Av. Infante Dom Henrique, S/N, Tienda 06 - Glória, Río de Janeiro).</strong>\n              Estacionamiento pago disponible en el lugar. Fácil acceso por el Aterro do Flamengo.'],
      ['<strong>No dia do passeio, chegue 15 minutos antes do horário marcado na Marina da Glória (Av. Infante Dom Henrique, S/N, Loja 06 - Glória, Rio de Janeiro).</strong> Estacionamento pago disponível no local. Acesso fácil pelo Aterro do Flamengo.', '<strong>El día del paseo, llegue 15 minutos antes del horario programado a la Marina da Glória (Av. Infante Dom Henrique, S/N, Tienda 06 - Glória, Río de Janeiro).</strong> Estacionamiento pago disponible en el lugar. Fácil acceso por el Aterro do Flamengo.'],
      ['Estacionamento pago no local', 'Estacionamiento pago en el lugar'],
      ['Chegue 15 minutos antes', 'Llegue 15 minutos antes'],
      ['Aproveite seu passeio!', '¡Disfrute su paseo!'],
      // Multiline version (matches PT source whitespace)
      ['<strong>Embarque na lancha com seu grupo, conecte sua playlist no som Bluetooth e aproveite o mar do Rio de Janeiro. O marinheiro cuida da navegação enquanto você relaxa.</strong>\n              Todas as lanchas têm tapete flutuante, macarrões, coolers e equipamentos de segurança homologados.', '<strong>Embarque en la lancha con su grupo, conecte su playlist al sonido Bluetooth y disfrute del mar de Río de Janeiro. El marinero se encarga de la navegación mientras usted se relaja.</strong>\n              Todas las lanchas tienen tapete flotante, fideos, coolers y equipos de seguridad homologados.'],
      ['<strong>Embarque na lancha com seu grupo, conecte sua playlist no som Bluetooth e aproveite o mar do Rio de Janeiro. O marinheiro cuida da navegação enquanto você relaxa.</strong> Todas as lanchas têm tapete flutuante, macarrões, coolers e equipamentos de segurança homologados.', '<strong>Embarque en la lancha con su grupo, conecte su playlist al sonido Bluetooth y disfrute del mar de Río de Janeiro. El marinero se encarga de la navegación mientras usted se relaja.</strong> Todas las lanchas tienen tapete flotante, fideos, coolers y equipos de seguridad homologados.'],
      ['O que está incluso em todo passeio:', 'Lo que está incluido en todo paseo:'],
      ['Combustível para o roteiro', 'Combustible para la ruta'],
      ['Marinheiro habilitado', 'Marinero habilitado'],
      ['Som Bluetooth', 'Sonido Bluetooth'],
      ['Coolers', 'Coolers'],
      ['Tapete flutuante', 'Tapete flotante'],
      ['Coletes salva-vidas', 'Chalecos salvavidas'],
      ['Perguntas Frequentes sobre o Processo', 'Preguntas Frecuentes sobre el Proceso'],
      ['Quanto tempo leva para reservar uma lancha?', '¿Cuánto tiempo toma reservar una lancha?'],
      ['<strong>A reserva é feita em minutos pelo WhatsApp. Após escolher a lancha e roteiro, você paga 50% de sinal e a reserva está confirmada.</strong>\n                    Recomendamos reservar com pelo menos 3 dias de antecedência, especialmente para finais de semana.', '<strong>La reserva se hace en minutos por WhatsApp. Después de elegir la lancha y ruta, paga 50% de seña y la reserva queda confirmada.</strong>\n                    Recomendamos reservar con al menos 3 días de anticipación, especialmente para fines de semana.'],
      ['<strong>A reserva é feita em minutos pelo WhatsApp. Após escolher a lancha e roteiro, você paga 50% de sinal e a reserva está confirmada.</strong> Recomendamos reservar com pelo menos 3 dias de antecedência, especialmente para finais de semana.', '<strong>La reserva se hace en minutos por WhatsApp. Después de elegir la lancha y ruta, paga 50% de seña y la reserva queda confirmada.</strong> Recomendamos reservar con al menos 3 días de anticipación, especialmente para fines de semana.'],
      ['Preciso de habilitação para pilotar a lancha?', '¿Necesito licencia para manejar la lancha?'],
      // Multiline version (matches PT source whitespace: newline + 20 spaces)
      ['<strong>Não. Todas as lanchas da WeBoat incluem um marinheiro habilitado pela Marinha do Brasil.</strong>\n                    Você só precisa embarcar e aproveitar o passeio. O marinheiro cuida de toda a navegação com segurança.', '<strong>No. Todas las lanchas de WeBoat incluyen un marinero habilitado por la Marina de Brasil.</strong>\n                    Solo necesita embarcar y disfrutar del paseo. El marinero se encarga de toda la navegación con seguridad.'],
      ['<strong>Não. Todas as lanchas da WeBoat incluem um marinheiro habilitado pela Marinha do Brasil.</strong> Você só precisa embarcar e aproveitar o passeio. O marinheiro cuida de toda a navegação com segurança.', '<strong>No. Todas las lanchas de WeBoat incluyen un marinero habilitado por la Marina de Brasil.</strong> Solo necesita embarcar y disfrutar del paseo. El marinero se encarga de toda la navegación con seguridad.'],
      ['Posso cancelar a reserva?', '¿Puedo cancelar la reserva?'],
      ['<strong>Sim. Cancelamentos feitos até 48 horas antes do passeio têm reembolso integral do sinal.</strong>\n                    Em caso de mau tempo no dia marcado, reagendamos sem custo adicional. Nossa equipe monitora a previsão e avisa com antecedência.', '<strong>Sí. Cancelaciones hechas hasta 48 horas antes del paseo tienen reembolso integral de la seña.</strong>\n                    En caso de mal tiempo el día programado, reprogramamos sin costo adicional. Nuestro equipo monitorea el pronóstico y avisa con anticipación.'],
      ['<strong>Sim. Cancelamentos feitos até 48 horas antes do passeio têm reembolso integral do sinal.</strong> Em caso de mau tempo no dia marcado, reagendamos sem custo adicional. Nossa equipe monitora a previsão e avisa com antecedência.', '<strong>Sí. Cancelaciones hechas hasta 48 horas antes del paseo tienen reembolso integral de la seña.</strong> En caso de mal tiempo el día programado, reprogramamos sin costo adicional. Nuestro equipo monitorea el pronóstico y avisa con anticipación.'],
      ['O que levar no dia do passeio?', '¿Qué llevar el día del paseo?'],
      ['<strong>Leve protetor solar, roupa de banho, toalha e suas bebidas/petiscos (coolers inclusos na lancha).</strong>\n                    A lancha já tem tapete flutuante, macarrões e som Bluetooth. Gelo não está incluso - você pode comprar na marina.', '<strong>Lleve protector solar, ropa de baño, toalla y sus bebidas/bocadillos (coolers incluidos en la lancha).</strong>\n                    La lancha ya tiene tapete flotante, fideos y sonido Bluetooth. El hielo no está incluido - puede comprarlo en la marina.'],
      ['<strong>Leve protetor solar, roupa de banho, toalha e suas bebidas/petiscos (coolers inclusos na lancha).</strong> A lancha já tem tapete flutuante, macarrões e som Bluetooth. Gelo não está incluso - você pode comprar na marina.', '<strong>Lleve protector solar, ropa de baño, toalla y sus bebidas/bocadillos (coolers incluidos en la lancha).</strong> La lancha ya tiene tapete flotante, fideos y sonido Bluetooth. El hielo no está incluido - puede comprarlo en la marina.'],
      ['Ver Todas as Dúvidas', 'Ver Todas las Preguntas'],
      ['Pronto para Reservar?', '¿Listo para Reservar?'],
      ['Fale com nossa equipe pelo WhatsApp e reserve seu passeio de lancha no Rio de Janeiro.', 'Hable con nuestro equipo por WhatsApp y reserve su paseo en lancha en Río de Janeiro.'],
      ['Reservar pelo WhatsApp', 'Reservar por WhatsApp'],
      ['Ver Lanchas Disponíveis', 'Ver Lanchas Disponibles'],
      ['Última atualização: Fevereiro 2026', 'Última actualización: Febrero 2026'],
    ],
  },
  {
    ptPath: 'areas-atendidas/index.html',
    esPath: 'es/areas-de-servicio/index.html',
    title: 'Áreas de Servicio - Adónde Vamos | WeBoat Brasil',
    description: 'Descubra todas las áreas cubiertas por los paseos de lancha de WeBoat Brasil.',
    keywords: 'áreas paseo lancha rio, adonde va weboat, bahía guanabara áreas lancha',
    waMessage: '¡Hola! Me gustaría información sobre las áreas que cubren. [via site - es]',
    css: 'ocasioes',
    contentBlocks: [
      // Visible FAQ with <strong> + continuation — multiline to match PT source whitespace (newline + 20-space indent)
      ['<strong>A WeBoat Brasil realiza passeios de lancha em diversas áreas do Rio de Janeiro: Mureta da Urca, Praia Vermelha, Copacabana (incluindo Arpoador e Ipanema), Ilhas Cagarras, Itaipu e Camboinhas (Niteroi), e toda a Baia de Guanabara.</strong>\n                    Todos os passeios partem da Marina da Glória e podem ser personalizados conforme sua preferencia.', '<strong>WeBoat Brasil realiza paseos en lancha en diversas áreas de Río de Janeiro: Mureta da Urca, Praia Vermelha, Copacabana (incluyendo Arpoador e Ipanema), Ilhas Cagarras, Itaipu y Camboinhas (Niterói), y toda la Bahía de Guanabara.</strong>\n                    Todos los paseos parten de la Marina da Glória y pueden personalizarse según su preferencia.'],
      // FAQ continuation (non-bold text)
      ['Veja nossos <a href="/es/rutas/">roteiros disponíveis</a> para escolher o melhor para você.', 'Vea nuestras <a href="/es/rutas/">rutas disponibles</a> para elegir la mejor para usted.'],
      ['Onde Navegamos', 'Dónde Navegamos'],
      ['Areas de Passeio de Lancha no Rio de Janeiro', 'Áreas de Paseo en Lancha en Río de Janeiro'],
      // Hero description (multiline version to match PT source whitespace)
      ['Descubra todos os destinos incriveis que você pode explorar em nossos passeios de lancha.\n          Da Urca as Ilhas Cagarras, o Rio de Janeiro e ainda mais bonito visto do mar.', 'Descubra todos los destinos increíbles que puede explorar en nuestros paseos en lancha.\n          Desde Urca hasta Ilhas Cagarras, Río de Janeiro es aún más hermoso visto desde el mar.'],
      ['Descubra todos os destinos incriveis que você pode explorar em nossos passeios de lancha. Da Urca as Ilhas Cagarras, o Rio de Janeiro e ainda mais bonito visto do mar.', 'Descubra todos los destinos increíbles que puede explorar en nuestros paseos en lancha. Desde Urca hasta Ilhas Cagarras, Río de Janeiro es aún más hermoso visto desde el mar.'],
      // Schema.org TouristAttraction descriptions
      ['Ponto de encontro tradicional carioca com águas calmas e vista privilegiada do Pão de Açúcar. Melhor horário: manhã ou fim de tarde. Roteiro a partir de R$ 2.300.', 'Punto de encuentro tradicional carioca con aguas calmas y vista privilegiada del Pan de Azúcar. Mejor horario: mañana o fin de tarde. Ruta desde R$ 2.300.'],
      ['Praia secreta aos pés do Pão de Açúcar, acessível principalmente por barco, ideal para parada de banho. Melhor horário: manhã (águas mais calmas). Roteiro a partir de R$ 2.500.', 'Playa secreta a los pies del Pan de Azúcar, accesible principalmente por barco, ideal para parada de baño. Mejor horario: mañana (aguas más calmas). Ruta desde R$ 2.500.'],
      ['Vista icônica da orla mais famosa do Brasil, passando pelo Arpoador e Ipanema. Melhor horário: fim de tarde (pôr do sol). Roteiro a partir de R$ 3.000.', 'Vista icónica del litoral más famoso de Brasil, pasando por Arpoador e Ipanema. Mejor horario: fin de tarde (puesta de sol). Ruta desde R$ 3.000.'],
      ['Arquipélago em mar aberto com águas cristalinas, ideal para mergulho e natureza preservada. Melhor horário: manhã (mar mais calmo). Roteiro a partir de R$ 3.600.', 'Archipiélago en mar abierto con aguas cristalinas, ideal para buceo y naturaleza preservada. Mejor horario: mañana (mar más calmo). Ruta desde R$ 3.600.'],
      ['Praias de Niterói com águas cristalinas e menos movimento, perfeitas para quem busca exclusividade. Melhor horário: manhã. Roteiro a partir de R$ 3.600.', 'Playas de Niterói con aguas cristalinas y menos movimiento, perfectas para quienes buscan exclusividad. Mejor horario: mañana. Ruta desde R$ 3.600.'],
      ['Navegação completa pela baía com vista para o Cristo Redentor, Ponte Rio-Niterói e Ilha Fiscal. Melhor horário: qualquer período. Roteiro a partir de R$ 4.500.', 'Navegación completa por la bahía con vista al Cristo Redentor, Puente Río-Niterói e Ilha Fiscal. Mejor horario: cualquier período. Ruta desde R$ 4.500.'],
      ['Todas as áreas de passeio de lancha atendidas pela WeBoat Brasil', 'Todas las áreas de paseo en lancha atendidas por WeBoat Brasil'],
      // Schema.org OfferCatalog descriptions
      ['Lanchas de 10 a 65 pessoas, próprias e parceiras, com combustível, marinheiro e seguro inclusos', 'Lanchas de 10 a 65 personas, propias y asociadas, con combustible, marinero y seguro incluidos'],
      ['6 roteiros de 5h pela Baía de Guanabara, Copacabana, Ilhas Cagarras e Niterói', '6 rutas de 5h por la Bahía de Guanabara, Copacabana, Ilhas Cagarras y Niterói'],
      ['Churrasco, open bar, decoração, DJ e fotógrafo para passeios de lancha', 'Asado, open bar, decoración, DJ y fotógrafo para paseos en lancha'],
      ['Lanchas para Aluguel', 'Lanchas para Alquiler'],
      ['Roteiros de Passeio', 'Rutas de Paseo'],
      ['Serviços Extras', 'Servicios Extras'],
      // WhatsApp messages
      ['Ola! Quero fazer um passeio de lancha na Mureta da Urca. Qual a disponibilidade?', '¡Hola! Quiero hacer un paseo en lancha en Mureta da Urca. ¿Cuál es la disponibilidad?'],
      ['Ola! Quero fazer um passeio de lancha na Praia Vermelha. Qual a disponibilidade?', '¡Hola! Quiero hacer un paseo en lancha en Praia Vermelha. ¿Cuál es la disponibilidad?'],
      ['Ola! Quero fazer um passeio de lancha por Copacabana. Qual a disponibilidade?', '¡Hola! Quiero hacer un paseo en lancha por Copacabana. ¿Cuál es la disponibilidad?'],
      ['Ola! Quero fazer um passeio de lancha nas Ilhas Cagarras. Qual a disponibilidade?', '¡Hola! Quiero hacer un paseo en lancha en Ilhas Cagarras. ¿Cuál es la disponibilidad?'],
      ['Ola! Quero fazer um passeio de lancha em Itaipu e Camboinhas. Qual a disponibilidade?', '¡Hola! Quiero hacer un paseo en lancha en Itaipu y Camboinhas. ¿Cuál es la disponibilidad?'],
      ['Ola! Quero fazer um passeio de lancha pela Baia de Guanabara. Qual a disponibilidade?', '¡Hola! Quiero hacer un paseo en lancha por la Bahía de Guanabara. ¿Cuál es la disponibilidad?'],
      ['Ola! Gostaria de ajuda para escolher a melhor area para meu passeio de lancha.', '¡Hola! Me gustaría ayuda para elegir la mejor área para mi paseo en lancha.'],
      // Schema.org FAQ answers (JSON-LD versions without <strong>)
      ['A WeBoat Brasil realiza passeios de lancha em diversas áreas do Rio de Janeiro: Mureta da Urca, Praia Vermelha, Copacabana (incluindo Arpoador e Ipanema), Ilhas Cagarras, Itaipu e Camboinhas (Niteroi), e toda a Baia de Guanabara.', 'WeBoat Brasil realiza paseos en lancha en diversas áreas de Río de Janeiro: Mureta da Urca, Praia Vermelha, Copacabana (incluyendo Arpoador e Ipanema), Ilhas Cagarras, Itaipu y Camboinhas (Niterói), y toda la Bahía de Guanabara.'],
      ['Para primeira vez, recomendamos a Mureta da Urca ou Praia Vermelha. Sao áreas com aguas calmas dentro da Baia de Guanabara, ideais para familias e iniciantes.', 'Para la primera vez, recomendamos Mureta da Urca o Praia Vermelha. Son áreas con aguas calmas dentro de la Bahía de Guanabara, ideales para familias y principiantes.'],
      // <strong> + continuation MUST come BEFORE Schema short version to avoid substring corruption
      ['<strong>Sim! Nossos roteiros podem ser personalizados. A Volta Completa, por exemplo, combina Urca, Copacabana e Ilhas Cagarras em um único passeio de 5 horas.</strong>\n                    Converse com nossa equipe pelo <a href="https://wa.me/5521977724114">WhatsApp</a> para montar o roteiro ideal.', '<strong>¡Sí! Nuestras rutas pueden personalizarse. El Tour Completo, por ejemplo, combina Urca, Copacabana e Ilhas Cagarras en un único paseo de 5 horas.</strong>\n                    Converse con nuestro equipo por <a href="https://wa.me/5521977724114">WhatsApp</a> para armar la ruta ideal.'],
      ['<strong>Sim! Nossos roteiros podem ser personalizados. A Volta Completa, por exemplo, combina Urca, Copacabana e Ilhas Cagarras em um único passeio de 5 horas.</strong> Converse com nossa equipe pelo <a href="https://wa.me/5521977724114">WhatsApp</a> para montar o roteiro ideal.', '<strong>¡Sí! Nuestras rutas pueden personalizarse. El Tour Completo, por ejemplo, combina Urca, Copacabana e Ilhas Cagarras en un único paseo de 5 horas.</strong> Converse con nuestro equipo por <a href="https://wa.me/5521977724114">WhatsApp</a> para armar la ruta ideal.'],
      // Schema FAQ answer (JSON-LD)
      ['Sim! Nossos roteiros podem ser personalizados. A Volta Completa, por exemplo, combina Urca, Copacabana e Ilhas Cagarras em um único passeio de 5 horas.', '¡Sí! Nuestras rutas pueden personalizarse. El Tour Completo, por ejemplo, combina Urca, Copacabana e Ilhas Cagarras en un único paseo de 5 horas.'],
      ['Areas Atendidas', 'Áreas de Servicio'],
      // Alt text (NOT protected by translateContent - alt is not in protection regex)
      ['Passeio de lancha na Mureta da Urca com vista para o Pao de Acucar', 'Paseo en lancha en Mureta da Urca con vista al Pan de Azúcar'],
      ['Passeio de lancha na Praia Vermelha com bondinho do Pao de Acucar', 'Paseo en lancha en Praia Vermelha con teleférico del Pan de Azúcar'],
      ['Passeio de lancha com vista panoramica de Copacabana', 'Paseo en lancha con vista panorámica de Copacabana'],
      ['Passeio de lancha nas Ilhas Cagarras - mergulho em aguas cristalinas', 'Paseo en lancha en Ilhas Cagarras - buceo en aguas cristalinas'],
      ['Passeio de lancha em Itaipu e Camboinhas - praias desertas em Niteroi', 'Paseo en lancha en Itaipu y Camboinhas - playas desiertas en Niterói'],
      ['Passeio de lancha na Mureta da Urca', 'Paseo en lancha en Mureta da Urca'],
      ['Navegação pela Baia de Guanabara com vista para o Cristo Redentor', 'Navegación por la Bahía de Guanabara con vista al Cristo Redentor'],
      // Multiline card descriptions (must match PT source whitespace exactly)
      ['Conhecida como a praia secreta do Rio, a Praia Vermelha e acessivel principalmente por barco.\n              Aos pes do Pao de Acucar, oferece aguas cristalinas e uma experiência única de banho com vista\n              para o bondinho passando acima.', 'Conocida como la playa secreta de Río, Praia Vermelha es accesible principalmente por barco.\n              A los pies del Pan de Azúcar, ofrece aguas cristalinas y una experiencia única de baño con vista\n              al teleférico pasando por arriba.'],
      ['Mais Popular', 'Más Popular'],
      // Multiline version to match PT source whitespace (newline + 14-space indent)
      ['A Mureta da Urca e um dos pontos mais tradicionais do Rio de Janeiro para encontros e passeios de lancha.\n              Com aguas calmas e protegidas pela Baia de Guanabara, e o local perfeito para quem busca tranquilidade\n              e uma vista privilegiada do Pao de Acucar.', 'Mureta da Urca es uno de los puntos más tradicionales de Río de Janeiro para encuentros y paseos en lancha.\n              Con aguas calmas y protegidas por la Bahía de Guanabara, es el lugar perfecto para quienes buscan tranquilidad\n              y una vista privilegiada del Pan de Azúcar.'],
      // Single-line fallback (for Schema JSON-LD version)
      ['A Mureta da Urca e um dos pontos mais tradicionais do Rio de Janeiro para encontros e passeios de lancha. Com aguas calmas e protegidas pela Baia de Guanabara, e o local perfeito para quem busca tranquilidade e uma vista privilegiada do Pao de Acucar.', 'Mureta da Urca es uno de los puntos más tradicionales de Río de Janeiro para encuentros y paseos en lancha. Con aguas calmas y protegidas por la Bahía de Guanabara, es el lugar perfecto para quienes buscan tranquilidad y una vista privilegiada del Pan de Azúcar.'],
      ['Aguas calmas', 'Aguas calmas'],
      ['Vista Pao de Acucar', 'Vista Pan de Azúcar'],
      ['Ideal para familias', 'Ideal para familias'],
      ['Ponto de encontro', 'Punto de encuentro'],
      ['Melhor horário', 'Mejor horario'],
      ['Manha ou fim de tarde', 'Mañana o fin de tarde'],
      ['A partir de', 'Desde'],
      ['Lanchas disponíveis', 'Lanchas disponibles'],
      ['Todas (10 a 65 pessoas)', 'Todas (10 a 65 personas)'],
      ['Ver Roteiro Completo', 'Ver Ruta Completa'],
      ['Reservar', 'Reservar'],
      ['Mais Vendido', 'Más Vendido'],
      ['Conhecida como a praia secreta do Rio, a Praia Vermelha e acessivel principalmente por barco. Aos pes do Pao de Acucar, oferece aguas cristalinas e uma experiência única de banho com vista para o bondinho passando acima.', 'Conocida como la playa secreta de Río, Praia Vermelha es accesible principalmente por barco. A los pies del Pan de Azúcar, ofrece aguas cristalinas y una experiencia única de baño con vista al teleférico pasando por arriba.'],
      ['Parada para banho', 'Parada para baño'],
      ['Vista do bondinho', 'Vista del teleférico'],
      ['Aguas cristalinas', 'Aguas cristalinas'],
      ['Fotos incriveis', 'Fotos increíbles'],
      ['Manha (aguas mais calmas)', 'Mañana (aguas más calmas)'],
      ['Vista Iconica', 'Vista Icónica'],
      ['Navegue pela orla mais famosa do Brasil! O passeio por Copacabana oferece uma vista panoramica\n              única da iconica praia, passando também pelo Arpoador e Ipanema. Perfeito para fotos inesquecíveis\n              e turistas que querem conhecer o Rio do mar.', '¡Navegue por la costa más famosa de Brasil! El paseo por Copacabana ofrece una vista panorámica\n              única de la icónica playa, pasando también por Arpoador e Ipanema. Perfecto para fotos inolvidables\n              y turistas que quieren conocer Río desde el mar.'],
      ['Vista panoramica', 'Vista panorámica'],
      ['Por do sol incrivel', 'Puesta de sol increíble'],
      ['Ideal para turistas', 'Ideal para turistas'],
      ['Fim de tarde (por do sol)', 'Fin de tarde (puesta de sol)'],
      ['Mar Aberto', 'Mar Abierto'],
      // Multiline version (to match PT source whitespace — newline + 14-space indent)
      ['Para os mais aventureiros! O arquipelago das Ilhas Cagarras oferece uma experiência única em mar aberto.\n              Com aguas cristalinas e natureza preservada, e o destino ideal para mergulho, snorkeling e contato\n              direto com a vida marinha.', '¡Para los más aventureros! El archipiélago de las Ilhas Cagarras ofrece una experiencia única en mar abierto.\n              Con aguas cristalinas y naturaleza preservada, es el destino ideal para buceo, snorkeling y contacto\n              directo con la vida marina.'],
      // Single-line fallback
      ['Para os mais aventureiros! O arquipelago das Ilhas Cagarras oferece uma experiência única em mar aberto. Com aguas cristalinas e natureza preservada, e o destino ideal para mergulho, snorkeling e contato direto com a vida marinha.', '¡Para los más aventureros! El archipiélago de las Ilhas Cagarras ofrece una experiencia única en mar abierto. Con aguas cristalinas y naturaleza preservada, es el destino ideal para buceo, snorkeling y contacto directo con la vida marina.'],
      ['Vida marinha', 'Vida marina'],
      ['Mergulho e snorkeling', 'Buceo y snorkeling'],
      ['Natureza preservada', 'Naturaleza preservada'],
      ['Aventura em mar aberto', 'Aventura en mar abierto'],
      ['Manha (mar mais calmo)', 'Mañana (mar más calmo)'],
      ['Lanchas 32 pes+ (14 a 50 pessoas)', 'Lanchas 32 pies+ (14 a 50 personas)'],
      ['Praias Desertas', 'Playas Desiertas'],
      ['Nosso roteiro mais exclusivo! Atravesse a Baia de Guanabara e descubra as praias semi-desertas\n              de Itaipu e Camboinhas em Niteroi. Aguas cristalinas, menos movimento e cenários paradisiacos\n              para quem busca paz e exclusividade.', '¡Nuestra ruta más exclusiva! Cruce la Bahía de Guanabara y descubra las playas semidesertas\n              de Itaipu y Camboinhas en Niterói. Aguas cristalinas, menos movimiento y escenarios paradisíacos\n              para quienes buscan paz y exclusividad.'],
      ['Menos movimento', 'Menos movimiento'],
      ['Exclusividade', 'Exclusividad'],
      ['Travessia da baia', 'Travesía de la bahía'],
      ['Manha (mar mais tranquilo)', 'Mañana (mar más tranquilo)'],
      ['Experiência Completa', 'Experiencia Completa'],
      // Multiline version (to match PT source whitespace — newline + 14-space indent)
      ['A navegação pela Baia de Guanabara e uma das experiencias mais completas do Rio de Janeiro.\n              Com vista para o Cristo Redentor, Ponte Rio-Niteroi, Ilha Fiscal e os principais pontos turisticos,\n              e o passeio ideal para quem quer conhecer a cidade de um angulo único.', 'La navegación por la Bahía de Guanabara es una de las experiencias más completas de Río de Janeiro.\n              Con vista al Cristo Redentor, Puente Río-Niterói, Ilha Fiscal y los principales puntos turísticos,\n              es el paseo ideal para quienes quieren conocer la ciudad desde un ángulo único.'],
      // Single-line fallback
      ['A navegação pela Baia de Guanabara e uma das experiencias mais completas do Rio de Janeiro. Com vista para o Cristo Redentor, Ponte Rio-Niteroi, Ilha Fiscal e os principais pontos turisticos, e o passeio ideal para quem quer conhecer a cidade de um angulo único.', 'La navegación por la Bahía de Guanabara es una de las experiencias más completas de Río de Janeiro. Con vista al Cristo Redentor, Puente Río-Niterói, Ilha Fiscal y los principales puntos turísticos, es el paseo ideal para quienes quieren conocer la ciudad desde un ángulo único.'],
      ['Vista Cristo Redentor', 'Vista Cristo Redentor'],
      ['Qualquer periodo', 'Cualquier período'],
      ['Ver Volta Completa', 'Ver Tour Completo'],
      ['Duvidas', 'Preguntas'],
      ['Perguntas sobre Areas de Passeio', 'Preguntas sobre Áreas de Paseo'],
      ['Quais áreas sao atendidas para passeio de lancha no Rio de Janeiro?', '¿Qué áreas están cubiertas para paseo en lancha en Río de Janeiro?'],
      ['<strong>A WeBoat Brasil realiza passeios de lancha em diversas áreas do Rio de Janeiro: Mureta da Urca, Praia Vermelha, Copacabana (incluindo Arpoador e Ipanema), Ilhas Cagarras, Itaipu e Camboinhas (Niteroi), e toda a Baia de Guanabara.</strong>\n                    Todos os passeios partem da Marina da Glória e podem ser personalizados conforme sua preferencia.', '<strong>WeBoat Brasil realiza paseos en lancha en diversas áreas de Río de Janeiro: Mureta da Urca, Praia Vermelha, Copacabana (incluyendo Arpoador e Ipanema), Ilhas Cagarras, Itaipu y Camboinhas (Niterói), y toda la Bahía de Guanabara.</strong>\n                    Todos los paseos parten de la Marina da Glória y pueden personalizarse según su preferencia.'],
      ['Qual a area mais indicada para primeira vez em passeio de lancha?', '¿Cuál es el área más indicada para la primera vez en paseo en lancha?'],
      // Multiline version to match PT source whitespace
      ['<strong>Para primeira vez, recomendamos a Mureta da Urca ou Praia Vermelha. Sao áreas com aguas calmas dentro da Baia de Guanabara, ideais para familias e iniciantes.</strong>\n                    Veja nossos <a href="/es/rutas/">roteiros disponíveis</a> para escolher o melhor para você.', '<strong>Para la primera vez, recomendamos Mureta da Urca o Praia Vermelha. Son áreas con aguas calmas dentro de la Bahía de Guanabara, ideales para familias y principiantes.</strong>\n                    Vea nuestras <a href="/es/rutas/">rutas disponibles</a> para elegir la mejor para usted.'],
      ['<strong>Para primeira vez, recomendamos a Mureta da Urca ou Praia Vermelha. Sao áreas com aguas calmas dentro da Baia de Guanabara, ideais para familias e iniciantes.</strong> Veja nossos <a href="/es/rutas/">roteiros disponíveis</a> para escolher o melhor para você.', '<strong>Para la primera vez, recomendamos Mureta da Urca o Praia Vermelha. Son áreas con aguas calmas dentro de la Bahía de Guanabara, ideales para familias y principiantes.</strong> Vea nuestras <a href="/es/rutas/">rutas disponibles</a> para elegir la mejor para usted.'],
      ['E possível combinar diferentes áreas em um único passeio?', '¿Es posible combinar diferentes áreas en un único paseo?'],
      ['Qual area e melhor para mergulho e snorkeling?', '¿Cuál área es mejor para buceo y snorkeling?'],
      ['<strong>Para mergulho e snorkeling, as Ilhas Cagarras sao a melhor opção. O arquipelago tem aguas cristalinas e vida marinha abundante.</strong>\n                    Itaipu e Camboinhas também oferecem excelente visibilidade para atividades aquaticas.', '<strong>Para buceo y snorkeling, Ilhas Cagarras es la mejor opción. El archipiélago tiene aguas cristalinas y vida marina abundante.</strong>\n                    Itaipu y Camboinhas también ofrecen excelente visibilidad para actividades acuáticas.'],
      ['Qual a melhor area para ver o por do sol?', '¿Cuál es la mejor área para ver la puesta de sol?'],
      ['<strong>Para ver o por do sol, recomendamos o roteiro de Copacabana ou a Mureta da Urca. A vista do sol se pondo atras das montanhas e espetacular.</strong>\n                    Agende passeios no final da tarde para aproveitar essa experiência única.', '<strong>Para ver la puesta de sol, recomendamos la ruta de Copacabana o Mureta da Urca. La vista del sol poniéndose detrás de las montañas es espectacular.</strong>\n                    Agende paseos al final de la tarde para aprovechar esta experiencia única.'],
      ['Ver Todas as Duvidas', 'Ver Todas las Preguntas'],
      ['Pronto para Explorar o Rio de Janeiro do Mar?', '¿Listo para Explorar Río de Janeiro desde el Mar?'],
      ['Entre em contato e nossa equipe vai ajudar você a escolher a melhor area\n            e roteiro para seu passeio de lancha.', 'Contáctenos y nuestro equipo le ayudará a elegir la mejor área\n            y ruta para su paseo en lancha.'],
      ['Entre em contato e nossa equipe vai ajudar você a escolher a melhor area e roteiro para seu passeio de lancha.', 'Contáctenos y nuestro equipo le ayudará a elegir la mejor área y ruta para su paseo en lancha.'],
      ['Falar com Especialista', 'Hablar con un Especialista'],
      ['Ver Todos os Roteiros', 'Ver Todas las Rutas'],
      ['Última atualização: Fevereiro 2026', 'Última actualización: Febrero 2026'],
    ],
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
      contentBlocks: [
      // Alt text (NOT protected by translateContent)
      ['Lanchas ancoradas na Praia Vermelha com Morro da Urca ao fundo', 'Lanchas ancladas en Praia Vermelha con Morro da Urca al fondo'],
      ['Amigas de biquíni relaxando no solário da lancha', 'Amigas en bikini relajándose en el solárium de la lancha'],
      ['Vista aérea da Marina da Glória no Rio de Janeiro', 'Vista aérea de la Marina da Glória en Río de Janeiro'],
      ['Blog WeBoat', 'Blog WeBoat'],
      ['Dicas, guias e tudo sobre passeios de lancha no Rio de Janeiro', 'Tips, guías y todo sobre paseos en lancha en Río de Janeiro'],
      ['Roteiros', 'Rutas'],
      ['Fevereiro 2026', 'Febrero 2026'],
      ['Melhores Praias para Visitar de Lancha no RJ', 'Mejores Playas para Visitar en Lancha en Río'],
      ['Descubra as praias mais bonitas do Rio de Janeiro que só são acessíveis (ou muito melhores) de lancha. Da Praia Vermelha às Ilhas Cagarras.', 'Descubra las playas más hermosas de Río de Janeiro que solo son accesibles (o mucho mejores) en lancha. Desde Praia Vermelha hasta Ilhas Cagarras.'],
      ['Ler artigo', 'Leer artículo'],
      ['Dicas', 'Tips'],
      ['O Que Vestir num Passeio de Lancha: Guia Completo', 'Qué Vestir en un Paseo en Lancha: Guía Completa'],
      ['Guia prático de como se vestir para um passeio de lancha no Rio. O que levar, o que evitar e dicas de proteção solar.', 'Guía práctica de cómo vestirse para un paseo en lancha en Río. Qué llevar, qué evitar y tips de protección solar.'],
      // IMPORTANT: Long title with "Guia" must come BEFORE short 'Guia' → 'Guía' block
      ['Guia da Marina da Glória: Tudo que Você Precisa Saber', 'Guía de la Marina da Glória: Todo lo que Necesita Saber'],
      ['Guia', 'Guía'],
      ['Tudo sobre a Marina da Glória: como chegar, estacionamento, o que esperar no dia do passeio e dicas para aproveitar ao máximo.', 'Todo sobre la Marina da Glória: cómo llegar, estacionamiento, qué esperar el día del paseo y tips para aprovechar al máximo.'],
      ['Pronto para Seu Passeio de Lancha?', '¿Listo para su Paseo en Lancha?'],
      ['Escolha sua lancha, roteiro e serviços extras. Passeios a partir de R$ 2.300 com tudo incluso.', 'Elija su lancha, ruta y servicios extras. Paseos desde R$ 2.300 con todo incluido.'],
      ['Atualizado em fevereiro de 2026', 'Actualizado en febrero de 2026'],
    ],
  },
  {
    ptPath: 'blog/melhores-praias-lancha-rj/index.html',
    esPath: 'es/blog/mejores-playas-en-lancha-rio/index.html',
    title: 'Mejores Playas para Visitar en Lancha en Río de Janeiro | WeBoat Blog',
    description: 'Descubra las mejores playas accesibles solo en lancha en Río de Janeiro. Aguas cristalinas, calas escondidas e islas paradisíacas.',
    keywords: 'mejores playas lancha rio, playas en barco rio de janeiro, playas escondidas rio',
    waMessage: '¡Hola! Me gustaría información sobre paseos en lancha a las playas. [via site - es]',
    css: null,
      contentBlocks: [
      // Alt text (NOT protected by translateContent)
      ['Lanchas ancoradas na Praia Vermelha com vista do Morro da Urca e Cristo Redentor ao fundo, Rio de Janeiro', 'Lanchas ancladas en Praia Vermelha con vista del Morro da Urca y Cristo Redentor al fondo, Río de Janeiro'],
      ['Amigas de biquíni relaxando no solário da lancha', 'Amigas en bikini relajándose en el solárium de la lancha'],
      ['Vista aérea da Marina da Glória no Rio de Janeiro', 'Vista aérea de la Marina da Glória en Río de Janeiro'],
      // Schema.org Article description (JSON-LD not protected)
      ['Conheça as melhores praias do Rio de Janeiro para visitar de lancha: Praia Vermelha, Ilhas Cagarras, Itaipu e mais. Guia completo com dicas práticas.', 'Descubra las mejores playas de Río de Janeiro para visitar en lancha: Praia Vermelha, Ilhas Cagarras, Itaipu y más. Guía completa con consejos prácticos.'],
      ['Melhores Praias', 'Mejores Playas'],
      ['Roteiros', 'Rutas'],
      ['Fevereiro 2026', 'Febrero 2026'],
      ['6 min de leitura', '6 min de lectura'],
      ['Melhores Praias para Visitar de Lancha no RJ', 'Mejores Playas para Visitar en Lancha en Río'],
      ['O Rio de Janeiro tem algumas das praias mais bonitas do mundo -- e a melhor forma de conhecê-las é de lancha. Enquanto milhares de pessoas disputam um lugar na areia, quem chega pelo mar tem acesso a ângulos exclusivos, praias praticamente desertas e uma experiência que nenhum carro ou ônibus consegue oferecer.', 'Río de Janeiro tiene algunas de las playas más hermosas del mundo -- y la mejor forma de conocerlas es en lancha. Mientras miles de personas compiten por un lugar en la arena, quienes llegan por mar tienen acceso a ángulos exclusivos, playas prácticamente desiertas y una experiencia que ningún auto o autobús puede ofrecer.'],
      ['Saindo da <strong>Marina da Glória</strong>, a costa carioca se revela de um jeito completamente diferente: sem trânsito, sem lotação e com a brisa do mar como companhia. Neste guia, reunimos as melhores praias para visitar de lancha no Rio de Janeiro, com dicas práticas para você planejar o passeio perfeito.', 'Saliendo de la <strong>Marina da Glória</strong>, la costa carioca se revela de una manera completamente diferente: sin tráfico, sin aglomeración y con la brisa del mar como compañía. En esta guía, reunimos las mejores playas para visitar en lancha en Río de Janeiro, con tips prácticos para planificar el paseo perfecto.'],
      ['1. Praia Vermelha -- O Roteiro Mais Vendido', '1. Praia Vermelha -- La Ruta Más Vendida'],
      ['Ancorar em frente à <strong>Praia Vermelha</strong> é, sem dúvida, uma das experiências mais marcantes que o Rio oferece. Com o Pão de Açúcar como cenário, a paisagem vista da lancha é de tirar o fôlego -- e rende fotos que parecem cartão-postal.', 'Anclar frente a <strong>Praia Vermelha</strong> es, sin duda, una de las experiencias más impactantes que ofrece Río. Con el Pan de Azúcar como escenario, el paisaje visto desde la lancha quita el aliento -- y produce fotos que parecen postales.'],
      ['A praia tem águas calmas e transparentes, ideais para um mergulho rápido. Do mar, é possível observar os bondinhos do teleférico subindo o morro, enquanto a Mureta da Urca aparece logo ao lado. Não é à toa que esse é o <strong>roteiro mais vendido</strong> da WeBoat: combina beleza, tranquilidade e proximidade da Marina da Glória.', 'La playa tiene aguas calmas y transparentes, ideales para un chapuzón rápido. Desde el mar, es posible observar las cabinas del teleférico subiendo el cerro, mientras Mureta da Urca aparece al lado. No es casualidad que esta sea la <strong>ruta más vendida</strong> de WeBoat: combina belleza, tranquilidad y proximidad a la Marina da Glória.'],
      ['<strong>Distância da Marina:</strong> aproximadamente 15 minutos de navegação', '<strong>Distancia de la Marina:</strong> aproximadamente 15 minutos de navegación'],
      ['<strong>Destaques:</strong> vista do Pão de Açúcar, águas calmas, parada para mergulho', '<strong>Destacados:</strong> vista del Pan de Azúcar, aguas calmas, parada para baño'],
      ['<strong>Ideal para:</strong> famílias, casais, festas de aniversário', '<strong>Ideal para:</strong> familias, parejas, fiestas de cumpleaños'],
      ['2. Ilhas Cagarras -- Águas Cristalinas e Snorkeling', '2. Ilhas Cagarras -- Aguas Cristalinas y Snorkeling'],
      ['As <strong>Ilhas Cagarras</strong> formam um arquipélago protegido em frente a Ipanema, e são acessíveis <strong>exclusivamente por embarcação</strong>. Isso significa que não há infraestrutura na areia, nem multidões: apenas o mar, a vida marinha e a natureza preservada.', 'Las <strong>Ilhas Cagarras</strong> forman un archipiélago protegido frente a Ipanema, y son accesibles <strong>exclusivamente por embarcación</strong>. Esto significa que no hay infraestructura en la arena, ni multitudes: solo el mar, la vida marina y la naturaleza preservada.'],
      ['A água ao redor das ilhas é impressionantemente cristalina, com visibilidade que pode ultrapassar 10 metros em dias de sol. Tartarugas marinhas, cardumes coloridos e até golfinhos são avistamentos comuns na região. Para quem gosta de snorkeling, este é o melhor destino do Rio de Janeiro.', 'El agua alrededor de las islas es impresionantemente cristalina, con visibilidad que puede superar los 10 metros en días de sol. Tortugas marinas, cardúmenes coloridos e incluso delfines son avistamientos comunes en la región. Para quienes gustan del snorkeling, este es el mejor destino de Río de Janeiro.'],
      ['O percurso até as Cagarras é em mar aberto, o que torna a navegação um pouco mais aventureira. No entanto, as lanchas da WeBoat são preparadas para esse tipo de travessia, e o marinheiro experiente conhece cada detalhe do trajeto.', 'El trayecto hasta Cagarras es en mar abierto, lo que hace la navegación un poco más aventurera. Sin embargo, las lanchas de WeBoat están preparadas para este tipo de travesía, y el marinero experimentado conoce cada detalle del trayecto.'],
      ['<strong>Distância da Marina:</strong> aproximadamente 40 minutos de navegação', '<strong>Distancia de la Marina:</strong> aproximadamente 40 minutos de navegación'],
      ['<strong>Destaques:</strong> águas cristalinas, snorkeling, fauna marinha, natureza intocada', '<strong>Destacados:</strong> aguas cristalinas, snorkeling, fauna marina, naturaleza intacta'],
      ['<strong>Ideal para:</strong> aventureiros, amantes da natureza, grupos de amigos', '<strong>Ideal para:</strong> aventureros, amantes de la naturaleza, grupos de amigos'],
      ['3. Itaipu e Camboinhas -- Praias Quase Desertas em Niterói', '3. Itaipu y Camboinhas -- Playas Casi Desiertas en Niterói'],
      ['Cruzar a Baía de Guanabara e ancorar nas praias de <strong>Itaipu e Camboinhas</strong>, em Niterói, é como descobrir um paraíso escondido. Essas praias são menos conhecidas pelo público em geral, mas quem as visita de lancha entende imediatamente por que são tão especiais.', 'Cruzar la Bahía de Guanabara y anclar en las playas de <strong>Itaipu y Camboinhas</strong>, en Niterói, es como descubrir un paraíso escondido. Estas playas son menos conocidas por el público general, pero quien las visita en lancha entiende inmediatamente por qué son tan especiales.'],
      ['As águas são calmas e rasas, perfeitas para crianças e para quem prefere nadar com tranquilidade. A faixa de areia é ampla e, durante a semana, praticamente deserta. A vista de volta para o Rio de Janeiro -- com o Cristo Redentor, o Pão de Açúcar e toda a linha da costa -- é espetacular.', 'Las aguas son calmas y poco profundas, perfectas para niños y para quienes prefieren nadar con tranquilidad. La franja de arena es amplia y, durante la semana, prácticamente desierta. La vista de regreso a Río de Janeiro -- con el Cristo Redentor, el Pan de Azúcar y toda la línea costera -- es espectacular.'],
      ['<strong>Distância da Marina:</strong> aproximadamente 50 minutos de navegação', '<strong>Distancia de la Marina:</strong> aproximadamente 50 minutos de navegación'],
      ['<strong>Destaques:</strong> águas calmas e rasas, praias amplas, vista panorâmica do Rio', '<strong>Destacados:</strong> aguas calmas y poco profundas, playas amplias, vista panorámica de Río'],
      ['<strong>Ideal para:</strong> famílias com crianças, casais, passeios mais longos', '<strong>Ideal para:</strong> familias con niños, parejas, paseos más largos'],
      ['4. Copacabana -- A Vista Icônica pelo Mar', '4. Copacabana -- La Vista Icónica desde el Mar'],
      ['Todo mundo conhece Copacabana pela areia. Mas pouquíssimas pessoas já viram a <strong>Princesinha do Mar</strong> a partir de uma lancha -- e a diferença é surpreendente. Do mar, a praia se revela inteira, com o Forte de Copacabana de um lado e o Arpoador do outro, emoldurada pelas montanhas da Tijuca.', 'Todo el mundo conoce Copacabana por la arena. Pero poquísimas personas la han visto la <strong>Princesita del Mar</strong> desde una lancha -- y la diferencia es sorprendente. Desde el mar, la playa se revela entera, con el Fuerte de Copacabana de un lado y Arpoador del otro, enmarcada por las montañas de Tijuca.'],
      ['Navegar ao longo da orla de Copacabana oferece uma perspectiva totalmente diferente da cidade. É possível ver os prédios da Avenida Atlântica, a movimentação na areia e o formato da baía de um ângulo que só existe pelo mar. Para fotos e vídeos, é um dos pontos mais instagramáveis de todo o passeio.', 'Navegar a lo largo de la costa de Copacabana ofrece una perspectiva totalmente diferente de la ciudad. Es posible ver los edificios de la Avenida Atlántica, el movimiento en la arena y la forma de la bahía desde un ángulo que solo existe desde el mar. Para fotos y videos, es uno de los puntos más instagrameables de todo el paseo.'],
      ['<strong>Distância da Marina:</strong> aproximadamente 25 minutos de navegação', '<strong>Distancia de la Marina:</strong> aproximadamente 25 minutos de navegación'],
      ['<strong>Destaques:</strong> vista panorâmica da orla inteira, ótimas fotos, passagem pelo Forte', '<strong>Destacados:</strong> vista panorámica de toda la costa, excelentes fotos, paso por el Fuerte'],
      ['<strong>Ideal para:</strong> turistas, despedidas de solteira, eventos corporativos', '<strong>Ideal para:</strong> turistas, despedidas de soltera, eventos corporativos'],
      ['5. Praias da Baía de Guanabara -- Joias Escondidas', '5. Playas de la Bahía de Guanabara -- Joyas Escondidas'],
      ['A <strong>Baía de Guanabara</strong> guarda praias que a maioria dos cariocas nem sabe que existem. Pequenas enseadas protegidas, com águas calmas e vegetação nativa, formam recantos perfeitos para ancorar e aproveitar o dia com privacidade.', 'La <strong>Bahía de Guanabara</strong> guarda playas que la mayoría de los cariocas ni siquiera sabe que existen. Pequeñas ensenadas protegidas, con aguas calmas y vegetación nativa, forman rincones perfectos para anclar y disfrutar el día con privacidad.'],
      ['Entre os destaques estão as praias próximas à Fortaleza de São João, a Praia de Adão e Eva em Niterói, e as pequenas faixas de areia ao longo da Ilha de Paquetá. A navegação pela baía é extremamente tranquila, sem ondas, o que torna o passeio confortável até para quem não tem experiência no mar.', 'Entre los destacados están las playas cercanas a la Fortaleza de São João, la Praia de Adão e Eva en Niterói, y las pequeñas franjas de arena a lo largo de la Ilha de Paquetá. La navegación por la bahía es extremadamente tranquila, sin olas, lo que hace el paseo confortable incluso para quienes no tienen experiencia en el mar.'],
      ['<strong>Distância da Marina:</strong> varia de 10 a 30 minutos', '<strong>Distancia de la Marina:</strong> varía de 10 a 30 minutos'],
      ['<strong>Destaques:</strong> águas calmas, praias reservadas, cenário histórico', '<strong>Destacados:</strong> aguas calmas, playas reservadas, escenario histórico'],
      ['<strong>Ideal para:</strong> passeios em casal, quem prefere mar calmo, iniciantes no mar', '<strong>Ideal para:</strong> paseos en pareja, quienes prefieren mar calmo, principiantes en el mar'],
      ['Dicas Práticas para Seu Passeio de Lancha', 'Tips Prácticos para su Paseo en Lancha'],
      ['Melhor época e horário', 'Mejor época y horario'],
      ['Os meses de <strong>outubro a abril</strong> oferecem as melhores condições de mar e clima no Rio de Janeiro. Prefira sair pela manhã cedo (entre 8h e 9h) para aproveitar o mar mais calmo e a luz ideal para fotos. Passeios no fim da tarde também são incríveis para ver o pôr do sol a bordo.', 'Los meses de <strong>octubre a abril</strong> ofrecen las mejores condiciones de mar y clima en Río de Janeiro. Prefiera salir por la mañana temprano (entre 8h y 9h) para aprovechar el mar más calmo y la luz ideal para fotos. Paseos al final de la tarde también son increíbles para ver la puesta de sol a bordo.'],
      ['O que levar', 'Qué llevar'],
      ['<strong>Protetor solar</strong> resistente à água (fator 50 ou mais)', '<strong>Protector solar</strong> resistente al agua (factor 50 o más)'],
      ['<strong>Roupa de banho</strong> e uma muda de roupa seca', '<strong>Ropa de baño</strong> y una muda de ropa seca'],
      ['<strong>Toalha</strong> e óculos de sol com cordinha', '<strong>Toalla</strong> y lentes de sol con cordón'],
      ['<strong>Bebidas e petiscos</strong> -- a lancha tem cooler (gelo não incluso)', '<strong>Bebidas y bocadillos</strong> -- la lancha tiene cooler (hielo no incluido)'],
      ['<strong>Caixa de som?</strong> Não precisa -- todas as lanchas têm som Bluetooth', '<strong>¿Parlante?</strong> No hace falta -- todas las lanchas tienen sonido Bluetooth'],
      ['<strong>Equipamento de snorkeling</strong> (para as Ilhas Cagarras)', '<strong>Equipo de snorkeling</strong> (para las Ilhas Cagarras)'],
      ['Qual lancha escolher', 'Qué lancha elegir'],
      ['A escolha da lancha depende do tamanho do grupo e do roteiro desejado. Para grupos de até 15 pessoas, a <strong>WeBoat 32</strong> oferece o melhor custo-benefício, a partir de R$ 2.300. Para grupos maiores (até 22 pessoas), a <strong>Rio Star 50</strong> é a opção ideal. Todas as lanchas da WeBoat incluem combustível, marinheiro, coolers, sistema de som e equipamentos de segurança.', 'La elección de la lancha depende del tamaño del grupo y la ruta deseada. Para grupos de hasta 15 personas, la <strong>WeBoat 32</strong> ofrece el mejor costo-beneficio, desde R$ 2.300. Para grupos más grandes (hasta 22 personas), la <strong>Rio Star 50</strong> es la opción ideal. Todas las lanchas de WeBoat incluyen combustible, marinero, coolers, sistema de sonido y equipos de seguridad.'],
      ['Dica: se quiser churrasco a bordo, todas as nossas lanchas possuem churrasqueira. Basta contratar o serviço adicional e a gente organiza tudo para você.', 'Tip: si quiere asado a bordo, todas nuestras lanchas tienen parrilla. Solo contrate el servicio adicional y nosotros organizamos todo para usted.'],
      ['Pronto para Conhecer Essas Praias?', '¿Listo para Conocer Estas Playas?'],
      ['Escolha seu roteiro e reserve sua lancha. Passeios de 5 horas saindo da Marina da Glória, com tudo incluso.', 'Elija su ruta y reserve su lancha. Paseos de 5 horas saliendo de la Marina da Glória, con todo incluido.'],
      ['Agendar pelo WhatsApp', 'Agendar por WhatsApp'],
      ['Ver Roteiros', 'Ver Rutas'],
      ['Leia Também', 'Lea También'],
      ['O Que Vestir num Passeio de Lancha: Guia Completo', 'Qué Vestir en un Paseo en Lancha: Guía Completa'],
      ['Guia prático de como se vestir para um passeio de lancha no Rio. O que levar, o que evitar e dicas de proteção solar.', 'Guía práctica de cómo vestirse para un paseo en lancha en Río. Qué llevar, qué evitar y tips de protección solar.'],
      ['Ler artigo', 'Leer artículo'],
      ['Guia da Marina da Glória: Tudo que Você Precisa Saber', 'Guía de la Marina da Glória: Todo lo que Necesita Saber'],
      ['Tudo sobre a Marina da Glória: como chegar, estacionamento, o que esperar no dia do passeio e dicas para aproveitar ao máximo.', 'Todo sobre la Marina da Glória: cómo llegar, estacionamiento, qué esperar el día del paseo y tips para aprovechar al máximo.'],
      ['Pronto para Seu Passeio de Lancha?', '¿Listo para su Paseo en Lancha?'],
      ['Escolha sua lancha, roteiro e serviços extras. Passeios a partir de R$ 2.300 com tudo incluso.', 'Elija su lancha, ruta y servicios extras. Paseos desde R$ 2.300 con todo incluido.'],
    ],
  },
  {
    ptPath: 'blog/o-que-vestir-passeio-lancha/index.html',
    esPath: 'es/blog/que-vestir-paseo-en-lancha/index.html',
    title: 'Qué Vestir en un Paseo en Lancha en Río de Janeiro | WeBoat Blog',
    description: 'Guía completa sobre qué vestir para un paseo en lancha en Río. Tips de ropa, protector solar, calzado y elementos esenciales.',
    keywords: 'que vestir paseo lancha, ropa paseo barco, vestimenta lancha rio',
    waMessage: '¡Hola! Me gustaría información sobre qué llevar al paseo en lancha. [via site - es]',
    css: null,
      contentBlocks: [
      // Alt text (NOT protected by translateContent)
      ['Grupo de amigas de biquíni e acessórios relaxando no solário da lancha durante passeio no Rio de Janeiro', 'Grupo de amigas en bikini y accesorios relajándose en el solárium de la lancha durante paseo en Río de Janeiro'],
      ['Lanchas ancoradas na Praia Vermelha com Morro da Urca ao fundo', 'Lanchas ancladas en Praia Vermelha con Morro da Urca al fondo'],
      ['Vista aérea da Marina da Glória no Rio de Janeiro', 'Vista aérea de la Marina da Glória en Río de Janeiro'],
      ['O Que Vestir', 'Qué Ponerse'],
      ['Dicas', 'Consejos'],
      ['Fevereiro 2026', 'Febrero 2026'],
      ['4 min de leitura', '4 min de lectura'],
      ['O Que Vestir num Passeio de Lancha: Guia Completo', 'Qué Ponerse en un Paseo en Lancha: Guía Completa'],
      ['Se essa vai ser a sua primeira vez num passeio de lancha, uma dúvida muito comum é: <strong>"o que eu visto?"</strong>. A resposta é mais simples do que parece, mas alguns detalhes fazem toda a diferença entre curtir o passeio com conforto ou passar o dia todo se ajeitando. Preparamos este guia completo para você não errar na escolha e aproveitar cada minuto no mar do Rio de Janeiro.', 'Si esta va a ser tu primera vez en un paseo en lancha, una pregunta muy común es: <strong>"¿qué me pongo?"</strong>. La respuesta es más simple de lo que parece, pero algunos detalles marcan toda la diferencia entre disfrutar el paseo con comodidad o pasarte todo el día ajustándote la ropa. Preparamos esta guía completa para que aciertes en tu elección y disfrutes cada minuto en el mar de Río de Janeiro.'],
      ['Roupas de Banho: o Básico que Não Pode Faltar', 'Ropa de Baño: Lo Básico que No Puede Faltar'],
      ['A regra número um é: <strong>vista-se como se fosse à praia</strong>. O passeio de lancha envolve sol, vento, mar e, claro, muita diversão na água. Por isso, a base do look deve ser a roupa de banho.', 'La regla número uno es: <strong>vístete como si fueras a la playa</strong>. El paseo en lancha implica sol, viento, mar y, por supuesto, mucha diversión en el agua. Por eso, la base del look debe ser la ropa de baño.'],
      ['<strong>Mulheres:</strong> biquíni ou maiô. Leve uma saída de praia ou canga para usar como cobertura quando quiser.', '<strong>Mujeres:</strong> bikini o traje de baño entero. Lleva una salida de playa o pareo para usarlo como cobertura cuando quieras.'],
      ['<strong>Homens:</strong> sunga ou bermuda de banho (dê preferência às de tecido de secagem rápida).', '<strong>Hombres:</strong> traje de baño o bermuda de baño (preferiblemente de tela de secado rápido).'],
      ['A canga é a peça coringa do passeio. Funciona como toalha, saída de praia, proteção contra o vento e até como assento. Se levar apenas um acessório extra, que seja a canga.', 'El pareo es la pieza comodín del paseo. Funciona como toalla, salida de playa, protección contra el viento e incluso como asiento. Si llevas solo un accesorio extra, que sea el pareo.'],
      ['Calçados: Conforto e Segurança a Bordo', 'Calzado: Comodidad y Seguridad a Bordo'],
      ['O piso da lancha pode ficar molhado e escorregadio, então a escolha do calçado é importante para sua segurança.', 'El piso de la lancha puede quedar mojado y resbaladizo, así que la elección del calzado es importante para tu seguridad.'],
      ['<strong>Use:</strong> chinelo de dedo, papete ou sandália de borracha com solado antiderrapante.', '<strong>Usa:</strong> chancletas, sandalias deportivas o sandalias de goma con suela antideslizante.'],
      ['<strong>Evite:</strong> sapatos fechados, tênis, sapatilhas e qualquer calçado que escorregue quando molhado.', '<strong>Evita:</strong> zapatos cerrados, tenis, zapatillas y cualquier calzado que resbale cuando está mojado.'],
      ['A maioria dos nossos passageiros opta por chinelo simples, e funciona perfeitamente. O importante é que o solado grude no piso mesmo com água.', 'La mayoría de nuestros pasajeros opta por chancletas simples, y funcionan perfectamente. Lo importante es que la suela se adhiera al piso incluso con agua.'],
      ['Proteção Solar: Indispensável no Mar', 'Protección Solar: Indispensable en el Mar'],
      ['No mar, a exposição ao sol é ainda mais intensa por causa da reflexão da água. Não subestime: mesmo em dias nublados, o sol no Rio queima. Monte seu kit de proteção:', 'En el mar, la exposición al sol es aún más intensa debido al reflejo del agua. No lo subestimes: incluso en días nublados, el sol en Río quema. Arma tu kit de protección:'],
      ['<strong>Protetor solar FPS 50+</strong> (de preferência resistente à água). Reaplique a cada 2 horas.', '<strong>Protector solar FPS 50+</strong> (preferiblemente resistente al agua). Reaplica cada 2 horas.'],
      ['<strong>Chapéu, viseira ou boné</strong> para proteger o rosto e a cabeça do sol direto.', '<strong>Sombrero, visera o gorra</strong> para proteger el rostro y la cabeza del sol directo.'],
      ['<strong>Óculos de sol</strong> com proteção UV. Dica: use um cordão preso aos óculos para não perder no mar.', '<strong>Gafas de sol</strong> con protección UV. Consejo: usa un cordón sujeto a las gafas para no perderlas en el mar.'],
      ['<strong>Camisa UV</strong> (opcional, mas recomendada para quem tem pele sensível ou vai ficar muitas horas embarcado).', '<strong>Camisa UV</strong> (opcional, pero recomendada para quienes tienen piel sensible o van a pasar muchas horas a bordo).'],
      ['O Que Evitar: Erros Comuns de Primeira Viagem', 'Qué Evitar: Errores Comunes de Primerizos'],
      ['Alguns itens que parecem boa ideia em terra acabam sendo um problema a bordo. Fique atento:', 'Algunos artículos que parecen buena idea en tierra terminan siendo un problema a bordo. Presta atención:'],
      ['<strong>Salto alto:</strong> totalmente impraticável e perigoso no piso da lancha.', '<strong>Tacones altos:</strong> totalmente imprácticos y peligrosos en el piso de la lancha.'],
      ['<strong>Roupa de festa:</strong> vestidos longos, ternos, roupas de tecido delicado. Vão molhar, amassar e estragar.', '<strong>Ropa de fiesta:</strong> vestidos largos, trajes, ropa de tela delicada. Se van a mojar, arrugar y arruinar.'],
      ['<strong>Excesso de joias:</strong> correntes, anéis e brincos delicados podem cair na água e se perder para sempre. Deixe em casa.', '<strong>Exceso de joyas:</strong> cadenas, anillos y aretes delicados pueden caer al agua y perderse para siempre. Déjalos en casa.'],
      ['<strong>Roupas escuras e pesadas:</strong> absorvem mais calor e demoram para secar. Prefira cores claras e tecidos leves.', '<strong>Ropa oscura y pesada:</strong> absorbe más calor y tarda más en secar. Prefiere colores claros y telas livianas.'],
      ['Para Festas e Eventos: Dress Code Temático', 'Para Fiestas y Eventos: Dress Code Temático'],
      ['Se o seu passeio é uma <a href="/es/despedida-de-soltera/">despedida de solteira</a>, <a href="/es/cumpleanos/">aniversário</a> ou evento especial, o dress code pode ser diferente, mas a regra de ouro permanece: <strong>conforto no mar vem primeiro</strong>.', 'Si tu paseo es una <a href="/es/despedida-de-soltera/">despedida de soltera</a>, <a href="/es/cumpleanos/">cumpleaños</a> o evento especial, el dress code puede ser diferente, pero la regla de oro permanece: <strong>la comodidad en el mar es lo primero</strong>.'],
      ['<strong>Despedida de solteira:</strong> combinar cor do biquíni, tiara, camisetas personalizadas. Funciona e fica lindo nas fotos.', '<strong>Despedida de soltera:</strong> combinar color de bikini, tiara, camisetas personalizadas. Funciona y queda hermoso en las fotos.'],
      ['<strong>Aniversários:</strong> looks combinando, acessórios temáticos, chapéus estilizados. Tudo leve e prático.', '<strong>Cumpleaños:</strong> looks combinados, accesorios temáticos, sombreros estilizados. Todo liviano y práctico.'],
      ['<strong>Eventos corporativos:</strong> bermuda/short e camisa polo ou camiseta da empresa. Nada formal demais.', '<strong>Eventos corporativos:</strong> bermuda/short y camisa polo o camiseta de la empresa. Nada demasiado formal.'],
      ['O segredo é combinar o tema com roupas leves e que possam molhar sem problema. Deixe o look mais produzido para a foto no pier antes de embarcar.', 'El secreto es combinar el tema con ropa liviana que pueda mojarse sin problema. Deja el look más producido para la foto en el muelle antes de embarcar.'],
      ['O Que Levar na Bolsa', 'Qué Llevar en el Bolso'],
      ['Uma bolsa pequena e impermeável resolve tudo. Aqui vai a lista do que não pode faltar:', 'Un bolso pequeño e impermeable resuelve todo. Aquí va la lista de lo que no puede faltar:'],
      ['<strong>Toalha:</strong> uma de rosto basta se o espaço for curto.', '<strong>Toalla:</strong> una de mano alcanza si el espacio es limitado.'],
      ['<strong>Roupa extra:</strong> um conjunto seco para vestir no desembarque.', '<strong>Ropa extra:</strong> un conjunto seco para vestir al desembarcar.'],
      ['<strong>Necessaire:</strong> protetor solar extra, protetor labial, remédio para enjoo (se necessário).', '<strong>Neceser:</strong> protector solar extra, protector labial, medicamento para el mareo (si es necesario).'],
      ['<strong>Bolsa ou case impermeável</strong> para celular e documentos.', '<strong>Bolsa o funda impermeable</strong> para celular y documentos.'],
      ['Fique Tranquilo: a Lancha Já Tem Tudo', 'Quédate Tranquilo: la Lancha Ya Tiene Todo'],
      ['Na WeBoat, nossas lanchas já contam com tudo que você precisa para um passeio completo:', 'En WeBoat, nuestras lanchas ya cuentan con todo lo que necesitas para un paseo completo:'],
      ['<strong>Sistema de som Bluetooth</strong> para sua playlist favorita.', '<strong>Sistema de sonido Bluetooth</strong> para tu playlist favorita.'],
      ['<strong>Coolers</strong> para manter suas bebidas geladas.', '<strong>Coolers</strong> para mantener tus bebidas frías.'],
      ['<strong>Tapete e macarrões flutuantes</strong> para curtir a parada no mar.', '<strong>Colchoneta y flotadores</strong> para disfrutar la parada en el mar.'],
      ['<strong>Churrasqueira</strong> disponível em todas as lanchas (taxa adicional).', '<strong>Parrilla</strong> disponible en todas las lanchas (cargo adicional).'],
      ['<strong>Marinheiro experiente</strong> que cuida de tudo para você só aproveitar.', '<strong>Capitán experimentado</strong> que se encarga de todo para que solo disfrutes.'],
      ['Ou seja, você não precisa se preocupar com equipamentos, música ou estrutura. A única coisa que você precisa trazer é <strong>disposição para se divertir</strong> (e o protetor solar).', 'Es decir, no necesitas preocuparte por equipos, música o infraestructura. Lo único que necesitas traer es <strong>ganas de divertirte</strong> (y el protector solar).'],
      ['Pronto para Seu Passeio de Lancha?', '¿Listo para Tu Paseo en Lancha?'],
      ['Agora que você já sabe o que vestir, é só escolher a lancha e o roteiro. Passeios a partir de R$ 2.300 com tudo incluso, saindo da Marina da Glória.', 'Ahora que ya sabes qué ponerte, solo elige la lancha y la ruta. Paseos desde R$ 2.300 con todo incluido, saliendo de la Marina da Glória.'],
      ['Reservar pelo WhatsApp', 'Reservar por WhatsApp'],
      ['Leia Também', 'Lee También'],
      ['Melhores Praias para Visitar de Lancha no RJ', 'Mejores Playas para Visitar en Lancha en RJ'],
      ['Descubra as praias mais bonitas do Rio de Janeiro que só são acessíveis (ou muito melhores) de lancha.', 'Descubre las playas más hermosas de Río de Janeiro que solo son accesibles (o mucho mejores) en lancha.'],
      ['Ler artigo', 'Leer artículo'],
      ['Guia da Marina da Glória: Tudo que Você Precisa Saber', 'Guía de la Marina da Glória: Todo lo que Necesitas Saber'],
      ['Tudo sobre a Marina da Glória: como chegar, estacionamento, o que esperar no dia do passeio e dicas.', 'Todo sobre la Marina da Glória: cómo llegar, estacionamiento, qué esperar el día del paseo y consejos.'],
      ['Escolha sua lancha, roteiro e serviços extras. Passeios a partir de R$ 2.300 com tudo incluso.', 'Elige tu lancha, ruta y servicios extras. Paseos desde R$ 2.300 con todo incluido.'],
    ],
  },
  {
    ptPath: 'blog/guia-marina-da-gloria/index.html',
    esPath: 'es/blog/guia-marina-da-gloria/index.html',
    title: 'Guía Marina da Glória - Cómo Llegar | WeBoat Blog',
    description: 'Guía completa de la Marina da Glória en Río de Janeiro. Cómo llegar, estacionamiento, qué esperar al llegar.',
    keywords: 'guía marina da gloria, como llegar marina da gloria, marina gloria rio',
    waMessage: '¡Hola! Me gustaría indicaciones para llegar a la Marina da Glória. [via site - es]',
    css: null,
      contentBlocks: [
      // Alt text (NOT protected by translateContent)
      ['Vista aérea da Marina da Glória com lanchas e veleiros atracados e o Pão de Açúcar ao fundo', 'Vista aérea de la Marina da Glória con lanchas y veleros atracados y el Pan de Azúcar al fondo'],
      ['Lanchas ancoradas na Praia Vermelha com Morro da Urca ao fundo', 'Lanchas ancladas en Praia Vermelha con Morro da Urca al fondo'],
      ['Amigas de biquíni relaxando no solário da lancha', 'Amigas en bikini relajándose en el solárium de la lancha'],
      // Schema.org Article description (JSON-LD not protected — MUST come before 'Guia' short block)
      ['Guia completo da Marina da Glória no Rio de Janeiro: como chegar, estacionamento, infraestrutura e dicas para o dia do seu passeio de lancha com a WeBoat.', 'Guía completa de la Marina da Glória en Río de Janeiro: cómo llegar, estacionamiento, infraestructura y consejos para el día de tu paseo en lancha con WeBoat.'],
      // IMPORTANT: Full title must come BEFORE short 'Guia' → 'Guía' blocks to avoid substring corruption
      ['Guia da Marina da Glória: Tudo que Você Precisa Saber', 'Guía de la Marina da Glória: Todo lo que Necesitas Saber'],
      ['Guia Marina da Glória', 'Guía Marina da Glória'],
      ['Guia', 'Guía'],
      ['Fevereiro 2026', 'Febrero 2026'],
      ['5 min de leitura', '5 min de lectura'],
      ['Se você está planejando um passeio de lancha no Rio de Janeiro com a <strong>WeBoat Brasil</strong>, vai precisar conhecer a <strong>Marina da Glória</strong>. Esse é o ponto de partida de todos os nossos passeios, e entender como funciona o local vai tornar sua experiência muito mais tranquila e agradável. Neste guia, reunimos tudo que você precisa saber: como chegar, onde estacionar, o que esperar no dia e dicas práticas para aproveitar ao máximo.', 'Si estás planeando un paseo en lancha en Río de Janeiro con <strong>WeBoat Brasil</strong>, necesitas conocer la <strong>Marina da Glória</strong>. Este es el punto de partida de todos nuestros paseos, y entender cómo funciona el lugar hará que tu experiencia sea mucho más tranquila y agradable. En esta guía, reunimos todo lo que necesitas saber: cómo llegar, dónde estacionar, qué esperar el día del paseo y consejos prácticos para aprovecharlo al máximo.'],
      ['Localização: Onde Fica a Marina da Glória', 'Ubicación: Dónde Queda la Marina da Glória'],
      ['A Marina da Glória está localizada no bairro da Glória, na Zona Sul do Rio de Janeiro, às margens da <strong>Baía de Guanabara</strong>. O endereço exato é <strong>Av. Infante Dom Henrique, S/N - Glória, Rio de Janeiro - RJ, CEP 20021-140</strong>. A marina fica dentro do complexo do Aterro do Flamengo, um dos cartões-postais da cidade, com vista privilegiada para o Pão de Açúcar e o Morro da Urca.', 'La Marina da Glória está ubicada en el barrio de Glória, en la Zona Sur de Río de Janeiro, a orillas de la <strong>Bahía de Guanabara</strong>. La dirección exacta es <strong>Av. Infante Dom Henrique, S/N - Glória, Rio de Janeiro - RJ, CEP 20021-140</strong>. La marina está dentro del complejo del Aterro do Flamengo, una de las postales de la ciudad, con vista privilegiada al Pan de Azúcar y al Morro da Urca.'],
      ['A localização é estratégica: de lá, as lanchas têm acesso rápido aos principais pontos turísticos do litoral carioca, como a Mureta da Urca, a Praia Vermelha, Copacabana e as Ilhas Cagarras.', 'La ubicación es estratégica: desde allí, las lanchas tienen acceso rápido a los principales puntos turísticos del litoral carioca, como Mureta da Urca, Praia Vermelha, Copacabana y las Ilhas Cagarras.'],
      ['Como Chegar à Marina da Glória', 'Cómo Llegar a la Marina da Glória'],
      ['Existem várias formas de chegar à Marina da Glória, e todas são relativamente simples. Veja as opções:', 'Existen varias formas de llegar a la Marina da Glória, y todas son relativamente simples. Mira las opciones:'],
      ['De carro', 'En carro'],
      ['Se você vem da Zona Sul, siga pelo <strong>Aterro do Flamengo em direção ao Centro</strong>. A entrada da Marina fica à direita, bem sinalizada. Quem vem do Centro ou da Zona Norte pode acessar pelo mesmo Aterro, sentido Zona Sul. Coloque "Marina da Glória" no GPS ou aplicativo de navegação e siga as indicações.', 'Si vienes de la Zona Sur, sigue por el <strong>Aterro do Flamengo en dirección al Centro</strong>. La entrada de la Marina queda a la derecha, bien señalizada. Quien viene del Centro o de la Zona Norte puede acceder por el mismo Aterro, sentido Zona Sur. Coloca "Marina da Glória" en el GPS o aplicación de navegación y sigue las indicaciones.'],
      ['De metrô', 'En metro'],
      ['A estação mais próxima é a <strong>Estação Glória</strong>, na Linha 1 (laranja). De lá, são aproximadamente <strong>10 minutos de caminhada</strong> até a marina. O trajeto é plano e agradável, passando por uma das áreas mais bonitas do Aterro do Flamengo.', 'La estación más cercana es la <strong>Estación Glória</strong>, en la Línea 1 (naranja). Desde allí, son aproximadamente <strong>10 minutos caminando</strong> hasta la marina. El trayecto es plano y agradable, pasando por una de las áreas más bonitas del Aterro do Flamengo.'],
      ['De Uber ou 99', 'En Uber o 99'],
      ['A forma mais prática para a maioria das pessoas. Basta colocar <strong>"Marina da Glória"</strong> como destino no aplicativo. Os motoristas conhecem bem o local, e o desembarque é feito na entrada da marina. Dica: combinem um ponto de encontro com o grupo para facilitar a chegada de todos.', 'La forma más práctica para la mayoría de las personas. Solo coloca <strong>"Marina da Glória"</strong> como destino en la aplicación. Los conductores conocen bien el lugar, y el descenso se hace en la entrada de la marina. Consejo: acuerden un punto de encuentro con el grupo para facilitar la llegada de todos.'],
      ['Estacionamento na Marina da Glória', 'Estacionamiento en la Marina da Glória'],
      ['A Marina da Glória conta com <strong>estacionamento próprio</strong>, o que é uma grande vantagem para quem vai de carro. O preço médio gira em torno de <strong>R$ 30 a R$ 50 para o dia inteiro</strong>, dependendo do horário e do período. Nos fins de semana e feriados, o movimento pode ser maior, então recomendamos chegar com antecedência para garantir uma vaga.', 'La Marina da Glória cuenta con <strong>estacionamiento propio</strong>, lo que es una gran ventaja para quienes van en carro. El precio promedio ronda los <strong>R$ 30 a R$ 50 por el día completo</strong>, dependiendo del horario y el período. Los fines de semana y feriados, puede haber más movimiento, así que recomendamos llegar con anticipación para asegurar un lugar.'],
      ['Para quem prefere não dirigir, os aplicativos de transporte são a melhor alternativa, especialmente se o grupo pretende consumir bebidas durante o passeio.', 'Para quienes prefieren no conducir, las aplicaciones de transporte son la mejor alternativa, especialmente si el grupo planea consumir bebidas durante el paseo.'],
      ['Onde Fica a WeBoat na Marina', 'Dónde Queda WeBoat en la Marina'],
      ['A <strong>WeBoat Brasil</strong> está localizada na <strong>Loja 06</strong> da Marina da Glória. Ao entrar na marina, siga pelas lojas do complexo comercial. Nossa equipe estará de camiseta da WeBoat, pronta para receber você. Se tiver qualquer dificuldade para nos encontrar, basta ligar para o nosso WhatsApp <strong>(21) 97772-4114</strong> que orientamos na hora.', '<strong>WeBoat Brasil</strong> está ubicada en la <strong>Tienda 06</strong> de la Marina da Glória. Al entrar en la marina, sigue por las tiendas del complejo comercial. Nuestro equipo estará con camiseta de WeBoat, listo para recibirte. Si tienes cualquier dificultad para encontrarnos, solo llama a nuestro WhatsApp <strong>(21) 97772-4114</strong> y te orientamos al instante.'],
      ['O Que Esperar no Dia do Passeio', 'Qué Esperar el Día del Paseo'],
      ['Para que tudo corra perfeitamente, veja o passo a passo do que acontece quando você chega para o seu passeio:', 'Para que todo salga perfecto, mira el paso a paso de lo que sucede cuando llegas para tu paseo:'],
      ['<strong>Chegue 15 minutos antes</strong> do horário agendado. Isso garante tempo para o check-in sem correria.', '<strong>Llega 15 minutos antes</strong> del horario agendado. Esto garantiza tiempo para el check-in sin apuros.'],
      ['<strong>Check-in com a equipe WeBoat:</strong> nossa equipe confere a reserva, tira dúvidas de última hora e organiza os pertences do grupo.', '<strong>Check-in con el equipo WeBoat:</strong> nuestro equipo verifica la reserva, resuelve dudas de último momento y organiza las pertenencias del grupo.'],
      ['<strong>Coletes e instruções de segurança:</strong> todos recebem colete salva-vidas e orientações básicas de segurança a bordo. A segurança é prioridade em todos os nossos passeios.', '<strong>Chalecos e instrucciones de seguridad:</strong> todos reciben chaleco salvavidas y orientaciones básicas de seguridad a bordo. La seguridad es prioridad en todos nuestros paseos.'],
      ['<strong>Embarque no pier:</strong> a equipe acompanha o grupo até a lancha, auxilia no embarque e apresenta o marinheiro que conduzirá o passeio.', '<strong>Embarque en el muelle:</strong> el equipo acompaña al grupo hasta la lancha, asiste en el embarque y presenta al capitán que conducirá el paseo.'],
      ['A partir daí, é só curtir. O marinheiro conhece todos os melhores pontos do litoral carioca e vai garantir que o passeio seja inesquecível.', 'A partir de ahí, solo a disfrutar. El capitán conoce todos los mejores puntos del litoral carioca y garantizará que el paseo sea inolvidable.'],
      ['Infraestrutura da Marina da Glória', 'Infraestructura de la Marina da Glória'],
      ['A Marina da Glória é muito mais do que um ponto de embarque. O complexo oferece uma infraestrutura completa para antes e depois do seu passeio:', 'La Marina da Glória es mucho más que un punto de embarque. El complejo ofrece una infraestructura completa para antes y después de tu paseo:'],
      ['<strong>Restaurantes e bares:</strong> há diversas opções gastronômicas no entorno da marina, ideais para um almoço antes do embarque ou um jantar após o passeio.', '<strong>Restaurantes y bares:</strong> hay diversas opciones gastronómicas en los alrededores de la marina, ideales para un almuerzo antes del embarque o una cena después del paseo.'],
      ['<strong>Banheiros:</strong> a marina conta com banheiros disponíveis para uso dos visitantes.', '<strong>Baños:</strong> la marina cuenta con baños disponibles para uso de los visitantes.'],
      ['<strong>Parque do Flamengo:</strong> o maior parque urbano à beira-mar do mundo está literalmente ao lado. Vale chegar mais cedo para uma caminhada ou aproveitar o espaço com as crianças.', '<strong>Parque do Flamengo:</strong> el mayor parque urbano frente al mar del mundo está literalmente al lado. Vale la pena llegar más temprano para una caminata o disfrutar el espacio con los niños.'],
      ['<strong>Vista panorâmica:</strong> mesmo antes de embarcar, a vista da Baía de Guanabara, do Pão de Açúcar e do Cristo Redentor já vale o passeio.', '<strong>Vista panorámica:</strong> incluso antes de embarcar, la vista de la Bahía de Guanabara, del Pan de Azúcar y del Cristo Redentor ya vale el paseo.'],
      ['Dicas Práticas para o Dia do Passeio', 'Consejos Prácticos para el Día del Paseo'],
      ['Para aproveitar ao máximo sua experiência na lancha, separamos algumas dicas essenciais:', 'Para aprovechar al máximo tu experiencia en la lancha, separamos algunos consejos esenciales:'],
      ['<strong>Protetor solar:</strong> indispensável. O sol no mar é muito mais intenso do que na cidade. Leve protetor de alto fator (FPS 50+) e reaplique ao longo do passeio.', '<strong>Protector solar:</strong> indispensable. El sol en el mar es mucho más intenso que en la ciudad. Lleva protector de alto factor (FPS 50+) y reaplica durante el paseo.'],
      ['<strong>Roupas leves:</strong> vista roupas confortáveis e leves. Biquíni, sunga ou roupa de banho por baixo, com uma saída de praia ou camiseta por cima.', '<strong>Ropa liviana:</strong> viste ropa cómoda y liviana. Bikini, traje de baño por debajo, con una salida de playa o camiseta por encima.'],
      ['<strong>Bebidas e comida:</strong> você pode levar suas próprias bebidas e petiscos para o cooler da lancha (gelo não incluso). Se preferir praticidade, consulte nosso <a href="/es/servicios/">serviço de open bar, churrasco e decoração</a>.', '<strong>Bebidas y comida:</strong> puedes llevar tus propias bebidas y bocadillos para el cooler de la lancha (hielo no incluido). Si prefieres practicidad, consulta nuestro <a href="/es/servicios/">servicio de open bar, parrilla y decoración</a>.'],
      ['<strong>Toalha e troca de roupa:</strong> leve uma toalha e uma muda de roupa seca para o retorno.', '<strong>Toalla y cambio de ropa:</strong> lleva una toalla y una muda de ropa seca para el regreso.'],
      ['<strong>Calçado adequado:</strong> chinelo ou sapatilha de neoprene são ideais. Evite sapatos com salto ou sola escura que possam marcar o deck.', '<strong>Calzado adecuado:</strong> chancletas o zapatillas de neopreno son ideales. Evita zapatos con tacón o suela oscura que puedan marcar el deck.'],
      ['<strong>Pertences eletrônicos:</strong> leve o celular em uma capinha à prova d\'água. Câmeras e drones são bem-vindos, mas sempre com cuidado redobrado perto da água.', '<strong>Objetos electrónicos:</strong> lleva el celular en una funda impermeable. Cámaras y drones son bienvenidos, pero siempre con cuidado extra cerca del agua.'],
      ['Dica da equipe WeBoat: se for a primeira vez do grupo em um passeio de lancha, relaxe. Nossa equipe cuida de tudo para que vocês só precisem se preocupar em curtir.', 'Consejo del equipo WeBoat: si es la primera vez del grupo en un paseo en lancha, relájense. Nuestro equipo se encarga de todo para que solo necesiten preocuparse por disfrutar.'],
      ['Reserve Seu Passeio na Marina da Glória', 'Reserva Tu Paseo en la Marina da Glória'],
      ['Agora que você já sabe tudo sobre a Marina da Glória, está na hora de reservar seu passeio. A <strong>WeBoat Brasil</strong> oferece lanchas para grupos de 10 a 65 pessoas, com roteiros a partir de R$ 2.300 por 5 horas de passeio. Todos os passeios incluem combustível, marinheiro experiente, coolers, sistema de som Bluetooth, coletes salva-vidas e seguro obrigatório.', 'Ahora que ya sabes todo sobre la Marina da Glória, es hora de reservar tu paseo. <strong>WeBoat Brasil</strong> ofrece lanchas para grupos de 10 a 65 personas, con rutas desde R$ 2.300 por 5 horas de paseo. Todos los paseos incluyen combustible, capitán experimentado, coolers, sistema de sonido Bluetooth, chalecos salvavidas y seguro obligatorio.'],
      ['Fale com a gente pelo WhatsApp e monte o passeio perfeito para o seu grupo:', 'Habla con nosotros por WhatsApp y arma el paseo perfecto para tu grupo:'],
      ['Pronto para Conhecer o Rio de Lancha?', '¿Listo para Conocer Río en Lancha?'],
      ['Fale com nossa equipe e reserve seu passeio saindo da Marina da Glória. Atendimento todos os dias, das 8h às 20h.', 'Habla con nuestro equipo y reserva tu paseo saliendo de la Marina da Glória. Atención todos los días, de 8h a 20h.'],
      ['Reservar pelo WhatsApp', 'Reservar por WhatsApp'],
      ['Leia Também', 'Lee También'],
      ['Melhores Praias para Visitar de Lancha no RJ', 'Mejores Playas para Visitar en Lancha en RJ'],
      ['Descubra as praias mais bonitas do Rio de Janeiro que só são acessíveis (ou muito melhores) de lancha. Da Praia Vermelha às Ilhas Cagarras.', 'Descubre las playas más hermosas de Río de Janeiro que solo son accesibles (o mucho mejores) en lancha. De Praia Vermelha a Ilhas Cagarras.'],
      ['Ler artigo', 'Leer artículo'],
      ['O Que Vestir num Passeio de Lancha: Guia Completo', 'Qué Ponerse en un Paseo en Lancha: Guía Completa'],
      ['Guia prático de como se vestir para um passeio de lancha no Rio. O que levar, o que evitar e dicas de proteção solar.', 'Guía práctica de cómo vestirse para un paseo en lancha en Río. Qué llevar, qué evitar y consejos de protección solar.'],
      ['Pronto para Seu Passeio de Lancha?', '¿Listo para Tu Paseo en Lancha?'],
      ['Escolha sua lancha, roteiro e serviços extras. Passeios a partir de R$ 2.300 com tudo incluso.', 'Elige tu lancha, ruta y servicios extras. Paseos desde R$ 2.300 con todo incluido.'],
    ],
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
      contentBlocks: [
      // ── LONG BLOCKS FIRST (contain 'Política de Privacidade' — MUST come before short block) ──
      ['A WeBoat Brasil reserva-se o direito de alterar esta Política de Privacidade a qualquer momento. As alterações entram em vigor imediatamente após publicação no site. Recomendamos a leitura periódica desta página.', 'WeBoat Brasil se reserva el derecho de modificar esta Política de Privacidad en cualquier momento. Los cambios entran en vigor inmediatamente después de su publicación en el sitio. Recomendamos la lectura periódica de esta página.'],
      ['A WeBoat Brasil está comprometida com a proteção dos seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).', 'WeBoat Brasil está comprometida con la protección de tus datos personales, en conformidad con la Ley General de Protección de Datos (LGPD — Ley nº 13.709/2018).'],
      // ── SHORT BLOCKS (after long ones) ──
      ['Política de Privacidade', 'Política de Privacidad'],
      ['Última atualização: Fevereiro de 2026', 'Última actualización: Febrero de 2026'],
      ['1. Informações que Coletamos', '1. Información que Recopilamos'],
      ['Coletamos dados pessoais que você nos fornece diretamente ao entrar em contato conosco:', 'Recopilamos datos personales que nos proporcionas directamente al contactarnos:'],
      ['<strong>Dados de identificação:</strong> nome, telefone e e-mail', '<strong>Datos de identificación:</strong> nombre, teléfono y e-mail'],
      ['<strong>Dados da reserva:</strong> data desejada, lancha de interesse, número de convidados, serviços adicionais e preferências de passeio', '<strong>Datos de la reserva:</strong> fecha deseada, lancha de interés, número de invitados, servicios adicionales y preferencias del paseo'],
      ['<strong>Dados de pagamento:</strong> comprovantes de PIX ou transferência (não armazenamos dados de cartão de crédito)', '<strong>Datos de pago:</strong> comprobantes de PIX o transferencia (no almacenamos datos de tarjeta de crédito)'],
      ['<strong>Comunicações:</strong> mensagens trocadas via WhatsApp e formulário do site', '<strong>Comunicaciones:</strong> mensajes intercambiados vía WhatsApp y formulario del sitio'],
      ['1.1. Dados Coletados Automaticamente', '1.1. Datos Recopilados Automáticamente'],
      ['Ao navegar em nosso site, coletamos automaticamente:', 'Al navegar en nuestro sitio, recopilamos automáticamente:'],
      ['<strong>Cookies e tecnologias similares:</strong> utilizamos o Google Tag Manager (GTM) para gerenciar ferramentas de análise e marketing', '<strong>Cookies y tecnologías similares:</strong> utilizamos Google Tag Manager (GTM) para gestionar herramientas de análisis y marketing'],
      ['<strong>Dados de navegação:</strong> páginas visitadas, tempo de permanência, dispositivo e navegador utilizados', '<strong>Datos de navegación:</strong> páginas visitadas, tiempo de permanencia, dispositivo y navegador utilizados'],
      ['<strong>Dados de localização aproximada:</strong> com base no endereço IP', '<strong>Datos de ubicación aproximada:</strong> basados en la dirección IP'],
      ['2. Como Usamos suas Informações', '2. Cómo Usamos tu Información'],
      ['Utilizamos suas informações para as seguintes finalidades:', 'Utilizamos tu información para las siguientes finalidades:'],
      ['Processar suas reservas e solicitações de passeio', 'Procesar tus reservas y solicitudes de paseo'],
      ['Entrar em contato para confirmar detalhes do passeio', 'Contactarte para confirmar detalles del paseo'],
      ['Enviar follow-ups e informações relevantes sobre sua reserva', 'Enviar seguimientos e información relevante sobre tu reserva'],
      ['Melhorar nossos serviços e a experiência do cliente', 'Mejorar nuestros servicios y la experiencia del cliente'],
      ['Analisar o desempenho do site e campanhas de marketing', 'Analizar el rendimiento del sitio y campañas de marketing'],
      ['Cumprir obrigações legais e regulatórias', 'Cumplir obligaciones legales y regulatorias'],
      ['3. Base Legal para o Tratamento', '3. Base Legal para el Tratamiento'],
      ['Tratamos seus dados pessoais com base nas seguintes hipóteses legais da LGPD:', 'Tratamos tus datos personales con base en las siguientes hipótesis legales de la LGPD:'],
      ['<strong>Execução de contrato:</strong> para processar reservas e prestar os serviços contratados', '<strong>Ejecución de contrato:</strong> para procesar reservas y prestar los servicios contratados'],
      ['<strong>Consentimento:</strong> para envio de comunicações de marketing e uso de cookies não essenciais', '<strong>Consentimiento:</strong> para envío de comunicaciones de marketing y uso de cookies no esenciales'],
      ['<strong>Legítimo interesse:</strong> para melhorar nossos serviços e prevenir fraudes', '<strong>Interés legítimo:</strong> para mejorar nuestros servicios y prevenir fraudes'],
      ['4. Compartilhamento de Informações', '4. Compartición de Información'],
      ['Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins de marketing. Podemos compartilhar dados com:', 'No vendemos, alquilamos ni compartimos tu información personal con terceros con fines de marketing. Podemos compartir datos con:'],
      ['<strong>Prestadores de serviço:</strong> empresas que nos auxiliam na operação (processamento de pagamentos, hospedagem do site, ferramentas de comunicação)', '<strong>Prestadores de servicios:</strong> empresas que nos asisten en la operación (procesamiento de pagos, alojamiento del sitio, herramientas de comunicación)'],
      ['<strong>Parceiros de embarcação:</strong> quando a reserva envolve uma lancha parceira, compartilhamos apenas os dados necessários para a realização do passeio', '<strong>Socios de embarcación:</strong> cuando la reserva involucra una lancha socia, compartimos solo los datos necesarios para la realización del paseo'],
      ['<strong>Autoridades competentes:</strong> quando exigido por lei ou determinação judicial', '<strong>Autoridades competentes:</strong> cuando sea exigido por ley o determinación judicial'],
      ['5. Cookies e Tecnologias de Rastreamento', '5. Cookies y Tecnologías de Rastreo'],
      ['Nosso site utiliza cookies e tecnologias similares gerenciados pelo Google Tag Manager. Isso pode incluir:', 'Nuestro sitio utiliza cookies y tecnologías similares gestionados por Google Tag Manager. Esto puede incluir:'],
      ['<strong>Google Analytics 4:</strong> análise de tráfego e comportamento no site', '<strong>Google Analytics 4:</strong> análisis de tráfico y comportamiento en el sitio'],
      ['<strong>Meta Pixel:</strong> mensuração de campanhas no Facebook e Instagram', '<strong>Meta Pixel:</strong> medición de campañas en Facebook e Instagram'],
      ['<strong>Google Ads:</strong> mensuração de campanhas de pesquisa', '<strong>Google Ads:</strong> medición de campañas de búsqueda'],
      ['Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.', 'Puedes gestionar tus preferencias de cookies a través de la configuración de tu navegador.'],
      ['6. Retenção de Dados', '6. Retención de Datos'],
      ['Seus dados pessoais são armazenados pelo tempo necessário para cumprir as finalidades descritas nesta política. Dados de reservas são mantidos por até 5 anos para fins fiscais e legais. Dados de marketing são mantidos até a revogação do consentimento.', 'Tus datos personales se almacenan por el tiempo necesario para cumplir las finalidades descritas en esta política. Los datos de reservas se mantienen por hasta 5 años con fines fiscales y legales. Los datos de marketing se mantienen hasta la revocación del consentimiento.'],
      ['7. Segurança', '7. Seguridad'],
      ['Implementamos medidas técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, perda, alteração ou destruição, incluindo criptografia de dados em trânsito (HTTPS) e controle de acesso restrito.', 'Implementamos medidas técnicas y organizacionales para proteger tu información personal contra acceso no autorizado, pérdida, alteración o destrucción, incluyendo cifrado de datos en tránsito (HTTPS) y control de acceso restringido.'],
      ['8. Seus Direitos (LGPD)', '8. Tus Derechos (LGPD)'],
      ['Conforme a LGPD, você tem direito a:', 'Conforme la LGPD, tienes derecho a:'],
      ['Confirmar a existência de tratamento dos seus dados', 'Confirmar la existencia de tratamiento de tus datos'],
      ['Acessar seus dados pessoais', 'Acceder a tus datos personales'],
      ['Corrigir dados incompletos, inexatos ou desatualizados', 'Corregir datos incompletos, inexactos o desactualizados'],
      ['Solicitar a eliminação dos dados tratados com consentimento', 'Solicitar la eliminación de los datos tratados con consentimiento'],
      ['Revogar o consentimento a qualquer momento', 'Revocar el consentimiento en cualquier momento'],
      ['Solicitar a portabilidade dos dados', 'Solicitar la portabilidad de los datos'],
      ['Para exercer qualquer desses direitos, entre em contato pelo WhatsApp <a href="https://wa.me/5521977724114">(21) 97772-4114</a>. Responderemos em até 15 dias úteis.', 'Para ejercer cualquiera de estos derechos, contáctanos por WhatsApp <a href="https://wa.me/5521977724114">(21) 97772-4114</a>. Responderemos en hasta 15 días hábiles.'],
      ['9. Alterações nesta Política', '9. Cambios en esta Política'],
      // NOTE: Full paragraph moved to top of contentBlocks (before short 'Política de Privacidade' block)
      ['10. Contato', '10. Contacto'],
      ['Para dúvidas sobre esta política ou sobre o tratamento dos seus dados pessoais, entre em contato:', 'Para dudas sobre esta política o sobre el tratamiento de tus datos personales, contáctanos:'],
      ['Horário de atendimento: 8h às 20h', 'Horario de atención: 8h a 20h'],
    ],
  },
  {
    ptPath: 'termos-de-uso/index.html',
    esPath: 'es/terminos-de-uso/index.html',
    title: 'Términos de Uso | WeBoat Brasil',
    description: 'Términos de uso de WeBoat Brasil. Condiciones de reserva, política de cancelación, responsabilidades.',
    keywords: 'weboat términos de uso, condiciones alquiler lancha, política cancelación',
    waMessage: '¡Hola! Tengo una pregunta sobre los términos de uso. [via site - es]',
    css: null,
      contentBlocks: [
      // IMPORTANT: Full body text with "Termos de Uso" must come BEFORE short 'Termos de Uso' block
      ['Ao utilizar os serviços da WeBoat Brasil, você concorda com estes Termos de Uso. Se não concordar, por favor não utilize nossos serviços. A reserva de qualquer passeio implica aceitação integral destes termos.', 'Al utilizar los servicios de WeBoat Brasil, aceptas estos Términos de Uso. Si no estás de acuerdo, por favor no utilices nuestros servicios. La reserva de cualquier paseo implica la aceptación integral de estos términos.'],
      ['Termos de Uso', 'Términos de Uso'],
      ['Última atualização: Fevereiro de 2026', 'Última actualización: Febrero de 2026'],
      ['1. Aceitação dos Termos', '1. Aceptación de los Términos'],
      ['2. Serviços Oferecidos', '2. Servicios Ofrecidos'],
      ['A WeBoat Brasil oferece serviços de aluguel de lanchas para passeios privativos no Rio de Janeiro, com saída da Marina da Glória. Todos os passeios incluem marinheiro habilitado pela Marinha, combustível para o roteiro escolhido, coolers, som Bluetooth, tapete e macarrões flutuantes, coletes salva-vidas e seguro obrigatório.', 'WeBoat Brasil ofrece servicios de alquiler de lanchas para paseos privados en Río de Janeiro, con salida desde la Marina da Glória. Todos los paseos incluyen capitán habilitado por la Marina, combustible para la ruta elegida, coolers, sonido Bluetooth, colchoneta y flotadores, chalecos salvavidas y seguro obligatorio.'],
      ['Serviços opcionais como churrasco, open bar, decoração, DJ e fotógrafo podem ser contratados à parte.', 'Servicios opcionales como parrilla, open bar, decoración, DJ y fotógrafo pueden contratarse por separado.'],
      ['3. Reservas e Pagamento', '3. Reservas y Pago'],
      ['As reservas são feitas mediante confirmação via WhatsApp <a href="https://wa.me/5521977724114">(21) 97772-4114</a>', 'Las reservas se realizan mediante confirmación vía WhatsApp <a href="https://wa.me/5521977724114">(21) 97772-4114</a>'],
      ['A reserva é confirmada com o pagamento de um <strong>sinal de 50% do valor total</strong>', 'La reserva se confirma con el pago de una <strong>seña del 50% del valor total</strong>'],
      ['O pagamento restante (50%) deve ser efetuado até o momento do embarque', 'El pago restante (50%) debe realizarse hasta el momento del embarque'],
      ['Formas de pagamento aceitas: PIX (preferencial, sem taxas), transferência bancária, cartão de crédito (até 12x com juros, taxas da operadora repassadas) e cartão de débito', 'Formas de pago aceptadas: PIX (preferencial, sin tasas), transferencia bancaria, tarjeta de crédito (hasta 12x con intereses, tasas de la operadora trasladadas) y tarjeta de débito'],
      ['A reserva é feita em nome de um único contratante, responsável por todos os convidados a bordo', 'La reserva se hace a nombre de un único contratante, responsable de todos los invitados a bordo'],
      ['4. Cancelamento e Reagendamento', '4. Cancelación y Reprogramación'],
      ['O sinal de 50% garante a reserva da embarcação na data e horário escolhidos. Ao efetuar o pagamento do sinal, o cliente reconhece que:', 'La seña del 50% garantiza la reserva de la embarcación en la fecha y horario elegidos. Al efectuar el pago de la seña, el cliente reconoce que:'],
      ['<strong>O sinal não dá direito a arrependimento</strong>, seja por motivos pessoais, familiares, de saúde ou qualquer outra razão', '<strong>La seña no da derecho a arrepentimiento</strong>, sea por motivos personales, familiares, de salud o cualquier otra razón'],
      ['A partir da confirmação da reserva, a lancha deixa de ser ofertada a outros interessados, gerando um custo operacional para a WeBoat Brasil', 'A partir de la confirmación de la reserva, la lancha deja de ofrecerse a otros interesados, generando un costo operacional para WeBoat Brasil'],
      ['<strong>Precisa cancelar ou reagendar?</strong> Entre em contato o quanto antes pelo WhatsApp. Nosso objetivo não é ficar com seu sinal. Se conseguirmos outro cliente para preencher sua data, liberamos o valor integral para estorno ou remarcação', '<strong>¿Necesitas cancelar o reprogramar?</strong> Contáctanos lo antes posible por WhatsApp. Nuestro objetivo no es quedarnos con tu seña. Si conseguimos otro cliente para llenar tu fecha, liberamos el valor integral para devolución o reprogramación'],
      ['<strong>Não comparecimento (no-show):</strong> resulta na perda total do sinal, sem direito a reagendamento ou reembolso', '<strong>No presentación (no-show):</strong> resulta en la pérdida total de la seña, sin derecho a reprogramación o reembolso'],
      ['4.1. Condições Climáticas', '4.1. Condiciones Climáticas'],
      ['A remarcação por motivo climático só é possível em caso de <strong>chuva forte</strong> que inviabilize a navegação no dia e horário do passeio', 'La reprogramación por motivo climático solo es posible en caso de <strong>lluvia fuerte</strong> que imposibilite la navegación en el día y horario del paseo'],
      ['Tempo nublado ou chuva leve não geram direito a remarcação, pois as lanchas possuem toldo', 'Tiempo nublado o lluvia leve no generan derecho a reprogramación, ya que las lanchas tienen toldo'],
      ['Em caso de más condições de navegabilidade, o roteiro pode ser alterado automaticamente para a Baía de Guanabara', 'En caso de malas condiciones de navegabilidad, la ruta puede ser cambiada automáticamente a la Bahía de Guanabara'],
      ['Previsão de chuva não é critério para cancelamento — a avaliação é feita com base nas condições reais no dia e horário do passeio', 'Pronóstico de lluvia no es criterio para cancelación — la evaluación se hace con base en las condiciones reales en el día y horario del paseo'],
      ['4.2. Problemas com a Embarcação', '4.2. Problemas con la Embarcación'],
      ['Em caso de problemas mecânicos ou técnicos com a embarcação contratada, a WeBoat Brasil disponibilizará opções similares ou superiores. Caso o cliente não aprove nenhuma das alternativas oferecidas, será realizada a devolução integral do valor pago.', 'En caso de problemas mecánicos o técnicos con la embarcación contratada, WeBoat Brasil proporcionará opciones similares o superiores. En caso de que el cliente no apruebe ninguna de las alternativas ofrecidas, se realizará la devolución integral del valor pagado.'],
      ['5. Regras de Segurança', '5. Reglas de Seguridad'],
      ['Obedeça sempre às instruções do marinheiro — ele tem autoridade máxima a bordo', 'Obedece siempre las instrucciones del capitán — él tiene autoridad máxima a bordo'],
      ['O uso de coletes salva-vidas é obrigatório durante navegação em mar aberto', 'El uso de chalecos salvavidas es obligatorio durante la navegación en mar abierto'],
      ['É proibido o uso de substâncias ilícitas a bordo', 'Está prohibido el uso de sustancias ilícitas a bordo'],
      ['O consumo de álcool deve ser moderado', 'El consumo de alcohol debe ser moderado'],
      ['Crianças devem estar sempre acompanhadas de responsável', 'Los niños deben estar siempre acompañados de un responsable'],
      ['É proibido levar narguilé, fogos de artifício e confetes', 'Está prohibido llevar narguile, fuegos artificiales y confeti'],
      ['Bronzeadores não são permitidos — use protetor solar', 'Bronceadores no están permitidos — usa protector solar'],
      ['A embarcação não pode atracar ao lado de outros barcos', 'La embarcación no puede atracar al lado de otros barcos'],
      ['6. Capacidade das Embarcações', '6. Capacidad de las Embarcaciones'],
      ['A capacidade máxima de cada lancha deve ser rigorosamente respeitada por questões de segurança e regulamentação marítima. <strong>Todos contam como passageiros</strong>, independentemente de idade, peso ou tamanho — incluindo profissionais contratados (DJ, barman, fotógrafo). O marinheiro tem autoridade para recusar embarque caso a capacidade seja excedida.', 'La capacidad máxima de cada lancha debe ser rigurosamente respetada por cuestiones de seguridad y regulación marítima. <strong>Todos cuentan como pasajeros</strong>, independientemente de edad, peso o tamaño — incluyendo profesionales contratados (DJ, barman, fotógrafo). El capitán tiene autoridad para rechazar el embarque si la capacidad es excedida.'],
      ['7. Pontualidade', '7. Puntualidad'],
      ['O cliente deve chegar com pelo menos <strong>30 minutos de antecedência</strong> do horário marcado', 'El cliente debe llegar con al menos <strong>30 minutos de anticipación</strong> del horario programado'],
      ['O tempo de atraso será descontado do tempo total do passeio', 'El tiempo de atraso será descontado del tiempo total del paseo'],
      ['Todos os passageiros devem embarcar e desembarcar no mesmo local (Marina da Glória)', 'Todos los pasajeros deben embarcar y desembarcar en el mismo lugar (Marina da Glória)'],
      ['8. Responsabilidades do Cliente', '8. Responsabilidades del Cliente'],
      ['Zelar pela embarcação e equipamentos durante todo o passeio', 'Cuidar la embarcación y equipos durante todo el paseo'],
      ['Informar restrições médicas ou necessidades especiais antes do embarque', 'Informar restricciones médicas o necesidades especiales antes del embarque'],
      ['Danos causados à embarcação ou equipamentos por negligência, mau uso ou descumprimento das regras serão cobrados integralmente do contratante', 'Daños causados a la embarcación o equipos por negligencia, mal uso o incumplimiento de las reglas serán cobrados integralmente al contratante'],
      ['Não jogar papel ou qualquer material no vaso sanitário — danos ao sistema serão cobrados', 'No tirar papel ni ningún material en el inodoro — los daños al sistema serán cobrados'],
      ['9. Uso de Imagem', '9. Uso de Imagen'],
      ['Ao contratar nossos serviços, o cliente autoriza o uso de imagens do passeio para fins de divulgação em redes sociais e materiais promocionais da WeBoat Brasil. Se preferir que suas fotos não sejam utilizadas, basta informar nossa equipe antes ou durante o passeio.', 'Al contratar nuestros servicios, el cliente autoriza el uso de imágenes del paseo con fines de divulgación en redes sociales y materiales promocionales de WeBoat Brasil. Si prefieres que tus fotos no sean utilizadas, solo informa a nuestro equipo antes o durante el paseo.'],
      ['10. Limitação de Responsabilidade', '10. Limitación de Responsabilidad'],
      ['A WeBoat Brasil não se responsabiliza por objetos pessoais perdidos ou danificados durante o passeio', 'WeBoat Brasil no se responsabiliza por objetos personales perdidos o dañados durante el paseo'],
      ['A decisão de entrar na água é de responsabilidade exclusiva dos passageiros', 'La decisión de entrar al agua es responsabilidad exclusiva de los pasajeros'],
      ['Nossas embarcações não possuem acessibilidade específica para cadeirantes e pessoas com mobilidade reduzida', 'Nuestras embarcaciones no poseen accesibilidad específica para personas en silla de ruedas y personas con movilidad reducida'],
      ['O uso da embarcação é destinado exclusivamente a atividades de turismo náutico e lazer. Qualquer uso indevido resultará na interrupção imediata do passeio e possíveis ações legais', 'El uso de la embarcación está destinado exclusivamente a actividades de turismo náutico y ocio. Cualquier uso indebido resultará en la interrupción inmediata del paseo y posibles acciones legales'],
      ['11. Alterações nos Termos', '11. Cambios en los Términos'],
      ['A WeBoat Brasil reserva-se o direito de alterar estes termos a qualquer momento. As alterações entram em vigor imediatamente após publicação no site. Recomendamos a leitura periódica desta página.', 'WeBoat Brasil se reserva el derecho de modificar estos términos en cualquier momento. Los cambios entran en vigor inmediatamente después de su publicación en el sitio. Recomendamos la lectura periódica de esta página.'],
      ['12. Contato', '12. Contacto'],
      ['Para dúvidas sobre estes termos, entre em contato:', 'Para dudas sobre estos términos, contáctanos:'],
      ['Horário de atendimento comercial: 8h às 20h', 'Horario de atención comercial: 8h a 20h'],
    ],
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
      contentBlocks: [
      ['Dados', 'Datos'],
      ['Pagamento', 'Pago'],
      ['Confirmação', 'Confirmación'],
      ['Carregando sua proposta...', 'Cargando tu propuesta...'],
      ['Erro', 'Error'],
      ['Algo deu errado.', 'Algo salió mal.'],
      ['Resumo do Passeio', 'Resumen del Paseo'],
      ['Seus Dados', 'Tus Datos'],
      ['Nome completo', 'Nombre completo'],
      ['Sou estrangeiro (I\'m a foreigner)', 'Soy extranjero (I\'m a foreigner)'],
      ['Continuar para Pagamento', 'Continuar al Pago'],
      ['Li e aceito os <a href="/es/terminos-de-uso/" target="_blank">Termos de Uso</a> e a <a href="/es/politica-de-privacidad/" target="_blank">Política de Privacidade</a> da WeBoat Brasil.', 'He leído y acepto los <a href="/es/terminos-de-uso/" target="_blank">Términos de Uso</a> y la <a href="/es/politica-de-privacidad/" target="_blank">Política de Privacidad</a> de WeBoat Brasil.'],
      ['Selecione o método de pagamento:', 'Selecciona el método de pago:'],
      ['Pagamento instantâneo via QR code', 'Pago instantáneo vía código QR'],
      ['Cartão de Crédito', 'Tarjeta de Crédito'],
      ['Parcele em até 12x', 'Hasta 12 cuotas'],
      ['Pagar Agora', 'Pagar Ahora'],
      ['Pague com PIX', 'Paga con PIX'],
      ['Ou copie o código abaixo:', 'O copia el código a continuación:'],
      ['Copiar', 'Copiar'],
      ['Aguardando pagamento...', 'Esperando el pago...'],
      ['Parcelas:', 'Cuotas:'],
      ['1x sem juros', '1x sin intereses'],
      ['2x sem juros', '2x sin intereses'],
      ['3x sem juros', '3x sin intereses'],
      ['Reserva Confirmada!', '¡Reserva Confirmada!'],
      ['Enviamos a confirmação para', 'Enviamos la confirmación a'],
      ['Voltar ao Site', 'Volver al Sitio'],
    ],
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
  ['>Sobre<', '>Sobre Nosotros<'],
  ['"Sobre"', '"Sobre Nosotros"'],
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
  ['Barco para eventos com', 'Barco para eventos con'],
  ['Maior embarcação para', 'Mayor embarcación para'],
  ['Maior embarcação', 'Mayor embarcación'],
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
  ['+2.500 passeios realizados', '+2.500 paseos realizados'],
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
  ['Vista exterior', 'Vista exterior'],
  ['Vista mar', 'Vista al mar'],
  ['Detalhes', 'Detalles'],

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
  // NOTE: 'Reserva Confirmada!' removed from dictionary — handled by checkout contentBlocks.
  // Having it in both caused double-translation: ¡¡Reserva Confirmada!
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
  ['Escolha seu Kit', 'Elija su tipo de asado'],
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

  // --- Global Schema.org Organization description (appears on all pages) ---
  // After contentBlocks + dictionary partial translation, the text becomes mixed PT/ES.
  // These entries catch the partially-translated leftovers.
  ['Paseos privativos com conforto e segurança.', 'Paseos privativos con confort y seguridad.'],
  ['com conforto e segurança', 'con confort y seguridad'],

  // --- Global Schema.org Service description (appears on ~4 pages) ---
  ['6 roteiros de 5h pela', '6 rutas de 5h por la'],
  ['Copacabana, Ilhas Cagarras e Niterói', 'Copacabana, Ilhas Cagarras y Niterói'],

  // --- HTML comments (cosmetic, visible in source) ---
  ['Preenchido pelo JS', 'Completado por JS'],

  // --- CollectionPage descriptions that stay partially in PT ---
  ['para aluguel no RJ', 'para alquiler en RJ'],
  ['e 21 parceiras para', 'y 21 asociadas para'],
  ['parceiras para grupos', 'asociadas para grupos'],
  ['Todas as embarcações são vistoriadas e preparadas para seu', 'Todas las embarcaciones están inspeccionadas y preparadas para su'],

  // --- Mixed PT/ES fragments in visible text ---
  ['propias e 21 parceiras', 'propias y 21 asociadas'],

  // --- Missing translations (batch 2026-02-16) ---
  // Longer strings MUST come before shorter substrings

  // Service item descriptions (services page)
  ['Picanha, linguiça, frango e pão de alho', 'Picanha, chorizo, longaniza, pollo y pan de ajo'],
  ['Cerveja, caipirinha, refrigerante, água e gelo', 'Cerveza, caipirinha, refresco, agua y hielo'],
  ['Todas as bebidas', 'Todas las bebidas'],
  ['Gelo à vontade', 'Hielo a voluntad'],
  ['Copos e taças', 'Vasos y copas'],
  ['Montagem de bar', 'Montaje de bar'],
  ['Faixas personalizadas', 'Fajas personalizadas'],
  ['Desmontagem inclusa', 'Desmontaje incluido'],
  ['Balões e arranjos', 'Globos y arreglos'],
  ['Adereços temáticos', 'Accesorios temáticos'],

  // Checkout & forms
  ['Cartão de Débito', 'Tarjeta de Débito'],
  ['método de pagamento', 'método de pago'],
  ['Selecionar', 'Seleccionar'],
  ['seu@email.com', 'tu@email.com'],
  ['Dinheiro', 'Efectivo'],

  // Schema.org payment methods
  ['Itaipu e Camboinhas', 'Itaipu y Camboinhas'],

  // Badges & labels
  ['Ver Todas as Dudas', 'Ver Todas las Dudas'],
  ['Economia', 'Ahorro'],
  ['Parceira', 'Asociada'],
  ['Frequentes', 'Frecuentes'],
  ['Oferecemos', 'Ofrecemos'],

  // Misc content
  ['adereços', 'accesorios'],
  ['balões', 'globos'],
  ['/pessoa', '/persona'],
  ['Diminuir', 'Reducir'],

  // --- Batch 3 (2026-02-16): Common PT words found in ES output ---
  // These are sorted by length (longest first) but translateContent() auto-sorts anyway

  // ar-condicionado (appears on lanchas/index, lanchas/comparar, index.html partner boats)
  ['ar-condicionado', 'aire acondicionado'],
  ['ar condicionado', 'aire acondicionado'],
  ['Ar condicionado', 'Aire acondicionado'],

  // Schema FAQ answers that stay partially in PT after contentBlocks partial match
  ['Rutas mais longos como Ilhas Cagarras custam desde', 'Rutas más largas como Ilhas Cagarras cuestan desde'],
  ['mais longos como Ilhas Cagarras custam a partir de', 'más largas como Ilhas Cagarras cuestan desde'],
  ['Consulte nossa', 'Consulte nuestra'],
  ['preços detalhados por embarcación', 'precios detallados por embarcación'],
  ['preços detalhados por embarcação', 'precios detallados por embarcación'],
  ['página de lanchas', 'página de lanchas'],

  // sobre-nosotros visible text that stays partially in PT
  ['A WeBoat Brasil é uma empresa de', 'WeBoat Brasil es una empresa de'],
  ['com sede na Marina da Glória', 'con sede en la Marina da Glória'],
  ['Fundada em 2021', 'Fundada en 2021'],
  ['realizou mais de', 'ha realizado más de'],
  ['opera 5 lanchas', 'opera 5 lanchas'],
  ['trabalha com parceiros para atender grupos de', 'trabaja con socios para atender grupos de'],
  ['Já realizou mais de', 'Ya ha realizado más de'],
  ['acumula mais de', 'acumula más de'],
  ['reseñas 5 estrellas no Google', 'reseñas 5 estrellas en Google'],

  // Checkout
  ['Seus Datos', 'Sus Datos'],
  ['Seus Dados', 'Sus Datos'],

  // como-funciona Schema step name
  ['Aproveite seu paseo', 'Disfrute su paseo'],
  ['Aproveite seu passeio', 'Disfrute su paseo'],

  // lanchas/index includes section
  ['Toque suas músicas favoritas', 'Reproduce tus canciones favoritas'],

  // lanchas/weboat-390 CTA
  ['Faça seu asado no mar', 'Haga su asado en el mar'],
  ['Faça seu churrasco no mar', 'Haga su asado en el mar'],
  ['Reserve a WeBoat 390 Agora', 'Reserve la WeBoat 390 Ahora'],

  // cumpleanos CTA
  ['Celebre mais um ano de vida com o cenário mais bonito do', 'Celebre un año más de vida con el escenario más hermoso de'],

  // lanchas/index FAQ - preços semana
  ['Os valores de segunda a quinta são promocionais porque a demanda é menor', 'Los valores de lunes a jueves son promocionales porque la demanda es menor'],
  ['Sexta, sábado e domingo têm alta procura', 'Viernes, sábado y domingo tienen alta demanda'],
  ['Por exemplo, a WeBoat 32 custa', 'Por ejemplo, la WeBoat 32 cuesta'],
  ['economia de R$', 'ahorro de R$'],
  ['Por que os preços são diferentes de segunda a quinta', '¿Por qué los precios son diferentes de lunes a jueves'],

  // lanchas/comparar table cells
  ['Menor e mais moderna de la flota', 'Menor y más moderna de la flota'],
  ['deslocamento rápido', 'desplazamiento rápido'],
  ['Mesmo modelo da Oceanic 36', 'Mismo modelo que la Oceanic 36'],
  ['mais bem equipada', 'mejor equipada'],
  ['mais larga que as demais de', 'más ancha que las demás de'],
  ['E se meu grupo tiver mais de', '¿Y si mi grupo tiene más de'],
  ['Consulte a nuestro equipo para más detalles', 'Consulte a nuestro equipo para más detalles'],

  // servicios page
  ['Opções sofisticadas para quem prefere algo mais leve ou quer complementar o passeio', 'Opciones sofisticadas para quienes prefieren algo más ligero o quieren complementar el paseo'],
  ['Respostas rápidas para as perguntas mais comuns', 'Respuestas rápidas a las preguntas más comunes'],
  ['Picanha premium, costela, coração, queijo coalho, saladas completas e sobremesa', 'Picanha premium, chorizo, corazón, queso coalho, ensaladas completas y postre'],

  // carnaval FAQ
  ['Consulte-nos por WhatsApp para encontrar a melhor opção para su grupo', 'Consúltenos por WhatsApp para encontrar la mejor opción para su grupo'],
  ['Consulte-nos', 'Consúltenos'],
  ['a melhor opção', 'la mejor opción'],

  // areas-de-servicio card descriptions (these appear in visible text after contentBlocks leave them partially translated)
  ['A Mureta da Urca e um dos pontos mais tradicionais de', 'Mureta da Urca es uno de los puntos más tradicionales de'],
  ['para encontros e paseos de lancha', 'para encuentros y paseos en lancha'],
  ['Para os mais aventureiros', 'Para los más aventureros'],
  ['O arquipelago das Ilhas Cagarras oferece uma experiência única em mar aberto', 'El archipiélago de las Ilhas Cagarras ofrece una experiencia única en mar abierto'],
  ['A navegação pela Baia de Guanabara e uma das experiencias mais completas de', 'La navegación por la Bahía de Guanabara es una de las experiencias más completas de'],

  // rutas/volta-completa visible text
  ['diversão no mar mais bonito do Brasil', 'diversión en el mar más bonito de Brasil'],

  // ano-nuevo
  ['Não deixe para última hora', '¡No lo dejes para última hora'],
  ['As lanchas para o réveillon esgotam rápido', 'Las lanchas para el Año Nuevo se agotan rápido'],

  // rutas/copacabana Schema description
  ['da orla mais famosa do mundo a partir do mar', 'de la costa más famosa del mundo desde el mar'],

  // rutas/itaipu-camboinhas Schema description
  ['em Niterói. O roteiro mais exclusivo e tranquilo', 'en Niterói. La ruta más exclusiva y tranquila'],

  // rutas/praia-vermelha Schema FAQ
  ['Por que o roteiro Praia Vermelha é o mais vendido', '¿Por qué la ruta Praia Vermelha es la más vendida'],

  // lanchas/weboat-rio-star-50 Schema FAQ
  ['Quanto custa levar mais de 20 personas', '¿Cuánto cuesta llevar más de 20 personas'],

  // seg-qui / sex-dom in boat cards (occasion pages) — use HTML context to avoid false matches
  ['>seg-qui<', '>Lun-Jue<'],
  ['>sex-dom<', '>Vie-Dom<'],

  // Homepage + boat pages - feature descriptions
  ['acabamento premium', 'acabado premium'],
  ['acabamento superior', 'acabado superior'],
  ['acabamento diferenciado', 'acabado diferenciado'],
  ['gerador', 'generador'],

  // lanchas/index FAQ questions (still in PT)
  ['Como faço para reservar uma lancha?', '¿Cómo hago para reservar una lancha?'],
  ['Qual lancha é melhor para meu grupo?', '¿Cuál lancha es mejor para mi grupo?'],
  ['melhor atendimento', 'mejor atención'],
  ['Prioridade', 'Prioridad'],

  // Alt text translations (shared across many pages)
  ['Lancha com churrasqueira para 16 pessoas', 'Lancha con parrilla para 16 personas'],
  ['Lancha com flybridge para 12 pessoas', 'Lancha con flybridge para 12 personas'],
  ['Lancha com churrasqueira para festas', 'Lancha con parrilla para fiestas'],
  ['Lancha com flybridge', 'Lancha con flybridge'],
  ['Lancha para 16 personas com parrilla', 'Lancha para 16 personas con parrilla'],
  ['com camisa da empresa', 'con camisa de la empresa'],
  ['com camisa azul no comando', 'con camisa azul al mando'],
  ['com logo al atardecer', 'con logo al atardecer'],
  ['com embarcações atracadas', 'con embarcaciones atracadas'],
  ['com vista panorâmica do', 'con vista panorámica del'],
  ['com vista do Pão de Açúcar', 'con vista del Pan de Azúcar'],
  ['com lancha ancorada em águas cristalinas', 'con lancha ancorada en aguas cristalinas'],
  ['com mar cristalino', 'con mar cristalino'],
  ['com o Cristo Redentor ao fundo', 'con el Cristo Redentor al fondo'],
  ['com Cristo Redentor ao fundo', 'con Cristo Redentor al fondo'],
  ['com Cristo Redentor', 'con Cristo Redentor'],
  ['com bolo personalizado', 'con pastel personalizado'],
  ['com globos verdes e letreiro', 'con globos verdes y letrero'],
  ['com globos rosa', 'con globos rosa'],
  ['com drinks em confraternização', 'con drinks en confraternización'],
  ['com vista do Rio', 'con vista de Río'],
  ['com óculos Team Bride', 'con lentes Team Bride'],
  ['com véu e óculos Team Bride', 'con velo y lentes Team Bride'],
  ['com faixas Team Bride', 'con bandas Team Bride'],
  ['com drink al atardecer', 'con drink al atardecer'],
  ['com drink rosa', 'con drink rosa'],
  ['com drinks no open bar', 'con drinks en el open bar'],
  ['com Pão de Açúcar e Botafogo', 'con Pan de Azúcar y Botafogo'],
  ['com pratos, flores e taças', 'con platos, flores y copas'],
  ['com luzes da cidade', 'con luces de la ciudad'],
  ['com taças de champanhe', 'con copas de champán'],
  ['com bartenders preparando drinks', 'con bartenders preparando drinks'],
  ['com headphones e controladora', 'con auriculares y controladora'],
  ['com tapete flotante', 'con alfombra flotante'],
  ['com camisas do Brasil', 'con camisas de Brasil'],

  // "Qual" FAQ question patterns (common across many pages)
  ['Qual a duração do passeio', '¿Cuál es la duración del paseo'],
  ['Qual o trajeto da', '¿Cuál es el trayecto de la'],
  ['Qual a diferença entre lanchas próprias e parceiras?', '¿Cuál es la diferencia entre lanchas propias y asociadas?'],

  // Generic PT words that stay behind (SHORTEST ENTRIES — keep at end)
  ['cenário mais bonito', 'escenario más hermoso'],
  ['Agende paseos', 'Agende paseos'],

  // ─── v5.0 AUDIT TRANSLATIONS (2026-02-19) ───
  // Longer strings MUST come before shorter substrings (auto-sorted by translateContent)

  // Boat recommendation cards (roteiro pages)
  ['Lanchas Recomendadas para este Roteiro', 'Lanchas Recomendadas para esta Ruta'],
  ['Confira as lanchas mais populares para este passeio. Todas incluem combustível, marinheiro, coolers e som Bluetooth.', 'Conozca las lanchas más populares para este paseo. Todas incluyen combustible, marinero, hieleras y sonido Bluetooth.'],
  ['Ótima para festas', 'Ideal para fiestas'],

  // Service cross-links (roteiro + occasion pages)
  ['Complemente sua experiência com nossos serviços adicionais.', 'Complemente su experiencia con nuestros servicios adicionales.'],
  ['Churrasco preparado a bordo com toda a praticidade.', 'Asado preparado a bordo con toda la practicidad.'],
  ['Drinks ilimitados com barman profissional a bordo.', 'Drinks ilimitados con barman profesional a bordo.'],
  ['Balões, faixas e decoração personalizada para sua festa.', 'Globos, banderas y decoración personalizada para su fiesta.'],
  ['Serviços Recomendados', 'Servicios Recomendados'],
  ['Serviços Extras', 'Servicios Extras'],
  ['Popular para:', 'Popular para:'],

  // Serviços page — H2s as questions
  ['Quanto custa o churrasco na lancha?', '¿Cuánto cuesta el asado en la lancha?'],
  ['O que inclui o open bar?', '¿Qué incluye el open bar?'],
  ['Quais opções de decoração estão disponíveis?', '¿Qué opciones de decoración están disponibles?'],
  ['Quais combos com desconto posso escolher?', '¿Qué paquetes All Inclusive puedo elegir?'],

  // Roteiro pages — H2s as questions
  ['O que esperar deste passeio?', '¿Qué esperar de este paseo?'],
  ['Qual é o trajeto do passeio?', '¿Cuál es la ruta del paseo?'],
  ['Quais lanchas estão disponíveis?', '¿Qué lanchas están disponibles?'],

  // Áreas atendidas — new bairros section
  ['Quais áreas são atendidas pela WeBoat?', '¿Qué áreas atiende WeBoat?'],
  ['Como chegar à Marina da Glória?', '¿Cómo llegar a la Marina da Glória?'],
  ['Bairros de Embarque e Proximidade', 'Barrios de Embarque y Proximidad'],
  ['A Marina da Glória está estrategicamente localizada no coração do Rio de Janeiro.', 'La Marina da Glória está estratégicamente ubicada en el corazón de Río de Janeiro.'],
  ['Confira o tempo estimado de carro até o ponto de embarque:', 'Vea el tiempo estimado en auto hasta el punto de embarque:'],
  ['min de carro (via ponte)', 'min en auto (vía puente)'],
  ['min de carro', 'min en auto'],

  // Freshness dates
  ['Última atualização: Fevereiro 2026', 'Última actualización: Febrero 2026'],

  // Blog related articles
  ['Artigos Relacionados', 'Artículos Relacionados'],
  ['Ler artigo', 'Leer artículo'],

  // FAQ new questions (áreas atendidas)
  ['A Marina da Glória está estrategicamente localizada', 'La Marina da Glória está estratégicamente ubicada'],
  ['no coração do Rio de Janeiro', 'en el corazón de Río de Janeiro'],
  ['tempo estimado de carro', 'tiempo estimado en auto'],
  ['ponto de embarque', 'punto de embarque'],
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
          <div class="lang-switcher__menu" role="listbox">
            <a href="__LANGSW_PT_HREF__" class="lang-switcher__option" role="option">
              <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#229e45" d="M0 0h640v480H0z"/><path fill="#f8e509" d="m321.4 20 301.5 220.1L321.4 460 19.9 240.1z"/><circle fill="#2b49a3" cx="321.4" cy="240" r="110"/></svg>
              Portugues
            </a>
            <a href="__LANGSW_EN_HREF__" class="lang-switcher__option" role="option">
              <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#bd3d44" d="M0 0h640v480H0z"/><path stroke="#fff" stroke-width="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/><path fill="#192f5d" d="M0 0h364.8v258.5H0z"/></svg>
              English
            </a>
            <a href="__LANGSW_ES_HREF__" class="lang-switcher__option lang-switcher__option--active" role="option">
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
          <a href="__LANGSW_PT_HREF__">
            <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#229e45" d="M0 0h640v480H0z"/><path fill="#f8e509" d="m321.4 20 301.5 220.1L321.4 460 19.9 240.1z"/><circle fill="#2b49a3" cx="321.4" cy="240" r="110"/></svg>
            PT
          </a>
          <a href="__LANGSW_EN_HREF__">
            <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#bd3d44" d="M0 0h640v480H0z"/><path stroke="#fff" stroke-width="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/><path fill="#192f5d" d="M0 0h364.8v258.5H0z"/></svg>
            EN
          </a>
          <a href="__LANGSW_ES_HREF__" class="active">
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

  // Restore language switcher placeholders (protected from replaceInternalLinks)
  html = html.split('__LANGSW_PT_HREF__').join(ptUrl);
  html = html.split('__LANGSW_EN_HREF__').join(enUrl);
  html = html.split('__LANGSW_ES_HREF__').join(esUrl);

  // Replace canonical (AFTER link replacement)
  html = html.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${BASE_URL}${esUrl}">`);

  // Replace hreflang (AFTER link replacement)
  html = html.replace(
    /<!-- hreflang -->[\s\S]*?(?=\s*<link rel="icon")/,
    `<!-- hreflang -->\n  <link rel="alternate" hreflang="pt-BR" href="${BASE_URL}${ptUrl}">\n  <link rel="alternate" hreflang="en" href="${BASE_URL}${enUrl}">\n  <link rel="alternate" hreflang="es" href="${BASE_URL}${esUrl}">\n  <link rel="alternate" hreflang="x-default" href="${BASE_URL}${ptUrl}">\n  `
  );

  // Replace content blocks (BEFORE dictionary)
  if (page.contentBlocks && page.contentBlocks.length > 0) {
    for (const [ptText, esText] of page.contentBlocks) {
      html = html.split(ptText).join(esText);
    }
  }

  // Translate content
  html = translateContent(html);

  // Translate WhatsApp inline link text (inside protected href attributes)
  const waTextReplacements = [
    ['Olá! Tenho interesse na lancha', '¡Hola! Me interesa la lancha'],
    ['Poderia me enviar mais informações?', '¿Podrían enviarme más información?'],
    ['Olá! Gostaria de fazer o roteiro', '¡Hola! Me gustaría hacer la ruta'],
    ['Qual a disponibilidade?', '¿Cuál es la disponibilidad?'],
    ['Olá! Gostaria de informações sobre aluguel de lancha no Rio de Janeiro.', '¡Hola! Me gustaría información sobre alquiler de lanchas en Río de Janeiro.'],
    // WeBoat 390 specific WA link
    ['Olá! Tenho interesse na lancha WeBoat 390 com churrasqueira. [via site - weboat-390]', '¡Hola! Me interesa la lancha WeBoat 390 con parrilla. [via site - es]'],
    // Como-funciona page WA links
    ['Olá! Gostaria de saber como funciona o aluguel de lancha. [via site - como-funciona]', '¡Hola! Me gustaría saber cómo funciona el alquiler de lanchas. [via site - es]'],
    ['Olá! Gostaria de informações sobre aluguel de lancha. [via site - como-funciona]', '¡Hola! Me gustaría información sobre alquiler de lanchas. [via site - es]'],
    ['Olá! Quero reservar um passeio de lancha. [via site - como-funciona]', '¡Hola! Quiero reservar un paseo en lancha. [via site - es]'],
    // Contacto page WA links (must come BEFORE the generic short "sobre" entry)
    ['Olá! Gostaria de informações sobre aluguel de lancha no Rio de Janeiro. [via site - contato]', '¡Hola! Me gustaría información sobre alquiler de lanchas en Río de Janeiro. [via site - es]'],
    ['Olá! Gostaria de informações sobre aluguel de lancha. [via site - contato]', '¡Hola! Me gustaría información sobre alquiler de lanchas. [via site - es]'],
    ['Olá! Gostaria de informações. [via site - contato]', '¡Hola! Me gustaría información. [via site - es]'],
    // Servicios page WA links (must come BEFORE the generic short "sobre" entry)
    ['Olá! Gostaria de informações sobre o serviço de churrasco na lancha. [via site - servicos]', '¡Hola! Me gustaría información sobre el servicio de asado en la lancha. [via site - es]'],
    ['Olá! Gostaria de informações sobre o serviço de open bar na lancha. [via site - servicos]', '¡Hola! Me gustaría información sobre el servicio de open bar en la lancha. [via site - es]'],
    ['Olá! Gostaria de informações sobre os pacotes all inclusive. [via site - servicos]', '¡Hola! Me gustaría información sobre los paquetes all inclusive. [via site - es]'],
    ['Olá! Gostaria de informações sobre as mesas especiais (queijos e vinhos / snacks). [via site - servicos]', '¡Hola! Me gustaría información sobre las mesas especiales (quesos y vinos / snacks). [via site - es]'],
    ['Olá! Gostaria de informações sobre decoração para festa na lancha. [via site - servicos]', '¡Hola! Me gustaría información sobre decoración para fiesta en la lancha. [via site - es]'],
    ['Olá! Gostaria de informações sobre os serviços extras para o passeio de lancha. [via site - servicos]', '¡Hola! Me gustaría información sobre los servicios extras para el paseo en lancha. [via site - es]'],
    ['Olá! Gostaria de informações sobre os serviços extras. [via site - servicos]', '¡Hola! Me gustaría información sobre los servicios extras. [via site - es]'],
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
    // Carnaval + Reveillon boat-specific WA links
    ['sobre o Catamarã Oceano para o Carnaval', 'sobre el Catamarán Oceano para el Carnaval'],
    ['sobre o Barco Gourmet 53 para o Carnaval', 'sobre el Barco Gourmet 53 para el Carnaval'],
    ['sobre a WeBoat Malik para o Carnaval', 'sobre la WeBoat Malik para el Carnaval'],
    ['sobre a WeBoat Rio Star 50 para o Carnaval', 'sobre la WeBoat Rio Star 50 para el Carnaval'],
    ['sobre a WeBoat Oceanic 36 para o Carnaval', 'sobre la WeBoat Oceanic 36 para el Carnaval'],
    ['sobre a WeBoat Ibiza 42 para o Carnaval', 'sobre la WeBoat Ibiza 42 para el Carnaval'],
    ['sobre a WeBoat 390 para o Carnaval', 'sobre la WeBoat 390 para el Carnaval'],
    ['sobre a WeBoat 32 para o Carnaval', 'sobre la WeBoat 32 para el Carnaval'],
    ['sobre o Catamarã Oceano para o réveillon', 'sobre el Catamarán Oceano para el Año Nuevo'],
    ['sobre o Barco Gourmet 53 para o réveillon', 'sobre el Barco Gourmet 53 para el Año Nuevo'],
    ['sobre a WeBoat Malik para o réveillon', 'sobre la WeBoat Malik para el Año Nuevo'],
    ['sobre a WeBoat Rio Star 50 para o réveillon', 'sobre la WeBoat Rio Star 50 para el Año Nuevo'],
    ['sobre a WeBoat Oceanic 36 para o réveillon', 'sobre la WeBoat Oceanic 36 para el Año Nuevo'],
    ['sobre a WeBoat Ibiza 42 para o réveillon', 'sobre la WeBoat Ibiza 42 para el Año Nuevo'],
    ['sobre a WeBoat 390 para o réveillon', 'sobre la WeBoat 390 para el Año Nuevo'],
    ['sobre a WeBoat 32 para o réveillon', 'sobre la WeBoat 32 para el Año Nuevo'],
    // Comparativo page WA links
    ['Ola! Gostaria de reservar uma lancha. Podem me ajudar a escolher a melhor opção?', '¡Hola! Me gustaría reservar una lancha. ¿Pueden ayudarme a elegir la mejor opción?'],
    ['Ola! Estou em duvida sobre qual lancha escolher. Podem me ajudar?', '¡Hola! Tengo dudas sobre cuál lancha elegir. ¿Pueden ayudarme?'],
    ['Ola! Estou comparando as lanchas e gostaria de ajuda para escolher.', '¡Hola! Estoy comparando las lanchas y me gustaría ayuda para elegir.'],
    ['Ola! Gostaria de ajuda para escolher a melhor lancha para meu grupo.', '¡Hola! Me gustaría ayuda para elegir la mejor lancha para mi grupo.'],
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
