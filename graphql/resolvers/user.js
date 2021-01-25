import User from "../../models/UserModel";
import { parse } from "cookie";
import jwt from "jsonwebtoken";
import { getAppTokens, clearAppCookie } from "./shared";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const {
  JWT_KEY,
  REFRESH_KEY,
  REFRESH_TOKEN_EXPIRES,
  JWT_TOKEN_EXPIRES,
} = process.env;

module.exports = {
  Query: {
    users: async (_, __, ctx) => {
      try {
        const users = await User.find({});
        return users;
      } catch (error) {
        throw new Error(error);
      }
    },
    logout: async (_, __, ctx) => {
      const { req, res } = ctx;

      if (req.headers.cookie) {
        clearAppCookie(res);
        return "User is logged out!";
      }
      return "Not logged in";
    },
    getUserData: async (_, __, ctx) => {
      const { isAuth, req, res } = ctx;
      const { auth, id } = isAuth;

      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }

      const { _doc } = await User.findById(id);
      const { password, __v, _id, ...data } = _doc;

      const appToken = getAppTokens(id, res);
      
      // console.log(req.headers.cookie)
      // const appToken = getAppTokens(id, res);

      // if (req.headers.cookie) {
      //   // clearAppCookie(req.headers.cookie, res);
      //   const appToken = getAppTokens(id, res);
      //   // console.log(appToken)
      // }

      return JSON.stringify({ ...data });
    },
  },
  Mutation: {
    login: async (_, { credentials }, ctx) => {
      const { cookie } = ctx.res;
      const { email, password } = JSON.parse(credentials);

      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User does not exist. Please register");
      }

      const pwMatch = await bcrypt.compare(password, user.password);

      if (!pwMatch) {
        throw new Error("Password is incorrect");
      }

      const appToken = getAppTokens(user.id, ctx.res);
      // const { refreshToken, options } = appCookie;

      // cookie("poldIt-Session", refreshToken, options); //Store refresh token cookie on browser

      return appToken;
    },
    // refreshUserToken: async (_, { userId }, { req }) => {
    //   console.log(req.headers.cookie);
    //   // const { refreshToken } = req.cookies;
    //   // console.log(req.cookies);
    //   // if (!refreshToken) throw new Error("No refresh token provided");
    //   // const user = await User.findById(userId);
    //   // if (!user) throw new Error("Invalid user");
    //   // // REFRESH TOKEN VALIDATION
    //   // let isRefreshTokenValid = false;
    //   // const { hash, expiry } = JSON.parse(user.refreshToken);
    //   // const isMatch = bcrypt.compareSync(refreshToken, hash);
    //   // const isValid = expiry > Date.now();
    //   // if (isMatch && isValid) {
    //   //   isRefreshTokenValid = true;
    //   // }
    //   // if (!isRefreshTokenValid) throw new Error("Invalid refresh token");
    //   // // ISSUING OF NEW REFRESH TOKEN
    //   // const newRefreshToken = uuidv4();
    //   // const newRefreshTokenExpiry = new Date(
    //   //   Date.now() + parseInt(REFRESH_TOKEN_EXPIRES) * 1000
    //   // );
    //   // setCookies.push({
    //   //   name: "refreshToken",
    //   //   value: newRefreshToken,
    //   //   options: {
    //   //     ...REFRESH_TOKEN_COOKIE_OPTIONS,
    //   //     expires: newRefreshTokenExpiry,
    //   //   },
    //   // });
    //   // const salt = await bcrypt.genSalt(10);
    //   // const refreshTokenHash = await bcrypt.hash(refreshToken, salt);
    //   // user.refreshToken = JSON.stringify({
    //   //   hash: refreshTokenHash,
    //   //   expiry: refreshTokenExpiry,
    //   // });
    //   // await user.save();
    //   // const token = await jwt.sign({ id: user.id }, JWT_KEY, {
    //   //   expiresIn: `${JWT_TOKEN_EXPIRES}min`,
    //   // });
    //   // return { userId: user.id, token };
    // },
  },
};
