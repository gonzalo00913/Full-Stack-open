import {useDispatch, useSelector } from "react-redux"
import {clearNotification } from "../reducers/notificationReducer";
import { useEffect } from "react";

const Notification = () => {
  
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch()

  useEffect(() =>{
    if(notification){
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);

      return () => clearTimeout(timer);
    }
  },[notification, dispatch])

  const clearNotificationClick = () => {
    dispatch(clearNotification());
  };

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
     <p>{notification}</p> 
    </div>
  )
}

export default Notification