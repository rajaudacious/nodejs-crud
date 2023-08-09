const jwt = require("jsonwebtoken");
const SECRET_KEY = "superSecretKey";
const generateTokens = (user) => {
  return jwt.sign(
    {
      data: user,
    },SECRET_KEY,
    {
      expiresIn: 300,
    }
  );
};
module.exports = {
generateTokens
}