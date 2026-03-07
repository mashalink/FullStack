import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const User = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const users = useSelector((state) => state.users)
  const user = users.find((u) => u.id === id)

  if (!user) return null

  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : user.username?.slice(0, 2).toUpperCase()

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '48px 24px 80px' }}>
      <button
        type="button"
        onClick={() => navigate('/users')}
        style={{
          fontFamily: 'var(--font-body)', fontSize: '.8rem', fontWeight: 600,
          background: 'transparent', color: 'var(--muted)',
          border: 'none', padding: '0 0 28px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '6px', transition: 'color .2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--navy)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
      >← Users</button>

      <div style={{
        background: 'var(--white)', borderRadius: 'var(--r-xl)',
        padding: '36px', boxShadow: 'var(--shadow-card)', marginBottom: '24px',
        display: 'flex', alignItems: 'center', gap: '24px',
      }}>
        <div style={{
          width: 64, height: 64, background: 'var(--navy)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.1rem', fontWeight: 700, color: 'var(--pink)', flexShrink: 0,
        }}>{initials}</div>
        <div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: '1.5rem',
            fontWeight: 700, color: 'var(--navy)', marginBottom: '4px',
          }}>{user.name}</h2>
          <p style={{ fontSize: '.85rem', color: 'var(--muted)' }}>
            {user.blogs?.length ?? 0} blogs added
          </p>
        </div>
      </div>

      <div style={{
        background: 'var(--white)', borderRadius: 'var(--r-xl)',
        overflow: 'hidden', boxShadow: 'var(--shadow-card)',
      }}>
        <div style={{
          padding: '16px 28px',
          background: 'var(--navy)',
          fontSize: '.72rem', fontWeight: 700,
          letterSpacing: '.07em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,.5)',
        }}>Added blogs</div>

        {(!user.blogs || user.blogs.length === 0) ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)', fontSize: '.9rem' }}>
            No blogs
          </div>
        ) : (
          user.blogs.map((blog, i) => (
            <div
              key={blog.id}
              style={{
                padding: '14px 28px',
                borderTop: i === 0 ? 'none' : '1px solid var(--pink-40)',
                display: 'flex', alignItems: 'center', gap: '10px',
                animation: `fadeUp .35s ease-out ${i * 0.06}s both`,
              }}
            >
              <span style={{
                width: 6, height: 6, background: 'var(--pink)',
                borderRadius: '50%', flexShrink: 0,
              }} />
              <span style={{ fontSize: '.9rem', color: 'var(--navy)', fontWeight: 500 }}>
                {blog.title}
              </span>
            </div>
          ))
        )}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default User
