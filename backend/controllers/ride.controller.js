const rideService = require("../services/ride.service");
const mapService = require("../services/map.service");
const { validationResult } = require("express-validator");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride.model");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;

  try {
    // 1. Create ride
    const ride = await rideService.createRide(
      req.user._id.toString(),
      pickup,
      destination,
      vehicleType
    );

    // 2. Get coordinates of pickup
    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
    // console.log("Pickup Coordinates", pickupCoordinates);

    // 3. Find captains nearby
    const captains = await mapService.getCaptainInTheRadius(
      pickupCoordinates.lat,
      pickupCoordinates.lng,
      5
    );

    // 4. Remove OTP before broadcasting
    ride.otp = "";

    // 5. Get full user data for ride
    const rideWithUser = await rideModel.findById(ride._id).populate("user");

    // 6. Notify all captains
    captains.map((captain) => {
      sendMessageToSocketId(captain.socketId, "new-ride", rideWithUser);
    });

    // 7. Respond to client after all steps
    return res.status(201).json(ride);
  } catch (error) {
    console.error("Ride creation error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;

  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body;
  // console.log("Ride ID", rideId);
  try {
    const ride = await rideService.confirmRide({ rideId, captain: req.captain });
    // Populate the user field so that socketId is available
    const rideWithUser = await rideModel.findById(ride._id).populate("user").populate("captain").select("+otp");

    // console.log("Ride confirmed", rideWithUser);

    sendMessageToSocketId(rideWithUser.user.socketId, "ride-confirmed", rideWithUser);
    return res.status(200).json(rideWithUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId, otp } = req.query;
  try {
    const ride = await rideService.startRide({ rideId, otp, captain: req.captain });
    sendMessageToSocketId(ride.user.socketId, "ride-started", ride);
    return res.status(200).json(ride);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
