import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/images/logo.svg'
import home from '../assets/images/home.svg'
import friends from '../assets/images/friends.svg'
import mention from '../assets/images/mention.svg'
import reminder from '../assets/images/reminder.svg'
import shared from '../assets/images/shared.svg'
import '../styles/index.css'

function Sidebar() {
    const [active, setActive] = useState('home')

    return (
        <div className='sidebar'>
            <div className='sidebarcontent'>
                <div className='sidebaritem logo'>
                    <NavLink to="/">
                        <img src={logo} alt="logo" width='30px' height='30px' onClick={() => setActive('home')}/>
                    </NavLink>
                </div>
                <div className={`${active === 'home' ? 'active' : 'inactive'} sidebaritem`}>
                    <NavLink to="/">
                        <img src={home} alt="home" width='30px' height='30px' onClick={() => setActive('home')}/>
                    </NavLink>
                </div>
                <div className={`${active === 'friend' ? 'active' : 'inactive'} sidebaritem`}>
                    <NavLink to="/friend">
                        <img src={friends} alt="friends" width='30px' height='30px' onClick={() => setActive('friend')}/>
                    </NavLink>
                </div>
                <div className={`${active === 'mention' ? 'active' : 'inactive'} sidebaritem`}>
                    <NavLink to="/mention">
                        <img src={mention} alt="mention" width='30px' height='30px' onClick={() => setActive('mention')}/>
                    </NavLink>
                </div>
                <div className={`${active === 'reminder' ? 'active' : 'inactive'} sidebaritem`}>
                    <NavLink to="/reminder">
                        <img src={reminder} alt="reminder" width='30px' height='30px' onClick={() => setActive('reminder')}/>
                    </NavLink>
                </div>
                <div className={`${active === 'shared' ? 'active' : 'inactive'} sidebaritem`}>
                    <NavLink to="/share">
                        <img src={shared} alt="shared" width='30px' height='30px' onClick={() => setActive('shared')}/>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
