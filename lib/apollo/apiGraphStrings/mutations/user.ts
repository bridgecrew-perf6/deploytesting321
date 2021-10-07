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
  UPDATE_USER: gql`
    mutation UpdateUser($formInputs: String!) {
      updateUser(formInputs: $formInputs)
    }
  `,
  ADD_FOLLOW: gql`
    mutation AddFollow($userId: String!) {
      addFollow(userId: $userId) {
        _id
      }
    }
  `,
  REMOVE_FOLLOW: gql`
    mutation RemoveFollow($userId: String!) {
      removeFollow(userId: $userId) {
        _id
      }
    }
  `,
  UPDATE_TIME_ON_SITE: gql`
    mutation updateTimeOnSite($userId: String!, $seconds: Int!) {
      updateTimeOnSite(userId: $userId, seconds: $seconds) {
        _id
      }
    }
  `,
};

export default userMutations;
