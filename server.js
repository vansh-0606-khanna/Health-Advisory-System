require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
const MODEL = process.env.GEMINI_MODEL || 'gemini-3.8-flash';

// Simple in-memory rate limit: 20 requests / minute / IP
const hits = new Map();
function rateLimit(req, res, next) {
  const now = Date.now();
  const arr = (hits.get(req.ip) || []).filter(t => now - t < 60000);
  if (arr.length >= 20) return res.status(429).json({ error: 'Too many requests. Please wait a minute.' });
  arr.push(now);
  hits.set(req.ip, arr);
  next();
}

const aqiCategory = a =>
  a <= 50 ? 'Good' : a <= 100 ? 'Satisfactory' : a <= 200 ? 'Moderate' :
  a <= 300 ? 'Poor' : a <= 400 ? 'Very Poor' : 'Severe';

app.post('/api/chat', rateLimit, async (req, res) => {
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Server is missing GEMINI_API_KEY in .env' });
  }

  const { messages, context } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages is required.' });
  }

  // Gemini uses roles "user" and "model" (not "assistant")
  const contents = messages.slice(-10)
    .filter(m => m && ['user', 'assistant'].includes(m.role) && typeof m.content === 'string')
    .map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content.slice(0, 1000) }]
    }));
  if (!contents.length) return res.status(400).json({ error: 'No valid messages.' });
  while (contents.length && contents[0].role !== 'user') contents.shift(); // must start with user

  const aqi = Number.isFinite(Number(context?.aqi)) ? Number(context.aqi) : 200;
  const location = String(context?.location || 'India').slice(0, 80);

  const system =
    `You are the assistant inside the "Health Advisory System" air and water quality dashboard. ` +
    `Current air quality at ${location}: AQI ${aqi} (${aqiCategory(aqi)}, Indian AQI standard). ` +
    `Give practical, plain-language health advice for this AQI: masks (N95/FFP2), outdoor exercise, ` +
    `windows, air purifiers, and extra care for children, elderly, pregnant people, and people with ` +
    `asthma, COPD or heart disease. Keep answers short (under 150 words), use simple steps. ` +
    `You are not a doctor: for severe symptoms (chest pain, breathing difficulty, fainting) tell the user ` +
    `to seek medical care immediately. Politely decline topics unrelated to health and environment.`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODEL)}:generateContent`;
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': process.env.GEMINI_API_KEY
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents,
        generationConfig: { temperature: 0.4, maxOutputTokens: 1000 }
      })
    });
    const data = await r.json();
    if (!r.ok) {
      console.error('Gemini error:', data);
      return res.status(502).json({ error: data?.error?.message || 'Gemini request failed.' });
    }
    const reply = data.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('').trim();
    if (!reply) {
      console.error('Empty Gemini reply:', JSON.stringify(data).slice(0, 500));
      return res.json({ reply: 'Sorry, I could not answer that. Please try rephrasing.' });
    }
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not reach Gemini.' });
  }
});

app.listen(PORT, () => console.log(`Health Advisory System running at http://localhost:${PORT}`));
