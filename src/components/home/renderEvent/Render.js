import React from 'react';
import imag from '../../../Static/PMTxeJ.jpg';
import dayjs from 'dayjs';
import renderStyle from './style.module.css';
import { useUserAuth } from '../../../context/UseUserAuth';
import ShareIcon from '@mui/icons-material/Share';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const Render = ({props, deleteEvent}) => {
 
    const {user, url} = useUserAuth();
    // console.log('event: ',props);

  return (
    <div className={renderStyle.cardPage}>
    <div className={renderStyle.card}>
      <div className={renderStyle.image}>
        <img src={imag} alt='Poster' height='12.2rem'></img>
      </div>
      <div className={renderStyle.title}>
        {props.title || 'Title'}
        <DeleteRoundedIcon
        onClick={() => deleteEvent(props._id)}
        sx={{
              width:'20px', 
              height:'20px', 
              cursor:'pointer'
            }}
        />
      </div>
      <div className={renderStyle.description}>
       {props.description || 'Description is very important for any kind of job. So here is our description.'}
      </div>
      <div className={renderStyle.date}>
        <p>{dayjs(props.date).format('ll')}</p>
      </div>
      <div className={renderStyle.time}>
        <div className={renderStyle.startTime}>
        {dayjs(props.startTime).format('LT')}
        </div>
        <p>To</p>
        <div className={renderStyle.endTime}>
        {dayjs(props.endTime).format('LT')}
        </div>
      </div>
    </div>
    <div className={renderStyle.line}/>
    <div className={renderStyle.admin}>
        <div className={renderStyle.name}>
          <p>{user?.username}</p>
          {user?.email.length > 10 ? (<span>{user?.email?.substring(0,15) + '...'}</span>): (
             <span>{user?.email}</span>
          )}
        </div>
        <div className={renderStyle.share}>
        <a rel="noreferrer" href={`whatsapp://send?text=${'*'+props.title+'*'+'%0A'+props.description+'%0A'+encodeURIComponent(`https://schedulemeet.netlify.app/${user.username}/event/${props._id}`)}`}  data-action="share/whatsapp/share" target="_blank">
        <ShareIcon
            sx={{
              width:'20px', 
              height:'20px', 
              cursor:'pointer'
              }}
           />
        </a>
        </div>
      </div>
  </div>
  )
}

export default Render;
