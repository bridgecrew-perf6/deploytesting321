import { gql } from "@apollo/client";

const topicMutations = {
  CREATE_TOPIC: gql`
    mutation CreateTopic($topicInfo: String!) {
      createTopic(topicInfo: $topicInfo) {
        _id
      }
    }
  `,
  CREATE_SUBTOPIC: gql`
    mutation CreateSubTopic($subTopicInfo: String!) {
        createSubTopic(subTopicInfo: $subTopicInfo) {
        _id
      }
    }
  `,
};

export default topicMutations;
