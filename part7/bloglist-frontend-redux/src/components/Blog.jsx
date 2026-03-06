import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useBlogs } from '../hooks/useBlogs'

const Blog = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const blogs = useSelector((state) => state.blogs)
  const currentUser = useSelector((state) => state.user)

  const [comment, setComment] = useState('')

  const blog = blogs.find((b) => b.id === id)
  const { likeBlog, deleteBlog, commentBlog } = useBlogs()

  if (!blog) {
    return <div>blog not found</div>
  }

  const canRemove =
    blog.user?.username === currentUser?.username ||
    blog.user?.id === currentUser?.id

  const handleDelete = async () => {
    await deleteBlog(blog)
    navigate('/')
  }

  const handleCommentSubmit = async (event) => {
    event.preventDefault()

    const cleanComment = comment.trim()
    if (!cleanComment) return

    await commentBlog(blog, cleanComment)
    setComment('')
  }

  return (
    <div>
      <h1>{blog.title}</h1>

      <a href={blog.url} target="_blank" rel="noopener noreferrer">
        {blog.url}
      </a>

      <div>
        likes {blog.likes}{' '}
        <button type="button" onClick={() => likeBlog(blog)}>
          like
        </button>
      </div>

      <div>added by {blog.user?.name || blog.user?.username || 'unknown'}</div>

      <div>
        {canRemove && (
          <div>
            <button type="button" onClick={handleDelete}>
              delete
            </button>
          </div>
        )}
      </div>

      <h3>comments</h3>

      <form onSubmit={handleCommentSubmit}>
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>

      <ul>
        {blog.comments?.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
