const { gql } = require("apollo-server-micro");

module.exports = gql`
  type User {
    id: ID!
    firstname: String
    lastname: String
    email: String!
    password: String
    address1: String
    address2: String
    city: String
    state: String
    zipCode: String
  }

  extend type Query {
    users: [User]!
    getUserData: String!
    logout: String
  }
  

  extend type Mutation {
    login(credentials: String!): String!
    refreshUserToken(userId: ID!): String!
  }
`;
