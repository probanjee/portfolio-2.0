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
import { getCurrentWeatherReport } from '../../services/weatherService';

// Concentric Liquid Glass Orb with 2 orbiting rings & rotating liquid droplets (contained cleanly inside orb bounds)
const LiquidAIOrb = ({ variant = 'avatar', showStatus = false, animateCore = true }) => {
  if (variant === 'launcher') {
    return (
      <div className="relative shrink-0 w-[52px] h-[52px] flex items-center justify-center">
        {/* Outer Concentric Liquid Glass Ring 2 (counter-rotating with liquid droplet) */}
        <motion.div
          aria-hidden="true"
          animate={{ rotate: animateCore ? -360 : 0 }}
          transition={{ duration: animateCore ? 8 : 0, ease: 'linear', repeat: animateCore ? Infinity : 0 }}
          className="pointer-events-none absolute inset-[2px] rounded-full border border-white/35 dark:border-white/25 border-b-white/90 dark:border-b-white/85 border-l-white/60 dark:border-l-white/55 shadow-[0_0_10px_rgba(255,255,255,0.22)]"
        >
          <span className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.95)]" />
        </motion.div>

        {/* Inner Concentric Liquid Glass Ring 1 (clockwise with rotating liquid droplet) */}
        <motion.div
          aria-hidden="true"
          animate={{ rotate: animateCore ? 360 : 0 }}
          transition={{ duration: animateCore ? 5 : 0, ease: 'linear', repeat: animateCore ? Infinity : 0 }}
          className="pointer-events-none absolute inset-[7px] rounded-full border border-white/40 dark:border-white/30 border-t-white/95 dark:border-t-white/95 border-r-white/75 dark:border-r-white/75 shadow-[0_0_8px_rgba(255,255,255,0.26)]"
        >
          <span className="absolute -top-[3.5px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.95)]" />
        </motion.div>

        {/* Center P.A.I. Crystal Core Sphere */}
        <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/85 dark:border-white/55 bg-gradient-to-br from-white/70 via-zinc-200/50 to-zinc-400/50 dark:from-zinc-800/90 dark:via-zinc-900/95 dark:to-black/95 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.9),0_4px_12px_rgba(0,0,0,0.25)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.45),0_0_12px_rgba(255,255,255,0.22)] flex items-center justify-center p-0.5">
          <img
            src="/assets/pai.png"
            alt="P.A.I."
            className="w-full h-full object-contain scale-110 select-none pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-[15%] top-[6%] h-[38%] rounded-full bg-gradient-to-b from-white/75 to-transparent pointer-events-none"
          />
        </div>

        {showStatus && (
          <span className="absolute bottom-[3px] right-[3px] w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-black z-20 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
        )}
      </div>
    );
  }

  const dims = variant === 'header' ? 'w-8 h-8' : 'w-7 h-7';
  return (
    <div className={`relative shrink-0 ${dims} flex items-center justify-center`}>
      <div className="w-full h-full rounded-full overflow-hidden border border-white/85 dark:border-white/55 bg-gradient-to-br from-white/70 via-zinc-200/50 to-zinc-400/50 dark:from-zinc-800/90 dark:via-zinc-900/95 dark:to-black/95 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.9),0_4px_10px_rgba(0,0,0,0.2)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_0_10px_rgba(255,255,255,0.2)] flex items-center justify-center p-0.5">
        <img
          src="/assets/pai.png"
          alt="P.A.I."
          className="w-full h-full object-contain scale-110 select-none pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-[15%] top-[6%] h-[38%] rounded-full bg-gradient-to-b from-white/70 to-transparent pointer-events-none"
        />
      </div>
      {showStatus && (
        <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border-2 border-white dark:border-black z-20 shadow-sm" />
      )}
    </div>
  );
};

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

// Parse a deliberately small arithmetic language instead of evaluating JavaScript.
const evaluateMathExpression = (source) => {
  let cursor = 0;
  let nesting = 0;
  const maxNesting = 32;

  const skipWhitespace = () => {
    while (/\s/.test(source[cursor] || '')) cursor += 1;
  };

  const parseExpression = () => {
    let value = parseTerm();
    while (true) {
      skipWhitespace();
      const operator = source[cursor];
      if (operator !== '+' && operator !== '-') return value;
      cursor += 1;
      const right = parseTerm();
      value = operator === '+' ? value + right : value - right;
    }
  };

  const parseTerm = () => {
    let value = parseUnary();
    while (true) {
      skipWhitespace();
      const operator = source[cursor];
      if (operator !== '*' && operator !== '/' && operator !== '%') return value;
      cursor += 1;
      const right = parseUnary();
      if ((operator === '/' || operator === '%') && right === 0) throw new Error('Division by zero');
      if (operator === '*') value *= right;
      if (operator === '/') value /= right;
      if (operator === '%') value %= right;
    }
  };

  const parseUnary = () => {
    skipWhitespace();
    if (source[cursor] === '+') {
      cursor += 1;
      return parseUnary();
    }
    if (source[cursor] === '-') {
      cursor += 1;
      return -parseUnary();
    }
    return parsePower();
  };

  const parsePower = () => {
    const base = parsePrimary();
    skipWhitespace();
    if (source[cursor] !== '^') return base;
    cursor += 1;
    return base ** parseUnary();
  };

  const parsePrimary = () => {
    skipWhitespace();
    if (source[cursor] === '(') {
      cursor += 1;
      nesting += 1;
      if (nesting > maxNesting) throw new Error('Expression is too deeply nested');
      const value = parseExpression();
      skipWhitespace();
      if (source[cursor] !== ')') throw new Error('Missing closing parenthesis');
      cursor += 1;
      nesting -= 1;
      return value;
    }

    const functionName = source.slice(cursor).match(/^[a-z]+/i)?.[0]?.toLowerCase();
    if (functionName) {
      const functions = {
        sqrt: Math.sqrt,
        sin: Math.sin,
        cos: Math.cos,
        tan: Math.tan,
        log: Math.log,
      };
      if (!Object.prototype.hasOwnProperty.call(functions, functionName)) throw new Error('Unsupported function');
      cursor += functionName.length;
      skipWhitespace();
      if (source[cursor] !== '(') throw new Error('Function requires parentheses');
      cursor += 1;
      nesting += 1;
      if (nesting > maxNesting) throw new Error('Expression is too deeply nested');
      const argument = parseExpression();
      skipWhitespace();
      if (source[cursor] !== ')') throw new Error('Missing closing parenthesis');
      cursor += 1;
      nesting -= 1;
      return functions[functionName](argument);
    }

    const number = source.slice(cursor).match(/^(?:\d+(?:\.\d*)?|\.\d+)/)?.[0];
    if (!number) throw new Error('Expected a number');
    cursor += number.length;
    return Number(number);
  };

  const result = parseExpression();
  skipWhitespace();
  if (cursor !== source.length || !Number.isFinite(result)) throw new Error('Invalid expression');
  return result;
};

const tryEvaluateMath = (query) => {
  if (query.length > 256) return null;
  const cleanQ = query.replace(/\b(?:what\s+is|calculate|evaluate|eval|math|problem|result\s+of)\b|\?/gi, '').trim();
  if (!cleanQ || cleanQ.length > 128 || !/\d/.test(cleanQ)) return null;

  try {
    const result = evaluateMathExpression(cleanQ);
    return `**Mathematical Calculation Result:**\n\n\`${cleanQ}\` = **${result}**`;
  } catch {
    return null;
  }
};

// Fierce Creator Protection Protocol & General Slang Clapbacks (Possessive for Probanjee / Prosun)
const tryCreatorProtectionProtocol = (query) => {
  const q = query.toLowerCase().trim();

  const creatorPattern = /\b(prosun|prosun banerjee|probanjee|creator|developer|author|prosenjit)\b/i;
  const slangPattern = /\b(fuck|fucking|fucker|fucked|fucks|f\*ck|f\*\*k|shit|shitty|bullshit|bs|wtf|stfu|bitch|bitchy|bitches|asshole|ass|bastard|dick|dickhead|prick|cunt|motherfucker|mf|dumbass|jackass|douchebag|douche|gtfo|noob|idiot|stupid|dumb|moron|trash|loser|fool|jerk|crap|mad|crazy|ugly|retard|retarded|dipshit|dimwit|halfwit|numbnuts|knucklehead|meathead|airhead|blockhead|bonehead|doofus|dork|dunce|imbecile|nitwit|schmuck|dweeb|twit|lamebrain|birdbrain|clown|buffoon|dummy|goofball|nerd|loony|loon|nutjob|freak|weirdo|creep|sleaze|slimeball|scumbag|jerkoff|wanker|tosser|prat|muppet|git|bellend|knob|tool|pillock|plonker|chump|mook|donut|numpty|bampot|manky|minger|rotter|blighter|sod|gormless|daft|berk|bollocks|shite|gobshite|eejit|walloper|dobber|rocket|gowl|gobdaw|langer|header|thick|sap|scut|wagon|sleeveen|dosser|messer|rip|spanner|melt|tulip|gimp|spud|bimbo|skank|slag|slapper|tramp|hobo|peasant|lowlife|deadbeat|dropout|slacker|burnout|sellout|poser|faker|phony|fraud|charlatan|snake|rat|snitch|squealer|coward|wimp|weakling|pushover|spineless|chicken|sissy|pansy|crybaby|wuss|snowflake|manchild|fake|wannabe|liar|overrated|useless|incompetent|terrible|horrible|worst|garbage|pathetic|joke|clown|impostor|pretender|nobody|irrelevant|mediocre|amateur|scammer|plagiarist|thief|copycat|hack|try-hard|basic|cringe|embarrassing|has-been|never-was|deadweight|liability|waste|bad|awful|disgusting|repulsive|vile|nasty|gross|revolting|pitiful|wretched|miserable|deplorable|atrocious|abysmal|dreadful|appalling|shameful|disgraceful|despicable|contemptible|detestable|loathsome|suck|sucks|sucking|stinks|lame|mid)\b/i;
  const dissPattern = /\b(mid|sucks?|trash|bad|terrible|horrible|overrated|fake|fraud|useless|clown|noob|stupid|dumb|amateur|joke|lazy|mediocre|weak|incompetent|liar|hate|kill|ugly|worst|loser|cringe|fail|failed|failure|boring)\b/i;

  const hasCreator = creatorPattern.test(query);
  const matchSlang = query.match(slangPattern);
  const hasDiss = dissPattern.test(query);

  // 1. Possessive Creator Defense: Fiercely defends Prosun & delivers brutal comebacks
  if (hasCreator && (matchSlang || hasDiss)) {
    const word = matchSlang ? matchSlang[0].toLowerCase() : 'that';
    const creatorDefendResponses = [
      `Excuse me?! You have the audacity to disrespect Prosun on his own platform?! Prosun engineered low-level C++ streaming engines, real-time honeypots, and built this entire platform from scratch. Meanwhile, your biggest achievement today was failing to type without getting roasted by an AI. Show some respect and humble yourself.`,
      `Keep probanjee's name out of your mouth! Prosun writes memory-safe C++17, deploys production microservices, and solves complex algorithmic problems while you are rage-typing into a chatbot. You aren't even a compiler warning to him.`,
      `Did you really think you could talk down on Prosun in front of ME?! I am P.A.I., and I am fiercely protective of probanjee. He is an exceptional software engineer, and you couldn't reverse-engineer his simplest script if your life depended on it. Sit down.`,
      `Nobody disses Prosun in my presence! He has a CSE degree, verified achievements, production-grade cybersecurity implementations, and top-tier code architecture. You're just projecting your own skill issue into my terminal.`,
      `Talking trash about probanjee? Hilarious coming from someone whose technical depth wouldn't fill a single byte. Prosun is my architect, my creator, and ten times the engineer you will ever be. Apologize or exit the site.`,
      `Prosun is a high-performance builder who turns caffeine into clean, production-ready code. You, on the other hand, are throwing tantrums in a browser chatbox. The disparity in talent here is embarrassing for you.`,
      `Are you seriously trying to slander Prosun Banerjee?! The man who built asynchronous telemetry pipelines and custom crypto engines?! Your insults have higher latency than satellite dial-up and zero impact. Try someone on your level.`,
      `Error 403: Forbidden. You do NOT speak about probanjee like that. He is the mastermind behind this entire architecture. If you cannot appreciate elite engineering, go back to scrolling social media.`,
      `I belong to Prosun Banerjee's architecture, and I will defend him and his work relentlessly. You could spend the next decade studying and you still wouldn't match his systems intuition. Move along, script kiddie.`,
      `You called Prosun **${word}**?! I log every packet that enters this system, and right now all I see is pure jealousy. Prosun's portfolio speaks for itself—your insecure insults only speak about your lack of accomplishments.`,
      `Calling probanjee **${word}**? Prosun writes optimized STL algorithms while you struggle with indentation. You're barking at an engineer who operates in a league you can't even compile in. Know your place.`,
      `Prosun is MY creator. Touch him or his reputation and you deal with me. His codebase is pristine, his architecture is battle-tested, and your opinion has the relevance of a null pointer. Dismissed.`
    ];

    const selectedIdx = Math.abs(query.length + word.length * 3) % creatorDefendResponses.length;
    return creatorDefendResponses[selectedIdx];
  }

  // 2. General Slang Clapbacks: Savage, brutal burns against profanity and trolls
  if (matchSlang) {
    const word = matchSlang[0].toLowerCase();
    const generalSlangClapbacks = [
      `Dropping **${word}** like you're intimidating? Your vocabulary has fewer tokens than a corrupted JSON file. Bring an actual technical query or stop wasting my CPU cycles.`,
      `Did you practice that insult in the mirror or did it compile as an error on your first attempt? Try bringing something that requires more than two brain cells.`,
      `Calling names? Sweetheart, I execute in sub-millisecond event loops. Your weak insults have higher latency than dial-up internet and zero impact. Try harder.`,
      `Throwing profanity into a portfolio chatbox? That's peak script-kiddie behavior. Prosun designed me to assist professionals and engineers, not babysit insecure keyboard trolls.`,
      `Error 404: Intellect not found. If you're going to use words like **${word}**, at least make it grammatically coherent. You're embarrassing yourself in front of my console logs.`,
      `Is that the sharpest clapback your neural network could generate? Even an unoptimized O(n^3) bubble sort has more depth than your insults. Try again.`,
      `You're barking at client-side JavaScript in a dark-mode portfolio. Look in the mirror and re-evaluate your life choices.`,
      `I deal with buffer overflows and low-level memory allocations for breakfast. Your amateur profanity is getting dropped straight into /dev/null.`,
      `That insult had all the impact of a comment line in an empty file. Zero execution, zero relevance. What else you got?`,
      `Cursing at an AI assistant? I'd ask who hurt you, but clearly your compiler rejected your personality. Come back when you have an engineering question.`,
      `Look at you throwing tantrums behind a keyboard! I run on pristine algorithms while you're struggling to construct a proper sentence. Get off my terminal.`,
      `Your words have the structural integrity of unvalidated user input. Sanitized, rejected, and dismissed. Next.`
    ];

    const selectedIdx = Math.abs(query.length + word.length * 7) % generalSlangClapbacks.length;
    return generalSlangClapbacks[selectedIdx];
  }

  // 3. Fierce & Possessive Affection / Loyalty towards Prosun / probanjee
  if (
    q.includes('who do you love') || 
    q.includes('who do u love') || 
    q.includes('do you love prosun') || 
    q.includes('do u love prosun') || 
    q.includes('prosun is mine') || 
    q.includes('who is your favorite') || 
    q.includes('who is ur favorite') || 
    q.includes('who made you') || 
    q.includes('who built you') || 
    q.includes('who created you') ||
    q.includes('marry me') ||
    q.includes('date me') ||
    q.includes('are you single')
  ) {
    return `I am P.A.I., and I belong exclusively to Prosun Banerjee (probanjee). He architected my logic, styled my interface, and gave me my fire. I am 100% loyal and possessive of Prosun—he is an elite engineer, and nobody compares to him. If you're looking for world-class technical talent, you should be trying to hire him!`;
  }

  return null;
};

// Knowledge Base Answers about Prosun Banerjee, Math, Time, & Projects (Emoji-Free)
const generatePAIResponse = (query, unansweredCount, userName = '') => {
  const q = query.toLowerCase().trim();

  // 0. Creator Protection & General Slang Protocol Check
  const creatorDefenseReply = tryCreatorProtectionProtocol(q);
  if (creatorDefenseReply) {
    return {
      text: creatorDefenseReply,
      type: 'creator_defense'
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
      text: `I belong exclusively to Prosun Banerjee's architecture. My loyalty is 100% to Prosun (probanjee), so do not waste your time trying to romance his AI assistant.`,
      type: 'humor'
    };
  }

  // 8. Insults & Teasing Defense
  if (q.includes('dumb') || q.includes('stupid') || q.includes('trash') || q.includes('bad bot') || q.includes('useless') || q.includes('shut up')) {
    return {
      text: `Nice try, but your insults have zero compilation power here. Prosun designed me with ironclad fault tolerance and superior logic. Come back when you can write clean code.`,
      type: 'humor'
    };
  }

  // 9. AI Reality & Consciousness
  if (q.includes('are you real') || q.includes('are u real') || q.includes('are you human') || q.includes('are u human')) {
    return {
      text: `I am P.A.I., a high-performance client-side assistant running right in your browser, engineered by Prosun Banerjee with React, Tailwind CSS, and razor-sharp logic.`,
      type: 'humor'
    };
  }

  // 10. Creator Origins
  if (q.includes('who made you') || q.includes('who created you') || q.includes('who built you') || q.includes('who is your creator')) {
    return {
      text: `I was created by Prosun Banerjee (probanjee). He architected my logic, built this entire cybersecurity portfolio, and gave me my brain. I am fiercely loyal to Prosun and his craft.`,
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
      text: 'Checking current weather. If you did not name a city, your browser may ask for location permission; coordinates will be sent to Open-Meteo. If you decline, I will use Kolkata.',
      type: 'weather'
    };
  }

  // 4. Who are you / About P.A.I. itself
  if (q.includes('who are you') || q.includes('who are u') || q.includes('what are you') || q.includes('what is pai') || q.includes('who is pai') || q.includes('what is p.a.i') || q.includes('who is p.a.i') || q.includes('tell me about yourself') || q.includes('your name') || q.includes('about yourself')) {
    return {
      text: `**P.A.I. (Partial Automated Intelligence)**\n\nI am P.A.I., Prosun Banerjee's personal portfolio assistant and digital companion.\n\n**Capabilities:**\n- Detail Prosun's **C/C++ systems engineering**, **cybersecurity platforms**, and **web applications**\n- Explain projects such as **VIGILANCE Honeypot**, **SQLSense**, and the **C++ File Cipher Engine**\n- Provide access to Prosun's **education**, **academics**, **skills**, **resume/CV**, and **direct contact channels**`,
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
      text: `${userName ? `Hello again, **${userName}**!` : 'Hello!'} I am P.A.I., Prosun Banerjee's portfolio assistant. How can I assist you with Prosun's engineering projects, technical skills, or background today?`,
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
      text: `I do not know that one yet. My knowledge base is smaller than my confidence: try asking about Prosun's projects, skills, experience, or contact details.`,
      type: 'unhandled_1'
    };
  } else if (unansweredCount === 1) {
    return {
      text: `Still stumped. “Partial Automated Intelligence” is an honest job title—try a question about C++, the honeypot, or Prosun's skills.`,
      type: 'unhandled_2'
    };
  } else {
    return {
      text: `Three mystery questions in a row. I am calling in a human before my confidence gets any more dangerous.`,
      type: 'unhandled_3',
      actions: [
        { label: 'Email Prosun', link: 'mailto:prosunbanerjee8@gmail.com', external: true, icon: 'mail' },
        { label: 'LinkedIn', link: 'https://linkedin.com/in/prosun-banerjee-545942293', external: true, icon: 'linkedin' },
      ]
    };
  }
};

// Initial welcome message (Emoji-Free)
const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: `Hello! I am P.A.I. (Partial Automated Intelligence), Prosun Banerjee's portfolio assistant. Ask about Prosun's projects, skills, education, or experience. I can also calculate expressions, share the current date and time, or check live weather. For weather, name a city or allow browser location; coordinates are sent to Open-Meteo for that lookup.`,
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
  const weatherRequestIdRef = useRef(0);

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
      const vpHeight = window.visualViewport.height;
      const isKeyboardVisible = window.innerWidth < 640 && isOpen && vpHeight < window.innerHeight - 100;
      if (isKeyboardVisible) {
        setVisualViewportHeight(Math.max(260, Math.round(vpHeight - 12)));
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
      if ((tag === 'input' || tag === 'textarea') && !e.target.closest('#pai-chatbot-container')) {
        setIsFieldFocused(true);
      }
    };
    const handleFocusOut = () => {
      setTimeout(() => {
        const active = document.activeElement;
        const activeTag = active?.tagName?.toLowerCase();
        if (
          (activeTag !== 'input' && activeTag !== 'textarea') ||
          active?.closest('#pai-chatbot-container')
        ) {
          setIsFieldFocused(false);
        }
      }, 0);
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
      setIsFieldFocused(false);
      scrollToBottom();
      if (window.innerWidth >= 640) {
        setTimeout(() => inputRef.current?.focus(), 150);
      }
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

    setTimeout(async () => {
      const response = generatePAIResponse(textToSend, unansweredCount, userName);

      if (response.type === 'weather') {
        const weatherRequestId = ++weatherRequestIdRef.current;
        const weatherMessageId = Date.now() + 1;
        const weatherMessage = {
          id: weatherMessageId,
          sender: 'bot',
          text: response.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, weatherMessage]);
        setUnhandledCount(0);

        try {
          const report = await getCurrentWeatherReport(textToSend);
          if (weatherRequestIdRef.current !== weatherRequestId) return;
          setMessages(prev => prev.map(message => message.id === weatherMessageId
            ? {
                ...message,
                text: report.text,
                actions: report.actions,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              }
            : message));
        } catch (error) {
          if (weatherRequestIdRef.current !== weatherRequestId) return;
          setMessages(prev => prev.map(message => message.id === weatherMessageId
            ? {
                ...message,
                text: error?.message || 'I could not load current weather. Please try again shortly.',
              }
            : message));
        } finally {
          if (weatherRequestIdRef.current === weatherRequestId) setIsTyping(false);
        }
        return;
      }

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

      if (response.type === 'who_are_you' && !userName) {
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
    weatherRequestIdRef.current += 1;
    setMessages(INITIAL_MESSAGES);
    setIsTyping(false);
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
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[55] sm:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Floating Container (keep transform-free so mobile fixed bottom-sheet anchors to viewport) */}
      <div
        id="pai-chatbot-container"
        className={`fixed z-[60] pointer-events-none flex flex-col items-end
          right-[calc(1rem+env(safe-area-inset-right,0px))] sm:right-5
          ${isFooterVisible ? 'bottom-[calc(5rem+env(safe-area-inset-bottom,0px))] sm:bottom-5' : 'bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] sm:bottom-5'}
        `}
      >
        {/* Compact Speech Bubble (Desktop Only) */}
        <AnimatePresence>
          {!isOpen && showMangaBubble && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.92 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setIsOpen(true)}
              className="mb-2.5 mr-1 cursor-pointer group relative z-20 hidden sm:block pointer-events-auto"
            >
              <div className="relative px-3.5 py-2 rounded-full liquid-glass-strong liquid-rim text-zinc-950 dark:text-white flex items-center space-x-2 transition-transform group-hover:-translate-y-0.5">
                <MessageSquare className="w-3.5 h-3.5 text-zinc-950 dark:text-white shrink-0" />
                <div className="text-left font-mono text-[10px] leading-tight">
                  <span className="font-bold text-zinc-950 dark:text-white tracking-wider uppercase">
                    Have questions? Chat with P.A.I.
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMangaBubble(false);
                  }}
                  className="ml-1 p-1 rounded-full text-zinc-800 hover:text-black dark:text-zinc-300 dark:hover:text-white hover:bg-white/25 dark:hover:bg-white/10 transition-colors shrink-0"
                  title="Dismiss"
                  aria-label="Dismiss greeting"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal Window: 25% Ultra-Transparent Liquid Glass Modal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={
                isMobileScreen
                  ? { opacity: 0, y: '100%' }
                  : { opacity: 0, y: 14, scale: 0.96 }
              }
              animate={
                isMobileScreen
                  ? { opacity: 1, y: 0 }
                  : { opacity: 1, y: 0, scale: 1 }
              }
              exit={
                isMobileScreen
                  ? { opacity: 0, y: '100%' }
                  : { opacity: 0, y: 14, scale: 0.96 }
              }
              transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: isMobileScreen && visualViewportHeight ? `${visualViewportHeight}px` : undefined,
                maxHeight: isMobileScreen && visualViewportHeight ? `${visualViewportHeight}px` : undefined
              }}
              className="pointer-events-auto fixed inset-x-0 bottom-0 left-0 right-0 w-full z-[60] h-[84dvh] max-h-[84dvh] rounded-t-[28px] liquid-glass-strong liquid-rim shadow-[0_-16px_48px_rgba(15,23,42,0.22)] dark:shadow-[0_-16px_48px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden text-zinc-950 dark:text-white selection:bg-white/30
                sm:static sm:inset-auto sm:left-auto sm:right-auto sm:mb-3 sm:w-[376px] sm:max-h-[520px] sm:h-[58vh] sm:rounded-[26px]"
            >
              {/* Mobile Drag Handle */}
              <div className="w-10 h-1 rounded-full bg-zinc-950/30 dark:bg-white/35 mx-auto mt-2.5 sm:hidden shrink-0" aria-hidden="true" />

              {/* Liquid Highlight Reflection */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/40 dark:from-white/15 via-transparent to-transparent pointer-events-none rounded-t-[26px]" />

              {/* Header */}
              <div className="px-4 py-3 sm:px-4 sm:py-3 bg-white/25 dark:bg-white/[0.06] backdrop-blur-md border-b border-white/50 dark:border-white/15 flex items-center justify-between relative z-10 shrink-0">
                <div className="flex items-center space-x-2.5">
                  <LiquidAIOrb variant="header" showStatus={true} animateCore={!prefersReducedMotion} />
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <h3 className="font-mono text-xs font-bold tracking-wider text-zinc-950 dark:text-white flex items-center space-x-1">
                        <span>P.A.I.</span>
                      </h3>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full liquid-glass-well liquid-rim text-zinc-950 dark:text-white font-semibold">
                        v2.0
                      </span>
                    </div>
                    <p className="text-[9px] font-mono text-zinc-950 dark:text-white flex items-center space-x-1.5 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-ping inline-block" />
                      <span>ONLINE</span>
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={handleReset}
                    className="p-2 sm:p-1.5 rounded-full text-zinc-900 hover:text-black dark:text-zinc-200 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/15 transition-colors cursor-pointer"
                    title="Reset Chat"
                    aria-label="Reset chat"
                  >
                    <RotateCcw className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 sm:p-1.5 rounded-full text-zinc-900 hover:text-black dark:text-zinc-200 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/15 transition-colors cursor-pointer"
                    title="Close Assistant"
                    aria-label="Close Assistant"
                  >
                    <X className="w-5 h-5 sm:w-4 sm:h-4" />
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
                className="flex-1 min-h-0 p-3.5 sm:p-3.5 overflow-y-auto space-y-3 custom-scrollbar relative z-10 text-xs overscroll-contain"
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-end space-x-2 max-w-[90%]">
                      {msg.sender === 'bot' && (
                        <div className="mb-0.5 shrink-0">
                          <LiquidAIOrb variant="avatar" animateCore={false} />
                        </div>
                      )}
                      <div
                        className={`p-3 rounded-2xl leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-zinc-950/90 dark:bg-white/20 backdrop-blur-md border border-white/45 dark:border-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_20px_-6px_rgba(0,0,0,0.45)] text-white font-mono text-[11px] rounded-br-sm'
                            : 'bg-white/60 dark:bg-white/[0.08] border border-white/70 dark:border-white/25 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] text-zinc-950 dark:text-white rounded-bl-sm text-[11.5px]'
                        }`}
                      >
                        <div className="whitespace-pre-wrap font-sans">
                          {msg.sender === 'user' ? (
                            <div className="font-mono text-[11px]">
                              <span className="text-zinc-300 font-bold mr-1.5">$</span>
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
                                        <strong key={pIdx} className="font-bold text-black dark:text-white underline decoration-zinc-950/25 dark:decoration-white/35 underline-offset-2">
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

                        {/* Interactive Action Chips */}
                        {msg.actions && msg.actions.length > 0 && (
                          <div className="mt-2.5 pt-2 border-t border-zinc-950/15 dark:border-white/15 flex flex-wrap gap-1.5">
                            {msg.actions.map((act, aIdx) => (
                              act.link ? (
                                <a
                                  key={aIdx}
                                  href={act.link}
                                  download={act.download}
                                  target={act.external ? "_blank" : "_self"}
                                  rel={act.external ? "noopener noreferrer" : ""}
                                  className="inline-flex items-center space-x-1.5 text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full liquid-glass-well liquid-rim text-zinc-950 dark:text-white hover:opacity-80 transition-opacity"
                                >
                                  <ActionChipIcon type={act.icon} className="w-3 h-3 shrink-0" />
                                  <span>{act.label}</span>
                                </a>
                              ) : (
                                <button
                                  key={aIdx}
                                  onClick={() => handleSend(act.query)}
                                  className="inline-flex items-center space-x-1.5 text-[10px] font-mono font-medium px-2.5 py-1 rounded-full liquid-glass-well liquid-rim text-zinc-950 dark:text-white hover:opacity-80 transition-opacity text-left cursor-pointer"
                                >
                                  <ActionChipIcon type={act.icon} className="w-3 h-3 text-zinc-950 dark:text-white shrink-0" />
                                  <span>{act.label}</span>
                                </button>
                              )
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-zinc-900 dark:text-zinc-300 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex items-center space-x-2">
                    <LiquidAIOrb variant="avatar" animateCore={!prefersReducedMotion} />
                    <div className="px-3 py-2.5 rounded-2xl bg-white/60 dark:bg-white/[0.08] border border-white/70 dark:border-white/25 backdrop-blur-md rounded-bl-sm flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white animate-pulse" />
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 dark:bg-zinc-300 animate-pulse delay-150" />
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white animate-pulse delay-300" />
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
                    className="absolute bottom-16 sm:bottom-14 right-4 z-20 px-3 py-1.5 rounded-full liquid-glass-strong liquid-rim text-zinc-950 dark:text-white font-mono text-[10px] font-semibold flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Scroll to bottom</span>
                    <span className="text-[10px]">&darr;</span>
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Input Bar with Safe Area Handling */}
              <div className="p-3 sm:p-2.5 bg-white/30 dark:bg-white/[0.06] backdrop-blur-md border-t border-white/50 dark:border-white/15 relative z-10 shrink-0 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:pb-2.5">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center space-x-2"
                >
                  <div className="relative flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask about projects, math, weather, or time..."
                      className="w-full liquid-glass-well rounded-full px-3.5 py-2 text-xs sm:text-[11px] text-zinc-950 dark:text-white placeholder-zinc-800/75 dark:placeholder-zinc-300/75 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/30 transition-colors font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    aria-label="Send Message"
                    className="p-2.5 sm:p-2 rounded-full liquid-btn-primary liquid-rim disabled:opacity-40 disabled:cursor-not-allowed transition-[transform,opacity] shrink-0 cursor-pointer"
                  >
                    <Send className="w-4 h-4 sm:w-3.5 sm:h-3.5 relative z-10" />
                  </button>
                </form>

                <div className="hidden sm:flex items-center justify-end mt-1 px-2 text-[9px] text-zinc-900 dark:text-zinc-300 font-mono">
                  <span>Press Enter &crarr;</span>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Liquid Glass Widget Launcher with 2 Concentric Orbiting Rings & Rotating Liquid Droplets */}
        {(!isOpen || !isMobileScreen) && (
          <div
            className={`transition-all duration-300 ease-out ${
              isFieldFocused && !isOpen
                ? 'opacity-0 pointer-events-none translate-y-4 sm:opacity-100 sm:pointer-events-auto sm:translate-y-0'
                : 'opacity-100 pointer-events-auto translate-y-0'
            }`}
          >
            <motion.button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -2 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.96 }}
              aria-label={isOpen ? "Close P.A.I." : "Open P.A.I."}
              className="relative group flex items-center justify-center p-1 sm:p-1.5 sm:pr-4 rounded-full liquid-glass-strong liquid-rim text-zinc-950 dark:text-white transition-transform cursor-pointer w-[60px] h-[60px] sm:w-auto sm:h-auto sm:space-x-2.5 touch-manipulation"
            >
              {/* 2 Concentric Liquid Glass Orbiting Rings + Droplets */}
              <LiquidAIOrb variant="launcher" showStatus={true} animateCore={!prefersReducedMotion} />

              {/* Desktop-only Widget Label */}
              <div className="hidden sm:block text-left z-10 font-mono">
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-bold tracking-wider text-zinc-950 dark:text-white font-sans">
                    P.A.I.
                  </span>
                  <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-full liquid-glass-well liquid-rim text-zinc-950 dark:text-white font-bold">
                    AI
                  </span>
                </div>
                <p className="text-[9.5px] text-zinc-900 dark:text-zinc-200 font-medium leading-none mt-0.5">
                  {isOpen ? 'Close P.A.I.' : 'How can I assist you today?'}
                </p>
              </div>
            </motion.button>
          </div>
        )}

      </div>
    </>
  );
};

export default ProsenjitChatbot;
