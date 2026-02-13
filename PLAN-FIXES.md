# Plano Faseado — Correções e Otimizações WeBoat Site

> Cada fase = 1 commit + 1 deploy. Fazer `/clear` entre fases para limpar contexto.

---

## Fase 1: Correções Críticas (checkout + dropdown teclado)
**Escopo:** 3 arquivos | ~10 edits
**Commit:** `fix: checkout broken links/logo + keyboard-accessible dropdown`

1. `checkout/index.html:42` — trocar `logo-branco.svg` → `logo-white.svg`
2. `checkout/index.html:169` — trocar `/termos/` → `/termos-de-uso/`
3. `checkout/index.html:169` — trocar `/privacidade/` → `/politica-de-privacidade/`
4. `css/header.css` — adicionar `:focus-within` no dropdown para funcionar com teclado:
   ```css
   .header__dropdown:focus-within .header__dropdown-menu {
     opacity: 1; visibility: visible; transform: translateY(0);
   }
   ```

---

## Fase 2: Acessibilidade — Phosphor Icons + Checkout ARIA
**Escopo:** ~54 HTML files + checkout
**Commit:** `a11y: aria-hidden on decorative icons, checkout ARIA improvements`

1. **Todas as páginas:** adicionar `aria-hidden="true"` em todos os `<i class="ph ph-*">` decorativos (~85 por página, ~54 páginas)
2. `checkout/index.html` — payment method divs: adicionar `aria-label` em cada um
3. `checkout/index.html` — loading div: adicionar `role="status" aria-live="polite"`
4. `checkout/index.html` — error div: adicionar `role="alert" aria-live="assertive"`
5. `checkout/index.html` — confirmation div: adicionar `role="status" aria-live="polite"`
6. `checkout/index.html` — required fields: adicionar `aria-required="true"` e marcador visual `*`
7. `checkout/index.html` — form errors: adicionar `aria-describedby` nos inputs

---

## Fase 3: Comprimir imagens grandes (>300KB) + gerar WebP faltantes
**Escopo:** ~40 imagens
**Commit:** `perf: compress large images + generate missing WebP variants`

### Comprimir (>300KB):
- `blog/melhores-praias-lancha.jpg` (376KB)
- `hero/equipe-weboat.jpg` (372KB)
- `roteiros/itaipu-hero-1600.jpg` (363KB)
- `hero/sobre-hero.jpg` (360KB)
- `lanchas/parceiras/weboat-rival-36-8.jpg` (356KB)
- `ocasioes/carnaval-hero.jpg` (324KB)
- `ocasioes/reveillon-hero.jpg` (322KB)

### Gerar WebP faltantes:
**sobre/ (5):** equipe-1, equipe-3, equipe-4, historia-weboat, marina-gloria
**blog/ (4):** marina-da-gloria, melhores-praias-lancha, o-que-vestir-lancha, praias-lancha-rj-card
**ocasioes/ (16):** aniversario-extras, aniversario-galeria-{1,3,5}, despedida-{extras,galeria-1..5}, reveillon-{galeria-1..5,inclui}
**roteiros/ (6):** copacabana-hero, copacabana, ilhas-cagarras-hero, ilhas-cagarras, praia-vermelha-hero, praia-vermelha

---

## Fase 4: width/height em imagens + fetchpriority nos heroes
**Escopo:** ~20 HTML files
**Commit:** `perf: add width/height to images for CLS, fetchpriority on hero images`

1. `sobre/index.html` — adicionar `width` e `height` em todas as `<img>` sem essas attrs
2. Todas as páginas com hero image (exceto homepage que já tem):
   - Mudar `loading="lazy"` → `loading="eager"` no hero
   - Adicionar `fetchpriority="high"` e `decoding="sync"`
   - Páginas: sobre, roteiros/*, ocasioes/*, blog/*, lanchas/*
3. Verificar outras páginas com `<img>` sem width/height

---

## Fase 5: CSS async em páginas internas
**Escopo:** ~50 HTML files
**Commit:** `perf: async load components.css and footer.css on non-homepage pages`

1. Em todas as páginas internas (exceto homepage que já está otimizada):
   - `components.css` → `media="print" onload="this.media='all'"` + `<noscript>`
   - `footer.css` → `media="print" onload="this.media='all'"` + `<noscript>`
2. Manter `variables.css`, `header.css` e page-specific CSS como render-blocking (necessários above-fold)
3. Inline critical component styles (`.btn`, `.whatsapp-float`) como feito na homepage

---

## Fase 6: Limpeza de dead code
**Escopo:** ~3 files
**Commit:** `chore: remove unused proposal-builder.js`

1. Verificar e confirmar que `js/proposal-builder.js` não é referenciado em nenhum HTML
2. Remover o arquivo se confirmado como dead code
3. **NÃO remover** lancha-detalhe.css, comparativo.css, areas-atendidas.css — esses SÃO usados por 27 páginas de lanchas

---

## Resumo

| Fase | Tipo | Arquivos | Impacto |
|------|------|----------|---------|
| 1 | Bugs críticos | 3 | Checkout funcional + teclado |
| 2 | Acessibilidade | ~54 | WCAG compliance |
| 3 | Imagens | ~40 | -20-35% tamanho |
| 4 | CLS + LCP | ~20 | Core Web Vitals |
| 5 | CSS async | ~50 | FCP mais rápido |
| 6 | Limpeza | 1-3 | Menos dead code |

**Total: 6 fases, 6 commits, 6 deploys**
