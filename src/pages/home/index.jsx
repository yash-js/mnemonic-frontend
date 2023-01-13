import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../layouts/SideBar";
import TopBar from "../../layouts/TopBar";

const Home = () => {
  return (
    <div className="home">
      <SideBar />
      <TopBar />
      <div className="homecontent">
        <Outlet />
      </div>
    </div>
  )
};

export default Home;
