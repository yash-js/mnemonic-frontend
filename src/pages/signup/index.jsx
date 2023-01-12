import React from "react";
import Grid from "@mui/material/Grid";
import InputField from "../../components/InputField";
import ButtonComponent from "../../components/ButtonComponent";
import "../../styles/index.css";
import { NavLink } from "react-router-dom";
import { Avatar, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";

function index() {
  return (
    <Grid container className="signup">
      <Grid item xs={6} className="signupleft">
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
      <Grid item xs={6} className="signupright">
        <div className="box">
          <div className="boxcontent">
            <div className="headercontainer">
              <h1>Sign Up</h1>
              <p>
                Looks like you don’t have an account. let’s create a new
                account.
              </p>
            </div>
            <div className="inputcontainer">
              <Grid container spacing={2}>
              <Grid
                  display={"flex"}
                  justifyContent="space-evenly"
                  alignItems={"center"}
                  item
                  xs={12}
                >
                    <input
                      style={{ display: "none" }}
                      id="upload-photo"
                      name="upload-photo"
                      type="file"
                    />
                    <Avatar
                      style={{
                        height: "80px",
                        width: "80px",
                      }}
                    />
                    <Fab
                      color="primary"
                      size="small"
                      component="span"
                      aria-label="add"
                      variant="extended"
                    >
                      <Add /> Upload photo
                    </Fab>
                </Grid>
                <Grid item xs={6}>
                  <InputField
                    extraclass={"signupInput"}
                    type="text"
                    label="First Name"
                    name="firstname"
                    value=""
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputField
                    extraclass={"signupInput"}
                    type="text"
                    label="Last Name"
                    name="lastname"
                    value=""
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputField
                    extraclass={"signupInput"}
                    type="email"
                    label="Email"
                    name="email"
                    value=""
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputField
                    extraclass={"signupInput"}
                    type="text"
                    label="User Name"
                    name="username"
                    value=""
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputField
                    extraclass={"signupInput"}
                    type="password"
                    label="Password"
                    name="password"
                    value=""
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputField
                    extraclass={"signupInput"}
                    type="password"
                    label="Confirm Password"
                    name="confirmpassword"
                    value=""
                  />
                </Grid>
                <Grid item xs={12}>
                  <ButtonComponent
                    buttontext="Sign Up"
                    extraclass="signupbtn"
                  />
                </Grid>
              </Grid>
            </div>
            <div className="forgetcontainer">
              <p>
                Already have an account?
                <span className="signupbtn">
                  <NavLink to="/signin">Sign In</NavLink>
                </span>
              </p>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default index;
