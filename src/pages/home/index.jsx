import React, { useEffect } from "react";
import PopoverComponent from "../../components/PopoverComponent";

const Home = () => {
  useEffect(() => {
    document.title = "Mnemonic";
  });

  const popovercontent = [
    <>
      <h1>nemonic notes</h1>
    </>
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
