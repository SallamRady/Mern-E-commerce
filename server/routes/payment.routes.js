const router = require("express").Router();
const PaymentController = require("../controllers/payment.controller");

router.post("/create-checkout-session", PaymentController.checkOut);

module.exports = router;
