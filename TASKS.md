# TASKS.md — AI Security Startup × Premium Developer Portfolio

## Main Instruction

Read `PRD.md` first before writing or changing any code.

Build the project in phases. Do not generate the whole project randomly in one shot. Follow the phases below in order.

Project identity:

**AI Security Startup × Premium Developer Portfolio**

The website must feel like:
- a premium AI security startup interface
- an Awwwards-level developer portfolio
- a cinematic software experience
- a luxury SaaS landing page
- a cybersecurity engineering dashboard

Use the existing files inside `/inspiration` as reference:
- `web.html`
- `Prosun_Banerjee_CV.pdf`
- reference video
- avatar asset

Use the real CV PDF for download. Do not generate PDF dynamically.

---

# Phase 1 — Project Foundation

## Goal

Create the complete base architecture only.

## Tasks

- Set up React + Vite
- Set up Tailwind CSS
- Set up Framer Motion
- Set up React Router DOM
- Set up Lenis smooth scrolling
- Set up Lucide React icons
- Create clean folder structure
- Create global CSS design tokens
- Create theme system
- Create reusable layout wrapper
- Create route structure
- Create data-driven portfolio content file
- Add asset paths for:
  - `/assets/Prosun_Banerjee_CV.pdf`
  - `/assets/avatar.png`

## Required Files

```txt
portfolio/
├── package.json
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── assets/
│       ├── Prosun_Banerjee_CV.pdf
│       └── avatar.png
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── portfolioData.js
    ├── hooks/
    │   ├── useMousePosition.js
    │   ├── useScrollSpy.js
    │   └── useTheme.js
    ├── components/
    │   ├── background/
    │   ├── loader/
    │   ├── navigation/
    │   ├── sections/
    │   ├── projects/
    │   └── ui/
    └── pages/