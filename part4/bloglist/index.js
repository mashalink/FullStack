require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./app')

const mongoUrl = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
console.log('connecting to', mongoUrl)

mongoose
  .connect(mongoUrl, { family: 4 })
  .then(() => {
    console.log('connected to MongoDB')

    const PORT = process.env.PORT || 3003
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
