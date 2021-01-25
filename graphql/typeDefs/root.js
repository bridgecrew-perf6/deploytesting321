const { gql } = require("apollo-server-micro");

module.exports = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;


