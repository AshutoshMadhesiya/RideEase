import React from 'react'
import { useNavigate } from 'react-router-dom';

const CaptainProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
  
    if (!token) {
      navigate("/captain-login");
    }
    return <>{children}</>;
  };

export default CaptainProtectedWrapper
