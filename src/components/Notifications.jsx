import React, { useEffect } from "react";
import { NotificationsOutlined } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Menu,
  Tooltip,
  Badge,
  MenuItem,
  Avatar,
  Typography,
} from "@mui/material";
import { useNotifications } from "../hooks/notifications";

const Notifications = () => {
  const {
    anchorEl,
    open,
    unread,
    all,
    user,
    handleClick,
    handleClose,
    notificationOnClick,
    setAll,
    setUnread,
  } = useNotifications();

  useEffect(() => {
    return async () => {
      if (user || user !== null || user !== undefined) {
        setAll(user?.notification);
        setUnread(user?.latest);
      }
    };
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Notifications">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {unread && unread.length > 0 ? (
              <Badge badgeContent={unread.length} color="primary">
                <NotificationsOutlined sx={{ width: 40, height: "auto" }} />
              </Badge>
            ) : (
              <NotificationsOutlined sx={{ width: 40, height: "auto" }} />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="notificationmenu"
        open={open}
        onClose={handleClose}
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
        {all && all.length > 0 ? (
          all.map((item, index) => {
            return (
              <MenuItem
                onClick={() => notificationOnClick(item?._id)}
                key={index}
              >
                <Box width={60}>
                  <Avatar
                    style={{
                      width: "50px",
                      height: "50px",
                    }}
                    src={item?.from?.profilePic}
                  />
                </Box>
                <Box width={250}>
                  <Typography variant="h6">@{item?.from?.username}</Typography>
                  <Typography>{item.message}</Typography>
                </Box>
                {/* <AlertComponent
                  name="notification"
                  alertOpen={true}
                  alertMessage={item[index].message}
                  alertType={"success"}
                  setOpen={() => {}}
                /> */}
              </MenuItem>
            );
          })
        ) : (
          <p className="noNotifications">No Notifications</p>
        )}
      </Menu>
    </>
  );
};

export default Notifications;
