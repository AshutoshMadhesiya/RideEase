import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
  };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 bg-blue-700 text-white">
            <div className="flex gap-6">
                <Link to="/home" className="font-bold text-white hover:underline">Home</Link>
                <Link to="/about" className="font-bold text-white hover:underline">About Us</Link>
            </div>
            <div className="flex gap-4">
                <button
                    onClick={() => navigate('/profile')}
                    className="border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-blue-700 transition"
                >
                    Profile
                </button>
                <button
                    onClick={handleLogout}
                    className="bg-white text-blue-700 px-4 py-2 rounded font-bold hover:bg-blue-100 transition"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
