/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2596BE',
        'primary-dark': '#2187AC',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
};
