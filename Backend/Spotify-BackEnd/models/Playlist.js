const mongoose = require("mongoose");

// How to Create a Model
//1. install mongoose
//2. Create a mongoose schema(structure of the Playlist)

const Playlist = new mongoose.Schema({
  PlaylistName: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  songs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Song",
    },
  ],

  collaborators: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    // artist is also a user, so we will fetch the artist details through userid
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const PlaylistModel = mongoose.model("Playlist", Playlist);
module.exports = PlaylistModel;
