import React,{useContext} from 'react';
import { Navigate } from 'react-router-dom';
import {Route,Routes} from 'react-router-dom';
import { Authstore} from './context/AuthContext';

export  default function PrivateRoute({children}) {
    const {user} = useContext(Authstore) 
   
    return  user?children : <Navigate to="/login"/>
}
