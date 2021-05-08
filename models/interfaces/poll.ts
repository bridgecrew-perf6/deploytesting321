import { Document } from "mongoose";

interface MongoDoc extends Document {
  _doc: any;
}

export default interface IPoll extends MongoDoc {
  _id: string;
  question: string;
  topic: string;
  subTopics: string[];
  pollImages: string[];
  answers: string[];
  creator: string;
  creationDate: Date;
}
