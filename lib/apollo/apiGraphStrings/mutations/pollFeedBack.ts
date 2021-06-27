import { gql } from "@apollo/client";

const pollFeedBackMutations = {
  CREATE_ANSWER: gql`
    mutation CreateAnswer($details: String!) {
      createAnswer(details: $details) {
        _id
        answer
      }
    }
  `,
  LIKE_DISLIKE_HANDLER: gql`
    mutation HandleLikeDislike(
      $feedback: String!
      $feedbackVal: Boolean!
      $answerId: String!
    ) {
      handleLikeDislike(
        feedback: $feedback
        feedbackVal: $feedbackVal
        answerId: $answerId
      ) {
        _id
        answer
      }
    }
  `,
  CREATE_CHAT_MESSAGE: gql`
    mutation CreateMessage($details: String!) {
      createMessage(details: $details)
    }
  `,
  ADD_FAVORITE: gql`
    mutation AddFavorite($favoriteType: String!, $favoriteId: String!) {
      addFavorite(favoriteType: $favoriteType, favoriteId: $favoriteId) {
        _id
        favoriteId
        favoriteType
      }
    }
  `,
  REMOVE_FAVORITE: gql`
    mutation RemoveFavorite($favoriteType: String!, $favoriteId: String!) {
      removeFavorite(favoriteType: $favoriteType, favoriteId: $favoriteId) {
        _id
        favoriteId
        favoriteType
      }
    }
  `,
  HANDLE_FAVORITE: gql`
    mutation HandleFavorites(
      $remove: Boolean!
      $favoriteType: String!
      $favoriteId: String!
    ) {
      handleFavorites(
        remove: $remove
        favoriteType: $favoriteType
        favoriteId: $favoriteId
      )
    }
  `,
};

export default pollFeedBackMutations;
