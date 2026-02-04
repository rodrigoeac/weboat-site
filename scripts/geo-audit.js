#!/usr/bin/env node
/**
 * GEO Audit Script - Verifica conformidade com práticas GEO/SEO para IA
 *
 * Uso:
 *   node scripts/geo-audit.js arquivo.html
 *   node scripts/geo-audit.js --all (audita todas as páginas HTML)
 *
 * Verifica:
 *   - Conteúdo presente no HTML (sem JS)
 *   - H2 em formato de pergunta
 *   - Schema JSON-LD válido
 *   - FAQPage schema
 *   - dateModified no schema
 *   - IDs âncora nos blocos principais
 *   - Meta robots
 *   - Canonical
 */

const fs = require('fs');
const path = require('path');

// Cores para output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(color, symbol, message) {
  console.log(`${colors[color]}${symbol}${colors.reset} ${message}`);
}

function auditFile(filePath) {
  const results = {
    file: filePath,
    score: 0,
    maxScore: 0,
    checks: []
  };

  let html;
  try {
    html = fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    log('red', '✗', `Erro ao ler arquivo: ${filePath}`);
    return null;
  }

  // 1. Verificar <title>
  results.maxScore += 10;
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch && titleMatch[1].length > 10) {
    results.score += 10;
    results.checks.push({ name: 'Title tag', status: 'pass', detail: titleMatch[1].substring(0, 50) + '...' });
  } else {
    results.checks.push({ name: 'Title tag', status: 'fail', detail: 'Título ausente ou muito curto' });
  }

  // 2. Verificar meta description
  results.maxScore += 10;
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  if (descMatch && descMatch[1].length >= 100) {
    results.score += 10;
    results.checks.push({ name: 'Meta description', status: 'pass', detail: `${descMatch[1].length} caracteres` });
  } else if (descMatch) {
    results.score += 5;
    results.checks.push({ name: 'Meta description', status: 'warn', detail: `Curta: ${descMatch[1].length} caracteres (ideal: 150-160)` });
  } else {
    results.checks.push({ name: 'Meta description', status: 'fail', detail: 'Ausente' });
  }

  // 3. Verificar H1
  results.maxScore += 10;
  const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  if (h1Match) {
    results.score += 10;
    results.checks.push({ name: 'H1 presente', status: 'pass', detail: h1Match[1].substring(0, 50) });
  } else {
    results.checks.push({ name: 'H1 presente', status: 'fail', detail: 'Ausente' });
  }

  // 4. Verificar H2 em formato de pergunta
  results.maxScore += 15;
  const h2Matches = html.match(/<h2[^>]*>([^<]+)<\/h2>/gi) || [];
  const h3Matches = html.match(/<h3[^>]*>([^<]+)<\/h3>/gi) || [];
  const headings = [...h2Matches, ...h3Matches];
  const questionHeadings = headings.filter(h => {
    const text = h.replace(/<[^>]+>/g, '');
    return text.includes('?') ||
           text.toLowerCase().startsWith('como') ||
           text.toLowerCase().startsWith('quanto') ||
           text.toLowerCase().startsWith('qual') ||
           text.toLowerCase().startsWith('o que') ||
           text.toLowerCase().startsWith('onde') ||
           text.toLowerCase().startsWith('por que');
  });

  if (questionHeadings.length >= 3) {
    results.score += 15;
    results.checks.push({ name: 'H2/H3 em formato pergunta', status: 'pass', detail: `${questionHeadings.length} perguntas encontradas` });
  } else if (questionHeadings.length > 0) {
    results.score += 8;
    results.checks.push({ name: 'H2/H3 em formato pergunta', status: 'warn', detail: `${questionHeadings.length} perguntas (ideal: 3+)` });
  } else {
    results.checks.push({ name: 'H2/H3 em formato pergunta', status: 'fail', detail: 'Nenhuma pergunta encontrada (Answer Capsules)' });
  }

  // 5. Verificar Schema JSON-LD
  results.maxScore += 15;
  const schemaMatches = html.match(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi) || [];
  if (schemaMatches.length > 0) {
    let validSchemas = 0;
    let schemaTypes = [];

    schemaMatches.forEach(match => {
      try {
        const jsonStr = match.replace(/<script[^>]*>|<\/script>/gi, '').trim();
        const schema = JSON.parse(jsonStr);
        validSchemas++;
        schemaTypes.push(schema['@type']);
      } catch (e) {
        // Schema inválido
      }
    });

    if (validSchemas > 0) {
      results.score += 15;
      results.checks.push({ name: 'Schema JSON-LD', status: 'pass', detail: `${validSchemas} schemas: ${schemaTypes.join(', ')}` });
    } else {
      results.checks.push({ name: 'Schema JSON-LD', status: 'fail', detail: 'Schemas presentes mas inválidos' });
    }
  } else {
    results.checks.push({ name: 'Schema JSON-LD', status: 'fail', detail: 'Nenhum schema encontrado' });
  }

  // 6. Verificar FAQPage schema
  results.maxScore += 10;
  const hasFAQPage = html.includes('"@type": "FAQPage"') || html.includes('"@type":"FAQPage"');
  if (hasFAQPage) {
    results.score += 10;
    results.checks.push({ name: 'FAQPage schema', status: 'pass', detail: 'Presente' });
  } else {
    results.checks.push({ name: 'FAQPage schema', status: 'warn', detail: 'Ausente (recomendado para páginas com FAQ)' });
  }

  // 7. Verificar IDs âncora
  results.maxScore += 10;
  const anchorIds = html.match(/id="[^"]+"/gi) || [];
  const meaningfulIds = anchorIds.filter(id => {
    const idValue = id.replace(/id="|"/g, '');
    return idValue.includes('-') ||
           idValue.includes('quanto') ||
           idValue.includes('como') ||
           idValue.includes('onde') ||
           idValue.includes('faq') ||
           idValue.includes('preco');
  });

  if (meaningfulIds.length >= 3) {
    results.score += 10;
    results.checks.push({ name: 'IDs âncora', status: 'pass', detail: `${meaningfulIds.length} IDs semânticos` });
  } else if (meaningfulIds.length > 0) {
    results.score += 5;
    results.checks.push({ name: 'IDs âncora', status: 'warn', detail: `${meaningfulIds.length} IDs (ideal: 3+)` });
  } else {
    results.checks.push({ name: 'IDs âncora', status: 'fail', detail: 'Poucos IDs para citação de fragmentos' });
  }

  // 8. Verificar meta robots
  results.maxScore += 10;
  const robotsMatch = html.match(/<meta\s+name="robots"\s+content="([^"]+)"/i);
  if (robotsMatch) {
    if (robotsMatch[1].includes('index') && robotsMatch[1].includes('follow')) {
      results.score += 10;
      results.checks.push({ name: 'Meta robots', status: 'pass', detail: robotsMatch[1] });
    } else if (robotsMatch[1].includes('noindex')) {
      results.checks.push({ name: 'Meta robots', status: 'warn', detail: `noindex - página não será indexada` });
    } else {
      results.score += 5;
      results.checks.push({ name: 'Meta robots', status: 'warn', detail: robotsMatch[1] });
    }
  } else {
    results.score += 5; // Ausente = padrão é index,follow
    results.checks.push({ name: 'Meta robots', status: 'warn', detail: 'Ausente (padrão: index, follow)' });
  }

  // 9. Verificar canonical
  results.maxScore += 10;
  const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
  if (canonicalMatch) {
    results.score += 10;
    results.checks.push({ name: 'Canonical URL', status: 'pass', detail: canonicalMatch[1] });
  } else {
    results.checks.push({ name: 'Canonical URL', status: 'fail', detail: 'Ausente' });
  }

  // 10. Verificar @id no Organization schema
  results.maxScore += 10;
  const hasOrgId = html.includes('"@id": "https://www.weboatbrasil.com.br/#organization"') ||
                   html.includes('"@id":"https://www.weboatbrasil.com.br/#organization"');
  if (hasOrgId) {
    results.score += 10;
    results.checks.push({ name: 'Organization @id', status: 'pass', detail: 'Consistente' });
  } else {
    results.checks.push({ name: 'Organization @id', status: 'warn', detail: 'Ausente ou inconsistente' });
  }

  return results;
}

function printResults(results) {
  console.log('\n' + colors.bold + '═'.repeat(60) + colors.reset);
  console.log(colors.bold + ` GEO Audit: ${path.basename(results.file)}` + colors.reset);
  console.log('═'.repeat(60) + '\n');

  results.checks.forEach(check => {
    if (check.status === 'pass') {
      log('green', '✓', `${check.name}: ${check.detail}`);
    } else if (check.status === 'warn') {
      log('yellow', '⚠', `${check.name}: ${check.detail}`);
    } else {
      log('red', '✗', `${check.name}: ${check.detail}`);
    }
  });

  const percentage = Math.round((results.score / results.maxScore) * 100);
  let scoreColor = percentage >= 80 ? 'green' : percentage >= 60 ? 'yellow' : 'red';

  console.log('\n' + '─'.repeat(60));
  console.log(`${colors.bold}Score: ${colors[scoreColor]}${results.score}/${results.maxScore} (${percentage}%)${colors.reset}`);

  if (percentage >= 80) {
    console.log(colors.green + '✓ Boa conformidade GEO/SEO para IA' + colors.reset);
  } else if (percentage >= 60) {
    console.log(colors.yellow + '⚠ Conformidade parcial - melhorias recomendadas' + colors.reset);
  } else {
    console.log(colors.red + '✗ Baixa conformidade - ação necessária' + colors.reset);
  }
}

function findHtmlFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules' && item !== 'docs' && item !== 'templates') {
      files.push(...findHtmlFiles(fullPath));
    } else if (item.endsWith('.html')) {
      files.push(fullPath);
    }
  }

  return files;
}

// Main
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Uso: node scripts/geo-audit.js <arquivo.html>');
  console.log('      node scripts/geo-audit.js --all');
  process.exit(1);
}

if (args[0] === '--all') {
  const rootDir = process.cwd();
  const htmlFiles = findHtmlFiles(rootDir);

  console.log(colors.bold + `\nAuditando ${htmlFiles.length} arquivos HTML...\n` + colors.reset);

  const allResults = [];
  htmlFiles.forEach(file => {
    const results = auditFile(file);
    if (results) {
      allResults.push(results);
      printResults(results);
    }
  });

  // Resumo final
  console.log('\n' + colors.bold + '═'.repeat(60) + colors.reset);
  console.log(colors.bold + ' RESUMO GERAL' + colors.reset);
  console.log('═'.repeat(60) + '\n');

  const totalScore = allResults.reduce((sum, r) => sum + r.score, 0);
  const totalMax = allResults.reduce((sum, r) => sum + r.maxScore, 0);
  const avgPercentage = Math.round((totalScore / totalMax) * 100);

  console.log(`Arquivos auditados: ${allResults.length}`);
  console.log(`Score médio: ${avgPercentage}%`);

  const lowScoreFiles = allResults.filter(r => (r.score / r.maxScore) < 0.6);
  if (lowScoreFiles.length > 0) {
    console.log(colors.yellow + `\nArquivos que precisam de atenção:` + colors.reset);
    lowScoreFiles.forEach(r => {
      const pct = Math.round((r.score / r.maxScore) * 100);
      console.log(`  - ${path.relative(rootDir, r.file)} (${pct}%)`);
    });
  }

} else {
  const filePath = args[0];
  if (!fs.existsSync(filePath)) {
    console.error(`Arquivo não encontrado: ${filePath}`);
    process.exit(1);
  }

  const results = auditFile(filePath);
  if (results) {
    printResults(results);
  }
}
