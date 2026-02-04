#!/usr/bin/env node
/**
 * IndexNow - Notifica Bing/Yandex sobre URLs atualizadas
 *
 * Uso:
 *   node scripts/indexnow.js https://www.weboatbrasil.com.br/pagina-atualizada
 *   node scripts/indexnow.js url1 url2 url3
 *
 * Por que isso importa:
 *   - Bing alimenta ChatGPT Search e Microsoft Copilot
 *   - Indexação rápida = visibilidade em IA mais rápida
 */

const INDEXNOW_KEY = 'b9429e626a6eaed9e7cc60014a8fb32b';
const HOST = 'www.weboatbrasil.com.br';
const ENDPOINT = 'https://api.indexnow.org/IndexNow';

async function submitUrls(urls) {
  if (!urls || urls.length === 0) {
    console.error('Erro: Forneça pelo menos uma URL como argumento');
    console.log('Uso: node scripts/indexnow.js https://www.weboatbrasil.com.br/pagina');
    process.exit(1);
  }

  // Validar que todas as URLs são do domínio correto
  const validUrls = urls.filter(url => {
    try {
      const parsed = new URL(url);
      return parsed.host === HOST;
    } catch {
      console.warn(`URL inválida ignorada: ${url}`);
      return false;
    }
  });

  if (validUrls.length === 0) {
    console.error(`Erro: Nenhuma URL válida do domínio ${HOST}`);
    process.exit(1);
  }

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: validUrls
  };

  console.log(`\nEnviando ${validUrls.length} URL(s) para IndexNow...`);
  console.log('URLs:', validUrls.join('\n       '));

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok || response.status === 202) {
      console.log(`\n✅ Sucesso! Status: ${response.status}`);
      console.log('As URLs serão indexadas em breve pelo Bing, Yandex e outros.');
    } else {
      const text = await response.text();
      console.error(`\n❌ Erro: Status ${response.status}`);
      console.error('Resposta:', text);
    }
  } catch (error) {
    console.error('\n❌ Erro de conexão:', error.message);
    process.exit(1);
  }
}

// Pegar URLs dos argumentos da linha de comando
const urls = process.argv.slice(2);
submitUrls(urls);
