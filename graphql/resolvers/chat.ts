import { ResolverMap } from "../../components/appTypes/appType";
import { v4 as uuidv4 } from "uuid";
import Chat from "../../models/chatModel";
import Poll from "../../models/PollModel";
import Topic from "../../models/TopicModel";
import SubTopic from "../../models/SubTopicModel";
import { transformChat, transformSubTopic, transformTopic } from "./shared";
// import ITopic from "../../models/interfaces/topic";
// import ISubTopic from "../../models/interfaces/subTopic";
import batchLoaders from "../loaders/dataLoaders";
import { dateToString } from "../../components/globalFuncs";
import { withFilter } from "apollo-server";
import IChat from "../../models/interfaces/chat";
import IPoll from "../../models/interfaces/poll";

export const chatResolvers: ResolverMap = {
  Query: {
    messages: async (parent, args, { dataLoaders }) => {
      try {
        const messages = await Chat.find();
        return messages.map((item) =>
          transformChat(item, dataLoaders(["user", "poll"]))
        );
      } catch (err) {
        throw  err;
      }
    },
    messageByUser: async (parent, args, { dataLoaders }) => {},
    messagesByPoll: async (parent, { pollId }, { dataLoaders }) => {
      try {
        const pollMessages = await Chat.find({ poll: pollId });

        return pollMessages.map((item: IChat) =>
          transformChat(item, dataLoaders(["user", "poll"]))
        );
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    createMessage: async (parent, { details }, ctx) => {
      const { isAuth, req, res, pubsub, dataLoaders } = ctx;
      const { auth, id } = isAuth;

      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }

      const detailObj = JSON.parse(details);

      const chatMssg: IChat = new Chat({
        ...detailObj,
        creator: id,
      });

      try {
        const savedMssg = await chatMssg.save(detailObj.poll);

        const poll: IPoll = await Poll.findById(detailObj.poll);

        if (poll.chatMssgs) {
          poll.chatMssgs.push(chatMssg._id);
        } else poll.chatMssgs = [chatMssg._id];

        await poll.save();

        const newMessage = transformChat(
          savedMssg,
          dataLoaders(["user", "poll"])
        );

        pubsub.publish("newMessage", { newMessage });
        return newMessage;
      } catch (err) {
        throw err;
      }
    },
  },
  Subscription: {
    newMessage: {
      subscribe: (parent, args, { pubsub }) =>
        pubsub.asyncIterator("newMessage"),
    },
  },
};
