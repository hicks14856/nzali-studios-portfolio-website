import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        velvet: {
          DEFAULT: "#FAF7F2",
          deep: "#EDE7DC",
          surface: "#FFFCF7",
          muted: "#F3EEE5",
          stage: "#E2D9CC",
        },
        charcoal: {
          DEFAULT: "#1A1A1A",
          light: "#404040",
          soft: "#5C5C5C",
        },
        crimson: {
          DEFAULT: "#8B0000",
          dark: "#4A0404",
          muted: "#7A0010",
          whisper: "#5C0010",
        },
        graphite: {
          DEFAULT: "#6B6B6B",
          light: "#8A8A8A",
          stroke: "#525252",
        },
      },
      fontFamily: {
        signature: ["var(--font-signature)", "Great Vibes", "cursive"],
        heading: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        cartoon: ["var(--font-cartoon)", "Fredoka", "system-ui", "sans-serif"],
      },
      spacing: {
        section: "clamp(4rem, 10vw, 8rem)",
      },
      maxWidth: {
        prose: "65ch",
        content: "72rem",
      },
      borderRadius: {
        sketch: "2px",
      },
      boxShadow: {
        luxury: "0 20px 60px rgba(26, 22, 18, 0.08), 0 4px 16px rgba(26, 22, 18, 0.04)",
        crimson: "0 0 40px rgba(122, 0, 16, 0.08)",
        artwork:
          "0 2px 0 rgba(255, 255, 255, 0.65) inset, 0 10px 36px rgba(26, 22, 18, 0.14), 0 24px 64px rgba(26, 22, 18, 0.08)",
        "artwork-deep":
          "0 4px 24px rgba(26, 22, 18, 0.16), 0 16px 48px rgba(26, 22, 18, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
