const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pollSchema = new Schema({
  question: {
    type: String,
    required: true,
    unique: true,
  },
  topic: {
    type: String,
    required: true,
  },
  subtopic: {
    type: String,
    required: false,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  creationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.models.Poll || mongoose.model("Poll", pollSchema);
