import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08090C",
        surface: {
          DEFAULT: "#0F1219",
          muted: "#161B26",
          elevated: "#1D2332",
          border: "rgba(255, 255, 255, 0.08)",
        },
        brand: {
          red: "#E50914",
          crimson: "#FF2B51",
          purple: "#8B5CF6",
          violet: "#6366F1",
          gold: "#F59E0B",
          cyan: "#06B6D4",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-hero": "linear-gradient(to top, #08090C 0%, rgba(8, 9, 12, 0.8) 35%, rgba(8, 9, 12, 0) 100%)",
        "gradient-card": "linear-gradient(180deg, rgba(22, 27, 38, 0.4) 0%, rgba(15, 18, 25, 0.8) 100%)",
        "glow-purple": "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(0, 0, 0, 0) 70%)",
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite",
        "pulse-slow": "pulseGlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
