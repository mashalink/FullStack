import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useNotification } from "./contexts/NotificationContext";
import { useUser } from "./contexts/UserContext";
import blogService from "./services/blogs";
import loginService from "./services/login";

const STORAGE_KEY = "loggedBlogappUser";

const App = () => {
  const { user, login, logout } = useUser();
  const { notify } = useNotification();

  const queryClient = useQueryClient();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async ({ username, password }) => {
    try {
      const loggedInUser = await loginService.login({ username, password });
      login(loggedInUser);
      setUsername("");
      setPassword("");
      notify(`welcome back ${loggedInUser.name}`, "info");
    } catch (exception) {
      console.log(exception);
      notify("wrong credentials", "error");
    }
  };

  const handleLogout = () => {
    queryClient.removeQueries({ queryKey: ["blogs"] });
    logout();
    setUsername("");
    setPassword("");
    notify("logged out", "info");
  };

  const blogsQuery = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    enabled: !!user,
  });

  const blogs = blogsQuery.data ?? [];

  const blogFormRef = useRef();

  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (created) => {
      queryClient.setQueryData(["blogs"], (old = []) => old.concat(created));
      notify(
        `a new blog "${created.title}" by ${created.author} added`,
        "info",
        5,
      );
      blogFormRef.current?.toggleVisibility();
    },
    onError: () => {
      notify("error creating blog", "error", 5);
    },
  });

  const addBlog = (blogObject) => {
    createBlogMutation.mutate(blogObject);
  };

  const likeBlogMutation = useMutation({
    mutationFn: ({ id, updatedObject }) =>
      blogService.update(id, updatedObject),
    onSuccess: (updated) => {
      queryClient.setQueryData(["blogs"], (old = []) =>
        old.map((b) => (b.id === updated.id ? updated : b)),
      );
      notify(`you liked "${updated.title}"`, "info", 4);
    },
    onError: () => notify("failed to like blog", "error", 5),
  });

  const likeBlog = (blog) => {
    const userIdOrObj = blog.user?.id ?? blog.user ?? null;

    const updatedObject = {
      likes: (blog.likes ?? 0) + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      ...(userIdOrObj ? { user: userIdOrObj } : {}),
    };

    likeBlogMutation.mutate({ id: blog.id, updatedObject });
  };

  const deleteBlogMutation = useMutation({
    mutationFn: (id) => blogService.remove(id),
    onSuccess: (_data, id) => {
      queryClient.setQueryData(["blogs"], (old = []) =>
        old.filter((b) => b.id !== id),
      );
    },
    onError: () => notify("failed to delete blog", "error", 5),
  });

  const deleteBlog = (blog) => {
    const ok = window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`);
    if (!ok) return;

    deleteBlogMutation.mutate(blog.id, {
      onSuccess: () => notify(`blog "${blog.title}" removed`, "info", 4),
    });
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

  if (blogsQuery.isLoading) return <div>loading...</div>;
  if (blogsQuery.isError) return <div>failed to load blogs</div>;

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
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
