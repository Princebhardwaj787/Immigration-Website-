/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary — deep navy
        navy: {
          50: '#f0f4f9',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
          950: '#0B1F3A',
        },
        // Secondary — royal blue
        royal: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#1769AA',
          600: '#155e96',
          700: '#124f7d',
          800: '#0f4064',
          900: '#0c324d',
          950: '#092539',
        },
        // Accent — gold
        gold: {
          50: '#fffaeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#F4A62A',
          500: '#e8960f',
          600: '#d18409',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        // Neutrals
        ink: {
          50: '#F5F7FA',
          100: '#e4e7eb',
          200: '#cbd2d9',
          300: '#9aa5b1',
          400: '#7b8794',
          500: '#616e7c',
          600: '#52606d',
          700: '#3e4c59',
          800: '#323f4b',
          900: '#1A1A1A',
          950: '#0f1419',
        },
        whatsapp: {
          DEFAULT: '#25d366',
          dark: '#1ebe5b',
        },
      },
      fontFamily: {
        display: ['Manrope', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px -6px rgba(11, 31, 58, 0.10)',
        card: '0 10px 40px -12px rgba(11, 31, 58, 0.18)',
        lift: '0 20px 50px -20px rgba(11, 31, 58, 0.35)',
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(135deg, #0B1F3A 0%, #102A43 45%, #1769AA 130%)',
        'cta-gradient': 'linear-gradient(120deg, #0B1F3A 0%, #1769AA 100%)',
        'gold-gradient': 'linear-gradient(120deg, #F4A62A 0%, #e8960f 100%)',
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
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        kenburns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        counterUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        fadeUp: 'fadeUp 0.6s ease-out both',
        fadeIn: 'fadeIn 0.5s ease-out both',
        slideUp: 'slideUp 0.5s ease-out both',
        kenburns: 'kenburns 12s ease-out both',
        counterUp: 'counterUp 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};
