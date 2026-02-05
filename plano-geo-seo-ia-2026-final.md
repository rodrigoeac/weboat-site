# Plano GEO/SEO para IA — Implementação com Claude Code (2026)

Plano prático em **ordem de impacto** para aumentar chances do seu site ser **descoberto, recortado ("snippable") e citado/recomendado** por chatbots e mecanismos de resposta (ChatGPT, Perplexity, Copilot, Claude, Gemini, Google AI Overviews).

> **Nota sobre prioridades:** A pesquisa da Ahrefs com 75.000 marcas (2025) mostrou que **brand mentions** (menções de marca na web) têm correlação de 0.664 com visibilidade em AI Overviews — **3x mais forte que backlinks** (0.218–0.287). Por isso, a seção de menções/reputação tem peso maior do que parece. Porém, como depende de ações externas ao código, as ações técnicas (que o Claude Code resolve) vêm primeiro neste plano.

---

## Visão geral: 15 ações em ordem de impacto

| # | Ação | Impacto | Esforço | Claude Code? |
|---|------|---------|---------|:---:|
| 1 | Robots.txt por bot | 🔴 Alto | Baixo | ✅ |
| 2 | IndexNow + Bing Webmaster Tools | 🔴 Alto | Baixo | ✅ |
| 3 | Answer Capsules nas páginas que convertem | 🔴 Altíssimo | Médio | Parcial |
| 4 | Estrutura snippable / sem conteúdo escondido | 🔴 Alto | Médio | ✅ |
| 5 | Entidade forte: /sobre, /equipe, /contato | 🔴 Alto | Baixo–Médio | Parcial |
| 6 | Schema focado em respostas | 🔴 Alto | Baixo | ✅ |
| 7 | Páginas "citáveis" (preços, áreas, políticas) | 🟡 Alto | Médio | Parcial |
| 8 | SSR / conteúdo renderável sem JS | 🟡 Alto | Depende | ✅ |
| 9 | Performance e Core Web Vitals | 🟡 Médio–Alto | Médio | ✅ |
| 10 | Log + validação de crawl | 🟡 Médio–Alto | Médio | ✅ |
| 11 | Internal linking por intenção de pergunta | 🟡 Médio | Baixo | ✅ |
| 12 | Brand mentions e reputação | 🔴 Altíssimo* | Contínuo | ❌ |
| 13 | Conteúdo comparativo e alternativas | 🟡 Médio | Médio | Parcial |
| 14 | Atualização com governança (freshness) | 🟡 Médio | Médio | ✅ |
| 15 | Medição e monitoramento | 🟡 Médio | Baixo | Parcial |

\* Brand mentions é o fator nº 1 para visibilidade em IA segundo dados Ahrefs/Muck Rack/Seer Interactive, mas depende de ações externas (PR, outreach, comunidades).

---

## Detalhamento das 15 ações

### 1) Robots.txt por bot (impacto alto, esforço baixo)

A OpenAI opera **3 crawlers distintos**:

| Bot | Função | Recomendação |
|-----|--------|:---:|
| `OAI-SearchBot` | Busca do ChatGPT Search | ✅ Permitir sempre |
| `GPTBot` | Treinamento de modelos | ⚠️ Decidir (bloquear não afeta busca) |
| `ChatGPT-User` | Navegação em tempo real por prompt do usuário | ✅ Permitir |

Também configurar: `ClaudeBot`, `Claude-SearchBot`, `PerplexityBot`, `Google-Extended`.

**Importante:** Mudanças no robots.txt levam ~24h para serem reconhecidas pela OpenAI.

---

### 2) IndexNow + Bing Webmaster Tools (alto, baixo)

**Por que Bing é crítico:** Microsoft detém ~49% da OpenAI. ChatGPT Search e Copilot dependem do índice Bing. Se o site não está bem indexado no Bing, a visibilidade em IA cai drasticamente.

- Implementar **IndexNow** (notificação instantânea a cada URL nova/atualizada)
- Submeter **sitemap XML** com valores `lastmod` precisos
- Acompanhar indexação via Bing Webmaster Tools

---

### 3) "Answer Capsules" nas páginas que convertem (altíssimo, médio)

Em cada página de serviço/produto/local:
- Criar **5–10 H2 em forma de pergunta** (perguntas reais de clientes)
- Abaixo de cada H2, escrever uma **resposta curta (40–80 palavras)** que faça sentido sozinha
- Depois detalhar com bullets/tabela
- Usar IDs âncora (`#preco`, `#prazo`, `#como-funciona`) para citação de fragmentos

> Parágrafos de abertura que respondem a query diretamente são citados **67% mais frequentemente** por IA. Isso é o que mais aumenta a chance de um chatbot "recortar" e citar seu site.

**Evitar:** Headers vagos ("Introdução", "Visão Geral", "Sobre"). IA não consegue entender a relevância.

---

### 4) Estrutura "snippable" e sem conteúdo escondido (alto, médio)

- Evitar informação crítica só em **abas/accordions/modais** que dependem de JS
- Usar listas, tabelas e trechos objetivos (preço, prazo, área atendida, critérios)
- Cada bloco de conteúdo deve funcionar como **unidade autossuficiente** fora de contexto
- Microsoft chama de "self-contained phrasing + snippability"

---

### 5) Entidade forte: /sobre, /equipe, /contato (alto, baixo/médio)

Criar/ajustar páginas:
- **/sobre** → declaração de entidade: o que é, onde atua, público, diferenciais verificáveis. Não é página para conteúdo genérico
- **/equipe** → autores/profissionais com credenciais, registros, experiência
- **/contato** → NAP consistente (nome/endereço/telefone) + mapas
- **Homepage** → comunicar claramente quem serve e o que faz em texto, não só via menu
- **Footer** → sinais de marca e serviço (LLMs capturam conteúdo do footer)

---

### 6) Schema focado em respostas (alto, baixo)

- **FAQPage** nas páginas de serviço/local
- **Organization / LocalBusiness** com `@id` consistente, `sameAs`, `knowsAbout`
- **Article** com `author` detalhado (Person schema + credenciais)
- **`dateModified`** em artigos (sinal de frescor legível por máquina)
- Schema **deve bater** com texto visível (inconsistência perde confiança)
- Microsoft identifica FAQPage e HowTo como schemas mais impactantes para GEO

---

### 7) Páginas "citáveis" (alto, médio)

Criar páginas dedicadas que chatbots adoram citar:
- **Preços / Planos / O que está incluído**
- **Áreas atendidas**
- **Políticas** (troca, reembolso, garantia, cancelamento, privacidade)
- **Como funciona** (processo passo a passo)

> Consolidar: em vez de 5 posts fragmentados sobre o mesmo tema, criar 1 guia abrangente. IA prefere fonte única e completa sobre um tópico.

---

### 8) Conteúdo técnico "renderável" (alto, depende do stack)

Análise Vercel+MERJ (500M+ requisições GPTBot): **zero execução de JavaScript**. Mesmo comportamento para ClaudeBot, PerplexityBot, Bytespider, ExternalAgent (Meta).

- Priorizar **SSR ou pré-renderização** para páginas principais
- Garantir HTML com conteúdo relevante sem depender de JS
- Corrigir canonical, paginação, noindex, duplicadas
- Alvo: LCP < 2.5s, TTFB < 800ms

---

### 9) Performance e estabilidade (médio/alto, médio)

- Core Web Vitals: **LCP** e **INP** são os mais críticos
- Evitar CLS alto (atrapalha leitura/extração)
- Crawlers de IA têm **timeouts curtos** — informação crítica em HTML puro, leve e rápido

---

### 10) Log + validação de crawl (médio/alto, médio)

- Monitorar acessos de `OAI-SearchBot`, `GPTBot`, `ChatGPT-User`, `ClaudeBot`, `PerplexityBot`, `Bingbot`
- Verificar via logs do servidor ou CDN
- Confirma se o site está sendo efetivamente "lido" pelos bots

---

### 11) Internal linking "por intenção de pergunta" (médio, baixo)

- Dentro de páginas, linkar para: "Quanto custa", "Como funciona", "Prazos", "FAQ", "Áreas atendidas"
- Usar âncoras descritivas (não "clique aqui" ou "saiba mais")
- Criar hubs temáticos conectando conteúdos relacionados

---

### 12) Brand mentions e reputação (altíssimo, contínuo)

**Este é o fator nº 1 para visibilidade em IA**, mas depende de ações externas:

- Menções em sites terceiros autoritativos (portais do setor, imprensa, diretórios)
- 95% das citações de IA vêm de fontes não-pagas (earned media)
- Marcas têm 6,5x mais chances de serem citadas via fontes terceiras que pelo próprio domínio
- Padronizar nome da marca (evitar variações)
- Presença em Reddit, fóruns, comunidades do setor
- PR digital: guest posts, podcasts, conferências
- Assets referenciáveis: pesquisas originais, benchmarks, ferramentas gratuitas
- Visibilidade da liderança da empresa online (LinkedIn, artigos assinados)

---

### 13) Conteúdo "comparativo" e "alternativas" (médio, médio)

Criar páginas do tipo:
- "X vs Y" (comparação honesta)
- "Melhor opção para [perfil]"
- "Alternativas a [solução]"

Chatbots usam muito isso para recomendação. Usar **dados verificáveis**, não linguagem vaga.

---

### 14) Atualização com governança / freshness (médio, médio)

- Mostrar **data de revisão** real e visível (com processo)
- Revisar páginas críticas a cada **60 dias** (conteúdo atualizado nos últimos 60 dias tem quase o dobro de chance de ser citado)
- Atualizar `dateModified` no schema quando de fato revisar
- Quando mudar preço/política, atualizar imediatamente + IndexNow ping

---

### 15) Medição e monitoramento (médio, baixo)

| Canal | Como medir |
|---|---|
| ChatGPT Search | GA4: `utm_source=chatgpt.com` |
| Google AI Overviews | Search Console: tipo "Web" inclui AI Overviews |
| Bing/Copilot | Bing Webmaster Tools |
| Manual | Perguntar sobre sua marca nas 4 IAs e documentar |

Métricas GEO: frequência de menção, citação com link, sentimento, share of voice vs. concorrentes, precisão da descrição.

---

# Templates prontos

## Template de H2 (perguntas que viram prompt)
- "Quanto custa ___?"
- "Quanto tempo leva ___?"
- "Vocês atendem em ___?"
- "O que está incluído em ___?"
- "Para quem ___ é indicado?"
- "Quais documentos/requisitos para ___?"
- "Qual a diferença entre ___ e ___?"
- "Como funciona o processo de ___ passo a passo?"
- "O que pode dar errado em ___ e como evitar?"
- "Garantia/Política de cancelamento de ___?"

## Formato de Answer Capsule (copiar e colar)

```html
<section id="quanto-custa">
  <h2>Quanto custa [serviço]?</h2>
  <p><strong>Resposta rápida:</strong> O [serviço] custa a partir de
  R$ X e varia conforme Y e Z. Inclui A e B.</p>
  <ul>
    <li>O que está incluído: ...</li>
    <li>O que pode alterar o preço: ...</li>
    <li>Formas de pagamento: ...</li>
  </ul>
</section>
```

---

# Guia de Implementação com Claude Code

## Pré-requisitos

Antes de começar, garanta:
1. Repositório git do site clonado localmente
2. Claude Code instalado (`npm install -g @anthropic-ai/claude-code`)
3. Acesso ao repositório com permissão de push
4. Identificar o stack do site (Next.js, WordPress, HTML estático, etc.)
5. Identificar as **5 páginas mais importantes** do site (maior tráfego / conversão)

## Convenção de commits

Todos os commits seguem o padrão:
```
geo(escopo): descrição curta

Contexto: por que essa mudança importa para GEO/IA
```

---

## Fase 1 — Fundação Técnica (commits 1.1–1.5)

> **Objetivo:** Garantir que crawlers de IA consigam acessar e ler o site.
> **Tempo estimado:** 1–2 dias de trabalho.

### Commit 1.1 — Robots.txt com regras por crawler de IA

```
geo(crawlers): configurar robots.txt com permissões granulares por bot de IA
```

**Prompt para Claude Code:**

```
Leia o arquivo robots.txt atual do projeto (ou crie se não existir).
Adicione regras específicas para crawlers de IA mantendo as regras
existentes para Googlebot e Bingbot intactas.

Adicionar estes blocos (nesta ordem, após as regras existentes):

# --- Crawlers de IA ---

# ChatGPT Search (aparecer nos resultados)
User-agent: OAI-SearchBot
Allow: /

# Treinamento OpenAI (bloquear se não quiser uso para treinar modelos)
User-agent: GPTBot
Disallow: /

# ChatGPT navegação em tempo real
User-agent: ChatGPT-User
Allow: /

# Claude (Anthropic)
User-agent: ClaudeBot
Allow: /
User-agent: Claude-SearchBot
Allow: /

# Perplexity
User-agent: PerplexityBot
Allow: /

# Google AI (Gemini, AI Overviews)
User-agent: Google-Extended
Allow: /

# Meta AI
User-agent: Meta-ExternalAgent
Allow: /

Não remover nem alterar nenhuma regra existente para Googlebot,
Bingbot ou outros crawlers tradicionais.
```

---

### Commit 1.2 — IndexNow: chave e endpoint

```
geo(indexnow): adicionar chave IndexNow e configurar notificação automática
```

**Prompt para Claude Code:**

```
Implementar IndexNow no projeto:

1. Gerar uma chave IndexNow (string hexadecimal de 32 caracteres).
   Criar o arquivo de verificação na raiz pública do site:
   - O arquivo deve se chamar {chave}.txt
   - O conteúdo do arquivo deve ser a própria chave

2. Criar um script/função utilitária que faça POST para a API
   do IndexNow sempre que uma URL for publicada ou atualizada.

   Endpoint: https://api.indexnow.org/IndexNow
   Payload:
   {
     "host": "DOMINIO_DO_SITE",
     "key": "CHAVE_GERADA",
     "urlList": ["https://DOMINIO_DO_SITE/url-atualizada"]
   }

3. Se o projeto usa Next.js: criar em /scripts/indexnow.ts
   Se usa outro framework: criar em /scripts/indexnow.js
   O script deve aceitar URLs como argumento CLI:
   node scripts/indexnow.js https://meusite.com/pagina-atualizada

4. Adicionar ao README uma seção explicando como usar.

Adaptar ao stack do projeto.
```

---

### Commit 1.3 — Sitemap: validar lastmod

```
geo(sitemap): garantir sitemap.xml com lastmod preciso em todas as URLs
```

**Prompt para Claude Code:**

```
Verificar o sitemap.xml do projeto:

1. Se o sitemap é gerado automaticamente (Next.js, WordPress, etc.):
   - Confirmar que todas as URLs incluem <lastmod> com data real
     de última modificação (não data de build/deploy)
   - Se não incluem, corrigir a geração para usar a data real
     do arquivo ou do conteúdo

2. Se o sitemap é estático:
   - Verificar se todos os <lastmod> estão corretos
   - Criar script para atualizar automaticamente

3. Garantir que o sitemap está referenciado no robots.txt:
   Sitemap: https://DOMINIO/sitemap.xml

Não alterar URLs existentes, apenas corrigir metadados.
```

---

### Commit 1.4 — Meta tags de controle de indexação por IA

```
geo(meta): adicionar meta tags para controle de indexação por crawlers de IA
```

**Prompt para Claude Code:**

```
No layout principal / template base do site (head global),
verificar se existe meta tag robots e garantir que NÃO está
bloqueando indexação inadvertidamente.

Para as páginas principais do site, confirmar que o <head> contém:
<meta name="robots" content="index, follow">

Se houver páginas que NÃO devem aparecer em IA (ex: páginas internas,
admin, staging), garantir que usam:
<meta name="robots" content="noindex, nofollow">

IMPORTANTE: Nunca combinar noindex com Disallow no robots.txt
para a mesma página (o crawler bloqueado não vê a meta tag).

Listar quais páginas têm noindex atualmente e se isso está correto.
```

---

### Commit 1.5 — SSR: verificar que conteúdo principal está em HTML

```
geo(ssr): auditar e corrigir conteúdo que depende de JS para renderizar
```

**Prompt para Claude Code:**

```
Auditar as 5-10 páginas mais importantes do site para verificar
se o conteúdo principal aparece no HTML inicial (sem JS).

Para cada página:
1. Simular o que um crawler vê: buscar o HTML bruto (sem executar JS)
   usando curl ou fetch simples
2. Verificar se os seguintes elementos estão presentes no HTML:
   - Título da página (h1)
   - Texto principal / descrição do serviço
   - Preços (se aplicável)
   - FAQ / perguntas frequentes
   - Informações de contato
3. Se algum conteúdo importante só aparece após JS:
   - Identificar o componente responsável
   - Propor solução (SSR, pré-renderização, ou mover para HTML estático)

Listar os problemas encontrados em ordem de gravidade.
Priorizar correções para as páginas de maior tráfego/conversão.

Se o projeto usa Next.js: verificar se as páginas usam
getServerSideProps ou generateStaticParams (App Router).
Se usa React puro (SPA): alertar que TODO conteúdo é invisível
para crawlers de IA e recomendar migração para SSR.
```

---

## Fase 2 — Schema e Dados Estruturados (commits 2.1–2.4)

> **Objetivo:** Dar contexto semântico que IA usa para entender e citar.
> **Tempo estimado:** 1–2 dias.

### Commit 2.1 — Organization / LocalBusiness schema

```
geo(schema): implementar Organization/LocalBusiness com @id e sameAs
```

**Prompt para Claude Code:**

```
Criar ou atualizar o schema JSON-LD de Organization (ou LocalBusiness
se o negócio tem endereço físico) no layout principal do site.

O schema deve incluir:
{
  "@context": "https://schema.org",
  "@type": "Organization",  // ou "LocalBusiness" / subtipo
  "@id": "https://DOMINIO/#organization",
  "name": "NOME DA EMPRESA",
  "description": "Descrição clara do que a empresa faz",
  "url": "https://DOMINIO",
  "logo": "https://DOMINIO/logo.png",
  "knowsAbout": ["tópico1", "tópico2", "tópico3"],
  "areaServed": {
    "@type": "City",
    "name": "CIDADE"
  },
  "sameAs": [
    "https://linkedin.com/company/EMPRESA",
    "https://instagram.com/EMPRESA",
    "https://facebook.com/EMPRESA",
    "https://www.google.com/maps/place/..."
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+55-XX-XXXX-XXXX",
    "contactType": "customer service"
  }
}

Inserir como <script type="application/ld+json"> no <head> do
layout global. O @id deve ser consistente e reutilizado em
outros schemas do site.

IMPORTANTE: os valores de "knowsAbout" devem refletir os tópicos
centrais do negócio (os que queremos que IA associe à marca).
Preencher com os dados reais do site.
```

---

### Commit 2.2 — FAQPage schema nas páginas de serviço

```
geo(schema): adicionar FAQPage schema às páginas de serviço com FAQ
```

**Prompt para Claude Code:**

```
Para cada página de serviço que tenha (ou vá ter) perguntas
frequentes, adicionar FAQPage schema em JSON-LD.

Modelo:
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Pergunta visível na página?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Resposta exatamente como aparece na página."
      }
    }
  ]
}

REGRAS CRÍTICAS:
1. O texto no schema DEVE ser idêntico ao texto visível na página
2. Cada Question.name deve corresponder a um H2 ou H3 real
3. Cada Answer.text deve corresponder ao parágrafo de resposta real
4. Se a página ainda não tem FAQ, criar um componente de FAQ
   reutilizável que gera tanto o HTML quanto o JSON-LD

Identificar as páginas de serviço do site e implementar.
Se já existirem perguntas na página, usar essas.
Se não existirem, apenas criar a estrutura do componente
(o conteúdo das perguntas será preenchido depois).
```

---

### Commit 2.3 — Article schema com author detalhado

```
geo(schema): implementar Article schema com Person author em posts/artigos
```

**Prompt para Claude Code:**

```
Para páginas de blog/artigos, implementar Article schema com author
detalhado:

{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "TÍTULO DO ARTIGO",
  "datePublished": "2026-01-15",
  "dateModified": "2026-02-01",
  "publisher": {
    "@id": "https://DOMINIO/#organization"
  },
  "author": {
    "@type": "Person",
    "@id": "https://DOMINIO/equipe/NOME#person",
    "name": "Nome Completo",
    "jobTitle": "Cargo/Especialidade",
    "description": "Bio curta com credenciais",
    "url": "https://DOMINIO/equipe/NOME",
    "sameAs": [
      "https://linkedin.com/in/NOME"
    ]
  }
}

- datePublished: data real de publicação
- dateModified: data real da última revisão substantiva
- publisher @id: usar o mesmo @id do Organization schema (commit 2.1)
- author @id: usar padrão consistente para a mesma pessoa em todo o site

Se o projeto usa CMS ou geração estática, criar lógica que
preencha esses valores automaticamente a partir dos metadados
do conteúdo.
```

---

### Commit 2.4 — Componente/helper para dateModified automático

```
geo(freshness): criar mecanismo para atualizar dateModified automaticamente
```

**Prompt para Claude Code:**

```
Criar um mecanismo que mantenha o dateModified dos schemas
atualizado quando o conteúdo for realmente editado:

Opção A (se usa git para conteúdo):
- Script que lê a data do último commit que alterou o arquivo
  de conteúdo e injeta como dateModified no schema

Opção B (se usa CMS/headless):
- Usar o campo updatedAt/modifiedAt do CMS

Opção C (conteúdo estático):
- Frontmatter ou constante no topo do arquivo com data de revisão
- O componente de schema lê essa data

Também:
- Garantir que a data de "Última atualização" está VISÍVEL
  na página para o usuário (não só no schema)
- Formato sugerido: "Última atualização: DD/MM/AAAA"

Adaptar ao stack do projeto.
```

---

## Fase 3 — Conteúdo Snippable (commits 3.1–3.4)

> **Objetivo:** Reestruturar conteúdo para maximizar citação por IA.
> **Tempo estimado:** 2–4 dias (depende da quantidade de páginas).

### Commit 3.1 — Componente Answer Capsule reutilizável

```
geo(content): criar componente Answer Capsule reutilizável
```

**Prompt para Claude Code:**

```
Criar um componente reutilizável de "Answer Capsule" que gere:

1. HTML semântico com:
   - <section> com id âncora (ex: id="quanto-custa")
   - <h2> com a pergunta
   - <p> com classe "answer-capsule" contendo resposta curta (40-80 palavras)
   - Slot/children para detalhamento (bullets, tabelas, etc.)

2. JSON-LD de FAQPage automaticamente a partir das props/dados

Exemplo de uso (adaptar à sintaxe do framework):

<AnswerCapsule
  id="quanto-custa"
  question="Quanto custa o serviço X?"
  answer="O serviço X custa a partir de R$ Y e varia conforme Z.
          Inclui A e B, com retorno em até N dias."
>
  <ul>
    <li>O que está incluído: ...</li>
    <li>Variações de preço: ...</li>
  </ul>
</AnswerCapsule>

CSS mínimo:
- .answer-capsule deve ter destaque visual sutil (fundo levemente
  diferente ou borda lateral) para o usuário identificar a resposta rápida
- Sem !important, sem estilos que quebrem o design existente

Adaptar ao framework do projeto (React/Next.js/HTML/WordPress/etc.)
```

---

### Commit 3.2 — Aplicar Answer Capsules nas 5 páginas principais

```
geo(content): reestruturar 5 páginas principais com Answer Capsules
```

**Prompt para Claude Code:**

```
Nas 5 páginas mais importantes do site (identificar por tráfego
ou prioridade de negócio), reestruturar o conteúdo usando o
componente Answer Capsule criado no commit anterior.

Para cada página:
1. Identificar as perguntas que o público-alvo faria sobre o tema
2. Reorganizar o conteúdo existente em formato pergunta→resposta
3. NÃO inventar informações — usar apenas dados já presentes no site
4. Garantir que cada resposta curta faz sentido sozinha (self-contained)
5. Adicionar IDs âncora em cada seção

Priorizar perguntas do tipo:
- "Quanto custa ___?"
- "O que está incluído em ___?"
- "Como funciona ___?"
- "Para quem é indicado ___?"
- "Qual a diferença entre ___ e ___?"

Se a página não tem informação suficiente para responder alguma
dessas perguntas, criar um TODO/placeholder e notificar.
```

---

### Commit 3.3 — Página /sobre como declaração de entidade

```
geo(content): reestruturar página sobre como declaração de entidade para IA
```

**Prompt para Claude Code:**

```
Reestruturar a página /sobre (ou equivalente) do site para funcionar
como uma declaração de entidade clara para IA.

A página deve conter, nesta ordem:
1. Parágrafo de abertura (2-3 frases): quem é, o que faz, onde atua
   - Deve responder: "Se alguém perguntar à IA sobre [marca],
     o que queremos que ela diga?"
2. Área de atuação e público
3. Diferenciais verificáveis (com dados, não adjetivos)
4. Credenciais, certificações, prêmios (se houver)
5. Equipe / profissionais principais (com credenciais)
6. Localização e áreas atendidas

Garantir que o Organization schema (@id do commit 2.1) está
presente nesta página.

NÃO usar linguagem genérica de marketing ("líder de mercado",
"soluções inovadoras"). Usar dados concretos e verificáveis.

Se a página atual tem conteúdo genérico, propor reescrita
mantendo os fatos existentes mas tornando-os mais específicos.
```

---

### Commit 3.4 — Footer com sinais de marca

```
geo(content): enriquecer footer com sinais de marca e serviço
```

**Prompt para Claude Code:**

```
Verificar o footer do site e garantir que contém sinais de marca
e serviço que LLMs capturam:

Deve incluir:
1. Nome completo da empresa
2. Descrição curta (1 frase do que faz)
3. Endereço completo (se negócio local)
4. Telefone e email
5. Lista dos principais serviços/produtos (com links)
6. Links para redes sociais
7. Áreas atendidas (se local)

Não precisa ser visualmente pesado — pode ser compacto,
mas o texto deve estar no HTML (não em imagens).

Manter o design existente, apenas adicionar informações faltantes.
```

---

## Fase 4 — Monitoramento e Otimização (commits 4.1–4.3)

> **Objetivo:** Saber se está funcionando e ajustar.
> **Tempo estimado:** 1 dia.

### Commit 4.1 — Middleware/log de crawlers de IA

```
geo(monitoring): adicionar detecção e log de crawlers de IA
```

**Prompt para Claude Code:**

```
Criar um mecanismo para detectar e logar acessos de crawlers de IA.

Se o projeto tem middleware (Next.js, Express, etc.):
- Detectar User-Agent contendo: OAI-SearchBot, GPTBot, ChatGPT-User,
  ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended,
  Bytespider, Meta-ExternalAgent
- Logar: timestamp, bot, URL acessada, status code
- Salvar em arquivo de log separado ou enviar para analytics

Se o projeto é estático (sem server):
- Criar documentação de como configurar no CDN/hosting (Cloudflare,
  Vercel, Netlify) para filtrar logs por User-Agent

Incluir script de análise que resuma:
- Quais bots visitaram
- Quais URLs foram mais acessadas por bots de IA
- Frequência de visitas
```

---

### Commit 4.2 — Script de auditoria GEO

```
geo(audit): criar script de auditoria automática de conformidade GEO
```

**Prompt para Claude Code:**

```
Criar um script CLI que audite as páginas do site para
conformidade com as práticas GEO. O script deve:

Para cada URL fornecida (ou do sitemap):
1. Buscar HTML bruto (sem JS) via fetch/curl
2. Verificar:
   - [ ] Conteúdo principal presente no HTML (não depende de JS)
   - [ ] Tem pelo menos um <h2> em formato de pergunta
   - [ ] Tem schema JSON-LD válido
   - [ ] Schema FAQPage presente (se tem FAQ)
   - [ ] dateModified presente no schema
   - [ ] Data de atualização visível na página
   - [ ] Meta robots não bloqueia indexação
   - [ ] IDs âncora nos blocos principais
   - [ ] Canonical correto
3. Gerar relatório com score e itens pendentes

Uso: node scripts/geo-audit.js https://meusite.com/pagina
Ou:  node scripts/geo-audit.js --sitemap https://meusite.com/sitemap.xml

Saída: tabela no terminal + arquivo JSON com resultados.
```

---

### Commit 4.3 — Configuração GA4 para tráfego de IA

```
geo(analytics): configurar tracking de tráfego vindo de IA no GA4
```

**Prompt para Claude Code:**

```
Documentar e (se possível) automatizar a configuração de
rastreamento de tráfego de IA no GA4:

1. Criar um arquivo DOCS/geo-analytics-setup.md com instruções:

   a) GA4 - Exploração personalizada:
      - Criar segmento com source contendo: chatgpt.com, perplexity.ai,
        bing.com/chat, copilot.microsoft.com, claude.ai, gemini.google.com
      - Métricas: sessões, engajamento, conversões

   b) UTM tracking:
      - ChatGPT já envia utm_source=chatgpt.com automaticamente
      - Verificar se GA4 está capturando corretamente

   c) Google Search Console:
      - AI Overviews aparece junto com tráfego tipo "Web"
      - Monitorar queries e CTR

   d) Bing Webmaster Tools:
      - Verificar indexação
      - AI Performance report (beta)

2. Se o projeto tem tag manager ou analytics wrapper, adicionar
   evento customizado quando detectar referrer de IA.
```

---

## Fase 5 — Páginas Citáveis e Conteúdo Comparativo (commits 5.1–5.3)

> **Objetivo:** Criar conteúdo que IA usa diretamente para recomendações.
> **Tempo estimado:** 2–3 dias (depende do conteúdo).

### Commit 5.1 — Template de página citável

```
geo(content): criar template para páginas citáveis (preços, áreas, políticas)
```

**Prompt para Claude Code:**

```
Criar template(s) reutilizável(is) para páginas que chatbots
costumam citar. O template deve incluir automaticamente:

1. Schema JSON-LD apropriado
2. Estrutura de Answer Capsules
3. Breadcrumb
4. Data de última atualização visível
5. IDs âncora em cada seção

Criar templates para:
- Página de preços/planos
- Página de "como funciona" (processo passo a passo)
- Página de áreas atendidas
- Página de política (termos, garantia, cancelamento)

Cada template deve ter placeholders claros para o conteúdo.
Adaptar ao framework do projeto.
```

---

### Commit 5.2 — Internal linking com âncoras descritivas

```
geo(links): implementar internal linking por intenção de pergunta
```

**Prompt para Claude Code:**

```
Revisar as páginas principais do site e melhorar internal linking:

1. Identificar oportunidades de link entre páginas onde
   uma responde a pergunta que outra levanta
2. Trocar âncoras genéricas ("clique aqui", "saiba mais")
   por descritivas ("veja nossos preços", "como funciona o processo")
3. Adicionar links contextuais dentro do conteúdo (não apenas em menus)
4. Se fizer sentido, criar seção "Perguntas relacionadas" no final
   de cada página, linkando para outras páginas do site

Não adicionar links em excesso — priorizar relevância.
Listar as mudanças feitas para revisão.
```

---

### Commit 5.3 — llms.txt (baixa prioridade, esforço mínimo)

```
geo(experimental): adicionar llms.txt como aposta de futuro
```

**Prompt para Claude Code:**

```
Criar arquivo llms.txt na raiz pública do site.
Formato Markdown com:

1. Nome do site/empresa
2. Descrição em 1-2 frases
3. Lista das páginas mais importantes com URL e descrição curta
4. Informações de contato

Exemplo:
# Nome da Empresa
> Descrição do que faz e para quem.

## Páginas principais
- [Serviço A](https://site.com/servico-a): Descrição curta
- [Preços](https://site.com/precos): Planos e valores
- [Como Funciona](https://site.com/como-funciona): Processo passo a passo
- [Sobre](https://site.com/sobre): Quem somos e credenciais
- [FAQ](https://site.com/faq): Perguntas frequentes
- [Contato](https://site.com/contato): Endereço, telefone, email

NOTA: Este é um arquivo experimental. Nenhum LLM major confirmou
uso em fevereiro/2026, mas o custo de implementação é ~0.
```

---

## Resumo dos commits por fase

### Fase 1 — Fundação Técnica
```
git log --oneline

1.5 geo(ssr): auditar e corrigir conteúdo que depende de JS
1.4 geo(meta): adicionar meta tags de controle de indexação
1.3 geo(sitemap): garantir sitemap.xml com lastmod preciso
1.2 geo(indexnow): adicionar chave IndexNow e notificação automática
1.1 geo(crawlers): configurar robots.txt com permissões por bot de IA
```

### Fase 2 — Schema e Dados Estruturados
```
2.4 geo(freshness): mecanismo para dateModified automático
2.3 geo(schema): Article schema com Person author em artigos
2.2 geo(schema): FAQPage schema nas páginas de serviço
2.1 geo(schema): Organization/LocalBusiness com @id e sameAs
```

### Fase 3 — Conteúdo Snippable
```
3.4 geo(content): enriquecer footer com sinais de marca
3.3 geo(content): reestruturar /sobre como declaração de entidade
3.2 geo(content): aplicar Answer Capsules nas 5 páginas principais
3.1 geo(content): criar componente Answer Capsule reutilizável
```

### Fase 4 — Monitoramento
```
4.3 geo(analytics): configurar tracking de tráfego de IA
4.2 geo(audit): script de auditoria automática GEO
4.1 geo(monitoring): detecção e log de crawlers de IA
```

### Fase 5 — Conteúdo Citável
```
5.3 geo(experimental): adicionar llms.txt
5.2 geo(links): internal linking por intenção de pergunta
5.1 geo(content): templates para páginas citáveis
```

---

## Checklist pós-implementação

Após completar todas as fases, validar:

- [ ] `curl -I https://DOMINIO/robots.txt` retorna as regras corretas
- [ ] Bing Webmaster Tools mostra site indexado e sem erros
- [ ] IndexNow responde 200 ao submeter URL de teste
- [ ] `curl -s https://DOMINIO/pagina | grep -i "pergunta"` mostra H2s em formato de pergunta no HTML bruto
- [ ] Schema validado no [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Script de auditoria GEO roda sem erros críticos
- [ ] Logs mostram visitas de OAI-SearchBot e/ou GPTBot
- [ ] GA4 captura sessões com source=chatgpt.com
- [ ] Teste manual: perguntar sobre sua marca no ChatGPT, Perplexity, Claude e Gemini

---

## Ações contínuas (fora do Claude Code)

Estas ações não são de código, mas são fundamentais:

1. **Brand mentions (prioridade máxima):** buscar menções em portais do setor, imprensa, diretórios, podcasts, guest posts. Menções são 3x mais impactantes que backlinks para visibilidade em IA.
2. **Atualizar conteúdo a cada 60 dias** — conteúdo fresco tem quase o dobro de chance de ser citado.
3. **Monitorar mensalmente** o que as IAs dizem sobre sua marca (teste manual com prompts de buyer-intent).
4. **Presença em comunidades** — Reddit, fóruns do setor, LinkedIn (IA lê e cita essas fontes).
5. **Publicar dados proprietários** — pesquisas, benchmarks, cases com métricas reais tornam você "citável".

---

*Documento compilado em 4 de fevereiro de 2026. Baseado em pesquisas: Ahrefs (75k marcas), Vercel+MERJ (500M+ requisições GPTBot), Microsoft Bing Blog, OpenAI Crawler Docs, Muck Rack AI Reading Report, roundtable Kevin Indig/Lily Ray/Steve Toth/Ross Hudgens (jan/2026), Search Engine Land, Seer Interactive, Superlines AI Search Statistics.*
