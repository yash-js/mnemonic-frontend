import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notificationlist: [
        {
            alertMessage: 'succesfully added',
            alertType: 'success',
        },
        {
            alertMessage: 'succesfully removed',
            alertType: 'success',
        },
        {
            alertMessage: 'unbale to update',
            alertType: 'warning',
        }
    ],
    notificationsLoading: false,
    notificationlistCount: 3,
};

export const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setNotificationList: (state, action) => {
            state.notificationlist = action.payload;
        },
        setNotificationsLoading: (state, action) => {
            state.notificationsLoading = action.payload;
        },
        setNotificationListCount: (state, action) => {
            state.notificationlistCount = action.payload;
        },
    }
})

export const {
    setNotificationList,
    setNotificationsLoading,
    setNotificationListCount
  } = notificationSlice.actions;
export const getNotificationList = (state) => state.notifications.notificationlist;
export const getNotificationsLoadingState = (state) => state.notifications.notificationsLoading;
export const getNotificationListCount = (state) => state.notifications.notificationlistCount;
export default notificationSlice.reducer;