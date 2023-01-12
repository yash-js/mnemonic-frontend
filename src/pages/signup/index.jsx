import React from 'react'
import Grid from '@mui/material/Grid';
import '../../styles/index.css';

function index() {
  return (
    <Grid container className='signup'>
      <Grid item xs={6} className='signupleft'>
        <div className='box'>
          <div className='boxcontent'>
              <h1>A platform for getting closer to your <sapn className='headingdifferent'>Notes.</sapn></h1>
              <p>create, share and remember.</p>
          </div>
        </div>
      </Grid>
      <Grid item xs={6} className='signupright'>
        <div>
          456
        </div>
      </Grid>
    </Grid>
  )
}

export default index