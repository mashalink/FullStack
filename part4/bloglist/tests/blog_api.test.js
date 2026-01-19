const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')

process.env.SECRET = process.env.SECRET || 'testsecret'

const api = supertest(app)
let authToken

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('secretpass', 10)
  const user = await new User({ username: 'ponchik', name: 'Ponchik', passwordHash }).save()

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'ponchik', password: 'secretpass' })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  authToken = loginResponse.body.token

  const blogsWithUser = helper.initialBlogs.map(b => ({ ...b, user: user._id }))
  const savedBlogs = await Blog.insertMany(blogsWithUser)

  user.blogs = savedBlogs.map(b => b._id)
  await user.save()
})

describe('GET /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
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

describe('POST /api/blogs', () => {
  test('a valid blog can be added', async () => {
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

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    assert(titles.includes(newBlog.title))
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

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
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

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })
})

describe('DELETE /api/blogs/:id', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert(!titles.includes(blogToDelete.title))
  })
})

describe('PUT /api/blogs/:id', () => {
  test('likes of a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedData = { likes: blogToUpdate.likes + 1 }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedData)
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
  const nonExistingId = await helper.nonExistingId()

  const updatedData = {
    title: 'This will not be saved',
    author: 'Ghost',
    url: 'https://ghost.example.com',
    likes: 0,
  }

  await api
    .put(`/api/blogs/${nonExistingId}`)
    .send(updatedData)
    .expect(404)
})
})

describe('blog-user relationship (4.17)', () => {
  test('blogs returned by /api/blogs contain user info', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blog = response.body[0]
    assert(blog.user)
    assert(blog.user.username)
    assert(blog.user.id)
  })

  test('creating a blog sets a creator user', async () => {
    const newBlog = {
      title: 'Bublik accidentally becomes an author',
      author: 'Bublik',
      url: 'https://example.com/bublik-author',
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

describe('blog creation with token', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secretpass', 10)

    await User.create({
      username: 'ponchik',
      name: 'Ponchik',
      passwordHash,
    })
  })

  const loginAndGetToken = async () => {
    const response = await api
      .post('/api/login')
      .send({ username: 'ponchik', password: 'secretpass' })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    return response.body.token
  }

  test('login returns a token', async () => {
    const token = await loginAndGetToken()
    assert(token)
  })

  test('creating a blog fails with 401 if token is missing', async () => {
    const newBlog = {
      title: 'Ponchik forgets the token',
      author: 'Ponchik',
      url: 'https://example.com/ponchik',
      likes: 1,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, 0)
  })

  test('a blog can be created with a valid token', async () => {
    const token = await loginAndGetToken()

    const newBlog = {
      title: 'Ponchik finally uses tokens',
      author: 'Ponchik',
      url: 'https://example.com/ponchik-token',
      likes: 7,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert(titles.includes('Ponchik finally uses tokens'))
  })
})

after(async () => {
  await mongoose.connection.close()
})
