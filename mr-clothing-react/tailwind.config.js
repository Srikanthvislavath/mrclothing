/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E74C3C",
        secondary: "#2C3E50",
        accent: "#27AE60",
      },
    },
  },
  plugins: [],
}
