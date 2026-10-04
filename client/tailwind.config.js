/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4fa',
          100: '#dce5f2',
          200: '#b9cbe6',
          300: '#8aa7d5',
          400: '#5a7dbe',
          500: '#3a5da4',
          600: '#2a4787',
          700: '#1f376b',
          800: '#16294f',
          900: '#0e1c36',
          950: '#0a1428',
        },
        royal: {
          50: '#eff5ff',
          100: '#dbe7fe',
          200: '#bfd4fe',
          300: '#93b7fd',
          400: '#6091fa',
          500: '#3b6cf6',
          600: '#254eeb',
          700: '#1d3bd8',
          800: '#1e31af',
          900: '#1e2f8a',
          950: '#172054',
        },
        gold: {
          50: '#fdf8ec',
          100: '#faefd2',
          200: '#f5dda3',
          300: '#efc66d',
          400: '#e8ad42',
          500: '#e29425',
          600: '#c9761b',
          700: '#a65919',
          800: '#87471b',
          900: '#6f3c1a',
          950: '#3e1e0c',
        },
        whatsapp: {
          DEFAULT: '#25d366',
          dark: '#1ebe5b',
        },
        ink: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5d9e2',
          300: '#b0b8c9',
          400: '#8591ab',
          500: '#667291',
          600: '#515b78',
          700: '#424a61',
          800: '#394051',
          900: '#1f2431',
          950: '#14171f',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px -6px rgba(14, 28, 54, 0.10)',
        card: '0 10px 40px -12px rgba(14, 28, 54, 0.18)',
        lift: '0 20px 50px -20px rgba(14, 28, 54, 0.35)',
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(135deg, #0a1428 0%, #16294f 45%, #1d3bd8 130%)',
        'cta-gradient': 'linear-gradient(120deg, #16294f 0%, #1d3bd8 100%)',
        'gold-gradient': 'linear-gradient(120deg, #e8ad42 0%, #e29425 100%)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        fadeUp: 'fadeUp 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};
