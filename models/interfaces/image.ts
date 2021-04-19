import { Document } from "mongoose";

interface MongoDoc extends Document {
  _doc: any;
}

export default interface Iimage extends MongoDoc {
  _id: string;
  imgType: string;
  image: string;
  creator: string;
  creationDate: Date;
}