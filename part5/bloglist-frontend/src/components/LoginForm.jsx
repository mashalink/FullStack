const LoginForm = ({ username, password, setUsername, setPassword, onLogin }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin({ username, password })
  }


  console.log(username, password)
  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={handleSubmit}>
        <div>
         <label htmlFor="username">username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            autoComplete="username"
          />
        </div>

        <div>
        <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            autoComplete="current-password"
          />
        </div>

        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
