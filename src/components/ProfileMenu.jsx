import React, { useState, useEffect } from "react";
import {
  Avatar,
  Fab,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Skeleton,
  Tooltip,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Logout, Add } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut, updateProfile } from "../lib/getApiCall";
import {
  logout,
  userData,
  loadingState,
  setProfiledata,
  userdata,
} from "../features/userSlice";
import { getActivePopOver, setActivePopOver } from "../features/popoverslice";
import PopoverComponent from "./PopoverComponent";
import InputField from "./InputField";
import convertToBase64 from "../helper/Convert";
import AlertComponent from "./AlertComponent";

const ProfileMenu = () => {
  const loading = useSelector(loadingState);
  const user = useSelector(userData);
  const [currentUserData, setCurrentUserdata] = useState({});
  const [editdata, setEditdata] = useState({});
  const [profilemenu, setProfilemenu] = React.useState(null);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openmenu = Boolean(profilemenu);
  const activepopover = useSelector(getActivePopOver);
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    setDisabled(true);
  }, [openmenu]);

  useEffect(() => {
    return () => {
      setCurrentUserdata({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        username: user?.username,
        profilePic: user?.profilePic,
      });
    };
  }, [user]);

  const handleClickMenu = (event) => {
    setProfilemenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setProfilemenu(null);
  };

  const handleSignOut = async () => {
    signOut();
    if (token || token === "" || token === undefined || token === null) {
      localStorage.removeItem("token");
    }
    navigate("/signin");
    dispatch(logout());
  };

  const handleProfile = () => {
    dispatch(setActivePopOver("profile"));
  };

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setEditdata({ ...editdata, profilePic: base64 });
  };

  const onFocusField = () => setError({});

  const onChange = (e) => {
    if (e.target.name === "firstName") {
      if (e.target.value !== userData.firstName) {
        dispatch(setProfiledata(false));
        setEditdata({
          ...editdata,
          [e.target.name]: e.target.value,
        });
        setCurrentUserdata({
          ...userdata,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name === "lastName") {
      if (e.target.value !== userData.lastName) {
        dispatch(setProfiledata(false));
        setEditdata({
          ...editdata,
          [e.target.name]: e.target.value,
        });
        setCurrentUserdata({
          ...currentUserData,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name === "email") {
      if (e.target.value !== userData.email) {
        dispatch(setProfiledata(false));
        setEditdata({
          ...editdata,
          [e.target.name]: e.target.value,
        });
        setCurrentUserdata({
          ...currentUserData,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name === "username") {
      if (e.target.value !== userData.username) {
        dispatch(setProfiledata(false));
        setEditdata({
          ...editdata,
          [e.target.name]: e.target.value,
        });
        setCurrentUserdata({
          ...currentUserData,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setEditdata({});
      setCurrentUserdata({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        username: user?.username,
        file: user?.profilePic,
      });
      dispatch(setProfiledata(true));
    }
  };

  const openAlert = (open, type, message) => {
    setOpen(open);
    setMessage(message);
    setType(type);
  };

  const updateProfileApiCall = async () => {
    if (
      editdata &&
      !editdata?.username &&
      !editdata?.firstName &&
      !editdata?.lastName &&
      !editdata?.email &&
      !editdata?.profilePic
    ) {
      setEditdata({});
      setDisabled(true);
      return openAlert(true, "error", "Nothing to update!");
    } else {
      const res = await updateProfile(editdata);
      if (res?.status === 200) {
        Object.keys(editdata).map((editData) => {
          Object.keys(currentUserData).filter((data) => {
            return data !== editData;
          });
          return null;
        });
        openAlert(true, "success", res?.data?.message);
        dispatch(userdata({ ...currentUserData, editdata }));
        setEditdata({});
        setDisabled(true);
      } else {
          setCurrentUserdata({
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email,
          username: user?.username,
          profilePic: user?.profilePic,
        });
        openAlert(true, "error", res?.response?.data?.error);
        setDisabled(true);
        setEditdata({})
      }
    }
  };

  const popoverprofilecontent = [
    <div className="notebottomcontent profilebox">
      <div className="profileheading">
        <h3>User Profile</h3>
        {disabled && (
          <IconButton
            style={{ width: "40px", height: "40px", background: "#c8c8c866" }}
            onClick={() => setDisabled(false)}
          >
            <EditIcon />
          </IconButton>
        )}
      </div>
      <div className="profilecontent">
        <Grid container spacing={2}>
          <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            className="profilepic"
            item
            xs={12}
            md={4}
          >
            <label
              className="uploadPhotoContainer"
              htmlFor="upload-photo"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "100%",
                height: "180px",
              }}
            >
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                onChange={onUpload}
                accept="image/*"
              />
              <Avatar
                style={{
                  height: "100px",
                  width: "100px",
                  marginBottom: "15px",
                }}
                src={currentUserData?.profilePic || ""}
              />
              <Fab
                color={currentUserData?.profilePic ? "secondary" : "primary"}
                size="small"
                component="span"
                aria-label="add"
                variant="extended"
                disabled={disabled}
              >
                <Add />{" "}
                {currentUserData?.profilePic ? (
                  <> Change photo</>
                ) : (
                  <> Upload photo</>
                )}
              </Fab>
            </label>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputField
                  extraclass={"signupInput"}
                  type="text"
                  label="First Name"
                  name="firstName"
                  value={currentUserData?.firstName}
                  onChange={onChange}
                  disabled={disabled}
                  error={error && error.field === "firstName"}
                  errorText={
                    error && error.field === "firstName" && error.error
                  }
                  onFocusField={onFocusField}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  extraclass={"signupInput"}
                  type="text"
                  label="Last Name"
                  name="lastName"
                  value={currentUserData?.lastName}
                  onChange={onChange}
                  disabled={disabled}
                  error={error && error.field === "lastName"}
                  errorText={error && error.field === "lastName" && error.error}
                  onFocusField={onFocusField}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  extraclass={"signupInput"}
                  type="email"
                  label="Email"
                  name="email"
                  value={currentUserData?.email}
                  onChange={onChange}
                  disabled={disabled}
                  error={error && error.field === "email"}
                  errorText={error && error.field === "email" && error.error}
                  onFocusField={onFocusField}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  extraclass={"signupInput"}
                  type="text"
                  label="User Name"
                  name="username"
                  value={currentUserData?.username}
                  onChange={onChange}
                  disabled={disabled}
                  error={error && error.field === "username"}
                  errorText={error && error.field === "username" && error.error}
                  onFocusField={onFocusField}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <AlertComponent
        setOpen={setOpen}
        setType={setType}
        setMessage={setMessage}
        alertOpen={open}
        alertMessage={message}
        alertType={type}
      />
    </div>,
  ];

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
                src={user && user?.profilePic}
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
          <Avatar src={user && user?.profilePic} /> Profile
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sign Out
        </MenuItem>
      </Menu>
      {activepopover === "profile" && (
        <PopoverComponent
          profiledata={editdata}
          popoverclassname={"profile"}
          popovercontent={popoverprofilecontent}
          popoverstate={true}
          updateProfile={updateProfileApiCall}
          saveBtnDisabled={disabled}
        />
      )}
    </>
  );
};

export default ProfileMenu;
