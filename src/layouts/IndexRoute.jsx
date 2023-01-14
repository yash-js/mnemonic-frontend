import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

const IndexRoute = () => {
  return (
    <div className="indexRoute">
      <TopBar />
      <SideBar />
      <div className="indexRouteContent">
        <Outlet />
      </div>
    </div>
  );
};

export default IndexRoute;
