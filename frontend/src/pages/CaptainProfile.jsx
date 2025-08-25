import React, { useContext, useState, useEffect } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainProfile = () => {
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (captain) {
      setFormData({
        fullname: { ...captain.fullname },
        email: captain.email,
        phoneNumber: captain.phoneNumber,
        vehicle: { ...captain.vehicle },
      });
    }
  }, [captain]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length > 1) {
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const payload = { ...formData };
      if (!payload.password || payload.password.trim() === "") {
        delete payload.password;
      }
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/captain/profile`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCaptain(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  if (!captain) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pt-20 p-7 max-w-md mx-auto bg-gray-50">
      <h2 className="text-2xl font-bold mb-6">Captain Profile</h2>
      <div className="space-y-4">
        {isEditing ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="fullname.firstname"
                value={formData.fullname?.firstname || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="fullname.lastname"
                value={formData.fullname?.lastname || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={`${captain.fullname?.firstname || ""} ${
                captain.fullname?.lastname || ""
              }`}
              readOnly
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:text-sm"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber || ""}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {isEditing && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password (leave blank to keep current password)
            </label>
            <input
              type="password"
              name="password"
              value={formData.password || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        )}
        <h3 className="text-xl font-bold pt-4">Vehicle Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Color
            </label>
            <input
              type="text"
              name="vehicle.color"
              value={formData.vehicle?.color || ""}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Plate Number
            </label>
            <input
              type="text"
              name="vehicle.plate"
              value={formData.vehicle?.plate || ""}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Capacity
            </label>
            <input
              type="number"
              name="vehicle.capacity"
              value={formData.vehicle?.capacity || ""}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Vehicle Type
            </label>
            <input
              type="text"
              name="vehicle.vehicleType"
              value={formData.vehicle?.vehicleType || ""}
              onChange={handleInputChange}
              readOnly
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:text-sm"
            />
          </div>
        </div>
      </div>
      <div className="mt-6">
        {isEditing ? (
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default CaptainProfile;
