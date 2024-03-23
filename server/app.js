const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const paymentRoutes = require("./routes/payment.routes");
const consoleColors = require("./constants/console.colors");

//* define and declare helper varables
const PORT = process.env.PORT | 5000;

//* Create our express server application
const app = express();

//TODO::server application configrations
app.use(express.urlencoded());
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// TODO::set routes configration
app.use(authRoutes);
app.use(productRoutes);
app.use(paymentRoutes);

//TODO::Start Event-Loop
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
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
  })
  .catch((err) => {
    console.log(consoleColors.red, "Error in DB Connection::", err);
  });
