#!/usr/bin/env python3
"""
Add "Roteiros Disponíveis" cross-linking section to all boat detail pages.

Inserts a route-cards section before the CTA section at the bottom of each
boat detail page, using pricing from lanchas-data.js.

- Own boats (4): use promotional prices, include Volta Completa card
- Partner boats (22): use preco field, no Volta Completa card
"""

import re
import os

SITE_ROOT = "/Users/rodrigocosta/weboat-site"

# ── Route metadata ──────────────────────────────────────────────────────
ROUTES = [
    {
        "key": "R1",
        "name": "Mureta da Urca",
        "slug": "mureta-da-urca",
        "badge": "Melhor custo-benefício",
        "duration": "5h",
    },
    {
        "key": "R2",
        "name": "Praia Vermelha",
        "slug": "praia-vermelha",
        "badge": "Mais vendido",
        "duration": "5h",
    },
    {
        "key": "R3",
        "name": "Copacabana",
        "slug": "copacabana",
        "badge": "Vista icônica",
        "duration": "5h",
    },
    {
        "key": "R4",
        "name": "Ilhas Cagarras",
        "slug": "ilhas-cagarras",
        "badge": "Mar aberto",
        "duration": "5h",
    },
    {
        "key": "R5",
        "name": "Itaipu e Camboinhas",
        "slug": "itaipu-camboinhas",
        "badge": "Praias desertas",
        "duration": "5h",
    },
]

VOLTA_COMPLETA = {
    "name": "Volta Completa",
    "slug": "volta-completa",
    "badge": "Experiência completa",
    "duration": "5h",
}

# ── Own boats: id -> (html_file, display_name, {R1: promo_price, ...}) ──
OWN_BOATS = {
    "weboat-32": {
        "file": "pages/lanchas/weboat-32.html",
        "name": "WeBoat 32",
        "prices": {"R1": 2300, "R2": 2500, "R3": 3000, "R4": 3600, "R5": 3600},
    },
    "weboat-390": {
        "file": "pages/lanchas/weboat-390.html",
        "name": "WeBoat 390",
        "prices": {"R1": 2600, "R2": 2800, "R3": 3300, "R4": 3900, "R5": 3900},
    },
    "weboat-oceanic-36": {
        "file": "pages/lanchas/weboat-oceanic-36.html",
        "name": "WeBoat Oceanic 36",
        "prices": {"R1": 2400, "R2": 2600, "R3": 3100, "R4": 3700, "R5": 3700},
    },
    "weboat-rio-star-50": {
        "file": "pages/lanchas/weboat-rio-star-50.html",
        "name": "WeBoat Rio Star 50",
        "prices": {"R1": 4000, "R2": 4300, "R3": 4900, "R4": 5900, "R5": 5900},
    },
}

# ── Partner boats: id -> (html_file, display_name, {R1: price|None, ...}) ──
PARTNER_BOATS = {
    "malaga-32": {
        "file": "pages/lanchas/parceiras/malaga-32.html",
        "name": "Malaga 32",
        "prices": {"R1": 2800, "R2": 2900, "R3": 3250, "R4": 3500, "R5": 3400},
    },
    "magna-28": {
        "file": "pages/lanchas/parceiras/magna-28.html",
        "name": "Magna 28",
        "prices": {"R1": 3000, "R2": 3400, "R3": 3800, "R4": 4300, "R5": 4300},
    },
    "real-32": {
        "file": "pages/lanchas/parceiras/weboat-real-32.html",
        "name": "WeBoat Real 32",
        "prices": {"R1": 3300, "R2": 3800, "R3": 4300, "R4": 4800, "R5": 4800},
    },
    "favo": {
        "file": "pages/lanchas/parceiras/weboat-rival-36.html",
        "name": "WeBoat Rival 36",
        "prices": {"R1": 2900, "R2": 2900, "R3": 3350, "R4": 3800, "R5": 3800},
    },
    "ibiza": {
        "file": "pages/lanchas/parceiras/weboat-ibiza-45.html",
        "name": "WeBoat Ibiza 45",
        "prices": {"R1": 4200, "R2": 4200, "R3": 4700, "R4": 5200, "R5": 5200},
    },
    "oceanic-fantasma": {
        "file": "pages/lanchas/parceiras/weboat-ghost-36.html",
        "name": "WeBoat Ghost 36",
        "prices": {"R1": 3800, "R2": 4300, "R3": 4800, "R4": 5300, "R5": 5300},
    },
    "carbrasmar-37": {
        "file": "pages/lanchas/parceiras/weboat-carbrasmar-41.html",
        "name": "WeBoat Carbrasmar 41",
        "prices": {"R1": 3700, "R2": 4000, "R3": 4800, "R4": 5500, "R5": 5500},
    },
    "senna": {
        "file": "pages/lanchas/parceiras/weboat-senna-50.html",
        "name": "WeBoat Senna 50",
        "prices": {"R1": 5500, "R2": 6500, "R3": 7500, "R4": 8500, "R5": 8500},
    },
    "tecnomarine": {
        "file": "pages/lanchas/parceiras/tecnomarine-50.html",
        "name": "Tecnomarine 50",
        "prices": {"R1": 6500, "R2": 7500, "R3": 8500, "R4": 9500, "R5": 9500},
    },
    "boat-rio": {
        "file": "pages/lanchas/parceiras/boat-rio-36.html",
        "name": "Boat Rio 36",
        "prices": {"R1": 3500, "R2": 3500, "R3": 3950, "R4": 4400, "R5": 4400},
    },
    "atol": {
        "file": "pages/lanchas/parceiras/intermares-50.html",
        "name": "Intermares 50",
        "prices": {"R1": 4500, "R2": 4500, "R3": 4950, "R4": 5400, "R5": 5400},
    },
    "lobster": {
        "file": "pages/lanchas/parceiras/weboat-400.html",
        "name": "WeBoat 400",
        "prices": {"R1": 4000, "R2": 4000, "R3": 4450, "R4": 4900, "R5": 4900},
    },
    "aquarius": {
        "file": "pages/lanchas/parceiras/weboat-600.html",
        "name": "WeBoat 600",
        "prices": {"R1": 7500, "R2": 7500, "R3": 8500, "R4": 9500, "R5": 9500},
    },
    "essence": {
        "file": "pages/lanchas/parceiras/weboat-essence.html",
        "name": "WeBoat Essence",
        "prices": {"R1": 7000, "R2": 7500, "R3": None, "R4": None, "R5": None},
    },
    "bota": {
        "file": "pages/lanchas/parceiras/barco-gourmet-53.html",
        "name": "Barco Gourmet 53",
        "prices": {"R1": 7000, "R2": 7000, "R3": None, "R4": None, "R5": None},
    },
    "weboat-malik": {
        "file": "pages/lanchas/parceiras/weboat-malik.html",
        "name": "WeBoat Malik",
        "prices": {"R1": 8500, "R2": 9000, "R3": 11000, "R4": 13500, "R5": 13500},
    },
    "oceano": {
        "file": "pages/lanchas/parceiras/catamara-oceano.html",
        "name": "Catamarã Oceano",
        "prices": {"R1": 14000, "R2": 14000, "R3": None, "R4": None, "R5": None},
    },
    "weboat-mares-50": {
        "file": "pages/lanchas/parceiras/weboat-mares-50.html",
        "name": "WeBoat Mares 50",
        "prices": {"R1": 5500, "R2": 6000, "R3": 6500, "R4": 7500, "R5": 7500},
    },
    "vib": {
        "file": "pages/lanchas/parceiras/prestige-60.html",
        "name": "Prestige 60",
        "prices": {"R1": 15000, "R2": 15000, "R3": None, "R4": None, "R5": None},
    },
    "rebecca": {
        "file": "pages/lanchas/parceiras/schaefer-62-fly.html",
        "name": "Schaefer 62 Fly",
        "prices": {"R1": 15000, "R2": 15000, "R3": None, "R4": None, "R5": None},
    },
    "intermarine-60-fly": {
        "file": "pages/lanchas/parceiras/intermarine-60-fly.html",
        "name": "Intermarine 60 Fly",
        "prices": {"R1": 15000, "R2": 15000, "R3": None, "R4": None, "R5": None},
    },
}


def format_price(price):
    """Format integer price as Brazilian currency string: 2.300"""
    s = f"{price:,}".replace(",", ".")
    return s


def build_route_card(route, price, is_own_boat):
    """Build a single route card HTML."""
    slug = route["slug"]
    name = route["name"]
    badge = route["badge"]
    duration = route["duration"]

    if price is not None:
        if is_own_boat:
            price_text = f"A partir de R$ {format_price(price)}"
        else:
            price_text = f"R$ {format_price(price)}"
    else:
        price_text = "Consultar"

    return f"""      <a href="/pages/roteiros/{slug}.html" class="card-route card-route--compact">
        <div class="card-route__header">
          <span class="card-route__tag">{badge}</span>
          <h3 class="card-route__title">{name}</h3>
        </div>
        <div class="card-route__footer">
          <span class="card-route__duration"><i class="ph ph-clock"></i> {duration}</span>
          <span class="card-route__price">{price_text}</span>
        </div>
      </a>"""


def build_volta_completa_card():
    """Build the Volta Completa card (own boats only)."""
    vc = VOLTA_COMPLETA
    return f"""      <a href="/pages/roteiros/{vc['slug']}.html" class="card-route card-route--compact">
        <div class="card-route__header">
          <span class="card-route__tag">{vc['badge']}</span>
          <h3 class="card-route__title">{vc['name']}</h3>
        </div>
        <div class="card-route__footer">
          <span class="card-route__duration"><i class="ph ph-clock"></i> {vc['duration']}</span>
          <span class="card-route__price">Consultar</span>
        </div>
      </a>"""


def build_roteiros_section(boat_name, prices, is_own_boat):
    """Build the full Roteiros Disponíveis section HTML."""
    cards = []
    for route in ROUTES:
        price = prices.get(route["key"])
        # Skip routes with None price for partner boats (not available)
        if price is None and not is_own_boat:
            continue
        cards.append(build_route_card(route, price, is_own_boat))

    if is_own_boat:
        cards.append(build_volta_completa_card())

    cards_html = "\n".join(cards)

    return f"""    <!-- Roteiros Disponíveis -->
    <section class="roteiros-disponiveis section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-header__title">Roteiros Disponíveis</h2>
          <p class="section-header__description">Escolha o destino ideal para seu passeio na {boat_name}</p>
        </div>
        <div class="roteiros-disponiveis__grid">
{cards_html}
        </div>
      </div>
    </section>

"""


def insert_section_before_cta(filepath, section_html):
    """Insert the roteiros section before the section-cta in the given HTML file."""
    full_path = os.path.join(SITE_ROOT, filepath)

    with open(full_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Check if already inserted
    if "roteiros-disponiveis" in content:
        return False, "SKIPPED (already has roteiros-disponiveis)"

    # Find the section-cta marker
    # Pattern: look for <section class="section-cta"> possibly with preceding comment
    pattern = r'([ \t]*<!-- CTA Final -->\s*\n)?(\s*<section class="section-cta")'
    match = re.search(pattern, content)

    if not match:
        # Try without comment
        pattern2 = r'(\s*<section class="section-cta")'
        match = re.search(pattern2, content)
        if not match:
            return False, "ERROR: could not find section-cta"

    insert_pos = match.start()

    new_content = content[:insert_pos] + section_html + content[insert_pos:]

    with open(full_path, "w", encoding="utf-8") as f:
        f.write(new_content)

    return True, "OK"


def main():
    stats = {
        "own_ok": 0,
        "own_skip": 0,
        "own_err": 0,
        "partner_ok": 0,
        "partner_skip": 0,
        "partner_err": 0,
        "total_cards": 0,
    }

    print("=" * 70)
    print("ADDING ROTEIROS DISPONIVEIS SECTION TO BOAT DETAIL PAGES")
    print("=" * 70)

    # ── Own boats ──
    print("\n--- OWN BOATS (4) ---")
    for boat_id, boat in OWN_BOATS.items():
        section_html = build_roteiros_section(boat["name"], boat["prices"], is_own_boat=True)
        success, msg = insert_section_before_cta(boat["file"], section_html)
        status = "OK" if success else msg.split("(")[0].strip()
        print(f"  {boat['name']:25s} -> {status}")
        if success:
            stats["own_ok"] += 1
            # 5 routes + volta completa = 6 cards
            stats["total_cards"] += 6
        elif "SKIPPED" in msg:
            stats["own_skip"] += 1
        else:
            stats["own_err"] += 1
            print(f"    {msg}")

    # ── Partner boats ──
    print("\n--- PARTNER BOATS (22) ---")
    for boat_id, boat in PARTNER_BOATS.items():
        available_routes = sum(1 for v in boat["prices"].values() if v is not None)
        section_html = build_roteiros_section(boat["name"], boat["prices"], is_own_boat=False)
        success, msg = insert_section_before_cta(boat["file"], section_html)
        status = "OK" if success else msg.split("(")[0].strip()
        print(f"  {boat['name']:25s} -> {status} ({available_routes} routes)")
        if success:
            stats["partner_ok"] += 1
            stats["total_cards"] += available_routes
        elif "SKIPPED" in msg:
            stats["partner_skip"] += 1
        else:
            stats["partner_err"] += 1
            print(f"    {msg}")

    # ── Summary ──
    print("\n" + "=" * 70)
    print("SUMMARY")
    print("=" * 70)
    total_processed = stats["own_ok"] + stats["partner_ok"]
    total_skipped = stats["own_skip"] + stats["partner_skip"]
    total_errors = stats["own_err"] + stats["partner_err"]
    print(f"  Own boats modified:     {stats['own_ok']}/4")
    print(f"  Partner boats modified: {stats['partner_ok']}/22")
    print(f"  Total modified:         {total_processed}/26")
    print(f"  Skipped (already done): {total_skipped}")
    print(f"  Errors:                 {total_errors}")
    print(f"  Total route cards added:{stats['total_cards']}")
    print("=" * 70)


if __name__ == "__main__":
    main()
