import React from 'react'
import Button from '@mui/material/Button';
import '../styles/mui.css';
import { CircularProgress } from '@mui/material';

function ButtonComponent({extraclass,onClick,buttontext, isLoading, disabled, color}) {
    return (
        <Button disabled={disabled} variant="contained" color={color} className={`buttoncomponent ${extraclass}`} onClick={onClick}>{isLoading === true ?   <CircularProgress /> : buttontext}</Button>
    )
}

export default ButtonComponent