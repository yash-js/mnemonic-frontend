import React, { useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import { userData } from "../features/userSlice";
import { useEffect } from 'react';

function AutoCompleteComponent() {
  const user = useSelector(userData);
  const friends = user && user?.friends ? user?.friends : [];
  const [shareValue, setShareValue] = useState()

  useEffect(() => {
    console.log('friend', shareValue)
  }, [shareValue])

  return (
    <Autocomplete
      multiple
      id="asynchronous-demo"
      sx={{ width: '100%' }}
      isOptionEqualToValue={(option, value) => option.username === value.username}
      getOptionLabel={(option) => option.username}
      options={friends}
      onChange={(event, value) => setShareValue(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Friend"
        />
      )}
    />
  )
}

export default AutoCompleteComponent