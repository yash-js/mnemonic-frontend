import React from 'react'
import ButtonComponent from '../components/ButtonComponent'


function FriendCard({name, profileimage, profilename, profileusername, custombuttonacceptclass, custombuttonremoveclass, custombuttonrequestclass}) {
  return (
    <div className='friendcard'>
        <div className='profileimagebox'>
            <div className='profileimage'>
                <img src={profileimage} alt='notification' />
            </div>
            <div className='profilename'>
                <h3>{profilename}</h3>
                <h4>{profileusername}</h4>
            </div>
        </div>
        <div className='friendactions'>
            {
                name === 'friendrequest' &&
                <div className={`accept ${custombuttonacceptclass}`}>
                    <ButtonComponent extraclass='acceptbutton' buttontext='Accept' />
                </div>
            }
            {
                name === 'friendrequest' || name === 'friends' ?
                <div className={`remove ${custombuttonremoveclass ? 'custombuttonremoveclass' : null}`}>
                    <ButtonComponent extraclass='removebutton' buttontext={custombuttonremoveclass ? 'Delete' : 'Remove'} />
                </div> : null
            }
            {
                name === 'friendsuggestion' &&
                <div className={`request ${custombuttonrequestclass ? 'custombuttonrequestclass' : null}`}>
                    <ButtonComponent extraclass='requestbutton' buttontext='Request' />
                </div>
            }
        </div>
    </div>
  )
}

export default FriendCard