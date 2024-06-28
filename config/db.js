const mongoose = require("mongoose");
const colors = require("colors");

const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoDB connected at ${mongoose.connection.host}`.bgRed.white);
  } catch (error) {
    console.log(`MongoDB server issue ${error}`.bgGreen.white);
  }
};
module.exports = connectionDB;
