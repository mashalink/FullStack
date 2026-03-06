import { Link, Route, Routes } from "react-router-dom";

import Blog from "./Blog";
import BlogsView from "./BlogsView";
import Header from "./Header";
import Notification from "./Notification";
import User from "./User";
import Users from "./Users";

const MainLayout = ({ user, blogs, handleLogout }) => {
  return (
    <div>
      <div>
        <Link to="/">blogs</Link> | <Link to="/users">users</Link>
      </div>

      <Header user={user} onLogout={handleLogout} />
      <Notification />

      <Routes>
        <Route path="/" element={<BlogsView blogs={blogs} user={user} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  );
};

export default MainLayout;
