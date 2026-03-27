/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // You can define Sabahra's brand colors here later!
        sabahraTeal: '#0d9488', 
      },
    },
  },
  plugins: [],
}