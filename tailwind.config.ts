import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        DEFAULT: "300ms",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        secondary: "hsl(var(--secondary))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        border: "hsl(var(--border))",
        modal: "hsl(var(--modal))",
        popover: "hsl(var(--popover))",
        input: "hsl(var(--input))",
        hover: "hsl(var(--hover))",
        message: {
          primary: "hsl(var(--message-primary))",
          secondary: "hsl(var(--message-secondary))",
        },
        destructive: {
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      backgroundImage: {
        gradient: "linear-gradient(to top right, #97c4fd, #d5b5fe)",
      },
    },
    screens: {
      sm: "300px",
      md: "750px",
      lg: "1440px",
    },
  },
  plugins: [],
  darkMode: "class",
};

export default config;
