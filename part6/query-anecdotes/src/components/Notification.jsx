import { useNotification } from "../anecdotesContext"

const Notification = () => {
  const { notification } = useNotification();
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: notification.message ? 'block' : 'none' 
  };

  return (
    <div style={style}>
      {notification.message && <div>{notification.message}</div>}
    </div>
  );
};

export default Notification;
