/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        "4/1": "4 / 1",
        "6/1": "6 / 1",
        "8/1": "8 / 1"
      }
    },
  },
  plugins: [],
}

