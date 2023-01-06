import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";


const UserAuthContext = createContext();

export const UserAuthProvider = ({children, setMessage, setNotificationType, setOpenNotifi}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const url = 'https://smeet.onrender.com';
    // const url = 'http://localhost:3000';
    const localStore = async() => {
        return localStorage.getItem("token");
    };

    useEffect(() => {
        localStore()
        .then((e) => {
            if(e){
                setToken(e);
                setIsLoggedIn(true);

        axios.get(`${url}/users/checktoken`, 
        {
            headers: {
              'Authorization': `bearer ${e}`
            }}
        )
        .then((res) => {
            // console.log(res.data);
            if(!res.data.success){
               setIsLoggedIn(false);
            }else{
                setIsLoggedIn(true);
                // console.log(res.data.user);
                setUser(res.data.user);
                localStorage.setItem('username', res.data.user.username);
            }
            setLoading(false);
            // console.log(isLoggedIn);
        })
        .catch((err) => {
            // console.log(err);
            setNotificationType('error');
            setMessage(err.message);
            setOpenNotifi(true);
            setIsLoggedIn(false);
            setLoading(false);
        });

            }else{
            setLoading(false);
            }
            // console.log("e----",e);
        });
    }, []);

     
    return (
        <UserAuthContext.Provider value={{isVerified, isLoggedIn, loading, setIsVerified, setIsLoggedIn, setLoading, setUser, user, url, token}}>
        {children}
        </UserAuthContext.Provider>
    );
};

export const useUserAuth = () => {
    return useContext(UserAuthContext);
};