const express = require("express");
const router = express.Router();
const {
  createUser,
  createUser2,
  userLogin,
  getUserDetails,
  updateUserDetails,
  deleteUser,
  getUserDetails2,
} = require("../controller/CustomerControl");
const { SendOtp, verify, forgotPassword } = require("../controller/Otp");
const multer = require("multer");
const { userAuthentication, verifyAdminRole } = require("../middleware/auth");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1024,
  },
});
// const { verify } = ;

//importing module
// const userController=require('../controller/CustomerControl')

// app.get("/user/:userId", userAuthentication, getUserDetails);

module.exports = router;
