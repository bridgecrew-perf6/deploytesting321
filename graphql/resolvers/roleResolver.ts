import RolesSchema from "../../models/roleModel";
import { ResolverMap } from "_components/index";
import roleInterface from "models/interfaces/roleInterface";

export const rolesResolver: ResolverMap = {
  Query: {
    allRoles: async (parent, args, context) => {
      try {
        const roles = await RolesSchema.find().populate("privileges");
        console.log(roles);
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

        await RolesSchema.remove({});
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
          { role: roleName },
          {
            $set: {
              status: "Active",
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
          { role: roleName },
          {
            $set: {
              status: "Inactive",
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
      { role, description, status, privileges },
      context
    ) => {
      console.log("Creating role => ", role);
      try {
        let existingRole;
        existingRole = await RolesSchema.findOne({
          role: role,
        });
        if (existingRole) {
          throw new Error("Role with this name already exist");
        }
        let lowerCase = role.toLowerCase();
        console.log("Lowercase => ", lowerCase);
        console.log(privileges);
        const newRole: roleInterface = new RolesSchema({
          role: lowerCase,
          description: description,
          status: status,
          privileges: privileges,
        });
        console.log(newRole);
        const roleCreated = await newRole
          .save()
          .then((r) => r.populate("privileges").execPopulate());
        return roleCreated;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    updateRolePrivilages: async (parent, { roleName, privileges }, context) => {
      console.log(roleName, privileges);
      try {
        const updatedRole = await RolesSchema.findOneAndUpdate(
          { role: roleName },
          {
            $set: {
              privileges: privileges,
            },
          }
        ).populate("privileges");
        console.log(updatedRole);
        return updatedRole;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};
