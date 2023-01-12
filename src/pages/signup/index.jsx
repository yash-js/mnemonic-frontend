import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import InputField from '../../components/InputField';
import ButtonComponent from '../../components/ButtonComponent';
import { signUp } from "../../lib/getApiCall";
import AlertComponent from "../../components/AlertComponent";
import '../../styles/index.css';

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const openAlert = (open ,type, message) => {
    setOpen(open);
    setMessage(message);
    setType(type);
  }

  const handleClick = async () => {
    const res = await signUp({firstName, lastName, email, password, cpassword, username});
    if (res?.status === 200) {
      navigate("/signin");
    } else {
      openAlert(true,"error", res?.response?.data?.error);
    }
  };

  return (
    <>
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
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <InputField type='text' label='First Name' name='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                  </Grid>
                  <Grid item xs={6}>
                    <InputField type='text' label='Last Name' name='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField type='email' label='Email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField type='text' label='User Name' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                  </Grid>
                  <Grid item xs={6}>
                    <InputField type='password' label='Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Grid>
                  <Grid item xs={6}>
                    <InputField type='password' label='Confirm Password' name='cpassword' value={cpassword} onChange={(e) => setCPassword(e.target.value)} />
                  </Grid>
                  <Grid item xs={12}>
                    <ButtonComponent buttontext='Sign Up' extraclass='signupbtn' onClick={handleClick} />
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      <AlertComponent setOpen={setOpen} setType={setType} setMessage={setMessage} alertOpen={open} alertMessage={message} alertType={type}/>
    </>
  )
}

export default Signup