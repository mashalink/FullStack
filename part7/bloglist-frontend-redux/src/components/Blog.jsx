import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useBlogs } from '../hooks/useBlogs'

const Blog = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const blogs = useSelector((state) => state.blogs)
  const currentUser = useSelector((state) => state.user)
  const [comment, setComment] = useState('')

  const blog = blogs.find((b) => b.id === id)
  const { likeBlog, deleteBlog, commentBlog } = useBlogs()

  if (!blog) {
    return (
      <div style={{ maxWidth: 700, margin: '80px auto', textAlign: 'center', padding: '0 24px' }}>
        <p style={{ color: 'var(--muted)' }}>Blog not found</p>
      </div>
    )
  }

  const canRemove =
    blog.user?.username === currentUser?.username ||
    blog.user?.id === currentUser?.id

  const handleDelete = async () => {
    await deleteBlog(blog)
    navigate('/')
  }

  const handleCommentSubmit = async (event) => {
    event.preventDefault()
    const clean = comment.trim()
    if (!clean) return
    await commentBlog(blog, clean)
    setComment('')
  }

  const inputStyle = {
    fontFamily: 'var(--font-body)', fontSize: '.9rem',
    background: 'var(--off)', color: 'var(--navy)',
    border: '1.5px solid transparent',
    borderRadius: 'var(--r-md)', padding: '10px 16px',
    flex: 1, outline: 'none', transition: 'border-color .2s, background .2s',
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px 80px' }}>
      <button
        type="button"
        onClick={() => navigate('/')}
        style={{
          fontFamily: 'var(--font-body)', fontSize: '.8rem', fontWeight: 600,
          background: 'transparent', color: 'var(--muted)',
          border: 'none', padding: '0 0 28px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '6px',
          transition: 'color .2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--navy)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
      >← Back</button>

      <div style={{
        background: 'var(--white)', borderRadius: 'var(--r-xl)',
        overflow: 'hidden', boxShadow: 'var(--shadow-card)',
        marginBottom: '24px',
      }}>
        <div style={{
          height: '180px',
          background: 'linear-gradient(135deg, var(--navy) 0%, #1a2d6b 100%)',
          position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '24px',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(8px)',
            color: '#fff', fontSize: '.8rem', fontWeight: 600,
            padding: '5px 14px', borderRadius: '100px',
          }}>
            <span style={{ color: 'var(--pink)' }}>♥</span> {blog.likes ?? 0} likes
          </div>
        </div>

        <div style={{ padding: '32px 36px' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 700, color: 'var(--navy)', marginBottom: '12px',
          }}>{blog.title}</h1>

          <a
            href={blog.url} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontSize: '.85rem', color: 'var(--muted)',
              marginBottom: '24px',
              transition: 'color .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--navy)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
          >
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
            {blog.url}
          </a>

          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingTop: '20px', borderTop: '1px solid var(--pink-40)',
            flexWrap: 'wrap', gap: '12px',
          }}>
            <span style={{ fontSize: '.85rem', color: 'var(--muted)' }}>
              Added by: <strong style={{ color: 'var(--navy)' }}>
                {blog.user?.name || blog.user?.username || 'Unknown'}
              </strong>
            </span>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => likeBlog(blog)}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '.875rem', fontWeight: 600,
                  background: 'var(--pink-20)', color: 'var(--accent)',
                  border: 'none', borderRadius: 'var(--r-sm)',
                  padding: '8px 16px', cursor: 'pointer', transition: 'all .2s',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--pink-40)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--pink-20)'}
              >♥ Like</button>

              {canRemove && (
                <button
                  type="button"
                  onClick={handleDelete}
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: '.8rem', fontWeight: 600,
                    background: 'transparent', color: 'var(--accent)',
                    border: '1.5px solid rgba(232,69,90,.25)',
                    borderRadius: 'var(--r-sm)', padding: '7px 14px',
                    cursor: 'pointer', transition: 'all .2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)' }}
                >Delete</button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{
        background: 'var(--white)', borderRadius: 'var(--r-xl)',
        padding: '32px 36px', boxShadow: 'var(--shadow-card)',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: '1.25rem',
          fontWeight: 700, marginBottom: '24px', color: 'var(--navy)',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          Comments
          <span style={{
            fontSize: '.75rem', fontWeight: 600, color: 'var(--pink)',
            background: 'var(--pink-20)', padding: '3px 10px',
            borderRadius: '100px',
          }}>{blog.comments?.length ?? 0}</span>
        </h2>

        <form onSubmit={handleCommentSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '28px' }}>
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            placeholder="Write a comment…"
            style={inputStyle}
            onFocus={e => { e.target.style.borderColor = 'var(--pink)'; e.target.style.background = 'var(--white)' }}
            onBlur={e => { e.target.style.borderColor = 'transparent'; e.target.style.background = 'var(--off)' }}
          />
          <button
            type="submit"
            style={{
              fontFamily: 'var(--font-body)', fontSize: '.875rem', fontWeight: 600,
              background: 'var(--navy)', color: 'var(--white)',
              border: 'none', borderRadius: 'var(--r-md)',
              padding: '10px 20px', cursor: 'pointer',
              flexShrink: 0, transition: 'all .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--navy-80)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--navy)'}
          >Submit</button>
        </form>

        {(!blog.comments || blog.comments.length === 0) ? (
          <p style={{ fontSize: '.875rem', color: 'var(--muted)', textAlign: 'center', padding: '24px 0' }}>
            No comments yet — be the first!
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {blog.comments.map((c, i) => (
              <li key={i} style={{
                background: 'var(--off)',
                borderRadius: 'var(--r-md)',
                padding: '12px 16px',
                fontSize: '.875rem', color: 'var(--navy)',
                borderLeft: '3px solid var(--pink)',
              }}>{c}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Blog
