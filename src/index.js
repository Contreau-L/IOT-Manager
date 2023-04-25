const net = require("net");
const dataProcessing = require("./dataProcessing/processFrame");
const stuffToSend = require("./dataProviding/jsonToIOT");
require("dotenv").config();
const PORT = process.env.SOCKET_PORT;
const ack = 'a'

// Create a TCP server
const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    if (!socket.macAddress) {
      dataProcessing.identificationFrameProcess(data).then((mac) => {
        socket.macAddress = mac;
        console.log(
          `New client connected with MAC address: ${socket.macAddress}`
        );
      socket.write(ack);

        
      });
    } 
    else {
      let type = decodeAttributes.getTypeOfFrame(data);
      if (type === "socketEnd") {
        console.log("socketEnd");
        stuffToSend.getLinesData(socket.macAddress).then((buffer) => {
           console.log("array : ", buffer);
          socket.write(buffer);
        })
        stuffToSend.getWateringForIOT(socket.macAddress).then((buffer) => {
          socket.write(buffer);
        })
        //socket.end();
      } //TODO: handle socket end
      else if (type === "data") {
        dataProcessing.frameProcessing(socket.macAddress, data);
        socket.write(ack)
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
