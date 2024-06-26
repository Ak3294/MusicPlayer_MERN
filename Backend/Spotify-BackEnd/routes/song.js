const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post(
  "/create",
  passport.authenticate("jwt"),
  { session: false },
  async (req, res) => {
    // req.user gets the user because of passport.authenticae

    const { name, thumbnail, track } = req.body;
    if (!name || !thumbnail || !track) {
      return res
        .status(301)
        .json({ err: "Insufficient details to create song" });
    }

    const artist = req.user._id;
    const songDetails = { name, thumbnail, track, artist };
    const createdSong = await Song.create(songDetails);
    return res.status(200).json(createdSong);
  }
);

// get route to get all songs I have published
router.get(
  "/get/mysongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    //we need to get all the songs where artist id == currentUser._id
    const songs = await Song.find({ artist: req.user._id });
    return res.status(200).json({ data: songs });
  }
);

// Get route to get all the songs any artist has published
// I will send the artist id  and I want to see all songs that artist has published.

router.get(
  "/get/artist",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { artistId } = req.body;
    // we can check if the artist does not exist
    const artist = await User.find({ _id: artistId });
    if (!artist) {
      return res.status(301).json({ err: "Artist does not exist" });
    }
    const songs = await Song.find({ artist: artistId });
    return res.status(200).json({ data: songs });
  }
);

// Get route to get single song by name
router.get(
  "/get/songname",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { songName } = req.body;
    // name :songName --> exact name matching , Vanila,Vaniila
    // Pattern Matching inseted of direct name matching. I will the this feature in future
    const songs = await Song.find({ name: songName });
    return res.status(200).json({ data: songs });
  }
);
module.exports = router;
