import { model, models, Schema } from "mongoose";
import IAnswer from "./interfaces/answer";

const answerSchema: Schema = new Schema({
  answer: {
    type: String,
    required: true,
  },
  poll: {
    type: Schema.Types.ObjectId,
    ref: "Poll",
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  answerImages: [
    {
      type: String,
    },
  ],
  creationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  likes: [
    {
      userId: {
        type: String,
      },
      like: {
        type: Boolean,
      },
    },
  ],
  dislikes: [
    {
      userId: {
        type: String,
      },
      dislike: {
        type: Boolean,
      },
    },
  ],
  rank: {
    type: String,
    default: "Not Ranked",
  },
});

export default models.Answer || model<IAnswer>("Answer", answerSchema);
