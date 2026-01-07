const jwt = require("jsonwebtoken");
const User = require("../models/user");

//Get token from cookies
//verify token
//get user data from token
//attach user to req object

const userAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("Please Login!");
  }
  const decoded = jwt.verify(token, "secretkey");
  const user = await User.findById(decoded._id);
  req.user = user;
  next();
};

module.exports = { userAuth };
