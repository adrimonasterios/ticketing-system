import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/_routes/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          400: "#00531b",
        },
        background: {
          400: "#f2f4e9",
        },
        text: {
          400: "#1b1b1b",
        },
      },
    },
  },
  plugins: [],
};
export default config;
