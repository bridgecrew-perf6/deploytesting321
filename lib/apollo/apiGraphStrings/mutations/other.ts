import { gql } from "@apollo/client";

const otherNotifications = {
  UPDATE_NOTIFICATION: gql`
    mutation UpdateNotification($details: String!) {
      updateNotification(details: $details) {
        _id
        message
        creationDate
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

export default otherNotifications;
