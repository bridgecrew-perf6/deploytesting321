import { gql } from "@apollo/client";

const pollMutations = {
  CREATE_POLL: gql`
    mutation CreatePoll($details: String!) {
      createPoll(details: $details) {
        _id
        question
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
