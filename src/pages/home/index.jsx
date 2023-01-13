import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../layouts/Sidebar";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homecontent">
        <Outlet />
      </div>
    </div>
  )
};

export default Home;
