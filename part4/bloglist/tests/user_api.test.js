const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)


describe('user creation', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHashes = await Promise.all(
            helper.initialUsers.map(async (user) => {
            const passwordHash = await bcrypt.hash(user.password, 10)
            return {
                username: user.username,
                name: user.name,
                passwordHash,
            }
            })
        )

        await User.insertMany(passwordHashes)
    })

    test('a valid user can be created', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
        username: 'waffle',
        name: 'Waffle',
        password: 'secretpass',
        }

        const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        
        // passwordHash MUST NOT be returned
        assert.strictEqual(response.body.passwordHash, undefined)
        assert.strictEqual(response.body.password, undefined)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map((u) => u.username)
        assert(usernames.includes('waffle'))
    })

    test('user without password is not created', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
        username: 'bulochka',
        name: 'Bulochka',
        // password missing
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('username shorter than 3 chars is rejected', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ab',
      name: 'TooShort',
      password: 'secretpass',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    assert(response.body.error)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('password shorter than 3 chars is rejected', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'bublik',
      name: 'Bublik',
      password: 'no',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    assert(response.body.error)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

   test('username must be unique', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: helper.initialUsers[0].username, // ponchik
      name: 'Imposter',
      password: 'secretpass',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    assert(response.body.error)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

describe('users with blogs (4.17)', () => {
  test('users returned by /api/users contain blogs array', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const user = response.body[0]
    assert(user.blogs)
    assert(Array.isArray(user.blogs))
  })
})

after(async () => {
  await mongoose.connection.close()
})
