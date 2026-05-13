import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Shield, Terminal, Cpu, Activity, Server, 
  Database, GitBranch, Play, ExternalLink, AlertTriangle, 
  CheckCircle, Globe, ShieldAlert, Zap, Layers 
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Route adapter to resolve front-facing IDs to data database IDs
  const idMap = {
    'honeypot-system': 'honeypot-system',
    'file-encryption-tool': 'file-encryption-tool',
    'heuristic-workout-app': 'workout-planning-app',
    'workout-planning-app': 'workout-planning-app',
    'dynamic-api-generator': 'api-automation-generator',
    'api-automation-generator': 'api-automation-generator'
  };

  const resolvedId = idMap[id] || id;
  const project = portfolioData.projects.find((p) => p.id === resolvedId);

  // States for the fully interactive AI Threat Feed Simulator (Honeypot Case Study)
  const [threatLogs, setThreatLogs] = useState([
    { id: 1, ip: '185.220.101.4', country: 'RU', port: 22, type: 'Brute Force SSH', severity: 'CRITICAL', time: 'JUST NOW' },
    { id: 2, ip: '45.227.254.12', country: 'NL', port: 80, type: 'SQL Injection', severity: 'HIGH', time: '2s ago' },
    { id: 3, ip: '194.26.29.112', country: 'CN', port: 8080, type: 'Port Mapping Sweep', severity: 'MEDIUM', time: '5s ago' }
  ]);
  const [attackCounter, setAttackCounter] = useState(14282);

  // Simulated live log generator
  useEffect(() => {
    if (resolvedId !== 'honeypot-system') return;

    const ips = ['83.149.9.216', '110.50.243.12', '198.51.100.42', '45.143.203.4', '185.222.211.5'];
    const countries = ['UA', 'US', 'DE', 'SG', 'BR'];
    const ports = [22, 80, 443, 8080, 3306];
    const attacks = ['DDoS Syn Flood', 'Cross-Site Scripting (XSS)', 'Ransomware Payload Attempt', 'Buffer Overflow Spec', 'MySQL Injection Try'];
    const severities = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

    const interval = setInterval(() => {
      const newLog = {
        id: Date.now(),
        ip: ips[Math.floor(Math.random() * ips.length)],
        country: countries[Math.floor(Math.random() * countries.length)],
        port: ports[Math.floor(Math.random() * ports.length)],
        type: attacks[Math.floor(Math.random() * attacks.length)],
        severity: severities[Math.floor(Math.random() * severities.length)],
        time: 'JUST NOW'
      };

      setThreatLogs(prev => {
        const updated = [newLog, ...prev.map(log => ({
          ...log,
          time: log.time === 'JUST NOW' ? '3s ago' : log.time === '2s ago' ? '5s ago' : '10s ago'
        }))];
        return updated.slice(0, 5); // Constrain list height
      });

      setAttackCounter(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [resolvedId]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center text-center space-y-4 pt-24 font-mono select-none">
        <h2 className="text-2xl font-bold text-slate-100">404: SECURE ENCLAVE RESTRICTED</h2>
        <p className="text-sm text-slate-500 max-w-sm">The project parameter you requested does not exist or has been restricted.</p>
        <Button variant="outline" onClick={() => navigate('/')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          RETURN TO DASHBOARD
        </Button>
      </div>
    );
  }

  // Case Study comprehensive structured DB
  const caseStudies = {
    'honeypot-system': {
      problem: "Traditional corporate defense architectures suffer from high opacity. Standard firewall configurations dropping network packets offer zero feedback on adversary motivations, lateral escalation strategies, or raw payload signatures. Security centers are forced into completely reactive, blind states.",
      architecture: "A distributed micro-daemon honeypot matrix. Low-interaction virtual listeners masquerading as standard SSH and HTTP ports capture active session logs. Raw TCP/IP streams are ingested directly by concurrent Apache Kafka queues to guarantee partition buffering, which then feed a multi-threaded FastAPI engine to execute heuristic classification rules before logging signals.",
      decisions: "Selecting Apache Kafka was a critical operational decision to buffer extreme burst loads occurring during synchronized brute-force sweeps. Choosing FastAPI's asynchronous IO loops eliminated threading latency, allowing standard servers to coordinate multi-source packet captures efficiently. A single-page React analytics interface renders the live logs visually.",
      challenges: "Massive volumetric scan traffic triggered connection thread exhaustions at the aggregation interface. This challenge was resolved by introducing an in-memory sliding-window Token Bucket rate-limiter combined with persistent multi-stage logging caches to isolate telemetry processing loops from main ingestion threads."
    },
    'file-encryption-tool': {
      problem: "Desktop application security operations require rapid file hashing and stream ciphers, but standard GUI systems load target files fully into the heapspace. When processing larger video, backup, or machine image blocks, this design triggers memory exhaustions and desktop application thread freezes.",
      architecture: "A bare-metal stream processing engine written in native C. Rather than loading full files, this architecture allocates standard 16KB stream windows, processing data blocks sequentially utilizing lightweight key-based ciphers before releasing the buffers back to physical registers.",
      decisions: "ISO-compliant C was selected to bypass garbage-collector intervals and minimize runtime overheads. Programmed with clean object-like modular frameworks to simplify future integration of public-key cipher block upgrades.",
      challenges: "Volumetric file streaming occasionally triggered heap errors when facing corrupted header blocks. Resolved by designing an internal integrity pre-flight validator block that reads the initial file header structure to secure block alignments before allocating cipher memory."
    },
    'workout-planning-app': {
      problem: "Standard wellness apps construct fixed schedule plans. If users hit inevitable schedule conflicts, the software fails to adapt, inducing user frustration and leading directly to routine abandonment.",
      architecture: "A decoupled Python utility operating as a localized service. The system parses local JSON databases containing physical threshold levels and calendars. When a workout is skipped, a heuristic adapter recalculates targets, using a rule-based system to reschedule activities.",
      decisions: "Designed utilizing Python to leverage lightweight built-in libraries. Opted for local JSON files rather than external cloud database engines to guarantee absolute user privacy and ensure instant offline responsiveness.",
      challenges: "Triggering OS-level background desktop toast alerts blocked the main scheduling thread, causing lags in CLI interactions. Solved by decoupling system warning alerts into dedicated background workers utilizing Python's `threading` modules."
    },
    'api-automation-generator': {
      problem: "Scaffolding backend endpoints, Express models, routes, database connections, and validation checks takes developers hours of repetitive, manual boilerplate drafting, which is highly prone to human script syntax errors.",
      architecture: "A modern metadata transpilation engine. A visual React interface allows rapid definition of JSON model schemas. The client-side utility maps these inputs against standard Express/ESM template structures, compiling fully configured zip archives ready for server injection.",
      decisions: "React + Tailwind CSS was used to provide a high-fidelity visual interface for model editing. Integrated client-side compilation structures using memory buffers to execute archive creations entirely without server runtime delays.",
      challenges: "Maintaining multi-directory structure integrity when compressing templates within browser environments. Resolved by constructing nested tree paths dynamically using in-memory virtual blobs before pushing outputs to high-speed file download vectors."
    }
  };

  const currentStudy = caseStudies[resolvedId] || caseStudies['honeypot-system'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="pt-24 sm:pt-32 space-y-12 pb-24 select-none"
    >
      
      {/* 1. Header Back Button & Metadata */}
      <div className="flex items-center justify-between">
        <Link to="/" className="inline-flex items-center text-xs font-mono font-bold tracking-widest text-slate-400 hover:text-brand-primary transition-colors uppercase group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>
        <div className="flex items-center space-x-2.5 font-mono text-[10px] text-slate-500">
          <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
          <span>ENCLAVE_NODE: {project.id.toUpperCase()}</span>
        </div>
      </div>

      {/* 2. Cinematic Project Hero */}
      <div className="space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-primary/5 border border-brand-primary/15 text-brand-primary text-[10px] sm:text-xs font-semibold font-mono uppercase tracking-widest">
          <Shield className="w-3.5 h-3.5" />
          <span>SECURE SEC_AUDIT VERIFIED</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05]">{project.title}</h1>
        <p className="text-base sm:text-xl text-slate-400 leading-relaxed font-sans max-w-4xl font-medium">{project.shortDescription}</p>
      </div>

      {/* 3. Main Split Case Study Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Editorial System Analysis (Spans 7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Problem Statement Card */}
          <Card hoverEffect={false} className="p-6 sm:p-8 space-y-4 border border-white/[0.03] bg-[#02050D]/30 backdrop-blur-md">
            <div className="flex items-center space-x-2 text-brand-accent">
              <AlertTriangle className="w-4 h-4" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest">01 / Problem Statement</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans font-medium">
              {currentStudy.problem}
            </p>
          </Card>

          {/* Architecture Card */}
          <Card hoverEffect={false} className="p-6 sm:p-8 space-y-4 border border-white/[0.03] bg-[#02050D]/30 backdrop-blur-md">
            <div className="flex items-center space-x-2 text-brand-primary">
              <Layers className="w-4 h-4" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest">02 / System Architecture</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans font-medium">
              {currentStudy.architecture}
            </p>
          </Card>

          {/* Engineering Decisions Card */}
          <Card hoverEffect={false} className="p-6 sm:p-8 space-y-4 border border-white/[0.03] bg-[#02050D]/30 backdrop-blur-md">
            <div className="flex items-center space-x-2 text-brand-secondary">
              <Zap className="w-4 h-4 animate-pulse" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest">03 / Key Engineering Decisions</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans font-medium">
              {currentStudy.decisions}
            </p>
          </Card>

          {/* Critical Challenges Solved Card */}
          <Card hoverEffect={false} className="p-6 sm:p-8 space-y-4 border border-white/[0.03] bg-[#02050D]/30 backdrop-blur-md">
            <div className="flex items-center space-x-2 text-emerald-400">
              <CheckCircle className="w-4 h-4" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest">04 / Tactical Challenges Solved</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans font-medium">
              {currentStudy.challenges}
            </p>
          </Card>

        </div>

        {/* Right Side: Interactive Mockup sandbox (Spans 5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* A. Dynamic Mockups based on resolvedId */}
          {resolvedId === 'honeypot-system' && (
            <Card hoverEffect={false} className="border border-brand-primary/20 bg-slate-950/80 p-5 sm:p-6 font-mono text-xs space-y-5 shadow-[0_0_40px_rgba(59,130,246,0.06)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-full filter blur-xl animate-pulse" />
              
              {/* Header */}
              <div className="flex justify-between items-center pb-3 border-b border-white/5 text-slate-500 text-[9px]">
                <span className="flex items-center text-brand-primary font-bold"><Terminal className="w-3.5 h-3.5 mr-1.5" /> VIGILANCE_THREAT_FEED.SH</span>
                <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1" /> LIVE PIPELINE</span>
              </div>

              {/* Status metrics bar */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-[#02050D]/50 border border-white/5 rounded-xl space-y-1">
                  <span className="text-[8px] text-slate-500 block uppercase">Captured Events</span>
                  <span className="text-sm text-brand-primary font-bold tracking-widest">{attackCounter.toLocaleString()}</span>
                </div>
                <div className="p-3 bg-[#02050D]/50 border border-white/5 rounded-xl space-y-1">
                  <span className="text-[8px] text-slate-500 block uppercase">Daemon Integrities</span>
                  <span className="text-sm text-emerald-400 font-bold tracking-widest">100% OK</span>
                </div>
              </div>

              {/* Scrolling Threat logs */}
              <div className="space-y-3">
                <span className="text-[8px] text-slate-500 uppercase tracking-widest font-black block">LIVE DETECTED INTRUSIONS:</span>
                <div className="space-y-2 max-h-56 overflow-hidden">
                  <AnimatePresence initial={false}>
                    {threatLogs.map(log => (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="p-2.5 rounded-lg border border-white/[0.02] bg-white/[0.01] flex flex-col space-y-1 font-mono text-[10px]"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-brand-primary font-bold">{log.ip} ({log.country})</span>
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-black tracking-wider ${
                            log.severity === 'CRITICAL' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                            log.severity === 'HIGH' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 
                            'bg-sky-500/10 text-sky-500 border border-sky-500/20'
                          }`}>
                            {log.severity}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-slate-500 text-[9px]">
                          <span>PORT {log.port} • {log.type}</span>
                          <span>{log.time}</span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </Card>
          )}

          {resolvedId === 'file-encryption-tool' && (
            <Card hoverEffect={false} className="border border-brand-accent/20 bg-slate-950/80 p-5 sm:p-6 font-mono text-xs space-y-4 shadow-[0_0_40px_rgba(6,182,212,0.06)]">
              
              {/* Header */}
              <div className="flex justify-between items-center pb-3 border-b border-white/5 text-slate-500 text-[9px]">
                <span className="flex items-center text-brand-accent font-bold"><Terminal className="w-3.5 h-3.5 mr-1.5" /> STREAM_CIPHER.C</span>
                <span>ISO C99</span>
              </div>

              {/* Simulated Editor Code Block */}
              <div className="p-4 rounded-xl bg-[#02050D] text-slate-400 space-y-1 text-[10px] leading-relaxed border border-white/5 max-h-64 overflow-y-auto">
                <p className="text-slate-600">// Allocating 16KB windows buffer</p>
                <p><span className="text-brand-primary">#define</span> BUFFER_SIZE 16384</p>
                <p>&nbsp;</p>
                <p><span className="text-brand-secondary">void</span> <span className="text-emerald-400">crypt_stream</span>(FILE *in, FILE *out, <span className="text-brand-secondary">const char</span> *key) &#123;</p>
                <p className="pl-4">char buffer[BUFFER_SIZE];</p>
                <p className="pl-4">size_t bytes_read;</p>
                <p className="pl-4">size_t key_len = strlen(key);</p>
                <p className="pl-4">size_t key_idx = 0;</p>
                <p>&nbsp;</p>
                <p className="pl-4"><span className="text-brand-primary">while</span> ((bytes_read = fread(buffer, 1, BUFFER_SIZE, in)) &gt; 0) &#123;</p>
                <p className="pl-8"><span className="text-brand-primary">for</span> (size_t i = 0; i &lt; bytes_read; ++i) &#123;</p>
                <p className="pl-12 text-brand-accent">buffer[i] ^= key[key_idx];</p>
                <p className="pl-12">key_idx = (key_idx + 1) % key_len;</p>
                <p className="pl-8">&#125;</p>
                <p className="pl-8">fwrite(buffer, 1, bytes_read, out);</p>
                <p className="pl-4">&#125;</p>
                <p>&#125;</p>
              </div>

              {/* Simulated Cryptographic speeds */}
              <div className="p-3 bg-[#02050D]/50 border border-white/5 rounded-xl flex justify-between items-center text-[10px]">
                <span className="text-slate-500 uppercase tracking-wider text-[8px] font-black">STREAM RATE:</span>
                <span className="text-brand-accent font-bold">150 MB/s (AES-STREAM)</span>
              </div>

            </Card>
          )}

          {resolvedId === 'workout-planning-app' && (
            <Card hoverEffect={false} className="border border-brand-primary/20 bg-slate-950/80 p-5 sm:p-6 font-mono text-xs space-y-4 shadow-[0_0_40px_rgba(59,130,246,0.06)]">
              
              {/* Header */}
              <div className="flex justify-between items-center pb-3 border-b border-white/5 text-slate-500 text-[9px]">
                <span className="flex items-center text-brand-primary font-bold"><Terminal className="w-3.5 h-3.5 mr-1.5" /> SCHEDULE_ADAPT.PY</span>
                <span>PYTHON_CRON</span>
              </div>

              {/* Interactive Calendar Adapt Mockup */}
              <div className="p-4 rounded-xl bg-[#02050D] text-slate-400 space-y-3.5 border border-white/5 text-[10px]">
                <div className="flex justify-between items-center border-b border-white/5 pb-2 text-[9px]">
                  <span className="text-slate-500">USER_PROFILE: ACTIVE</span>
                  <span className="text-brand-primary font-bold">HEURISTIC MATCH</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-red-400 bg-red-400/5 p-2 rounded border border-red-500/10">
                    <span>[CONFLICT] Skipped Monday Workout (Chest Day)</span>
                    <span className="text-[8px] font-black bg-red-500/10 border border-red-500/20 px-1 py-0.5 rounded">TRIGGER</span>
                  </div>
                  <div className="text-emerald-400 bg-emerald-400/5 p-2.5 rounded border border-emerald-500/10 space-y-1">
                    <p className="font-bold">&gt;&gt; RESOLUTION SCHEMA RUNNING:</p>
                    <p>• Recalculated workload parameters: target sets adjusted (-10% sets, +5% intensity)</p>
                    <p>• Monday core modules distributed across Wed/Fri slots</p>
                    <p>• Sent Toast Warning: "Adapting: Schedule balanced. Tap to see routine."</p>
                  </div>
                </div>
              </div>

            </Card>
          )}

          {resolvedId === 'api-automation-generator' && (
            <Card hoverEffect={false} className="border border-brand-secondary/20 bg-slate-950/80 p-5 sm:p-6 font-mono text-xs space-y-4 shadow-[0_0_40px_rgba(139,92,246,0.06)]">
              
              {/* Header */}
              <div className="flex justify-between items-center pb-3 border-b border-white/5 text-slate-500 text-[9px]">
                <span className="flex items-center text-brand-secondary font-bold"><Terminal className="w-3.5 h-3.5 mr-1.5" /> API_GENERATOR.JS</span>
                <span>EXPRESS_BOILERPLATE</span>
              </div>

              {/* JSON schema to Express endpoint preview */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#02050D] rounded-xl border border-white/5 space-y-1.5 text-[8px]">
                  <span className="text-slate-500 font-bold uppercase block text-[7px]">Input Schema (JSON):</span>
                  <pre className="text-slate-400 leading-tight">
                    {`{\n  "model": "User",\n  "schema": {\n    "name": "String",\n    "email": "String"\n  }\n}`}
                  </pre>
                </div>
                <div className="p-3 bg-[#02050D] rounded-xl border border-white/5 space-y-1.5 text-[8px] overflow-hidden">
                  <span className="text-brand-secondary font-bold uppercase block text-[7px]">Output Router (JS):</span>
                  <pre className="text-slate-400 leading-tight truncate">
                    {`import { Router } from 'express';\nconst router = Router();\n\nrouter.get('/users', async (req, res) => {\n  const users = await User.find();\n  res.json(users);\n});`}
                  </pre>
                </div>
              </div>

              <div className="p-3 bg-[#02050D]/50 border border-white/5 rounded-xl flex justify-between items-center text-[10px]">
                <span className="text-slate-500 uppercase tracking-wider text-[8px] font-black">DEVELOPER SETUP GAIN:</span>
                <span className="text-brand-secondary font-bold">80% Boilerplate Saved</span>
              </div>

            </Card>
          )}

          {/* B. Repository Specs Sidebar */}
          <Card hoverEffect={false} className="space-y-6 border border-white/[0.03] bg-[#02050D]/30 backdrop-blur-md">
            <h3 className="text-xs font-mono text-brand-primary uppercase tracking-widest">&gt;_ Repository Metrics</h3>
            
            {/* Tech Specs */}
            <div className="space-y-4 pt-4 border-t border-white/5 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">CATEGORY:</span>
                <span className="text-slate-300 font-bold">{project.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">RELIABILITY:</span>
                <span className="text-emerald-400 font-bold">100% SECURE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">INFRA:</span>
                <span className="text-slate-300 font-bold">DECOUPLED DAEMONS</span>
              </div>
            </div>

            {/* Tags list */}
            <div className="space-y-2 pt-4 border-t border-white/5">
              <h4 className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black">Technologies Stack</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-brand-primary/5 border border-brand-primary/10 text-brand-primary">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
              <Button variant="primary" href={project.codeLink} className="w-full flex justify-center items-center font-bold font-mono tracking-wider text-[10px] py-3.5">
                <GitBranch className="w-4 h-4 mr-2" />
                EXPLORE REPOSITORY
              </Button>
              <Button variant="secondary" href={project.demoLink} className="w-full flex justify-center items-center font-bold font-mono tracking-wider text-[10px] py-3.5 border-white/5 bg-white/5 hover:border-brand-primary/20">
                <Play className="w-4 h-4 mr-2 text-slate-400" />
                LAUNCH SIMULATION
              </Button>
            </div>
          </Card>

        </div>

      </div>

    </motion.div>
  );
};

export default ProjectDetails;
