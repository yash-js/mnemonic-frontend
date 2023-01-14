import React from 'react'
import { ThreeDots } from 'react-loader-spinner';

function Loader({visible}) {
  return (
    <div className='loader'>
        <ThreeDots 
            height="80" 
            width="80" 
            radius="9"
            color="#4F7BD2" 
            ariaLabel="three-dots-loading"
            visible={visible}
        />
    </div>
  )
}

export default Loader