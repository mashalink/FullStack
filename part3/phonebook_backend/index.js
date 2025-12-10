require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

// parse JSON first
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
// custom token for body
morgan.token('body', (req) =>
  Object.keys(req.body || {}).length ? JSON.stringify(req.body) : ''
)
// log with body
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

// GET /info
app.get('/info', (request, response, next) => {
  Person.countDocuments({})
    .then((count) => {
      const date = new Date()
      response.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${date}</p>
      `)
    })
    .catch(next)
})
// GET all persons
app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons)
    })
    .catch(next)
})
// GET one person
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(next)
})
// DELETE person
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(next)
})
// POST person
app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({
      error: 'name or number missing',
    })
  }

  const person = new Person({ name, number })

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch(next)
})
// PUT - update person
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  )
    .then((updatedPerson) => {
      if (updatedPerson) {
        response.json(updatedPerson)
      } else {
        response.status(404).end()
      }
    })
    .catch(next)
})

const errorHandler = (error, req, res, next) => {
  console.error('ERROR:', error.name, error.message)

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  return res.status(500).json({ error: error.message })
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
