import { gql } from "apollo-server-micro";

export const pollTypeDefs = gql`
  type PollQuestion {
    _id: ID!
    question: String!
    topic: Topic!
    subTopics: [SubTopic]!
    creator: User!
    creationDate: String!
    pollImages: [Image]
  }

  extend type Query {
    polls: [PollQuestion!]
    poll(pollId: String!):PollQuestion

  }
  
  extend type Mutation {
    createPoll(details: String!): PollQuestion
  }
`;
