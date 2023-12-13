/* eslint no-undef: off */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  plugins: [],

  // Prefix tailwind class names with "tw-" to reduce conflicts
  // SEE: https://tailwindcss.com/docs/configuration#prefix
  prefix: 'tw-',

  theme: {
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
      },
    },
  },
}

