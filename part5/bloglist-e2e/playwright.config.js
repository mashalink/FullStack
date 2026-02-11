const { defineConfig } = require('@playwright/test')

module.exports = defineConfig({
  testDir: './tests',
  workers: 1,
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
  },
})
