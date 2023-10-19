import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F4C81",
        secondary: "#FFD166",
        success: "#06D6A0",
        danger: "#EF476F",

        "on-primary": "#F8F9FA",
        "on-secondary": "#1A1A1A",
      },
    },
  },
  plugins: [],
};
export default config;
