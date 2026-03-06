import { useRef } from "react";

import BlogForm from "./BlogForm";
import Blogs from "./Blogs";
import Togglable from "./Togglable";

import { useBlogs } from "../hooks/useBlogs";

const BlogsView = ({ blogs, user }) => {
  const { addBlog, likeBlog, deleteBlog } = useBlogs();

  const blogFormRef = useRef();

  return (
    <div>
      <br />

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={(blog) => addBlog(blog, blogFormRef)} />
      </Togglable>

      <br />

      <Blogs
        blogs={blogs}
        user={user}
        onLike={likeBlog}
        onRemove={deleteBlog}
      />
    </div>
  );
};

export default BlogsView;
