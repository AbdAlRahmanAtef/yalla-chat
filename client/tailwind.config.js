/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        loading: "url('./src/assets/loading-1.png')",
      },
    },
  },
  plugins: [],
};
