import { Document } from "mongoose";

interface MongoDoc extends Document {
  _doc: any;
}

export default interface RoleInterface extends MongoDoc {
  _id: string;
  name: string;
  description: string;
  status: Boolean;
  privilages?: [String];
}
