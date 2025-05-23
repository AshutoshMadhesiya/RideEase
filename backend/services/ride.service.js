const rideModel = require("../models/ride.model");
const crypto = require("crypto");
const mapService = require("./map.service");
const { error } = require("console");
const { sendMessageToSocketId } = require("../socket");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination locations are required");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  const distanceInKm = parseFloat(distanceTime.distance);
  const timeInMin = parseFloat(distanceTime.duration);

  const baseFare = {
    car: 50,
    motorcycle: 20,
    auto: 30,
  };

  const perKmRate = {
    car: 10,
    motorcycle: 5,
    auto: 7,
  };

  const perMinuteRate = {
    car: 2.5,
    motorcycle: 1.5,
    auto: 2.0,
  };

  const fare = {
    car: Math.round(
      baseFare.car +
        perKmRate.car * distanceInKm +
        perMinuteRate.car * timeInMin
    ),
    motorcycle: Math.round(
      baseFare.motorcycle +
        perKmRate.motorcycle * distanceInKm +
        perMinuteRate.motorcycle * timeInMin
    ),
    auto: Math.round(
      baseFare.auto +
        perKmRate.auto * distanceInKm +
        perMinuteRate.auto * timeInMin
    ),
  };

  return fare;
}

module.exports.getFare = getFare;

function getOtp(length) {
  const otp = crypto
    .randomInt(Math.pow(10, length - 1), Math.pow(10, length) - 1)
    .toString();
  return otp;
}

module.exports.createRide = async (user, pickup, destination, vehicleType) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("User, pickup, destination and vehicle type are required");
  }

  const fare = await getFare(pickup, destination);

  const ride = {
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  };

  const createdRide = await rideModel.create(ride);
  return createdRide;
};

module.exports.confirmRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride ID are required");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    { captain: captain._id, status: "accepted" }
  );

  const ride = await rideModel
    .findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};

module.exports.startRide = async ({ rideId, otp, captain }) => {

  if (!rideId || !otp) {
    throw new Error("Ride ID and OTP are required");
  }

  const ride = await rideModel.findOne({ _id: rideId }).populate("user").populate("captain").select("+otp");
  
  if (!ride) {
    throw new Error("Invalid OTP or Ride ID");
  }
  
  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  if (ride.status !== "accepted") {
    throw new Error("Ride is not accepted yet");
  }

  
  
  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    { status: "ongoing" }
  )
  
  ride.status = "ongoing";

  sendMessageToSocketId(ride.user.socketId, "ride-started", ride);

  return ride;



}


module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride ID is required");
  }

  const ride = await rideModel.findOne({ _id: rideId, captain: captain._id }).populate("user").populate("captain");

  if (!ride) {
    throw new Error("Ride not found");
  }
  if (ride.status !== "ongoing") {
    throw new Error("Ride is not ongoing");
  }
  
  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    { status: "completed" }
  );

  ride.status = "completed";

  return ride;
}
