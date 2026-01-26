// eslint.config.js
const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  { ignores: ["node_modules/**", "dist/**", "build/**", "coverage/**"] },

  // Обычный код Node
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        ...globals.node,
      },
    },
  },

  // Тесты под node --test
  {
    files: ["tests/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.nodeBuiltin, // на всякий случай
        ...globals.nodeTest,    // <-- вот это главное
      },
    },
  },
];
