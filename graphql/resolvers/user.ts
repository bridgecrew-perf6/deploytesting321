import User from "../../models/UserModel";
import { getAppTokens, clearAppCookie, transformUser } from "./shared";
import bcrypt from "bcryptjs";
import { ResolverMap } from "../../components/appTypes/appType";

export const userResolvers: ResolverMap = {
  Query: {
    users: async (parent, args, {pollLoader}) => {
      try {
        const users = await User.find();
        const userData = users.map((user) => transformUser(user, pollLoader));
        return userData;
      } catch (error) {
        throw new Error(error);
      }
    },
    logout: async (parent, args, context) => {
      const { req, res } = context;

      if (req?.headers?.cookie) {
        clearAppCookie(res);
        return "User is logged out!";
      }
      return "Not logged in";
    },
    getUserData: async (parent, args, context) => {
      const { isAuth, req, res, pollLoader } = context;
      const { auth, id } = isAuth;

      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }

      const user = await User.findById("5fdc039057df07dfde3d8f57"); //Fix this, this is hardcoded

      if (user) {
        const userData = transformUser(user, pollLoader);
        const appToken = getAppTokens(userData._id, res);
        return { appToken, user: userData };
      }
    },
  },
  Mutation: {
    login: async (parent, { credentials }, context) => {
      const { email, password } = JSON.parse(credentials);

      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User does not exist. Please register");
      }

      if (user.password) {
        const pwMatch = await bcrypt.compare(password, user.password);

        if (!pwMatch) {
          throw new Error("Password is incorrect");
        }

        const appToken = getAppTokens(user.id, context.res);

        return appToken;
      }
    },
  },
};
