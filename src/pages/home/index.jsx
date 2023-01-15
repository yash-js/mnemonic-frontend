import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Mnemonic";
  });
  return (
    <>
      <div className="home">
        <div className="homecontent">Home</div>
      </div>
    </>
  );
};

export default Home;
