#!/usr/bin/env node
/**
 * Add "inLanguage": "pt-BR" to all JSON-LD schemas in PT pages.
 * Skips: en/, es/, blog/, templates/, node_modules/
 * Skips: BreadcrumbList schemas (structural, no textual content)
 *
 * Run: node scripts/add-inlanguage-schema.js
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');

// Schema types that should get inLanguage
const TYPES_TO_TAG = new Set([
  'FAQPage', 'WebSite', 'LocalBusiness', 'Product', 'Event',
  'Service', 'ItemList', 'TouristDestination', 'TouristAttraction',
  'CollectionPage', 'OfferCatalog', 'Organization'
]);

// Find all PT HTML files (exclude en/, es/, blog/, templates/)
const files = execSync(
  'find . -name "index.html" -not -path "./en/*" -not -path "./es/*" -not -path "./blog/*" -not -path "./templates/*" -not -path "./node_modules/*"',
  { cwd: ROOT, encoding: 'utf8' }
).trim().split('\n').filter(Boolean);

// Also include root index.html
if (!files.includes('./index.html')) {
  files.push('./index.html');
}

let filesModified = 0;
let blocksModified = 0;

for (const relFile of files) {
  const filePath = path.join(ROOT, relFile);
  if (!fs.existsSync(filePath)) continue;

  let html = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Match all JSON-LD script blocks
  html = html.replace(/<script type="application\/ld\+json">\s*\n([\s\S]*?)<\/script>/g, (match, jsonStr) => {
    try {
      const data = JSON.parse(jsonStr.trim());
      const schemaType = data['@type'];

      // Skip if not a type we want to tag
      if (!schemaType || !TYPES_TO_TAG.has(schemaType)) return match;

      // Skip if already has inLanguage
      if (data.inLanguage) return match;

      // Add inLanguage right after @type
      // We do string manipulation to preserve original formatting
      const typeMatch = jsonStr.match(/"@type"\s*:\s*"[^"]+"/);
      if (!typeMatch) return match;

      const insertPos = jsonStr.indexOf(typeMatch[0]) + typeMatch[0].length;
      const before = jsonStr.slice(0, insertPos);
      const after = jsonStr.slice(insertPos);

      // Detect indent level from @type line
      const typeLine = jsonStr.slice(0, jsonStr.indexOf('"@type"'));
      const lastNewline = typeLine.lastIndexOf('\n');
      const indent = lastNewline >= 0 ? typeLine.slice(lastNewline + 1) : '    ';

      const newJson = before + ',\n' + indent + '"inLanguage": "pt-BR"' + after;

      modified = true;
      blocksModified++;
      return match.replace(jsonStr, newJson);
    } catch (e) {
      // If JSON parse fails, skip this block
      return match;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf8');
    filesModified++;
    console.log(`OK: ${relFile}`);
  }
}

console.log(`\nDone: ${filesModified} files modified, ${blocksModified} schema blocks updated.`);
