import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import TooltipComponent from "./TooltipComponent";
import PopoverComponent from "./PopoverComponent";
import { setActivePopOver, getActivePopOver } from "../features/popoverslice";
import { OpenInNew } from "@mui/icons-material";
import { textToAudio } from "../lib/API_Calls";

function NoteCard({
  name,
  heading,
  content,
  sharing,
  type,
  normalcontent,
  mnemoniccontent,
  notetitlecontent,
  editorvalue,
  noteapi,
  setNoteTitle,
  setEditNoteCard,
  authorPic,
  authorUsername,
  _id,
  genrateName,
}) {
  const dispatch = useDispatch();
  const activepopover = useSelector(getActivePopOver);
  const total = sharing && sharing.length ? sharing.length : 0;
  const [anchorEl, setAnchorEl] = useState(null);
  const [noteTitleAnchor, setNoteTitleAnchor] = useState(null);

  const handleClick = (event, type) => {
    setAnchorEl(event.currentTarget);
    if (setEditNoteCard) {
      setEditNoteCard(true);
    }
    if (type === "normal") {
      dispatch(setActivePopOver("editnormal"));
    } else {
      dispatch(setActivePopOver("editmnemonic"));
    }
    setNoteTitle(heading);
  };

  const handleNext = (event) => {
    setNoteTitleAnchor(event.currentTarget);
    dispatch(setActivePopOver("editnotetitle"));
  };
  return (
    <>
      <div className={`notecard ${type} ${name}`}>
        <div className="notecardheading">
          <h3>{heading}</h3>
          {name === "share" || name === "mention" ? (
            <IconButton
              title="Open"
              className="editicon"
              onClick={(e) => handleClick(e, type)}
            >
              <OpenInNew />
            </IconButton>
          ) : (
            <IconButton
              title="Edit"
              className="editicon"
              onClick={(e) => handleClick(e, type)}
            >
              <EditIcon />
            </IconButton>
          )}
        </div>
        <div className="notecardcontent">
          <p>
            {content &&
              content.length > 0 &&
              content.replace(/(<([^>]+)>)/gi, "")}
          </p>
        </div>
        <div className="notecardsharing">
          <AvatarGroup max={4} total={total}>
            {authorPic && authorPic.length > 0 && (
              <TooltipComponent htmltitle={authorUsername}>
                <Avatar
                  alt={authorUsername}
                  src={authorPic}
                  height={"30px"}
                  width={"30px"}
                />
              </TooltipComponent>
            )}
            {sharing &&
              sharing.length > 0 &&
              sharing.map((user) => (
                <TooltipComponent key={user._id} htmltitle={user.username}>
                  <Avatar
                    alt={user.username}
                    src={user.profilePic}
                    height={"30px"}
                    width={"30px"}
                  />
                </TooltipComponent>
              ))}
          </AvatarGroup>
        </div>
      </div>
      {activepopover === "editnormal" ? (
        <PopoverComponent
          name={name}
          popoverclassname={"normalnotes"}
          popovercontent={normalcontent}
          richtext={true}
          popoverstate={anchorEl}
          setpopoverstate={setAnchorEl}
          nextBtnDisabled={
            (content && content.length > 0) ||
            (editorvalue && editorvalue.length > 0)
              ? false
              : true
          }
          handleNext={handleNext}
          setEditNoteCard={setEditNoteCard}
        />
      ) : activepopover === "editmnemonic" ? (
        <PopoverComponent
          name={name}
          popoverclassname={"mnemonicnotes"}
          popoverstate={anchorEl}
          setpopoverstate={setAnchorEl}
          popovercontent={mnemoniccontent}
          setEditNoteCard={setEditNoteCard}
          genrateName={genrateName}
          textvalue={content}
          apiCall={textToAudio}
        />
      ) : (
        activepopover === "editnotetitle" && (
          <PopoverComponent
            popoverclassname={"notetitle"}
            popovercontent={notetitlecontent}
            popoverstate={noteTitleAnchor}
            handleRichText={() => noteapi(_id)}
            setEditNoteCard={setEditNoteCard}
          />
        )
      )}
    </>
  );
}

export default NoteCard;
