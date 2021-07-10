import { model, models, Schema } from "mongoose";
import IChat from "./interfaces/chat";

const chatSchema: Schema = new Schema({
  message: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  poll: {
    type: Schema.Types.ObjectId,
    ref: "Poll",
  },
  chatImages: [
    {
      type: String,
    },
  ],
  isAnswer: {
    type: Boolean,
    required: true,
  },
  creationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default models.Chat || model<IChat>("Chat", chatSchema);
