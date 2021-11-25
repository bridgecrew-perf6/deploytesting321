import { gql } from "@apollo/client";

const pollFeedBackMutations = {
  CREATE_ANSWER: gql`
    mutation CreateAnswer($details: String!) {
      createAnswer(details: $details)
    }
  `,
  UPDATE_ANSWER: gql`
    mutation UpdateAnswer($details: String!) {
      updateAnswer(details: $details) {
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
      $pollId: String!
    ) {
      handleLikeDislike(
        feedback: $feedback
        feedbackVal: $feedbackVal
        answerId: $answerId
        pollId: $pollId
      ) {
        _id
        answer
      }
    }
  `,
  MULTI_CHOICE_HANDLER: gql`
    mutation HandleMultiChoice($details: String!) {
      handleMultiChoice(details: $details)
    }
  `,
  CREATE_CHAT_MESSAGE: gql`
    mutation CreateMessage($details: String!) {
      createMessage(details: $details) {
        _id
        isActive
      }
    }
  `,
  HANDLE_FAVORITE: gql`
    mutation HandleFavorite(
      $isFav: Boolean!
      $favoriteType: String!
      $favoriteId: String!
    ) {
      handleFavorite(
        isFav: $isFav
        favoriteType: $favoriteType
        favoriteId: $favoriteId
      )
    }
  `,
  // ADD_FAVORITE: gql`
  //   mutation AddFavorite($favoriteType: String!, $favoriteId: String!) {
  //     addFavorite(favoriteType: $favoriteType, favoriteId: $favoriteId) {
  //       _id
  //       favoriteId
  //       favoriteType
  //     }
  //   }
  // `,
  // REMOVE_FAVORITE: gql`
  //   mutation RemoveFavorite($favoriteType: String!, $favoriteId: String!) {
  //     removeFavorite(favoriteType: $favoriteType, favoriteId: $favoriteId) {
  //       _id
  //       favoriteId
  //       favoriteType
  //     }
  //   }
  // `,
};

export default pollFeedBackMutations;
