/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto, sans-serif",
      },
      backgroundImage: {
        landingPage:
          "url(https://i.pinimg.com/564x/d4/01/f1/d401f114fbaab167a6d5547fd5eb0932.jpg)",
      },

      colors: {
        gray: {
          500: "#27272B",
          600: "#121214",
          700: "#37373F;",
        },
        ligthGreen: {
          400: "#00CE00",
          500: "#1FFF1F",
        },
        purple: {
          500: "#9E63FF",
        },
      },
      fontSize: {
        xl: 40,
      },

      keyframes: {
        shineNspin: {
          "0%": { transform: " rotate(0deg)" },

          "50%": { transform: " rotate(180deg)" },
          "50%": { colors: "#ff00ff" },
          "100%": { transform: " rotate(360deg)" },
        },
      },
      animation: {
        shineNspin: "shineNspin 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
