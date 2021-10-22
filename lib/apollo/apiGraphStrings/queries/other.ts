import { gql } from "@apollo/client";

const otherQueries = {
  GET_STATES_US: gql`
    query StatesUS {
      statesUS {
        id
        name
        classification
        division_id
        url
      }
    }
  `,
<<<<<<< HEAD
=======
  GET_NOTIFICATIONS: gql`
    query Notifications {
      notifications {
        _id
        message
        creationDate
        read
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
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
  SEARCH_ALL: gql`
    query SearchAll($searchVal: String, $page: Int, $limit: Int) {
      searchAll(searchVal: $searchVal, page: $page, limit: $limit) {
        question {
          count
          question {
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
        answer {
          count
          answer {
            _id
            answer
            poll {
              _id
              question
            }
            likes {
              _id
              like
            }
            dislikes {
              _id
              dislike
            }
            creationDate
            creator {
              _id
              appid
              profilePic
            }
          }
        }
        topic {
          count
          topic {
            _id
            topic
            description
            pollCount
            subTopics {
              _id
              subTopic
            }
          }
        }
        subTopic {
          count
          subTopic {
            _id
            subTopic
            description
            pollCount
            topic {
              _id
              topic
            }
          }
        }
      }
    }
  `,
};

export default otherQueries;
