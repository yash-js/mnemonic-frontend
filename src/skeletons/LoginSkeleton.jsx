import { Grid, Skeleton } from "@mui/material";
import React from "react";

const LoginSkeleton = () => {
  return (
    <Grid container className="login">
      <Grid item xs={6} className="loginleft">
        <div className="box">
          <div className="boxcontent">
            <Skeleton height={500} width={300} />
          </div>
        </div>
      </Grid>
      <Grid item xs={6} className="loginright">
        <div className="box">
          <div className="boxcontent">
          <Skeleton height={500} width={300} />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginSkeleton;
