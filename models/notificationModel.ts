import { model, Schema, models } from "mongoose";
import INotification from "./interfaces/notification";

const notificationSchema: Schema = new Schema({
  message: {
    type: String,
    required: false,
  },
  creationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  notificationType: {
    type: String,
    required: false,
  },
  notificationId: {
    type: String,
    required: false,
  },
  contentOwner: { type: String, required: true },
  read: { type: Boolean, required: false },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export default models.Notification ||
  model<INotification>("Notification", notificationSchema);
