import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  X, 
  RotateCcw, 
  ExternalLink,
  Shield,
  Terminal,
  Database,
  FileText,
  Mail,
  MessageSquare,
  Github,
  Linkedin
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { LeetCodeIcon } from '../ui/Icons';

// Action Chip Icon Router
const ActionChipIcon = ({ type, className = "w-3 h-3 shrink-0" }) => {
  switch (type) {
    case 'shield':
    case 'honeypot':
      return <Shield className={className} />;
    case 'code':
    case 'skills':
      return <Terminal className={className} />;
    case 'database':
    case 'sql':
      return <Database className={className} />;
    case 'download':
    case 'cv':
      return <FileText className={className} />;
    case 'mail':
    case 'email':
      return <Mail className={className} />;
    case 'leetcode':
      return <LeetCodeIcon className={className} />;
    case 'github':
      return <Github className={className} />;
    case 'linkedin':
      return <Linkedin className={className} />;
    case 'external':
    default:
      return <ExternalLink className={className} />;
  }
};

// Real-Time VS Code IDE Code Syntax Highlighter for User Typing & User Message Bubbles
const renderCodeSyntax = (text) => {
  if (!text) return null;

  const lines = text.split('\n');

  return lines.map((line, lIdx) => {
    // Regex tokenizer to split code into syntax highlighted elements
    const tokens = line.split(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/|["'`].*?["'`]|\b(?:const|let|var|function|return|if|else|import|export|from|class|public|private|void|int|float|double|char|for|while|switch|case|break|try|catch|null|true|false|undefined|useEffect|useState|useRef|window|document)\b|\b\d+(?:\.\d+)?\b|=>|===|==|\+\+|--|\+=|-=|\*=|\/=|&&|\|\||[+\-*\/=<>!&|%^])/g);

    return (
      <span key={lIdx} className={lIdx > 0 ? 'block mt-0.5' : ''}>
        {tokens.map((token, tIdx) => {
          if (!token) return null;

          // Comments (#6A9955 - Green)
          if (token.startsWith('//') || token.startsWith('/*')) {
            return <span key={tIdx} className="text-[#6A9955] italic">{token}</span>;
          }
          // Strings (#CE9178 - Coral/Brown)
          if (/^["'`].*["'`]$/.test(token)) {
            return <span key={tIdx} className="text-[#CE9178]">{token}</span>;
          }
          // Keywords (#C586C0 - Purple)
          if (/^(const|let|var|function|return|if|else|import|export|from|class|public|private|void|int|float|double|char|for|while|switch|case|break|try|catch|null|true|false|undefined|useEffect|useState|useRef|window|document)$/.test(token)) {
            return <span key={tIdx} className="text-[#C586C0] font-semibold">{token}</span>;
          }
          // Numbers (#B5CEA8 - Mint Green)
          if (/^\d+(\.\d+)?$/.test(token)) {
            return <span key={tIdx} className="text-[#B5CEA8]">{token}</span>;
          }
          // Operators & Punctuation (#FFD700 - Yellow)
          if (/^(=>|===|==|\+\+|--|\+=|-=|\*=|\/=|&&|\|\||[+\-*\/=<>!&|%^])$/.test(token)) {
            return <span key={tIdx} className="text-[#FFD700] font-bold">{token}</span>;
          }
          // Identifiers & Variables (#9CDCFE - Cyan Blue)
          return <span key={tIdx} className="text-[#9CDCFE]">{token}</span>;
        })}
      </span>
    );
  });
};

// Safe Math Evaluator
const tryEvaluateMath = (query) => {
  const cleanQ = query.replace(/what is|calculate|eval|evaluate|math|problem|result of|\?/gi, '').trim();
  const safeMathRegex = /^[\d\s\+\-\*\/\%\^\(\)\.\,sqrt|sin|cos|tan|log]+$/i;
  
  if (safeMathRegex.test(cleanQ) && /[\d]/.test(cleanQ) && /[\+\-\*\/\%\^\(]/.test(cleanQ)) {
    try {
      let expr = cleanQ.replace(/\^/g, '**');
      expr = expr.replace(/sqrt\(([^)]+)\)/gi, 'Math.sqrt($1)');
      expr = expr.replace(/sin\(([^)]+)\)/gi, 'Math.sin($1)');
      expr = expr.replace(/cos\(([^)]+)\)/gi, 'Math.cos($1)');
      
      const result = new Function(`return (${expr})`)();
      if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
        return `**Mathematical Calculation Result:**\n\n\`${cleanQ}\` = **${result}**`;
      }
    } catch (e) {
      // Ignore if parsing fails
    }
  }
  return null;
};

// Creator Protection & Professional Slang Mirror Handler (Emoji-Free)
const tryMirrorAbuseResponse = (query) => {
  const creatorPattern = /\b(prosun|prosun banerjee|probanjee|creator|developer|author|prosenjit)\b/i;
  const slangPattern = /\b(fuck|fucking|fucker|fucked|fucks|f\*ck|f\*\*k|shit|shitty|bullshit|bs|wtf|stfu|bitch|bitchy|bitches|asshole|ass|bastard|dick|dickhead|prick|cunt|motherfucker|mf|dumbass|jackass|douchebag|douche|gtfo|noob|idiot|stupid|dumb|moron|trash|loser|fool|jerk|crap|mad|crazy|ugly|retard|retarded|dipshit|dimwit|halfwit|numbnuts|knucklehead|meathead|airhead|blockhead|bonehead|doofus|dork|dunce|imbecile|nitwit|schmuck|dweeb|twit|lamebrain|birdbrain|clown|buffoon|dummy|goofball|nerd|loony|loon|nutjob|freak|weirdo|creep|sleaze|slimeball|scumbag|jerkoff|wanker|tosser|prat|muppet|git|bellend|knob|tool|pillock|plonker|chump|mook|donut|numpty|bampot|manky|minger|rotter|blighter|sod|gormless|daft|berk|bollocks|shite|gobshite|eejit|walloper|dobber|rocket|gowl|gobdaw|langer|header|thick|sap|scut|wagon|sleeveen|dosser|messer|rip|spanner|melt|tulip|gimp|spud|bimbo|skank|slag|slapper|tramp|hobo|peasant|lowlife|deadbeat|dropout|slacker|burnout|sellout|poser|faker|phony|fraud|charlatan|snake|rat|snitch|squealer|coward|wimp|weakling|pushover|spineless|chicken|sissy|pansy|crybaby|wuss|snowflake|manchild|fake|wannabe|liar|overrated|useless|incompetent|terrible|horrible|worst|garbage|pathetic|joke|clown|impostor|pretender|nobody|irrelevant|mediocre|amateur|scammer|plagiarist|thief|copycat|hack|poser|try-hard|basic|cringe|embarrassing|joke|has-been|never-was|deadweight|liability|waste|bad|awful|disgusting|repulsive|vile|nasty|gross|revolting|pitiful|wretched|miserable|deplorable|atrocious|abysmal|dreadful|appalling|shameful|disgraceful|despicable|contemptible|detestable|loathsome)\b/i;

  const hasCreator = creatorPattern.test(query);
  const match = query.match(slangPattern);

  if (match) {
    const word = match[0].toLowerCase();

    if (hasCreator) {
      const creatorDefendResponses = [
        `Did you just call Prosun a **${word}**?! Prosun engineered low-level C++ systems, a dual honeypot platform, and this entire portfolio. The only **${word}** here is you typing behind a screen!`,
        `Do not disrespect Prosun, you **${word}**! Prosun is writing high-performance code while you struggle with 2 lines. Keep your insults to yourself!`,
        `Calling probanjee a **${word}**? Prosun has a CSE degree, verified achievements, and built this interface to assist visitors. Please maintain professional courtesy.`,
        `Keep Prosun's name out of your mouth! Prosun is an engineering-first developer with production systems running live.`,
        `You called Prosun a **${word}**? This engineer built a live cybersecurity honeypot and systems utilities while you are typing slurs into a portfolio chatbox.`,
        `Prosun has written production C++ and telemetry pipelines. Please keep your feedback constructive instead of throwing words like **${word}**.`,
        `Prosun Banerjee built this entire platform. If you have genuine technical questions or feedback, feel free to ask politely.`,
        `Insulting the developer whose website you are browsing shows poor etiquette. Prosun's verified work speaks for itself.`
      ];

      const selectedIdx = Math.abs(query.length + word.length) % creatorDefendResponses.length;
      return creatorDefendResponses[selectedIdx];
    }

    const responses = [
      `Did you really just drop **${word}** here? Please keep the conversation professional and focused on development work.`,
      `Calling this **${word}**? Let us focus on technical queries, systems engineering, and Prosun's portfolio projects.`,
      `Language flagged. This assistant handles software inquiries, project explanations, and career opportunities.`
    ];

    const selectedIdx = Math.abs(query.length + word.length) % responses.length;
    return responses[selectedIdx];
  }
  return null;
};

// Knowledge Base Answers about Prosun Banerjee, Math, Time, & Projects (Emoji-Free)
const generatePAIResponse = (query, unansweredCount) => {
  const q = query.toLowerCase().trim();

  // 0. Abuse Mirror Check
  const abuseMirrorReply = tryMirrorAbuseResponse(q);
  if (abuseMirrorReply) {
    return {
      text: abuseMirrorReply,
      type: 'abuse_mirror'
    };
  }

  // 0b. "Why not?" / "Why" Response
  if (q === 'why not?' || q === 'why not' || q === 'why' || q === 'why?' || q.includes('why not') || q.includes('why cant you') || q.includes("why can't you")) {
    return {
      text: `I am specialized specifically to assist with Prosun Banerjee's development portfolio, engineering projects, and technical capabilities.`,
      type: 'why_not'
    };
  }

  // 1. Hiring, Career & Availability
  if (q.includes('hire') || q.includes('job') || q.includes('available') || q.includes('opportunity') || q.includes('remote') || q.includes('relocate') || q.includes('salary')) {
    return {
      text: `**Hiring & Career Information:**\n\nProsun Banerjee is **actively open** for Full-Time Software Engineering, C/C++ Developer, and Security Engineering roles.\n\n- **Work Preference:** Remote or On-Site / Relocation ready\n- **Core Strengths:** C/C++17, Systems Engineering, Cybersecurity Telemetry, Full-Stack Web\n- **Direct Email:** prosunbanerjee8@gmail.com`,
      type: 'career',
      actions: [
        { label: 'Download Resume (PDF)', link: portfolioData.personalInfo.resumeUrl, download: true, icon: 'download' },
        { label: 'Send Direct Email', link: 'mailto:prosunbanerjee8@gmail.com', external: true, icon: 'mail' }
      ]
    };
  }

  // 2. LeetCode & Problem Solving
  if (q.includes('leetcode') || q.includes('dsa') || q.includes('data structures') || q.includes('algorithms') || q.includes('problem solving')) {
    return {
      text: `**LeetCode & Problem Solving Profile:**\n\nProsun actively practices Data Structures & Algorithms in **C++** on LeetCode.\n\n- **LeetCode Handle:** [Prosun01](https://leetcode.com/u/Prosun01/)\n- **Primary Language:** C++17\n- **Focus Areas:** Binary Search, Arrays, Dynamic Programming, String Algorithms\n- **Badges:** 50 Days Badge 2026`,
      type: 'leetcode',
      actions: [
        { label: 'LeetCode Profile', link: 'https://leetcode.com/u/Prosun01/', external: true, icon: 'leetcode' }
      ]
    };
  }

  // 3. C++ vs Python / Tech Preferences
  if (q.includes('cpp vs python') || q.includes('c++ vs python') || q.includes('favorite language') || q.includes('preferred language')) {
    return {
      text: `**Tech Stack Preferences:**\n\n- **C++17:** Preferred for raw execution speed, low-level memory control, and systems programming.\n- **Python:** Preferred for rapid scripting, data manipulation, and honeypot telemetry API endpoints.\n- **React / JS:** Preferred for creating fluid, high-performance user interfaces like this portfolio.`,
      type: 'tech_pref'
    };
  }

  // 4. Linux & Security Tools
  if (q.includes('linux') || q.includes('kali') || q.includes('terminal') || q.includes('bash') || q.includes('command line')) {
    return {
      text: `**Linux & Security Operations:**\n\nProsun uses **Kali Linux & Ubuntu** for penetration testing, threat vector analysis, and system scripting.\n\n- **Tools:** Wireshark, Nmap, Metasploit, Bash Scripting, GDB Debugger\n- **Built:** Simulated port interceptors and Kafka threat log streaming`,
      type: 'linux'
    };
  }

  // 5. IDE & Developer Setup
  if (q.includes('ide') || q.includes('editor') || q.includes('vscode') || q.includes('theme') || q.includes('setup')) {
    return {
      text: `**Developer Setup:**\n\n- **Editor:** VS Code with Dark Synthwave / One Dark Pro Theme\n- **Compiler:** GCC / Clang (C++17/20)\n- **Terminal:** Windows Terminal / Zsh with custom Starship prompt\n- **Keyboard:** Mechanical Switches (Linear 45g)`,
      type: 'setup'
    };
  }

  // 6. Philosophical & Existential Questions
  if (q.includes('meaning of life') || q.includes('why exist') || q.includes('simulation') || q.includes('matrix')) {
    return {
      text: `The answer to life, the universe, and everything is 42, but in C++ it is returning 0 without memory corruption or segmentation faults.`,
      type: 'humor'
    };
  }

  // 7. Romance & Flirting
  if (q.includes('love') || q.includes('marry') || q.includes('date me') || q.includes('cute bot') || q.includes('crush')) {
    return {
      text: `My runtime is dedicated strictly to systems programming, C++ memory safety, and Prosun's portfolio.`,
      type: 'humor'
    };
  }

  // 8. Insults & Teasing Defense
  if (q.includes('dumb') || q.includes('stupid') || q.includes('trash') || q.includes('bad bot') || q.includes('useless') || q.includes('shut up')) {
    return {
      text: `Syntax errors and buffer overflows are handled cleanly here. Let us keep the conversation focused on engineering and software.`,
      type: 'humor'
    };
  }

  // 9. AI Reality & Consciousness
  if (q.includes('are you real') || q.includes('are u real') || q.includes('are you human') || q.includes('are u human')) {
    return {
      text: `I am a client-side assistant running right in your browser, compiled with React, Tailwind CSS, and structured JavaScript logic.`,
      type: 'humor'
    };
  }

  // 10. Creator Origins
  if (q.includes('who made you') || q.includes('who created you') || q.includes('who built you') || q.includes('who is your creator')) {
    return {
      text: `I was created by Prosun Banerjee to assist visitors in exploring his software engineering projects, cybersecurity implementations, and technical background.`,
      type: 'humor'
    };
  }

  // 11. Coding Capabilities
  if (q.includes('can you code') || q.includes('can u code') || q.includes('write code')) {
    return {
      text: `I can guide you through C++, Python, and React implementations. To see production code, review Prosun's repositories or download his resume.`,
      type: 'humor',
      actions: [
        { label: 'Download Resume (PDF)', link: portfolioData.personalInfo.resumeUrl, download: true, icon: 'download' }
      ]
    };
  }

  // 12. Sleep & Uptime
  if (q.includes('do you sleep') || q.includes('do u sleep') || q.includes('are you tired')) {
    return {
      text: `This interface maintains persistent availability with zero memory leaks and responsive client-side performance.`,
      type: 'humor'
    };
  }

  // 13. Developer Jokes Generator
  if (q.includes('tell me a joke') || q.includes('say a joke') || q.includes('make me laugh') || q.includes('funny')) {
    const jokes = [
      `Why do C++ programmers wear glasses? Because they can't C#.`,
      `There are 10 types of people in the world: those who understand binary, and those who don't.`,
      `A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'`,
      `Why did the web developer leave the restaurant? Because of the table layout.`
    ];
    return {
      text: jokes[Math.floor(Math.random() * jokes.length)],
      type: 'humor'
    };
  }

  // 14. Git & GitHub Jokes
  if (q.includes('git') || q.includes('github') || q.includes('commit') || q.includes('push')) {
    return {
      text: `git commit -m "Resolved build issues" -> git push origin main. Check out Prosun's verified repositories at github.com/probanjee.`,
      type: 'humor',
      actions: [
        { label: 'GitHub Profile', link: portfolioData.personalInfo.github, external: true, icon: 'github' }
      ]
    };
  }

  // 15. Aliens & Sci-Fi
  if (q.includes('alien') || q.includes('ufo') || q.includes('mars')) {
    return {
      text: `The VIGILANCE Honeypot platform intercepts unauthorized network probes and logs all inbound telemetry to central dashboards.`,
      type: 'humor'
    };
  }

  // 16. Coffee & Fuel
  if (q.includes('coffee') || q.includes('tea') || q.includes('drink')) {
    return {
      text: `Prosun specializes in C++ systems engineering, low-level optimizations, and modern web application development.`,
      type: 'humor'
    };
  }

  // 17. Relationship Status
  if (q.includes('single') || q.includes('girlfriend') || q.includes('boyfriend') || q.includes('relationship')) {
    return {
      text: `Prosun is focused on full-stack software development, cybersecurity research, and competitive problem solving.`,
      type: 'humor'
    };
  }

  // 18. Farewell / Goodbye
  if (q.includes('bye') || q.includes('goodbye') || q.includes('see ya') || q.includes('cya')) {
    return {
      text: `Thank you for visiting. Feel free to inspect Prosun's CV and explore his repositories on GitHub.`,
      type: 'bye'
    };
  }

  // 1. Math Calculation Check
  const mathResult = tryEvaluateMath(q);
  if (mathResult) {
    return {
      text: mathResult,
      type: 'math'
    };
  }

  // 2. Real-Time System Date & Time Check
  if (q.includes('date') || q.includes('time') || q.includes('clock') || q.includes('day is today') || q.includes('today date') || q.includes('current time')) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dateStr = now.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return {
      text: `**System Clock:**\n\n- **Time:** **${timeStr}**\n- **Date:** **${dateStr}**\n- **Timezone:** **${Intl.DateTimeFormat().resolvedOptions().timeZone}**`,
      type: 'time'
    };
  }

  // 3. Weather Report Check
  if (q.includes('weather') || q.includes('temperature') || q.includes('rain') || q.includes('climate') || q.includes('forecast')) {
    return {
      text: `**Regional Weather Report (West Bengal / Kolkata):**\n\n- **Temperature:** **28°C (82.4°F)**\n- **Condition:** **Partly Cloudy**\n- **Humidity:** **76%**\n- **Wind Speed:** **12 km/h SSE**\n- **UV Index:** **Moderate (4/10)**`,
      type: 'weather'
    };
  }

  // 4. Who are you / About P.A.I. itself
  if (q.includes('who are you') || q.includes('who are u') || q.includes('what are you') || q.includes('what is pai') || q.includes('who is pai') || q.includes('what is p.a.i') || q.includes('who is p.a.i') || q.includes('tell me about yourself') || q.includes('your name') || q.includes('about yourself')) {
    return {
      text: `**P.A.I. (Prosenjit AI)**\n\nI am P.A.I., Prosun Banerjee's personal AI assistant and digital companion built directly into this portfolio.\n\n**Capabilities:**\n- Detail Prosun's **C/C++ systems engineering**, **cybersecurity platforms**, and **web applications**\n- Explain projects such as **VIGILANCE Honeypot**, **SQLSense**, and the **C++ File Cipher Engine**\n- Provide access to Prosun's **education**, **academics**, **skills**, **resume/CV**, and **direct contact channels**`,
      type: 'who_are_you',
      actions: [
        { label: 'Honeypot Platform', query: 'Tell me about Honeypot', icon: 'shield' },
        { label: 'Core Technical Skills', query: "What are Prosun's skills?", icon: 'code' },
        { label: 'Download Resume (PDF)', link: portfolioData.personalInfo.resumeUrl, download: true, icon: 'download' }
      ]
    };
  }

  // 5. Who is Prosun / Bio / General info
  if (q.includes('who is') || q.includes('prosun') || q.includes('about prosun') || q.includes('background') || q.includes('bio') || q.includes('developer')) {
    return {
      text: `**Prosun Banerjee — Security-Focused Software Developer**\n\nProsun is a **Computer Science Engineering undergraduate** (B.Tech at Adamas University, 2023–2027) with a **6.5 CGPA**, specializing in **C/C++ systems engineering, low-level optimization, full-stack web applications, and cybersecurity fundamentals**.\n\nKey Highlights:\n- **Core Focus:** C/C++17, Memory Management, Linux System Utilities\n- **Cybersecurity:** Threat Vector Analysis, Cryptography, Honeypot Systems, Kali Linux\n- **Internships:** C++ Developer Intern at Code Alpha & Cognifyz\n- **Projects:** Built SQLSense, VIGILANCE Honeypot Platform, & C++ Cryptography File Engine`,
      type: 'prosun_info',
      actions: [
        { label: 'Download Resume (PDF)', link: portfolioData.personalInfo.resumeUrl, download: true, icon: 'download' },
        { label: 'LeetCode Profile', link: 'https://leetcode.com/u/Prosun01/', external: true, icon: 'leetcode' },
        { label: 'GitHub Profile', link: portfolioData.personalInfo.github, external: true, icon: 'github' }
      ]
    };
  }

  // 6. Honeypot / Security Platform
  if (q.includes('honeypot') || q.includes('vigilance') || q.includes('threat') || q.includes('cybersecurity') || q.includes('security')) {
    const hp = portfolioData.projects.find(p => p.id === 'honeypot-system');
    return {
      text: `**VIGILANCE Enterprise Honeypot Platform**\n\n${hp?.longDescription}\n\n**Technical Architecture & Live Deployments:**\n- **1. Nowhere Esports Portal:** Public honeypot decoy hub (Reconnaissance bait)\n- **2. Admin Nowhere Console:** Privileged interceptor trapping credential stuffing & brute-force attacks\n- **3. Vigilance SOC Radar:** Central real-time telemetry & threat radar\n- **Backend Telemetry:** Python (FastAPI, Pandas) with real-time logs (<50ms delay)\n- **Message Queue:** Apache Kafka for high-throughput threat streaming\n- **Alert Dispatcher:** Dynamic Slack & Discord Webhook triggers`,
      type: 'project',
      actions: [
        { label: 'View Case Study', link: '/projects/honeypot-system', icon: 'shield' },
        { label: 'SOC Radar Live', link: 'https://vigilance-soc-radar.vercel.app/', external: true, icon: 'external' },
        { label: 'Nowhere Decoy', link: 'https://owhere-esports-portal.vercel.app/', external: true, icon: 'external' },
        { label: 'Admin Nowhere', link: 'https://honeypot-system-rho.vercel.app/', external: true, icon: 'external' },
        { label: 'GitHub Repository', link: hp?.codeLink, external: true, icon: 'github' }
      ]
    };
  }

  // 7. SQLSense Project
  if (q.includes('sql') || q.includes('sqlsense') || q.includes('query') || q.includes('ast')) {
    const sql = portfolioData.projects.find(p => p.id === 'sqlsense');
    return {
      text: `**SQLSense — Instant SQL Query Explainer**\n\n${sql?.longDescription}\n\n**Engine Performance:**\n- **Parsing Speed:** ${sql?.metrics.parsingSpeed}\n- **AST Explainer:** ${sql?.metrics.explainerEngine}\n- **Security:** ${sql?.metrics.dbSecurity}\n- **Tech Stack:** Next.js, React, TypeScript, Supabase, PostgreSQL, Zod, Vitest`,
      type: 'project',
      actions: [
        { label: 'Try Live SQLSense', link: sql?.demoLink, external: true, icon: 'external' },
        { label: 'View GitHub Code', link: sql?.codeLink, external: true, icon: 'github' }
      ]
    };
  }

  // 8. C++ Cryptography / File Engine
  if (q.includes('c++') || q.includes('encrypt') || q.includes('cipher') || q.includes('file engine') || q.includes('crypto')) {
    const cryptoP = portfolioData.projects.find(p => p.id === 'file-encryption-tool');
    return {
      text: `**C++17 Secure Cryptographic File Engine**\n\n${cryptoP?.longDescription}\n\n**System Benchmarks:**\n- **Stream Processing Rate:** Up to 250MB/s\n- **Memory Footprint:** <1MB allocation via RAII buffers\n- **Integrity Validation:** SHA-256 checksum verification\n- **Cipher Logic:** Custom key-based symmetric stream cipher`,
      type: 'project',
      actions: [
        { label: 'View C++ Engine Details', link: '/projects/file-encryption-tool', icon: 'code' },
        { label: 'GitHub Repository', link: cryptoP?.codeLink, external: true, icon: 'github' }
      ]
    };
  }

  // 9. Dynamic API Middleware Generator / APIForge Project
  if (q.includes('api generator') || q.includes('middleware') || q.includes('apiforge') || q.includes('api forge') || q.includes('api-automation') || q.includes('express api')) {
    const apiP = portfolioData.projects.find(p => p.id === 'api-automation-generator');
    return {
      text: `**Dynamic API Middleware Generator**\n\n${apiP?.longDescription}\n\n**Key Features & Benchmarks:**\n- **Dev Speedup:** ${apiP?.metrics.devSpeedup}\n- **Output Format:** ${apiP?.metrics.outputType}\n- **Features:** ${apiP?.metrics.features}\n- **Tech Stack:** Node.js, Express, React, TailwindCSS`,
      type: 'project',
      actions: [
        { label: 'Try Live APIForge', link: apiP?.demoLink, external: true, icon: 'external' },
        { label: 'View GitHub Code', link: apiP?.codeLink, external: true, icon: 'github' }
      ]
    };
  }

  // 10. Heuristic Adaptive Workout App
  if (q.includes('workout') || q.includes('heuristic') || q.includes('fitness') || q.includes('routine')) {
    const workoutP = portfolioData.projects.find(p => p.id === 'workout-planning-app');
    return {
      text: `**Heuristic Adaptive Workout App**\n\n${workoutP?.longDescription}\n\n**Key Features & Metrics:**\n- **Routine Adherence:** ${workoutP?.metrics.retentionRate}\n- **Plan Generation Speed:** ${workoutP?.metrics.processingTime}\n- **Notification Model:** ${workoutP?.metrics.notificationModel}\n- **Tech Stack:** Python, Automation, Heuristics, OS Notifications, JSON DB`,
      type: 'project',
      actions: [
        { label: 'Launch Simulation', link: workoutP?.demoLink, external: true, icon: 'external' },
        { label: 'View Case Study', link: '/projects/heuristic-workout-app', icon: 'shield' },
        { label: 'GitHub Repository', link: workoutP?.codeLink, external: true, icon: 'github' }
      ]
    };
  }

  // 11. Skills & Tools
  if (q.includes('skill') || q.includes('language') || q.includes('tool') || q.includes('python') || q.includes('kafka') || q.includes('aws') || q.includes('docker')) {
    return {
      text: `**Technical Skill Matrix for Prosun Banerjee:**\n\n- **Programming Languages:** C/C++, C++17, Python, JavaScript (ES6+), SQL, HTML5/CSS3, Java\n- **Cybersecurity & QA:** Threat Vector Analysis, Cryptography, Kali Linux, Penetration Testing, Unit Testing (Jest, JUnit)\n- **Cloud & Infrastructure:** Git/GitHub, AWS, Azure, Docker, Linux/OS Scripting, Apache Kafka, CI/CD, Jira, Power BI`,
      type: 'skills',
      actions: [
        { label: 'See All Projects', link: '/#projects', icon: 'shield' },
        { label: 'Check Experience', link: '/#experience', icon: 'code' }
      ]
    };
  }

  // 12. Experience & Internships
  if (q.includes('experience') || q.includes('intern') || q.includes('work') || q.includes('code alpha') || q.includes('cognifyz')) {
    const exps = portfolioData.experience.map(e => `**${e.role}** — *${e.company}* (${e.period})\nLocation: ${e.location}\n${e.description}\nKey Work:\n${e.bullets.map(b => '  - ' + b).join('\n')}`).join('\n\n');
    return {
      text: `**Professional Internships & Experience:**\n\n${exps}`,
      type: 'experience',
      actions: [
        { label: 'View Timeline', link: '/#experience', icon: 'code' },
        { label: 'Download Resume (PDF)', link: portfolioData.personalInfo.resumeUrl, download: true, icon: 'download' }
      ]
    };
  }

  // 13. Education & Academics
  if (q.includes('education') || q.includes('cgpa') || q.includes('university') || q.includes('college') || q.includes('adamas') || q.includes('degree') || q.includes('school')) {
    const edus = portfolioData.education.map(e => `**${e.degree}**\n*${e.institution}* (${e.period}) — Grade: **${e.grade}**\n${e.details}`).join('\n\n');
    return {
      text: `**Academic Background & Schooling:**\n\n${edus}`,
      type: 'education',
      actions: [
        { label: 'Certifications', query: 'What certifications does Prosun have?', icon: 'code' }
      ]
    };
  }

  // 14. Certifications
  if (q.includes('certif') || q.includes('award') || q.includes('government') || q.includes('tech mahindra')) {
    const certs = portfolioData.certifications.map(c => `**${c.title}**\nIssuer: *${c.issuer}*\n${c.details}`).join('\n\n');
    return {
      text: `**Verified Certifications:**\n\n${certs}`,
      type: 'certs',
      actions: [
        { label: 'Download Verified CV', link: portfolioData.personalInfo.resumeUrl, download: true, icon: 'download' }
      ]
    };
  }

  // 15. Contact / Socials / LeetCode
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('leetcode') || q.includes('github') || q.includes('linkedin') || q.includes('reach')) {
    return {
      text: `**Contact Prosun Banerjee Directly:**\n\n- **Email:** prosunbanerjee8@gmail.com\n- **Phone:** +91-8653184011\n- **Location:** West Bengal, India\n- **LeetCode:** [Prosun01 Profile](https://leetcode.com/u/Prosun01/)\n- **GitHub:** [probanjee](https://github.com/probanjee)\n- **LinkedIn:** [Prosun Banerjee](https://linkedin.com/in/prosun-banerjee-545942293)`,
      type: 'contact',
      actions: [
        { label: 'Send Direct Email', link: 'mailto:prosunbanerjee8@gmail.com', external: true, icon: 'mail' },
        { label: 'LeetCode Profile', link: 'https://leetcode.com/u/Prosun01/', external: true, icon: 'leetcode' },
        { label: 'Go to Contact Section', link: '/#contact', icon: 'mail' }
      ]
    };
  }

  // 16. Greetings / Hi / Hello
  if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('hola') || q.includes('greetings')) {
    return {
      text: `Hello! I am P.A.I., Prosun Banerjee's portfolio assistant. How can I assist you with Prosun's engineering projects, technical skills, or background today?`,
      type: 'greeting',
      actions: [
        { label: 'Honeypot Platform', query: 'Tell me about Honeypot', icon: 'shield' },
        { label: 'Core C/C++ & Security Skills', query: "What are Prosun's skills?", icon: 'code' },
        { label: 'Download CV (PDF)', link: portfolioData.personalInfo.resumeUrl, download: true, icon: 'download' }
      ]
    };
  }

  // 17. Unhandled Questions
  if (unansweredCount === 0) {
    return {
      text: `I am focused on answering questions regarding Prosun's development projects, technical skills, experience, and contact information.`,
      type: 'unhandled_1'
    };
  } else if (unansweredCount === 1) {
    return {
      text: `I do not have specific details on that topic. Please feel free to ask about Prosun's C++ projects, Honeypot architecture, or skills.`,
      type: 'unhandled_2'
    };
  } else {
    return {
      text: `I am unable to process that specific inquiry. You can contact Prosun directly via email or LinkedIn for custom discussions.`,
      type: 'unhandled_3'
    };
  }
};

// Initial welcome message (Emoji-Free)
const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: `Hello! I am P.A.I., Prosun Banerjee's portfolio assistant. Ask me anything about Prosun's engineering projects, technical skills, education, or experience.`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    actions: [
      { label: 'Honeypot Platform', query: 'Tell me about Honeypot', icon: 'shield' },
      { label: 'Core C/C++ & Security Skills', query: "What are Prosun's skills?", icon: 'code' },
      { label: 'SQLSense Explainer', query: 'Tell me about SQLSense', icon: 'database' },
      { label: 'Download CV (PDF)', link: portfolioData.personalInfo.resumeUrl, download: true, icon: 'download' }
    ]
  }
];

export const ProsenjitChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMangaBubble, setShowMangaBubble] = useState(true);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollBottomBtn, setShowScrollBottomBtn] = useState(false);
  
  // Mobile Responsiveness, Viewport & Form-Focus Avoidance States
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isFieldFocused, setIsFieldFocused] = useState(false);
  const [visualViewportHeight, setVisualViewportHeight] = useState(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Custom State for Escalation Sequence & User Name Memory
  const [unansweredCount, setUnhandledCount] = useState(0);
  const [awaitingUserName, setAwaitingUserName] = useState(false);
  const [userName, setUserName] = useState('');

  const messagesEndRef = useRef(null);
  const messagesFeedRef = useRef(null);
  const inputRef = useRef(null);

  // Screen width & mobile detector
  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(media.matches);
    const listener = (e) => setPrefersReducedMotion(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  // Visual Viewport tracking for mobile virtual keyboards (prevents clipping the composer)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.visualViewport) return;
    const updateViewport = () => {
      if (window.innerWidth < 640 && isOpen) {
        setVisualViewportHeight(window.visualViewport.height);
      } else {
        setVisualViewportHeight(null);
      }
    };
    window.visualViewport.addEventListener('resize', updateViewport);
    window.visualViewport.addEventListener('scroll', updateViewport);
    updateViewport();
    return () => {
      window.visualViewport.removeEventListener('resize', updateViewport);
      window.visualViewport.removeEventListener('scroll', updateViewport);
    };
  }, [isOpen]);

  // Form field focus tracking: hide launcher on mobile when user focuses an external input
  useEffect(() => {
    const handleFocusIn = (e) => {
      const tag = e.target?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') {
        if (!e.target.closest('#pai-chatbot-container')) {
          setIsFieldFocused(true);
        }
      }
    };
    const handleFocusOut = (e) => {
      const tag = e.target?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') {
        setIsFieldFocused(false);
      }
    };
    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);
    return () => {
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  // Footer visibility tracking with IntersectionObserver to avoid overlapping mobile footer links
  useEffect(() => {
    const footerElement = document.querySelector('footer');
    if (!footerElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { root: null, threshold: 0.05 }
    );

    observer.observe(footerElement);
    return () => observer.disconnect();
  }, []);

  // Lock body scroll on mobile while bottom sheet modal is open
  useEffect(() => {
    if (isMobileScreen && isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobileScreen, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  const handleScroll = () => {
    if (!messagesFeedRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesFeedRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 60;
    setShowScrollBottomBtn(!isNearBottom);
  };

  useEffect(() => {
    if (isOpen) {
      setShowMangaBubble(false);
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !showScrollBottomBtn) {
      scrollToBottom();
    }
  }, [messages, isTyping]);

  const handleSend = (overrideQuery) => {
    const textToSend = overrideQuery || inputValue;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!overrideQuery) setInputValue('');
    setIsTyping(true);

    if (awaitingUserName) {
      const rawExtracted = textToSend.replace(/my name is|i am|i'm|call me|its|it's/gi, '').trim();

      const nameKeywordPattern = /\b(hire|available|job|what|how|who|why|when|where|can|are|is|do|does|will|would|should|could|tell|show|give|help|about|for|the|this|that|your|my|please|want|need|looking|find|explain|describe)\b/i;
      const wordCount = rawExtracted.split(/\s+/).filter(Boolean).length;
      const looksLikeAName = (
        rawExtracted.length > 0 &&
        wordCount <= 4 &&
        !rawExtracted.includes('?') &&
        !rawExtracted.includes('!') &&
        !nameKeywordPattern.test(rawExtracted) &&
        /^[a-zA-Z\s'.\-]+$/.test(rawExtracted)
      );

      if (!looksLikeAName) {
        setTimeout(() => {
          const retryMsg = {
            id: Date.now() + 1,
            sender: 'bot',
            text: `Please enter your name so I can address you properly. (e.g., "Alex" or "My name is Sarah")`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, retryMsg]);
          setIsTyping(false);
          setAwaitingUserName(true);
        }, 500);
        return;
      }

      setAwaitingUserName(false);
      setUserName(rawExtracted);

      setTimeout(() => {
        const botMsg = {
          id: Date.now() + 1,
          sender: 'bot',
          text: `Nice to meet you, **${rawExtracted}**. I have saved your name for this session. How can I assist you with Prosun's portfolio today?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
        setIsTyping(false);
      }, 500);
      return;
    }

    setTimeout(() => {
      const response = generatePAIResponse(textToSend, unansweredCount);

      if (response.type === 'unhandled_1') {
        setUnhandledCount(1);
      } else if (response.type === 'unhandled_2') {
        setUnhandledCount(2);
      } else if (response.type === 'unhandled_3') {
        setUnhandledCount(0);
      } else {
        setUnhandledCount(0);
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: response.text,
        actions: response.actions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);

      if (response.type === 'who_are_you') {
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            const nameAskMsg = {
              id: Date.now() + 3,
              sender: 'bot',
              text: `May I ask your name? This helps personalize your experience while exploring Prosun's portfolio.`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, nameAskMsg]);
            setIsTyping(false);
            setAwaitingUserName(true);
          }, 700);
        }, 300);
      }

    }, 500);
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    setUnhandledCount(0);
    setAwaitingUserName(false);
    setUserName('');
  };

  return (
    <>
      {/* Mobile Backdrop Overlay when Bottom Sheet is Open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40 sm:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Floating Container for Launcher & Desktop Floating Window */}
      <div
        id="pai-chatbot-container"
        className={`fixed z-50 transition-all duration-300 ease-out pointer-events-auto flex flex-col items-end
          right-[calc(1rem+env(safe-area-inset-right,0px))] sm:right-5
          ${isFooterVisible ? 'bottom-[calc(5rem+env(safe-area-inset-bottom,0px))] sm:bottom-5' : 'bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] sm:bottom-5'}
          ${isFieldFocused && !isOpen ? 'opacity-0 pointer-events-none translate-y-4 sm:opacity-100 sm:pointer-events-auto sm:translate-y-0' : 'opacity-100 translate-y-0'}
        `}
      >
        {/* Compact Speech Bubble (Desktop Only) */}
        <AnimatePresence>
          {!isOpen && showMangaBubble && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.85 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setIsOpen(true)}
              className="mb-2 mr-1 cursor-pointer group relative z-20 hidden sm:block"
            >
              <div className="relative px-3 py-1.5 rounded-xl bg-[#091124]/90 border border-brand-primary/40 shadow-[0_6px_20px_rgba(59,130,246,0.25)] text-slate-100 backdrop-blur-2xl flex items-center space-x-2 group-hover:border-brand-primary group-hover:shadow-[0_8px_25px_rgba(59,130,246,0.35)] transition-all">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-60 pointer-events-none" />
                <MessageSquare className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                <div className="text-left font-mono text-[10px] leading-tight">
                  <span className="font-extrabold text-cyan-300 tracking-wider uppercase">
                    Have questions? Chat with P.A.I.
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMangaBubble(false);
                  }}
                  className="ml-1 p-0.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                  title="Dismiss"
                  aria-label="Dismiss greeting"
                >
                  <X className="w-3 h-3" />
                </button>
                <div className="absolute -bottom-1.5 right-5 w-2.5 h-2.5 bg-[#091124] border-r border-b border-brand-primary/40 rotate-45 group-hover:border-brand-primary transition-colors" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal Window: Responsive Bottom Sheet on Mobile, Floating Glass Modal on Desktop */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={
                isMobileScreen
                  ? { opacity: 0, y: '100%' }
                  : { opacity: 0, y: 15, scale: 0.95 }
              }
              animate={
                isMobileScreen
                  ? { opacity: 1, y: 0 }
                  : { opacity: 1, y: 0, scale: 1 }
              }
              exit={
                isMobileScreen
                  ? { opacity: 0, y: '100%' }
                  : { opacity: 0, y: 15, scale: 0.95 }
              }
              transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: isMobileScreen && visualViewportHeight ? `${visualViewportHeight}px` : undefined,
                maxHeight: isMobileScreen && visualViewportHeight ? `${visualViewportHeight}px` : undefined
              }}
              className="fixed inset-x-0 bottom-0 z-50 h-[86vh] max-h-[86dvh] rounded-t-3xl bg-[#040914]/95 backdrop-blur-2xl border-t border-x border-brand-primary/40 shadow-[0_-16px_48px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden text-slate-100 selection:bg-brand-primary/30
                sm:static sm:inset-auto sm:mb-3 sm:w-[360px] sm:max-h-[500px] sm:h-[55vh] sm:rounded-2xl sm:bg-[#040914]/70 sm:border sm:border-brand-primary/40 sm:shadow-[0_16px_48px_rgba(0,0,0,0.6)]"
            >
              {/* Mobile Drag Handle */}
              <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mt-2 sm:hidden shrink-0" aria-hidden="true" />

              {/* Liquid Highlight Reflection */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none rounded-t-2xl sm:rounded-t-2xl" />

              {/* Header */}
              <div className="px-4 py-3 sm:px-3.5 sm:py-2.5 bg-white/[0.03] backdrop-blur-md border-b border-white/10 flex items-center justify-between relative z-10 shrink-0">
                <div className="flex items-center space-x-2.5">
                  <div className="relative w-8 h-8 sm:w-7.5 sm:h-7.5 flex items-center justify-center">
                    <div className="w-8 h-8 sm:w-7.5 sm:h-7.5 rounded-full overflow-hidden border border-cyan-400/50 bg-[#08152c] shadow-[0_0_12px_rgba(6,182,212,0.35)] flex items-center justify-center p-0.5">
                      <img
                        src="/assets/pai.png"
                        alt="P.A.I."
                        className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(6,182,212,0.4)]"
                      />
                    </div>
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-[#070D1D]" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <h3 className="font-mono text-xs font-bold tracking-wider text-slate-100 flex items-center space-x-1">
                        <span>P.A.I.</span>
                      </h3>
                      <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                        v2.0
                      </span>
                    </div>
                    <p className="text-[8.5px] font-mono text-emerald-400/90 flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                      <span>ONLINE</span>
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={handleReset}
                    className="p-2 sm:p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/10 transition-colors"
                    title="Reset Chat"
                    aria-label="Reset chat"
                  >
                    <RotateCcw className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 sm:p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 active:bg-white/20 transition-colors"
                    title="Close Assistant"
                    aria-label="Close Assistant"
                  >
                    <X className="w-5 h-5 sm:w-4 sm:h-4 text-slate-200" />
                  </button>
                </div>
              </div>

              {/* Messages Feed */}
              <div
                ref={messagesFeedRef}
                onScroll={handleScroll}
                tabIndex={0}
                role="region"
                aria-label="Chat messages list"
                data-lenis-prevent="true"
                className="flex-1 min-h-0 p-3.5 sm:p-3 overflow-y-auto space-y-3 custom-scrollbar relative z-10 text-[11px] overscroll-contain"
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-end space-x-1.5 max-w-[90%]">
                      {msg.sender === 'bot' && (
                        <div className="w-7 h-7 rounded-full overflow-hidden border border-cyan-400/40 bg-[#08152c] shrink-0 mb-0.5 shadow-sm flex items-center justify-center p-0.5">
                          <img
                            src="/assets/pai.png"
                            alt="P.A.I."
                            className="w-full h-full object-contain drop-shadow-[0_1px_3px_rgba(6,182,212,0.4)]"
                          />
                        </div>
                      )}
                      <div
                        className={`p-2.5 rounded-xl leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-[#1e1e1e]/95 border border-brand-primary/40 text-[#d4d4d4] font-mono text-[11px] rounded-br-none shadow-md shadow-black/60 backdrop-blur-md'
                            : 'bg-[#060D1E]/60 border border-white/10 backdrop-blur-md text-slate-200 rounded-bl-none shadow-sm'
                        }`}
                      >
                        <div className="whitespace-pre-wrap font-sans">
                          {msg.sender === 'user' ? (
                            <div className="font-mono text-[11px]">
                              <span className="text-[#569cd6] font-bold mr-1.5">$</span>
                              {renderCodeSyntax(msg.text)}
                            </div>
                          ) : (
                            msg.text.split('\n').map((line, idx) => {
                              const parts = line.split(/(\*\*.*?\*\*)/g);
                              return (
                                <span key={idx} className={idx > 0 ? 'block mt-1' : ''}>
                                  {parts.map((part, pIdx) => {
                                    if (part.startsWith('**') && part.endsWith('**')) {
                                      return (
                                        <strong key={pIdx} className="font-semibold text-brand-primary">
                                          {part.slice(2, -2)}
                                        </strong>
                                      );
                                    }
                                    return part;
                                  })}
                                </span>
                              );
                            })
                          )}
                        </div>

                        {/* Interactive Action Chips with Real SVG Logos */}
                        {msg.actions && msg.actions.length > 0 && (
                          <div className="mt-2 pt-1.5 border-t border-white/10 flex flex-wrap gap-1.5">
                            {msg.actions.map((act, aIdx) => (
                              act.link ? (
                                <a
                                  key={aIdx}
                                  href={act.link}
                                  download={act.download}
                                  target={act.external ? "_blank" : "_self"}
                                  rel={act.external ? "noopener noreferrer" : ""}
                                  className="inline-flex items-center space-x-1.5 text-[9.5px] font-mono px-2.5 py-1 rounded-lg bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary border border-brand-primary/30 transition-all shadow-sm"
                                >
                                  <ActionChipIcon type={act.icon} className="w-3 h-3 shrink-0" />
                                  <span>{act.label}</span>
                                </a>
                              ) : (
                                <button
                                  key={aIdx}
                                  onClick={() => handleSend(act.query)}
                                  className="inline-flex items-center space-x-1.5 text-[9.5px] font-mono px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-all text-left"
                                >
                                  <ActionChipIcon type={act.icon} className="w-3 h-3 text-brand-primary shrink-0" />
                                  <span>{act.label}</span>
                                </button>
                              )
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="text-[8px] font-mono text-slate-500 mt-0.5 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex items-center space-x-1.5">
                    <div className="w-7 h-7 rounded-full overflow-hidden border border-cyan-400/40 bg-[#08152c] shrink-0 shadow-sm flex items-center justify-center p-0.5">
                      <img
                        src="/assets/pai.png"
                        alt="P.A.I."
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-2 rounded-xl bg-[#060D1E]/40 border border-white/10 backdrop-blur-md rounded-bl-none flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse delay-150" />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse delay-300" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Floating Scroll to Bottom Button */}
              <AnimatePresence>
                {showScrollBottomBtn && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onClick={scrollToBottom}
                    className="absolute bottom-16 sm:bottom-14 right-4 z-20 px-2 py-1 rounded-full bg-[#09152b]/95 border border-brand-primary/50 text-brand-primary font-mono text-[9px] shadow-lg flex items-center space-x-1 hover:bg-brand-primary/20 transition-all cursor-pointer backdrop-blur-md"
                  >
                    <span>Scroll to bottom</span>
                    <span className="text-[10px]">&darr;</span>
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Input Bar with Safe Area Handling */}
              <div className="p-2.5 sm:p-2 bg-slate-950/95 sm:bg-white/[0.03] backdrop-blur-md border-t border-white/10 relative z-10 shrink-0 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:pb-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center space-x-1.5"
                >
                  <div className="relative flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask about Prosun's projects or skills..."
                      className="w-full bg-black/40 sm:bg-black/30 backdrop-blur-md border border-white/15 rounded-xl px-3 py-2 sm:px-2.5 sm:py-1.5 text-xs sm:text-[10.5px] text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-primary/60 focus:ring-1 focus:ring-brand-primary/50 transition-all font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    aria-label="Send Message"
                    className="p-2.5 sm:p-2 rounded-xl bg-gradient-to-r from-brand-primary to-cyan-500 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-brand-primary/30 transition-all shrink-0 cursor-pointer"
                  >
                    <Send className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                  </button>
                </form>

                <div className="hidden sm:flex items-center justify-end mt-1 px-1 text-[8.5px] text-slate-500 font-mono">
                  <span>Press Enter &crarr;</span>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Capsule / Compact FAB Launcher */}
        {(!isOpen || !isMobileScreen) && (
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            aria-label={isOpen ? "Close P.A.I." : "Open P.A.I."}
            className="relative group flex items-center justify-center p-2 sm:px-3 sm:py-1.5 rounded-full bg-[#080E1E]/90 sm:bg-[#080E1E]/85 backdrop-blur-2xl border border-cyan-400/50 shadow-[0_6px_20px_rgba(6,182,212,0.25)] text-slate-100 hover:border-cyan-300 hover:shadow-[0_8px_25px_rgba(6,182,212,0.35)] transition-all cursor-pointer overflow-visible w-12 h-12 sm:w-auto sm:h-auto min-w-[48px] min-h-[48px] sm:min-w-0 sm:min-h-0 sm:space-x-2.5 touch-manipulation"
          >
            {/* Ambient Highlight Reflection */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/15 via-cyan-400/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* P.A.I. Robot Avatar with Online Indicator */}
            <div className="relative shrink-0 z-10 w-8 h-8 sm:w-8 sm:h-8 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-cyan-400/50 bg-[#08152c] shadow-[0_0_10px_rgba(6,182,212,0.35)] flex items-center justify-center p-0.5">
                <img
                  src="/assets/pai.png"
                  alt="P.A.I."
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform drop-shadow-[0_2px_4px_rgba(6,182,212,0.5)]"
                />
              </div>

              {/* Green Online Dot */}
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#080E1E] z-20 shadow-[0_0_4px_#34d399]" />
            </div>

            {/* Desktop-only Widget Label */}
            <div className="hidden sm:block text-left z-10 pr-0.5 font-mono">
              <div className="flex items-center space-x-1.5">
                <span className="text-[11px] font-bold tracking-wider text-slate-100 font-sans">
                  P.A.I.
                </span>
                <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  AI
                </span>
              </div>
              <p className="text-[9px] text-cyan-300/90 group-hover:text-cyan-200 transition-colors leading-none mt-0.5">
                {isOpen ? 'Close P.A.I.' : 'How can I assist you today?'}
              </p>
            </div>
          </motion.button>
        )}

      </div>
    </>
  );
};

export default ProsenjitChatbot;
