import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import "../styles/mui.css";

function InputField({
  disabled,
  extraclass,
  placeholder,
  type,
  label,
  name,
  value,
  onChange,
  starticon,
  endicon,
  starticoncss,
  endiconcss,
  error,
  errorText,
  onFocusField
}) {
  const [readOnly, setReadOnly] = useState(true);

  const onFocus = () => {
    setReadOnly(false);
    onFocusField()
  };

  return (
    <TextField
      id="outlined-basic"
      className={`textfield ${extraclass}`}
      placeholder={placeholder}
      onChange={onChange}
      type={type}
      label={label}
      name={name}
      value={value}
      autoComplete="off"
      variant="outlined"
      aria-autocomplete="none"
      disabled={disabled}
      readOnly={readOnly}
      onFocus={onFocus}
      InputProps={{
        startAdornment: starticon && (
          <InputAdornment position="start">
            <img src={starticon} alt="start icon" style={starticoncss} />
          </InputAdornment>
        ),
        endAdornment: endicon && (
          <InputAdornment position="end">
            <img src={endicon} alt="end icon" style={endiconcss} />
          </InputAdornment>
        ),
      }}
      error={error}
      helperText={errorText}
    />
  );
}

export default InputField;
