import { Link, Route, Routes } from 'react-router-dom'

import Blog from '../components/Blog'
import Header from '../components/Header'
import Notification from '../components/Notification'
import BlogsView from './BlogsView'
import User from './User'
import Users from './Users'

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
  )
}

export default MainLayout
