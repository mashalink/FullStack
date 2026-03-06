import { useEffect, useReducer } from 'react'
import blogService from '../services/blogs'
import { UserContext } from './UserContext'

const STORAGE_KEY = 'loggedBlogappUser'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, null)

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return

    const parsed = JSON.parse(saved)
    dispatch({ type: 'SET', payload: parsed })
    blogService.setToken(parsed.token)
  }, [])

  const login = (loggedInUser) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser))
    blogService.setToken(loggedInUser.token)
    dispatch({ type: 'SET', payload: loggedInUser })
  }

  const logout = () => {
    window.localStorage.removeItem(STORAGE_KEY)
    blogService.setToken(null)
    dispatch({ type: 'CLEAR' })
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}
