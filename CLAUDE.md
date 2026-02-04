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
+1.000 passeios realizados
4 lanchas próprias (+ parceiros de 10 a 65 pessoas)
+900 avaliações 5 estrelas
+18.000 seguidores no Instagram
```

### Documentação de Referência
- **FAQ Completo:** `docs/weboat_faq.md` - Todas as perguntas e respostas oficiais
- **Schemas:** `docs/weboat_schema_org.md` - JSON-LD para SEO
- **Copywriting:** `docs/weboat_copywriting_seo.md` - Textos e palavras-chave
- **Gerenciar Lanchas:** `docs/GERENCIAR_LANCHAS.md` - Como adicionar, modificar e excluir lanchas

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
├── index.html                   ← Homepage
├── css/
│   ├── variables.css            ← Design System (NÃO ALTERAR)
│   ├── components.css           ← Componentes (NÃO ALTERAR)
│   ├── header.css               ← Estilos do header
│   ├── footer.css               ← Estilos do footer
│   └── pages/
│       ├── home.css
│       ├── frota.css
│       ├── lancha-detalhe.css
│       ├── roteiros.css
│       ├── ocasioes.css
│       ├── sobre.css
│       ├── faq.css
│       └── contato.css
├── js/
│   ├── main.js                  ← Scripts gerais
│   ├── menu.js                  ← Toggle menu mobile
│   └── form.js                  ← Validação de formulários
├── assets/
│   └── images/
│       ├── logo/
│       ├── lanchas/
│       ├── roteiros/
│       └── hero/
├── pages/
│   ├── lanchas/
│   │   ├── index.html           ← Listagem de lanchas
│   │   ├── weboat-32.html
│   │   ├── weboat-390.html
│   │   ├── weboat-oceanic-36.html
│   │   ├── weboat-rio-star-50.html
│   │   └── weboat-vitoria.html
│   ├── roteiros/
│   │   ├── index.html           ← Listagem de roteiros
│   │   ├── mureta-da-urca.html
│   │   ├── praia-vermelha.html
│   │   ├── copacabana.html
│   │   ├── ilhas-cagarras.html
│   │   ├── itaipu-camboinhas.html
│   │   └── volta-completa.html
│   ├── ocasioes/
│   │   ├── despedida-solteira.html
│   │   ├── aniversario.html
│   │   ├── corporativo.html
│   │   └── reveillon.html
│   ├── servicos.html
│   ├── sobre.html
│   ├── faq.html
│   └── contato.html
├── templates/
│   └── template-page.html       ← Template base
├── docs/                        ← Documentação de referência
│   ├── weboat_schema_org.md     ← SCHEMAS JSON-LD COMPLETOS
│   ├── weboat_copywriting_seo.md
│   ├── weboat_ui_design_system_CORRIGIDO.md
│   ├── weboat_wireframes.md
│   ├── weboat_site_documentation.md
│   ├── weboat_integracoes.md
│   └── RULES_CORRIGIDO.md
├── sitemap.xml
└── robots.txt
```

---

## 🚤 DADOS DAS LANCHAS (REFERÊNCIA RÁPIDA)

### Lanchas Próprias WeBoat (4 lanchas)

| Lancha | Capacidade | Preço Seg-Qui | Preço Sex-Dom | Destaque |
|--------|------------|---------------|---------------|----------|
| WeBoat 32 | 15 pessoas | R$ 2.300 | R$ 2.700 | Melhor custo-benefício |
| WeBoat 390 | 16 pessoas | R$ 2.600 | R$ 3.100 | Versátil, ótima para festas |
| WeBoat Oceanic 36 | 14 pessoas | R$ 2.900 | R$ 3.400 | Conforto premium |
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
| Mureta da Urca | 3h | R$ 2.300 | Melhor custo-benefício |
| Praia Vermelha | 3h | R$ 2.500 | ⭐ Mais vendido |
| Copacabana | 4h | R$ 3.000 | Vista icônica |
| Ilhas Cagarras | 4-5h | R$ 3.600 | Mar aberto |
| Itaipu e Camboinhas | 5h | R$ 3.600 | Praias desertas |
| Volta Completa | 6-7h | R$ 4.500 | Experiência completa |

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
      "reviewCount": "900"
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

**Última atualização:** Janeiro 2026  
**Versão:** 2.0 - Estratégia Direta Claude Code
