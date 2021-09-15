import { gql } from "@apollo/client";

const pollSubscriptions = {
  CHAT_SUBSCRIPTION: gql`
    subscription OnMessageAdded($pollId: String!) {
      newMessage(pollId: $pollId) {
        _id
        message
        creationDate
        creator {
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
        answerImages
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
      answerImages
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
