#!/usr/bin/env node
/**
 * Generate sitemaps with trilingual alternates.
 * Outputs: sitemap.xml, sitemap-pt.xml, sitemap-en.xml, sitemap-es.xml
 *
 * Source of truth: docs/i18n-registry.json + filesystem scan for PT-only pages.
 * Run: node scripts/generate-sitemap.js
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const BASE_URL = 'https://www.weboatbrasil.com.br';
const TODAY = new Date().toISOString().slice(0, 10);

const registry = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/i18n-registry.json'), 'utf8'));

// ═══════════════════════════════════════════════════════════
// PRIORITY & CHANGEFREQ RULES
// ═══════════════════════════════════════════════════════════
function getPriority(ptUrl) {
  if (ptUrl === '/') return '1.0';
  if (/^\/(lanchas|roteiros)\/$/.test(ptUrl)) return '0.9';
  if (/^\/(lanchas|roteiros)\/[^/]+\/$/.test(ptUrl)) return '0.9';
  if (/^\/(despedida-solteira|aniversario|corporativo|reveillon|carnaval)\/$/.test(ptUrl)) return '0.8';
  if (/^\/(servicos|sobre|como-funciona|areas-atendidas|contato|faq)\/$/.test(ptUrl)) return '0.8';
  if (ptUrl === '/blog/') return '0.7';
  if (/^\/blog\//.test(ptUrl)) return '0.6';
  return '0.5';
}

function getChangefreq(ptUrl) {
  if (ptUrl === '/') return 'weekly';
  if (/^\/(lanchas|roteiros)(\/|$)/.test(ptUrl)) return 'weekly';
  if (/^\/(despedida-solteira|aniversario|corporativo|reveillon|carnaval)\/$/.test(ptUrl)) return 'monthly';
  if (/^\/blog\//.test(ptUrl)) return 'monthly';
  if (/^\/(servicos|sobre|como-funciona|areas-atendidas|contato|faq)\/$/.test(ptUrl)) return 'monthly';
  return 'yearly';
}

// ═══════════════════════════════════════════════════════════
// BUILD URL GROUPS FROM REGISTRY
// ═══════════════════════════════════════════════════════════

// Registry pages: have PT + EN + ES alternates
const registryGroups = registry.pages.map(p => ({
  id: p.id,
  pt: p.pt,
  en: p.en,
  es: p.es
}));

// Set of PT URLs that are in the registry
const registryPtUrls = new Set(registryGroups.map(g => g.pt));

// ═══════════════════════════════════════════════════════════
// SCAN FILESYSTEM FOR PT-ONLY PAGES (not in registry)
// ═══════════════════════════════════════════════════════════
const allPtFiles = execSync(
  'find . -name "index.html" -not -path "./en/*" -not -path "./es/*" -not -path "./templates/*" -not -path "./node_modules/*"',
  { cwd: ROOT, encoding: 'utf8' }
).trim().split('\n').filter(Boolean);

const ptOnlyUrls = [];
for (const f of allPtFiles) {
  // Convert ./path/to/index.html → /path/to/
  let url = f.replace(/^\./, '').replace(/\/index\.html$/, '/').replace(/^\/\//, '/');
  if (url === '/index.html') url = '/';
  if (!registryPtUrls.has(url)) {
    ptOnlyUrls.push(url);
  }
}
ptOnlyUrls.sort();

// ═══════════════════════════════════════════════════════════
// SCAN FILESYSTEM FOR EN/ES-ONLY PAGES (not in registry)
// ═══════════════════════════════════════════════════════════
const registryEnUrls = new Set(registryGroups.map(g => g.en));
const registryEsUrls = new Set(registryGroups.map(g => g.es));

const allEnFiles = execSync(
  'find ./en -name "index.html" -not -path "./node_modules/*"',
  { cwd: ROOT, encoding: 'utf8' }
).trim().split('\n').filter(Boolean);

const enOnlyUrls = [];
for (const f of allEnFiles) {
  let url = f.replace(/^\./, '').replace(/\/index\.html$/, '/');
  if (!registryEnUrls.has(url)) {
    enOnlyUrls.push(url);
  }
}
enOnlyUrls.sort();

const allEsFiles = execSync(
  'find ./es -name "index.html" -not -name "*.bak" -not -path "./node_modules/*"',
  { cwd: ROOT, encoding: 'utf8' }
).trim().split('\n').filter(Boolean);

const esOnlyUrls = [];
for (const f of allEsFiles) {
  let url = f.replace(/^\./, '').replace(/\/index\.html$/, '/');
  if (!registryEsUrls.has(url)) {
    esOnlyUrls.push(url);
  }
}
esOnlyUrls.sort();

// ═══════════════════════════════════════════════════════════
// XML HELPERS
// ═══════════════════════════════════════════════════════════
function xmlUrl(loc, ptUrl, alternates) {
  const priority = getPriority(ptUrl);
  const changefreq = getChangefreq(ptUrl);
  let xml = `  <url>\n`;
  xml += `    <loc>${BASE_URL}${loc}</loc>\n`;
  xml += `    <lastmod>${TODAY}</lastmod>\n`;
  xml += `    <changefreq>${changefreq}</changefreq>\n`;
  xml += `    <priority>${priority}</priority>\n`;
  if (alternates) {
    xml += `    <xhtml:link rel="alternate" hreflang="pt-BR" href="${BASE_URL}${alternates.pt}" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}${alternates.en}" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="es" href="${BASE_URL}${alternates.es}" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${alternates.pt}" />\n`;
  }
  xml += `  </url>`;
  return xml;
}

function wrapUrlset(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
    `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    urls.join('\n') + '\n</urlset>\n';
}

// ═══════════════════════════════════════════════════════════
// GENERATE SITEMAPS
// ═══════════════════════════════════════════════════════════
const allUrls = [];
const ptUrls = [];
const enUrls = [];
const esUrls = [];

// 1. Registry pages (trilingual)
for (const g of registryGroups) {
  const alts = { pt: g.pt, en: g.en, es: g.es };

  // PT
  const ptEntry = xmlUrl(g.pt, g.pt, alts);
  allUrls.push(ptEntry);
  ptUrls.push(ptEntry);

  // EN
  const enEntry = xmlUrl(g.en, g.pt, alts);
  allUrls.push(enEntry);
  enUrls.push(enEntry);

  // ES
  const esEntry = xmlUrl(g.es, g.pt, alts);
  allUrls.push(esEntry);
  esUrls.push(esEntry);
}

// 2. PT-only pages (no alternates)
for (const url of ptOnlyUrls) {
  const entry = xmlUrl(url, url, null);
  allUrls.push(entry);
  ptUrls.push(entry);
}

// 3. EN-only pages (no alternates — shouldn't exist but handle gracefully)
for (const url of enOnlyUrls) {
  const entry = xmlUrl(url, url.replace(/^\/en\//, '/'), null);
  allUrls.push(entry);
  enUrls.push(entry);
}

// 4. ES-only pages (no alternates)
for (const url of esOnlyUrls) {
  const entry = xmlUrl(url, url.replace(/^\/es\//, '/'), null);
  allUrls.push(entry);
  esUrls.push(entry);
}

// Write sitemaps
const files = [
  ['sitemap.xml', allUrls],
  ['sitemap-pt.xml', ptUrls],
  ['sitemap-en.xml', enUrls],
  ['sitemap-es.xml', esUrls]
];

for (const [filename, urls] of files) {
  const filepath = path.join(ROOT, filename);
  fs.writeFileSync(filepath, wrapUrlset(urls), 'utf8');
  console.log(`${filename}: ${urls.length} URLs`);
}

console.log(`\nTotal unique URLs in sitemap.xml: ${allUrls.length}`);
console.log(`PT-only pages (no alternates): ${ptOnlyUrls.length}`);
if (enOnlyUrls.length) console.log(`EN-only pages (no alternates): ${enOnlyUrls.length}`);
if (esOnlyUrls.length) console.log(`ES-only pages (no alternates): ${esOnlyUrls.length}`);
