/* eslint no-undef: off */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],

  plugins: [],

  // Prefix tailwind class names with "tw-" to reduce conflicts
  // SEE: https://tailwindcss.com/docs/configuration#prefix
  prefix: 'tw-',

  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  theme: {
    extend: {},
  },
}

