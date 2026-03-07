import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification?.message) return null
  const { message, type = 'info' } = notification

  const isError = type === 'error'

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '12px',
      background: 'var(--white)',
      border: `1.5px solid ${isError ? 'rgba(232,69,90,.35)' : 'rgba(34,197,94,.35)'}`,
      borderLeft: `4px solid ${isError ? 'var(--accent)' : '#22c55e'}`,
      borderRadius: 'var(--r-md)',
      padding: '12px 18px',
      marginBottom: '24px',
      boxShadow: 'var(--shadow-card)',
      fontSize: '.875rem', fontWeight: 500,
      color: isError ? 'var(--accent)' : '#15803d',
      animation: 'slideDown .3s ease-out',
    }}>
      <span style={{ fontSize: '1rem' }}>{isError ? '✕' : '✓'}</span>
      {message}
      <style>{`
        @keyframes slideDown {
          from { opacity:0; transform:translateY(-8px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default Notification
