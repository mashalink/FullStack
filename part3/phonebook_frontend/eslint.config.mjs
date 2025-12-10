import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    extends: [js.configs.recommended],
    rules: {
      // Allow UPPER_SNAKE_CASE unused vars (e.g. React, constants etc.)
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      "no-unused-vars": "off"
    },
  },
  {
    ignores: ['dist/**'],
  },
])
