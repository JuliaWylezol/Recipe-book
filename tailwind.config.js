// const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'accent-1': '#333'
      },
      fontFamily: {
        nav: ['Indie Flower']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
