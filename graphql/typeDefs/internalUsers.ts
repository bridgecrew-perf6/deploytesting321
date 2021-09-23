import { gql } from "apollo-server-micro";

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

  extend type Query {
    internalUsers: [InternalUser]!
    getInternalUser(userId: String!): InternalUser!
  }

  extend type Mutation {
    createNewInternalUser(formInputs: String!): InternalUser!
    updateInternalUser(formInputs: String!): String!
    updateActiveUsersToDisable(userId: String!): InternalUser!
    updateDisableUsersToActive(userId: String!): InternalUser!
  }
`;
