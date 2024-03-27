const consoleColors = require("../constants/console.colors");
const Subscription = require("../models/notificationSubScription.model");

module.exports.createSubscription = (req, res, next) => {
  let subscription = new Subscription(req.body);
  subscription
    .save()
    .then(() => {
      return res.status(201).json({
        ok: true,
        message: "Subscription created successfully.",
      });
    })
    .catch((err) => {
      console.log(consoleColors.red, "Error in sign up::", err);
    });
};


