import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import InputField from "../../components/InputField";
import ButtonComponent from "../../components/ButtonComponent";
import "../../styles/index.css";
import { signIn } from "../../lib/getApiCall";
import { login, selectUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import AlertComponent from "../../components/AlertComponent";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser)
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const openAlert = (open ,type, message) => {
    setOpen(open);
    setMessage(message);
    setType(type);
  }

  const handleClick = async () => {
    const res = await signIn({ email, password });
    if (res?.status === 200) {
      dispatch(login(res?.data?.token));
      navigate("/");
    } else {
      openAlert(true,"error", res?.response?.data?.error);
    }
  };

  useEffect(() => {
    return () => user && navigate("/");
  });

  return (
    <>
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
        </Grid>
      </Grid>
      <AlertComponent alertOpen={open} alertMessage={message} alertType={type}/>
    </>
  );
}

export default Login;
