import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getToken, isLoading, userdata, userData } from "../features/userSlice";
import { getUser } from "../lib/getApiCall";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const user = useSelector(userData);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    return async () => {
      if (token && (!user || user === null)) {
        dispatch(isLoading(true));
        const response = await getUser(token);
        if(response.status === 200){
          dispatch(userdata(response?.data?.user));
        } else{
          location.removeItem('token')
          navigate('/signin')
        }
        dispatch(isLoading(false));
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
