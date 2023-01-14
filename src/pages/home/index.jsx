import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../layouts/SideBar";
import TopBar from "../../layouts/TopBar";

const Home = () => {
  useEffect(() => {
    document.title = "Mnemonic";
  });
  return (
    <div className="home">
      <TopBar />
      <SideBar />
      <div className="homecontent">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
