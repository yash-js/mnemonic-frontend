import { Alert, Snackbar } from "@mui/material";
import React from "react";

const AlertComponent = ({ type, message }) => {
  const [open, setOpen] = React.useState(false);

  const openAlert = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        This is a success message!
      </Alert>
    </Snackbar>
  );
};

export default AlertComponent;
