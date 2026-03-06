import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Routes, Route, Link, Navigate } from "react-router-dom";

import BlogForm from "./components/BlogForm";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import { useAuth } from "./hooks/useAuth";
import { useBlogs } from "./hooks/useBlogs";

import { initializeBlogs } from "./reducers/blogsReducer";
import { initializeUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);

  const { addBlog, likeBlog, deleteBlog } = useBlogs();
  const {
    username,
    password,
    setUsername,
    setPassword,
    handleLogin,
    handleLogout,
  } = useAuth();

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogFormRef = useRef();

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
        <BlogForm createBlog={(blog) => addBlog(blog, blogFormRef)} />
      </Togglable>

      <br />

      <Users />

      <Blogs
        blogs={blogs}
        user={user}
        onLike={likeBlog}
        onRemove={deleteBlog}
      />

      <br />
    </div>
  );
};

export default App;
