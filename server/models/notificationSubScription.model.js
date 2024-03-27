const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSubScriptionSchema = new Schema({
  endpoint: {
    type: String,
    required: true,
  },
  expirationTime: String,
  keys: {
    p256dh: String,
    auth: String,
  },
});

module.exports = mongoose.model("SubScription", notificationSubScriptionSchema);
