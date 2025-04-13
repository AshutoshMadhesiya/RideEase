import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom"; // Added useLocation
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {
  const location = useLocation(); // Access location object
  const ride = location.state?.ride; // Retrieve ride data

  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);

  useGSAP(() => {
    gsap.to(finishRidePanelRef.current, {
      transform: finishRidePanel ? "translateY(0)" : "translateY(100%)",
      duration: 0.5,
      ease: "power2.out",
    });
  }, [finishRidePanel]);

  return (
    <div className="h-screen w-screen flex flex-col bg-[#F5F5F5]">
      <div className="fixed p-3 top-0 flex items-center justify-between w-screen">
        <img  className="w-16" src="" alt="" />
        <Link
          to="/captain-home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className="h-full flex justify-center items-center">
      <LiveTracking/>    </div>

      <div
        className="h-1/5 p-6 flex items-center relative justify-between bg-yellow-400"
        onClick={() => {
          setFinishRidePanel(true);
        }}
      >
        <h5
          className="p-3 text-center top-0 absolute w-[95%]"
          onClick={(e) => {
            e.stopPropagation();
            setFinishRidePanel((prev) => !prev);
          }}
        >
          <i
            className={`text-3xl text-gray-300 ${
              finishRidePanel
                ? "ri-arrow-down-wide-line"
                : "ri-arrow-up-wide-line"
            }`}
          ></i>
        </h5>
        <h4 className="text-lg font-semibold">
          {ride?.distance || "N/A"} KM away
        </h4>{" "}
        {/* Use ride data */}
        <button className="text-xl font-semibold bg-green-600 text-white rounded-lg p-1">
          Complete Ride
        </button>
      </div>

      <div
        ref={finishRidePanelRef}
        className="fixed w-full h-screen z-[500] bottom-0 translate-y-full bg-white px-3 py-10"
      >
        <FinishRide
          ride={ride} // Pass ride data
          setFinishRidePanel={setFinishRidePanel}
        />
      </div>
    </div>
  );
};

export default CaptainRiding;
