import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const STORAGE_KEY = 'loggedBlogappUser'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUserJSON = window.localStorage.getItem(STORAGE_KEY)
    if (savedUserJSON) {
      const user = JSON.parse(savedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async ({ username, password }) => {
  try {
    const loggedInUser = await loginService.login({ username, password })
    setUser(loggedInUser)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser))
    setUsername('')
    setPassword('')
  } catch {
    console.log('wrong credentials') // TODO: replace with notification component
  }
}

const handleLogout = () => {
    window.localStorage.removeItem(STORAGE_KEY)
    setUser(null)
    setUsername('')
    setPassword('')
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  if (user === null) {
    return (
      <div>
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
      <div>{user.name} logged in
      <button type="button" onClick={handleLogout}>
          logout
        </button>
      </div>
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
