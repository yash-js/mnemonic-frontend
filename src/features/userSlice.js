import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  loading: false,
  profiledata: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
    userdata: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token
    },
    isLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProfiledata: (state, action) => {
      state.profiledata = action.payload;
    }
  },
});

export const { login, logout, userdata, isLoading, setProfiledata} = userSlice.actions;
export const getToken = (state) => state.user.token;
export const userData = (state) => state.user.user;
export const loadingState = (state) => state.user.loading;
export const profiledata = (state) => state.user.profiledata;

export default userSlice.reducer;
