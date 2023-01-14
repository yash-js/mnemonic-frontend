import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friendlist: [],
  requests: [],
  suggestions: [],
  friendsLoading: false,
  requestsLoading: false,
  suggestionsLoading: false,
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
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
    setFriendsLoading: (state, action) => {
      state.friendsLoading = action.payload;
    },
    setRequestsLoading: (state, action) => {
      state.requestsLoading = action.payload;
    },
    setSuggestionsLoading: (state, action) => {
      state.suggestionsLoading = action.payload;
    },
  },
});

export const {
  setFriends,
  setRequests,
  setFriendsLoading,
  setRequestsLoading,
  setSuggestionsLoading,
  setSuggestions
} = friendsSlice.actions;
export const getFriendsList = (state) => state.friends.friendlist;
export const getRequestsList = (state) => state.friends.requests;
export const getSuggestionsList = (state) => state.friends.suggestions;
export const friendsLoadingState = (state) => state.friends.friendsLoading;
export const requestsLoadingState = (state) => state.friends.requestsLoading;
export const suggestionsLoadingState = (state) =>
  state.friends.suggestionsLoading;

export default friendsSlice.reducer;
