/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    backgroundSize: {
      "w-full": "100% 3px",
      "w-none": "0% 3px",
    },

    extend: {},
  },
  plugins: [],
};
