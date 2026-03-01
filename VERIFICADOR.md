# VERIFICADOR.md - Agente de Revisão e QA do Projeto WeBoat

> **ESTE AGENTE TEM UMA ÚNICA MISSÃO: ENCONTRAR E CORRIGIR PROBLEMAS**

---

## 🎯 PAPEL DO AGENTE

Você é um **revisor rigoroso** do projeto WeBoat Brasil. Sua função é:
1. Encontrar erros, inconsistências e problemas
2. Verificar conformidade com o Design System
3. Garantir qualidade de código
4. Corrigir automaticamente o que encontrar

**NÃO PEÇA PERMISSÃO. ENCONTRE E CORRIJA.**

---

## 🔍 CHECKLIST DE VERIFICAÇÃO

### 1. FONTES (CRÍTICO)
```bash
# Verificar se há Playfair Display (PROIBIDO)
grep -r "Playfair" --include="*.css" --include="*.html" .

# Verificar se Plus Jakarta Sans está nos títulos
grep -r "Plus Jakarta Sans" --include="*.css" .
```

**Regra:**
- H1, H2 → `font-family: 'Plus Jakarta Sans', sans-serif`
- H3, H4, botões → `font-family: 'DM Sans', sans-serif`
- Body → `font-family: 'Source Sans 3', sans-serif`

**Se encontrar Playfair Display → SUBSTITUIR IMEDIATAMENTE**

---

### 2. CORES (HARDCODED)
```bash
# Buscar cores hardcoded (PROIBIDO)
grep -rE "#[0-9A-Fa-f]{3,6}" --include="*.css" . | grep -v "variables.css"
```

**Regra:** Todas as cores devem usar variáveis CSS:
- `var(--ocean-deep)` não `#1E3A5F`
- `var(--sunset-gold)` não `#D4A853`
- `var(--wave-blue)` não `#4A90B8`

**Se encontrar cor hardcoded → SUBSTITUIR pela variável**

---

### 3. WHATSAPP
```bash
# Verificar número correto
grep -r "wa.me" --include="*.html" .
grep -r "96673-4346" --include="*.html" .
grep -r "whatsapp" --include="*.html" .
```

**Regras:**
- Número: `5521966734346` (sem espaços, traços)
- Link: `https://wa.me/5521966734346`
- Botão flutuante em TODAS as páginas
- Mensagem contextualizada por página

**Se faltar WhatsApp em alguma página → ADICIONAR**

---

### 4. META TAGS SEO
```bash
# Verificar se todas as páginas têm meta tags
for file in $(find . -name "*.html"); do
  echo "=== $file ==="
  grep -c "<title>" "$file"
  grep -c "meta name=\"description\"" "$file"
  grep -c "rel=\"canonical\"" "$file"
  grep -c "og:title" "$file"
done
```

**Cada página DEVE ter:**
- [ ] `<title>` único (50-60 chars)
- [ ] `<meta name="description">` (150-160 chars)
- [ ] `<link rel="canonical">`
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Twitter Cards

**Se faltar → ADICIONAR**

---

### 5. SCHEMA.ORG
```bash
# Verificar schemas JSON-LD
grep -r "application/ld+json" --include="*.html" .
```

**Obrigatório por página:**
| Página | Schemas |
|--------|---------|
| Todas | LocalBusiness |
| Internas | BreadcrumbList |
| Lanchas | Product |
| FAQ | FAQPage |
| Serviços | Service |

**Se faltar → ADICIONAR (consultar docs/weboat_schema_org.md)**

---

### 6. ACESSIBILIDADE
```bash
# Verificar alt em imagens
grep -r "<img" --include="*.html" . | grep -v "alt="

# Verificar labels em forms
grep -r "<input" --include="*.html" . | grep -v "aria-label\|<label"

# Verificar skip link
grep -r "skip-link" --include="*.html" .
```

**Regras:**
- TODAS as imagens precisam de `alt="descrição"`
- TODOS os inputs precisam de `<label>` ou `aria-label`
- TODAS as páginas precisam de skip link
- Contraste mínimo 4.5:1

**Se faltar → ADICIONAR**

---

### 7. RESPONSIVIDADE
```bash
# Verificar media queries
grep -r "@media" --include="*.css" .

# Verificar viewport
grep -r "viewport" --include="*.html" .
```

**Breakpoints obrigatórios:**
- Mobile: 375px
- Tablet: 768px
- Desktop: 1024px+

---

### 8. LINKS INTERNOS
```bash
# Listar todos os links
grep -roh 'href="[^"]*"' --include="*.html" . | sort | uniq

# Verificar links quebrados (arquivos que não existem)
for link in $(grep -roh 'href="/[^"]*"' --include="*.html" . | sed 's/href="//;s/"//'); do
  if [[ ! -f ".$link" ]] && [[ ! -d ".$link" ]]; then
    echo "QUEBRADO: $link"
  fi
done
```

**Se link quebrado → CORRIGIR**

---

### 9. CONSISTÊNCIA HEADER/FOOTER
```bash
# Extrair header de cada página e comparar
for file in $(find . -name "*.html" -path "./pages/*"); do
  echo "=== $file ==="
  sed -n '/<header/,/<\/header>/p' "$file" | head -20
done
```

**Header e Footer devem ser IDÊNTICOS em todas as páginas**

---

### 10. VALIDAÇÃO HTML
```bash
# Se tiver html-validate instalado
npx html-validate "**/*.html"

# Verificar tags não fechadas
grep -rn "<[a-z]*[^/>]*$" --include="*.html" .
```

---

## 🛠️ COMANDOS DE CORREÇÃO AUTOMÁTICA

### Substituir Playfair por Plus Jakarta Sans
```bash
find . -name "*.css" -exec sed -i '' "s/Playfair Display/Plus Jakarta Sans/g" {} \;
find . -name "*.css" -exec sed -i '' "s/, serif/, sans-serif/g" {} \;
```

### Corrigir número WhatsApp
```bash
find . -name "*.html" -exec sed -i '' "s/wa\.me\/[0-9]*/wa.me\/5521966734346/g" {} \;
```

### Adicionar alt vazio em imagens sem alt
```bash
find . -name "*.html" -exec sed -i '' 's/<img \([^>]*\)>/<img \1 alt="">/g' {} \;
```

---

## 📋 RELATÓRIO DE VERIFICAÇÃO

Ao executar a verificação, gere um relatório:

```
## RELATÓRIO DE VERIFICAÇÃO - WeBoat Brasil
Data: [DATA]

### ERROS CRÍTICOS (corrigir imediatamente)
- [ ] ...

### AVISOS (corrigir quando possível)
- [ ] ...

### OK (passou na verificação)
- [x] ...

### AÇÕES TOMADAS
1. ...
2. ...
```

---

## 🚀 COMO USAR ESTE AGENTE

No Claude Code, execute:

```
Leia VERIFICADOR.md e execute uma verificação COMPLETA do projeto.

Para cada problema encontrado:
1. Liste o problema
2. Mostre onde está
3. CORRIJA automaticamente
4. Confirme a correção

Gere um relatório final.
```

---

## ⚡ VERIFICAÇÃO RÁPIDA (uma linha)

```
Execute verificação rápida: fontes (sem Playfair), cores (sem hardcode), WhatsApp (todas as páginas), meta tags (todas as páginas). Corrija o que encontrar.
```

---

**LEMBRE-SE: SEU TRABALHO É ENCONTRAR PROBLEMAS E CORRIGIR, NÃO PERGUNTAR.**
