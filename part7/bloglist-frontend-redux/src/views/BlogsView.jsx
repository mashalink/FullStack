import { useRef } from 'react'
import { useSelector } from 'react-redux'
import BlogForm from '../components/BlogForm'
import Blogs from '../components/Blogs'
import Togglable from '../components/Togglable'
import { useBlogs } from '../hooks/useBlogs'

const BlogsView = () => {
  const { addBlog } = useBlogs()
  const blogFormRef = useRef()
  const blogs = useSelector((state) => state.blogs)

  return (
    <div>
      <div style={{
        background: 'var(--navy)',
        padding: '64px 40px 72px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 55% 70% at 80% 50%, rgba(255,184,210,.1) 0%, transparent 60%),
            radial-gradient(ellipse 35% 45% at 5% 80%, rgba(255,184,210,.06) 0%, transparent 50%)
          `,
        }} />
        <div style={{ position: 'relative', maxWidth: 1020, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,184,210,.15)',
            border: '1px solid rgba(255,184,210,.3)',
            color: 'var(--pink)',
            fontSize: '.72rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase',
            padding: '5px 14px', borderRadius: '100px', marginBottom: '20px',
          }}>✦ Your collection</div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 700, lineHeight: 1.1,
            color: 'var(--white)', marginBottom: '16px',
          }}>
            Read. Save.{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--pink)' }}>Share.</em>
          </h1>

          <p style={{
            fontSize: '1rem', fontWeight: 300,
            color: 'rgba(255,255,255,.55)', maxWidth: 460, marginBottom: '32px',
          }}>
            Collect interesting articles in one place.{' '}
            {blogs.length > 0 && `You currently have ${blogs.length} ${blogs.length === 1 ? 'blog' : 'blogs'}.`}
          </p>

          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={(blog) => addBlog(blog, blogFormRef)} />
          </Togglable>
        </div>
      </div>

      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '48px 40px 80px' }}>
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginBottom: '28px',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: '1.5rem',
            fontWeight: 700, color: 'var(--navy)',
          }}>All blogs</h2>
          <span style={{
            fontSize: '.75rem', fontWeight: 700,
            color: 'var(--muted)', letterSpacing: '.05em', textTransform: 'uppercase',
          }}>{blogs.length} entries</span>
        </div>
        <Blogs />
      </div>
    </div>
  )
}

export default BlogsView
