import { gql } from "apollo-server-micro";

const privilages = [];

export const internalUserTypeDefs = gql`
  type InternalUser {
    _id: ID!
    fullName: String!
    email: String!
    accessRole: String!
    isActive: Boolean!
    password: String!
    jobTitle: String!
  }

  type Role {
    _id: ID!
    name: String!
    description: String
    status: Boolean!
    privilages: [String]
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
      name: String!
      description: String!
      status: Boolean!
      privilages: [String]
    ): Role!
    deleteAllRoles(status: Boolean!): String!
    updateRolePrivilages(roleName: String!, privilages: [String]!): Role!
    createNewInternalUser(formInputs: String!): InternalUser!
    updateInternalUser(formInputs: String!): String!
    updateActiveUsersToDisable(userId: String!): InternalUser!
    updateDisableUsersToActive(userId: String!): InternalUser!
  }
`;
