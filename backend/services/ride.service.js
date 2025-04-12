const rideModel = require("../models/ride.model");
const crypto = require("crypto");
const mapService = require("./map.service");
const { error } = require("console");

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

module.exports.confirmRide = async ({rideId, captain}) => {
  if (!rideId) {
    throw new Error("Ride ID are required");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    { captain: captain._id, status: "accepted" }
  );

  const ride = await rideModel.findOne({ _id: rideId }).populate("user");
  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};
