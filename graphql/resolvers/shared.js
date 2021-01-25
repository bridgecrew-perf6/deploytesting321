import jwt from "jsonwebtoken";
import { parse } from "cookie";
// import { v4 as uuidv4 } from "uuid";
// import bcrypt from "bcryptjs";

const {
  JWT_KEY,
  REFRESH_TOKEN_EXPIRES,
  JWT_TOKEN_EXPIRES,
  REFRESH_KEY,
} = process.env;

const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * parseInt(REFRESH_TOKEN_EXPIRES);

const REFRESH_TOKEN_COOKIE_OPTIONS = {
  // domain: process.env.BASE_URL.split("//")[1].split(":")[0],
  httpOnly: true,
  // secure: true,
  path: "/",
  maxAge: REFRESH_TOKEN_MAX_AGE,
  // sameSite: "none",
  // secure: !!process.env.BASE_URL.includes("https"),
};

const generateAccessToken = (id) => {
  return jwt.sign({ id }, JWT_KEY, { expiresIn: `${JWT_TOKEN_EXPIRES}min` });
};

const generateRefreshToken = (id) => {
  const tokenExpiry = new Date(Date.now() + REFRESH_TOKEN_MAX_AGE);

  const refreshToken = jwt.sign({ id }, REFRESH_KEY, {
    expiresIn: `${REFRESH_TOKEN_EXPIRES}d`,
  });

  return {
    refreshToken,
    expiry: tokenExpiry,
    options: REFRESH_TOKEN_COOKIE_OPTIONS,
  };
};

module.exports = {
  getAppTokens: (id, res) => {
    const accessToken = generateAccessToken(id);
    const appCookie = generateRefreshToken(id);
    const { refreshToken, options } = appCookie;

    res.cookie("poldIt-Session", refreshToken, options); //Store refresh token cookie on browser

    return accessToken;
  },
  clearAppCookie: (res) => {
    //Clear current cookie from browser
    res.cookie("poldIt-Session", "", {
      ...REFRESH_TOKEN_COOKIE_OPTIONS,
      maxAge: -1,
    });
  },
};
