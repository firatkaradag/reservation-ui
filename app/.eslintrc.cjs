/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    'indent': [2, 2, {
      'SwitchCase': 1,
      'offsetTernaryExpressions': true
    }]
  },
  "overrides": [
    {
      "files": [ "src/**/*.ts" ],
    }
  ],
  root: true,
};