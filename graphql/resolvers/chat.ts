import { ResolverMap } from "../../components/appTypes/appType";
import { v4 as uuidv4 } from "uuid";
import Chat from "../../models/chatModel";
import Topic from "../../models/TopicModel";
import SubTopic from "../../models/SubTopicModel";
import { transformChat, transformSubTopic, transformTopic } from "./shared";
// import ITopic from "../../models/interfaces/topic";
// import ISubTopic from "../../models/interfaces/subTopic";
import batchLoaders from "../loaders/dataLoaders";
import { dateToString } from "../../components/globalFuncs";
import { withFilter } from "apollo-server";
import IChat from "../../models/interfaces/chat";

const messages: IChat[] = []; //Not stored anywhere but memory.  When server restarted, all this data is lost.  Figure out way to store this somewhere

// const subscribers: any[] = [];

// const onMessagesUpdates = (fn: any) => subscribers.push(fn);

export const chatResolvers: ResolverMap = {
  Query: {
    messages: async (parent, args, { dataLoaders }) => {
      // try {
      //   const messages = await Chat.find();
      //   return messages.map((item) =>
      //     transformChat(item, dataLoaders(["user", "poll"]))
      //   );
      // } catch (err) {
      //   throw new Error(err);
      // }
    },
    messageByUser: async (parent, args, { dataLoaders }) => {},
    messagesByPoll: async (parent, { pollId }, { dataLoaders }) => {
      // try {
      //   const pollMessages = await Chat.find({ poll: pollId });

      //   return pollMessages.map((item: IChat) =>
      //     transformChat(item, dataLoaders(["user", "poll"]))
      //   );
      // } catch (err) {
      //   throw new Error(err);
      // }

      const pollChatMessages = messages.filter((item) => item.poll === pollId);
      return pollChatMessages.map((item) =>
        transformChat(item, dataLoaders(["user", "poll"]))
      );
    },
  },
  Mutation: {
    createMessage: async (parent, { details }, ctx) => {
      const { isAuth, req, res, pubsub, dataLoaders } = ctx;
      const { auth, id } = isAuth;

      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }

      const msgid = uuidv4();
      const creationDate = dateToString(new Date());
      const detailObj = JSON.parse(details);

      const newMessage: IChat = {
        ...detailObj,
        _id: msgid,
        creator: id,
        creationDate: creationDate,
        chatImages: [],
      };

      messages.push(newMessage); //Not saved anywhere.  Need to think of way to save this to DB

      const newMessageFinal = transformChat(
        newMessage,
        dataLoaders(["user", "poll"])
      );
      pubsub.publish("newMessage", { newMessage: newMessageFinal });

      return msgid;
    },
  },
  Subscription: {
    newMessage: {
      subscribe: (parent, args, { pubsub }) =>
        pubsub.asyncIterator("newMessage"),
    },
  },
};
