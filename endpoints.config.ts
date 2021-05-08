import * as dotenv from "dotenv";

dotenv.config();

const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

export default {
  LocalHost: process.env.NEXT_PUBLIC_LOCAL_HOST ?? "",
  ApiHost: process.env.APOLLO_URI ?? "",
  BaseURL: process.env.BASE_URL ?? "",
  MongoDBPort: process.env.REACT_APP_MONGODBPORT ?? "",
  StatesAPIKey: process.env.REACT_APP_STATESAPIKEY ?? "",
  DbUri: process.env.DB_URL ?? "",
  JwtKey: process.env.JWT_KEY ?? "",
  RefreshKey: process.env.REFRESH_KEY ?? "",
  JwtExpires: process.env.JWT_TOKEN_EXPIRES ?? "",
  RefreshTokenExpires: process.env.REFRESH_TOKEN_EXPIRES ?? "",
  MONGO_OPTIONS,
  CloudinaryName: process.env.NEXT_PUBLIC_CLOUDINARYNAME ?? "",
  CloudinaryAPIKey: process.env.NEXT_PUBLIC_CLOUDINARYAPIKEY ?? "",
  CloudinaryAPISecret: process.env.CLOUDINARY_API_SECRET ?? "",
};
