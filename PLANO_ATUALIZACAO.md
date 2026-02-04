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

### F2.2: Verificar Mini FAQs em Todas as Páginas
**Arquivos:** Todas as páginas com mini FAQ
- [ ] Verificar consistência com FAQ principal
- [ ] Atualizar informações desatualizadas
- [ ] Verificar Schemas FAQPage

**A verificar:**
- [ ] `pages/lanchas/index.html`
- [ ] `pages/lanchas/weboat-32.html`
- [ ] `pages/lanchas/weboat-390.html`
- [ ] `pages/lanchas/weboat-oceanic-36.html`
- [ ] `pages/lanchas/weboat-rio-star-50.html`
- [ ] `pages/roteiros/index.html`
- [ ] `pages/roteiros/mureta-da-urca.html`
- [ ] `pages/roteiros/praia-vermelha.html`
- [ ] `pages/roteiros/copacabana.html`
- [ ] `pages/roteiros/ilhas-cagarras.html`
- [ ] `pages/roteiros/itaipu-camboinhas.html`
- [ ] `pages/roteiros/volta-completa.html`
- [ ] `pages/servicos.html`
- [ ] `pages/ocasioes/despedida-solteira.html`
- [ ] `pages/ocasioes/aniversario.html`
- [ ] `pages/ocasioes/corporativo.html`
- [ ] `pages/ocasioes/reveillon.html`
- [ ] `index.html`

**COMMIT:** `fix: atualizar mini FAQs em todas as páginas para consistência`

---

### F3: Mini FAQ - Sobre
**Arquivo:** `pages/sobre.html`
- [ ] Adicionar Mini FAQ sobre a empresa
- [ ] Atualizar números/estatísticas

**COMMIT:** `feat(sobre): adicionar mini FAQ e atualizar dados`

---

### F4: Mini FAQ - Contato
**Arquivo:** `pages/contato.html`
- [ ] Adicionar Mini FAQ sobre contato/reservas
- [ ] Verificar informações de contato

**COMMIT:** `feat(contato): adicionar mini FAQ`

---

### F5: SEO e Schema - FAQ e Suporte
**Arquivos:** `pages/faq.html`, `pages/sobre.html`, `pages/contato.html`
- [x] Verificar Schema FAQPage completo (faq.html)
- [ ] Verificar Schema AboutPage
- [ ] Verificar Schema ContactPage
- [ ] Verificar meta tags em todas

**COMMIT:** `chore(suporte): verificar e ajustar SEO e schemas`

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

## 📋 RESUMO DOS COMMITS (33 total)

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
- [x] **FASE F** - FAQ Principal ✅ (F1, F2, F2.1 concluídas)
- [ ] **FASE F** - Mini FAQs (F2.2 - verificar consistência em todas as páginas)
- [ ] **FASE F** - Sobre e Contato (F3, F4, F5)
- [ ] **FASE G** - Verificação Final (4 commits)
- [ ] **FASE H** - Mídias (5 commits)

**Total: ~37 commits planejados**

---

**STATUS:** FAQ principal completo. Próximo: **F2.2 - Verificar Mini FAQs** em todas as páginas para garantir consistência com as novas informações.
