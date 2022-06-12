const mongoose = require("mongoose");
const validator = require("validator");

// creating a user schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      default: "",
      validate: (value) => validator.isEmail(value),
    },
    phoneNo: {
      type: Number,
      required: true,
      default: 0,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
