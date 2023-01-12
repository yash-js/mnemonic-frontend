import React, { useEffect } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import InputField from "../../component/InputField";
import ButtonComponent from "../../component/ButtonComponent";
import "../../styles/index.css";
import { useState } from "react";
import { signIn } from "../../lib/getApiCall";
import { login, selectUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import AlertComponent from "../../component/AlertComponent";
import { Alert, Snackbar } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();
  const user = useSelector(selectUser)

  const openAlert = (type, message) => {
    setOpen(true);
    setType(type);
    setMessage(message);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setType("");
    setMessage("");
  };

  const handleClick = async () => {
    const res = await signIn({ email, password });
    if (res?.status === 200) {
      dispatch(login(res?.data?.token));
      navigate("/");
    } else {
      alert(res.status === 400);
      openAlert("error", res?.response?.data?.error);
    }
  };

  useEffect(() => {
    return () => user && navigate("/");
  });

  return (
    <Grid container className="login">
      <Grid item xs={6} className="loginleft">
        <div className="box">
          <div className="boxcontent">
            <h1>
              A platform for getting closer to your{" "}
              <sapn className="headingdifferent">Notes.</sapn>
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
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                type="password"
                label="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <ButtonComponent
                onClick={handleClick}
                buttontext="Login"
                extraclass="loginbtn"
              />
            </div>
            <div className="forgetcontainer">
              <p>
                Don’t have an account?
                <span className="signupbtn">
                  <NavLink to="/signup">Sign Up</NavLink>
                </span>
              </p>
              <p className="forgetbtn">
                <NavLink to="/signup">Forgot your password?</NavLink>
              </p>
            </div>
          </div>
        </div>
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={type} >
            {message}
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
}

export default Login;
