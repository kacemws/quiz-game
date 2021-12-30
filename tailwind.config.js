const defaultColors = require("tailwindcss/colors");
const colors = {
  current: "currentColor",
  primary: {
    100: "#61E5C6",
    200: "#2CDDB4",
    300: "#1CAF8D",
    400: "#178C71",
    500: "#116955",
  },
  secondary: {
    100: "#FEE086",
    200: "#FDD55D",
    300: "#FDC627",
    400: "#FDC10D",
    500: "#F2B602",
  },
  blackText: {
    100: "#181818",
    200: "#181818",
    300: "#181818",
    400: "#181818",
    500: "#181818",
  },
  whiteText: {
    100: "#FEFEFE",
    200: "#FEFEFE",
    300: "#FEFEFE",
    400: "#FEFEFE",
    500: "#FEFEFE",
  },
  neutral: {
    100: "#FFFFFF",
    200: "#F4F5F7",
    300: "#E1E1E1",
    400: "#737581",
    500: "#4A4B53",
    600: "#000000",
  },
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {},
    colors: {
      ...defaultColors,
      ...colors,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
