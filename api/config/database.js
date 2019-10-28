const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

let databaseConnection = "Waiting for Database response...";

router.get("/", (req, res, next) => res.send(databaseConnection));

// DB URL
//      atlas
// const DB_URL = 'mongodb+srv://admin:admin@cluster0-xq4gy.mongodb.net/main?retryWrites=true&w=majority'
//      docker
const DB_URL = "mongodb://localhost/users";

const options = {
  connectTimeoutMS: 10000,
  reconnectInterval: 500,
  reconnectTries: Number.MAX_VALUE,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose
  .connect(DB_URL, options)
  .then(function() {
    console.log("MongoDB is connected");
  })
  .catch(function(err) {
    console.log(err);
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

// const MONGO_USERNAME = 'sammy';
// const MONGO_PASSWORD = 'password';
// const MONGO_HOSTNAME = '127.0.0.1';
// const MONGO_PORT = '27017';
// const MONGO_DB = 'sharkinfo';

// const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

// mongoose.connect(url, {useNewUrlParser: true});
