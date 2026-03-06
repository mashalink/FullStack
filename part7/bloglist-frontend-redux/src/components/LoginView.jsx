import LoginForm from "./LoginForm";
import Notification from "./Notification";

const LoginView = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) => {
  return (
    <div>
      <Notification />

      <LoginForm
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default LoginView;
