import { gql } from "@apollo/client";

const otherQueries = {
  GET_STATES_US: gql`
    query StatesUS {
      statesUS {
        id
        name
        classification
        division_id
        url
      }
    }
  `,
};

export default otherQueries;
