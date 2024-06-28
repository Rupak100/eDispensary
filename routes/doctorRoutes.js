const express = require("express");
const authMiddlewire = require("../middlewires/authMiddlewire");
const {
  getDoctorInfoController,
  docInfoController,
  getTheDoctor,
  getDocAppointments,
  acceptAppointment,
  deleteAppointment,
} = require("../controllers/doctorController");
const routes = express.Router();

//GET SINGLE DOC INFO

routes.post("/getDoctorInfo", authMiddlewire, getDoctorInfoController);

routes.post("/docInfoChange", authMiddlewire, docInfoController);

//GET DOCTOR
routes.post("/doctorInfo", authMiddlewire, getTheDoctor);
routes.get("/doctor-appointments", authMiddlewire, getDocAppointments);
routes.post("/update-status", authMiddlewire, acceptAppointment);
routes.delete("/delete-appointment", authMiddlewire, deleteAppointment);

module.exports = routes;
