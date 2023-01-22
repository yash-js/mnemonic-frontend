import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { useState } from "react";
import {
  friendsLoadingState,
  requestsLoadingState,
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
  getAllFriedsData,
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
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [sendRequestLoading, setSendRequestLoading] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const allDataApiCall = async () => {
    setLoading(true);
    const res = await getAllFriedsData();
    if (res.status === 200) {
      setFriend(res?.data?.friends);
      setRequest(res?.data?.requests);
      setSent(res?.data?.sentRequests);
    } else {
      setOpen(true);
      setType("error");
      setMessage("Something Went Wrong");
    }
    setLoading(false);
  };

  const getFriendsApiCall = async () => {
    const resp = await getFriends();
    setFriend(resp?.data);
  };

  const getRequestsApiCall = async () => {
    const resp = await getFriendRequests();
    setRequest(resp?.data);
  };

  const removeFriendApiCall = async (id) => {
    setMessage("Friend Removed!");
    setType("success");
    setOpen(true);
    setFriend(friend.filter((friend) => friend._id !== id));
    dispatch(
      userdata({
        ...user,
        friends: user?.friends.filter((friend) => friend._id !== id),
      })
    );
    await removeFriend(id);
  };

  const cancelRequestApiCall = async (id) => {
    setMessage("Friend Request Deleted");
    setType("success");
    setOpen(true);
    setRequest(request.filter((request) => request._id !== id));
    dispatch(
      userdata({
        ...user,
        requests: user?.requests.filter((request) => request._id !== id),
      })
    );
    await cancelRequest(id);
    await getSentRequests();
  };

  const acceptFriendRequestApiCall = async (friendData) => {
    setMessage("Friend Request Accepted!");
    setType("success");
    setOpen(true);
    setFriend([...friend, friendData]);
    setRequest(request.filter((request) => request._id !== friendData._id));
    dispatch(
      userdata({
        ...user,
        friends: [...user.friends, friendData],
        requests: user?.request.filter(
          (request) => request._id !== friendData._id
        ),
      })
    );
    await acceptFriendRequest(friendData._id);
    await getSentRequests();
  };

  // SEARCH

  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  useEffect(() => {
    if (!searchQuery && searchOpen) {
      setSearchOpen(false);
      setSearchQuery("");
      setResults([]);
    }
  }, [searchQuery]);

  const onChange = (e) => {
    setSearchQuery(e.target.value);
    debounceSearch(e.target.value);
  };

  const searchApiCall = async (value) => {
    setSearchResLoading(true);
    setSearchOpen(true);
    const res = await searchUser(value);
    if (res?.status === 200) {
      setResults(res?.data?.result);
    }
    setSearchResLoading(false);
    setSearchOpen(true);
  };

  const debounceSearch = _.debounce(searchApiCall, 500);

  const callAddFriendApi = async (friendData) => {
    setSendRequestLoading(true);
    setType("success");
    setOpen(true);
    setMessage("Friend Request Send");
    setSent([...sent, friendData]);
    dispatch(
      userdata({
        ...user,
        sentRequests: user?.sentRequests.filter(
          (req) => req._id !== friendData
        ),
      })
    );
    setSendRequestLoading(false);
    setSearchOpen(false);
    setSearchQuery("");
    setResults([]);
    await addFriend(friendData._id);
  };

  const callGetSentRequests = async () => {
    const res = await getSentRequests();
    setSent(res?.data);
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
    searchResLoading,
    setResults,
    open,
    setOpen,
    searchApiCall,
    callAddFriendApi,
    sent,
    callGetSentRequests,
    cancelRequestApiCall,
    setSearchOpen,
    searchOpen,
    user,
    setSearchResLoading,
    allDataApiCall,
    setFriend,
    setRequest,
    setSent,
  };
};
