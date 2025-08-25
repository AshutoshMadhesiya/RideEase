import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FinishRide = (props) => {

  const navigate = useNavigate();
  async function endRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/ride/end-ride`,
      {
        rideId: props.ride._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      props.setFinishRidePanel(false);
      navigate("/captain-home");
    }
  }

  return (
    <div>
      <h5
        className="p-3 text-center absolute top-0  w-[90%]"
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5 ">Finish this ride </h3>
      <div className="flex items-center justify-between p-2 bg-yellow-400 rounded-lg  mt-4">
        <div className="flex items-center  gap-3  ">
          <h2 className="text-2xl font-medium p-3">
            {props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}
          </h2>
        </div>
        <h5 className="text-xl font-semibold p-3">{props.ride?.distance + " km"}</h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5  p-2 border-b-2">
            {" "}
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium ">{props.ride?.pickup}</h3>
              <p className="text-gray-600 text-sm -mt-1">Pickup</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium ">
                {props.ride?.destination}
              </h3>
              <p className="text-gray-600 text-sm -mt-1">Destination</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 ">
            <i className="ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className="text-lg font-medium ">₹{props.ride?.fare}</h3>
              <p className="text-gray-600 text-sm -mt-1">Cash Cash</p>
            </div>
          </div>
        </div>
        <div className="mt-6 w-full ">
          <button
            onClick={endRide}
            className="w-full flex justify-center bg-green-600 rounded-xl text-black font-semibold p-3 mt-4"
          >
            Finish Ride
          </button>
          <p className=" text-red-600 text-xs mt-10">
            Click on Finish Ride if you have completed the payment{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
