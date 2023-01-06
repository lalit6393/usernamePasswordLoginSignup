import React, { useEffect, useState } from 'react';
import { Avatar} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Skeleton from '@mui/material/Skeleton';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import ToggleOnSharpIcon from '@mui/icons-material/ToggleOnSharp';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UseUserAuth';

function Header({switchTheme, theme, setTheme}) {

    const navigate = useNavigate();
    var {isLoggedIn, setIsLoggedIn, user} = useUserAuth();
    const [profilename, setProfilename] = useState(null);

  useEffect(() => {
    // console.log('isLoggedIn: ',isLoggedIn, user);
    if(isLoggedIn){
      setProfilename(user || {username:'ScheduleMeet'});
    }else{
      setProfilename(null);
    }
  }, [isLoggedIn, user]);

  useEffect(() => {},[profilename]);
    
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);

    const logoutHandle = () => {
      localStorage.clear();
      setIsLoggedIn(false);
    }

    const handleClick = () => {
      setOpen((prev) => !prev);
      // console.log("handleClick", open);
    };
    const handleClick1 = () => {
      setOpen1((prev) => !prev);
      
    };
  
    const handleClickAway = () => {
      setOpen(false);
      // console.log("handleClickAway", open);
    };
    const handleClickAway1 = () => {
      setOpen1(false);
      // console.log("handleClickAway", open);
    };

    useEffect(()=>{
      if(open1){
     document.getElementById('arro').style.transform = 'rotate(90deg)';
      }else{
        document.getElementById('arro').style.transform = 'rotate(0deg)';
      }
    },[open1]);

  return (
    <div className='header'>
      <div className='app-name'>
      <ClickAwayListener onClickAway={handleClickAway1}>
        <div className='arrowIconOut'>
        <div id='arro' className='arrowIcon'>
        <DoubleArrowIcon 
        onClick={handleClick1}
        sx={{
          fontSize:'2rem'
          }}/>
        </div>
        {open1 ? (
          <div className='expandMenu1'>
          <div className='content'>
        <p onClick={() => navigate('/')}>Home</p>
        <p onClick={() => navigate('about')}>About</p>
        <p onClick={() => navigate('contact')}>Contact</p>
        </div>
          </div>
        ):null}
        </div>
      </ClickAwayListener>
        <p onClick={() => navigate('/')}>App Name</p>
        </div>
      <div style={{flex:1}}/>
      <div className='options'>
        <ul>
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={() => navigate('about')}>About</li>
          <li onClick={() => navigate('contact')}>Contact</li>
        </ul>
      </div>
      <div className='avatar'>
      {profilename ? (
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          {profilename.username === 'ScheduleMeet'? (
            <Skeleton variant='circular' width='35px' height='35px'></Skeleton>
          ):(
      <Avatar 
      onClick={handleClick}
      sx={{ 
        bgcolor: '#8774e1', 
        cursor:'pointer',
        fontWeight:'bold',
        width:'35px',
        height:'35px',
        fontFamily:'poppines'
       }} 
      src='#'
      >
       {profilename?.username.slice(0, 1)}
      </Avatar>
          )}
       {open ? (
        <div className='expandMenu'>
        <div className='content'>
        <p>{profilename?.username ||     <Skeleton variant="text" sx={{ fontSize: '1rem' }} />}</p>
        <p onClick={logoutHandle}>Logout</p>
        </div>
        <div className='line'/>
        <div className='theme'>
          <p>Dark Mode</p>
            {theme === 'light' || null ? (
            <ToggleOffOutlinedIcon 
            onClick={switchTheme}
            sx={{
              width:'40px', 
              height:'40px', 
              cursor:'pointer'
              }}/>
              ) : (
            <ToggleOnSharpIcon 
            onClick={switchTheme}
            sx={{
              width:'40px', 
              height:'40px', 
              cursor:'pointer'
              }}/>
              )}
        </div>
      </div>
      ) : <div>{null}</div>}  
      </div>
      </ClickAwayListener>
      ):(
        <>
         <div className='theme'
          style={{
              background:'transparent'
         }}>
            {theme === 'light' ? (
            <NightlightIcon 
            onClick={switchTheme}
            sx={{
              width:'20px', 
              height:'20px', 
              cursor:'pointer'
              }}/>
              ) : (
            <LightModeIcon 
            onClick={switchTheme}
            sx={{
              width:'20px', 
              height:'20px', 
              cursor:'pointer'
              }}/>
              )}
        </div>
      <div onClick={()=>navigate('login')} className='login'>
          <LockOutlinedIcon fontSize='inherit'/>
          <p>Log In</p>
      </div>
      </>
      )}
      </div>
    </div>
  )
}

export default Header;
