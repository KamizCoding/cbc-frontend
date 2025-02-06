/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary" : "#F7FEE7",
        "secondary" : "#65A30D",
        "accent" : "#4D7C0F"
      }
    },
  },
  plugins: [],
}