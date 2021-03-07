import { gql } from "@apollo/client";

const queries = {
  GET_USER: gql`
    query GetUserData {
      getUserData {
        appToken
        user {
          _id
          userId
          email
          profilePic
          pollHistory {
            _id
            question
            topic
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
        userId
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
  GET_POLLS_ALL: gql`
    query Polls {
      polls {
        _id
        question
        topic
        creationDate
        creator {
          _id
          userId
        }
      }
    }
  `,
};

export default queries;