import { ResolverMap } from "../../components/appTypes/appType";
import { v4 as uuidv4 } from "uuid";
import Topic from "../../models/TopicModel";
import SubTopic from "../../models/SubTopicModel";
import { transformChat, transformSubTopic, transformTopic } from "./shared";
// import ITopic from "../../models/interfaces/topic";
// import ISubTopic from "../../models/interfaces/subTopic";
import batchLoaders from "../loaders/dataLoaders";
import { IChat } from "./shared/other";
import { dateToString } from "../../components/globalFuncs";

const messages: IChat[] = []; //Not stored anywhere but memory.  When server restarted, all this data is lost.  Figure out way to store this somewhere

export const chatResolvers: ResolverMap = {
  Query: {
    // messages: async (parent, args, { dataLoaders }) => {
    //   const messageData = messages.map((item) =>
    //     transformChat(item, dataLoaders(["user", "poll"]))
    //   );
    //   return messageData;
    // },
    // messageByUser: async (parent, args, { dataLoaders }) => {},
    // messagesByPoll: async (parent, { pollId }, { dataLoaders }) => {
    //   const pollChatMessages = messages.filter((item) => item.poll === pollId);
    //   return pollChatMessages.map((item) =>
    //     transformChat(item, dataLoaders(["user", "poll"]))
    //   );
    // },
  },
  Mutation: {
    createMessage: async (parent, { details }, ctx) => {
      const { isAuth, req, res, dataLoaders } = ctx;
      const { auth, id } = isAuth;

      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }

      const _id = uuidv4();
      const creationDate = dateToString(new Date());
      const detailObj = JSON.parse(details);

      const newMessage: IChat = {
        ...detailObj,
        _id,
        creator: id,
        creationDate: creationDate,
        chatImages: [],
      };

      try {
        messages.push(newMessage);
        return _id;
      } catch (err) {
        throw err;
      }
    },
  },
  // Subscription: {
  //   messages: {
  //     subscribe: (parent, args, { pubsub }) => {

  //     },
  //   },
  // },
};
