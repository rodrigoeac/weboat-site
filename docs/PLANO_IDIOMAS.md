# Plano de Internacionalização — WeBoat Site

> **Status:** PENDENTE — será planejado em sessão separada

## Escopo Previsto

### Landing Page em Inglês
- `en/index.html` — Landing page única em inglês
- Title: "Boat Rental in Rio de Janeiro | Private Boat Tours | WeBoat"
- Conteúdo: hero + 4 boats + 6 routes + services + testimonials + FAQ + CTA
- Schema: LocalBusiness com `availableLanguage: ["pt-BR", "en"]`
- hreflang tags bidireccionais (PT ↔ EN)
- WhatsApp: "Hi! I'd like info about boat rental in Rio de Janeiro."

### Infraestrutura de hreflang
- Homepage PT: `<link rel="alternate" hreflang="pt-BR" href=".../">`
- Homepage EN: `<link rel="alternate" hreflang="en" href=".../en/">`

### CSS
- Reusar home.css (layout idêntico, só texto muda)

### SEO
- Atualizar robots.txt, sitemap.xml, llms.txt

### GEO Avançado (opcional)
- Landing pages por bairro (Copacabana, Botafogo)
- Schema TouristDestination por bairro

## Considerações para o Plano
- Definir escopo: apenas 1 landing page EN ou multi-page?
- Tradução: manter tom "Coastal Premium" em inglês
- SEO: keyword research para "boat rental rio de janeiro"
- Manutenção: como manter sync PT/EN no site estático?
- Possibilidade de espanhol (turismo argentino/latino)

## Referência
- Originalmente planejado como Fase 8 do plano de melhorias
- Removido para ser tratado como projeto independente
