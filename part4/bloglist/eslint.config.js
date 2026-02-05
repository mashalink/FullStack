const js = require('@eslint/js')
const globals = require('globals')

module.exports = [
  js.configs.recommended,
  { ignores: ['node_modules/**', 'coverage/**'] },

  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: {
        ...globals.node,
      },
    },
  },

  {
    files: ['tests/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.nodeTest,
      },
    },
  },
]
