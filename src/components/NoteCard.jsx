import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import TooltipComponent from "./TooltipComponent";
import PopoverComponent from "./PopoverComponent";
import { setActivePopOver, getActivePopOver } from "../features/popoverslice";

function NoteCard({ name , heading, content, sharing, type, normalcontent, mnemoniccontent, notetitlecontent, editorvalue, noteapi, seteditorvalue }) {
  const dispatch = useDispatch();
  const activepopover = useSelector(getActivePopOver);
  const total = sharing && sharing.length ? sharing.length : 0;

  const handleClick = (type) => {
    if(type === 'normal'){
      dispatch(setActivePopOver('editnormal'));
      seteditorvalue(content);
    }else if(type === 'mnemonic'){
      dispatch(setActivePopOver('editmnemonic'));
    }
  }

  return (
    <>
      <div className={`notecard ${type} ${name}`}>
        <div className="notecardheading">
          <h3>{heading}</h3>
          <IconButton
            className="editicon"
            onClick={() => handleClick(type)}
          >
            <EditIcon/>
          </IconButton>
        </div>
        <div className="notecardcontent">
          <p>{content.replace(/(<([^>]+)>)/gi, "")}</p>
        </div>
        <div className="notecardsharing">
          <AvatarGroup max={4} total={total}>
            {sharing &&
              sharing.length > 0 &&
              sharing.map((user) => (
                <TooltipComponent htmltitle={user.username}>
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
      {
        activepopover === 'editnormal' ? (
          <PopoverComponent name={name} popoverclassname={'normalnotes'} popovercontent={normalcontent} richtext={true} popoverstate={true} nextBtnDisabled={editorvalue && editorvalue.length > 0 ? false : true}/>
        ) : activepopover === 'editmnemonic' ? (
          <PopoverComponent popoverclassname={'mnemonicnotes'} popovercontent={mnemoniccontent} popoverstate={true}/>
        ) : activepopover === 'notetitle' && (
          <PopoverComponent popoverclassname={'notetitle'} popovercontent={notetitlecontent} popoverstate={true} handleRichText={noteapi} />
        ) 
      }
    </>
  );
}

export default NoteCard;
