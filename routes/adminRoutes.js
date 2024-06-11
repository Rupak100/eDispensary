const express = require("express");
const authMiddlewire = require("../middlewires/authMiddlewire");
const {
  getAllDoctorsController,
  getAllUsersController,
  doctorRequestController,
} = require("../controllers/adminController");
const router = express.Router();
//GET||METHOD
router.get("/getAllUsers", authMiddlewire, getAllUsersController);
router.get("/getAllDoctors", authMiddlewire, getAllDoctorsController);

//POST||METHOD
router.post("/doctorRequestApprove", authMiddlewire, doctorRequestController);
module.exports = router;
