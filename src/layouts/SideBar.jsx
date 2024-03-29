import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import home from "../assets/images/home.svg";
import friends from "../assets/images/friends.svg";
import mention from "../assets/images/mention.svg";
import shared from "../assets/images/shared.svg";
import "../styles/index.css";

function SideBar() {
  const [active, setActive] = useState("home");
  const navigate = useNavigate();

  const handleClick = (path) => {
    if (path === "/" || !path) {
      navigate(`/`);
      setActive("home");
    } else {
      navigate(`/${path}`);
      setActive(path);
    }
  };

  useEffect(() => {
    return () => handleClick(window.location.pathname.replace("/", ""));
  }, []);

  useEffect(() => {
    return () => handleClick(window.location.pathname.replace("/", ""));
  }, [window.location.pathname]);

  return (
    <div className="sidebar">
      <div className="sidebarcontent">
        <div
          title="Mnemonics"
          className="sidebaritem logo"
          onClick={() => handleClick("/")}
        >
          <img src={logo} alt="logo" width="30px" height="30px" />
        </div>
        <div
          title="Home"
          onClick={() => handleClick("/")}
          className={`${active === "home" ? "active" : "inactive"} sidebaritem`}
        >
          <img src={home} alt="home" width="30px" height="30px" />
        </div>
        <div
          title="Freinds"
          onClick={() => handleClick("friend")}
          className={`${
            active === "friend" ? "active" : "inactive"
          } sidebaritem`}
        >
          <img src={friends} alt="friends" width="30px" height="30px" />
        </div>
        <div
          title="Mentions"
          className={`${
            active === "mention" ? "active" : "inactive"
          } sidebaritem`}
          onClick={() => handleClick("mention")}
        >
          <img src={mention} alt="mention" width="30px" height="30px" />
        </div>
        <div
          title="Shared"
          className={`${
            active === "share" ? "active" : "inactive"
          } sidebaritem`}
          onClick={() => handleClick("share")}
        >
          <img src={shared} alt="shared" width="30px" height="30px" />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
