import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Authencation = ({children, redirectTo}) => {
    const {currentUser} = useContext(AuthContext);
    return currentUser ? children : <Navigate to={redirectTo} />;
}

export default Authencation;