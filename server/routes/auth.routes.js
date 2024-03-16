const router = require("express").Router();

router.post("/signup", (req, res, next) => {
  console.log("Sign Up Say Hi Body::", req.body);
});

module.exports = router;
