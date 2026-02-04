# Guia de Otimização de Imagens - WeBoat Brasil

> **Status:** Pendente de implementação
> **Impacto:** Alto (melhora LCP em ~40%)

---

## 1. Conversão para WebP

### Por que WebP?
- **30-50% menor** que JPEG com mesma qualidade
- Suportado por 97%+ dos navegadores (2026)
- Fallback simples com `<picture>`

### Ferramentas Instaladas

```bash
# Já instaladas neste projeto:
brew install webp imagemagick oxipng jpegoptim svgo

# Ferramentas disponíveis:
# - cwebp     → Converter para WebP
# - convert   → Redimensionar (ImageMagick)
# - oxipng    → Otimizar PNG (lossless)
# - jpegoptim → Otimizar JPEG
# - svgo      → Otimizar SVG
```

### Comandos Básicos

```bash
# Converter para WebP
cwebp -q 80 input.jpg -o output.webp

# Converter todas as imagens de uma pasta
for f in *.jpg; do cwebp -q 80 "$f" -o "${f%.jpg}.webp"; done

# Otimizar JPEG (sem perda de qualidade visual)
jpegoptim --strip-all --max=85 image.jpg

# Otimizar PNG (lossless)
oxipng -o 4 --strip all image.png

# Otimizar SVG
svgo input.svg -o output.svg
```

### Qualidade Recomendada por Tipo

| Tipo de Imagem | Qualidade WebP | Tamanho Alvo |
|----------------|----------------|--------------|
| Hero (acima da dobra) | 85 | < 150KB |
| Lanchas (cards) | 80 | < 80KB |
| Roteiros (cards) | 80 | < 80KB |
| Galerias (lightbox) | 75 | < 100KB |
| Backgrounds | 70 | < 120KB |
| OG Images | 85 | < 100KB |

---

## 2. Redimensionamento Responsivo

### Tamanhos Recomendados

```
Hero Desktop:     1920 x 1080 (ou 1600 x 900)
Hero Tablet:      1024 x 768
Hero Mobile:      640 x 480

Cards Lanchas:    400 x 300 (desktop) / 320 x 240 (mobile)
Cards Roteiros:   400 x 250
Galeria Thumb:    300 x 200
Galeria Full:     1200 x 800

OG Image:         1200 x 630 (obrigatório)
```

### Implementação com srcset

```html
<!-- Antes -->
<img src="/assets/images/lanchas/weboat-32.jpg" alt="WeBoat 32">

<!-- Depois -->
<picture>
  <source
    type="image/webp"
    srcset="/assets/images/lanchas/weboat-32-400.webp 400w,
            /assets/images/lanchas/weboat-32-800.webp 800w"
    sizes="(max-width: 768px) 100vw, 400px">
  <img
    src="/assets/images/lanchas/weboat-32-400.jpg"
    srcset="/assets/images/lanchas/weboat-32-400.jpg 400w,
            /assets/images/lanchas/weboat-32-800.jpg 800w"
    sizes="(max-width: 768px) 100vw, 400px"
    alt="WeBoat 32 - Lancha para 15 pessoas"
    loading="lazy"
    decoding="async"
    width="400"
    height="300">
</picture>
```

---

## 3. Lazy Loading Nativo vs JavaScript

### Usar `loading="lazy"` nativo quando:
- Imagem está **abaixo da dobra**
- Não precisa de controle fino de threshold

### Usar JavaScript quando:
- Precisa de **rootMargin** customizado
- Quer adicionar **fade-in** animation
- Precisa de **callback** após carregamento

### Atributos Importantes

```html
<img
  src="image.jpg"
  loading="lazy"          <!-- Lazy loading nativo -->
  decoding="async"        <!-- Não bloqueia renderização -->
  fetchpriority="low"     <!-- Baixa prioridade (abaixo da dobra) -->
  width="400"             <!-- Evita layout shift (CLS) -->
  height="300"
  alt="Descrição">
```

### Para Hero Image (acima da dobra)

```html
<img
  src="hero.jpg"
  loading="eager"         <!-- Carregar imediatamente -->
  decoding="sync"         <!-- Prioridade máxima -->
  fetchpriority="high"    <!-- Alta prioridade -->
  width="1920"
  height="1080"
  alt="Lancha navegando na Baía de Guanabara">
```

---

## 4. Lista de Imagens para Otimizar

### Prioridade ALTA (Hero/LCP)

| Arquivo | Dimensão Atual | Meta |
|---------|----------------|------|
| `/assets/images/hero/hero-home.jpg` | ? | 1600x900, <150KB |
| `/assets/images/hero/equipe-weboat.jpg` | ? | 800x600, <80KB |

### Prioridade MÉDIA (Cards visíveis)

| Pasta | Quantidade | Meta por imagem |
|-------|------------|-----------------|
| `/assets/images/lanchas/` | ~25 | 400x300, <60KB |
| `/assets/images/lanchas/parceiras/` | ~22 | 400x300, <60KB |
| `/assets/images/roteiros/` | ~6 | 400x250, <50KB |

### Prioridade BAIXA (Lazy loaded)

| Pasta | Quantidade | Meta por imagem |
|-------|------------|-----------------|
| `/assets/images/servicos/` | ~8 | 400x300, <60KB |
| `/assets/images/ocasioes/` | ~4 | 600x400, <80KB |
| `/assets/images/clientes/` | ~6 | 300x300, <40KB |

---

## 5. Script de Otimização em Massa

```bash
#!/bin/bash
# optimize-images.sh

# Requer: brew install imagemagick webp

SOURCE_DIR="./assets/images"
OUTPUT_DIR="./assets/images-optimized"

# Criar estrutura de pastas
mkdir -p "$OUTPUT_DIR"

# Processar cada imagem JPG/PNG
find "$SOURCE_DIR" -type f \( -name "*.jpg" -o -name "*.png" \) | while read file; do
  relative_path="${file#$SOURCE_DIR/}"
  dir_path=$(dirname "$relative_path")
  filename=$(basename "$file")
  name="${filename%.*}"

  mkdir -p "$OUTPUT_DIR/$dir_path"

  # Gerar versões redimensionadas
  for size in 400 800 1600; do
    # JPG otimizado
    convert "$file" -resize "${size}x>" -quality 85 -strip \
      "$OUTPUT_DIR/$dir_path/${name}-${size}.jpg"

    # WebP
    cwebp -q 80 "$OUTPUT_DIR/$dir_path/${name}-${size}.jpg" \
      -o "$OUTPUT_DIR/$dir_path/${name}-${size}.webp"
  done

  echo "Processado: $relative_path"
done

echo "Otimização concluída!"
```

---

## 6. Verificação de CLS (Cumulative Layout Shift)

### Sempre incluir width e height

```html
<!-- ERRADO - causa layout shift -->
<img src="image.jpg" alt="...">

<!-- CORRETO - reserva espaço -->
<img src="image.jpg" alt="..." width="400" height="300">
```

### Usar aspect-ratio no CSS como fallback

```css
.card-boat__image img {
  aspect-ratio: 4 / 3;
  object-fit: cover;
  width: 100%;
  height: auto;
}
```

---

## 7. Checklist de Implementação

- [x] Instalar ferramentas (imagemagick, webp, oxipng, jpegoptim, svgo)
- [ ] Auditar imagens atuais (tamanhos, formatos)
- [ ] Criar script de otimização
- [ ] Processar imagens hero (prioridade)
- [ ] Processar imagens de lanchas
- [ ] Processar demais imagens
- [ ] Atualizar HTML com `<picture>` e srcset
- [x] Adicionar width/height em todas as `<img>` (index.html feito)
- [ ] Testar com Lighthouse
- [ ] Verificar fallback em Safari antigo

---

## 8. Métricas Esperadas

| Antes | Depois | Melhoria |
|-------|--------|----------|
| LCP ~3.5s | LCP ~1.8s | -48% |
| Total images ~5MB | Total images ~1.5MB | -70% |
| Requests 50+ | Requests ~30 | -40% |

---

**Última atualização:** Fevereiro 2026
