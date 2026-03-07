import { Route, Routes } from 'react-router-dom'

import Blog from '../components/Blog'
import Notification from '../components/Notification'
import BlogsView from './BlogsView'
import User from './User'
import NavBar from '../components/NavBar'
import Users from './Users'

const MainLayout = ({ user, blogs, handleLogout }) => {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--off)' }}>
      <NavBar user={user} onLogout={handleLogout} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 40px 0' }}>
        <Notification />
      </div>

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
