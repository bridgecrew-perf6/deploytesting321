import { userResolvers } from "./user";
import { pollResolvers } from "./poll";
import { topicResolvers } from "./pollCategories";
import { feedBackResolvers } from "./pollFeedBack";
import { chatResolvers } from "./chat";
import { otherResolvers } from "./other";
<<<<<<< HEAD
=======
import { internalUsersResolver } from "./internalUser";
import { rolesResolver } from "./roleResolver";
import { privilegesResolver } from "./privilegesResolver";
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5

const resolvers = [
  userResolvers,
  pollResolvers,
  topicResolvers,
  feedBackResolvers,
  chatResolvers,
<<<<<<< HEAD
  otherResolvers
=======
  otherResolvers,
  internalUsersResolver,
  rolesResolver,
  privilegesResolver,
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
];

export default resolvers;
