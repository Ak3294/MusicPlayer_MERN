const mongoose = require('mongoose');

// How to Create a Model
//1. install mongoose
//2. Create a mongoose schema(structure of the Song)

const Song = new mongoose.Schema({
    songName:{
        type: String,
        required: true,
    },
    thumbnail:{
        type: String,
        required: true,
    },
    track:{
        type: String,
        required:true,
    },
    artist:{
        // artist is also a user, so we will fetch the artist details through userid
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const SongModel = mongoose.model("Song",Song);
module.exports = SongModel;