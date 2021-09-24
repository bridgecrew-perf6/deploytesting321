import { gql } from "@apollo/client";

const internalUserMutations = {
  LOGIN_INTERNAL_USER: gql`
    mutation LoginInternalUser($credentials: String!) {
      login(credentials: $credentials)
    }
  `,
  CREATE_INTERNAL_USER: gql`
    mutation CreateInternalUser($formInputs: String!) {
      createNewInternalUser(formInputs: $formInputs) {
        _id
      }
    }
  `,
  UPDATE_INTERNAL_USER: gql`
    mutation UpdateInternalUser($formInputs: String!) {
      updateInternalUser(formInputs: $formInputs)
    }
  `,
  DELETE_INTERNAL_USER: gql`
    mutation DeleteInternalUser($userId: String!) {
      deleteInternalUser(userId: $userId)
    }
  `,
  UPDATE_ACTIVE_USERS_TO_DISABLE: gql`
    mutation UpdateActiveUsersToDisable($userId: String!) {
      updateActiveUsersToDisable(userId: $userId) {
        _id
      }
    }
  `,
  UPDATE_DISABLE_USERS_TO_ACTIVE: gql`
    mutation UpdateDisableUsersToActive($userId: String!) {
      updateDisableUsersToActive(userId: $userId) {
        _id
      }
    }
  `,
};

export default internalUserMutations;
