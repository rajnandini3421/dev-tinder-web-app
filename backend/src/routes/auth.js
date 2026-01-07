const User = require("../models/user");
const bcrypt = require("bcrypt");
const express = require("express");
const authRouter = express.Router();
// const jwt = require("jsonwebtoken");

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  let encryptedPassword = await bcrypt.hash(password, 10);
  let user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: encryptedPassword,
  });
  try {
    await user.save();
    res.send("User Signed Up Successfully!");
  } catch (err) {
    res.status(400).send("Error in signing up user" + err);
  }
});

authRouter.post("/login", async (req, res) => {
  console.log("Login request body:", req.body);
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user && (await user.validatePassword(password))) {
      const token = await user.getJWT(); // user is instance of User Model lineNO:44 offload token generation to schema method
      res.cookie("token", token, { httpOnly: true }); // Set token in HTTP-only cookie (for production, set secure: true and https)
      // res.send("User Logged In Successfully!");
      res.json({
        data: user,
        message: "User Logged In Successfully!",
      });
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    res.status(500).send("Error in logging in user" + err);
  }
});

authRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({
    success: true,
    message: "User Logged Out Successfully!",
  });
});

module.exports = authRouter;
