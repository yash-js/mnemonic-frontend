import React, { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

function AlertComponent({
  alertOpen,
  alertMessage,
  alertType,
  setOpen,
  setType,
  setMessage,
}) {

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setType("");
    setMessage("");
  };

  return (
    <Snackbar
      open={alertOpen}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={alertType}>
        {alertMessage}
      </Alert>
    </Snackbar>
  );
}

export default AlertComponent;
