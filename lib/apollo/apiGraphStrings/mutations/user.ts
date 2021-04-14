import { gql } from "@apollo/client";

const userMutations = {
  LOGIN: gql`
    mutation LogIn($credentials: String!) {
      login(credentials: $credentials)
    }
  `,
  CREATE_USER: gql`
    mutation CreateNewUser($formInputs: String!) {
      createNewUser(formInputs: $formInputs) {
        _id
      }
    }
  `,
};

export default userMutations;
