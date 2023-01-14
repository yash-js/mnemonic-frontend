import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getToken, isLoading, userdata, userData,  } from "../features/userSlice";
import { getUser } from "../lib/getApiCall";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const token = useSelector(getToken);
  const user = useSelector(userData);
  const dispatch = useDispatch();
  console.log(userData);
  useEffect(() => {
    return async () => {
      if (token && (!user || user === null)) {
        dispatch(isLoading(true))
        const response = await getUser(token);
        dispatch(userdata(response?.data?.user));
        dispatch(isLoading(false))
        console.log(response);
      }
    };
  });
  if (!token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
