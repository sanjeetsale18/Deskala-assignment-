const mongoose = require("mongoose");

const canditateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: "", maxlength: 50 },
    address: { type: String, required: true, default: "" },
    dob: { type: Date, required: true, default: "" },
    state: { type: String, required: true, default: "" },
    age: { type: Number, required: true, default: 0, maxAge: 100, minAge: 0 },
    pincode: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const canditateModel = mongoose.model("canditate", canditateSchema);

module.exports = canditateModel;
