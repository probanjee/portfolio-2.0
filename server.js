import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();
console.log('✓ Environment Variables Loaded');
console.log(`process.cwd(): ${process.cwd()}`);

if (process.env.EMAIL_USER) {
  console.log('✓ EMAIL_USER loaded');
}
if (process.env.EMAIL_PASS) {
  console.log('✓ EMAIL_PASS loaded');
  console.log(`EMAIL_PASS length: ${process.env.EMAIL_PASS.trim().length}`);
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());

// Rate limiting: 5 requests per 15 minutes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  handler: (req, res) => {
    const errorMsg = 'Too many requests from this IP, please try again after 15 minutes';
    console.log(`✗ Exact SMTP error:\n${errorMsg}`);
    res.status(429).json({ success: false, message: errorMsg });
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', apiLimiter);

// Basic HTML sanitization to prevent HTML injection in emails
const sanitizeInput = (str) => {
  if (typeof str !== 'string') return '';
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

app.post('/api/contact', async (req, res) => {
  console.log('✓ Request Received');
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name) {
      const errorMsg = 'Name is required';
      console.log(`✗ Exact SMTP error:\n${errorMsg}`);
      return res.status(400).json({ success: false, message: errorMsg });
    }
    if (!email) {
      const errorMsg = 'Email is required';
      console.log(`✗ Exact SMTP error:\n${errorMsg}`);
      return res.status(400).json({ success: false, message: errorMsg });
    }
    if (!email.includes('@')) {
      const errorMsg = 'Invalid email address';
      console.log(`✗ Exact SMTP error:\n${errorMsg}`);
      return res.status(400).json({ success: false, message: errorMsg });
    }
    if (!message) {
      const errorMsg = 'Message is required';
      console.log(`✗ Exact SMTP error:\n${errorMsg}`);
      return res.status(400).json({ success: false, message: errorMsg });
    }
    if (message.length < 5) {
      const errorMsg = 'Message must be at least 5 characters long';
      console.log(`✗ Exact SMTP error:\n${errorMsg}`);
      return res.status(400).json({ success: false, message: errorMsg });
    }

    console.log('✓ Validation Passed');

    // Step 3 - Verify Env Variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      const errorMsg = 'Missing EMAIL_USER or EMAIL_PASS in .env';
      console.log(`✗ Exact SMTP error:\n${errorMsg}`);
      return res.status(400).json({ success: false, message: errorMsg });
    }

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER.trim(),
        pass: process.env.EMAIL_PASS.trim()
      }
    });

    // Verify SMTP connection
    try {
      await transporter.verify();
      console.log('✓ SMTP authentication successful');
    } catch (verifyError) {
      console.log(`✗ Exact SMTP error:\n${verifyError.message}`);
      return res.status(500).json({ success: false, message: verifyError.message });
    }

    console.log('✓ Nodemailer Initialized');

    // Sanitization
    const safeName = sanitizeInput(name);
    const safeEmail = sanitizeInput(email);
    const safeSubject = sanitizeInput(subject || '');
    const safeMessage = sanitizeInput(message);

    // Date & Time
    const timestamp = new Date().toLocaleString();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'prosunbanerjee8@gmail.com',
      replyTo: safeEmail,
      subject: `Portfolio Contact - ${safeSubject || 'New Contact'}`,
      text: `New Portfolio Contact Submission

Date & Time:
${timestamp}

Sender Name:
${safeName}

Sender Email:
${safeEmail}

Subject:
${safeSubject || 'N/A'}

Message:
${safeMessage}`,
      html: `<h3>New Portfolio Contact Submission</h3>
<p><strong>Date & Time:</strong><br/>${timestamp}</p>
<p><strong>Sender Name:</strong><br/>${safeName}</p>
<p><strong>Sender Email:</strong><br/>${safeEmail}</p>
<p><strong>Subject:</strong><br/>${safeSubject || 'N/A'}</p>
<p><strong>Message:</strong><br/>${safeMessage.replace(/\n/g, '<br/>')}</p>`,
    };

    console.log('✓ Sending Email...');
    await transporter.sendMail(mailOptions);
    console.log('✓ Email Sent Successfully');

    res.status(200).json({ success: true, message: 'Successfully Transmitted' });
  } catch (error) {
    console.log(`✗ Exact Error:\n${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log('✓ Server Started');
  console.log(`Listening on port ${PORT}`);
});
