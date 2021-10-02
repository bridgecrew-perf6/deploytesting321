import RolesSchema from "../../models/roleModel";
import { ResolverMap } from "_components/index";
import roleInterface from "models/interfaces/roleInterface";

export const rolesResolver: ResolverMap = {
  Query: {
    allRoles: async (parent, args, context) => {
      try {
        const roles = await RolesSchema.find();
        return roles;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },

  Mutation: {
    deleteAllRoles: async (parent, { status }, ctx) => {
      const { isAuth, req, res, dataLoaders } = ctx;
      const { auth, id } = isAuth;
      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }
      try {
        console.log("Deleting all roles");
        await RolesSchema.deleteMany({ status: status });
        return "delete all data";
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    activateRole: async (parent, { roleName }, ctx) => {
      const { isAuth, req, res, dataLoaders } = ctx;
      const { auth, id } = isAuth;
      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }
      try {
        console.log("Selected Role => ", roleName);
        console.log("From activate");
        const role = await RolesSchema.findOneAndUpdate(
          { name: roleName },
          {
            $set: {
              status: true,
            },
          }
        );
        return role;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    disableRole: async (parent, { roleName }, ctx) => {
      const { isAuth, req, res, dataLoaders } = ctx;
      const { auth, id } = isAuth;
      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }
      try {
        console.log("Selected Role => ", roleName);
        console.log("From Deactivate");

        const role = await RolesSchema.findOneAndUpdate(
          { name: roleName },
          {
            $set: {
              status: false,
            },
          }
        );
        return role;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    createNewRole: async (
      parent,
      { name, description, status, privilages },
      context
    ) => {
      try {
        let existingRole: roleInterface;
        existingRole = await RolesSchema.findOne({
          name: name,
        });
        if (existingRole) {
          throw new Error("Role with this name already exist");
        }
        let lowerCase = name.toLowerCase();
        const newRole: roleInterface = new RolesSchema({
          name: lowerCase,
          description: description,
          status: status,
          privilages: privilages,
        });
        const role = await newRole.save();
        return role;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    updateRolePrivilages: async (parent, { roleName, privilages }, context) => {
      try {
        const updatedRole = await RolesSchema.findOneAndUpdate(
          { name: roleName },
          {
            $set: {
              privilages: privilages,
            },
          }
        );
        console.log(updatedRole);
        return updatedRole;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};
