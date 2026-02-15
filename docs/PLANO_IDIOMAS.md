# Plano de Internacionalizacao - WeBoat Site

> **Versao:** 1.0 | **Data:** 2026-02-15

## Resumo

Site traduzido para EN e ES usando subdiretorios (`/en/`, `/es/`). Slugs traduzidos por idioma. R$ (BRL) em todos os idiomas. Lanchas parceiras apenas em PT.

## Estrutura

- **PT (raiz):** 55 paginas (existentes)
- **EN (`/en/`):** 38 paginas (5 lanchas proprias + compare, sem parceiras)
- **ES (`/es/`):** 38 paginas (idem)

## URL Registry

Fonte canonica: `docs/i18n-registry.json`

## Language Detection

- Baseada na URL (`/en/` -> en, `/es/` -> es, raiz -> pt)
- Module: `js/i18n.js`
- Sem redirect automatico (sem deteccao de browser language)

## hreflang Tags

Todas as paginas incluem 4 tags hreflang no head.

## Language Switcher

Dropdown com bandeiras no header. Navega direto para a versao equivalente da pagina atual.

## Convencoes

1. Cada pagina traduzida inclui: `<!-- i18n: translated from PT version 2026-02-15 -->`
2. Nomes de lanchas e lugares permanecem em PT em todos os idiomas
3. Moeda sempre R$ (BRL)
4. WhatsApp messages no idioma da pagina
5. Caminhos CSS/JS absolutos (funcionam de qualquer subdiretorio)

## Manutencao

Ao modificar conteudo de qualquer pagina PT, atualizar as versoes EN e ES equivalentes.
