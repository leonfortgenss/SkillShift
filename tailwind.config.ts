import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0D0F10",
        surface: "#111315",
        accent: {
          primary: "#00E676",
          secondary: "#1DE9B6",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#D0D5DD",
          muted: "#7A7F85",
        },
        alert: "#FF5252",
        success: "#69F0AE",
      },
      fontFamily: {
        sans: ["Inter", "var(--font-sans)", "system-ui", "-apple-system"],
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
      },
    },
  },
  plugins: [],
};

export default config;
