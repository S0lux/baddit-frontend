import { TbBackground } from "react-icons/tb";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: "rgba(var(--background))",
        backgroundSecondary: "rgba(var(--background-secondary))",
        componentPrimary: "rgba(var(--component-primary))",
        componentSecondary: "rgba(var(--component-secondary))",
        textPrimary: "rgba(var(--text-primary))",
        textSecondary: "rgba(var(--text-secondary))",
        accent: "rgba(var(--accent))",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
