/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#fffbeb',
          100: '#fef3c7',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          900: '#78350f',
        },
        dark: '#0f172a',
      },
      fontFamily: {
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Source Serif 4', 'Georgia', 'serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(16px)' },
          to:   { opacity: 1, transform: 'translateY(0)'     },
        },
      },
    },
  },
  plugins: [],
};