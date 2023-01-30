import React, { useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { userData } from "../features/userSlice";

function AutoCompleteComponent({ mentions, setMentions }) {
  const user = useSelector(userData);
  const friends = user && user?.friends ? user?.friends : [];
  const onChange = (event, value) => {
    const ids = value.map((i) => setMentions(i._id));
  };

  return (
    <Autocomplete
      multiple
      id="asynchronous-demo"
      sx={{ width: "100%" }}
      isOptionEqualToValue={(option, value) =>
        option.username === value.username
      }
      getOptionLabel={(option) => option.username}
      options={friends}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} label="Search Friend" />}
    />
  );
}

export default AutoCompleteComponent;
