import fs from 'fs';
import path from 'path';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { getAllowedOrigins, sendContactEmail } from './lib/contactService.js';

const preExistingEnvKeys = new Set(
  Object.keys(process.env).filter((key) => Boolean(process.env[key]?.trim())),
);

dotenv.config();

const resolveRequestEnv = () => {
  const merged = { ...process.env };
  for (const filename of ['.env', '.env.local']) {
    const envPath = path.resolve(process.cwd(), filename);
    if (!fs.existsSync(envPath)) continue;
    try {
      const parsed = dotenv.parse(fs.readFileSync(envPath));
      for (const [key, value] of Object.entries(parsed)) {
        if (!preExistingEnvKeys.has(key)) {
          merged[key] = value;
        }
      }
    } catch (error) {
      console.error(`Failed to parse ${filename}:`, error.message);
    }
  }
  return merged;
};

const app = express();
const PORT = process.env.PORT || 5000;

app.disable('x-powered-by');

app.use((req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  });
  next();
});

const allowedOrigins = getAllowedOrigins();

app.use(cors({
  origin: (origin, callback) => callback(null, !origin || allowedOrigins.has(origin)),
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept'],
  maxAge: 600,
}));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again after 15 minutes.',
    });
  },
});

app.use('/api/', apiLimiter);
app.use(express.json({ limit: '32kb', strict: true }));

app.post('/api/contact', async (req, res) => {
  const result = await sendContactEmail(req.body, { env: resolveRequestEnv() });
  return res.status(result.status).json(result.body);
});

app.use((error, _req, res, _next) => {
  if (res.headersSent) return;

  const status = error?.type === 'entity.too.large' ? 413 : 400;
  const message = status === 413 ? 'Request body is too large.' : 'Invalid request.';
  return res.status(status).json({ success: false, message });
});

const HOST = process.env.HOST || (process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1');

app.listen(PORT, HOST, () => {
  console.log(`Contact API listening on port ${PORT}`);
});
