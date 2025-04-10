import React, { useEffect, useState, useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const { captain ,setCaptain } = useContext(CaptainDataContext);
    const [ isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (!token) {
        navigate("/captain-login");
      }

      axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setCaptain(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching captain data:", error);
          navigate("/captain-login");
        });
    
      
    }, [token]);


    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    
    return <>{children}</>;
  };

export default CaptainProtectedWrapper
