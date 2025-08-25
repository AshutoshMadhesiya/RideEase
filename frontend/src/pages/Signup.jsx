import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "./../context/UserContext";
import pic from "../assets/RideEaseUser.png"; // Import the user image

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        navigate("/home");
      }
    }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/register`,
      newUser
    );
    if (response.status === 201) {
      const data = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", "user");
      setUser(data.user);

      navigate("/home");
    }
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
  };
  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between max-w-md mx-auto bg-gray-50">
        <div>
          <img
            className="w-24 mb-10 relative z-10"
            src={pic}
          />
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <h3 className="text-lg font-medium mb-2">What's your name</h3>
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
            <h3 className="text-lg font-medium mb-2">What's your email</h3>
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
            <button className="bg-black text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base ">
              Create Account
            </button>
          </form>
          <p className="text-center">
            Already have an account{" "}
            <Link to="/login" className="text-blue-600">
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

export default Signup;
