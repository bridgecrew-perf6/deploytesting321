import { gql } from "apollo-server-micro";

export const chatTypeDefs = gql`
  type ChatMessage {
    _id: ID!
    message: String!
    creator: User!
    poll: PollQuestion!
    creationDate: String!
    chatImages: [String]
  }

  extend type Query {
    messages: [ChatMessage!]
    messageByUser(userId: String!): [ChatMessage]
    messagesByPoll(pollId: String!): [ChatMessage]
  }

  extend type Mutation {
    createMessage(details: String!): ID!
  }

  extend type Subscription {
    messages: [ChatMessage!]
    messageByUser(userId: String!): [ChatMessage]
    messagesByPoll(pollId: String!): [ChatMessage]
  }
`;
