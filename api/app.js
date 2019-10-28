const express = require("express");
const app = express();
const users = require("./routes/users");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

const User = require("./controllers/users");

const path = __dirname + "/views/";
const port = process.env.PORT || 4000;
const LocalStrategy = require("passport-local").Strategy;

// Passport init
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LocalStrategy(function(username, password, done) {
    User.getUserByUsername(username, function(err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, { message: "Unknown User" });
      }
      User.comparePassword(password, user.password, function(err, isMatch) {
        if (err) console.log("ERROR: \n", err);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Invalid password" });
        }
      });
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

app.set("view engine", "html");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path));
app.use("/auth", users);

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express Session
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
  })
);

app.listen(port, function() {
  console.log(`Example app listening on ${port}!`);
});
