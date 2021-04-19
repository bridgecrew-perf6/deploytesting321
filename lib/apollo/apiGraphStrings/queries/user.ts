import { gql } from "@apollo/client";

const userQueries = {
  GET_USER: gql`
    query GetUserData {
      getUserData {
        appToken
        user {
          _id
          appid
          email
          profilePic
          pollHistory {
            _id
            creationDate
          }
        }
      }
    }
  `,
  GET_ALL_USERS: gql`
    query Users {
      users {
        _id
        appid
        firstname
        email
        pollHistory {
          _id
          question
        }
      }
    }
  `,
  LOG_OUT: gql`
    query LogOut {
      logout
    }
  `,
};

export default userQueries;
