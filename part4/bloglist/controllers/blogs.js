const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// GET /api/blogs
blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

// POST /api/blogs
blogsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    const user = await User.findOne({})

    if (!user) {
      return response.status(400).json({ error: 'no users found, create a user first' })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    const populated = await savedBlog.populate('user', { username: 1, name: 1 })
    response.status(201).json(populated)
  } catch (error) {
    next(error)
  }
})


// DELETE /api/blogs/:id
blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(request.params.id)

    if (!deletedBlog) {
      return response.status(404).end()
    }

    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

// PUT /api/blogs/:id
blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { title, author, url, likes },
      {
        new: true,
        runValidators: true,
        context: 'query',
      }
    )

    if (!updatedBlog) {
      return response.status(404).end()
    }

    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
