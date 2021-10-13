import {
  clearAppCookieForInternalUser,
  getAppTokens,
  getAppTokensForInternalUser,
  transformInternalUser,
} from "./shared";
import InternalUsers from "../../models/internalUsersModel";
import bcrypt from "bcryptjs";
import { ResolverMap } from "_components/index";
import IinternalUsers from "models/interfaces/internalUser";
import { confirmationEmail } from "../utils/confirmationEmail";
import batchLoaders from "../loaders/dataLoaders";
import { generateRandomPasswrod } from "graphql/utils/passwordGenerator";
import { sendResetPasswordMail } from "graphql/utils/resetPassEmail";

const { batchInternalUsers } = batchLoaders;

export const internalUsersResolver: ResolverMap = {
  Query: {
    internalUsers: async (parent, args, context) => {
      try {
        const internaluser = InternalUsers.find()
          .select("_id email fullName accessRole jobTitle isActive")
          .populate({
            path: "accessRole",
            populate: [
              {
                path: "privileges",
                model: "PrivilegesSchema",
              },
            ],
          });
        return internaluser;
      } catch (error: any) {
        throw new Error(error);
      }
    },

    internalUsersWithPagination: async (parent, { offset, limit }, context) => {
      try {
        const total = InternalUsers.countDocuments({});
        const internaluser = InternalUsers.find()
          .limit(limit)
          .skip(offset)
          .select("_id email fullName accessRole jobTitle isActive")
          .populate({
            path: "accessRole",
            populate: [
              {
                path: "privileges",
                model: "PrivilegesSchema",
              },
            ],
          });
        return internaluser;
      } catch (error: any) {
        throw new Error(error);
      }
    },

    getInternalUser: async (parent, { userId }, context) => {
      const { isAuth, req, res, dataLoaders } = context;
      const { auth, id } = isAuth;
      const user = await InternalUsers.findOne({ _id: userId }).populate({
        path: "accessRole",
        populate: [
          {
            path: "privileges",
            model: "PrivilegesSchema",
          },
        ],
      });
      if (user) {
        const userData = transformInternalUser(user, dataLoaders(["poll"]));
        userData.isAppUser = id === String(user._id);
        return userData;
      }
    },
    internalUserLogout: async (parent, { email, password }, context) => {
      const { req, res } = context;

      if (req?.headers?.cookie) {
        clearAppCookieForInternalUser(res);
        return "User is logged out!";
      }
      return "Not logged in";
    },
  },

  Mutation: {
    internalUserLogin: async (parent, { email, password }, context) => {
      const { isAuth, req, res, dataLoaders } = context;
      const { auth, id } = isAuth;
      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }
      const iUser = await InternalUsers.findOne({ email: email }).populate({
        path: "accessRole",
        populate: [
          {
            path: "privileges",
            model: "PrivilegesSchema",
          },
        ],
      });
      console.log(iUser);
      if (!iUser) throw new Error("User not found");

      console.log("Internal user => ", iUser);
      // Check existing password
      const isPasswordCorrect = await bcrypt.compare(password, iUser.password);
      console.log("Password => ", isPasswordCorrect);

      if (!isPasswordCorrect) throw new Error("Password not Correct");

      console.log(iUser.id);
      const appToken = getAppTokensForInternalUser(
        iUser.id,
        iUser.accessRole?._id,
        context.res
      );
      console.log(appToken);
      return appToken;
    },

    createNewInternalUser: async (parent, { formInputs }, context) => {
      try {
        const formObj = JSON.parse(formInputs);
        let existingUser: IinternalUsers;
        existingUser = await InternalUsers.findOne({ email: formObj.email });
        if (existingUser) {
          throw new Error("User with this email already exist");
        }
        const pass = generateRandomPasswrod();

        const hashPW = await bcrypt.hash(pass, 12);
        const internaluser: IinternalUsers = new InternalUsers({
          ...formObj,
          accessRole: formObj.accessRole._id,
          password: hashPW,
        });
        const saveInternalUserResult = await internaluser.save();
        try {
          console.log("new user => ", saveInternalUserResult);
          const appToken = getAppTokens(saveInternalUserResult.id, context.res);
          console.log("App token is => ", appToken);
          sendResetPasswordMail(saveInternalUserResult.email, appToken);
        } catch (error: any) {
          throw new Error("Count not send email");
        }

        return {
          ...saveInternalUserResult._doc,
          _id: saveInternalUserResult.id,
        };
      } catch (error: any) {
        throw new Error(error);
      }
    },

    updateInternalUser: async (parent, { formInputs }, ctx) => {
      const { isAuth, req, res, dataLoaders } = ctx;
      const formObj = JSON.parse(formInputs);
      const { auth, id } = isAuth;
      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }
      try {
        const updatedUser = await InternalUsers.findByIdAndUpdate(
          { _id: formObj.id },
          {
            ...formObj,
            accessRole: formObj.accessRole._id,
          },
          { new: true, upsert: true }
        );
        return updatedUser;
      } catch (error: any) {
        throw new Error(error);
      }
    },

    deleteOneInternalUser: async (parent, { userEmail }, ctx) => {
      const { isAuth, req, res, dataLoaders } = ctx;
      const { auth, id } = isAuth;
      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }
      try {
        console.log(userEmail);
        await InternalUsers.findOneAndDelete({ email: userEmail });
        return "User deleted";
      } catch (error: any) {
        throw new Error(error);
      }
    },

    changeInternalUserPassword: async (
      parent,
      { userId, newPassword },
      ctx
    ) => {
      const { isAuth, req, res, dataLoaders } = ctx;
      const { auth, id } = isAuth;
      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }
      try {
        const updatedPass = await bcrypt.hash(newPassword, 12);
        const u: any = await InternalUsers.findById(userId);
        // Check existing password
        // const isPasswordCorrect = await bcrypt.compare(newPassword, u.password);
        const updatedPassword = await InternalUsers.findByIdAndUpdate(userId, {
          $set: {
            password: updatedPass,
          },
        });
        return updatedPassword;
      } catch (error: any) {
        throw new Error(error);
      }
    },

    deletAllInternalUsers: async (parent, { roleId }, ctx) => {
      const { isAuth, req, res, dataLoaders } = ctx;
      const { auth, id } = isAuth;
      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }
      try {
        await InternalUsers.remove({});
        return "User updated";
      } catch (error: any) {
        throw new Error(error);
      }
    },

    updateDisableUsersToActive: async (parent, { userId }, ctx) => {
      const { isAuth, req, res, dataLoaders } = ctx;
      const { auth, id } = isAuth;
      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }

      try {
        const u = await InternalUsers.findOneAndUpdate(
          { _id: userId },
          {
            $set: {
              isActive: "true",
            },
          }
        );
        return u._id;
      } catch (error: any) {
        throw new Error(error);
      }
    },

    updateActiveUsersToDisable: async (parent, { userId }, ctx) => {
      const { isAuth, req, res, dataLoaders } = ctx;
      const { auth, id } = isAuth;
      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }

      try {
        const u = await InternalUsers.findOneAndUpdate(
          { _id: userId },
          {
            $set: {
              isActive: "false",
            },
          }
        );
        return u._id;
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },
};
