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
      )
    }
  `,
  CREATE_CHAT_MESSAGE: gql`
    mutation CreateMessage($details: String!) {
      createMessage(details: $details)
    }
  `,
};

export default pollFeedBackMutations;
