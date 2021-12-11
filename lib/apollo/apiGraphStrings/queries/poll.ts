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
          profilePic
        }
        views
        chatMssgs {
          _id
        }
      }
    }
  `,
  GET_POLL: gql`
    query Poll($pollId: String!) {
      poll(pollId: $pollId) {
        _id
        question
        isEditable
        topic {
          _id
          topic
        }
        subTopics {
          _id
          subTopic
        }
        pollImages
        pollType
        answers {
          _id
          
        }
        creationDate
        creator {
          _id
          appid
          profilePic
        }
        views
        chatMssgs {
          _id
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
        views
        chatMssgs {
          _id
        }
      }
    }
  `,
  GET_NEWEST_POLLS: gql`
    query NewestPolls {
      newestPolls {
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
        views
        chatMssgs {
          _id
        }
      }
    }
  `,
  GET_POLLS_BY_TOPIC: gql`
    query PollsByTopic($topic: String!) {
      pollsByTopic(topic: $topic) {
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
        views
        chatMssgs {
          _id
        }
      }
    }
  `,
  GET_POLLS_BY_SUBTOPIC: gql`
    query PollsBySubTopic($subTopic: String!) {
      pollsBySubTopic(subTopic: $subTopic) {
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
        views
        chatMssgs {
          _id
        }
      }
    }
  `,
  GET_ACTIVE_CHATS: gql`
    query ActiveChats {
      activeChats {
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
        views
        chatMssgs {
          _id
        }
      }
    }
  `,
  GET_TRENDING_POLLS: gql`
    query TrendingPolls {
      trendingPolls {
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
        views
        chatMssgs {
          _id
        }
      }
    }
  `,
  SHOW_VIEWS: gql`
    query ShowViews($pollId: String!) {
      showViews(pollId: $pollId)
    }
  `,
};

export default pollQueries;
