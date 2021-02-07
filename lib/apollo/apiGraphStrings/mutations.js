import { gql } from "@apollo/client";

const mutations = {
  LOGIN: gql`
    mutation LogIn($credentials: String!) {
      login(credentials: $credentials)
    }
  `,
  CREATE_POLL: gql`
    mutation createPoll($details: String!) {
      createPoll(details: $details) {
        id
      }
    }
  `,
};

export default mutations;