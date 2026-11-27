import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Terminal, ShieldAlert, ShieldCheck, Cpu, RefreshCw, Mail, Github, Linkedin, MapPin } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { submitContactForm } from '../../services/contactClient';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [consoleLogs, setConsoleLogs] = useState([
    'CONTACT FORM: Ready',
    `TRANSPORT: ${window.location.protocol === 'https:' ? 'HTTPS active' : 'Local HTTP'}`
  ]);
  const [packetStatus, setPacketStatus] = useState('AWAITING_INPUT');

  const evaluateStatus = (data) => {
    const hasName = data.name.trim().length > 0;
    const hasEmail = EMAIL_PATTERN.test(data.email.trim());
    const hasMessage = data.message.trim().length >= 5;
    return hasName && hasEmail && hasMessage ? 'TRANSMISSION_READY' : 'AWAITING_INPUT';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    setErrorMessage('');

    const nextStatus = evaluateStatus(updated);
    setPacketStatus(nextStatus);

    setConsoleLogs((prev) => {
      const next = [...prev];
      if (name === 'name' && value.trim().length > 0) {
        next.push(`[RESOLVED] Name field received (${value.trim().length} characters).`);
      } else if (name === 'email' && EMAIL_PATTERN.test(value.trim())) {
        next.push('[VALIDATED] Email field format detected.');
      } else if (name === 'message' && value.trim().length >= 5) {
        next.push(`[BUFFER] Message draft updated. Size: ${value.trim().length} characters`);
      }

      if (nextStatus === 'TRANSMISSION_READY' && packetStatus !== 'TRANSMISSION_READY') {
        next.push('[OK] Form validation passed. Ready to send.');
      }

      return next.slice(-6);
    });
  };

  const handleSecureSend = async (e) => {
    e.preventDefault();
    if (isSending) return;

    const trimmed = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
      website: formData.website,
    };

    if (!trimmed.name) {
      setPacketStatus('SEND_FAILED');
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!EMAIL_PATTERN.test(trimmed.email)) {
      setPacketStatus('SEND_FAILED');
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (trimmed.message.length < 5) {
      setPacketStatus('SEND_FAILED');
      setErrorMessage('Message must be at least 5 characters.');
      return;
    }

    setIsSending(true);
    setErrorMessage('');
    setPacketStatus('TRANSMITTING');
    setConsoleLogs((prev) => [
      ...prev.slice(-3),
      '▶ Preparing contact message...',
      '▶ Sending through /api/contact...',
      '▶ Waiting for the mail service...'
    ]);

    try {
      const result = await submitContactForm(trimmed);

      setIsSending(false);
      setPacketStatus('DELIVERED');
      setConsoleLogs((prev) => [
        ...prev.slice(-4),
        '[SUCCESS] Contact service accepted the message.',
        '[DELIVERED] Email sent to Prosun Banerjee.',
        `[SUCCESS] ${result.message || 'Message delivered successfully.'}`
      ]);
      setFormData({ name: '', email: '', subject: '', message: '', website: '' });
    } catch (error) {
      const reason = error.message || 'Transmission failed. Please try again.';
      setIsSending(false);
      setPacketStatus('SEND_FAILED');
      setErrorMessage(reason);
      setConsoleLogs((prev) => [
        ...prev.slice(-4),
        '[ERROR] Message delivery failed.',
        `[ERROR] ${reason}`
      ]);
    }
  };

  const mailtoFallbackHref = `mailto:prosunbanerjee8@gmail.com?subject=${encodeURIComponent(
    formData.subject.trim() || `Portfolio Inquiry from ${formData.name.trim() || 'Visitor'}`
  )}&body=${encodeURIComponent(
    `From: ${formData.name.trim()} (${formData.email.trim()})\n\n${formData.message.trim()}`
  )}`;

  return (
    <section id="contact" className="scroll-mt-24 py-16 sm:py-24 relative overflow-hidden">
      <div className="space-y-12">

        {/* SECTION HEADER */}
        <div className="space-y-3">
          <motion.h2
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-blue-600 dark:text-sky-400 uppercase tracking-widest"
          >
            &gt;_ SECURE CONNECTION NODE
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100"
          >
            Let&apos;s Build Secure Systems Together
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pointer-events-auto">

          {/* Left Column (Spans 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Card hoverEffect={false} className="p-6 sm:p-8 space-y-6 relative overflow-hidden">
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-blue-500/10 dark:bg-sky-400/15 border border-blue-500/20 dark:border-sky-400/25 text-blue-700 dark:text-sky-300 px-3 py-1.5 rounded-full inline-flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 mr-2 animate-pulse" />
                  AVAILABLE_FOR_ROLES
                </span>

                <div className="space-y-1.5">
                  <h4 className="text-xl font-black text-slate-900 dark:text-slate-100">Prosun Banerjee</h4>
                  <p className="text-xs font-mono text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider">
                    Junior Software Developer <span className="text-slate-400 dark:text-slate-600 font-normal">&bull;</span> Cybersecurity Enthusiast
                  </p>
                </div>
              </div>

              {/* Verified positioning tag blocks */}
              <div className="space-y-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                <div className="flex items-center space-x-2 liquid-glass-well p-2.5 rounded-2xl">
                  <span className="text-blue-600 dark:text-sky-400 font-black">▸</span>
                  <span>Full-Stack Development Learner</span>
                </div>
                <div className="flex items-center space-x-2 liquid-glass-well p-2.5 rounded-2xl">
                  <span className="text-blue-600 dark:text-sky-400 font-black">▸</span>
                  <span>Security-Focused Builder</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans font-medium">
                I&apos;m an ambitious programmer merging low-level C/C++ logic structures with modern web APIs to engineer highly secure, responsive, and performance-oriented systems. Seeking internships or entry-level roles where I can commit robust codes and defend infrastructures.
              </p>

              {/* Direct Coordinate Parameters */}
              <div className="space-y-3 pt-5 border-t border-slate-900/[0.08] dark:border-white/[0.08] font-mono text-[11px] text-slate-600 dark:text-slate-300">
                <a href="mailto:prosunbanerjee8@gmail.com" className="flex items-center space-x-3 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 transition-colors py-1.5 rounded-xl">
                  <Mail className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span>prosunbanerjee8@gmail.com</span>
                </a>
                <a href="https://github.com/probanjee" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 transition-colors py-1.5 rounded-xl">
                  <Github className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span>github.com/probanjee</span>
                </a>
                <a href="https://linkedin.com/in/prosun-banerjee-545942293" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 transition-colors py-1.5 rounded-xl">
                  <Linkedin className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span>linkedin.com/in/prosun-banerjee-545942293</span>
                </a>
                <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-300 py-1.5 rounded-xl">
                  <MapPin className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span>West Bengal, India</span>
                </div>
              </div>

            </Card>

            {/* Contact form status */}
            <Card hoverEffect={false} className="p-5 font-mono text-[11px] space-y-4">

              <div className="flex justify-between items-center pb-2.5 border-b border-slate-900/[0.08] dark:border-white/[0.08] text-slate-500 dark:text-slate-400 text-[9px]">
                <span className="flex items-center">
                  <Terminal className="w-3.5 h-3.5 mr-1.5 text-blue-600 dark:text-sky-400" />
                  CONTACT_FORM_STATUS
                </span>
                <span className={`flex items-center space-x-1 font-bold text-[8px] tracking-widest ${window.location.protocol === 'https:' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-1 ${window.location.protocol === 'https:' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  {window.location.protocol === 'https:' ? 'HTTPS ACTIVE' : 'LOCAL HTTP'}
                </span>
              </div>

              {/* Active Dials */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-2.5 liquid-glass-well rounded-2xl space-y-0.5">
                  <span className="text-[8px] text-slate-500 dark:text-slate-400 block uppercase">FORM STATE</span>
                  <span className={`font-black uppercase text-[10px] ${
                    packetStatus === 'DELIVERED' ? 'text-emerald-600 dark:text-emerald-400' :
                    packetStatus === 'TRANSMISSION_READY' || packetStatus === 'TRANSMITTING' ? 'text-blue-600 dark:text-sky-400' :
                    packetStatus === 'SEND_FAILED' ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'
                  }`}>{packetStatus.replace(/_/g, ' ')}</span>
                </div>
                <div className="p-2.5 liquid-glass-well rounded-2xl space-y-0.5">
                  <span className="text-[8px] text-slate-500 dark:text-slate-400 block uppercase">TRANSPORT</span>
                  <span className="text-indigo-600 dark:text-indigo-300 font-black text-[10px]">
                    {window.location.protocol === 'https:' ? 'HTTPS / TLS ACTIVE' : 'HTTP / NO TLS'}
                  </span>
                </div>
              </div>

              {/* Logs Stream */}
              <div className="space-y-1 pt-1.5 min-h-[100px]">
                <AnimatePresence mode="popLayout">
                  {consoleLogs.map((log, index) => (
                    <motion.p
                      key={`${index}-${log.slice(0, 18)}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className={`text-[10px] sm:text-[11px] ${
                        log.startsWith('[SUCCESS]') || log.startsWith('[DELIVERED]') ? 'text-emerald-600 dark:text-emerald-400 font-bold' :
                        log.startsWith('[ERROR]') ? 'text-red-600 dark:text-red-400 font-bold' :
                        log.startsWith('[RESOLVED]') || log.startsWith('[VALIDATED]') ? 'text-sky-600 dark:text-sky-400' :
                        log.startsWith('[OK]') ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {log}
                    </motion.p>
                  ))}
                </AnimatePresence>
                {isSending && (
                  <div className="flex items-center space-x-2 text-blue-600 dark:text-sky-400 pt-1 font-bold">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending message to mail service...</span>
                  </div>
                )}
              </div>

              {/* Footer specs */}
              <div className="pt-2.5 border-t border-slate-900/[0.08] dark:border-white/[0.08] flex justify-between items-center text-[9px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center uppercase tracking-wider font-bold">
                  <Cpu className="w-3.5 h-3.5 mr-1 text-blue-600 dark:text-sky-400" />
                  REQUEST VALIDATION
                </span>
                <span className="text-slate-700 dark:text-slate-300 font-bold">CLIENT + SERVER</span>
              </div>
            </Card>
          </div>

          {/* Right Column: Secure Form (Spans 7 Cols) */}
          <div className="lg:col-span-7">
            <Card hoverEffect={false} className="p-6 sm:p-8">
              <form onSubmit={handleSecureSend} className="space-y-6 font-mono text-xs">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-slate-600 dark:text-slate-300 uppercase tracking-widest text-[9px] font-bold flex items-center">
                      Name Signature <span className="text-blue-600 dark:text-sky-400 ml-0.5">*</span>
                    </label>
                    <input
                      id="contact-name"
                      required
                      type="text"
                      name="name"
                      autoComplete="name"
                      maxLength={120}
                      placeholder="e.g. Alan Turing"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full liquid-glass-well rounded-2xl px-4 py-3.5 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 transition-colors outline-none"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-slate-600 dark:text-slate-300 uppercase tracking-widest text-[9px] font-bold flex items-center">
                      Secure Channel (Email) <span className="text-blue-600 dark:text-sky-400 ml-0.5">*</span>
                    </label>
                    <input
                      id="contact-email"
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      maxLength={254}
                      placeholder="e.g. operator@discovery.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full liquid-glass-well rounded-2xl px-4 py-3.5 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 transition-colors outline-none"
                    />
                  </div>
                </div>

                {/* Subject field */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="text-slate-600 dark:text-slate-300 uppercase tracking-widest text-[9px] font-bold">
                    Transmission Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    maxLength={160}
                    placeholder="e.g. Full-Stack / C++ Software Development Opportunity"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full liquid-glass-well rounded-2xl px-4 py-3.5 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 transition-colors outline-none"
                  />
                </div>

                {/* Message field */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-slate-600 dark:text-slate-300 uppercase tracking-widest text-[9px] font-bold flex items-center">
                    Payload Message <span className="text-blue-600 dark:text-sky-400 ml-0.5">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows="6"
                    name="message"
                    minLength={5}
                    maxLength={5000}
                    placeholder="Provide secure connection parameters..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full liquid-glass-well rounded-2xl px-4 py-3.5 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 transition-colors outline-none resize-none"
                  />
                </div>

                {/* Anti-spam honeypot (kept hidden from real visitors) */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                {/* Submit Row */}
                <div className="pt-4 border-t border-slate-900/[0.08] dark:border-white/[0.08] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

                  {/* Status Indicator */}
                  <div className="flex flex-col gap-1 text-[10px] font-bold font-mono">
                    {packetStatus === 'DELIVERED' ? (
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center">
                        <ShieldCheck className="w-4 h-4 mr-1.5 shrink-0" />
                        TRANSMITTED SUCCESSFULLY
                      </span>
                    ) : packetStatus === 'TRANSMISSION_READY' ? (
                      <span className="text-blue-600 dark:text-sky-400 flex items-center">
                        <ShieldCheck className="w-4 h-4 mr-1.5 shrink-0" />
                        FORM VALIDATED &amp; READY
                      </span>
                    ) : packetStatus === 'TRANSMITTING' ? (
                      <span className="text-blue-600 dark:text-sky-400 flex items-center">
                        <RefreshCw className="w-4 h-4 mr-1.5 shrink-0 animate-spin" />
                        SENDING MESSAGE...
                      </span>
                    ) : packetStatus === 'SEND_FAILED' ? (
                      <div className="space-y-1">
                        <span className="text-red-600 dark:text-red-400 flex items-center">
                          <ShieldAlert className="w-4 h-4 mr-1.5 shrink-0" />
                          {errorMessage || 'SEND FAILED. PLEASE TRY AGAIN.'}
                        </span>
                        <a
                          href={mailtoFallbackHref}
                          className="inline-flex items-center text-[9px] text-blue-600 dark:text-sky-400 hover:underline pl-5"
                        >
                          Open in your mail app instead &rarr;
                        </a>
                      </div>
                    ) : (
                      <span className="text-slate-500 dark:text-slate-400 flex items-center uppercase tracking-widest">
                        <ShieldAlert className="w-4 h-4 mr-1.5 shrink-0 text-slate-400 dark:text-slate-500" />
                        Awaiting input fields...
                      </span>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant={packetStatus === 'TRANSMISSION_READY' ? 'primary' : 'secondary'}
                    disabled={isSending}
                    className="w-full sm:w-auto px-6 py-3.5 flex items-center justify-center space-x-2 font-mono text-[10px] font-bold uppercase tracking-wider shrink-0"
                  >
                    <span>{isSending ? 'SENDING...' : 'SEND MESSAGE'}</span>
                    <Send className={`w-3.5 h-3.5 ${isSending ? 'animate-pulse' : 'group-hover:translate-x-1 transition-transform'}`} />
                  </Button>

                </div>

              </form>
            </Card>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
