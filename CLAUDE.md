# CLAUDE.md - Instruções Completas do Projeto WeBoat Brasil

> **LEIA ESTE ARQUIVO ANTES DE QUALQUER TAREFA**

---

## 🎯 SOBRE O PROJETO

**Empresa:** WeBoat Brasil  
**Segmento:** Aluguel de lanchas no Rio de Janeiro  
**Objetivo:** Converter visitantes em leads via WhatsApp  
**Conceito Visual:** "Coastal Premium" - sofisticado mas acessível

---

## 📞 DADOS OFICIAIS (USAR EXATAMENTE)

```
Nome: WeBoat Brasil
WhatsApp: (21) 97772-4114
Link WhatsApp: https://wa.me/5521977724114
Endereço: Av. Infante Dom Henrique, S/N, Loja 06 - Marina da Glória - Glória, Rio de Janeiro - RJ, 20021-140
Instagram: @weboatbrasil
Site: https://www.weboatbrasil.com.br
```

### Métricas para Social Proof
```
+2.500 passeios realizados
5 lanchas próprias (+ parceiros de 10 a 65 pessoas)
+1000 avaliações 5 estrelas
+20.000 seguidores no Instagram
```

### Documentação de Referência
- **FAQ Completo:** `docs/weboat_faq.md` - Todas as perguntas e respostas oficiais
- **Schemas:** `docs/weboat_schema_org.md` - JSON-LD para SEO
- **Copywriting:** `docs/weboat_copywriting_seo.md` - Textos e palavras-chave
- **Gerenciar Lanchas:** `docs/GERENCIAR_LANCHAS.md` - Como adicionar, modificar e excluir lanchas
- **Otimização de Imagens:** `docs/OTIMIZACAO_IMAGENS.md` - Guia WebP, lazy load e ferramentas
- **GEO/SEO para IA:** `plano-geo-seo-ia-2026-final.md` - Otimização para ChatGPT, Perplexity, Claude, Gemini

---

## 🛠️ STACK TÉCNICO

- HTML5 semântico
- CSS3 com variáveis customizadas
- JavaScript vanilla (mínimo necessário)
- **Sem frameworks** (sem React, Vue, Bootstrap, Tailwind)

---

## 🎨 DESIGN SYSTEM

### Fontes (CRÍTICO - RESPEITAR)

| Elemento | Fonte | Weight | Tamanho Desktop | Tamanho Mobile |
|----------|-------|--------|-----------------|----------------|
| H1 | Plus Jakarta Sans | 700 | 48px | 36px |
| H2 | Plus Jakarta Sans | 700 | 36px | 28px |
| H3 | DM Sans | 600 | 24px | 20px |
| H4 | DM Sans | 600 | 20px | 18px |
| Body | Source Sans 3 | 400 | 16px | 16px |
| Button | DM Sans | 600 | 16px | 16px |
| Caption | DM Sans | 500 | 12px | 12px |

### Cores (SEMPRE usar variáveis CSS)

```css
/* Primárias */
--ocean-deep: #1E3A5F;      /* Textos, header, footer */
--sunset-gold: #D4A853;     /* CTAs principais, badges */
--wave-blue: #4A90B8;       /* Links, botões secundários */

/* Neutras */
--sand-white: #FAFAF8;      /* Background principal */
--pearl-gray: #F0F0EC;      /* Cards, seções alternadas */
--charcoal: #374151;        /* Corpo de texto */
--driftwood: #6B7280;       /* Texto secundário */

/* Feedback */
--whatsapp-green: #25D366;  /* Botões WhatsApp */
--success: #059669;
--error: #DC2626;
```

### Espaçamentos (escala 8px)
```
4px | 8px | 12px | 16px | 24px | 32px | 48px | 64px | 80px | 96px
```

---

## 📁 ESTRUTURA DE PASTAS

```
weboat-site/
├── CLAUDE.md                    ← VOCÊ ESTÁ AQUI
├── _redirects                   ← Cloudflare Pages redirects (Wix + old URLs)
├── index.html                   ← Homepage (PT)
├── lanchas/                     ← 5 próprias + 21 parceiras + comparativo
├── roteiros/                    ← 6 roteiros + listagem
├── despedida-solteira/          ← Ocasiões na raiz
├── aniversario/
├── corporativo/
├── reveillon/
├── carnaval/
├── servicos/ sobre/ faq/ contato/ como-funciona/ areas-atendidas/
├── blog/                        ← 3 artigos + index
├── politica-de-privacidade/ termos-de-uso/ checkout/
│
├── en/                          ← 🌐 INGLÊS (38 páginas)
│   ├── index.html               ← EN Homepage
│   ├── boats/                   ← 5 own boats + compare (no partners)
│   ├── routes/                  ← 6 routes + listing
│   ├── bachelorette-party/ birthday-party/ corporate-events/
│   ├── new-years-eve/ carnival/
│   ├── services/ about/ faq/ contact/ how-it-works/ service-areas/
│   ├── blog/                    ← 3 articles + index
│   ├── privacy-policy/ terms-of-use/ checkout/
│
├── es/                          ← 🌐 ESPANHOL (38 páginas)
│   ├── index.html               ← ES Homepage
│   ├── lanchas/                 ← 5 lanchas + comparar (sin socias)
│   ├── rutas/                   ← 6 rutas + listado
│   ├── despedida-de-soltera/ cumpleanos/ eventos-corporativos/
│   ├── ano-nuevo/ carnaval/
│   ├── servicios/ sobre-nosotros/ preguntas-frecuentes/ contacto/
│   ├── como-funciona/ areas-de-servicio/
│   ├── blog/ politica-de-privacidad/ terminos-de-uso/ checkout/
│
├── css/
│   ├── variables.css            ← Design System (NÃO ALTERAR)
│   ├── components.css           ← Componentes + language switcher
│   ├── header.css / footer.css
│   └── pages/ (home, frota, lancha-detalhe, roteiros, ocasioes, sobre, faq, contato)
├── js/
│   ├── i18n.js                  ← 🌐 i18n: lang detection, t(), url(), formatNumber()
│   ├── main.js                  ← Scripts gerais (i18n-aware)
│   ├── menu.js                  ← Toggle menu mobile (i18n-aware)
│   ├── form.js                  ← Validação de formulários (i18n-aware)
│   ├── checkout.js              ← Checkout flow (i18n-aware)
│   ├── proposal-builder.js      ← Proposta builder (i18n-aware)
│   ├── servicos-configurator.js ← Configurador serviços (i18n-aware)
│   └── data/servicos-data.js    ← Dados de serviços (i18n-aware)
├── scripts/
│   ├── generate-en-pages.js     ← Node.js: gera EN pages a partir de PT
│   ├── generate-es-pages.js     ← Node.js: gera ES pages a partir de PT
│   └── generate-sitemap.js      ← Node.js: gera sitemap com alternates
├── assets/images/ (logo, lanchas, roteiros, hero)
├── templates/ template-page.html
├── docs/
│   ├── i18n-registry.json       ← 🌐 Mapeamento PT↔EN↔ES de URLs
│   ├── weboat_schema_org.md
│   ├── weboat_copywriting_seo.md
│   └── ... (mais docs)
├── sitemap.xml                  ← 117 URLs com xhtml:link alternates
└── robots.txt
```

> **NOTA:** URLs limpas (sem .html). Cloudflare Pages serve `folder/index.html` automaticamente.
> Exemplo: `/lanchas/weboat-32/` serve `lanchas/weboat-32/index.html`

---

## 🚤 DADOS DAS LANCHAS (REFERÊNCIA RÁPIDA)

### Lanchas Próprias WeBoat (5 lanchas)

| Lancha | Capacidade | Preço Seg-Qui | Preço Sex-Dom | Destaque |
|--------|------------|---------------|---------------|----------|
| WeBoat 32 | 15 pessoas | R$ 2.300 | R$ 2.700 | Melhor custo-benefício |
| WeBoat 390 | 16 pessoas | R$ 2.600 | R$ 3.100 | Versátil, ótima para festas |
| WeBoat Oceanic 36 | 14 pessoas | R$ 2.900 | R$ 3.400 | Conforto premium |
| WeBoat 420 | 12 pessoas | R$ 2.700 | R$ 3.200 | Flybridge exclusivo |
| WeBoat Rio Star 50 | 22 pessoas | R$ 4.000 | R$ 4.500 | Maior capacidade |

### Lanchas Parceiras
- Disponíveis lanchas de **10 a 65 pessoas**
- Todas com banheiro a bordo

### O que inclui (TODAS as lanchas)
- Combustível
- Marinheiro experiente
- Coolers (gelo não incluso)
- Sistema de som Bluetooth
- Coletes salva-vidas (emergência)
- Tapete e macarrões flutuantes
- Seguro obrigatório

### Churrasqueira
- Todas as lanchas possuem churrasqueira
- **Taxa adicional:** R$ 250 a R$ 600 (varia por embarcação)
- Boias e equipamentos de segurança

---

## 🗺️ DADOS DOS ROTEIROS

| Roteiro | Duração | Preço Base | Badge |
|---------|---------|------------|-------|
| Mureta da Urca | 5h | R$ 2.300 | Melhor custo-benefício |
| Praia Vermelha | 5h | R$ 2.500 | ⭐ Mais vendido |
| Copacabana | 5h | R$ 3.000 | Vista icônica |
| Ilhas Cagarras | 5h | R$ 3.600 | Mar aberto |
| Itaipu e Camboinhas | 5h | R$ 3.600 | Praias desertas |
| Volta Completa | 5h | R$ 4.500 | Experiência completa |

---

## 🌐 INTERNACIONALIZAÇÃO (i18n)

### Idiomas: PT (raiz), EN (`/en/`), ES (`/es/`)

**Contagem de páginas:** 94 PT + 73 EN + 73 ES = 240 páginas total
- PT tem 21 parceiras extras (lanchas parceiras não traduzidas)
- EN/ES mostram seção "partner boats" com CTA WhatsApp em vez de páginas individuais

### Arquitetura i18n

1. **`js/i18n.js`** — Módulo central (IIFE → `window.WeBoatI18n`)
   - `WeBoatI18n.lang` — idioma detectado pela URL (`pt`, `en`, `es`)
   - `WeBoatI18n.t(key, fallback)` — traduz string
   - `WeBoatI18n.url(pageKey)` — resolve URL no idioma correto
   - `WeBoatI18n.formatNumber(n)` — formata número com locale
   - `WeBoatI18n.waUrl(text)` — gera link WhatsApp
   - Contém ~120 chaves por idioma (forms, checkout, proposal, configurator, menu)
   - GTM: faz `dataLayer.push({pageLanguage: lang})` automaticamente

2. **`docs/i18n-registry.json`** — Single source of truth para URLs
   - Mapeia cada página PT → EN → ES (slug traduzido)
   - Usado por scripts de geração e sitemap

3. **Language Switcher** — Dropdown com bandeiras no header de todas as páginas
   - CSS em `css/components.css` (`.language-switcher`)
   - Links diretos para a mesma página no outro idioma

4. **hreflang** — Todas as páginas PT/EN/ES têm:
   ```html
   <link rel="alternate" hreflang="pt-BR" href="...">
   <link rel="alternate" hreflang="en" href="...">
   <link rel="alternate" hreflang="es" href="...">
   <link rel="alternate" hreflang="x-default" href="...">
   ```

5. **Sitemap** — 117 URLs com `xhtml:link` alternates trilíngues

### Regras para Manutenção

- **Ao modificar conteúdo de qualquer página PT, atualizar EN/ES equivalentes**
- Cada página traduzida tem: `<!-- i18n: translated from PT version YYYY-MM-DD -->`
- Nomes de lanchas e lugares (Mureta da Urca, Praia Vermelha) ficam em PT em todos os idiomas
- Moeda: sempre R$ (BRL) em todos os idiomas
- Todos os JS usam pattern `var I = window.WeBoatI18n; function t(key, fb) { ... }` com fallback PT

### Scripts de Geração (em `scripts/`)

```bash
# Regenerar páginas EN (a partir das PT atuais)
node scripts/generate-en-pages.js

# Regenerar páginas ES
node scripts/generate-es-pages.js

# Regenerar sitemap.xml
node scripts/generate-sitemap.js
```

### Pipeline de Tradução (3 camadas)

Os scripts usam um pipeline de 3 camadas aplicado sequencialmente:

1. **Layer 1 (steps 1-16):** Substituições estruturais — header, footer, meta tags, `replaceInternalLinks()`
2. **Layer 2 (step 16b):** `replaceContentBlocks()` — pares `[ptText, translatedText]` por página
3. **Layer 3 (step 17):** `translateContent()` — dicionário global `[pt, translated]` ordenado por comprimento

**Regras críticas:**
- Strings longas DEVEM vir antes de substrings curtas (tanto em contentBlocks quanto no dicionário)
- O texto PT nos contentBlocks deve corresponder ao estado do HTML **APÓS step 16** (links já substituídos)
- O dicionário (`translateContent`) protege atributos HTML (href, src, alt) — para traduzir Schema.org JSON-LD, use contentBlocks
- Language switcher usa placeholders `__LANGSW_PT_HREF__` para evitar corrupção por `replaceInternalLinks()`

---

## 💬 MENSAGENS WHATSAPP PRÉ-DEFINIDAS

### Homepage / Geral
```
?text=Olá! Gostaria de informações sobre aluguel de lancha no Rio de Janeiro.
```

### Lancha Específica
```
?text=Olá! Tenho interesse na lancha [NOME DA LANCHA]. Poderia me enviar mais informações?
```

### Roteiro Específico
```
?text=Olá! Gostaria de fazer o roteiro [NOME DO ROTEIRO]. Qual a disponibilidade?
```

### Despedida de Solteira
```
?text=Olá! Estou organizando uma despedida de solteira e gostaria de informações sobre o passeio de lancha.
```

### Aniversário
```
?text=Olá! Quero comemorar meu aniversário na lancha. Podem me ajudar a organizar?
```

### Corporativo
```
?text=Olá! Gostaria de informações sobre eventos corporativos em lancha.
```

### Réveillon
```
?text=Olá! Quero informações sobre o réveillon na lancha para assistir a queima de fogos.
```

---

## 📋 CHECKLIST POR FASE

### FASE 1: Fundação
```
□ Criar estrutura de pastas completa
□ Verificar variables.css (fontes: Plus Jakarta Sans)
□ Verificar components.css
□ Criar templates/template-page.html
□ Criar css/header.css com header completo
□ Criar css/footer.css com footer completo
□ Criar js/menu.js (toggle mobile)

COMMIT: "chore: setup inicial do projeto"
```

### FASE 2: Homepage
```
□ Criar index.html com todas as seções:
  □ Meta tags SEO completas
  □ Hero (headline + CTAs)
  □ Social proof (4 números)
  □ Lanchas em destaque (4 cards)
  □ Roteiros (5 cards)
  □ Diferenciais (4-5 itens)
  □ Serviços extras
  □ FAQ resumido (4 perguntas)
  □ CTA final
□ Criar css/pages/home.css
□ Testar responsividade (375px, 768px, 1280px)
□ Verificar WhatsApp flutuante

COMMIT: "feat: homepage completa"
```

### FASE 3: Frota
```
□ Criar pages/lanchas/index.html (listagem)
□ Criar css/pages/frota.css
□ Criar css/pages/lancha-detalhe.css
□ Criar 5 páginas de lanchas próprias:
  □ weboat-32.html
  □ weboat-390.html
  □ weboat-oceanic-36.html
  □ weboat-rio-star-50.html
  □ weboat-vitoria.html
□ Cada página deve ter:
  □ Breadcrumb
  □ Galeria de fotos
  □ Especificações
  □ Tabela de preços
  □ O que inclui
  □ CTA WhatsApp com mensagem contextual
  □ Schema.org Product (ver docs/weboat_schema_org.md)

COMMIT: "feat: páginas de frota"
```

### FASE 4: Roteiros
```
□ Criar pages/roteiros/index.html (listagem com mapa)
□ Criar css/pages/roteiros.css
□ Criar 6 páginas de roteiros:
  □ mureta-da-urca.html
  □ praia-vermelha.html
  □ copacabana.html
  □ ilhas-cagarras.html
  □ itaipu-camboinhas.html
  □ volta-completa.html
□ Cada página deve ter:
  □ Mapa do trajeto
  □ Pontos de parada
  □ Duração e preço
  □ Lanchas disponíveis
  □ CTA WhatsApp

COMMIT: "feat: páginas de roteiros"
```

### FASE 5: Ocasiões (Landing Pages)
```
□ Criar css/pages/ocasioes.css
□ Criar 4 landing pages otimizadas:
  □ despedida-solteira.html
    - Keyword: "despedida de solteira na lancha rio de janeiro"
  □ aniversario.html
    - Keyword: "festa de aniversário na lancha"
  □ corporativo.html
    - Keyword: "eventos corporativos lancha rio"
  □ reveillon.html
    - Keyword: "réveillon na lancha rio de janeiro"
□ Cada landing deve ter:
  □ Hero focado na ocasião
  □ Benefícios específicos
  □ Galeria
  □ Depoimentos
  □ Pacotes
  □ FAQ específico
  □ Formulário/CTA

COMMIT: "feat: landing pages de ocasiões"
```

### FASE 6: Páginas de Suporte
```
□ Criar pages/servicos.html (churrasco, open bar, decoração)
□ Criar pages/sobre.html (história, equipe, estrutura)
□ Criar pages/faq.html (acordeão + Schema FAQPage - ver docs/weboat_schema_org.md)
□ Criar pages/contato.html (formulário + mapa)
□ Criar js/form.js (validação)

COMMIT: "feat: páginas de suporte"
```

### FASE 7: Finalização
```
□ Criar sitemap.xml
□ Criar robots.txt
□ Revisar todos os links internos
□ Verificar meta tags em todas as páginas
□ Verificar WhatsApp em todas as páginas
□ Testar responsividade geral
□ Validar HTML

COMMIT: "chore: SEO e finalização"
```

---

## 🏗️ CONVENÇÕES DE CÓDIGO

### HTML
- Usar tags semânticas: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`
- IDs em camelCase: `#mainContent`, `#heroSection`
- ARIA labels em elementos interativos
- Alt text descritivo em TODAS as imagens

### CSS
- Metodologia BEM: `.bloco__elemento--modificador`
- NUNCA hardcode cores (usar variáveis)
- Mobile-first com `min-width` nos media queries
- Comentários para separar seções

```css
/* ============================================
   SEÇÃO: Hero
   ============================================ */
```

### JavaScript
- camelCase para variáveis e funções
- Comentários explicando a lógica
- Event listeners com funções nomeadas

### Arquivos
- Lowercase com hífens: `weboat-390.html`, `header.css`
- Uma página = um arquivo HTML

---

## 📄 TEMPLATE HTML BASE

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  
  <!-- SEO -->
  <title>[TÍTULO] | WeBoat Brasil</title>
  <meta name="description" content="[DESCRIÇÃO 150-160 caracteres]">
  <meta name="keywords" content="[KEYWORDS]">
  <link rel="canonical" href="https://www.weboatbrasil.com.br/[URL]">
  <meta name="robots" content="index, follow">
  
  <!-- Open Graph -->
  <meta property="og:title" content="[TÍTULO]">
  <meta property="og:description" content="[DESCRIÇÃO]">
  <meta property="og:image" content="https://www.weboatbrasil.com.br/assets/images/og/[IMAGEM].jpg">
  <meta property="og:url" content="https://www.weboatbrasil.com.br/[URL]">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:site_name" content="WeBoat Brasil">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="[TÍTULO]">
  <meta name="twitter:description" content="[DESCRIÇÃO]">
  <meta name="twitter:image" content="https://www.weboatbrasil.com.br/assets/images/og/[IMAGEM].jpg">
  
  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/assets/images/logo/favicon.png">
  
  <!-- Preconnect -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- CSS -->
  <link rel="stylesheet" href="/css/variables.css">
  <link rel="stylesheet" href="/css/components.css">
  <link rel="stylesheet" href="/css/header.css">
  <link rel="stylesheet" href="/css/footer.css">
  <link rel="stylesheet" href="/css/pages/[PAGINA].css">
  
  <!-- Schema.org -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "WeBoat Brasil",
    "image": "https://www.weboatbrasil.com.br/assets/images/logo/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Infante Dom Henrique, S/N, Loja 06 - Marina da Glória",
      "addressLocality": "Rio de Janeiro",
      "addressRegion": "RJ",
      "addressCountry": "BR"
    },
    "telephone": "+5521977724114",
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "1000"
    }
  }
  </script>
</head>
<body>
  <!-- Skip Link -->
  <a href="#main-content" class="skip-link">Pular para o conteúdo</a>
  
  <!-- Header -->
  <header class="header" id="header">
    <!-- Incluir header aqui -->
  </header>
  
  <!-- Main Content -->
  <main id="main-content">
    <!-- Conteúdo da página -->
  </main>
  
  <!-- Footer -->
  <footer class="footer">
    <!-- Incluir footer aqui -->
  </footer>
  
  <!-- WhatsApp Float -->
  <a href="https://wa.me/5521977724114?text=[MENSAGEM]" 
     class="whatsapp-float" 
     target="_blank" 
     rel="noopener noreferrer"
     aria-label="Fale conosco pelo WhatsApp">
    <svg><!-- Ícone WhatsApp --></svg>
  </a>
  
  <!-- Scripts -->
  <script src="/js/menu.js" defer></script>
  <script src="/js/main.js" defer></script>
</body>
</html>
```

---

## ✅ CHECKLIST DE QUALIDADE (ANTES DE FINALIZAR)

### SEO
- [ ] Todas as páginas têm `<title>` único
- [ ] Todas as páginas têm `<meta description>` (150-160 chars)
- [ ] H1 único por página
- [ ] H1 contém keyword principal
- [ ] Hierarquia correta (H1 > H2 > H3)
- [ ] URLs amigáveis (lowercase, hífens)
- [ ] `<link rel="canonical">` em todas
- [ ] Schema.org implementado (ver docs/weboat_schema_org.md)
  - [ ] LocalBusiness em todas as páginas
  - [ ] BreadcrumbList em páginas internas
  - [ ] Product nas páginas de lanchas
  - [ ] FAQPage na página de FAQ
  - [ ] Service na página de serviços
- [ ] sitemap.xml criado
- [ ] robots.txt criado

### Design
- [ ] Cores usando variáveis CSS
- [ ] Fontes corretas (Plus Jakarta Sans para H1/H2)
- [ ] Espaçamentos na escala de 8px
- [ ] Responsivo em 375px, 768px, 1280px

### Funcionalidades
- [ ] WhatsApp flutuante em todas as páginas
- [ ] Links WhatsApp com mensagens contextuais
- [ ] Menu mobile funcionando
- [ ] Formulário com validação
- [ ] Todos os links internos funcionando

### Acessibilidade
- [ ] Alt text em todas as imagens
- [ ] Labels em todos os inputs
- [ ] Contraste mínimo 4.5:1
- [ ] Focus states visíveis
- [ ] Skip link funcionando
- [ ] ARIA labels em botões de ícone

### Performance
- [ ] Imagens < 500KB
- [ ] CSS minificado (produção)
- [ ] JS com defer
- [ ] Lazy loading em imagens abaixo da dobra

---

## 🌐 HOSPEDAGEM — CLOUDFLARE PAGES

**Hosting:** Cloudflare Pages (migrado de Vercel+Wix em fev/2026)
**Domínio:** weboatbrasil.com.br (Registro.br → Cloudflare NS)
**Preview URL:** https://weboat-site.pages.dev
**Deploy:** Direct Upload via wrangler CLI

### URLs Limpas (Clean URLs)
- Todas as páginas usam padrão `pasta/index.html` servido como `/pasta/`
- Sem extensão `.html`, sem prefixo `/pages/`
- Exemplo: `/lanchas/weboat-32/` serve `lanchas/weboat-32/index.html`
- Parceiras achatadas: sem `/parceiras/` na URL
- Ocasiões na raiz: `/despedida-solteira/`, `/aniversario/`, etc.

### Redirects (`_redirects`)
- 83 regras 301 (Wix legacy + URLs antigas com /pages/)
- Regras explícitas por página (não usar :splat para .html)

### DNS (Cloudflare)
- 5 MX records → Google Workspace (email)
- A record: `api.weboatbrasil.com.br` → `5.161.72.207` (TTL 1h, DNS-only)
- TXT SPF → `v=spf1 include:_spf.google.com ~all`
- TXT Google Site Verification
- Nameservers: `moura.ns.cloudflare.com` + `pam.ns.cloudflare.com`

### Google Tag Manager
- **Container ID:** GTM-K9LG4M2
- Instalado em todas as 240 páginas HTML (94 PT + 73 EN + 73 ES)
- `dataLayer.push({pageLanguage: 'en'})` via i18n.js para segmentação por idioma
- GA4, Ads, Meta Pixel e demais tags gerenciados via GTM

### TODO — Pós-Migração
- [x] **Google Tag Manager (GTM)** — GTM-K9LG4M2 instalado em 53 páginas
- [ ] **Google Analytics 4 (GA4)** — configurar via GTM
- [ ] **Meta Pixel (Facebook/Instagram)** — configurar via GTM
- [ ] **Microsoft Clarity** — opcional, heatmaps e session recordings
- [x] **Google Search Console** — API configurada via gcloud (projeto `fresh-iridium-437618-c0`)
- [ ] **DKIM** — configurar no Google Workspace para melhorar entregabilidade de email
- [ ] **DMARC** — adicionar TXT record `_dmarc` com política de rejeição

### Deploy
```bash
# Copiar para dir temporário (workaround permissões root)
rsync -a --no-owner --no-group --chmod=u+rw \
  --exclude='.git' --exclude='node_modules' --exclude='.DS_Store' \
  --exclude='package.json' --exclude='package-lock.json' \
  --exclude='images-originals' \
  . /tmp/weboat-deploy/

# Deploy para Cloudflare Pages
cd /tmp/weboat-deploy
npx wrangler pages deploy . --project-name weboat-site --branch main --commit-dirty=true
```

### Pós-Deploy: Notificar Search Engines
```bash
# IndexNow (Bing, Yandex) — aceita múltiplas URLs
node scripts/indexnow.js https://www.weboatbrasil.com.br/sitemap.xml
node scripts/indexnow.js https://www.weboatbrasil.com.br/ https://www.weboatbrasil.com.br/lanchas/ ...

# Google Search Console — submeter sitemap via API
ACCESS_TOKEN=$(gcloud auth application-default print-access-token) && curl -s -X PUT \
  "https://searchconsole.googleapis.com/webmasters/v3/sites/https%3A%2F%2Fwww.weboatbrasil.com.br%2F/sitemaps/https%3A%2F%2Fwww.weboatbrasil.com.br%2Fsitemap.xml" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "x-goog-user-project: fresh-iridium-437618-c0"
# Sucesso = HTTP 204 (sem body)

# Se token expirado, re-autenticar:
gcloud auth application-default login --scopes="https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/webmasters"
```

---

## 🔧 COMANDOS ÚTEIS

```bash
# Servidor local para testar
npx live-server --port=3000

# Validar HTML
npx html-validate "**/*.html"

# Formatar código
npx prettier --write "**/*.{html,css,js}"

# Ver estrutura de pastas
tree -I 'node_modules|.DS_Store'

# Contar linhas de código
find . -name "*.html" -o -name "*.css" -o -name "*.js" | xargs wc -l
```

---

## 🚨 REGRAS OBRIGATÓRIAS

1. **WhatsApp sempre visível** - Botão flutuante em TODAS as páginas
2. **Fonte dos títulos: Plus Jakarta Sans** - NÃO usar Playfair Display
3. **SEO completo** - Meta tags em TODAS as páginas
4. **Responsivo** - Testar em mobile, tablet, desktop
5. **Consistência** - Header/Footer IDÊNTICOS em todas as páginas
6. **Variáveis CSS** - NUNCA hardcode cores
7. **Acessibilidade** - Alt text, labels, contraste

---

## 🆘 TROUBLESHOOTING

| Problema | Solução |
|----------|---------|
| Fonte errada | Verificar import do Google Fonts em variables.css |
| Cor diferente | Usar `var(--nome-cor)`, nunca hex direto |
| Layout quebrado | Verificar container e grid no CSS |
| Mobile estranho | Checar breakpoints (min-width) |
| WhatsApp não abre | Verificar formato: `https://wa.me/5521977724114` |
| Link quebrado | Verificar caminho relativo vs absoluto |

---

**Última atualização:** 21 Fevereiro 2026
**Versão:** 5.6 - All Inclusive rename (60 files), generation scripts updated

### Changelog v5.6 (All Inclusive Rename)
- **Service Rename**: "Combo Churrasco + Open Bar" → "All Inclusive" across entire site (60 files, 390+ line changes)
- **Scope**: Services pages (PT/EN/ES), blog articles (43×3 langs), blog indexes, homepages, generation scripts, i18n strings, Schema.org JSON-LD
- **Preserved**: URL slugs unchanged for SEO continuity; standalone "Churrasco"/"Open Bar"/"BBQ"/"Asado"/"Barra Libre" services NOT renamed
- **Scripts updated**: `generate-en-pages.js` and `generate-es-pages.js` translation blocks updated for All Inclusive naming
- **Variants**: "All Inclusive Básico" (PT/ES), "All Inclusive Basic" (EN), "All Inclusive Premium" (all langs)

### Changelog v5.5 (Blog Expansion + Social Proof + Mobile Logo)
- **Blog Expansion**: 43 articles × 3 languages = 129 new blog pages. Topics: tourism guides, occasions, safety, food/drink, photography, etiquette, seasonal events. Blog index pages updated with full article listings.
- **Social Proof Updated**: Passeios realizados +1.000 → +2.500 across all pages (home, about, blog, meta descriptions, Schema.org, generate scripts). Avaliações stays +1.000. Instagram +19k → +20k.
- **Counter Animation Fix**: Added `data-prefix` support to `animateCounter()` in main.js. Social proof counters now show "+" prefix during and after animation via `data-prefix="+"` attribute.
- **Mobile Logo**: Reduced from 32px to 24px. Scrolled state now matches normal (24px, no shrink on scroll).
- **Sitemap**: Expanded from 117 to 222 URLs with trilingual `xhtml:link` alternates.
- **Page count**: 94 PT + 73 EN + 73 ES = 240 pages (was 129).

### Changelog v5.4 (Navigation + Mobile Refinements)
- **Dúvidas Dropdown**: "Como Funciona" + "FAQ" grouped into a dropdown labeled "Dúvidas" (PT), "Help" (EN), "Dudas" (ES) in desktop nav across all 118 pages. Mobile nav keeps flat links.
- **Desktop Nav Centered**: `flex: 1` + `justify-content: center` on nav, font 14→15px, padding increased. Logo left, WhatsApp+lang-switcher pinned right with `flex-shrink: 0`.
- **Mobile Logo Larger**: 32px (scrolled 24px), header scrolled height 58px.
- **WhatsApp Icon Sizes**: Mobile 0.8rem, tablet/desktop icon 0.9rem. Rectangular shape (6px 12px padding on mobile).
- **Checkout Logo**: Added left margin for breathing room.

### Changelog v5.3 (Checkout PDF + i18n)
- **Save as PDF**: Replaced .txt download with jsPDF PDF generation (loaded dynamically from CDN v3.0.3). PDF includes: WeBoat logo (embedded base64 PNG), ocean-deep header with gold accent, full reservation details, value breakdown with discount, ponto de encontro instructions, clickable video link, footer with contact. Fallback: navigator.share or clipboard copy if jsPDF fails to load.
- **Add to Calendar (.ics)**: New button generates .ics file with date/time (TZID=America/Sao_Paulo), location (Marina da Gloria with GEO coords), description (boat + route + people + price), 1-hour alarm reminder.
- **i18n fix**: `renderConfirmation()` now uses `t()` for all breakdown labels (was hardcoded PT). New i18n keys: `checkoutDiscount`, `checkoutPaid`, `checkoutSavePDF`, `checkoutAddCalendar`, `checkoutPhoneRequired`, `checkoutPhoneInvalid`, `checkoutEmailInvalid` — added to PT/EN/ES.
- **Language selector token**: `updateLangLinks()` appends `?token=xxx` to all language selector hrefs on init, so switching language preserves the checkout session.

### Changelog v5.2 (Header + Visual)
- **Mobile Header**: WhatsApp button now visible on all pages (icon-only, 40px circular green button). Order: logo (left) | lang-switcher, hamburger, WhatsApp (right). CSS-only, applies to all 118 pages.
- **Header Breathing Room**: Taller header when not scrolled (72px desktop, 62px mobile), compact on scroll (60px/54px) with smooth transition.
- **Header WhatsApp Button**: Reduced padding/height (36px min-height, 8px 16px padding) for better fit in header.
- **Checkout Header**: Matches site header dimensions (72px/62px, logo 34px/28px). Removed inline style overrides.
- **Hero Highlights**: Removed "A partir de R$ 2.300" text from homepage banner (PT/EN/ES).
- **Economia Badge**: Restored on combos section with proper CSS styling (id moved to section for correct selector match).
- **Cache Headers**: CSS/JS cache reduced from 300s to 60s to prevent stale deployments.

### Changelog v5.1 (Checkout + Language Fix)
- **Checkout Step 3**: Complete redesign with full reservation summary (boat, route with full name, date, time, guests), value breakdown (base price, services, discount, total, paid, remaining), ponto de encontro card with 4-step instructions + video link button, "O que trazer" list, "Salvar Reserva (PDF)" + "Adicionar ao Calendario (.ics)" buttons. Applied to PT/EN/ES.
- **Language Selector Fix**: EN checkout had PT link pointing to `/en/checkout/` (loop), ES had PT pointing to `/es/checkout/` (loop). Fixed all links and `--active` states in EN and ES checkout pages.
- **Checkout Header**: Logo reduced from 150x40 to 105x28 + inline `style="height:28px;width:auto;"` to override cached HTML attributes. Header padding reduced.
- **checkout.js**: Added `ROTEIRO_NOMES` mapping, `renderConfirmation(data)` for step 3 population, `saveReservation(data)` for .txt file download.
- **checkout.css**: Added `.proposal-summary__row` styles for value breakdown display.

### Changelog v5.0 (Audit v5.0)
- **Mobile UX:** font sizes min 13-14px, sticky sidebar static on mobile, footer 768px breakpoint, header 54px on mobile
- **GEO Answer Capsules:** H2s reformatted as questions on roteiros/serviços/áreas, `.answer-capsule` class on 45 files
- **Page Freshness:** `.page-freshness` dates on 57 files, `dateModified` updated in schemas
- **Internal Linking:** blog related articles (3 pages), serviços↔ocasiões cross-links (10 pages), recommended services on occasions
- **Schema GEO:** ContactPoint email, areaServed City/AdministrativeArea array, FAQ Q&As on occasions, blog author Organization
- **Visual:** carousel overflow fix, sidebar 320px tablet, price labels 13px
- **i18n:** 30+ new translation entries in generate-en/es scripts, contentBlock fix for partial translation bug
