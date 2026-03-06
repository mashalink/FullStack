import { Link, Route, Routes } from "react-router-dom";

import BlogsView from "./BlogsView";
import Header from "./Header";
import Users from "./Users";

const MainLayout = ({ user, blogs, handleLogout }) => {
  return (
    <div>
      <div>
        <Link to="/">blogs</Link> | <Link to="/users">users</Link>
      </div>

      <Header user={user} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<BlogsView blogs={blogs} user={user} />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
};

export default MainLayout;
