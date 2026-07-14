/** @type {import('tailwindcss').Config} */
export default {
  // ── STEP 1: enable class-based dark mode ─────────────────────────────────
  // "class" means dark mode activates when <html> has the "dark" class,
  // giving you full manual control via a toggle button.
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};