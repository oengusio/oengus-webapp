module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    // Possible Errors

    // Best Practices

    // Strict Mode

    // Variables

    // Stylistic Issues
    'array-bracket-spacing': [ 'error', 'always' ],
    'comma-dangle': [ 'error', 'always-multiline' ],
    'object-curly-spacing': [ 'error', 'always' ],
    'quote-props': [ 'error', 'consistent-as-needed' ],
    'semi': [ 'error', 'always' ],
    'space-before-function-paren': [ 'error', { anonymous: 'always', named: 'never' } ],

    // ES6
  },
};
