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
        isMyPoll
        topic {
          _id
          topic
        }
        subTopics {
          _id
          subTopic
          topic {
            _id
          }
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
    query PollsByUser($userId: String) {
      pollsByUser(userId: $userId) {
        _id
        pollType
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
        creator {
          _id
          appid
          firstname
          profilePic
        }
      }
    }
  `,
  GET_FAVORITE_POLLS: gql`
    query GetFavoritePolls {
      getFavoritePolls {
        _id
        pollType
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
        creator {
          _id
          appid
          firstname
          profilePic
        }
      }
    }
  `,
  NEWEST_POLLS_WITH_PAGINATION: gql`
    query NewestPollsWithPagination($offset: Int, $limit: Int) {
      newestPollsWithPagination(offset: $offset, limit: $limit) {
        _id
        pollType
        question
        answerCount
        isMultipleChoice
        isMyPoll
        isFavorite
        lastActivity
        chatMssgsCount
        topic {
          _id
          topic
        }
        subTopics {
          _id
          subTopic
          topic {
            _id
          }
        }
        pollImages
        creationDate
        creator {
          _id
          appid
          profilePic
        }
        views
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
  ACTIVECHAT_WITH_PAGINATION: gql`
    query ActiveChatsWithPagination($offset: Int, $limit: Int) {
      activeChatsWithPagination(offset: $offset, limit: $limit) {
        _id
        pollType
        question
        answerCount
        chatMssgsCount
        isMultipleChoice
        isFavorite
        isMyPoll
        lastActivity
        topic {
          _id
          topic
        }
        subTopics {
          _id
          subTopic
          topic {
            _id
          }
        }
        pollImages
        creationDate
        creator {
          _id
          appid
          profilePic
        }
        views
      }
    }
  `,
  TRENDING_POLLS_WITH_PAGINATION: gql`
    query TrendingPollsWithPagination($offset: Int, $limit: Int) {
      trendingPollsWithPagination(offset: $offset, limit: $limit) {
        _id
        pollType
        question
        answerCount
        isMultipleChoice
        isMyPoll
        isFavorite
        lastActivity
        chatMssgsCount
        topic {
          _id
          topic
        }
        subTopics {
          _id
          subTopic
          topic {
            _id
          }
        }
        pollImages
        creationDate
        creator {
          _id
          appid
          profilePic
        }
        views
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
