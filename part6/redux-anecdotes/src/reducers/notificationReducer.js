import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload.text;
    },
    clearNotification(state, action){
        return '';
    }
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const showNotification = (text, duration = 5) =>{
  return (dispatch) =>{
    dispatch(setNotification({text}))
    setTimeout(() => {
      dispatch(clearNotification());
    }, duration * 1000);
  };
};
export default notificationSlice.reducer;
