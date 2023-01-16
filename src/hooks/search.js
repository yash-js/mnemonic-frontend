import React, { useState } from "react";
import {
  sentRequestsLoadingState,
  setSentRequests,
  setSentRequestsLoading,
} from "../features/friendsSlice";
import { addFriend, searchUser } from "../lib/getApiCall";
import { useDispatch, useSelector } from "react-redux";
export const useSearch = () => {
  const [searchResLoading, setSearchResLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = React.useState(false);
  const sendRequestLoading = useSelector(sentRequestsLoadingState);
  const dispatch = useDispatch();
  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  const onChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const searchApiCall = () => {
    setOpen(true);
    setSearchResLoading(true);
    setTimeout(async () => {
      const res = await searchUser(searchQuery);
      setResults(res?.data?.result);
      setSearchResLoading(false);
    }, 1500);
    return clearTimeout();
  };

  const callAddFriendApi = async (friend) => {
    dispatch(setSentRequestsLoading(true));
    const res = await addFriend(friend._id);
    if (res === 200) {
      dispatch(setSentRequests(friend));
      dispatch(setSentRequestsLoading(false));
      console.log("added", res);
    } else {
      dispatch(setSentRequestsLoading(false));
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
    if (!open) {
      setResults([]);
    }
  }, [open]);

  return {
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
  };
};
