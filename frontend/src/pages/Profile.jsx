import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
import Navbar from "../components/Navbar";

const Profile = () => {
  const { user, setUser } = useContext(UserDataContext);

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // Fetch profile if context is empty
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    // Only fetch if context user has no meaningful data
    if (!user || !user.email) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch profile:", err);
          navigate("/login");
        });
    }
  }, []); // run once on mount

  const [formData, setFormData] = useState({});

  const handleEditToggle = () => {
    if (!isEditing) setFormData(user);
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // Create a payload and don't send an empty password
      const payload = {
        fullname: formData.fullname,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      };

      if (formData.password && formData.password.trim() !== "") {
        payload.password = formData.password;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/user/profile`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUser(response.data);
        setIsEditing(false);
        alert(
          "Profile updated successfully! If you changed your credentials, please use them for your next login."
        );
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert(
        error.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    }
  };

  const handleCancel = () => {
    setFormData(user); // Reset form data to original state
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "firstname" || name === "lastname") {
      setFormData((prev) => ({
        ...prev,
        fullname: { ...prev.fullname, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-8 sm:mt-24 bg-white shadow-xl rounded-2xl p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 mt-20">
        Your Profile Information
      </h2>

      {/* User Info */}
      <div className="space-y-3 text-gray-700">
        {isEditing ? (
          <>
            {/* Firstname */}
            <div>
              <label className="font-semibold block text-sm">First Name:</label>
              <input
                name="firstname"
                type="text"
                value={formData.fullname?.firstname || ""}
                onChange={handleInputChange}
                className="w-full border px-2 py-1 rounded mt-1"
              />
            </div>

            {/* Lastname */}
            <div>
              <label className="font-semibold block text-sm">Last Name:</label>
              <input
                name="lastname"
                type="text"
                value={formData.fullname?.lastname || ""}
                onChange={handleInputChange}
                className="w-full border px-2 py-1 rounded mt-1"
              />
            </div>

            {/* Email */}
            <div>
              <label className="font-semibold block text-sm">Email:</label>
              <input
                name="email"
                type="email"
                value={formData.email || ""}
                onChange={handleInputChange}
                className="w-full border px-2 py-1 rounded mt-1"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="font-semibold block text-sm">Phone:</label>
              <input
                name="phoneNumber"
                type="text"
                value={formData.phoneNumber || ""}
                onChange={handleInputChange}
                className="w-full border px-2 py-1 rounded mt-1"
              />
            </div>

            {/* Password */}
            <div>
              <label className="font-semibold block text-sm">Password:</label>
              <input
                name="password"
                type="password"
                value={formData.password || ""}
                onChange={handleInputChange}
                className="w-full border px-2 py-1 rounded mt-1"
              />
            </div>
          </>
        ) : (
          <div>
            <div className="mb-10">
              <p className="font-semibold mb-3">Name:</p>
              <p>
                {user.fullname?.firstname} {user.fullname?.lastname}
              </p>
            </div>

            <div className="mb-10">
              <p className="font-semibold mb-3">Email:</p>
              <p>{user.email}</p>
            </div>

            <div className="mb-10">
              <p className="font-semibold mb-3">Phone:</p>
              <p>{user.phoneNumber || "NA"}</p>
            </div>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between mt-8 space-x-2">
        <div className="flex space-x-2">
          {!isEditing ? (
            <button
              onClick={handleEditToggle}
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
