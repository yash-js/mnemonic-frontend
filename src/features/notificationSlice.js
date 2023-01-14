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
    }
})

export const {
    setNotificationList,
    setNotificationsLoading
  } = notificationSlice.actions;
export const getNotificationList = (state) => state.notifications.notificationlist;
export const getNotificationsLoadingState = (state) => state.notifications.notificationsLoading;
export default notificationSlice.reducer;