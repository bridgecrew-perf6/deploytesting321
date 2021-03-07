import { model, models, Schema } from "mongoose";
import IPoll from "./interfaces/poll";

const pollSchema: Schema = new Schema({
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

export default  models.Poll || model<IPoll>("Poll", pollSchema);
// module.exports = models.Poll || model("Poll", pollSchema);
