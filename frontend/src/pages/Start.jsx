import React from 'react';
import { Link } from 'react-router-dom';
import startImg from '../assets/start_img.jpg'; // Import the image

const Start = () => {
  return (
    <div
      className="bg-cover bg-center h-screen flex justify-between flex-col w-full justify-center"
      style={{ backgroundImage: `url(${startImg})` }}
    >
      <img
        className="w-16 ml-8 mt-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />
      <div className="bg-white py-4 px-4 pb-7 mx-8 mb-8 rounded-lg max-w-lg">
        <h2 className="text-3xl font-bold">Get started with Uber</h2>
        <Link
          to="/login"
          className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-4"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Start;