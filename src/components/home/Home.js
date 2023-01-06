import React, { useEffect, useState } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import homeStyle from'./style.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserAuth } from '../../context/UseUserAuth';
import Render from './renderEvent/Render';

const Home = ({setMessage, setNotificationType, setOpenNotifi}) => {

  const navigate = useNavigate();
  const {url, user} = useUserAuth();
  const [eventArray, setEventArray] = useState(null);
  const [dele, setDele] = useState(false);

  const deleteEvent = (id) => {
    if(id){
    axios.delete(`${url + '/' + user.username + '/event/' + id}`)
    .then((res) => {
      //  console.log(res.data);
       if(!res.data.success){
        setMessage(res.data.status);
        setNotificationType('error');
        setOpenNotifi(true);
        return;
       }
       const newVal = dele === true ? false:true;
       setDele(newVal);
       setMessage(res.data.status);
       setNotificationType('success');
       setOpenNotifi(true);
    })
    .catch((err) => {
      console.log(err);
      setMessage(err.message);
      setNotificationType('error');
      setOpenNotifi(true);
    });
  }else{
    setMessage('Failed!');
    setNotificationType('error');
    setOpenNotifi(true);
  }
  };

  useEffect(() => {
    if(user?.username){
    axios.get(`${url + '/' + user.username}/event`)
    .then((res) => {
      // console.log(res.data);
      setEventArray(res.data.event.map((event) => <Render key={event._id} deleteEvent={deleteEvent} props={event}/>));
    })
    .catch((err) => {
      console.log("error logged! ",err);
    });
    }
  }, [user?.username, dele]);

  return (
    <div className={homeStyle.home}>
      <div className={homeStyle.create} onClick={() => navigate('create')}>
        <div className={homeStyle.plus}>
        <AddRoundedIcon fontSize='large'/>
        </div>
        <p>Create New</p>
        <p>Event</p>
      </div>
      <div className={homeStyle.cards}>
        {eventArray}
      </div>
    </div>
  )
}

export default Home;
