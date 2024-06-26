const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helper");

// This POST route will help to register a user
router.post("/register", async (req, res) => {
  try {
    // Extracting fields from request body
    const { email, password, firstName, lastName, userName } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // User with this email already exists
      return res
        .status(403)
        .json({ msg: "User with this email already exists" });
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      userName,
    });

    await newUser.save(); // Saving new user to the database

    // Generating token
    const token = getToken(newUser);

    // Constructing user data to return, excluding password
    const userToReturn = { ...newUser.toObject(), token };
    delete userToReturn.password;

    // Returning the result
    return res.status(200).json(userToReturn);
  } catch (error) {
    // Error handling
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  //Step-1: Get email and password sent by user from req.body
  const { email, password } = req.body;

  //Step-2: Check if a user with the given email exists. if not the credentials are Invalid.
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(403).json({ msg: "Invalid Credentials " });
  }

  //Step-3:If the user exists, check if the password is correct, If not the credentials are Invlaid.
  // This is Tricky step , why? because we have stored the original password in a hash, we know that we cannot convert the hash to plaintext. so compare the hash to hash.

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(403).json({ msg: "Invalid Credentials" });
  }
  // Step-4: if the credentials are correct, return a token to the user.

  const token = await getToken(user.email, user);
  const userToReturn = { ...newUser.toObject(), token };
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

module.exports = router;
