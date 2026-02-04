# Plano de Atualização - Dados Reais WeBoat

> **Fonte dos dados:** `/Users/rodrigocosta/weboat-proposal/src/data/`
> **Data:** 03 de Fevereiro de 2026

---

## 📊 RESUMO DOS DADOS

### Lanchas Próprias (4)
| ID | Nome | Capacidade | Preço R1 (Promo) | Preço R1 (Normal) | Hora Extra |
|----|------|------------|------------------|-------------------|------------|
| weboat-32 | WeBoat 32 | 15 | R$ 2.300 | R$ 2.700 | R$ 800 |
| weboat-oceanic-36 | WeBoat Oceanic 36 | 14 | R$ 2.400 | R$ 2.800 | R$ 800 |
| weboat-390 | WeBoat 390 | 16 | R$ 2.600 | R$ 3.100 | R$ 800 |
| weboat-rio-star-50 | WeBoat Rio Star 50 | 20-22 | R$ 4.000 | R$ 4.500 | R$ 1.200 |

### Roteiros
| ID | Nome | Duração |
|----|------|---------|
| R1 | Mureta da Urca | ~3h |
| R2 | Praia Vermelha | ~3h |
| R3 | Copacabana | ~4h |
| R4 | Ilhas Cagarras | ~5h |
| R5 | Itaipu/Camboinhas | ~5h |

### Serviços
| Categoria | Serviço | Preço Base |
|-----------|---------|------------|
| Churrasco | Kit Simples | R$ 100-150/pessoa |
| Churrasco | Com Acompanhamentos | R$ 145-160/pessoa |
| Open Bar | Básico | R$ 135-150/pessoa |
| Open Bar | Premium | R$ 160-180/pessoa |
| Combo | Churrasco + Open Bar Básico | R$ 205-230/pessoa |
| Combo | Churrasco + Open Bar Premium | R$ 220-250/pessoa |
| Mesa | Queijos & Vinhos | R$ 115-140/pessoa |
| Mesa | Snacks Premium | R$ 120-150/pessoa |
| Decoração | Kit Festa Premium | R$ 1.850-2.500 |
| Decoração | Kit Despedida | R$ 135-150/pessoa |
| Entretenimento | DJ com Equipamento | R$ 1.500 |
| Entretenimento | Fotógrafo | R$ 800 |

### O que Inclui (Padrão)
- Combustível
- Tripulação habilitada
- Tapete flutuante
- Macarrões
- Som com Bluetooth
- Coolers

### Lanchas Parceiras (21)

#### Categoria: Padrão (10-18 pessoas)
| ID | Nome | Capacidade | Preço R1 | Hora Extra | Observações |
|----|------|------------|----------|------------|-------------|
| magna-28 | Magna 28 | 10 | R$ 3.000 | R$ 600 | - |
| boat-rio | Boat Rio 36 | 11 | R$ 3.500 | R$ 1.000 | - |
| real-32 | WeBoat Real 32 | 12 | R$ 3.300 | R$ 650 | - |
| favo | WeBoat Rival 36 | 12 | R$ 2.900 | R$ 1.000 | - |
| malaga-32 | Malaga 32 | 14 | R$ 2.800 | R$ 800 | - |
| oceanic-fantasma | WeBoat Ghost 36 | 15 | R$ 3.800 | R$ 800 | - |
| carbrasmar-37 | WeBoat Carbrasmar 41 | 16 | R$ 3.700 | R$ 1.000 | - |
| ibiza | WeBoat Ibiza 45 | 18 | R$ 4.200 | R$ 1.200 | - |
| atol | Intermares 50 | 18 | R$ 4.500 | R$ 1.000 | - |

#### Categoria: Grande (18-25 pessoas)
| ID | Nome | Capacidade | Preço R1 | Hora Extra | Observações |
|----|------|------------|----------|------------|-------------|
| senna | WeBoat Senna 50 | 18-20 | R$ 5.500 | R$ 1.300 | +R$ 300/pessoa (19+) |
| tecnomarine | Tecnomarine 50 | 20 | R$ 6.500 | R$ 1.500 | Ar-cond (+R$ 1.000) |
| lobster | WeBoat 400 | 16-22 | R$ 4.000 | R$ 1.800 | +R$ 150/pessoa (17+) |
| aquarius | WeBoat 600 | 18-22 | R$ 7.500 | R$ 1.000 | Ar-cond (+R$ 600) |
| essence | WeBoat Essence | 22 | R$ 7.000 | R$ 1.000 | Ar-cond, só R1/R2 |
| weboat-mares-50 | WeBoat Mares 50 | 25 | R$ 5.500 | R$ 1.300 | - |

#### Categoria: Eventos (30-65 pessoas)
| ID | Nome | Capacidade | Preço R1 | Hora Extra | Observações |
|----|------|------------|----------|------------|-------------|
| sagarana | Catamarã Sagarana | 20-35 | R$ 9.500 | - | +R$ 400/pessoa (21+) |
| bota | Barco Gourmet 53 | 30-40 | R$ 7.000 | R$ 1.500 | Turno tarde +R$ 500 |
| weboat-malik | WeBoat Malik | 35-50 | R$ 8.500 | R$ 2.000 | Turno tarde +R$ 1.000 |
| oceano | Catamarã Oceano | 50-65 | R$ 14.000 | R$ 3.000 | Churrasq. R$ 600 |

#### Categoria: Luxo (12-17 pessoas, 6h)
| ID | Nome | Capacidade | Preço R1 | Hora Extra | Observações |
|----|------|------------|----------|------------|-------------|
| vib | Prestige 60 | 12 | R$ 15.000 | R$ 2.500 | Ar-cond, gerador |
| rebecca | Schaefer 62 Fly | 16 | R$ 15.000 | R$ 2.500 | Ar-cond, gerador |
| intermarine-60-fly | Intermarine 60 Fly | 17 | R$ 15.000 | R$ 2.500 | Ar-cond, gerador |

---

## 🚀 FASES DE ATUALIZAÇÃO

---

## FASE A: LANCHAS PRÓPRIAS

### A1: Listagem de Lanchas
**Arquivo:** `pages/lanchas/index.html`
- [ ] Atualizar preços de todas as lanchas
- [ ] Atualizar capacidades
- [ ] Revisar textos descritivos

**COMMIT:** `feat(lanchas): atualizar listagem com preços reais`

---

### A2: WeBoat 32
**Arquivo:** `pages/lanchas/weboat-32.html`
- [ ] Atualizar especificações (capacidade: 15)
- [ ] Tabela de preços por roteiro
- [ ] Taxa churrasqueira: R$ 250
- [ ] Hora extra: R$ 800
- [ ] O que inclui
- [ ] Adicionar Mini FAQ (3-4 perguntas)

**COMMIT:** `feat(lanchas): atualizar WeBoat 32 com dados e mini FAQ`

---

### A3: WeBoat 390
**Arquivo:** `pages/lanchas/weboat-390.html`
- [ ] Atualizar especificações (capacidade: 16, com staff: 18)
- [ ] Tabela de preços por roteiro
- [ ] Taxa churrasqueira: R$ 250
- [ ] Hora extra: R$ 800
- [ ] O que inclui
- [ ] Adicionar Mini FAQ (3-4 perguntas)

**COMMIT:** `feat(lanchas): atualizar WeBoat 390 com dados e mini FAQ`

---

### A4: WeBoat Oceanic 36
**Arquivo:** `pages/lanchas/weboat-oceanic-36.html`
- [ ] Atualizar especificações (capacidade: 14)
- [ ] Tabela de preços por roteiro
- [ ] Taxa churrasqueira: R$ 250
- [ ] Hora extra: R$ 800
- [ ] O que inclui
- [ ] Adicionar Mini FAQ (3-4 perguntas)

**COMMIT:** `feat(lanchas): atualizar WeBoat Oceanic 36 com dados e mini FAQ`

---

### A5: WeBoat Rio Star 50
**Arquivo:** `pages/lanchas/weboat-rio-star-50.html`
- [ ] Atualizar especificações (capacidade: 20-22, com staff: 24)
- [ ] Tabela de preços por roteiro
- [ ] Taxa churrasqueira: R$ 250
- [ ] Hora extra: R$ 1.200
- [ ] Pessoa extra: R$ 250 (a partir de 21)
- [ ] O que inclui
- [ ] Adicionar Mini FAQ (3-4 perguntas)

**COMMIT:** `feat(lanchas): atualizar WeBoat Rio Star 50 com dados e mini FAQ`

---

### A6: SEO e Schema - Lanchas
**Arquivos:** Todos em `pages/lanchas/`
- [ ] Verificar/adicionar Schema Product em cada lancha
- [ ] Verificar/adicionar Schema FAQPage para mini FAQs
- [ ] Verificar meta descriptions (150-160 chars)
- [ ] Verificar títulos únicos
- [ ] Verificar canonical URLs
- [ ] Verificar Open Graph tags
- [ ] Verificar alt text das imagens

**COMMIT:** `chore(lanchas): verificar e ajustar SEO e schemas`

---

## FASE B: ROTEIROS

### B1: Padronizar Mini FAQ (padrão lanchas) ✅
**Arquivos:** Todos os roteiros
- [x] Usar classes faq-grid, faq-item do lancha-detalhe.css
- [x] Atualizar CSS roteiros.css para reusar componente
- [x] Atualizar mureta-da-urca.html
- [x] Atualizar praia-vermelha.html
- [x] Atualizar copacabana.html
- [x] Atualizar ilhas-cagarras.html
- [x] Atualizar itaipu-camboinhas.html

**COMMIT:** `fix(roteiros): padronizar Mini FAQ com mesmo padrão das lanchas` ✅

---

### B2: Volta Completa - Trajeto Real ✅
**Arquivo:** `pages/roteiros/volta-completa.html`
- [x] Atualizar trajeto:
  - Marina da Glória (embarque)
  - Museu do Amanhã
  - Ponte Rio-Niterói
  - Museu de Arte Contemporânea (MAC)
  - Icaraí
  - Morcego (parada mergulho)
  - Adão e Eva (parada mergulho)
  - Fortes: Santa Cruz, Laje, São João
  - Mureta da Urca (parada mergulho)
  - Marina da Glória (desembarque)
- [x] Adicionar Mini FAQ (padrão lanchas)
- [x] Adicionar Schema FAQPage
- [x] Corrigir capacidade Oceanic 36: 14 pessoas

**COMMIT:** `feat(roteiros): atualizar Volta Completa com trajeto real e mini FAQ` ✅

---

### B3: Listagem de Roteiros + Mini FAQ ✅
**Arquivo:** `pages/roteiros/index.html`
- [x] Adicionar seção Mini FAQ (4 perguntas gerais)
- [x] Adicionar Schema FAQPage
- [x] Verificar preços atualizados

**COMMIT:** `feat(roteiros): adicionar Mini FAQ na listagem de roteiros` ✅

---

### B4: Listagem de Lanchas + Mini FAQ ✅
**Arquivo:** `pages/lanchas/index.html`
- [x] Adicionar seção Mini FAQ (4 perguntas gerais)
- [x] Adicionar Schema FAQPage

**COMMIT:** `feat(lanchas): adicionar Mini FAQ na listagem de lanchas` ✅

---

## FASE C: SERVIÇOS ✅

### C1-C5: Serviços Completo ✅
**Arquivo:** `pages/servicos.html`
- [x] Kit Simples: R$ 100-150/pessoa
- [x] Kit com Acompanhamentos: R$ 145-160/pessoa
- [x] Open Bar Básico: R$ 135-150/pessoa
- [x] Open Bar Premium: R$ 160-180/pessoa
- [x] Combos: R$ 205-250/pessoa
- [x] Mesas: Queijos & Vinhos (R$ 115-140), Snacks Premium (R$ 120-150)
- [x] Decoração: Kit Despedida (R$ 135-150), Kit Festa Premium (R$ 1.850-2.500)
- [x] DJ com Equipamento: R$ 1.500
- [x] Fotógrafo: R$ 800
- [x] Mini FAQ com 4 perguntas
- [x] Schema FAQPage
- [x] Schema ItemList atualizado

**COMMIT:** `feat(servicos): atualizar página com preços reais e novas seções` ✅

---

## FASE D: HOMEPAGE

### D1: Cards de Lanchas e Roteiros ✅
**Arquivo:** `index.html`
- [x] Preços nos cards de lanchas já estão corretos
- [x] Preços nos cards de roteiros já estão corretos
- [x] Serviços: Churrasco (R$ 100), Open Bar (R$ 135), Decoração (R$ 1.850)

**STATUS:** Já atualizado anteriormente - sem alterações necessárias

---

### D2: Seção Google Reviews
**Arquivos:** `index.html`, `js/reviews.js` (criar), `css/pages/home.css`
- [ ] Criar estrutura HTML para reviews
- [ ] Implementar carrossel automático
- [ ] Mostrar apenas 5 estrelas
- [ ] Mostrar total de reviews
- [ ] Estilizar componente

**COMMIT:** `feat(home): adicionar seção de Google Reviews`

---

### D3: Seção Famosos
**Arquivos:** `index.html`, `js/carousel.js` (criar), `css/pages/home.css`
- [ ] Criar estrutura HTML para famosos
- [ ] Implementar carrossel horizontal automático
- [ ] Fotos com legendas (nomes)
- [ ] Pausar no hover
- [ ] Responsivo

**COMMIT:** `feat(home): adicionar seção preferida dos famosos`

---

### D4: SEO e Schema - Homepage
**Arquivo:** `index.html`
- [ ] Verificar/adicionar Schema Organization
- [ ] Verificar/adicionar Schema Review/AggregateRating
- [ ] Verificar/adicionar Schema FAQPage (se tiver mini FAQ)
- [ ] Verificar meta tags
- [ ] Verificar Open Graph

**COMMIT:** `chore(home): verificar e ajustar SEO e schemas`

---

## FASE E: OCASIÕES

### E1: Despedida de Solteira ✅
**Arquivo:** `pages/ocasioes/despedida-solteira.html`
- [x] Atualizar preços de pacotes (já estavam corretos: R$ 2.300, R$ 2.600, R$ 4.000)
- [x] Kit Despedida: R$ 135-150/pessoa (atualizado)
- [x] Fotógrafo: R$ 800 (atualizado)
- [x] Mini FAQ já existia

**COMMIT:** `feat(ocasioes): atualizar despedida de solteira` ✅

---

### E2: Aniversário ✅
**Arquivo:** `pages/ocasioes/aniversario.html`
- [x] Atualizar preços de pacotes (já estavam corretos)
- [x] Kit Festa Premium: R$ 1.850 (atualizado)
- [x] Mini FAQ já existia

**COMMIT:** `feat(ocasioes): atualizar aniversário` ✅

---

### E3: Corporativo ✅
**Arquivo:** `pages/ocasioes/corporativo.html`
- [x] Preços já corretos (R$ 2.600, R$ 4.000)
- [x] Serviços: Churrasco R$ 100, Open Bar R$ 135 (corretos)
- [x] Mini FAQ já existia

**STATUS:** Já atualizado - sem alterações necessárias

---

### E4: Réveillon ✅
**Arquivo:** `pages/ocasioes/reveillon.html`
- [x] Preços especiais já definidos (R$ 15.000, R$ 18.000, R$ 25.000)
- [x] Mini FAQ já existia

**STATUS:** Já atualizado - sem alterações necessárias

---

### E5: SEO e Schema - Ocasiões
**Arquivos:** Todos em `pages/ocasioes/`
- [ ] Verificar/adicionar Schema Event
- [ ] Verificar/adicionar Schema FAQPage
- [ ] Verificar meta descriptions
- [ ] Verificar Open Graph

**COMMIT:** `chore(ocasioes): verificar e ajustar SEO e schemas`

---

## FASE F: FAQ E SUPORTE ✅

### F1: Perguntas ao Usuário ✅
**Ação:** Coletar informações antes de prosseguir

**Respostas obtidas:**
- [x] Cancelamento: Sinal 50% não reembolsável, mas liberam se conseguirem outro cliente
- [x] Mau tempo: Remarcação só com chuva forte; roteiro pode mudar para Baía de Guanabara
- [x] Crianças: Sem restrição de idade, contam como passageiros
- [x] Pets: Pequeno porte OK, médio/grande consultar
- [x] Pagamento: PIX/transferência sem taxas; cartão com taxas (até 12x com juros)
- [x] Sinal: 50% para confirmar reserva
- [x] Estacionamento: ~R$ 70 para 5h (ESTAPAR)
- [x] Bebidas próprias: Pode levar, PET/latas OK, vidro só para vinhos/destilados
- [x] Horário de chegada: 30 minutos antes (atraso descontado)
- [x] Itens proibidos: bronzeador, vinho tinto, narguilé, fogos, confetes
- [x] Churrasqueira: todas têm, mas requer taxa adicional (R$ 250-600)
- [x] Réveillon: 5h (21h-2h sugerido), horas extras cobradas à parte

---

### F2: Expandir FAQ Principal ✅
**Arquivo:** `pages/faq.html`
- [x] FAQ completo com 7 categorias
- [x] Preços e Reservas (6 perguntas)
- [x] Durante o Passeio (8 perguntas)
- [x] Sobre as Lanchas (5 perguntas)
- [x] Ocasiões Especiais (5 perguntas)
- [x] Logística (3 perguntas)
- [x] Crianças, Pets e Acessibilidade (4 perguntas)
- [x] Políticas e Regras (4 perguntas)
- [x] Schema FAQPage atualizado

**COMMITS:**
- `feat(faq): atualizar FAQ completo com políticas e regras reais` ✅
- `fix(faq): ajustar respostas sobre nadar, fumar, bebidas e banheiros` ✅
- `fix(faq): corrigir itens inclusos e informações sobre gelo` ✅
- `fix(faq): remover sugestão sobre itens de valor` ✅
- `fix(faq): ajustar texto de capacidade e coolers` ✅

---

### F2.1: Documento de Referência FAQ ✅
**Arquivo:** `docs/weboat_faq.md`
- [x] Criar arquivo MD com todas as perguntas e respostas
- [x] Organizado por categorias
- [x] Tabela resumo com informações rápidas
- [x] Referenciar no CLAUDE.md

**COMMITS:**
- `docs: criar arquivo de referência FAQ completo` ✅
- `docs: atualizar CLAUDE.md com referência ao FAQ e corrigir lanchas` ✅

---

### F2.2: Verificar Mini FAQs em Todas as Páginas ✅
**Arquivos:** Todas as páginas com mini FAQ
- [x] Verificar consistência com FAQ principal
- [x] Atualizar informações desatualizadas (gelo removido de todas)
- [x] Atualizar churrasqueira (todas têm, requer serviço adicional)
- [x] Verificar Schemas FAQPage

**Páginas atualizadas (17 arquivos):**
- [x] `index.html`
- [x] `pages/lanchas/index.html`
- [x] `pages/lanchas/weboat-32.html`
- [x] `pages/lanchas/weboat-390.html`
- [x] `pages/lanchas/weboat-oceanic-36.html`
- [x] `pages/lanchas/weboat-rio-star-50.html`
- [x] `pages/roteiros/index.html`
- [x] `pages/roteiros/mureta-da-urca.html`
- [x] `pages/roteiros/praia-vermelha.html`
- [x] `pages/roteiros/copacabana.html`
- [x] `pages/roteiros/ilhas-cagarras.html`
- [x] `pages/roteiros/itaipu-camboinhas.html`
- [x] `pages/roteiros/volta-completa.html`
- [x] `pages/servicos.html`
- [x] `pages/ocasioes/despedida-solteira.html`
- [x] `pages/ocasioes/aniversario.html`
- [x] `termos-de-uso.html`

**COMMIT:** `fix: remover gelo dos itens inclusos em todas as páginas` ✅

---

### F3: Mini FAQ - Sobre ✅
**Arquivo:** `pages/sobre.html`
- [x] Adicionar Mini FAQ sobre a empresa
- [x] Atualizar números/estatísticas (4 lanchas, não 5)
- [x] Adicionar Schema FAQPage

**COMMIT:** `feat(sobre): adicionar mini FAQ e corrigir número de lanchas` ✅

---

### F4: Mini FAQ - Contato ✅
**Arquivo:** `pages/contato.html`
- [x] Adicionar Mini FAQ sobre contato/reservas
- [x] Verificar informações de contato
- [x] Corrigir preço estacionamento (R$ 70)
- [x] Adicionar Schema FAQPage

**COMMIT:** `feat(contato): adicionar mini FAQ e Schema FAQPage` ✅

---

### F5: SEO e Schema - FAQ e Suporte ✅
**Arquivos:** `pages/faq.html`, `pages/sobre.html`, `pages/contato.html`
- [x] Verificar Schema FAQPage completo (faq.html - 12 perguntas)
- [x] Verificar Schema AboutPage (sobre.html)
- [x] Verificar Schema ContactPage (contato.html)
- [x] Verificar meta tags em todas (title, description, canonical, og:title)

**STATUS:** Todos os schemas e meta tags estão corretos. Nenhuma alteração necessária.

---

## FASE G: VERIFICAÇÃO FINAL

### G1: Auditoria Geral de SEO
**Todas as páginas:**
- [ ] Executar verificador.sh
- [ ] Verificar todas as meta tags
- [ ] Verificar todos os títulos
- [ ] Verificar todas as canonical URLs
- [ ] Verificar todos os Open Graph
- [ ] Verificar todos os alt texts

**COMMIT:** `chore(seo): auditoria geral de meta tags`

---

### G2: Auditoria de Schemas
**Todas as páginas:**
- [ ] Validar todos os JSON-LD (sem erros de sintaxe)
- [ ] Verificar LocalBusiness em todas
- [ ] Verificar BreadcrumbList em internas
- [ ] Verificar schemas específicos por tipo
- [ ] Testar no Google Rich Results Test

**COMMIT:** `chore(seo): auditoria e correção de schemas`

---

### G3: Atualizar Sitemap
**Arquivo:** `sitemap.xml`
- [ ] Verificar todas as URLs
- [ ] Atualizar lastmod
- [ ] Verificar prioridades

**COMMIT:** `chore(seo): atualizar sitemap`

---

### G4: Verificação de Links
**Todas as páginas:**
- [ ] Verificar links internos
- [ ] Verificar links externos
- [ ] Verificar links do WhatsApp
- [ ] Corrigir links quebrados

**COMMIT:** `fix: corrigir links quebrados`

---

## FASE H: MÍDIAS

### H1: Estrutura de Pastas
**Criar estrutura:**
- [ ] `/assets/images/lanchas/`
- [ ] `/assets/images/roteiros/`
- [ ] `/assets/images/servicos/`
- [ ] `/assets/images/famosos/`
- [ ] `/assets/images/hero/`
- [ ] `/assets/images/og/`

**COMMIT:** `chore(assets): criar estrutura de pastas para imagens`

---

### H2: Imagens de Lanchas
**Ação:** Receber e otimizar imagens
- [ ] WeBoat 32: hero, galeria, thumbnail
- [ ] WeBoat 390: hero, galeria, thumbnail
- [ ] WeBoat Oceanic 36: hero, galeria, thumbnail
- [ ] WeBoat Rio Star 50: hero, galeria, thumbnail
- [ ] Otimizar (WebP, compressão)
- [ ] Atualizar referências no HTML

**COMMIT:** `feat(assets): adicionar imagens das lanchas`

---

### H3: Imagens de Roteiros
**Ação:** Receber e otimizar imagens
- [ ] Mureta da Urca
- [ ] Praia Vermelha
- [ ] Copacabana
- [ ] Ilhas Cagarras
- [ ] Itaipu/Camboinhas
- [ ] Mapa dos roteiros

**COMMIT:** `feat(assets): adicionar imagens dos roteiros`

---

### H4: Imagens de Famosos
**Ação:** Receber e otimizar imagens
- [ ] Fotos de famosos (com autorização)
- [ ] Otimizar para carrossel
- [ ] Adicionar nomes/legendas

**COMMIT:** `feat(assets): adicionar imagens de famosos`

---

### H5: Imagens Gerais
**Ação:** Hero, OG, serviços
- [ ] Hero images
- [ ] Open Graph images
- [ ] Imagens de serviços
- [ ] Implementar lazy loading

**COMMIT:** `feat(assets): adicionar imagens gerais e OG`

---

## FASE I: LANCHAS PARCEIRAS (21 embarcações)

### I1: Estrutura e Listagem ✅
**Arquivo:** `pages/lanchas/index.html`
- [x] Adicionar seção "Lanchas Parceiras" abaixo das próprias
- [x] Criar cards para todas as 21 lanchas parceiras
- [x] Organizar por categoria (Padrão, Grande, Eventos, Luxo)
- [x] Filtros por capacidade
- [x] CSS para badges e filtros
- [x] JavaScript para filtro de categorias
- [x] Atualizar SEO e Schema CollectionPage

**COMMIT:** `feat(lanchas): adicionar seção de lanchas parceiras na listagem (I1)` ✅

---

### I2: Lanchas Padrão (9 embarcações, 10-18 pessoas)
**Arquivos:** Criar páginas em `pages/lanchas/parceiras/`
- [ ] `magna-28.html` - Magna 28 (10p, R$ 3.000)
- [ ] `boat-rio-36.html` - Boat Rio 36 (11p, R$ 3.500)
- [ ] `weboat-real-32.html` - WeBoat Real 32 (12p, R$ 3.300)
- [ ] `weboat-rival-36.html` - WeBoat Rival 36 (12p, R$ 2.900)
- [ ] `malaga-32.html` - Malaga 32 (14p, R$ 2.800)
- [ ] `weboat-ghost-36.html` - WeBoat Ghost 36 (15p, R$ 3.800)
- [ ] `weboat-carbrasmar-41.html` - WeBoat Carbrasmar 41 (16p, R$ 3.700)
- [ ] `weboat-ibiza-45.html` - WeBoat Ibiza 45 (18p, R$ 4.200)
- [ ] `intermares-50.html` - Intermares 50 (18p, R$ 4.500)

**COMMIT:** `feat(lanchas): criar páginas das lanchas parceiras padrão`

---

### I3: Lanchas Grandes (6 embarcações, 18-25 pessoas)
**Arquivos:** Criar páginas em `pages/lanchas/parceiras/`
- [ ] `weboat-senna-50.html` - WeBoat Senna 50 (18-20p, R$ 5.500, +R$ 300/pessoa 19+)
- [ ] `tecnomarine-50.html` - Tecnomarine 50 (20p, R$ 6.500, ar-cond +R$ 1.000)
- [ ] `weboat-400.html` - WeBoat 400 (16-22p, R$ 4.000, +R$ 150/pessoa 17+)
- [ ] `weboat-600.html` - WeBoat 600 (18-22p, R$ 7.500, ar-cond +R$ 600)
- [ ] `weboat-essence.html` - WeBoat Essence (22p, R$ 7.000, só R1/R2)
- [ ] `weboat-mares-50.html` - WeBoat Mares 50 (25p, R$ 5.500)

**COMMIT:** `feat(lanchas): criar páginas das lanchas parceiras grandes`

---

### I4: Lanchas para Eventos (4 embarcações, 30-65 pessoas)
**Arquivos:** Criar páginas em `pages/lanchas/parceiras/`
- [ ] `catamara-sagarana.html` - Catamarã Sagarana (20-35p, R$ 9.500, +R$ 400/pessoa 21+)
- [ ] `barco-gourmet-53.html` - Barco Gourmet 53 (30-40p, R$ 7.000, turno tarde +R$ 500)
- [ ] `weboat-malik.html` - WeBoat Malik (35-50p, R$ 8.500, turno tarde +R$ 1.000)
- [ ] `catamara-oceano.html` - Catamarã Oceano (50-65p, R$ 14.000, churrasq. R$ 600)

**COMMIT:** `feat(lanchas): criar páginas das lanchas para eventos`

---

### I5: Lanchas de Luxo (3 embarcações, 6h de passeio)
**Arquivos:** Criar páginas em `pages/lanchas/parceiras/`
- [ ] `prestige-60.html` - Prestige 60 (12p, R$ 15.000, 6h, ar-cond)
- [ ] `schaefer-62-fly.html` - Schaefer 62 Fly (16p, R$ 15.000, 6h, ar-cond)
- [ ] `intermarine-60-fly.html` - Intermarine 60 Fly (17p, R$ 15.000, 6h, ar-cond)

**COMMIT:** `feat(lanchas): criar páginas das lanchas de luxo`

---

### I6: CSS e Componentes
**Arquivos:** CSS
- [ ] Criar `css/pages/lancha-parceira.css` (variação do detalhe)
- [ ] Atualizar `css/pages/frota.css` (seção parceiras)
- [ ] Criar badges: "Parceira", "Ar-cond", "Eventos", "Luxo"

**COMMIT:** `style(lanchas): adicionar estilos para lanchas parceiras`

---

### I7: SEO e Schema - Parceiras
**Arquivos:** Todas as páginas de parceiras
- [ ] Adicionar Schema Product em cada lancha
- [ ] Adicionar Schema BreadcrumbList
- [ ] Meta tags SEO (title, description, canonical)
- [ ] Open Graph tags
- [ ] Atualizar sitemap.xml com novas URLs

**COMMIT:** `chore(lanchas): SEO e schemas para lanchas parceiras`

---

### I8: Atualizar Navegação e Links
**Arquivos:** Várias páginas
- [ ] Atualizar menu (se necessário)
- [ ] Links nas páginas de roteiros
- [ ] Links nas páginas de ocasiões
- [ ] FAQ sobre lanchas parceiras

**COMMIT:** `feat(nav): integrar lanchas parceiras na navegação`

---

## 📋 RESUMO DOS COMMITS (41 total)

| Fase | Subfase | Commit |
|------|---------|--------|
| A | A1 | `feat(lanchas): atualizar listagem com preços reais` |
| A | A2 | `feat(lanchas): atualizar WeBoat 32 com dados e mini FAQ` |
| A | A3 | `feat(lanchas): atualizar WeBoat 390 com dados e mini FAQ` |
| A | A4 | `feat(lanchas): atualizar WeBoat Oceanic 36 com dados e mini FAQ` |
| A | A5 | `feat(lanchas): atualizar WeBoat Rio Star 50 com dados e mini FAQ` |
| A | A6 | `chore(lanchas): verificar e ajustar SEO e schemas` |
| B | B1 | `feat(roteiros): atualizar listagem com preços reais` |
| B | B2 | `feat(roteiros): atualizar Mureta da Urca com dados e mini FAQ` |
| B | B3 | `feat(roteiros): atualizar Praia Vermelha com dados e mini FAQ` |
| B | B4 | `feat(roteiros): atualizar Copacabana com dados e mini FAQ` |
| B | B5 | `feat(roteiros): atualizar Ilhas Cagarras com dados e mini FAQ` |
| B | B6 | `feat(roteiros): atualizar Itaipu e Camboinhas com dados e mini FAQ` |
| B | B7 | `chore(roteiros): verificar e ajustar SEO e schemas` |
| C | C1 | `feat(servicos): atualizar seção de churrasco` |
| C | C2 | `feat(servicos): atualizar seção de open bar` |
| C | C3 | `feat(servicos): atualizar combos, mesas e decoração` |
| C | C4 | `feat(servicos): atualizar entretenimento e adicionar mini FAQ` |
| C | C5 | `chore(servicos): verificar e ajustar SEO e schemas` |
| D | D1 | `feat(home): atualizar cards com preços reais` |
| D | D2 | `feat(home): adicionar seção de Google Reviews` |
| D | D3 | `feat(home): adicionar seção preferida dos famosos` |
| D | D4 | `chore(home): verificar e ajustar SEO e schemas` |
| E | E1 | `feat(ocasioes): atualizar despedida de solteira` |
| E | E2 | `feat(ocasioes): atualizar aniversário` |
| E | E3 | `feat(ocasioes): atualizar corporativo` |
| E | E4 | `feat(ocasioes): atualizar réveillon` |
| E | E5 | `chore(ocasioes): verificar e ajustar SEO e schemas` |
| F | F2 | `feat(faq): expandir com novas perguntas` |
| F | F3 | `feat(sobre): adicionar mini FAQ e atualizar dados` |
| F | F4 | `feat(contato): adicionar mini FAQ` |
| F | F5 | `chore(suporte): verificar e ajustar SEO e schemas` |
| G | G1 | `chore(seo): auditoria geral de meta tags` |
| G | G2 | `chore(seo): auditoria e correção de schemas` |
| G | G3 | `chore(seo): atualizar sitemap` |
| G | G4 | `fix: corrigir links quebrados` |
| H | H1 | `chore(assets): criar estrutura de pastas para imagens` |
| H | H2 | `feat(assets): adicionar imagens das lanchas` |
| H | H3 | `feat(assets): adicionar imagens dos roteiros` |
| H | H4 | `feat(assets): adicionar imagens de famosos` |
| H | H5 | `feat(assets): adicionar imagens gerais e OG` |
| I | I1 | `feat(lanchas): adicionar seção de lanchas parceiras na listagem` |
| I | I2 | `feat(lanchas): criar páginas das lanchas parceiras padrão` |
| I | I3 | `feat(lanchas): criar páginas das lanchas parceiras grandes` |
| I | I4 | `feat(lanchas): criar páginas das lanchas para eventos` |
| I | I5 | `feat(lanchas): criar páginas das lanchas de luxo` |
| I | I6 | `style(lanchas): adicionar estilos para lanchas parceiras` |
| I | I7 | `chore(lanchas): SEO e schemas para lanchas parceiras` |
| I | I8 | `feat(nav): integrar lanchas parceiras na navegação` |

---

## ❓ PERGUNTAS PENDENTES (FASE F1)

1. **Cancelamento:** Qual a política detalhada?
2. **Mau tempo:** O que acontece? Reagendamento automático?
3. **Crianças:** Idade mínima? Coletes especiais?
4. **Pets:** São permitidos a bordo?
5. **Pagamento:** Quais formas aceitas?
6. **Sinal:** Qual valor/percentual para reservar?
7. **Estacionamento:** Tem na Marina? Custo?
8. **Bebidas próprias:** Pode levar? Taxa?
9. **Horário de chegada:** Quanto tempo antes?
10. **Documentos:** Necessários para embarque?

---

## ✅ PROGRESSO

- [x] **FASE A** - Lanchas ✅
- [x] **FASE B** - Roteiros ✅
- [x] **FASE C** - Serviços ✅
- [x] **FASE D** - Homepage ✅
- [x] **FASE E** - Ocasiões ✅
- [x] **FASE F** - FAQ e Suporte ✅ (F1 a F5 concluídas)
- [ ] **FASE G** - Verificação Final (4 commits)
- [ ] **FASE H** - Mídias (5 commits - aguardando imagens)
- [ ] **FASE I** - Lanchas Parceiras (8 commits - 21 embarcações)

**Total: ~45 commits planejados**

---

---

## FASE J: CORREÇÕES DE DADOS E FUNCIONALIDADES

### Dados de Referência - Horários e Turnos

**Turno Padrão (maioria das lanchas):**
- Manhã: 09:00-14:00 (5h)
- Tarde: 14:30-19:30 (5h)

**Turnos Especiais:**
| Lancha | Manhã | Tarde | Obs. |
|--------|-------|-------|------|
| Catamarã Sagarana | 08:00-13:00 | 14:00-19:00 | - |
| Barco Gourmet 53 | 09:00-14:00 | 14:30-19:30 | Tarde +R$ 500 |
| WeBoat Malik | 08:30-13:30 | 14:30-19:30 | Tarde +R$ 1.000 |
| Catamarã Oceano | 10:00-15:00 | 17:00-22:00 | - |

**Lanchas Flexíveis (6h mínimo):**
- Prestige 60, Schaefer 62 Fly, Intermarine 60 Fly

**Sobre os Roteiros:**
- Todos os passeios têm **5 horas de duração**
- A diferença entre roteiros é o **tempo de navegação vs tempo parado**
- Roteiros curtos (R1, R2): mais tempo de lancha parada
- Roteiros longos (R4, R5): mais tempo de navegação

---

### J1: Corrigir Filtro de Categorias - Listagem Lanchas ✅
**Arquivo:** `pages/lanchas/index.html`
- [x] Adicionar type="button" nos filtros
- [x] Verificar seletores CSS (OK)
- [x] Testar filtros por categoria

**COMMIT:** `fix(lanchas): corrigir filtro, preços duplos e tabelas por roteiro (J1-J4, J6)` ✅

---

### J2: Atualizar Cards Lanchas Próprias - Listagem ✅
**Arquivo:** `pages/lanchas/index.html`
- [x] Mostrar dois preços nos cards: Seg-Qui e Sex-Dom
- [x] WeBoat 32: R$ 2.300 (Seg-Qui) | R$ 2.700 (Sex-Dom)
- [x] WeBoat Oceanic 36: R$ 2.400 (Seg-Qui) | R$ 2.800 (Sex-Dom)
- [x] WeBoat 390: R$ 2.600 (Seg-Qui) | R$ 3.100 (Sex-Dom)
- [x] WeBoat Rio Star 50: R$ 4.000 (Seg-Qui) | R$ 4.500 (Sex-Dom)
- [x] Atualizar CSS para layout de dois preços

**COMMIT:** Incluído no commit J1-J4, J6 ✅

---

### J3: Atualizar Rio Star 50 - Capacidade ✅
**Arquivos:** `pages/lanchas/weboat-rio-star-50.html`, `pages/lanchas/index.html`
- [x] Capacidade: 20-22 pessoas (base 20, máxima 22, com staff 24)
- [x] Pessoa extra: R$ 250 a partir de 21 pessoas
- [x] Tabela de preços completa por roteiro

**COMMIT:** Incluído no commit J1-J4, J6 ✅

**Preços Rio Star 50:**
| Roteiro | Seg-Qui (Promo) | Sex-Dom (Normal) |
|---------|-----------------|------------------|
| R1 - Mureta da Urca | R$ 4.000 | R$ 4.500 |
| R2 - Praia Vermelha | R$ 4.300 | R$ 4.800 |
| R3 - Copacabana | R$ 4.900 | R$ 5.500 |
| R4 - Ilhas Cagarras | R$ 5.900 | R$ 6.500 |
| R5 - Itaipu/Camboinhas | R$ 5.900 | R$ 6.500 |

**COMMIT:** `fix(lanchas): corrigir capacidade e preços da Rio Star 50`

---

### J4: Atualizar Páginas Lanchas Próprias - Tabelas de Preços Completas
**Arquivos:** Todas as páginas de lanchas próprias

#### WeBoat 32 (15 pessoas)
| Roteiro | Seg-Qui | Sex-Dom |
|---------|---------|---------|
| R1 - Mureta da Urca | R$ 2.300 | R$ 2.700 |
| R2 - Praia Vermelha | R$ 2.500 | R$ 2.900 |
| R3 - Copacabana | R$ 3.000 | R$ 3.400 |
| R4 - Ilhas Cagarras | R$ 3.600 | R$ 4.000 |
| R5 - Itaipu/Camboinhas | R$ 3.600 | R$ 4.000 |

#### WeBoat Oceanic 36 (14 pessoas)
| Roteiro | Seg-Qui | Sex-Dom |
|---------|---------|---------|
| R1 - Mureta da Urca | R$ 2.400 | R$ 2.800 |
| R2 - Praia Vermelha | R$ 2.600 | R$ 3.000 |
| R3 - Copacabana | R$ 3.100 | R$ 3.600 |
| R4 - Ilhas Cagarras | R$ 3.700 | R$ 4.300 |
| R5 - Itaipu/Camboinhas | R$ 3.700 | R$ 4.300 |

#### WeBoat 390 (16 pessoas, com staff 18)
| Roteiro | Seg-Qui | Sex-Dom |
|---------|---------|---------|
| R1 - Mureta da Urca | R$ 2.600 | R$ 3.100 |
| R2 - Praia Vermelha | R$ 2.800 | R$ 3.300 |
| R3 - Copacabana | R$ 3.300 | R$ 3.900 |
| R4 - Ilhas Cagarras | R$ 3.900 | R$ 4.500 |
| R5 - Itaipu/Camboinhas | R$ 3.900 | R$ 4.500 |

**COMMIT:** Incluído no commit J1-J4, J6 ✅

---

### J5: Atualizar Páginas Lanchas Parceiras - Preços por Roteiro ✅
**Arquivos:** Todas as páginas em `pages/lanchas/parceiras/`

- [x] Adicionar tabela de preços por roteiro em cada página (22 páginas)
- [x] Incluir informações de turnos específicos
- [x] Adicionar valores de adicionais (hora extra, churrasqueira, pessoa extra)

**COMMIT:** `feat(lanchas): adicionar tabelas de preços por roteiro nas parceiras (J5)` ✅

---

### J6: Adicionar FAQ sobre Roteiros e Duração ✅
**Arquivos:** `pages/faq.html`

- [x] Adicionar pergunta "Qual a diferença entre os roteiros?"
- [x] Explicar tempo de navegação vs tempo parado
- [x] Incluir horários dos turnos (manhã e tarde)
- [x] Adicionar ao Schema FAQPage

**COMMIT:** Incluído no commit J1-J4, J6 ✅

---

### J7: Atualizar Informações de Turnos ✅
**Arquivos:** Todas as páginas de lanchas

- [x] Informação sobre turnos já incluída nas tabelas de preços
- [x] Manhã: 09:00-14:00 (5h) nas notas de preço
- [x] Tarde: 14:30-19:30 (5h) nas notas de preço
- [x] Lanchas com horários especiais já identificadas

**COMMIT:** Incluído nos commits J1-J6 ✅

---

## ✅ PROGRESSO

- [x] **FASE A** - Lanchas ✅
- [x] **FASE B** - Roteiros ✅
- [x] **FASE C** - Serviços ✅
- [x] **FASE D** - Homepage ✅
- [x] **FASE E** - Ocasiões ✅
- [x] **FASE F** - FAQ e Suporte ✅
- [ ] **FASE G** - Verificação Final (4 commits)
- [ ] **FASE H** - Mídias (5 commits - aguardando imagens)
- [x] **FASE I** - Lanchas Parceiras ✅ (22 páginas criadas)
- [x] **FASE J** - Correções de Dados e Funcionalidades ✅ (2 commits)

**Total: ~52 commits planejados**

---

**STATUS:** Iniciando FASE K - Novos Ajustes.

---

## FASE K: NOVOS AJUSTES E CORREÇÕES

### K1: Corrigir Nomenclatura dos Roteiros
**Arquivos:** Todas as páginas de lanchas (próprias e parceiras)
- [ ] Mudar de "R1", "R2", etc para "Roteiro 1 - Mureta da Urca (3h)"
- [ ] Padronizar duração nos nomes:
  - Roteiro 1 - Mureta da Urca (3h)
  - Roteiro 2 - Praia Vermelha (3h)
  - Roteiro 3 - Copacabana (4h)
  - Roteiro 4 - Ilhas Cagarras (5h)
  - Roteiro 5 - Itaipu/Camboinhas (5h)

**COMMIT:** `fix(lanchas): corrigir nomenclatura dos roteiros`

---

### K2: Remover Capacidade com Staff
**Arquivos:** Todas as páginas de lanchas
- [ ] Não informar capacidade com staff aos clientes
- [ ] Remover menções a "com staff" nas capacidades

**COMMIT:** `fix(lanchas): remover informação de capacidade com staff`

---

### K3: Reduzir Destaque Valor Promocional
**Arquivos:** Lanchas próprias (weboat-32, weboat-390, weboat-oceanic-36, weboat-rio-star-50)
- [ ] Diminuir destaque visual do preço promocional
- [ ] Manter informação mas sem tanta ênfase

**COMMIT:** `style(lanchas): reduzir destaque do valor promocional`

---

### K4: Remover Botões "Ligar Agora"
**Arquivos:** Todas as páginas de lanchas
- [ ] Remover botões de ligar abaixo de "Reservar pelo WhatsApp"

**COMMIT:** `fix(lanchas): remover botões ligar agora`

---

### K5: Adicionar Info Churrasqueira por Categoria
**Arquivos:** Todas as páginas de lanchas

**Categorias de Churrasqueira:**
- **Padrão:** Comandante/tripulação na churrasqueira, Gelo escama: 02 sacos (20kg cada), Gelo filtrado: 01 saco (10kg), Carvão
- **Maior (Sagarana, Gourmet 53, Malik):** Tripulação na churrasqueira, Gelo escama: 04 sacos (20kg cada), Gelo filtrado: 02 sacos (10kg cada), Carvão
- **Oceano (Catamarã Oceano):** Churrasqueira a gás, Churrasqueiro, Ajudante. ⚠️ GELO NÃO INCLUSO

**COMMIT:** `feat(lanchas): adicionar info churrasqueira por categoria`

---

### K6: Adicionar Obs Promocional na Listagem
**Arquivo:** `pages/lanchas/index.html`
- [ ] Adicionar: *Valores promocionais de seg-qui, não é válido para períodos festivos e feriados.

**COMMIT:** `fix(lanchas): adicionar obs promocional na listagem`

---

### K7: Remover Valores da Home e Roteiros
**Arquivos:** `index.html`, `pages/roteiros/index.html`, todas as páginas individuais de roteiros
- [ ] Remover preços dos cards de roteiros na home
- [ ] Remover preços da listagem de roteiros
- [ ] Remover preços das páginas individuais de roteiros

**COMMIT:** `fix(roteiros): remover valores da home e páginas de roteiros`

---

### K8: Dois Valores na Home para Lanchas Próprias
**Arquivo:** `index.html`
- [ ] Mostrar preço Seg-Qui e Sex-Dom nos cards de lanchas próprias
- [ ] Adicionar observações sobre valores promocionais

**COMMIT:** `feat(home): adicionar dois valores nas lanchas próprias`

---

### K9: Destaque Lanchas Eventos 30+ Pessoas
**Arquivo:** `index.html`
- [ ] Adicionar seção/destaque para lanchas de eventos (30+ pessoas)
- [ ] Incluir Barco Gourmet, Malik, Sagarana, Oceano

**COMMIT:** `feat(home): adicionar destaque para lanchas de eventos`

---

### K10: Popular Seção Serviços com Combo
**Arquivo:** `index.html`
- [ ] Adicionar card de Combo (Churrasco + Open Bar) na seção de serviços
- [ ] Incluir preços de combo

**COMMIT:** `feat(home): adicionar combo na seção de serviços`

---

### K11: Criar Seção "Conheça Nossos Clientes"
**Arquivo:** `index.html`
- [ ] Criar seção para influencers e atores que já passearam
- [ ] Placeholder para fotos de clientes famosos
- [ ] Design de carrossel ou grid

**COMMIT:** `feat(home): adicionar seção conheça nossos clientes`

---

### K12: Integração Google My Business Reviews
**Arquivos:** `index.html`, `js/reviews.js` (criar)
- [ ] Criar integração com Google My Business API
- [ ] Puxar avaliações 5 estrelas em tempo real
- [ ] Filtrar comentários com 100+ caracteres
- [ ] Implementar scroll automático
- [ ] Mostrar quantidade total de avaliações

**COMMIT:** `feat(home): integrar Google My Business reviews`

---

### K13: Criar Documentação Gerenciamento de Lanchas
**Arquivos:** `docs/GERENCIAR_LANCHAS.md`, atualizar `CLAUDE.md`
- [ ] Criar guia de como adicionar nova lancha
- [ ] Criar guia de como modificar lancha existente
- [ ] Criar guia de como remover lancha
- [ ] Referenciar no CLAUDE.md

**COMMIT:** `docs: criar guia de gerenciamento de lanchas`

---

## ✅ PROGRESSO FASE K

- [x] K1 - Nomenclatura roteiros ✅
- [x] K2 - Remover capacidade staff ✅
- [x] K3 - Reduzir destaque promocional ✅
- [x] K4 - Remover botões ligar ✅
- [x] K5 - Info churrasqueira ✅
- [x] K6 - Obs promocional listagem ✅
- [x] K7 - Remover valores roteiros ✅
- [x] K8 - Dois valores home ✅
- [x] K9 - Destaque eventos ✅
- [x] K10 - Combo serviços ✅
- [x] K11 - Seção clientes ✅
- [x] K12 - Google Reviews ✅
- [x] K13 - Doc gerenciamento ✅

**STATUS FASE K:** ✅ COMPLETO (13/13 tarefas)

---

## FASE L: AJUSTES VISUAIS E DE CONTEÚDO

### L1: Ajustar Info Churrasqueira nas Páginas de Lanchas
**Arquivos:** Todas as páginas de lanchas
- [ ] Mover informação da churrasqueira para ficar na mesma linha após "Churrasqueira R$ 250"
- [ ] Usar fonte menor para a descrição
- [ ] Layout: "Churrasqueira R$ 250 (Inclui: Tripulação, Gelo escama 2x20kg, Gelo filtrado 1x10kg, Carvão)"

**COMMIT:** `style(lanchas): ajustar layout info churrasqueira`

---

### L2: Remover Espaçamento entre Observações - Listagem Lanchas
**Arquivo:** `pages/lanchas/index.html`, `css/pages/frota.css`
- [ ] Juntar as duas linhas de observação (sem quebra de linha entre elas)
- [ ] "*Valores para o Roteiro 1 - Mureta da Urca. Consulte valores para outros roteiros."
- [ ] "*Valores promocionais de seg-qui não são válidos para períodos festivos e feriados."

**COMMIT:** `style(lanchas): remover espaçamento entre observações`

---

### L3: Botões de Roteiros como Âncoras - Página Roteiros
**Arquivo:** `pages/roteiros/index.html`, `css/pages/roteiros.css`
- [ ] Transformar os cards de cores dos roteiros em botões com âncoras
- [ ] Ao clicar, descer para a seção do roteiro dentro da mesma página
- [ ] IDs: #roteiro-1, #roteiro-2, etc.

**COMMIT:** `feat(roteiros): adicionar navegação por âncoras nos roteiros`

---

### L4: Padronizar Botão "Ver Roteiro" - Página Roteiros
**Arquivo:** `pages/roteiros/index.html`, `css/pages/roteiros.css`
- [ ] Ajustar estilo do botão para ficar consistente com o resto do site
- [ ] Usar classes padrão de botões (btn, btn-secondary, etc.)

**COMMIT:** `style(roteiros): padronizar botões ver roteiro`

---

### L5: Ajustar Duração nas Páginas de Roteiros
**Arquivos:** Todas as páginas de roteiros (index e individuais)
- [ ] Verificar e corrigir duração em todas as páginas
- [ ] Roteiro 1: 3h, Roteiro 2: 3h, Roteiro 3: 4h, Roteiro 4: 5h, Roteiro 5: 5h

**COMMIT:** `fix(roteiros): ajustar duração em todas as páginas`

---

### L6: Adicionar CTA Extra na Página de Roteiros
**Arquivo:** `pages/roteiros/index.html`
- [ ] Adicionar mais um CTA (Call to Action) para WhatsApp
- [ ] Posicionar estrategicamente na página

**COMMIT:** `feat(roteiros): adicionar CTA extra`

---

### L7: Ajustar Horários da Página Réveillon
**Arquivo:** `pages/ocasioes/reveillon.html`
- [ ] Verificar e corrigir horários (embarque, navegação, virada, retorno)
- [ ] Duração total: 5h no mar

**COMMIT:** `fix(reveillon): ajustar horários do passeio`

---

### L8: Ajustar Padding nos Elementos de Timeline - Réveillon
**Arquivo:** `pages/ocasioes/reveillon.html`, CSS
- [ ] Aumentar padding nos elementos de aspas ("20h", "21h", "00h", "4h")
- [ ] Melhorar espaçamento visual da timeline

**COMMIT:** `style(reveillon): ajustar padding na timeline`

---

### L9: Reordenar Seção Serviços - Combo Primeiro
**Arquivo:** `pages/servicos.html`
- [ ] Mover opção de Combo para antes de "Churrasco na Lancha"
- [ ] Combo deve ser a primeira opção mostrada

**COMMIT:** `feat(servicos): reordenar combo como primeira opção`

---

### L10: Adicionar "A partir de" nos Serviços da Home
**Arquivo:** `index.html`
- [ ] Adicionar "a partir de" antes dos valores na seção de serviços
- [ ] Adicionar observação: "*Valores variam de acordo com a quantidade de pessoas e tamanho da lancha."

**COMMIT:** `fix(home): adicionar 'a partir de' nos serviços`

---

### L11: Adicionar Obs de Valores na Página de Serviços
**Arquivo:** `pages/servicos.html`
- [ ] Adicionar observação: "*Valores variam de acordo com a quantidade de pessoas e tamanho da lancha."

**COMMIT:** `fix(servicos): adicionar observação de valores`

---

### L12: Ajustar Página Despedida de Solteira
**Arquivo:** `pages/ocasioes/despedida-solteira.html`
- [ ] Ajustar quantidade de horas do passeio (5h padrão)
- [ ] Remover informação "16 amigas por lancha"
- [ ] Adicionar "temos opções de 10 a 65 pessoas"

**COMMIT:** `fix(despedida): ajustar informações de capacidade e duração`

---

### L13: Cards de Lanchas na Página Despedida - Escolha Seu Pacote
**Arquivo:** `pages/ocasioes/despedida-solteira.html`
- [ ] Na seção "Escolha seu pacote", adicionar cards das lanchas próprias
- [ ] Adicionar cards das lanchas 30+ pessoas
- [ ] Adicionar botão "Ver todas as opções" abaixo

**COMMIT:** `feat(despedida): adicionar cards de lanchas na seção de pacotes`

---

### L14: Seção Depoimentos como na Home - Despedida
**Arquivo:** `pages/ocasioes/despedida-solteira.html`
- [ ] Implementar seção de depoimentos igual à home
- [ ] Puxar avaliações do Google My Business (mesmo formato da home)

**COMMIT:** `feat(despedida): adicionar seção de depoimentos do Google`

---

### L15: Cards de Lanchas na Página Corporativo
**Arquivo:** `pages/ocasioes/corporativo.html`
- [ ] Na seção "Escolha o formato ideal", adicionar cards das lanchas próprias
- [ ] Adicionar cards das lanchas 30+ pessoas
- [ ] Adicionar botão "Ver todas as opções" abaixo

**COMMIT:** `feat(corporativo): adicionar cards de lanchas`

---

### L16: Seção Avaliações GMB - Corporativo
**Arquivo:** `pages/ocasioes/corporativo.html`
- [ ] Adicionar seção de avaliações do Google (mesmo formato da home)

**COMMIT:** `feat(corporativo): adicionar seção de avaliações Google`

---

### L17: Ajustar Página Réveillon - Duração e Cards
**Arquivo:** `pages/ocasioes/reveillon.html`
- [ ] Ajustar duração para 5h no mar
- [ ] Adicionar cards de lanchas (próprias e 30+) como nas outras páginas
- [ ] Open bar, comida são ADICIONAIS (não inclusos)
- [ ] Decoração também é adicional/à parte
- [ ] Botão "Ver todas as opções" abaixo dos cards

**COMMIT:** `fix(reveillon): ajustar duração, cards e informações de adicionais`

---

### L18: Seção Avaliações GMB - Réveillon
**Arquivo:** `pages/ocasioes/reveillon.html`
- [ ] Adicionar seção de avaliações do Google (mesmo formato da home)

**COMMIT:** `feat(reveillon): adicionar seção de avaliações Google`

---

## ✅ PROGRESSO FASE L

- [x] L1 - Ajustar info churrasqueira layout
- [x] L2 - Remover espaçamento observações
- [x] L3 - Botões âncoras roteiros
- [x] L4 - Padronizar botão ver roteiro
- [x] L5 - Ajustar duração roteiros
- [x] L6 - CTA extra roteiros
- [x] L7 - Horários réveillon
- [x] L8 - Padding timeline réveillon
- [x] L9 - Reordenar serviços (combo primeiro)
- [x] L10 - "A partir de" serviços home
- [x] L11 - Obs valores página serviços
- [x] L12 - Ajustar despedida solteira
- [x] L13 - Cards lanchas despedida
- [x] L14 - Depoimentos GMB despedida
- [x] L15 - Cards lanchas corporativo
- [x] L16 - Avaliações GMB corporativo
- [x] L17 - Ajustar réveillon completo
- [x] L18 - Avaliações GMB réveillon

**STATUS FASE L:** ✅ COMPLETO (18/18 tarefas)

---

## FASE M: AJUSTES FINAIS E CORREÇÕES

### M1: Corrigir Duração Ilhas Cagarras
- [x] Alterar de "4-5 horas" para "5 horas" na página dedicada

### M2: Adicionar Contato no Menu
- [x] Adicionar link de Contato em todas as páginas (46 arquivos)

### M3: Atualizar Endereço
- [x] Schema.org: "Av. Infante Dom Henrique, S/N, Loja 06 - Marina da Glória"
- [x] Footer: incluir bairro Glória
- [x] CLAUDE.md: endereço completo com CEP

### M4: Ajustar Espaçamento Observações Home
- [x] Manter linhas separadas sem espaçamento extra

### M5: Ajustar Observações Página Lanchas
- [x] Separar em parágrafos distintos
- [x] Ajustar CSS para espaçamento mínimo

### M6: Padronizar Botões e CTAs Roteiros
- [x] Alterar "Ver Roteiro" para "Ver Detalhes"
- [x] Diferenciar CTA final do intermediário

### M7: Atualizar Página Sobre
- [x] Remover vestiários (não disponível)
- [x] Adicionar mini mercado, farmácia, restaurantes
- [x] Atualizar história com storytelling autêntico
- [x] Atualizar propósito, visão e valores

### M8: Fonte Menor na Observação Serviços
- [x] Alterar de --text-body-sm para --text-caption

### M9: Mover Info Churrasqueira Antes do Preço
- [x] Inverter ordem em 26 páginas de lanchas

**STATUS FASE M:** ✅ COMPLETO (9/9 tarefas)

---

## PRÓXIMAS FASES

- **FASE G** - Verificação Final (auditoria SEO, schemas, sitemap e links)
- **FASE H** - Mídias (aguardando imagens)
