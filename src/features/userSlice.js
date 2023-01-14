import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const initialState = {
  token: token ? token : null,
  user: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
    userdata: (state, action) => {
      state.user = action.payload;
    },
    isLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { login, logout, userdata, isLoading } = userSlice.actions;
export const getToken = (state) => state.user.token;
export const userData = (state) => state.user.user;
export const loadingState = (state) => state.user.loading;

export default userSlice.reducer;
