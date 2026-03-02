import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.payload
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

let timeoutId = null
const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, '')

  const setNotification = (message, seconds = 5) => {
    dispatch({ type: 'SHOW', payload: message })

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, seconds * 1000)
  }

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext