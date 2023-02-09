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
  onFocusField,
  endIcoTooltip,
  InputProps,
  multiline,
  params,
  defaultValue,
}) {
  const [readOnly, setReadOnly] = useState(true);

  const onFocus = () => {
    setReadOnly(false);
    if (onFocusField) {
      onFocusField();
    }
  };

  return (
    <TextField
      {...params}
      id="outlined-basic"
      defaultValue={defaultValue}
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
      multiline={multiline}
      InputProps={{
        ...InputProps,
        startAdornment: starticon && (
          <InputAdornment position="start">
            <img src={starticon} alt="start icon" style={starticoncss} />
          </InputAdornment>
        ),
        endAdornment:
          (InputProps && InputProps.endAdornment
            ? InputProps.endAdornment
            : null) ||
          (endicon && (
            <InputAdornment title={endIcoTooltip} position="end">
              <img src={endicon} alt="end icon" style={endiconcss} />
            </InputAdornment>
          )),
      }}
      error={error}
      helperText={errorText}
    />
  );
}

export default InputField;
