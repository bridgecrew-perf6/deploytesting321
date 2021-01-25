const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: false,
  },
  lastname: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  address1: {
    type: String,
    required: false,
  },
  address2: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  zipcode: {
    type: String,
    required: false,
  },
  registerDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
