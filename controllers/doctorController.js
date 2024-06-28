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
      { status },
      { new: true } // Return the updated appointment
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    const user = await userSchema.findById(appointment.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const notification = user.notification || [];
    notification.push({
      type: "Appointment request approved",
      message: `Your appointment request is ${status}`,
      onClickPath: "/appointments",
    });

    user.notification = notification;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Approved Successfully",
      appointment: appointment,
    });
  } catch (error) {
    console.error("Error in accepting handler:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error in the accepting handler",
    });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const appointmentId = req.body.appointmentId; // Assuming appointmentId is sent in the request body

    // Delete the appointment
    const deletedAppointment = await appointmentModel.findOneAndDelete({
      _id: appointmentId,
    });

    if (!deletedAppointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Respond with success message
    return res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
      deletedAppointment: deletedAppointment, // Optionally send back the deleted appointment
    });
  } catch (error) {
    console.error("Error in deleting appointment:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error in deleting appointment",
    });
  }
};

module.exports = {
  getDoctorInfoController,
  docInfoController,
  getTheDoctor,
  getDocAppointments,
  acceptAppointment,
  deleteAppointment,
};
