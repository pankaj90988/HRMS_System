/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#d9e6ff",
          200: "#b3ccff",
          300: "#84acff",
          400: "#5c8eff",
          500: "#3366ff",
          600: "#264fd9",
          700: "#1e3eb0",
          800: "#1a3389",
          900: "#182c6e",
        },
      },
    },
  },
  plugins: [],
};
