# 🛥️ DOCUMENTAÇÃO DO NOVO SITE - WEBOAT BRASIL

**Versão:** 1.0  
**Data:** Janeiro 2026  
**Projeto:** Redesign e Desenvolvimento do Site Institucional

---

# 📋 ÍNDICE

1. [Visão Geral do Projeto](#visão-geral-do-projeto)
2. [Estrutura de Páginas](#estrutura-de-páginas)
3. [Arquitetura da Informação](#arquitetura-da-informação)
4. [Conteúdo por Página](#conteúdo-por-página)
5. [Requisitos Funcionais](#requisitos-funcionais)
6. [Requisitos Técnicos](#requisitos-técnicos)

---

# 🎯 VISÃO GERAL DO PROJETO

## Sobre a Empresa

| Item | Informação |
|------|------------|
| **Nome** | WeBoat Brasil |
| **Segmento** | Aluguel de Lanchas e Passeios Náuticos |
| **Localização** | Marina da Glória, Rio de Janeiro - RJ |
| **Fundação** | 2022 |
| **Diferenciais** | Frota própria, loja própria, mecânico próprio, +900 avaliações 5 estrelas |

## Objetivos do Novo Site

1. **Melhorar a experiência do usuário** - Facilitar a navegação e busca de informações
2. **Aumentar conversões** - Otimizar o funil de vendas para mais reservas
3. **Fortalecer a marca** - Transmitir confiança e profissionalismo
4. **Automatizar atendimento** - Integração com WhatsApp e sistemas de reserva
5. **SEO** - Melhorar posicionamento em buscas como "aluguel de lancha Rio de Janeiro"

## Público-Alvo

| Perfil | Características |
|--------|----------------|
| **Turistas** | Visitantes querendo experiência única no Rio |
| **Grupos de amigos** | Celebrações, despedidas, encontros |
| **Empresas** | Eventos corporativos, confraternizações |
| **Famílias** | Passeios em família, aniversários |
| **Casais** | Ocasiões românticas, pedidos de casamento |

---

# 🗂️ ESTRUTURA DE PÁGINAS

## Mapa do Site (Sitemap)

```
📁 weboatbrasil.com.br
│
├── 🏠 HOME (index)
│
├── 🛥️ FROTA / BARCOS
│   ├── Listagem de todas as embarcações
│   └── [Página individual de cada lancha]
│       ├── WeBoat 32
│       ├── WeBoat 390
│       ├── WeBoat Oceanic 36
│       ├── WeBoat Rio Star 50
│       └── [Lanchas de parceiros]
│
├── 🗺️ ROTEIROS
│   ├── Visão geral dos roteiros
│   └── Detalhes de cada roteiro
│       ├── Roteiro 1 - Mureta da Urca
│       ├── Roteiro 2 - Praia Vermelha
│       ├── Roteiro 3 - Copacabana
│       ├── Roteiro 4 - Ilhas Cagarras
│       └── Roteiro 5 - Itaipu/Camboinhas
│
├── 🎉 SERVIÇOS OPCIONAIS
│   ├── Churrasco a bordo
│   ├── Open Bar
│   ├── Mesa de Queijos & Vinhos
│   ├── Decoração e Festas
│   └── Fotografia profissional
│
├── 🎊 EXPERIÊNCIAS / OCASIÕES
│   ├── Aniversários
│   ├── Despedida de Solteiro(a)
│   ├── Eventos Corporativos
│   ├── Réveillon em Copacabana
│   ├── Casamentos / Pedidos de Casamento
│   └── Passeios em Família
│
├── 📖 SOBRE NÓS
│   ├── Nossa História
│   ├── Diferenciais
│   ├── Equipe
│   └── Termos e Condições
│
├── ❓ FAQ / DÚVIDAS FREQUENTES
│
├── 📝 BLOG
│   └── [Artigos sobre passeios, dicas, Rio de Janeiro]
│
├── 📞 CONTATO
│   ├── Formulário de contato
│   ├── WhatsApp
│   ├── Localização (mapa)
│   └── Redes sociais
│
└── 📄 PÁGINAS AUXILIARES
    ├── Política de Privacidade
    ├── Termos de Uso
    └── Página de Agradecimento (pós-contato)
```

---

## Detalhamento das Páginas

### 1. HOME (Página Principal)

**URL:** `/` ou `/index`

**Objetivo:** Apresentar a WeBoat, gerar interesse e direcionar para conversão

**Seções:**

| Ordem | Seção | Conteúdo |
|-------|-------|----------|
| 1 | **Hero Banner** | Vídeo/imagem impactante + headline + CTA "Reserve Agora" |
| 2 | **Proposta de Valor** | "Passeios de lancha privativos no Rio de Janeiro" |
| 3 | **Lanchas em Destaque** | Cards com 5 lanchas principais (próprias) |
| 4 | **Roteiros** | Apresentação visual dos 5 roteiros |
| 5 | **Por que WeBoat?** | 3-4 diferenciais principais |
| 6 | **Serviços Extras** | Cards de churrasco, open bar, decoração |
| 7 | **Depoimentos** | Avaliações do Google e Instagram |
| 8 | **Famosos/Influencers** | Galeria de celebridades que usaram |
| 9 | **Instagram Feed** | Integração com @weboatbrasil |
| 10 | **FAQ Resumido** | 3-4 perguntas mais frequentes |
| 11 | **CTA Final** | Botão WhatsApp + formulário rápido |
| 12 | **Footer** | Contato, links, mapa |

---

### 2. FROTA / BARCOS

**URL:** `/barcos` ou `/frota`

**Objetivo:** Apresentar todas as opções de embarcações

**Funcionalidades:**

- **Filtros:** Capacidade (pessoas), Faixa de preço, Características (ar condicionado, gerador)
- **Ordenação:** Por preço, capacidade, popularidade
- **Destaque:** Badge "Própria WeBoat" nas lanchas próprias

**Cards de Lancha:**

```
┌─────────────────────────────────────────────┐
│ [FOTO PRINCIPAL]                            │
│                                             │
│ 🏷️ PRÓPRIA WEBOAT (se aplicável)           │
│                                             │
│ 🛥️ WeBoat 390                              │
│ 👥 Até 16 pessoas                           │
│ 💰 A partir de R$ 2.600                     │
│                                             │
│ ✅ Tapete flutuante                         │
│ ✅ Som Bluetooth                            │
│ ✅ Churrasqueira disponível                 │
│                                             │
│ [VER DETALHES]    [RESERVAR]               │
└─────────────────────────────────────────────┘
```

---

### 3. PÁGINA INDIVIDUAL DE LANCHA

**URL:** `/barcos/[nome-da-lancha]`

**Exemplo:** `/barcos/weboat-390`

**Conteúdo:**

| Seção | Detalhes |
|-------|----------|
| **Galeria** | 8-15 fotos de alta qualidade |
| **Informações Básicas** | Nome, capacidade, tipo |
| **Tabela de Preços** | Por roteiro (normal e promocional) |
| **O que inclui** | Lista de itens inclusos |
| **Especificações** | Tamanho, motor, equipamentos |
| **Opcionais disponíveis** | Churrasqueira, pessoa extra |
| **Avaliações** | Depoimentos específicos |
| **CTA** | Botão de reserva/WhatsApp |
| **Lanchas similares** | Sugestões de alternativas |

---

### 4. ROTEIROS

**URL:** `/roteiros`

**Objetivo:** Explicar os diferentes trajetos disponíveis

**Conteúdo por Roteiro:**

| Roteiro | Descrição | Destaque |
|---------|-----------|----------|
| **Roteiro 1** | Marina → Flamengo → Botafogo → Mureta da Urca | ⭐ Melhor custo-benefício |
| **Roteiro 2** | Roteiro 1 + Praia Vermelha | 🔥 Mais vendido |
| **Roteiro 3** | Roteiro 2 + Copacabana | Vista completa |
| **Roteiro 4** | Roteiro 3 + Ilhas Cagarras | Mar aberto, mergulho |
| **Roteiro 5** | Especial Niterói (Itaipu/Camboinhas) | Praias desertas |

**Elementos visuais:**

- Mapa interativo com trajetos
- Fotos de cada ponto
- Tempo estimado de navegação
- Pontos de parada para mergulho

---

### 5. SERVIÇOS OPCIONAIS

**URL:** `/servicos`

**Objetivo:** Apresentar todos os serviços extras disponíveis

**Categorias:**

#### 🔥 Churrasco a Bordo

| Opção | Preço | Descrição |
|-------|-------|-----------|
| Taxa Churrasqueira | R$ 250 | Cliente leva as carnes |
| Kit Churrasco Simples | A partir de R$ 100/pessoa | Carnes + bebidas básicas |
| Churrasco Completo | A partir de R$ 145/pessoa | Carnes premium + acompanhamentos |

#### 🍹 Open Bar

| Opção | Preço | Descrição |
|-------|-------|-----------|
| Open Bar Básico | A partir de R$ 135/pessoa | Drinks clássicos + cerveja Brahma |
| Open Bar Premium | A partir de R$ 160/pessoa | Drinks especiais + Heineken/Stella |

#### 🧀 Mesas Especiais

| Opção | Preço |
|-------|-------|
| Mesa de Queijos & Vinhos | A partir de R$ 115/pessoa |
| Mesa de Snacks Premium | A partir de R$ 120/pessoa |

#### 🎉 Festas e Decoração

| Opção | Preço |
|-------|-------|
| Kit Festa (até 36 pés) | R$ 1.850 |
| Kit Festa (38+ pés) | R$ 2.000 |
| Kit Despedida de Solteira | A partir de R$ 135/pessoa |
| DJ com Equipamento | R$ 1.500 |
| Fotógrafo | A partir de R$ 800 |

---

### 6. EXPERIÊNCIAS / OCASIÕES

**URL:** `/experiencias/[tipo]`

**Páginas específicas para cada ocasião:**

| Página | URL | Foco |
|--------|-----|------|
| Aniversários | `/experiencias/aniversario` | Decoração, bolo, celebração |
| Despedida de Solteiro(a) | `/experiencias/despedida-solteira` | Kit especial, diversão |
| Eventos Corporativos | `/experiencias/corporativo` | Confraternização, team building |
| Réveillon | `/experiencias/reveillon` | Queima de fogos em Copacabana |
| Casamentos | `/experiencias/casamento` | Cerimônias, pedidos |
| Família | `/experiencias/familia` | Segurança, conforto |

---

### 7. SOBRE NÓS

**URL:** `/sobre`

**Conteúdo:**

#### Nossa História

```
WeBoat Brasil nasceu em 2022, de uma experiência ruim.

Durante o Carnaval no Rio, os sócios alugaram uma lancha 
e tiveram um passeio decepcionante - atendimento ruim, 
lancha mal cuidada, total falta de estrutura.

Decidiram fazer diferente.

Hoje, menos de 4 anos depois, somos a maior empresa de 
aluguel de lanchas do Rio de Janeiro, com:

✅ 5 lanchas próprias
✅ +1.000 passeios realizados
✅ +900 avaliações 5 estrelas no Google
✅ +18.000 seguidores no Instagram
✅ Queridinha dos famosos
```

#### Nossos Valores

| Valor | Descrição |
|-------|-----------|
| **Sorriso em Primeiro Lugar** | A satisfação do cliente está acima do dinheiro |
| **Segurança** | Lanchas vistoriadas, equipe preparada |
| **Experiência** | Cada detalhe pensado para um dia inesquecível |
| **Inclusão** | WeBoat é para todos |

#### Diferenciais

- ✅ Frota própria (5 lanchas)
- ✅ Loja própria na Marina da Glória
- ✅ Mecânico próprio
- ✅ Equipe completa (9 funcionários fixos)
- ✅ Lanchas de parceiros vistoriadas
- ✅ +900 avaliações 5 estrelas

#### Celebridades que Escolheram a WeBoat

- Bella Campos (cliente frequente)
- Camila Queiroz
- Vanessa Lopes
- Jesus Luz
- Nah Cardoso
- E muitos outros...

---

### 8. FAQ / DÚVIDAS FREQUENTES

**URL:** `/faq` ou `/duvidas`

**Categorias de Perguntas:**

#### 📋 Sobre a Reserva

| Pergunta | Resposta |
|----------|----------|
| Como faço para reservar? | Entre em contato pelo WhatsApp ou formulário. Coletamos informações e montamos uma proposta personalizada. |
| Qual o valor do sinal? | 50% do valor total para garantir a data. Os outros 50% até o embarque. |
| Posso reservar para hoje/amanhã? | Sim! Reservamos até na hora, mediante disponibilidade. |
| Aceitam cartão de crédito? | Sim, com acréscimo de 3,5% (juros da operadora). |

#### 🛥️ Sobre o Passeio

| Pergunta | Resposta |
|----------|----------|
| Qual a duração do passeio? | 5 horas (manhã 09h-14h ou tarde 14:30-19:30). |
| O combustível está incluso? | Sim, para o roteiro escolhido. |
| Posso levar bebidas e comidas? | Sim, pode levar à vontade! |
| Tem cooler e gelo? | Todas as lanchas têm coolers. Gelo pode ser contratado à parte (R$ 25/saco). |

#### ☔ Imprevistos

| Pergunta | Resposta |
|----------|----------|
| E se chover no dia? | Remarcamos sem custo ou devolvemos o valor pago. |
| E se a lancha quebrar? | Oferecemos outra embarcação similar ou estorno imediato. |

#### 👨‍👩‍👧‍👦 Sobre Capacidade

| Pergunta | Resposta |
|----------|----------|
| Crianças contam como passageiro? | Sim, todas as pessoas contam no limite. |
| Posso levar mais pessoas do que o limite? | Não, por questões de segurança. |

---

### 9. BLOG

**URL:** `/blog`

**Objetivo:** SEO + Conteúdo de valor

**Categorias sugeridas:**

- Dicas de passeio no Rio
- Roteiros e pontos turísticos
- Como organizar eventos em lanchas
- Depoimentos de clientes
- Novidades da WeBoat

**Exemplos de artigos:**

- "10 dicas para seu primeiro passeio de lancha no Rio"
- "Mureta da Urca: tudo que você precisa saber"
- "Como organizar uma despedida de solteira perfeita no mar"
- "Réveillon em Copacabana: por que assistir do mar"

---

### 10. CONTATO

**URL:** `/contato`

**Elementos:**

| Elemento | Detalhes |
|----------|----------|
| **WhatsApp** | (21) 97772-4114 - Botão flutuante em todas as páginas |
| **Formulário** | Nome, telefone, data, pessoas, mensagem |
| **E-mail** | contato@weboatbrasil.com.br |
| **Endereço** | Marina da Glória, Loja 06 - Rio de Janeiro |
| **Mapa** | Google Maps integrado |
| **Horário** | Segunda a Domingo: 07h - 22h |
| **Redes Sociais** | Instagram, Facebook, YouTube |

---

# 🔧 REQUISITOS FUNCIONAIS

## Funcionalidades Essenciais

### 1. Sistema de Cotação Online

```
Fluxo:
1. Usuário seleciona número de pessoas
2. Seleciona data desejada
3. Seleciona turno (manhã/tarde)
4. Sistema sugere lanchas disponíveis
5. Usuário seleciona lancha
6. Seleciona roteiro
7. Adiciona serviços opcionais
8. Gera proposta com valor total
9. Envia para WhatsApp ou e-mail
```

### 2. Calculadora de Preços

- Cálculo automático baseado em:
  - Lancha selecionada
  - Roteiro
  - Dia da semana (promocional seg-qui)
  - Serviços adicionais
  - Número de pessoas extras

### 3. Galeria de Fotos

- Lightbox para visualização
- Lazy loading para performance
- Categorização por lancha/roteiro

### 4. Depoimentos/Avaliações

- Integração com Google Reviews API
- Carrossel de avaliações
- Filtro por tipo de evento

### 5. WhatsApp Integration

- Botão flutuante em todas as páginas
- Mensagem pré-preenchida com contexto
- Tracking de conversões

### 6. Formulário de Contato

- Campos: Nome, telefone, e-mail, data, pessoas, mensagem
- Integração com CRM/WhatsApp
- Autoresponder

---

# 💻 REQUISITOS TÉCNICOS

## Tecnologias Recomendadas

| Área | Tecnologia |
|------|------------|
| **Frontend** | Next.js ou Nuxt.js |
| **CMS** | Strapi, Sanity ou Contentful |
| **Hospedagem** | Vercel, Netlify ou AWS |
| **CDN** | Cloudflare |
| **Analytics** | Google Analytics 4 + Pixel Meta |

## SEO

### Meta Tags Principais

```html
<!-- Home -->
<title>Aluguel de Lancha no Rio de Janeiro | WeBoat Brasil</title>
<meta name="description" content="Passeios de lancha privativos na Baía de Guanabara. Frota própria, +900 avaliações 5 estrelas. Reserve agora seu passeio inesquecível!">

<!-- Frota -->
<title>Lanchas para Aluguel no RJ - Até 65 Pessoas | WeBoat</title>

<!-- Roteiros -->
<title>Roteiros de Passeio de Lancha no Rio de Janeiro | WeBoat</title>
```

### Palavras-chave Alvo

- aluguel de lancha rio de janeiro
- passeio de lancha rj
- lancha para alugar no rio
- passeio na baía de guanabara
- lancha marina da glória
- passeio mureta da urca
- lancha praia vermelha
- réveillon lancha copacabana

## Performance

- **Core Web Vitals:** LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Imagens:** WebP/AVIF, lazy loading
- **Minificação:** CSS, JS
- **Cache:** CDN para assets estáticos

## Mobile First

- 100% responsivo
- Touch-friendly
- Carregamento otimizado para 4G/3G

---

# 📊 MÉTRICAS DE SUCESSO

| Métrica | Meta |
|---------|------|
| Taxa de conversão (visitante → contato) | > 5% |
| Tempo médio na página | > 2 minutos |
| Taxa de rejeição | < 50% |
| Posição Google "aluguel lancha rio" | Top 3 |
| Leads via site/mês | > 200 |

---

# 📅 PRÓXIMOS PASSOS

1. **[ ] Aprovação da estrutura de páginas**
2. [ ] Definição de wireframes
3. [ ] Design visual (UI/UX)
4. [ ] Produção de conteúdo
5. [ ] Desenvolvimento
6. [ ] Testes
7. [ ] Lançamento

---

**FIM DO DOCUMENTO DE ESTRUTURA**

*WeBoat Brasil - De um sonho a referência no Rio de Janeiro*
