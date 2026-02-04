require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const config = require('../utils/config')
const User = require('../models/user')
const Blog = require('../models/blog')

const seed = async () => {
  if (process.env.NODE_ENV !== 'development') {
    console.log('Refusing to seed: NODE_ENV is not development')
    process.exit(1)
  }

  console.log('Seeding DEV DB:', config.MONGODB_URI)

  await mongoose.connect(config.MONGODB_URI, { family: 4 })

  // ВАЖНО: для dev можно чистить, но только тут и только при NODE_ENV=development
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('secretpass', 10)
  const user = await new User({
    username: 'ponchik',
    name: 'Ponchik Dev',
    passwordHash,
  }).save()

  const blogs = await Blog.insertMany([
    {
      title: 'Dev blog 1',
      author: 'Ponchik',
      url: 'https://example.com/dev-1',
      likes: 1,
      user: user._id,
    },
    {
      title: 'Dev blog 2',
      author: 'Ponchik',
      url: 'https://example.com/dev-2',
      likes: 5,
      user: user._id,
    },
  ])

  user.blogs = blogs.map(b => b._id)
  await user.save()

  console.log(`Seed done. User=${user.username}, blogs=${blogs.length}`)

  await mongoose.connection.close()
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
