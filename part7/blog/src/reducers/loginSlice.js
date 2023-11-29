import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.user = action.payload;
      state.error = null;
    },
    logoutUser(state) {
      state.user = null;
      state.error = null;
    },
    loginError(state, action) {
      state.user = null;
      state.error = action.payload;
    },
  },
});

export const { loginUser, logoutUser, loginError } = loginSlice.actions;
export default loginSlice.reducer;
