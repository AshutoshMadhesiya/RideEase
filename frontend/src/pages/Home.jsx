import React, { useState, useRef, useContext, useEffect } from "react";
import { UserDataContext } from "../context/UserContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";

const Home = () => {
  
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const panelRefs = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const { socket } = useContext(SocketContext); 
  const { user } = useContext(UserDataContext);

  useEffect(() => {

    socket.emit("join", { userType: "user", userId: user._id });

  },[user]);

  socket.on('ride-confirmed', ride=>{

    setWaitingForDriver(true)
    setVehiclePanel(false)
  })

  const createRide = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ride/create`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Error creating ride:", error);
    }
  };

  const handleSuggestionChange = async (value) => {
    if (value.length < 3) {
      setSuggestions([]); // Clear suggestions if input is less than 3 characters
      return;
    } else
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/map/get-suggestions`,
          {
            params: { input: value },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
  };

  const handleFindTripButton = async () => {
    setSuggestions([]);
    setPanelOpen(false);
    setVehiclePanel(true);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/ride/getFare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setFare(response.data);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };
  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRefs.current, {
          height: "70%",
        });
      } else {
        gsap.to(panelRefs.current, {
          height: "0%",
        });
      }
    },
    [panelOpen]
  );
  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          translateY: "0%",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          translateY: "100%",
        });
      }
    },
    [vehiclePanel]
  );
  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          translateY: "0%",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          translateY: "100%",
        });
      }
    },
    [confirmRidePanel]
  );
  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          translateY: "0%",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          translateY: "100%",
        });
      }
    },
    [vehicleFound]
  );
  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          translateY: "0%",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          translateY: "100%",
        });
      }
    },
    [waitingForDriver]
  );

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-20 absolute left-5 top-5"
        src="https://logospng.org/download/uber/logo-uber-4096.png"
      ></img>
      <div className="h-screen w-screen">
        <img
          className="h-full w-full  object-cover"
          src="https://preview.redd.it/prayagraj-kumbh-mela-2025-v0-vk0hz9yhjbxd1.png?width=1342&format=png&auto=webp&s=d91ab21f5817b4a556356917166571f5ca6b8f0f"
          alt=""
        />
      </div>
      <div className=" flex flex-col justify-end h-screen absolute top-0 w-full ">
        <div className="h-[30%] p-5 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute top-0 left-0"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold right-2">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-20 w-1  left-5 bg-black rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
                handleSuggestionChange(e.target.value);
              }}
              className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full"
              type="text"
              placeholder="Add pick up location"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                handleSuggestionChange(e.target.value);
              }}
              className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full"
              type="text"
              placeholder="Enter your Destination"
            />
          </form>
          <button
            className="bg-black text-white text-lg px-6 py-3 rounded-2xl hover:bg-gray-500 transition duration-300 shadow-md w-full"
            onClick={handleFindTripButton}
          >
            Find trip
          </button>
        </div>

        <div ref={panelRefs} className="h-0  bg-white  ">
          <LocationSearchPanel
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full   bg-white px-3 py-10"
      >
        <VehiclePanel
          setVehicleType={setVehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full   bg-white px-3 py-10"
      >
        <ConfirmRide
          vehicleType={vehicleType}
          pickup={pickup}
          destination={destination}
          fare={fare}
          createRide={createRide}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 translate-y-full   bg-white px-3 py-10"
      >
        <LookingForDriver
          vehicleType={vehicleType}
          pickup={pickup}
          destination={destination}
          fare={fare}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-10"
      >
        <WaitingForDriver waitingForDriver={waitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
