import { gql } from "@apollo/client";

const otherSubscriptions = {
  NOTIFICATION_SUBSCRIPTION: gql`
    subscription NewNotification {
      newNotification {
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
};

export default otherSubscriptions;
