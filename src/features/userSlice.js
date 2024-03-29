import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    },
    logout: (state) => {
      state.user = null;
    },
    userdata: (state, action) => {
      state.user = action.payload;
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
export const userData = (state) => state.user.user;
export const loadingState = (state) => state.user.loading;
export const profiledata = (state) => state.user.profiledata;

export default userSlice.reducer;
