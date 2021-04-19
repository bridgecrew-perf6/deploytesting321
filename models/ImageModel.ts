import { model, models, Schema } from "mongoose";
import Iimage from "./interfaces/image";

const imageSchema: Schema = new Schema({
  image: {
    type: String,
    required: true,
  },
  imgType: {
    type: String,
    required: true,
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

export default models.Image || model<Iimage>("Image", imageSchema);
