module.exports = {
  extends: [
    'stylelint-config-standard',
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'at-rule-empty-line-before': [
      'always',
      {
        except: [ 'blockless-after-same-name-blockless', 'first-nested' ],
        ignore: [ 'after-comment' ],
        ignoreAtRules: [ 'if', 'else' ],
      },
    ],
    // SCSS uses @rules. Some are unknown.
    'at-rule-no-unknown': null,
    'block-closing-brace-newline-after': [
      'always',
      {
        ignoreAtRules: [ 'if', 'else' ],
      },
    ],
    'declaration-block-single-line-max-declarations': 0,
    // Until Bulma moves to @use, sometimes we'll need to mix @use and @import
    'no-invalid-position-at-import-rule': null,
    // Allow ::v-deep ( >>> and /deep/ both fail more fundamentally )
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: [ 'v-deep' ],
      },
    ],
  },
};
