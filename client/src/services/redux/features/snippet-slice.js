import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loggedIn: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loggedIn = true;
    },

    logout: (state) => {
      state.user = null;
      state.loggedIn = false;
    },
  },
});

export const userSelector = (state) => state.user;

export const { setUser, logout } = userSlice.actions;

export default userSlice;
