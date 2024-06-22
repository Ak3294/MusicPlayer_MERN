const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helper");

// This Post route will help to register va user
router.post("/register", async (req, res) => {
  //This code is run when the /register api is called as a POST request
  // My req.body will be of the format {email, password, firsName, lastname, userName, }

  const { email, password, firstName, lastName, userName } = req.body;

  // Step-2 : Does the userName exists with the email already, If yes then we throw an error

  const User = await User.findOne({ email: email });

  if (user) {
    // status code is by default is 200 when dont mention res.status
    return res.status(403).json({ msg: "User with this Email already exists" });
  }

  // This is Valid request
  // Step-3 : Create a new User in the DB
  // Step-3.1 : We do not store password in plaintext
  // ---> We convert plaintext password into hash.
  const hashedPassword = bcrypt.hash(password, 10);
  const newUserData = {
    email,
    password: hashedPassword,
    firstName,
    lastName,
    userName,
  };
  const newUser = await User.create(newUserData);

  //Step-4 : we want to create a Token to return to user

  const token = await getToken(email, newUser);

  // Step-5 : return the result
  const userToReturn = { ...newUser.toJSON(), token };
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});
