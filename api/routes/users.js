require("dotenv").config();
var express = require("express");
var router = express.Router();
const UserShema = require("../models/User");
const User = require("../controllers/users");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
var passport = require("passport");

// register
router.post("/register", function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, msg: "Please pass username and password." });
  } else {
    var newUser = new UserShema({
      username: req.body.username,
      password: req.body.password
    });
    // save the user
    User.createUser(newUser, function(err, user) {
      if (err) {
        res.status(400).send("Unable to save User to database");
      } else {
        res.send(user).end();
      }
    });
  }
});

// login
router.post("/login", passport.authenticate("local"), function(req, res) {
  res.send(req.user);
});

// Endpoint to get current user
router.get('/user', function(req, res){
  res.send(req.user);
});


// Endpoint to logout
router.get('/logout', function(req, res){
  req.logout();
  res.send(null)
});

getToken = function(headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
