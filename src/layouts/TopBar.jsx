import React from "react";
import InputField from "../components/InputField";
import search from "../assets/images/search.svg";
import ProfileMenu from "../components/ProfileMenu";
import { useSelector } from "react-redux";
import { loadingState, userData } from "../features/userSlice";
import Notifications from "../components/Notifications";
import { Skeleton } from "@mui/material";

function TopBar() {
  const user = useSelector(userData);
  const loading = useSelector(loadingState);

  return (
    <div className="topbar">
      <div className="searchbarbox">
        <InputField
          placeholder={"search"}
          starticon={search}
          starticoncss={{ width: "30px", marginRight: "10px" }}
        />
      </div>
      <div className="profilebox">
        <div className="notificationbox">
          <Notifications />
        </div>
        <div className="profileimagebox">
          <div className="profilename">
            {loading ? (
              <>
                <Skeleton width={70} height={30} />
                <Skeleton width={70} height={30} />
              </>
            ) : (
              <>
                <h3>{`${user?.firstName} ${user?.lastName}`}</h3>
                <h4>@{user?.username}</h4>
              </>
            )}
          </div>
          <div style={{ marginRight: "10px" }}>
            <ProfileMenu loading={loading} profilePic={user?.profilePic} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
