/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
        monoton: ["'Monoton'", 'cursive'],
        arvo: ["'Arvo'", 'serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        iron: '#D0D8D7',
        monza: '#dd1a1c',
        monzadark: '#b21514',
      },
    
      animation: {
        'fade-in': 'fadeIn 1.5s ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
