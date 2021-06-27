import { gql } from "@apollo/client";

const pollQueries = {
  GET_POLLS_ALL: gql`
    query Polls {
      polls {
        _id
        question
        topic {
          _id
          topic
        }
        subTopics {
          _id
          subTopic
        }
        answers {
          _id
        }
        creationDate
        pollImages
        creator {
          _id
          appid
        }
      }
    }
  `,
  GET_POLL: gql`
    query Poll($pollId: String!) {
      poll(pollId: $pollId) {
        _id
        question
        topic {
          _id
          topic
        }
        subTopics {
          _id
          subTopic
        }
        pollImages
        answers {
          _id
        }
        creationDate
        creator {
          _id
          appid
          profilePic
        }
      }
    }
  `,
  GET_USERPOLLS: gql`
    query PollsByUser($userId: String!) {
      pollsByUser(userId: $userId) {
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
        answers {
          _id
        }
      }
    }
  `,
};

export default pollQueries;
