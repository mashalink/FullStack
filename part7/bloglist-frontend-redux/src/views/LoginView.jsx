import LoginForm from "../components/LoginForm";
import Notification from "../components/Notification";

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
