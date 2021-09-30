import { model, Schema, models } from "mongoose";
import RoleInterface from "./interfaces/roleInterface";

const RolesSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  status: {
    type: Boolean,
    required: true,
  },
  privilages: {
    type: [
      {
        type: String,
        enum: [
          "Create a poll",
          "Delete a poll",
          "Edit a poll",
          "Hide a poll",
          "Closing a poll",
          "Manage users",
          "Create new topic",
          "Create a subtopic",
          "Approve new subtopics",
          "Delete new subtopics",
          "Edit user access",
          "Delete users",
          "Delete photos",
          "Edit photos",
          "Add internal users",
          "Edit internal users",
          "Delete internal users",
          "Flag polls",
          "Add answers",
          "Edit answers",
          "Hide answers",
          "Delete answers",
          "Like",
          "Dislike",
          "Hide chat message",
          "Delete chat message",
          "Add internal permission types",
          "Edit internal permissions",
          "Delete internal permissions",
          "Add internal roles",
          "Edit internal roles",
          "Delete internal roles",
          "Create settings",
          "Edit settings",
          "Delete settings",
        ],
      },
    ],
  },
});

export default models.RolesSchema ||
  model<RoleInterface>("RolesSchema", RolesSchema);
