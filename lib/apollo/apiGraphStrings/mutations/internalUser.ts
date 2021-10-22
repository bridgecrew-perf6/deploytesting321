import { gql } from "@apollo/client";

const internalUserMutations = {
  LOGIN_INTERNAL_USER: gql`
    mutation InternalUserLogin($email: String!, $password: String!) {
      internalUserLogin(email: $email, password: $password)
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
      updateInternalUser(formInputs: $formInputs) {
        _id
      }
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
      $role: String!
      $description: String!
      $status: String!
      $privileges: [String]
    ) {
      createNewRole(
        role: $role
        description: $description
        status: $status
        privileges: $privileges
      ) {
        _id
      }
    }
  `,

  UPDATE_ROLE_PRIVILAGES: gql`
    mutation UpdateRolePrivilages($roleName: String!, $privileges: [String]!) {
      updateRolePrivilages(roleName: $roleName, privileges: $privileges) {
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

  CHANGE_INTERNAL_USER_PASSWORD: gql`
    mutation ChangeInternalUserPassword(
      $userId: String!
      $newPassword: String!
    ) {
      changeInternalUserPassword(userId: $userId, newPassword: $newPassword) {
        _id
      }
    }
  `,
};

export default internalUserMutations;
