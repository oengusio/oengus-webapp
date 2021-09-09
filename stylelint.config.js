module.exports = {
  extends: [
    'stylelint-config-standard',
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    // SCSS uses @rules. Some are unknown.
    'at-rule-no-unknown': null,
    'declaration-block-single-line-max-declarations': 0,
  },
};
