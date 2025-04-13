const express = require('express');
const router = express.Router();
const { body,query } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/create', authMiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Pickup location is required'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Destination is required'),
    body('vehicleType').isString().isIn(['car', 'motorcycle', 'auto']).withMessage('Vehicle type is required and must be one of car, motorcycle, or auto'),
    rideController.createRide
)

router.get('/getFare', authMiddleware.authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Pickup location is required'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Destination is required'),
    rideController.getFare
);

router.post('/confirm-ride', authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Ride ID is required and must be a valid MongoDB ObjectId'),
    rideController.confirmRide
)

router.get('/start-ride', authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Ride ID is required and must be a valid MongoDB ObjectId'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('OTP is required and must be 6 digits long'),
    rideController.startRide
)

module.exports = router;