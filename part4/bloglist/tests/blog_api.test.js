const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

process.env.SECRET = process.env.SECRET || 'testsecret'

const api = supertest(app)

// Helpers
const loginAndGetToken = async (username, password) => {
  const res = await api
    .post('/api/login')
    .send({ username, password })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  return res.body.token
}

const createUser = async ({ username, name, password }) => {
  const passwordHash = await bcrypt.hash(password, 10)
  return new User({ username, name, passwordHash }).save()
}

// Test setup
let authToken
let defaultUser

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  defaultUser = await createUser({
    username: 'ponchik',
    name: 'Ponchik',
    password: 'secretpass',
  })

  authToken = await loginAndGetToken('ponchik', 'secretpass')

  const blogsWithUser = helper.initialBlogs.map((b) => ({ ...b, user: defaultUser._id }))
  const savedBlogs = await Blog.insertMany(blogsWithUser)

  defaultUser.blogs = savedBlogs.map((b) => b._id)
  await defaultUser.save()
})

// GET tests
describe('GET /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('blogs have an id field (not _id)', async () => {
    const response = await api.get('/api/blogs')
    assert(response.body[0].id)
  })
})

// POST tests
describe('POST /api/blogs', () => {
  test('a valid blog can be added (requires token)', async () => {
    const newBlog = {
      title: 'Ponchik struggles with async code',
      author: 'Ponchik',
      url: 'https://example.com/ponchik',
      likes: 7,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map((b) => b.title)
    assert(titles.includes(newBlog.title))
  })

  test('creating a blog fails with 401 if token is missing (4.23)', async () => {
    const newBlog = {
      title: 'No token blog',
      author: 'Anon',
      url: 'https://example.com/no-token',
      likes: 1,
    }

    await api.post('/api/blogs').send(newBlog).expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('if likes is missing, it defaults to 0', async () => {
    const newBlog = {
      title: 'Bulochka forgets likes',
      author: 'Bulochka',
      url: 'https://example.com/bulochka',
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
  })

  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'Bublik',
      url: 'https://example.com/bublik',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('blog without url is not added', async () => {
    const newBlog = {
      title: 'Bulochka forgets the URL again',
      author: 'Bulochka',
      likes: 12,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
})

// PUT tests
describe('PUT /api/blogs/:id', () => {
  test('likes of a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: blogToUpdate.likes + 1 })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, blogToUpdate.likes + 1)
  })

  test('blog can be fully updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blog = blogsAtStart[0]

    const updated = {
      title: 'Updated title',
      author: 'Updated author',
      url: 'https://updated.example.com',
      likes: 42,
    }

    const response = await api
      .put(`/api/blogs/${blog.id}`)
      .send(updated)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.title, updated.title)
    assert.strictEqual(response.body.author, updated.author)
    assert.strictEqual(response.body.url, updated.url)
    assert.strictEqual(response.body.likes, updated.likes)
  })

  test('updating a non-existing blog returns 404', async () => {
    const id = await helper.nonExistingId()

    await api
      .put(`/api/blogs/${id}`)
      .send({ title: 'Ghost', url: 'https://ghost.example.com', likes: 0 })
      .expect(404)
  })
})

// blog-user relationship tests
describe('blog-user relationship', () => {
  test('blogs returned by /api/blogs contain user info', async () => {
    const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)

    const blog = response.body[0]
    assert(blog.user)
    assert(blog.user.username)
    assert(blog.user.id)
  })

  test('creating a blog sets a creator user', async () => {
    const newBlog = {
      title: 'Creator is set',
      author: 'Bublik',
      url: 'https://example.com/creator-set',
      likes: 3,
    }

    const created = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert(created.body.user)
    assert(created.body.user.id)
  })
})

// delete tests
describe('DELETE /api/blogs/:id authorization', () => {
  test('creator can delete their own blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })

  test('deleting fails with 401 if token is missing', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('non-creator cannot delete the blog', async () => {
    await createUser({ username: 'other', name: 'Other', password: 'secretpass' })
    const otherToken = await loginAndGetToken('other', 'secretpass')

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0] // owned by defaultUser (ponchik)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${otherToken}`)
      .expect(403)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
