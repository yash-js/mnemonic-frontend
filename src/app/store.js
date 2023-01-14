import { configureStore } from "@reduxjs/toolkit";
import friendsSlice from "../features/friendsSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    friends: friendsSlice,
  },
});
