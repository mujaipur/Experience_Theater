const { sendMailFroBookings } = require("../middleware/nodemailer");
const Bookings = require("../model/Bookings");
const Events = require("../model/Events");
const Notification = require("../model/Notification");

const getNotifications = async (req, res) => {
  try {
    let limit = 100;
    let page = 0;
    if (req.query.limit) {
      limit = req.query.limit;
    }
    if (req.query.page) {
      page = +req.query.page - 1;
    }

    const data = await Notification.find(req.query)
      .skip(page * limit)
      .limit(limit);

    if (data.length == 0) {
      res.status(200).send({ success: true, message: "data not found" });
    } else {
      res.status(200).send({ success: true, data });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
const updateNotification = async (req, res) => {
  try {
    const { id, status } = req.body;
    if (!id) {
      res.status(200).send({
        success: false,
        message: "Notification id (id) is required",
      });
      return null;
    }
    if (!status) {
      res.status(200).send({
        success: false,
        message: "Status (status) is required. [true,false]",
      });
      return null;
    }
    const data = await Notification.findOneAndUpdate(
      { _id: id },
      {
        status,
      },
      { new: true }
    );
    if (!data) {
      res.status(200).send({ success: true, message: "data not found" });
    } else {
      res.status(200).send({ success: true, data });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const postEvent = async (req, res, next) => {
  const data = await Events.create(req.body);
  res.status(200).send({
    success: true,
    message: "Created",
    data,
  });
};
const getEvents = async (req, res, next) => {
  const data = await Events.find();
  res.status(200).send({
    success: true,
    message: "Fetched",
    data,
  });
};
const getBooking = async (req, res, next) => {
  const data = await Bookings.find(req.query);
  res.status(200).send({
    success: true,
    message: "Fetched",
    data,
  });
};

const makeBooking = async (req, res, next) => {
  console.log(req.body, "<<<thisisbooking");

  const data = await Bookings.create(req.body);
  const data2 = await Events.findOne({ _id: req.body.event });
  const changeTo = +data2.booked + 1;

  const data3 = await Events.findByIdAndUpdate(
    req.body.event,
    {
      booked: changeTo,
    },
    { new: true }
  );
  console.log(data3._doc);
  const bookingDetails = {
    slot: data.slot,
    bookingId: data3._doc._id,
    email: req.body.email,
  };
  sendMailFroBookings(bookingDetails, (res) => {
    console.log(res);
  });
  res.status(200).send({
    success: true,
    data: { ...data._doc, slot: data.slot },
    message: "Slot booked",
  });
};
module.exports = {
  postEvent,
  getEvents,
  getNotifications,
  updateNotification,
  makeBooking,
  getBooking,
};
