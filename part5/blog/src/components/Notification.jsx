import React from 'react'
import '../index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const notificationClassName = message.includes("Error") ? "error" : "addPerson";

  return (
    <div className={notificationClassName}>
      {message}
    </div>
  );
}

export default Notification;