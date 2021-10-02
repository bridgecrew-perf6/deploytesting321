import { userResolvers } from "./user";
import { pollResolvers } from "./poll";
import { topicResolvers } from "./pollCategories";
import { feedBackResolvers } from "./pollFeedBack";
import { chatResolvers } from "./chat";
import { otherResolvers } from "./other";
import { internalUsersResolver } from "./internalUser";
import { rolesResolver } from "./roleResolver";

const resolvers = [
  userResolvers,
  pollResolvers,
  topicResolvers,
  feedBackResolvers,
  chatResolvers,
  otherResolvers,
  internalUsersResolver,
  rolesResolver,
];

export default resolvers;
