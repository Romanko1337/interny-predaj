/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "etabletka-blue": "#2b2d58"
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}