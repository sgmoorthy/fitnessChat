// Build RAG index from locally available PDFs in /data
// Produces data/index.json with entries referencing /data/<filename>.pdf

const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const pdfParse = require('pdf-parse');

const DATA_DIR = path.join(process.cwd(), 'data');
const INDEX_PATH = path.join(DATA_DIR, 'index.json');

async function listPdfFiles() {
  const entries = await fsp.readdir(DATA_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => name.toLowerCase().endsWith('.pdf'));
}

async function extractText(pdfPath) {
  const data = await fsp.readFile(pdfPath);
  const parsed = await pdfParse(data);
  return parsed.text || '';
}

async function buildIndex() {
  const pdfs = await listPdfFiles();
  if (pdfs.length === 0) {
    console.log('No PDFs found under /data.');
  } else {
    console.log(`Found ${pdfs.length} PDFs under /data`);
  }

  const index = [];
  for (const filename of pdfs) {
    const filePath = path.join(DATA_DIR, filename);
    try {
      console.log(`Indexing: ${filename}`);
      const text = await extractText(filePath);
      index.push({
        title: filename,
        source: `/data/${filename}`,
        url: null,
        content: text,
      });
    } catch (err) {
      console.warn(`Skip ${filename}: ${err.message}`);
    }
  }

  await fsp.writeFile(INDEX_PATH, JSON.stringify(index, null, 2), 'utf-8');
  console.log(`Index written to ${INDEX_PATH} with ${index.length} entries`);
}

buildIndex().catch((err) => {
  console.error('Failed to build local index:', err);
  process.exit(1);
});