import React from "react";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

function PopoverComponent({
  btnname,
  popoverheading,
  popovercontent,
  popoverclassname,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const popoverContent = [
    <span className={`notecontent ${popoverclassname}`}>
      <div className="notetop">
        <div
          className="noteheading"
          style={{ display: popoverheading ? "block" : "hide" }}
        >
          <h1>{popoverheading}</h1>
        </div>
        <div className="noteclosebtn">
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
        </div>
      </div>
      <div className="notebottom">{popovercontent}</div>
    </span>,
  ];

  return (
    <div className="notebtn">
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="label"
        onClick={handleClick}
      >
        {btnname ? (
          btnname
        ) : (
          <AddIcon style={{ color: "black", width: "40px", height: "40px" }} />
        )}
      </IconButton>
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
