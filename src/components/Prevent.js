import React, { useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UseUserAuth';

const Prevent = ({children}) => {
    var navigate = useNavigate();
    var {isLoggedIn, loading} = useUserAuth();
  
    useEffect(() => {
        if(!isLoggedIn && !loading){
          // console.log('Redirecting...', !isLoggedIn, !loading);
            setTimeout(() => {
              // console.log('Redirecting...');
                navigate('/login');
              }, 1000);
        }
    }, [isLoggedIn, loading]);

    return (
    <>
      {isLoggedIn ? (<>{children}</>):(<p><>Not Logged in!</>Redirecting...</p>)}
    </>
  )
}

export default Prevent
