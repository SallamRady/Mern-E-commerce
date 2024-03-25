const router = require("express").Router();
const deliveryController = require("../controllers/delivery.controller");

router.get("/move-points", deliveryController.movePoint);

module.exports = router;
