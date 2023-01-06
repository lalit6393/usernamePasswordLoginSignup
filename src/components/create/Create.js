import React, {useEffect, useState} from 'react';
import style from './styles.module.css';
import imag from '../../Static/PMTxeJ.jpg';
import dayjs from 'dayjs';
import ShareIcon from '@mui/icons-material/Share';
import CheckIcon from '@mui/icons-material/Check';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import axios from 'axios';
import { useUserAuth } from '../../context/UseUserAuth';
import { useNavigate } from 'react-router-dom';
var localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);

const Create = ({setMessage, setNotificationType, setOpenNotifi}) => {

  const navigate = useNavigate();
  const {url, token, user} = useUserAuth();
  const[title, setTitle] = useState('');
  const[startTime, setStartTime] = useState(dayjs().format().toString());
  const[endTime, setEndTime] = useState(dayjs().format().toString());
  const[date, setDate] = useState(dayjs().format().toString());
  const[description, setDescription] = useState('');
  var StartingTime = dayjs();
  var EndingTime = dayjs();

  const handleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleChange2 = (e) => {
    setDescription(e.target.value);
  }

  const handleStartTimeChange = (e) => {
    var d = dayjs().set('hour', e.target.value.slice(0,2)).set('minute', e.target.value.slice(3,5));
    setStartTime(d.format());
  }

  const handleEndTimeChange = (e) => {
    var d = dayjs().set('hour', e.target.value.slice(0,2)).set('minute', e.target.value.slice(3,5));
    setEndTime(d.format());
  }

  const handleDateChange = (e) => {
    setDate(dayjs(e.target.value).format());
  }

  const createEvent = () => {

    if(title.trim() && description.trim()){
    if(dayjs(StartingTime).isSame(dayjs(EndingTime))){
      setMessage('Start and End Time must be different.');
      setNotificationType('error');
      setOpenNotifi(true);
      return;
    }

    if(dayjs(StartingTime).isAfter(dayjs(EndingTime))){
      setMessage('Select time in correct order.');
      setNotificationType('error');
      setOpenNotifi(true);
      return;
    }

    if(dayjs(StartingTime).isBefore(dayjs(EndingTime))){
      setMessage('Creating...');
      setNotificationType('info');
      setOpenNotifi(true);
      axios.post(`${url}/${user.username}/event`, {title:title, description:description, startTime:startTime, endTime:endTime, date:date}, 
      {
        headers:{
          'Authorization': `bearer ${token}`
        }
      })
      .then((res) => {
      // console.log(res.data);
      setMessage('Created!');
      setNotificationType('success');
      setOpenNotifi(true);
      navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }else{
    setMessage('Title or description does not found!');
    setNotificationType('error');
    setOpenNotifi(true);
  }

  }

  useEffect(() => {
   StartingTime = dayjs(date.slice(0,10)+startTime.slice(10)).format();  
   EndingTime = dayjs(date.slice(0,10)+endTime.slice(10)).format();   
  },[startTime, endTime, date]);
 

  return (
    <div className={style.create}>
      <div className={style.part1}>
        <div className={style.cardPage}>
        <div className={style.card}>
          <div className={style.image}>
            <img src={imag} alt='Poster' height='12.2rem'></img>
          </div>
          <div className={style.title}>
            {title || 'Title'}
          </div>
          <div className={style.description}>
           {description || 'Description is very important for any kind of job. So here is our description.'}
          </div>
          <div className={style.date}>
            <p>{dayjs(date).format('ll')}</p>
          </div>
          <div className={style.time}>
            <div className={style.startTime}>
            {dayjs(startTime).format('LT')}
            </div>
            <p>To</p>
            <div className={style.endTime}>
            {dayjs(endTime).format('LT')}
            </div>
          </div>
        </div>
        <div className={style.line}/>
        <div className={style.admin}>
            <div className={style.name}>
              <p>{user?.username}</p>
              {user?.email.length > 10 ? (<span>{user?.email.substring(0,15) + '...'}</span>): (
                 <span>user?.email</span>
              )}
            </div>
            <div className={style.share}>
              <ShareIcon
                sx={{
                  width:'20px', 
                  height:'20px', 
                  cursor:'pointer'
                  }}
              />
            </div>
          </div>
      </div>
    </div>
       <div className={style.part2}>
       <div className={style.part2ContentPage}>
        <div className={style.checkIcon}>
        <CheckIcon
        sx={{
          width:'20px', 
          height:'20px', 
          cursor:'pointer'
          }}
        />
        </div>
       <div className={style.p2title}>
       <input
       maxLength={22}
       type={'text'}
       value={title}
       placeholder='Title'
       onChange={handleChange}
       autoFocus
       ></input>
       </div>
       <div className={style.p2description}>
       <textarea
       maxLength={100}
       type={'text'}
       value={description}
       placeholder='Write the description of the event in maximum 100 letters.'
       onChange={handleChange2}
       ></textarea>
       </div>
       <div className={style.p2timeDiv}>
       <div className={style.p2time}>
       <div className={style.p2endTime}>
        <AccessTimeRoundedIcon
         sx={{
          width:'18px', 
          height:'18px', 
          cursor:'pointer'
          }}
        />
        <p>Start Time</p>
       </div>
       <div className={style.p2endTime}>
       <AccessTimeRoundedIcon
        sx={{
          width:'18px', 
          height:'18px', 
          cursor:'pointer'
          }}
       />
       <p>End Time</p>
       </div>
       <div className={style.p2endTime}>
       <TodayOutlinedIcon
        sx={{
          width:'19px', 
          height:'19px', 
          cursor:'pointer'
          }}
       />
        <p>Date</p>
       </div>
       <div className={style.p2endTime}>
       <PlaceOutlinedIcon
        sx={{
          width:'19px', 
          height:'19px', 
          cursor:'pointer'
          }}
       />
        <p>Location</p>
       </div>
       </div>
       <div className={style.inputTime}>
        <div className={style.clockClick}>
          <p>{
          dayjs(startTime).format('LT')}</p>
          <input
          style={{
            fontFamily:'poppines',
            border:'0',
            outline:'none',
            background:'none'
          }}
          type={'time'}
          onChange={handleStartTimeChange}
          />
        </div>
        <div className={style.clockClick}>
        <p>{dayjs(endTime).format('LT')}</p>
           <input
          style={{
            fontFamily:'poppines',
            border:'0',
            outline:'none',
            background:'none'
          }}
          type={'time'}
          onChange={handleEndTimeChange}
          />
        </div>
        <div className={style.dateClick}>
          <p>{dayjs(date).format('DD/MM/YYYY')}</p>
          <input 
          type='date'
          style={{
            fontFamily:'poppines',
            border:'0',
            outline:'none',
            background:'none'
          }}
          onChange={handleDateChange}
          />
        </div>
        <div>
              India
        </div>
       </div>
       </div>
       <div className={style.buttonDiv}>
         <div onClick={createEvent}>
          <p>Create</p>
         </div>
       </div>
       </div>
      </div>
    </div>
  )
}

export default Create;
