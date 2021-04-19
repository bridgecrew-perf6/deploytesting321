import { Response } from "express-serve-static-core";
import mongoose from "mongoose";
import configs from "../endpoints.config";

const connectDb = (handler: any) => async (req: Request, res: Response) => {

  if (mongoose.connections[0].readyState !== 1) {
    try {
      await mongoose.connect(configs.DbUri, configs.MONGO_OPTIONS);
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  }

  return handler(req, res);
};

const db = mongoose.connection;
db.once("open", () => {
  console.log("MongoDB connected.");
});

export default connectDb;
