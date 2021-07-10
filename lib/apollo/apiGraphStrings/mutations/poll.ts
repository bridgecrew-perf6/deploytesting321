import { gql } from "@apollo/client";

const pollMutations = {
  CREATE_POLL: gql`
    mutation CreatePoll($details: String!) {
      createPoll(details: $details) {
        _id
        question
        topic {
          topic
        }
        subTopics {
          _id
          subTopic
        }
        creationDate
        answers {
          _id
        }
      }
    }
  `,
  ADD_VIEW: gql`
    mutation AddView($pollId: String!) {
      addView(pollId: $pollId)
    }
  `,
};

export default pollMutations;
