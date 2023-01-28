import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import TooltipComponent from "./TooltipComponent";
import PopoverComponent from "./PopoverComponent";
import AutoCompleteComponent from "./AutoCompleteComponent";
import RichTextEditor from "./RichTextEditor";
import InputField from "./InputField";
import { setActivePopOver, getActivePopOver } from "../features/popoverslice";

function NoteCard({ heading, content, sharing, date, time, type, id }) {
  const dispatch = useDispatch();
  const activepopover = useSelector(getActivePopOver);
  const total = sharing && sharing.length ? sharing.length : 0;
  const [noteTitle, setNoteTitle] = React.useState("");
  const [error, setError] = React.useState(null);

  const onFocusField = () => setError({});

  const handleClick = (type) => {
    if(type === 'normal'){
      dispatch(setActivePopOver('normal'));
    }else if(type === 'mnemonic'){
      dispatch(setActivePopOver('mnemonic'));
    }
  }

  const popovernormalcontent = [
    <div className="notetopcontent normalnotebox">
      <div className="normalnotesheading">
        <h3>Normal Notes</h3>
      </div>
      <div className="normalnotescontent">
        <RichTextEditor />
      </div>
    </div>
  ]

  const popovermnemoniccontent = [
    <div className="notetopcontent mnemonicnotebox">
      <div className="mnemonicnotesheading">
        <h3>Mnemonic Notes</h3>
      </div>
      <div className="mnemonicnotescontent">
        <h1>Mnemonic Notes</h1>
      </div>
    </div>
  ]

  const popovernotetitlecontent = [
    <div className="notetopcontent notetitlebox">
      <div className="notetitleheading">
        <h3>Note Settings</h3>
      </div>
      <div className="notetitlecontent">
        <Grid container spacing={2}>
          <Grid item xs={12} className={'notedetails'}>
            <h4>Note Details</h4>
            <InputField
                extraclass={"signupInput"}
                type="text"
                label="Note Title"
                name="noteTitle"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                error={error && error.field === "noteTitle"}
                errorText={
                  error && error.field === "noteTitle" && error.error
                }
                onFocusField={onFocusField}
              />
          </Grid>
          <Grid item xs={12} className={'notesharing'}>
            <h4>Note Sharing</h4>
            <div className="notesharingcontent">
              <AutoCompleteComponent />
            </div>
          </Grid>
        </Grid>
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
        ) : activepopover === 'mnemonic' ? (
          <PopoverComponent popoverclassname={'mnemonicnotes'} popovercontent={popovermnemoniccontent} popoverstate={true}/>
        ) : activepopover === 'notetitle' && (
          <PopoverComponent popoverclassname={'notetitle'} popovercontent={popovernotetitlecontent} popoverstate={true}/>
        ) 
      }
    </>
  );
}

export default NoteCard;
