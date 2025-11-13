// Minimal local dev server to test static UI and /api/chat without Vercel CLI
// Load environment variables from .env for local development
try {
  require('dotenv').config();
} catch (e) {}
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const chatHandler = require('./api/chat.js');

const PORT = process.env.PORT ? Number(process.env.PORT) : 5174;
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const DATA_DIR = path.join(process.cwd(), 'data');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function serveStatic(req, res) {
  let pathname = url.parse(req.url).pathname || '/';
  if (pathname === '/' || pathname === '') pathname = '/index.html';
  const filePath = path.join(PUBLIC_DIR, pathname);
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.statusCode = 403;
    res.end('Forbidden');
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end('Not Found');
      return;
    }
    const ext = path.extname(filePath);
    res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
    res.end(data);
  });
}

function createRes(res) {
  let statusCode = 200;
  const api = {
    setHeader: (name, value) => res.setHeader(name, value),
    status: (code) => {
      statusCode = code;
      res.statusCode = code;
      return api;
    },
    json: (obj) => {
      res.statusCode = statusCode;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(obj));
    }
  };
  return api;
}

const server = http.createServer(async (req, res) => {
  // Basic CORS for local testing
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  const parsed = url.parse(req.url);
  if (parsed.pathname === '/api/chat') {
    if (req.method !== 'POST') {
      res.statusCode = 405;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Method not allowed' }));
      return;
    }
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      let json = {};
      try {
        json = body ? JSON.parse(body) : {};
      } catch (e) {}
      const fauxReq = { method: req.method, body: json, headers: req.headers };
      const fauxRes = createRes(res);
      try {
        await chatHandler(fauxReq, fauxRes);
      } catch (e) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Internal error', details: String(e) }));
      }
    });
    return;
  }

  // Serve /data/* for local PDFs
  if (parsed.pathname && parsed.pathname.startsWith('/data/')) {
    const pdfPath = path.join(DATA_DIR, parsed.pathname.replace('/data/', ''));
    if (!pdfPath.startsWith(DATA_DIR)) {
      res.statusCode = 403;
      res.end('Forbidden');
      return;
    }
    fs.readFile(pdfPath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('Not Found');
        return;
      }
      const ext = path.extname(pdfPath);
      res.setHeader('Content-Type', ext === '.pdf' ? 'application/pdf' : MIME[ext] || 'application/octet-stream');
      res.end(data);
    });
    return;
  }

  serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log(`Local dev server running at http://localhost:${PORT}/`);
});