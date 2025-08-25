import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";
import pic from "../assets/RideEaseCaptain.png"; // Logo

const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const [ride, setRide] = useState(null);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopUpPanelRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    if (!captain?._id) return;

    socket.emit("join", { userType: "captain", userId: captain._id });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: { ltd: latitude, lng: longitude },
          });
        });
      }
    };

    updateLocation();
    const interval = setInterval(updateLocation, 10000);

    // Listen for new ride
    socket.on("new-ride", (data) => {
      console.log("🚗 new-ride received", data);
      setRide(data);
      setRidePopUpPanel(true);
    });

    // ✅ Listen for ride-confirmed
    socket.on("ride-confirmed", (data) => {
      console.log("✅ ride-confirmed event received:", data);
      setWaitingForDriver(true);
    });

    return () => {
      clearInterval(interval);
      socket.off("new-ride");
      socket.off("ride-confirmed");
    };
  }, [captain, socket]);

  async function confirmRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ride/confirm-ride`,
        {
          rideId: ride._id,
          captainId: captain._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("✅ confirm-ride response:", response.data);
      setConfirmRidePopUpPanel(true);
      setRidePopUpPanel(false);
    } catch (error) {
      console.error(
        "❌ Error confirming ride:",
        error.response?.data || error.message
      );
    }
  }

  useGSAP(() => {
    gsap.to(ridePopUpPanelRef.current, {
      transform: ridePopUpPanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [ridePopUpPanel]);

  useGSAP(() => {
    gsap.to(confirmRidePopUpPanelRef.current, {
      transform: confirmRidePopUpPanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [confirmRidePopUpPanel]);

  return (
    <div className="h-screen w-screen flex flex-col bg-[#F5F5F5] pt-16">
      <div className="h-2/3 flex justify-center items-center">
        <LiveTracking />
      </div>

      <div className="h-1/3 p-6">
        <CaptainDetails />
      </div>

      {/* Ride PopUp */}
      <div
        ref={ridePopUpPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10"
      >
        <RidePopUp
          ride={ride}
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          confirmRide={confirmRide}
        />
      </div>

      {/* Confirm Ride PopUp */}
      <div
        ref={confirmRidePopUpPanelRef}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          setRidePopUpPanel={setRidePopUpPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
