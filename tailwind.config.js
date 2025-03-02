/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#f3f4f6",  // Soft mint green (Background)
        "secondary": "#065F46", // Fresh pastel green (Buttons, highlights)
        "accent": "#166534",    // Deep forest green (Headings, important text)
      }
    },
  },

  plugins: [],
}