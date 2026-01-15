const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Ponchik learns testing',
    author: 'Ponchik',
    url: 'https://example.com/ponchik',
    likes: 7,
  },
  {
    title: 'Bulochka writes clean code',
    author: 'Bulochka',
    url: 'https://example.com/bulochka',
    likes: 12,
  },
  {
    title: 'Bublik and the mysteries of MongoDB',
    author: 'Bublik',
    url: 'https://example.com/bublik',
    likes: 5,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'temporary blog',
    author: 'Temp',
    url: 'https://example.com/temp',
    likes: 0,
  })

  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
}
