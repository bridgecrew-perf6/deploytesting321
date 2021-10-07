import { gql } from "apollo-server-micro";

export const internalUserTypeDefs = gql`
  type InternalUser {
    _id: ID!
    fullName: String!
    email: String!
    accessRole: Role
    isActive: Boolean!
    password: String!
    jobTitle: String!
  }

  type Role {
    _id: ID!
    role: String!
    description: String
    status: String!
    privileges: [Privilege]
  }

  extend type Query {
    internalUsers: [InternalUser]!
    internalUsersWithPagination(offset: Int, limit: Int): [InternalUser!]
    getInternalUser(userId: String!): InternalUser!
    allRoles: [Role]!
  }

  extend type Mutation {
    activateRole(roleName: String!): Role!
    disableRole(roleName: String!): Role!
    createNewRole(
      role: String!
      description: String!
      status: String!
      privileges: [String]
    ): Role!
    deleteAllRoles: String!
    updateRolePrivilages(roleName: String!, privileges: [String]): Role!
    createNewInternalUser(formInputs: String!): InternalUser!
    deletAllInternalUsers: String!
    updateInternalUser(formInputs: String!): InternalUser!
    updateActiveUsersToDisable(userId: String!): InternalUser!
    updateDisableUsersToActive(userId: String!): InternalUser!
  }
`;
