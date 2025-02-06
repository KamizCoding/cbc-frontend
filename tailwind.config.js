/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#ECFDF5",  // Soft mint green (Background)
        "secondary": "#86EFAC", // Fresh pastel green (Buttons, highlights)
        "accent": "#166534",    // Deep forest green (Headings, important text)
        "muted": "#D1FAE5",     // Light green for subtle elements
        "dark": "#065F46",      // Rich emerald green (Contrasts, shadows)
      }
    },
  },

  plugins: [],
}