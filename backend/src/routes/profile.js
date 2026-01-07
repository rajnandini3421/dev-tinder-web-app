const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.json({
      data: user,
      message: "Profile fetched successfully",
    });
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
});

module.exports = profileRouter;
