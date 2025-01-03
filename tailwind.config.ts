import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
    transitionDuration: {
        DEFAULT: '300ms'
     },
      backgroundImage: {
        'gradient': 'linear-gradient(to top right, #97c4fd, #d5b5fe)',
      }
    },
    screens: {
      'sm': '300px',
      'md': '750px',
      'lg': '1440px',
    },
  },
  plugins: [],
  darkMode: 'class',
};

export default config;
