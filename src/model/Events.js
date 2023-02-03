const mongoose = require("mongoose");
const otp = new mongoose.Schema(
  {
    image: String,
    title: String,
    booked: Number,
  },
  { timestamps: true }
);

module.exports = new mongoose.model("event", otp);
