import { userResolvers } from "./user";
import { pollResolvers } from "./poll";
import { topicResolvers } from "./pollCategories";
import { feedBackResolvers } from "./pollFeedBack";
import { chatResolvers } from "./chat";

const resolvers = [
  userResolvers,
  pollResolvers,
  topicResolvers,
  feedBackResolvers,
  chatResolvers
];

export default resolvers;
