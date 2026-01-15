const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most likes', () => {
  const blogs = [
    {
      author: 'Ponchik',
      likes: 2
    },
    {
      author: 'Bulochka',
      likes: 5
    },
    {
      author: 'Ponchik',
      likes: 4
    },
    {
      author: 'Ponchik',
      likes: 6
    },
    {
      author: 'Bulochka',
      likes: 12
    },
    {
      author: 'Wafelka',
      likes: 3
    }
  ]

  test('returns the author with the highest total likes', () => {
    const result = listHelper.mostLikes(blogs)

    assert.deepStrictEqual(result, {
      author: 'Bulochka',
      likes: 17
    })
  })

  test('returns null for an empty list', () => {
    assert.strictEqual(listHelper.mostLikes([]), null)
  })
})
