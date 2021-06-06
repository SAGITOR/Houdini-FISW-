import React, { useState, useEffect } from 'react';
import {axiosInterceptors, getToken} from './token';
import {userInformation} from '../databaBase';

axiosInterceptors();

export const AuthContext = React.createContext();

export const Verificatetoken = ( {children} ) => {
    const [ currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        const verificateToken = (async () => {
            if(!getToken()){
                setLoading(false);
                return;
            }

            try{
                const { data } = await userInformation();
                setCurrentUser(data);
                setLoading(false);
            }catch(error){
                setLoading(false);
                console.log(error);
            }
            
        })();

    }, []);

    if(loading){
        const divStyle = {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          textAlign: 'center',
          alignItems: 'center',
          paddingTop: '40vh',
     
        };
        const spinnerStyle = {
          width: '10rem',
          height: '10rem'
        }//por mientras 
        return (
          <> 
            <div style = {divStyle} >
              <div className="spinner-grow text-primary" role="status"/>
              <div className="spinner-grow text-secondary" role="status"/>
              <div className="spinner-grow text-success" role="status"/>
              <div className="spinner-grow text-danger" role="status"/>
              <div className="spinner-grow text-warning" role="status"/>
              <div className="spinner-grow text-info" role="status"/>
              <div className="spinner-grow text-light" role="status"/>
              <div className="spinner-grow text-dark" role="status"/>
              <div className="spinner-border " role="status" style = {spinnerStyle}>

              </div>
            </div>
          </>
        )
      }
    
      return (
        <AuthContext.Provider
          value={{
            currentUser,
            setCurrentUser
          }}
        >
          {children}
        </AuthContext.Provider>
      );
}
