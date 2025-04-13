const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    captain:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
    },
    pickup:{
        type: String,
        required: true
    },
    destination:{
        type: String,
        required: true
    },
    fare:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum: ['pending', 'accepted', 'completed', 'cancelled', 'ongoing'],
        default: 'pending'
    },
    duration:{
        type: Number
    },
    distance:{
        type: Number
    },
    paymentId: {
        type: String,
    },
    orderId: {
        type: String,
    },
    otp:{
        type: String,
        select: false,
        required: true
    },

})

module.exports = mongoose.model('ride', rideSchema);