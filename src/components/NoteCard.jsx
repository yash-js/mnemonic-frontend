import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import TooltipComponent from "./TooltipComponent";
import PopoverComponent from "./PopoverComponent";
import RichTextEditor from "./RichTextEditor";
import { setActivePopOver, getActivePopOver } from "../features/popoverslice";

function NoteCard({ heading, content, sharing, date, time, type, id }) {
  const dispatch = useDispatch();
  const activepopover = useSelector(getActivePopOver);
  const total = sharing && sharing.length ? sharing.length : 0;

  const handleClick = (type) => {
    if(type === 'normal'){
      dispatch(setActivePopOver('normal'));
    }else if(type === 'mnemonic'){
      dispatch(setActivePopOver('mnemonic'));
    }
  }

  const popovernormalcontent = [
    <div className="notebottomcontent normalnotebox">
      <div className="normalnotesheading">
        <h3>Normal Notes</h3>
      </div>
      <div className="normalnotescontent">
        <RichTextEditor/>
      </div>
    </div>
  ]

  const popovermnemoniccontent = [
    <div className="notebottomcontent mnemonicnotebox">
      <div className="mnemonicnotesheading">
        <h3>Mnemonic Notes</h3>
      </div>
      <div className="mnemonicnotescontent">
        <h1>Mnemonic Notes</h1>
      </div>
    </div>
  ]

  return (
    <>
      <div className={`notecard ${type}`}>
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
      {
        activepopover === 'normal' ? (
          <PopoverComponent popoverclassname={'normalnotes'} popovercontent={popovernormalcontent} richtext={true} popoverstate={true}/>
        ) : activepopover === 'mnemonic' && (
          <PopoverComponent popoverclassname={'mnemonicnotes'} popovercontent={popovermnemoniccontent} popoverstate={true}/>
        )
      }
    </>
  );
}

export default NoteCard;
