const mongoose = require('mongoose');

// How to Create a Model
//1. install mongoose
//2. Create a mongoose schema(structure of the user)

const user = new mongoose.Schema({
    firstname:{
        type:String,
        require:true,
    },
    lastname:{
        type:String,
        require:false,
    },
    email:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        require:true,
    },
});

const UserModel = mongoose.model("User",User);
module.exports = UserModel;