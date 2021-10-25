import { Response } from "express-serve-static-core";
import mongoose from "mongoose";
import configs from "../endpoints.config";

const connectDb = (handler: any) => async (req: Request, res: Response) => {
  let isDev =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? true
      : false;

  const { DEV_DB_URL, PROD_DB_URL } = process.env;

  const localDB = "mongodb://localhost:27017/poldit";

  const dbUri = isDev ? (localDB as string) : (PROD_DB_URL as string);
  // const dbUri = isDev ? (DEV_DB_URL as string) : (PROD_DB_URL as string);

  if (mongoose.connections[0].readyState !== 1) {
    try {
      await mongoose.connect(dbUri, configs.MONGO_OPTIONS);
    } catch (err: any) {
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
