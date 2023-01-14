import React from 'react'
import { NotificationsOutlined } from '@mui/icons-material';
import { Box, IconButton, Menu, Tooltip, Badge, MenuItem } from '@mui/material';
import AlertComponent from './AlertComponent';

const Notifications = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [unreadCount, setUnreadCount] = React.useState(0);
    const [notification, setNotification] = React.useState([
      {
        alertMessage: 'succesfully added',
        alertType: 'success',
      },
      {
        alertMessage: 'succesfully removed',
        alertType: 'success',
      },
      {
        alertMessage: 'unbale to update',
        alertType: 'warning',
      }
    ])
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setUnreadCount(unreadCount + 1)
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
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
              <Badge badgeContent={unreadCount} color="primary">
                <NotificationsOutlined sx={{ width: 40, height: 'auto' }} />
              </Badge>
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
          {
            notification.map((item, index) => {
              return (
                <MenuItem key={index}>
                  <AlertComponent name='notification' alertOpen={true} alertMessage={item.alertMessage} alertType={item.alertType} />
                </MenuItem>
              )
            })
          }
        </Menu>
      </>
    );
}

export default Notifications