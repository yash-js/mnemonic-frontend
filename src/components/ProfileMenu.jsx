import { Logout } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Skeleton,
  Tooltip,
} from "@mui/material";
import React from "react";
import PopoverComponent from "./PopoverComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, isLoading } from "../features/userSlice";
import { getActivePopOver, setActivePopOver } from "../features/popoverslice";
import { signOut } from "../lib/getApiCall";

const ProfileMenu = ({ profilePic, loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activepopover = useSelector(getActivePopOver);
  const [profilemenu, setProfilemenu] = React.useState(null);
  const openmenu = Boolean(profilemenu);

  const handleClickMenu = (event) => {
    setProfilemenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setProfilemenu(null);
  };

  const handleSignOut = async () => {
    dispatch(isLoading(true));
    const res = await signOut();
    if (res.status === 200) {
      localStorage.removeItem("token");
      navigate("/signin");
      dispatch(isLoading(false));
      dispatch(logout());
    }
  };

  const handleProfile = () => {
    dispatch(setActivePopOver("profile"));
  }
  
  const popoverprofilecontent = [
    <div className="notebottomcontent profilebox">
      <div className="profileheading">
        <h3>User Profile</h3>
      </div>
      <div className="profilecontent">
        <h1>Profile Details</h1>
      </div>
    </div>
  ]

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account">
          <IconButton
            onClick={handleClickMenu}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={openmenu ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openmenu ? "true" : undefined}
            className="profileimage"
          >
            {loading ? (
              <Skeleton
                width={50}
                height={80}
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <Avatar
                sx={{ width: 50, height: "auto" }}
                src={profilePic}
                className="profileavatar"
              />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={profilemenu}
        id="account-menu"
        open={openmenu}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleProfile}>
          <Avatar src={profilePic} /> Profile
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sign Out
        </MenuItem>
      </Menu>
      {
        activepopover === 'profile' && <PopoverComponent popoverclassname={'profile'} popovercontent={popoverprofilecontent} popoverstate={true}/>
      }
    </>
  );
};

export default ProfileMenu;
