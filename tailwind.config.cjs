/** @type {import('tailwindcss').Config} */

// Design tokens live as CSS variables in src/styles/global.css (light + dark).
// These entries expose them to Tailwind, e.g. `bg-surface`, `text-ink`,
// `border-line`, `bg-accent/40`. Names are new so nothing on the resume or
// learning pages changes.
const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    backgroundSize: {
      "w-full": "100% 3px",
      "w-none": "0% 3px",
    },

    extend: {
      colors: {
        bg: token("bg"),
        surface: token("surface"),
        "surface-2": token("surface-2"),
        ink: token("ink"),
        muted: token("muted"),
        line: token("line"),
        accent: token("accent"),
        "accent-soft": token("accent-soft"),
        "on-accent": token("on-accent"),
        inverse: token("inverse"),
        "on-inverse": token("on-inverse"),
        "hero-ink": token("hero-ink"),
      },
      fontFamily: {
        body: ["var(--font-sans)"],
        code: ["var(--font-mono)"],
      },
      borderRadius: {
        card: "var(--radius-card)",
      },
    },
  },
  plugins: [],
};
