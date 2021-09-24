import { model, Schema, models } from "mongoose";
import IinternalUsers from "./interfaces/internalUser";

const internalUsersSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  accessRole: {
    type: String,
    enum: ["admin", "employee", "moderator"],
    default: "employee",
    message: "{VALUE} is not suppoeted",
  },
  isActive: {
    type: Boolean,
  },
});

export default models.InternalUsers ||
  model<IinternalUsers>("InternalUsers", internalUsersSchema);
