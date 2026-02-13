# 🔌 INTEGRAÇÕES TÉCNICAS - SITE WEBOAT BRASIL

**Versão:** 1.0  
**Data:** Janeiro 2026  
**Etapa:** 6 - Especificação de Integrações

---

# 📋 ÍNDICE

1. [WhatsApp Business](#-whatsapp-business)
2. [Google Maps](#-google-maps)
3. [Google Analytics 4](#-google-analytics-4)
4. [Google Tag Manager](#-google-tag-manager)
5. [Meta Pixel (Facebook/Instagram)](#-meta-pixel)
6. [Formulários e Captura de Leads](#-formulários-e-captura-de-leads)
7. [Redes Sociais](#-redes-sociais)
8. [SEO Técnico](#-seo-técnico)
9. [Performance e CDN](#-performance-e-cdn)
10. [Checklist de Implementação](#-checklist-de-implementação)

---

# 📱 WHATSAPP BUSINESS

## Dados da Conta

```
Número: +55 21 97772-4114
Nome do Perfil: WeBoat Brasil
```

## Botão Flutuante

### Configuração
```html
<!-- Botão WhatsApp Flutuante -->
<a 
  href="https://wa.me/5521977724114?text=Ol%C3%A1%21%20Quero%20fazer%20um%20or%C3%A7amento%20de%20aluguel%20de%20lancha%20no%20Rio%20de%20Janeiro.%20Podem%20me%20ajudar%3F"
  target="_blank"
  rel="noopener noreferrer"
  class="whatsapp-float"
  aria-label="Falar no WhatsApp"
  data-gtm="whatsapp-float"
>
  <svg><!-- ícone whatsapp --></svg>
  <span class="whatsapp-float__tooltip">
    Fale conosco no WhatsApp
  </span>
</a>
```

### URL Formatada
```
Base: https://wa.me/5521977724114

Com mensagem:
https://wa.me/5521977724114?text=[MENSAGEM_ENCODED]
```

## Mensagens Pré-definidas por Contexto

### Geral (Botão Flutuante)
```
Mensagem: "Olá! Quero fazer um orçamento de aluguel de lancha no Rio de Janeiro. Podem me ajudar?"

URL Encoded:
?text=Ol%C3%A1%21%20Quero%20fazer%20um%20or%C3%A7amento%20de%20aluguel%20de%20lancha%20no%20Rio%20de%20Janeiro.%20Podem%20me%20ajudar%3F
```

### Página de Lancha Específica
```
Mensagem: "Olá! Tenho interesse na lancha [NOME_LANCHA]. Podem me passar mais informações sobre disponibilidade e valores?"

Exemplo WeBoat 390:
?text=Ol%C3%A1%21%20Tenho%20interesse%20na%20lancha%20WeBoat%20390.%20Podem%20me%20passar%20mais%20informa%C3%A7%C3%B5es%20sobre%20disponibilidade%20e%20valores%3F
```

### Roteiro Específico
```
Mensagem: "Olá! Quero fazer um passeio de lancha no roteiro [NOME_ROTEIRO]. Qual a disponibilidade?"

Exemplo Praia Vermelha:
?text=Ol%C3%A1%21%20Quero%20fazer%20um%20passeio%20de%20lancha%20no%20roteiro%20Praia%20Vermelha.%20Qual%20a%20disponibilidade%3F
```

### Despedida de Solteira
```
Mensagem: "Olá! Quero organizar uma despedida de solteira na lancha. Somos [X] pessoas. Podem me ajudar com opções?"

?text=Ol%C3%A1%21%20Quero%20organizar%20uma%20despedida%20de%20solteira%20na%20lancha.%20Podem%20me%20ajudar%20com%20op%C3%A7%C3%B5es%3F
```

### Festa de Aniversário
```
Mensagem: "Olá! Quero fazer meu aniversário na lancha. Somos aproximadamente [X] pessoas. Quais opções vocês têm?"

?text=Ol%C3%A1%21%20Quero%20fazer%20meu%20anivers%C3%A1rio%20na%20lancha.%20Quais%20op%C3%A7%C3%B5es%20voc%C3%AAs%20t%C3%AAm%3F
```

### Evento Corporativo
```
Mensagem: "Olá! Represento a empresa [EMPRESA] e gostamos de fazer um evento corporativo na lancha. Podem enviar uma proposta?"

?text=Ol%C3%A1%21%20Gostaria%20de%20fazer%20um%20evento%20corporativo%20na%20lancha.%20Podem%20enviar%20uma%20proposta%3F
```

### Réveillon
```
Mensagem: "Olá! Quero reservar uma lancha para o Réveillon. Ainda tem disponibilidade?"

?text=Ol%C3%A1%21%20Quero%20reservar%20uma%20lancha%20para%20o%20R%C3%A9veillon.%20Ainda%20tem%20disponibilidade%3F
```

## Implementação JavaScript

```javascript
// Função para gerar link do WhatsApp com mensagem dinâmica
function getWhatsAppLink(message, phone = '5521977724114') {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

// Função para tracking antes de abrir WhatsApp
function openWhatsApp(message, context = 'general') {
  // Dispara evento para Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', 'whatsapp_click', {
      'event_category': 'engagement',
      'event_label': context,
      'value': 1
    });
  }
  
  // Dispara evento para Meta Pixel
  if (typeof fbq !== 'undefined') {
    fbq('track', 'Contact', {
      content_name: context
    });
  }
  
  // Abre WhatsApp
  window.open(getWhatsAppLink(message), '_blank');
}

// Exemplo de uso em botão
document.querySelector('.btn-whatsapp').addEventListener('click', function(e) {
  e.preventDefault();
  const boatName = this.dataset.boat || '';
  const message = boatName 
    ? `Olá! Tenho interesse na lancha ${boatName}. Podem me passar mais informações?`
    : 'Olá! Quero fazer um orçamento de aluguel de lancha no Rio de Janeiro.';
  
  openWhatsApp(message, boatName || 'general');
});
```

---

# 🗺️ GOOGLE MAPS

## Dados da Localização

```
Nome: WeBoat Brasil
Endereço: Av. Infante Dom Henrique, S/N, Loja 06 - Marina da Glória - Glória, Rio de Janeiro - RJ, 20021-140
Rua: Av. Infante Dom Henrique, S/N
Bairro: Glória
Cidade: Rio de Janeiro - RJ
CEP: 20021-140
País: Brasil

Coordenadas:
Latitude: -22.9245
Longitude: -43.1691
```

## Embed do Mapa

### Iframe Básico
```html
<iframe 
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.123456789!2d-43.1691!3d-22.9245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMarina%20da%20Gl%C3%B3ria!5e0!3m2!1spt-BR!2sbr!4v1234567890"
  width="100%" 
  height="450" 
  style="border:0;" 
  allowfullscreen="" 
  loading="lazy" 
  referrerpolicy="no-referrer-when-downgrade"
  title="Localização WeBoat Brasil - Marina da Glória"
></iframe>
```

### Link para Navegação
```html
<!-- Link para abrir no Google Maps -->
<a 
  href="https://www.google.com/maps/dir/?api=1&destination=-22.9245,-43.1691&destination_place_id=ChIJ..."
  target="_blank"
  rel="noopener noreferrer"
  class="btn btn-secondary"
>
  <i class="ph ph-navigation-arrow"></i>
  Como Chegar
</a>
```

### URL para "Como Chegar"
```
https://www.google.com/maps/dir/?api=1&destination=Marina+da+Gloria+Rio+de+Janeiro
```

## Mapa Estilizado (Opcional)

### API JavaScript do Google Maps
```html
<!-- Incluir script da API -->
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" async defer></script>
```

```javascript
// Inicialização do mapa customizado
function initMap() {
  const weboat = { lat: -22.9245, lng: -43.1691 };
  
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: weboat,
    styles: [
      // Estilo customizado para combinar com a marca
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{ "color": "#4A90B8" }]
      },
      {
        "featureType": "landscape",
        "stylers": [{ "color": "#F0F0EC" }]
      },
      // ... mais estilos
    ]
  });
  
  // Marcador personalizado
  const marker = new google.maps.Marker({
    position: weboat,
    map: map,
    title: 'WeBoat Brasil',
    icon: {
      url: '/images/map-marker-weboat.png',
      scaledSize: new google.maps.Size(48, 48)
    }
  });
  
  // Info Window
  const infoWindow = new google.maps.InfoWindow({
    content: `
      <div class="map-info">
        <strong>WeBoat Brasil</strong><br>
        Marina da Glória - Loja 06<br>
        <a href="tel:+5521977724114">(21) 97772-4114</a>
      </div>
    `
  });
  
  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });
}
```

---

# 📊 GOOGLE ANALYTICS 4

## Configuração Básica

### ID da Propriedade
```
G-XXXXXXXXXX (substituir pelo ID real)
```

### Código de Instalação
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    'anonymize_ip': true,
    'cookie_flags': 'SameSite=None;Secure'
  });
</script>
```

## Eventos Customizados

### Estrutura de Eventos
```javascript
gtag('event', 'nome_do_evento', {
  'event_category': 'categoria',
  'event_label': 'label',
  'value': valor_numerico
});
```

### Eventos a Implementar

#### 1. Clique no WhatsApp
```javascript
gtag('event', 'whatsapp_click', {
  'event_category': 'engagement',
  'event_label': 'float_button', // ou 'boat_page', 'route_page', etc.
  'page_location': window.location.href
});
```

#### 2. Visualização de Lancha
```javascript
gtag('event', 'view_boat', {
  'event_category': 'boats',
  'event_label': 'WeBoat 390', // nome da lancha
  'boat_capacity': 16,
  'boat_price': 2600
});
```

#### 3. Visualização de Roteiro
```javascript
gtag('event', 'view_route', {
  'event_category': 'routes',
  'event_label': 'Praia Vermelha', // nome do roteiro
  'route_price': 2500
});
```

#### 4. Envio de Formulário
```javascript
gtag('event', 'form_submit', {
  'event_category': 'leads',
  'event_label': 'contact_form', // ou 'quote_form'
  'form_location': window.location.pathname
});
```

#### 5. Clique em Telefone
```javascript
gtag('event', 'phone_click', {
  'event_category': 'engagement',
  'event_label': 'header' // ou 'footer', 'contact_page'
});
```

#### 6. Download/Interação com Serviços
```javascript
gtag('event', 'service_interest', {
  'event_category': 'services',
  'event_label': 'churrasco', // ou 'open_bar', 'decoracao'
});
```

#### 7. Scroll Depth (Profundidade de Rolagem)
```javascript
// Implementar com Intersection Observer
const scrollMarkers = [25, 50, 75, 100];
scrollMarkers.forEach(percent => {
  gtag('event', 'scroll_depth', {
    'event_category': 'engagement',
    'event_label': `${percent}%`,
    'page_location': window.location.pathname
  });
});
```

## Conversões

### Definir como Conversões no GA4:
```
1. whatsapp_click - Conversão principal
2. form_submit - Conversão principal
3. phone_click - Conversão secundária
4. service_interest - Micro-conversão
```

## E-commerce (Opcional Futuro)

### Se implementar reservas online:
```javascript
// Início do checkout
gtag('event', 'begin_checkout', {
  'currency': 'BRL',
  'value': 2600,
  'items': [{
    'item_id': 'weboat-390',
    'item_name': 'WeBoat 390',
    'item_category': 'boats',
    'price': 2600,
    'quantity': 1
  }]
});

// Compra concluída
gtag('event', 'purchase', {
  'transaction_id': 'T12345',
  'currency': 'BRL',
  'value': 2600,
  'items': [...]
});
```

---

# 🏷️ GOOGLE TAG MANAGER

## Container ID
```
GTM-XXXXXXX (substituir pelo ID real)
```

## Código de Instalação

### Head (o mais alto possível)
```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

### Body (imediatamente após abertura)
```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

## Data Layer Events

### Estrutura Padrão
```javascript
window.dataLayer = window.dataLayer || [];

// Push de evento
dataLayer.push({
  'event': 'nome_do_evento',
  'eventCategory': 'categoria',
  'eventAction': 'acao',
  'eventLabel': 'label'
});
```

### Eventos para Configurar no GTM

#### Page View com Dados
```javascript
dataLayer.push({
  'event': 'pageview',
  'pagePath': window.location.pathname,
  'pageTitle': document.title,
  'pageType': 'boat_detail', // 'home', 'route', 'service', etc.
  'boatName': 'WeBoat 390', // se aplicável
  'routeName': null // se aplicável
});
```

#### Clique em CTA
```javascript
dataLayer.push({
  'event': 'cta_click',
  'ctaText': 'Alugar Lancha Agora',
  'ctaLocation': 'hero', // 'header', 'card', 'footer'
  'ctaDestination': 'whatsapp' // ou 'form', 'phone'
});
```

#### Interação com Galeria
```javascript
dataLayer.push({
  'event': 'gallery_interaction',
  'action': 'view_photo', // 'next', 'previous', 'fullscreen'
  'photoIndex': 3,
  'boatName': 'WeBoat 390'
});
```

## Tags Recomendadas no GTM

### 1. Google Analytics 4
```
Tag Type: Google Analytics: GA4 Configuration
Measurement ID: G-XXXXXXXXXX
Trigger: All Pages
```

### 2. Meta Pixel
```
Tag Type: Custom HTML
Trigger: All Pages
```

### 3. Hotjar (Opcional)
```
Tag Type: Custom HTML
Trigger: All Pages
```

### 4. Evento de WhatsApp
```
Tag Type: GA4 Event
Event Name: whatsapp_click
Trigger: Click - WhatsApp buttons
```

### 5. Evento de Formulário
```
Tag Type: GA4 Event
Event Name: form_submit
Trigger: Form Submission
```

---

# 📘 META PIXEL

## Pixel ID
```
XXXXXXXXXXXXXXXXX (substituir pelo ID real)
```

## Código Base
```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'XXXXXXXXXXXXXXXXX');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=XXXXXXXXXXXXXXXXX&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
```

## Eventos Padrão

### PageView (Automático)
```javascript
fbq('track', 'PageView');
```

### ViewContent - Visualização de Lancha
```javascript
fbq('track', 'ViewContent', {
  content_name: 'WeBoat 390',
  content_category: 'Lanchas',
  content_ids: ['weboat-390'],
  content_type: 'product',
  value: 2600,
  currency: 'BRL'
});
```

### Lead - Envio de Formulário
```javascript
fbq('track', 'Lead', {
  content_name: 'Formulário de Contato',
  content_category: 'Lead Form',
  value: 0,
  currency: 'BRL'
});
```

### Contact - Clique no WhatsApp
```javascript
fbq('track', 'Contact', {
  content_name: 'WhatsApp Click',
  content_category: 'Engagement'
});
```

### Search - Busca/Filtro (se implementar)
```javascript
fbq('track', 'Search', {
  search_string: '16 pessoas',
  content_category: 'Lanchas'
});
```

### InitiateCheckout (Futuro)
```javascript
fbq('track', 'InitiateCheckout', {
  content_ids: ['weboat-390'],
  content_type: 'product',
  value: 2600,
  currency: 'BRL',
  num_items: 1
});
```

## Eventos Customizados

### Interesse em Serviço
```javascript
fbq('trackCustom', 'ServiceInterest', {
  service_name: 'Churrasco na Lancha',
  service_category: 'Food & Beverage'
});
```

### Visualização de Roteiro
```javascript
fbq('trackCustom', 'ViewRoute', {
  route_name: 'Praia Vermelha',
  route_price: 2500
});
```

### Interesse em Ocasião
```javascript
fbq('trackCustom', 'OccasionInterest', {
  occasion_type: 'Despedida de Solteira'
});
```

## Públicos para Remarketing

### Configurar no Meta Ads Manager:

```
1. Visitantes do Site (180 dias)
   - Todos que visitaram qualquer página

2. Visualizaram Lanchas (30 dias)
   - Evento: ViewContent
   - Categoria: Lanchas

3. Interessados em Despedida (60 dias)
   - Página: /despedida-de-solteira-na-lancha
   - OU evento: OccasionInterest = Despedida

4. Interessados em Aniversário (60 dias)
   - Página: /festa-de-aniversario-na-lancha
   - OU evento: OccasionInterest = Aniversário

5. Leads Quentes (30 dias)
   - Evento: Lead OU Contact

6. Carrinho Abandonado (futuro)
   - Evento: InitiateCheckout
   - SEM evento: Purchase
```

---

# 📝 FORMULÁRIOS E CAPTURA DE LEADS

## Estrutura dos Formulários

### Formulário Principal (Contato/Orçamento)

```html
<form 
  id="form-orcamento" 
  action="/api/lead" 
  method="POST"
  data-gtm="quote-form"
>
  <!-- Nome -->
  <div class="form-group">
    <label for="nome" class="form-label form-label--required">
      Nome completo
    </label>
    <input 
      type="text" 
      id="nome" 
      name="nome" 
      class="form-input" 
      required
      autocomplete="name"
    >
  </div>
  
  <!-- WhatsApp -->
  <div class="form-group">
    <label for="whatsapp" class="form-label form-label--required">
      WhatsApp
    </label>
    <input 
      type="tel" 
      id="whatsapp" 
      name="whatsapp" 
      class="form-input" 
      required
      autocomplete="tel"
      placeholder="(21) 99999-9999"
      pattern="\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}"
    >
  </div>
  
  <!-- E-mail (opcional) -->
  <div class="form-group">
    <label for="email" class="form-label">
      E-mail
    </label>
    <input 
      type="email" 
      id="email" 
      name="email" 
      class="form-input"
      autocomplete="email"
    >
  </div>
  
  <!-- Número de Pessoas -->
  <div class="form-group">
    <label for="pessoas" class="form-label">
      Quantas pessoas?
    </label>
    <select id="pessoas" name="pessoas" class="form-select">
      <option value="">Selecione...</option>
      <option value="2-10">2 a 10 pessoas</option>
      <option value="11-15">11 a 15 pessoas</option>
      <option value="16-22">16 a 22 pessoas</option>
      <option value="23-40">23 a 40 pessoas</option>
      <option value="41+">Mais de 40 pessoas</option>
    </select>
  </div>
  
  <!-- Data -->
  <div class="form-group">
    <label for="data" class="form-label">
      Data desejada
    </label>
    <input 
      type="date" 
      id="data" 
      name="data" 
      class="form-input"
      min="2026-01-16"
    >
  </div>
  
  <!-- Ocasião -->
  <div class="form-group">
    <label for="ocasiao" class="form-label">
      Qual a ocasião?
    </label>
    <select id="ocasiao" name="ocasiao" class="form-select">
      <option value="">Selecione...</option>
      <option value="passeio">Passeio com amigos/família</option>
      <option value="aniversario">Aniversário</option>
      <option value="despedida">Despedida de solteira</option>
      <option value="corporativo">Evento corporativo</option>
      <option value="casamento">Casamento/Bodas</option>
      <option value="reveillon">Réveillon</option>
      <option value="outro">Outro</option>
    </select>
  </div>
  
  <!-- Mensagem -->
  <div class="form-group">
    <label for="mensagem" class="form-label">
      Mensagem (opcional)
    </label>
    <textarea 
      id="mensagem" 
      name="mensagem" 
      class="form-input" 
      rows="4"
      placeholder="Conte mais sobre seu evento..."
    ></textarea>
  </div>
  
  <!-- Campos ocultos para tracking -->
  <input type="hidden" name="pagina_origem" id="pagina_origem">
  <input type="hidden" name="utm_source" id="utm_source">
  <input type="hidden" name="utm_medium" id="utm_medium">
  <input type="hidden" name="utm_campaign" id="utm_campaign">
  
  <!-- Honeypot anti-spam -->
  <input type="text" name="website" class="hidden" tabindex="-1" autocomplete="off">
  
  <!-- Submit -->
  <button type="submit" class="btn btn-primary btn-lg">
    Solicitar Orçamento
  </button>
</form>
```

### Formulário Rápido (Hero/CTA)

```html
<form id="form-rapido" class="form-quick">
  <div class="form-quick__row">
    <input 
      type="tel" 
      name="whatsapp" 
      placeholder="Seu WhatsApp"
      class="form-input"
      required
    >
    <select name="pessoas" class="form-select">
      <option value="">Pessoas</option>
      <option value="2-15">2-15</option>
      <option value="16-25">16-25</option>
      <option value="26+">26+</option>
    </select>
    <button type="submit" class="btn btn-primary">
      Solicitar Orçamento
    </button>
  </div>
</form>
```

## Processamento de Formulários

### Validação Frontend
```javascript
const form = document.getElementById('form-orcamento');

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  // Validação
  const whatsapp = form.querySelector('#whatsapp').value;
  if (!isValidPhone(whatsapp)) {
    showError('whatsapp', 'Informe um WhatsApp válido');
    return;
  }
  
  // Preenche campos ocultos
  form.querySelector('#pagina_origem').value = window.location.href;
  form.querySelector('#utm_source').value = getURLParam('utm_source');
  form.querySelector('#utm_medium').value = getURLParam('utm_medium');
  form.querySelector('#utm_campaign').value = getURLParam('utm_campaign');
  
  // Envia
  try {
    const response = await submitForm(form);
    
    if (response.success) {
      // Tracking
      gtag('event', 'form_submit', {
        'event_category': 'leads',
        'event_label': 'contact_form'
      });
      
      fbq('track', 'Lead', {
        content_name: 'Formulário de Orçamento'
      });
      
      // Feedback
      showSuccess('Recebemos sua solicitação! Entraremos em contato em breve.');
      form.reset();
      
    } else {
      showError('geral', 'Erro ao enviar. Tente pelo WhatsApp.');
    }
  } catch (error) {
    showError('geral', 'Erro ao enviar. Tente pelo WhatsApp.');
  }
});
```

### Destino dos Leads

#### Opção 1: E-mail
```javascript
// Enviar para e-mail via API
POST /api/lead
Content-Type: application/json

{
  "nome": "...",
  "whatsapp": "...",
  "email": "...",
  "pessoas": "...",
  "data": "...",
  "ocasiao": "...",
  "mensagem": "...",
  "pagina_origem": "...",
  "utm_source": "...",
  "utm_medium": "...",
  "utm_campaign": "..."
}

// Backend envia e-mail para: contato@weboatbrasil.com.br
```

#### Opção 2: Planilha Google Sheets
```javascript
// Integração via Google Apps Script ou Zapier
// Cada lead vira uma linha na planilha
```

#### Opção 3: CRM (Futuro)
```javascript
// Integração com HubSpot, RD Station, Pipedrive, etc.
```

#### Opção 4: Notificação WhatsApp
```javascript
// Enviar notificação para equipe via WhatsApp Business API
// Quando chegar novo lead
```

## Anti-Spam

### Honeypot
```html
<!-- Campo invisível que bots preenchem -->
<input type="text" name="website" class="hidden" tabindex="-1" autocomplete="off">
```

```javascript
// Backend rejeita se honeypot estiver preenchido
if (formData.website) {
  return { success: false, error: 'spam' };
}
```

### Rate Limiting
```javascript
// Máximo de 3 submissões por IP por hora
```

### reCAPTCHA v3 (Opcional)
```html
<script src="https://www.google.com/recaptcha/api.js?render=SITE_KEY"></script>
```

```javascript
grecaptcha.execute('SITE_KEY', {action: 'submit'}).then(function(token) {
  // Enviar token junto com form
  formData.recaptcha_token = token;
});
```

---

# 🌐 REDES SOCIAIS

## Links Oficiais

```
Instagram: https://www.instagram.com/weboatbrasil
Facebook: https://www.facebook.com/weboatbrasil (se existir)
TikTok: https://www.tiktok.com/@weboatbrasil (se existir)
YouTube: https://www.youtube.com/@weboatbrasil (se existir)
```

## Open Graph Tags (Compartilhamento)

### Meta Tags Padrão
```html
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.weboatbrasil.com.br/">
<meta property="og:title" content="Aluguel de Lancha no Rio de Janeiro | WeBoat Brasil">
<meta property="og:description" content="Passeio privativo de lancha no RJ. +1000 avaliações 5 estrelas. Grupos de 2 a 65 pessoas.">
<meta property="og:image" content="https://www.weboatbrasil.com.br/images/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="WeBoat Brasil">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="https://www.weboatbrasil.com.br/">
<meta name="twitter:title" content="Aluguel de Lancha no Rio de Janeiro | WeBoat Brasil">
<meta name="twitter:description" content="Passeio privativo de lancha no RJ. +1000 avaliações 5 estrelas.">
<meta name="twitter:image" content="https://www.weboatbrasil.com.br/images/og-image.jpg">
```

### Meta Tags por Página

#### Home
```html
<meta property="og:title" content="Aluguel de Lancha no Rio de Janeiro | WeBoat Brasil">
<meta property="og:description" content="Passeio privativo de lancha no RJ. +1000 avaliações 5 estrelas. Grupos de 2 a 65 pessoas.">
```

#### Página de Lancha
```html
<meta property="og:title" content="WeBoat 390 - Lancha para 16 pessoas | WeBoat Brasil">
<meta property="og:description" content="Aluguel de lancha WeBoat 390 no Rio de Janeiro. Ideal para festas e despedidas. A partir de R$ 2.600.">
<meta property="og:image" content="https://www.weboatbrasil.com.br/images/lanchas/weboat-390-og.jpg">
```

#### Despedida de Solteira
```html
<meta property="og:title" content="Despedida de Solteira na Lancha | Rio de Janeiro | WeBoat">
<meta property="og:description" content="A despedida de solteira perfeita! Kit completo com decoração, drinks e diversão no mar do RJ.">
<meta property="og:image" content="https://www.weboatbrasil.com.br/images/ocasioes/despedida-og.jpg">
```

## Botões de Compartilhamento

```html
<div class="share-buttons">
  <!-- WhatsApp -->
  <a 
    href="https://wa.me/?text=Olha%20essa%20lancha%20incrível!%20https://weboatbrasil.com.br/lanchas/weboat-390"
    target="_blank"
    class="share-btn share-btn--whatsapp"
    aria-label="Compartilhar no WhatsApp"
  >
    <i class="ph ph-whatsapp-logo"></i>
  </a>
  
  <!-- Facebook -->
  <a 
    href="https://www.facebook.com/sharer/sharer.php?u=https://weboatbrasil.com.br/lanchas/weboat-390"
    target="_blank"
    class="share-btn share-btn--facebook"
    aria-label="Compartilhar no Facebook"
  >
    <i class="ph ph-facebook-logo"></i>
  </a>
  
  <!-- Copiar Link -->
  <button 
    class="share-btn share-btn--copy"
    data-url="https://weboatbrasil.com.br/lanchas/weboat-390"
    aria-label="Copiar link"
  >
    <i class="ph ph-link"></i>
  </button>
</div>
```

## Instagram Feed Embed (Opcional)

```html
<!-- Usando API oficial ou serviço terceiro como Elfsight -->
<div class="instagram-feed" data-feed="weboatbrasil" data-count="6"></div>
```

---

# 🔍 SEO TÉCNICO

## Meta Tags Essenciais

### Em Todas as Páginas
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  
  <!-- Título e Descrição (variam por página) -->
  <title>Aluguel de Lancha no Rio de Janeiro | WeBoat Brasil</title>
  <meta name="description" content="...">
  
  <!-- Canonical -->
  <link rel="canonical" href="https://www.weboatbrasil.com.br/">
  
  <!-- Robots -->
  <meta name="robots" content="index, follow">
  
  <!-- Idioma -->
  <html lang="pt-BR">
  <meta property="og:locale" content="pt_BR">
  
  <!-- Favicon -->
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#1E3A5F">
</head>
```

## Schema.org / JSON-LD

### Organização
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "WeBoat Brasil",
  "description": "Aluguel de lancha no Rio de Janeiro para passeios privativos, festas e eventos.",
  "url": "https://www.weboatbrasil.com.br",
  "telephone": "+55-21-97772-4114",
  "email": "contato@weboatbrasil.com.br",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Marina da Glória - Loja 06, Av. Infante Dom Henrique, S/N",
    "addressLocality": "Rio de Janeiro",
    "addressRegion": "RJ",
    "postalCode": "20021-140",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "-22.9245",
    "longitude": "-43.1691"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "07:00",
    "closes": "22:00"
  },
  "priceRange": "R$ 2.300 - R$ 25.000",
  "image": "https://www.weboatbrasil.com.br/images/weboat-logo.png",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "1000"
  },
  "sameAs": [
    "https://www.instagram.com/weboatbrasil"
  ]
}
</script>
```

### Produto (Lancha)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "WeBoat 390 - Aluguel de Lancha",
  "description": "Lancha para até 16 pessoas. Ideal para festas, despedidas e eventos no Rio de Janeiro.",
  "image": "https://www.weboatbrasil.com.br/images/lanchas/weboat-390.jpg",
  "brand": {
    "@type": "Brand",
    "name": "WeBoat Brasil"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "BRL",
    "price": "2600",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
    "url": "https://www.weboatbrasil.com.br/lanchas/weboat-390"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "150"
  }
}
</script>
```

### FAQ
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quanto custa alugar uma lancha no Rio de Janeiro?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O aluguel de lancha no Rio de Janeiro na WeBoat começa em R$ 2.300 (segunda a quinta) e R$ 2.700 (sexta a domingo). O preço varia conforme o tamanho da lancha e roteiro escolhido."
      }
    },
    {
      "@type": "Question",
      "name": "O que está incluso no aluguel de lancha?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Todo aluguel de lancha inclui: combustível para o roteiro, marinheiro habilitado, tapete flutuante, macarrões, som Bluetooth, coolers e gelo."
      }
    }
  ]
}
</script>
```

### Breadcrumb
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.weboatbrasil.com.br"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Lanchas",
      "item": "https://www.weboatbrasil.com.br/lanchas"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "WeBoat 390",
      "item": "https://www.weboatbrasil.com.br/lanchas/weboat-390"
    }
  ]
}
</script>
```

## Sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.weboatbrasil.com.br/</loc>
    <lastmod>2026-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.weboatbrasil.com.br/lanchas-para-alugar-rio-de-janeiro</loc>
    <lastmod>2026-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.weboatbrasil.com.br/passeio-de-lancha-rio-de-janeiro</loc>
    <lastmod>2026-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Adicionar todas as páginas -->
</urlset>
```

## Robots.txt

```
User-agent: *
Allow: /

Sitemap: https://www.weboatbrasil.com.br/sitemap.xml

# Bloquear pastas administrativas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/
```

---

# ⚡ PERFORMANCE E CDN

## Otimizações Recomendadas

### Imagens
```html
<!-- WebP com fallback -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="..." loading="lazy">
</picture>

<!-- Lazy loading -->
<img src="image.jpg" loading="lazy" alt="...">

<!-- Srcset para responsividade -->
<img 
  srcset="image-400.jpg 400w,
          image-800.jpg 800w,
          image-1200.jpg 1200w"
  sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         33vw"
  src="image-800.jpg"
  alt="..."
>
```

### Fonts
```html
<!-- Preconnect para Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Font display swap -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
```

### Critical CSS
```html
<head>
  <!-- CSS crítico inline -->
  <style>
    /* Estilos acima da dobra */
    .hero { ... }
    .header { ... }
  </style>
  
  <!-- CSS completo async -->
  <link rel="preload" href="/css/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/css/main.css"></noscript>
</head>
```

### Scripts
```html
<!-- Defer para scripts não críticos -->
<script src="/js/analytics.js" defer></script>

<!-- Async para scripts independentes -->
<script src="https://www.googletagmanager.com/gtag/js" async></script>
```

## CDN Recomendado

### Cloudflare (Gratuito)
```
- CDN global
- SSL automático
- Minificação de HTML/CSS/JS
- Cache de assets
- Proteção DDoS
```

### Vercel / Netlify (se usar Next.js)
```
- Deploy automático
- CDN incluído
- SSL automático
- Preview deploys
```

## Métricas Alvo (Core Web Vitals)

```
LCP (Largest Contentful Paint): < 2.5s
FID (First Input Delay): < 100ms
CLS (Cumulative Layout Shift): < 0.1
```

---

# ✅ CHECKLIST DE IMPLEMENTAÇÃO

## Pré-Lançamento

### Analytics e Tracking
- [ ] Google Analytics 4 configurado
- [ ] Google Tag Manager instalado
- [ ] Meta Pixel instalado
- [ ] Eventos customizados configurados
- [ ] Conversões definidas no GA4
- [ ] Públicos de remarketing criados

### WhatsApp
- [ ] Botão flutuante funcionando
- [ ] Mensagens pré-definidas por página
- [ ] Tracking de cliques implementado
- [ ] Links testados em mobile

### Formulários
- [ ] Formulário de contato funcionando
- [ ] Validação frontend implementada
- [ ] Honeypot anti-spam ativo
- [ ] E-mails chegando corretamente
- [ ] Mensagens de sucesso/erro
- [ ] Campos UTM capturados

### SEO
- [ ] Meta tags em todas as páginas
- [ ] Open Graph configurado
- [ ] Schema.org/JSON-LD implementado
- [ ] Sitemap.xml gerado
- [ ] Robots.txt configurado
- [ ] Google Search Console verificado

### Mapas
- [ ] Google Maps embed funcionando
- [ ] Link "Como Chegar" testado
- [ ] Coordenadas corretas

### Performance
- [ ] Imagens otimizadas (WebP)
- [ ] Lazy loading ativo
- [ ] CSS/JS minificados
- [ ] CDN configurado
- [ ] SSL ativo (HTTPS)

### Acessibilidade
- [ ] Alt text em todas as imagens
- [ ] Labels em formulários
- [ ] Contraste de cores OK
- [ ] Navegação por teclado OK

## Pós-Lançamento

- [ ] Verificar dados no GA4 (24-48h)
- [ ] Verificar dados no Meta Pixel
- [ ] Testar formulários em produção
- [ ] Monitorar Core Web Vitals
- [ ] Configurar alertas de erro
- [ ] Backup do site

---

# 📞 INFORMAÇÕES DE CONTATO PARA INTEGRAÇÕES

```
WhatsApp Business: +55 21 97772-4114
E-mail: contato@weboatbrasil.com.br
Endereço: Av. Infante Dom Henrique, S/N, Loja 06 - Marina da Glória - Glória, Rio de Janeiro - RJ, 20021-140
Instagram: @weboatbrasil

Google My Business: [Configurar/Verificar]
Facebook Business: [Configurar/Verificar]
```

---

**FIM DO DOCUMENTO DE INTEGRAÇÕES**

*WeBoat Brasil - Aluguel de Lancha no Rio de Janeiro*
