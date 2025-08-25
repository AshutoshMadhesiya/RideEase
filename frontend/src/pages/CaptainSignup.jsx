import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "./../context/CaptainContext";
import pic from "../assets/RideEaseCaptain.png";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newCaptain = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: color,
        plate: plate,
        capacity: capacity,
        vehicleType: vehicleType,
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captain/register`,
        newCaptain
      );

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", "captain");
        setCaptain(data.captain);

        navigate("/captain-home");
      }
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
    }

    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setColor("");
    setPlate("");
    setCapacity("");
    setVehicleType("");
  };
  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between max-w-md mx-auto bg-gray-50">
        <div>
          <img className="w-32 mb-10 relative z-10" src={pic} />
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <h3 className="text-lg font-medium mb-2">What's captain name</h3>
            <div className="flex gap-2">
              <input
                required
                className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base "
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <input
                required
                className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base "
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <h3 className="text-lg font-medium mb-2">What's captain email</h3>
            <input
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base "
              type="email"
              placeholder="email@example.com"
            />
            <h3 className="text-lg font-medium mb-2">Enter Password</h3>

            <input
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base "
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              type="password"
              placeholder="password"
            />
            <h3 className="text-lg font-medium mb-2">Vehicle Details</h3>
            <div className="flex gap-2">
              <input
                required
                className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base "
                type="text"
                placeholder="Color"
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                }}
              />
              <input
                required
                className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base "
                type="text"
                placeholder="Plate Number"
                value={plate}
                onChange={(e) => {
                  setPlate(e.target.value);
                }}
              />
            </div>
            <div className="flex gap-2">
              <input
                required
                className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base "
                type="number"
                placeholder="Capacity"
                value={capacity}
                onChange={(e) => {
                  setCapacity(e.target.value);
                }}
              />
              <select
                required
                className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base "
                value={vehicleType}
                onChange={(e) => {
                  setVehicleType(e.target.value);
                }}
              >
                <option value="" disabled>
                  Vehicle Type
                </option>
                <option value="motorcycle">Motorcycle</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            <button className="bg-black text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base ">
              Create Captain Account
            </button>
          </form>
          <p className="text-center">
            Already have an account{" "}
            <Link to="/captain-login" className="text-blue-600">
              Login here{" "}
            </Link>
          </p>
        </div>
        <div>
          <p className="text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
            accusantium.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;
