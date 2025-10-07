// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["src/**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    ignores: [
      '.angular/**',
      'node_modules/**',
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/no-input-rename': 'off',
      '@angular-eslint/prefer-standalone': ['warn'],
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["src/**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    ignores: [
      '.angular/**',
      'node_modules/**',
    ],
    rules: {
      '@angular-eslint/template/no-inline-styles': ['error'],
      '@angular-eslint/template/elements-content': ['warn'],
      '@angular-eslint/template/click-events-have-key-events': ['warn'],
      '@angular-eslint/template/interactive-supports-focus': ['warn'],
    },
  }
);
