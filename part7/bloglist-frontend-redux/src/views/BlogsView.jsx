import { useRef } from "react";

import BlogForm from "../components/BlogForm";
import Blogs from "../components/Blogs";
import Togglable from "../components/Togglable";

import { useBlogs } from "../hooks/useBlogs";
import blogs from "../services/blogs";

const BlogsView = () => {
  const { addBlog } = useBlogs();

  const blogFormRef = useRef();

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={(blog) => addBlog(blog, blogFormRef)} />
      </Togglable>

      <br />

      <Blogs blogs={blogs} />
    </div>
  );
};

export default BlogsView;
