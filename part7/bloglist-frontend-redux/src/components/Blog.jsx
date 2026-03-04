import { useState } from 'react'

const Blog = ({ blog, onLike, onRemove, canRemove }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleDetails = () => {
    setShowDetails(prev => !prev)
  }

  const onDelete = () => {
    if (onRemove) {
      onRemove(blog)
    }
  }

  const showDelete = canRemove

  return (
    <div style={blogStyle} className="blog">
      <div className="blogTitle">
        {blog.title}{' by '}{blog.author}{' '}
        <button type="button" onClick={toggleDetails}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>

      {showDetails && (
        <div className="blogDetails">
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{' '}
            <button type="button" onClick={onLike}>like</button>
            <br />
          </div>
          <div>added by {blog.user?.name || blog.user?.username || 'unknown'}</div>
        </div>
      )}

      {showDelete && (
        <button onClick={onDelete}>delete</button>
      )}
    </div>
  )
}

export default Blog
