import { useReducer } from 'react'
import { NotificationContext } from './NotificationContext'

const initialState = null

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

let timeoutId = null

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, initialState)

  const notify = (message, type = 'info', seconds = 5) => {
    dispatch({ type: 'SET', payload: { message, type } })

    if (timeoutId) clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      dispatch({ type: 'CLEAR' })
      timeoutId = null
    }, seconds * 1000)
  }

  return (
    <NotificationContext.Provider value={{ notification, notify }}>
      {children}
    </NotificationContext.Provider>
  )
}
