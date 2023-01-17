import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import InputField from "../../components/InputField";
import ButtonComponent from "../../components/ButtonComponent";
import { signIn } from "../../lib/getApiCall";
import { login } from "../../features/userSlice";
import { setFriends, setRequests } from "../../features/friendsSlice";
import { useDispatch } from "react-redux";
import AlertComponent from "../../components/AlertComponent";
import "../../styles/index.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [isLoading, setLoading] = useState(false);
  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );
  const openAlert = (open, type, message) => {
    setOpen(open);
    setMessage(message);
    setType(type);
  };

  const handleClick = async () => {
    setLoading(true);
    const res = await signIn({ username, password });
    if (res?.status === 200 && res?.data && res?.data?.user) {
      localStorage.setItem("token", res?.data?.user.token);
      dispatch(login(res?.data?.user));
      navigate("/");
    } else {
      setLoading(false);
      openAlert(true, "error", res?.response?.data?.error);
    }
  };

  useEffect(() => {
    return () => (document.title = "Sign In");
  });

  return (
    <>
      <Grid container className="login">
        <Grid item xs={6} className="loginleft">
          <div className="box">
            <div className="boxcontent">
              <h1>
                A platform for getting closer to your{" "}
                <span className="headingdifferent">Notes.</span>
              </h1>
              <p>create, share and remember.</p>
            </div>
          </div>
        </Grid>
        <Grid item xs={6} className="loginright">
          <div className="box">
            <div className="boxcontent">
              <div className="headercontainer">
                <h1>Hello !!</h1>
                <p>Enter the details you entered while registering.</p>
              </div>
              <div className="inputcontainer">
                <InputField
                  type="email"
                  label={username ? emailRegex.test(username) ? "Email" : "Username" : "Email or Username"}
                  name="email"
                  placeholder={"Email or Username"}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  extraclass={"signinInput"}
                  disabled={isLoading}
                />
                <InputField
                  type="password"
                  label="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  extraclass={"signinInput"}
                  disabled={isLoading}
                />
                <p className="forgetbtn">
                  <NavLink to="/signup">Forgot your password?</NavLink>
                </p>
                <ButtonComponent
                  onClick={handleClick}
                  buttontext="Login"
                  extraclass="loginbtn"
                  isLoading={isLoading}
                  disabled={isLoading || !username || !password}
                />
              </div>
              <div className="forgetcontainer">
                <p>
                  Don’t have an account?
                  <span className="signupbtn">
                    <NavLink to="/signup">Sign Up</NavLink>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      <AlertComponent
        setOpen={setOpen}
        setType={setType}
        setMessage={setMessage}
        alertOpen={open}
        alertMessage={message}
        alertType={type}
      />
    </>
  );
}

export default Login;
