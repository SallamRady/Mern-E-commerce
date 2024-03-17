const router = require("express").Router();
const productController = require("../controllers/product.controller");

router.post("/addProduct", productController.addProduct);

module.exports = router;
