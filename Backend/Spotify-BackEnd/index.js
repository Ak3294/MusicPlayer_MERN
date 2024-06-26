const express = require("express");
require("dotenv").config();
const passport = require("passport");
const mongoose = require("mongoose");
const app = express();
const port = 8080;
const authRouter = require("./routes/auth");
const songRoutes = require('./routes/song');
const playlistRoutes = require('./routes/playlist');


app.use(express.json());
app.use(passport.initialize());

// Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://music_player:${process.env.MONGO_PASSWORD}@cluster0.wvy58v4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

// Setup Passport JWT
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("./models/User");

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.identifier);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

// Routes
app.use("/auth", authRouter);
app.use('/song',songRoutes)
app.use('/playlist',playlistRoutes)

app.get("/", (req, res) => {
  res.send("Hello World!");
});



// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
