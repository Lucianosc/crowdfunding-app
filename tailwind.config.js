/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
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
    lightMode: {
      primary: "#F16623", // bright orange
      secondary: "#17AEBF", // bright blue
      tertiary: "#F0A500", // golden yellow
      black: "#333333", // dark gray
      black2: "#1c1c24", // black
      grey: "#D3D3D3", // light gray
      grey2: "#A9A9A9", // medium gray
      grey3: "#ECECEC", // very light gray
      grey4: "#F7F7F7", // almost white
      grey5: "#BFBFBF", // muted gray
    },
    darkMode: {
      primary: "#FF5252", // bright red
      secondary: "#FFB900", // bright yellow
      tertiary: "#00E676", // bright green
      black: "#FFFFFF", // white
      black2: "#E0E0E0", // light gray           
      grey: "#BDBDBD", // medium gray
      grey2: "#757575", // dark gray
      grey3: "#424242", // very dark gray
      grey4: "#212121", // almost black
      grey5: "#9E9E9E", // muted gray
    },
    extend: {},
  },
  plugins: [],
};
