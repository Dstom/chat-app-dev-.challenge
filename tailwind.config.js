
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    maxHeight:{
      '1/5': '80%'
    },
    extend: {
      colors: {
        'purple-mid': '#120F13',
        'purple-black': '#0B090C',
        'purple': '#252329',
        'true-gray': '#3C393F',
        'gris': '#828282'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar')
  ],
}
