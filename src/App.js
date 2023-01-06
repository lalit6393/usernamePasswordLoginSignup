import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Create from './components/create/Create';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Landing from './components/landingPage/Landing';
import ResetByUserName from './components/login/forgetPass/ResetByUserName';
import Login from './components/login/Login';
import NewPass from './components/login/newPass/NewPass';
import Notifications from './components/notifications/Notifications';
import PageNotFound from './components/pageNotFound/PageNotFound';
import Prevent from './components/Prevent';
import Register from './components/register/Register';
import ResendEmail from './components/register/resendEmail/ResendEmail';
import SharedEvent from './components/shared/SharedEvent';
import EmailVerify from './components/verification/EmailVerify';
import { UserAuthProvider } from './context/UseUserAuth';

function App() {

  const [theme, setTheme] = useState(localStorage.getItem('theme'));
  const [message, setMessage] = useState(null);
  const [openNotifi, setOpenNotifi] = useState(false);
  const [notificationType, setNotificationType] = useState("info");

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark':'light';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  }

  return (
    <div className="App" data-theme = {theme}>
    <UserAuthProvider>
     <Notifications
       message = {message}
       openNotifi = {openNotifi}
       notificationType = {notificationType}
       setOpenNotifi = {setOpenNotifi}
     />
     <Header 
     switchTheme = {switchTheme} 
     theme={theme}
     setMessage={setMessage} 
     setNotificationType={setNotificationType} 
     setOpenNotifi={setOpenNotifi}
     setTheme = {setTheme}
     />
     <Routes>
      <Route path='/' 
      element={
        <Prevent>
          <Home
           setMessage={setMessage} 
           setNotificationType={setNotificationType} 
           setOpenNotifi={setOpenNotifi}
          />
        </Prevent>
      }/>
      <Route path='about' element={<About/>}/>
      <Route path='create' 
      element={
        <Prevent>
      <Create
      setMessage={setMessage} 
      setNotificationType={setNotificationType} 
      setOpenNotifi={setOpenNotifi}
      />
      </Prevent>
      }/>
      <Route path='contact' element={<Contact/>}/>
      <Route path='login' 
      element={
      <Login
      setMessage={setMessage} 
      setNotificationType={setNotificationType} 
      setOpenNotifi={setOpenNotifi}
      />
      }/>
      <Route path='register' 
      element={
      <Register
      setMessage={setMessage} 
      setNotificationType={setNotificationType} 
      setOpenNotifi={setOpenNotifi}
      />
      }/>
      <Route path='login/reset' 
      element={
      <ResetByUserName
        setMessage={setMessage} 
        setNotificationType={setNotificationType} 
        setOpenNotifi={setOpenNotifi}
      />}
      />
      <Route path='login/reset/new/:token' 
      element={
      <NewPass
        setMessage={setMessage} 
        setNotificationType={setNotificationType} 
        setOpenNotifi={setOpenNotifi}
      />}
      />
      <Route path='register/resend/:username'
      element={
        <ResendEmail
           setMessage={setMessage} 
           setNotificationType={setNotificationType} 
           setOpenNotifi={setOpenNotifi}
        />}
      />
      <Route path='/verification/:uid' 
      element={
      <EmailVerify
      setMessage={setMessage} 
      setNotificationType={setNotificationType} 
      setOpenNotifi={setOpenNotifi}
      />}/>
      <Route path='landing' element={<Landing/>}></Route>
      <Route path='*' element={<PageNotFound/>}/>
      <Route path='/:username/event/:id' element={<SharedEvent/>}/>
     </Routes>
     </UserAuthProvider>
     </div>
  );
}

export default App;
