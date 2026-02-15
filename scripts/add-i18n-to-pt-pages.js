#!/usr/bin/env node
/**
 * Add hreflang tags and language switcher to all PT HTML pages.
 * Run: node scripts/add-i18n-to-pt-pages.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BASE_URL = 'https://www.weboatbrasil.com.br';
const registry = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/i18n-registry.json'), 'utf8'));

// Build a map: PT path -> { pt, en, es }
const urlMap = {};
registry.pages.forEach(p => {
  urlMap[p.pt] = { pt: p.pt, en: p.en, es: p.es };
});

// Find all HTML files (excluding node_modules, en/, es/, templates/)
function findHtmlFiles(dir, results) {
  results = results || [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', 'en', 'es', 'templates', '.git', 'scripts'].includes(entry.name)) continue;
      findHtmlFiles(full, results);
    } else if (entry.name === 'index.html') {
      results.push(full);
    }
  }
  return results;
}

// Get the URL path from file path
function fileToUrlPath(filePath) {
  const rel = path.relative(ROOT, filePath);
  // index.html at root -> /
  if (rel === 'index.html') return '/';
  // dir/index.html -> /dir/
  return '/' + rel.replace(/\/index\.html$/, '/');
}

// Generate hreflang block
function makeHreflangBlock(ptPath, enPath, esPath) {
  return [
    '',
    '  <!-- hreflang -->',
    `  <link rel="alternate" hreflang="pt-BR" href="${BASE_URL}${ptPath}">`,
    `  <link rel="alternate" hreflang="en" href="${BASE_URL}${enPath || ptPath}">`,
    `  <link rel="alternate" hreflang="es" href="${BASE_URL}${esPath || ptPath}">`,
    `  <link rel="alternate" hreflang="x-default" href="${BASE_URL}${ptPath}">`,
  ].join('\n');
}

// Generate language switcher HTML for header (desktop)
function makeLangSwitcherDesktop(ptPath, enPath, esPath) {
  return `
        <!-- Language Switcher -->
        <div class="lang-switcher" id="lang-switcher">
          <button class="lang-switcher__current" aria-expanded="false" aria-haspopup="true" aria-label="Idioma: Portugues">
            <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#229e45" d="M0 0h640v480H0z"/><path fill="#f8e509" d="m321.4 20 301.5 220.1L321.4 460 19.9 240.1z"/><circle fill="#2b49a3" cx="321.4" cy="240" r="110"/></svg>
            PT
            <i class="ph ph-caret-down lang-switcher__caret" aria-hidden="true"></i>
          </button>
          <div class="lang-switcher__menu" role="menu">
            <a href="${ptPath}" class="lang-switcher__option lang-switcher__option--active" role="menuitem">
              <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#229e45" d="M0 0h640v480H0z"/><path fill="#f8e509" d="m321.4 20 301.5 220.1L321.4 460 19.9 240.1z"/><circle fill="#2b49a3" cx="321.4" cy="240" r="110"/></svg>
              Portugues
            </a>
            <a href="${enPath || ptPath}" class="lang-switcher__option" role="menuitem">
              <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#bd3d44" d="M0 0h640v480H0z"/><path stroke="#fff" stroke-width="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/><path fill="#192f5d" d="M0 0h364.8v258.5H0z"/></svg>
              English
            </a>
            <a href="${esPath || ptPath}" class="lang-switcher__option" role="menuitem">
              <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#c60b1e" d="M0 0h640v480H0z"/><path fill="#ffc400" d="M0 120h640v240H0z"/></svg>
              Espanol
            </a>
          </div>
        </div>`;
}

// Generate mobile language switcher
function makeLangSwitcherMobile(ptPath, enPath, esPath) {
  return `
        <div class="lang-switcher--mobile">
          <a href="${ptPath}" class="active">
            <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#229e45" d="M0 0h640v480H0z"/><path fill="#f8e509" d="m321.4 20 301.5 220.1L321.4 460 19.9 240.1z"/><circle fill="#2b49a3" cx="321.4" cy="240" r="110"/></svg>
            PT
          </a>
          <a href="${enPath || ptPath}">
            <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#bd3d44" d="M0 0h640v480H0z"/><path stroke="#fff" stroke-width="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/><path fill="#192f5d" d="M0 0h364.8v258.5H0z"/></svg>
            EN
          </a>
          <a href="${esPath || ptPath}">
            <svg class="lang-switcher__flag" viewBox="0 0 640 480" aria-hidden="true"><path fill="#c60b1e" d="M0 0h640v480H0z"/><path fill="#ffc400" d="M0 120h640v240H0z"/></svg>
            ES
          </a>
        </div>`;
}

// Process all files
const htmlFiles = findHtmlFiles(ROOT);
let processed = 0;
let skipped = 0;

htmlFiles.forEach(filePath => {
  let html = fs.readFileSync(filePath, 'utf8');
  const urlPath = fileToUrlPath(filePath);
  const mapping = urlMap[urlPath];

  // Skip if already has hreflang
  if (html.includes('hreflang=')) {
    console.log(`SKIP (already has hreflang): ${urlPath}`);
    skipped++;
    return;
  }

  // For pages not in the registry (partner boats), use self-referencing only
  const ptPath = urlPath;
  const enPath = mapping ? mapping.en : null;
  const esPath = mapping ? mapping.es : null;

  // 1. Add hreflang tags after canonical link
  const canonicalRegex = /<link rel="canonical"[^>]+>/;
  const canonicalMatch = html.match(canonicalRegex);
  if (canonicalMatch) {
    const hreflangBlock = mapping
      ? makeHreflangBlock(ptPath, enPath, esPath)
      : makeHreflangBlock(ptPath, ptPath, ptPath); // self-ref for partner boats
    html = html.replace(canonicalMatch[0], canonicalMatch[0] + hreflangBlock);
  }

  // 2. Add og:locale:alternate after og:locale
  if (mapping && enPath && esPath) {
    const ogLocaleRegex = /<meta property="og:locale" content="pt_BR">/;
    if (ogLocaleRegex.test(html)) {
      html = html.replace(ogLocaleRegex,
        `<meta property="og:locale" content="pt_BR">\n  <meta property="og:locale:alternate" content="en_US">\n  <meta property="og:locale:alternate" content="es_ES">`
      );
    }
  }

  // 3. Add language switcher to desktop header (after WhatsApp CTA button)
  if (mapping) {
    const ctaPattern = /(<a[^>]*class="btn btn-whatsapp header__cta"[^>]*>[\s\S]*?<\/a>)/;
    const ctaMatch = html.match(ctaPattern);
    if (ctaMatch) {
      html = html.replace(ctaMatch[0], ctaMatch[0] + makeLangSwitcherDesktop(ptPath, enPath, esPath));
    }
  }

  // 4. Add mobile language switcher before closing mobile nav
  if (mapping) {
    const mobileNavEnd = '</nav>\n    </div>\n  </header>';
    const mobileNavEndAlt = '</nav>\n    </div>\n  </header>';
    // Find the WhatsApp button in mobile menu and add after it
    const mobileWaPattern = /(Fale pelo WhatsApp[\s\S]*?<\/a>\s*<\/nav>)/;
    const mobileWaMatch = html.match(mobileWaPattern);
    if (mobileWaMatch) {
      html = html.replace(mobileWaMatch[0],
        mobileWaMatch[0].replace('</nav>', makeLangSwitcherMobile(ptPath, enPath, esPath) + '\n      </nav>')
      );
    }
  }

  // 5. Add i18n.js script before menu.js
  if (!html.includes('i18n.js')) {
    html = html.replace(
      '<script src="/js/menu.js" defer></script>',
      '<script src="/js/i18n.js" defer></script>\n  <script src="/js/menu.js" defer></script>'
    );
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`OK: ${urlPath}` + (mapping ? '' : ' (partner - self-ref only)'));
  processed++;
});

console.log(`\nDone! Processed: ${processed}, Skipped: ${skipped}`);
