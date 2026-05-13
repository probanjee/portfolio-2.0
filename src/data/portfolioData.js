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
    website: "https://probanjee.github.io",
    resumeUrl: "/assets/Prosun_Banerjee_CV.pdf",
    avatarUrl: "/assets/avatar.png"
  },
  
  about: {
    title: "Junior Software Developer & Security-Focused Builder",
    subtitle: "Combining computer science fundamentals, C/C++ problem solving, full-stack learning, and cybersecurity fundamentals to build practical software projects.",
    description: `Undergraduate Computer Science Engineering student with real-world experience in full-stack application engineering, secure system design, and software development. Skilled at creating scalable, high-performance solutions focused on clean architecture, data security, and efficient API design. Strong foundation in algorithmic problem-solving and object-oriented programming, with hands-on exposure to cybersecurity concepts and real-world project development.`,
    metrics: [
      { label: "Projects Built", value: "4" },
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
      codeLink: "https://github.com/probanjee/vigilance-honeypot",
      demoLink: "#"
    },
    {
      id: "file-encryption-tool",
      title: "Secure Cryptographic File Engine",
      category: "Low-Level Cryptography",
      shortDescription: "A key-based high-performance file encryption and decryption tool built in pure C.",
      longDescription: "Created a robust cryptography application that processes binary and text files using customizable key-based stream cipher algorithms. Optimized for file buffer streaming to allow low-overhead encryption of large multi-gigabyte files with integrity validation.",
      icon: "FileKey",
      tags: ["C", "Cryptography", "Algorithms", "Binary Processing", "Buffer Management"],
      metrics: {
        speed: "Up to 150MB/s stream rate",
        overhead: "<1MB memory allocation",
        encryptionType: "Key-based stream cipher"
      },
      codeLink: "https://github.com/probanjee/c-cryptography",
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
      codeLink: "https://github.com/probanjee/python-fitness",
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
      codeLink: "https://github.com/probanjee/dynamic-api-gen",
      demoLink: "#"
    }
  ],

  skills: {
    languages: [
      { name: "C/C++", level: "Advanced" },
      { name: "Python", level: "Advanced" },
      { name: "JavaScript (ES6+)", level: "Intermediate" },
      { name: "HTML5/CSS3", level: "Advanced" },
      { name: "SQL", level: "Intermediate" }
    ],
    security: [
      { name: "Cybersecurity Fundamentals", level: "Advanced" },
      { name: "Penetration Testing", level: "Intermediate" },
      { name: "Threat Vector Analysis", level: "Advanced" },
      { name: "Cryptography & Encodings", level: "Intermediate" },
      { name: "Kali Linux / Security Tools", level: "Advanced" }
    ],
    toolsAndSystems: [
      { name: "GitHub / Git", level: "Advanced" },
      { name: "AWS Services", level: "Intermediate" },
      { name: "Power BI Data Models", level: "Intermediate" },
      { name: "Linux / OS Scripting", level: "Advanced" },
      { name: "Apache Kafka Pipelines", level: "Intermediate" }
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
