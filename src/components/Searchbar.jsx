import React from "react";
import { Box } from "@mui/system";
import InputField from "./InputField";
import search from "../assets/images/search.svg";
import FriendCard from "../layouts/FriendCard";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useFriends } from "../hooks/friends";
import { useNavigate } from "react-router-dom";
const Searchbar = () => {
  const navigate = useNavigate();
  const {
    onChange,
    searchQuery,
    results,
    searchOpen,
    searchResLoading,
    setSearchOpen,
    searchApiCall,
    setSearchQuery,
    setResults,
    callAddFriendApi,
    sendRequestLoading,
    sent,
    callGetSentRequests,friend
  } = useFriends();

  return (
    <>
      <Autocomplete
        id="asynchronous-demo"
        sx={{
          width: 300,
          "& .MuiOutlinedInput-root": {
            borderRadius: "0",
          },
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #eee",
          },
        }}
        open={searchOpen}
        onOpen={() => (searchQuery ? searchApiCall() : null)}
        onClose={() => {
          setSearchOpen(false);
          setSearchQuery("");
          setResults([]);
        }}
        getOptionLabel={(option) => option.firstName}
        noOptionsText={"User Not Found"}
        loading={searchResLoading}
        options={results}
        onFocus={() => {
          !window.location.pathname !== "/friend" && navigate("/friend");
          callGetSentRequests();
        }}
        renderOption={(props, option) => (
          <Box key={option._id} className="customOptionContainer">
            <FriendCard
              profileFirstname={option?.firstName}
              profileusername={option?.username}
              profileimage={option?.profilePic}
              porfileLastname={option?.lastName}
              friendsadd={() => callAddFriendApi(option)}
              custombuttonrequestclass={"searchAddFriend"}
              disabled={
                sent.filter((request) => request._id === option._id).length > 0
              }
              requestBtnText={
                sent.filter((request) => request._id === option._id).length > 0
                  ? "Requested"
                  : friend.filter((f) => f._id === option._id).length > 0
                  ? null
                  : "Add"
              }
              isLoading={sendRequestLoading}
            />
          </Box>
        )}
        renderInput={(params) => (
          <InputField
            extraclass={"searchField"}
            params={params}
            placeholder={"Search"}
            starticon={search}
            starticoncss={{
              width: "25px",
              marginLeft: "5px",
              cursor: "pointer",
            }}
            aria-controls={searchOpen ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={searchOpen ? "true" : undefined}
            onChange={onChange}
            value={searchQuery}
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
      />
    </>
  );
};

export default Searchbar;
