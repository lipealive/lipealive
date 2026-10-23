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
        accent: { DEFAULT: rgb("--accent"), foreground: rgb("--on-accent") },
        alive: rgb("--alive"),
        ensina: rgb("--ensina"),
        constroi: rgb("--constroi"),
        treina: rgb("--treina"),
        youtube: rgb("--youtube"),
        ink: "#0b0b0c",
        paper: "#f3f1ec",
        /* Marca Alive Finance (kit em ../lipe-lp-financial) */
        finance: { DEFAULT: "#1EA076", magenta: "#E6338A", ink: "#0B1210" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Impact", "Arial Narrow", "sans-serif"],
        ensina: ["var(--font-scritture)", "var(--font-inter)", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      maxWidth: { page: "80rem" },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
