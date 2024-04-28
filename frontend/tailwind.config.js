/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      robotoLight: "Roboto Mono, monospace",
    },
    extend: {
      colors: {
        paleGrey: "#898989",
        categoryGrey: "#F9F6F6",
        yellowAdd: "#FFE605",
        greenConfirm: "#54F539",
        redCancel: "#F54141",
        redPrice: "#DD3535",
        redDelete: "#FF1B1B",
      },
      boxShadow: {
        appShadow: "0px 5px 15px rgba(0, 0, 0, 0.35) ",
      },
    },
  },
  plugins: [],
};
