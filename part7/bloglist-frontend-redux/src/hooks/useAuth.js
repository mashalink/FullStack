import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { loginUser, logoutUser } from '../reducers/userReducer'

export const useAuth = () => {
  const dispatch = useDispatch()

  const notify = (message, type = 'info', seconds = 5) => {
    dispatch(showNotification(message, type, seconds))
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async ({ username, password }) => {
    try {
      const loggedInUser = await dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
      notify(`welcome back ${loggedInUser.name}`, 'info', 5)
    } catch (exception) {
      console.log(exception)
      notify('wrong credentials', 'error', 5)
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    setUsername('')
    setPassword('')
    notify('logged out', 'info', 4)
  }

  return {
    username,
    password,
    setUsername,
    setPassword,
    handleLogin,
    handleLogout,
  }
}
