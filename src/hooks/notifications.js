import { useDispatch, useSelector } from "react-redux";
import { getNotications } from "../lib/API_Calls";
import { userdata, userData } from "../features/userSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mnemonic } from "../lib/axios";

export const useNotifications = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [unread, setUnread] = useState([]);
  const [all, setAll] = useState([]);
  const user = useSelector(userData);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setUnread([]);
    setTimeout(() => {
      handleClose();
      if (all && all.length > 0) {
        dispatch(
          userdata({
            ...user,
            latest: [],
          })
        );
        onClickHandle();
      }
    }, 10000);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getNotificationsApiCall = async () => {
    const res = await getNotications();
    setUnread(res?.data?.latest);
    setAll(res?.data?.notification);
  };

  const onClickHandle = async () => {
    try {
      await mnemonic.put(`/user/notifications`, {});
      return setUnread([]);
    } catch (error) {
      return error;
    }
  };

  const removeNotificationApiCall = async (id) => {
    try {
      setUnread([]);
      await mnemonic.put(`/user/notification/remove/${id}`, {});
      return setUnread([]);
    } catch (error) {
      return error;
    }
  };

  const notificationOnClick = (message) => {
    if (message && message.includes("mentioned")) {
      navigate("/mention");
    } else {
      navigate("/friend");
    }
    handleClose();
  };
  return {
    anchorEl,
    setAnchorEl,
    open,
    navigate,
    unread,
    setUnread,
    all,
    setAll,
    user,
    useSelector,
    handleClick,
    handleClose,
    getNotificationsApiCall,
    onClickHandle,
    removeNotificationApiCall,
    notificationOnClick,
  };
};
