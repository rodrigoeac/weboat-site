#!/bin/bash

# ============================================
# VERIFICADOR AUTOMÁTICO - WEBOAT BRASIL
# Execute: ./scripts/verificar.sh
# ============================================

echo "🔍 VERIFICADOR WEBOAT - Iniciando..."
echo "========================================"
echo ""

ERRORS=0
WARNINGS=0

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# --------------------------------------------
# 1. VERIFICAR FONTES PROIBIDAS
# --------------------------------------------
echo "1️⃣  Verificando fontes..."

PLAYFAIR=$(grep -r "Playfair" --include="*.css" --include="*.html" . 2>/dev/null | wc -l)
if [ "$PLAYFAIR" -gt 0 ]; then
    echo -e "${RED}❌ ERRO: Encontrado 'Playfair Display' ($PLAYFAIR ocorrências)${NC}"
    grep -r "Playfair" --include="*.css" --include="*.html" . 2>/dev/null
    ((ERRORS++))
else
    echo -e "${GREEN}✅ OK: Nenhum Playfair Display encontrado${NC}"
fi

JAKARTA=$(grep -r "Plus Jakarta Sans" --include="*.css" . 2>/dev/null | wc -l)
if [ "$JAKARTA" -gt 0 ]; then
    echo -e "${GREEN}✅ OK: Plus Jakarta Sans encontrado ($JAKARTA ocorrências)${NC}"
else
    echo -e "${YELLOW}⚠️  AVISO: Plus Jakarta Sans não encontrado nos CSS${NC}"
    ((WARNINGS++))
fi

echo ""

# --------------------------------------------
# 2. VERIFICAR CORES HARDCODED
# --------------------------------------------
echo "2️⃣  Verificando cores hardcoded..."

HARDCODED=$(grep -rE "#[0-9A-Fa-f]{6}" --include="*.css" . 2>/dev/null | grep -v "variables.css" | wc -l)
if [ "$HARDCODED" -gt 0 ]; then
    echo -e "${YELLOW}⚠️  AVISO: Encontradas $HARDCODED cores hardcoded (fora de variables.css)${NC}"
    grep -rE "#[0-9A-Fa-f]{6}" --include="*.css" . 2>/dev/null | grep -v "variables.css" | head -10
    ((WARNINGS++))
else
    echo -e "${GREEN}✅ OK: Nenhuma cor hardcoded encontrada${NC}"
fi

echo ""

# --------------------------------------------
# 3. VERIFICAR WHATSAPP
# --------------------------------------------
echo "3️⃣  Verificando WhatsApp..."

HTML_FILES=$(find . -name "*.html" -not -path "./node_modules/*" 2>/dev/null | wc -l)
WHATSAPP_FILES=$(grep -rl "wa.me/5521977724114" --include="*.html" . 2>/dev/null | wc -l)

echo "   Arquivos HTML: $HTML_FILES"
echo "   Com WhatsApp correto: $WHATSAPP_FILES"

if [ "$HTML_FILES" -gt 0 ] && [ "$WHATSAPP_FILES" -lt "$HTML_FILES" ]; then
    echo -e "${YELLOW}⚠️  AVISO: Algumas páginas podem estar sem WhatsApp${NC}"
    ((WARNINGS++))
else
    echo -e "${GREEN}✅ OK: WhatsApp presente${NC}"
fi

# Verificar número errado
WRONG_NUMBER=$(grep -r "wa.me" --include="*.html" . 2>/dev/null | grep -v "5521977724114" | wc -l)
if [ "$WRONG_NUMBER" -gt 0 ]; then
    echo -e "${RED}❌ ERRO: Número WhatsApp incorreto encontrado${NC}"
    grep -r "wa.me" --include="*.html" . 2>/dev/null | grep -v "5521977724114"
    ((ERRORS++))
fi

echo ""

# --------------------------------------------
# 4. VERIFICAR META TAGS
# --------------------------------------------
echo "4️⃣  Verificando meta tags SEO..."

for file in $(find . -name "*.html" -not -path "./node_modules/*" -not -path "./templates/*" 2>/dev/null); do
    TITLE=$(grep -c "<title>" "$file" 2>/dev/null)
    DESC=$(grep -c 'meta name="description"' "$file" 2>/dev/null)
    
    if [ "$TITLE" -eq 0 ] || [ "$DESC" -eq 0 ]; then
        echo -e "${YELLOW}⚠️  $file - Title: $TITLE, Description: $DESC${NC}"
        ((WARNINGS++))
    fi
done

echo -e "${GREEN}✅ Verificação de meta tags concluída${NC}"
echo ""

# --------------------------------------------
# 5. VERIFICAR IMAGENS SEM ALT
# --------------------------------------------
echo "5️⃣  Verificando acessibilidade (alt em imagens)..."

# Conta total de <img e alt= em cada arquivo para comparação
NO_ALT_FILES=""
for file in $(find . -name "*.html" -not -path "./node_modules/*" 2>/dev/null); do
    IMG_COUNT=$(grep -c '<img' "$file" 2>/dev/null || echo "0")
    ALT_COUNT=$(grep -c 'alt=' "$file" 2>/dev/null || echo "0")
    if [ "$IMG_COUNT" -gt "$ALT_COUNT" ]; then
        NO_ALT_FILES="$NO_ALT_FILES $file"
    fi
done

if [ -n "$NO_ALT_FILES" ]; then
    echo -e "${RED}❌ ERRO: Possíveis imagens sem alt em:${NC}"
    echo "$NO_ALT_FILES"
    ((ERRORS++))
else
    echo -e "${GREEN}✅ OK: Todas as imagens têm alt${NC}"
fi

echo ""

# --------------------------------------------
# 6. VERIFICAR SCHEMA.ORG
# --------------------------------------------
echo "6️⃣  Verificando Schema.org..."

SCHEMA_COUNT=$(grep -r "application/ld+json" --include="*.html" . 2>/dev/null | wc -l)
echo "   Schemas JSON-LD encontrados: $SCHEMA_COUNT"

if [ "$SCHEMA_COUNT" -eq 0 ] && [ "$HTML_FILES" -gt 0 ]; then
    echo -e "${YELLOW}⚠️  AVISO: Nenhum Schema.org encontrado${NC}"
    ((WARNINGS++))
else
    echo -e "${GREEN}✅ OK: Schema.org presente${NC}"
fi

echo ""

# --------------------------------------------
# 7. VERIFICAR ESTRUTURA DE PASTAS
# --------------------------------------------
echo "7️⃣  Verificando estrutura de pastas..."

REQUIRED_DIRS=("css" "css/pages" "js" "pages" "pages/lanchas" "pages/roteiros" "pages/ocasioes" "assets" "assets/images" "templates" "docs")

for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo -e "   ${GREEN}✅ $dir${NC}"
    else
        echo -e "   ${YELLOW}⚠️  $dir (não existe)${NC}"
        ((WARNINGS++))
    fi
done

echo ""

# --------------------------------------------
# 8. VERIFICAR ARQUIVOS ESSENCIAIS
# --------------------------------------------
echo "8️⃣  Verificando arquivos essenciais..."

REQUIRED_FILES=("CLAUDE.md" "css/variables.css" "css/components.css" "templates/template-page.html")

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "   ${GREEN}✅ $file${NC}"
    else
        echo -e "   ${RED}❌ $file (FALTANDO)${NC}"
        ((ERRORS++))
    fi
done

echo ""

# --------------------------------------------
# RELATÓRIO FINAL
# --------------------------------------------
echo "========================================"
echo "📊 RELATÓRIO FINAL"
echo "========================================"
echo ""
echo -e "   Erros críticos: ${RED}$ERRORS${NC}"
echo -e "   Avisos: ${YELLOW}$WARNINGS${NC}"
echo ""

if [ "$ERRORS" -eq 0 ] && [ "$WARNINGS" -eq 0 ]; then
    echo -e "${GREEN}🎉 PERFEITO! Nenhum problema encontrado.${NC}"
elif [ "$ERRORS" -eq 0 ]; then
    echo -e "${YELLOW}⚠️  Projeto OK, mas há avisos para revisar.${NC}"
else
    echo -e "${RED}❌ ATENÇÃO: Há erros críticos que precisam ser corrigidos!${NC}"
fi

echo ""
echo "========================================"
exit $ERRORS
