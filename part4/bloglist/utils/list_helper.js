const dummy = (blogs) => {
   return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  return blogs.reduce((favorite, blog) => {
    return blog.likes > favorite.likes ? blog : favorite
  }, blogs[0])
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const countByAuthor = {}

  blogs.forEach(blog => {
    countByAuthor[blog.author] = (countByAuthor[blog.author] || 0) + 1
  })

  let topAuthor = null
  let maxBlogs = 0

  for (const author in countByAuthor) {
    if (countByAuthor[author] > maxBlogs) {
      maxBlogs = countByAuthor[author]
      topAuthor = author
    }
  }

  return {
    author: topAuthor,
    blogs: maxBlogs
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const likesByAuthor = {}

  blogs.forEach(blog => {
    likesByAuthor[blog.author] =
      (likesByAuthor[blog.author] || 0) + blog.likes
  })

  let topAuthor = null
  let maxLikes = 0

  for (const author in likesByAuthor) {
    if (likesByAuthor[author] > maxLikes) {
      maxLikes = likesByAuthor[author]
      topAuthor = author
    }
  }

  return {
    author: topAuthor,
    likes: maxLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}