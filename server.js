const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectionDB = require("./config/db");
const path = require("path");
const cors = require("cors");

// rest object
const app = express();

//middlewires
app.use(express.json());
app.use(morgan("dev"));
require("dotenv").config();

//mongodb connection
connectionDB();

//cors
app.use(
  cors({
    origin: "https://edispensary.netlify.app", // Replace with your Netlify domain
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

//routes
app.use("/api/v1/user", require("./routes/userRouter"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

//static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
//listen port
const port = process.env.PORT || 8080;
app.listen(port, () => {
  // console.log(port);
});
