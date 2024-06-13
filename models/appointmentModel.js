const mongoose = require("mongoose");
const appointSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    doctorInfo: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phone: { type: Number, required: true },
      specialization: { type: String, required: true },
      feesperConsultation: { type: Number, required: true },
      timings: { type: [String], required: true },
    },
    userInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

const appointmentModel = mongoose.model("Appointment", appointSchema);
module.exports = appointmentModel;
