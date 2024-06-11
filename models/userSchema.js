const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is requires"],
  },
  email: {
    type: String,
    required: [true, "email is requires"],
  },
  password: {
    type: String,
    required: [true, "password is requires"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
  notification: {
    type: Array,
    default: [],
  },
  seennotification: {
    type: Array,
    default: [],
  },
});
const userSchema = mongoose.model("user", Schema);
module.exports = userSchema;
