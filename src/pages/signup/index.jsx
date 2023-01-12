import React from 'react'
import Grid from '@mui/material/Grid';
import InputField from '../../components/InputField';
import ButtonComponent from '../../components/ButtonComponent';
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
        <div className='box'>
          <div className='boxcontent'>
            <div className='headercontainer'>
              <h1>Sign Up</h1>
              <p>Looks like you don’t have an account. let’s create a new account.</p>
            </div>
            <div className='inputcontainer'>
              <InputField type='text' label='First Name' name='firstname' value='' />
              <InputField type='text' label='Last Name' name='lastname' value='' />
              <InputField type='email' label='Email' name='email' value='' />
              <InputField type='text' label='User Name' name='username' value='' />
              <InputField type='password' label='Password' name='password' value='' />
              <InputField type='password' label='Confirm Password' name='confirmpassword' value='' />
              <ButtonComponent buttontext='Sign Up' extraclass='signupbtn' />
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  )
}

export default index