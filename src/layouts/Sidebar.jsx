import React from 'react'
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import '../styles/index.css'

function Sidebar() {
  return (
    <div className='sidebar'>
        <div className='sidebarcontent'>
            <div className='sidebaritem'>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
            </div>
            <div className='sidebaritem'>
                <img src="./src/assets/images/home.svg" alt="home" width='auto' height='40px'/>
            </div>
            <div className='sidebaritem'>
                <Avatar alt="friends" src="../assets/images/friends.svg" />
            </div>
            <div className='sidebaritem'>
                <Avatar alt="mention" src="../assets/images/mention.svg" />
            </div>
            <div className='sidebaritem'>
                <Avatar alt="home" src="../assets/images/Home.svg" />
            </div>
            <div className='sidebaritem'>
                <Avatar alt="home" src="../assets/images/Home.svg" />
            </div>
            <div className='sidebaritem'>
                <Avatar alt="home" src="../assets/images/Home.svg" />
            </div>
        </div>
    </div>
  )
}

export default Sidebar
