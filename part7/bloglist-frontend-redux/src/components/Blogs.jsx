import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const gradients = [
  'linear-gradient(135deg, #0D1B4B 0%, #1a2d6b 100%)',
  'linear-gradient(135deg, #c94060 0%, #1a2d6b 100%)',
  'linear-gradient(135deg, #e87c99 0%, #0D1B4B 100%)',
  'linear-gradient(135deg, #1a2d6b 0%, #8590a5 100%)',
]

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)

  const sorted = [...blogs].sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0))

  if (sorted.length === 0) {
    return (
      <div style={{
        textAlign: 'center', padding: '80px 40px',
        background: 'var(--white)', borderRadius: 'var(--r-xl)',
        border: '2px dashed var(--pink-40)',
      }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '16px', opacity: .4 }}>📖</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '8px' }}>
          No blogs yet
        </h3>
        <p style={{ fontSize: '.9rem', color: 'var(--muted)' }}>
          Add the first blog using the button above
        </p>
      </div>
    )
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '24px',
    }}>
      {sorted.map((blog, i) => {
        const initials = blog.user?.name
          ? blog.user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
          : (blog.user?.username || '?').slice(0, 2).toUpperCase()

        return (
          <Link
            key={blog.id}
            to={`/blogs/${blog.id}`}
            className="blog"
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              background: 'var(--white)',
              borderRadius: 'var(--r-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-card)',
              transition: 'transform .25s, box-shadow .25s',
              cursor: 'pointer',
              animation: `fadeUp .4s ease-out ${i * 0.07}s both`,
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-hover)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)' }}
            >
              <div style={{
                height: '140px',
                background: gradients[i % gradients.length],
                display: 'flex', alignItems: 'flex-end',
                padding: '16px',
              }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(8px)',
                  color: '#fff', fontSize: '.78rem', fontWeight: 600,
                  padding: '4px 10px', borderRadius: '100px',
                }}>
                  <span style={{ color: 'var(--pink)' }}>♥</span> {blog.likes ?? 0}
                </div>
              </div>

              <div style={{ padding: '20px 22px' }}>
                <p style={{ fontSize: '.75rem', color: 'var(--muted)', marginBottom: '8px' }}>
                  {blog.author || 'Unknown author'}
                </p>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.05rem', fontWeight: 700,
                  color: 'var(--navy)', lineHeight: 1.3,
                  marginBottom: '16px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>{blog.title}</h3>

                <div style={{
                  display: 'flex', alignItems: 'center',
                  paddingTop: '14px', borderTop: '1px solid var(--pink-40)',
                }}>
                  <div style={{
                    width: 26, height: 26, background: 'var(--navy)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '.6rem', fontWeight: 700, color: 'var(--pink)',
                    marginRight: '8px', flexShrink: 0,
                  }}>{initials}</div>
                  <span style={{ fontSize: '.78rem', color: 'var(--muted)', fontWeight: 500 }}>
                    {blog.user?.name || blog.user?.username || 'Unknown'}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )
      })}

      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default Blogs
