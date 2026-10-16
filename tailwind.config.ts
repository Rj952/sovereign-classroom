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
        // Caribbean palette: cream sand, night-sea navy, sun gold, hibiscus red, sea teal, hill green.
        sand: "#FAF4E8",
        ink: "#0B1A30",
        sea: "#0B7373",
        sun: "#F4B400",
        coral: "#D62839",
        palm: "#2E7D4F",
        iris: "#6B3FA0",
        mist: "#E8EEF2",
      },
      fontFamily: {
        display: ["Archivo", "system-ui", "sans-serif"],
        sans: ['"Source Sans 3"', "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Fraunces", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(11, 26, 48, 0.18)",
      },
    },
  },
  plugins: [],
};
export default config;
