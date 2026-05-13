import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Terminal, ShieldAlert, ShieldCheck, Cpu, RefreshCw, Mail, Github, Linkedin, MapPin, Sparkles } from 'lucide-react';
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
    'SYSTEM DAEMON: Standing by...',
    'PORT 443: Listener active'
  ]);
  const [packetStatus, setPacketStatus] = useState('PENDING_USER_INPUT');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      
      // Dynamic terminal log feedback on input change
      let status = 'PENDING_USER_INPUT';
      let logs = [...consoleLogs];
      
      if (name === 'name' && value.length > 0) {
        logs.push(`[RESOLVED] Client identity signature: "${value}"`);
      } else if (name === 'email' && value.includes('@')) {
        logs.push(`[VALIDATED] Recipient channel resolved to: ${value}`);
      } else if (name === 'message' && value.length > 5) {
        logs.push(`[BUFFER] Payload integrity validated. Size: ${value.length} bytes`);
      }

      // Max 6 logs to prevent clutter
      if (logs.length > 6) logs.shift();
      setConsoleLogs(logs);

      // Simple status engine
      if (updated.name && updated.email.includes('@') && updated.message.length > 5) {
        status = 'TRANSMISSION_READY';
        if (packetStatus !== 'TRANSMISSION_READY') {
          setConsoleLogs(prevLogs => [...prevLogs.slice(-4), '[OK] Packet validation success. AES-256 handshake ready.']);
        }
      } else {
        status = 'INTEGRITY_COMPROMISED';
      }
      
      setPacketStatus(status);
      return updated;
    });
  };

  const handleSecureSend = (e) => {
    e.preventDefault();
    if (packetStatus !== 'TRANSMISSION_READY') return;

    setIsSending(true);
    setPacketStatus('ENCRYPTING_PAYLOAD');
    setConsoleLogs((prev) => [...prev.slice(-3), '▶ Initiating cryptographic tunnel...', '▶ AES-256 block-cipher encryption applied.', '▶ Launching payload packets to probanjee.sec...']);

    // Simulate network latency & packet delivery
    setTimeout(() => {
      setIsSending(false);
      setPacketStatus('DELIVERED');
      setConsoleLogs((prev) => [
        ...prev.slice(-4),
        '[SUCCESS] Handshake verified by remote portal.',
        '[DELIVERED] Message payload safely committed to logs.'
      ]);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2500);
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
            <Card hoverEffect={false} className="p-6 sm:p-8 space-y-6 border border-white/[0.03] bg-[#02050D]/30 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-full filter blur-xl animate-pulse" />
              
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-brand-primary/10 border border-brand-primary/15 text-brand-primary px-3 py-1.5 rounded-full inline-flex items-center">
                  <Sparkles className="w-3 h-3 mr-1 text-brand-primary" />
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

            {/* Simulated Comms Logger Terminal */}
            <Card hoverEffect={false} className="bg-slate-950/80 border border-brand-primary/20 p-5 font-mono text-[11px] text-emerald-400 space-y-4 shadow-[0_0_30px_rgba(59,130,246,0.05)]">
              
              <div className="flex justify-between items-center pb-2.5 border-b border-white/5 text-slate-500 text-[9px]">
                <span className="flex items-center">
                  <Terminal className="w-3.5 h-3.5 mr-1.5 text-brand-primary" /> 
                  SECURE_COMMS_GATEWAY.SH
                </span>
                <span className="flex items-center space-x-1 font-bold text-[8px] tracking-widest text-emerald-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1" />
                  TUNNEL ACTIVE
                </span>
              </div>

              {/* Active Dials */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-2.5 bg-[#02050D]/50 border border-white/5 rounded-xl space-y-0.5">
                  <span className="text-[8px] text-slate-500 block uppercase">GATEWAY STATE</span>
                  <span className={`font-black uppercase text-[10px] ${
                    packetStatus === 'DELIVERED' ? 'text-emerald-400' :
                    packetStatus === 'TRANSMISSION_READY' ? 'text-brand-primary' : 'text-amber-500'
                  }`}>{packetStatus.replace(/_/g, ' ')}</span>
                </div>
                <div className="p-2.5 bg-[#02050D]/50 border border-white/5 rounded-xl space-y-0.5">
                  <span className="text-[8px] text-slate-500 block uppercase">CIPHER LAYER</span>
                  <span className="text-brand-secondary font-black text-[10px]">AES-256 OVER SSL</span>
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
                  GATEWAY HASH
                </span>
                <span className="text-slate-400 font-bold">SHA256::C4F7...B1A8</span>
              </div>
            </Card>
          </div>

          {/* Right Column: Secure Form (Spans 7 Cols) */}
          <div className="lg:col-span-7">
            <Card hoverEffect={false} className="p-6 sm:p-8 border border-white/[0.03]">
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
                      placeholder="e.g. Alan Turing"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-[#050B14]/80 border border-white/5 focus:border-brand-primary/40 focus:ring-1 focus:ring-brand-primary/30 rounded-xl px-4 py-3.5 text-slate-100 placeholder:text-slate-700 transition-all outline-none"
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
                      placeholder="e.g. operator@discovery.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-[#050B14]/80 border border-white/5 focus:border-brand-primary/40 focus:ring-1 focus:ring-brand-primary/30 rounded-xl px-4 py-3.5 text-slate-100 placeholder:text-slate-700 transition-all outline-none"
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
                    placeholder="e.g. Full-Stack / C++ Software Development Opportunity"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-[#050B14]/80 border border-white/5 focus:border-brand-primary/40 focus:ring-1 focus:ring-brand-primary/30 rounded-xl px-4 py-3.5 text-slate-100 placeholder:text-slate-700 transition-all outline-none"
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
                    placeholder="Provide secure connection parameters..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-[#050B14]/80 border border-white/5 focus:border-brand-primary/40 focus:ring-1 focus:ring-brand-primary/30 rounded-xl px-4 py-3.5 text-slate-100 placeholder:text-slate-700 transition-all outline-none resize-none"
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
                        PACKET COMPILED & SECURE
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
                    <span>{isSending ? 'SENDING PACKET...' : 'TRANSMIT PACKET'}</span>
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
