import { gql } from "@apollo/client";

const pollMutations = {
  CREATE_POLL: gql`
    mutation CreatePoll($details: String!) {
      createPoll(details: $details) {
        _id
      }
    }
  `,
};

export default pollMutations;
