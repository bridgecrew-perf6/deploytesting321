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
};

export default pollSubscriptions;
