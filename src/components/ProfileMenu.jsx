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
import { signOut, signUp } from "../lib/getApiCall";
import {
  logout,
  userData,
  loadingState,
} from "../features/userSlice";
import { getActivePopOver, setActivePopOver } from "../features/popoverslice";
import PopoverComponent from "./PopoverComponent";
import InputField from "./InputField";
import AlertComponent from "./AlertComponent";
import convertToBase64 from "../helper/Convert";

const ProfileMenu = () => {
  const loading = useSelector(loadingState);
  const user = useSelector(userData);
  const [profilemenu, setProfilemenu] = React.useState(null);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(user?.username);
  const [type, setType] = useState("");
  const [file, setFile] = useState(user?.profilePic);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState({});
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoadingEdit, setLoadingEdit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openmenu = Boolean(profilemenu);
  const activepopover = useSelector(getActivePopOver);
  const token = localStorage.getItem("token");
  useEffect(() => {
    setDisabled(true);
  }, [profilemenu]);

  const openAlert = (open, type, message) => {
    setOpen(open);
    setMessage(message);
    setType(type);
  };

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

  const handleClick = async () => {
    onFocusField();
    setLoadingEdit(true);
    const res = await signUp({
      firstName,
      lastName,
      email,
      password,
      username,
      profilePic: file,
    });
    if (res?.status === 200) {
      setLoadingEdit(false);
      navigate("/signin");
    } else {
      setLoadingEdit(false);
      if (res?.response?.data?.field) {
        setError({
          field: res?.response?.data?.field,
          error: res?.response?.data?.error,
        });
      } else {
        openAlert(true, "error", res?.response?.data?.error);
      }
    }
  };

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  const onFocusField = () => setError({});

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
            display={"flex"}
            flexDirection={"column"}
            justifyContent="space-evenly"
            alignItems={"center"}
            item
            xs={12}
          >
            <label className="uploadPhotoContainer" htmlFor="upload-photo">
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
                src={file || ""}
              />
              <Fab
                color={file ? "secondary" : "primary"}
                size="small"
                component="span"
                aria-label="add"
                variant="extended"
                disabled={disabled}
              >
                <Add /> {file ? <> Change photo</> : <> Upload photo</>}
              </Fab>
            </label>
          </Grid>
          <Grid item xs={6}>
            <InputField
              extraclass={"signupInput"}
              type="text"
              label="First Name"
              name="firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isLoadingEdit || disabled}
              error={error && error.field === "firstName"}
              errorText={error && error.field === "firstName" && error.error}
              onFocusField={onFocusField}
            />
          </Grid>
          <Grid item xs={6}>
            <InputField
              extraclass={"signupInput"}
              type="text"
              label="Last Name"
              name="lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isLoadingEdit || disabled}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoadingEdit || disabled}
              error={error && error.field === "email"}
              errorText={error && error.field === "email" && error.error}
              onFocusField={onFocusField}
            />
          </Grid>
          <Grid item xs={6}>
            <InputField
              extraclass={"signupInput"}
              type="text"
              label="User Name"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoadingEdit || disabled}
              error={error && error.field === "username"}
              errorText={error && error.field === "username" && error.error}
              onFocusField={onFocusField}
            />
          </Grid>
          <Grid item xs={6}>
            <InputField
              extraclass={"signupInput"}
              type="password"
              label="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoadingEdit || disabled}
              error={error && error.field === "password"}
              errorText={error && error.field === "password" && error.error}
              onFocusField={onFocusField}
            />
          </Grid>
        </Grid>
      </div>
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
          popoverclassname={"profile"}
          popovercontent={popoverprofilecontent}
          popoverstate={true}
        />
      )}
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

export default ProfileMenu;
