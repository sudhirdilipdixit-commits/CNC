import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Guidelines v3 – Option B palette
        navy: "#243048",
        "navy-dark": "#1A2336",
        yellow: "#FCCC00",
        "yellow-hover": "#FFD729",
        ivory: "#FAF7F2",
        "pale-navy": "#D6DBED",
        charcoal: "#2B2B2B",
        grey: "#6B6B6B",
        mist: "#E8EEF2",
      },
      fontFamily: {
        serif: ['"DM Serif Display"', "Georgia", '"Times New Roman"', "serif"],
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
      },
      fontSize: {
        "display-1": ["clamp(36px,7vw,64px)", { lineHeight: "1.08" }],
        "display-2": ["clamp(28px,4.5vw,44px)", { lineHeight: "1.15" }],
        "display-3": ["clamp(22px,3vw,30px)", { lineHeight: "1.2" }],
        lede: ["clamp(17px,2vw,20px)", { lineHeight: "1.55" }],
      },
      boxShadow: {
        sm: "0 1px 2px rgba(36,48,72,0.05)",
        md: "0 4px 12px rgba(36,48,72,0.08)",
        lg: "0 12px 32px rgba(36,48,72,0.12)",
        cta: "0 4px 14px rgba(36,48,72,0.18)",
        "cta-hover": "0 6px 18px rgba(36,48,72,0.25)",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        pill: "999px",
      },
      animation: {
        "slide-up": "slideUp 0.28s cubic-bezier(0.16,1,0.3,1)",
        "fade-in": "fadeIn 0.2s ease",
      },
      keyframes: {
        slideUp: {
          from: { transform: "translateY(40px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
