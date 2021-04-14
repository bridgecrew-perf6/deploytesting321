import { gql } from "@apollo/client";

const topicQueries = {
  GET_TOPICS: gql`
    query Topics {
      topics {
        _id
        topic
        description
        creator {
          _id
          appid
        }
        creationDate
        subTopics {
          _id
          subTopic
          description
        }
      }
    }
  `,
  GET_SUBTOPICS: gql`
    query SubTopics {
      subTopics {
        _id
        subTopic
        description
        creator {
          _id
          appid
        }
        topic {
          _id
          topic
          description
        }
      }
    }
  `,
  GET_SUBTOPICS_PER_TOPIC: gql`
    query SubTopicsPerTopic($topic: String!) {
      subTopicsPerTopic(topic: $topic) {
        _id
        subTopic
        description
        creationDate
        creator {
          _id
          appid
        }
        topic {
          _id
          topic
        }
      }
    }
  `,
};

export default topicQueries;
