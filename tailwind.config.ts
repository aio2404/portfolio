import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './data/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          0: '#fff8fb',
          1: '#ffe9f4',
          2: '#f8dff0',
        },
        border: '#e9b9d0',
        accent: {
          1: '#ff8fb1',
          2: '#f3b8ca',
          3: '#f7d8a7',
        },
      },
      boxShadow: {
        premium: '0 18px 60px rgba(255, 198, 220, 0.32)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatGlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both',
        'float-glow': 'floatGlow 4.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
