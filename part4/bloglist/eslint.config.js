const js = require('@eslint/js')
const globals = require('globals')

module.exports = [
  js.configs.recommended,
  { ignores: ['dist/**', 'build/**', 'coverage/**'] },

  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: { ...globals.node },
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },

  {
    files: ['tests/**/*.js'],
    languageOptions: {
      globals: { ...globals.node, ...globals.nodeTest },
    },
  },
]
