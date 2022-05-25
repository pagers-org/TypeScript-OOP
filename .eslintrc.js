module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        useTabs: false,
        tabWidth: 2,
        printWidth: 120,
        bracketSpacing: true,
        arrowParens: 'avoid',
      },
    ],
    '@typescript-eslint/no-var-requires': 0,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 12,
    sourceType: 'module',
  },
};
