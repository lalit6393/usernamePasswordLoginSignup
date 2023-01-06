import React, { useState } from 'react';
import { useUserAuth } from '../../../context/UseUserAuth';
import resetStyle from './style.module.css';
import axios from 'axios';
import emailjs from '@emailjs/browser';

const ResetByUserName = ({setMessage, setNotificationType, setOpenNotifi}) => {
    
  const {url} = useUserAuth();
  const [email , setEmail] = useState(null);

  const resetPass = (event) => {
    event.preventDefault();
      if(event.target.username.value.trim()){
        console.log(event.target.username.value);
        setMessage("Sending email to reset pass...");
        setNotificationType('info');
        setOpenNotifi(true);
        axios.get(`${url}/users/resetLink/${event.target.username.value}`)
        .then((res) => {
            emailjs.send('service_i3g1obg', 'template_bl2hmw5', {name: res.data.user.username, email: res.data.user.email, link:`https://schedulemeet.netlify.app/login/reset/new/${res.data.token}`}, '5Ed-UnttEg7TCYwCB')
            .then((result) => {
                if(result.text === 'OK'){
                  setMessage("Verification email send to your email.");
                  setNotificationType('info');
                  setOpenNotifi(true);
                  console.log(res.data.user.email);
                  setEmail(res.data.user.email);
                }else{
                  setMessage('Failed to send verification email!');
                  setNotificationType('error');
                  setOpenNotifi(true);
                }
            }, (error) => {
                // console.log(error.text);
                setMessage(error.text);
                setNotificationType('error');
                setOpenNotifi(true);
            });
        })
        .catch((err) => {
          console.log(err);
            setMessage('User not found!');
            setNotificationType('error');
            setOpenNotifi(true);
        });

      }else{
        setMessage('User not found!');
        setNotificationType('error');
        setOpenNotifi(true);
      }
 }

  return (
    <form onSubmit={resetPass} className={resetStyle.home}>
       <p style={{marginBottom:'1rem'}}>Your Username</p>
       <div className={resetStyle.username}>
            <input
            name='username'
            type='text'
            placeholder='Username'
            required
            autoComplete="off"
            />
        </div>
        <button type='submit'>Reset</button>
        {email ? <p style={{fontSize: '1.3rem', margin: '1rem 0'}}>Email to reset password sent to your email id {email}</p>: null}
    </form>
  )
}

export default ResetByUserName;
