const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const consoleColors = require("../constants/console.colors");

module.exports.signUp = (req, res, next) => {
  //TODO::check there is no user with this email.
  User.findOne({ email: req.body.email })
    .then((_doc) => {
      //* check if email is already exist?
      if (_doc) {
        //* yes exist
        return res.status(409).json({
          ok: false,
          message: "This e-mail is already exist",
        });
      }
      //* no email is not exist
      bcrypt
        .hash(req.body.password, 12)
        .then((hashedPassword) => {
          let { firstName, lastName, email, image } = req.body;
          let password = hashedPassword;
          let user = new User({ firstName, lastName, email, password, image });
          return user.save();
        })
        .then(() => {
          return res.status(201).json({
            ok: true,
            message: "user created successfully :)",
          });
        });
    })
    .catch((err) => {
      console.log(consoleColors.red, "Error in sign up::", err);
    });
};

module.exports.signIn = (req, res, next) => {
  //TODO::check there is no user with this email.
  User.findOne({ email: req.body.email })
    .then((_doc) => {
      //* check if email is not already exist?
      if (!_doc) {
        //* yes not exist
        return res.status(404).json({
          ok: false,
          message: "Email is not registered",
        });
      }
      //* no email is exist
      bcrypt.compare(req.body.password, _doc.password).then((match) => {
        if (!match) {
          // *wrong password
          return res.status(401).json({
            ok: false,
            message: "Invalid email or password",
          });
        }
        //* correct email and password
        let token = jwt.sign(
          {
            id: _doc._id,
            email: _doc.email,
            image: _doc.image,
            firstName: _doc.firstName,
          },
          process.env.SECRET_JWT_KEY,
          {
            expiresIn: "2h",
          }
        );
        // * Accepted
        return res.status(202).json({
          ok: true,
          message: "login successfully",
          token,
        });
      });
    })
    .catch((err) => {
      console.log(consoleColors.red, "Error in sign in::", err);
    });
};
