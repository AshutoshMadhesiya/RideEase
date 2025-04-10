const { Server } = require("socket.io");
const userModel = require("./models/user.model.js");
const captainModel = require("./models/captain.model.js");

// Initialize variable to hold the Socket.IO instance
let io;

function initializeSocket(server) {
  // Setup Socket.IO with CORS enabled
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join", async (data) => {
        const { userId, userType } = data;

        if(userType=== 'user')
        {
            await userModel.findByIdAndUpdate(userId, { socketId: socket.id });  

        }else if(userType==='captain'){

            await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });

        }
    });

    socket.on('update-location-captain', async (data) => {

      const { userId, location } = data;

      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", "Invalid location data");
      }

      await captainModel.findByIdAndUpdate(userId, { location: {
        ltd: location.ltd,
        lng: location.lng,
      } });

    })
    
    
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
  return io;
}

function sendMessageToSocketId(socketId, eventName, message) {
  if (io) {
    io.to(socketId).emit(eventName, message);
  } else {
    console.log("Socket.io is not initialized.");
  }
}

module.exports = { initializeSocket, sendMessageToSocketId };
