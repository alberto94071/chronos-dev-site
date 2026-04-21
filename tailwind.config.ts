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
        primary: "#7aff00",
        neon: "#39ff14",
        "primary-dark": "#4aaa2a",
        bg: "#131a13",
        deep: "#0a100e",
        surface: "#1a251a",
        "text-main": "#f0f0e8",
        muted: "#888a80",
        border: "#2a3a2a",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      animation: {
        "text-wipe": "textWipe 3.4s cubic-bezier(.4,0,.2,1) infinite",
        marquee: "marquee 18s linear infinite",
      },
      keyframes: {
        textWipe: {
          "0%": { width: "0%" },
          "65%": { width: "100%" },
          "88%": { width: "100%" },
          "100%": { width: "0%" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
