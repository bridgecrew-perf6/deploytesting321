import { Document } from "mongoose";

interface MongoDoc extends Document {
  _doc: any;
}

export default interface IAnswer extends MongoDoc {
  _id: string;
  answer: string;
  poll: string;
  comments: string[];
  answerImages: string[];
  creator: string;
  creationDate: Date;
  likes: { userId: string; like: boolean }[];
  dislikes: { userId: string; dislike: boolean}[];
}
