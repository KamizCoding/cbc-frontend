/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#f3f4f6",  
        "secondary": "#065F46", 
        "accent": "#166534",   
      }
    },
  },

  plugins: [],
}