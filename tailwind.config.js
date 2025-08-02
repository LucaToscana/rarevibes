/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
        monoton: ["'Monoton'", "cursive"],
        arvo: ["'Arvo'", "serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        iron: "#D0D8D7",
        monza: "#dd1a1c",
        monzadark: "#b21514",
      },

      animation: {
        "fade-in": "fadeIn 0.5s ease-in forwards",
        "fade-in-lg": "fadeIn 1.5s ease-in forwards",

        shake: "shake 0.5s ease-in-out",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        shake: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "50%": { transform: "translateX(5px)" },
          "75%": { transform: "translateX(-5px)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
    // 👇 AGGIUNGI QUI SOTTO
    screens: {
      xxs: "400px", // 👈 breakpoint personalizzato (per iPhone SE e simili)
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
