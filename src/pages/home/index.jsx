import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import PopoverComponent from "../../components/PopoverComponent";
import ButtonComponent from "../../components/ButtonComponent";

const Home = () => {
  useEffect(() => {
    document.title = "Mnemonic";
  });

  const popovercontent = [
    <h1>Hello World!!!</h1>
  ]

  return (
    <>
      <div className="home">
        <div className="homecontent">
          Home
          <PopoverComponent popoverclassname='homecontentpopover' popovercontent={popovercontent} />
        </div>
      </div>
    </>
  );
};

export default Home;
