import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children , isAdminRoute = false}) => {
    const user = useSelector(state => state.auth.user);
    const condition = isAdminRoute ? (user && user?.userType == 'admin') : user;
  return (
    <>
        { condition ? children : <Navigate to={"/login"}/>}
    </>
  )
}

export default ProtectedRoute