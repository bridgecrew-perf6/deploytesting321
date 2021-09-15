import { gql } from "apollo-server-micro";

export const chatTypeDefs = gql`
  type ChatMessage {
    _id: ID!
    message: String!
    creator: User!
    poll: PollQuestion!
    creationDate: String!
    chatImages: [String]
    isAnswer: Boolean!
  }

  extend type Query {
    messages: [ChatMessage!]
    messageByUser(userId: String!): [ChatMessage]
    messagesByPoll(pollId: String!): [ChatMessage]
  }

  extend type Mutation {
    createMessage(details: String!): ChatMessage
  }

  extend type Subscription {
    newMessage(pollId: String!): ChatMessage!
  }
`;
