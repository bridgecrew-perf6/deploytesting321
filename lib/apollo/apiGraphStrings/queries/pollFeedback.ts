import { gql } from "@apollo/client";

const pollFeedBackQueries = {
  GET_ANSWERS_BY_POLL: gql`
    query AnswersByPoll($pollId: String!) {
      answersByPoll(pollId: $pollId) {
        _id
        answer
        creator {
          _id
          appid
        }
        answerImages
        creationDate
        comments {
          _id
          comment
        }
      }
    }
  `,
  GET_POLL_CHATS: gql`
    query MessagesByPoll($pollId: String!) {
      messagesByPoll(pollId: $pollId) {
        _id
        message
        creator {
          _id
          appid
        }
        creationDate
        poll {
          _id
        }
      }
    }
  `,
};

export default pollFeedBackQueries;
