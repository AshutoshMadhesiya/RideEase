import React from 'react';
import { Link } from 'react-router-dom';
import startImg from '../assets/start_img.jpg'; // Background image
import logo from '../assets/RideEaseLogo.png'; // Logo

const Start = () => {
  return (
    <div
      className="bg-cover bg-center h-screen flex flex-col justify-between w-full relative"
      style={{ backgroundImage: `url(${startImg})` }}
    >
      {/* Background Watermark Logo */}
      <img
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-15 w-[500px] md:w-[700px] pointer-events-none select-none"
        src={logo}
        alt="RideEase Watermark Logo"
      />

      {/* Top Left Logo (crisp, inside badge) */}
      <div className="mt-5 ml-8 z-20">
        <img
          className="w-40 bg-white p-0 rounded-lg shadow-lg"
          src={logo}
          alt="RideEase Logo"
        />
      </div>

      {/* Bottom Card */}
      <div className="bg-white py-6 px-6 mx-8 mb-8 rounded-lg max-w-lg shadow-lg z-20">
        <h2 className="text-3xl font-bold">Get started with RideEase</h2>
        <Link
          to="/login"
          className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-4 hover:bg-gray-800 transition"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Start;
