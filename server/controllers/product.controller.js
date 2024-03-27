const consoleColors = require("../constants/console.colors");
const Product = require("../models/Product.model");
const Subscription = require("../models/notificationSubScription.model");
const webPush = require("web-push");

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
    .then(() => {
      return Subscription.find({});
    })
    .then((Subscriptions) => {
      // push notification.
      let privateKey = process.env.WEB_PUSH_Priate_Key;
      let publicKey = process.env.WEB_PUSH_Public_Key;
      let subject = "mailto:sallamrady99@gmail.com";
      webPush.setVapidDetails(subject, publicKey, privateKey);
      for (let i = 0; i < Subscriptions.length; i++) {
        const element = Subscriptions[i];
        let msgBody = JSON.stringify({
          title: "New Product Added",
          content: "New Product Added Successfully",
        });
        webPush.sendNotification(element, msgBody);
      }
    })
    .catch((err) => {
      console.log("Error in create product::", err);
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
      console.log("Error in create product::", err);
      return res.status(500).json({
        ok: false,
        message: "Error in create product",
        Error: err,
      });
    });
};
