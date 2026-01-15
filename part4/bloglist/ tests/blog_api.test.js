const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)

const { initialBlogs } = helper

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('blogs have an id field (not _id)', async () => {
  const response = await api.get('/api/blogs')
  assert(response.body[0].id)
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Ponchik struggles with async code',
    author: 'Ponchik',
    url: 'https://example.com/ponchik',
    likes: 7,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)

  assert.strictEqual(response.body.length, initialBlogs.length + 1)

  assert(contents.includes('Ponchik struggles with async code'))
})

test('if likes is missing, it defaults to 0', async () => {
  const newBlog = {
    title: 'Bulochka forgets likes',
    author: 'Bulochka',
    url: 'https://example.com/bulochka',
  }

  const response = await api
    .post('/api/blogs')
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
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('blog without url is not added', async () => {
  const newBlog = {
    title: 'Bulochka forgets the URL again',
    author: 'Bulochka',
    likes: 12,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogToDelete = blogsAtStart.body[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await api.get('/api/blogs')

  assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length - 1)

  const titles = blogsAtEnd.body.map(r => r.title)
  assert(!titles.includes(blogToDelete.title))
})

test('likes of a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedData = {
    likes: blogToUpdate.likes + 1,
  }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedData)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, blogToUpdate.likes + 1)
})

test('blog can be fully updated', async () => {
  const blog = (await helper.blogsInDb())[0]

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

  assert.strictEqual(response.body.title, updated.title)
})

after(async () => {
  await mongoose.connection.close()
})  