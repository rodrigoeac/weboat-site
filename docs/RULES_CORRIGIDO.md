# 📜 REGRAS PARA CONSTRUÇÃO DO SITE - WEBOAT BRASIL

Este documento contém regras obrigatórias, restrições e diretrizes que o construtor AI deve seguir rigorosamente ao desenvolver o site da WeBoat Brasil.

---

## 🚨 REGRAS CRÍTICAS (OBRIGATÓRIAS)

### 1. Identidade da Marca

```
✅ FAÇA:
- Use APENAS as cores definidas no Design System
- Use APENAS as fontes especificadas (Plus Jakarta Sans, DM Sans, Source Sans 3)
- Mantenha o tom "Coastal Premium" - sofisticado mas acessível
- Use linguagem em português brasileiro coloquial

❌ NÃO FAÇA:
- Não invente novas cores ou fontes
- Não use tons de roxo, rosa choque ou verde neon
- Não use linguagem formal demais ("Prezado cliente...")
- Não use gírias ou linguagem muito informal
```

### 2. Conversão e CTAs

```
✅ FAÇA:
- WhatsApp deve ser o CTA principal em TODAS as páginas
- Botão flutuante do WhatsApp SEMPRE visível
- Formulário de contato como opção secundária
- Use urgência sutil ("Garanta sua data", "Consulte disponibilidade")

❌ NÃO FAÇA:
- Não esconda os meios de contato
- Não crie CTAs genéricos ("Clique aqui", "Saiba mais")
- Não force o usuário a criar cadastro
- Não use pop-ups intrusivos
```

### 3. Informações de Contato

```
✅ DADOS OFICIAIS (use exatamente assim):
- WhatsApp: (21) 97772-4114
- Formato para link: +5521977724114
- Endereço: Av. Infante Dom Henrique, S/N, Loja 06 - Marina da Glória - Glória, Rio de Janeiro - RJ, 20021-140
- Instagram: @weboatbrasil

❌ NÃO FAÇA:
- Não invente outros números de telefone
- Não crie e-mails fictícios
- Não altere o endereço
```

### 4. Preços e Valores

```
✅ FAÇA:
- Sempre mostrar "A partir de R$ X"
- Incluir asterisco com nota sobre variação
- Indicar claramente o que está incluso

❌ NÃO FAÇA:
- Não invente preços
- Não prometa preços fixos
- Não omita que valores podem variar
- Não crie promoções fictícias

📋 REFERÊNCIA DE PREÇOS (consultar documentação):
- Lanchas próprias: a partir de R$ 2.300 (seg-qui) / R$ 2.700 (sex-dom)
- Churrasco: R$ 100-160/pessoa
- Open bar: R$ 135-180/pessoa
```

### 5. Conteúdo e SEO

```
✅ FAÇA:
- Use EXATAMENTE os textos do documento weboat_copywriting_seo.md
- Mantenha as palavras-chave nos locais indicados
- Preserve a estrutura de H1, H2, H3
- Mantenha as meta descriptions como especificadas

❌ NÃO FAÇA:
- Não reescreva os textos de copywriting
- Não remova palavras-chave
- Não altere a hierarquia de headings
- Não crie conteúdo novo sem aprovação
```

---

## 🎨 REGRAS DE DESIGN

### Cores

```css
/* CORES PERMITIDAS - USE APENAS ESTAS */
--ocean-deep: #1E3A5F;      /* Textos principais */
--sunset-gold: #D4A853;     /* CTAs, destaques */
--wave-blue: #4A90B8;       /* Links, secundários */
--sand-white: #FAFAF8;      /* Background principal */
--pearl-gray: #F0F0EC;      /* Cards, seções */
--driftwood: #6B7280;       /* Texto secundário */
--charcoal: #374151;        /* Corpo de texto */

/* Feedback */
--success: #059669;
--warning: #D97706;
--error: #DC2626;

/* WhatsApp */
--whatsapp-green: #25D366;
```

```
❌ CORES PROIBIDAS:
- Roxo em qualquer tom
- Rosa choque
- Laranja vibrante
- Verde limão
- Vermelho puro (exceto para erros)
- Preto puro (#000000)
```

### Tipografia

```css
/* HIERARQUIA OBRIGATÓRIA */
H1: Plus Jakarta Sans, 48px, weight 700
H2: Plus Jakarta Sans, 36px, weight 700
H3: DM Sans, 24px, weight 600
H4: DM Sans, 20px, weight 600
Body: Source Sans 3, 16px, weight 400
Caption: DM Sans, 12px, weight 500
Button: DM Sans, 16px, weight 600
```

```
❌ FONTES PROIBIDAS:
- Playfair Display (substituída por Plus Jakarta Sans)
- Inter
- Roboto
- Arial
- Open Sans
- Montserrat
- Poppins
- Comic Sans (obviamente)
```

### Espaçamentos

```css
/* USE A ESCALA DE 8px */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

```
❌ NÃO USE:
- Valores arbitrários (13px, 17px, 23px)
- Espaçamentos inconsistentes
- Margins/paddings muito apertados
```

### Componentes

```
✅ BOTÕES:
- Primário: Background sunset-gold, texto ocean-deep
- Secundário: Borda wave-blue, texto wave-blue
- WhatsApp: Background #25D366, texto branco
- Border-radius: 8px
- Padding: 14px 32px

✅ CARDS:
- Background: branco
- Border: 1px solid #E5E7EB
- Border-radius: 16px
- Shadow on hover: 0 20px 40px rgba(30, 58, 95, 0.12)

✅ INPUTS:
- Border: 2px solid #E5E7EB
- Border-radius: 8px
- Padding: 14px 16px
- Focus: border wave-blue + shadow
```

---

## 📱 REGRAS DE RESPONSIVIDADE

### Breakpoints Obrigatórios

```css
/* Mobile First - OBRIGATÓRIO */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md - Tablet */ }
@media (min-width: 1024px) { /* lg - Desktop */ }
@media (min-width: 1280px) { /* xl */ }
```

### Mobile

```
✅ OBRIGATÓRIO:
- Menu hamburger
- Botões full-width
- Cards empilhados (1 coluna)
- Font-size mínimo 16px em inputs (evita zoom iOS)
- Touch targets mínimo 44x44px
- WhatsApp float sempre visível

❌ PROIBIDO:
- Scroll horizontal
- Textos muito pequenos (<14px)
- Elementos sobrepostos
- Hover-only interactions
```

### Tablet

```
✅ OBRIGATÓRIO:
- Grid de 2 colunas para cards
- Menu pode ser hamburger ou horizontal
- Ajustar proporções de imagens
```

### Desktop

```
✅ OBRIGATÓRIO:
- Container max-width: 1280px
- Grid de 3-4 colunas para cards
- Menu horizontal completo
- Hover states em todos os interativos
```

---

## 🔌 REGRAS DE INTEGRAÇÕES

### WhatsApp

```
✅ OBRIGATÓRIO:
- Número: +5521977724114
- Mensagens pré-definidas conforme documentação
- Tracking de cliques (GA4 + Meta Pixel)
- Abrir em nova aba

❌ PROIBIDO:
- Alterar o número
- Remover mensagens pré-preenchidas
- Esconder o botão flutuante
```

### Google Analytics 4

```
✅ EVENTOS OBRIGATÓRIOS:
- whatsapp_click
- form_submit
- view_boat
- view_route
- phone_click

❌ PROIBIDO:
- Implementar sem consentimento de cookies (LGPD)
- Coletar dados pessoais diretamente
```

### Meta Pixel

```
✅ EVENTOS OBRIGATÓRIOS:
- PageView
- ViewContent (lanchas)
- Lead (formulário)
- Contact (WhatsApp)

❌ PROIBIDO:
- Disparar eventos duplicados
- Eventos sem parâmetros adequados
```

### Formulários

```
✅ OBRIGATÓRIO:
- Validação frontend
- Feedback visual de erro/sucesso
- Captura de UTM parameters
- Honeypot anti-spam
- Campos: Nome*, WhatsApp*, E-mail, Pessoas, Data, Ocasião, Mensagem

❌ PROIBIDO:
- Campos obrigatórios além de Nome e WhatsApp
- CAPTCHA visível (usar honeypot)
- Enviar sem validação
```

---

## 🔍 REGRAS DE SEO

### Meta Tags

```html
<!-- ESTRUTURA OBRIGATÓRIA EM TODAS AS PÁGINAS -->
<title>[Título da Página] | WeBoat Brasil</title>
<meta name="description" content="[Descrição de 150-160 caracteres]">
<link rel="canonical" href="https://www.weboatbrasil.com.br/[url]">
<meta name="robots" content="index, follow">

<!-- Open Graph -->
<meta property="og:title" content="[Título]">
<meta property="og:description" content="[Descrição]">
<meta property="og:image" content="[URL da imagem]">
<meta property="og:url" content="[URL canônica]">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
```

### URLs

```
✅ FORMATO CORRETO:
- /lanchas-para-alugar-rio-de-janeiro
- /passeio-de-lancha-rio-de-janeiro
- /despedida-de-solteira-na-lancha

❌ FORMATO ERRADO:
- /lanchas (muito curto, sem keyword)
- /pagina-de-lanchas-para-alugar (muito longo)
- /Lanchas_Para_Alugar (underscores e maiúsculas)
- /lancha?id=123 (parâmetros em URL)
```

### Headings

```
✅ REGRAS:
- Apenas 1 H1 por página
- H1 deve conter a keyword principal
- Hierarquia sequencial (H1 > H2 > H3)
- Não pular níveis (H1 > H3)

❌ PROIBIDO:
- Múltiplos H1
- H1 sem keyword
- Usar H tags para estilização
```

### Schema.org

```
✅ OBRIGATÓRIO:
- LocalBusiness (global)
- Product (páginas de lanchas)
- FAQPage (página de FAQ)
- BreadcrumbList (todas as páginas)

❌ PROIBIDO:
- Schema incorreto ou incompleto
- Dados falsos no schema
```

---

## ♿ REGRAS DE ACESSIBILIDADE

### Obrigatório

```
✅ IMPLEMENTAR:
- Alt text em TODAS as imagens
- Labels em TODOS os inputs
- Focus visible em elementos interativos
- Contraste mínimo 4.5:1 para texto
- Skip link para conteúdo principal
- ARIA labels em botões de ícone
- Estrutura semântica (header, main, nav, footer)

❌ PROIBIDO:
- Imagens sem alt
- Inputs sem label
- Remover outline de focus
- Texto sobre imagem sem contraste
- Elementos interativos sem indicação de foco
```

### Teclado

```
✅ OBRIGATÓRIO:
- Todos os elementos interativos acessíveis via Tab
- Ordem de tabulação lógica
- Escape fecha modais
- Enter ativa botões
```

---

## ⚡ REGRAS DE PERFORMANCE

### Imagens

```
✅ OBRIGATÓRIO:
- Formato WebP com fallback JPG
- Lazy loading para imagens abaixo da dobra
- Srcset para responsividade
- Dimensões explícitas (width/height)
- Compressão adequada (quality 80-85%)

❌ PROIBIDO:
- Imagens > 500KB
- PNG para fotos
- Imagens sem dimensões (causa CLS)
- Carregar todas as imagens no load inicial
```

### CSS/JS

```
✅ OBRIGATÓRIO:
- CSS crítico inline no <head>
- CSS não-crítico com preload
- JavaScript defer ou async
- Minificação em produção

❌ PROIBIDO:
- CSS blocking render
- JS síncrono no <head>
- Bibliotecas desnecessárias
- jQuery (não é necessário)
```

### Fontes

```
✅ OBRIGATÓRIO:
- Preconnect para Google Fonts
- font-display: swap
- Subset apenas caracteres necessários

❌ PROIBIDO:
- Fontes locais pesadas
- Múltiplos pesos não utilizados
- Bloquear renderização por fontes
```

---

## 🚫 RESTRIÇÕES ABSOLUTAS

### Conteúdo

```
❌ NUNCA:
- Inventar depoimentos ou avaliações
- Criar celebridades fictícias
- Prometer resultados não garantidos
- Usar fotos de outras empresas
- Copiar texto de concorrentes
- Incluir informações falsas sobre a empresa
```

### Funcionalidades

```
❌ NUNCA:
- Pop-ups de saída intrusivos
- Auto-play de vídeos com som
- Animações que causem distração excessiva
- Chat bots automáticos (WhatsApp é humano)
- Cadastro obrigatório para ver preços
- Compartilhamento forçado em redes sociais
```

### Técnico

```
❌ NUNCA:
- Frames ou iframes desnecessários
- Flash ou tecnologias obsoletas
- Redirect chains
- Links quebrados
- Erros 404 não tratados
- Mixed content (HTTP em HTTPS)
```

---

## 📋 CHECKLIST DE VALIDAÇÃO

Antes de entregar, verifique:

### Design
- [ ] Cores conforme paleta definida
- [ ] Fontes conforme especificação
- [ ] Espaçamentos na escala de 8px
- [ ] Responsivo em mobile, tablet e desktop
- [ ] Hover states em todos os interativos

### Conteúdo
- [ ] Textos conforme copywriting aprovado
- [ ] Informações de contato corretas
- [ ] Preços com disclaimer
- [ ] Sem erros de português

### SEO
- [ ] Meta tags em todas as páginas
- [ ] H1 único por página
- [ ] Schema.org implementado
- [ ] Sitemap.xml gerado
- [ ] Robots.txt configurado

### Performance
- [ ] PageSpeed > 90 mobile
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] Imagens otimizadas

### Funcionalidades
- [ ] WhatsApp funcionando
- [ ] Formulário enviando
- [ ] Analytics trackando
- [ ] Links funcionando

### Acessibilidade
- [ ] Alt em imagens
- [ ] Labels em inputs
- [ ] Contraste adequado
- [ ] Navegação por teclado

---

## 📚 DOCUMENTOS DE REFERÊNCIA

Para implementação correta, consulte:

1. **weboat_site_documentation.md** - Estrutura e conteúdo
2. **weboat_wireframes.md** - Layout das páginas
3. **weboat_copywriting_seo.md** - Textos otimizados
4. **weboat_ui_design_system.md** - Design system completo
5. **weboat_integracoes.md** - Especificações técnicas

---

## ⚠️ PENALIDADES

O não cumprimento destas regras resultará em:

1. **Revisão obrigatória** - Correção antes da entrega
2. **Retrabalho** - Refazer componentes incorretos
3. **Rejeição** - Site não aceito se regras críticas forem violadas

---

**Lembre-se:** Este site deve converter visitantes em clientes. Cada decisão deve priorizar a experiência do usuário e a conversão via WhatsApp.

---

*WeBoat Brasil - Aluguel de Lancha no Rio de Janeiro*
