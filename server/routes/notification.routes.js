const router = require("express").Router();
const notificationController = require("../controllers/notification.controller");

router.post("/create-subscription", notificationController.createSubscription);

module.exports = router;
