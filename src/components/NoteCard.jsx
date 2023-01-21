import React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import TooltipComponent from "./TooltipComponent";

function NoteCard({ heading, content, sharing, date, time, type, id }) {
  const total = sharing && sharing.length ? sharing.length : 0;

  const handleClick = () => {
    console.log("edit");
  }
  return (
    <>
      <div className={`notecard ${type}`}>
        <div className="notecardheading">
          <h3>{heading}</h3>
          <IconButton
            className="editicon"
            onClick={() => handleClick()}
          >
            <EditIcon/>
          </IconButton>
        </div>
        <div className="notecardcontent">
          <p>{content}</p>
        </div>
        <div className="notecardsharing">
          <AvatarGroup max={4} total={total}>
            {sharing &&
              sharing.length > 0 &&
              sharing.map((user) => (
                <TooltipComponent htmltitle={user.name}>
                  <Avatar
                    alt={user.name}
                    src={user.image}
                    height={"30px"}
                    width={"30px"}
                  />
                </TooltipComponent>
              ))}
          </AvatarGroup>
        </div>
      </div>
    </>
  );
}

export default NoteCard;
