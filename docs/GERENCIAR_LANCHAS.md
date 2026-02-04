# Guia de Gerenciamento de Lanchas - WeBoat Brasil

> Este documento descreve como adicionar, modificar e remover lanchas do site.

---

## 📁 Estrutura de Arquivos

```
weboat-site/
├── pages/
│   └── lanchas/
│       ├── index.html           ← Listagem de todas as lanchas
│       ├── weboat-32.html       ← Páginas de lanchas próprias
│       ├── weboat-390.html
│       ├── weboat-oceanic-36.html
│       ├── weboat-rio-star-50.html
│       └── parceiras/           ← Lanchas parceiras
│           ├── malaga-32.html
│           ├── magna-28.html
│           └── ... (outras parceiras)
├── assets/images/lanchas/
│   ├── weboat-32.jpg            ← Imagens das próprias
│   └── parceiras/               ← Imagens das parceiras
└── css/pages/
    ├── frota.css                ← Estilos da listagem
    └── lancha-detalhe.css       ← Estilos das páginas individuais
```

---

## ➕ ADICIONAR NOVA LANCHA

### Passo 1: Definir os Dados

Antes de começar, tenha em mãos:
- Nome da lancha
- Capacidade (base e máxima se variável)
- Se é própria ou parceira
- Categoria: `padrao`, `grande`, `evento`, `luxo`
- Preços por roteiro (Roteiro 1 a 5)
- Taxa de churrasqueira
- Valor da hora extra
- Taxa por pessoa extra (se houver)
- Turnos disponíveis
- Se tem ar-condicionado/gerador
- Imagens (mínimo 4)

### Passo 2: Criar a Página Individual

1. **Copie um template existente:**
   - Para lancha própria: copie `weboat-32.html`
   - Para lancha parceira: copie uma similar da pasta `parceiras/`

2. **Renomeie o arquivo** seguindo o padrão:
   - Lowercase com hífens: `nome-da-lancha.html`
   - Exemplo: `weboat-new-40.html`

3. **Atualize o conteúdo:**

```html
<!-- Meta tags SEO -->
<title>NOME DA LANCHA - Lancha para X Pessoas | WeBoat Brasil</title>
<meta name="description" content="Alugue a NOME, lancha para até X pessoas...">
<link rel="canonical" href="https://www.weboatbrasil.com.br/pages/lanchas/ARQUIVO.html">

<!-- Open Graph -->
<meta property="og:title" content="NOME - Lancha para X Pessoas | WeBoat Brasil">
<meta property="og:url" content="https://www.weboatbrasil.com.br/pages/lanchas/ARQUIVO.html">
<meta property="og:image" content="https://www.weboatbrasil.com.br/assets/images/lanchas/IMAGEM.jpg">

<!-- Schema Product -->
"name": "NOME - Lancha para Aluguel",
"description": "Descrição da lancha...",
"price": "PRECO_MINIMO",

<!-- Breadcrumb -->
<li class="breadcrumb__item breadcrumb__item--active">NOME DA LANCHA</li>

<!-- Conteúdo -->
<h1 class="lancha-info__title">NOME DA LANCHA</h1>
<div class="lancha-info__capacity">Até X pessoas</div>

<!-- Tabela de Preços -->
<div class="lancha-prices__row">
  <span class="lancha-prices__label">Roteiro 1 - Mureta da Urca (3h)</span>
  <span class="lancha-prices__value">R$ X.XXX</span>
</div>
<!-- Repetir para cada roteiro disponível -->

<!-- Adicionais -->
<div class="lancha-prices__row">
  <span class="lancha-prices__label">Hora Extra</span>
  <span class="lancha-prices__value">R$ X.XXX</span>
</div>
<div class="lancha-prices__row">
  <span class="lancha-prices__label">Churrasqueira</span>
  <span class="lancha-prices__value">R$ XXX</span>
</div>
```

4. **Configure a churrasqueira:**

Para lanchas **padrão** (maioria):
```html
<p class="lancha-prices__churrasqueira-info">
  Inclui: Tripulação na churrasqueira, Gelo escama (2 sacos 20kg), Gelo filtrado (1 saco 10kg), Carvão
</p>
```

Para lanchas **maiores** (Sagarana, Gourmet 53, Malik):
```html
<p class="lancha-prices__churrasqueira-info">
  Inclui: Tripulação na churrasqueira, Gelo escama (4 sacos 20kg), Gelo filtrado (2 sacos 10kg), Carvão
</p>
```

Para **Catamarã Oceano**:
```html
<p class="lancha-prices__churrasqueira-info">
  Inclui: Churrasqueira a gás, Churrasqueiro, Ajudante
  <br><strong>⚠️ GELO NÃO INCLUSO - contratar separadamente</strong>
</p>
```

### Passo 3: Adicionar na Listagem

Edite `pages/lanchas/index.html`:

1. **Encontre a seção correta:**
   - Lancha própria: após os cards de lanchas próprias
   - Lancha parceira: na categoria apropriada (padrão, grande, evento, luxo)

2. **Adicione o card:**

```html
<article class="card-boat card-boat--parceira" data-categoria="CATEGORIA">
  <div class="card-boat__image">
    <img src="/assets/images/lanchas/parceiras/ARQUIVO.jpg" alt="NOME - Lancha para X pessoas" loading="lazy">
    <span class="card-boat__badge card-boat__badge--TIPO">BADGE</span>
  </div>
  <div class="card-boat__content">
    <h3 class="card-boat__title">NOME</h3>
    <p class="card-boat__capacity">
      <i class="ph ph-users"></i>
      Até X pessoas
    </p>
    <div class="card-boat__features">
      <span class="card-boat__feature"><i class="ph ph-check-circle card-boat__feature-icon"></i>Combustível incluso</span>
      <span class="card-boat__feature"><i class="ph ph-check-circle card-boat__feature-icon"></i>DESTAQUE</span>
    </div>
  </div>
  <div class="card-boat__footer">
    <div class="card-boat__price-block">
      <span class="card-boat__price-label">A partir de</span>
      <span class="card-boat__price">R$ X.XXX</span>
    </div>
    <a href="/pages/lanchas/parceiras/ARQUIVO.html" class="btn btn-secondary btn-sm">Ver Detalhes</a>
  </div>
</article>
```

**Valores para `data-categoria`:**
- `padrao` - Até 18 pessoas
- `grande` - 18-25 pessoas
- `evento` - 30+ pessoas
- `luxo` - Iates de luxo (6h)

### Passo 4: Adicionar Imagens

1. Prepare as imagens:
   - Formato: JPG ou WebP
   - Tamanho recomendado: 1200x800px
   - Peso máximo: 500KB cada

2. Coloque na pasta correta:
   - Próprias: `/assets/images/lanchas/`
   - Parceiras: `/assets/images/lanchas/parceiras/`

3. Nomeie seguindo o padrão:
   - `nome-lancha.jpg` (principal)
   - `nome-lancha-2.jpg`, `nome-lancha-3.jpg`, etc.

### Passo 5: Atualizar Schema.org

No `pages/lanchas/index.html`, adicione ao Schema CollectionPage:
```json
{"@type": "ListItem", "position": XX, "url": "https://www.weboatbrasil.com.br/pages/lanchas/parceiras/ARQUIVO.html", "name": "NOME"}
```

### Passo 6: Atualizar Sitemap

Edite `sitemap.xml`:
```xml
<url>
  <loc>https://www.weboatbrasil.com.br/pages/lanchas/parceiras/ARQUIVO.html</loc>
  <lastmod>2026-02-03</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

---

## ✏️ MODIFICAR LANCHA EXISTENTE

### Atualizar Preços

1. Edite a página individual da lancha
2. Atualize a tabela de preços:
```html
<span class="lancha-prices__value">R$ NOVO_VALOR</span>
```

3. Atualize o card na listagem (`pages/lanchas/index.html`):
```html
<span class="card-boat__price">R$ NOVO_VALOR</span>
```

4. Se for lancha própria, atualize também na home (`index.html`)

### Atualizar Capacidade

1. Página individual: `<div class="lancha-info__capacity">`
2. Listagem: `<p class="card-boat__capacity">`
3. Schema.org: descrição do Product

### Atualizar Imagens

1. Substitua as imagens na pasta `/assets/images/lanchas/`
2. Mantenha os mesmos nomes de arquivo
3. Ou atualize os caminhos no HTML

---

## ➖ REMOVER LANCHA

### Passo 1: Remover da Listagem

1. Edite `pages/lanchas/index.html`
2. Delete o `<article class="card-boat">` correspondente

### Passo 2: Remover da Home (se aplicável)

Se a lancha aparece na home (`index.html`), remova o card.

### Passo 3: Atualizar Schema.org

1. Remova do Schema CollectionPage em `pages/lanchas/index.html`
2. Atualize o `numberOfItems`

### Passo 4: Atualizar Sitemap

Remova a URL do `sitemap.xml`

### Passo 5: Manter ou Deletar a Página

**Opção A - Redirecionar (recomendado):**
Mantenha a página mas adicione um redirecionamento:
```html
<meta http-equiv="refresh" content="0;url=/pages/lanchas/">
```

**Opção B - Deletar:**
Delete o arquivo HTML da lancha.

### Passo 6: Remover Imagens

Delete as imagens da pasta `/assets/images/lanchas/`

---

## 📋 CHECKLIST DE VERIFICAÇÃO

### Ao adicionar lancha:
- [ ] Página individual criada e completa
- [ ] Card adicionado na listagem com `data-categoria` correto
- [ ] Imagens adicionadas (mínimo 4)
- [ ] Links WhatsApp com mensagem contextual
- [ ] Schema Product configurado
- [ ] Adicionado ao Schema CollectionPage
- [ ] Adicionado ao sitemap.xml
- [ ] Testado filtro por categoria
- [ ] Responsivo testado (mobile, tablet, desktop)

### Ao modificar lancha:
- [ ] Página individual atualizada
- [ ] Card na listagem atualizado
- [ ] Home atualizada (se aplicável)
- [ ] Schema.org atualizado
- [ ] Sitemap lastmod atualizado

### Ao remover lancha:
- [ ] Card removido da listagem
- [ ] Card removido da home (se aplicável)
- [ ] Schema CollectionPage atualizado
- [ ] Sitemap atualizado
- [ ] Página redirecionada ou deletada
- [ ] Imagens removidas

---

## 🔧 DICAS

### Nomenclatura de Roteiros
Sempre use o padrão completo:
- ✅ `Roteiro 1 - Mureta da Urca (3h)`
- ❌ `R1 - Mureta da Urca`
- ❌ `Roteiro 1 (3h)`

### Categorias de Churrasqueira
| Categoria | Lanchas | Taxa | O que inclui |
|-----------|---------|------|--------------|
| Padrão | Maioria | R$ 250 | Tripulação, 2 sacos gelo escama, 1 saco gelo filtrado, carvão |
| Maior | Sagarana, Gourmet 53, Malik | R$ 400 | Tripulação, 4 sacos gelo escama, 2 sacos gelo filtrado, carvão |
| Oceano | Catamarã Oceano | R$ 600 | Churrasqueira a gás, churrasqueiro, ajudante (GELO NÃO INCLUSO) |

### Turnos
- **Padrão:** Manhã 09h-14h / Tarde 14h30-19h30
- **Especiais:** Verificar por lancha (Sagarana, Gourmet, Malik, Oceano)
- **Flexível (6h):** Prestige 60, Schaefer 62, Intermarine 60

---

**Última atualização:** Fevereiro 2026
