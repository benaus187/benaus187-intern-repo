/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: { es2022: true, node: true, browser: true },
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended', // enables eslint-plugin-prettier + displays Prettier issues as ESLint errors
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  rules: {
    // Project‑friendly tweaks (adjust as needed)
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
  },
  settings: {
    // If you use path aliases or TS later, configure resolvers here
  },
};
