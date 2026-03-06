import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useBlogs } from "../hooks/useBlogs";

const Blog = () => {
  const { id } = useParams();
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((b) => b.id === id);
  const { likeBlog, deleteBlog } = useBlogs();

  if (!blog) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url} target="_blank" rel="noopener noreferrer">
        {blog.url}
      </a>
      <div>
        likes {blog.likes}{" "}
        <button type="button" onClick={() => likeBlog(blog)}>
          like
        </button>
      </div>
      <div>added by {blog.user?.name || blog.user?.username || "unknown"}</div>
      <div>
        <button type="button" onClick={() => deleteBlog(blog)}>
          delete
        </button>
      </div>
    </div>
  );
};

export default Blog;
