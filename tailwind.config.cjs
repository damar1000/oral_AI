/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require('tailwind-scrollbar'), require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#488FB1",

          secondary: "#C1F8CF",

          accent: "#DED9C4",

          neutral: "#888888",

          "base-100": "#212121",

          info: "#0ea5e9",

          success: "#34d399",

          warning: "#fcd34d",

          error: "#f43f5e",
        },

        mytheme2: {
          primary: "#9cc6fc",

          secondary: "#43d861",

          accent: "#f59bff",

          neutral: "#121821",

          "base-100": "#FDFCFD",

          info: "#A9C2EF",

          success: "#197B71",

          warning: "#E89C30",

          error: "#FA5C47",
        },
      },
      "lemonade",
    ],
  },
};
