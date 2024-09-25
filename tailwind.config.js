/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      pink: {
        50: '#AADBC6',
        100: '#A5B3AD',
        200: '#A28995',
        300: '#995F7E',
        400: '#903E6B',
        500: '#86215D',
        600: '#7B1B58',
        700: '#6D1451',
        800: '#600849',
        900: '#4A013F',
      },
      jpink: {
        100: '#D175A5',
        400: '#D42F94',
        200: '#CF008B',
        700: '#BB008C',
      },
    },
    fontFamily: {
      cooper: ['CooperBlack'],
      serif: ['Roboto Serif', 'Georgia', 'ui-serif'],
    },
  },
  plugins: [],
};
