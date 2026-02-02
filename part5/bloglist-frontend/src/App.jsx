import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const STORAGE_KEY = 'loggedBlogappUser'




const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUserJSON = window.localStorage.getItem(STORAGE_KEY)
    if (savedUserJSON) {
      const user = JSON.parse(savedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  
  const notificationTimeoutRef = useRef(null)
  const notify = (message, type = 'info', seconds = 5) => {
  setNotification({ message, type })

  if (notificationTimeoutRef.current) {
    clearTimeout(notificationTimeoutRef.current)
  }

  notificationTimeoutRef.current = setTimeout(() => {
    setNotification(null)
    notificationTimeoutRef.current = null
  }, seconds * 1000)
}

  const handleLogin = async ({ username, password }) => {
    try {
      const loggedInUser = await loginService.login({ username, password })
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser))
      setUsername('')
      setPassword('')
      notify(`welcome back ${loggedInUser.name}`, 'info')
    } catch {
      notify('wrong credentials', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(STORAGE_KEY)
    setUser(null)
    setUsername('')
    setPassword('')
    blogService.setToken(null)
    notify('logged out', 'info')
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  const addBlog = async (blogObject) => {
    try {
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    notify(`a new blog "${returnedBlog.title}" by ${returnedBlog.author} added`, 'info')
    blogFormRef.current.toggleVisibility()
    }
    catch (exception) {
      console.log(exception)
      notify('error creating blog', 'error')
    }
  } 

  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          onLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />
      <div>{user.name} logged in
        <button type="button" onClick={handleLogout}>
            logout
          </button>
      </div>
      <br />
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
