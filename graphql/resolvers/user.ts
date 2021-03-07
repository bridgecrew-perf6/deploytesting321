import User from "../../models/UserModel";
import { getAppTokens, clearAppCookie, transformUser } from "./shared";
import bcrypt from "bcryptjs";
import { ResolverMap } from "../../components/appTypes/appType";
import IUser from "../../models/interfaces/user";
import { dateToString } from "../../components/globalFuncs";

export const userResolvers: ResolverMap = {
  Query: {
    users: async (parent, args, { pollLoader }) => {
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

      const user = await User.findById(id);

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
    createNewUser: async (parent, { formInputs }, context) => {
      const formObj = JSON.parse(formInputs);
      let existingUser: IUser;

      try {
        existingUser = await User.findOne({ email: formObj.email });

        if (existingUser) {
          throw new Error("Email already exists! Please log in.");
        }

        const hashedPW = await bcrypt.hash(formObj.password, 12);

        const user: IUser = new User({
          ...formObj,
          password: hashedPW,
        });

        const userSaveResult = await user.save();
        console.log(userSaveResult);

        return {
          ...userSaveResult._doc,
          id: userSaveResult.id,
          password: null,
          registerDate: dateToString(userSaveResult._doc.registerDate),
        };
      } catch (err) {
        throw err;
      }
    },
  },
};
