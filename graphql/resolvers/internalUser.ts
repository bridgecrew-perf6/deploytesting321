import { transformInternalUser } from "./shared";
import InternalUsers from "../../models/internalUsersModel";
import bcrypt from "bcryptjs";
import { ResolverMap } from "_components/index";
import IinternalUsers from "models/interfaces/internalUser";
import { confirmationEmail } from "../utils/confirmationEmail";

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
          accessRole: formObj.accessRole._id,
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

    deletAllInternalUsers: async (parent, { roleId }, ctx) => {
      const { isAuth, req, res, dataLoaders } = ctx;
      const { auth, id } = isAuth;
      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }
      try {
        await InternalUsers.remove({});
        //  const u = await InternalUsers.updateMany(
        //    {
        //      $set: {
        //        accessRole: "roleId,
        //      },
        //    }
        //  );

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
