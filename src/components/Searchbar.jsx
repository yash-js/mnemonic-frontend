import { Menu, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import InputField from "./InputField";
import search from "../assets/images/search.svg";
import FriendCard from "../layouts/FriendCard";

const Searchbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <div onClick={handleClick} className="searchbarbox">
          <InputField
            placeholder={"Search"}
            starticon={search}
            starticoncss={{ width: "30px", marginRight: "10px" }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          />
        </div>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="notificationmenu"
        open={open}
        onClose={handleClose}
        className="searchResultContainer"
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <FriendCard name={"friend"}  
          profileFirstname='John'
          profileusername={'john'}
          profileimage={'https://ui-avatars.com/api/?name=John+Doe'}
          />
        </MenuItem>
        <MenuItem>
          <FriendCard name={"friend"}  
          profileFirstname='John'
          profileusername={'john'}
          profileimage={'https://ui-avatars.com/api/?name=John+Doe'}
          />
        </MenuItem>
        <MenuItem>
          <FriendCard name={"friend"}  
          profileFirstname='John'
          profileusername={'john'}
          profileimage={'https://ui-avatars.com/api/?name=John+Doe'}
          />
        </MenuItem>
        <MenuItem>
          <FriendCard name={"friend"}  
          profileFirstname='John'
          profileusername={'john'}
          profileimage={'https://ui-avatars.com/api/?name=John+Doe'}
          />
        </MenuItem>
        <MenuItem>
          <FriendCard name={"friend"}  
          profileFirstname='John'
          profileusername={'john'}
          profileimage={'https://ui-avatars.com/api/?name=John+Doe'}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default Searchbar;
