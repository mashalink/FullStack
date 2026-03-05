import { useNotification } from "../contexts/NotificationContext";

const getStyles = (type) => {
  const isError = type === "error";
  const color = isError ? "crimson" : "seagreen";

  return {
    border: `2px solid ${color}`,
    color,
    backgroundColor: "#f9f9f9",
    padding: "0.75rem 1rem",
    borderRadius: "4px",
    marginBottom: "1rem",
    fontWeight: 600,
  };
};

const Notification = () => {
  const { notification } = useNotification();

  if (!notification?.message) return null;

  return <div style={getStyles(notification.type)}>{notification.message}</div>;
};

export default Notification;
