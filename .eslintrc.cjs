/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'airbnb-base',
    'plugin:vue/vue3-recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  settings: {
    // SEE: https://stackoverflow.com/questions/67835072/vue-3-on-vite-js-with-eslint-unable-to-resolve-path-to-module-eslintimport-no
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
      },
    },
  },
};
