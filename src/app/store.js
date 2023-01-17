import { configureStore } from "@reduxjs/toolkit";
import friendsSlice from "../features/friendsSlice";
import userReducer from "../features/userSlice";
import notificationSlice from "../features/notificationSlice";
import popoverslice from "../features/popoverslice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    friends: friendsSlice,
    notifications: notificationSlice,
    popover: popoverslice,
  },
});
