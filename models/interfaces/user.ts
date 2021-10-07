import { Document } from "mongoose";

interface MongoDoc extends Document {
  _doc: any;
}

interface Favorites {
  _id?: string;
  favoriteType: string;
  favoriteId: string;
}

interface pollTime {
  _id: string;
  hours: number;
  minutes: number;
  seconds: number;
  pollCount: number;
}

export default interface IUser extends MongoDoc {
  email: string;
  appid: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  address1?: string;
  address2?: string;
  bio?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  profilePic?: string;
  useragreementagreed: boolean;
  following?: { appId: string; profilePic: string | undefined }[];
  registerDate: Date;
  pollHistory: string[];
  imgHistory: string[];
  favorites: Favorites[];
  timeOnSite?: {
    hour: number;
    minutes: number;
    seconds: number;
  };
  timeSpentOnPoll?: pollTime[];
}
