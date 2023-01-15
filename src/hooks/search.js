import React, { useState } from "react";
import { searchUser } from "../lib/getApiCall";

export const useSearch = () => {
  const [searchResLoading, setSearchResLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = React.useState(false);
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
    setSearchQuery
  };
};
