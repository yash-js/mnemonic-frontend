import React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

function NoteCard({ heading, content, sharing, date, time, type, id }) {
  const total = sharing && sharing.length ? sharing.length : 0;

  return (
    <div className="notecard">
      <div className="notecardheading">
        <h4>{heading}</h4>
      </div>
      <div className="notecardcontent">
        <p>{content}</p>
      </div>
      <div className="notecardsharing">
        <AvatarGroup max={4} total={total}>
          {sharing &&
            sharing.length > 0 &&
            sharing.map((user) => (
              <Avatar
                alt={user.name}
                src={user.image}
                height={"30px"}
                width={"30px"}
              />
            ))}
        </AvatarGroup>
      </div>
    </div>
  );
}

export default NoteCard;
