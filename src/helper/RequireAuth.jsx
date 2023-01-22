import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { isLoading, logout, userdata, userData } from "../features/userSlice";
import { getUser } from "../lib/getApiCall";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const user = useSelector(userData);
  const dispatch = useDispatch();
  useEffect(() => {
    return async () => {
      if (token && !user) {
        dispatch(isLoading(true));
        const response = await getUser();
        dispatch(userdata(response?.data?.user));
        console.log(user);
      }
      dispatch(isLoading(false));
    };
  }, [user]);
  if (!localStorage && localStorage.getItem("token")) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    dispatch(logout());
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
