import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';


const Private = () => {
  
  const token =  localStorage.getItem('token')

  console.log(token)
  return (
  <>
    {!token ? <Navigate to="/login" /> : <Outlet />}
  </>
  );
};

export default Private;