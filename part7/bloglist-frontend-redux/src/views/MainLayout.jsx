import { Route, Routes } from 'react-router-dom'

import Blog from '../components/Blog'
import Notification from '../components/Notification'
import BlogsView from './BlogsView'
import User from './User'

import NavBar from '../components/NavBar'
import Users from './Users'

const MainLayout = ({ user, blogs, handleLogout }) => {
  return (
    <div>
      <NavBar user={user} onLogout={handleLogout} />

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
