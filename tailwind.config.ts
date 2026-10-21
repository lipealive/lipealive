import type { Config } from "tailwindcss";

const rgb = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: rgb("--background"),
        surface: { DEFAULT: rgb("--surface"), 2: rgb("--surface-2") },
        foreground: rgb("--foreground"),
        "muted-foreground": rgb("--muted-foreground"),
        border: rgb("--border"),
        accent: { DEFAULT: rgb("--accent"), foreground: rgb("--accent-foreground") },
        alive: rgb("--alive"),
        ensina: rgb("--ensina"),
        constroi: rgb("--constroi"),
        treina: rgb("--treina"),
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Impact", "Arial Narrow", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      aspectRatio: { "4/5": "4 / 5", "3/4": "3 / 4" },
      maxWidth: { page: "72rem" },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
