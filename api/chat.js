const fs = require('fs');
const path = require('path');

// api/chat.js
export default async function handler(req, res) {
  // Simple echo/diagnostics (replace with actual logic)
  const { query } = req.body || {};
  res.json({
    answer: `You asked: ${query}`,
    sources: [],
  });
}

// Optional LLM integration (OpenAI). If not configured, we fall back to templated answers.
let openaiClient = null;
try {
  const OpenAI = require('openai');
  if (process.env.OPENAI_API_KEY) {
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
} catch (e) {
  // openai package not installed or runtime missing; we'll handle gracefully
}

function loadIndex() {
  const indexPath = path.join(process.cwd(), 'data', 'index.json');
  if (!fs.existsSync(indexPath)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(indexPath, 'utf-8');
    const data = JSON.parse(raw);
    if (Array.isArray(data)) return data;
    return [];
  } catch (err) {
    return [];
  }
}

function scoreDocument(query, text) {
  const q = query.toLowerCase();
  const terms = q.split(/[^a-z0-9]+/).filter(Boolean);
  let score = 0;
  const lower = (text || '').toLowerCase();
  for (const t of terms) {
    const count = (lower.match(new RegExp(`\\b${t}\\b`, 'g')) || []).length;
    score += count;
  }
  return score;
}

function retrieve(query, index, k = 5) {
  const scored = index
    .map((doc) => ({ ...doc, _score: scoreDocument(query, doc.content || '') }))
    .filter((d) => d._score > 0)
    .sort((a, b) => b._score - a._score)
    .slice(0, k);
  return scored;
}

async function generateLLMAnswer(query, retrieved) {
  if (!openaiClient) return null;
  const systemPrompt = `You are an assistant for Energy Fitness equipment. Answer using only the provided context from official PDFs. If unsure, say you need more details. Include product names, specifications, and relevant links when available.`;
  const context = retrieved
    .map((r, i) => `Source ${i + 1}: ${r.title || r.source || r.url}\n${(r.content || '').slice(0, 2000)}`)
    .join('\n\n');
  const prompt = `User question: ${query}\n\nContext:\n${context}`;

  try {
    const resp = await openaiClient.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: 0.2,
    });
    const answer = resp.choices?.[0]?.message?.content || '';
    return answer;
  } catch (err) {
    return null;
  }
}

// Fallback composition utilities (no LLM)
function splitSentences(text) {
  const parts = (text || '')
    .replace(/\s+/g, ' ')
    .split(/(?<=\.)\s+|\n+/);
  return parts.map((s) => s.trim()).filter((s) => s.length > 20 && s.length < 500);
}

function termSet(query) {
  return new Set(
    (query || '')
      .toLowerCase()
      .split(/[^a-z0-9\+\-\.]+/)
      .filter(Boolean)
  );
}

function scoreSentenceByTerms(sentence, terms) {
  const s = sentence.toLowerCase();
  let score = 0;
  for (const t of terms) {
    if (t.length < 2) continue;
    if (s.includes(t)) score += 2;
  }
  const specHints = ['mm', 'cm', 'inch', 'kg', 'lbs', 'watt', 'watts', 'speed', 'incline', 'dimensions', 'weight', 'warranty', 'frame', 'drive', 'motor'];
  for (const h of specHints) {
    if (s.includes(h)) score += 1;
  }
  return score;
}

function composeSummary(query, retrieved) {
  const terms = termSet(query);
  const sections = [];

  const q = query.toLowerCase();
  const compareIntent = q.includes('compare') || q.includes(' vs ');
  let leftKey = null;
  let rightKey = null;
  if (compareIntent) {
    const vsSplit = q.split(/vs|versus/);
    if (vsSplit.length === 2) {
      leftKey = vsSplit[0].replace(/compare|between|and/g, '').trim().split(/\s+/).pop() || null;
      rightKey = vsSplit[1].trim().split(/\s+/)[0] || null;
    }
  }

  const topDocs = retrieved.slice(0, 3);
  for (const doc of topDocs) {
    const sentences = splitSentences(doc.content || '');
    const isLikelyEnglish = (s) => {
      const asciiCount = (s.match(/[\x20-\x7E]/g) || []).length;
      const ratio = asciiCount / Math.max(1, s.length);
      const wordish = (s.match(/[A-Za-z]{3,}/g) || []).length >= 3;
      return ratio > 0.75 && wordish;
    };
    const scored = sentences
      .filter(isLikelyEnglish)
      .map((s) => ({ s, score: scoreSentenceByTerms(s, terms) }))
      .filter((o) => o.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    if (scored.length === 0) continue;
    sections.push({
      title: doc.title || doc.source || doc.url || 'Source',
      points: scored.map((o) => o.s)
    });
  }

  if (sections.length === 0) return null;

  // Build more natural narrative paragraphs
  const normalizeTitle = (title) => {
    const t = (title || '').replace(/\.pdf$/i, '').replace(/[_-]+/g, ' ').trim();
    if (/\bmi6\b/i.test(t)) return 'HOIST Mi6';
    if (/\bmi7\b/i.test(t)) return 'HOIST Mi7';
    return t || 'Source';
  };

  const makeParagraph = (title, points) => {
    // Use up to 3 sentences to keep it concise
    const seen = new Set();
    const chosen = points
      .slice(0, 3)
      .map((p) => p.replace(/^[-•]\s*/, '').replace(/\n[-•]\s*/g, ' ').replace(/\s{2,}/g, ' ').trim())
      .filter((p) => p.length >= 40)
      .filter((p) => {
        const key = p.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    const sentence = chosen.join(' ');
    return `${normalizeTitle(title)}: ${sentence}`;
  };

  let intro = 'Summary from indexed Energy Fitness PDFs:';
  if (compareIntent && leftKey && rightKey) {
    intro = `Comparison based on indexed Energy Fitness PDFs (focus on ${leftKey} vs ${rightKey}):`;
  }

  const paragraphs = sections.map((sec) => makeParagraph(sec.title, sec.points));
  const outro = 'If you share the exact brand/model or category, I can refine specs and differences.';
  return `${intro}\n\n${paragraphs.join('\n\n')}\n\n${outro}`;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    const { query, history } = req.body || {};
    if (!query || typeof query !== 'string') {
      res.status(400).json({ error: 'Missing query string in body' });
      return;
    }

    const index = loadIndex();
    const retrieved = retrieve(query, index, 5);

    let answer = await generateLLMAnswer(query, retrieved);
    if (!answer) {
      const composed = composeSummary(query, retrieved);
      if (composed) {
        answer = composed;
      } else if (retrieved.length > 0) {
        const bullets = retrieved
          .map((r) => `- From ${r.title || r.source || r.url}`)
          .join('\n');
        answer = `Here’s what I found in the official Energy Fitness PDFs related to your question:\n\n${bullets}\n\nOpen the sources to view specifications, dimensions, and product details. I can refine the response if you provide more specifics (brand, model, or category).`;
      } else {
        answer = 'I could not find relevant content in the indexed PDFs. Please try refining your question with product names, brands, or categories.';
      }
    }

    const sources = retrieved.map((r) => ({
      title: r.title || null,
      source: r.source || null,
      url: r.url || null,
    }));

    res.status(200).json({ answer, sources });
  } catch (err) {
    res.status(500).json({ error: 'Internal error', details: String(err) });
  }
};
