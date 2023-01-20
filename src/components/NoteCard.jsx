import React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import {  setActivePopOver, setHidePopOver  } from "../features/popoverslice";

function NoteCard({ heading, content, sharing, date, time, type, id }) {
  const dispatch = useDispatch();
  const total = sharing && sharing.length ? sharing.length : 0;

  const handelNoteCard = (type) => {
    if (type === 'normal') {
      dispatch(setActivePopOver('normal'))
      dispatch(setHidePopOver('home'))
    } else if (type === 'mnemonic') {
      dispatch(setActivePopOver('mnemonic'))
      dispatch(setHidePopOver('home'))
    }
  }

  return (
    <>
      <div className={`notecard ${type}`}>
        <div className="notecardheading">
          <h3>{heading}</h3>
          <IconButton
            className="editicon"
            onClick={() => handelNoteCard(type)}
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
    </>
  );
}

export default NoteCard;
