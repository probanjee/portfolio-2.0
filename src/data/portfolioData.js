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
    leetcode: "https://leetcode.com/u/Prosun01/",
    instagram: "", // Add your Instagram profile URL here when ready
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
      ],
      certificates: [
        {
          label: "Internship Completion Certificate",
          date: "Feb 2, 2026",
          credentialId: "CA/DF1/3486",
          imageUrl: "/assets/certificates/codealpha-internship-certificate.jpg"
        }
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
      ],
      certificates: [
        {
          label: "Internship Completion Certificate",
          date: "Feb 17, 2025",
          credentialId: "CTI/A1/C88676",
          imageUrl: "/assets/certificates/cognifyz-internship-certificate.jpg"
        }
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
        alerts: "Slack & Discord Webhooks",
        nodes: "3 Live Active Nodes"
      },
      codeLink: "https://github.com/probanjee/Honeypot-System",
      demoLink: "https://vigilance-soc-radar.vercel.app/",
      liveDeployments: [
        {
          id: "nowhere",
          title: "Nowhere Esports Portal",
          subtitle: "Public Honeypot Decoy Hub",
          role: "Decoy Node 01",
          url: "https://owhere-esports-portal.vercel.app/",
          description: "Simulated public competitive esports organization intranet acting as exposed bait to attract early reconnaissance probes.",
          badge: "PUBLIC DECOY",
          status: "LIVE"
        },
        {
          id: "admin-nowhere",
          title: "Admin Nowhere Console",
          subtitle: "Privileged Target Interceptor",
          role: "Decoy Node 02",
          url: "https://honeypot-system-rho.vercel.app/",
          description: "High-interaction administrative command deck capturing credential stuffing, authentication abuse, and session exploits.",
          badge: "ADMIN TRAP",
          status: "LIVE"
        },
        {
          id: "radar",
          title: "Vigilance SOC Radar",
          subtitle: "Central Threat Monitoring Center",
          role: "SOC Monitor 03",
          url: "https://vigilance-soc-radar.vercel.app/",
          description: "Real-time Security Operations Center dashboard visualizing attack vectors, geographical origins, Kafka logs, and threat scoring.",
          badge: "SOC RADAR",
          status: "LIVE"
        }
      ]
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
      demoLink: "https://heuristic-workout-app-seven.vercel.app/"
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
      demoLink: "https://apiforge-ivory.vercel.app/"
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
      title: "Gen AI Tools — Gold Assessment & Scorecard",
      issuer: "FutureSkills Prime · MeitY & Nasscom",
      category: "AI & Cloud",
      date: "Sep 2026",
      credentialId: "FSP/2026/9/10375889",
      imageUrl: "/assets/certificates/nasscom-gen-ai-tools-gold.jpg",
      previewImages: [
        {
          label: "Gold Assessment Certificate",
          imageUrl: "/assets/certificates/nasscom-gen-ai-tools-gold.jpg",
          date: "Sep 2026",
          credentialId: "FSP/2026/9/10375889"
        },
        {
          label: "Detailed Scorecard (93 / 100 · 93%)",
          imageUrl: "/assets/certificates/nasscom-gen-ai-tools-scorecard.jpg",
          date: "Sep 2026",
          credentialId: "FSP/2026/9/10375889"
        }
      ],
      details: "Cleared the Gen AI Tools competency assessment in the Gold category (70%+) with an overall score of 93/100 (93.00%) across modules M001–M004."
    },
    {
      title: "Gen AI Tools",
      issuer: "FutureSkills Prime · MeitY & Nasscom",
      category: "AI & Cloud",
      date: "Sep 2026",
      credentialId: "26030931057",
      imageUrl: "/assets/certificates/nasscom-gen-ai-tools.jpg",
      details: "Completed coursework aligned to competency standards developed by IT-ITeS Sector Skills Council Nasscom in collaboration with Industry and Government."
    },
    {
      title: "Solutions Architecture Job Simulation",
      issuer: "AWS · Forage",
      category: "AI & Cloud",
      date: "Oct 2025",
      credentialId: "4kXvkuoz8Qi4Lp5Q6",
      imageUrl: "/assets/certificates/aws-forage-solutions-architecture.png",
      details: "Completed practical architecture tasks designing a simple, scalable cloud hosting infrastructure."
    },
    {
      title: "Introduction to Generative AI",
      issuer: "Google Cloud",
      category: "AI & Cloud",
      imageUrl: "/assets/certificates/google-cloud-gen-ai.jpg",
      details: "Completion badge covering foundational Generative AI concepts, model types, and enterprise applications."
    },
    {
      title: "Introduction to Large Language Models",
      issuer: "Google Cloud",
      category: "AI & Cloud",
      imageUrl: "/assets/certificates/google-cloud-llms.jpg",
      details: "Completion badge covering LLM capabilities, prompt design fundamentals, and tuning workflows."
    },
    {
      title: "Introduction to Responsible AI",
      issuer: "Google Cloud",
      category: "AI & Cloud",
      imageUrl: "/assets/certificates/google-cloud-responsible-ai.jpg",
      details: "Completion badge focused on ethical AI principles, safety practices, and responsible deployment."
    },
    {
      title: "AWS Free Certification Course",
      issuer: "Intellipaat Academy",
      category: "AI & Cloud",
      date: "Jul 2024",
      credentialId: "31679-1654-188827",
      imageUrl: "/assets/certificates/intellipaat-aws-course.jpg",
      details: "Completed structured AWS cloud architecture and core services training."
    },
    {
      title: "AIML Webinar",
      issuer: "G.T.L Academy · Grindx Technologies",
      category: "AI & Cloud",
      imageUrl: "/assets/certificates/gtl-aiml-webinar.jpg",
      details: "Participated in applied AI & Machine Learning session covering neural networks and heuristic pipelines."
    },
    {
      title: "Cybersecurity (Skill India Digital Hub)",
      issuer: "Tech Mahindra Foundation · NSDC",
      category: "Cybersecurity & IP",
      date: "May 2024",
      imageUrl: "/assets/certificates/tech-mahindra-skill-india-cybersecurity.jpg",
      details: "Completed 10-hour online skilling course in Cybersecurity offered by Tech Mahindra Foundation through Skill India Digital Hub."
    },
    {
      title: "Introduction to Information Security",
      issuer: "Great Learning Academy",
      category: "Cybersecurity & IP",
      date: "Jul 2024",
      imageUrl: "/assets/certificates/great-learning-info-security.jpg",
      details: "Completed online coursework covering security policy management, vulnerability mitigation, and threat fundamentals."
    },
    {
      title: "Cyber Security Internship Completion",
      issuer: "Academor · Flutura",
      category: "Cybersecurity & IP",
      date: "May 2024",
      credentialId: "ACM23-5379",
      imageUrl: "/assets/certificates/academor-flutura-cybersecurity.jpg",
      details: "Completed 2-month Cyber Security program with Academor from Feb 2024 to Mar 2024."
    },
    {
      title: "National IP Awareness Mission (NIPAM)",
      issuer: "Govt. of India · Intellectual Property Office",
      category: "Cybersecurity & IP",
      date: "Sep 2024",
      imageUrl: "/assets/certificates/nipam-ip-awareness.jpg",
      details: "Participated in IP Awareness/Training program under the National Intellectual Property Awareness Mission."
    },
    {
      title: "Introduction to C++",
      issuer: "Simplilearn SkillUP",
      category: "Programming & Data",
      date: "Aug 2024",
      credentialId: "7074419",
      imageUrl: "/assets/certificates/simplilearn-intro-cpp.jpg",
      details: "Completed online C++ fundamentals coursework covering core syntax, object-oriented constructs, and standard libraries."
    },
    {
      title: "C for Beginners",
      issuer: "Great Learning Academy",
      category: "Programming & Data",
      date: "May 2024",
      imageUrl: "/assets/certificates/great-learning-c-beginners.jpg",
      details: "Completed foundational C programming coursework covering control structures, pointers, and memory basics."
    },
    {
      title: "Data Visualization With Power BI",
      issuer: "Great Learning Academy",
      category: "Programming & Data",
      date: "Jul 2024",
      imageUrl: "/assets/certificates/great-learning-power-bi.jpg",
      details: "Completed Power BI training focused on interactive dashboards, data modeling, and analytical reporting."
    }
  ]
};
