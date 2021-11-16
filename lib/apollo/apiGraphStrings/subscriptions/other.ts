import { gql } from "@apollo/client";

const otherSubscriptions = {
  NOTIFICATION_SUBSCRIPTION: gql`
    subscription NewNotification {
      newNotification {
        _id
        message
        creationDate
        notificationType
        notificationId
        contentOwner {
          _id
        }
        user {
          _id
          appid
          profilePic
        }
      }
    }
  `,
  ANSWER_SUBSCRIPTION: gql`
    subscription OnAnswerAdded($pollId: String!) {
      newAnswer(pollId: $pollId) {
        _id
        answer
        creator {
          _id
          appid
        }
        answerImage
        creationDate
        likes {
          userId
          like
        }
        dislikes {
          userId
          dislike
        }
        rank
      }
    }
  `,
  ANSWERS_SUBSCRIPTION: gql`
    subscription OnAnswerUpdated($pollId: String!) {
      updatedAnswers(pollId: $pollId) {
        _id
        answer
        creator {
          _id
          appid
        }
        answerImage
        creationDate
        likes {
          userId
          like
        }
        dislikes {
          userId
          dislike
        }
        rank
      }
    }
  `,
};

export default otherSubscriptions;
