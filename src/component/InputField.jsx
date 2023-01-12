import React from 'react'
import TextField from '@mui/material/TextField';
import '../styles/mui.css';

function InputField({extraclass,type,label,name,value}) {
  return (
    <TextField id="outlined-basic" className={`textfield ${extraclass}`} type={type} label={label} name={name} value={value} autoComplete='off' variant="outlined" />
  )
}

export default InputField