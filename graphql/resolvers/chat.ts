import { ChatFeed, ResolverMap } from "../../components/appTypes/appType";
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
import pushNotification from "./shared/notification";

export const chatResolvers: ResolverMap = {
  Query: {
    messages: async (parent, args, { dataLoaders }) => {
      try {
        const messages = await Chat.find();
        return messages.map((item) =>
          transformChat(item, dataLoaders(["user", "poll"]))
        );
      } catch (err) {
        throw err;
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
    messageFeedByPoll: async (
      parent,
      { pollId, cursor, limit },
      { dataLoaders }
    ) => {
      const noCursorOffset = !cursor ? 1 : 0;
      if (limit <= 0) {
        throw new Error("Cannot fetch records for negative or 0 limit");
      }

      try {
        const pollMessages: IChat[] = await Chat.find({ poll: pollId });

        if (!cursor) {
          cursor = pollMessages[pollMessages.length - 1]._id.toString();
        }

        const newMessageIdx = pollMessages.findIndex(
          (msg) => msg._id.toString() === cursor
        );

        const offset = newMessageIdx - limit + noCursorOffset;

        let messages: IChat[] = [];
        let hasMoreData: boolean = false;
        let newCursor: string = "";

        if (offset > 0) {
          messages = pollMessages.slice(offset, newMessageIdx + noCursorOffset);
          hasMoreData = true;
          newCursor = pollMessages[offset]._id.toString();
        } else {
          messages = pollMessages.slice(0, newMessageIdx + noCursorOffset);
        }

        const messageDetails = messages.map((item: IChat) =>
          transformChat(item, dataLoaders(["user", "poll"]))
        );

        const chatFeed: ChatFeed = {
          cursor: newCursor,
          messages: messageDetails,
          hasMoreData,
        };

        return chatFeed;
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

        if (
          poll.creator.toString() !== id &&
          poll.chatMssgs.length === 0 &&
          id
        ) {
          pushNotification("chat", id, poll, pubsub, dataLoaders);
        }

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
    // newNotification: {
    //   subscribe: (parent, args, { pubsub }) =>
    //     pubsub.asyncIterator("newNotification"),
    // },
  },
};
