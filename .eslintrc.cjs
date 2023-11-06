module.exports = {
  extends: 'airbnb-base',
  env: {
    es6: true,
    browser: true,
  },
  rules: {
    'import/extensions': 'off',
    camelcase: 'off',
    'no-restricted-globals': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 2,
    'object-curly-newline': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
  ignorePatterns: ['**/node_modules/**', '**/dist/**'],
};
