const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Schema } = mongoose;

// Define the User schema
const userSchema = new Schema(
  {
    firstName: { type: String, required: true, MinLength: 5, MaxLength: 20 },
    lastName: { type: String, required: true },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Other"],
        message: "{VALUE} is not supported",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return validator.isEmail(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      //required: [true, "User phone number required"],
    },
    password: { type: String, required: true },
    skills: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

// Method to generate JWT token for the user
userSchema.methods.getJWT = async function () {
  const token = jwt.sign({ _id: this._id }, "secretkey", {
    expiresIn: "1h",
  });
  return token;
};

userSchema.methods.validatePassword = async function (password) {
  const isValidPassword = await bcrypt.compare(password, this.password);
  console.log("Is valid password inside schema method:", isValidPassword);
  return isValidPassword;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
