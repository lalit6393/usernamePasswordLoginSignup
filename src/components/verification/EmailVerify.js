import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserAuth } from '../../context/UseUserAuth';
import emailStyle from './style.module.css';

const EmailVerify = ({setMessage, setNotificationType, setOpenNotifi}) => {

    const params = useParams();
    const navigate = useNavigate();
    const {setIsVerified, setIsLoggedIn, url} = useUserAuth();

   const handleClick = () => {
    // console.log(params.uid);
    axios.post(`${url}/users/verify/${params.uid}` , {"emailVerified":"true"})
    .then((res) => {
        // console.log(res.data);
        if(res.data.user.verified){
           setIsLoggedIn(true);
           setIsVerified(true);
           setMessage('Success!, Login and continue...');
           setNotificationType('success');
           setOpenNotifi(true);
           navigate('/login');
        }else{
            setMessage('Some Error occured.Try again!');
            setNotificationType('error');
            setOpenNotifi(true);
        }
    })
    .catch((err) => {
        // console.log(err);
        setMessage(err.message);
        setNotificationType('error');
        setOpenNotifi(true);
    });
   }

  return (
    <div className={emailStyle.home}>
      <button onClick={handleClick}>Verify</button>
    </div>
  )
}

export default EmailVerify;
