import { gql } from "@apollo/client";

const internalUserQueries = {
  GET_INTERNAL_USERS: gql`
    query AllInternalUsers {
      internalUsers {
        _id
        email
        fullName
        isActive
        accessRole
        jobTitle
      }
    }
  `,

  GET_SINGLE_INTERNAL_USER: gql`
    query getInternalUser($userId: String!) {
      getInternalUser(userId: $userId) {
        _id
        email
        fullName
        isActive
        accessRole
        jobTitle
      }
    }
  `,
};

export default internalUserQueries;
