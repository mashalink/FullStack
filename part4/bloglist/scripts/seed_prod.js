require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const config = require('../utils/config')
const User = require('../models/user')
const Blog = require('../models/blog')

const seedProd = async () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Refusing to seed prod: NODE_ENV is not production')
    process.exit(1)
  }

  console.log('Seeding PROD DB (safe mode)')
  await mongoose.connect(config.MONGODB_URI, { family: 4 })

  // ❌ НИКАКИХ deleteMany

  const existing = await User.findOne({ username: 'demo' })
  if (existing) {
    console.log('Demo user already exists, skipping seed')
    process.exit(0)
  }

  const passwordHash = await bcrypt.hash('demopass', 10)

  const demoUser = await new User({
    username: 'demo',
    name: 'Demo User',
    passwordHash,
  }).save()

  const blogs = []

  for (let i = 1; i <= 20; i++) {
    blogs.push({
      title: `Demo blog ${i}`,
      author: `Author ${i % 5}`,
      url: `https://example.com/demo-${i}`,
      likes: Math.floor(Math.random() * 50),
      user: demoUser._id,
    })
  }

  const savedBlogs = await Blog.insertMany(blogs)
  demoUser.blogs = savedBlogs.map(b => b._id)
  await demoUser.save()

  console.log(`Seeded PROD demo data: ${savedBlogs.length} blogs`)
  await mongoose.connection.close()
}

seedProd().catch(err => {
  console.error(err)
  process.exit(1)
})
