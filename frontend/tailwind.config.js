/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
        Barlow: ["Barlow", "sans-serif"],
      },
      screens: {
        vsm: "400px",
        // "2xl": { max: "1535px" },
        // // => @media (max-width: 1535px) { ... }

        // xl: { max: "1279px" },

        // // => @media (max-width: 1279px) { ... }

        // lg: { max: "1023px" },
        // // => @media (max-width: 1023px) { ... }

        // md: { max: "767px" },
        // // => @media (max-width: 767px) { ... }

        // sm: { max: "639px" },
        // // => @media (max-width: 639px) { ... }
      },
      colors: {
        "body-bg": "#061224",
        "body-text-color": "#7386a8",
        "heading-color": "#E8EAED",
        "theme-color": "#00A3FF",
        "theme-bg": "#071B36",
        "theme-bg2": "#0E294D",
        "theme-bg-light": "#0c2547",
        "theme-color-light": "#ffffff99",
        "color-white": "#ffffff",
        "color-dark": "#181C32",
        "color-success": "#10B981",
        "color-primary": "#29B6F6",
        "color-info": "#8358FF",
        "color-danger": "#FF7782",
        "color-warning": "#FFBB55",
        "color-secondary": "#E9ECEF",

        "border-info-color": "#757f9540",
        "border-white-color": "#ffffff14",
        "footer-bg": "#071B36",
        "footer-text-color": " #F5FAFF",
        // "button-primary": "#00a3ff",
      },
    },
  },
  plugins: [],
};
