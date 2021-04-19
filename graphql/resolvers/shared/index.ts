import jwt from "jsonwebtoken";
import DataLoader from "dataloader";
// import { parse } from "cookie";
import { dateToString } from "../../../components/globalFuncs";
import configs from "../../../endpoints.config";
import { CookieOptions } from "../../../components/appTypes/appType";
import { Response } from "express";
import IPoll from "../../../models/interfaces/poll";
import IUser from "../../../models/interfaces/user";
import ITopic from "../../../models/interfaces/topic";
import ISubTopic from "../../../models/interfaces/subTopic";
import Iimage from "../../../models/interfaces/image";

const { JwtKey, RefreshTokenExpires, JwtExpires, RefreshKey } = configs;

const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * parseInt(RefreshTokenExpires);

const REFRESH_TOKEN_COOKIE_OPTIONS: CookieOptions = {
  // domain: process.env.BASE_URL.split("//")[1].split(":")[0],
  httpOnly: true,
  // secure: true,
  path: "/",
  maxAge: REFRESH_TOKEN_MAX_AGE,
  // sameSite: "none",
  // secure: !!process.env.BASE_URL.includes("https"),
};

const generateAccessToken = (id: string) => {
  return jwt.sign({ id }, JwtKey, { expiresIn: `${JwtExpires}min` });
};

const generateRefreshToken = (id: string) => {
  const tokenExpiry = new Date(Date.now() + REFRESH_TOKEN_MAX_AGE);

  const refreshToken = jwt.sign({ id }, RefreshKey, {
    expiresIn: `${RefreshTokenExpires}d`,
  });

  return {
    refreshToken,
    expiry: tokenExpiry,
    options: REFRESH_TOKEN_COOKIE_OPTIONS,
  };
};

const getLoader = (dataLoaderList: any[]) => {
  const loaderObj: { [key: string]: any } = {};

  dataLoaderList.forEach((loader) => {
    loaderObj[loader.loaderType] = loader.loader;
  });

  return loaderObj;
};

export const transformUser = (user: IUser, loaders: any[]) => {
  const { password, ...rest } = user._doc;

  const { poll, image } = getLoader(loaders);

  return {
    ...rest,
    registerDate: dateToString(rest.registerDate),
    pollHistory: () => poll.loadMany(rest.pollHistory),
    imgHistory: () => image.loadMany(rest.imgHistory),
  };
};

export const transformImg = (image: Iimage, loaders: any[]) => {
  const { creator } = getLoader(loaders);

  return {
    ...image._doc,
    _id: image._id,
    creationDate: dateToString(image.creationDate),
    creator: () => creator.load(image.creator),
  };
};

export const transformPoll = (poll: IPoll, loaders: any[]) => {
  const { creator, topic, subTopic, image } = getLoader(loaders);

  return {
    ...poll._doc,
    _id: poll.id,
    creationDate: dateToString(poll.creationDate),
    creator: () => creator.load(poll.creator),
    topic: () => topic.load(poll.topic),
    subTopics: () => subTopic.loadMany(poll.subTopics),
    pollImages: () => image.loadMany(poll.pollImages),
  };
};

export const transformTopic = (topic: ITopic, loaders: any[]) => {
  const { creator, subTopic } = getLoader(loaders);

  return {
    ...topic._doc,
    _id: topic.id,
    creationDate: dateToString(topic.creationDate),
    creator: () => creator.load(topic.creator),
    subTopics: () => subTopic.loadMany(topic.subTopics),
  };
};

export const transformSubTopic = (subTopic: ISubTopic, loaders: any[]) => {
  const { creator, topic, poll } = getLoader(loaders);

  return {
    ...subTopic._doc,
    _id: subTopic.id,
    creationDate: dateToString(subTopic.creationDate),
    creator: () => creator.load(subTopic.creator),
    topic: () => topic.load(subTopic.topic),
    polls: () => poll.loadMany(subTopic.polls),
  };
};

export const getAppTokens = (id: string, res: Response) => {
  const accessToken = generateAccessToken(id);
  const appCookie = generateRefreshToken(id);
  const { refreshToken, options } = appCookie;

  res.cookie("poldIt-Session", refreshToken, options); //Store refresh token cookie on browser

  return accessToken;
};

export const clearAppCookie = (res: Response) => {
  //Clear current cookie from browser
  res.cookie("poldIt-Session", "", {
    ...REFRESH_TOKEN_COOKIE_OPTIONS,
    maxAge: -1,
  });
};
