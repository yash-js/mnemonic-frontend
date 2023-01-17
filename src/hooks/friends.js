import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import {
  friendsLoadingState,
  getFriendsList,
  getRequestsList,
  requestsLoadingState,
  setFriends,
  setFriendsLoading,
  setRequests,
  setRequestsLoading,
} from "../features/friendsSlice";
import { isLoading, loadingState, userdata, userData } from "../features/userSlice";
import {
  getFriendRequests,
  getFriends,
  removeFriend,
  acceptFriendRequest,
} from "../lib/getApiCall";

export const useFriends = () => {
  const user = useSelector(userData);
  const friends = user && user?.friends ? user?.friends : [];
  const requests = user && user?.requests ? user?.requests : [];
  const loading = useSelector(loadingState);
  const friendsLoading = useSelector(friendsLoadingState);
  const requestsLoading = useSelector(requestsLoadingState);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const getFriendsApiCall = async () => {
    if (!friends || friends.length < 1) {
      dispatch(setFriendsLoading(true));
      const resp = await getFriends();
      if (resp && resp?.data) {
        dispatch(setFriends(resp?.data));
      }
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

  // const getSuggestionsApiCall = async () => {
  //   if (!suggestions || suggestions.length < 1) {
  //     const resp = await getSuggestionsList();
  //     if (resp && resp?.data) {
  //       dispatch(setSuggestions(resp?.data));
  //     }
  //     dispatch(setSuggestionsLoading(false));
  //   }
  // };

  const removeFriendApiCall = async (id) => {
    dispatch(setFriendsLoading(true));
    const res = await removeFriend(id);
    if (res?.status === 200) {
      setMessage(res?.data?.message);
      setType("success");
      setOpen(true);
      dispatch(userdata(res?.data?.currentUser));
      dispatch(setFriendsLoading(false));
    } else {
      setMessage("Something Went Wrong!");
      setType("error");
      dispatch(setFriendsLoading(false));
      setOpen(true);
    }
  };

  const acceptFriendRequestApiCall = async (id) => {
    dispatch(setRequestsLoading(true));
    const res = await acceptFriendRequest(id);
    if (res?.status === 200) {
      setMessage(res?.data?.message);
      setType("success");
      setOpen(true);
      dispatch(setRequests(requests.filter((friend) => friend.id !== id)));
      dispatch(userdata(res?.data?.currentUser));
      dispatch(setRequestsLoading(false));
    } else {
      setMessage("Something Went Wrong!");
      setType("error");
      dispatch(setRequestsLoading(false));
      setOpen(true);
    }
  };

  return {
    friends,
    loading,
    requests,
    friendsLoading,
    requestsLoading,
    getFriendsApiCall,
    getRequestsApiCall,
    removeFriendApiCall,
    acceptFriendRequestApiCall,
    open,
    setOpen,
    message,
    setMessage,
    type,
    setType,
  };
};
