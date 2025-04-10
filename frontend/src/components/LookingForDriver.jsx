import { PropTween } from "gsap/gsap-core";
import React from "react";

const LookingForDriver = (props) => {
  let rideFare;

  if (props.vehicleType === "motorcycle") {
    rideFare = props.fare.motorcycle;
  } else if (props.vehicleType === "car") {
    rideFare = props.fare.car;
  } else if (props.vehicleType === "auto") {
    rideFare = props.fare.auto;
  }
  return (
    <div>
      <h5
        className="p-3 text-center absolute top-0  w-[90%]"
        onClick={() => {
          props.setVehicleFound(false);
        }}
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-3 ">Looking For a Driver </h3>
      <div className="flex gap-2 justify between flex-col items-center">
        <img
          className=""
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ7Kt54z31PkbdlqmqnyWnaCjvcLYRG-T_8Q&s"
          alt=""
        />

        <div className="w-full mt-5">
          <div className="flex items-center gap-5  p-2 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium ">{props.pickup}</h3>
              <p className="text-gray-600 text-sm -mt-1">Pickup</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium ">{props.destination}</h3>
              <p className="text-gray-600 text-sm -mt-1">Destination</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 ">
            <i className="ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className="text-lg font-medium ">₹{rideFare}</h3>
              <p className="text-gray-600 text-sm -mt-1">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
