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

    // Vue
    // Due to the way our translation works, it's not possible to avoid v-html
    'vue/no-v-html': 'off',
  },

  overrides: [
    {
      files: [
        'types/**/*.d.ts',
      ],
      rules: {
        // The API like recursions. Recursions either require circular imports and many files or use before define.
        // Since it's just type definitions that are excluded, there is no risk towards generated code.
        'no-use-before-define': 'off',
      },
    },
  ],
};
