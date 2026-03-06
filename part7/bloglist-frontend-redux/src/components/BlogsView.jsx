import { useRef } from "react";

import BlogForm from "./BlogForm";
import Blogs from "./Blogs";
import Togglable from "./Togglable";

import { useBlogs } from "../hooks/useBlogs";

const BlogsView = () => {
  const { addBlog } = useBlogs();

  const blogFormRef = useRef();

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={(blog) => addBlog(blog, blogFormRef)} />
      </Togglable>

      <br />

      <Blogs />
    </div>
  );
};

export default BlogsView;
