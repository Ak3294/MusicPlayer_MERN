const jwt = require("jsonwebtoken");

exports.getToken = (user) => {
  const token = jwt.sign(
    {
      identifier: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
    },
    "secret", // Replace "secret" with your actual secret key
    { expiresIn: '1h' } // Optional: token expiration
  );
  return token;
};
