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
    // colors: {
    //   primary: "#4acd8d",
    //   secondary: "#00FF00",
    //   tertiary: "#0000FF",
    //   black: "#13131a",
    //   grey: "#818183",
    //   grey2: "#4b5264",
    //   grey3: "#3a3a43",
    //   grey4: "#2c2f32",
    //   grey5: "#1c1c24",
    // },
    extend: {},
  },
  plugins: [],
};
