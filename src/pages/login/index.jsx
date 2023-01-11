import React, { Component } from 'react'
import Grid from '@mui/material/Grid';
import '../../styles/index.css';

export default class index extends Component {
  render() {
    return (
      <Grid container className='login'>
        <Grid item xs={6} className='loginleft'>
          <div className='box'>
            <div className='boxcontent'>
                <h1>A platform for getting closer to your <sapn className='headingdifferent'>Notes.</sapn></h1>
                <p>create, share and remember.</p>
            </div>
          </div>
        </Grid>
        <Grid item xs={6} className='loginright'>
          <div>
            456
          </div>
        </Grid>
      </Grid>
    )
  }
}
