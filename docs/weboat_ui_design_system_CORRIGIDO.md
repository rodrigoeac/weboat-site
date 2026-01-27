# 🎨 UI DESIGN SYSTEM - WEBOAT BRASIL

**Versão:** 1.0  
**Data:** Janeiro 2026  
**Etapa:** 4 - Especificação Visual Completa

---

# 📋 ÍNDICE

1. [Conceito Visual](#-conceito-visual)
2. [Paleta de Cores](#-paleta-de-cores)
3. [Tipografia](#-tipografia)
4. [Sistema de Espaçamentos](#-sistema-de-espaçamentos)
5. [Grid e Layout](#-grid-e-layout)
6. [Componentes UI](#-componentes-ui)
7. [Iconografia](#-iconografia)
8. [Fotografia e Imagens](#-fotografia-e-imagens)
9. [Animações e Micro-interações](#-animações-e-micro-interações)
10. [Responsividade](#-responsividade)
11. [Acessibilidade](#-acessibilidade)
12. [Exemplos de Aplicação](#-exemplos-de-aplicação)

---

# 🎯 CONCEITO VISUAL

## Direção Estética

```
COASTAL PREMIUM
─────────────────────────────────────────────────────────
Uma fusão entre o lifestyle praiano carioca e a sofisticação 
de experiências náuticas premium. Nem elitista demais, 
nem casual demais. O equilíbrio perfeito entre aventura 
e confiança.
```

## Palavras-Chave do Design

| Aspecto | Direção |
|---------|---------|
| **Tom** | Sofisticado mas acessível |
| **Energia** | Vibrante mas não agitado |
| **Visual** | Clean com toques de luxo |
| **Sensação** | Confiança e desejo |
| **Diferencial** | Premium democrático |

## Referências Visuais

```
• Resorts de praia boutique
• Marcas de lifestyle náutico (não iatismo elitista)
• Editoriais de viagem premium
• Apps de experiências de luxo acessível (Airbnb Luxe)
• Estética "Golden Hour" - aquele brilho do pôr do sol
```

## O que EVITAR

```
❌ Visual genérico de agência de turismo
❌ Azul marinho institucional
❌ Fotos de banco de imagem genéricas
❌ Layouts de template
❌ Excesso de elementos (poluição visual)
❌ Visual "barato" ou "popular demais"
❌ Estética de iate clube elitista
```

## Personalidade da Marca

```
Se a WeBoat fosse uma pessoa:

• Idade: 32 anos
• Estilo: Casual chic, linho branco, óculos de sol premium
• Fala: Descontraído mas articulado
• Ambiente: Bar de praia sofisticado, não barraca de praia
• Música: Deep house suave, não funk ou sertanejo
• Carro: SUV premium, não lancha ostentação
```

---

# 🎨 PALETA DE CORES

## Cores Primárias

### Ocean Deep (Principal)
```css
--ocean-deep: #1E3A5F;
--ocean-deep-rgb: 30, 58, 95;

/* Uso: Textos principais, headers, footer, elementos de destaque */
/* Transmite: Profundidade, confiança, profissionalismo */
```

### Sunset Gold (Destaque)
```css
--sunset-gold: #D4A853;
--sunset-gold-rgb: 212, 168, 83;

/* Uso: CTAs principais, badges, destaques de preço, ícones */
/* Transmite: Premium, calor, pôr do sol, experiência especial */
```

### Wave Blue (Secundária)
```css
--wave-blue: #4A90B8;
--wave-blue-rgb: 74, 144, 184;

/* Uso: Links, botões secundários, ícones, elementos interativos */
/* Transmite: Mar, frescor, navegação, confiança */
```

## Cores Neutras

### Sand White (Background Principal)
```css
--sand-white: #FAFAF8;
--sand-white-rgb: 250, 250, 248;

/* Uso: Background principal do site */
/* Transmite: Limpeza, areia clara, sofisticação */
```

### Pearl Gray (Background Secundário)
```css
--pearl-gray: #F0F0EC;
--pearl-gray-rgb: 240, 240, 236;

/* Uso: Cards, seções alternadas, backgrounds de formulários */
/* Transmite: Suavidade, neutralidade elegante */
```

### Driftwood (Texto Secundário)
```css
--driftwood: #6B7280;
--driftwood-rgb: 107, 114, 128;

/* Uso: Textos secundários, legendas, placeholders */
/* Transmite: Neutralidade, legibilidade */
```

### Charcoal (Texto Terciário)
```css
--charcoal: #374151;
--charcoal-rgb: 55, 65, 81;

/* Uso: Corpo de texto quando precisa de mais peso */
```

## Cores de Feedback

### Coral Success
```css
--success: #059669;
--success-light: #D1FAE5;

/* Uso: Mensagens de sucesso, confirmações, badges "Incluso" */
```

### Sunset Warning
```css
--warning: #D97706;
--warning-light: #FEF3C7;

/* Uso: Alertas, avisos importantes, promoções */
```

### Reef Error
```css
--error: #DC2626;
--error-light: #FEE2E2;

/* Uso: Erros, campos obrigatórios, alertas críticos */
```

## Gradientes

### Golden Hour (Hero e CTAs Premium)
```css
--gradient-golden-hour: linear-gradient(
  135deg,
  #D4A853 0%,
  #E8C87A 50%,
  #D4A853 100%
);

/* Uso: Botões CTA principais, badges premium */
```

### Ocean Depth (Headers e Footer)
```css
--gradient-ocean-depth: linear-gradient(
  180deg,
  #1E3A5F 0%,
  #2D4A6F 100%
);

/* Uso: Header sticky, footer, overlays em imagens */
```

### Sunset Sky (Backgrounds Hero)
```css
--gradient-sunset-sky: linear-gradient(
  180deg,
  rgba(212, 168, 83, 0.1) 0%,
  rgba(250, 250, 248, 1) 100%
);

/* Uso: Background sutil de hero sections */
```

### Water Shimmer (Efeitos)
```css
--gradient-water-shimmer: linear-gradient(
  90deg,
  rgba(74, 144, 184, 0.1) 0%,
  rgba(74, 144, 184, 0.3) 50%,
  rgba(74, 144, 184, 0.1) 100%
);

/* Uso: Efeitos de loading, shimmer em cards */
```

## Aplicação de Cores por Elemento

| Elemento | Cor | Código |
|----------|-----|--------|
| Background principal | Sand White | #FAFAF8 |
| Background seções alternadas | Pearl Gray | #F0F0EC |
| Texto principal (H1, H2) | Ocean Deep | #1E3A5F |
| Texto corpo | Charcoal | #374151 |
| Texto secundário | Driftwood | #6B7280 |
| Links | Wave Blue | #4A90B8 |
| Links hover | Ocean Deep | #1E3A5F |
| CTA principal | Sunset Gold | #D4A853 |
| CTA principal hover | #C49643 | (10% mais escuro) |
| CTA secundário | Wave Blue | #4A90B8 |
| Badges "Própria" | Sunset Gold | #D4A853 |
| Badges "Mais vendido" | #DC2626 | (vermelho) |
| Preços | Ocean Deep | #1E3A5F |
| Preços promocionais | Success | #059669 |
| Footer background | Ocean Deep | #1E3A5F |
| Footer texto | #FFFFFF | |
| Dividers | #E5E7EB | |
| Borders cards | #E5E7EB | |

---

# ✒️ TIPOGRAFIA

## Fontes Escolhidas

### Display Font: Plus Jakarta Sans
```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

font-family: 'Plus Jakarta Sans', sans-serif;

/* Uso: H1, H2, títulos de destaque, números grandes */
/* Por quê: Moderna, elegante, equilibra sofisticação e acessibilidade - ideal para o conceito "premium democrático" */
```

### Heading Font: DM Sans
```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

font-family: 'DM Sans', sans-serif;

/* Uso: H3, H4, subtítulos, menus, botões */
/* Por quê: Moderna, clean, excelente legibilidade */
```

### Body Font: Source Sans 3
```css
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600&display=swap');

font-family: 'Source Sans 3', sans-serif;

/* Uso: Corpo de texto, parágrafos, descrições */
/* Por quê: Altamente legível, profissional, versátil */
```

## Escala Tipográfica

### Desktop

```css
/* Display - Números grandes, Hero */
--text-display: 72px;    /* 4.5rem */
--line-display: 1.1;
--weight-display: 800;
--font-display: 'Plus Jakarta Sans';

/* H1 - Títulos principais de página */
--text-h1: 48px;         /* 3rem */
--line-h1: 1.2;
--weight-h1: 700;
--font-h1: 'Plus Jakarta Sans';

/* H2 - Títulos de seção */
--text-h2: 36px;         /* 2.25rem */
--line-h2: 1.3;
--weight-h2: 700;
--font-h2: 'Plus Jakarta Sans';

/* H3 - Subtítulos, títulos de cards */
--text-h3: 24px;         /* 1.5rem */
--line-h3: 1.4;
--weight-h3: 600;
--font-h3: 'DM Sans';

/* H4 - Títulos menores */
--text-h4: 20px;         /* 1.25rem */
--line-h4: 1.4;
--weight-h4: 600;
--font-h4: 'DM Sans';

/* Body Large - Textos de destaque */
--text-body-lg: 18px;    /* 1.125rem */
--line-body-lg: 1.6;
--weight-body-lg: 400;
--font-body-lg: 'Source Sans 3';

/* Body - Texto padrão */
--text-body: 16px;       /* 1rem */
--line-body: 1.7;
--weight-body: 400;
--font-body: 'Source Sans 3';

/* Body Small - Legendas, notas */
--text-body-sm: 14px;    /* 0.875rem */
--line-body-sm: 1.6;
--weight-body-sm: 400;
--font-body-sm: 'Source Sans 3';

/* Caption - Textos muito pequenos */
--text-caption: 12px;    /* 0.75rem */
--line-caption: 1.5;
--weight-caption: 500;
--font-caption: 'DM Sans';

/* Button - Texto de botões */
--text-button: 16px;     /* 1rem */
--line-button: 1;
--weight-button: 600;
--font-button: 'DM Sans';
--tracking-button: 0.5px;

/* Overline - Labels, categorias */
--text-overline: 12px;   /* 0.75rem */
--line-overline: 1;
--weight-overline: 600;
--font-overline: 'DM Sans';
--tracking-overline: 1.5px;
--transform-overline: uppercase;
```

### Mobile (Escala Reduzida)

```css
--text-display-mobile: 48px;   /* 3rem */
--text-h1-mobile: 36px;        /* 2.25rem */
--text-h2-mobile: 28px;        /* 1.75rem */
--text-h3-mobile: 20px;        /* 1.25rem */
--text-h4-mobile: 18px;        /* 1.125rem */
--text-body-lg-mobile: 17px;   /* 1.0625rem */
--text-body-mobile: 16px;      /* 1rem */
--text-body-sm-mobile: 14px;   /* 0.875rem */
```

## Exemplos de Aplicação

### H1 - Título de Página
```css
h1 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--ocean-deep);
  letter-spacing: -0.5px;
}

/* Exemplo: "Aluguel de Lancha no Rio de Janeiro" */
```

### H2 - Título de Seção
```css
h2 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 36px;
  font-weight: 700;
  line-height: 1.3;
  color: var(--ocean-deep);
  letter-spacing: -0.3px;
}

/* Exemplo: "Nossas Lanchas" */
```

### H3 - Título de Card
```css
h3 {
  font-family: 'DM Sans', sans-serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--ocean-deep);
}

/* Exemplo: "WeBoat 390" */
```

### Parágrafo
```css
p {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.7;
  color: var(--charcoal);
}
```

### Preço Grande
```css
.price-large {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: var(--ocean-deep);
}

.price-currency {
  font-size: 20px;
  vertical-align: super;
}

/* Exemplo: R$ 2.300 */
```

### Badge/Label
```css
.badge {
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}
```

---

# 📐 SISTEMA DE ESPAÇAMENTOS

## Escala de Espaçamento (8pt Grid)

```css
--space-0: 0;
--space-1: 4px;      /* 0.25rem - Micro espaçamentos */
--space-2: 8px;      /* 0.5rem - Entre elementos inline */
--space-3: 12px;     /* 0.75rem - Padding interno pequeno */
--space-4: 16px;     /* 1rem - Padrão, padding de cards */
--space-5: 20px;     /* 1.25rem - Pequeno destaque */
--space-6: 24px;     /* 1.5rem - Entre elementos relacionados */
--space-8: 32px;     /* 2rem - Entre grupos de elementos */
--space-10: 40px;    /* 2.5rem - Entre seções pequenas */
--space-12: 48px;    /* 3rem - Margem de seções */
--space-16: 64px;    /* 4rem - Entre seções médias */
--space-20: 80px;    /* 5rem - Entre seções grandes */
--space-24: 96px;    /* 6rem - Hero sections */
--space-32: 128px;   /* 8rem - Seções principais desktop */
```

## Aplicação de Espaçamentos

### Seções da Página
```css
section {
  padding-top: var(--space-20);      /* 80px */
  padding-bottom: var(--space-20);   /* 80px */
}

section.hero {
  padding-top: var(--space-32);      /* 128px */
  padding-bottom: var(--space-24);   /* 96px */
}

@media (max-width: 768px) {
  section {
    padding-top: var(--space-12);    /* 48px */
    padding-bottom: var(--space-12); /* 48px */
  }
}
```

### Cards
```css
.card {
  padding: var(--space-6);           /* 24px */
  gap: var(--space-4);               /* 16px entre elementos */
}

.card-compact {
  padding: var(--space-4);           /* 16px */
  gap: var(--space-3);               /* 12px */
}
```

### Formulários
```css
.form-group {
  margin-bottom: var(--space-5);     /* 20px */
}

.form-label {
  margin-bottom: var(--space-2);     /* 8px */
}

.form-input {
  padding: var(--space-3) var(--space-4);  /* 12px 16px */
}
```

### Botões
```css
.btn {
  padding: var(--space-3) var(--space-6);  /* 12px 24px */
}

.btn-lg {
  padding: var(--space-4) var(--space-8);  /* 16px 32px */
}

.btn-sm {
  padding: var(--space-2) var(--space-4);  /* 8px 16px */
}
```

---

# 🔲 GRID E LAYOUT

## Container

```css
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding-left: var(--space-6);    /* 24px */
  padding-right: var(--space-6);   /* 24px */
}

.container-narrow {
  max-width: 960px;
}

.container-wide {
  max-width: 1440px;
}

@media (max-width: 768px) {
  .container {
    padding-left: var(--space-4);   /* 16px */
    padding-right: var(--space-4);  /* 16px */
  }
}
```

## Grid System

```css
.grid {
  display: grid;
  gap: var(--space-6);             /* 24px padrão */
}

/* Grid de 2 colunas */
.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

/* Grid de 3 colunas */
.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

/* Grid de 4 colunas */
.grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

/* Grid responsivo para cards */
.grid-cards {
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}

/* Responsividade */
@media (max-width: 1024px) {
  .grid-4 { grid-template-columns: repeat(2, 1fr); }
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .grid-4,
  .grid-3,
  .grid-2 { grid-template-columns: 1fr; }
}
```

## Layout de Páginas

### Home - Hero
```
┌─────────────────────────────────────────────────────────┐
│  [Logo]     Menu Links              [CTA Button]        │ Header 80px
├─────────────────────────────────────────────────────────┤
│                                                         │
│     H1: Aluguel de Lancha no Rio de Janeiro            │
│     Subtitle: Texto de apoio...                         │ Hero 600px
│                                                         │
│     [CTA Principal]  [CTA Secundário]                   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  +1.000    │    5     │   +900    │   +18k             │ Social Proof
│  passeios  │ lanchas  │  5 stars  │  seguidores        │ 120px
├─────────────────────────────────────────────────────────┤
│                                                         │
│  H2: Nossas Lanchas                                     │
│                                                         │ Seção 
│  [Card 1]  [Card 2]  [Card 3]  [Card 4]                │ Lanchas
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Layout de Card - Lancha
```
┌────────────────────────────────────┐
│                                    │
│         [Imagem 16:10]             │  200px
│                                    │
│  ┌──────────────┐                  │
│  │ 🏷️ PRÓPRIA  │                  │  Badge
│  └──────────────┘                  │
├────────────────────────────────────┤
│  H3: WeBoat 390                    │
│  👥 Até 16 pessoas                 │
│                                    │  Content
│  ✅ Combustível  ✅ Tripulação     │  padding 24px
│  ✅ Som          ✅ Coolers        │
│                                    │
├────────────────────────────────────┤
│  A partir de                       │
│  R$ 2.600*         [Ver Detalhes]  │  Footer
└────────────────────────────────────┘
       320px mín / 400px máx
```

---

# 🧩 COMPONENTES UI

## Botões

### Botão Primário (CTA Principal)
```css
.btn-primary {
  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: 14px 32px;
  
  /* Visual */
  background: var(--sunset-gold);
  color: var(--ocean-deep);
  border: none;
  border-radius: 8px;
  
  /* Tipografia */
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-decoration: none;
  
  /* Interação */
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(212, 168, 83, 0.3);
}

.btn-primary:hover {
  background: #C49643;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212, 168, 83, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(212, 168, 83, 0.3);
}
```

### Botão Secundário
```css
.btn-secondary {
  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: 14px 32px;
  
  /* Visual */
  background: transparent;
  color: var(--wave-blue);
  border: 2px solid var(--wave-blue);
  border-radius: 8px;
  
  /* Tipografia */
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  font-weight: 700;
  
  /* Interação */
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--wave-blue);
  color: white;
}
```

### Botão WhatsApp
```css
.btn-whatsapp {
  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: 14px 32px;
  
  /* Visual */
  background: #25D366;
  color: white;
  border: none;
  border-radius: 8px;
  
  /* Tipografia */
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  font-weight: 700;
  
  /* Interação */
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(37, 211, 102, 0.3);
}

.btn-whatsapp:hover {
  background: #20BD5A;
  transform: translateY(-2px);
}
```

### Botão Ghost (Links)
```css
.btn-ghost {
  /* Layout */
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) 0;
  
  /* Visual */
  background: none;
  border: none;
  color: var(--wave-blue);
  
  /* Tipografia */
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  font-weight: 500;
  
  /* Interação */
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-ghost:hover {
  color: var(--ocean-deep);
}

.btn-ghost::after {
  content: '→';
  transition: transform 0.2s ease;
}

.btn-ghost:hover::after {
  transform: translateX(4px);
}
```

## Cards

### Card de Lancha
```css
.card-boat {
  /* Layout */
  display: flex;
  flex-direction: column;
  
  /* Visual */
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #E5E7EB;
  
  /* Interação */
  transition: all 0.3s ease;
}

.card-boat:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(30, 58, 95, 0.12);
  border-color: var(--sunset-gold);
}

.card-boat__image {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
}

.card-boat__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.card-boat:hover .card-boat__image img {
  transform: scale(1.05);
}

.card-boat__badge {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 12px;
  background: var(--sunset-gold);
  color: var(--ocean-deep);
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border-radius: 4px;
}

.card-boat__content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
}

.card-boat__title {
  font-family: 'DM Sans', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: var(--ocean-deep);
  margin: 0;
}

.card-boat__capacity {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 14px;
  color: var(--driftwood);
}

.card-boat__features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.card-boat__feature {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 14px;
  color: var(--charcoal);
}

.card-boat__feature-icon {
  color: var(--success);
  font-size: 16px;
}

.card-boat__footer {
  padding: 20px 24px;
  background: var(--pearl-gray);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-boat__price-label {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 13px;
  color: var(--driftwood);
}

.card-boat__price {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: var(--ocean-deep);
}

.card-boat__price-note {
  font-size: 12px;
  color: var(--driftwood);
}
```

### Card de Roteiro
```css
.card-route {
  /* Layout */
  display: flex;
  flex-direction: column;
  
  /* Visual */
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #E5E7EB;
  position: relative;
  
  /* Interação */
  transition: all 0.3s ease;
}

.card-route:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(30, 58, 95, 0.1);
}

.card-route__number {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 48px;
  height: 48px;
  background: var(--ocean-deep);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 20px;
  font-weight: 700;
}

.card-route__badge {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 6px 12px;
  background: white;
  border-radius: 20px;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.card-route__badge--popular {
  background: #FEE2E2;
  color: #DC2626;
}

.card-route__badge--value {
  background: #D1FAE5;
  color: #059669;
}
```

### Card de Serviço
```css
.card-service {
  /* Layout */
  padding: 32px;
  
  /* Visual */
  background: white;
  border-radius: 16px;
  border: 1px solid #E5E7EB;
  
  /* Interação */
  transition: all 0.3s ease;
}

.card-service:hover {
  border-color: var(--sunset-gold);
  box-shadow: 0 8px 24px rgba(212, 168, 83, 0.15);
}

.card-service__icon {
  width: 64px;
  height: 64px;
  background: var(--pearl-gray);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin-bottom: 20px;
}

.card-service__title {
  font-family: 'DM Sans', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: var(--ocean-deep);
  margin-bottom: 12px;
}

.card-service__description {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 15px;
  color: var(--driftwood);
  line-height: 1.6;
  margin-bottom: 20px;
}

.card-service__price {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: var(--sunset-gold);
}
```

## Badges

### Badge Própria
```css
.badge-own {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--sunset-gold);
  color: var(--ocean-deep);
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border-radius: 4px;
}

.badge-own::before {
  content: '🏷️';
  font-size: 12px;
}
```

### Badge Popular
```css
.badge-popular {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #FEE2E2;
  color: #DC2626;
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border-radius: 4px;
}

.badge-popular::before {
  content: '🔥';
  font-size: 12px;
}
```

### Badge Promo
```css
.badge-promo {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #D1FAE5;
  color: #059669;
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border-radius: 4px;
}
```

## Formulários

### Input Padrão
```css
.form-input {
  /* Layout */
  width: 100%;
  padding: 14px 16px;
  
  /* Visual */
  background: white;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  
  /* Tipografia */
  font-family: 'Source Sans 3', sans-serif;
  font-size: 16px;
  color: var(--charcoal);
  
  /* Interação */
  transition: all 0.2s ease;
}

.form-input::placeholder {
  color: var(--driftwood);
}

.form-input:focus {
  outline: none;
  border-color: var(--wave-blue);
  box-shadow: 0 0 0 4px rgba(74, 144, 184, 0.1);
}

.form-input:hover:not(:focus) {
  border-color: #D1D5DB;
}

.form-input--error {
  border-color: var(--error);
}

.form-input--error:focus {
  box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.1);
}
```

### Label
```css
.form-label {
  display: block;
  margin-bottom: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: var(--ocean-deep);
}

.form-label--required::after {
  content: ' *';
  color: var(--error);
}
```

### Select
```css
.form-select {
  /* Layout */
  width: 100%;
  padding: 14px 40px 14px 16px;
  
  /* Visual */
  background: white;
  background-image: url("data:image/svg+xml,..."); /* Arrow icon */
  background-repeat: no-repeat;
  background-position: right 16px center;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  
  /* Tipografia */
  font-family: 'Source Sans 3', sans-serif;
  font-size: 16px;
  color: var(--charcoal);
  
  /* Interação */
  cursor: pointer;
  appearance: none;
  transition: all 0.2s ease;
}

.form-select:focus {
  outline: none;
  border-color: var(--wave-blue);
  box-shadow: 0 0 0 4px rgba(74, 144, 184, 0.1);
}
```

### Mensagem de Erro
```css
.form-error {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 13px;
  color: var(--error);
}

.form-error::before {
  content: '⚠';
  font-size: 14px;
}
```

## Header

```css
.header {
  /* Layout */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  z-index: 1000;
  
  /* Visual */
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  
  /* Interação */
  transition: all 0.3s ease;
}

.header--scrolled {
  height: 72px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

.header__logo {
  height: 48px;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 32px;
}

.header__nav-link {
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: var(--charcoal);
  text-decoration: none;
  transition: color 0.2s ease;
}

.header__nav-link:hover {
  color: var(--ocean-deep);
}

.header__nav-link--active {
  color: var(--ocean-deep);
  font-weight: 700;
}

.header__cta {
  /* Usa estilo btn-primary */
}

/* Mobile */
.header__mobile-toggle {
  display: none;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
}

@media (max-width: 1024px) {
  .header__nav {
    display: none;
  }
  
  .header__mobile-toggle {
    display: flex;
  }
}
```

## Footer

```css
.footer {
  background: var(--ocean-deep);
  color: white;
  padding: 80px 0 32px;
}

.footer__grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 64px;
}

.footer__brand {
  /* Coluna 1 - Maior */
}

.footer__logo {
  height: 56px;
  margin-bottom: 20px;
}

.footer__description {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 15px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 24px;
}

.footer__social {
  display: flex;
  gap: 16px;
}

.footer__social-link {
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.2s ease;
}

.footer__social-link:hover {
  background: var(--sunset-gold);
  color: var(--ocean-deep);
}

.footer__column-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--sunset-gold);
  margin-bottom: 24px;
}

.footer__link {
  display: block;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-bottom: 12px;
  transition: color 0.2s ease;
}

.footer__link:hover {
  color: white;
}

.footer__bottom {
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer__copyright {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

@media (max-width: 768px) {
  .footer__grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .footer__brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 480px) {
  .footer__grid {
    grid-template-columns: 1fr;
  }
}
```

## WhatsApp Floating Button

```css
.whatsapp-float {
  /* Layout */
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 999;
  
  /* Visual */
  width: 64px;
  height: 64px;
  background: #25D366;
  border-radius: 50%;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
  
  /* Conteúdo */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
  
  /* Interação */
  cursor: pointer;
  transition: all 0.3s ease;
  animation: pulse 2s infinite;
}

.whatsapp-float:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 28px rgba(37, 211, 102, 0.5);
}

@keyframes pulse {
  0% { box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4); }
  50% { box-shadow: 0 4px 30px rgba(37, 211, 102, 0.6); }
  100% { box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4); }
}

.whatsapp-float__tooltip {
  position: absolute;
  right: 76px;
  top: 50%;
  transform: translateY(-50%);
  padding: 10px 16px;
  background: white;
  color: var(--charcoal);
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
}

.whatsapp-float:hover .whatsapp-float__tooltip {
  opacity: 1;
  visibility: visible;
}
```

---

# 🔣 ICONOGRAFIA

## Biblioteca de Ícones

```
Biblioteca Principal: Phosphor Icons
https://phosphoricons.com/

Estilo: Regular (peso padrão)
Tamanhos: 16px, 20px, 24px, 32px
```

## Ícones Utilizados

### Navegação e Ações
```
• Menu: list (hamburger)
• Fechar: x
• Voltar: arrow-left
• Próximo: arrow-right
• Expandir: caret-down
• Link externo: arrow-square-out
• Download: download-simple
• Compartilhar: share-network
```

### Funcionalidades
```
• Busca: magnifying-glass
• Filtros: funnel
• Calendário: calendar-blank
• Relógio: clock
• Localização: map-pin
• Telefone: phone
• WhatsApp: whatsapp-logo
• E-mail: envelope-simple
• Instagram: instagram-logo
```

### Conteúdo - Lanchas
```
• Capacidade: users
• Tamanho: ruler
• Motor: engine
• Som: speaker-high
• Banheiro: toilet
• Ar condicionado: snowflake
• Churrasqueira: fire
• Âncora: anchor
```

### Feedback
```
• Sucesso: check-circle
• Erro: x-circle
• Aviso: warning
• Info: info
• Estrela: star-fill
```

### Serviços
```
• Churrasco: fire
• Open bar: cocktail
• Decoração: balloon
• DJ: music-notes
• Foto: camera
• Mergulho: swimming-pool
```

## Aplicação de Ícones

```css
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon--sm { font-size: 16px; }
.icon--md { font-size: 20px; }
.icon--lg { font-size: 24px; }
.icon--xl { font-size: 32px; }

/* Cores contextuais */
.icon--primary { color: var(--ocean-deep); }
.icon--secondary { color: var(--driftwood); }
.icon--accent { color: var(--sunset-gold); }
.icon--success { color: var(--success); }
.icon--error { color: var(--error); }
```

---

# 📸 FOTOGRAFIA E IMAGENS

## Diretrizes de Fotografia

### Estilo Visual
```
• Luz: Golden hour preferencial (manhã ou fim de tarde)
• Tom: Quente, acolhedor, aspiracional
• Composição: Paisagens amplas, pessoas em contexto
• Edição: Levemente saturado, contraste médio
• Evitar: Fotos de banco genéricas, superexposição
```

### Tipos de Fotos Necessárias

#### Hero Images (1920x1080)
```
• Vista aérea de lancha navegando na Baía de Guanabara
• Lancha com Pão de Açúcar ao fundo (golden hour)
• Grupo de pessoas celebrando na lancha
• Vista do pôr do sol de dentro da lancha
```

#### Fotos de Lanchas (800x500)
```
• Cada lancha: Vista lateral externa
• Cada lancha: Vista do deck principal
• Cada lancha: Área de estar
• Cada lancha: Detalhe do acabamento
• Pessoas usando a lancha (contexto)
```

#### Fotos de Roteiros (1200x600)
```
• Mureta da Urca: Pessoas na água com Urca ao fundo
• Praia Vermelha: Vista da praia do mar
• Copacabana: Orla vista da lancha
• Ilhas Cagarras: Águas cristalinas
• Itaipu: Praia deserta
```

#### Fotos de Serviços (600x400)
```
• Churrasqueiro preparando churrasco na lancha
• Barman fazendo drinks
• Mesa de queijos e vinhos montada
• Decoração de aniversário
• Decoração de despedida de solteira
```

#### Fotos de Ocasiões (800x500)
```
• Aniversário: Grupo soprando velinhas
• Despedida: Noiva com amigas
• Corporativo: Equipe brindando
• Casamento: Casal romântico
• Família: Pais com filhos no mar
```

### Tratamento de Imagens

```css
/* Overlay padrão para imagens com texto */
.image-overlay {
  background: linear-gradient(
    180deg,
    rgba(30, 58, 95, 0) 0%,
    rgba(30, 58, 95, 0.7) 100%
  );
}

/* Filtro de cor para consistência */
.image-filter {
  filter: saturate(1.1) contrast(1.05);
}
```

### Proporções de Imagem

| Uso | Proporção | Dimensões |
|-----|-----------|-----------|
| Hero | 16:9 | 1920x1080 |
| Card de lancha | 16:10 | 800x500 |
| Galeria thumb | 1:1 | 400x400 |
| Banner de seção | 21:9 | 1400x600 |
| Depoimento avatar | 1:1 | 80x80 |

---

# ✨ ANIMAÇÕES E MICRO-INTERAÇÕES

## Princípios de Animação

```
• Duração: 200ms-400ms para micro-interações
• Timing: ease-out para entradas, ease-in para saídas
• Propósito: Cada animação deve comunicar algo
• Performance: Animar apenas transform e opacity
```

## Variáveis de Transição

```css
:root {
  /* Durações */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  --duration-slower: 600ms;
  
  /* Easings */
  --ease-out: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-in-out: cubic-bezier(0.645, 0.045, 0.355, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* Transições padrão */
  --transition-fast: all var(--duration-fast) var(--ease-out);
  --transition-normal: all var(--duration-normal) var(--ease-out);
  --transition-slow: all var(--duration-slow) var(--ease-out);
}
```

## Animações de Entrada (Scroll)

### Fade Up
```css
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fadeUp var(--duration-slow) var(--ease-out) forwards;
}

/* Stagger para múltiplos elementos */
.animate-fade-up:nth-child(1) { animation-delay: 0ms; }
.animate-fade-up:nth-child(2) { animation-delay: 100ms; }
.animate-fade-up:nth-child(3) { animation-delay: 200ms; }
.animate-fade-up:nth-child(4) { animation-delay: 300ms; }
```

### Scale In
```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scaleIn var(--duration-normal) var(--ease-bounce) forwards;
}
```

## Micro-interações

### Hover em Cards
```css
.card {
  transition: var(--transition-normal);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(30, 58, 95, 0.12);
}

.card:hover .card__image img {
  transform: scale(1.05);
  transition: transform var(--duration-slow) var(--ease-out);
}
```

### Hover em Botões
```css
.btn-primary {
  transition: var(--transition-normal);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212, 168, 83, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
  transition-duration: var(--duration-fast);
}
```

### Link com Arrow
```css
.link-arrow::after {
  content: '→';
  display: inline-block;
  margin-left: 8px;
  transition: transform var(--duration-fast) var(--ease-out);
}

.link-arrow:hover::after {
  transform: translateX(4px);
}
```

### Input Focus
```css
.form-input {
  transition: border-color var(--duration-fast), 
              box-shadow var(--duration-fast);
}

.form-input:focus {
  border-color: var(--wave-blue);
  box-shadow: 0 0 0 4px rgba(74, 144, 184, 0.1);
}
```

## Animações de Loading

### Skeleton Loading
```css
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--pearl-gray) 25%,
    #E5E7EB 50%,
    var(--pearl-gray) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}
```

### Spinner
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid var(--pearl-gray);
  border-top-color: var(--wave-blue);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
```

## Animações de Page Load

### Hero Entrance
```css
/* Sequência de entrada do Hero */
.hero__title {
  animation: fadeUp 0.8s var(--ease-out) 0.2s forwards;
  opacity: 0;
}

.hero__subtitle {
  animation: fadeUp 0.8s var(--ease-out) 0.4s forwards;
  opacity: 0;
}

.hero__cta {
  animation: fadeUp 0.8s var(--ease-out) 0.6s forwards;
  opacity: 0;
}
```

---

# 📱 RESPONSIVIDADE

## Breakpoints

```css
:root {
  --breakpoint-sm: 640px;   /* Mobile landscape */
  --breakpoint-md: 768px;   /* Tablet portrait */
  --breakpoint-lg: 1024px;  /* Tablet landscape / Desktop pequeno */
  --breakpoint-xl: 1280px;  /* Desktop */
  --breakpoint-2xl: 1536px; /* Desktop grande */
}

/* Media Queries */
@media (max-width: 1536px) { /* 2xl down */ }
@media (max-width: 1280px) { /* xl down */ }
@media (max-width: 1024px) { /* lg down - Tablet */ }
@media (max-width: 768px)  { /* md down - Mobile */ }
@media (max-width: 640px)  { /* sm down - Mobile small */ }
```

## Adaptações por Breakpoint

### Desktop (1280px+)
```
• Container: 1280px max-width
• Grid: 3-4 colunas
• Sidebar visível
• Menu horizontal completo
• Cards grandes
```

### Tablet (768px - 1024px)
```
• Container: Full width - 48px padding
• Grid: 2 colunas
• Menu: Hamburger menu
• Cards: 2 por linha
• Tipografia: Escala reduzida 10%
```

### Mobile (até 768px)
```
• Container: Full width - 32px padding
• Grid: 1 coluna
• Menu: Hamburger menu
• Cards: Stack vertical
• Tipografia: Escala mobile
• Botões: Full width
• Touch targets: Mínimo 44px
```

## Componentes Responsivos

### Header Mobile
```css
@media (max-width: 1024px) {
  .header__nav {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    flex-direction: column;
    padding: 24px;
    transform: translateX(100%);
    transition: transform var(--duration-normal);
  }
  
  .header__nav--open {
    transform: translateX(0);
  }
  
  .header__nav-link {
    font-size: 18px;
    padding: 16px 0;
    border-bottom: 1px solid #E5E7EB;
  }
  
  .header__mobile-toggle {
    display: flex;
  }
}
```

### Cards Responsivos
```css
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 1024px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .cards-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .card-boat__content {
    padding: 20px;
  }
}
```

### Botões Mobile
```css
@media (max-width: 640px) {
  .btn-primary,
  .btn-secondary {
    width: 100%;
    padding: 16px 24px;
    justify-content: center;
  }
  
  .btn-group {
    flex-direction: column;
    gap: 12px;
  }
}
```

### Formulários Mobile
```css
@media (max-width: 640px) {
  .form-row {
    flex-direction: column;
  }
  
  .form-input {
    padding: 16px;
    font-size: 16px; /* Evita zoom no iOS */
  }
}
```

---

# ♿ ACESSIBILIDADE

## Diretrizes WCAG 2.1 AA

### Contraste de Cores

| Elemento | Foreground | Background | Ratio | ✓/✗ |
|----------|------------|------------|-------|-----|
| Texto principal | #374151 | #FAFAF8 | 10.4:1 | ✓ |
| Texto secundário | #6B7280 | #FAFAF8 | 5.7:1 | ✓ |
| Links | #4A90B8 | #FAFAF8 | 4.5:1 | ✓ |
| CTA | #1E3A5F | #D4A853 | 5.2:1 | ✓ |
| Footer texto | #FFFFFF | #1E3A5F | 9.8:1 | ✓ |

### Focus States

```css
/* Focus visível para navegação por teclado */
:focus-visible {
  outline: 3px solid var(--wave-blue);
  outline-offset: 2px;
}

/* Remove outline padrão apenas quando não há :focus-visible */
:focus:not(:focus-visible) {
  outline: none;
}

/* Focus em links */
a:focus-visible {
  outline: 3px solid var(--wave-blue);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Focus em botões */
.btn:focus-visible {
  outline: 3px solid var(--wave-blue);
  outline-offset: 2px;
}

/* Focus em inputs */
.form-input:focus {
  outline: none;
  border-color: var(--wave-blue);
  box-shadow: 0 0 0 4px rgba(74, 144, 184, 0.2);
}
```

### Skip Links

```html
<a href="#main-content" class="skip-link">
  Pular para o conteúdo principal
</a>
```

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  padding: 8px 16px;
  background: var(--ocean-deep);
  color: white;
  z-index: 9999;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 0;
}
```

### ARIA Labels

```html
<!-- Navegação -->
<nav aria-label="Menu principal">
  ...
</nav>

<!-- Botões com ícones -->
<button aria-label="Abrir menu" class="header__mobile-toggle">
  <span class="icon">☰</span>
</button>

<!-- Links que abrem nova janela -->
<a href="..." target="_blank" rel="noopener" aria-label="Instagram (abre em nova janela)">
  Instagram
</a>

<!-- Formulários -->
<label for="email">E-mail</label>
<input id="email" type="email" aria-required="true" aria-describedby="email-error">
<span id="email-error" role="alert">Por favor, insira um e-mail válido</span>

<!-- Cards de lancha -->
<article aria-label="WeBoat 390 - Lancha para até 16 pessoas">
  ...
</article>

<!-- Preços -->
<span aria-label="A partir de 2.300 reais">R$ 2.300</span>
```

### Semântica HTML

```html
<!-- Estrutura correta -->
<header role="banner">...</header>
<nav role="navigation">...</nav>
<main role="main" id="main-content">
  <section aria-labelledby="section-title">
    <h2 id="section-title">Nossas Lanchas</h2>
    ...
  </section>
</main>
<footer role="contentinfo">...</footer>

<!-- Landmarks -->
<div role="search">...</div>
<div role="complementary">...</div>
```

### Touch Targets

```css
/* Mínimo de 44x44px para elementos interativos */
.btn {
  min-height: 44px;
  min-width: 44px;
}

.header__nav-link {
  padding: 12px 16px;
  min-height: 44px;
}

.form-input {
  min-height: 48px;
}

/* Espaçamento entre targets tocáveis */
.btn + .btn {
  margin-left: 12px;
}

@media (max-width: 768px) {
  .btn + .btn {
    margin-left: 0;
    margin-top: 12px;
  }
}
```

### Motion Preferences

```css
/* Respeita preferência do usuário por menos movimento */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .whatsapp-float {
    animation: none;
  }
}
```

---

# 🎯 EXEMPLOS DE APLICAÇÃO

## Exemplo 1: Hero Section Home

```html
<section class="hero">
  <div class="hero__background">
    <video autoplay muted loop playsinline>
      <source src="hero-video.mp4" type="video/mp4">
    </video>
    <div class="hero__overlay"></div>
  </div>
  
  <div class="container hero__content">
    <h1 class="hero__title animate-fade-up">
      Aluguel de Lancha no Rio de Janeiro
    </h1>
    
    <p class="hero__subtitle animate-fade-up">
      Passeio privativo de lancha com as melhores vistas do mundo. 
      Do Pão de Açúcar às Ilhas Cagarras.
    </p>
    
    <div class="hero__cta animate-fade-up">
      <a href="#" class="btn btn-primary btn-lg">
        Alugar Lancha Agora
      </a>
      <a href="#" class="btn btn-whatsapp btn-lg">
        <i class="ph ph-whatsapp-logo"></i>
        Falar no WhatsApp
      </a>
    </div>
  </div>
</section>
```

```css
.hero {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero__background {
  position: absolute;
  inset: 0;
}

.hero__background video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(30, 58, 95, 0.3) 0%,
    rgba(30, 58, 95, 0.6) 100%
  );
}

.hero__content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  max-width: 800px;
  margin: 0 auto;
}

.hero__title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 56px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 24px;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.hero__subtitle {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 40px;
  opacity: 0.95;
}

.hero__cta {
  display: flex;
  gap: 16px;
  justify-content: center;
}

@media (max-width: 768px) {
  .hero {
    min-height: 80vh;
  }
  
  .hero__title {
    font-size: 36px;
  }
  
  .hero__subtitle {
    font-size: 17px;
  }
  
  .hero__cta {
    flex-direction: column;
  }
}
```

## Exemplo 2: Card de Lancha

```html
<article class="card-boat" aria-label="WeBoat 390">
  <div class="card-boat__image">
    <img src="weboat-390.jpg" alt="WeBoat 390 navegando na Baía de Guanabara" loading="lazy">
    <span class="card-boat__badge">
      🏷️ Lancha Própria
    </span>
  </div>
  
  <div class="card-boat__content">
    <h3 class="card-boat__title">WeBoat 390</h3>
    
    <p class="card-boat__capacity">
      <i class="ph ph-users"></i>
      Até 16 pessoas
    </p>
    
    <ul class="card-boat__features">
      <li class="card-boat__feature">
        <i class="ph ph-check-circle card-boat__feature-icon"></i>
        Combustível
      </li>
      <li class="card-boat__feature">
        <i class="ph ph-check-circle card-boat__feature-icon"></i>
        Tripulação
      </li>
      <li class="card-boat__feature">
        <i class="ph ph-check-circle card-boat__feature-icon"></i>
        Som Bluetooth
      </li>
      <li class="card-boat__feature">
        <i class="ph ph-check-circle card-boat__feature-icon"></i>
        Coolers e gelo
      </li>
    </ul>
  </div>
  
  <div class="card-boat__footer">
    <div class="card-boat__price-block">
      <span class="card-boat__price-label">A partir de</span>
      <span class="card-boat__price" aria-label="2.600 reais">
        R$ 2.600<span class="card-boat__price-note">*</span>
      </span>
    </div>
    <a href="/lanchas/weboat-390" class="btn btn-secondary btn-sm">
      Ver Detalhes
    </a>
  </div>
</article>
```

## Exemplo 3: Seção de Números

```html
<section class="social-proof">
  <div class="container">
    <div class="social-proof__grid">
      <div class="social-proof__item animate-fade-up">
        <span class="social-proof__number">+1.000</span>
        <span class="social-proof__label">passeios realizados</span>
      </div>
      
      <div class="social-proof__item animate-fade-up">
        <span class="social-proof__number">5</span>
        <span class="social-proof__label">lanchas próprias</span>
      </div>
      
      <div class="social-proof__item animate-fade-up">
        <span class="social-proof__number">+900</span>
        <span class="social-proof__label">avaliações 5★</span>
      </div>
      
      <div class="social-proof__item animate-fade-up">
        <span class="social-proof__number">+18k</span>
        <span class="social-proof__label">seguidores</span>
      </div>
    </div>
  </div>
</section>
```

```css
.social-proof {
  background: var(--ocean-deep);
  padding: 64px 0;
}

.social-proof__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  text-align: center;
}

.social-proof__number {
  display: block;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 48px;
  font-weight: 700;
  color: var(--sunset-gold);
  line-height: 1;
  margin-bottom: 12px;
}

.social-proof__label {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
}

@media (max-width: 768px) {
  .social-proof__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px 24px;
  }
  
  .social-proof__number {
    font-size: 36px;
  }
}
```

---

# 📋 CHECKLIST DE IMPLEMENTAÇÃO

## Design System
- [ ] Variáveis CSS de cores configuradas
- [ ] Variáveis CSS de tipografia configuradas
- [ ] Variáveis CSS de espaçamentos configuradas
- [ ] Fontes Google Fonts importadas
- [ ] Biblioteca de ícones Phosphor incluída

## Componentes Base
- [ ] Botões (primary, secondary, ghost, whatsapp)
- [ ] Cards (lancha, roteiro, serviço)
- [ ] Badges (própria, popular, promo)
- [ ] Formulários (inputs, selects, labels)
- [ ] Header (desktop e mobile)
- [ ] Footer
- [ ] WhatsApp floating button

## Páginas
- [ ] Home
- [ ] Frota (listagem de lanchas)
- [ ] Detalhe de lancha
- [ ] Roteiros
- [ ] Serviços
- [ ] Despedida de Solteira
- [ ] Aniversário
- [ ] Corporativo
- [ ] Sobre
- [ ] FAQ
- [ ] Contato

## Responsividade
- [ ] Desktop (1280px+)
- [ ] Tablet (768px - 1024px)
- [ ] Mobile (até 768px)

## Acessibilidade
- [ ] Contraste de cores validado
- [ ] Focus states implementados
- [ ] Skip links
- [ ] ARIA labels
- [ ] Touch targets mínimos

## Performance
- [ ] Imagens otimizadas
- [ ] Lazy loading de imagens
- [ ] Fontes com display: swap
- [ ] CSS crítico inline

---

**FIM DO DOCUMENTO DE UI DESIGN SYSTEM**

*WeBoat Brasil - Aluguel de Lancha no Rio de Janeiro*
