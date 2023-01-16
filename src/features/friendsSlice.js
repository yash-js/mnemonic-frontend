import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friendlist: [],
  requests: [],
  sentRequests: [],
  friendsLoading: false,
  requestsLoading: false,
  sentRequestsLoading: false,
};

export const friendsSlice = createSlice({
  name: "friends",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setFriends: (state, action) => {
      state.friendlist = action.payload;
    },
    setRequests: (state, action) => {
      state.requests = action.payload;
    },
    setSentRequests: (state, action) => {
      state.sentRequests = action.payload;
    },
    setFriendsLoading: (state, action) => {
      state.friendsLoading = action.payload;
    },
    setRequestsLoading: (state, action) => {
      state.requestsLoading = action.payload;
    },
    setSentRequestsLoading: (state, action) => {
      state.sentRequestsLoading = action.payload;
    },
  },
});

export const {
  setFriends,
  setRequests,
  setSentRequests,
  setFriendsLoading,
  setRequestsLoading,
  setSentRequestsLoading,
} = friendsSlice.actions;
export const getFriendsList = (state) => state.friends.friendlist;
export const getRequestsList = (state) => state.friends.requests;
export const getSentRequestsList = (state) => state.friends.sentRequests;
export const friendsLoadingState = (state) => state.friends.friendsLoading;
export const requestsLoadingState = (state) => state.friends.requestsLoading;
export const sentRequestsLoadingState = (state) =>
  state.friends.sentRequestsLoading;

export default friendsSlice.reducer;
