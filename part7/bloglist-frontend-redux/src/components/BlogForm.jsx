import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle]   = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl]       = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const cleanTitle  = title.trim()
    const cleanAuthor = author.trim()
    const cleanUrl    = url.trim()

    if (!cleanTitle || !cleanUrl) {
      dispatch(showNotification('Please fill in title and URL', 'error', 5))
      return
    }
    await createBlog({ title: cleanTitle, author: cleanAuthor, url: cleanUrl })
    setTitle(''); setAuthor(''); setUrl('')
  }

  const inputStyle = {
    fontFamily: 'var(--font-body)', fontSize: '.9rem',
    background: 'var(--off)', color: 'var(--navy)',
    border: '1.5px solid transparent',
    borderRadius: 'var(--r-md)', padding: '10px 16px',
    width: '100%', outline: 'none',
    transition: 'border-color .2s, background .2s',
  }
  const labelStyle = {
    fontSize: '.75rem', fontWeight: 700,
    color: 'var(--navy)', letterSpacing: '.05em', textTransform: 'uppercase',
  }
  const onFocus = e => { e.target.style.borderColor = 'var(--pink)'; e.target.style.background = 'var(--white)' }
  const onBlur  = e => { e.target.style.borderColor = 'transparent'; e.target.style.background = 'var(--off)' }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          <label htmlFor="title" style={labelStyle}>Title</label>
          <input id="title" value={title} type="text"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Blog title…"
            style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          <label htmlFor="author" style={labelStyle}>Author</label>
          <input id="author" value={author} type="text"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="Author name"
            style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '24px' }}>
        <label htmlFor="url" style={labelStyle}>URL</label>
        <input id="url" value={url} type="text"
          onChange={({ target }) => setUrl(target.value)}
          placeholder="https://…"
          style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type="submit"
          style={{
            fontFamily: 'var(--font-body)', fontSize: '.875rem', fontWeight: 600,
            background: 'var(--pink)', color: 'var(--navy)',
            border: 'none', borderRadius: 'var(--r-md)',
            padding: '10px 24px', cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(255,184,210,.35)',
            transition: 'all .2s',
          }}
          onMouseEnter={e => { e.target.style.background = '#ffc8dc'; e.target.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.target.style.background = 'var(--pink)'; e.target.style.transform = 'translateY(0)' }}
        >Save</button>
      </div>
    </form>
  )
}

export default BlogForm
