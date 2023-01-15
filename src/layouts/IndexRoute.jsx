import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Loader from "../layouts/Loader";
import { useSelector } from "react-redux";
import { loadingState } from "../features/userSlice"

const IndexRoute = () => {
  const loading = useSelector(loadingState);
  return (
    <div className="indexRoute">
      <TopBar />
      <SideBar />
      <div className="indexRouteContent">
        <Outlet />
      </div>
      {loading && <Loader visible={loading}/>}
    </div>
  );
};

export default IndexRoute;
