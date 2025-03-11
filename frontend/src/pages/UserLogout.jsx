import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
  }, [navigate]);

  return <div>logging out...</div>;
};

export default UserLogout;
