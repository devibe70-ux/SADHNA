import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vedic: {
          bg: "#090807",          // Deepest Krishna Shila Charcoal
          card: "#171412",        // Warm Obsidian
          surface: "#1f1b18",     // Dark Temple Stone
          border: "#332c26",      // Muted Slate Border
          gold: "#e6c762",        // Suvarna Temple Gold
          goldLight: "#fde68a",   // Soft Candlelight
          ochre: "#d97706",       // Geru Terracotta
          saffron: "#ea580c",     // Agni Flame / Saffron
          copper: "#c86d51",      // Sacred Copper
          emerald: "#3a7d65",     // Forest Sage / Anahata Emerald
          vata: "#38bdf8",        // Air & Ether (Sky Cyan)
          pitta: "#fb7185",       // Fire & Water (Warm Coral)
          kapha: "#34d399",       // Earth & Water (Sage Emerald)
        },
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "Cinzel", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "aura-glow": "aura 8s ease-in-out infinite alternate",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        aura: {
          "0%": { opacity: "0.25", transform: "scale(0.95)" },
          "100%": { opacity: "0.6", transform: "scale(1.08)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
