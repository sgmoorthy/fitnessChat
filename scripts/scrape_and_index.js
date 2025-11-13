// Node script to:
// 1) Scrape Energy Fitness e-catalogue index for PDF links
// 2) Download PDFs into public/pdfs/
// 3) Extract text into data/index.json for serverless RAG

const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const pdfParse = require('pdf-parse');

const CATALOG_URL = 'https://www.energyfitness.in/e-catalogue/index.php';
const PUBLIC_PDFS_DIR = path.join(process.cwd(), 'public', 'pdfs');
const DATA_DIR = path.join(process.cwd(), 'data');
const INDEX_PATH = path.join(DATA_DIR, 'index.json');

async function ensureDirs() {
  await fsp.mkdir(PUBLIC_PDFS_DIR, { recursive: true });
  await fsp.mkdir(DATA_DIR, { recursive: true });
}

function absolutize(base, href) {
  try {
    return new URL(href, base).href;
  } catch {
    return href;
  }
}

async function scrapePdfLinks() {
  const resp = await fetch(CATALOG_URL);
  if (!resp.ok) throw new Error(`Failed to fetch catalogue page: ${resp.status}`);
  const html = await resp.text();
  const $ = cheerio.load(html);
  const links = new Set();
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (href && href.toLowerCase().includes('.pdf')) {
      links.add(absolutize(CATALOG_URL, href));
    }
  });
  return Array.from(links);
}

async function downloadPdf(url) {
  const filename = path.basename(new URL(url).pathname);
  const localPath = path.join(PUBLIC_PDFS_DIR, filename);
  if (fs.existsSync(localPath)) {
    return { localPath, filename };
  }
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Failed to download ${url}: ${resp.status}`);
  const buffer = await resp.arrayBuffer();
  await fsp.writeFile(localPath, Buffer.from(buffer));
  return { localPath, filename };
}

async function extractText(localPath) {
  const data = await fsp.readFile(localPath);
  const parsed = await pdfParse(data);
  return parsed.text || '';
}

async function buildIndex() {
  await ensureDirs();
  console.log('Scraping catalogue for PDF links...');
  const links = await scrapePdfLinks();
  console.log(`Found ${links.length} PDF links`);

  const index = [];
  for (const url of links) {
    try {
      const { localPath, filename } = await downloadPdf(url);
      console.log(`Downloaded: ${filename}`);
      const text = await extractText(localPath);
      index.push({
        title: filename,
        source: `/pdfs/${filename}`,
        url,
        content: text,
      });
    } catch (err) {
      console.warn(`Skip ${url}: ${err.message}`);
    }
  }

  await fsp.writeFile(INDEX_PATH, JSON.stringify(index, null, 2), 'utf-8');
  console.log(`Index written to ${INDEX_PATH}`);
}

buildIndex().catch((err) => {
  console.error('Failed to build index:', err);
  process.exit(1);
});