import { transform } from "framer-motion";

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
        mlg: { max: "1200px" },
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
        hover: "#FF7782",
        "border-info-color": "#757f9540",
        "border-white-color": "#ffffff14",
        "footer-bg": "#071B36",
        "footer-text-color": " #F5FAFF",
      },
      backgroundImage: {
        "hero-img": "url(./assets/bg.jpg)",
      },

      keyframes: {
        fadeinkey: {
          "0%": {
            transform: "scale(0)",
            visibility: "hidden",
            opacity: 0,
          },

          "100%": {
            transform: "scale(1)",
            visibility: "visible",
            opacity: 1,
          },
        },
        fadeoutkey: {
          "0%": {
            visibility: "visible",
            opacity: 1,
          },
          
          "100%": { visibility: "hidden", opacity: 0 },
        },
        floatkey: {
          "0,100%": {
            transform: "translate(0,0)",
          },
          
          "50%": {
            transform: "translate(0,10px)",
          },
        },
        counterspin: {
          to: {
            transform: "rotate(-360deg) ",
          },
        },
        clockspin: {
          to: {
            transform: "rotate(360deg) ",
          },
        },
        successkey: {
          "0%": {
            transform: "translate(0,100px)",
            visibility: "hidden",
            opacity: 0,
          },

          "100%": {
            transform: "translate(0,0)",
            visibility: "visible",
            opacity: 1,
          },
        },
        fadeinoutkey: {
          "0,100%": {  
            visibility: "visible",
            opacity: 1,
          },

          "50%": {                   
            visibility: "hidden",
            opacity: 0,
          },
        },
      },
      animation: {
        fadein: "fadeinkey 300ms ",
        fadeout: "fadeoutkey 300ms",
        float: "floatkey 3s ease-in-out infinite",
        counterspin: "counterspin 2s infinite",
        successpayment: "successkey 1s ease-in-out",
        fadeinout: "fadeinoutkey 1s ease-in-out infinite",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
      addVariant("inputs", "& input");
      addVariant("button", "& button");
      addVariant("select", "& select");
      addVariant("link", "& a");
    },
  ],
};
