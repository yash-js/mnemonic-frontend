import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Loader from "../layouts/Loader";
import { useSelector } from "react-redux";
import { loadingState } from "../features/userSlice";

const IndexRoute = () => {
  const loading = useSelector(loadingState);
  const navigate = useNavigate();
  useEffect(() => {
    return () => {
      if (localStorage && !localStorage.getItem("token")) {
        navigate("/signin");
      }
    };
  }, []);

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
