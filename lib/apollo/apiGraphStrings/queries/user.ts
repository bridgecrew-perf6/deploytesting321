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
          following {
            _id
            appId
          }
          favorites {
            _id
            favoriteId
            favoriteType
          }
          timeOnSite {
            hour
            minutes
            seconds
          }
          timeSpentOnPoll {
            hours
            minutes
            seconds
            pollCount
          }
        }
      }
    }
  `,
  GET_USER_FOR_POLL: gql`
    query GetUserDataForPoll {
      getUserDataForPoll {
        _id
        following {
          _id
          appId
          profilePic
        }
      }
    }
  `,
  GET_APPUSER: gql`
    query GetAppUserData($userId: String!) {
      getAppUserData(userId: $userId) {
        _id
        appid
        firstname
        lastname
        email
        address1
        address2
        city
        state
        zipcode
        bio
        isAppUser
        profilePic
        following {
          _id
          appId
          profilePic
        }
        registerDate
        pollHistory {
          _id
          creationDate
        }
        favorites {
          _id
          favoriteId
          favoriteType
        }
        timeOnSite {
          hour
          minutes
          seconds
        }
      }
    }
  `,
  GET_FAVORITES: gql`
    query ShowFavorites($userId: String!) {
      showFavorites(userId: $userId) {
        favoritePolls {
          _id
          question
          topic {
            topic
          }
          subTopics {
            _id
            subTopic
          }
          creationDate
          creator {
            _id
            appid
            profilePic
          }
          answers {
            _id
          }
          chatMssgs {
            _id
          }
        }
        favoriteAnswers {
          _id
          answer
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
