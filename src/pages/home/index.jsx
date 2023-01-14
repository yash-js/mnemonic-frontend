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
      <div className="homecontent">Home</div>
    </div>
  );
};

export default Home;
