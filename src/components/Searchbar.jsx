import React from "react";
import { Box } from "@mui/system";
import InputField from "./InputField";
import search from "../assets/images/search.svg";
import FriendCard from "../layouts/FriendCard";
import { useSearch } from "../hooks/search";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

const Searchbar = () => {
  const {
    onChange,
    searchQuery,
    results,
    open,
    searchResLoading,
    setOpen,
    searchApiCall,
    setSearchQuery,
  } = useSearch();


  return (
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
      open={open}
      onOpen={() => (searchQuery ? searchApiCall() : null)}
      onClose={() => {
        setOpen(false);
        setSearchQuery("");
      }}
      getOptionLabel={(option) => option.firstName}
      noOptionsText={"User Not Found"}
      loading={searchResLoading}
      options={results}
      renderOption={(props, option) => (
        <Box className="customOptionContainer">
          <FriendCard
            profileFirstname={option?.firstName}
            profileusername={option?.username}
            profileimage={option?.profilePic}
            porfileLastname={option?.lastName}
            name={'friendsuggestion'}
          />
        </Box>
      )}
      renderInput={(params) => (
        <InputField
          extraclass={"searchField"}
          params={params}
          placeholder={"Search"}
          starticon={search}
          starticoncss={{ width: "25px", marginLeft: "5px", cursor: "pointer" }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
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
  );

  // const {
  //   onChange,
  //   searchQuery,
  //   results,
  //   anchorEl,
  //   open,
  //   handleClose,
  //   searchResLoading,
  // } = useSearch();

  // return (
  //   <>
  //     <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
  //       <div className="searchbarbox">
  //         <InputField
  //           placeholder={"Search"}
  //           endicon={search}
  //           endiconcss={{ width: "25px", marginRight: "10px", cursor: 'pointer' }}
  //           aria-controls={open ? "account-menu" : undefined}
  //           aria-haspopup="true"
  //           aria-expanded={open ? "true" : undefined}
  //           onChange={onChange}
  //           value={searchQuery}
  //           endIcoTooltip={'Search'}
  //           InputProps={{
  //             ...params.InputProps,
  //             endAdornment: (
  //               <React.Fragment>
  //                 {loading ? <CircularProgress color="inherit" size={20} /> : null}
  //                 {params.InputProps.endAdornment}
  //               </React.Fragment>
  //             ),
  //           }}
  //         />
  //       </div>
  //     </Box>
  //     {/* <Box>
  //       <div className="resultContainer">
  //         <MenuItem >
  //           <FriendCard
  //             name={"friend"}
  //             profileFirstname={"adsd"}
  //             porfileLastname={"adsd"}
  //             profileusername={"adsd"}
  //             profileimage={"adsd"}
  //           />
  //         </MenuItem>
  //       </div>
  //     </Box> */}
  //     <Menu
  //       anchorEl={anchorEl}
  //       id="notificationmenu"
  //       open={open}
  //       onClose={handleClose}
  //       className="searchResultContainer"
  //       transformOrigin={{ horizontal: "right", vertical: "top" }}
  //       anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
  //     >
  //       {searchResLoading ? (
  //         <MenuItem >
  //           <Skeleton
  //             width={"100%"}
  //             height={100}
  //             style={{
  //               borderRadius: 20,
  //             }}
  //           />
  //         </MenuItem>
  //       ) : results && results.length > 0 ? (
  //         results.map((user) => (
  //           <MenuItem key={user._id}>
  //             <FriendCard
  //               name={"friend"}
  //               profileFirstname={user?.firstName}
  //               porfileLastname={user?.lastName}
  //               profileusername={user?.username}
  //               profileimage={user?.profilePic}
  //             />
  //           </MenuItem>
  //         ))
  //       ) : (
  //         <p className="noFriends"> User Not Found</p>
  //       )}
  //     </Menu>
  //   </>
  // );
};

export default Searchbar;
