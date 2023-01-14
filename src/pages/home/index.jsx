import React, { useEffect } from "react";
import Loader from "../../layouts/Loader";
import { useSelector } from "react-redux";
import { loadingState } from "../../features/userSlice"

const Home = () => {
  const loading = useSelector(loadingState);
  
  useEffect(() => {
    document.title = "Mnemonic";
  });
  return (
    <>
      <div className="home">
        <div className="homecontent">Home</div>
      </div>
      {loading && <Loader visible={loading}/>}
    </>
  );
};

export default Home;
