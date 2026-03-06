import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  }

  const { notification } = useContext(NotificationContext)

  if (!notification) return null

  return <div style={style}>{notification}</div>
}

export default Notification
