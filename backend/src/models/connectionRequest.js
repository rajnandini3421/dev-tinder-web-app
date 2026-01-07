const mongoose = require("mongoose");
const { validate } = require("./user");

const { Schema } = mongoose;
const connectionRequestSchema = new Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: {
        values: ["interested", "ignored", "pending", "accepted", "rejected"],
        message: "{VALUE} is not valid status",
      },
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.index({ fromUserId: 1 });

//create compund request index
//connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });
module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
