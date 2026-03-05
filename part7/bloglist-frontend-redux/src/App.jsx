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
import { initializeUser, loginUser, logoutUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);

  const notify = (message, type = "info", seconds = 5) => {
    dispatch(showNotification(message, type, seconds));
  };

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async ({ username, password }) => {
    try {
      const loggedInUser = await dispatch(loginUser({ username, password }));
      setUsername("");
      setPassword("");
      notify(`welcome back ${loggedInUser.name}`, "info", 5);
    } catch (exception) {
      console.log(exception);
      notify("wrong credentials", "error", 5);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setUsername("");
    setPassword("");
    notify("logged out", "info", 4);
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

  const deleteBlog = (blog) => {
    const ok = window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`);
    if (!ok) return;

    dispatch(deleteBlogAction(blog.id));
    notify(`blog "${blog.title}" removed`, "info", 4);
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
