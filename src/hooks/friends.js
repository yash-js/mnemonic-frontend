import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import {
  friendsLoadingState,
  requestsLoadingState,
  setFriends,
  setFriendsLoading,
  setRequests,
  setRequestsLoading,
} from "../features/friendsSlice";
import { userdata, userData } from "../features/userSlice";
import {
  getFriendRequests,
  getFriends,
  removeFriend,
  acceptFriendRequest,
  addFriend,
  searchUser,
  getSentRequests,
  cancelRequest,
} from "../lib/getApiCall";

export const useFriends = () => {
  const user = useSelector(userData);
  const friends = user && user?.friends ? user?.friends : [];
  const requests = user && user?.requests ? user?.requests : [];
  const [loading, setLoading] = useState(false);
  const friendsLoading = useSelector(friendsLoadingState);
  const requestsLoading = useSelector(requestsLoadingState);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [friend, setFriend] = useState([]);
  const [request, setRequest] = useState([]);
  const [sent, setSent] = useState([]);

  const [searchResLoading, setSearchResLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("yash");
  const [results, setResults] = useState([]);
  const [sendRequestLoading, setSendRequestLoading] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const getFriendsApiCall = async () => {
    setLoading(true);
    const resp = await getFriends();
    console.log(resp);
    if (resp && resp?.status === 200 && resp?.data) {
      setFriend(resp?.data);
    }
    setLoading(false);
  };

  const getRequestsApiCall = async () => {
    setLoading(true);
    const resp = await getFriendRequests();
    if (resp && resp?.status === 200 && resp?.data) {
      setRequest(resp?.data);
    }
    setLoading(false);
  };

  const removeFriendApiCall = async (id) => {
    setLoading(true);
    const res = await removeFriend(id);
    if (res?.status === 200) {
      setMessage(res?.data?.message);
      setType("success");
      setOpen(true);
      setFriend(friend.filter((f) => f._id !== id));
      setLoading(false);
      dispatch(userdata(res?.data?.currentUser));
    } else {
      setMessage("Something Went Wrong!");
      setType("error");
      dispatch(setFriendsLoading(false));
      setOpen(true);
    }
  };

  const cancelRequestApiCall = async (id) => {
    setLoading(true);
    const res = await cancelRequest(id);
    if (res?.status === 200) {
      setMessage(res?.data?.message);
      setType("success");
      setOpen(true);
      setRequest(request.filter((r) => r._id !== id));
      setLoading(false);
    } else {
      setMessage("Something Went Wrong!");
      setType("error");
      dispatch(setFriendsLoading(false));
      setOpen(true);
    }
  };

  const acceptFriendRequestApiCall = async (friendData) => {
    setLoading(true);
    const res = await acceptFriendRequest(friendData._id);
    if (res?.status === 200) {
      setMessage(res?.data?.message);
      setType("success");
      setOpen(true);
      setFriend([...friend, friendData]);
      setRequest(request.filter((r) => r._id !== friendData._id));
      setLoading(false);
    } else {
      setMessage("Something Went Wrong!");
      setType("error");
      setLoading(false);
      setOpen(true);
    }
  };

  // SEARCH

  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  const onChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const searchApiCall = () => {
    setSearchResLoading(true);
    setSearchOpen(true);
    setTimeout(async () => {
      const res = await searchUser(searchQuery);
      console.log(res);
      if (res?.status === 200) {
        setResults(res?.data?.result);
      }
      setSearchResLoading(false);
    }, 1500);
    return clearTimeout();
  };

  const callAddFriendApi = async (friend) => {
    setSendRequestLoading(true);
    const res = await addFriend(friend._id);
    if (res === 200) {
      setMessage(res?.data?.message);
      setType("success");
      setOpen(true);
      setSent([...sent, friend]);
      setRequest([...request, friend]);
      setSendRequestLoading(false);
      setSearchOpen(false);
      setSearchQuery("");
      setResults([]);
    } else {
      setSendRequestLoading(false);
    }
  };

  const callGetSentRequests = async () => {
    const res = await getSentRequests();
    if (res.status === 200) {
      setSent(res?.data);
    } else {
      setMessage("Something Went Wrong!");
      setType("error");
      setOpen(true);
    }
  };

  React.useEffect(() => {
    let active = true;

    if (!searchResLoading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setResults([...results]);
      }
    })();

    return () => {
      active = false;
    };
  }, [searchResLoading]);

  React.useEffect(() => {
    if (!searchOpen) {
      setResults([]);
    }
  }, [searchOpen]);

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
    friend,
    request,
    sendRequestLoading,
    searchQuery,
    setSearchQuery,
    onChange,
    results,
    open,
    searchResLoading,
    setResults,
    open,
    setOpen,
    searchApiCall,
    setSearchQuery,
    setResults,
    callAddFriendApi,
    sendRequestLoading,
    sent,
    callGetSentRequests,
    cancelRequestApiCall,setSearchOpen,searchOpen 
  };
};
