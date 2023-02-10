import React, { useEffect } from "react";
import { Box } from "@mui/system";
import InputField from "./InputField";
import search from "../assets/images/search.svg";
import FriendCard from "../layouts/FriendCard";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useFriends } from "../hooks/friends";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { mnemonic } from "../lib/axios";
import { useState } from "react";
import { TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { userData } from "../features/userSlice";
const Searchbar = () => {
  const user = useSelector(userData);
  const [q, setQ] = useState("");
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    results,
    searchOpen,
    searchResLoading,
    setResults,
    callAddFriendApi,
    sendRequestLoading,
    sent,
    friend,
    setFriend,
    setRequest,
    setSent,
  } = useFriends();

  const getOptions = async () => {
    const res = await mnemonic.get("/user/all");
    if (res?.data?.result.length > 0) {
      _.remove(res?.data?.result, function (u) {
        return u?._id === user?.id;
      });
    }
    setResults(res?.data?.result.filter((res) => res._id !== user.id));
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setFriend(user?.friends);
    setSent(user?.sentRequests);
    setRequest(user?.requests);
    return async () => await getOptions();
  }, []);
  return (
    <>
      <Autocomplete
        disabled={loading}
        id="asynchronous-demo"
        sx={{ width: "100%" }}
        isOptionEqualToValue={(option, value) =>
          option.username === value.username
        }
        getOptionLabel={(option) => option.username}
        options={results}
        noOptionsText={"User Not Found"}
        onChange={(event, value) => setValue(value)}
        renderInput={(params) => (
          <InputField
            disabled={loading}
            extraclass={"searchField"}
            params={params}
            placeholder={loading ? "Loading..." : "Username"}
            starticon={search}
            starticoncss={{
              width: "25px",
              marginLeft: "5px",
              cursor: "pointer",
            }}
            aria-controls={searchOpen ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={searchOpen ? "true" : undefined}
            onChange={(e) => setQ(e.target.value)}
            value={q}
            endIcoTooltip={"Search"}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {searchResLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                </React.Fragment>
              ),
            }}
          />
        )}
        ListboxProps={{ style: { display: !q || !results ? "none" : "block" } }}
        renderOption={(props, option) => (
          <Box
            sx={{ display: !q ? "none" : "block" }}
            key={option._id}
            className="customOptionContainer"
          >
            <FriendCard
              profileFirstname={option?.firstName}
              profileusername={option?.username}
              profileimage={option?.profilePic}
              porfileLastname={option?.lastName}
              friendsadd={() => callAddFriendApi(option)}
              custombuttonrequestclass={"searchAddFriend"}
              disabled={
                sent &&
                sent.length > 0 &&
                sent.filter((request) => request._id === option._id).length > 0
              }
              requestBtnText={
                sent &&
                sent.length > 0 &&
                sent.filter((s) => s?._id === option?._id).length > 0
                  ? "Requested"
                  : friend &&
                    friend.length > 0 &&
                    friend.filter((f) => f?._id === option?._id).length > 0
                  ? undefined
                  : "Add"
              }
              isLoading={sendRequestLoading}
            />
          </Box>
        )}
      />
    </>
  );
};

export default Searchbar;
