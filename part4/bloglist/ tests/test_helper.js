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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
}
