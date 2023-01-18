import React from "react";
import ButtonComponent from "../components/ButtonComponent";

function FriendCard({
  name,
  profileimage,
  profileFirstname,
  porfileLastname,
  profileusername,
  friendrequestaccept,
  friendrequestremove,
  friendsadd,
  friendsremove,
  requestBtnText,
  isLoading,disabled
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
        {friendsadd && (
          <div className='request'>
            <ButtonComponent
              onClick={friendsadd}
              extraclass="requestbutton"
              buttontext={requestBtnText}
              isLoading={isLoading}
              disabled={disabled}
            />
          </div>
        )}
        {friendsremove && (
          <div className='remove'>
            <ButtonComponent
              color={"error"}
              extraclass="removebutton"
              onClick={friendsremove}
              buttontext={"Remove"}
            />
          </div>
        )}
        {friendrequestremove && (
          <div className='remove'>
            <ButtonComponent
              color={"error"}
              extraclass="removebutton"
              onClick={friendrequestremove}
              buttontext={"Delete"}
            />
          </div>
        )
        }
        {friendrequestaccept && (
          <div className='accept'>
            <ButtonComponent
              color={"primary"}
              extraclass="acceptbutton"
              buttontext="Accept"
              onClick={friendrequestaccept}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default FriendCard;
