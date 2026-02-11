const { test, expect, beforeEach, describe } = require('@playwright/test')

const BACKEND = 'http://localhost:3003'
const FRONTEND = 'http://localhost:5173'

const login = async (page, username, password) => {
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, { title, author, url }) => {
  await page.getByRole('button', { name: 'create new blog' }).click()
  await page.getByLabel('title').fill(title)
  await page.getByLabel('author').fill(author)
  await page.getByLabel('url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
}

const openBlog = async (page, title) => {
  const blog = page.locator('.blog').filter({ hasText: title }).first()
  await expect(blog).toBeVisible()
  await blog.getByRole('button', { name: 'view' }).click()
  return blog
}

describe('Blog app', () => {
  test.describe.configure({ mode: 'serial' })
  beforeEach(async ({ page, request }) => {
    // reset DB
    await request.post(`${BACKEND}/api/testing/reset`)

    // create users
    await request.post(`${BACKEND}/api/users`, {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'password123',
      },
    })

    await request.post(`${BACKEND}/api/users`, {
      data: {
        name: 'Other User',
        username: 'otheruser',
        password: 'password123',
      },
    })

    // open app
    await page.goto(FRONTEND)
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page, 'testuser', 'password123')
      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await login(page, 'testuser', 'wrongpassword')
      await expect(page.getByText(/wrong credentials/i)).toBeVisible()
      await expect(page.getByText('Test User logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await login(page, 'testuser', 'password123')
      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, {
        title: 'Test Blog Title',
        author: 'Test Author',
        url: 'http://testblog.com',
      })

      const createdBlog = page.locator('.blog').filter({ hasText: 'Test Blog Title' }).first()
      await expect(createdBlog).toBeVisible()
      await expect(createdBlog.locator('.blogTitle')).toContainText('Test Blog Title')
      await expect(createdBlog.locator('.blogTitle')).toContainText('Test Author')
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, {
        title: 'Likeable Blog',
        author: 'Tester',
        url: 'http://like.com',
      })

      const blog = await openBlog(page, 'Likeable Blog')

      // likes should be visible inside details
      const likesLine = blog.locator('.blogDetails').getByText(/^likes\s+\d+/i)
      await expect(likesLine).toBeVisible()

      // read current likes number
      const beforeText = await likesLine.textContent()
      const before = Number(beforeText.match(/\d+/)[0])

      await blog.getByRole('button', { name: 'like' }).click()

      await expect(blog.locator('.blogDetails')).toContainText(`likes ${before + 1}`)
    })

    test('user who created a blog can delete it', async ({ page }) => {
      await createBlog(page, {
        title: 'Deletable Blog',
        author: 'Author',
        url: 'http://delete.com',
      })

      const blog = await openBlog(page, 'Deletable Blog')

      // accept window.confirm
      page.once('dialog', async (dialog) => {
        await dialog.accept()
      })

      await blog.getByRole('button', { name: 'delete' }).click()

      // verify blog card is removed from list
      await expect(page.locator('.blog').filter({ hasText: 'Deletable Blog' })).toHaveCount(0)
    })

    test('only creator sees delete button', async ({ page }) => {
      await createBlog(page, {
        title: 'Private Delete Blog',
        author: 'Author',
        url: 'http://private.com',
      })

      // logout
      await page.getByRole('button', { name: 'logout' }).click()

      // login as other user
      await login(page, 'otheruser', 'password123')
      await expect(page.getByText('Other User logged in')).toBeVisible()

      const blog = await openBlog(page, 'Private Delete Blog')

      // delete button should not exist at all (safer than "not visible")
      await expect(blog.getByRole('button', { name: 'delete' })).toHaveCount(0)
    })

    test('blogs are ordered by likes (most likes first)', async ({ page }) => {
      await createBlog(page, { title: 'Blog A', author: 'Author', url: 'http://a.com' })
      await createBlog(page, { title: 'Blog B', author: 'Author', url: 'http://b.com' })
      await createBlog(page, { title: 'Blog C', author: 'Author', url: 'http://c.com' })

      const blogA = await openBlog(page, 'Blog A')
      const blogB = await openBlog(page, 'Blog B')
      const blogC = await openBlog(page, 'Blog C')

      // A=2, B=1, C=0
      await blogA.getByRole('button', { name: 'like' }).click()
      await blogA.getByRole('button', { name: 'like' }).click()
      await blogB.getByRole('button', { name: 'like' }).click()

      // check order in DOM among our three blogs (ignore any seed/dev data)
      const titlesInDom = await page.$$eval('.blog', nodes => nodes.map(n => n.innerText))
      const idxA = titlesInDom.findIndex(text => text.includes('Blog A'))
      const idxB = titlesInDom.findIndex(text => text.includes('Blog B'))
      const idxC = titlesInDom.findIndex(text => text.includes('Blog C'))

      expect(idxA).toBeGreaterThan(-1)
      expect(idxB).toBeGreaterThan(-1)
      expect(idxC).toBeGreaterThan(-1)

      expect(idxA).toBeLessThan(idxB)
      expect(idxB).toBeLessThan(idxC)
    })
  })
})
