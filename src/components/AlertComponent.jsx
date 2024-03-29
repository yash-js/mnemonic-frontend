import React from "react";
import { Alert, Snackbar } from "@mui/material";

function AlertComponent({
  alertOpen,
  alertMessage,
  alertType,
  setOpen,
  setType,
  setMessage,
  name,
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
      autoHideDuration={3000}
      onClose={handleClose}
      className={name ? "notificationalert" : "alert"}
    >
      <Alert onClose={handleClose} severity={alertType ? alertType : "success"}>
        {alertMessage}
      </Alert>
    </Snackbar>
  );
}

export default AlertComponent;
