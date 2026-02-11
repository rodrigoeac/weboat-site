# Guia de Galeria de Fotos - Páginas de Lanchas

> **Status:** Documentação para aplicação futura
> **Última atualização:** Fevereiro 2026

---

## Estrutura HTML da Galeria

```html
<div class="lancha-gallery">
  <div class="lancha-gallery__main">
    <img src="/assets/images/lanchas/NOME-LANCHA.jpg" alt="NOME - Vista principal" id="mainImage">
  </div>
  <div class="lancha-gallery__thumbs">
    <div class="lancha-gallery__thumb active">
      <img src="/assets/images/lanchas/NOME-LANCHA.jpg" alt="NOME - Vista principal">
    </div>
    <div class="lancha-gallery__thumb">
      <img src="/assets/images/lanchas/NOME-LANCHA-2.jpg" alt="NOME - Descrição">
    </div>
    <!-- Adicionar quantas fotos forem necessárias -->
  </div>
</div>
```

---

## Funcionalidades da Galeria

1. **Scroll horizontal nas thumbnails** - Permite navegar por todas as fotos
2. **Clique na thumbnail** - Troca a imagem principal
3. **Clique na imagem principal** - Abre lightbox com navegação
4. **Navegação no lightbox** - Setas (← →), teclado, contador "1 / X"
5. **Sem limite de fotos** - Adicione quantas fotos forem necessárias

---

## Nomenclatura de Arquivos

```
/assets/images/lanchas/
├── weboat-32.jpg          ← Capa (principal)
├── weboat-32-2.jpg        ← Foto 2
├── weboat-32-3.jpg        ← Foto 3
└── ...

/assets/images/lanchas/parceiras/
├── nome-lancha.jpg        ← Capa (principal)
├── nome-lancha-2.jpg      ← Foto 2
└── ...
```

---

## Especificações de Imagem

| Atributo | Recomendação |
|----------|--------------|
| Formato | JPG (otimizado) |
| Dimensão | 1280x960 (4:3) |
| Peso máximo | 300KB |
| Qualidade | 85% (jpegoptim) |

### Comando de Otimização

```bash
jpegoptim --strip-all --max=85 imagem.jpg
```

---

## Lanchas para Atualizar

### Lanchas Próprias (4)
- [ ] WeBoat 32 ✅ (11 fotos)
- [ ] WeBoat 390
- [ ] WeBoat Oceanic 36
- [ ] WeBoat Rio Star 50

### Lanchas Parceiras (21 — Sagarana removida)
- [ ] Magna 28
- [ ] Malaga 32
- [ ] WeBoat Real 32
- [ ] Boat Rio 36
- [ ] WeBoat Ghost 36
- [x] WeBoat Rival 36 (11 fotos - capa + 10 galeria)
- [ ] WeBoat 400
- [ ] WeBoat Carbrasmar 41
- [ ] WeBoat Ibiza 45
- [ ] Intermares 50
- [ ] WeBoat Mares 50
- [ ] WeBoat Senna 50
- [ ] Tecnomarine 50
- [ ] Barco Gourmet 53
- [x] Prestige 60 (23 fotos - capa + 22 galeria)
- [x] Intermarine 60 Fly (9 fotos - capa + 8 galeria)
- [x] Schaefer 62 Fly (29 fotos - capa + 28 galeria)
- [ ] WeBoat 600
- [ ] WeBoat Essence
- [ ] WeBoat Malik
- [ ] Catamarã Oceano

---

## Processo de Atualização

### 1. Preparar Imagens
```bash
# Copiar da pasta de origem
cp "/caminho/origem/*.jpg" "/Users/rodrigocosta/weboat-site/assets/images/lanchas/"

# Renomear seguindo padrão
mv foto1.jpg nome-lancha.jpg
mv foto2.jpg nome-lancha-2.jpg
# ...

# Otimizar
jpegoptim --strip-all --max=85 nome-lancha*.jpg
```

### 2. Atualizar HTML
Substituir o bloco `<div class="lancha-gallery">...</div>` com todas as fotos.

### 3. Verificar
- [ ] Thumbnails fazem scroll
- [ ] Clique troca imagem principal
- [ ] Lightbox abre e navega
- [ ] Responsivo funciona

---

## Fotos de Páginas de Ocasiões

### Despedida de Solteira
- [x] Hero desktop (1600/800/400w JPG+WebP) — grupo de amigas
- [x] Hero mobile portrait (600x800 JPG+WebP) — crop vertical
- [x] Galeria 1 featured (1200x800) — grupo com drinks
- [x] Galeria 2 (600x400) — buffet a bordo
- [x] Galeria 3 (600x400) — Team Bride drink
- [x] Galeria 4 (600x400) — noiva com óculos Team Bride
- [x] Galeria 5 (600x400) — decoração temática Team Bride
- [x] Extras (800x600) — silhueta pôr do sol com drink

### Réveillon
- [x] Hero (1600/800/400w JPG+WebP) — fogos de artifício
- [x] Galeria 1 featured — vídeo fogos (MP4 2.3MB + WebM 1.9MB + poster)
- [x] Galeria 2 (600x400) — brinde champanhe com luzes coloridas
- [x] Galeria 3 (600x400) — celebração à noite
- [x] Galeria 4 (600x400) — mesa decorada para ceia
- [x] Galeria 5 (600x400) — vista noturna Baía de Guanabara
- [x] Inclui/Extras (800x600) — Bar Oceano com bartenders

### Aniversário
- [x] Galeria 1 featured (1200x800) — buffet de frutas tropicais
- [ ] Galeria 2 — placeholder (aniversario-bolo)
- [x] Galeria 3 (600x400) — buffet mini hambúrgueres com balões rosa
- [ ] Galeria 4 — placeholder (decoracao-aniversario)
- [x] Galeria 5 (600x400) — churrasqueiro preparando espetinhos
- [x] Extras (800x600) — equipe preparando churrasco na marina

### Corporativo
- [ ] Hero — placeholder
- [ ] Galeria 1-5 — placeholders
- [ ] Extras — placeholder

### Serviços
- [x] Hero (1600/800/400w JPG+WebP) — buffet/bar a bordo
- [x] Fotógrafo (800x500) — silhueta casal com Cristo ao pôr do sol

### Sobre
- [x] Hero (1600/800/400w JPG+WebP) — Marina da Glória vista aérea
- [x] Equipe 1 (600x600) — tripulante servindo churrasco
- [x] Equipe 3 (600x600) — técnico nos motores MAN
- [x] Equipe 4 (600x600) — tripulação no leme
- [x] Marina da Glória (800x600) — vista aérea fisheye
- [x] História WeBoat (800x600) — logo ao pôr do sol

---

## Observações

- A primeira thumbnail deve ter a classe `active`
- O `id="mainImage"` deve estar na imagem principal
- Alt text deve ser descritivo para SEO
- Fotos portrait (vertical) podem ser usadas mas ficam melhor em landscape (4:3)
