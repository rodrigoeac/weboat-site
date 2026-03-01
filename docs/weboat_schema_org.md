# 📊 SCHEMA.ORG - DADOS ESTRUTURADOS WEBOAT BRASIL

**Versão:** 1.0  
**Data:** Janeiro 2026  
**Documento:** Schemas JSON-LD completos para SEO

---

## 📋 ÍNDICE DE SCHEMAS

| Schema | Uso | Página |
|--------|-----|--------|
| [LocalBusiness](#1-localbusiness---empresa) | Dados da empresa | Global (todas) |
| [Organization](#2-organization---organização) | Informações corporativas | Global |
| [WebSite](#3-website---site) | Dados do site | Home |
| [WebPage](#4-webpage---página) | Dados de cada página | Todas |
| [Product](#5-product---lancha) | Cada lancha | Páginas de lancha |
| [Service](#6-service---serviços) | Churrasco, Open Bar, etc. | Página de serviços |
| [FAQPage](#7-faqpage---perguntas-frequentes) | FAQ | Página de FAQ |
| [Event](#8-event---eventos) | Réveillon, eventos especiais | Páginas de eventos |
| [BreadcrumbList](#9-breadcrumblist---navegação) | Navegação | Todas |
| [Review/AggregateRating](#10-aggregaterating---avaliações) | Avaliações | Home, lanchas |
| [ImageObject](#11-imageobject---imagens) | Galeria de fotos | Lanchas, roteiros |
| [Place](#12-place---locais) | Roteiros e pontos | Página de roteiros |
| [Offer](#13-offercatalog---catálogo) | Catálogo de preços | Frota |
| [ContactPage](#14-contactpage---contato) | Página de contato | Contato |
| [AboutPage](#15-aboutpage---sobre) | Página sobre | Sobre |

---

## 1. LocalBusiness - Empresa

**Usar em:** Todas as páginas (no `<head>`)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.weboatbrasil.com.br/#organization",
  "name": "WeBoat Brasil",
  "alternateName": "WeBoat",
  "description": "Aluguel de lancha no Rio de Janeiro para passeios privativos, festas, despedidas de solteira, aniversários e eventos corporativos. Frota própria com 5 lanchas para grupos de 2 a 65 pessoas.",
  "url": "https://www.weboatbrasil.com.br",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.weboatbrasil.com.br/images/logo-weboat.png",
    "width": 400,
    "height": 100
  },
  "image": [
    "https://www.weboatbrasil.com.br/images/weboat-hero-1x1.jpg",
    "https://www.weboatbrasil.com.br/images/weboat-hero-4x3.jpg",
    "https://www.weboatbrasil.com.br/images/weboat-hero-16x9.jpg"
  ],
  "telephone": "+55-21-96673-4346",
  "email": "contato@weboatbrasil.com.br",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Marina da Glória - Loja 06, Av. Infante Dom Henrique, S/N",
    "addressLocality": "Rio de Janeiro",
    "addressRegion": "RJ",
    "postalCode": "20021-140",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -22.9245,
    "longitude": -43.1691
  },
  "hasMap": "https://www.google.com/maps?cid=XXXXXXXXXXXXXXXX",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday", "Sunday"],
      "opens": "07:00",
      "closes": "22:00"
    }
  ],
  "priceRange": "R$ 2.300 - R$ 25.000",
  "currenciesAccepted": "BRL",
  "paymentAccepted": "Cash, Credit Card, Debit Card, PIX, Bank Transfer",
  "areaServed": {
    "@type": "City",
    "name": "Rio de Janeiro",
    "sameAs": "https://www.wikidata.org/wiki/Q8678"
  },
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": -22.9245,
      "longitude": -43.1691
    },
    "geoRadius": "50000"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "1000",
    "reviewCount": "1000"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Cliente Verificado"
      },
      "datePublished": "2025-12-15",
      "reviewBody": "Experiência incrível! Equipe super atenciosa, lancha impecável e o passeio foi maravilhoso.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      }
    }
  ],
  "foundingDate": "2022",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": 9
  },
  "slogan": "Seu sorriso vem primeiro",
  "knowsAbout": [
    "Aluguel de lanchas",
    "Passeios de barco",
    "Eventos náuticos",
    "Turismo náutico Rio de Janeiro"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Lanchas para Aluguel",
    "itemListElement": [
      {
        "@type": "OfferCatalog",
        "name": "Lanchas Próprias",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "WeBoat 32"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "WeBoat 390"
            }
          }
        ]
      }
    ]
  },
  "sameAs": [
    "https://www.instagram.com/weboatbrasil",
    "https://www.facebook.com/weboatbrasil",
    "https://wa.me/5521966734346"
  ]
}
</script>
```

---

## 2. Organization - Organização

**Usar em:** Alternativa ao LocalBusiness para contexto corporativo

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.weboatbrasil.com.br/#organization",
  "name": "WeBoat Brasil",
  "legalName": "WeBoat Brasil LTDA",
  "url": "https://www.weboatbrasil.com.br",
  "logo": "https://www.weboatbrasil.com.br/images/logo-weboat.png",
  "foundingDate": "2022",
  "founders": [
    {
      "@type": "Person",
      "name": "Fundador WeBoat"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Infante Dom Henrique, S/N, Loja 06 - Marina da Glória",
    "addressLocality": "Rio de Janeiro",
    "addressRegion": "RJ",
    "postalCode": "20021-140",
    "addressCountry": "BR"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+55-21-96673-4346",
      "contactType": "sales",
      "areaServed": "BR",
      "availableLanguage": ["Portuguese"]
    },
    {
      "@type": "ContactPoint",
      "telephone": "+55-21-96673-4346",
      "contactType": "customer service",
      "areaServed": "BR",
      "availableLanguage": ["Portuguese"]
    }
  ],
  "sameAs": [
    "https://www.instagram.com/weboatbrasil"
  ]
}
</script>
```

---

## 3. WebSite - Site

**Usar em:** Página Home apenas

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.weboatbrasil.com.br/#website",
  "url": "https://www.weboatbrasil.com.br",
  "name": "WeBoat Brasil - Aluguel de Lancha no Rio de Janeiro",
  "description": "Site oficial da WeBoat Brasil. Aluguel de lanchas para passeios privativos no Rio de Janeiro.",
  "publisher": {
    "@id": "https://www.weboatbrasil.com.br/#organization"
  },
  "inLanguage": "pt-BR",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.weboatbrasil.com.br/busca?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
</script>
```

---

## 4. WebPage - Página

**Usar em:** Todas as páginas (adaptar para cada uma)

### Home
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.weboatbrasil.com.br/#webpage",
  "url": "https://www.weboatbrasil.com.br",
  "name": "Aluguel de Lancha no Rio de Janeiro | WeBoat Brasil",
  "description": "Passeio privativo de lancha no RJ. +1000 avaliações 5 estrelas. Frota própria. Grupos de 2 a 65 pessoas. Reserve pelo WhatsApp!",
  "isPartOf": {
    "@id": "https://www.weboatbrasil.com.br/#website"
  },
  "about": {
    "@id": "https://www.weboatbrasil.com.br/#organization"
  },
  "primaryImageOfPage": {
    "@type": "ImageObject",
    "url": "https://www.weboatbrasil.com.br/images/hero-home.jpg"
  },
  "datePublished": "2022-01-01",
  "dateModified": "2026-01-15",
  "inLanguage": "pt-BR"
}
</script>
```

### Página de Frota
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://www.weboatbrasil.com.br/lanchas-para-alugar-rio-de-janeiro/#webpage",
  "url": "https://www.weboatbrasil.com.br/lanchas-para-alugar-rio-de-janeiro",
  "name": "Lanchas para Alugar no Rio de Janeiro | WeBoat Brasil",
  "description": "Conheça nossa frota de lanchas para aluguel no RJ. 5 lanchas próprias para grupos de 2 a 65 pessoas. Veja fotos, capacidade e preços.",
  "isPartOf": {
    "@id": "https://www.weboatbrasil.com.br/#website"
  },
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "url": "https://www.weboatbrasil.com.br/lanchas/weboat-32"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "url": "https://www.weboatbrasil.com.br/lanchas/weboat-390"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "url": "https://www.weboatbrasil.com.br/lanchas/weboat-360"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "url": "https://www.weboatbrasil.com.br/lanchas/rio-star-50"
      }
    ]
  },
  "inLanguage": "pt-BR"
}
</script>
```

---

## 5. Product - Lancha

**Usar em:** Cada página individual de lancha

### WeBoat 32 (Menor)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://www.weboatbrasil.com.br/lanchas/weboat-32/#product",
  "name": "WeBoat 32 - Lancha para Aluguel",
  "description": "Lancha de 32 pés para até 13 pessoas. Ideal para passeios íntimos e grupos pequenos no Rio de Janeiro. Inclui combustível, marinheiro, som Bluetooth, coolers e gelo.",
  "image": [
    "https://www.weboatbrasil.com.br/images/lanchas/weboat-32-1.jpg",
    "https://www.weboatbrasil.com.br/images/lanchas/weboat-32-2.jpg",
    "https://www.weboatbrasil.com.br/images/lanchas/weboat-32-3.jpg"
  ],
  "brand": {
    "@type": "Brand",
    "name": "WeBoat Brasil"
  },
  "manufacturer": {
    "@id": "https://www.weboatbrasil.com.br/#organization"
  },
  "category": "Lanchas para Aluguel",
  "sku": "WEBOAT-32",
  "mpn": "WB32-2024",
  "material": "Fibra de vidro",
  "size": "32 pés",
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Capacidade",
      "value": "Até 13 pessoas"
    },
    {
      "@type": "PropertyValue",
      "name": "Tamanho",
      "value": "32 pés"
    },
    {
      "@type": "PropertyValue",
      "name": "Tipo",
      "value": "Lancha Própria"
    },
    {
      "@type": "PropertyValue",
      "name": "Som",
      "value": "Bluetooth"
    },
    {
      "@type": "PropertyValue",
      "name": "Banheiro",
      "value": "Sim"
    }
  ],
  "offers": {
    "@type": "Offer",
    "url": "https://www.weboatbrasil.com.br/lanchas/weboat-32",
    "priceCurrency": "BRL",
    "price": "2300",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "seller": {
      "@id": "https://www.weboatbrasil.com.br/#organization"
    },
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "2300",
      "priceCurrency": "BRL",
      "unitText": "por passeio (3 horas)",
      "referenceQuantity": {
        "@type": "QuantitativeValue",
        "value": "3",
        "unitCode": "HUR"
      }
    },
    "eligibleRegion": {
      "@type": "Place",
      "name": "Rio de Janeiro"
    },
    "shippingDetails": {
      "@type": "OfferShippingDetails",
      "shippingDestination": {
        "@type": "DefinedRegion",
        "addressCountry": "BR",
        "addressRegion": "RJ"
      },
      "deliveryTime": {
        "@type": "ShippingDeliveryTime",
        "handlingTime": {
          "@type": "QuantitativeValue",
          "minValue": 0,
          "maxValue": 1,
          "unitCode": "DAY"
        }
      }
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "120",
    "reviewCount": "120"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Maria S."
      },
      "datePublished": "2025-11-20",
      "reviewBody": "Lancha perfeita para nosso grupo de 10 pessoas! Muito bem cuidada e o marinheiro foi super atencioso.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      }
    }
  ]
}
</script>
```

### WeBoat 390 (Média)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://www.weboatbrasil.com.br/lanchas/weboat-390/#product",
  "name": "WeBoat 390 - Lancha para Aluguel",
  "description": "Lancha de 39 pés para até 16 pessoas. Nossa lancha mais versátil, ideal para festas, despedidas de solteira e aniversários no Rio de Janeiro. Inclui combustível, marinheiro, som Bluetooth, coolers, gelo, tapete flutuante e macarrões.",
  "image": [
    "https://www.weboatbrasil.com.br/images/lanchas/weboat-390-1.jpg",
    "https://www.weboatbrasil.com.br/images/lanchas/weboat-390-2.jpg",
    "https://www.weboatbrasil.com.br/images/lanchas/weboat-390-3.jpg",
    "https://www.weboatbrasil.com.br/images/lanchas/weboat-390-4.jpg"
  ],
  "brand": {
    "@type": "Brand",
    "name": "WeBoat Brasil"
  },
  "manufacturer": {
    "@id": "https://www.weboatbrasil.com.br/#organization"
  },
  "category": "Lanchas para Aluguel",
  "sku": "WEBOAT-390",
  "mpn": "WB390-2024",
  "size": "39 pés",
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Capacidade",
      "value": "Até 16 pessoas"
    },
    {
      "@type": "PropertyValue",
      "name": "Tamanho",
      "value": "39 pés"
    },
    {
      "@type": "PropertyValue",
      "name": "Tipo",
      "value": "Lancha Própria"
    },
    {
      "@type": "PropertyValue",
      "name": "Som",
      "value": "JBL Bluetooth Premium"
    },
    {
      "@type": "PropertyValue",
      "name": "Banheiro",
      "value": "Sim"
    },
    {
      "@type": "PropertyValue",
      "name": "Churrasqueira",
      "value": "Disponível (opcional)"
    }
  ],
  "offers": {
    "@type": "Offer",
    "url": "https://www.weboatbrasil.com.br/lanchas/weboat-390",
    "priceCurrency": "BRL",
    "price": "2600",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "seller": {
      "@id": "https://www.weboatbrasil.com.br/#organization"
    },
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "2600",
      "priceCurrency": "BRL",
      "unitText": "por passeio (3 horas, seg-qui)"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "ratingCount": "200",
    "reviewCount": "200"
  }
}
</script>
```

### Rio Star 50 (Maior)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://www.weboatbrasil.com.br/lanchas/rio-star-50/#product",
  "name": "Rio Star 50 - Lancha para Grandes Grupos",
  "description": "Nossa maior lancha! 50 pés para até 26 pessoas. Perfeita para eventos corporativos, confraternizações e festas grandes no Rio de Janeiro. Dois andares, área gourmet, som profissional e espaço amplo.",
  "image": [
    "https://www.weboatbrasil.com.br/images/lanchas/rio-star-50-1.jpg",
    "https://www.weboatbrasil.com.br/images/lanchas/rio-star-50-2.jpg",
    "https://www.weboatbrasil.com.br/images/lanchas/rio-star-50-3.jpg"
  ],
  "brand": {
    "@type": "Brand",
    "name": "WeBoat Brasil"
  },
  "category": "Lanchas para Aluguel",
  "sku": "RIOSTAR-50",
  "size": "50 pés",
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Capacidade",
      "value": "Até 26 pessoas"
    },
    {
      "@type": "PropertyValue",
      "name": "Tamanho",
      "value": "50 pés"
    },
    {
      "@type": "PropertyValue",
      "name": "Tipo",
      "value": "Lancha Própria"
    },
    {
      "@type": "PropertyValue",
      "name": "Andares",
      "value": "2"
    },
    {
      "@type": "PropertyValue",
      "name": "Área Gourmet",
      "value": "Sim"
    }
  ],
  "offers": {
    "@type": "Offer",
    "url": "https://www.weboatbrasil.com.br/lanchas/rio-star-50",
    "priceCurrency": "BRL",
    "price": "4500",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@id": "https://www.weboatbrasil.com.br/#organization"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "ratingCount": "85"
  }
}
</script>
```

---

## 6. Service - Serviços

**Usar em:** Página de serviços

### Serviço de Churrasco
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.weboatbrasil.com.br/servicos/#churrasco",
  "name": "Churrasco na Lancha",
  "alternateName": "BBQ na Lancha",
  "description": "Serviço completo de churrasco durante seu passeio de lancha no Rio de Janeiro. Churrasqueiro profissional, carnes selecionadas, acompanhamentos e todo equipamento necessário.",
  "provider": {
    "@id": "https://www.weboatbrasil.com.br/#organization"
  },
  "serviceType": "Gastronomia Náutica",
  "areaServed": {
    "@type": "City",
    "name": "Rio de Janeiro"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Opções de Churrasco",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Taxa de Churrasqueira",
        "description": "Uso da churrasqueira com churrasqueiro",
        "price": "250",
        "priceCurrency": "BRL"
      },
      {
        "@type": "Offer",
        "name": "Kit Churrasco Simples",
        "description": "Carnes, acompanhamentos básicos",
        "price": "100",
        "priceCurrency": "BRL",
        "eligibleQuantity": {
          "@type": "QuantitativeValue",
          "unitText": "por pessoa"
        }
      },
      {
        "@type": "Offer",
        "name": "Kit Churrasco Completo",
        "description": "Carnes premium, acompanhamentos, sobremesa",
        "price": "160",
        "priceCurrency": "BRL",
        "eligibleQuantity": {
          "@type": "QuantitativeValue",
          "unitText": "por pessoa"
        }
      }
    ]
  },
  "image": "https://www.weboatbrasil.com.br/images/servicos/churrasco-lancha.jpg"
}
</script>
```

### Serviço de Open Bar
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.weboatbrasil.com.br/servicos/#openbar",
  "name": "Open Bar na Lancha",
  "description": "Serviço de open bar durante seu passeio de lancha no Rio de Janeiro. Barman profissional, drinks clássicos e autorais, cerveja, refrigerante, água e gelo.",
  "provider": {
    "@id": "https://www.weboatbrasil.com.br/#organization"
  },
  "serviceType": "Bebidas",
  "areaServed": {
    "@type": "City",
    "name": "Rio de Janeiro"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Opções de Open Bar",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Open Bar Básico",
        "description": "Cerveja, caipirinha, refrigerante, água",
        "price": "135",
        "priceCurrency": "BRL",
        "eligibleQuantity": {
          "@type": "QuantitativeValue",
          "unitText": "por pessoa"
        }
      },
      {
        "@type": "Offer",
        "name": "Open Bar Premium",
        "description": "Todas as bebidas + drinks especiais + espumante",
        "price": "180",
        "priceCurrency": "BRL",
        "eligibleQuantity": {
          "@type": "QuantitativeValue",
          "unitText": "por pessoa"
        }
      }
    ]
  },
  "image": "https://www.weboatbrasil.com.br/images/servicos/open-bar-lancha.jpg"
}
</script>
```

### Serviço de Decoração
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.weboatbrasil.com.br/servicos/#decoracao",
  "name": "Decoração para Festas na Lancha",
  "description": "Decoração personalizada para aniversários, despedidas de solteira e eventos especiais na lancha. Balões, faixas, mesa de doces e mais.",
  "provider": {
    "@id": "https://www.weboatbrasil.com.br/#organization"
  },
  "serviceType": "Decoração de Eventos",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Kits de Decoração",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Kit Despedida de Solteira",
        "description": "Faixa de noiva, balões, adereços temáticos",
        "price": "350",
        "priceCurrency": "BRL"
      },
      {
        "@type": "Offer",
        "name": "Kit Aniversário",
        "description": "Balões, faixa personalizada, velas",
        "price": "300",
        "priceCurrency": "BRL"
      }
    ]
  }
}
</script>
```

### Página de Serviços (Agregador)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Serviços WeBoat Brasil",
  "description": "Serviços adicionais para seu passeio de lancha no Rio de Janeiro",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@id": "https://www.weboatbrasil.com.br/servicos/#churrasco"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@id": "https://www.weboatbrasil.com.br/servicos/#openbar"
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@id": "https://www.weboatbrasil.com.br/servicos/#decoracao"
      }
    }
  ]
}
</script>
```

---

## 7. FAQPage - Perguntas Frequentes

**Usar em:** Página de FAQ

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.weboatbrasil.com.br/duvidas/#faqpage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quanto custa alugar uma lancha no Rio de Janeiro?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O aluguel de lancha no Rio de Janeiro na WeBoat começa em R$ 2.300 para passeios de segunda a quinta, e R$ 2.700 de sexta a domingo. O preço varia conforme o tamanho da lancha, roteiro escolhido e duração do passeio. Todas as lanchas incluem combustível, marinheiro, som Bluetooth, coolers e gelo."
      }
    },
    {
      "@type": "Question",
      "name": "O que está incluso no aluguel de lancha?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Todo aluguel de lancha na WeBoat inclui: combustível para o roteiro escolhido, marinheiro habilitado pela Marinha, tapete flutuante, macarrões de piscina, som Bluetooth, coolers com gelo, água mineral e seguro obrigatório. Serviços como churrasco, open bar e decoração são opcionais."
      }
    },
    {
      "@type": "Question",
      "name": "Quantas pessoas cabem em uma lancha?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A WeBoat tem lanchas para todos os tamanhos de grupo: de 2 a 13 pessoas na WeBoat 32, até 16 pessoas na WeBoat 390, e até 26 pessoas na Rio Star 50. Para grupos maiores de até 65 pessoas, temos lanchas parceiras disponíveis."
      }
    },
    {
      "@type": "Question",
      "name": "Como funciona a reserva?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A reserva é simples: entre em contato pelo WhatsApp (21) 96673-4346, escolha a lancha e data desejada, e pague um sinal de 50% via PIX ou cartão. O restante pode ser pago no dia do passeio. Confirmamos sua reserva em até 2 horas."
      }
    },
    {
      "@type": "Question",
      "name": "E se chover no dia do passeio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Se as condições climáticas não permitirem navegação segura, remarcamos seu passeio para outra data sem custo adicional. Nossa equipe monitora a previsão do tempo e entra em contato com antecedência caso seja necessário remarcar."
      }
    },
    {
      "@type": "Question",
      "name": "Posso levar bebida e comida?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim! Você pode levar sua própria bebida e comida sem custo extra. Também oferecemos serviços de churrasco completo (a partir de R$ 100/pessoa) e open bar (a partir de R$ 135/pessoa) para quem prefere não se preocupar com nada."
      }
    },
    {
      "@type": "Question",
      "name": "Onde fica a Marina da Glória?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Marina da Glória fica na Av. Infante Dom Henrique, S/N, no bairro Glória, Rio de Janeiro. É ao lado do Aeroporto Santos Dumont, com fácil acesso de carro, táxi ou Uber. Temos estacionamento disponível no local."
      }
    },
    {
      "@type": "Question",
      "name": "Preciso saber nadar para fazer o passeio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não é necessário saber nadar. Todas as nossas lanchas possuem coletes salva-vidas para todos os passageiros e o marinheiro é habilitado para emergências. No entanto, se quiser entrar na água durante as paradas, recomendamos usar colete."
      }
    },
    {
      "@type": "Question",
      "name": "Posso fazer despedida de solteira na lancha?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim! A despedida de solteira na lancha é uma das nossas experiências mais populares. Oferecemos kit completo com decoração temática, drinks especiais e playlist personalizada. A WeBoat 390 (até 16 pessoas) é a mais escolhida para despedidas."
      }
    },
    {
      "@type": "Question",
      "name": "Vocês fazem passeio de Réveillon?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim! O Réveillon na lancha é uma experiência única para ver a queima de fogos de Copacabana do mar. O pacote especial inclui aproximadamente 8 horas de navegação, open bar e ceia. As vagas são limitadas e costumam esgotar com meses de antecedência."
      }
    }
  ]
}
</script>
```

---

## 8. Event - Eventos

**Usar em:** Página de Réveillon e eventos especiais

### Réveillon na Lancha
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Event",
  "@id": "https://www.weboatbrasil.com.br/reveillon-na-lancha-rio-de-janeiro/#event",
  "name": "Réveillon na Lancha 2026/2027 - WeBoat Brasil",
  "description": "Celebre a virada do ano no mar! Assista à queima de fogos de Copacabana de um ângulo exclusivo, a bordo de uma lancha privativa. Pacote completo com open bar, ceia e aproximadamente 8 horas de navegação.",
  "image": [
    "https://www.weboatbrasil.com.br/images/eventos/reveillon-lancha-1.jpg",
    "https://www.weboatbrasil.com.br/images/eventos/reveillon-lancha-2.jpg"
  ],
  "startDate": "2026-12-31T20:00:00-03:00",
  "endDate": "2027-01-01T04:00:00-03:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "Marina da Glória - Rio de Janeiro",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Infante Dom Henrique, S/N",
      "addressLocality": "Rio de Janeiro",
      "addressRegion": "RJ",
      "postalCode": "20021-140",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -22.9245,
      "longitude": -43.1691
    }
  },
  "organizer": {
    "@id": "https://www.weboatbrasil.com.br/#organization"
  },
  "performer": {
    "@id": "https://www.weboatbrasil.com.br/#organization"
  },
  "offers": [
    {
      "@type": "Offer",
      "name": "Réveillon Lancha Pequena (até 13 pessoas)",
      "url": "https://www.weboatbrasil.com.br/reveillon-na-lancha-rio-de-janeiro",
      "price": "15000",
      "priceCurrency": "BRL",
      "availability": "https://schema.org/LimitedAvailability",
      "validFrom": "2026-06-01T00:00:00-03:00"
    },
    {
      "@type": "Offer",
      "name": "Réveillon Lancha Média (até 16 pessoas)",
      "url": "https://www.weboatbrasil.com.br/reveillon-na-lancha-rio-de-janeiro",
      "price": "18000",
      "priceCurrency": "BRL",
      "availability": "https://schema.org/LimitedAvailability",
      "validFrom": "2026-06-01T00:00:00-03:00"
    },
    {
      "@type": "Offer",
      "name": "Réveillon Lancha Grande (até 26 pessoas)",
      "url": "https://www.weboatbrasil.com.br/reveillon-na-lancha-rio-de-janeiro",
      "price": "25000",
      "priceCurrency": "BRL",
      "availability": "https://schema.org/LimitedAvailability",
      "validFrom": "2026-06-01T00:00:00-03:00"
    }
  ],
  "maximumAttendeeCapacity": 26,
  "typicalAgeRange": "18+",
  "isAccessibleForFree": false
}
</script>
```

### Despedida de Solteira (Tipo de Evento)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Event",
  "@id": "https://www.weboatbrasil.com.br/despedida-de-solteira-na-lancha/#event",
  "name": "Despedida de Solteira na Lancha - Rio de Janeiro",
  "description": "A despedida de solteira perfeita no Rio de Janeiro! Celebre com suas amigas a bordo de uma lancha privativa com decoração temática, drinks e muita diversão no mar.",
  "image": "https://www.weboatbrasil.com.br/images/ocasioes/despedida-solteira-lancha.jpg",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "Marina da Glória - Rio de Janeiro",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Rio de Janeiro",
      "addressRegion": "RJ",
      "addressCountry": "BR"
    }
  },
  "organizer": {
    "@id": "https://www.weboatbrasil.com.br/#organization"
  },
  "offers": {
    "@type": "Offer",
    "name": "Pacote Despedida de Solteira",
    "description": "Lancha + Decoração + Open Bar",
    "url": "https://www.weboatbrasil.com.br/despedida-de-solteira-na-lancha",
    "price": "135",
    "priceCurrency": "BRL",
    "eligibleQuantity": {
      "@type": "QuantitativeValue",
      "minValue": 8,
      "unitText": "por pessoa (mínimo 8)"
    },
    "availability": "https://schema.org/InStock"
  },
  "maximumAttendeeCapacity": 16,
  "typicalAgeRange": "18+"
}
</script>
```

---

## 9. BreadcrumbList - Navegação

**Usar em:** Todas as páginas internas

### Exemplo: Página de Lancha
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.weboatbrasil.com.br"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Lanchas para Alugar",
      "item": "https://www.weboatbrasil.com.br/lanchas-para-alugar-rio-de-janeiro"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "WeBoat 390",
      "item": "https://www.weboatbrasil.com.br/lanchas/weboat-390"
    }
  ]
}
</script>
```

### Exemplo: Página de Roteiro
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.weboatbrasil.com.br"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Roteiros",
      "item": "https://www.weboatbrasil.com.br/passeio-de-lancha-rio-de-janeiro"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Praia Vermelha",
      "item": "https://www.weboatbrasil.com.br/roteiros/praia-vermelha"
    }
  ]
}
</script>
```

### Exemplo: Página de Serviços
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.weboatbrasil.com.br"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Serviços",
      "item": "https://www.weboatbrasil.com.br/servicos-passeio-lancha-rio-de-janeiro"
    }
  ]
}
</script>
```

---

## 10. AggregateRating - Avaliações

**Usar em:** Home, páginas de lanchas (já incluído nos Products)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  "itemReviewed": {
    "@type": "LocalBusiness",
    "name": "WeBoat Brasil",
    "@id": "https://www.weboatbrasil.com.br/#organization"
  },
  "ratingValue": "5.0",
  "bestRating": "5",
  "worstRating": "1",
  "ratingCount": "1000",
  "reviewCount": "1000"
}
</script>
```

---

## 11. ImageObject - Imagens

**Usar em:** Galerias de fotos

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": "Galeria WeBoat 390",
  "description": "Fotos da lancha WeBoat 390 e passeios realizados",
  "image": [
    {
      "@type": "ImageObject",
      "contentUrl": "https://www.weboatbrasil.com.br/images/lanchas/weboat-390-externa.jpg",
      "name": "WeBoat 390 - Vista Externa",
      "description": "Lancha WeBoat 390 navegando na Baía de Guanabara",
      "width": 1200,
      "height": 800,
      "thumbnailUrl": "https://www.weboatbrasil.com.br/images/lanchas/weboat-390-externa-thumb.jpg"
    },
    {
      "@type": "ImageObject",
      "contentUrl": "https://www.weboatbrasil.com.br/images/lanchas/weboat-390-deck.jpg",
      "name": "WeBoat 390 - Deck Principal",
      "description": "Área de estar da lancha WeBoat 390",
      "width": 1200,
      "height": 800
    },
    {
      "@type": "ImageObject",
      "contentUrl": "https://www.weboatbrasil.com.br/images/lanchas/weboat-390-passeio.jpg",
      "name": "Passeio WeBoat 390",
      "description": "Grupo de amigos celebrando na lancha WeBoat 390",
      "width": 1200,
      "height": 800
    }
  ]
}
</script>
```

---

## 12. Place - Locais (Roteiros)

**Usar em:** Página de roteiros

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Roteiros de Passeio de Lancha no Rio de Janeiro",
  "description": "Os melhores roteiros para seu passeio de lancha no Rio de Janeiro",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "TouristAttraction",
        "name": "Roteiro Urca",
        "description": "Passeio pela Mureta da Urca com vista para o Pão de Açúcar. Melhor custo-benefício.",
        "image": "https://www.weboatbrasil.com.br/images/roteiros/urca.jpg",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -22.9476,
          "longitude": -43.1634
        },
        "isAccessibleForFree": false,
        "touristType": "Passeio de Lancha"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "TouristAttraction",
        "name": "Roteiro Praia Vermelha",
        "description": "Nosso roteiro mais vendido! Inclui Urca + Praia Vermelha com parada para banho.",
        "image": "https://www.weboatbrasil.com.br/images/roteiros/praia-vermelha.jpg",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -22.9575,
          "longitude": -43.1652
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "TouristAttraction",
        "name": "Roteiro Copacabana",
        "description": "Vista icônica da orla de Copacabana do mar. Perfeito para fotos.",
        "image": "https://www.weboatbrasil.com.br/images/roteiros/copacabana.jpg",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -22.9711,
          "longitude": -43.1822
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "TouristAttraction",
        "name": "Roteiro Ilhas Cagarras",
        "description": "Aventura em mar aberto até as Ilhas Cagarras. Águas cristalinas e vida marinha.",
        "image": "https://www.weboatbrasil.com.br/images/roteiros/ilhas-cagarras.jpg",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -23.0211,
          "longitude": -43.1917
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 5,
      "item": {
        "@type": "TouristAttraction",
        "name": "Roteiro Itaipu/Niterói",
        "description": "Praias desertas de Itaipu e Camboinhas. O mais exclusivo.",
        "image": "https://www.weboatbrasil.com.br/images/roteiros/itaipu.jpg",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -22.9789,
          "longitude": -43.0456
        }
      }
    }
  ]
}
</script>
```

---

## 13. OfferCatalog - Catálogo de Preços

**Usar em:** Página de frota (opcional, complementa LocalBusiness)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "name": "Catálogo de Lanchas WeBoat Brasil",
  "description": "Preços de aluguel de lancha no Rio de Janeiro",
  "itemListElement": [
    {
      "@type": "OfferCatalog",
      "name": "Lanchas Próprias",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "WeBoat 32 (até 13 pessoas)",
          "description": "32 pés - Ideal para grupos pequenos",
          "price": "2300",
          "priceCurrency": "BRL",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "2300",
            "priceCurrency": "BRL",
            "unitText": "seg-qui, 3 horas"
          }
        },
        {
          "@type": "Offer",
          "name": "WeBoat 390 (até 16 pessoas)",
          "description": "39 pés - Nossa mais versátil",
          "price": "2600",
          "priceCurrency": "BRL"
        },
        {
          "@type": "Offer",
          "name": "Rio Star 50 (até 26 pessoas)",
          "description": "50 pés - Para grandes grupos",
          "price": "4500",
          "priceCurrency": "BRL"
        }
      ]
    },
    {
      "@type": "OfferCatalog",
      "name": "Lanchas Parceiras",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Lanchas para até 40 pessoas",
          "price": "6000",
          "priceCurrency": "BRL"
        },
        {
          "@type": "Offer",
          "name": "Lanchas para até 65 pessoas",
          "price": "8000",
          "priceCurrency": "BRL"
        }
      ]
    }
  ]
}
</script>
```

---

## 14. ContactPage - Contato

**Usar em:** Página de contato

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://www.weboatbrasil.com.br/contato/#webpage",
  "name": "Contato - WeBoat Brasil",
  "description": "Entre em contato com a WeBoat Brasil para alugar uma lancha no Rio de Janeiro. WhatsApp, telefone, e-mail e formulário de contato.",
  "url": "https://www.weboatbrasil.com.br/contato-aluguel-lancha-rio-de-janeiro",
  "mainEntity": {
    "@type": "Organization",
    "@id": "https://www.weboatbrasil.com.br/#organization"
  },
  "about": {
    "@type": "ContactPoint",
    "telephone": "+55-21-96673-4346",
    "contactType": "sales",
    "areaServed": "BR",
    "availableLanguage": "Portuguese",
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "08:00",
      "closes": "20:00"
    }
  }
}
</script>
```

---

## 15. AboutPage - Sobre

**Usar em:** Página Sobre Nós

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://www.weboatbrasil.com.br/sobre/#webpage",
  "name": "Sobre a WeBoat Brasil",
  "description": "Conheça a história da WeBoat Brasil, empresa de aluguel de lanchas fundada em 2022 na Marina da Glória, Rio de Janeiro.",
  "url": "https://www.weboatbrasil.com.br/sobre-weboat-aluguel-lancha-rio-janeiro",
  "mainEntity": {
    "@id": "https://www.weboatbrasil.com.br/#organization"
  },
  "about": {
    "@type": "Organization",
    "@id": "https://www.weboatbrasil.com.br/#organization",
    "foundingDate": "2022",
    "foundingLocation": {
      "@type": "Place",
      "name": "Marina da Glória",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Rio de Janeiro",
        "addressRegion": "RJ",
        "addressCountry": "BR"
      }
    },
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": 9
    },
    "slogan": "Seu sorriso vem primeiro"
  }
}
</script>
```

---

## 📋 RESUMO: QUAL SCHEMA USAR EM CADA PÁGINA

| Página | Schemas |
|--------|---------|
| **Home** | LocalBusiness + WebSite + WebPage + AggregateRating |
| **Frota (listagem)** | WebPage (CollectionPage) + ItemList + BreadcrumbList |
| **Lancha (detalhe)** | Product + BreadcrumbList + ImageGallery |
| **Roteiros** | WebPage + ItemList (TouristAttraction) + BreadcrumbList |
| **Serviços** | Service (múltiplos) + ItemList + BreadcrumbList |
| **Despedida** | Event + Service + BreadcrumbList |
| **Aniversário** | Event + Service + BreadcrumbList |
| **Corporativo** | Service + BreadcrumbList |
| **Réveillon** | Event + BreadcrumbList |
| **FAQ** | FAQPage + BreadcrumbList |
| **Sobre** | AboutPage + Organization + BreadcrumbList |
| **Contato** | ContactPage + BreadcrumbList |

---

## ⚠️ DICAS IMPORTANTES

### 1. Validação
Sempre valide seus schemas em:
- https://validator.schema.org/
- https://search.google.com/test/rich-results

### 2. IDs Consistentes
Use `@id` para referenciar entidades entre schemas:
```json
"provider": {
  "@id": "https://www.weboatbrasil.com.br/#organization"
}
```

### 3. Imagens
Forneça múltiplas proporções (1:1, 4:3, 16:9) para melhor exibição nos resultados.

### 4. Preços
Sempre use números sem formatação:
```json
"price": "2600"  // ✅ Correto
"price": "R$ 2.600,00"  // ❌ Errado
```

### 5. Datas
Use formato ISO 8601:
```json
"startDate": "2026-12-31T20:00:00-03:00"
```

---

**FIM DO DOCUMENTO DE SCHEMA.ORG**

*WeBoat Brasil - Aluguel de Lancha no Rio de Janeiro*
