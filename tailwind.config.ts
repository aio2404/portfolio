import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './data/**/*.{js,ts,jsx,tsx}',
    '!./app/**/* 2.{js,ts,jsx,tsx}',
    '!./components/**/* 2.{js,ts,jsx,tsx}',
    '!./data/**/* 2.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ground: {
          DEFAULT: '#F2F0EB',
          subtle: '#EAE8E2',
        },
        ink: {
          DEFAULT: '#1A1917',
          secondary: '#5C5A55',
          tertiary: '#65635E',
        },
        signal: {
          DEFAULT: '#1F4E4A',
          hover: '#163A37',
          subtle: '#EAF0EF',
        },
        line: {
          DEFAULT: '#C8C4BC',
          interactive: '#868280',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'Courier New', 'monospace'],
      },
      borderRadius: {
        sm: '2px',
        md: '4px',
      },
    },
  },
  plugins: [],
};

export default config;
