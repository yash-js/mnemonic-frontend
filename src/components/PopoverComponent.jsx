import React from "react";
import Popover from "@mui/material/Popover";
import ButtonComponent from "./ButtonComponent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { setActivePopOver } from "../features/popoverslice";
import { useRichTextEditor } from "../hooks/richtexteditor";

function PopoverComponent({
  btnname,
  popoverheading,
  popovercontent,
  popoverclassname,
  popoverclose,
  richtext,
}) {

  const {
    richtextdata,
    htmldata
  } = useRichTextEditor();

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(popoverclose|| null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    dispatch(setActivePopOver(''))
  };

  const handleRichText = () => {
    console.log(richtextdata, htmldata);
    handleClose();
  }

  const popoverContent = [
    <span className={`notecontent ${popoverclassname}`}>
      <div className="notebottom">{popovercontent}</div>
      <div className="notetop">
        <div className="noteclosebtn">
          {
            richtext && (
              <ButtonComponent buttontext="Save" onClick={handleRichText} />
            )
          }
          {btnname === 'home' ? (
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              onClick={handleClose}
            >
              <CloseIcon
                style={{ color: "black", width: "35px", height: "35px" }}
              />
            </IconButton>
          ) : (
            <ButtonComponent color={'error'} buttontext="Cancel" onClick={handleClose} />
          )}
        </div>
      </div>
    </span>
  ];

  return (
    <div className="notebtn" style={{display: anchorEl ? 'none' : 'block'}}>
      {
        btnname === 'home' && (
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onClick={handleClick}
          >
            <AddIcon style={{ color: "black", width: "40px", height: "40px"}} />
          </IconButton>
        )
      }
      {anchorEl !== null && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <>{popoverContent}</>
        </Popover>
      )}
    </div>
  );
}

export default PopoverComponent;
