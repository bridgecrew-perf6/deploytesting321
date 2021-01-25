import { gql} from "@apollo/client";

export const GET_USER = gql`
  query GetUserData {
    getUserData
  }
`;

export const GET_ALL_USERS = gql`
  query Users {
    users {
      id
      firstname
      email
    }
  }
`;

export const LOG_OUT = gql`
  query LogOut {
    logout
  }
`;
