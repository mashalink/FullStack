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


  console.log('User here:', blog.user)
  console.log('Name:', blog.user?.name)
  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title}{' '}
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
            {blog.author}{' '}
          </div>  
          <div>added by {blog.user?.name || blog.user?.username || 'unknown'}</div>
          {canRemove && (
            <button type="button" onClick={onRemove}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
