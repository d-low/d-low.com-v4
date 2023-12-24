module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue',
  ],
  plugins: [
    'stylelint-order',
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
        ],
      },
    ],
    'import-notation': 'string',
    'media-feature-range-notation': 'prefix',
    'order/properties-alphabetical-order': true,
    'selector-class-pattern': null,
  },
};
