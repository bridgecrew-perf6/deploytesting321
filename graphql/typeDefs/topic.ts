import { gql } from "apollo-server-micro";

export const topicTypeDefs = gql`
  type Topic {
    _id: ID!
    topic: String!
    description: String
    creator: User!
    creationDate: String!
    subTopics: [SubTopic!]
  }

  type SubTopic {
    _id: ID!
    subTopic: String!
    description: String
    creator: User!
    creationDate: String!
    topic: Topic!
    polls: [PollQuestion!]
  }

  extend type Query {
    topics: [Topic!]
    subTopics: [SubTopic!]
    subTopicsPerTopic(topic: String!): [SubTopic!]
    topicForSubtopics(subTopic: String!): Topic!
  }

  extend type Mutation {
    createTopic(topicInfo: String!): Topic
    createSubTopic(subTopicInfo: String!): SubTopic
  }
`;
