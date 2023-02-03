const express = require("express");
const router = express.Router();

const {
  UploadPost,
  getPosts,
  deletePost,
} = require("../controller/PostControl");
const multer = require("multer");
const {
  getNotifications,
  updateNotification,
} = require("../controller/NotificationControl");
const {
  postEvent,
  getEvents,
  makeBooking,
  getBooking,
} = require("../controller/EventControler");

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

router.post("/post", upload.none(), postEvent);
router.post("/booking", upload.none(), makeBooking);
router.get("/get", upload.none(), getEvents);
router.get("/getbooking", upload.none(), getBooking);
const NotificationRouter = router;
module.exports = NotificationRouter;
