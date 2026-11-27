import { sendContactEmail } from '../lib/contactService.js';

const DEFAULT_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
  'https://probanjee.vercel.app',
];

const getAllowedOrigins = () =>
  new Set(
    (process.env.CORS_ORIGINS || DEFAULT_ORIGINS.join(','))
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
  );

export default async function handler(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  const origin = req.headers.origin;
  const allowedOrigins = getAllowedOrigins();
  if (origin && allowedOrigins.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  if (origin && !allowedOrigins.has(origin)) {
    return res.status(403).json({ success: false, message: 'Origin not allowed.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ success: false, message: 'Invalid JSON payload.' });
    }
  }

  const result = await sendContactEmail(body);
  return res.status(result.status).json(result.body);
}
