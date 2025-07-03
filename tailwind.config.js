/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 8s linear infinite",
        fadeIn: "fadeIn 0.5s ease-out",
        zoomIn: "zoomIn 0.5s ease-out",
      },
      keyframes: {
        zoomIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
      colors: {
        primary: "#8B3DCC",
        sub2: "var(--sub2)",
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
