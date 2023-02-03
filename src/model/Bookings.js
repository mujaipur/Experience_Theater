const mongoose = require("mongoose");
const otp = new mongoose.Schema(
  {
    name: String,
    email: String,
    number: Number,
    slot: Number,
    date: String,
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event",
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("bookings", otp);
