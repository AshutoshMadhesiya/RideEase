const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectToDb = require('./db/db.js')
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes.js')
const captainRoutes = require('./routes/captain.routes.js')
const mapRoutes = require('./routes/map.routes.js')
const rideRoutes = require('./routes/ride.routes.js')

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send("Backend is running...");
});

app.use('/user', userRoutes);
app.use('/captain', captainRoutes);
app.use('/map', mapRoutes);
app.use('/ride', rideRoutes);

module.exports = app;
