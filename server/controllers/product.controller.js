const consoleColors = require("../constants/console.colors");
const Product = require("../models/Product.model");

module.exports.addProduct = (req, res, next) => {
  //TODO::extract data from body
  let { name, category, images, price, description } = req.body;
  let product = new Product({ name, category, images, price, description });
  //TODO::save product in DB.
  product
    .save()
    .then(() => {
      return res.status(201).json({
        ok: true,
        message: "Product created successfully :)",
      });
    })
    .catch((err) => {
      console.log(consoleColors.red, "Error in create product::", err);
      return res.status(500).json({
        ok: false,
        message: "Error in create product",
        Error: err,
      });
    });
};

module.exports.getAllProducts = (req, res, next) => {
  Product.find({})
    .then((products) => {
      return res.status(200).json({
        ok: true,
        products,
        message: "Product created successfully :)",
      });
    })
    .catch((err) => {
      console.log(consoleColors.red, "Error in create product::", err);
      return res.status(500).json({
        ok: false,
        message: "Error in create product",
        Error: err,
      });
    });
};
