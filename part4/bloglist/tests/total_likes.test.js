const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const emptyList = []

  const listWithOneBlog = [
    {
      _id: '111',
      title: 'Life of Ponchik',
      author: 'Ponchik',
      url: 'http://example.com/ponchik',
      likes: 7,
      __v: 0
    }
  ]

  const listWithManyBlogs = [
    {
      _id: '201',
      title: 'Sugar Overload',
      author: 'Ponchik',
      url: 'http://example.com/sugar',
      likes: 5,
      __v: 0
    },
    {
      _id: '202',
      title: 'Soft & Fluffy',
      author: 'Bulochka',
      url: 'http://example.com/fluffy',
      likes: 12,
      __v: 0
    },
    {
      _id: '203',
      title: 'Crispy Layers',
      author: 'Wafelka',
      url: 'http://example.com/crispy',
      likes: 1,
      __v: 0
    },
    {
      _id: '204',
      title: 'Midnight Snack',
      author: 'Ponchik',
      url: 'http://example.com/snack',
      likes: 2,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    assert.strictEqual(result, 0)
  })

  test('when list has one blog, equals the likes of that blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 7)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    assert.strictEqual(result, 20)
  })
})
