import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setMessage(_state, action) {
      return action.payload;
    },
    clearMessage() {
      return null;
    },
  },
});

export const { setMessage, clearMessage } = notificationSlice.actions;

let timeoutId = null;

export const showNotification = (message, type = "info", seconds = 5) => {
  return (dispatch) => {
    dispatch(setMessage({ message, type }));

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      dispatch(clearMessage());
      timeoutId = null;
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;
