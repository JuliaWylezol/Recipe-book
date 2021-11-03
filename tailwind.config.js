// const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        200: '52rem'
      },
      colors: {
        'accent-1': '#333'
      },
      fontFamily: {
        nav: ['Indie Flower']
      },
      keyframes: {
        drop: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(200px)' }
        }
      },
      animation: {
        drop: 'drop 1s ease-in-out forwards'
      }
    },
    variants: {
      extend: {}
    },
    plugins: []
  }
};
