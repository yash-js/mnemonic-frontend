import { createSlice } from '@reduxjs/toolkit';
const token = localStorage.getItem("token");

const initialState = {
  user: token ? token : null,
};



export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      localStorage.setItem('token', action.payload.token)
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
    photo: (state, action) => {
      state.value = action.payload
    }

  }
})



export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user.user;




export default userSlice.reducer;