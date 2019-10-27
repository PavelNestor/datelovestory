const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

let databaseConnection = "Waiting for Database response...";

router.get("/", (req, res, next) => res.send(databaseConnection));

mongoose.connect("mongodb+srv://admin:admin@cluster0-xq4gy.mongodb.net/main?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

mongoose.connection.on("error", error => {
  console.log("Database connection error:", error);
  databaseConnection = "Error connecting to Database";
});

mongoose.connection.once("open", () => {
  console.log("Connected to Database!");
  databaseConnection = "Connected to Database";
});

module.exports = router;
