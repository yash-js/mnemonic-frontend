import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../features/userSlice";

const Home = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  useEffect(() => {
    return () => !user && navigate("/signin");
  });
  return <h1>Homepage</h1>;
};

export default Home;
