const LoginForm = ({ username, password, setUsername, setPassword, onLogin }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin({ username, password })
  }

  const inputStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: '.9rem',
    background: 'var(--off)',
    color: 'var(--navy)',
    border: '1.5px solid transparent',
    borderRadius: 'var(--r-md)',
    padding: '10px 16px',
    width: '100%',
    outline: 'none',
    transition: 'border-color .2s, background .2s',
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
        <label htmlFor="username" style={{
          fontSize: '.75rem', fontWeight: 700,
          color: 'var(--navy)', letterSpacing: '.05em', textTransform: 'uppercase',
        }}>Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          autoComplete="username"
          placeholder="Your username"
          style={inputStyle}
          onFocus={e => { e.target.style.borderColor = 'var(--pink)'; e.target.style.background = 'var(--white)' }}
          onBlur={e => { e.target.style.borderColor = 'transparent'; e.target.style.background = 'var(--off)' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
        <label htmlFor="password" style={{
          fontSize: '.75rem', fontWeight: 700,
          color: 'var(--navy)', letterSpacing: '.05em', textTransform: 'uppercase',
        }}>Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          autoComplete="current-password"
          placeholder="••••••••"
          style={inputStyle}
          onFocus={e => { e.target.style.borderColor = 'var(--pink)'; e.target.style.background = 'var(--white)' }}
          onBlur={e => { e.target.style.borderColor = 'transparent'; e.target.style.background = 'var(--off)' }}
        />
      </div>

      <button
        type="submit"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '.95rem', fontWeight: 600,
          background: 'var(--navy)', color: 'var(--white)',
          border: 'none', borderRadius: 'var(--r-md)',
          padding: '12px',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(13,27,75,.25)',
          transition: 'all .2s',
          marginTop: '4px',
        }}
        onMouseEnter={e => { e.target.style.background = 'var(--navy-80)'; e.target.style.transform = 'translateY(-1px)' }}
        onMouseLeave={e => { e.target.style.background = 'var(--navy)'; e.target.style.transform = 'translateY(0)' }}
      >
        Login →
      </button>
    </form>
  )
}

export default LoginForm
