const express = require("express");
const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const userRoutes = express.Router();

userRoutes.get("/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const data = await connectionRequest
      .find({
        toUserId: loggedInUser._id,
        status: "interested",
      })
      .populate("fromUserId", "firstName lastName email skills");

    res.json({
      success: true,
      message: "Requests fetched successfully",
      data: data,
    });
  } catch (err) {
    res.send("Error in reviewing connection request" + err);
  }
});

userRoutes.get("/feed", userAuth, async (req, res) => {
  try {
    let loggedInUser = req.user;
    const page = parseInt(req.params.page) || 1;
    let limit = parseInt(req.params.limit) || 10;
    limit = limit > 50 ? 50 : limit; // Max limit is 50
    const skip = (page - 1) * limit;

    let data = await connectionRequest // get list of people to whom I want to exclude
      .find({
        $or: [
          {
            fromUserId: loggedInUser._id,
          },
          {
            toUserId: loggedInUser._id,
          },
        ],
      })
      .select("fromUserId  toUserId");

    const excludedUserIds = new Set();
    data.forEach((connection) => {
      excludedUserIds.add(connection.fromUserId.toString());
      excludedUserIds.add(connection.toUserId.toString());
    });
    excludedUserIds.add(loggedInUser._id.toString()); // Exclude self
    const finalData = await User.find({
      _id: { $nin: Array.from(excludedUserIds) },
    })
      .select("firstName lastName email skills")
      .skip(skip)
      .limit(limit);

    res.json({
      message: "Users feed fetched successfully",
      data: finalData,
    });
  } catch (error) {
    res.send("Error in getting users feed" + error);
  }
});

userRoutes.get("/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const data = await connectionRequest
      .find({
        $or: [
          { fromUserId: loggedInUser._id, status: "accepted" },
          { toUserId: loggedInUser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId toUserId", "firstName lastName email skills");

    res.json({
      success: true,
      message: "Connections fetched successfully",
      data: data,
    });
  } catch (err) {
    res.send("Error in fetching connections" + err);
  }
});

module.exports = userRoutes;
