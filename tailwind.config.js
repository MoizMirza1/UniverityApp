/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: '#6673fC',
        brandhover: '#4d5cfc',       // custom green color named "brand"
        myblue: '#1e40af',      // custom blue
        darkish: '#121212'      // custom dark shade
      },
    },
  },
  plugins: [],
}