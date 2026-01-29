import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
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

  const handleLogin = async ({ username, password }) => {
    try {
      const loggedInUser = await loginService.login({ username, password })
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser))
      setUsername('')
      setPassword('')
      setNotification({ type: 'info', message: 'login successful' })
      setTimeout(() => setNotification(null), 5000)
    } catch {
      setNotification({ type: 'error', message: 'wrong credentials' })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(STORAGE_KEY)
    setUser(null)
    setUsername('')
    setPassword('')
    blogService.setToken(null)
    setNotification({ type: 'info', message: 'logged out' })
    setTimeout(() => setNotification(null), 5000)
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  const addBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setNotification({ type: 'info', message: `a new blog "${returnedBlog.title}" by ${returnedBlog.author} added` })
    setTimeout(() => setNotification(null), 5000)
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
      <BlogForm createBlog={addBlog} />
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
