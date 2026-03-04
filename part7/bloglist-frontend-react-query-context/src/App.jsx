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
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUserJSON = window.localStorage.getItem(STORAGE_KEY)
    if (savedUserJSON) {
      const user = JSON.parse(savedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const [notification, setNotification] = useState(null)
  const notificationTimeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) clearTimeout(notificationTimeoutRef.current)
    }
  }, [])

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

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async ({ username, password }) => {
    try {
      const loggedInUser = await loginService.login({ username, password })
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser))
      setUsername('')
      setPassword('')
      notify(`welcome back ${loggedInUser.name}`, 'info')
    } catch (exception) {
      console.log(exception)
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

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(prev => prev.concat(returnedBlog))
      notify(`a new blog "${returnedBlog.title}" by ${returnedBlog.author} added`, 'info')
      blogFormRef.current?.toggleVisibility()
    }
    catch (exception) {
      console.log(exception)
      notify('error creating blog', 'error')
    }
  }

  const likeBlog = async (blog) => {
    try {
      const userIdOrObj = blog.user?.id ?? blog.user ?? null

      const updatedObject = {
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
        ...(userIdOrObj ? { user: userIdOrObj } : {}),
      }

      const returned = await blogService.update(blog.id, updatedObject)

      setBlogs(prev =>
        prev.map(b => (b.id === blog.id ? returned : b))
      )

      notify(`you liked "${blog.title}"`, 'info')
    } catch (exception) {
      console.log(exception)
      notify('failed to like blog', 'error')
    }
  }

  const deleteBlog = async (blog) => {
    const ok = window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)
    if (!ok) return

    try {
      await blogService.remove(blog.id)
      setBlogs(prev => prev.filter(b => b.id !== blog.id))
      notify(`blog "${blog.title}" removed`, 'info')
    }
    catch (exception) {
      console.log(exception)
      notify('failed to delete blog', 'error')
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
      {[...blogs]
        .sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0))
        .map(blog => {
          const canRemove =
            blog.user?.username === user.username ||
            blog.user?.id === user.id

          return (
            <Blog
              key={blog.id}
              blog={blog}
              onLike={() => likeBlog(blog)}
              onRemove={() => deleteBlog(blog)}
              canRemove={canRemove}
            />
          )
        })}
    </div>
  )
}

export default App
