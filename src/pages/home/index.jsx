import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../layouts/Sidebar";
import TopBar from "../../layouts/TopBar";

const Home = () => {
  return (
    <div className="home">
      <TopBar />
      <SideBar />
      <div className="homecontent">
        <Outlet />
      </div>
    </div>
  )
};

export default Home;
