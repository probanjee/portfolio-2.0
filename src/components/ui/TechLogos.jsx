import React from 'react';

/**
 * High-fidelity, authentic tech stack logos and branded badges
 * Crafted with official brand vectors and colors.
 */

// 1. C++ Official Logo
export const CppLogo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <rect width="32" height="32" rx="8" fill="url(#cpp-grad)" />
    <path d="M16 4.5L26 10.3V21.7L16 27.5L6 21.7V10.3L16 4.5Z" fill="#00599C" stroke="#659AD2" strokeWidth="0.8" />
    <path d="M13.5 12.5C12.1 12.5 11 13.6 11 15C11 16.4 12.1 17.5 13.5 17.5C14.4 17.5 15.2 17 15.6 16.3L17.4 17.3C16.6 18.7 15.2 19.5 13.5 19.5C11 19.5 9 17.5 9 15C9 12.5 11 10.5 13.5 10.5C15.2 10.5 16.6 11.3 17.4 12.7L15.6 13.7C15.2 13 14.4 12.5 13.5 12.5Z" fill="#FFFFFF" />
    <path d="M19 14.2H20.2V13H21.4V14.2H22.6V15.4H21.4V16.6H20.2V15.4H19V14.2Z" fill="#004482" />
    <path d="M19 14.2H20.2V13H21.4V14.2H22.6V15.4H21.4V16.6H20.2V15.4H19V14.2Z" fill="#659AD2" />
    <path d="M22.8 14.2H24V13H25.2V14.2H26.4V15.4H25.2V16.6H24V15.4H22.8V14.2Z" fill="#659AD2" />
    <defs>
      <linearGradient id="cpp-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#004482" />
        <stop offset="1" stopColor="#002D56" />
      </linearGradient>
    </defs>
  </svg>
);

// 2. C Language Official Logo
export const CLogo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <rect width="32" height="32" rx="8" fill="url(#c-grad)" />
    <path d="M16 4.5L26 10.3V21.7L16 27.5L6 21.7V10.3L16 4.5Z" fill="#283593" stroke="#5C6BC0" strokeWidth="0.8" />
    <path d="M17 11.5C14.5 11.5 12.5 13.5 12.5 16C12.5 18.5 14.5 20.5 17 20.5C18.8 20.5 20.3 19.5 21.1 18.1L19.2 17C18.7 17.9 17.9 18.5 17 18.5C15.6 18.5 14.5 17.4 14.5 16C14.5 14.6 15.6 13.5 17 13.5C17.9 13.5 18.7 14.1 19.2 15L21.1 13.9C20.3 12.5 18.8 11.5 17 11.5Z" fill="#FFFFFF" />
    <defs>
      <linearGradient id="c-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1A237E" />
        <stop offset="1" stopColor="#0D1342" />
      </linearGradient>
    </defs>
  </svg>
);

// 3. Python Official Logo
export const PythonLogo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <path d="M15.9 4C11.5 4 11.8 5.9 11.8 5.9L11.8 7.9H16.1V8.5H10.1C8.2 8.5 6.6 9.6 6.6 12C6.6 14.5 7.8 15.5 9.7 15.5H11V14.1C11 12.4 12.4 11 14.1 11H18.4C19.7 11 20.8 9.9 20.8 8.6V6.3C20.8 5 19.7 4 18.4 4H15.9ZM13.7 5.6C14.3 5.6 14.7 6 14.7 6.6C14.7 7.2 14.3 7.6 13.7 7.6C13.1 7.6 12.7 7.2 12.7 6.6C12.7 6 13.1 5.6 13.7 5.6Z" fill="#387EB8" />
    <path d="M16.1 28C20.5 28 20.2 26.1 20.2 26.1L20.2 24.1H15.9V23.5H21.9C23.8 23.5 25.4 22.4 25.4 20C25.4 17.5 24.2 16.5 22.3 16.5H21V17.9C21 19.6 19.6 21 17.9 21H13.6C12.3 21 11.2 22.1 11.2 23.4V25.7C11.2 27 12.3 28 13.6 28H16.1ZM18.3 26.4C17.7 26.4 17.3 26 17.3 25.4C17.3 24.8 17.7 24.4 18.3 24.4C18.9 24.4 19.3 24.8 19.3 25.4C19.3 26 18.9 26.4 18.3 26.4Z" fill="#FFE052" />
  </svg>
);

// 4. Java Official Logo
export const JavaLogo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <path d="M13.8 24.5C13.8 24.5 11.5 25.1 14.3 25.6C17.7 26.2 20.2 26.1 22.8 24.6C22.8 24.6 22 25.4 20.5 25.8C16.8 26.9 12.3 26.6 10.3 25C8.8 23.9 10 23.1 11.5 22.7C13.2 22.3 14.8 22.6 14.8 22.6C13.3 23.1 12.4 23.8 13.8 24.5Z" fill="#EA2D2E" />
    <path d="M12.9 20.5C12.9 20.5 10.1 21.3 13.4 22C17.3 22.7 20.6 22.7 24.2 20.8C24.2 20.8 23.2 21.7 21.6 22.1C17.5 23.2 11.7 23.2 9.2 21.1C7.7 19.9 9.3 18.8 11.3 18.3C13.4 17.9 15.4 18.3 15.4 18.3C13 18.9 11.6 19.7 12.9 20.5Z" fill="#5382A1" />
    <path d="M19.1 15.4C20.6 16.9 18.6 18.5 18.6 18.5C21.8 16.9 20.1 14.6 17.8 13.4C15.9 12.4 16.5 10.5 16.5 10.5C16.5 10.5 15.6 12 16.8 13.3C18.3 14.9 17.4 16 16.2 16.8C15 17.6 14.1 18.5 14.1 18.5C15.3 17.6 17.5 17 19.1 15.4Z" fill="#EA2D2E" />
  </svg>
);

// 5. JavaScript Official Logo
export const JavaScriptLogo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <rect width="32" height="32" rx="6" fill="#F7DF1E" />
    <path d="M16.5 22.8C17.3 24.1 18.5 24.9 20.2 24.9C21.7 24.9 22.7 24.1 22.7 23C22.7 21.8 21.9 21.3 20.1 20.5L19.2 20.1C16.6 19 14.9 17.6 14.9 14.7C14.9 11.9 17.1 9.8 20.4 9.8C22.8 9.8 24.5 10.8 25.5 12.7L22.6 14.5C22.1 13.5 21.4 12.9 20.3 12.9C19.3 12.9 18.6 13.5 18.6 14.4C18.6 15.4 19.2 15.9 20.8 16.6L21.7 17C24.8 18.3 26.5 19.7 26.5 22.8C26.5 26 23.9 28 20.1 28C16.8 28 14.7 26.2 13.5 23.8L16.5 22.8ZM7.5 23.2C8.2 24.4 9 25 10.3 25C11.5 25 12.3 24.3 12.3 22.6V10.2H16V22.6C16 26.1 13.9 28 10.2 28C7.5 28 5.7 26.3 4.8 24.2L7.5 23.2Z" fill="#000000" />
  </svg>
);

// 6. HTML5 Official Logo
export const HTML5Logo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <path d="M6.5 4.5L8.5 26.5L16 28.5L23.5 26.5L25.5 4.5H6.5Z" fill="#E34F26" />
    <path d="M16 6.5V26.6L22 25L23.7 6.5H16Z" fill="#EF652A" />
    <path d="M16 11.2H11.5L11.8 14.8H16V11.2ZM16 18.2H12.2L12.5 21.8L16 22.8V18.2Z" fill="#EBEBEB" />
    <path d="M16 11.2H20.5L20.2 14.8H16V11.2ZM16 18.2H19.8L19.5 21.8L16 22.8V18.2Z" fill="#FFFFFF" />
  </svg>
);

// 7. CSS3 Official Logo
export const CSS3Logo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <path d="M6.5 4.5L8.5 26.5L16 28.5L23.5 26.5L25.5 4.5H6.5Z" fill="#1572B6" />
    <path d="M16 6.5V26.6L22 25L23.7 6.5H16Z" fill="#33A9DC" />
    <path d="M16 11.2H11.5L11.8 14.8H16V11.2ZM16 18.2H12.2L12.5 21.8L16 22.8V18.2Z" fill="#EBEBEB" />
    <path d="M16 11.2H20.5L20.2 14.8H16V11.2ZM16 18.2H19.8L19.5 21.8L16 22.8V18.2Z" fill="#FFFFFF" />
  </svg>
);

// 8. SQL Official Logo
export const SQLLogo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <rect width="32" height="32" rx="8" fill="#0E1E38" stroke="#00758F" strokeWidth="0.8" />
    <ellipse cx="16" cy="10" rx="9" ry="4" fill="#00758F" />
    <ellipse cx="16" cy="10" rx="7" ry="2.8" fill="#00ACC1" />
    <path d="M7 10V16C7 18.2 11 20 16 20C21 20 25 18.2 25 16V10" stroke="#00ACC1" strokeWidth="1.5" />
    <path d="M7 16V22C7 24.2 11 26 16 26C21 26 25 24.2 25 22V16" stroke="#00758F" strokeWidth="1.5" />
    <text x="16" y="19" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold" fontFamily="monospace">SQL</text>
  </svg>
);

// 9. React Official Logo
export const ReactLogo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <circle cx="16" cy="16" r="2.8" fill="#61DAFB" />
    <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.4" fill="none" />
    <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.4" fill="none" transform="rotate(60 16 16)" />
    <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.4" fill="none" transform="rotate(120 16 16)" />
  </svg>
);

// 10. Tailwind CSS Official Logo
export const TailwindLogo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <path d="M16 10C13 10 11.5 11.5 11.5 14.5C12.5 13.5 13.7 13.1 15.2 13.3C17 13.6 18.3 14.9 19.7 16.4C22 18.8 24.8 21.7 30 21.7C33 21.7 34.5 20.2 34.5 17.2C33.5 18.2 32.3 18.6 30.8 18.4C29 18.1 27.7 16.8 26.3 15.3C24 12.9 21.2 10 16 10ZM2 21.7C5 21.7 6.5 20.2 6.5 17.2C7.5 18.2 8.7 18.6 10.2 18.4C12 18.1 13.3 16.8 14.7 15.3C17 12.9 19.8 10 25 10C28 10 29.5 11.5 29.5 14.5C28.5 13.5 27.3 13.1 25.8 13.3C24 13.6 22.7 14.9 21.3 16.4C19 18.8 16.2 21.7 11 21.7C8 21.7 6.5 20.2 6.5 17.2C5.5 18.2 4.3 18.6 2.8 18.4C1 18.1 -0.3 16.8 -1.7 15.3C-4 12.9 -6.8 10 -12 10C-9 10 -7.5 11.5 -7.5 14.5C-6.5 13.5 -5.3 13.1 -3.8 13.3C-2 13.6 -0.7 14.9 0.7 16.4C3 18.8 5.8 21.7 11 21.7" transform="scale(0.85) translate(2, 2)" fill="#38BDF8" />
  </svg>
);

// 11. Framer Motion Logo
export const FramerMotionLogo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <rect width="32" height="32" rx="8" fill="#0B0F19" stroke="#8B5CF6" strokeWidth="0.8" />
    <path d="M8 6H24V14H16L8 6Z" fill="#8B5CF6" />
    <path d="M8 14H16L24 22H8V14Z" fill="#0055FF" />
    <path d="M8 22H16L8 30V22Z" fill="#EC4899" />
  </svg>
);

// 12. Angular Logo
export const AngularLogo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <path d="M16 4L6 8L7.5 22L16 28L24.5 22L26 8L16 4Z" fill="#DD0031" />
    <path d="M16 4V28L24.5 22L26 8L16 4Z" fill="#C3002F" />
    <path d="M16 9.5L10.5 21.5H13.2L14.3 18.8H17.7L18.8 21.5H21.5L16 9.5ZM17 16.7H15L16 14.2L17 16.7Z" fill="#FFFFFF" />
  </svg>
);

// 13. Vue.js Logo
export const VueLogo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <path d="M19.5 5.5L16 11.5L12.5 5.5H5L16 24.5L27 5.5H19.5Z" fill="#42B883" />
    <path d="M19.5 5.5L16 11.5L12.5 5.5H8.5L16 18.5L23.5 5.5H19.5Z" fill="#35495E" />
  </svg>
);

// 14. FastAPI Logo
export const FastAPILogo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <circle cx="16" cy="16" r="14" fill="#009688" />
    <path d="M17.5 7L10 17.5H16L14.5 25L22 14.5H16L17.5 7Z" fill="#FFFFFF" />
  </svg>
);

// 15. Docker Logo
export const DockerLogo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <path d="M29.5 16C28.7 15.1 27.5 14.7 26.2 14.8C25.9 13.7 25.1 12.8 24.1 12.5L23.5 12.3V13.8C23.5 14.9 22.8 15.8 21.7 16H20.5V13.5H18V16H15.5V13.5H13V16H10.5V13.5H8V16H5.5V13.5H3V16.8C3 21 6.5 24.5 11 24.5C17.5 24.5 22.8 21.8 25.5 17.5C27 17.6 28.5 17.1 29.5 16Z" fill="#2496ED" />
    <rect x="8" y="10.5" width="2" height="2" fill="#2496ED" />
    <rect x="10.5" y="10.5" width="2" height="2" fill="#2496ED" />
    <rect x="13" y="10.5" width="2" height="2" fill="#2496ED" />
    <rect x="10.5" y="7.5" width="2" height="2" fill="#2496ED" />
    <rect x="13" y="7.5" width="2" height="2" fill="#2496ED" />
    <rect x="15.5" y="10.5" width="2" height="2" fill="#2496ED" />
  </svg>
);

// 16. AWS Logo
export const AWSLogo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <rect width="32" height="32" rx="8" fill="#141E2C" />
    <path d="M10 18.5C13 20.5 19 20.5 22 18.5" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M20.5 17.5L22.5 18.8L21 20" stroke="#FF9900" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <text x="16" y="14" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="sans-serif">aws</text>
  </svg>
);

// 17. Linux / Tux Logo
export const LinuxLogo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <ellipse cx="16" cy="18" rx="8" ry="10" fill="#222222" />
    <ellipse cx="16" cy="18" rx="5.5" ry="7.5" fill="#EEEEEE" />
    <ellipse cx="16" cy="10" rx="5" ry="5.5" fill="#222222" />
    <circle cx="14.5" cy="9.5" r="1.2" fill="#FFFFFF" />
    <circle cx="17.5" cy="9.5" r="1.2" fill="#FFFFFF" />
    <circle cx="14.5" cy="9.5" r="0.6" fill="#000000" />
    <circle cx="17.5" cy="9.5" r="0.6" fill="#000000" />
    <path d="M14 12C14 12 16 13.5 18 12L16 14L14 12Z" fill="#FFA000" />
    <ellipse cx="11.5" cy="27" rx="3.5" ry="1.5" fill="#FFA000" />
    <ellipse cx="20.5" cy="27" rx="3.5" ry="1.5" fill="#FFA000" />
  </svg>
);

// 18. Kali Linux Logo
export const KaliLinuxLogo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <circle cx="16" cy="16" r="14" fill="#08101E" stroke="#557C94" strokeWidth="1" />
    <path d="M12 9C12 9 17 8 20 11C23 14 24 18 20 22C16 26 10 24 10 24C10 24 13 22 14 20C15 18 14 16 12 15C10 14 8 16 8 16C8 16 9 12 12 9Z" fill="#557C94" />
    <path d="M16 13C17 14 18 16 17 18C16 19 14 19 14 19" stroke="#00E5FF" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// 19. Microsoft Azure Logo
export const AzureLogo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <path d="M8 24.5L16 6L21 16.5L12.5 24.5H8Z" fill="#0078D4" />
    <path d="M16.5 17L21 6.5L25 24.5H13L16.5 17Z" fill="#50E6FF" />
    <path d="M14 24.5L19 15L23.5 24.5H14Z" fill="#005BA1" />
  </svg>
);

// 20. GitHub Logo
export const GitHubLogo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M16 4C9.37 4 4 9.37 4 16C4 21.3 7.44 25.8 12.21 27.39C12.81 27.5 13.03 27.13 13.03 26.81C13.03 26.52 13.02 25.56 13.01 24.55C9.67 25.27 8.97 23.14 8.97 23.14C8.42 21.76 7.64 21.39 7.64 21.39C6.55 20.65 7.72 20.66 7.72 20.66C8.93 20.75 9.56 21.9 9.56 21.9C10.63 23.73 12.36 23.21 13.04 22.9C13.15 22.12 13.46 21.59 13.8 21.29C11.14 20.99 8.34 19.96 8.34 15.38C8.34 14.07 8.81 13.01 9.58 12.18C9.46 11.88 9.05 10.66 9.7 9.02C9.7 9.02 10.71 8.7 13 10.25C13.96 9.98 14.98 9.85 16 9.85C17.02 9.85 18.04 9.98 19 10.25C21.29 8.7 22.3 9.02 22.3 9.02C22.95 10.66 22.54 11.88 22.42 12.18C23.19 13.01 23.66 14.07 23.66 15.38C23.66 19.98 20.85 20.98 18.18 21.28C18.61 21.65 19 22.38 19 23.49C19 25.09 18.98 26.38 18.98 26.81C18.98 27.14 19.19 27.51 19.8 27.39C24.56 25.79 28 21.3 28 16C28 9.37 22.63 4 16 4Z" />
  </svg>
);

// 21. OpenAI Logo
export const OpenAILogo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <rect width="32" height="32" rx="8" fill="#10A37F" />
    <path d="M16 8C13 8 11.5 9.5 11.5 11.5V13H14V11.5C14 10.5 14.8 9.8 16 9.8C17.2 9.8 18 10.5 18 11.5C18 12.8 16 14 16 15.5V16.5H18V15.5C18 14.5 19.8 13.5 19.8 11.5C19.8 9.5 18.2 8 16 8Z" fill="#FFFFFF" />
    <circle cx="16" cy="19.5" r="1.2" fill="#FFFFFF" />
    <circle cx="16" cy="16" r="6" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
  </svg>
);

// 22. Power BI Logo
export const PowerBILogo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <rect width="32" height="32" rx="8" fill="#1E1E1E" />
    <rect x="8" y="16" width="3.5" height="10" rx="1.5" fill="#E6AD10" />
    <rect x="14" y="11" width="3.5" height="15" rx="1.5" fill="#F2C811" />
    <rect x="20" y="6" width="3.5" height="20" rx="1.5" fill="#F9E060" />
  </svg>
);

// 23. Jira Logo
export const JiraLogo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <path d="M16 6L24 14L16 22L8 14L16 6Z" fill="#0052CC" />
    <path d="M16 11L21 16L16 21L11 16L16 11Z" fill="#2684FF" />
    <path d="M16 14L18 16L16 18L14 16L16 14Z" fill="#FFFFFF" />
  </svg>
);

// 24. PostgreSQL Logo
export const PostgreSQLLogo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <rect width="32" height="32" rx="8" fill="#336791" />
    <path d="M16 7C12 7 9 10 9 14.5C9 18 11.5 20.5 13.5 21.5V25H18.5V21.5C20.5 20.5 23 18 23 14.5C23 10 20 7 16 7Z" fill="#FFFFFF" />
    <circle cx="13.5" cy="13.5" r="1.5" fill="#336791" />
    <circle cx="18.5" cy="13.5" r="1.5" fill="#336791" />
  </svg>
);

// 25. MySQL Logo
export const MySQLLogo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <rect width="32" height="32" rx="8" fill="#00758F" />
    <path d="M10 20C12 15 17 12 22 13C20 15 19 18 17 21C14 21 12 21 10 20Z" fill="#F29111" />
    <path d="M22 13C23 14 24 16 24 18C23 18 22 17 21 17C21 16 21.5 14 22 13Z" fill="#FFFFFF" />
  </svg>
);

// 26. MongoDB Logo
export const MongoDBLogo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <path d="M16 4C16 4 10 10.5 10 17C10 21.5 12.8 25 15.5 27.5L16 28L16.5 27.5C19.2 25 22 21.5 22 17C22 10.5 16 4 16 4Z" fill="#47A248" />
    <path d="M16 4V28C16 28 16.5 27.5 16.5 27.5C19.2 25 22 21.5 22 17C22 10.5 16 4 16 4Z" fill="#499D4A" />
    <path d="M16 6V26" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />
  </svg>
);

// 27. Jest Logo
export const JestLogo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <path d="M16 4L24 9V23L16 28L8 23V9L16 4Z" fill="#C21325" />
    <path d="M16 4L24 9V23L16 28V4Z" fill="#99424F" />
    <circle cx="16" cy="14" r="3" fill="#FFFFFF" />
    <path d="M13 18C13 18 14.5 20 16 20C17.5 20 19 18 19 18" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// 28. JUnit Logo
export const JUnitLogo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <circle cx="16" cy="16" r="14" fill="#25A162" />
    <text x="16" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900" fontFamily="sans-serif">5</text>
  </svg>
);

// 29. CI/CD Pipeline Badge
export const CICDLogo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <circle cx="11" cy="16" r="5" stroke="#00C4B4" strokeWidth="2.5" />
    <circle cx="21" cy="16" r="5" stroke="#3B82F6" strokeWidth="2.5" />
    <path d="M16 11L16 21" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 30. Cybersecurity / Honeypot Defense Badge
export const CyberSecurityBadge = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <path d="M16 4L25 8V16C25 22 16 27 16 27C16 27 7 22 7 16V8L16 4Z" fill="url(#cyber-grad)" stroke="#22D3EE" strokeWidth="1.2" />
    <path d="M16 9V23" stroke="#22D3EE" strokeWidth="1.2" strokeDasharray="2 2" />
    <circle cx="16" cy="16" r="3" fill="#22D3EE" />
    <defs>
      <linearGradient id="cyber-grad" x1="7" y1="4" x2="25" y2="27" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0B2742" />
        <stop offset="1" stopColor="#061224" />
      </linearGradient>
    </defs>
  </svg>
);

// 31. Data Structures & Algorithms Badge
export const DSABadge = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <rect width="32" height="32" rx="8" fill="#0C1A30" stroke="#38BDF8" strokeWidth="0.8" />
    <circle cx="16" cy="9" r="2.5" fill="#38BDF8" />
    <circle cx="10" cy="18" r="2.5" fill="#38BDF8" />
    <circle cx="22" cy="18" r="2.5" fill="#38BDF8" />
    <circle cx="7" cy="25" r="2" fill="#818CF8" />
    <circle cx="13" cy="25" r="2" fill="#818CF8" />
    <circle cx="25" cy="25" r="2" fill="#818CF8" />
    <line x1="16" y1="9" x2="10" y2="18" stroke="#38BDF8" strokeWidth="1.2" />
    <line x1="16" y1="9" x2="22" y2="18" stroke="#38BDF8" strokeWidth="1.2" />
    <line x1="10" y1="18" x2="7" y2="25" stroke="#818CF8" strokeWidth="1" />
    <line x1="10" y1="18" x2="13" y2="25" stroke="#818CF8" strokeWidth="1" />
    <line x1="22" y1="18" x2="25" y2="25" stroke="#818CF8" strokeWidth="1" />
  </svg>
);

// 32. Generic Tech Badge fallback
export const GenericTechBadge = ({ label, className = "w-4 h-4", color = "#3B82F6" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <rect width="32" height="32" rx="8" fill="#070D1E" stroke={color} strokeWidth="1" />
    <text x="16" y="19" textAnchor="middle" fill={color} fontSize="8" fontWeight="bold" fontFamily="monospace">
      {label ? label.slice(0, 3).toUpperCase() : "</>"}
    </text>
  </svg>
);

/**
 * Universal Skill Badge Resolver
 * Returns an authentic, colorful brand SVG for any skill name.
 */
export const getSkillIcon = (skillName, className = "w-4 h-4 shrink-0") => {
  const s = skillName.toLowerCase().trim();

  // Languages
  if (s === 'c++' || s === 'c++17' || s === 'cpp') return <CppLogo className={className} />;
  if (s === 'c') return <CLogo className={className} />;
  if (s.includes('python')) return <PythonLogo className={className} />;
  if (s.includes('java') && !s.includes('script')) return <JavaLogo className={className} />;
  if (s.includes('javascript') || s.includes('js (es6+)')) return <JavaScriptLogo className={className} />;
  if (s.includes('html')) return <HTML5Logo className={className} />;
  if (s.includes('css') && !s.includes('tailwind')) return <CSS3Logo className={className} />;
  if (s.includes('sql') && !s.includes('postgresql') && !s.includes('mysql') && !s.includes('sqlsense') && !s.includes('nosql')) return <SQLLogo className={className} />;

  // Frontend
  if (s === 'react' || s === 'react.js') return <ReactLogo className={className} />;
  if (s.includes('tailwind')) return <TailwindLogo className={className} />;
  if (s.includes('framer')) return <FramerMotionLogo className={className} />;
  if (s.includes('angular')) return <AngularLogo className={className} />;
  if (s.includes('vue')) return <VueLogo className={className} />;
  if (s.includes('responsive')) return <ReactLogo className={className} />;
  if (s.includes('glassmorphism')) return <FramerMotionLogo className={className} />;
  if (s.includes('component')) return <ReactLogo className={className} />;

  // Backend
  if (s.includes('fastapi')) return <FastAPILogo className={className} />;
  if (s.includes('rest api') || s.includes('api design')) return <FastAPILogo className={className} />;
  if (s.includes('docker')) return <DockerLogo className={className} />;
  if (s.includes('aws')) return <AWSLogo className={className} />;
  if (s.includes('azure')) return <AzureLogo className={className} />;
  if (s === 'linux') return <LinuxLogo className={className} />;
  if (s.includes('kali')) return <KaliLinuxLogo className={className} />;
  if (s.includes('github')) return <GitHubLogo className={className} />;
  if (s.includes('openai')) return <OpenAILogo className={className} />;
  if (s.includes('power bi')) return <PowerBILogo className={className} />;
  if (s.includes('jira')) return <JiraLogo className={className} />;
  if (s.includes('ci/cd')) return <CICDLogo className={className} />;

  // Databases & Concepts
  if (s.includes('postgres')) return <PostgreSQLLogo className={className} />;
  if (s.includes('mysql')) return <MySQLLogo className={className} />;
  if (s.includes('mongo')) return <MongoDBLogo className={className} />;
  if (s.includes('dsa') || s.includes('algorithm')) return <DSABadge className={className} />;
  if (s.includes('oop') || s.includes('stl')) return <CppLogo className={className} />;
  if (s.includes('cybersecurity') || s.includes('honeypot') || s.includes('penetration') || s.includes('encryption') || s.includes('security')) {
    return <CyberSecurityBadge className={className} />;
  }
  if (s.includes('jest')) return <JestLogo className={className} />;
  if (s.includes('junit')) return <JUnitLogo className={className} />;
  if (s.includes('agile') || s.includes('scrum') || s.includes('kanban')) return <JiraLogo className={className} />;

  return <GenericTechBadge label={skillName} className={className} />;
};

/**
 * Rich 3D Project Badge Components
 */

// 1. SQLSense Project Badge (PostgreSQL / SQL Explainer)
export const SQLSenseBadge = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
    <rect width="40" height="40" rx="10" fill="url(#sqlsense-bg)" stroke="#38BDF8" strokeWidth="1.2" />
    <ellipse cx="20" cy="13" rx="11" ry="4.5" fill="#0284C7" />
    <ellipse cx="20" cy="13" rx="8" ry="3" fill="#38BDF8" />
    <path d="M9 13V20C9 22.8 14 25 20 25C26 25 31 22.8 31 20V13" stroke="#38BDF8" strokeWidth="1.8" />
    <path d="M9 20V27C9 29.8 14 32 20 32C26 32 31 29.8 31 27V20" stroke="#0284C7" strokeWidth="1.8" />
    <circle cx="27" cy="27" r="4.5" fill="#0369A1" stroke="#38BDF8" strokeWidth="1.2" />
    <path d="M25 27L26.5 28.5L29 25.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="sqlsense-bg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#082F49" />
        <stop offset="1" stopColor="#031626" />
      </linearGradient>
    </defs>
  </svg>
);

// 2. VIGILANCE Honeypot Project Badge (Cyber Defense / Decoy)
export const VigilanceHoneypotBadge = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
    <rect width="40" height="40" rx="10" fill="url(#vigilance-bg)" stroke="#EF4444" strokeWidth="1.2" />
    <path d="M20 6L32 11V21C32 28.5 20 35 20 35C20 35 8 28.5 8 21V11L20 6Z" fill="url(#vigilance-shield)" stroke="#F87171" strokeWidth="1.4" />
    <circle cx="20" cy="20" r="5" stroke="#FCA5A5" strokeWidth="1.2" strokeDasharray="2 2" />
    <circle cx="20" cy="20" r="2.5" fill="#EF4444" />
    <path d="M20 12V15M20 25V28M12 20H15M25 20H28" stroke="#FCA5A5" strokeWidth="1.2" strokeLinecap="round" />
    <defs>
      <linearGradient id="vigilance-bg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#450A0A" />
        <stop offset="1" stopColor="#1C0404" />
      </linearGradient>
      <linearGradient id="vigilance-shield" x1="8" y1="6" x2="32" y2="35" gradientUnits="userSpaceOnUse">
        <stop stopColor="#DC2626" />
        <stop offset="1" stopColor="#7F1D1D" />
      </linearGradient>
    </defs>
  </svg>
);

// 3. C++ Cryptographic File Engine Badge
export const CryptoEngineBadge = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
    <rect width="40" height="40" rx="10" fill="url(#crypto-bg)" stroke="#00599C" strokeWidth="1.2" />
    {/* Hexagonal C++ Chassis */}
    <path d="M20 7L31 13.5V26.5L20 33L9 26.5V13.5L20 7Z" fill="#004482" stroke="#659AD2" strokeWidth="1.2" />
    {/* Lock Emblem */}
    <rect x="15" y="19" width="10" height="8" rx="2" fill="#F59E0B" stroke="#FDE68A" strokeWidth="0.8" />
    <path d="M17 19V15.5C17 13.8 18.3 12.5 20 12.5C21.7 12.5 23 13.8 23 15.5V19" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="20" cy="23" r="1.2" fill="#78350F" />
    <defs>
      <linearGradient id="crypto-bg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0B2038" />
        <stop offset="1" stopColor="#040C17" />
      </linearGradient>
    </defs>
  </svg>
);

// 4. Heuristic Workout App Badge
export const WorkoutAppBadge = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
    <rect width="40" height="40" rx="10" fill="url(#workout-bg)" stroke="#10B981" strokeWidth="1.2" />
    {/* Biometric Pulse Wave */}
    <path d="M8 20H13L16 11L20 29L24 16L27 20H32" stroke="#34D399" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="20" cy="29" r="2" fill="#10B981" />
    <defs>
      <linearGradient id="workout-bg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#064E3B" />
        <stop offset="1" stopColor="#022118" />
      </linearGradient>
    </defs>
  </svg>
);

// 5. Dynamic API Middleware Generator Badge
export const ApiForgeBadge = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
    <rect width="40" height="40" rx="10" fill="url(#apiforge-bg)" stroke="#8B5CF6" strokeWidth="1.2" />
    <path d="M12 14L7 20L12 26" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M28 14L33 20L28 26" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 11L18 29" stroke="#C4B5FD" strokeWidth="2" strokeLinecap="round" />
    <circle cx="20" cy="20" r="3" fill="#8B5CF6" />
    <defs>
      <linearGradient id="apiforge-bg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2E1065" />
        <stop offset="1" stopColor="#14062B" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * Resolver for Project Badges
 */
export const getProjectBadge = (projectId, className = "w-6 h-6") => {
  switch (projectId) {
    case 'sqlsense':
      return <SQLSenseBadge className={className} />;
    case 'honeypot-system':
      return <VigilanceHoneypotBadge className={className} />;
    case 'file-encryption-tool':
      return <CryptoEngineBadge className={className} />;
    case 'workout-planning-app':
      return <WorkoutAppBadge className={className} />;
    case 'api-automation-generator':
      return <ApiForgeBadge className={className} />;
    default:
      return <CppLogo className={className} />;
  }
};

/**
 * Official Brand Emblem for Navbar
 */
export const ProsunBrandEmblem = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <rect width="32" height="32" rx="8" fill="url(#brand-nav-bg)" stroke="#3B82F6" strokeWidth="1.2" />
    <path d="M16 5L26 9.5V17.5C26 23.5 16 27.5 16 27.5C16 27.5 6 23.5 6 17.5V9.5L16 5Z" fill="url(#brand-shield)" stroke="#60A5FA" strokeWidth="1" />
    {/* Inner Monogram / Code Chevron */}
    <path d="M13 14L10.5 16.5L13 19" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19 14L21.5 16.5L19 19" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="16" cy="16.5" r="1.5" fill="#38BDF8" />
    <defs>
      <linearGradient id="brand-nav-bg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0F172A" />
        <stop offset="1" stopColor="#020617" />
      </linearGradient>
      <linearGradient id="brand-shield" x1="6" y1="5" x2="26" y2="27.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1E40AF" />
        <stop offset="1" stopColor="#1E3A8A" />
      </linearGradient>
    </defs>
  </svg>
);
