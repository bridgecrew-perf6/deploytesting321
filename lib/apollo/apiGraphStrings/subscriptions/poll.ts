import { gql } from "@apollo/client";

const pollSubscriptions = {
  CHAT_SUBSCRIPTION: gql`
    subscription OnMessageAdded($pollId: String!) {
      newMessage(pollId: $pollId) {
        _id
        message
        creationDate
        isActive
        creator {
          _id
          appid
          profilePic
        }
        poll {
          _id
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
        multichoice {
          _id
          answerVal
        }
        multichoiceVotes {
          _id
          userId
          vote
        }
        creationDate
        likes {
          _id
          userId
          like
        }
        dislikes {
          _id
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
        multichoice {
          _id
          answerVal
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

export default pollSubscriptions;
