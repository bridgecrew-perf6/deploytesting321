import { PubSub } from "graphql-subscriptions";
import IChat from "models/interfaces/chat";
import IPoll from "models/interfaces/poll";
import IUser from "models/interfaces/user";
import { showAbbreviatedTxt } from "_components/globalFuncs";
import { transformNotification } from ".";
import Notification from "../../../models/notificationModel";
import User from "../../../models/UserModel";

const pushNotification = async (
  notifType: string,
  userId: string,
  notifObj: IPoll | IChat,
  pubsub: PubSub,
  dataLoaders: any,
  follower?: string
) => {
  const creator: IUser = await User.findById(userId);

  const notificationMssg = getNotificationMssg(
    creator.appid,
    notifType,
    notifObj
  );

  const notification = new Notification({
    message: notificationMssg,
    user: userId,
    notificationType: notifType,
    notificationId: notifObj._id,
    contentOwner: follower ? follower : notifObj.creator.toString(),
    read: false,
  });

  const savedNotification = await notification.save();
  const newNotification = transformNotification(
    savedNotification,
    dataLoaders(["user"])
  );

  pubsub.publish("newNotification", { newNotification });
};

export default pushNotification;

const getNotificationMssg = (
  appId: string,
  notifType: string,
  notifObj: IPoll | IChat
) => {
  switch (true) {
    case notifType === "poll":
      return `${appId} added an answer to the poll: ${showAbbreviatedTxt(
        (notifObj as IPoll).question
      )}`;
    case notifType === "chat":
      return `Someone started chatting on your poll`;
    case notifType === "follower":
      return `${appId} created a new poll: ${showAbbreviatedTxt(
        (notifObj as IPoll).question
      )}`;
  }
};
