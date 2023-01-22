import React from "react";
import Button from "@mui/material/Button";
import "../styles/mui.css";
import CircularProgress from "@mui/material/CircularProgress";

function ButtonComponent({
  extraclass,
  onClick,
  buttontext,
  isLoading,
  disabled,
  color,
  customButtonStyle,
  starticon,
  endicon,
  type,
}) {
  return (
    <Button
      disabled={disabled}
      variant="contained"
      color={color}
      className={`buttoncomponent ${extraclass}`}
      startIcon={starticon}
      endIcon={endicon}
      onClick={onClick}
      style={customButtonStyle}
      type={type ? type : "button"}
    >
      {isLoading === true ? <CircularProgress color="primary" /> : buttontext}
    </Button>
  );
}

export default ButtonComponent;
