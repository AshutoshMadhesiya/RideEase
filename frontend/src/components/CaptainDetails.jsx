import React, { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import pic from "../assets/driver.jpg"; // Logo

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start  gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={pic}
            alt="driver"
          />
          <h4 className="text-lg font-medium"> </h4>
          {captain.fullname.firstname + " " + captain.fullname.lastname}
        </div>
        <div>
          <h4 className="text-xl font-semibold">₹200</h4>
          <p className="text-sm text-gray-600">Earned </p>
        </div>
      </div>
      <div className="flex p-3 mt-6 bg-gray-300 rounded-lg justify-center items-start text-lg font-medium">
  waiting for ride request
  <span className="after:content-['.'] after:animate-dots"></span>
</div>

    </div>
  );
};

export default CaptainDetails;
