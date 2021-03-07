import { Document } from "mongoose";

interface MongoDoc extends Document {
  _doc: any;
}


export default interface IUser extends MongoDoc {
  email: string;
  appid: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  profilePic?: string;
  registerDate: Date;
  pollHistory: string[];
}
