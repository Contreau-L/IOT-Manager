const net = require("net");
const db = require("./database/dbConnection");
const dataProcessing = require("./dataProcessing/processFrame");
require("dotenv").config();
const PORT = process.env.SOCKET_PORT;

db.connectToDb();

// Create a TCP server
const server = net.createServer((socket) => {
  console.log("New client connected");

  // Handle data received
  socket.on("data", (data) => {
    if (!socket.macAddress) {
      dataProcessing
        .identificationFrameProcess(data)
        .then((mac) => (socket.macAddress = mac));
      console.log(
        `New client connected with MAC address: ${socket.macAddress}`
      );
    } else {
      let type = decodeAttributes.getTypeOfFrame(data);
      console.log(`data received from ${socket.macAddress}`);
      if (type === "socketEnd") {
      } //TODO: handle socket end
      else {
        dataProcessing.frameProcess(socket.macAddress, data);
      }
    }
  });

  // Handle disconnection
  socket.on("end", () => {
    console.log("Client disconnected");
  });
});

// Listen on the specified port
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

db.endDbConnection();
