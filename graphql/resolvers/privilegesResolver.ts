import PrivilegesSchema from "../../models/provilegesModel";
import { ResolverMap } from "_components/index";
import PrivilegesInterface from "models/interfaces/privilegesInterface";
import RolesSchema from "../../models/roleModel";

export const privilegesResolver: ResolverMap = {
  Query: {
    allPrivileges: async (parent, args, context) => {
      try {
        const privileges = await PrivilegesSchema.find();
        return privileges;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },

  Mutation: {
    deleteAllPrivileges: async (parent, args, ctx) => {
      const { isAuth, req, res, dataLoaders } = ctx;
      const { auth, id } = isAuth;
      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }
      try {
        await PrivilegesSchema.remove({});
        return "delete all data";
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    createNewPrivilege: async (parent, { privilegeName }, context) => {
      try {
        let existingPrivilege;
        existingPrivilege = await PrivilegesSchema.findOne({
          privilegeName: privilegeName,
        });
        if (existingPrivilege) {
          throw new Error("Privilege with this name already exist");
        }
        const newPrivilege: PrivilegesInterface = new PrivilegesSchema({
          privilegeName: privilegeName,
          privilegeStatus: true,
        });
        const privilegeCreated = await newPrivilege.save();
        return privilegeCreated;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    updatePrivilege: async (
      parent,
      { privilegeId, privilegeName, privilegeStatus },
      context
    ) => {
      try {
        const updatedPrivilege = await PrivilegesSchema.findOneAndUpdate(
          { _id: privilegeId },
          {
            $set: {
              privilegeName: privilegeName,
              privilegeStatus: privilegeStatus,
            },
          }
        );
        return updatedPrivilege;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    deletePrivilege: async (parent, { _id }, context) => {
      try {
        await PrivilegesSchema.findOneAndDelete({
          _id: _id,
        });
        return "Privilege deleted";
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};
