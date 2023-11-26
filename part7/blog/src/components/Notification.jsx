import React from "react";
import { useSelector } from "react-redux";
import "../index.css";

const Notification = () => {
  const message = useSelector((state) => state.notification.message);

  if (!message) {
    return null;
  }

  const notificationClassName = message.includes("Error") ? "error" : "addPerson";

  return <div className={notificationClassName}>{message}</div>;
};

export default Notification;

