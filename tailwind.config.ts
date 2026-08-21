import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import containerQueries from "@tailwindcss/container-queries";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0f1117",
        surface: "#161922",
        "surface-container": "#1e222d",
        "surface-container-high": "#282d3d",
        "surface-container-highest": "#333a4d",
        "surface-variant": "#2a303f",
        primary: "#534AB7",
        "primary-container": "#403896",
        secondary: "#8c909f",
        success: "#0F6E56",
        warning: "#EF9F27",
        error: "#f09595",
        "on-surface": "#e1e3e9",
        "on-surface-variant": "#9ca3af",
        "on-primary": "#ffffff",
        outline: "#3f4451",
        "outline-variant": "#2a2f3a",
      },
      fontSize: {
        "xs-plus": "11px",
        "sm-plus": "13px",
        "base-minus": "14px",
      },
      fontFamily: {
        headline: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"],
        nepali: ["Mukta", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [forms, containerQueries],
};

export default config;
