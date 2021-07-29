import { gql } from "apollo-server-micro";

export const otherTypeDefs = gql`
  type StatesUS {
    id: String!
    name: String!
    classification: String!
    division_id: String!
    url: String!
  }

  type question {
    count: Int
    question: [PollQuestion]
  }

  type answer {
    count: Int
    answer: [Answer]
  }

  extend type Topic {
    pollCount: Int
  }

  extend type SubTopic {
    pollCount: Int
  }

  type topic {
    count: Int
    topic: [Topic]
  }

  type subTopic {
    count: Int
    subTopic: [SubTopic]
  }

  type SearchResults {
    question: question
    answer: answer
    topic: topic
    subTopic: subTopic
  }

  extend type Query {
    statesUS: [StatesUS!]
    searchAll(searchVal: String, page: Int, limit: Int): SearchResults!
  }
`;
