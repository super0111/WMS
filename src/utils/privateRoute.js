import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

 const PrivateRoutes = () => {
  const [ auth, setAuth ] = useState(null);

  useEffect(()=>{
    const token = localStorage.getItem("token");
    setAuth(token)
  }, [])

  return auth ? <Outlet /> : <Navigate to="/login" />;
 }

export default PrivateRoutes