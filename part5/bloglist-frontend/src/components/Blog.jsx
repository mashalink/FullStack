import { useState } from 'react'

const Blog = ({ blog }) => {
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
            <button type="button">like</button>
            <br />
            {blog.author}{' '}
          </div>
          {/* вроде позже info о пользователе и кнопка remove */}
        </div>
      )}
    </div>
  )
}

export default Blog
