import React from "react";
import { Box } from "@mui/system";
import InputField from "./InputField";
import search from "../assets/images/search.svg";
import FriendCard from "../layouts/FriendCard";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useFriends } from "../hooks/friends";
import { useNavigate } from "react-router-dom";
import AlertComponent from "./AlertComponent";

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
    open,
    setOpen,
    message,
    setMessage,
    type,
    setType,
  } = useFriends();
console.log('SEARCH', searchOpen);
  return (
    <>
      <Autocomplete
        id="asynchronous-demo"
        sx={{
          width: 300,
          "& .MuiOutlinedInput-root": {
            // border: "1px solid yellow",
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
        onFocus={() =>
          !window.location.pathname !== "/friend" && navigate("/friend")
        }
        renderOption={(props, option) => (
          <Box className="customOptionContainer">
            <FriendCard
              profileFirstname={option?.firstName}
              profileusername={option?.username}
              profileimage={option?.profilePic}
              porfileLastname={option?.lastName}
              friendsadd={() => callAddFriendApi(option)}
              custombuttonrequestclass={"searchAddFriend"}
              disabled={sent.filter((request) => request._id === option._id)}
              requestBtnText={
                sent.filter((request) => request._id === option._id)
                  ? "Requested"
                  : "Add Friend"
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
      <AlertComponent
        setOpen={setOpen}
        setType={setType}
        setMessage={setMessage}
        alertOpen={open}
        alertMessage={message}
        alertType={type}
      />
    </>
  );
};

export default Searchbar;
