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
    views: Int
    chatMssgs: [ChatMessage]
  }

  type Like {
    _id: ID!
    userId: String!
    like: Boolean!
  }

  type DisLike {
    _id: ID!
    userId: String!
    dislike: Boolean!
  }

  type Answer {
    _id: ID!
    answer: String!
    poll: PollQuestion!
    comments: [Comment]
    creator: User!
    answerImages: [String]
    creationDate: String!
    likes: [Like]
    dislikes: [DisLike]
    rank: String
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
    pollsByUser(userId: String!): [PollQuestion]
    showViews(pollId: String!): Int
    trendingPolls: [PollQuestion]
    newestPolls: [PollQuestion]
    activeChats: [PollQuestion]
    pollsByTopic(topic: String!): [PollQuestion]
    pollsBySubTopic(subTopic: String!): [PollQuestion]
  }

  extend type Mutation {
    createPoll(details: String!): PollQuestion
    createAnswer(details: String!): Answer
    handleLikeDislike(
      feedback: String!
      feedbackVal: Boolean!
      answerId: String!
    ): Answer
    addAnswerRank(answerId: String!): String
    addView(pollId: String!): Int
  }

  extend type Subscription {
    newAnswer(pollId: String!): Answer!
  }
`;
