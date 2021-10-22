import { gql } from "apollo-server-micro";

// const { gql } = require("apollo-server-micro");

export const userTypeDefs = gql`
  type User {
    _id: ID!
    firstname: String
    lastname: String
    appid: String!
    email: String!
    password: String
    address1: String
    address2: String
    city: String
    state: String
    zipcode: String
    profilePic: String
    useragreementagreed: Boolean
    bio: String
    registerDate: String
    isAppUser: Boolean
    pollHistory: [PollQuestion!]
    favorites: [Favorite]
    following: [Following]
<<<<<<< HEAD
  }

=======
    # timeOnSite: siteTime
    # timeSpentOnPoll: [timeOnPoll]
  }

  # type timeOnPoll {
  #   poll: String
  #   hours: Int
  #   minutes: Int
  #   seconds: Int
  #   pollCount: Int
  # }

  # type siteTime {
  #   hour: Int
  #   minutes: Int
  #   seconds: Int
  # }

>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
  type Favorites {
    favoritePolls: [PollQuestion]
    favoriteAnswers: [Answer]
  }

  type Favorite {
    _id: ID!
    favoriteId: String!
    favoriteType: String!
  }

  type Following {
    _id: ID!
    appId: String
    profilePic: String
  }

  type AuthData {
    appToken: String!
    user: User!
  }

  extend type Query {
    users: [User]!
    getUserData: AuthData!
    getUserDataForPoll: User!
    showFavorites(userId: String!): Favorites!
    getAppUserData(userId: String): User!
    isFavorite(favType: String!, favId: String!): Boolean
    getFollows: [Following]
    logout: String
  }

  extend type Mutation {
    login(credentials: String!): String!
    refreshUserToken(userId: ID!): String!
    createNewUser(formInputs: String!): User!
    updateUser(formInputs: String!): String!
    addFollow(userId: String!): Following!
    removeFollow(userId: String!): Following!
    addFavorite(favoriteType: String!, favoriteId: String!): Favorite!
    removeFavorite(favoriteType: String!, favoriteId: String!): Favorite!
<<<<<<< HEAD
=======
    # updateTimeOnSite(seconds: Int!, userId: String!): User!
    # updateTimeSpentOnPoll(
    #   poll: String!
    #   userId: String!
    #   seconds: Int!
    #   minutes: Int!
    #   hours: Int!
    # ): User!
    # deletePollTimeCount(userId: String!): String!
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
  }
`;
