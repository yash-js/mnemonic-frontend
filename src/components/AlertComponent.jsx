import React, {useState} from 'react'
import { Alert, Snackbar } from "@mui/material";

function AlertComponent({alertOpen, alertMessage, alertType}) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  if(alertOpen){
    setOpen(true)
    setMessage(alertMessage)
    setType(alertType)
  }else{
    setOpen(false)
    setMessage("")
    setType("")
  }

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
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type} >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default AlertComponent