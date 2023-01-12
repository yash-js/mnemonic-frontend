import React from 'react'
import { NavLink } from "react-router-dom";
import Grid from '@mui/material/Grid';
import InputField from '../../component/InputField';
import ButtonComponent from '../../component/ButtonComponent';
import '../../styles/index.css';

function index() {
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
        <div className='box'>
          <div className='boxcontent'>
            <div className='headercontainer'>
              <h1>Hello !!</h1>
              <p>Enter the details you entered while registering.</p>
            </div>
            <div className='inputcontainer'>
              <InputField type='email' label='Email' name='email' value='' />
              <InputField type='password' label='Password' name='password' value='' />
              <ButtonComponent buttontext='Login' extraclass='loginbtn' />
            </div>
            <div className='forgetcontainer'>
              <p>Don’t have an account? 
                <span
                  className='signupbtn'
                >
                  <NavLink to='/signup'>
                    Sign Up
                  </NavLink>
                </span>
              </p>
              <p className='forgetbtn'>
                <NavLink to='/signup'>
                  Forgot your password?
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  )
}

export default index