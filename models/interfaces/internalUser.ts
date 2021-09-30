import { Document } from "mongoose";

interface MongoDoc extends Document {
  _doc: any;
}

export default interface IinternalUsers extends MongoDoc {
  email: string;
  fullName: string;
  jobTitle: string;
  accessRole: string;
  isActive: boolean;
  password: string;
}
