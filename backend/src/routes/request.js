const express = require("express");
const connectionRequest = require("../models/connectionRequest");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    const fromUserId = req.user._id;
    const { toUserId, status } = req.params;

    const connection = new connectionRequest({
      fromUserId: fromUserId,
      toUserId: toUserId,
      status: status,
    });

    try {
      const existingRequest = await connectionRequest.findOne({
        $or: [
          { fromUserId: fromUserId, toUserId: toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      const istoUserExist = await User.findById(toUserId);
      if (existingRequest) {
        throw new Error("Error: Cannot send duplicate connection request");
      } else if (!istoUserExist) {
        throw new Error(
          "Error: The user you are trying to connect to does not exist"
        );
      } else if (fromUserId.toString() === toUserId) {
        throw new Error("Error: Cannot send connection request to yourself");
      } else if (!["interested", "ignored"].includes(status)) {
        throw new Error("Error: Invalid status value");
      }

      const savedRequest = await connection.save();
      res.json({
        success: true,
        message: "Connection request created successfully!",
        data: savedRequest,
      });
    } catch (err) {
      res.status(400).send("Error in creating connection request" + err);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    const { status, requestId } = req.params;

    try {
      let request = await connectionRequest.findOne({
        _id: requestId,
        toUserId: req.user._id,
        status: "interested",
      });
      console.log("Reviewing request:", status);
      if (!["accepted", "rejected"].includes(status)) {
        throw new Error("Request Status is not valid");
      } else if (!request) {
        throw new Error("Request is not valid");
      }

      request.status = status; // Update status
      const data = await request.save(); // Save the updated request

      res.json({
        success: true,
        message: "Requested " + status,
        data: data,
      });
    } catch (err) {
      res.send("Error in reviewing connection request" + err);
    }
  }
);

module.exports = requestRouter;
