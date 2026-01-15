const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most blogs', () => {
  const emptyList = []

  const listWithOneBlog = [
    {
      _id: '401',
      title: 'Solo Adventures',
      author: 'Wafelka',
      url: 'http://example.com/solo',
      likes: 3,
      __v: 0
    }
  ]

  const listWithManyBlogs = [
    {
      _id: '501',
      title: 'Sugar Overload',
      author: 'Ponchik',
      url: 'http://example.com/sugar',
      likes: 5,
      __v: 0
    },
    {
      _id: '502',
      title: 'Soft & Fluffy',
      author: 'Bulochka',
      url: 'http://example.com/fluffy',
      likes: 12,
      __v: 0
    },
    {
      _id: '503',
      title: 'Crispy Layers',
      author: 'Wafelka',
      url: 'http://example.com/crispy',
      likes: 9,
      __v: 0
    },
    {
      _id: '504',
      title: 'Midnight Snack',
      author: 'Ponchik',
      url: 'http://example.com/snack',
      likes: 2,
      __v: 0
    },
    {
      _id: '505',
      title: 'Morning Coffee',
      author: 'Ponchik',
      url: 'http://example.com/coffee',
      likes: 4,
      __v: 0
    }
  ]

  test('of empty list is null', () => {
    const result = listHelper.mostBlogs(emptyList)
    assert.strictEqual(result, null)
  })

  test('when list has only one blog, that author is returned with blogs = 1', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)

    assert.deepStrictEqual(result, {
      author: 'Wafelka',
      blogs: 1
    })
  })

  test('of a bigger list returns the author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)

    assert.deepStrictEqual(result, {
      author: 'Ponchik',
      blogs: 3
    })
  })
})
