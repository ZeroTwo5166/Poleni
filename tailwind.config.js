/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist)", "sans-serif"],
      },
      colors: {
        brand: {
          purple: "#6366f1",
          dark:   "#080808",
          card:   "#111111",
          border: "#1f1f1f",
        },
      },
    },
  },
  plugins: [],
}