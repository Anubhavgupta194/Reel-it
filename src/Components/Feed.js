import React, { useContext, useEffect, useState } from 'react';
import { Authstore } from '../context/AuthContext';
import { database } from '../firebase';
import Navbar from './Navbar';
import Post from './Post';
import Upload from './upload';


export default function Feed()
{    const {logout}=useContext(Authstore)
      const [userdata,SetUser]=useState('');
      const{user}=useContext(Authstore)
 useEffect(()=>{
         
          const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
            SetUser(snapshot.data())
           
            
     })
    
     return()=>{unsub()}
 },[user])
    return(
        <>       
         <Navbar UserData={userdata}/> 
         < div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
         <Upload/>
         <Post/>
        </div>
        </>

    );
}


