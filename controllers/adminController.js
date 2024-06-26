const doctorModel = require("../models/doctorSchema");

const userModel = require("../models/userSchema");

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "users data",
      data: users,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: `Error while fetching users`,
      error,
    });
  }
};
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "Doctors data",
      data: doctors,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: `Error while fetching doctors`,
      error,
    });
  }
};

const doctorRequestController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });

    const user = await userModel.findOne({ _id: doctor.userId });
    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated",
      message: `Your doctor account request updated form pending to ${status}`,
      onClickPath: "/notification",
    });
    user.isDoctor = status === "approved" ? true : false;
    await user.save();

    res.status(201).send({
      success: true,
      message: "Doctor admitted successfully",
      data: doctor,
    });
  } catch (error) {
    // console.log(error);
    // console.log(doctor);
    res.status(500).send({
      success: false,
      messsage: "Error while approving doctor",
      error,
    });
  }
};
module.exports = {
  getAllDoctorsController,
  getAllUsersController,
  doctorRequestController,
};
