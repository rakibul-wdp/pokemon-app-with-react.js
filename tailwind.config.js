/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        pokemontheme: {
          primary: '#0075BE',
          secondary: '#0A285F',
          accent: '#FFCC00',
          neutral: '#3d4451',
          'base-100': '#ffffff',
        },
      },
      'dark',
      'cupcake',
    ],
  },
  plugins: [require('daisyui')],
};
