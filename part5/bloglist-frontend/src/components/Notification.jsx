const getStyles = (type) => {
  const isError = type === 'error'
  const color = isError ? 'crimson' : 'seagreen'

  return {
    border: `2px solid ${color}`,
    color,
    backgroundColor: '#f9f9f9',
    padding: '0.75rem 1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    fontWeight: 600,
    }
  }

  const Notification = ({ notification }) => {
    if (!notification?.message) return null

    const { message, type = 'info' } = notification
    return <div style={getStyles(type)}>{message}</div>
  }

export default Notification
