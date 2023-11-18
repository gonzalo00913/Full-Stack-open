import { createContext, useContext, useReducer } from "react";

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

const initialState = {
  message: "",
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.payload };
    case 'CLEAR_NOTIFICATION':
      return { message: '' };
    default:
      return state;
  }
};


export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);


const setNotification = (message) => {
  dispatch({ type: "SET_NOTIFICATION", payload: message });
  setTimeout(() => {
    dispatch({ type: "CLEAR_NOTIFICATION" });
  }, 5000);
};

return (
    <NotificationContext.Provider value={{ notification: state, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );

};