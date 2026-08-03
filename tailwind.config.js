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
          primary: '#3B82F6',   // Blue
          secondary: '#8B5CF6', // Violet
          accent: '#06B6D4',    // Cyan
        },
        cyber: {
          black: '#030712',     // Extremely dark gray/navy
          dark: '#0B0F19',      // Dark tech slate
          surface: '#111827',   // Gray 900
          muted: '#1F2937',     // Gray 800
          border: 'rgba(255, 255, 255, 0.08)',
          glow: 'rgba(59, 130, 246, 0.15)',
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
