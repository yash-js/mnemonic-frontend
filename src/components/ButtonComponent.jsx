import React from 'react'
import Button from '@mui/material/Button';
import '../styles/mui.css';

function ButtonComponent({extraclass,onClick,buttontext}) {
    return (
        <Button variant="contained" className={`buttoncomponent ${extraclass}`} onClick={onClick}>{buttontext}</Button>
    )
}

export default ButtonComponent