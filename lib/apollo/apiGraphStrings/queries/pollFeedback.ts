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
        answerImage
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
        multichoice {
          _id
          answerVal
        }
        multichoiceVotes {
          _id
          userId
          vote
        }
      }
    }
  `,
  GET_POLL_CHAT_USERS: gql`
    query PollChatUsers($pollId: String!) {
      pollChatUsers(pollId: $pollId) {
        id
        appid
        profilePic
        followers
        numPolls
        numAnswers
        lastChatMssgDate
        isActive
      }
    }
  `,
  IS_FAVORITE: gql`
    query IsFavorite($favType: String!, $favId: String!) {
      isFavorite(favType: $favType, favId: $favId)
    }
  `,
  LAST_ACTIVITY: gql`
    query LastActivity($pollId: String!) {
      lastActivity(pollId: $pollId)
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
          profilePic
        }
        creationDate
        poll {
          _id
        }
      }
    }
  `,
  GET_POLL_CHAT_PAGES: gql`
    query MessageFeedByPoll($cursor: String, $pollId: String!, $limit: Int) {
      messageFeedByPoll(cursor: $cursor, pollId: $pollId, limit: $limit) {
        cursor
        hasMoreData
        messages {
          _id
          message
          isActive
          creator {
            _id
            appid
            profilePic
          }
          creationDate
          poll {
            _id
          }
        }
      }
    }
  `,
};

export default pollFeedBackQueries;
