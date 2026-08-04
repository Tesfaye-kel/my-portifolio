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
        primary: '#64ffda',
        navy: '#0a192f',
        'navy-light': '#112240',
        'navy-lighter': '#233554',
        slate: {
          DEFAULT: '#8892b0',
          light: '#a8b2d1',
          lightest: '#ccd6f6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(100, 255, 218, 0.15)',
        'glow-lg': '0 0 40px rgba(100, 255, 218, 0.2)',
        card: '0 10px 30px -10px rgba(2, 12, 27, 0.7)',
        'card-hover': '0 20px 40px -15px rgba(2, 12, 27, 0.9)',
      },
      borderRadius: {
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}