import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";

const STORAGE_KEY = "loggedBlogappUser";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(_state, action) {
      return action.payload;
    },
    clearUser() {
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const initializeUser = () => {
  return (dispatch) => {
    const savedUserJSON = window.localStorage.getItem(STORAGE_KEY);
    if (!savedUserJSON) return;

    const user = JSON.parse(savedUserJSON);
    dispatch(setUser(user));
    blogService.setToken(user.token);
  };
};

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    const loggedInUser = await loginService.login({ username, password });
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser));
    blogService.setToken(loggedInUser.token);
    dispatch(setUser(loggedInUser));
    return loggedInUser;
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem(STORAGE_KEY);
    blogService.setToken(null);
    dispatch(clearUser());
  };
};

export default userSlice.reducer;
