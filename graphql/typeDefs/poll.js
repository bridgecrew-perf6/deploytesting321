const { gql } = require("apollo-server-micro");

module.exports = gql`
  type PollQuestion {
    _id: ID!
    question: String
    topic: String
    subtopic: String
    creator: User!
    creationDate: String!
  }

  extend type Query {
    polls: [PollQuestion!]
  }
  
  extend type Mutation {
    createPoll(details: String!): PollQuestion
  }
`;
