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
  CREATE_NEW_ROLE: gql`
    mutation CreateNewRole(
      $name: String!
      $description: String!
      $status: Boolean!
      $privilages: [String]
    ) {
      createNewRole(
        name: $name
        description: $description
        status: $status
        privilages: $privilages
      ) {
        _id
      }
    }
  `,

  UPDATE_ROLE_PRIVILAGES: gql`
    mutation UpdateRolePrivilages($roleName: String!, $privilages: [String]!) {
      updateRolePrivilages(roleName: $roleName, privilages: $privilages) {
        _id
      }
    }
  `,

  ACTIVATE_ROLE: gql`
    mutation ActivateRole($roleName: String!) {
      activateRole(roleName: $roleName) {
        _id
      }
    }
  `,

  DISABLE_ROLE: gql`
    mutation DisableRole($roleName: String!) {
      disableRole(roleName: $roleName) {
        _id
      }
    }
  `,
};

export default internalUserMutations;
