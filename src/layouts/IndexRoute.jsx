import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Loader from "../layouts/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  isLoading,
  loadingState,
  userdata,
  userData,
} from "../features/userSlice";
import { getUser } from "../lib/API_Calls";
import { useNotifications } from "../hooks/notifications";
const IndexRoute = () => {
  const loading = useSelector(loadingState);
  const navigate = useNavigate();
  const user = useSelector(userData);
  const dispatch = useDispatch();
  const { getNotificationsApiCall } = useNotifications();
  useEffect(() => {
    return async () => {
      if (!user || user === null || user === undefined) {
        dispatch(isLoading(true));
        const res = await getUser();
        if (res?.data?.user) {
          dispatch(isLoading(false));
          dispatch(userdata(res?.data?.user));
        } else {
          navigate("/signin");
          dispatch(isLoading(false));
        }
      } 
    };
  }, []);

  useEffect(() => {
    return async () => user && user.id && getNotificationsApiCall();
  }, [window.location.pathname]);

  return (
    <div className="indexRoute">
      <TopBar />
      <SideBar />
      <div className="indexRouteContent">
        <Outlet />
      </div>
      {loading && <Loader visible={loading} />}
    </div>
  );
};

export default IndexRoute;
