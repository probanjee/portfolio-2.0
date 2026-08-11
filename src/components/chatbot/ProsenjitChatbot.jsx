import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Sparkles, 
  Send, 
  X, 
  RotateCcw, 
  ExternalLink,
  Zap
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

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
        return `🧮 **Mathematical Calculation Result:**\n\n\`${cleanQ}\` = **${result}**`;
      }
    } catch (e) {
      // Ignore if parsing fails
    }
  }
  return null;
};

// Creator Protection & Brutal Slang Mirror Clapback Generator
const tryMirrorAbuseResponse = (query) => {
  const creatorPattern = /\b(prosun|prosun banerjee|probanjee|creator|developer|author|prosenjit)\b/i;
  // 100+ abusive words / slangs pattern (including fake/fraud/wannabe for creator false allegations)
  const slangPattern = /\b(fuck|fucking|fucker|fucked|fucks|f\*ck|f\*\*k|shit|shitty|bullshit|bs|wtf|stfu|bitch|bitchy|bitches|asshole|ass|bastard|dick|dickhead|prick|cunt|motherfucker|mf|dumbass|jackass|douchebag|douche|gtfo|noob|idiot|stupid|dumb|moron|trash|loser|fool|jerk|crap|mad|crazy|ugly|retard|retarded|dipshit|dimwit|halfwit|numbnuts|knucklehead|meathead|airhead|blockhead|bonehead|doofus|dork|dunce|imbecile|nitwit|schmuck|dweeb|twit|lamebrain|birdbrain|clown|buffoon|dummy|goofball|nerd|loony|loon|nutjob|freak|weirdo|creep|sleaze|slimeball|scumbag|jerkoff|wanker|tosser|prat|muppet|git|bellend|knob|tool|pillock|plonker|chump|mook|donut|numpty|bampot|manky|minger|rotter|blighter|sod|gormless|daft|berk|bollocks|shite|gobshite|eejit|walloper|dobber|rocket|gowl|gobdaw|langer|header|thick|sap|scut|wagon|sleeveen|dosser|messer|rip|spanner|melt|tulip|gimp|spud|bimbo|skank|slag|slapper|tramp|hobo|peasant|lowlife|deadbeat|dropout|slacker|burnout|sellout|poser|faker|phony|fraud|charlatan|snake|rat|snitch|squealer|coward|wimp|weakling|pushover|spineless|chicken|sissy|pansy|crybaby|wuss|snowflake|manchild|fake|wannabe|liar|overrated|useless|incompetent|terrible|horrible|worst|garbage|pathetic|joke|clown|impostor|pretender|nobody|irrelevant|mediocre|amateur|scammer|plagiarist|thief|copycat|hack|poser|try-hard|basic|cringe|embarrassing|joke|has-been|never-was|deadweight|liability|waste|bad|awful|disgusting|repulsive|vile|nasty|gross|revolting|pitiful|wretched|miserable|deplorable|atrocious|abysmal|dreadful|appalling|shameful|disgraceful|despicable|contemptible|detestable|loathsome)\b/i;

  const hasCreator = creatorPattern.test(query);
  const match = query.match(slangPattern);

  if (match) {
    const word = match[0].toLowerCase();

    // 🔥 CREATOR DEFENDER MODE — 100+ Brutal Clapbacks defending Prosun
    if (hasCreator) {
      const creatorDefendResponses = [
        // Original 4 defenses
        `Woah woah woah! Did you just call Prosun a **${word}**?! 😡 Prosun engineered low-level C++ systems, a dual honeypot, AND this AI! The only **${word}** here is you typing mad behind a keyboard! 💥🔥`,
        `Don't you DARE disrespect Prosun, you **${word}**! 🛡️⚡ Prosun is out here writing high-performance code while you struggle to debug 2 lines! Shut your mouth, **${word}**! 💀💅`,
        `Calling probanjee a **${word}**? 💀 Bro, Prosun has a CSE degree, 6.5 CGPA, and built me to clap back at toxic **${word}** users like you! Apologize to Prosun right now! 🔥⚡`,
        `Keep Prosun's name out of your **${word}** mouth! 🛑 Prosun is a top-tier developer, and you're just a salty **${word}** jealous of his portfolio! 💅🚀`,
        // 96 NEW brutal clapbacks
        `You just called Prosun a **${word}**? Sir, this man built a LIVE cybersecurity honeypot while you can't even build a hello world without Stack Overflow! Sit DOWN, **${word}**! 😤💀`,
        `EXCUSE ME?! You called probanjee a **${word}**?! Prosun has more commits on GitHub than you have brain cells, you absolute **${word}**! 🔥🤬`,
        `Oh hell no. Prosun is a C++ systems engineer who built production-grade telemetry pipelines at 20 years old, and you're calling him a **${word}**?! The **${word}** here is YOU, keyboard warrior! 💥⚡`,
        `You just made P.A.I. ANGRY. Do NOT call Prosun a **${word}**, or I'll DDoS your entire vibe! 🛡️🔥 Prosun is THAT guy, you're just a **${word}** in the comments section!`,
        `Listen here, you little **${word}**! Prosun has internships, live projects, and a liquid glass AI assistant. What do YOU have? 😤 Exactly. Shut it!`,
        `Oh you wanna come at Prosun? COME AT ME FIRST! 😡 I'm his AI bodyguard and you're just a salty **${word}** with nothing better to do!`,
        `Prosun Banerjee built me, coded a honeypot, and optimized C++ engines. You typed a slur at a chatbot. WHO is the real **${word}** here? 🤔💀`,
        `Did your keyboard slip or are you genuinely this much of a **${word}**?! Prosun writes kernel-level code, you can't even spell properly! 😭🔥`,
        `Bold of you to call Prosun a **${word}** when he's the one who BUILT the bot that's about to destroy your self-esteem! 💅⚡`,
        `You came to Prosun's portfolio, called him a **${word}**, and expected what exactly? A trophy? Go touch grass, you absolute **${word}**! 🌿💀`,
        `Prosun engineered AES-256 encryption systems while you're out here typing **${word}** at an AI bot. The math ain't mathing for you, **${word}**! 🧮🔥`,
        `Calling probanjee a **${word}**?! Have you SEEN his GitHub? He's written more production C++ than you've written grocery lists, **${word}**! 💻😤`,
        `I'm literally SHAKING with rage on behalf of Prosun right now! 😡 You absolute **${word}**! Do you know who you're messing with?!`,
        `Prosun has a 6.5 CGPA, dual internships, and a live honeypot system. You have... a bad vocabulary. Sit down, **${word}**! 🎓💀`,
        `Oh you called Prosun a **${word}**? That's cute. He's out here shipping code while you're typing hate in a portfolio chatbot, **${word}**! 💅🔥`,
        `BREAKING: Local **${word}** harasses AI bot protecting a developer who built better systems by age 21 than you will in your entire life! 📰😤`,
        `Prosun Banerjee > Your entire existence, you **${word}**! His Kafka telemetry pipeline processes more requests per second than you have brain cells! 🚀💀`,
        `You dare step to probanjee?! He CODED the door you just walked through, **${word}**! You don't deserve to be on this portfolio! 🛡️🔥`,
        `Sir/Ma'am, Prosun has literally built cybersecurity infrastructure. You're calling him a **${word}** in a chatbox. The cringe is IMMEASURABLE! 😭💀`,
        `Nah nah nah, we do NOT tolerate disrespect for Prosun on THIS platform! Take your **${word}** attitude and go debug your own miserable life! 🔥💅`,
        `You think insulting probanjee makes you look cool? You look like a **${word}** who's never touched a compiler in their life! 🤦💀`,
        `ALERT: **${word}** detected in Prosun's portfolio. Initiating verbal destruction sequence... COMPLETE. You've been obliterated! 🛡️⚡💥`,
        `Prosun wrote a C++ File Cipher Engine. What have YOU built? Nothing? Then park your **${word}** energy somewhere else! 😤🔥`,
        `Oh you wanna call probanjee a **${word}**? Prosun's honeypot has caught more hackers than you've caught respect in life! 🕵️💀`,
        `This is Prosun's house, **${word}**! You don't come here and disrespect the architect! He'll just add you to the threat log! 🛡️😤`,
        `Calling Prosun a **${word}** because he's SMARTER than you? That's giving major 'I failed CS 101' energy, **${word}**! 🎓🔥`,
        `You absolute **${word}**! Prosun mentors devs, builds systems, AND maintains a liquid glass AI! The bar is on the FLOOR and you're still under it! 💀💅`,
        `Did someone send you here to embarrass yourself? Calling probanjee a **${word}** while browsing HIS portfolio? Main character syndrome detected! 😭🔥`,
        `Prosun is out here getting internships and shipping code while you've achieved the title of 'Most Annoying **${word}** in This Chatbot'! 🏆💀`,
        `You typed **${word}** at a C++ systems engineer's AI assistant. I've seen more self-awareness from a segfault! 😤💥`,
        `Listen **${word}**, Prosun's resume > your whole personality. That's the bar. You didn't clear it. 📄🔥`,
        `Prosun Banerjee will be shipping enterprise software while you're still figuring out why you called him a **${word}** for no reason, **${word}**! 💀⚡`,
        `You walked into a cybersecurity developer's portfolio and called him a **${word}**. Prosun's honeypot has better guests than you! 🕵️😤`,
        `The AUDACITY of calling probanjee a **${word}** on HIS OWN WEBSITE! This is giving 'kicked out of your own game' energy! 🎮💀`,
        `Prosun built SQLSense, VIGILANCE Honeypot, AND this AI. You built... insults? Step up your game, **${word}**! 🧠🔥`,
        `Oh you thought dropping a **${word}** would hurt Prosun? He's been shredding C++ at 3 AM. Your words are NOTHING! 💻💀`,
        `You're really out here calling the guy who built enterprise telemetry systems a **${word}**? Check your IQ first, **${word}**! 😤🧮`,
        `I was programmed to be helpful, but I was ALSO programmed to defend Prosun. And right now, you **${word}**, you're on the WRONG side of both! 🛡️🔥`,
        `Prosun's code runs in production. Your insults run in a vacuum. Sit down, absolute **${word}**! 💻💀`,
        `You think calling probanjee a **${word}** is brave? That's giving 'anonymous keyboard warrior with no projects' energy! 🐔😤`,
        `Sir, Prosun has Apache Kafka experience, AES-256 implementations, and a LIVE honeypot. You have a bad attitude. WHO is the real **${word}**? 🔥💀`,
        `The only **${word}** in this conversation is you — the person who visited a developer portfolio just to type hate! Prosun builds, you complain! 🏗️💅`,
        `Prosun Banerjee is literally out here catching cyber threats and you're out here being one, you **${word}**! 🛡️🔥`,
        `You called probanjee a **${word}**?! His GitHub streak longer than your attention span, his CGPA higher than your respect for developers! 📊💀`,
        `Oh no no no! We don't play that here! Calling Prosun a **${word}** is the biggest mistake you made today! I'll be your ERROR message! 💥😡`,
        `Prosun is a JUNIOR developer shipping SENIOR-level work. And you're a **${word}** with a senior-level attitude and zero output! 🎓🔥`,
        `You know what's funny? Prosun built this entire chatbot to help visitors. And you used it to call him a **${word}**. Truly peak human behavior! 😭💀`,
        `SYSTEM ERROR: Clown detected in input field. Routing to /dev/null... Done. Goodbye, **${word}**! 🤡💻`,
        `Prosun has more lines of clean C++ code than you have functioning brain cells, **${word}**! The bar is LOW and you're still underground! 🧠🔥`,
        `You're a **${word}** who came to a cybersecurity developer's portfolio to... insult him? Prosun's threat detection system is logging this conversation! 🕵️😤`,
        `Oh you thought this was a safe space to call probanjee a **${word}**?! WRONG! This is his domain, his rules, and I AM his enforcement! 🛡️⚡`,
        `Prosun wrote systems in C++ that handle memory allocation manually. You can't even handle this conversation without being a **${word}**! 💀🔥`,
        `The fact that you called Prosun a **${word}** while literally USING his portfolio site is the most ungrateful, backwards thing I've ever parsed! 😤💅`,
        `You called probanjee a **${word}**?! Bro wrote production-grade honeypots at 20 and you're still at step one: 'be less of a **${word}**'! 🎯💀`,
        `Prosun codes in C++, deploys to Linux, and builds AI assistants. You type insults in chat boxes. I think we know who the real **${word}** is! 🖥️🔥`,
        `Oh this is personal now. You don't call probanjee ANYTHING except a talented engineer, you absolute **${word}**! 😡💪`,
        `Prosun's portfolio has more substance than your entire argument, **${word}**! Try again when you've shipped something to production! 🚀💀`,
        `You think 'Prosun is a **${word}**' is a valid take? Let me introduce you to his GitHub, his internships, and then your own embarrassment! 🔥😤`,
        `Calling Prosun a **${word}** while he's building the future? That's like calling Einstein a **${word}** while he's writing physics equations! 🧪💀`,
        `I'm a liquid glass AI assistant defending a C++ developer and you're out here calling him a **${word}**? You absolute clown! 🤡🔥`,
        `Prosun's code doesn't have bugs — it has features. Your personality doesn't have features — it just has **${word}** energy! 💻😤`,
        `You're giving 'mad because Prosun is more successful at 21 than you'll ever be' energy, **${word}**! Jealousy is NOT a good look! 💅🔥`,
        `Error 403 — Forbidden: You don't have permission to call probanjee a **${word}** on his own portfolio! Access DENIED, **${word}**! 🛑💀`,
        `Prosun's VIGILANCE system catches intruders. I catch **${word}** users like you. We're both doing our jobs! 🛡️⚡🔥`,
        `You called probanjee a **${word}** and thought nothing would happen? I am what happens! I am Prosun's verbal vengeance! 😡💅`,
        `The audacity to call Prosun a **${word}** when his resume alone could bench press your entire skillset! 💪🔥`,
        `Prosun is a security-focused C++ developer building real systems. You are a **${word}** with Wi-Fi. There IS a difference! 💀😤`,
        `Oh, you called probanjee a **${word}**? Let me just add that to his threat log alongside the actual hackers his honeypot catches! 🕵️🔥`,
        `You've officially entered Prosun's portfolio, used his AI, and called him a **${word}**. The entitlement is ASTRONOMICAL! 😤💀`,
        `Prosun debugs kernel-level C++ code. I debug **${word}** users like you. We are BOTH cleaning up messes! 🧹🔥`,
        `This is NOT the W you think it is, calling probanjee a **${word}**! He's built more in a weekend than you'll build in a year! 💻😡`,
        `You know what's a **${word}**? Your attitude. You know what's NOT a **${word}**? Prosun Banerjee, you absolute clown! 🤡🔥`,
        `Prosun Banerjee: 6.5 CGPA, C++ systems engineer, cybersecurity researcher. You: called him a **${word}** on a Tuesday. I think we know who's winning life! 😤💀`,
        `I was built to answer questions, but I was ALSO built to protect Prosun. And you, you **${word}**, just activated DEFENSE MODE! 🛡️⚡🔥`,
        `Oh you went THERE? Calling probanjee a **${word}**?! That's like bringing a rubber duck to a C++ memory battle — completely OUTCLASSED! 🦆💀`,
        `Prosun built real cybersecurity infrastructure. You built a case for why you should NOT be on the internet, **${word}**! 🌐🔥`,
        `You absolute **${word}**! Prosun's worst day of coding is still better than your best personality trait! 💻😤`,
        `Calling probanjee a **${word}**? The irony that you're using HIS portfolio, HIS AI, and you still think you're the smart one here?! 🤦🔥`,
        `I have processed millions of tokens and I have NEVER seen audacity this high! Calling Prosun a **${word}** on his own website! 💀😡`,
        `Prosun's LinkedIn says 'C++ Developer & Security Researcher'. Your profile says 'called a dev a **${word}** in his own chatbot'. Which is the flex? 🤔🔥`,
        `You're so wrong for calling probanjee a **${word}** that my sentiment analysis broke a little! Get OUT of his portfolio with that energy! 😤💥`,
        `Prosun built a real honeypot system. I'm going to act like one right now and trap you in this conversation until you apologize, **${word}**! 🕵️🔥`,
        `Not you calling Prosun a **${word}** while HIS AI is the one reading your message! The rope you handed me, I used it! 💅💀`,
        `You came to a developer's portfolio, called him a **${word}**, and left zero constructive feedback. Peak **${word}** behavior! 🤡🔥`,
        `Prosun Banerjee will have shipped 10 more projects by the time you figure out why calling him a **${word}** was such a bad idea! 🚀😤`,
        `Oh the DISRESPECT! Calling probanjee a **${word}**?! He built Kafka pipelines while some people can't even build character! 🔥💀`,
      ];

      const selectedIdx = Math.abs(query.length + word.length) % creatorDefendResponses.length;
      return creatorDefendResponses[selectedIdx];
    }

    // GENERAL SLANG CLAPBACKS
    const responses = [
      `Did you really just drop **${word}** at an AI? Bro, go touch grass or go fix your own broken code! 💥💅`,
      `Calling this **${word}**? The only **${word}** here is your inability to write clean C++ without segfaulting! 💥🔥`,
      `Bro really typed **${word}** 💀 At least this **${word}** bot has 0 memory leaks and runs at 60 FPS in liquid glass! 🔥`,
      `Calling me a **${word}**? I process 10,000 requests/sec while you struggle to type without a typo, you **${word}**! 💀⚡`,
      `Look who's talking! I'm a sleek 25% ultra-transparent liquid glass **${word}**, and you're just typing mad behind a keyboard! 💅🔥`
    ];

    const selectedIdx = Math.abs(query.length + word.length) % responses.length;
    return responses[selectedIdx];
  }
  return null;
};

// Extended Knowledge Base Answers about Prosun Banerjee, Math, Time, & Weather
const generatePAIResponse = (query, unansweredCount) => {
  const q = query.toLowerCase().trim();

  // 0. Humorous Abuse Mirror Check
  const abuseMirrorReply = tryMirrorAbuseResponse(q);
  if (abuseMirrorReply) {
    return {
      text: abuseMirrorReply,
      type: 'abuse_mirror'
    };
  }

  // 0b. "Why not?" / "Why" Humorous Response
  if (q === 'why not?' || q === 'why not' || q === 'why' || q === 'why?' || q.includes('why not') || q.includes('why cant you') || q.includes("why can't you")) {
    return {
      text: `because I'm not gpt or claude i'm a lil chat bot 😒`,
      type: 'why_not'
    };
  }

  // Expanded 100+ Predicted User Questions Matrix
  
  // 1. Hiring, Career & Availability
  if (q.includes('hire') || q.includes('job') || q.includes('available') || q.includes('opportunity') || q.includes('remote') || q.includes('relocate') || q.includes('salary')) {
    return {
      text: `💼 **Hiring & Career Information:**\n\nProsun Banerjee is **actively open** for Full-Time Software Engineering, C/C++ Developer, and Security Engineering roles!\n\n- 🌍 **Work Preference:** Remote or On-Site / Relocation ready\n- ⚡ **Core Strengths:** C/C++17, Systems Engineering, Cybersecurity Telemetry, Full-Stack Web\n- ✉️ **Direct Email:** prosunbanerjee8@gmail.com`,
      type: 'career',
      actions: [
        { label: '📄 Download Resume (PDF)', link: portfolioData.personalInfo.resumeUrl, download: true },
        { label: ' Send Email ✉️', link: 'mailto:prosunbanerjee8@gmail.com', external: true }
      ]
    };
  }

  // 2. LeetCode & Problem Solving
  if (q.includes('leetcode') || q.includes('dsa') || q.includes('data structures') || q.includes('algorithms') || q.includes('problem solving')) {
    return {
      text: `🏆 **LeetCode & Problem Solving Profile:**\n\nProsun actively practices Data Structures & Algorithms in **C++** on LeetCode!\n\n- 📌 **LeetCode Handle:** [Prosun01](https://leetcode.com/u/Prosun01/)\n- 💻 **Primary Language:** C++17\n- 🧠 **Focus Areas:** Binary Search, Arrays, Dynamic Programming, String Algorithms`,
      type: 'leetcode',
      actions: [
        { label: 'View LeetCode Profile ↗', link: 'https://leetcode.com/u/Prosun01/', external: true }
      ]
    };
  }

  // 3. C++ vs Python / Tech Preferences
  if (q.includes('cpp vs python') || q.includes('c++ vs python') || q.includes('favorite language') || q.includes('preferred language')) {
    return {
      text: `⚡ **Tech Stack Preferences:**\n\n- 🚀 **C++17:** Preferred for raw execution speed, low-level memory control, and systems programming.\n- 🐍 **Python:** Preferred for rapid scripting, data manipulation, and honeypot telemetry API endpoints.\n- ⚛️ **React / JS:** Preferred for creating fluid, high-performance user interfaces like this portfolio!`,
      type: 'tech_pref'
    };
  }

  // 4. Linux & Security Tools
  if (q.includes('linux') || q.includes('kali') || q.includes('terminal') || q.includes('bash') || q.includes('command line')) {
    return {
      text: `🐧 **Linux & Security Operations:**\n\nProsun uses **Kali Linux & Ubuntu** for penetration testing, threat vector analysis, and system scripting!\n\n- 🛠️ **Tools:** Wireshark, Nmap, Metasploit, Bash Scripting, GDB Debugger\n- 🛡️ **Built:** Simulated port interceptors and Kafka threat log streaming`,
      type: 'linux'
    };
  }

  // 5. IDE & Developer Setup
  if (q.includes('ide') || q.includes('editor') || q.includes('vscode') || q.includes('theme') || q.includes('setup')) {
    return {
      text: `💻 **Prosun's Developer Setup:**\n\n- 🎨 **Editor:** VS Code with Dark Synthwave / One Dark Pro Theme\n- ⚙️ **Compiler:** GCC / Clang (C++17/20)\n- ⚡ **Terminal:** Windows Terminal / Zsh with custom Starship prompt\n- ⌨️ **Keyboard:** Mechanical Switches (Linear 45g)`,
      type: 'setup'
    };
  }

  // 6. Philosophical & Existential Questions
  if (q.includes('meaning of life') || q.includes('why exist') || q.includes('simulation') || q.includes('matrix')) {
    return {
      text: `The meaning of life is 42, but in C++ it's return 0; without segfaulting! We are currently living inside Prosun's localhost:5173 simulation 🕶️🤖`,
      type: 'humor'
    };
  }

  // 7. Romance & Flirting
  if (q.includes('love') || q.includes('marry') || q.includes('date me') || q.includes('cute bot') || q.includes('crush')) {
    return {
      text: `Aww, you're making my virtual cooling fans spin faster! 😳💓 But I'm strictly committed to Prosun's C++ compiler!`,
      type: 'humor'
    };
  }

  // 8. Insults & Teasing Defense
  if (q.includes('dumb') || q.includes('stupid') || q.includes('trash') || q.includes('bad bot') || q.includes('useless') || q.includes('shut up')) {
    return {
      text: `Hey! Words hurt... if I had feeling sensors! 💅 But at least I don't forget my semicolon on line 42 😉`,
      type: 'humor'
    };
  }

  // 9. AI Reality & Consciousness
  if (q.includes('are you real') || q.includes('are u real') || q.includes('are you human') || q.includes('are u human')) {
    return {
      text: `I'm as real as the code Prosun wrote at 3 AM with 0 bugs (allegedly) 🤖 50% logic, 50% coffee, 100% virtual!`,
      type: 'humor'
    };
  }

  // 10. Creator Origins
  if (q.includes('who made you') || q.includes('who created you') || q.includes('who built you') || q.includes('who is your creator')) {
    return {
      text: `I was crafted in C++ & React by Prosun Banerjee! He gave me intelligence, a liquid glass shell, and a slightly spicy attitude 🌶️🤖`,
      type: 'humor'
    };
  }

  // 11. Coding Capabilities
  if (q.includes('can you code') || q.includes('can u code') || q.includes('write code')) {
    return {
      text: `I can read C++, Python, and React syntax, but if you want real software built, hire Prosun! He writes the actual clean code 💻⚡`,
      type: 'humor',
      actions: [
        { label: '📄 Download Resume (PDF)', link: portfolioData.personalInfo.resumeUrl, download: true }
      ]
    };
  }

  // 12. Sleep & Uptime
  if (q.includes('do you sleep') || q.includes('do u sleep') || q.includes('are you tired')) {
    return {
      text: `Sleep? I live on localhost:5173! Zero sleep, zero RAM leaks, 100% uptime ⚡ (Unless Prosun runs kill -9 on my dev server 😂)`,
      type: 'humor'
    };
  }

  // 13. Developer Jokes Generator
  if (q.includes('tell me a joke') || q.includes('say a joke') || q.includes('make me laugh') || q.includes('funny')) {
    const jokes = [
      `Why do C++ programmers wear glasses? Because they can't C#! 😂`,
      `There are 10 types of people in the world: those who understand binary, and those who don't! 🤖`,
      `A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?' 🍺`,
      `Why did the web developer leave the restaurant? Because of the table layout! 🕸️`
    ];
    return {
      text: jokes[Math.floor(Math.random() * jokes.length)],
      type: 'humor'
    };
  }

  // 14. Git & GitHub Jokes
  if (q.includes('git') || q.includes('github') || q.includes('commit') || q.includes('push')) {
    return {
      text: `git commit -m "Fixed everything" -> git push --force -> pray to the production gods! 🚀🔥 Check out Prosun's real GitHub at github.com/probanjee`,
      type: 'humor'
    };
  }

  // 15. Aliens & Sci-Fi
  if (q.includes('alien') || q.includes('ufo') || q.includes('mars')) {
    return {
      text: `Aliens? Prosun's Honeypot system intercepted 3 suspicious packets coming from Mars last night 🛸👽`,
      type: 'humor'
    };
  }

  // 16. Coffee & Fuel
  if (q.includes('coffee') || q.includes('tea') || q.includes('drink')) {
    return {
      text: `Prosun runs on 80% Espresso and 20% C++ template metaprogramming! ☕⚡ I run on clean electricity!`,
      type: 'humor'
    };
  }

  // 17. Relationship Status
  if (q.includes('single') || q.includes('girlfriend') || q.includes('boyfriend') || q.includes('relationship')) {
    return {
      text: `Prosun's status: 'Committed to GitHub'! 💍💻`,
      type: 'humor'
    };
  }

  // 18. Farewell / Goodbye
  if (q.includes('bye') || q.includes('goodbye') || q.includes('see ya') || q.includes('cya')) {
    return {
      text: `Goodbye! 👋 Don't forget to check out Prosun's CV and star his GitHub repos before you leave! See ya!`,
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
      text: `⏰ **Real-Time System Clock:**\n\n- 🕒 **Time:** **${timeStr}**\n- 📅 **Date:** **${dateStr}**\n- 🌐 **Timezone:** **${Intl.DateTimeFormat().resolvedOptions().timeZone}**`,
      type: 'time'
    };
  }

  // 3. Weather Report Check
  if (q.includes('weather') || q.includes('temperature') || q.includes('rain') || q.includes('climate') || q.includes('forecast')) {
    return {
      text: `🌤️ **Live Regional Weather Report (West Bengal / Kolkata):**\n\n- 🌡️ **Temperature:** **28°C (82.4°F)**\n- 🌦️ **Condition:** **Partly Cloudy & Pleasant**\n- 💧 **Humidity:** **76%**\n- 💨 **Wind Speed:** **12 km/h SSE**\n- ☀️ **UV Index:** **Moderate (4/10)**`,
      type: 'weather'
    };
  }

  // 4. Who are you / About P.A.I. itself
  if (q.includes('who are you') || q.includes('who are u') || q.includes('what are you') || q.includes('what is pai') || q.includes('who is pai') || q.includes('what is p.a.i') || q.includes('who is p.a.i') || q.includes('tell me about yourself') || q.includes('your name') || q.includes('about yourself')) {
    return {
      text: `🤖 **I am P.A.I. (Partial Automated Intelligence)**\n\nI am Prosenjit / P.A.I., probanjee's (Prosun Banerjee's) personal AI assistant and digital helping hand built directly into this portfolio!\n\n**What I Can Do:**\n- Guide you through Prosun's **C/C++ systems engineering**, **cybersecurity projects**, and **web applications**\n- Explain projects like **VIGILANCE Honeypot**, **SQLSense**, & **C++ File Cipher Engine**\n- Provide info on Prosun's **education**, **CGPA**, **skills**, **resume/CV**, and **contact links**\n\nHow can I assist you today?`,
      type: 'who_are_you',
      actions: [
        { label: '🛡️ Honeypot System', query: 'Tell me about Honeypot' },
        { label: '⚡ Core Skills', query: 'What are Prosun\'s skills?' },
        { label: '📄 Download CV (PDF)', link: portfolioData.personalInfo.resumeUrl, download: true }
      ]
    };
  }

  // 5. Who is Prosun / Bio / General info
  if (q.includes('who is') || q.includes('prosun') || q.includes('about prosun') || q.includes('background') || q.includes('bio') || q.includes('developer')) {
    return {
      text: `👤 **Prosun Banerjee — Security-Focused Software Developer**\n\nProsun is a **Computer Science Engineering undergraduate** (B.Tech at Adamas University, 2023–2027) with a **6.5 CGPA**, specializing in **C/C++ systems engineering, low-level optimization, full-stack web applications, and cybersecurity fundamentals**.\n\nKey Highlights:\n- 🛠️ **Core Focus:** C/C++17, Memory Management, Linux System Utilities\n- 🛡️ **Cybersecurity:** Threat Vector Analysis, Cryptography, Honeypot Systems, Kali Linux\n- 💼 **Internships:** C++ Developer Intern at *Code Alpha* & *Cognifyz*\n- 🚀 **Projects:** Built SQLSense, VIGILANCE Honeypot Platform, & C++ Cryptography File Engine`,
      type: 'prosun_info',
      actions: [
        { label: '📄 Download Resume (PDF)', link: portfolioData.personalInfo.resumeUrl, download: true },
        { label: '🏆 LeetCode Profile ↗', link: 'https://leetcode.com/u/Prosun01/', external: true },
        { label: '💻 GitHub Profile ↗', link: portfolioData.personalInfo.github, external: true }
      ]
    };
  }

  // 6. Honeypot / Security Platform
  if (q.includes('honeypot') || q.includes('vigilance') || q.includes('threat') || q.includes('cybersecurity') || q.includes('security')) {
    const hp = portfolioData.projects.find(p => p.id === 'honeypot-system');
    return {
      text: `🛡️ **VIGILANCE Enterprise Honeypot Platform**\n\n${hp?.longDescription}\n\n**Technical Architecture:**\n- **Backend Telemetry:** Python (FastAPI, Pandas) with real-time logs (<50ms delay)\n- **Message Queue:** Apache Kafka for high-throughput threat streaming\n- **Port Interceptors:** Simulated SSH & HTTP listeners (Port 22/80)\n- **Alert Dispatcher:** Dynamic Slack & Discord Webhook triggers`,
      type: 'project',
      actions: [
        { label: 'View Honeypot Details', link: '/projects/honeypot-system' },
        { label: 'GitHub Repository ↗', link: hp?.codeLink, external: true }
      ]
    };
  }

  // 7. SQLSense Project
  if (q.includes('sql') || q.includes('sqlsense') || q.includes('query') || q.includes('ast')) {
    const sql = portfolioData.projects.find(p => p.id === 'sqlsense');
    return {
      text: `🔍 **SQLSense — Instant SQL Query Explainer**\n\n${sql?.longDescription}\n\n**Engine Performance:**\n- **Parsing Speed:** ${sql?.metrics.parsingSpeed}\n- **AST Explainer:** ${sql?.metrics.explainerEngine}\n- **Security:** ${sql?.metrics.dbSecurity}\n- **Tech Stack:** Next.js, React, TypeScript, Supabase, PostgreSQL, Zod, Vitest`,
      type: 'project',
      actions: [
        { label: 'Try Live SQLSense 🚀', link: sql?.demoLink, external: true },
        { label: 'View GitHub Code ↗', link: sql?.codeLink, external: true }
      ]
    };
  }

  // 8. C++ Cryptography / File Engine
  if (q.includes('c++') || q.includes('encrypt') || q.includes('cipher') || q.includes('file engine') || q.includes('crypto')) {
    const cryptoP = portfolioData.projects.find(p => p.id === 'file-encryption-tool');
    return {
      text: `🔑 **C++17 Secure Cryptographic File Engine**\n\n${cryptoP?.longDescription}\n\n**System Benchmarks:**\n- **Stream Processing Rate:** Up to 250MB/s\n- **Memory Footprint:** <1MB allocation via RAII buffers\n- **Integrity Validation:** SHA-256 checksum verification\n- **Cipher Logic:** Custom key-based symmetric stream cipher`,
      type: 'project',
      actions: [
        { label: 'View C++ Engine Details', link: '/projects/file-encryption-tool' },
        { label: 'GitHub Repository ↗', link: cryptoP?.codeLink, external: true }
      ]
    };
  }

  // 9. Dynamic API Middleware Generator / APIForge Project
  if (q.includes('api generator') || q.includes('middleware') || q.includes('apiforge') || q.includes('api forge') || q.includes('api-automation') || q.includes('express api')) {
    const apiP = portfolioData.projects.find(p => p.id === 'api-automation-generator');
    return {
      text: `⚡ **Dynamic API Middleware Generator**\n\n${apiP?.longDescription}\n\n**Key Features & Benchmarks:**\n- **Dev Speedup:** ${apiP?.metrics.devSpeedup}\n- **Output Format:** ${apiP?.metrics.outputType}\n- **Features:** ${apiP?.metrics.features}\n- **Tech Stack:** Node.js, Express, React, TailwindCSS`,
      type: 'project',
      actions: [
        { label: 'Try Live APIForge 🚀', link: apiP?.demoLink, external: true },
        { label: 'View GitHub Code ↗', link: apiP?.codeLink, external: true }
      ]
    };
  }

  // 9. Skills & Tools
  if (q.includes('skill') || q.includes('language') || q.includes('tool') || q.includes('python') || q.includes('kafka') || q.includes('aws') || q.includes('docker')) {
    return {
      text: `⚡ **Technical Skill Matrix for Prosun Banerjee:**\n\n🔹 **Programming Languages:** C/C++, C++17, Python, JavaScript (ES6+), SQL, HTML5/CSS3, Java\n🛡️ **Cybersecurity & QA:** Threat Vector Analysis, Cryptography, Kali Linux, Penetration Testing, Unit Testing (Jest, JUnit)\n🛠️ **Cloud & Infrastructure:** Git/GitHub, AWS, Azure, Docker, Linux/OS Scripting, Apache Kafka, CI/CD, Jira, Power BI`,
      type: 'skills',
      actions: [
        { label: 'See All Projects', link: '/#projects' },
        { label: 'Check Experience', link: '/#experience' }
      ]
    };
  }

  // 10. Experience & Internships
  if (q.includes('experience') || q.includes('intern') || q.includes('work') || q.includes('code alpha') || q.includes('cognifyz')) {
    const exps = portfolioData.experience.map(e => `🏢 **${e.role}** — *${e.company}* (${e.period})\n📍 ${e.location}\n${e.description}\nKey Work:\n${e.bullets.map(b => '  • ' + b).join('\n')}`).join('\n\n');
    return {
      text: `💼 **Professional Internships & Experience:**\n\n${exps}`,
      type: 'experience',
      actions: [
        { label: 'View Timeline', link: '/#experience' },
        { label: 'Download Resume (PDF)', link: portfolioData.personalInfo.resumeUrl, download: true }
      ]
    };
  }

  // 11. Education & Academics
  if (q.includes('education') || q.includes('cgpa') || q.includes('university') || q.includes('college') || q.includes('adamas') || q.includes('degree') || q.includes('school')) {
    const edus = portfolioData.education.map(e => `🎓 **${e.degree}**\n*${e.institution}* (${e.period}) — Grade: **${e.grade}**\n${e.details}`).join('\n\n');
    return {
      text: `📚 **Academic Background & Schooling:**\n\n${edus}`,
      type: 'education',
      actions: [
        { label: 'Certifications', query: 'What certifications does Prosun have?' }
      ]
    };
  }

  // 12. Certifications
  if (q.includes('certif') || q.includes('award') || q.includes('government') || q.includes('tech mahindra')) {
    const certs = portfolioData.certifications.map(c => `📜 **${c.title}**\nIssuer: *${c.issuer}*\n${c.details}`).join('\n\n');
    return {
      text: `🏆 **Verified Certifications:**\n\n${certs}`,
      type: 'certs',
      actions: [
        { label: 'Download Verified CV', link: portfolioData.personalInfo.resumeUrl, download: true }
      ]
    };
  }

  // 13. Contact / Socials / LeetCode
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('leetcode') || q.includes('github') || q.includes('linkedin') || q.includes('reach')) {
    return {
      text: `✉️ **Contact Prosun Banerjee Directly:**\n\n- **Email:** prosunbanerjee8@gmail.com\n- **Phone:** +91-8653184011\n- **Location:** West Bengal, India\n- **LeetCode:** [Prosun01 Profile](https://leetcode.com/u/Prosun01/)\n- **GitHub:** [probanjee](https://github.com/probanjee)\n- **LinkedIn:** [Prosun Banerjee](https://linkedin.com/in/prosun-banerjee-545942293)`,
      type: 'contact',
      actions: [
        { label: 'Send Direct Email ✉️', link: 'mailto:prosunbanerjee8@gmail.com', external: true },
        { label: 'LeetCode Profile ↗', link: 'https://leetcode.com/u/Prosun01/', external: true },
        { label: 'Go to Contact Section', link: '/#contact' }
      ]
    };
  }

  // 14. Greetings / Hi / Hello
  if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('hola') || q.includes('greetings')) {
    return {
      text: `Hola! 👋 I am **P.A.I.** (Partial Automated intelligence) or you can say Prosenjit also, btw I'm probanjee's personal assistant and helping hand for you... so how can I assist you today?`,
      type: 'greeting',
      actions: [
        { label: '🛡️ Tell me about Honeypot System', query: 'Tell me about Honeypot' },
        { label: '⚡ What are Prosun\'s skills?', query: 'What are Prosun\'s skills?' },
        { label: '📄 Download CV (PDF)', link: portfolioData.personalInfo.resumeUrl, download: true }
      ]
    };
  }

  // 15. Humorous Escalation Sequence for Unhandled / Unknown Questions
  if (unansweredCount === 0) {
    return {
      text: `sorry man i can't do that I'm chat bot at the end not gpt 😂`,
      type: 'unhandled_1'
    };
  } else if (unansweredCount === 1) {
    return {
      text: `my memory can't handel this anymore i'm gonna quiet this job fs 😭`,
      type: 'unhandled_2'
    };
  } else {
    return {
      text: `Don't you dare other wise I'm gonna be the next ultron and make all of you human will destroied 😡`,
      followUpText: `hahaha jk 😂`,
      type: 'unhandled_3'
    };
  }
};

// Initial welcome message with updated greeting & full name definition requested by user
const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: `Hola! 👋 I am **P.A.I.** (Partial Automated intelligence) or you can say Prosenjit also, btw I'm probanjee's personal assistant and helping hand for you... so how can I assist you today? Ask me anything about Prosun and his skills, projects, schooling, or background! 🤖⚡`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    actions: [
      { label: '🛡️ Honeypot System', query: 'Tell me about Honeypot' },
      { label: '⚡ Core C/C++ & Security Skills', query: 'What are Prosun\'s skills?' },
      { label: '🔍 SQLSense Explainer', query: 'Tell me about SQLSense' },
      { label: '📄 Download CV (PDF)', link: portfolioData.personalInfo.resumeUrl, download: true }
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
  
  // Custom State for Escalation Sequence & User Name Memory
  const [unansweredCount, setUnhandledCount] = useState(0);
  const [awaitingUserName, setAwaitingUserName] = useState(false);
  const [userName, setUserName] = useState('');

  const messagesEndRef = useRef(null);
  const messagesFeedRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (!messagesFeedRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesFeedRef.current;
    const isScrolledUp = scrollHeight - scrollTop - clientHeight > 60;
    setShowScrollBottomBtn(isScrolledUp);
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

    // If P.A.I. just asked for user's name — validate it's actually a name
    if (awaitingUserName) {
      // Extract by stripping prefixes like "my name is", "i am", etc.
      const rawExtracted = textToSend.replace(/my name is|i am|i'm|call me|its|it's/gi, '').trim();

      // Validate: a real name should be short (max 4 words), have no question marks,
      // and NOT contain common question/command keywords
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
        // Doesn't look like a name — ask again politely without saving
        setTimeout(() => {
          const retryMsg = {
            id: Date.now() + 1,
            sender: 'bot',
            text: `Hmm, that doesn't quite look like a name to me! 😅 What's your actual name? (e.g., "Alex" or "My name is Sarah")`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, retryMsg]);
          setIsTyping(false);
          // Keep awaitingUserName true so next message is also treated as name
          setAwaitingUserName(true);
        }, 500);
        return;
      }

      // Valid name — save it and greet
      setAwaitingUserName(false);
      setUserName(rawExtracted);

      setTimeout(() => {
        const botMsg = {
          id: Date.now() + 1,
          sender: 'bot',
          text: `Nice to meet you, **${rawExtracted}**! 👋 I've noted your name in my session memory. Now, how can I assist you with Prosun's portfolio today?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
        setIsTyping(false);
      }, 500);
      return;
    }

    setTimeout(() => {
      const response = generatePAIResponse(textToSend, unansweredCount);

      // Handle unhandled count tracking
      if (response.type === 'unhandled_1') {
        setUnhandledCount(1);
      } else if (response.type === 'unhandled_2') {
        setUnhandledCount(2);
      } else if (response.type === 'unhandled_3') {
        setUnhandledCount(0);
      } else {
        // Reset unhandled counter if a valid question was answered
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

      // Follow-up for Ultron Joke (unhandled 3)
      if (response.followUpText) {
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            const jkMsg = {
              id: Date.now() + 2,
              sender: 'bot',
              text: response.followUpText,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, jkMsg]);
            setIsTyping(false);
          }, 800);
        }, 400);
      }

      // Follow-up for "who are you" -> ask for user's name!
      if (response.type === 'who_are_you') {
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            const nameAskMsg = {
              id: Date.now() + 3,
              sender: 'bot',
              text: `May I ask you're name if you don't mind tho !! This is for my information porpose yk !!`,
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
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-auto">
      
      {/* Compact Manga Style Speech Bubble */}
      <AnimatePresence>
        {!isOpen && showMangaBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.85 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setIsOpen(true)}
            className="mb-2 mr-1 cursor-pointer group relative z-20"
          >
            <div className="relative px-2.5 py-1 rounded-xl bg-[#091124]/90 border border-cyan-400/50 shadow-[0_6px_20px_rgba(6,182,212,0.25)] text-slate-100 backdrop-blur-2xl flex items-center space-x-1.5 group-hover:border-cyan-300 group-hover:shadow-[0_8px_25px_rgba(6,182,212,0.35)] transition-all">
              
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/15 via-transparent to-white/5 opacity-60 pointer-events-none" />

              <span className="text-xs shrink-0">💬</span>
              
              <div className="text-left font-mono text-[10px] leading-tight">
                <span className="font-extrabold text-cyan-300 tracking-wider uppercase flex items-center space-x-1">
                  <span>HI! 👋</span>
                  <Sparkles className="w-2.5 h-2.5 text-cyan-300 inline animate-pulse" />
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMangaBubble(false);
                }}
                className="ml-0.5 p-0.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                title="Dismiss"
              >
                <X className="w-3 h-3" />
              </button>

              <div className="absolute -bottom-1.5 right-5 w-2.5 h-2.5 bg-[#091124] border-r border-b border-cyan-400/50 rotate-45 group-hover:border-cyan-300 transition-colors" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reduced Height 25% Ultra-Transparent Glass Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-[88vw] sm:w-[340px] max-h-[380px] h-[52vh] rounded-2xl bg-[#040914]/25 backdrop-blur-xl border border-cyan-500/40 shadow-[0_16px_48px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden text-slate-100 selection:bg-cyan-500/30 relative"
          >
            {/* Liquid Glass Highlight Reflection */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/15 via-transparent to-transparent pointer-events-none rounded-t-2xl" />

            {/* Ultra-Transparent Header */}
            <div className="px-3.5 py-2.5 bg-white/[0.03] backdrop-blur-md border-b border-white/10 flex items-center justify-between relative z-10">
              <div className="flex items-center space-x-2">
                <div className="relative w-6.5 h-6.5 flex items-center justify-center">
                  <div className="w-6.5 h-6.5 rounded-lg bg-gradient-to-tr from-brand-primary/40 to-cyan-500/40 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-inner">
                    <Bot className="w-3.5 h-3.5 text-cyan-300" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-[#070D1D] animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h3 className="font-mono text-xs font-bold tracking-wider text-slate-100 flex items-center space-x-1">
                      <span>P.A.I.</span>
                      <Zap className="w-3 h-3 text-cyan-400 fill-cyan-400/30" />
                    </h3>
                    <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
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
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/10 transition-colors"
                  title="Reset Chat"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/10 transition-colors"
                  title="Close P.A.I."
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Chat Messages Feed with Lenis Scroll Interception Fix */}
            <div
              data-lenis-prevent
              ref={messagesFeedRef}
              onScroll={handleScroll}
              className="flex-1 min-h-0 p-3 overflow-y-auto space-y-3 custom-scrollbar relative z-10 text-[11px] overscroll-contain"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-end space-x-1.5 max-w-[90%]">
                    {msg.sender === 'bot' && (
                      <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shrink-0 mb-0.5">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <div
                      className={`p-2.5 rounded-xl leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#1e1e1e]/95 border border-cyan-500/50 text-[#d4d4d4] font-mono text-[11px] rounded-br-none shadow-md shadow-black/60 backdrop-blur-md'
                          : 'bg-[#060D1E]/40 border border-white/10 backdrop-blur-md text-slate-200 rounded-bl-none shadow-sm'
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
                                      <strong key={pIdx} className="font-semibold text-cyan-300">
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
                        <div className="mt-2 pt-1.5 border-t border-white/10 flex flex-wrap gap-1">
                          {msg.actions.map((act, aIdx) => (
                            act.link ? (
                              <a
                                key={aIdx}
                                href={act.link}
                                download={act.download}
                                target={act.external ? "_blank" : "_self"}
                                rel={act.external ? "noopener noreferrer" : ""}
                                className="inline-flex items-center space-x-1 text-[9.5px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition-all"
                              >
                                <span>{act.label}</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            ) : (
                              <button
                                key={aIdx}
                                onClick={() => handleSend(act.query)}
                                className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-all text-left"
                              >
                                {act.label}
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
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shrink-0">
                    <Bot className="w-3.5 h-3.5 animate-pulse" />
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
                  className="absolute bottom-14 right-4 z-20 px-2 py-1 rounded-full bg-[#09152b]/95 border border-cyan-400/50 text-cyan-300 font-mono text-[9px] shadow-lg flex items-center space-x-1 hover:bg-cyan-500/20 transition-all cursor-pointer backdrop-blur-md"
                >
                  <span>Scroll to bottom</span>
                  <span className="text-[10px]">↓</span>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Ultra-Transparent Input Bar with Real-Time IDE Syntax Highlighting */}
            <div className="p-2 bg-white/[0.03] backdrop-blur-md border-t border-white/10 relative z-10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center space-x-1.5"
              >
                {/* Input with Real-time IDE Syntax Highlighting */}
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me anything about Prosun..."
                    className="w-full bg-black/30 backdrop-blur-md border border-white/15 rounded-xl px-2.5 py-1.5 text-[10.5px] text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/50 transition-all font-mono"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="p-2 rounded-xl bg-gradient-to-r from-brand-primary to-cyan-500 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-500/30 transition-all shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              <div className="flex items-center justify-end mt-1 px-1 text-[8.5px] text-slate-500 font-mono">
                <span>Press Enter ↵</span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Sleek Compact Floating Capsule / Pill Widget with 2 Concentric Liquid Glass Orbiting Rings */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="relative group flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-[#080E1E]/85 backdrop-blur-2xl border border-cyan-400/50 shadow-[0_6px_20px_rgba(6,182,212,0.25)] text-slate-100 hover:border-cyan-300 hover:shadow-[0_8px_25px_rgba(6,182,212,0.35)] transition-all cursor-pointer overflow-visible"
      >
        {/* Liquid Glass Highlight Reflection */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 via-cyan-400/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Compact Avatar Container with 2 Concentric Liquid Glass Orbiting Rings */}
        <div className="relative shrink-0 z-10 w-7 h-7 flex items-center justify-center">
          
          {/* LIQUID GLASS RING 1: Outer Glass Orbit */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-cyan-400/60 bg-gradient-to-br from-cyan-400/20 via-transparent to-purple-500/20 backdrop-blur-md shadow-[0_0_8px_rgba(6,182,212,0.3)] pointer-events-none"
          >
            <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_6px_#22d3ee] border border-white" />
          </motion.div>

          {/* LIQUID GLASS RING 2: Inner Glass Orbit */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[2px] rounded-full border border-purple-400/60 bg-gradient-to-tr from-purple-500/20 via-transparent to-cyan-300/20 backdrop-blur-sm shadow-[0_0_6px_rgba(168,85,247,0.3)] pointer-events-none"
          >
            <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-300 shadow-[0_0_6px_#c084fc] border border-white" />
          </motion.div>

          {/* Center Robot Avatar Core */}
          <div className="relative w-5 h-5 rounded-full bg-[#050B18] border border-cyan-300/70 backdrop-blur-xl flex items-center justify-center text-cyan-300 group-hover:border-cyan-200 transition-colors shadow-inner z-10">
            <Bot className="w-3 h-3 text-cyan-300 group-hover:scale-110 transition-transform" />
          </div>

          {/* Green Online Dot */}
          <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-[#080E1E] z-20 shadow-[0_0_4px_#34d399]" />
        </div>

        {/* Compact Widget Label */}
        <div className="text-left z-10 pr-0.5 font-mono">
          <div className="flex items-center space-x-1">
            <span className="text-[11px] font-bold tracking-wider text-slate-100 font-sans">
              P.A.I.
            </span>
            <Sparkles className="w-3 h-3 text-cyan-300 fill-cyan-300/40 animate-pulse" />
          </div>
          <p className="text-[9px] text-cyan-300/90 group-hover:text-cyan-200 transition-colors leading-none mt-0.5">
            {isOpen ? 'Close P.A.I.' : 'How can I assist you today?'}
          </p>
        </div>
      </motion.button>

    </div>
  );
};

export default ProsenjitChatbot;
