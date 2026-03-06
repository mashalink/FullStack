import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoginView from "./components/LoginView";
import MainLayout from "./components/MainLayout";
import { useAuth } from "./hooks/useAuth";

import { initializeBlogs } from "./reducers/blogsReducer";
import { initializeUser } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);

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

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  if (!user) {
    return (
      <LoginView
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    );
  }

  return <MainLayout user={user} blogs={blogs} handleLogout={handleLogout} />;
};

export default App;
