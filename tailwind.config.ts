import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: "#F5EFE6",
        ink: "#0F1B2D",
        sea: "#0B7B8A",
        sun: "#E3A93B",
        coral: "#C9543D",
        palm: "#1F6B4B",
        mist: "#E8EEF2",
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['Inter', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(15, 27, 45, 0.18)",
      },
    },
  },
  plugins: [],
};
export default config;
