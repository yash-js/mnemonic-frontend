import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import {
  friendsLoadingState,
  getFriendsList,
  getRequestsList,
  getSuggestionsList,
  requestsLoadingState,
  setFriends,
  setFriendsLoading,
  setRequests,
  setRequestsLoading,
  setSuggestions,
  setSuggestionsLoading,
  suggestionsLoadingState,
} from "../features/friendsSlice";
import { loadingState } from "../features/userSlice";
import { getFriendRequests, getFriends } from "../lib/getApiCall";

export const useFriends = () => {
  const friends = useSelector(getFriendsList);
  const requests = useSelector(getRequestsList);
  const suggestions = useSelector(getSuggestionsList);
  const loading = useSelector(loadingState);
  const friendsLoading = useSelector(friendsLoadingState);
  const requestsLoading = useSelector(requestsLoadingState);
  const suggestionLoading = useSelector(suggestionsLoadingState);
  const dispatch = useDispatch();

  const getFriendsApiCall = async () => {
    if (!friends || friends.length < 1) {
      dispatch(setFriendsLoading(true));
      const resp = await getFriends();
      console.log("f", resp);
      dispatch(setFriends(resp?.data));
      dispatch(setFriendsLoading(false));
    }
  };

  const getRequestsApiCall = async () => {
    if (!requests || requests.length < 1) {
      dispatch(setRequestsLoading(true));
      const resp = await getFriendRequests();
      dispatch(setRequests(resp?.data));
      dispatch(setRequestsLoading(false));
    }
  };
  const getSuggestionsApiCall = async () => {
    if (!suggestions || suggestions.length < 1) {
      const resp = await getSuggestionsList();
      console.log(resp?.data);
      dispatch(setSuggestions(resp?.data));
      dispatch(setSuggestionsLoading(false));
    }
  };

  return {
    friends,
    loading,
    requests,
    suggestions,
    suggestionLoading,
    friendsLoading,
    requestsLoading,
    getFriendsApiCall,
    getRequestsApiCall,
    getSuggestionsApiCall,
  };
};
