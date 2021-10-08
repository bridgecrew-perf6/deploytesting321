import { Document } from "mongoose";

interface MongoDoc extends Document {
  _doc: any;
}

export default interface INotification extends MongoDoc {
  _id: string;
  message: string;
  creationDate: Date;
  notificationType: string;
  notificationId: string;
  contentOwner: string;
  user: string;
  read: boolean;
}
