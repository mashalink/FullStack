import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(_state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    replaceBlog(state, action) {
      const updated = action.payload;
      return state.map((b) => (b.id === updated.id ? updated : b));
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((b) => b.id !== id);
    },
  },
});

export const { setBlogs, appendBlog, replaceBlog, removeBlog } =
  blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const created = await blogService.create(blogObject);
    dispatch(appendBlog(created));
    return created;
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const userIdOrObj = blog.user?.id ?? blog.user ?? null;

    const updatedObject = {
      likes: (blog.likes ?? 0) + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      ...(userIdOrObj ? { user: userIdOrObj } : {}),
    };

    const returned = await blogService.update(blog.id, updatedObject);
    dispatch(replaceBlog(returned));
    return returned;
  };
};

export const deleteBlog = (blogId) => {
  return async (dispatch) => {
    await blogService.remove(blogId);
    dispatch(removeBlog(blogId));
    return blogId;
  };
};

export default blogsSlice.reducer;
