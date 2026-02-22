/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#64ffda", // Modern portfolio teal
        navy: "#0a192f",    // Dark background
      },
    },
  },
  plugins: [],
}