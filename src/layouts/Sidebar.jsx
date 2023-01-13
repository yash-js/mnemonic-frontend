import React from 'react'
import logo from '../assets/images/logo.svg'
import home from '../assets/images/home.svg'
import friends from '../assets/images/friends.svg'
import mention from '../assets/images/mention.svg'
import reminder from '../assets/images/reminder.svg'
import shared from '../assets/images/shared.svg'
import '../styles/index.css'

function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='sidebarcontent'>
                <div className='sidebaritem logo'>
                    <img src={logo} alt="logo" width='30px' height='30px'/>
                </div>
                <div className='sidebaritem'>
                    <img src={home} alt="home" width='30px' height='30px'/>
                </div>
                <div className='sidebaritem'>
                    <img src={friends} alt="friends" width='30px' height='30px'/>
                </div>
                <div className='sidebaritem'>
                    <img src={mention} alt="mention" width='30px' height='30px'/>
                </div>
                <div className='sidebaritem'>
                    <img src={reminder} alt="reminder" width='30px' height='30px'/>
                </div>
                <div className='sidebaritem'>
                    <img src={shared} alt="shared" width='30px' height='30px'/>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
