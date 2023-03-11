const net = require("net");
const db = require("./database/dbConnection");
const dataProcessing = require("./dataProcessing/processFrame");
require("dotenv").config();
const PORT = process.env.SOCKET_PORT;

db.connectToDb();

// Create a TCP server
const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    if (!socket.macAddress) {
      dataProcessing.identificationFrameProcess(data).then((mac) => {
        socket.macAddress = mac;
        console.log(
          `New client connected with MAC address: ${socket.macAddress}`
        );
      });
    } else {
      let type = decodeAttributes.getTypeOfFrame(data);
      if (type === "socketEnd") {
      } //TODO: handle socket end
      else {
        dataProcessing.frameProcessing(socket.macAddress, data);
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
