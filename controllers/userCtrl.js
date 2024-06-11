// const { hash } = require("bcryptjs");
const userModel = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorSchema");
const appointmentModel = require("../models/appointmentModel");
const moment = require("moment");
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({ message: `Invalid user`, success: false });
    }
    const comPass = await bcrypt.compare(req.body.password, user.password);
    if (!comPass) {
      return res
        .status(200)
        .send({ message: `Invalid Email or Password`, success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_WEBTOKEN, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: `Login Successful`, success: true, token });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      message: `Error in login controller ${error.message}`,
      success: false,
    });
  }
};

const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({
        message: "User already exist",
        success: false,
      });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    req.body.password = hashPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({
      message: `User successfully registered`,
      success: true,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: `Something went wrong ${error}`,
    });
  }
};
const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      res.status(200).send({
        message: "User not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      message: "Auth failed",
      success: false,
      error,
    });
  }
};

const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for doctor role`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor applied Application success",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: `Error while applying Doctor`,
    });
  }
};

// notification Controller
const allnotificationController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification);
    user.notification = [];
    user.seennotification = notification;
    const updateUser = await user.save();
    res.status(200).send({
      success: true,
      message: `all notification marked as read`,
      data: updateUser,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      message: `Error in notification`,
      success: false,
      error,
    });
  }
};
//delete all notification controller
const allnotificationDeleteController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.notification = [];
    user.seennotification = [];
    const updateUser = await user.save();
    updateUser.password = undefined;
    res.status(200).send({
      success: true,
      message: `Notification deleted successfully`,
      data: updateUser,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      message: `Error in delete notification`,
      success: false,
      error,
    });
  }
};
// GET ALL DOC
const getAllDoctorCtrl = async (req, res) => {
  try {
    const doctor = await doctorModel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "Successfully get all doctors",
      data: doctor,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to get the details of all doctors",
      error,
    });
  }
};

//BOOK APPOINTMENTS
const BookAppointmentCtrl = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toDate();
    req.body.time = moment(req.body.time, "HH:mm").toDate();
    req.body.status = "pending";
    const newAppointments = new appointmentModel(req.body);
    await newAppointments.save();
    const user = await userModel.findOne({
      _id: req.body.doctorInfo.userId,
    });
    user.notification.push({
      type: "new appointment request",
      message: `A new appointment request from ${req.body.userInfo.name}`,
      onClickPath: "/user/appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: `Appointment Booked successfully`,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Failed to book appointment",
    });
  }
};

const CheckAvailability = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toDate();
    const startTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toDate();
    const endTime = moment(req.body.time, "HH:mm").add(1, "hours").toDate();

    const doctorId = req.body.doctorId;

    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: startTime,
        $lte: endTime,
      },
      status: "approved",
    });

    if (appointments.length > 0) {
      return res.status(200).send({
        success: false,
        message: "Appointments are not available at this time.",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointment is available to book.",
      });
    }
  } catch (error) {
    console.error("Error checking availability:", error);
    res.status(500).send({
      success: false,
      error,
      message: "Failed to check availability.",
    });
  }
};

const getAppointment = async (req, res) => {
  try {
    const appointment = await appointmentModel.find({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: `Details fetched successfully`,
      data: appointment,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in fetching appointment details",
    });
  }
};

module.exports = {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  allnotificationController,
  allnotificationDeleteController,
  getAllDoctorCtrl,
  BookAppointmentCtrl,
  CheckAvailability,
  getAppointment,
};
