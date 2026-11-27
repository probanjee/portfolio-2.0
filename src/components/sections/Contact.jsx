import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Terminal, ShieldAlert, ShieldCheck, Cpu, RefreshCw, Mail, Github, Linkedin, MapPin } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState([
    'CONTACT FORM: Ready',
    `TRANSPORT: ${window.location.protocol === 'https:' ? 'HTTPS active' : 'Local HTTP'}`
  ]);
  const [packetStatus, setPacketStatus] = useState('AWAITING_INPUT');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      
      // Dynamic terminal log feedback on input change
      let status = 'AWAITING_INPUT';
      let logs = [...consoleLogs];
      
      if (name === 'name' && value.length > 0) {
        logs.push(`[RESOLVED] Name field received (${value.length} characters).`);
      } else if (name === 'email' && value.includes('@')) {
        logs.push('[VALIDATED] Email field format detected.');
      } else if (name === 'message' && value.length > 5) {
        logs.push(`[BUFFER] Message draft updated. Size: ${value.length} characters`);
      }

      // Max 6 logs to prevent clutter
      if (logs.length > 6) logs.shift();
      setConsoleLogs(logs);

      // Simple status engine
      if (updated.name && updated.email.includes('@') && updated.message.length > 5) {
        status = 'TRANSMISSION_READY';
        if (packetStatus !== 'TRANSMISSION_READY') {
          setConsoleLogs(prevLogs => [...prevLogs.slice(-4), '[OK] Form validation passed. Ready to send.']);
        }
      }
      
      setPacketStatus(status);
      return updated;
    });
  };

  const handleSecureSend = async (e) => {
    e.preventDefault();
    if (packetStatus !== 'TRANSMISSION_READY') return;

    setIsSending(true);
    setPacketStatus('TRANSMITTING');
    setConsoleLogs((prev) => [...prev.slice(-3), '▶ Preparing contact message...', '▶ Sending through the current website connection...', '▶ Waiting for the contact service...']);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'omit',
        body: JSON.stringify(formData),
      });

      let data = {};
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch (e) {
          console.error('Failed to parse JSON response:', e);
        }
      } else {
        data = { message: 'Contact service is unavailable. Please try again later.' };
      }

      if (response.ok) {
        setIsSending(false);
        setPacketStatus('DELIVERED');
        setConsoleLogs((prev) => [
          ...prev.slice(-4),
          '[SUCCESS] Contact service accepted the message.',
          '[DELIVERED] Contact email sent successfully.',
          `[SUCCESS] ${data.message || 'Successfully Transmitted'}`
        ]);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || data.error || 'Transmission Failed. Please try again.');
      }
    } catch (error) {
      setIsSending(false);
      setPacketStatus('SEND_FAILED');
      setConsoleLogs((prev) => [
        ...prev.slice(-4),
        '[ERROR] Message delivery failed.',
        `[ERROR] ${error.message || 'Transmission Failed. Please try again.'}`
      ]);
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 py-16 sm:py-24 relative overflow-hidden select-none">
      <div className="space-y-12">
        
        {/* SECTION HEADER */}
        <div className="space-y-3">
          <motion.h2 
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-brand-primary uppercase tracking-widest"
          >
            &gt;_ SECURE CONNECTION NODE
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
          >
            Let's Build Secure Systems Together
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pointer-events-auto">
          
          {/* Left Column: Believable Junior positioning details Card (Spans 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Card hoverEffect={false} className="p-5 sm:p-8 space-y-6 border border-white/[0.03] bg-[#02050D]/30 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-full filter blur-xl animate-pulse" />
              
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-brand-primary/10 border border-brand-primary/15 text-brand-primary px-3 py-1.5 rounded-full inline-flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse" />
                  AVAILABLE_FOR_ROLES
                </span>
                
                <div className="space-y-1.5">
                  <h4 className="text-xl font-black text-slate-100">Prosun Banerjee</h4>
                  <p className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
                    Junior Software Developer <span className="text-slate-600 font-normal">&bull;</span> Cybersecurity Enthusiast
                  </p>
                </div>
              </div>

              {/* Verified positioning tag blocks */}
              <div className="space-y-2 text-xs font-mono text-slate-400">
                <div className="flex items-center space-x-2 bg-slate-950/45 p-2 rounded-lg border border-white/[0.01]">
                  <span className="text-brand-primary font-black">▸</span>
                  <span>Full-Stack Development Learner</span>
                </div>
                <div className="flex items-center space-x-2 bg-slate-950/45 p-2 rounded-lg border border-white/[0.01]">
                  <span className="text-brand-primary font-black">▸</span>
                  <span>Security-Focused Builder</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans font-medium">
                I'm an ambitious programmer merging low-level C/C++ logic structures with modern web APIs to engineer highly secure, responsive, and performance-oriented systems. Seeking internships or entry-level roles where I can commit robust codes and defend infrastructures.
              </p>

              {/* Direct Coordinate Parameters */}
              <div className="space-y-3 pt-5 border-t border-white/[0.03] font-mono text-[11px] text-slate-400">
                <a href="mailto:prosunbanerjee8@gmail.com" className="flex items-center space-x-3 text-slate-400 hover:text-brand-primary transition-colors py-1.5 rounded-xl">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span>prosunbanerjee8@gmail.com</span>
                </a>
                <a href="https://github.com/probanjee" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-slate-400 hover:text-brand-primary transition-colors py-1.5 rounded-xl">
                  <Github className="w-4 h-4 text-slate-500" />
                  <span>github.com/probanjee</span>
                </a>
                <a href="https://linkedin.com/in/prosun-banerjee-545942293" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-slate-400 hover:text-brand-primary transition-colors py-1.5 rounded-xl">
                  <Linkedin className="w-4 h-4 text-slate-500" />
                  <span>linkedin.com/in/prosun-banerjee-545942293</span>
                </a>
                <div className="flex items-center space-x-3 text-slate-400 py-1.5 rounded-xl">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span>West Bengal, India</span>
                </div>
              </div>

            </Card>

            {/* Contact form status */}
            <Card hoverEffect={false} className="bg-slate-950/80 border border-brand-primary/20 p-5 font-mono text-[11px] text-emerald-400 space-y-4 shadow-[0_0_30px_rgba(59,130,246,0.05)]">
              
              <div className="flex justify-between items-center pb-2.5 border-b border-white/5 text-slate-500 text-[9px]">
                <span className="flex items-center">
                  <Terminal className="w-3.5 h-3.5 mr-1.5 text-brand-primary" /> 
                  CONTACT_FORM_STATUS
                </span>
                <span className={`flex items-center space-x-1 font-bold text-[8px] tracking-widest ${window.location.protocol === 'https:' ? 'text-emerald-500' : 'text-amber-500'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-1 ${window.location.protocol === 'https:' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  {window.location.protocol === 'https:' ? 'HTTPS ACTIVE' : 'LOCAL HTTP'}
                </span>
              </div>

              {/* Active Dials */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-2.5 bg-[#02050D]/50 border border-white/5 rounded-xl space-y-0.5">
                  <span className="text-[8px] text-slate-500 block uppercase">FORM STATE</span>
                  <span className={`font-black uppercase text-[10px] ${
                    packetStatus === 'DELIVERED' ? 'text-emerald-400' :
                    packetStatus === 'TRANSMISSION_READY' || packetStatus === 'TRANSMITTING' ? 'text-brand-primary' :
                    packetStatus === 'SEND_FAILED' ? 'text-red-400' : 'text-amber-500'
                  }`}>{packetStatus.replace(/_/g, ' ')}</span>
                </div>
                <div className="p-2.5 bg-[#02050D]/50 border border-white/5 rounded-xl space-y-0.5">
                  <span className="text-[8px] text-slate-500 block uppercase">TRANSPORT</span>
                  <span className="text-brand-secondary font-black text-[10px]">
                    {window.location.protocol === 'https:' ? 'HTTPS / TLS ACTIVE' : 'HTTP / NO TLS'}
                  </span>
                </div>
              </div>

              {/* Logs Stream */}
              <div className="space-y-1 pt-1.5 min-h-[100px]">
                <AnimatePresence mode="popLayout">
                  {consoleLogs.map((log, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className={`text-[10px] sm:text-[11px] ${
                        log.startsWith('[SUCCESS]') || log.startsWith('[DELIVERED]') ? 'text-emerald-400 font-bold' :
                        log.startsWith('[RESOLVED]') || log.startsWith('[VALIDATED]') ? 'text-brand-accent' :
                        log.startsWith('[OK]') ? 'text-brand-primary' : 'text-slate-500'
                      }`}
                    >
                      {log}
                    </motion.p>
                  ))}
                </AnimatePresence>
                {isSending && (
                  <div className="flex items-center space-x-2 text-brand-primary pt-1 font-bold">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Synchronizing payload packets...</span>
                  </div>
                )}
              </div>

              {/* Footer specs */}
              <div className="pt-2.5 border-t border-white/5 flex justify-between items-center text-[9px] text-slate-500">
                <span className="flex items-center uppercase tracking-wider font-bold">
                  <Cpu className="w-3.5 h-3.5 mr-1 text-brand-primary" /> 
                  REQUEST VALIDATION
                </span>
                <span className="text-slate-400 font-bold">CLIENT + SERVER</span>
              </div>
            </Card>
          </div>

          {/* Right Column: Secure Form (Spans 7 Cols) */}
          <div className="lg:col-span-7">
            <Card hoverEffect={false} className="p-5 sm:p-8 border border-white/[0.03]">
              <form onSubmit={handleSecureSend} className="space-y-6 font-mono text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-slate-400 uppercase tracking-widest text-[9px] font-black flex items-center">
                      Name Signature <span className="text-brand-primary ml-0.5">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      maxLength={120}
                      placeholder="e.g. Alan Turing"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-[#050B14]/80 border border-white/5 focus:border-brand-primary/40 focus:ring-1 focus:ring-brand-primary/30 rounded-xl px-3.5 py-3 sm:px-4 sm:py-3.5 text-slate-100 placeholder:text-slate-700 transition-all outline-none"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label className="text-slate-400 uppercase tracking-widest text-[9px] font-black flex items-center">
                      Secure Channel (Email) <span className="text-brand-primary ml-0.5">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      maxLength={254}
                      placeholder="e.g. operator@discovery.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-[#050B14]/80 border border-white/5 focus:border-brand-primary/40 focus:ring-1 focus:ring-brand-primary/30 rounded-xl px-3.5 py-3 sm:px-4 sm:py-3.5 text-slate-100 placeholder:text-slate-700 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Subject field */}
                <div className="space-y-1.5">
                  <label className="text-slate-400 uppercase tracking-widest text-[9px] font-black">
                    Transmission Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    maxLength={160}
                    placeholder="e.g. Full-Stack / C++ Software Development Opportunity"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-[#050B14]/80 border border-white/5 focus:border-brand-primary/40 focus:ring-1 focus:ring-brand-primary/30 rounded-xl px-3.5 py-3 sm:px-4 sm:py-3.5 text-slate-100 placeholder:text-slate-700 transition-all outline-none"
                  />
                </div>

                {/* Message field */}
                <div className="space-y-1.5">
                  <label className="text-slate-400 uppercase tracking-widest text-[9px] font-black flex items-center">
                    Payload Message <span className="text-brand-primary ml-0.5">*</span>
                  </label>
                  <textarea
                    required
                    rows="6"
                    name="message"
                    maxLength={5000}
                    placeholder="Provide secure connection parameters..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-[#050B14]/80 border border-white/5 focus:border-brand-primary/40 focus:ring-1 focus:ring-brand-primary/30 rounded-xl px-3.5 py-3 sm:px-4 sm:py-3.5 text-slate-100 placeholder:text-slate-700 transition-all outline-none resize-none"
                  />
                </div>

                {/* Submit Row */}
                <div className="pt-4 border-t border-white/[0.03] flex flex-col sm:flex-row justify-between items-center gap-4">
                  
                  {/* Status Indicator */}
                  <div className="flex items-center text-[9px] font-bold font-mono">
                    {packetStatus === 'DELIVERED' ? (
                      <span className="text-emerald-400 flex items-center">
                        <ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-400 animate-bounce" /> 
                        TRANSMITTED SUCCESSFULLY
                      </span>
                    ) : packetStatus === 'TRANSMISSION_READY' ? (
                      <span className="text-brand-primary flex items-center">
                        <ShieldCheck className="w-4 h-4 mr-1.5 text-brand-primary" /> 
                        FORM VALIDATED & READY
                      </span>
                    ) : packetStatus === 'TRANSMITTING' ? (
                      <span className="text-brand-primary flex items-center">
                        <RefreshCw className="w-4 h-4 mr-1.5 animate-spin" />
                        SENDING MESSAGE...
                      </span>
                    ) : packetStatus === 'SEND_FAILED' ? (
                      <span className="text-red-400 flex items-center">
                        <ShieldAlert className="w-4 h-4 mr-1.5" />
                        SEND FAILED. PLEASE TRY AGAIN.
                      </span>
                    ) : (
                      <span className="text-slate-500 flex items-center uppercase tracking-widest">
                        <ShieldAlert className="w-4 h-4 mr-1.5 text-slate-600" /> 
                        Awaiting input fields...
                      </span>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant={packetStatus === 'TRANSMISSION_READY' ? 'primary' : 'secondary'}
                    disabled={packetStatus !== 'TRANSMISSION_READY' || isSending}
                    className="w-full sm:w-auto px-6 py-3.5 flex items-center justify-center space-x-2 font-mono text-[10px] font-bold uppercase tracking-wider"
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
