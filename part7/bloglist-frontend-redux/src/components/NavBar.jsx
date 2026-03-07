import { Link, useLocation } from 'react-router-dom'

const NavBar = ({ user, onLogout }) => {
  const location = useLocation()
  const initials = user.name
    ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : user.username?.slice(0, 2).toUpperCase()

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--navy)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        height: '64px',
        boxShadow: '0 1px 0 rgba(255,184,210,.15)',
      }}
    >
      <Link
        to="/"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.35rem',
          fontWeight: 700,
          color: 'var(--white)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          letterSpacing: '.02em',
        }}
      >
        <span style={{
          width: 8, height: 8,
          background: 'var(--pink)',
          borderRadius: '50%',
          display: 'inline-block',
          animation: 'pulse 2s ease-in-out infinite',
        }} />
        Bloglist
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {[{ to: '/', label: 'Blogs' }, { to: '/users', label: 'Users' }].map(({ to, label }) => {
          const active = location.pathname === to
          return (
            <Link key={to} to={to} style={{
              fontSize: '.875rem', fontWeight: 500,
              color: active ? 'var(--pink)' : 'rgba(255,255,255,.6)',
              padding: '6px 14px', borderRadius: 'var(--r-sm)',
              background: active ? 'rgba(255,184,210,.1)' : 'transparent',
              transition: 'all .2s',
            }}
            onMouseEnter={e => { if (!active) { e.target.style.color = '#fff'; e.target.style.background = 'rgba(255,255,255,.07)' }}}
            onMouseLeave={e => { if (!active) { e.target.style.color = 'rgba(255,255,255,.6)'; e.target.style.background = 'transparent' }}}
            >{label}</Link>
          )
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.5)' }}>{user.name}</span>
        <div style={{
          width: 36, height: 36,
          background: 'var(--pink)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '.7rem', fontWeight: 700, color: 'var(--navy)',
          flexShrink: 0,
        }}>{initials}</div>
        <button
          type="button"
          onClick={onLogout}
          style={{
            fontSize: '.8rem', fontWeight: 500,
            color: 'rgba(255,255,255,.5)',
            background: 'none',
            border: '1px solid rgba(255,255,255,.15)',
            borderRadius: 'var(--r-sm)',
            padding: '5px 12px', cursor: 'pointer',
            transition: 'all .2s',
          }}
          onMouseEnter={e => { e.target.style.color = '#fff'; e.target.style.borderColor = 'rgba(255,255,255,.35)' }}
          onMouseLeave={e => { e.target.style.color = 'rgba(255,255,255,.5)'; e.target.style.borderColor = 'rgba(255,255,255,.15)' }}
        >Logout</button>
      </div>

      <style>{`
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.5; transform:scale(1.5); }
        }
      `}</style>
    </nav>
  )
}

export default NavBar
