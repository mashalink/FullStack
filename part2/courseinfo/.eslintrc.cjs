// .eslintrc.cjs
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  plugins: ["react", "react-refresh"],
  settings: { react: { version: "detect" } },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react-refresh/only-export-components": "warn",
  },
  ignorePatterns: ["dist"],
  overrides: [
    {
      files: ["*.cjs"],
      env: { node: true },
      rules: { "no-undef": "off" },
    },
  ],
};
