import { Document } from "mongoose";

interface MongoDoc extends Document {
  _doc: any;
}

export default interface IinternalUsers extends MongoDoc {
  email: string;
  fullName: string;
  jobTitle: string;
  accessRole: { admin: String; employee: String; moderator: String };
  isActive: boolean;
  password: string;
}
