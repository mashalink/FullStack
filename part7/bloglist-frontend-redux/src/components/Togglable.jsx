import { forwardRef, useImperativeHandle, useState } from 'react'

const Togglable = forwardRef(function Togglable(props, ref) {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => ({ toggleVisibility }))

  return (
    <div>
      {!visible && (
        <button
          type="button"
          onClick={toggleVisibility}
          style={{
            fontFamily: 'var(--font-body)', fontSize: '.875rem', fontWeight: 600,
            background: 'var(--pink)', color: 'var(--navy)',
            border: 'none', borderRadius: 'var(--r-md)',
            padding: '10px 22px', cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(255,184,210,.35)',
            transition: 'all .2s',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#ffc8dc'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--pink)'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          + {props.buttonLabel}
        </button>
      )}

      {visible && (
        <div style={{
          background: 'var(--white)',
          border: '1.5px solid var(--pink-40)',
          borderRadius: 'var(--r-xl)',
          padding: '36px 40px',
          boxShadow: 'var(--shadow-card)',
          animation: 'fadeDown .25s ease-out',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '28px',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700,
              color: 'var(--navy)', margin: 0,
            }}>New blog</h3>
            <button
              type="button"
              onClick={toggleVisibility}
              style={{
                fontFamily: 'var(--font-body)', fontSize: '.8rem', fontWeight: 600,
                background: 'transparent', color: 'var(--muted)',
                border: '1px solid rgba(133,144,165,.3)',
                borderRadius: 'var(--r-sm)', padding: '5px 12px',
                cursor: 'pointer', transition: 'all .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--navy)'; e.currentTarget.style.borderColor = 'var(--navy)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'rgba(133,144,165,.3)' }}
            >✕ Cancel</button>
          </div>

          {props.children}
        </div>
      )}

      <style>{`
        @keyframes fadeDown {
          from { opacity:0; transform:translateY(-12px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </div>
  )
})

export default Togglable
