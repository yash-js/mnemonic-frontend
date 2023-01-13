import React from 'react'
import Grid from '@mui/material/Grid';
import FriendCard from '../../layouts/FriendCard';
import notification from '../../assets/images/notification.svg'

function friend() {
    return (
        <div className='friend'>
            <Grid container spacing={1} className='friendbox'>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} className='friendcontentbox'>
                    <div className='friends'>
                        <div className='friendsheading'>
                            <p>Friends</p>
                            <p>104</p>
                        </div>
                        <div className='friendscontent'>
                            {
                                [1,2,3,4,5,6,7,8,9,10,11].map((item, index) => {
                                    return (
                                        <FriendCard name='friends' profileimage={notification} profilename='John Doe' profileusername='@john'  />
                                    )
                                })
                            }
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} className='friendcontentbox'>
                    <div className='friendrequest'>
                        <div className='friendrequestheading'>
                            <p>Friends Request</p>
                            <p>7</p>
                        </div>
                        <div className='friendrequestcontent'>
                            {
                                [1,2,3,4,5,6,7,8,9,10,11].map((item, index) => {
                                    return (
                                        <FriendCard name='friendrequest' profileimage={notification} profilename='John Doe' profileusername='@john' custombuttonremoveclass={true}  />
                                    )
                                })
                            }
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} className='friendcontentbox'>
                    <div className='friendsuggestion'>
                        <div className='friendsuggestionheading'>
                            <p>Suggestions</p>
                        </div>
                        <div className='friendsuggestioncontent'>
                            {
                                [1,2,3,4,5,6,7,8,9,10,11].map((item, index) => {
                                    return (
                                        <FriendCard name='friendsuggestion' profileimage={notification} profilename='John Doe' profileusername='@john' custombuttonrequestclass={true}  />
                                    )
                                })
                            }
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default friend