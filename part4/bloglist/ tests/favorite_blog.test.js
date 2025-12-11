const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
  const emptyList = []

  const listWithManyBlogs = [
    {
      _id: '301',
      title: 'Sugar Overload',
      author: 'Ponchik',
      url: 'http://example.com/sugar',
      likes: 5,
      __v: 0
    },
    {
      _id: '302',
      title: 'Soft & Fluffy',
      author: 'Bulochka',
      url: 'http://example.com/fluffy',
      likes: 12,
      __v: 0
    },
    {
      _id: '303',
      title: 'Crispy Layers',
      author: 'Wafelka',
      url: 'http://example.com/crispy',
      likes: 9,
      __v: 0
    }
  ]

  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog(emptyList)
    assert.strictEqual(result, null)
  })

  test('of a list is the one with most likes', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)

    const expected = {
      _id: '302',
      title: 'Soft & Fluffy',
      author: 'Bulochka',
      url: 'http://example.com/fluffy',
      likes: 12,
      __v: 0
    }

    assert.deepStrictEqual(result, expected)
  })
})
