const express = require("express");
const router = express.Router();
const passport = require("passport");

// Route-1 : Create a Playlist
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const { name, thumbnail, songs } = req.body;

    if (!name || !thumbnail || !songs) {
      return res.status(400).json({ error: "Insufficient Data" });
    }
    const playlistData = {
      name,
      thumbnail,
      songs,
      owner: currentUser._id,
      collaborators: [],
    };
    const playlist = await Playlist.create(playlist);
    return res.status(200).json(playlist);
  }
);

// Route-2 : Get a Playlist by ID
// We will get playlist ID as route parameter and return playlist having

// If we are doing /playlist/get/:playlistId (focus on the :) that means that playlistId is now a variable to which we can assign any value
// If you call anything of the fomat /playlist/get/anything_type_here
// If you call this /playlist/get/sfdfgs, the playlistId variable get sassigned the value.
router.get(
  "/get/:playlistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // This concept is callled req.params in which we have not to send the get request in the req.body
    const playlistId = req.params.playlistId;

    // I need to find a playlist with the _id = playlistId
    const playlist = await playlist.findOne({ _id: playlistId });
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }
  }
);
