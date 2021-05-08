import { gql } from "apollo-server-micro";

export const pollTypeDefs = gql`
  type PollQuestion {
    _id: ID!
    question: String!
    topic: Topic!
    subTopics: [SubTopic]!
    creator: User!
    creationDate: String!
    pollImages: [String]
    answers: [Answer]
  }

  type Answer {
    _id: ID!
    answer: String!
    poll: PollQuestion!
    comments: [Comment]
    creator: User!
    answerImages: [String]
    creationDate: String!
  }

  type Comment {
    _id: ID!
    comment: String!
    answer: Answer!
    replies: [Reply]
    creator: User!
    commentImages: [String]
    creationDate: String!
  }

  type Reply {
    _id: ID!
    reply: String!
    comment: Comment!
    creator: User!
    replyImages: [String]
    creationDate: String!
  }

  extend type Query {
    polls: [PollQuestion!]
    poll(pollId: String!): PollQuestion
    answersByPoll(pollId: String!): [Answer]
  }

  extend type Mutation {
    createPoll(details: String!): PollQuestion
    createAnswer(details: String!): Answer
  }
`;
