import React from 'react'
import InputField from '../components/InputField'
import search from '../assets/images/search.svg'
import notification from '../assets/images/notification.svg'

function TopBar() {
  return (
    <div className='topbar'>
        <div className='searchbarbox'>
            <InputField placeholder={'search'} starticon={search} starticoncss={{width: '30px', marginRight: '10px'}} />
        </div>
        <div className='profilebox'>
            <div className='notificationbox'>
                <img src={notification} alt='notification' width='25px' height='auto' />
            </div>
            <div className='profileimagebox'>
                <div className='profilename'>
                    <h3>John Doe</h3>
                    <h4>@john</h4>
                </div>
                <div className='profileimage'>
                    <img src={notification} alt='notification' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default TopBar