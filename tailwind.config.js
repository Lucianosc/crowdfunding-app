/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      epilogue: "epilogue",
    },
    textColor: {
      white: "#FFFFFF",
    },
    colorPalette: {
      primary: "#4acd8d",
      secondary: "#8c6dfd",
      tertiary: "#0000FF",
      black: "#13131a",
      black2: "#1c1c24",
      grey: "#818183",
      grey2: "#4b5264",
      grey3: "#3a3a43",
      grey4: "#2c2f32",
      grey5: "#b2b3bd",
    },
    extend: {},
  },
  plugins: [],
};
