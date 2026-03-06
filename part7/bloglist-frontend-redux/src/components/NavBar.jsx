import { Link } from 'react-router-dom'

const NavBar = ({ user, onLogout }) => {
  return (
    <div>
      <Link to="/">blogs</Link> | <Link to="/users">users</Link>
      {'  '}
      {user.name} logged in
      {'  '}
      <button type="button" onClick={onLogout}>
        logout
      </button>
    </div>
  )
}

export default NavBar
