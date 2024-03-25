const http = require("http");
const socketIo = require("socket.io");

let io;
module.exports = {
  init: (httpserver) => {
    const server = http.createServer(httpserver);
    io = socketIo(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    return io.listen(4000);
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io is not initalized");
    }
    return io;
  },
};
