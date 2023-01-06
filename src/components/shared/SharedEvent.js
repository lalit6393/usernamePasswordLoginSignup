import React, { useEffect, useState } from 'react';
import sharedEventStyle from './style.module.css';
import imag from '../../Static/PMTxeJ.jpg';
import dayjs from 'dayjs';
import axios from 'axios';
import { useUserAuth } from '../../context/UseUserAuth';
import { useParams } from 'react-router-dom';

const SharedEvent = () => {

    const params = useParams();
    const {url} = useUserAuth();
    const [event, setEvent] = useState(null);
    const [sender, setSender] = useState(null);

    useEffect(() => {
        if(params?.username && !event){
            axios.get(`${url + '/' + params.username + '/event/' + params.id}`)
            .then((res) => {
              console.log(res.data);
              setEvent(res.data.event);
              setSender(res.data.sender)
            })
            .catch((err) => {
              console.log("error logged! ",err);
            });
            }
    }, [params]);

  return (
    <div className={sharedEventStyle.home}>
    <div className={sharedEventStyle.cardPage}>
      {event ? (
      <>
        <div className={sharedEventStyle.card}>
      <div className={sharedEventStyle.image}>
        <img src={imag} alt='Poster' height='12.2rem'></img>
      </div>
      <div className={sharedEventStyle.title}>
        {event.title || 'Title'}
      </div>
      <div className={sharedEventStyle.description}>
       {event.description || 'Description is very important for any kind of job. So here is our description.'}
      </div>
      <div className={sharedEventStyle.date}>
        <p>{dayjs(event.date).format('ll')}</p>
      </div>
      <div className={sharedEventStyle.time}>
        <div className={sharedEventStyle.startTime}>
        {dayjs(event.startTime).format('LT')}
        </div>
        <p>To</p>
        <div className={sharedEventStyle.endTime}>
        {dayjs(event.endTime).format('LT')}
        </div>
      </div>
    </div>
    <div className={sharedEventStyle.line}/>
    <div className={sharedEventStyle.admin}>
        <div className={sharedEventStyle.name}>
          <p>{sender?.name}</p>
          {sender?.email.length > 10 ? (<span>{sender?.email?.substring(0,15) + '...'}</span>): (
            <span>{sender?.email}</span>
          )}
        </div>
      </div>
      </>):null}
  </div>
  </div>
  )
}

export default SharedEvent
