const mongoose = require("mongoose");

const docSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "useId is requires"],
    },
    firstName: {
      type: String,
      required: [true, "firstName is requires"],
    },
    lastName: {
      type: String,
      required: [true, "lastName is requires"],
    },
    phone: {
      type: Number,
      required: [true, "phone no is requires"],
    },
    email: {
      type: String,
      required: [true, "Email ID is requires"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    specialization: {
      type: String,
      required: [true, "Specialization is required"],
    },
    experience: {
      type: String,
      required: [true, "Number is required"],
    },
    feesperConsultation: {
      type: Number,
      required: [true, "Fees is required is required"],
    },
    status: {
      type: String,
      default: "pending",
    },
    timings: {
      type: Object,
      required: [true, "Timing  is required is required"],
    },
  },
  { timestamps: true }
);
const doctorSchema = mongoose.model("doctors", docSchema);
module.exports = doctorSchema;
