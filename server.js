import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

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

const defaultOrigins = ['http://localhost:5173', 'https://probanjee.vercel.app'];
const allowedOrigins = new Set(
  (process.env.CORS_ORIGINS || defaultOrigins.join(','))
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
);

app.use(cors({
  origin: (origin, callback) => callback(null, !origin || allowedOrigins.has(origin)),
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  maxAge: 600,
}));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
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
  const payload = req.body;
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return res.status(400).json({ success: false, message: 'Invalid request.' });
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const subject = typeof payload.subject === 'string' ? payload.subject.trim() : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';

  if (!name || name.length > 120) {
    return res.status(400).json({ success: false, message: 'Name is required and must be 120 characters or fewer.' });
  }
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'Enter a valid email address.' });
  }
  if (subject.length > 160 || /[\r\n]/.test(subject)) {
    return res.status(400).json({ success: false, message: 'Subject must be 160 characters or fewer.' });
  }
  if (message.length < 5 || message.length > 5000) {
    return res.status(400).json({ success: false, message: 'Message must be between 5 and 5000 characters.' });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Contact delivery is unavailable: email credentials are not configured.');
    return res.status(503).json({ success: false, message: 'Contact delivery is temporarily unavailable.' });
  }

  const escapeHtml = (value) => value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');
  const timestamp = new Date().toLocaleString();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
    auth: {
      user: process.env.EMAIL_USER.trim(),
      pass: process.env.EMAIL_PASS.trim(),
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER.trim(),
      to: 'prosunbanerjee8@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact - ${subject || 'New Contact'}`,
      text: `New Portfolio Contact Submission\n\nDate & Time:\n${timestamp}\n\nSender Name:\n${name}\n\nSender Email:\n${email}\n\nSubject:\n${subject || 'N/A'}\n\nMessage:\n${message}`,
      html: `<h3>New Portfolio Contact Submission</h3>
<p><strong>Date &amp; Time:</strong><br/>${escapeHtml(timestamp)}</p>
<p><strong>Sender Name:</strong><br/>${safeName}</p>
<p><strong>Sender Email:</strong><br/>${safeEmail}</p>
<p><strong>Subject:</strong><br/>${safeSubject || 'N/A'}</p>
<p><strong>Message:</strong><br/>${safeMessage}</p>`,
    });

    return res.status(200).json({ success: true, message: 'Successfully transmitted.' });
  } catch (error) {
    console.error('Contact delivery failed.', { code: error?.code || 'UNKNOWN' });
    return res.status(500).json({ success: false, message: 'Message could not be sent. Please try again later.' });
  }
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
