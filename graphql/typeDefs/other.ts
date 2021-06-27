import { gql } from "apollo-server-micro";

export const otherTypeDefs = gql`
  type StatesUS {
    id: String!
    name: String!
    classification: String!
    division_id: String!
    url: String!
  }

  extend type Query {
    statesUS: [StatesUS!]
  }
`;
