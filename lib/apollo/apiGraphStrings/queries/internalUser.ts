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

  GET_INTERNAL_USERS_WITH_PAGINATION: gql`
    query AllInternalUsersWithPagination($offset: Int, $limit: Int) {
      internalUsersWithPagination(offset: $offset, limit: $limit) {
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

  GET_ALL_ROLES: gql`
    query AllRoles {
      allRoles {
        _id
        name
        description
        status
        privilages
      }
    }
  `,
};

export default internalUserQueries;
