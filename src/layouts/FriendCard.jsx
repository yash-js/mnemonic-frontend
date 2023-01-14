import React from "react";
import ButtonComponent from "../components/ButtonComponent";

function FriendCard({
  name,
  profileimage,
  profileFirstname,
  porfileLastname,
  profileusername,
  custombuttonacceptclass,
  custombuttonremoveclass,
  custombuttonrequestclass,
  onClick
}) {
  return (
    <div className="friendcard">
      <div className="profileimagebox">
        <div className="profileimage">
          <img src={profileimage} alt="notification" />
        </div>
        <div className="profilename">
          <h3>{profileFirstname + " " + porfileLastname}</h3>
          <h4>@{profileusername}</h4>
        </div>
      </div>
      <div className="friendactions">
        {name === "friendrequest" || name === "friends" ? (
          <div
            className={`remove ${
              custombuttonremoveclass ? "custombuttonremoveclass" : null
            }`}
          >
            <ButtonComponent
              color={"error"}
              extraclass="removebutton"
              onClick={onClick}
              buttontext={custombuttonremoveclass ? "Delete" : "Remove"}
            />
          </div>
        ) : null}
        {name === "friendrequest" && (
          <div className={`accept ${custombuttonacceptclass}`}>
            <ButtonComponent
              color={"primary"}
              extraclass="acceptbutton"
              buttontext="Accept"
            />
          </div>
        )}
        {name === "friendsuggestion" && (
          <div
            className={`request ${
              custombuttonrequestclass ? "custombuttonrequestclass" : null
            }`}
          >
            <ButtonComponent extraclass="requestbutton" buttontext="Request" />
          </div>
        )}
      </div>
    </div>
  );
}

export default FriendCard;
