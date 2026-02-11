const { test, expect, beforeEach, describe } = require('@playwright/test')

const BACKEND = 'http://localhost:3003'
const FRONTEND = 'http://localhost:5173'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post(`${BACKEND}/api/testing/reset`)

    await request.post(`${BACKEND}/api/users`, {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'password123',
      },
    })

    await page.goto(FRONTEND)
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('testuser')
      await page.getByLabel('password').fill('password123')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('testuser')
      await page.getByLabel('password').fill('wrongpassword')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText(/wrong credentials/i)).toBeVisible()
      await expect(page.getByText('Test User logged in')).not.toBeVisible()
    })
  })
})
