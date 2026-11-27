/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#55D6C8',   // Dark Accent Teal
          secondary: '#087F79', // Light Accent Teal
          accent: '#55D6C8',    // Unified Teal Accent
        },
        cyber: {
          black: '#0B0D10',     // Primary Dark Canvas
          dark: '#151A22',      // Dark Card Surface
          surface: '#1D242E',   // Raised Dark Surface
          muted: '#252E3B',     // Subtle Hover Surface
          border: 'rgba(255, 255, 255, 0.09)',
          glow: 'rgba(85, 214, 200, 0.14)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
        premium: '20px',
      },
      boxShadow: {
        'premium-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'premium-glow': '0 0 30px rgba(59, 130, 246, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
