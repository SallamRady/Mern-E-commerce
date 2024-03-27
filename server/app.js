const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const http = require("http");
const socketIO = require("socket.io");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const paymentRoutes = require("./routes/payment.routes");
const deliveryRoutes = require("./routes/delivery.routes");
const notificationRoutes = require("./routes/notification.routes");
const consoleColors = require("./constants/console.colors");
const Delivery = require("./models/delivery.model");

//* define and declare helper varables
const PORT = process.env.PORT | 5000;
let start = [51.0, -0.09];
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
};

//* Create our express server application
const app = express();
const server = http.createServer(app);

//TODO::server application configrations
app.use(cors(corsOptions));
app.use(express.urlencoded());
app.use(express.json({ limit: "10mb" }));

// TODO::set routes configration
app.use(authRoutes);
app.use(productRoutes);
app.use(paymentRoutes);
app.use(deliveryRoutes);
app.use(notificationRoutes);

// * Push Dummy data for real-time user tracing his delivery
setInterval(() => {
  try {
    const io = require("./socket").getIO();
    start = [start[0] + 0.001, start[1] + 0.001];
    io.emit("deliveryMoves", {
      action: "delivery man is moved",
      content: { postion: start },
    });
  } catch (err) {
    console.log(consoleColors.red, "error", err);
  }
}, 500);

//TODO::Start Event-Loop
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    let server = app.listen(PORT, () => {
      console.log(
        consoleColors.cyan,
        "================================================================="
      );
      console.log(
        consoleColors.green,
        `Server connect with DB successfull and start listen on port ${PORT}`
      );
      console.log(
        consoleColors.cyan,
        "================================================================="
      );
    });
    let io = require("./socket");
    io = io.init(server);
    io.on("connection", (socket) => {
      console.log(consoleColors.cyan, "Client Connected Successfully");
    });
  })
  .catch((err) => {
    console.log(consoleColors.red, "Error in DB Connection::", err);
  });
