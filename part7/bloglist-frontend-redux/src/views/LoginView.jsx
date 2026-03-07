import LoginForm from '../components/LoginForm'
import Notification from '../components/Notification'

const LoginView = ({ username, password, setUsername, setPassword, handleLogin }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--navy)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 55% 65% at 20% 30%, rgba(255,184,210,.1) 0%, transparent 60%),
          radial-gradient(ellipse 40% 50% at 80% 75%, rgba(255,184,210,.07) 0%, transparent 50%)
        `,
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        background: 'var(--white)',
        borderRadius: 'var(--r-xl)',
        padding: '52px 48px',
        width: '100%', maxWidth: '420px',
        boxShadow: '0 32px 80px rgba(0,0,0,.35)',
        animation: 'scaleIn .4s cubic-bezier(.16,1,.3,1)',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.6rem', fontWeight: 700,
          color: 'var(--navy)', marginBottom: '6px',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          Blog<span style={{ color: 'var(--accent)' }}>list</span>
        </div>
        <p style={{ fontSize: '.875rem', color: 'var(--muted)', marginBottom: '36px' }}>
          Sign in to continue
        </p>

        <Notification />

        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          onLogin={handleLogin}
        />
      </div>

      <style>{`
        @keyframes scaleIn {
          from { opacity:0; transform:scale(.96) translateY(12px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default LoginView
