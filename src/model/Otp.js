const mongoose = require("mongoose");
const otp = new mongoose.Schema(
  {
    emailId: {
      type: String,
      require: true,
    },
    otp: {
      type: String,
      require: true,
    },
    mobile: Number,
  },
  { timestamps: true }
);

module.exports = new mongoose.model("otp", otp);
