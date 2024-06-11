const express = require("express");

const {
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
} = require("../controllers/userCtrl");
const authMiddlewire = require("../middlewires/authMiddlewire");
const routes = express.Router();

//routes
// LOGIN POST
routes.post("/login", loginController);
//REGISTER POST
routes.post("/register", registerController);

//auth||POST
routes.post("/getUserData", authMiddlewire, authController);
//authDoctor||POST
routes.post("/apply-doctor", authMiddlewire, applyDoctorController);
//notification||POST
routes.post(
  "/all-notification-route",
  authMiddlewire,
  allnotificationController
);
routes.get("/getAllDocData", authMiddlewire, getAllDoctorCtrl);
//notification||POST
routes.post(
  "/delete-notification-route",
  authMiddlewire,
  allnotificationDeleteController
);
//Book Appointment
routes.post("/book-appointment", authMiddlewire, BookAppointmentCtrl);

routes.post("/check-availability", authMiddlewire, CheckAvailability);
routes.get("/get-appointment", authMiddlewire, getAppointment);
module.exports = routes;
