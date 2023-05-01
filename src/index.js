const net = require("net");
const dataProcessing = require("./dataProcessing/processFrame");
const stuffToSend = require("./dataProviding/jsonToIOT");
require("dotenv").config();
const PORT = process.env.SOCKET_PORT;
const ACK = require("./utils/constant");

// Create a TCP server
const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    console.log("data : ", data);
    if (!socket.macAddress) {
      dataProcessing.identificationFrameProcess(data).then((mac) => {
        socket.macAddress = mac;
        console.log(
          `New client connected with MAC address: ${socket.macAddress}`
        );
      console.log("ack : ", ACK);
      socket.write(ACK);

        
      });
    } 
    else {
      let type = decodeAttributes.getTypeOfFrame(data);
      if (type === "endLogs") {
        console.log("socketEnd");
        stuffToSend.getLinesData(socket.macAddress).then((buffer) => {
          socket.write(buffer);
        })
      }
      else if (type === "goToNextInformation") {
        console.log("socketNext");
        stuffToSend.getWateringForIOT(socket.macAddress).then((buffer) => {
          socket.write(buffer);
        })
      }
      else if (type === "data") {
        dataProcessing.frameProcessing(socket.macAddress, data);
        socket.write(ACK)
      }
      else {
        console.log("Unknown frame type");
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
