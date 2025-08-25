import React from "react";
import { Link, NavLink } from "react-router-dom";
import pic from "../assets/RideEaseCaptain.png";

const CaptainNavbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/captain-home">
              <img className="h-10 w-auto" src={pic} alt="RideEase Captain" />
            </Link>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink
                  to="/captain-home"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/captain-profile"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`
                  }
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/captain/logout"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`
                  }
                >
                  Logout
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainNavbar;
