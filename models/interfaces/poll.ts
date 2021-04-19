import { Document } from "mongoose";
import IUser from "./user";

interface MongoDoc extends Document {
  _doc: any;
}

export default interface IPoll extends MongoDoc {
  _id: string;
  question: string;
  topic: string;
  subTopics: string[];
  pollImages: string[];
  creator: string;
  creationDate: Date;
}
