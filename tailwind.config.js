/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#00A788",
        font: {
          primary: "#0F172A",
          secondary: "#475569",
        },
        background: "#ffffff",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  // ...rest of config
};
