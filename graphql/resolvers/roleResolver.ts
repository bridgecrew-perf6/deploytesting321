import RolesSchema from "../../models/roleModel";
import { ResolverMap } from "_components/index";
import roleInterface from "models/interfaces/roleInterface";

export const rolesResolver: ResolverMap = {
  Query: {
    allRoles: async (parent, args, context) => {
      try {
        const roles = await RolesSchema.find().populate("privileges");
        return roles;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    getARole: async (parent, { roleName }, context) => {
      try {
        const role = await RolesSchema.findOne({ role: roleName }).populate(
          "privileges"
        );
        return role;
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
        await RolesSchema.remove({});
        return "delete all data";
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    deleteARole: async (parent, { roleId }, ctx) => {
      const { isAuth, req, res, dataLoaders } = ctx;
      const { auth, id } = isAuth;
      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }
      try {
        await RolesSchema.findByIdAndDelete(roleId);
        return "Role Deleted";
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
      try {
        let existingRole;
        existingRole = await RolesSchema.findOne({
          role: role,
        });
        if (existingRole) {
          throw new Error("Role with this name already exist");
        }
        let lowerCase = role.toLowerCase();
        const newRole: roleInterface = new RolesSchema({
          role: lowerCase,
          description: description,
          status: status,
          privileges: privileges,
        });
        const roleCreated = await newRole
          .save()
          .then((r) => r.populate("privileges").execPopulate());
        return roleCreated;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    updateRolePrivilages: async (parent, { roleName, privileges }, context) => {
      try {
        const updatedRole = await RolesSchema.findOneAndUpdate(
          { role: roleName },
          {
            $set: {
              privileges: privileges,
            },
          }
        ).populate("privileges");
        return updatedRole;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};
