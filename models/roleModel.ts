import { model, Schema, models } from "mongoose";
import RoleInterface from "./interfaces/roleInterface";

const RolesSchema: Schema = new Schema({
  role: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  privileges: [
    {
      type: Schema.Types.ObjectId,
      ref: "PrivilegesSchema",
    },
  ],
});

export default models.RolesSchema ||
  model<RoleInterface>("RolesSchema", RolesSchema);
