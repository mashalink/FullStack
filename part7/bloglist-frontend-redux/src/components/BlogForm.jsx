import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cleanTitle = title.trim();
    const cleanAuthor = author.trim();
    const cleanUrl = url.trim();

    if (!cleanTitle || !cleanUrl) {
      dispatch(showNotification("Please fill in title and URL", "error", 5));
      return;
    }

    await createBlog({
      title: cleanTitle,
      author: cleanAuthor,
      url: cleanUrl,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">title</label>
          <input
            id="title"
            value={title}
            type="text"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          <label htmlFor="author">author</label>
          <input
            id="author"
            value={author}
            type="text"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          <label htmlFor="url">url</label>
          <input
            id="url"
            value={url}
            type="text"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
