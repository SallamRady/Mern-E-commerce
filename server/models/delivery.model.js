const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deliverySchema = new mongoose.Schema({
  userId: String,
  coordinates: {
    lat: Number,
    lng: Number,
  },
  status: String,
});

module.exports = mongoose.model("Delivery", deliverySchema);
