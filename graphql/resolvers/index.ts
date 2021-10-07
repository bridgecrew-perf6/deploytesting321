import { userResolvers } from "./user";
import { pollResolvers } from "./poll";
import { topicResolvers } from "./pollCategories";
import { feedBackResolvers } from "./pollFeedBack";
import { chatResolvers } from "./chat";
import { otherResolvers } from "./other";
import { internalUsersResolver } from "./internalUser";
import { rolesResolver } from "./roleResolver";
import { privilegesResolver } from "./privilegesResolver";

const resolvers = [
  userResolvers,
  pollResolvers,
  topicResolvers,
  feedBackResolvers,
  chatResolvers,
  otherResolvers,
  internalUsersResolver,
  rolesResolver,
  privilegesResolver,
];

export default resolvers;
