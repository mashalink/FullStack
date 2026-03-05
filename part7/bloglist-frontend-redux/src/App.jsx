import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import {
  createBlog,
  deleteBlog as deleteBlogAction,
  initializeBlogs,
  likeBlog as likeBlogAction,
} from "./reducers/blogsReducer";
import { showNotification } from "./reducers/notificationReducer";
import blogService from "./services/blogs";
import loginService from "./services/login";

const STORAGE_KEY = "loggedBlogappUser";

const App = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);

  const notify = (message, type = "info", seconds = 5) => {
    dispatch(showNotification(message, type, seconds));
  };

  useEffect(() => {
    const savedUserJSON = window.localStorage.getItem(STORAGE_KEY);
    if (savedUserJSON) {
      const savedUser = JSON.parse(savedUserJSON);
      setUser(savedUser);
      blogService.setToken(savedUser.token);
    }
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async ({ username, password }) => {
    try {
      const loggedInUser = await loginService.login({ username, password });
      setUser(loggedInUser);
      blogService.setToken(loggedInUser.token);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser));
      setUsername("");
      setPassword("");
      notify(`welcome back ${loggedInUser.name}`, "info");
    } catch (exception) {
      console.log(exception);
      notify("wrong credentials", "error");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setUsername("");
    setPassword("");
    blogService.setToken(null);
    notify("logged out", "info");
  };

  const blogFormRef = useRef();

  const addBlog = async (blogObject) => {
    try {
      const created = await dispatch(createBlog(blogObject));
      notify(
        `a new blog "${created.title}" by ${created.author} added`,
        "info",
        5,
      );
      blogFormRef.current?.toggleVisibility();
    } catch (exception) {
      console.log(exception);
      notify("error creating blog", "error", 5);
    }
  };

  const likeBlog = async (blog) => {
    try {
      const returned = await dispatch(likeBlogAction(blog));
      notify(`you liked "${returned.title}"`, "info", 4);
    } catch (exception) {
      console.log(exception);
      notify("failed to like blog", "error", 5);
    }
  };

  const deleteBlog = async (blog) => {
    const ok = window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`);
    if (!ok) return;

    try {
      await dispatch(deleteBlogAction(blog.id));
      notify(`blog "${blog.title}" removed`, "info", 4);
    } catch (exception) {
      console.log(exception);
      notify("failed to delete blog", "error", 5);
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          onLogin={handleLogin}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />

      <div>
        {user.name} logged in{" "}
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
        .map((blog) => {
          const canRemove =
            blog.user?.username === user.username || blog.user?.id === user.id;

          return (
            <Blog
              key={blog.id}
              blog={blog}
              onLike={() => likeBlog(blog)}
              onRemove={() => deleteBlog(blog)}
              canRemove={canRemove}
            />
          );
        })}
    </div>
  );
};

export default App;
