import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px 80px' }}>
      <div style={{ marginBottom: '32px' }}>
        <p style={{
          fontSize: '.7rem', fontWeight: 700, letterSpacing: '.1em',
          textTransform: 'uppercase', color: 'var(--pink)',
          display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px',
        }}>
          <span style={{ width: 24, height: 2, background: 'var(--pink)', borderRadius: 1, display: 'inline-block' }} />
          Members
        </p>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: '2rem',
          fontWeight: 700, color: 'var(--navy)',
        }}>Users</h1>
      </div>

      <div style={{
        background: 'var(--white)', borderRadius: 'var(--r-xl)',
        overflow: 'hidden', boxShadow: 'var(--shadow-card)',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr auto',
          padding: '14px 28px',
          background: 'var(--navy)',
          fontSize: '.72rem', fontWeight: 700,
          letterSpacing: '.07em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,.5)',
        }}>
          <span>Name</span>
          <span>Blogs</span>
        </div>

        {users.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--muted)', fontSize: '.9rem' }}>
            No users
          </div>
        ) : (
          users.map((user, i) => {
            const initials = user.name
              ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
              : user.username?.slice(0, 2).toUpperCase()
            return (
              <div
                key={user.id}
                style={{
                  display: 'grid', gridTemplateColumns: '1fr auto',
                  alignItems: 'center',
                  padding: '16px 28px',
                  borderTop: i === 0 ? 'none' : '1px solid var(--pink-40)',
                  transition: 'background .15s',
                  animation: `fadeUp .35s ease-out ${i * 0.06}s both`,
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--pink-20)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: 38, height: 38, background: 'var(--navy)',
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '.7rem', fontWeight: 700, color: 'var(--pink)', flexShrink: 0,
                  }}>{initials}</div>
                  <Link
                    to={`/users/${user.id}`}
                    style={{
                      fontWeight: 600, fontSize: '.95rem', color: 'var(--navy)',
                      transition: 'color .2s',
                    }}
                    onMouseEnter={e => e.target.style.color = 'var(--navy-80)'}
                    onMouseLeave={e => e.target.style.color = 'var(--navy)'}
                  >{user.name}</Link>
                </div>
                <span style={{
                  fontWeight: 700, fontSize: '.95rem',
                  background: 'var(--pink-20)', color: 'var(--navy)',
                  padding: '4px 14px', borderRadius: '100px',
                }}>{user.blogs?.length ?? 0}</span>
              </div>
            )
          })
        )}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default Users
