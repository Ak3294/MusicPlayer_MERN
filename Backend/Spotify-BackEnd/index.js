const express = require("express");
require("dotenv").config();
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("./models/User");
const passport = require("passport");
const app = express();
const port = 8080;

//Connect Mongodb to out node app
const mongoose = require("mongoose");

//mongoose.connect() takes two arguments : 1. which db to connect(DB url)
//options for connections
mongoose
  .connect(
    "mongodb+srv://music_player:" +
      process.env.MONGO_PASSWORD +
      "@cluster0.wvy58v4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((x) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

//Setup Passport jwt

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
      // done(error, doesthe user exists)
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

// try to make an get type api
app.get("/", (req, res) => {
  //req contains all data for the request
  //res contains all data for the response
  res.send("Hello World!");
});

// Run on Server on Port 8000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
