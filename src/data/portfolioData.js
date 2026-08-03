export const portfolioData = {
  personalInfo: {
    name: "Prosun Banerjee",
    titles: [
      "Junior Software Developer",
      "C/C++ Enthusiast",
      "Cybersecurity Enthusiast",
      "Full-Stack Development Learner",
      "Problem Solver"
    ],
    tagline: "Building secure, scalable software projects with a focus on C/C++, full-stack development, API systems, and cybersecurity fundamentals.",
    email: "prosunbanerjee8@gmail.com",
    phone: "+91-8653184011",
    location: "West Bengal, India",
    github: "https://github.com/probanjee",
    linkedin: "https://linkedin.com/in/prosun-banerjee-545942293",
    website: "https://probanjee.vercel.app/",
    resumeUrl: "/assets/Prosun_Banerjee_CV.pdf",
    avatarUrl: "/assets/avatar.png"
  },

  about: {
    title: "Junior Software Developer & Security-Focused Builder",
    subtitle: "Combining computer science fundamentals, C/C++ problem solving, full-stack learning, and cybersecurity fundamentals to build practical software projects.",
    description: "Computer Science Engineering undergraduate specializing in software development and backend engineering. Passionate about designing scalable, secure, and maintainable applications with a strong emphasis on clean architecture and efficient system design. Possesses a solid foundation in software engineering principles, problem-solving, database management, and modern development practices, with a commitment to building reliable, high-performance, and production-ready software solutions.",
    metrics: [
      { label: "Projects Built", value: "5" },
      { label: "Internships Completed", value: "2" },
      { label: "CGPA", value: "6.5" },
      { label: "C/C++ Core Focus", value: "Focus" }
    ]
  },

  experience: [
    {
      role: "C++ Programming Intern",
      company: "Code Alpha",
      location: "West Bengal, India",
      period: "01/2026 - 03/2026",
      description: "Architected custom high-performance console applications in C++. Spearheaded performance-oriented code refactoring, adhering to robust object-oriented programming (OOP) principles, and streamlined code modularity.",
      bullets: [
        "Built modular logic systems and efficient data structures inside CLI interfaces.",
        "Strengthened memory management workflows and localized algorithmic troubleshooting in C++.",
        "Refined testing and structural architecture for enterprise-style application models."
      ]
    },
    {
      role: "C/C++ Programming Intern",
      company: "Cognifyz",
      location: "West Bengal, India",
      period: "01/2025 - 02/2025",
      description: "Focused on logic development and low-level optimization algorithms. Created efficient mathematical engines and foundational system utilities.",
      bullets: [
        "Implemented high-speed sorting and search logic tailored for system processing constraints.",
        "Identified and mitigated memory leaks and logical runtime errors.",
        "Collaborated on documentation of modular system architectures for improved code reusability."
      ]
    }
  ],

  projects: [
    {
      id: "sqlsense",
      title: "SQLSense — Understand SQL Instantly",
      category: "Developer Tool & Analytics",
      shortDescription: "A modern SQL query explanation platform that converts complex SQL statements into clear human-readable breakdowns.",
      longDescription: "Designed and engineered a full-stack developer tool that parses SQL syntax, analyzes query complexity, and provides clause-by-clause visual explanations. Features optimization recommendations, secure user authentication, query history tracking, and a highly responsive Neo-Brutalist UI.",
      icon: "Database",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Zod", "Vitest"],
      metrics: {
        parsingSpeed: "<15ms syntax parse",
        explainerEngine: "Clause-by-Clause AST",
        dbSecurity: "Row-Level Security (RLS)",
        hosting: "Vercel / Supabase"
      },
      codeLink: "https://github.com/probanjee/SQLSense-UNDERSTAND-SQL-INSTANTLY",
      demoLink: "https://sql-sense-understand-sql-instantly-three.vercel.app/"
    },
    {
      id: "honeypot-system",
      title: "VIGILANCE Enterprise Honeypot Platform",
      category: "Cybersecurity & Data Pipelines",
      shortDescription: "Distributed enterprise threat monitoring platform that intercepts, records, and classifies threat actors in real time.",
      longDescription: "Architected a dual-honeypot deployment mimicking simulated vulnerable endpoints. Integrated custom real-time telemetry using Python (FastAPI/Pandas), Apache Kafka message queues, and a responsive React analytics dashboard to display security logs, detect patterns, and trigger dynamic discord/slack alerts for threat mitigation.",
      icon: "ShieldAlert",
      tags: ["Python", "FastAPI", "Apache Kafka", "React", "Pandas", "TailwindCSS"],
      metrics: {
        telemetry: "Real-time, <50ms delay",
        interceptors: "SSH & HTTP (Port 22/80)",
        alerts: "Slack & Discord Webhooks"
      },
      codeLink: "https://github.com/probanjee/Honeypot-System",
      demoLink: "#"
    },
    {
      id: "file-encryption-tool",
      title: "Secure Cryptographic File Engine",
      category: "C++ Systems & Cryptography",
      shortDescription: "A high-performance file encryption and decryption engine built in modern C++ featuring custom stream ciphers and buffer streaming.",
      longDescription: "Engineered a robust low-level C++ cryptography system that processes binary and text files using key-based stream cipher algorithms and RAII memory buffer streaming. Supports fast symmetrical encryption and decryption with SHA-256 integrity validation for multi-gigabyte files.",
      icon: "FileKey",
      tags: ["C++", "C++17", "Cryptography", "Encryption & Decryption", "Stream Cipher", "Binary Processing", "Buffer Management"],
      metrics: {
        speed: "Up to 250MB/s stream rate",
        overhead: "<1MB memory allocation",
        engine: "C++ Key-based stream cipher"
      },
      codeLink: "https://github.com/probanjee/File-Encryption-Tool",
      demoLink: "#"
    },
    {
      id: "workout-planning-app",
      title: "Heuristic Adaptive Workout App",
      category: "Intelligent Automation",
      shortDescription: "A customized fitness routine generator featuring system notifications and schedule adaptions.",
      longDescription: "Designed an intelligent, lightweight scheduler utilizing a rule-based algorithm that determines physical workload targets. Delivers automatic background OS desktop notifications and dynamic routine rescheduling options to optimize fitness adherence.",
      icon: "Activity",
      tags: ["Python", "Automation", "Heuristics", "OS Notifications", "JSON DB"],
      metrics: {
        retentionRate: "+45% user routine compliance",
        processingTime: "<10ms plan generation",
        notificationModel: "Win10toast Background Engine"
      },
      codeLink: "https://github.com/probanjee/Heuristic-Workout-App",
      demoLink: "#"
    },
    {
      id: "api-automation-generator",
      title: "Dynamic API Middleware Generator",
      category: "Full-Stack Automation",
      shortDescription: "An automated full-stack tooling application that dynamically generates API endpoints from schemas.",
      longDescription: "Created a developer productivity web tool that takes JSON schema representations and automatically scaffolds Node.js/Express controllers, routing models, and query handlers, generating zip packages for direct server injection.",
      icon: "CodeXml",
      tags: ["JavaScript", "Node.js", "Express", "API Automation", "React", "TailwindCSS"],
      metrics: {
        devSpeedup: "Reduces basic API setup by 80%",
        outputType: "Clean modular JS (ESM)",
        features: "Automatic CRUD mapping"
      },
      codeLink: "https://github.com/probanjee/Dynamic-API-Genarator",
      demoLink: "#"
    }
  ],

  skills: {
    languages: [
      { name: "C/C++", level: "Advanced" },
      { name: "Python", level: "Advanced" },
      { name: "JavaScript (ES6+)", level: "Intermediate" },
      { name: "HTML5/CSS3", level: "Advanced" },
      { name: "SQL", level: "Intermediate" },
      { name: "C", level: "Advanced" },
      { name: "C++17", level: "Advanced" },
      { name: "Java", level: "Intermediate" },
      { name: "HTML5", level: "Advanced" },
      { name: "CSS3", level: "Advanced" }
    ],
    security: [
      { name: "Cybersecurity Fundamentals", level: "Advanced" },
      { name: "Penetration Testing", level: "Intermediate" },
      { name: "Threat Vector Analysis", level: "Advanced" },
      { name: "Cryptography & Encodings", level: "Intermediate" },
      { name: "Kali Linux / Security Tools", level: "Advanced" },
      { name: "Unit Testing", level: "Intermediate" },
      { name: "Jest", level: "Intermediate" },
      { name: "JUnit", level: "Intermediate" }
    ],
    toolsAndSystems: [
      { name: "GitHub / Git", level: "Advanced" },
      { name: "AWS Services", level: "Intermediate" },
      { name: "Power BI Data Models", level: "Intermediate" },
      { name: "Linux / OS Scripting", level: "Advanced" },
      { name: "Apache Kafka Pipelines", level: "Intermediate" },
      { name: "AWS", level: "Intermediate" },
      { name: "Microsoft Azure", level: "Intermediate" },
      { name: "Docker", level: "Intermediate" },
      { name: "Jira", level: "Intermediate" },
      { name: "CI/CD", level: "Intermediate" }
    ]
  },

  education: [
    {
      degree: "B.Tech in Computer Science Engineering",
      institution: "Adamas University",
      period: "2023 - 2027",
      grade: "6.5 CGPA",
      details: "In-depth study of Data Structures & Algorithms, Object-Oriented Design, Cryptography, Database Management Systems, and Web Architectures."
    },
    {
      degree: "Higher Secondary (Class XII)",
      institution: "UKBI",
      period: "2022 - 2023",
      grade: "61.9%",
      details: "Focus on Physics, Chemistry, and Advanced Mathematics."
    },
    {
      degree: "Secondary (Class X)",
      institution: "UKBI",
      period: "2020 - 2021",
      grade: "86.5%",
      details: "Foundational science and programming studies."
    }
  ],

  certifications: [
    {
      title: "National IP Awareness Mission Certification",
      issuer: "Govt. of India",
      details: "Trained in Intellectual Property rights, copyright law, and research-focused software protections."
    },
    {
      title: "Cyber Security Fundamentals",
      issuer: "Great Learning / Tech Mahindra",
      details: "Comprehensive training in security policy management, vulnerability mitigation, threat modeling, and network firewalls."
    },
    {
      title: "AI & Machine Learning Engineering Webinar",
      issuer: "G.T.L Academy (Hosted by Grindx Technologies)",
      details: "Focused on neural network integration, AI API structures, and automated heuristic models."
    }
  ]
};
