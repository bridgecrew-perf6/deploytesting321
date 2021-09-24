import {
  getAppTokens,
  clearAppCookie,
  transformUser,
  transformPoll,
  decodeJWToken,
  transformInternalUser,
} from "./shared";
import InternalUsers from "../../models/internalUsersModel";
import bcrypt from "bcryptjs";
import batchLoaders from "../loaders/dataLoaders";
import { ResolverMap } from "_components/index";
import IinternalUsers from "models/interfaces/internalUser";
import { confirmationEmail } from "../utils/confirmationEmail";
const { batchAnswers, batchPolls } = batchLoaders;

export const internalUsersResolver: ResolverMap = {
  Query: {
    internalUsers: async (parent, args, context) => {
      try {
        const internaluser = InternalUsers.find().select(
          "_id email fullName accessRole jobTitle isActive"
        );
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
          .select("_id email fullName accessRole jobTitle isActive");
        return internaluser;
      } catch (error: any) {
        throw new Error(error);
      }
    },

    getInternalUser: async (parent, { userId }, context) => {
      const { isAuth, req, res, dataLoaders } = context;
      const { auth, id } = isAuth;
      const user = await InternalUsers.findOne({ _id: userId });
      if (user) {
        const userData = transformInternalUser(user, dataLoaders(["poll"]));
        userData.isAppUser = id === String(user._id);
        return userData;
      }
    },
  },

  Mutation: {
    createNewInternalUser: async (parent, { formInputs }, context) => {
      try {
        const formObj = JSON.parse(formInputs);
        let existingUser: IinternalUsers;
        existingUser = await InternalUsers.findOne({ email: formObj.email });
        if (existingUser) {
          throw new Error("User with this email already exist");
        }
        await confirmationEmail(formObj.email, formObj.email);
        const hashPW = await bcrypt.hash(formObj.email, 12);
        const internaluser: IinternalUsers = new InternalUsers({
          ...formObj,
          password: hashPW,
        });
        const saveInternalUserResult = await internaluser.save();
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
        let updateUser = await InternalUsers.findByIdAndUpdate(
          { _id: formObj.id },
          {
            ...formObj,
          },
          { new: true, upsert: true }
        );

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
