const generatePaths = require('./generate-paths')

const paths = generatePaths({ packageJsonFolderPath: process.env.INIT_CWD })
const { srcPath } = paths

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      classes: true,
      modules: true,
      legacyDecorators: true,
      jsx: true,
    },
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    mocha: true,
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'json'],
  extends: ['eslint:recommended', 'prettier'],
  globals: {},
  rules: {
    'eol-last': 0,
    'jsx-quotes': 1,
    'new-cap': 0,
    'no-console': 0,
    'no-debugger': 1,
    'no-underscore-dangle': 0,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { vars: 'local', args: 'none', ignoreRestSiblings: true }],
    'no-use-before-define': 0,
    'prefer-template': 1,
    'react/jsx-no-undef': 1,
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
    'space-before-blocks': 1,
    strict: 0,
    'no-useless-escape': 0,
    'getter-return': 0,
    curly: 'error',
    'react-hooks/rules-of-hooks': 'error',
  },
}
