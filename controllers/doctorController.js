const appointmentModel = require("../models/appointmentModel");
const doctorSchema = require("../models/doctorSchema");
const userSchema = require("../models/userSchema");

const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorSchema.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "doctor data fetch success",
      data: doctor,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching Doctor Details",
    });
  }
};

const docInfoController = async (req, res) => {
  try {
    const doctor = await doctorSchema.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Doctor info updated successfully",
      data: doctor,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: `Failed to update the info of doctor`,
      error,
    });
  }
};
const getTheDoctor = async (req, res) => {
  try {
    const doctor = await doctorSchema.findById({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "Doctor details fetched successfully",
      data: doctor,
    });
  } catch (error) {
    // console.log(error);
    message.status(500).send({
      success: false,
      message: "Error in fetching doctor data",
      error,
    });
  }
};

const getDocAppointments = async (req, res) => {
  try {
    const doctor = await doctorSchema.findOne({ userId: req.body.userId });
    const appointment = await appointmentModel.find({ doctorId: doctor._id });
    res.status(200).send({
      success: true,
      message: `Doctor appointments fetched successfully`,
      data: appointment,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in fetching doctor appointments",
    });
  }
};
const acceptAppointment = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { status }
    );
    const user = await userSchema.findById({ _id: appointment.userId });
    const notification = user.notification;
    notification.push({
      type: "Appointment request approved ",
      message: `Your appointment request is ${status}`,
      onClickPath: "/appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: `Approved Successfully`,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in the accepting handler",
    });
  }
};
module.exports = {
  getDoctorInfoController,
  docInfoController,
  getTheDoctor,
  getDocAppointments,
  acceptAppointment,
};
