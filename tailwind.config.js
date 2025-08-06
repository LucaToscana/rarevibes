/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        arvo: ["'Arvo'", "serif"]
      },
      colors: {
        iron: "#D0D8D7",
        monza: "#dd1a1c",
        monzadark: "#b21514",
      },

      animation: {
        "fade-in": "fadeIn 0.5s ease-in forwards",
        "fade-in-lg": "fadeIn 1.5s ease-in forwards",
        'slide': 'slide 20s linear infinite',
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },  
        slide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }, // metà larghezza perché abbiamo duplicato le slide
        },
      },
    },
    screens: {
      xxs: "400px", 
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
