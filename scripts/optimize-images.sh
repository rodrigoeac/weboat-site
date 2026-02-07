#!/bin/bash

# ============================================
# OPTIMIZE-IMAGES.SH - WeBoat Brasil
# Converte JPGs para WebP com tamanhos responsivos
# Requer: cwebp (libwebp), ImageMagick 7+
# Uso: ./scripts/optimize-images.sh [--dry-run]
# ============================================

set -euo pipefail

# --- Configuracao ---
IMAGES_DIR="assets/images"
ORIGINALS_DIR="assets/images-originals"
WEBP_QUALITY=82
JPEG_QUALITY=85

# Tamanhos responsivos por contexto
SIZE_CARD=400       # Cards de listagem
SIZE_GALLERY=800    # Galeria e detalhes
SIZE_HERO=1600      # Hero sections

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

DRY_RUN=false
if [[ "${1:-}" == "--dry-run" ]]; then
    DRY_RUN=true
    echo -e "${YELLOW}MODO DRY-RUN: nenhum arquivo sera modificado${NC}"
    echo ""
fi

# --- Verificar dependencias ---
check_deps() {
    local missing=0
    for cmd in cwebp magick; do
        if ! command -v "$cmd" &>/dev/null; then
            echo -e "${RED}ERRO: '$cmd' nao encontrado. Instale com:${NC}"
            if [[ "$cmd" == "cwebp" ]]; then
                echo "  brew install webp"
            else
                echo "  brew install imagemagick"
            fi
            missing=1
        fi
    done
    if [[ $missing -eq 1 ]]; then
        exit 1
    fi
    echo -e "${GREEN}Dependencias OK: cwebp $(cwebp -version 2>&1 | head -1), $(magick --version | head -1 | cut -d' ' -f1-3)${NC}"
}

# --- Backup originais ---
backup_originals() {
    echo -e "\n${BLUE}=== BACKUP DOS ORIGINAIS ===${NC}"

    if [[ -d "$ORIGINALS_DIR" ]]; then
        echo "Backup ja existe em $ORIGINALS_DIR — pulando."
        return
    fi

    if $DRY_RUN; then
        echo "[DRY-RUN] Criaria $ORIGINALS_DIR com copia de $IMAGES_DIR"
        return
    fi

    echo "Copiando originais para $ORIGINALS_DIR..."
    cp -R "$IMAGES_DIR" "$ORIGINALS_DIR"

    local orig_size
    orig_size=$(du -sh "$ORIGINALS_DIR" | cut -f1)
    echo -e "${GREEN}Backup completo: $orig_size${NC}"
}

# --- Converter uma imagem ---
# Gera versoes WebP responsivas e redimensiona o JPG original
convert_image() {
    local src="$1"
    local dir
    dir=$(dirname "$src")
    local filename
    filename=$(basename "$src" .jpg)
    filename=$(basename "$filename" .jpeg)

    # Obter dimensoes originais
    local orig_width
    orig_width=$(magick identify -format "%w" "$src" 2>/dev/null) || return 0

    local sizes_generated=0

    # Determinar quais tamanhos gerar baseado no contexto do diretorio
    local sizes=()
    local max_size=$SIZE_GALLERY  # default: gallery size

    case "$dir" in
        */hero)
            sizes=($SIZE_HERO $SIZE_GALLERY)
            max_size=$SIZE_HERO
            ;;
        */roteiros)
            # Roteiros tem hero e card
            if [[ "$filename" == *"-hero"* ]]; then
                sizes=($SIZE_HERO $SIZE_GALLERY)
                max_size=$SIZE_HERO
            else
                sizes=($SIZE_GALLERY $SIZE_CARD)
                max_size=$SIZE_GALLERY
            fi
            ;;
        */og)
            # OG images: manter tamanho original (1200x630 para social)
            sizes=()
            max_size=1200
            ;;
        *)
            # Lanchas e parceiras: card + gallery
            sizes=($SIZE_GALLERY $SIZE_CARD)
            max_size=$SIZE_GALLERY
            ;;
    esac

    # Gerar WebP no tamanho base (mesmo nome, .webp)
    if $DRY_RUN; then
        echo "  [DRY-RUN] $src -> ${dir}/${filename}.webp (+ variantes)"
        return
    fi

    # Redimensionar JPG original se maior que max_size (economiza banda para fallback)
    if [[ $orig_width -gt $max_size ]]; then
        magick "$src" -resize "${max_size}x>" -quality $JPEG_QUALITY -strip "$src"
    else
        # Apenas re-comprimir sem resize
        magick "$src" -quality $JPEG_QUALITY -strip "$src"
    fi

    # WebP base (mesmo nome, sem sufixo de tamanho)
    cwebp -q $WEBP_QUALITY -m 6 "$src" -o "${dir}/${filename}.webp" 2>/dev/null
    ((sizes_generated++))

    # Gerar variantes responsivas com sufixo de largura
    for size in "${sizes[@]}"; do
        if [[ $orig_width -ge $size ]] || [[ $max_size -ge $size ]]; then
            local out_webp="${dir}/${filename}-${size}w.webp"
            magick "$src" -resize "${size}x>" -strip png:- 2>/dev/null | \
                cwebp -q $WEBP_QUALITY -m 6 -- -o "$out_webp" 2>/dev/null || \
                magick "$src" -resize "${size}x>" -quality $JPEG_QUALITY -strip "/tmp/weboat-temp-$$.jpg" 2>/dev/null && \
                cwebp -q $WEBP_QUALITY -m 6 "/tmp/weboat-temp-$$.jpg" -o "$out_webp" 2>/dev/null && \
                rm -f "/tmp/weboat-temp-$$.jpg"
            ((sizes_generated++))
        fi
    done

    echo -e "  ${GREEN}OK${NC} $src ($sizes_generated variantes WebP)"
}

# --- Processar diretorio ---
process_directory() {
    local dir="$1"
    local label="$2"

    echo -e "\n${BLUE}=== $label ===${NC}"

    local count=0
    local total
    total=$(find "$dir" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) 2>/dev/null | wc -l | tr -d ' ')

    if [[ $total -eq 0 ]]; then
        echo "  Nenhuma imagem encontrada."
        return
    fi

    echo "  Processando $total imagens..."

    while IFS= read -r img; do
        convert_image "$img"
        ((count++))
    done < <(find "$dir" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) | sort)

    echo -e "  ${GREEN}Concluido: $count imagens${NC}"
}

# --- Main ---
main() {
    echo "============================================"
    echo "  OTIMIZADOR DE IMAGENS - WeBoat Brasil"
    echo "============================================"
    echo ""

    # Verificar que estamos na raiz do projeto
    if [[ ! -f "CLAUDE.md" ]] || [[ ! -d "$IMAGES_DIR" ]]; then
        echo -e "${RED}ERRO: Execute este script da raiz do projeto weboat-site/${NC}"
        exit 1
    fi

    check_deps
    backup_originals

    local start_size
    start_size=$(du -sm "$IMAGES_DIR" | cut -f1)
    echo -e "\n${BLUE}Tamanho atual: ${start_size}MB${NC}"

    # Processar cada diretorio
    process_directory "$IMAGES_DIR/hero"              "HERO (${SIZE_HERO}w + ${SIZE_GALLERY}w)"
    process_directory "$IMAGES_DIR/roteiros"           "ROTEIROS (${SIZE_GALLERY}w + ${SIZE_CARD}w)"
    process_directory "$IMAGES_DIR/lanchas"            "LANCHAS (${SIZE_GALLERY}w + ${SIZE_CARD}w)"
    process_directory "$IMAGES_DIR/lanchas/parceiras"  "PARCEIRAS (${SIZE_GALLERY}w + ${SIZE_CARD}w)"
    process_directory "$IMAGES_DIR/og"                 "OG/SOCIAL (manter dimensao)"

    # Relatorio final
    echo ""
    echo "============================================"
    echo "  RELATORIO FINAL"
    echo "============================================"

    if ! $DRY_RUN; then
        local end_size
        end_size=$(du -sm "$IMAGES_DIR" | cut -f1)
        local webp_count
        webp_count=$(find "$IMAGES_DIR" -name "*.webp" | wc -l | tr -d ' ')
        local jpg_count
        jpg_count=$(find "$IMAGES_DIR" \( -iname "*.jpg" -o -iname "*.jpeg" \) | wc -l | tr -d ' ')

        echo ""
        echo -e "  JPGs recomprimidos:  ${GREEN}$jpg_count${NC}"
        echo -e "  WebPs gerados:       ${GREEN}$webp_count${NC}"
        echo -e "  Antes:               ${YELLOW}${start_size}MB${NC}"
        echo -e "  Depois:              ${GREEN}${end_size}MB${NC}"
        echo -e "  Economia:            ${GREEN}$((start_size - end_size))MB${NC}"
        echo ""

        if [[ -d "$ORIGINALS_DIR" ]]; then
            local backup_size
            backup_size=$(du -sh "$ORIGINALS_DIR" | cut -f1)
            echo -e "  Backup originais:    $ORIGINALS_DIR ($backup_size)"
        fi
    fi

    echo ""
    echo -e "${GREEN}Otimizacao concluida!${NC}"
}

main "$@"
