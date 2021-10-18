import { privilages } from "_components/index";
import { model, Schema, models } from "mongoose";
import PrivilegesInterface from "./interfaces/privilegesInterface";

const PrivilegesSchema: Schema = new Schema({
  privilegeName: {
    type: String,
    unique: true,
    required: true,
  },
  privilegeStatus: {
    type: Boolean,
    required: true,
  },
});

export default models.PrivilegesSchema ||
  model<PrivilegesInterface>("PrivilegesSchema", PrivilegesSchema);