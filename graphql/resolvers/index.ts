import { userResolvers } from "./user";
import { pollResolvers } from "./poll";
import { topicResolvers } from "./pollCategories";
import { feedBackResolvers } from "./pollFeedBack";
import { chatResolvers } from "./chat";
import { otherResolvers } from "./other";

const resolvers = [
  userResolvers,
  pollResolvers,
  topicResolvers,
  feedBackResolvers,
  chatResolvers,
  otherResolvers
];

export default resolvers;
