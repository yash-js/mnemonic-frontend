import React from "react";
import Popover from "@mui/material/Popover";
import ButtonComponent from "./ButtonComponent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { setActivePopOver } from "../features/popoverslice";
import { getActivePopOver } from "../features/popoverslice";
import { profiledata } from "../features/userSlice";

function PopoverComponent({
  name,
  btnname,
  popovercontent,
  popoverclassname,
  popoverstate,
  richtext,
  updateProfile,
  saveBtnDisabled,
  nextBtnDisabled,
  setEditData,
  handleRichText,
  value,
  setValue,
}) {
  const dispatch = useDispatch();
  const activepopover = useSelector(getActivePopOver);
  const profiledisabled = useSelector(profiledata);
  const [anchorEl, setAnchorEl] = React.useState(popoverstate || null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(setActivePopOver("home"));
  };

  const handleClose = () => {
    setAnchorEl(null);
    dispatch(setActivePopOver(""));
    var element = document.getElementsByClassName("ql-editor");
    if(element && element.length > 0){
      element[0].innerHTML = "";
    }
    if (value) {
      setValue("");
    }
    if (setEditData) {
      setEditData({});
    }
  };

  const handleNext = () => {
    nextBtnDisabled === false && dispatch(setActivePopOver("notetitle"));
  };

  const handleSave = () => {
    handleRichText();
    handleClose();
  };

  const popoverContent = [
    <span className={`notecontent ${popoverclassname}`}>
      <div className="notetop">{popovercontent}</div>
      <div className="notebottom">
        <div className="noteclosebtn">
          {richtext && (
            <ButtonComponent
              buttontext="Next"
              onClick={handleNext}
              disabled={nextBtnDisabled}
              customButtonStyle={{
                display: name === "share" ? "none" : "flex",
              }}
            />
          )}
          {popoverclassname === "notetitle" && (
            <ButtonComponent buttontext="Save" onClick={handleSave} />
          )}
          {btnname === "home" ? (
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
            <>
              {activepopover === "profile" && !saveBtnDisabled && (
                <ButtonComponent
                  disabled={profiledisabled}
                  buttontext="Save"
                  onClick={updateProfile}
                />
              )}
              {activepopover === "profile" && !saveBtnDisabled ? (
                <ButtonComponent
                  color={"error"}
                  buttontext="Cancel"
                  onClick={handleClose}
                />
              ) : (
                <ButtonComponent
                  color={"error"}
                  buttontext="Cancel"
                  onClick={handleClose}
                />
              )}
            </>
          )}
        </div>
      </div>
    </span>,
  ];

  return (
    <div className="notebtn" style={{ display: anchorEl ? "none" : "block" }}>
      {btnname === "home" && (
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          onClick={handleClick}
        >
          <AddIcon style={{ color: "black", width: "40px", height: "40px" }} />
        </IconButton>
      )}
      {anchorEl !== null && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
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
